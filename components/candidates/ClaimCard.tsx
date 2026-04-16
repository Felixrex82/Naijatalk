'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink, Shield, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { Claim } from '@/types'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { ScoreBar } from '@/components/ui/ScoreBar'

interface ClaimCardProps {
  claim: Claim
  index?: number
}

const TYPE_CONFIG = {
  strength: {
    icon: TrendingUp,
    label: 'Strength',
    border: 'border-l-emerald-500',
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400',
  },
  weakness: {
    icon: TrendingDown,
    label: 'Weakness',
    border: 'border-l-amber-500',
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-400',
  },
  controversy: {
    icon: AlertTriangle,
    label: 'Controversy',
    border: 'border-l-red-500',
    iconColor: 'text-red-400',
    badgeBg: 'bg-red-500/10 text-red-400',
  },
}

export function ClaimCard({ claim, index = 0 }: ClaimCardProps) {
  const [expanded, setExpanded] = useState(false)
  const config = TYPE_CONFIG[claim.type]
  const Icon = config.icon

  return (
    <div
      className={`surface border-l-2 ${config.border} hover:border-[#3a3a52] transition-all duration-200`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className={`mt-0.5 flex-shrink-0 ${config.iconColor}`}>
          <Icon size={16} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h4 className="text-sm font-semibold text-white leading-snug">{claim.title}</h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              <CategoryBadge category={claim.category} />
              <ChevronDown
                size={14}
                className={`text-[#55556a] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          {!expanded && (
            <p className="mt-1.5 text-xs text-[#8888aa] line-clamp-2 leading-relaxed">
              {claim.description}
            </p>
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 fade-in">
          <p className="text-sm text-[#aaaacc] leading-relaxed mb-5">{claim.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs text-[#55556a] mb-2 flex items-center gap-1.5">
                <Shield size={11} />
                Credibility Score
              </p>
              <ScoreBar value={claim.credibility_score} max={10} delay={0} />
            </div>
            <div>
              <p className="text-xs text-[#55556a] mb-2">Significance</p>
              <ScoreBar value={claim.weight} max={5} color="blue" delay={100} />
            </div>
          </div>

          {claim.proof_links.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase mb-3">
                Sources & Proof
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
                    <ExternalLink size={11} className="text-[#55556a] group-hover:text-[#22d3a5] flex-shrink-0 transition-colors" />
                    <span className="text-[#8888aa] group-hover:text-white transition-colors truncate">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {claim.read_more_url && (
            <div className="mt-4 pt-4 border-t border-[#1a1a24]">
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
