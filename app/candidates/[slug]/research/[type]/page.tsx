/**
 * /candidates/[slug]/research/[type]
 *
 * Previously rendered AI-generated research via ResearchClient.
 * Now renders all claims for the given type directly — no API calls, instant load.
 */

import { notFound } from 'next/navigation'
import { getCandidateBySlug } from '@/lib/data'
import { ResearchClient } from '@/components/candidates/ResearchClient'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { Claim } from '@/types'

const TYPE_CONFIG = {
  strength: {
    label: 'Strengths',
    description: 'All verified strengths, achievements, and positive contributions from the candidate record.',
    Icon: TrendingUp,
    color: '#22d3a5',
    borderClass: 'border-l-emerald-500',
  },
  weakness: {
    label: 'Weaknesses',
    description: 'All documented weaknesses, governance gaps, and policy failures from the candidate record.',
    Icon: TrendingDown,
    color: '#f59e0b',
    borderClass: 'border-l-amber-500',
  },
  controversy: {
    label: 'Controversies',
    description: 'All controversies, court cases, and documented allegations from the candidate record.',
    Icon: AlertTriangle,
    color: '#ef4444',
    borderClass: 'border-l-red-500',
  },
} as const

type ResearchType = keyof typeof TYPE_CONFIG

export async function generateMetadata({
  params,
}: {
  params: { slug: string; type: string }
}) {
  const candidate = await getCandidateBySlug(params.slug)
  if (!candidate) return {}
  const config = TYPE_CONFIG[params.type as ResearchType]
  return {
    title: `${candidate.name} — ${config?.label ?? 'Details'} | Nigeria 2027`,
    description: config?.description,
  }
}

export default async function ResearchPage({
  params,
}: {
  params: { slug: string; type: string }
}) {
  const candidate = await getCandidateBySlug(params.slug)
  if (!candidate) notFound()

  const type = params.type as ResearchType
  const config = TYPE_CONFIG[type]
  if (!config) notFound()

  const { Icon } = config

  // Filter claims locally — no API, instant
  const claims: Claim[] = candidate.claims.filter((c) => c.type === type)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 flex-wrap text-xs text-[#55556a]">
        <Link href="/candidates" className="hover:text-white transition-colors">
          All Candidates
        </Link>
        <span className="text-[#2a2a38]">/</span>
        <Link
          href={`/candidates/${candidate.slug}`}
          className="hover:text-white transition-colors"
        >
          {candidate.name}
        </Link>
        <span className="text-[#2a2a38]">/</span>
        <span className="text-white">{config.label}</span>
      </div>

      {/* Page header */}
      <div className="surface p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Icon size={20} style={{ color: config.color }} />
          <h1 className="text-2xl font-bold text-white">
            {candidate.name} — {config.label}
          </h1>
        </div>
        <p className="text-sm text-[#8888aa] leading-relaxed mb-4">{config.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              background: `${config.color}18`,
              color: config.color,
              borderColor: `${config.color}40`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: config.color }}
            />
            {claims.length} verified {config.label.toLowerCase()}
          </span>
          <span className="text-xs text-[#55556a]">
            All sources included · Instant load
          </span>
        </div>
      </div>

      {/* Claims list — local, no API */}
      <ResearchClient
        claims={claims}
        typeLabel={config.label}
        typeColor={config.color}
        candidateName={candidate.name}
      />

      {/* Back link */}
      <div className="mt-10">
        <Link
          href={`/candidates/${candidate.slug}`}
          className="inline-flex items-center gap-2 text-sm text-[#55556a] hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to {candidate.name}
        </Link>
      </div>
    </div>
  )
}
