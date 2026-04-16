import { Claim, CandidateScore, Category } from '@/types'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CLAIM_WEIGHT = 0.70
const SENTIMENT_WEIGHT = 0.30

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function avgWtCred(claims: Claim[]): number {
  if (!claims || claims.length === 0) return 0

  const sum = claims.reduce(
    (acc, c) => acc + (c.weight || 0) * (c.credibility_score || 0),
    0
  )

  return sum / claims.length / 5 // normalize to 0–10
}

// ─── CLAIM SCORE ──────────────────────────────────────────────────────────────
export function computeClaimScore(claims: Claim[] = []) {
  const strengths = claims.filter((c) => c.type === 'strength')
  const weaknesses = claims.filter((c) => c.type === 'weakness')
  const controversies = claims.filter((c) => c.type === 'controversy')

  const strength_score = +avgWtCred(strengths).toFixed(2)
  const weakness_score = +avgWtCred(weaknesses).toFixed(2)
  const controversy_score = +avgWtCred(controversies).toFixed(2)

  const raw =
    (strength_score / 10) * 50 -
    (weakness_score / 10) * 30 -
    (controversy_score / 10) * 20

  const claim_score = +Math.max(0, Math.min(100, raw + 50)).toFixed(2)

  return {
    strength_score,
    weakness_score,
    controversy_score,
    claim_score,
  }
}

// ─── SENTIMENT ────────────────────────────────────────────────────────────────
export function normalizeSentimentScore(sentimentRaw: number): number {
  if (sentimentRaw === null || sentimentRaw === undefined) return 50

  // -1 → 0, 0 → 50, +1 → 100
  return +((sentimentRaw + 1) * 50).toFixed(2)
}

// ─── FINAL SCORE ─────────────────────────────────────────────────────────────
export function computeCandidateScore(
  claims: Claim[] = [],
  sentimentRaw?: number | null,
  lastSentimentUpdate?: string | null
): CandidateScore {
  const {
    strength_score,
    weakness_score,
    controversy_score,
    claim_score,
  } = computeClaimScore(claims)

  // sentiment available → blended score
  if (sentimentRaw !== null && sentimentRaw !== undefined) {
    const sentiment_score_norm = normalizeSentimentScore(sentimentRaw)

    const final_score = +(
      claim_score * CLAIM_WEIGHT +
      sentiment_score_norm * SENTIMENT_WEIGHT
    ).toFixed(1)

    return {
      strength_score,
      weakness_score,
      controversy_score,
      claim_score,
      sentiment_score_norm,
      final_score,
      data_source: 'blended',
      last_sentiment_update: lastSentimentUpdate ?? null,
    }
  }

  // fallback: claims only
  return {
    strength_score,
    weakness_score,
    controversy_score,
    claim_score,
    sentiment_score_norm: 50,
    final_score: +claim_score.toFixed(1),
    data_source: 'claims_only',
    last_sentiment_update: null,
  }
}

// ─── CATEGORY BREAKDOWN ───────────────────────────────────────────────────────
export function getCategoryBreakdown(
  claimsA: Claim[],
  claimsB: Claim[]
): Record<string, { a: number; b: number }> {
  const categories: Category[] = [
    'economy',
    'governance',
    'corruption',
    'education',
    'security',
    'infrastructure',
    'foreign-policy',
    'health',
    'democracy',
    'social',
  ]

  const avgForCategory = (claims: Claim[], cat: Category) => {
    const filtered = claims.filter((c) => c.category === cat)
    if (!filtered.length) return 0

    return +(
      filtered.reduce((s, c) => s + (c.credibility_score || 0), 0) /
      filtered.length
    ).toFixed(2)
  }

  return Object.fromEntries(
    categories
      .map((cat) => [
        cat,
        {
          a: avgForCategory(claimsA, cat),
          b: avgForCategory(claimsB, cat),
        },
      ])
      .filter(([, v]) => v.a > 0 || v.b > 0)
  )
}

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
export function getScoreColor(score: number, max = 10): string {
  const ratio = score / max
  if (ratio >= 0.7) return 'text-emerald-400'
  if (ratio >= 0.4) return 'text-amber-400'
  return 'text-red-400'
}

export function getScoreBg(score: number, max = 10): string {
  const ratio = score / max
  if (ratio >= 0.7) return 'bg-emerald-400'
  if (ratio >= 0.4) return 'bg-amber-400'
  return 'bg-red-400'
}