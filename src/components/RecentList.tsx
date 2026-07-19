'use client'

import {useState} from 'react'

import RecentRow from './RecentRow'

import type {Post} from '@/type'

const INITIAL_COUNT = 10
const STEP = 10

export default function RecentList({
  posts,
  pathPrefix = '',
}: {
  posts: Post[]
  pathPrefix?: string
}) {
  const [visible, setVisible] = useState(INITIAL_COUNT)
  const shown = posts.slice(0, visible)
  const remaining = posts.length - visible
  const hasMore = remaining > 0

  return (
    <>
      <section className="rec-list">
        {shown.map((post, i) => (
          <RecentRow
            key={post.fields.slug}
            post={post}
            index={i}
            pathPrefix={pathPrefix}
          />
        ))}
      </section>
      {hasMore && (
        <div className="rec-more">
          <button
            type="button"
            className="rec-more-btn"
            onClick={() => setVisible((v) => Math.min(v + STEP, posts.length))}
          >
            <span>{pathPrefix ? 'Load more' : '더보기'}</span>
            <span className="rec-more-count">+{Math.min(STEP, remaining)}</span>
          </button>
        </div>
      )}
    </>
  )
}
