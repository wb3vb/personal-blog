import {stripTitleEmphasis} from '@/shared/utils'

import {SiteConfig} from '@/config'
import {getAllPosts} from '@/utils/Post'

export async function GET() {
  const [koPosts, enPosts] = await Promise.all([
    getAllPosts('ko'),
    getAllPosts('en'),
  ])
  const enSlugs = new Set(enPosts.map((p) => p.fields.slug))

  const lines: string[] = []
  lines.push(`# ${SiteConfig.title}`)
  lines.push('')
  lines.push(`> ${SiteConfig.subtitle}. Personal engineering blog.`)
  lines.push('')
  lines.push('## Posts')
  lines.push('')

  for (const post of koPosts) {
    const desc = post.frontMatter.description
      ? `: ${post.frontMatter.description}`
      : ''
    const url = `${SiteConfig.url}/${post.fields.slug}.md`
    lines.push(
      `- [${stripTitleEmphasis(post.frontMatter.title)}](${url})${desc}`,
    )
  }

  const translatedOnly = enPosts.filter((p) => enSlugs.has(p.fields.slug))
  if (translatedOnly.length > 0) {
    lines.push('')
    lines.push('## Posts (English)')
    lines.push('')
    for (const post of translatedOnly) {
      const desc = post.frontMatter.description
        ? `: ${post.frontMatter.description}`
        : ''
      const url = `${SiteConfig.url}/en/${post.fields.slug}.md`
      lines.push(
        `- [${stripTitleEmphasis(post.frontMatter.title)}](${url})${desc}`,
      )
    }
  }

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=300, stale-while-revalidate=86400',
    },
  })
}
