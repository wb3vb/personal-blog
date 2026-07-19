import type {Options, SearchOptions} from 'minisearch'

// 직렬화된 인덱스를 클라이언트에서 loadJSON 하려면 인덱싱 옵션(fields/storeFields/
// processTerm 등)이 빌드 시점과 정확히 일치해야 한다. 그래서 서버 route와 검색
// 컴포넌트가 이 단일 설정을 공유한다.
export interface SearchDoc {
  slug: string
  title: string
  description: string
  tags: string[]
  body: string
  snippet: string
  date: string
}

export type StoredDoc = Omit<SearchDoc, 'body'>

const processTerm = (term: string) => term.normalize('NFC').toLowerCase()

export const miniSearchOptions: Options<SearchDoc> = {
  idField: 'slug',
  fields: ['title', 'tags', 'description', 'body'],
  storeFields: ['slug', 'title', 'description', 'tags', 'snippet', 'date'],
  processTerm,
}

export const searchOptions: SearchOptions = {
  prefix: true,
  // 한글은 음절 단위라 1글자 오차도 전혀 다른 단어가 된다. fuzzy를 낮춰 짧은
  // 한글 토큰에선 사실상 비활성화하고, 긴 영어 단어 오타만 약하게 보정한다.
  fuzzy: 0.15,
  combineWith: 'AND',
  boost: {title: 4, tags: 2.5, description: 1.5, body: 1},
}
