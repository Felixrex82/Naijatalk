'use client'

import { useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import { Trophy, Download, Share2, RotateCcw, ExternalLink, Loader2, CheckCircle } from 'lucide-react'

interface QuizResultCardProps {
  result: Record<string, number>
  onRetake: () => void
}

const CANDIDATE_META: Record<string, {
  name: string; party: string; slug: string; color: string
}> = {
  tinubu: { name: 'Bola Tinubu', party: 'APC', slug: 'tinubu', color: '#22d3a5' },
  'peter-obi': { name: 'Peter Obi', party: 'ADC', slug: 'peter-obi', color: '#ef4444' },
  atiku: { name: 'Atiku Abubakar', party: 'PDP', slug: 'atiku', color: '#3b82f6' },
}

export function QuizResultCard({ result, onRetake }: QuizResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'done'>('idle')

  const sorted = Object.entries(result).sort(([, a], [, b]) => b - a)
  const [bestSlug, bestPct] = sorted[0]
  const bestMeta = CANDIDATE_META[bestSlug]

  const tweetText = encodeURIComponent(
    `I took the Nigeria 2027 Political Compass quiz.\n\nMy top match: ${bestMeta?.name} (${bestPct}% alignment)\n\nFind yours at nigeria2027.vercel.app/quiz`
  )
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    setDownloadState('loading')
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#111118',
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: cardRef.current.scrollWidth,
        windowHeight: cardRef.current.scrollHeight,
      })
      const link = document.createElement('a')
      link.download = `nigeria2027-result-${bestSlug}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setDownloadState('done')
      setTimeout(() => setDownloadState('idle'), 3000)
    } catch (err) {
      console.error('Download error:', err)
      setDownloadState('idle')
      alert('Download failed. Please try again or take a screenshot.')
    }
  }, [bestSlug])

  const PARTY_COLORS: Record<string, string> = {
    APC: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    ADC: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
    PDP: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  }

  return (
    <div className="fade-in">
      {/* Shareable card — this is what gets captured */}
      <div
        ref={cardRef}
        className="surface p-8 mb-6 relative overflow-hidden"
        style={{ background: '#111118', fontFamily: 'system-ui, sans-serif' }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{
            background: bestMeta?.color,
            filter: 'blur(60px)',
            transform: 'translate(30%, -30%)',
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1">
            <span className="w-2 h-3.5 bg-[#008751] rounded-sm" />
            <span className="w-2 h-3.5 bg-[#f0f0f8] rounded-sm" />
            <span className="w-2 h-3.5 bg-[#008751] rounded-sm" />
          </div>
          <span className="text-xs text-[#55556a] font-medium tracking-widest uppercase">
            Nigeria 2027 · Political Compass
          </span>
        </div>

        <p className="text-xs text-[#55556a] mb-2 tracking-wide uppercase font-semibold">Your Best Match</p>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#55556a" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{bestMeta?.name}</h2>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${PARTY_COLORS[bestMeta?.party] || 'bg-[#1a1a24] text-[#8888aa] border-[#2a2a38]'}`}
              >
                {bestMeta?.party}
              </span>
              <span className="text-sm font-mono font-bold" style={{ color: bestMeta?.color }}>
                {bestPct}% aligned
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase mb-4">
          Full Alignment Breakdown
        </p>
        <div className="space-y-4">
          {sorted.map(([slug, pct], i) => {
            const meta = CANDIDATE_META[slug]
            if (!meta) return null
            return (
              <div key={slug}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {i === 0 && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="2">
                        <polyline points="8 2 8 7 4 7 4 12 8 12 8 17 12 20 16 17 16 12 20 12 20 7 16 7 16 2"/>
                        <line x1="12" y1="20" x2="12" y2="24"/><line x1="8" y1="24" x2="16" y2="24"/>
                      </svg>
                    )}
                    <span className="text-sm text-white font-medium">{meta.name}</span>
                    <span className="text-[10px] text-[#55556a] font-semibold">{meta.party}</span>
                  </div>
                  <span className="text-sm font-mono font-bold" style={{ color: meta.color }}>
                    {pct}%
                  </span>
                </div>
                <div className="h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${pct}%`,
                      background: meta.color,
                      transitionDelay: `${i * 200}ms`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-[#1a1a24] flex items-center justify-between">
          <p className="text-[10px] text-[#3a3a52]">nigeria2027.vercel.app/quiz</p>
          <p className="text-[10px] text-[#3a3a52]">Evidence-based · Non-partisan</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={handleDownload}
          disabled={downloadState === 'loading'}
          className="flex-1 flex items-center justify-center gap-2 btn-ghost text-sm disabled:opacity-60"
        >
          {downloadState === 'loading' ? (
            <><Loader2 size={15} className="animate-spin" /> Generating...</>
          ) : downloadState === 'done' ? (
            <><CheckCircle size={15} className="text-emerald-400" /> Downloaded!</>
          ) : (
            <><Download size={15} /> Download Card</>
          )}
        </button>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 btn-ghost text-sm"
        >
          <Share2 size={15} />
          Share on X (Twitter)
        </a>
        <button
          onClick={onRetake}
          className="flex-1 flex items-center justify-center gap-2 btn-ghost text-sm"
        >
          <RotateCcw size={15} />
          Retake Quiz
        </button>
      </div>

      {/* CTA */}
      {bestMeta && (
        <div className="surface p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-white mb-1">
              Read {bestMeta.name}'s full profile
            </p>
            <p className="text-xs text-[#55556a]">
              Strengths, weaknesses, controversies — all sourced.
            </p>
          </div>
          <Link
            href={`/candidates/${bestMeta.slug}`}
            className="btn-primary flex items-center gap-2 whitespace-nowrap text-sm"
          >
            View Profile <ExternalLink size={13} />
          </Link>
        </div>
      )}
    </div>
  )
}
