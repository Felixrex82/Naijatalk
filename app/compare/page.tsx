import { getAllCandidates } from '@/lib/data'
import { CompareClient } from '@/components/comparison/CompareClient'

export const metadata = {
  title: 'Compare Candidates — Nigeria 2027',
  description: 'Side-by-side comparison of Nigeria 2027 presidential candidates.',
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { a?: string; b?: string }
}) {
  const candidates = await getAllCandidates()

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="section-heading mb-3">Side-by-Side</p>
        <h1 className="text-3xl font-bold text-white mb-4">Compare Candidates</h1>
        <p className="text-[#8888aa] max-w-2xl leading-relaxed">
          Select any two candidates and compare their scores across all dimensions using our
          evidence-weighted methodology.
        </p>
      </div>

      <CompareClient
        candidates={candidates}
        initialA={searchParams.a}
        initialB={searchParams.b}
      />
    </div>
  )
}
