import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VOLT Sleep — Wakker met energie. Elke dag.',
  description:
    'Optimaliseer je energie door slimmer te slapen. Evidence-based coaching, 1 actie per dag.',
  keywords: ['slaap', 'energie', 'coaching', 'ritme', 'productiviteit'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
