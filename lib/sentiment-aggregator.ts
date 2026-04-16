/**
 * Sentiment Aggregator
 *
 * Implements:
 *   - 6-hour cache check (fetched_at column)
 *   - Smart fetch: return cached data if fresh, else re-ingest
 *   - 48-hour auto-cleanup
 *   - Daily aggregation with sentiment_influence (normalized 0-100)
 *   - Score blending (claims 70% + sentiment 30%)
 *   - Full refresh cycle exposed as refreshSentimentData()
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SIMULATED_POSTS } from './sentiment-data'
import { keywordClassify } from './sentiment-engine'
import { computeClaimScore, normalizeSentimentScore } from '@/utils/scoring'
import {
  CandidateSentimentToday,
  CandidateSentimentTrend,
  SentimentCacheStatus,
  RefreshResult,
} from '@/types/sentiment'

const CACHE_HOURS    = 6
const CLEANUP_HOURS  = 48
const CLAIM_WEIGHT   = 0.70
const SENTIMENT_WEIGHT = 0.30

// ─── Supabase clients ─────────────────────────────────────────────────────────
function adminClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function publicClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ─── PART 2: Cache check ──────────────────────────────────────────────────────
export async function checkCacheStatus(
  candidateId: string
): Promise<SentimentCacheStatus> {
  const supabase = publicClient()
  const cutoff = new Date(Date.now() - CACHE_HOURS * 3600 * 1000).toISOString()

  const { data, count } = await supabase
    .from('sentiments')
    .select('fetched_at', { count: 'exact' })
    .eq('candidate_id', candidateId)
    .gte('fetched_at', cutoff)
    .order('fetched_at', { ascending: false })
    .limit(1)

  const hasFresh = (count ?? 0) > 0
  return {
    candidate_id: candidateId,
    has_fresh_data: hasFresh,
    last_fetched: data?.[0]?.fetched_at ?? null,
    post_count: count ?? 0,
  }
}

// ─── PART 2: Smart ingest — skip if cache is fresh ────────────────────────────
export async function smartIngestForCandidate(
  candidateId: string,
  candidateSlug: string,
  candidateName: string
): Promise<{ ingested: number; cache_hit: boolean }> {
  const cache = await checkCacheStatus(candidateId)
  if (cache.has_fresh_data) {
    return { ingested: 0, cache_hit: true }
  }

  const supabase = adminClient()
  const now = new Date().toISOString()
  const posts = SIMULATED_POSTS.filter((p) => p.candidateSlug === candidateSlug)

  const rows = posts.map((post) => {
    const result = keywordClassify(post.text, candidateName)
    return {
      candidate_id: candidateId,
      text: post.text,
      sentiment: result.sentiment,
      source: 'simulated',
      score: result.score,
      fetched_at: now,       // ← cache timestamp
    }
  })

  if (!rows.length) return { ingested: 0, cache_hit: false }

  const { error } = await supabase.from('sentiments').insert(rows)
  if (error) throw new Error(`Ingest failed for ${candidateSlug}: ${error.message}`)

  return { ingested: rows.length, cache_hit: false }
}

// ─── PART 3: Cleanup (48h) ────────────────────────────────────────────────────
export async function cleanupOldSentiments(): Promise<number> {
  const supabase = adminClient()
  const cutoff = new Date(Date.now() - CLEANUP_HOURS * 3600 * 1000).toISOString()

  const { error, count } = await supabase
    .from('sentiments')
    .delete({ count: 'exact' })
    .lt('fetched_at', cutoff)

  if (error) throw new Error(`Cleanup failed: ${error.message}`)
  return count ?? 0
}

// ─── PART 5: Aggregate last 24h only ─────────────────────────────────────────
export async function aggregateDaily(
  date: string,
  candidateIds: string[]
): Promise<void> {
  const supabase = adminClient()

  // Use last 24h window — not full day midnight-to-midnight
  const windowStart = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  const windowEnd   = new Date().toISOString()

  for (const candidateId of candidateIds) {
    const { data: posts } = await supabase
      .from('sentiments')
      .select('sentiment')
      .eq('candidate_id', candidateId)
      .gte('fetched_at', windowStart)
      .lte('fetched_at', windowEnd)

    if (!posts?.length) continue

    const pos   = posts.filter((p) => p.sentiment === 'positive').length
    const neg   = posts.filter((p) => p.sentiment === 'negative').length
    const neu   = posts.filter((p) => p.sentiment === 'neutral').length
    const total = posts.length

    const sentiment_score      = +((pos - neg) / total).toFixed(3)       // -1 to +1
    const sentiment_influence  = +normalizeSentimentScore(sentiment_score).toFixed(2) // 0-100

    await supabase.from('sentiment_daily_summary').upsert(
      {
        candidate_id: candidateId,
        date,
        positive_count: pos,
        negative_count: neg,
        neutral_count:  neu,
        total_count:    total,
        sentiment_score,
        sentiment_influence,
      },
      { onConflict: 'candidate_id,date' }
    )
  }
}

// ─── PART 6 + 7: Compute and store blended candidate scores ──────────────────
export async function updateCandidateScores(
  candidates: Array<{ id: string; slug: string; claims: any[] }>,
  sentimentMap: Map<string, { score: number; updated_at: string }>
): Promise<number> {
  const supabase = adminClient()
  let updated = 0

  for (const candidate of candidates) {
    const { claim_score } = computeClaimScore(candidate.claims)
    const sentData = sentimentMap.get(candidate.id)

    let final_score: number
    let sentiment_score_raw   = 0
    let sentiment_score_norm  = 50
    let data_source: 'claims_only' | 'blended'
    let last_sentiment_update: string | null = null

    if (sentData) {
      sentiment_score_raw  = sentData.score
      sentiment_score_norm = normalizeSentimentScore(sentData.score)
      final_score = +(claim_score * CLAIM_WEIGHT + sentiment_score_norm * SENTIMENT_WEIGHT).toFixed(2)
      data_source = 'blended'
      last_sentiment_update = sentData.updated_at
    } else {
      final_score = +claim_score.toFixed(2)
      data_source = 'claims_only'
    }

    const { error } = await supabase.from('candidate_scores').upsert(
      {
        candidate_id: candidate.id,
        claim_score: +claim_score.toFixed(2),
        sentiment_score_raw,
        sentiment_score_norm,
        final_score,
        sentiment_weight: SENTIMENT_WEIGHT,
        claim_weight: CLAIM_WEIGHT,
        data_source,
        last_sentiment_update,
        computed_at: new Date().toISOString(),
      },
      { onConflict: 'candidate_id' }
    )

    if (!error) updated++
  }

  return updated
}

// ─── PART 4: Full refresh cycle ───────────────────────────────────────────────
export async function refreshSentimentData(): Promise<RefreshResult> {
  const supabase  = adminClient()
  const pubClient = publicClient()

  // 1. Get all candidates with their claims
  const { data: candidates, error: candErr } = await supabase
    .from('candidates')
    .select(`
      id, name, slug,
      claims ( id, type, weight, credibility_score )
    `)

  if (candErr || !candidates?.length) {
    throw new Error(`Could not load candidates: ${candErr?.message}`)
  }

  let totalIngested = 0

  // 2. Smart ingest per candidate (respects 6h cache)
  for (const c of candidates) {
    const { ingested } = await smartIngestForCandidate(c.id, c.slug, c.name)
    totalIngested += ingested
  }

  // 3. Aggregate last 24h into daily summary
  const today       = new Date().toISOString().split('T')[0]
  const candidateIds = candidates.map((c) => c.id)
  await aggregateDaily(today, candidateIds)

  // 4. Load today's sentiment scores for blending
  const { data: summaries } = await pubClient
    .from('sentiment_daily_summary')
    .select('candidate_id, sentiment_score, created_at')
    .eq('date', today)

  const sentimentMap = new Map<string, { score: number; updated_at: string }>()
  for (const s of summaries ?? []) {
    sentimentMap.set(s.candidate_id, {
      score: s.sentiment_score,
      updated_at: s.created_at,
    })
  }

  // 5. Update blended candidate scores
  const scoresUpdated = await updateCandidateScores(
    candidates.map((c) => ({
      id: c.id,
      slug: c.slug,
      claims: (c as any).claims ?? [],
    })),
    sentimentMap
  )

  // 6. Cleanup old data
  const cleanupDeleted = await cleanupOldSentiments()

  return {
    ingested: totalIngested,
    aggregated_for: today,
    candidates_processed: candidates.length,
    scores_updated: scoresUpdated,
    cleanup_deleted: cleanupDeleted,
  }
}

// ─── PART 2: getTodaySummary with cache metadata ──────────────────────────────
export async function getTodaySummary(): Promise<CandidateSentimentToday[]> {
  const supabase  = publicClient()
  const today     = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const cutoff    = new Date(Date.now() - CACHE_HOURS * 3600 * 1000).toISOString()

  const { data: candidates } = await supabase
    .from('candidates').select('id, name, slug')

  if (!candidates?.length) return []

  const { data: todayRows } = await supabase
    .from('sentiment_daily_summary').select('*').eq('date', today)

  const { data: yestRows } = await supabase
    .from('sentiment_daily_summary').select('*').eq('date', yesterday)

  // Sample posts: most recent 9 per candidate (3 per sentiment type)
  const { data: samplePosts } = await supabase
    .from('sentiments')
    .select('candidate_id, text, sentiment, fetched_at')
    .gte('fetched_at', cutoff)
    .order('fetched_at', { ascending: false })

  return candidates.map((c) => {
    const td    = todayRows?.find((r) => r.candidate_id === c.id)
    const yd    = yestRows?.find((r) => r.candidate_id === c.id)
    const posts = samplePosts?.filter((p) => p.candidate_id === c.id) ?? []

    const total = td?.total_count ?? 0
    const pos   = td?.positive_count ?? 0
    const neg   = td?.negative_count ?? 0
    const neu   = td?.neutral_count  ?? 0
    const score = td?.sentiment_score ?? 0
    const trend = yd ? +(score - yd.sentiment_score).toFixed(3) : 0
    const conf: 'low' | 'medium' | 'high' =
      total < 20 ? 'low' : total < 100 ? 'medium' : 'high'

    // Detect cache hit: do we have fresh posts?
    const freshPosts = posts.filter((p) => p.fetched_at >= cutoff)
    const cacheHit   = freshPosts.length > 0

    return {
      candidate_id:        c.id,
      candidate_name:      c.name,
      candidate_slug:      c.slug,
      date:                today,
      positive_count: pos, negative_count: neg, neutral_count: neu, total_count: total,
      sentiment_score:      score,
      sentiment_score_norm: td?.sentiment_influence ?? normalizeSentimentScore(score),
      positive_pct: total ? Math.round((pos / total) * 100) : 0,
      negative_pct: total ? Math.round((neg / total) * 100) : 0,
      neutral_pct:  total ? Math.round((neu / total) * 100) : 0,
      trend,
      confidence: conf,
      cache_hit:   cacheHit,
      fetched_at:  posts[0]?.fetched_at ?? null,
      sample_positive: posts.filter((p) => p.sentiment === 'positive').slice(0, 3).map((p) => p.text),
      sample_negative: posts.filter((p) => p.sentiment === 'negative').slice(0, 3).map((p) => p.text),
    } as CandidateSentimentToday
  })
}

// ─── 7-day trend ─────────────────────────────────────────────────────────────
export async function getCandidateTrend(slug: string): Promise<CandidateSentimentTrend | null> {
  const supabase = publicClient()

  const { data: candidate } = await supabase
    .from('candidates').select('id, name, slug').eq('slug', slug).single()
  if (!candidate) return null

  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

  const { data: rows } = await supabase
    .from('sentiment_daily_summary')
    .select('*')
    .eq('candidate_id', candidate.id)
    .gte('date', sevenDaysAgo)
    .order('date', { ascending: true })

  return {
    candidate_id:   candidate.id,
    candidate_name: candidate.name,
    days: (rows ?? []).map((r) => ({
      date:            r.date,
      sentiment_score: r.sentiment_score,
      total_count:     r.total_count,
      positive_pct: r.total_count ? Math.round((r.positive_count / r.total_count) * 100) : 0,
      negative_pct: r.total_count ? Math.round((r.negative_count / r.total_count) * 100) : 0,
    })),
  }
}

// ─── Load stored blended score for a candidate ────────────────────────────────
export async function getStoredCandidateScore(candidateId: string) {
  const supabase = publicClient()
  const { data } = await supabase
    .from('candidate_scores')
    .select('*')
    .eq('candidate_id', candidateId)
    .single()
  return data ?? null
}
