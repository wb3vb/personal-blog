'use client'

import {useEffect, useState} from 'react'

import PostRow from './PostRow'

import {CATEGORIES, DEFAULT_CATEGORY, type CategorySlug} from '@/constants/categories'
import type {Post} from '@/type'

const INITIAL = 10
const STEP = 10
const VALID = new Set<string>(CATEGORIES.map((c) => c.slug))

export default function CategoryTabs({
  postsByCat,
  pathPrefix = '',
}: {
  postsByCat: Record<string, Post[]>
  pathPrefix?: string
}) {
  const isEn = Boolean(pathPrefix)

  // SSR/최초 렌더는 항상 기본 탭 → 하이드레이션 불일치 없음.
  // 마운트 후 URL의 ?cat= 을 읽어 반영(딥링크 지원).
  const [active, setActive] = useState<CategorySlug>(DEFAULT_CATEGORY)
  const [visible, setVisible] = useState(INITIAL)

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('cat')
    if (c && VALID.has(c)) {
      setActive(c as CategorySlug)
    }
  }, [])

  const selectTab = (slug: CategorySlug) => {
    if (slug === active) {
      return
    }
    setActive(slug)
    setVisible(INITIAL)
    // Next 라우터를 쓰지 않고 브라우저 history만 갱신(공유 가능한 URL 유지).
    const {pathname} = window.location
    const url = slug === DEFAULT_CATEGORY ? pathname : `${pathname}?cat=${slug}`
    window.history.replaceState(null, '', url)
  }

  const posts = postsByCat[active] ?? []
  const shown = posts.slice(0, visible)
  const remaining = posts.length - visible

  return (
    <div className="cat-view">
      <div
        className="cat-tabs"
        role="tablist"
        aria-label={isEn ? 'categories' : '분류'}
      >
        {CATEGORIES.map((c) => {
          const count = postsByCat[c.slug]?.length ?? 0
          const isActive = c.slug === active
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              className="cat-tab"
              data-active={isActive}
              onClick={() => selectTab(c.slug)}
            >
              <span className="cat-tab-label">{isEn ? c.en : c.ko}</span>
              <span className="cat-tab-count">{count}</span>
            </button>
          )
        })}
      </div>

      {posts.length === 0 ? (
        <p className="cat-empty">
          {isEn
            ? 'No posts in this category yet.'
            : '이 분류에 아직 글이 없어요.'}
        </p>
      ) : (
        <>
          <ul className="post-row-list">
            {shown.map((post, i) => (
              <li key={`${post.fields.slug}_${i}`}>
                <PostRow post={post} pathPrefix={pathPrefix} />
              </li>
            ))}
          </ul>
          {remaining > 0 && (
            <div className="rec-more">
              <button
                type="button"
                className="rec-more-btn"
                onClick={() => setVisible((v) => v + STEP)}
              >
                <span>{isEn ? 'Load more' : '더보기'}</span>
                <span className="rec-more-count">
                  +{Math.min(STEP, remaining)}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
