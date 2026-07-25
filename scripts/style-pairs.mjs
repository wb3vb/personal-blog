#!/usr/bin/env node
/**
 * 병합 후보 찾기.
 *
 * style-stats.mjs 게이트에 걸렸을 때 "어디를 고칠지" 찾는 진단 도구다.
 * 짧은 문장과 바로 다음 문장을 짝으로 출력한다. 둘이 인과·역접·부연 관계면
 * 연결어미로 이어 붙인다. 방법론은 writing.md §5.5 참고.
 *
 *   node scripts/style-pairs.mjs posts/2026/07/npm-debut.md
 *   node scripts/style-pairs.mjs posts/2026/07 --max 20
 *
 * 옵션
 *   --max <n>   짧은 문장 기준 글자 수 (기본 28)
 *
 * 판단은 사람이 한다. 아래는 이어 붙이지 않는다(writing.md §5.5).
 *   - 굵은 글씨 선언
 *   - 문단을 닫는 한 방
 *   - 항목 라벨(첫째, 둘째)
 *   - 예시 도입부
 */

import fs from 'fs'
import path from 'path'

function walk(p) {
  if (!fs.existsSync(p)) {
    return []
  }
  if (fs.statSync(p).isFile()) {
    return [p]
  }
  return fs
    .readdirSync(p, {withFileTypes: true})
    .flatMap((e) => walk(path.join(p, e.name)))
}

const argv = process.argv.slice(2)
const maxIdx = argv.indexOf('--max')
const MAX = maxIdx >= 0 ? Number(argv[maxIdx + 1]) : 28
// --max 가 없으면 maxIdx 는 -1 이라 어떤 인덱스와도 겹치지 않아야 한다
const skipIdx = maxIdx >= 0 ? maxIdx + 1 : -1
const targets = argv.filter((a, i) => !a.startsWith('--') && i !== skipIdx)

if (!targets.length) {
  console.error(
    '사용법: node scripts/style-pairs.mjs <파일|디렉터리> [--max 28]\n' +
      '        방법론: writing.md §5.5',
  )
  process.exit(2)
}

const files = targets
  .flatMap(walk)
  .filter((f) => /\.mdx?$/.test(f) && !/\.en\.mdx?$/.test(f))
  .sort()

let count = 0
for (const file of files) {
  const raw = fs
    .readFileSync(file, 'utf8')
    .replace(/^---[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, '')

  const hits = []
  for (const para of raw.split(/\n\n+/)) {
    const t = para.trim()
    if (!t || t.startsWith('#') || t.startsWith('|') || t.startsWith('>')) {continue}
    if (t.startsWith('![') || /^[-*]\s/.test(t) || /^\d+[.)]\s/.test(t)) {continue}

    // 굵은 글씨만으로 이뤄진 문단은 의도한 선언이므로 건드리지 않는다
    if (/^\*\*[^*]+\*\*$/.test(t)) {continue}

    const clean = t
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\*\*|__|\*/g, '')
      .replace(/`/g, '')
    const ss = clean
      .replace(/(\d)\.(\d)/g, '$1$2')
      .split(/(?<=[.!?])\s+/)
      .map((x) => x.trim())
      .filter((x) => x.length > 1)

    for (let i = 0; i < ss.length - 1; i++) {
      if (ss[i].length <= MAX) {
        hits.push([ss[i], ss[i + 1]])
      }
    }
  }

  if (!hits.length) {continue}
  console.log(`\n===== ${file}  (${hits.length}건)`)
  for (const [a, b] of hits) {
    console.log(`  [${String(a.length).padStart(2)}] ${a}`)
    console.log(`       -> ${b.slice(0, 90)}${b.length > 90 ? '…' : ''}`)
  }
  count += hits.length
}

console.log(`\n총 ${count}건. 인과·역접·부연 관계인 짝만 이어 붙인다.`)
console.log('연결어미는 한 종류에 몰리지 않게 분산한다: ~는데 ~라 ~니 ~어서 ~지만 ~고 ~며')
