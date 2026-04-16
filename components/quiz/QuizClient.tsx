'use client'

import { useState, useRef } from 'react'
import { QUIZ_QUESTIONS, computeQuizResult } from '@/lib/quiz'
import { QuizResultCard } from './QuizResultCard'
import { CheckCircle2, Circle, ArrowRight, ArrowLeft } from 'lucide-react'

export function QuizClient() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<Record<string, number> | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const total = QUIZ_QUESTIONS.length
  const current = QUIZ_QUESTIONS[currentIdx]
  const progress = Math.round(((currentIdx + (answers[current?.id] ? 1 : 0)) / total) * 100)
  const answered = Object.keys(answers).length
  const allAnswered = answered === total

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const goNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1)
      scrollTop()
    }
  }

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1)
      scrollTop()
    }
  }

  const handleSubmit = () => {
    const res = computeQuizResult(answers)
    setResult(res)
    setSubmitted(true)
    scrollTop()
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentIdx(0)
    setSubmitted(false)
    setResult(null)
    scrollTop()
  }

  if (submitted && result) {
    return <QuizResultCard result={result} onRetake={handleReset} />
  }

  const selectedOption = answers[current?.id]
  const isLast = currentIdx === total - 1

  return (
    <div ref={topRef}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#55556a]">
            Question {currentIdx + 1} of {total}
          </span>
          <span className="text-xs font-mono text-[#8888aa]">
            {answered}/{total} answered
          </span>
        </div>
        <div className="h-1 bg-[#1a1a24] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#22d3a5] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question dots navigation */}
      <div className="flex gap-1.5 mb-8 flex-wrap">
        {QUIZ_QUESTIONS.map((q, i) => (
          <button
            key={q.id}
            onClick={() => { setCurrentIdx(i); scrollTop() }}
            className={`w-6 h-6 rounded-md text-[10px] font-mono font-semibold transition-all duration-200 ${
              i === currentIdx
                ? 'bg-[#22d3a5] text-[#0a0a0f]'
                : answers[q.id]
                ? 'bg-[#22d3a5]/20 text-[#22d3a5] border border-[#22d3a5]/30'
                : 'bg-[#1a1a24] text-[#55556a] hover:bg-[#2a2a38]'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question card */}
      <div className="surface p-6 sm:p-8 mb-6 slide-up" key={current.id}>
        <p className="text-xs text-[#55556a] mb-3 font-medium tracking-wide">
          Question {currentIdx + 1}
        </p>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 leading-relaxed">
          {current.text}
        </h2>

        <div className="space-y-3">
          {current.options.map((option) => {
            const isSelected = selectedOption === option.id
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(current.id, option.id)}
                className={`w-full text-left flex items-start gap-4 px-5 py-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-[#22d3a5]/50 bg-[#22d3a5]/8'
                    : 'border-[#2a2a38] hover:border-[#3a3a52] bg-[#0a0a0f] hover:bg-[#111118]'
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">
                  {isSelected ? (
                    <CheckCircle2 size={16} className="text-[#22d3a5]" />
                  ) : (
                    <Circle size={16} className="text-[#3a3a52]" />
                  )}
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    isSelected ? 'text-white font-medium' : 'text-[#aaaacc]'
                  }`}
                >
                  {option.text}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-2 btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={14} /> Previous
        </button>

        <div className="flex items-center gap-3">
          {isLast && allAnswered ? (
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center gap-2"
            >
              View My Results →
            </button>
          ) : isLast ? (
            <p className="text-xs text-[#55556a]">Answer all questions to submit</p>
          ) : (
            <button
              onClick={goNext}
              disabled={!selectedOption}
              className="flex items-center gap-2 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Skip to results if all answered but not on last */}
      {allAnswered && !isLast && (
        <div className="mt-4 text-center">
          <button
            onClick={handleSubmit}
            className="text-xs text-[#22d3a5] hover:underline"
          >
            All questions answered — skip to results →
          </button>
        </div>
      )}
    </div>
  )
}
