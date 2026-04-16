import { NextRequest, NextResponse } from 'next/server'
import { getCandidateTrend } from '@/lib/sentiment-aggregator'

export const revalidate = 3600

export async function GET(
  _req: NextRequest,
  { params }: { params: { candidate: string } }
) {
  try {
    const trend = await getCandidateTrend(params.candidate)
    if (!trend) return NextResponse.json({ error: 'Candidate not found' }, { status: 404 })
    return NextResponse.json({ data: trend, generated_at: new Date().toISOString() }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
