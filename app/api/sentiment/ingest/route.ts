import { NextResponse } from 'next/server'
import { refreshSentimentData } from '@/lib/sentiment-aggregator'
import { createClient } from '@supabase/supabase-js'

async function ingestSimulatedPosts(candidateMap: Record<string, string>) {
  console.log('Simulating sentiment ingestion:', candidateMap)
  return Object.keys(candidateMap).length * 5
}

export async function POST(req: Request) {
  const auth = req.headers.get('x-admin-secret')
  if (auth !== process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-12)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data: candidates } = await supabase.from('candidates').select('id, slug')
  const candidateMap: Record<string, string> = {}
  const candidateIds: string[] = []
  for (const c of candidates ?? []) {
    candidateMap[c.slug] = c.id
    candidateIds.push(c.id)
  }
  const count = await ingestSimulatedPosts(candidateMap)
  const today = new Date().toISOString().split('T')[0]
  await aggregateDaily(today, candidateIds)
  return NextResponse.json({ ingested: count, aggregated_for: today })
}
