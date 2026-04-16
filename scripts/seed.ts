/**
 * Seed script — populates Supabase with verified candidate data.
 * Run: npx ts-node --project tsconfig.json scripts/seed.ts
 * Or:  npx tsx scripts/seed.ts
 *
 * Requires environment variables in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { CANDIDATES_SEED, CLAIMS_SEED } from '../lib/seed-data'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('🌱 Starting seed...\n')

  // 1. Insert candidates
  const { data: insertedCandidates, error: candErr } = await supabase
    .from('candidates')
    .upsert(CANDIDATES_SEED, { onConflict: 'slug' })
    .select()

  if (candErr) {
    console.error('❌ Candidates error:', candErr.message)
    process.exit(1)
  }

  const slugToId: Record<string, string> = {}
  for (const c of insertedCandidates!) {
    slugToId[c.slug] = c.id
    console.log(`  ✓ Candidate: ${c.name} (${c.id})`)
  }

  // 2. Insert claims + proof links
  for (const claimData of CLAIMS_SEED) {
    const candidateId = slugToId[claimData.candidate_slug]
    if (!candidateId) {
      console.warn(`  ⚠ No candidate found for slug: ${claimData.candidate_slug}`)
      continue
    }

    const { proof_links, candidate_slug, ...claimFields } = claimData

    const { data: insertedClaim, error: claimErr } = await supabase
      .from('claims')
      .insert({ ...claimFields, candidate_id: candidateId })
      .select()
      .single()

    if (claimErr) {
      console.error(`  ❌ Claim "${claimData.title}": ${claimErr.message}`)
      continue
    }

    console.log(`  ✓ Claim: [${claimData.type}] ${claimData.title}`)

    // Insert proof links
    if (proof_links.length > 0) {
      const links = proof_links.map((l) => ({ ...l, claim_id: insertedClaim.id }))
      const { error: linkErr } = await supabase.from('proof_links').insert(links)
      if (linkErr) {
        console.error(`    ❌ Links error: ${linkErr.message}`)
      } else {
        console.log(`    → ${links.length} proof link(s) added`)
      }
    }
  }

  console.log('\n✅ Seed complete.')
  process.exit(0)
}

seed().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
