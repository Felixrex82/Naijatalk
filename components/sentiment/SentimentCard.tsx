import { CandidateSentimentToday } from '@/types/sentiment'
import { TrendingUp, TrendingDown, Minus, MessageSquare, AlertCircle } from 'lucide-react'

interface Props {
  data: CandidateSentimentToday
}

const PARTY_COLORS: Record<string, string> = {
  APC: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  ADC: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
  PDP: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
}

export function SentimentCard({ data }: Props) {
  const trendUp   = data.trend > 0.02
  const trendDown = data.trend < -0.02
  const scoreDisplay = (data.sentiment_score * 100).toFixed(0)
  const scoreColor =
    data.sentiment_score > 0.1 ? 'text-emerald-400' :
    data.sentiment_score < -0.1 ? 'text-red-400' : 'text-amber-400'
  const confidenceColor =
    data.confidence === 'high' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' :
    data.confidence === 'medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/25' :
    'text-[#55556a] bg-[#1a1a24] border-[#2a2a38]'

  return (
    <div className="surface p-6 hover:border-[#3a3a52] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-white">{data.candidate_name.split(' ').pop()}</h3>
          <p className="text-xs text-[#55556a] mt-0.5">{data.candidate_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${confidenceColor}`}>
            {data.confidence === 'high' ? 'High Confidence' :
             data.confidence === 'medium' ? 'Medium Data' : 'Low Data'}
          </span>
        </div>
      </div>

      {/* Score */}
      <div className="flex items-end gap-3 mb-5">
        <div>
          <p className="text-xs text-[#55556a] mb-1">Sentiment Score</p>
          <p className={`text-3xl font-bold font-mono ${scoreColor}`}>
            {data.sentiment_score > 0 ? '+' : ''}{scoreDisplay}
          </p>
        </div>
        <div className="mb-1">
          {trendUp   && <div className="flex items-center gap-1 text-emerald-400 text-xs"><TrendingUp size={13} />+{(data.trend * 100).toFixed(0)} vs yesterday</div>}
          {trendDown && <div className="flex items-center gap-1 text-red-400 text-xs"><TrendingDown size={13} />{(data.trend * 100).toFixed(0)} vs yesterday</div>}
          {!trendUp && !trendDown && <div className="flex items-center gap-1 text-[#55556a] text-xs"><Minus size={13} />Stable</div>}
        </div>
      </div>

      {/* Stacked bar */}
      <div className="mb-3">
        <div className="flex h-2 rounded-full overflow-hidden gap-px">
          <div className="bg-emerald-500 rounded-l-full" style={{ width: `${data.positive_pct}%` }} />
          <div className="bg-[#2a2a38]" style={{ width: `${data.neutral_pct}%` }} />
          <div className="bg-red-500 rounded-r-full" style={{ width: `${data.negative_pct}%` }} />
        </div>
      </div>

      {/* Pct labels */}
      <div className="flex justify-between text-xs mb-5">
        <span className="text-emerald-400 font-mono">{data.positive_pct}% positive</span>
        <span className="text-[#55556a] font-mono">{data.neutral_pct}% neutral</span>
        <span className="text-red-400 font-mono">{data.negative_pct}% negative</span>
      </div>

      {/* Post count */}
      <div className="flex items-center gap-1.5 text-xs text-[#55556a] border-t border-[#1a1a24] pt-4">
        <MessageSquare size={11} />
        {data.total_count} posts analysed today
      </div>
    </div>
  )
}
