import { QuizClient } from '@/components/quiz/QuizClient'
import { QUIZ_QUESTIONS } from '@/lib/quiz'

export const metadata = {
  title: 'Political Alignment Quiz — Nigeria 2027',
  description:
    'Answer 10 questions and discover which 2027 Nigerian presidential candidate best aligns with your values.',
}

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="section-heading mb-3">Alignment Quiz</p>
        <h1 className="text-3xl font-bold text-white mb-4">Who Do You Align With?</h1>
        <p className="text-[#8888aa] leading-relaxed">
          Answer {QUIZ_QUESTIONS.length} questions on policy, values, and priorities. We'll
          calculate which 2027 presidential candidate best matches your stance — and generate
          a shareable result card.
        </p>

        <div className="mt-5 flex gap-4 flex-wrap">
          {[
            { label: `${QUIZ_QUESTIONS.length} Questions`, color: 'text-[#22d3a5]' },
            { label: '3 Candidates', color: 'text-[#8888aa]' },
            { label: 'Non-partisan', color: 'text-[#8888aa]' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${item.color}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <QuizClient />
    </div>
  )
}
