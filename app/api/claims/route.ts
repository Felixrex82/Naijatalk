import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { candidate_id, type, title, description, category, credibility_score, weight } = body

  if (!candidate_id || !type || !title || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!['strength', 'weakness', 'controversy'].includes(type)) {
    return NextResponse.json({ error: 'type must be strength | weakness | controversy' }, { status: 400 })
  }

  const supabase = getAdmin()
  const { data, error } = await supabase
    .from('claims')
    .insert({ candidate_id, type, title, description, category, credibility_score, weight })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
