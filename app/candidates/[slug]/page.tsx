import { notFound } from 'next/navigation'
import { getCandidateBySlug, getAllCandidates } from '@/lib/data'
import { CandidateHeader } from '@/components/candidates/CandidateHeader'
import { ClaimCard } from '@/components/candidates/ClaimCard'
import { LatestInsights } from '@/components/news/LatestInsights'
import { getStoredCandidateScore } from '@/lib/sentiment-aggregator'
import { computeCandidateScore } from '@/utils/scoring'
import { Claim } from '@/types'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, BookOpen } from 'lucide-react'

export async function generateStaticParams() {
  const candidates = await getAllCandidates()
  return candidates.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const candidate = await getCandidateBySlug(params.slug)
  if (!candidate) return {}
  return { title: `${candidate.name} — Nigeria 2027`, description: candidate.description }
}

const SECTION_CONFIG = {
  strength:    { label: 'Strengths',     icon: <TrendingUp size={16} className="text-emerald-400" />, color: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/8 hover:border-emerald-500/60', desc: 'AI-powered — every verified achievement and positive record.' },
  weakness:    { label: 'Weaknesses',    icon: <TrendingDown size={16} className="text-amber-400" />,  color: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/8 hover:border-amber-500/60',   desc: 'AI-powered — every documented weakness and policy failure.'  },
  controversy: { label: 'Controversies', icon: <AlertTriangle size={16} className="text-red-400" />,    color: 'border-red-500/30 text-red-400 hover:bg-red-500/8 hover:border-red-500/60',           desc: 'AI-powered — every controversy, court case, and allegation.'  },
}

function ClaimsSection({ title, claims, slug }: { title: keyof typeof SECTION_CONFIG; claims: Claim[]; slug: string }) {
  if (!claims.length) return null
  const cfg = SECTION_CONFIG[title]
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-4">
        {cfg.icon}
        <h2 className="text-sm font-semibold text-white">{cfg.label}</h2>
        <span className="ml-auto text-xs text-[#55556a] font-mono">{claims.length} items</span>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {claims.map((claim, i) => <ClaimCard key={claim.id} claim={claim} index={i} />)}
      </div>
      <Link href={`/candidates/${slug}/research/${title}`}
        className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border bg-[#0a0a0f] transition-all duration-200 group ${cfg.color}`}>
        <div className="flex items-center gap-3">
          <BookOpen size={15} />
          <div>
            <p className="text-sm font-semibold">Read More {cfg.label}</p>
            <p className="text-xs opacity-70 mt-0.5">{cfg.desc}</p>
          </div>
        </div>
        <span className="text-lg font-bold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">→</span>
      </Link>
    </section>
  )
}

export default async function CandidatePage({ params }: { params: { slug: string } }) {
  const candidate = await getCandidateBySlug(params.slug)
  if (!candidate) notFound()

  const storedScore = await getStoredCandidateScore(candidate.id).catch(() => null)
  const base = computeCandidateScore(candidate.claims)
  const scores = storedScore
    ? { ...base, claim_score: storedScore.claim_score, sentiment_score_norm: storedScore.sentiment_score_norm, final_score: storedScore.final_score, data_source: storedScore.data_source as 'claims_only'|'blended', last_sentiment_update: storedScore.last_sentiment_update }
    : base

  const strengths     = candidate.claims.filter(c => c.type === 'strength')
  const weaknesses    = candidate.claims.filter(c => c.type === 'weakness')
  const controversies = candidate.claims.filter(c => c.type === 'controversy')

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <Link href="/candidates" className="inline-flex items-center gap-2 text-xs text-[#55556a] hover:text-white mb-8 transition-colors">
        <ArrowLeft size={14} /> All Candidates
      </Link>

      <div className="slide-up">
        <CandidateHeader candidate={candidate} scores={scores} />
      </div>

      <div className="mt-8 flex flex-col gap-10 fade-in">
        <ClaimsSection title="strength"     claims={strengths}     slug={candidate.slug} />
        <ClaimsSection title="weakness"     claims={weaknesses}    slug={candidate.slug} />
        <ClaimsSection title="controversy"  claims={controversies} slug={candidate.slug} />
      </div>

      {/* Step 13: Latest News Insights section */}
      <div className="mt-12 surface p-6 sm:p-8">
        <LatestInsights
          candidateSlug={candidate.slug}
          candidateName={candidate.name}
          showHeader={true}
          maxItems={15}
        />
      </div>

      <div className="mt-6 surface p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white mb-1">Compare with another candidate</p>
          <p className="text-xs text-[#55556a]">See a side-by-side breakdown.</p>
        </div>
        <Link href={`/compare?a=${candidate.slug}`} className="btn-primary whitespace-nowrap">
          Start Comparison →
        </Link>
      </div>
    </div>
  )
}
