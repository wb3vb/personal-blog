#!/usr/bin/env node
/**
 * 글 안에 실행되는 코드가 섞여 들어갔는지 배포 전에 잡는다.
 *
 * 이 블로그는 MDX로 글을 렌더한다. MDX는 마크다운 안의 HTML을 진짜 컴포넌트로 만들기 때문에,
 * 글에 <script> 한 줄이 들어가면 방문자 브라우저에서 그대로 실행된다.
 * 글을 쓰는 사람이 한 명뿐이라 악의적으로 넣을 일은 없지만, 현실적인 경로가 두 가지 있다.
 *   1) 번역 스크립트가 만든 영문본에 모델이 엉뚱한 태그를 끼워 넣는다
 *   2) 웹이나 AI 답변에서 복사한 조각에 태그가 딸려 온다
 * 사람이 16분짜리 번역본을 눈으로 훑어 잡아내기는 어려우므로 빌드에서 막는다.
 *
 * 현재 글이 쓰는 HTML은 <br> <strong> <em> 뿐이다. 아래 목록은 그 외의 위험한 것만 막는다.
 *
 *   node scripts/check-posts-safety.mjs
 */

import {readFileSync} from 'node:fs'
import {globSync} from 'node:fs'
import {relative} from 'node:path'

const POSTS = 'posts'

/** [정규식, 사람이 읽을 설명] */
const RULES = [
  [/<script[\s>]/i, '<script> 태그 — 방문자 브라우저에서 코드가 실행된다'],
  [/<iframe[\s>]/i, '<iframe> 태그 — 외부 페이지를 그대로 끼워 넣는다'],
  [/<object[\s>]/i, '<object> 태그'],
  [/<embed[\s>]/i, '<embed> 태그'],
  [/<form[\s>]/i, '<form> 태그 — 방문자 입력을 외부로 보낼 수 있다'],
  [/\son[a-z]+\s*=\s*["']/i, 'on... 이벤트 속성 (onerror, onclick 등)'],
  [/javascript:/i, 'javascript: 링크'],
  [/\bdata:text\/html/i, 'data:text/html 링크'],
  [
    /^\s*click\s+\S+\s+"(javascript:|call\s)/im,
    'mermaid click 동작 (다이어그램 클릭 시 코드 실행)',
  ],
]

function main() {
  const files = globSync(`${POSTS}/**/*.{md,mdx}`)
  const problems = []

  for (const file of files) {
    const text = readFileSync(file, 'utf-8')
    const lines = text.split('\n')

    for (const [pattern, label] of RULES) {
      lines.forEach((line, i) => {
        if (pattern.test(line)) {
          problems.push({
            file: relative(process.cwd(), file),
            line: i + 1,
            label,
            snippet: line.trim().slice(0, 100),
          })
        }
      })
    }
  }

  if (problems.length === 0) {
    console.log(`글 안전 검사 통과 — ${files.length}개 파일에서 문제 없음`)
    return
  }

  console.error(
    `\n글에서 실행될 수 있는 코드를 ${problems.length}건 발견했습니다. 배포를 멈춥니다.\n`,
  )
  for (const p of problems) {
    console.error(`  ${p.file}:${p.line}`)
    console.error(`    문제: ${p.label}`)
    console.error(`    내용: ${p.snippet}\n`)
  }
  console.error(
    '해당 줄을 지우거나, 코드를 보여주려는 의도라면 ``` 코드블록 안에 넣으세요.\n',
  )
  process.exit(1)
}

main()
