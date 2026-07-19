import {buildSearchIndexResponse} from '@/utils/searchIndex'

export function GET() {
  return buildSearchIndexResponse('ko')
}
