import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET() {
  const supabase = getAdmin()
  const { data, error } = await supabase.from('candidates').select('*').order('name')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, slug, party, age, state_of_origin, description, image_url } = body

  if (!name || !slug || !party) {
    return NextResponse.json({ error: 'name, slug, and party are required' }, { status: 400 })
  }

  const supabase = getAdmin()
  const { data, error } = await supabase
    .from('candidates')
    .insert({ name, slug, party, age, state_of_origin, description, image_url })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
