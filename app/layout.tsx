import type { Metadata } from "next";
import { Providers } from '@/app/providers'
import Layout from '@/components/Layout'

import '@/styles/tailwind.css'
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: {
    template: 'Quantical',
    default:
      'Real-Time Exchange Tracker, Live Iranian Free Market Rates',
  },
  description:
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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full ">
        <Providers >
          <div className="w-full bg-black">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}


