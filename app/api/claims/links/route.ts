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
  const { claim_id, title, url } = body

  if (!claim_id || !title || !url) {
    return NextResponse.json({ error: 'claim_id, title, and url are required' }, { status: 400 })
  }

  const supabase = getAdmin()
  const { data, error } = await supabase
    .from('proof_links')
    .insert({ claim_id, title, url })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
