import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'


import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>

        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <div className={`${dmsans.className} antialiased`}>
          <Header />
          {children}
          <Footer />
          </div>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
