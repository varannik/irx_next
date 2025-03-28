import type { Metadata } from "next";
import { Providers } from '@/app/providers'
import Layout from '@/components/Layout'
import { GoogleAnalytics } from '@next/third-parties/google'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import '@/styles/tailwind.css'


export const metadata: Metadata = {
  title: {
    template: 'Quantical',
    default:
      'Real-Time Exchange Tracker, Live Iranian Free Market Rates',
  },
  manifest: '/manifest.json'
  ,description:
    'Real-Time Exchange Rate Tracker provides a comprehensive solution for monitoring the Iranian free market currency fluctuations. This innovative platform offers up-to-the-minute exchange rates, backed by advanced AI analytics and insights from our knowledgeable human community.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-black antialiased" suppressHydrationWarning>
      <body className="w-full flex min-h-full flex-col">
       <GoogleAnalytics gaId="G-M7HSXGNQP3" />
        <Providers >
            <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}


