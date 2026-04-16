/**
 * RSS News Fetcher
 *
 * Uses rss-parser (npm install rss-parser) to fetch and parse real RSS feeds.
 * No mock data. No simulation. Every article comes from a live feed.
 *
 * Runtime: Node.js only (not edge — rss-parser requires Node.js APIs).
 */

import Parser from 'rss-parser'
import { RSS_FEEDS, ALL_CANDIDATE_KEYWORDS, CANDIDATE_KEYWORDS } from './news-sources'
import { RawArticle } from '@/types/news'
import crypto from 'crypto'

// ── rss-parser instance ───────────────────────────────────────────────────────
const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Nigeria2027PoliticalCompass/1.0 (+https://nigeria2027.vercel.app)',
    'Accept':     'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: [
      ['media:description', 'mediaDescription'],
      ['content:encoded',   'contentEncoded'],
      ['dc:description',    'dcDescription'],
    ],
  },
})

// ── Keyword filtering ─────────────────────────────────────────────────────────
export function articleMentionsCandidate(text: string): boolean {
  const lower = text.toLowerCase()
  return ALL_CANDIDATE_KEYWORDS.some((kw) => lower.includes(kw))
}

export function detectCandidateInText(
  text: string
): 'tinubu' | 'obi' | 'atiku' | 'none' {
  const lower = text.toLowerCase()
  for (const [slug, keywords] of Object.entries(CANDIDATE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return slug as 'tinubu' | 'obi' | 'atiku'
    }
  }
  return 'none'
}

// ── Deduplication ─────────────────────────────────────────────────────────────
export function titleHash(title: string): string {
  const normalised = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return crypto.createHash('md5').update(normalised).digest('hex').slice(0, 16)
}

export function deduplicateArticles(articles: RawArticle[]): RawArticle[] {
  const seen = new Set<string>()
  const result: RawArticle[] = []
  for (const a of articles) {
    const hash   = titleHash(a.title)
    const urlKey = a.link.split('?')[0]
    if (!seen.has(hash) && !seen.has(urlKey)) {
      seen.add(hash)
      seen.add(urlKey)
      result.push(a)
    }
  }
  return result
}

// ── Extract best text snippet from a parsed item ──────────────────────────────
function extractSnippet(item: Record<string, any>): string {
  const raw =
    item.contentEncoded   ||
    item.mediaDescription ||
    item.dcDescription    ||
    item.contentSnippet   ||
    item.content          ||
    item.summary          ||
    ''

  return raw
    .replace(/<[^>]+>/g, ' ')   // strip HTML tags
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600)
}

// ── Main fetch function ───────────────────────────────────────────────────────
export async function fetchNewsArticles(): Promise<{
  articles:  RawArticle[]
  filtered:  RawArticle[]
  errors:    string[]
}> {
  const enabledFeeds = RSS_FEEDS.filter((f) => f.enabled)
  const allArticles: RawArticle[] = []
  const errors: string[] = []

  console.log(`[news-fetcher] Starting fetch from ${enabledFeeds.length} feeds`)

  // Fetch all feeds in parallel, each with its own timeout
  const results = await Promise.allSettled(
    enabledFeeds.map(async (feed) => {
      console.log(`[news-fetcher] Fetching: ${feed.name}  ${feed.url}`)

      const feedData = await parser.parseURL(feed.url)

      const articles: RawArticle[] = feedData.items
        .filter((item) => item.title && item.link)
        .map((item) => ({
          title:          item.title!.trim(),
          link:           item.link!.trim(),
          contentSnippet: extractSnippet(item as any),
          description:    extractSnippet(item as any),
          pubDate:        item.pubDate ?? item.isoDate ?? undefined,
          source:         feed.name,
        }))

      console.log(`[news-fetcher] ${feed.name}: ${articles.length} articles fetched`)
      return articles
    })
  )

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.status === 'fulfilled') {
      allArticles.push(...result.value)
    } else {
      const msg = `${enabledFeeds[i].name}: ${result.reason?.message ?? String(result.reason)}`
      errors.push(msg)
      console.error(`[news-fetcher] Feed failed — ${msg}`)
    }
  }

  console.log(`[news-fetcher] Total raw articles across all feeds: ${allArticles.length}`)

  // Filter by candidate keywords
  const candidateFiltered = allArticles.filter((a) => {
    const text = `${a.title} ${a.contentSnippet ?? ''}`
    return articleMentionsCandidate(text)
  })
  console.log(`[news-fetcher] After candidate keyword filter: ${candidateFiltered.length}`)

  // Deduplicate by title hash + URL
  const deduped = deduplicateArticles(candidateFiltered)
  console.log(`[news-fetcher] After deduplication: ${deduped.length}`)

  // Log every passing article for debugging
  deduped.forEach((a, idx) => {
    console.log(
      `[news-fetcher] [${idx + 1}/${deduped.length}] [${a.source}] "${a.title.slice(0, 90)}"`
    )
  })

  // Limit to 20 per run to control AI classification costs
  const limited = deduped.slice(0, 20)
  if (deduped.length > 20) {
    console.log(`[news-fetcher] Capped at 20 articles (${deduped.length - 20} discarded)`)
  }

  return { articles: allArticles, filtered: limited, errors }
}
