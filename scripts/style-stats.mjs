#!/usr/bin/env node
/**
 * 한국어 문체 계측기.
 *
 * 본인이 쓴 글(기준선)과 새로 쓴 글(대상)을 같은 자로 재서 비교한다.
 * 방법론과 게이트 기준은 writing.md 참고.
 *
 *   node scripts/style-stats.mjs --baseline "posts/2025" --target "posts/2026/07"
 *   node scripts/style-stats.mjs --target "posts/2026/07/npm-debut.md" --each
 *
 * 옵션
 *   --baseline <경로...>  기준선 표본. 디렉터리면 하위 .md 전부 (권장 10편 이상)
 *   --target   <경로...>  계측 대상
 *   --each                대상 파일을 개별로도 출력
 *   --shorts              25자 이하 문장을 전부 나열 (어디를 고칠지 찾을 때)
 *   --en                  영문 파일(.en.md)을 대상으로 (기본은 제외)
 */

import fs from 'fs'
import path from 'path'

// ---------- 인자 ----------

function parseArgs(argv) {
  const out = {baseline: [], target: [], each: false, shorts: false, en: false}
  let key = null
  for (const a of argv.slice(2)) {
    if (a === '--each' || a === '--shorts' || a === '--en') {
      out[a.slice(2)] = true
      key = null
    } else if (a.startsWith('--')) {
      key = a.slice(2)
      if (!(key in out)) {
        throw new Error(`알 수 없는 옵션: ${a}`)
      }
    } else if (key) {
      out[key].push(a)
    }
  }
  return out
}

// ---------- 파일 수집 ----------

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

function collect(paths, {en}) {
  return paths
    .flatMap(walk)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => (en ? /\.en\.mdx?$/.test(f) : !/\.en\.mdx?$/.test(f)))
}

// ---------- 본문 추출 ----------

/** 마크다운 장식을 걷어내고 산문 문단만 남긴다 */
function paragraphsOf(file) {
  const raw = fs
    .readFileSync(file, 'utf8')
    .replace(/^---[\s\S]*?\n---\n/, '') // front-matter
    .replace(/```[\s\S]*?```/g, '') // code block

  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => {
      if (!p) {return false}
      if (p.startsWith('#')) {return false} // heading
      if (p.startsWith('|')) {return false} // table
      if (p.startsWith('>')) {return false} // blockquote (TL;DR)
      if (p.startsWith('![')) {return false} // image
      if (/^[-*]\s/.test(p)) {return false} // bullet
      if (/^\d+[.)]\s/.test(p)) {return false} // ordered list
      return true
    })
    .map((p) =>
      p
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // link -> text
        .replace(/\*\*|__|\*/g, '')
        .replace(/`/g, ''),
    )
}

/** 문장 분리. 소수점(0.941)을 문장 끝으로 오인하지 않게 먼저 치환한다 */
function sentencesOf(text) {
  return text
    .replace(/(\d)\.(\d)/g, '$1$2')
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
}

/** 절과 절을 잇는 연결어미. 이 빈도가 낮으면 문장이 잘게 쪼개져 있다는 뜻이다 */
const CONNECTIVES =
  /(는데|은데|ㄴ데|지만|면서|니까|어서|아서|해서|으며|하며|이며|거나|라서|다가|더니|는지|을수록|ㄹ수록|기에|므로|자마자)/g

// ---------- 계측 ----------

function measure(files) {
  const sentences = []
  const perParagraph = []

  for (const f of files) {
    for (const para of paragraphsOf(f)) {
      const ss = sentencesOf(para)
      if (ss.length) {
        perParagraph.push(ss.length)
        sentences.push(...ss)
      }
    }
  }
  if (!sentences.length) {
    return null
  }

  const lens = sentences.map((s) => s.length).sort((a, b) => a - b)
  const total = lens.reduce((a, b) => a + b, 0)
  const pct = (n) => +((n / lens.length) * 100).toFixed(1)

  return {
    files: files.length,
    sentences: sentences.length,
    mean: +(total / lens.length).toFixed(1),
    median: lens[Math.floor(lens.length / 2)],
    shortPct: pct(lens.filter((l) => l <= 25).length),
    veryShortPct: pct(lens.filter((l) => l <= 15).length),
    longPct: pct(lens.filter((l) => l >= 60).length),
    connectives: +(
      (sentences.join(' ').match(CONNECTIVES) || []).length /
      (sentences.length / 100)
    ).toFixed(1),
    perParagraph: +(
      perParagraph.reduce((a, b) => a + b, 0) / perParagraph.length
    ).toFixed(2),
    all: sentences,
  }
}

// ---------- 게이트 (writing.md §6) ----------

function gate(base, tgt) {
  const rows = [
    {
      name: '연결어미/문장 100개',
      base: base.connectives,
      tgt: tgt.connectives,
      ok: tgt.connectives >= base.connectives * 0.9,
      rule: '기준선의 90% 이상',
      must: true,
    },
    {
      name: '문단당 문장 수',
      base: base.perParagraph,
      tgt: tgt.perParagraph,
      ok: Math.abs(tgt.perParagraph - base.perParagraph) <= base.perParagraph * 0.15,
      rule: '기준선 ±15%',
      must: true,
    },
    {
      name: '평균 문장 길이',
      base: base.mean,
      tgt: tgt.mean,
      ok: tgt.mean >= base.mean * 0.45,
      rule: '기준선의 45% 이상',
      must: false,
    },
    {
      name: '단문(25자 이하) %',
      base: base.shortPct,
      tgt: tgt.shortPct,
      ok: tgt.shortPct <= 35,
      rule: '35% 이하',
      must: false,
    },
    {
      name: '아주 짧은 문장(15자 이하) %',
      base: base.veryShortPct,
      tgt: tgt.veryShortPct,
      ok: tgt.veryShortPct <= 12,
      rule: '12% 이하',
      must: false,
    },
  ]

  console.log('\n지표                          기준선      대상    판정  기준')
  console.log('-'.repeat(72))
  for (const r of rows) {
    console.log(
      r.name.padEnd(28) +
        String(r.base).padStart(8) +
        String(r.tgt).padStart(9) +
        (r.ok ? '    통과' : r.must ? '  실패*' : '    주의') +
        '  ' +
        r.rule,
    )
  }
  console.log('-'.repeat(72))
  console.log('* 필수 항목. 실패하면 문장 병합 후 다시 계측한다.')

  const failed = rows.filter((r) => r.must && !r.ok)
  if (failed.length) {
    console.log(`\n필수 ${failed.length}개 미달. scripts/style-pairs.mjs 로 병합 후보를 찾는다.`)
    return 1
  }
  console.log('\n필수 항목 전부 통과.')
  return 0
}

// ---------- 출력 ----------

function show(label, m) {
  console.log(`\n[${label}] 파일 ${m.files}편 / 문장 ${m.sentences}개`)
  console.log(
    `  평균 ${m.mean}자 · 중앙값 ${m.median}자 · ` +
      `단문 ${m.shortPct}% · 아주짧은 ${m.veryShortPct}% · 장문 ${m.longPct}%`,
  )
  console.log(
    `  연결어미 ${m.connectives}/100문장 · 문단당 ${m.perParagraph}문장`,
  )
}

function main() {
  const args = parseArgs(process.argv)
  if (!args.target.length) {
    console.error(
      '사용법: node scripts/style-stats.mjs --baseline <경로...> --target <경로...>\n' +
        '        옵션: --each --shorts --en\n' +
        '        방법론: writing.md',
    )
    process.exit(2)
  }

  const targetFiles = collect(args.target, args)
  if (!targetFiles.length) {
    console.error('대상 파일이 없다.')
    process.exit(2)
  }
  const tgt = measure(targetFiles)
  show('대상', tgt)

  if (args.each) {
    console.log('\n--- 파일별 ---')
    for (const f of targetFiles.sort()) {
      const m = measure([f])
      console.log(
        '  ' +
          path.basename(f).padEnd(34) +
          `평균 ${String(m.mean).padStart(5)}자  ` +
          `단문 ${String(m.shortPct).padStart(5)}%  ` +
          `연결어미 ${String(m.connectives).padStart(5)}`,
      )
    }
  }

  if (args.shorts) {
    console.log('\n--- 25자 이하 문장 ---')
    for (const s of tgt.all.filter((x) => x.length <= 25)) {
      console.log(`  [${String(s.length).padStart(2)}] ${s}`)
    }
  }

  let code = 0
  if (args.baseline.length) {
    const baseFiles = collect(args.baseline, args)
    if (!baseFiles.length) {
      console.error('\n기준선 파일이 없다.')
      process.exit(2)
    }
    const base = measure(baseFiles)
    show('기준선', base)
    if (baseFiles.length < 10) {
      console.log(
        `  경고: 표본이 ${baseFiles.length}편이다. 10편 이상을 권장한다(writing.md P2).`,
      )
    }
    code = gate(base, tgt)
  }

  process.exit(code)
}

main()
