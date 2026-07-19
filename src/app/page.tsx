import {cacheLife, cacheTag} from 'next/cache'
import {connection} from 'next/server'
import {Suspense} from 'react'

import type {Metadata} from 'next'

import Hero from '@/components/HeroE'
import PostCard from '@/components/PostCard'
import RecentList from '@/components/RecentList'
import {SiteConfig} from '@/config'
import {buildOgImageUrl} from '@/utils/og'
import {getAllPosts, getAllTagsFromPosts, getFeaturedPosts} from '@/utils/Post'

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.subtitle,
  openGraph: {
    title: SiteConfig.title,
    description: SiteConfig.subtitle,
    url: SiteConfig.url,
    images: [
      {
        url: buildOgImageUrl({
          title: SiteConfig.title,
          description: `${SiteConfig.subtitle}'s blog`,
          path: '/',
          type: 'page',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
}

async function getCachedHomeData() {
  'use cache'
  cacheLife('hours')
  cacheTag('home:ko')

  return getHomeData()
}

async function getHomeData() {
  const [{popular: posts}, allPosts, tags] = await Promise.all([
    getFeaturedPosts('ko'),
    getAllPosts('ko'),
    getAllTagsFromPosts('ko'),
  ])

  // Recent = 인기글을 뺀 나머지 전체(날짜 내림차순). 홈에서는 10개만 노출하고
  // '더보기'로 추가 로딩한다(RecentList).
  const popularSlugs = new Set(posts.map((p) => p.fields.slug))
  const recentPosts = allPosts.filter((p) => !popularSlugs.has(p.fields.slug))

  const postCount = allPosts.length
  const tagCount = tags.length
  const earliestYear = allPosts
    .map((p) => new Date(p.frontMatter.date).getFullYear())
    .reduce((a, b) => Math.min(a, b), new Date().getFullYear())
  const yearsWriting = Math.max(1, new Date().getFullYear() - earliestYear + 1)

  return {posts, recentPosts, postCount, tagCount, yearsWriting}
}

export default function Page() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}

async function HomeContent() {
  if (process.env.NODE_ENV !== 'production') {
    await connection()
  }
  const homeData =
    process.env.NODE_ENV === 'production'
      ? await getCachedHomeData()
      : await getHomeData()

  const {posts, recentPosts, postCount, tagCount, yearsWriting} = homeData

  return (
    <div className="page-view">
      <Hero
        postCount={postCount}
        tagCount={tagCount}
        yearsWriting={yearsWriting}
      />

      <div className="sec-head">
        <div>
          <span className="sec-count">
            {String(posts.length).padStart(2, '0')} ITEMS
          </span>
          <h2>
            Popular <em>this season</em>
          </h2>
        </div>
        <div className="line" />
        <div className="hint">hover · tilt · open</div>
      </div>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.fields.slug} post={post} />
        ))}
      </section>

      {recentPosts.length > 0 && (
        <>
          <div className="sec-head">
            <div>
              <span className="sec-count">
                {String(recentPosts.length).padStart(2, '0')} ITEMS
              </span>
              <h2>Recent</h2>
            </div>
            <div className="line" />
            <div className="hint">latest writing</div>
          </div>
          <RecentList posts={recentPosts} />
        </>
      )}
    </div>
  )
}
