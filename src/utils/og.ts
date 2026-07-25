export function buildOgImageUrl({
  title,
  description,
  tags,
  path,
  thumbnail,
  type,
  size,
  locale,
}: {
  title: string
  description?: string
  tags?: string[]
  path?: string
  thumbnail?: string
  type?: string
  size?: string
  /** 프리뷰 카드 우하단 KR/EN 배지를 결정한다. 기본값은 ko */
  locale?: 'ko' | 'en'
}): string {
  const params = new URLSearchParams({title})
  if (description) {params.set('description', description)}
  if (tags?.length) {params.set('tags', tags.join(','))}
  if (path) {params.set('path', path)}
  if (thumbnail) {params.set('thumbnail', thumbnail)}
  if (type) {params.set('type', type)}
  if (size) {params.set('size', size)}
  if (locale) {params.set('locale', locale)}
  return `/api/og?${params.toString()}`
}
