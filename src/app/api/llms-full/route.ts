import {buildLlmsFullResponse} from '@/utils/llmsFull'

export function GET() {
  return buildLlmsFullResponse('ko')
}
