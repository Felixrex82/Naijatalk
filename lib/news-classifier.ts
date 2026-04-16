/**
 * Step 6 + Part 17: AI Classification + Reason-Style Transformation
 *
 * Two-step process per article:
 *   1. Classify: candidate, type, confidence, raw summary
 *   2. Transform: rewrite into reason-style (short, plain, human, neutral)
 *
 * STRICT CONTROL: AI only classifies and summarises — never invents facts.
 * All facts come from the article text provided.
 */

import { RawArticle, ClassificationResult } from '@/types/news'
import { detectCandidateInText } from './news-fetcher'

const MIN_CONFIDENCE = 6  // Step 7: reject below this

// ── Part 17: transformToReasonStyle ──────────────────────────────────────────
export async function transformToReasonStyle(
  rawTitle: string,
  rawSummary: string
): Promise<{ title: string; description: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Fallback: truncate mechanically
    return {
      title: rawTitle.split(' ').slice(0, 8).join(' '),
      description: rawSummary.split('. ').slice(0, 2).join('. ').slice(0, 200),
    }
  }

  const prompt = `Rewrite this into a clean, simple insight a citizen could read in 3 seconds.

Rules:
- Title: max 8 words, plain English, no jargon, no exaggeration
- Description: 1-2 short sentences, everyday language, neutral and factual
- Do NOT add information that is not in the input
- Do NOT use: "significantly", "notably", "it is worth mentioning", or similar filler
- Sound like a clear-headed person explaining the news simply, not an AI

Return ONLY valid JSON with exactly two fields: title and description.

Input:
Title: ${rawTitle}
Summary: ${rawSummary}`

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
        max_tokens: 200,
        system: 'You are a plain-language editor. Return only valid JSON.',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    const text = data.content?.[0]?.text?.trim() ?? ''
    const cleaned = text.replace(/^```json?\s*/i, '').replace(/```$/i, '').trim()
    const parsed = JSON.parse(cleaned)

    // Quality check: reject if too long or clearly unprocessed
    if (
      typeof parsed.title === 'string' &&
      typeof parsed.description === 'string' &&
      parsed.title.split(' ').length <= 12 &&
      parsed.description.length <= 300
    ) {
      return { title: parsed.title, description: parsed.description }
    }
  } catch {
    // Fall through to mechanical fallback
  }

  // Mechanical fallback
  return {
    title: rawTitle.split(' ').slice(0, 8).join(' '),
    description: rawSummary.split('. ').slice(0, 2).join('. ').slice(0, 200),
  }
}

// ── Step 6: Main classification ───────────────────────────────────────────────
export async function classifyArticle(
  article: RawArticle
): Promise<ClassificationResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const articleText = `${article.title}\n\n${article.contentSnippet ?? article.description ?? ''}`

  // Pre-filter: must mention a candidate
  const preDetected = detectCandidateInText(articleText)
  if (preDetected === 'none') return null

  if (!apiKey) {
    // Keyword-only fallback (no AI)
    return keywordFallbackClassify(article, preDetected)
  }

  const classifyPrompt = `You are analysing a real news article about Nigerian politics.

Your task:
1. Identify which candidate this article is PRIMARILY about (tinubu, obi, atiku, or none)
2. Classify it as ONE of: strength, weakness, controversy
3. Write a short factual summary (max 2 sentences, use ONLY facts from the article)
4. Rate your confidence (1-10, where 10 = very clear classification)

CRITICAL RULES:
- Do NOT invent any facts
- Use ONLY information from the article text provided
- If the article is not clearly about politics or these candidates, return candidate: "none"
- "strength" = positive achievement, policy success, endorsement, good governance
- "weakness" = failure, policy shortcoming, poor execution, loss, criticism
- "controversy" = scandal, allegation, legal issue, corruption, ethical violation

Article:
${articleText.slice(0, 1500)}

Return ONLY valid JSON with these exact fields:
{
  "candidate": "tinubu" | "obi" | "atiku" | "none",
  "type": "strength" | "weakness" | "controversy",
  "raw_summary": "your 2-sentence factual summary",
  "confidence_score": 1-10
}`

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
        max_tokens: 300,
        system: 'You are a Nigerian political news classifier. Return only valid JSON.',
        messages: [{ role: 'user', content: classifyPrompt }],
      }),
    })

    if (!res.ok) throw new Error(`Classification API ${res.status}`)
    const data = await res.json()
    const text = data.content?.[0]?.text?.trim() ?? ''
    const cleaned = text.replace(/^```json?\s*/i, '').replace(/```$/i, '').trim()
    const parsed = JSON.parse(cleaned)

    // Step 7: Validate
    if (
      !parsed.candidate ||
      parsed.candidate === 'none' ||
      !['tinubu','obi','atiku'].includes(parsed.candidate) ||
      !['strength','weakness','controversy'].includes(parsed.type) ||
      (parsed.confidence_score ?? 0) < MIN_CONFIDENCE
    ) {
      return null
    }

    // Step: Transform to reason-style
    const transformed = await transformToReasonStyle(
      article.title,
      parsed.raw_summary ?? ''
    )

    return {
      candidate: parsed.candidate,
      type: parsed.type,
      title: transformed.title,
      summary: transformed.description,
      confidence_score: Math.min(10, Math.max(1, parsed.confidence_score)),
      raw_summary: parsed.raw_summary ?? '',
    }
  } catch {
    // Fallback to keyword classifier
    return keywordFallbackClassify(article, preDetected)
  }
}

// ── Keyword-only fallback (no AI dependency) ──────────────────────────────────
function keywordFallbackClassify(
  article: RawArticle,
  candidate: 'tinubu' | 'obi' | 'atiku'
): ClassificationResult {
  const text = `${article.title} ${article.contentSnippet ?? ''}`.toLowerCase()

  const controversyWords = ['scandal','arrest','corruption','bribe','fraud','allegation','court','lawsuit','impeach','resign','drug','forfeiture']
  const weaknessWords    = ['fail','crisis','poor','decline','loss','defeat','problem','concern','criticis','protest','hunger','inflation','insecure']
  const strengthWords    = ['success','win','achieve','build','reform','approve','invest','grow','deliver','progress','commend','endorse']

  let type: 'strength' | 'weakness' | 'controversy' = 'weakness'
  if (controversyWords.some((w) => text.includes(w))) type = 'controversy'
  else if (strengthWords.some((w) => text.includes(w))) type = 'strength'

  const raw = article.contentSnippet?.slice(0, 200) ?? article.title

  return {
    candidate,
    type,
    title: article.title.split(' ').slice(0, 8).join(' '),
    summary: raw,
    confidence_score: 6,  // minimum passing score
    raw_summary: raw,
  }
}
