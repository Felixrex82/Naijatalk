/**
 * Full news ingestion pipeline.
 * Orchestrates: fetch → filter → dedup → classify → transform → store → cleanup
 *
 * Entry point: runNewsPipeline()
 * Called by: POST /api/news/fetch  or  cron job
 */

import { createClient } from '@supabase/supabase-js'
import { fetchNewsArticles, titleHash } from './news-fetcher'
import { classifyArticle } from './news-classifier'
import { FetchResult } from '@/types/news'

const INSIGHTS_TTL_HOURS = 48

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── Step 5: Check if article URL already processed ────────────────────────────
async function isAlreadyProcessed(link: string): Promise<boolean> {
  const supabase = publicClient()
  const cleanLink = link.split('?')[0]
  const { count } = await supabase
    .from('news_articles')
    .select('id', { count: 'exact', head: true })
    .eq('link', cleanLink)
  return (count ?? 0) > 0
}

// ── Step 5: Store raw article ─────────────────────────────────────────────────
async function storeArticle(article: {
  title: string; link: string; summary: string | null
  source: string; published_at: string | null; title_hash: string
}): Promise<string | null> {
  const supabase = adminClient()
  const { data, error } = await supabase
    .from('news_articles')
    .insert({
      title:        article.title,
      summary:      article.summary,
      link:         article.link.split('?')[0],
      source:       article.source,
      published_at: article.published_at || null,
      fetched_at:   new Date().toISOString(),
      title_hash:   article.title_hash,
    })
    .select('id')
    .single()

  if (error) {
    // Unique constraint violation = already exists, not a real error
    if (error.code === '23505') return null
    console.error('[news-pipeline] storeArticle error:', error.message)
    return null
  }
  return data?.id ?? null
}

// ── Step 8: Store classified insight ─────────────────────────────────────────
async function storeInsight(params: {
  candidateId: string
  articleId: string | null
  type: 'strength' | 'weakness' | 'controversy'
  title: string
  summary: string
  source: string
  sourceUrl: string
  confidenceScore: number
}): Promise<boolean> {
  const supabase = adminClient()
  const { error } = await supabase.from('news_insights').insert({
    candidate_id:     params.candidateId,
    article_id:       params.articleId,
    type:             params.type,
    title:            params.title,
    summary:          params.summary,
    source:           params.source,
    source_url:       params.sourceUrl,
    confidence_score: params.confidenceScore,
    created_at:       new Date().toISOString(),
  })
  if (error) {
    console.error('[news-pipeline] storeInsight error:', error.message)
    return false
  }
  return true
}

// ── Step 9: Cleanup old records ───────────────────────────────────────────────
async function cleanupOldNews(): Promise<number> {
  const supabase = adminClient()
  const cutoff = new Date(Date.now() - INSIGHTS_TTL_HOURS * 3600 * 1000).toISOString()

  const { count: insightCount } = await supabase
    .from('news_insights')
    .delete({ count: 'exact' })
    .lt('created_at', cutoff)

  const { count: articleCount } = await supabase
    .from('news_articles')
    .delete({ count: 'exact' })
    .lt('fetched_at', cutoff)

  return (insightCount ?? 0) + (articleCount ?? 0)
}

// ── Candidate slug → ID map ───────────────────────────────────────────────────
async function getCandidateIdMap(): Promise<Map<string, string>> {
  const supabase = publicClient()
  const { data } = await supabase.from('candidates').select('id, slug')
  const map = new Map<string, string>()
  for (const c of data ?? []) {
    map.set(c.slug, c.id)
    // Also map short keys used by classifier
    if (c.slug === 'peter-obi') map.set('obi', c.id)
    if (c.slug === 'tinubu')    map.set('tinubu', c.id)
    if (c.slug === 'atiku')     map.set('atiku', c.id)
  }
  return map
}

// ── Main pipeline ─────────────────────────────────────────────────────────────
export async function runNewsPipeline(): Promise<FetchResult & { errors: string[] }> {
  const candidateMap = await getCandidateIdMap()

  // Step 2-4: Fetch, filter, deduplicate
  const { articles, filtered, errors } = await fetchNewsArticles()

  let classified = 0
  let stored = 0
  let skipped_low_confidence = 0

  // Process each filtered article
  for (const article of filtered) {
    try {
      // Step 5: Check deduplication against DB
      const alreadyDone = await isAlreadyProcessed(article.link)
      if (alreadyDone) continue

      // Step 6: Classify + transform
      const result = await classifyArticle(article)

      if (!result) {
        skipped_low_confidence++
        continue
      }

      // Step 7: Validate confidence
      if (result.confidence_score < 6) {
        skipped_low_confidence++
        continue
      }

      classified++

      // Step 5: Store raw article
      const articleId = await storeArticle({
        title:        article.title,
        link:         article.link,
        summary:      article.contentSnippet ?? article.description ?? null,
        source:       article.source,
        published_at: article.pubDate ?? null,
        title_hash:   titleHash(article.title),
      })

      // Step 8: Store insight
      const candidateId = candidateMap.get(result.candidate)
      if (!candidateId) continue

      const ok = await storeInsight({
        candidateId,
        articleId,
        type:            result.type,
        title:           result.title,
        summary:         result.summary,
        source:          article.source,
        sourceUrl:       article.link,
        confidenceScore: result.confidence_score,
      })

      if (ok) stored++
    } catch (err) {
      errors.push(`Article "${article.title.slice(0, 40)}": ${(err as Error).message}`)
    }
  }

  // Step 9: Cleanup
  const cleanup_deleted = await cleanupOldNews()

  return {
    fetched:               articles.length,
    filtered:              filtered.length,
    deduplicated:          filtered.length,
    classified,
    stored,
    skipped_low_confidence,
    cleanup_deleted,
    errors,
  }
}

// ── Step 11: Get latest insights (for UI + API) ───────────────────────────────
export async function getLatestInsights(options?: {
  candidateId?: string
  type?: 'strength' | 'weakness' | 'controversy'
  limit?: number
  hoursBack?: number
}) {
  const supabase = publicClient()
  const hoursBack = options?.hoursBack ?? 48
  const cutoff = new Date(Date.now() - hoursBack * 3600 * 1000).toISOString()

  let query = supabase
    .from('news_insights')
    .select(`
      id, candidate_id, type, title, summary, source, source_url,
      confidence_score, created_at,
      candidates ( name, slug, party )
    `)
    .gte('created_at', cutoff)
    .order('created_at', { ascending: false })
    .limit(options?.limit ?? 50)

  if (options?.candidateId) query = query.eq('candidate_id', options.candidateId)
  if (options?.type)        query = query.eq('type', options.type)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// ── Step 10: Merge insights into claims-style objects for scoring ─────────────
export async function getInsightsAsClaims(candidateId: string) {
  const insights = await getLatestInsights({ candidateId, hoursBack: 24 })

  // Map to claim-compatible shape for scoring
  return insights.map((ins) => ({
    id:               ins.id,
    candidate_id:     ins.candidate_id,
    type:             ins.type as 'strength' | 'weakness' | 'controversy',
    title:            ins.title,
    description:      ins.summary,
    category:         'governance' as const,  // default category for news
    credibility_score: ins.confidence_score,
    weight:           2,                      // lower weight than seeded claims
    read_more_url:    ins.source_url,
    created_at:       ins.created_at,
    proof_links:      [{ id: ins.id, claim_id: ins.id, title: ins.source, url: ins.source_url }],
    from_news:        true,
  }))
}
