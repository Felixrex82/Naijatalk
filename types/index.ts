export type ClaimType = 'strength' | 'weakness' | 'controversy'

export type Category =
  | 'economy'
  | 'governance'
  | 'corruption'
  | 'education'
  | 'security'
  | 'infrastructure'
  | 'foreign-policy'
  | 'health'
  | 'democracy'
  | 'social'

export interface ProofLink {
  id: string
  claim_id: string
  title: string
  url: string
}

export interface Claim {
  id: string
  candidate_id: string
  type: ClaimType
  title: string
  description: string
  category: Category
  credibility_score: number // 1-10
  weight: number            // 1-5
  read_more_url?: string
  created_at: string
  proof_links: ProofLink[]
}

export interface Candidate {
  id: string
  name: string
  slug: string
  description: string
  party: string
  age: number
  state_of_origin: string
  image_url: string
  claims: Claim[]
}

export interface CandidateScore {
  // Claim-derived sub-scores (0-10 each)
  strength_score: number
  weakness_score: number
  controversy_score: number
  // Blended final score
  claim_score: number          // 0-100, from claims only
  sentiment_score_norm: number // 0-100, from sentiment (50 = neutral)
  final_score: number          // 0-100, blended
  data_source: 'claims_only' | 'blended'
  last_sentiment_update: string | null
}

export interface ComparisonResult {
  candidateA: Candidate & CandidateScore
  candidateB: Candidate & CandidateScore
  winner: string
  category_breakdown: Record<Category, { a: number; b: number }>
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
}

export interface QuizOption {
  id: string
  text: string
  weights: Partial<Record<string, number>>
}

export interface QuizResult {
  alignments: Record<string, number>
  best_match: string
}

export interface DatabaseCandidate {
  id: string
  name: string
  slug: string
  description: string
  party: string
  age: number
  state_of_origin: string
  image_url: string
}

export interface DatabaseClaim {
  id: string
  candidate_id: string
  type: ClaimType
  title: string
  description: string
  category: Category
  credibility_score: number
  weight: number
  read_more_url?: string
  created_at: string
}

export interface DatabaseProofLink {
  id: string
  claim_id: string
  title: string
  url: string
}
