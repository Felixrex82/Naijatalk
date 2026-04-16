import { TrendingUp, TrendingDown, AlertTriangle, ExternalLink, Clock } from 'lucide-react'

interface NewsInsightCardProps {
  title: string
  summary: string
  source: string
  sourceUrl: string
  type: 'strength' | 'weakness' | 'controversy'
  confidenceScore: number
  createdAt: string
}

const TYPE_CONFIG = {
  strength:    { icon: TrendingUp,    color: 'text-emerald-400', border: 'border-l-emerald-500', label: 'Strength'    },
  weakness:    { icon: TrendingDown,  color: 'text-amber-400',   border: 'border-l-amber-500',   label: 'Weakness'    },
  controversy: { icon: AlertTriangle, color: 'text-red-400',     border: 'border-l-red-500',     label: 'Controversy' },
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function NewsInsightCard({
  title, summary, source, sourceUrl, type, confidenceScore, createdAt,
}: NewsInsightCardProps) {
  const cfg = TYPE_CONFIG[type]
  const Icon = cfg.icon

  return (
    <div className={`surface border-l-2 ${cfg.border} hover:border-[#3a3a52] transition-all duration-200 p-5`}>
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Icon size={13} className={cfg.color} />
          <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#55556a]">
          <Clock size={11} />
          <span>{timeAgo(createdAt)}</span>
          <span className="font-mono bg-[#1a1a24] px-1.5 py-0.5 rounded text-[10px]">
            {confidenceScore}/10
          </span>
        </div>
      </div>

      <h4 className="text-sm font-semibold text-white mb-2 leading-snug">{title}</h4>
      <p className="text-xs text-[#8888aa] leading-relaxed mb-3">{summary}</p>

      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-[#55556a] hover:text-[#22d3a5] transition-colors group"
      >
        <ExternalLink size={10} className="group-hover:text-[#22d3a5]" />
        {source}
      </a>
    </div>
  )
}
