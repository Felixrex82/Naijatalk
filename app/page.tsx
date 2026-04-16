import Link from 'next/link'
import { getAllCandidates } from '@/lib/data'
import { computeCandidateScore } from '@/utils/scoring'
import { ArrowRight, BarChart3, CheckSquare, Users, ShieldCheck } from 'lucide-react'

export default async function HomePage() {
  const candidates = await getAllCandidates()

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-[#1a1a24] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#22d3a5]/4 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#3b82f6]/4 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-4 bg-[#008751] rounded-sm" />
              <span className="w-2.5 h-4 bg-[#f0f0f8] rounded-sm" />
              <span className="w-2.5 h-4 bg-[#008751] rounded-sm" />
              <span className="ml-2 text-xs text-[#55556a] font-semibold tracking-widest uppercase">
                Nigeria 2027 Elections
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Know Before
              <br />
              <span className="text-gradient">You Vote.</span>
            </h1>

            <p className="text-lg text-[#8888aa] leading-relaxed mb-8 max-w-2xl">
              Evidence-based profiles of Nigeria's 2027 presidential candidates. Every strength,
              weakness, and controversy is sourced, rated for credibility, and linked to proof.
              No spin. No affiliation. Just facts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/candidates" className="btn-primary text-base px-6 py-3">
                Explore Candidates →
              </Link>
              <Link href="/quiz" className="btn-ghost text-base px-6 py-3">
                Take the Alignment Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate quick cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-heading mb-2">2027 Candidates</p>
            <h2 className="text-2xl font-bold text-white">The Field</h2>
          </div>
          <Link href="/candidates" className="text-xs text-[#55556a] hover:text-white transition-colors flex items-center gap-1">
            All profiles <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {candidates.map((candidate) => {
            const scores = computeCandidateScore(candidate.claims)
            const PARTY_DOT: Record<string, string> = { APC: 'bg-emerald-400', ADC: 'bg-red-400', PDP: 'bg-blue-400' }

            return (
              <Link
                key={candidate.id}
                href={`/candidates/${candidate.slug}`}
                className="candidate-card group"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`w-2 h-2 rounded-full ${PARTY_DOT[candidate.party] || 'bg-[#55556a]'}`} />
                  <span className="text-xs font-semibold text-[#55556a]">{candidate.party}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#22d3a5] transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-xs text-[#55556a] mb-4">{candidate.state_of_origin} · Age {candidate.age}</p>
                <p className="text-sm text-[#8888aa] leading-relaxed line-clamp-3 mb-6">
                  {candidate.description}
                </p>

                <div className="pt-4 border-t border-[#1a1a24] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-emerald-400 font-mono">+{scores.strength_score.toFixed(1)}</span>
                    <span className="text-amber-400 font-mono">−{scores.weakness_score.toFixed(1)}</span>
                    <span className="text-red-400 font-mono">⚠{scores.controversy_score.toFixed(1)}</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-white">
                    {scores.final_score.toFixed(0)}
                    <span className="text-[10px] text-[#55556a] font-normal">/100</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#1a1a24]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Verified Claims',
                desc: 'Every claim links to primary sources — court records, official reports, credible journalism.',
                color: 'text-emerald-400',
              },
              {
                icon: BarChart3,
                title: 'Scored Objectively',
                desc: 'Credibility scores (1–10) and significance weights give each claim its proper weight.',
                color: 'text-blue-400',
              },
              {
                icon: Users,
                title: 'Side-by-Side',
                desc: 'Compare any two candidates across dimensions with visual breakdowns.',
                color: 'text-purple-400',
              },
              {
                icon: CheckSquare,
                title: 'Alignment Quiz',
                desc: 'Discover which candidate matches your values. Share your result card.',
                color: 'text-amber-400',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="surface p-6">
                <Icon size={20} className={`${color} mb-4`} />
                <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-[#8888aa] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="surface p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#22d3a5]/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-xl">
            <p className="section-heading mb-3">Alignment Quiz</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Which Candidate Thinks Like You?
            </h2>
            <p className="text-[#8888aa] leading-relaxed mb-6">
              Answer 10 policy questions. We'll calculate your alignment with each candidate and
              generate a shareable result card — no signup required.
            </p>
            <Link href="/quiz" className="btn-primary text-sm px-6 py-3">
              Start the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
