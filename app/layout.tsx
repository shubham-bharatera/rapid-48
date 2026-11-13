import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rapid AI | 48-Hour Prototypes',
  description: 'Idea to Interactive Prototype in 48 Hours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Lemon Squeezy Overlay Script - Crucial for the popup to work */}
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
