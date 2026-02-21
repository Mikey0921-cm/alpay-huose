import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/components/i18n/language-context'
import { CurrencyProvider } from '@/components/i18n/currency-context'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Olive Grove Retreat - Fo\u00e7a - Alpay House',
  description: 'House in a 10-acre olive grove hosted by Alpay. Near Old Fo\u00e7a and New Fo\u00e7a, mountain and garden views, self check-in.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
