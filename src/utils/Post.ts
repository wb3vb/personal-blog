import fs from 'fs'

import {cache} from 'react'

import frontMatter from 'front-matter'
import {sync} from 'glob'
import readingTime from 'reading-time'

import {getPopularPostSlugs} from './analytics'
import {POST_ROOT, isLocaleFile, pathToSlug} from './postPaths'

import type {Locale} from './postPaths'
import type {FrontMatter, Post, TagWithCount} from '../type'

import {POPULAR_POSTS_COUNT, RECENT_POSTS_COUNT} from '@/constants'
import {
  CATEGORIES,
  resolveCategory,
  type CategorySlug,
} from '@/constants/categories'

const THUMB_DIR = `${process.cwd()}/public/thumbnails`

export type {Locale}

export const getAllPosts = cache(async function getAllPosts(
  locale: Locale = 'ko',
): Promise<Post[]> {
  const files = sync(`${POST_ROOT}/**/*.md*`).reverse()

  const posts = files
    .filter((f) => isLocaleFile(f, locale))
    .reduce<Post[]>((prev, path) => {
      const file = fs.readFileSync(path, {encoding: 'utf8'})
      const {attributes, body} = frontMatter<FrontMatter>(file)
      const fm: FrontMatter = attributes
      const {tags: fmTags, published, date} = fm

      const slug = pathToSlug(path)

      const isDev = process.env.NODE_ENV !== 'production'
      if (published || isDev) {
        const tags: string[] = (fmTags || []).map((tag: string) => tag.trim())
        const stats = readingTime(body, {wordsPerMinute: 250})

        const thumbPath = `${THUMB_DIR}/${slug}.png`
        const thumbnail = fs.existsSync(thumbPath)
          ? `/thumbnails/${slug}.png`
          : undefined

        const result: Post = {
          frontMatter: {
            ...fm,
            tags,
            date: new Date(date).toISOString().substring(0, 19),
            thumbnail,
          },
          body,
          fields: {
            slug,
          },
          path,
          readingTime: Math.max(1, Math.ceil(stats.minutes)),
        }
        prev.push(result)
      }
      return prev
    }, [])
    .sort((a, b) => {
      if (a.frontMatter.date < b.frontMatter.date) {
        return 1
      }
      if (a.frontMatter.date > b.frontMatter.date) {
        return -1
      }
      return 0
    })

  return posts
})

export const findPostByYearAndSlug = cache(async function findPostByYearAndSlug(
  year: string,
  slug: string[],
  locale: Locale = 'ko',
) {
  const slugs = [year, ...slug].join('/')
  const posts = await getAllPosts(locale)
  return posts.find((p) => p?.fields?.slug === slugs)
})

export const getAllTagsFromPosts = cache(async function getAllTagsFromPosts(
  locale: Locale = 'ko',
): Promise<TagWithCount[]> {
  const posts = await getAllPosts(locale)
  const tagCountMap = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.frontMatter.tags) {
      tagCountMap.set(tag, (tagCountMap.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(tagCountMap.entries())
    .map(([tag, count]) => ({tag, count}))
    .sort((a, b) => b.count - a.count)
})

export interface TagGraphNode {
  id: string
  label: string
  /** 'category' = 허브, 'tag' = 주변 노드 */
  kind: 'category' | 'tag'
  count: number
  /** 클릭했을 때 열리는 글 목록 경로 */
  href: string
  /** 색을 묶는 기준이 되는 카테고리 슬러그 */
  group: string
}
export interface TagGraphLink {
  source: string
  target: string
  weight: number
}
export interface TagGraph {
  nodes: TagGraphNode[]
  links: TagGraphLink[]
}

/**
 * 태그 관계 그래프.
 * 카테고리를 허브 노드로 두고 그 아래 태그를 잇는다. 링크는 전부 실제 글에서 나온다.
 * 같은 글에 함께 달린 태그끼리도 추가로 연결한다(Obsidian 그래프 뷰와 같은 방식).
 */
export const getTagGraph = cache(async function getTagGraph(
  locale: Locale = 'ko',
): Promise<TagGraph> {
  const posts = await getAllPosts(locale)

  const catCount = new Map<CategorySlug, number>()
  const tagCount = new Map<string, number>()
  /** 태그가 어느 분류에서 가장 많이 나왔는지. 노드 색을 물려줄 기준이 된다. */
  const tagGroup = new Map<string, Map<CategorySlug, number>>()
  const catTag = new Map<string, number>()
  const tagPair = new Map<string, number>()

  for (const post of posts) {
    // /pages 탭과 같은 규칙으로 분류한다. 그래야 카테고리 노드를 눌렀을 때
    // 열리는 탭의 글 수와 그래프에 찍힌 숫자가 어긋나지 않는다.
    const category = resolveCategory(
      post.frontMatter.category,
      post.frontMatter.tags,
    )
    const tags = [...new Set(post.frontMatter.tags)].sort()

    catCount.set(category, (catCount.get(category) ?? 0) + 1)

    for (const tag of tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1)

      const seen = tagGroup.get(tag) ?? new Map<CategorySlug, number>()
      seen.set(category, (seen.get(category) ?? 0) + 1)
      tagGroup.set(tag, seen)

      const key = `cat:${category}\u0000tag:${tag}`
      catTag.set(key, (catTag.get(key) ?? 0) + 1)
    }
    for (let i = 0; i < tags.length; i++) {
      for (let j = i + 1; j < tags.length; j++) {
        const key = `tag:${tags[i]}\u0000tag:${tags[j]}`
        tagPair.set(key, (tagPair.get(key) ?? 0) + 1)
      }
    }
  }

  const displayName = new Map(CATEGORIES.map((c) => [c.slug, c.en]))

  const nodes: TagGraphNode[] = [
    ...Array.from(catCount.entries()).map(([slug, count]) => ({
      id: `cat:${slug}`,
      label: displayName.get(slug) ?? slug,
      kind: 'category' as const,
      count,
      href: `/pages?cat=${slug}`,
      group: slug as string,
    })),
    ...Array.from(tagCount.entries()).map(([label, count]) => {
      // 여러 분류에 걸친 태그는 가장 많이 등장한 분류의 색을 따른다
      const ranked = Array.from(tagGroup.get(label) ?? []).sort(
        (a, b) => b[1] - a[1],
      )
      return {
        id: `tag:${label}`,
        label,
        kind: 'tag' as const,
        count,
        href: `/tags/${label}/pages/1`,
        group: (ranked[0]?.[0] ?? 'etc') as string,
      }
    }),
  ]

  const links: TagGraphLink[] = [...catTag.entries(), ...tagPair.entries()].map(
    ([key, weight]) => {
      const [source, target] = key.split('\u0000')
      return {source, target, weight}
    },
  )

  return {nodes, links}
})
export const getSeriesPosts = cache(async function getSeriesPosts(
  seriesName: string,
  locale: Locale = 'ko',
): Promise<Post[]> {
  const posts = await getAllPosts(locale)
  return posts
    .filter((post) => post.frontMatter.series === seriesName)
    .sort(
      (a, b) =>
        (a.frontMatter.seriesOrder ?? 0) - (b.frontMatter.seriesOrder ?? 0),
    )
})

export async function getRelatedPosts(
  slug: string,
  tags: string[],
  locale: Locale = 'ko',
  excludeSeries?: string,
  limit = 4,
): Promise<Post[]> {
  const posts = await getAllPosts(locale)
  const tagSet = new Set(tags)

  return posts
    .filter(
      (p) =>
        p.fields.slug !== slug &&
        (excludeSeries == null || p.frontMatter.series !== excludeSeries),
    )
    .map((post) => ({
      post,
      score: post.frontMatter.tags.reduce(
        (n, t) => (tagSet.has(t) ? n + 1 : n),
        0,
      ),
    }))
    .filter(({score}) => score > 0)
    .sort((a, b) =>
      b.score !== a.score
        ? b.score - a.score
        : a.post.frontMatter.date < b.post.frontMatter.date
          ? 1
          : -1,
    )
    .slice(0, limit)
    .map(({post}) => post)
}

export const getFeaturedPosts = cache(async function getFeaturedPosts(
  locale: Locale = 'ko',
): Promise<{popular: Post[]; recent: Post[]}> {
  const allPosts = await getAllPosts(locale)
  const popularSlugs =
    locale === 'ko' ? await getPopularPostSlugs(POPULAR_POSTS_COUNT) : []

  const popular = popularSlugs
    .map((slug) => allPosts.find((p) => p.fields.slug === slug))
    .filter((p): p is Post => p != null)

  if (popular.length < POPULAR_POSTS_COUNT) {
    const slugSet = new Set(popular.map((p) => p.fields.slug))
    for (const p of allPosts) {
      if (popular.length >= POPULAR_POSTS_COUNT) {
        break
      }
      if (!slugSet.has(p.fields.slug)) {
        popular.push(p)
        slugSet.add(p.fields.slug)
      }
    }
  }

  const shown = new Set(popular.map((p) => p.fields.slug))
  const recent = allPosts
    .filter((p) => !shown.has(p.fields.slug))
    .slice(0, RECENT_POSTS_COUNT)

  return {popular, recent}
})

export const getFeaturedSlugs = cache(async function getFeaturedSlugs(
  locale: Locale = 'ko',
): Promise<string[]> {
  const {popular, recent} = await getFeaturedPosts(locale)
  return [...popular, ...recent].map((p) => p.fields.slug)
})
