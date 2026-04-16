/**
 * POST /api/news/fetch
 *
 * Triggers the full news ingestion pipeline:
 *   1. Fetch real RSS feeds (BBC, Al Jazeera, Reuters Africa, Premium Times, Channels TV)
 *   2. Filter articles mentioning Tinubu, Peter Obi, or Atiku
 *   3. Deduplicate by title hash + URL
 *   4. Classify each article with Claude (haiku) → strength / weakness / controversy
 *   5. Transform to reason-style plain language
 *   6. Store in news_insights + news_articles tables
 *   7. Cleanup records older than 48 hours
 *
 * Auth: x-admin-secret header (last 12 chars of SUPABASE_SERVICE_ROLE_KEY)
 *
 * Cron: runs every 6 hours via vercel.json
 * { "path": "/api/news/fetch", "schedule": "0 * /6 * * *" }
 */

import { NextRequest, NextResponse } from 'next/server'
import { runNewsPipeline } from '@/lib/news-pipeline'

export const runtime     = 'nodejs'   // rss-parser requires Node.js runtime
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const secret   = req.headers.get('x-admin-secret')
  const expected = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-12)

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[/api/news/fetch] Pipeline triggered')
    const result = await runNewsPipeline()
    console.log('[/api/news/fetch] Pipeline complete:', JSON.stringify(result))

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/news/fetch] Pipeline error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint:             'POST /api/news/fetch',
    description:          'Triggers RSS ingestion → AI classification → Supabase storage',
    feeds:                ['BBC World', 'Al Jazeera', 'Reuters Africa', 'Premium Times', 'Channels TV'],
    candidate_filter:     ['tinubu', 'peter obi', 'atiku'],
    max_articles_per_run: 20,
    ttl_hours:            48,
    cron_schedule:        '0 */6 * * * (every 6 hours)',
    auth:                 'x-admin-secret header required',
  })
}
