import type {Metadata} from 'next'
import type {ReactNode} from 'react'

import {SiteConfig} from '@/config'
import {buildOgImageUrl} from '@/utils/og'

export const metadata: Metadata = {
  title: 'Experience - ' + SiteConfig.title,
  description: SiteConfig.preview.en.resume,
  openGraph: {
    title: 'Experience - ' + SiteConfig.title,
    description: SiteConfig.preview.en.resume,
    url: `${SiteConfig.url}/resume`,
    images: [
      {
        url: buildOgImageUrl({
          title: 'Experience - ' + SiteConfig.title,
          description: SiteConfig.preview.en.resume,
          locale: 'en',
          path: '/resume',
          type: 'page',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Layout({children}: {children: ReactNode}) {
  return <>{children}</>
}
