'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, ChevronDown } from 'lucide-react'
import { Claim } from '@/types'
import { ClaimCard } from './ClaimCard'

type ClaimType = 'strength' | 'weakness' | 'controversy'

interface ClaimsSectionProps {
  title: ClaimType
  claims: Claim[]
}

const SECTION_CONFIG = {
  strength: {
    label: 'Strengths',
    Icon: TrendingUp,
    iconColor: 'text-emerald-400',
    btnColor: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/8 hover:border-emerald-500/50',
    accentColor: '#22d3a5',
    // Show first 3 by default; rest revealed on expand
    defaultVisible: 3,
  },
  weakness: {
    label: 'Weaknesses',
    Icon: TrendingDown,
    iconColor: 'text-amber-400',
    btnColor: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/8 hover:border-amber-500/50',
    accentColor: '#f59e0b',
    defaultVisible: 3,
  },
  controversy: {
    label: 'Controversies',
    Icon: AlertTriangle,
    iconColor: 'text-red-400',
    btnColor: 'border-red-500/30 text-red-400 hover:bg-red-500/8 hover:border-red-500/50',
    accentColor: '#ef4444',
    defaultVisible: 3,
  },
}

export function ClaimsSection({ title, claims }: ClaimsSectionProps) {
  const [expanded, setExpanded] = useState(false)

  if (!claims.length) return null

  const cfg = SECTION_CONFIG[title]
  const { Icon, defaultVisible } = cfg
  const hasMore = claims.length > defaultVisible
  const visible  = expanded ? claims : claims.slice(0, defaultVisible)
  const hiddenCount = claims.length - defaultVisible

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <Icon size={16} className={cfg.iconColor} />
        <h2 className="text-sm font-semibold text-white">{cfg.label}</h2>
        <span className="ml-auto text-xs text-[#55556a] font-mono">{claims.length} items</span>
      </div>

      {/* Claim cards */}
      <div className="flex flex-col gap-3">
        {visible.map((claim, i) => (
          <div
            key={claim.id}
            className={
              // Smoothly fade-in newly revealed cards
              !expanded || i < defaultVisible
                ? undefined
                : 'animate-[fadeUp_0.3s_ease-out_both]'
            }
            style={
              !expanded || i < defaultVisible
                ? undefined
                : { animationDelay: `${(i - defaultVisible) * 50}ms` }
            }
          >
            <ClaimCard claim={claim} index={i} />
          </div>
        ))}
      </div>

      {/* Expand / collapse toggle — only shown when there are hidden items */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`
            mt-4 flex items-center justify-between w-full
            px-5 py-3.5 rounded-xl border bg-[#0a0a0f]
            transition-all duration-200 group
            ${cfg.btnColor}
          `}
        >
          <div className="flex items-center gap-3">
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
            />
            <div className="text-left">
              <p className="text-sm font-semibold">
                {expanded
                  ? `Show fewer ${cfg.label.toLowerCase()}`
                  : `Show ${hiddenCount} more ${cfg.label.toLowerCase()}`}
              </p>
              <p className="text-xs opacity-60 mt-0.5">
                {expanded
                  ? 'Collapse to show summary view'
                  : `${claims.length} total — click to reveal all`}
              </p>
            </div>
          </div>
          <span className="text-lg font-bold opacity-50 group-hover:opacity-100 transition-opacity">
            {expanded ? '↑' : '↓'}
          </span>
        </button>
      )}
    </section>
  )
}
