export type SentimentLabel = 'positive' | 'negative' | 'neutral'

export interface SentimentPost {
  id: string
  candidate_id: string
  text: string
  sentiment: SentimentLabel
  source: string
  score: number | null
  fetched_at: string   // ← NEW: cache timestamp
  created_at: string
}

export interface SentimentDailySummary {
  id: string
  candidate_id: string
  date: string
  positive_count: number
  negative_count: number
  neutral_count: number
  total_count: number
  sentiment_score: number      // -1 to +1
  sentiment_influence: number  // 0-100 normalized  ← NEW
  created_at: string
}

export interface CandidateScore {
  candidate_id: string
  claim_score: number           // 0-100 from claims
  sentiment_score_raw: number   // -1 to +1
  sentiment_score_norm: number  // 0-100 normalized
  final_score: number           // 0-100 blended
  sentiment_weight: number      // default 0.3
  claim_weight: number          // default 0.7
  data_source: 'claims_only' | 'blended'
  last_sentiment_update: string | null
  computed_at: string
}

export interface CandidateSentimentToday {
  candidate_id: string
  candidate_name: string
  candidate_slug: string
  date: string
  positive_count: number
  negative_count: number
  neutral_count: number
  total_count: number
  sentiment_score: number       // -1 to +1
  sentiment_score_norm: number  // 0-100  ← NEW
  positive_pct: number
  negative_pct: number
  neutral_pct: number
  trend: number
  confidence: 'low' | 'medium' | 'high'
  cache_hit: boolean            // ← NEW: was this served from cache?
  fetched_at: string | null     // ← NEW: when data was last fetched
  sample_positive: string[]
  sample_negative: string[]
}

export interface CandidateSentimentTrend {
  candidate_id: string
  candidate_name: string
  days: Array<{
    date: string
    sentiment_score: number
    total_count: number
    positive_pct: number
    negative_pct: number
  }>
}

export interface SentimentCacheStatus {
  candidate_id: string
  has_fresh_data: boolean
  last_fetched: string | null
  post_count: number
}

export interface RefreshResult {
  ingested: number
  aggregated_for: string
  candidates_processed: number
  scores_updated: number
  cleanup_deleted: number
}
