import {cacheLife, cacheTag} from 'next/cache'
import {connection} from 'next/server'
import {Suspense} from 'react'

import type {Metadata} from 'next'

import CategoryTabs from '@/components/CategoryTabs'
import {SiteConfig} from '@/config'
import {groupPostsByCategory} from '@/constants/categories'
import {getAllPosts} from '@/utils/Post'

export const metadata: Metadata = {
  title: `포스트 - ${SiteConfig.title}`,
  description: '분류별로 모아 보는 전체 글',
}

async function getPagesData() {
  const posts = await getAllPosts('ko')
  return {count: posts.length, byCat: groupPostsByCategory(posts)}
}

async function getCachedPagesData() {
  'use cache'
  cacheLife('hours')
  cacheTag('pages:ko')
  return getPagesData()
}

export default function PagesIndex() {
  return (
    <Suspense>
      <PagesContent />
    </Suspense>
  )
}

async function PagesContent() {
  if (process.env.NODE_ENV !== 'production') {
    await connection()
  }
  const {count, byCat} =
    process.env.NODE_ENV === 'production'
      ? await getCachedPagesData()
      : await getPagesData()

  return (
    <div className="page-view">
      <div className="sec-head">
        <div>
          <span className="sec-count">
            {String(count).padStart(2, '0')} POSTS
          </span>
          <h2>포스트</h2>
        </div>
        <div className="line" />
      </div>
      <CategoryTabs postsByCat={byCat} />
    </div>
  )
}
