import type {Metadata} from 'next'

import {SiteConfig} from '@/config'
import {getAllTagsFromPosts} from '@/utils/Post'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'All tags',
  alternates: {
    canonical: `${SiteConfig.url}/tags`,
  },
}

interface Bubble {
  tag: string
  count: number
  x: number
  y: number
  r: number
}

/**
 * 결정적 원형 패킹(circle packing). 큰 원부터 중앙에 놓고, 이후 원은 중심에서
 * 나선형으로 탐색해 겹치지 않는 가장 안쪽 자리에 배치한다. window 없이 순수
 * 계산이라 서버에서 실행 → 하이드레이션 이슈 없음.
 */
function packBubbles(tags: {tag: string; count: number}[]): {
  bubbles: Bubble[]
  width: number
  height: number
} {
  const maxCount = tags.reduce((m, t) => Math.max(m, t.count), 1)
  const R_MIN = 40
  const R_MAX = 92
  const PAD = 5
  const radius = (c: number) =>
    R_MIN + (R_MAX - R_MIN) * Math.sqrt(c / maxCount)

  const placed: Bubble[] = []
  for (const t of tags) {
    const r = radius(t.count)
    if (placed.length === 0) {
      placed.push({...t, x: 0, y: 0, r})
      continue
    }
    let best: {x: number; y: number} | null = null
    const stepR = 4
    search: for (let rad = 0; rad <= 3000; rad += stepR) {
      const samples = Math.max(8, Math.floor((2 * Math.PI * rad) / stepR))
      for (let k = 0; k < samples; k++) {
        const a = (2 * Math.PI * k) / samples
        const x = Math.cos(a) * rad
        const y = Math.sin(a) * rad
        let ok = true
        for (const p of placed) {
          if (Math.hypot(x - p.x, y - p.y) < r + p.r + PAD) {
            ok = false
            break
          }
        }
        if (ok) {
          best = {x, y}
          break search
        }
      }
    }
    const pos = best ?? {x: 0, y: 0}
    placed.push({...t, x: pos.x, y: pos.y, r})
  }

  const minX = Math.min(...placed.map((b) => b.x - b.r))
  const maxX = Math.max(...placed.map((b) => b.x + b.r))
  const minY = Math.min(...placed.map((b) => b.y - b.r))
  const maxY = Math.max(...placed.map((b) => b.y + b.r))
  const m = 10
  const bubbles = placed.map((b) => ({
    ...b,
    x: b.x - minX + m,
    y: b.y - minY + m,
  }))
  return {
    bubbles,
    width: maxX - minX + 2 * m,
    height: maxY - minY + 2 * m,
  }
}

export default async function TagsPage() {
  const tags = await getAllTagsFromPosts()
  const totalPosts = tags.reduce((sum, t) => sum + t.count, 0)
  const maxCount = tags.reduce((max, t) => Math.max(max, t.count), 1)
  const {bubbles, width, height} = packBubbles(tags)

  return (
    <div className="page-view">
      <section className="page-hero">
        <div className="hero-eyebrow">
          <span className="dot" />
          {tags.length} TAGS · {totalPosts} POSTS
        </div>
        <h1 className="page-title">
          TAGS<span className="accent">,</span>
          <br />
          <span className="stroke">every</span> topic.
        </h1>
        <p className="page-sub">
          버블 크기 = 글 수. 원을 누르면 해당 태그의 글 목록으로 이동합니다.
        </p>
      </section>

      <div className="tag-bubbles-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="tag-bubbles"
          role="list"
          aria-label="태그 버블맵"
        >
          {bubbles.map(({tag, count, x, y, r}) => {
            const words = tag.split(/\s+/)
            const lines = words.length > 1 ? words : [tag]
            const longest = Math.max(...lines.map((l) => l.length))
            let fs = Math.min(r * 0.55, (2.7 * r) / longest)
            if (lines.length > 1) {
              fs *= 0.88
            }
            const opacity = 0.42 + 0.5 * (count / maxCount)
            return (
              <a
                key={tag}
                href={`/tags/${tag}/pages/1`}
                className="tag-bubble"
                role="listitem"
                aria-label={`${tag}, 글 ${count}개`}
              >
                <title>{`${tag} · ${count}`}</title>
                <circle cx={x} cy={y} r={r} fillOpacity={opacity} />
                <text
                  x={x}
                  y={y}
                  fontSize={fs}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {lines.map((ln, i) => (
                    <tspan
                      key={ln}
                      x={x}
                      dy={i === 0 ? `${-(lines.length - 1) * 0.55}em` : '1.1em'}
                    >
                      {ln}
                    </tspan>
                  ))}
                </text>
              </a>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
