import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Phygi Ads — La pub offline, enfin mesurable',
  description: 'La première plateforme africaine qui connecte la publicité physique à la data digitale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
