'use client'

import { useState, useEffect } from 'react'
import { NewsInsightCard } from './NewsInsightCard'
import { Newspaper, AlertCircle } from 'lucide-react'

interface Insight {
  id: string
  candidate_id: string
  type: 'strength' | 'weakness' | 'controversy'
  title: string
  summary: string
  source: string
  source_url: string
  confidence_score: number
  created_at: string
  candidates?: { name: string; slug: string; party: string }
}

interface LatestInsightsProps {
  candidateSlug?: string   // pass slug, not id
  candidateName?: string
  showHeader?: boolean
  maxItems?: number
}

const TABS = [
  { key: 'all',         label: 'All'           },
  { key: 'strength',    label: 'Strengths'     },
  { key: 'weakness',    label: 'Weaknesses'    },
  { key: 'controversy', label: 'Controversies' },
] as const
type TabKey = typeof TABS[number]['key']

export function LatestInsights({
  candidateSlug, candidateName, showHeader = true, maxItems = 20,
}: LatestInsightsProps) {
  const [tab, setTab]         = useState<TabKey>('all')
  const [insights, setInsights] = useState<Insight[]>([])
  const [status, setStatus]   = useState<'loading'|'ready'|'empty'|'error'>('loading')
  const [error, setError]     = useState('')

  useEffect(() => {
    const url = new URL('/api/news/latest', window.location.origin)
    if (candidateSlug) url.searchParams.set('slug', candidateSlug)
    url.searchParams.set('limit', String(maxItems))

    setStatus('loading')
    fetch(url.toString())
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        const rows: Insight[] = data.data ?? []
        setInsights(rows)
        setStatus(rows.length ? 'ready' : 'empty')
      })
      .catch(e => { setError(e.message); setStatus('error') })
  }, [candidateSlug, maxItems])

  const filtered = tab === 'all'
    ? insights
    : insights.filter(i => i.type === tab)

  if (status === 'loading') return (
    <div className="space-y-3">
      {[1,2,3].map(i => (
        <div key={i} className="surface p-5 space-y-2 animate-pulse">
          <div className="h-3 bg-[#1a1a24] rounded w-1/4" />
          <div className="h-4 bg-[#1a1a24] rounded w-3/4" />
          <div className="h-3 bg-[#1a1a24] rounded w-full" />
        </div>
      ))}
    </div>
  )

  if (status === 'error') return (
    <div className="surface p-6 flex items-center gap-3 text-sm text-[#55556a]">
      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
      <span>Additional details unavailable</span>
    </div>
  )

  if (status === 'empty') return (
    <div className="surface p-8 text-center">
      <Newspaper size={20} className="text-[#3a3a52] mx-auto mb-3" />
      <p className="text-sm text-[#55556a]">No recent news insights yet.</p>
      <p className="text-xs text-[#3a3a52] mt-1">
        Call <code className="text-[#22d3a5]">POST /api/news/fetch</code> to ingest articles.
      </p>
    </div>
  )

  return (
    <div>
      {showHeader && (
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase mb-1">
              Live News Intelligence
            </p>
            <h3 className="text-lg font-bold text-white">
              Latest Verified Insights
              {candidateName && (
                <span className="text-[#55556a] font-normal"> · {candidateName}</span>
              )}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#22d3a5]/10 border border-[#22d3a5]/25 text-[#22d3a5]">
            <span className="w-1.5 h-1.5 bg-[#22d3a5] rounded-full animate-pulse" />
            {insights.length} insights · last 48h
          </span>
        </div>
      )}

      <p className="text-xs text-[#3a3a52] mb-4 leading-relaxed">
        Insights are derived from publicly reported news and classified using automated systems.
        Always verify with the original source.
      </p>

      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === t.key
                ? 'bg-[#22d3a5]/15 text-[#22d3a5] border border-[#22d3a5]/30'
                : 'text-[#55556a] hover:text-white'
            }`}
          >
            {t.label}
            {t.key !== 'all' && (
              <span className="ml-1.5 font-mono text-[10px] opacity-60">
                {insights.filter(i => i.type === t.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="surface p-6 text-center text-sm text-[#55556a]">
          No {tab} insights in the last 48 hours.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(insight => (
            <NewsInsightCard
              key={insight.id}
              title={insight.title}
              summary={insight.summary}
              source={insight.source}
              sourceUrl={insight.source_url}
              type={insight.type}
              confidenceScore={insight.confidence_score}
              createdAt={insight.created_at}
            />
          ))}
        </div>
      )}
    </div>
  )
}
