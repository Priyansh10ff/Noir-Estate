import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'NOIR Estate — Luxury Private Residences', template: '%s | NOIR Estate' },
  description: 'World-class luxury real estate. Penthouses, villas, and estates across the globe. Private viewings by appointment.',
  keywords: ['luxury real estate', 'private residences', 'penthouses', 'villas', 'estates'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'NOIR Estate',
    title: 'NOIR Estate — Luxury Private Residences',
    description: 'World-class luxury real estate. Private viewings by appointment.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'NOIR Estate' }],
  },
  twitter: { card: 'summary_large_image', site: '@noirestate' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#181818',
              color: '#F5F0E8',
              border: '1px solid rgba(201,169,110,0.3)',
              fontSize: '12px',
              letterSpacing: '0.5px',
              fontFamily: 'Montserrat, sans-serif',
            },
            success: { iconTheme: { primary: '#C9A96E', secondary: '#0A0A0A' } },
          }}
        />
      </body>
    </html>
  )
}
