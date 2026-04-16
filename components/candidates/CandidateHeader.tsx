'use client'

import Link from 'next/link'
import { ScoreBar } from '@/components/ui/ScoreBar'
import { ArrowRight, TrendingUp, TrendingDown, AlertTriangle, User } from 'lucide-react'

const PARTY_COLORS: Record<string, string> = {
  APC: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  ADC: 'bg-red-500/15 text-red-300 border-red-500/25',
  PDP: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
}

export function CandidateHeader({ candidate, scores, index }: any) {
  const partyCls =
    PARTY_COLORS[candidate.party] ||
    'bg-[#1a1a24] text-[#8888aa] border-[#2a2a38]'

  const finalDisplay = scores.final_score.toFixed(0)

  return (
    <Link
      href={`/candidates/${candidate.slug}`}
      className="candidate-card group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-14 h-14 rounded-xl bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center">
          <User size={24} className="text-[#55556a]" />
        </div>
        <span className={`label-badge border text-[10px] font-bold ${partyCls}`}>
          {candidate.party}
        </span>
      </div>

      <h2 className="text-lg font-bold text-white mb-1 group-hover:text-[#22d3a5]">
        {candidate.name}
      </h2>

      <p className="text-xs text-[#55556a] mb-4">
        {candidate.state_of_origin} · Age {candidate.age}
      </p>

      <p className="text-xs text-[#8888aa] mb-6 line-clamp-3">
        {candidate.description}
      </p>

      {/* Scores */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp size={11} className="text-emerald-400" />
          <ScoreBar value={scores.strength_score} max={10} color="green" showValue={false} />
        </div>

        <div className="flex items-center gap-3">
          <TrendingDown size={11} className="text-amber-400" />
          <ScoreBar value={scores.weakness_score} max={10} color="amber" showValue={false} />
        </div>

        <div className="flex items-center gap-3">
          <AlertTriangle size={11} className="text-red-400" />
          <ScoreBar value={scores.controversy_score} max={10} color="red" showValue={false} />
        </div>
      </div>

      <div className="pt-4 border-t border-[#1a1a24] flex justify-between">
        <div>
          <p className="text-[10px] text-[#55556a]">Overall Score</p>
          <p className="text-2xl font-bold text-white">
            {finalDisplay}
            <span className="text-xs text-[#55556a]">/100</span>
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#55556a] group-hover:text-[#22d3a5]">
          View profile <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  )
}