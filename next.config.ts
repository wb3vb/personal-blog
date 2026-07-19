import {existsSync, watch} from 'node:fs'
import {utimes} from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {NextConfig} from 'next'

const blogRoot = dirname(fileURLToPath(import.meta.url))
const postsDir = resolve(blogRoot, 'posts')
const postsModule = resolve(blogRoot, 'src/utils/Post.ts')

const globalWithPostWatcher = globalThis as typeof globalThis & {
  __blogPostWatcher?: ReturnType<typeof watch>
}

let postRefreshTimer: ReturnType<typeof setTimeout> | undefined

function isPostFile(filename: Buffer | string | null): boolean {
  return /\.mdx?$/.test(filename?.toString() ?? '')
}

function refreshPostModule() {
  clearTimeout(postRefreshTimer)
  postRefreshTimer = setTimeout(async () => {
    try {
      const now = new Date()
      await utimes(postsModule, now, now)
    } catch {
      // Keep Next dev running even if the filesystem notification fails.
    }
  }, 80)
}

function watchPostsInDevelopment() {
  if (globalWithPostWatcher.__blogPostWatcher || !existsSync(postsDir)) {
    return
  }

  globalWithPostWatcher.__blogPostWatcher = watch(
    postsDir,
    {recursive: true},
    (_event, filename) => {
      if (isPostFile(filename)) {
        refreshPostModule()
      }
    },
  )
}

if (process.env.NODE_ENV === 'development') {
  watchPostsInDevelopment()
}

const config: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    viewTransition: true,
  },
  outputFileTracingIncludes: {
    '/*': ['./posts/**/*'],
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {key: 'Service-Worker-Allowed', value: '/'},
          {key: 'Cache-Control', value: 'no-cache'},
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {source: '/llms.txt', destination: '/api/llms'},
      {source: '/llms-full.txt', destination: '/api/llms-full'},
      {source: '/en/llms-full.txt', destination: '/api/llms-full/en'},
      {
        source: '/en/:year(\\d{4})/:slug*.md',
        destination: '/api/posts-raw/en/:year/:slug*',
      },
      {
        source: '/:year(\\d{4})/:slug*.md',
        destination: '/api/posts-raw/:year/:slug*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ko',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ko/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/',
        has: [{type: 'query', key: 'page', value: '(?<no>\\d+)'}],
        destination: '/pages/:no',
        permanent: true,
      },
      // --- Ghost (wb3vb.io) legacy post URLs -> date-based URLs ---
      {
        source: '/1-naneun-wae-ideoriumeul-maesuhaneunga-the-possibility-of-deflation',
        destination:
          '/2025/08/1-naneun-wae-ideoriumeul-maesuhaneunga-the-possibility-of-deflation',
        permanent: true,
      },
      {
        source:
          '/2-naneun-wae-ideoriumeul-maesuhaneunga-seuteiking-doen-ideoriumeun-eonje-pulrilgga',
        destination:
          '/2025/08/2-naneun-wae-ideoriumeul-maesuhaneunga-seuteiking-doen-ideoriumeun-eonje-pulrilgga',
        permanent: true,
      },
      {
        source:
          '/3-ideorium-syading-sharding-yi-seonggong-yeonghyanggwa-ihu-l1-l2-ceinyi-heureume-daehan-saenggag',
        destination:
          '/2025/08/3-ideorium-syading-sharding-yi-seonggong-yeonghyanggwa-ihu-l1-l2-ceinyi-heureume-daehan-saenggag',
        permanent: true,
      },
      {
        source:
          '/4-ideorium-poseuteumeoji-post-merge-dipeulreisyeon-idaero-gwaencanheun-geolgga',
        destination:
          '/2025/08/4-ideorium-poseuteumeoji-post-merge-dipeulreisyeon-idaero-gwaencanheun-geolgga',
        permanent: true,
      },
      {
        source: '/ai-sidae',
        destination: '/2025/08/ai-sidae',
        permanent: true,
      },
      {
        source: '/biteukoingwa-eosaeghaeyo-sirijeu-2-biteukoin-gaebal-topabogi',
        destination:
          '/2025/08/biteukoingwa-eosaeghaeyo-sirijeu-2-biteukoin-gaebal-topabogi',
        permanent: true,
      },
      {
        source: '/coegeun-saenggagdeul-recent-thoughts',
        destination: '/2025/08/coegeun-saenggagdeul-recent-thoughts',
        permanent: true,
      },
      {
        source: '/eoseowa-s-s-s-shared-sequencer-suave-neun-ceoeumiji',
        destination: '/2025/08/eoseowa-s-s-s-shared-sequencer-suave-neun-ceoeumiji',
        permanent: true,
      },
      {
        source: '/fred-haedogbeob',
        destination: '/2025/08/fred-haedogbeob',
        permanent: true,
      },
      {
        source: '/how-to-study-economy',
        destination: '/2025/09/how-to-study-economy',
        permanent: true,
      },
      {
        source: '/hwagryuljeog-sago-probabilistic-thinking',
        destination: '/2025/08/hwagryuljeog-sago-probabilistic-thinking',
        permanent: true,
      },
      {
        source:
          '/kbw2022-bitalrig-gangyeon-post-merge-next-step-for-ethereum-full-ver-beonyeogbon',
        destination:
          '/2025/08/kbw2022-bitalrig-gangyeon-post-merge-next-step-for-ethereum-full-ver-beonyeogbon',
        permanent: true,
      },
      {
        source: '/keuribto-tuja-peureimweokeu-crypto-investment-thesis',
        destination: '/2025/08/keuribto-tuja-peureimweokeu-crypto-investment-thesis',
        permanent: true,
      },
      {
        source: '/krw-stablecoin-structure',
        destination: '/2025/09/krw-stablecoin-structure',
        permanent: true,
      },
      {
        source: '/mempul-seunaiping-mempool-sniping',
        destination: '/2025/08/mempul-seunaiping-mempool-sniping',
        permanent: true,
      },
      {
        source:
          '/mev-series-3-censorship-resistance-solutions-builder-centralization',
        destination:
          '/2025/08/mev-series-3-censorship-resistance-solutions-builder-centralization',
        permanent: true,
      },
      {
        source: '/nan-i-geimeul-haebwasseoyo-ive-played-this-game-before',
        destination: '/2025/08/nan-i-geimeul-haebwasseoyo-ive-played-this-game-before',
        permanent: true,
      },
      {
        source:
          '/seuteuraipeuwa-seokeulyi-l1-beulrogcein-culsi-geodae-cein-jeonjaengyi-seomag',
        destination:
          '/2025/08/seuteuraipeuwa-seokeulyi-l1-beulrogcein-culsi-geodae-cein-jeonjaengyi-seomag',
        permanent: true,
      },
      {
        source: '/sijang-jeonmang',
        destination: '/2025/09/sijang-jeonmang',
        permanent: true,
      },
      {
        source: '/sseunsori-harsh-criticism',
        destination: '/2025/08/sseunsori-harsh-criticism',
        permanent: true,
      },
      {
        source: '/thoughts-on-9-7-regulation',
        destination: '/2025/09/thoughts-on-9-7-regulation',
        permanent: true,
      },
      {
        source: '/weonhwa-seuteibeulkoin-donghyang-krw-stablecoin-status',
        destination: '/2025/08/weonhwa-seuteibeulkoin-donghyang-krw-stablecoin-status',
        permanent: true,
      },
      {
        source: '/tag/:tag',
        destination: '/tags/:tag/pages/1',
        permanent: true,
      },
      {
        source: '/tag/:tag/page/:no',
        destination: '/tags/:tag/pages/:no',
        permanent: true,
      },
      {
        source: '/tags/:tag/pages/((?!\\d).*)',
        destination: '/tags/:tag/pages/1',
        permanent: true,
      },
      {
        source: '/tags/:tag',
        destination: '/tags/:tag/pages/1',
        permanent: true,
      },
      {
        source: '/category/:tag',
        destination: '/tags/:tag/pages/1',
        permanent: true,
      },
      {
        source: '/category/:tag/page/:no',
        destination: '/tags/:tag/pages/:no',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/tags',
        permanent: true,
      },
    ]
  },
}

export default config
