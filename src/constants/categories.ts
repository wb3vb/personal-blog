/**
 * 글 분류(카테고리) 정의 — 단일 진실 원천(SSOT).
 * /pages 탭, 자동 분류 규칙, 라벨(KO/EN)을 모두 여기서 관리한다.
 *
 * 자동 분류(하이브리드):
 *  1) 글 프론트매터의 `category` 값이 유효하면 그대로 사용
 *  2) 없으면 `tags`를 TAG_CATEGORY_MAP으로 매핑
 *  3) 그래도 없으면 'etc'(기타)
 */

export type CategorySlug =
  | 'crypto'
  | 'ai'
  | 'realestate'
  | 'economy'
  | 'investing'
  | 'etc'

export interface CategoryDef {
  slug: CategorySlug
  ko: string
  en: string
}

/** 탭 노출 순서. '기타'는 항상 마지막. */
export const CATEGORIES: CategoryDef[] = [
  {slug: 'crypto', ko: '크립토', en: 'Crypto'},
  {slug: 'ai', ko: 'AI', en: 'AI'},
  {slug: 'realestate', ko: '부동산', en: 'Real Estate'},
  {slug: 'economy', ko: '경제', en: 'Economy'},
  {slug: 'investing', ko: '투자', en: 'Investing'},
  {slug: 'etc', ko: '기타', en: 'Etc'},
]

/** /pages 진입 시 기본으로 열리는 탭. */
export const DEFAULT_CATEGORY: CategorySlug = 'crypto'

/**
 * 태그/키워드 → 분류 (프론트매터 category가 비었을 때의 자동 폴백).
 * 새 태그가 생기면 여기에 한 줄만 추가하면 미래 글도 자동 분류된다.
 */
export const TAG_CATEGORY_MAP: Record<string, CategorySlug> = {
  // 크립토
  crypto: 'crypto',
  '크립토': 'crypto',
  blockchain: 'crypto',
  '블록체인': 'crypto',
  ethereum: 'crypto',
  '이더리움': 'crypto',
  bitcoin: 'crypto',
  '비트코인': 'crypto',
  stablecoin: 'crypto',
  '스테이블코인': 'crypto',
  defi: 'crypto',
  mev: 'crypto',
  l1: 'crypto',
  l2: 'crypto',
  'layer-1': 'crypto',
  'layer-2': 'crypto',
  onchain: 'crypto',
  web3: 'crypto',
  // AI
  ai: 'ai',
  llm: 'ai',
  ml: 'ai',
  'machine learning': 'ai',
  gpt: 'ai',
  '인공지능': 'ai',
  // 부동산
  'real estate': 'realestate',
  realestate: 'realestate',
  '부동산': 'realestate',
  property: 'realestate',
  housing: 'realestate',
  // 경제
  economy: 'economy',
  '경제': 'economy',
  macro: 'economy',
  '매크로': 'economy',
  fed: 'economy',
  inflation: 'economy',
  '금리': 'economy',
  // 투자
  investment: 'investing',
  investing: 'investing',
  invest: 'investing',
  '투자': 'investing',
  stocks: 'investing',
  '주식': 'investing',
  portfolio: 'investing',
  '포트폴리오': 'investing',
}

const VALID_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug))

/** 한 글의 대표 분류(1개) 결정. */
export function resolveCategory(
  category?: string,
  tags: string[] = [],
): CategorySlug {
  const c = (category ?? '').toLowerCase().trim()
  if (VALID_SLUGS.has(c)) {
    return c as CategorySlug
  }
  for (const t of tags) {
    const mapped = TAG_CATEGORY_MAP[t.toLowerCase().trim()]
    if (mapped) {
      return mapped
    }
  }
  return 'etc'
}

/** 글 목록을 분류별로 그룹핑(입력 순서=최신순 유지). */
export function groupPostsByCategory<
  T extends {frontMatter: {category?: string; tags: string[]}},
>(posts: T[]): Record<CategorySlug, T[]> {
  const byCat = Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, [] as T[]]),
  ) as Record<CategorySlug, T[]>
  for (const p of posts) {
    byCat[resolveCategory(p.frontMatter.category, p.frontMatter.tags)].push(p)
  }
  return byCat
}
