import { NextResponse } from 'next/server'
import { getTodaySummary } from '@/lib/sentiment-aggregator'

export const revalidate = 3600

export async function GET() {
  try {
    const data = await getTodaySummary()
    return NextResponse.json(
      { data, generated_at: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' } }
    )
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
