'use client'

import { useEffect, useState } from 'react'

interface ScoreBarProps {
  value: number
  max?: number
  color?: 'green' | 'amber' | 'red' | 'blue'
  label?: string
  showValue?: boolean
  delay?: number
}

const colorMap = {
  green: 'bg-emerald-400',
  amber: 'bg-amber-400',
  red: 'bg-red-400',
  blue: 'bg-blue-400',
}

export function ScoreBar({
  value,
  max = 10,
  color = 'green',
  label,
  showValue = true,
  delay = 0,
}: ScoreBarProps) {
  const [width, setWidth] = useState(0)
  const pct = Math.min(100, (value / max) * 100)

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100 + delay)
    return () => clearTimeout(t)
  }, [pct, delay])

  const autoColor = () => {
    if (pct >= 70) return colorMap.green
    if (pct >= 40) return colorMap.amber
    return colorMap.red
  }

  const barColor = color ? colorMap[color] : autoColor()

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-[#8888aa]">{label}</span>}
          {showValue && (
            <span className="text-xs font-mono font-medium text-[#f0f0f8]">
              {value.toFixed(1)}/{max}
            </span>
          )}
        </div>
      )}
      <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
