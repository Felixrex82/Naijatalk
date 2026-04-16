import { Category } from '@/types'

const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  economy: { label: 'Economy', color: 'bg-blue-500/15 text-blue-300 border-blue-500/20' },
  governance: { label: 'Governance', color: 'bg-purple-500/15 text-purple-300 border-purple-500/20' },
  corruption: { label: 'Corruption', color: 'bg-red-500/15 text-red-300 border-red-500/20' },
  education: { label: 'Education', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' },
  security: { label: 'Security', color: 'bg-orange-500/15 text-orange-300 border-orange-500/20' },
  infrastructure: { label: 'Infrastructure', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20' },
  'foreign-policy': { label: 'Foreign Policy', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20' },
  health: { label: 'Health', color: 'bg-pink-500/15 text-pink-300 border-pink-500/20' },
  democracy: { label: 'Democracy', color: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
  social: { label: 'Social', color: 'bg-teal-500/15 text-teal-300 border-teal-500/20' },
}

export function CategoryBadge({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category] || {
    label: category,
    color: 'bg-[#1a1a24] text-[#8888aa] border-[#2a2a38]',
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase border ${config.color}`}
    >
      {config.label}
    </span>
  )
}
