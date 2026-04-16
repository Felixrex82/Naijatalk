import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a24] mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-4 bg-[#008751] rounded-sm" />
              <span className="w-2.5 h-4 bg-[#f0f0f8] rounded-sm" />
              <span className="w-2.5 h-4 bg-[#008751] rounded-sm" />
              <span className="ml-1 font-semibold text-sm">Nigeria 2027</span>
            </div>
            <p className="text-[#55556a] text-sm leading-relaxed">
              An independent, non-partisan platform providing evidence-based political
              analysis for Nigerian citizens ahead of the 2027 elections.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#55556a] mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/candidates', label: 'Candidate Profiles' },
                { href: '/compare', label: 'Compare Candidates' },
                { href: '/quiz', label: 'Alignment Quiz' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#8888aa] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#55556a] mb-4">
              Disclaimer
            </h4>
            <p className="text-[#55556a] text-sm leading-relaxed">
              All claims are sourced from public records, reputable journalism, and official documents.
              This platform does not endorse any candidate.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1a1a24] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#55556a] text-xs">
            © 2025 Nigeria 2027 Political Compass. Independent & Non-Partisan.
          </p>
          <p className="text-[#55556a] text-xs">
            Data sourced from INEC, premium journalism, official government records.
          </p>
        </div>
      </div>
    </footer>
  )
}
