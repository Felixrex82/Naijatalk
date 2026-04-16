'use client'

import { useState, useMemo } from 'react'
import { Candidate } from '@/types'
import { computeCandidateScore, getCategoryBreakdown } from '@/utils/scoring'
import { ScoreBar } from '@/components/ui/ScoreBar'
import { Trophy, TrendingUp, TrendingDown, AlertTriangle, User } from 'lucide-react'

interface CompareClientProps {
  candidates: Candidate[]
  initialA?: string
  initialB?: string
}

const PARTY_COLORS: Record<string, string> = {
  APC: 'text-emerald-400',
  ADC: 'text-red-400',
  PDP: 'text-blue-400',
}

export function CompareClient({ candidates, initialA, initialB }: CompareClientProps) {
  const [slugA, setSlugA] = useState(initialA || candidates[0]?.slug || '')
  const [slugB, setSlugB] = useState(initialB || candidates[1]?.slug || '')

  const candA = candidates.find((c) => c.slug === slugA)
  const candB = candidates.find((c) => c.slug === slugB)

  const scoresA = useMemo(() => (candA ? computeCandidateScore(candA.claims) : null), [candA])
  const scoresB = useMemo(() => (candB ? computeCandidateScore(candB.claims) : null), [candB])

  const breakdown = useMemo(
    () =>
      candA && candB
        ? getCategoryBreakdown(candA.claims, candB.claims)
        : {},
    [candA, candB]
  )

  const winner = useMemo(() => {
    if (!scoresA || !scoresB) return null
    if (scoresA.final_score > scoresB.final_score) return slugA
    if (scoresB.final_score > scoresA.final_score) return slugB
    return 'tie'
  }, [scoresA, scoresB, slugA, slugB])

  const otherCandidates = (slug: string) => candidates.filter((c) => c.slug !== slug)

  return (
    <div>
      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { slug: slugA, setSlug: setSlugA, other: slugB },
          { slug: slugB, setSlug: setSlugB, other: slugA },
        ].map(({ slug, setSlug, other }, idx) => (
          <div key={idx}>
            <label className="block text-xs text-[#55556a] mb-2 font-medium">
              Candidate {idx === 0 ? 'A' : 'B'}
            </label>
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-[#111118] border border-[#2a2a38] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#22d3a5] transition-colors"
            >
              {candidates
                .filter((c) => c.slug !== other)
                .map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name} ({c.party})
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>

      {/* Side by side scores */}
      {candA && candB && scoresA && scoresB && (
        <div className="space-y-6">
          {/* Header row */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { c: candA, s: scoresA, isWinner: winner === candA.slug },
              { c: candB, s: scoresB, isWinner: winner === candB.slug },
            ].map(({ c, s, isWinner }) => (
              <div key={c.id} className={`surface p-5 relative ${isWinner ? 'border-[#22d3a5]/50' : ''}`}>
                {isWinner && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#22d3a5] text-[#0a0a0f] text-[10px] font-bold rounded-full">
                      <Trophy size={9} /> WINNER
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                    <User size={18} className="text-[#55556a]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{c.name.split(' ').slice(-1)[0]}</p>
                    <p className={`text-[10px] font-semibold ${PARTY_COLORS[c.party] || 'text-[#8888aa]'}`}>
                      {c.party}
                    </p>
                  </div>
                </div>

                <div className="text-center py-3 mb-4 bg-[#0a0a0f] rounded-lg">
                  <p className="text-3xl font-bold font-mono text-white">
                    {s.final_score.toFixed(0)}
                  </p>
                  <p className="text-[10px] text-[#55556a] mt-0.5">Overall Score / 100</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={11} className="text-emerald-400" />
                    <ScoreBar value={s.strength_score} color="green" showValue={false} />
                    <span className="text-xs font-mono text-emerald-400 w-8 text-right">
                      {s.strength_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown size={11} className="text-amber-400" />
                    <ScoreBar value={s.weakness_score} color="amber" showValue={false} />
                    <span className="text-xs font-mono text-amber-400 w-8 text-right">
                      {s.weakness_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={11} className="text-red-400" />
                    <ScoreBar value={s.controversy_score} color="red" showValue={false} />
                    <span className="text-xs font-mono text-red-400 w-8 text-right">
                      {s.controversy_score.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          {Object.keys(breakdown).length > 0 && (
            <div className="surface p-6">
              <p className="section-heading mb-5">Category Breakdown</p>
              <div className="space-y-5">
                {Object.entries(breakdown).map(([cat, { a, b }]) => {
                  const maxVal = Math.max(a, b, 1)
                  const aWins = a > b
                  const bWins = b > a

                  return (
                    <div key={cat}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-[#8888aa] capitalize w-32">{cat.replace('-', ' ')}</span>
                        <div className="flex-1 flex items-center gap-2">
                          {/* A bar (right-to-left) */}
                          <div className="flex-1 flex justify-end">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-700 ${aWins ? 'bg-[#22d3a5]' : 'bg-[#3a3a52]'}`}
                              style={{ width: `${(a / maxVal) * 100}%` }}
                            />
                          </div>
                          {/* Center labels */}
                          <div className="flex gap-2 text-xs font-mono flex-shrink-0">
                            <span className={aWins ? 'text-[#22d3a5]' : 'text-[#55556a]'}>{a.toFixed(1)}</span>
                            <span className="text-[#1a1a24]">|</span>
                            <span className={bWins ? 'text-[#22d3a5]' : 'text-[#55556a]'}>{b.toFixed(1)}</span>
                          </div>
                          {/* B bar */}
                          <div className="flex-1">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-700 ${bWins ? 'bg-blue-400' : 'bg-[#3a3a52]'}`}
                              style={{ width: `${(b / maxVal) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-[#55556a] font-semibold">
                <span>← {candA.name.split(' ').slice(-1)[0]}</span>
                <span>{candB.name.split(' ').slice(-1)[0]} →</span>
              </div>
            </div>
          )}

          {/* Formula explanation */}
          <div className="surface p-5">
            <p className="section-heading mb-3">Scoring Methodology</p>
            <p className="text-xs text-[#8888aa] leading-relaxed">
              Final Score = (Strength Score × 0.5) − (Weakness Score × 0.3) − (Controversy Score × 0.2).
              Each dimension is a credibility-weighted average of verified claims. Higher is better.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
