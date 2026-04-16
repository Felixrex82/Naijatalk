import { Suspense } from 'react'
import { SentimentCard } from '@/components/sentiment/SentimentCard'
import { SentimentPosts } from '@/components/sentiment/SentimentPosts'
import { SentimentDisclaimer } from '@/components/sentiment/SentimentDisclaimer'
import { getTodaySummary } from '@/lib/sentiment-aggregator'
import { Activity, RefreshCw } from 'lucide-react'

export const metadata = {
  title: 'Sentiment Dashboard — Nigeria 2027',
  description: 'Daily social media sentiment analysis for Nigeria 2027 presidential candidates.',
}

export const revalidate = 3600

async function SentimentDashboard() {
  let summaries = await getTodaySummary().catch(() => [])

  // Fallback: compute from simulated data if Supabase has no records yet
  if (!summaries.length) {
    const { SIMULATED_POSTS } = await import('@/lib/sentiment-data')
    const { keywordClassify } = await import('@/lib/sentiment-engine')
    const candidates = [
      { id: 'tinubu-id', name: 'Bola Ahmed Tinubu', slug: 'tinubu' },
      { id: 'obi-id',    name: 'Peter Obi',          slug: 'peter-obi' },
      { id: 'atiku-id',  name: 'Atiku Abubakar',     slug: 'atiku' },
    ]
    summaries = candidates.map((c) => {
      const posts = SIMULATED_POSTS.filter((p) => p.candidateSlug === c.slug)
      const classified = posts.map((p) => keywordClassify(p.text, c.name))
      const pos   = classified.filter((r) => r.sentiment === 'positive').length
      const neg   = classified.filter((r) => r.sentiment === 'negative').length
      const neu   = classified.filter((r) => r.sentiment === 'neutral').length
      const total = classified.length
      const score = total ? +((pos - neg) / total).toFixed(3) : 0
      return {
        candidate_id: c.id, candidate_name: c.name, candidate_slug: c.slug,
        date: new Date().toISOString().split('T')[0],
        positive_count: pos, negative_count: neg, neutral_count: neu, total_count: total,
        sentiment_score: score,
        positive_pct: total ? Math.round((pos / total) * 100) : 0,
        negative_pct: total ? Math.round((neg / total) * 100) : 0,
        neutral_pct:  total ? Math.round((neu / total) * 100) : 0,
        trend: 0, confidence: (total > 10 ? 'medium' : 'low') as 'low' | 'medium' | 'high',
        sample_positive: posts.filter((p) => p.likelySentiment === 'positive').slice(0, 3).map((p) => p.text),
        sample_negative: posts.filter((p) => p.likelySentiment === 'negative').slice(0, 3).map((p) => p.text),
      }
    })
  }

  const today = new Date().toLocaleDateString('en-NG', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

  return (
    <>
      {/* Today's scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {summaries.map((s) => <SentimentCard key={s.candidate_id} data={s} />)}
      </div>

      {/* Sample posts */}
      <h2 className="text-lg font-bold text-white mb-5">Sample Posts Analysed</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {summaries.map((s) => (
          <div key={s.candidate_id} className="surface p-5">
            <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase mb-4">
              {s.candidate_name.split(' ').pop()}
            </p>
            <SentimentPosts data={s} />
          </div>
        ))}
      </div>

      {/* Score methodology */}
      <div className="surface p-5 mb-6">
        <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase mb-3">Methodology</p>
        <p className="text-xs text-[#8888aa] leading-relaxed">
          Sentiment score = (positive posts − negative posts) ÷ total posts.
          Range: <span className="text-red-400 font-mono">−100</span> (fully negative)
          to <span className="text-emerald-400 font-mono">+100</span> (fully positive).
          Classification uses keyword analysis on collected social media posts.
          Posts are collected daily from public sources. Results are cached for 1 hour.
        </p>
      </div>
    </>
  )
}

export default function SentimentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs font-semibold text-[#55556a] tracking-widest uppercase">
            Social Sentiment
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#22d3a5]/10 border border-[#22d3a5]/25 text-[#22d3a5]">
            <span className="w-1.5 h-1.5 bg-[#22d3a5] rounded-full animate-pulse" />
            Updated Daily
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Sentiment Dashboard</h1>
        <p className="text-[#8888aa] max-w-2xl leading-relaxed">
          Daily analysis of public social media sentiment towards each 2027 presidential
          candidate. Posts are classified as positive, negative, or neutral.
        </p>
      </div>

      <SentimentDisclaimer />
      <div className="mt-8">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1,2,3].map((i) => (
              <div key={i} className="surface p-6 space-y-4">
                <div className="h-5 w-32 bg-[#1a1a24] rounded shimmer" />
                <div className="h-10 w-20 bg-[#1a1a24] rounded shimmer" />
                <div className="h-2 w-full bg-[#1a1a24] rounded-full shimmer" />
              </div>
            ))}
          </div>
        }>
          <SentimentDashboard />
        </Suspense>
      </div>
    </div>
  )
}
