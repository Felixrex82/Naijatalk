'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Flag } from 'lucide-react'

const NAV_LINKS = [
  { href: '/candidates', label: 'Candidates' },
  { href: '/compare', label: 'Compare' },
  { href: '/sentiment', label: 'Sentiment' },
  { href: '/quiz', label: 'Take the Quiz' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a24] bg-[#0a0a0f]/90 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center gap-1">
            <span className="w-3 h-5 bg-[#008751] rounded-sm" />
            <span className="w-3 h-5 bg-[#f0f0f8] rounded-sm" />
            <span className="w-3 h-5 bg-[#008751] rounded-sm" />
          </div>
          <div>
            <span className="font-semibold text-white text-sm tracking-tight">Nigeria 2027</span>
            <span className="block text-[10px] text-[#55556a] tracking-widest uppercase -mt-0.5">
              Political Compass
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                pathname.startsWith(link.href)
                  ? 'bg-[#1a1a24] text-white'
                  : 'text-[#8888aa] hover:text-white hover:bg-[#111118]'
              } ${link.label === 'Take the Quiz' ? '!text-[#22d3a5] border border-[#22d3a5]/30 hover:border-[#22d3a5]/60 hover:bg-[#22d3a5]/10' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[#8888aa] hover:text-white hover:bg-[#111118] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#1a1a24] bg-[#0a0a0f]">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'bg-[#1a1a24] text-white'
                    : 'text-[#8888aa] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
