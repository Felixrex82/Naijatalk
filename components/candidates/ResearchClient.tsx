/**
 * ResearchClient — Local Expansion (no API calls)
 *
 * Previously called /api/research which depended on the Anthropic API.
 * Now renders all claim data locally from what was passed in via props.
 * Instant, deterministic, zero errors.
 */

'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink, Shield, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { Claim } from '@/types'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ScoreBar } from '@/components/ui/ScoreBar'

interface ResearchClientProps {
  claims: Claim[]
  typeLabel: string
  typeColor: string
  candidateName: string
}

const CREDIBILITY_LABEL = (score: number) =>
  score >= 8 ? 'High' : score >= 5 ? 'Medium' : 'Low'

const CREDIBILITY_STYLE: Record<string, string> = {
  High:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  Low:    'bg-red-500/10 text-red-400 border-red-500/25',
}

function ClaimRow({
  claim,
  index,
  typeColor,
}: {
  claim: Claim
  index: number
  typeColor: string
}) {
  const [open, setOpen] = useState(false)
  const credLabel = CREDIBILITY_LABEL(claim.credibility_score)
  const credStyle = CREDIBILITY_STYLE[credLabel]
  const hasExtra  = claim.proof_links.length > 0 || !!claim.read_more_url

  return (
    <div
      className="surface border-l-2 hover:border-[#3a3a52] transition-all duration-200"
      style={{ borderLeftColor: typeColor, animationDelay: `${index * 40}ms` }}
    >
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {/* Index */}
        <span className="text-xs font-mono text-[#3a3a52] mt-0.5 flex-shrink-0 w-6">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-white leading-snug">{claim.title}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <CategoryBadge category={claim.category} />
              {hasExtra && (
                <ChevronDown
                  size={14}
                  className={`text-[#55556a] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              )}
            </div>
          </div>

          {/* Preview when collapsed */}
          {!open && (
            <p className="text-xs text-[#8888aa] line-clamp-2 leading-relaxed">
              {claim.description}
            </p>
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="px-5 pb-5 pl-14">
          <p className="text-sm text-[#aaaacc] leading-relaxed mb-5">{claim.description}</p>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs text-[#55556a] mb-2 flex items-center gap-1.5">
                <Shield size={11} /> Credibility Score
              </p>
              <ScoreBar value={claim.credibility_score} max={10} delay={0} />
              <p className="text-xs text-[#55556a] mt-1 font-mono">
                {claim.credibility_score}/10
              </p>
            </div>
            <div>
              <p className="text-xs text-[#55556a] mb-2">Significance</p>
              <ScoreBar value={claim.weight} max={5} color="blue" delay={100} />
              <p className="text-xs text-[#55556a] mt-1 font-mono">{claim.weight}/5</p>
            </div>
          </div>

          {/* Credibility badge */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${credStyle}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {credLabel} Credibility
            </span>
          </div>

          {/* Proof links */}
          {claim.proof_links.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase mb-3">
                Sources &amp; Proof
              </p>
              <div className="flex flex-col gap-2">
                {claim.proof_links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#1a1a24] hover:border-[#3a3a52] transition-colors group text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink
                      size={11}
                      className="text-[#55556a] group-hover:text-[#22d3a5] flex-shrink-0 transition-colors"
                    />
                    <span className="text-[#8888aa] group-hover:text-white transition-colors truncate">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Read more external link */}
          {claim.read_more_url && (
            <div className="pt-4 border-t border-[#1a1a24]">
              <a
                href={claim.read_more_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#22d3a5]/30 text-[#22d3a5] text-xs font-semibold hover:bg-[#22d3a5]/10 hover:border-[#22d3a5]/60 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                Read full investigation →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ResearchClient({
  claims,
  typeLabel,
  typeColor,
  candidateName,
}: ResearchClientProps) {
  if (claims.length === 0) {
    return (
      <div className="surface p-8 text-center">
        <p className="text-sm text-[#8888aa]">
          Additional details unavailable for this section.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold font-mono" style={{ color: typeColor }}>
            {claims.length}
          </span>
          <span className="text-sm text-[#8888aa]">
            verified {typeLabel.toLowerCase()} for {candidateName}
          </span>
        </div>
        <span className="text-xs text-[#55556a] bg-[#1a1a24] border border-[#2a2a38] px-3 py-1 rounded-full">
          All sources included
        </span>
      </div>

      {/* Claims list */}
      <div className="flex flex-col gap-3">
        claims.map((claim, index) => (
 	 <ClaimRow
   	   key={claim.id ?? index}
	    claim={claim}
   	    index={index}
  	    typeColor={typeColor}
 	 />
	))
      </div>
    </div>
  )
}
