import {cacheLife, cacheTag} from 'next/cache'
import {connection} from 'next/server'
import {Suspense} from 'react'

import type {Metadata} from 'next'

import CategoryTabs from '@/components/CategoryTabs'
import {SiteConfig} from '@/config'
import {groupPostsByCategory} from '@/constants/categories'
import {getAllPosts} from '@/utils/Post'

export const metadata: Metadata = {
  title: `Posts - ${SiteConfig.title}`,
  description: 'All posts grouped by category',
}

async function getEnPagesData() {
  const posts = await getAllPosts('en')
  return {count: posts.length, byCat: groupPostsByCategory(posts)}
}

async function getCachedEnPagesData() {
  'use cache'
  cacheLife('hours')
  cacheTag('pages:en')
  return getEnPagesData()
}

export default function EnPagesIndex() {
  return (
    <Suspense>
      <EnPagesContent />
    </Suspense>
  )
}

async function EnPagesContent() {
  if (process.env.NODE_ENV !== 'production') {
    await connection()
  }
  const {count, byCat} =
    process.env.NODE_ENV === 'production'
      ? await getCachedEnPagesData()
      : await getEnPagesData()

  return (
    <div className="page-view">
      <div className="sec-head">
        <div>
          <span className="sec-count">
            {String(count).padStart(2, '0')} POSTS
          </span>
          <h2>Posts</h2>
        </div>
        <div className="line" />
      </div>
      <CategoryTabs postsByCat={byCat} pathPrefix="/en" />
    </div>
  )
}
