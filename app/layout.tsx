import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Nigeria 2027 — Political Compass',
  description:
    'Evidence-based comparison of Nigeria\'s 2027 presidential candidates. Strengths, weaknesses, controversies — all sourced and verified.',
  openGraph: {
    title: 'Nigeria 2027 — Political Compass',
    description: 'Compare Nigeria\'s 2027 presidential candidates with verified evidence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body className="bg-[#0a0a0f] text-white antialiased min-h-screen">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
