import Link from 'next/link'
import { getAllCandidates } from '@/lib/data'
import { computeCandidateScore } from '@/utils/scoring'
import { ScoreBar } from '@/components/ui/ScoreBar'
import { ArrowRight, TrendingUp, TrendingDown, AlertTriangle, User } from 'lucide-react'

export const metadata = {
  title: 'Candidates — Nigeria 2027',
  description: 'View detailed profiles of Nigeria\'s 2027 presidential candidates.',
}

const PARTY_COLORS: Record<string, string> = {
  APC: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  ADC: 'bg-red-500/15 text-red-300 border-red-500/25',
  PDP: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
}

export default async function CandidatesPage() {
  const candidates = await getAllCandidates()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="section-heading mb-3">2027 Candidates</p>
        <h1 className="text-3xl font-bold text-white mb-4">Presidential Profiles</h1>
        <p className="text-[#8888aa] max-w-2xl leading-relaxed">
          Evidence-based profiles of Nigeria's leading 2027 presidential candidates. Every claim
          is sourced and carries a credibility rating.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates.map((candidate, i) => {
          const scores = computeCandidateScore(candidate.claims)
          const party = candidate.party
          const partyCls = PARTY_COLORS[party] || 'bg-[#1a1a24] text-[#8888aa] border-[#2a2a38]'
          const finalDisplay = scores.final_score.toFixed(0)

          return (
            <Link
              key={candidate.id}
              href={`/candidates/${candidate.slug}`}
              className="candidate-card group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center">
                  <User size={24} className="text-[#55556a]" />
                </div>
                <span className={`label-badge border text-[10px] font-bold tracking-wider ${partyCls}`}>
                  {party}
                </span>
              </div>

              {/* Name & meta */}
              <h2 className="text-lg font-bold text-white mb-1 group-hover:text-[#22d3a5] transition-colors">
                {candidate.name}
              </h2>
              <p className="text-xs text-[#55556a] mb-4">{candidate.state_of_origin} · Age {candidate.age}</p>

              <p className="text-xs text-[#8888aa] leading-relaxed line-clamp-3 mb-6">
                {candidate.description}
              </p>

              {/* Score rows */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp size={11} className="text-emerald-400 flex-shrink-0" />
                  <div className="flex-1">
                    <ScoreBar value={scores.strength_score} max={10} color="green" showValue={false} />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 w-8 text-right">
                    {scores.strength_score.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingDown size={11} className="text-amber-400 flex-shrink-0" />
                  <div className="flex-1">
                    <ScoreBar value={scores.weakness_score} max={10} color="amber" showValue={false} />
                  </div>
                  <span className="text-xs font-mono text-amber-400 w-8 text-right">
                    {scores.weakness_score.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle size={11} className="text-red-400 flex-shrink-0" />
                  <div className="flex-1">
                    <ScoreBar value={scores.controversy_score} max={10} color="red" showValue={false} />
                  </div>
                  <span className="text-xs font-mono text-red-400 w-8 text-right">
                    {scores.controversy_score.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#1a1a24] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#55556a] mb-0.5">Overall Score</p>
                  <p className="text-2xl font-bold font-mono text-white">
                    {finalDisplay}
                    <span className="text-xs text-[#55556a] font-normal">/100</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#55556a] group-hover:text-[#22d3a5] transition-colors">
                  View profile <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* CTA bar */}
      <div className="mt-10 surface p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white mb-1">Want a side-by-side comparison?</p>
          <p className="text-sm text-[#55556a]">Compare any two candidates across all dimensions.</p>
        </div>
        <Link href="/compare" className="btn-primary">Compare Candidates →</Link>
      </div>
    </div>
  )
}
