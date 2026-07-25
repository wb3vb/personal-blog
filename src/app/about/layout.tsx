import type {Metadata} from 'next'
import type {ReactNode} from 'react'

import {SiteConfig} from '@/config'
import {buildOgImageUrl} from '@/utils/og'

export const metadata: Metadata = {
  title: 'About - ' + SiteConfig.title,
  description: SiteConfig.preview.en.about,
  openGraph: {
    title: 'About - ' + SiteConfig.title,
    description: SiteConfig.preview.en.about,
    url: `${SiteConfig.url}/about`,
    images: [
      {
        url: buildOgImageUrl({
          title: 'About - ' + SiteConfig.title,
          description: SiteConfig.preview.en.about,
          path: '/about',
          type: 'page',
          locale: 'en',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: `${SiteConfig.url}/about`,
  },
}

export default function Layout({children}: {children: ReactNode}) {
  return <>{children}</>
}
