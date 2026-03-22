import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AZX Signal — Transformation Intelligence',
  description:
    'Enter a company. See what AZX sees before walking in the room. AI transformation intelligence for critical industries.',
  openGraph: {
    title: 'AZX Signal — Transformation Intelligence',
    description:
      'Enter a company. See what AZX sees before walking in the room.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
