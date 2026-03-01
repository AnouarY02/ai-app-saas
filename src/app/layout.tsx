import './globals.css'

/**
 * Root layout — minimal shell. The actual html/body/lang is
 * set by the [locale] layout so each language gets the correct
 * lang attribute.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
