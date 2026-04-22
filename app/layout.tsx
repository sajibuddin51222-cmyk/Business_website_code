import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FusionBytePro',
  description: 'FusionBytePro',
  generator: 'FusionBytePro',
  icons: {
    icon: '/logo_app_bar.png',
  },
}

import { Toaster } from 'sonner'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { LoadingTransition } from '@/components/loading-transition'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} mesh-gradient animate-mesh`} suppressHydrationWarning>
        <LoadingTransition />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
