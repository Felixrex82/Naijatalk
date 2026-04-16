import { CANDIDATES_SEED, CLAIMS_SEED } from './seed-data'

// helper: build full candidate object
function buildCandidate(candidate: any) {
  const claims = CLAIMS_SEED.filter(
    (c) => c.candidate_slug === candidate.slug
  )

  return {
    ...candidate,
    claims,
  }
}

// ─── GET ALL ─────────────────────────────────────────────
export async function getAllCandidates() {
  return CANDIDATES_SEED.map(buildCandidate)
}

// ─── GET ONE (THIS WAS MISSING) ──────────────────────────
export async function getCandidateBySlug(slug: string) {
  const candidate = CANDIDATES_SEED.find((c) => c.slug === slug)
  if (!candidate) return null

  return buildCandidate(candidate)
}