import fs from 'fs'
import path from 'path'

import fm from 'front-matter'
import {sync} from 'glob'

import {POST_ROOT, isLocaleFile} from './postPaths'

import type {Locale} from './postPaths'
import type {FrontMatter} from '@/type'

/**
 * URL 조각으로 글 원문(.md)을 읽어 내려준다. `/2026/07/slug.md` 주소가 여기로 온다.
 *
 * URL에서 온 값을 파일 경로에 그대로 이어 붙이면 `..`을 섞어 posts 폴더 밖의 파일까지
 * 읽어갈 수 있다. 실제로 design.md·writing.md·typography.md 전문이 이 경로로 새어 나갔다.
 * 그래서 두 겹으로 막는다.
 *   1) 경로 조각에 영숫자·하이픈·언더바·점만 허용한다. `..`과 슬래시 주입이 원천 차단된다.
 *   2) 그러고도 최종 절대경로가 posts 폴더 안인지 다시 확인한다(심볼릭 링크·인코딩 우회 대비).
 *
 * 미발행(published: false) 글도 걸러낸다. 목록·검색·사이트맵에는 안 뜨는데 주소를 직접 치면
 * 원문이 나오던 구멍을 같이 막는다. 로컬에서는 초안 확인이 필요하므로 통과시킨다
 * (기준은 src/utils/Post.ts 의 목록 필터와 같다).
 */

const SAFE_SEGMENT = /^[A-Za-z0-9._-]+$/

export function getPostRawBySlug(
  year: string,
  slugParts: string[],
  locale: Locale = 'ko',
): string | null {
  const segments = [year, ...slugParts]

  if (segments.length === 0 || !segments.every((s) => SAFE_SEGMENT.test(s))) {
    return null
  }

  const suffix = locale === 'en' ? '.en' : ''
  const rootWithSep = POST_ROOT.endsWith(path.sep)
    ? POST_ROOT
    : POST_ROOT + path.sep

  for (const ext of ['.md', '.mdx']) {
    const filePath = path.resolve(
      POST_ROOT,
      `${segments.join('/')}${suffix}${ext}`,
    )

    if (!filePath.startsWith(rootWithSep) || !fs.existsSync(filePath)) {
      continue
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const isDev = process.env.NODE_ENV !== 'production'
    const {attributes} = fm<FrontMatter>(raw)

    if (!attributes.published && !isDev) {
      return null
    }

    return raw
  }

  return null
}

export function getAllPostFiles(locale: Locale = 'ko'): string[] {
  return sync(`${POST_ROOT}/**/*.md*`).filter((f) => isLocaleFile(f, locale))
}
