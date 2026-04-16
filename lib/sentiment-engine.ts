/**
 * Sentiment classification engine.
 * Primary: Anthropic Claude API (with web search disabled — classification only)
 * Fallback: keyword-based classifier
 * Structure allows any LLM or NLP library to be swapped in.
 */

export type SentimentLabel = 'positive' | 'negative' | 'neutral'

export interface ClassificationResult {
  sentiment: SentimentLabel
  score: number   // -1.0 (very negative) to +1.0 (very positive)
  method: 'ai' | 'keyword'
}

// ── Keyword fallback ────────────────────────────────────────────────────────
const POSITIVE_KEYWORDS = [
  'great','excellent','good','brilliant','outstanding','impressive','best',
  'strong','success','achieve','reform','build','improve','deliver','vision',
  'integrity','honest','courage','progress','support','vote','proud','hope',
  'leader','clean','transparent','trust','development','invest','grow',
]
const NEGATIVE_KEYWORDS = [
  'corrupt','bad','failure','fraud','steal','loot','scandal','controversy',
  'shame','disappointment','poor','worse','terrible','criminal','illegal',
  'incompetent','useless','waste','suffer','pain','hunger','inflation','crisis',
  'reject','disqualify','unfit','drug','forgery','allegation','investigation',
  'bribe','money laundering','conflict of interest','hypocrisy',
]

export function keywordClassify(text: string, candidateName: string): ClassificationResult {
  const lower = text.toLowerCase()
  let posScore = 0
  let negScore = 0

  for (const kw of POSITIVE_KEYWORDS) {
    if (lower.includes(kw)) posScore++
  }
  for (const kw of NEGATIVE_KEYWORDS) {
    if (lower.includes(kw)) negScore++
  }

  const total = posScore + negScore
  const raw = total === 0 ? 0 : (posScore - negScore) / total
  const score = Math.max(-1, Math.min(1, raw))

  const sentiment: SentimentLabel =
    score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral'

  return { sentiment, score: +score.toFixed(3), method: 'keyword' }
}

// ── Anthropic Claude classifier ─────────────────────────────────────────────
export async function aiClassify(
  text: string,
  candidateName: string
): Promise<ClassificationResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return keywordClassify(text, candidateName)

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 20,
        system: `Classify the sentiment of a social media post towards a Nigerian political candidate.
Reply with ONLY one word: positive, negative, or neutral.
Do not add any explanation or punctuation.`,
        messages: [{
          role: 'user',
          content: `Candidate: ${candidateName}\nPost: "${text}"\nSentiment:`,
        }],
      }),
    })

    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    const raw = data.content?.[0]?.text?.trim().toLowerCase() ?? ''
    const sentiment: SentimentLabel =
      raw === 'positive' ? 'positive' : raw === 'negative' ? 'negative' : 'neutral'
    const score = sentiment === 'positive' ? 0.7 : sentiment === 'negative' ? -0.7 : 0.0

    return { sentiment, score, method: 'ai' }
  } catch {
    return keywordClassify(text, candidateName)
  }
}

// ── Batch classifier (rate-limited) ─────────────────────────────────────────
export async function classifyBatch(
  posts: Array<{ text: string; candidateName: string }>
): Promise<ClassificationResult[]> {
  const results: ClassificationResult[] = []
  for (const post of posts) {
    // Use keyword for speed in batch; swap to aiClassify for higher accuracy
    results.push(keywordClassify(post.text, post.candidateName))
    // Small delay to be respectful if using real API
    await new Promise((r) => setTimeout(r, 10))
  }
  return results
}
