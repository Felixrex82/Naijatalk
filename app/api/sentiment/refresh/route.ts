import { NextRequest, NextResponse } from 'next/server'
import { refreshSentimentData } from '@/lib/sentiment-aggregator'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const secret   = req.headers.get('x-admin-secret')
  const expected = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-12)
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const result = await refreshSentimentData()
    return NextResponse.json({ success: true, ...result, timestamp: new Date().toISOString() })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/sentiment/refresh',
    method: 'POST',
    description: 'Full sentiment refresh: ingest → aggregate → blend scores → cleanup',
    cache_window_hours: 6,
    cleanup_after_hours: 48,
    cron_ready: true,
    cron_example: '{ "crons": [{ "path": "/api/sentiment/refresh", "schedule": "0 6 * * *" }] }',
  })
}
