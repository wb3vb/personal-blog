import './tailwind.css'

import {Fraunces, Inter_Tight, JetBrains_Mono} from 'next/font/google'
import Script from 'next/script'

import {Analytics as VercelAnalytics} from '@vercel/analytics/react'
import {SpeedInsights as VercelSpeedInsights} from '@vercel/speed-insights/next'


import type {Metadata} from 'next'
import type {ReactNode} from 'react'

// 라틴/숫자 전반. Inter의 폭 좁은 변형이라 같은 크기에서 밀도가 올라간다.
// 100~900 전구간이 있어 히어로 900도 가짜 볼드 없이 렌더된다. 근거: typography.md
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['italic', 'normal'],
})

// 글 본문도 --font-sans로 통일했다(2026-07). Manrope 제거로 웹폰트 1종이 줄었다.

import AmbientEffects from '@/components/AmbientEffects'
import {BotTracker} from '@/components/BotTracker'
import {GoogleAnalyticsWebVitalsTracker} from '@/components/GoogleAnalyticsWebVitalsTracker'
import LayoutWrapper from '@/components/LayoutWrapper'
import NavigationDirection from '@/components/NavigationDirection'
import {ServiceWorkerRegistration} from '@/components/ServiceWorkerRegistration'
import {SiteConfig} from '@/config'
import {Providers} from '@/shared/components'
import {buildOgImageUrl} from '@/utils/og'
// import {getAllPosts, getAllTagsFromPosts} from '@/utils/Post'

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.url,
  authors: [{name: SiteConfig.author.name}],
  referrer: 'origin-when-cross-origin',
  creator: SiteConfig.author.name,
  publisher: SiteConfig.author.name,
  metadataBase: new URL(SiteConfig.url),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `wb3vb's blog · ${SiteConfig.preview.ko.badge}`,
    description: SiteConfig.preview.ko.lead,
    url: SiteConfig.url,
    siteName: SiteConfig.title,
    images: [
      {
        url: buildOgImageUrl({
          title: SiteConfig.title,
          description: SiteConfig.preview.ko.lead,
          type: 'page',
          locale: 'ko',
        }),
        width: 1200,
        height: 630,
        alt: SiteConfig.title,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `wb3vb's blog · ${SiteConfig.preview.ko.badge}`,
    description: SiteConfig.preview.ko.lead,
    images: [
      buildOgImageUrl({
        title: SiteConfig.title,
        description: SiteConfig.preview.ko.lead,
        type: 'page',
        locale: 'ko',
      }),
    ],
  },
  icons: {
    icon: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/apple-touch-icon.png',
    apple: '/favicon/apple-touch-icon.png',
    other: {
      rel: '/favicon/apple-icon-precomposed',
      url: '/favicon/apple-icon-precomposed.png',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const GA_MEASUREMENT_ID = SiteConfig.googleAnalyticsId

export default async function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <html
        lang="ko"
        data-scroll-behavior="smooth"
        suppressHydrationWarning
        className={`${interTight.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)tw-theme=([^;]+)/);if(m){localStorage.setItem('theme',decodeURIComponent(m[1]));}}catch(e){}})();`,
            }}
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed"
            href="/feed.xml"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="mobile-web-app-capable" content="yes" />
        </head>
        <body className="antialiased">
          <NavigationDirection />
          <AmbientEffects />
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
          {/*
            개발 중 방문까지 GA로 보내면 그 조회수가 인기글 순위에 그대로 섞인다.
            아래 Vercel Analytics와 같은 기준으로 프로덕션에서만 실행한다.
          */}
          {GA_MEASUREMENT_ID && process.env.NODE_ENV === 'production' && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              />
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                }}
              />
            </>
          )}
          {process.env.NODE_ENV === 'production' && (
            <>
              <VercelAnalytics />
              <VercelSpeedInsights />
              <GoogleAnalyticsWebVitalsTracker />
              <BotTracker />
              <ServiceWorkerRegistration />
            </>
          )}
        </body>
      </html>
    </>
  )
}
