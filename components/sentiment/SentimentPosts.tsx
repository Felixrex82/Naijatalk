'use client'
import { useState } from 'react'
import { CandidateSentimentToday } from '@/types/sentiment'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface Props { data: CandidateSentimentToday }

export function SentimentPosts({ data }: Props) {
  const [tab, setTab] = useState<'positive' | 'negative'>('positive')
  const posts = tab === 'positive' ? data.sample_positive : data.sample_negative
  const empty = posts.length === 0

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('positive')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            tab === 'positive'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-[#55556a] hover:text-white'
          }`}
        >
          <ThumbsUp size={11} /> Positive ({data.sample_positive.length})
        </button>
        <button
          onClick={() => setTab('negative')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            tab === 'negative'
              ? 'bg-red-500/15 text-red-400 border border-red-500/30'
              : 'text-[#55556a] hover:text-white'
          }`}
        >
          <ThumbsDown size={11} /> Negative ({data.sample_negative.length})
        </button>
      </div>

      {empty ? (
        <p className="text-xs text-[#55556a] py-4">No sample posts available.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((text, i) => (
            <div
              key={i}
              className={`px-4 py-3 rounded-lg text-sm text-[#aaaacc] leading-relaxed border-l-2 bg-[#0a0a0f] ${
                tab === 'positive' ? 'border-l-emerald-500' : 'border-l-red-500'
              }`}
            >
              "{text}"
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
