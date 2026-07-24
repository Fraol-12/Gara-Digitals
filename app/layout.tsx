import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Geist_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AiAssistantProvider } from '@/components/ai-assistant-provider'
import { AiAssistantModal } from '@/components/ai-assistant-modal'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Gara Media — Enterprise Branding, Marketing & Software',
    template: '%s | Gara Media',
  },
  description:
    'Gara Media partners with ambitious organizations to deliver enterprise-grade marketing, branding, and software solutions — combining the discipline of an established partner with the responsiveness of a dedicated team.',
  generator: 'v0.app',
  keywords: [
    'branding',
    'digital marketing',
    'software development',
    'digital transformation',
    'enterprise',
    'Ethiopia',
    'Gara Media',
    'Gara Digitals',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0b2545',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <AiAssistantProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <AiAssistantModal />
        </AiAssistantProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
