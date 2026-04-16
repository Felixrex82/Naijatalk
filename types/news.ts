export interface NewsArticle {
  id: string
  title: string
  summary: string | null
  link: string
  source: string
  published_at: string | null
  fetched_at: string
  title_hash: string | null
}

export interface NewsInsight {
  id: string
  candidate_id: string
  article_id: string | null
  type: 'strength' | 'weakness' | 'controversy'
  title: string          // reason-style: max 8–10 words
  summary: string        // reason-style: 1–2 plain sentences
  source: string
  source_url: string
  confidence_score: number  // 1–10
  created_at: string
}

export interface RawArticle {
  title: string
  link: string
  contentSnippet?: string
  description?: string
  pubDate?: string
  source: string
}

export interface ClassificationResult {
  candidate: 'tinubu' | 'obi' | 'atiku' | 'none'
  type: 'strength' | 'weakness' | 'controversy'
  title: string        // reason-style after transformation
  summary: string      // reason-style after transformation
  confidence_score: number
  raw_summary: string  // before transformation
}

export interface FetchResult {
  fetched: number
  filtered: number
  deduplicated: number
  classified: number
  stored: number
  skipped_low_confidence: number
  cleanup_deleted: number
}

export type CandidateSlug = 'tinubu' | 'peter-obi' | 'atiku'
