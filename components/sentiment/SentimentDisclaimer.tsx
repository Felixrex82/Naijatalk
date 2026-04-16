import { AlertTriangle } from 'lucide-react'

export function SentimentDisclaimer() {
  return (
    <div className="flex gap-3 px-5 py-4 rounded-xl bg-amber-500/6 border border-amber-500/20">
      <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-400/80 leading-relaxed">
        <strong className="text-amber-400">Disclaimer:</strong> This sentiment analysis is based on
        sampled public social media posts and may not fully represent public opinion. It may not
        detect sarcasm, irony, or cultural nuance. Results are updated daily and should not be
        treated as polling data.
      </p>
    </div>
  )
}
