#!/usr/bin/env node
/**
 * GA4 연동 점검 스크립트.
 *   pnpm check:analytics
 *
 * 세 가지를 순서대로 확인한다.
 *   1) 환경변수가 채워져 있는가
 *   2) 서비스 계정 키가 유효한 JSON인가
 *   3) 그 계정이 실제로 해당 속성의 데이터를 읽을 수 있는가
 * 실패하면 무엇을 고쳐야 하는지 한국어로 알려준다.
 */
import {readFileSync, existsSync} from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

// .env.local → .env 순으로 읽어 process.env에 주입 (dotenv 의존성 없이)
for (const name of ['.env.local', '.env']) {
  const p = path.join(ROOT, name)
  if (!existsSync(p)) continue
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (!m) continue
    const [, key, rawValue] = m
    if (process.env[key]) continue
    let value = rawValue.trim()
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] = value
  }
}

const ok = (m) => console.log(`  통과   ${m}`)
const fail = (m, fix) => {
  console.log(`  실패   ${m}`)
  if (fix) console.log(`         → ${fix}`)
  process.exitCode = 1
}

console.log('\nGA4 연동 점검\n')

// 1. 방문자 수집용 측정 ID
console.log('[1] 방문자 수집 (NEXT_PUBLIC_GA_MEASUREMENT_ID)')
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
if (!measurementId) {
  fail(
    '값이 없습니다. 사이트에 추적 코드가 안 붙어 조회수가 쌓이지 않습니다.',
    'Google Analytics > 관리 > 데이터 스트림에서 측정 ID(G-로 시작)를 복사해 넣으세요.',
  )
} else if (!/^G-[A-Z0-9]+$/i.test(measurementId)) {
  fail(`형식이 이상합니다: ${measurementId}`, 'G- 로 시작하는 값이어야 합니다.')
} else {
  ok(measurementId)
}

// 2. 조회수 읽기용 속성 ID
console.log('\n[2] 조회수 읽기 대상 (GA4_PROPERTY_ID)')
const propertyId = process.env.GA4_PROPERTY_ID
if (!propertyId) {
  fail(
    '값이 없습니다.',
    'Google Analytics > 관리 > 속성 설정의 속성 ID(숫자)를 넣으세요.',
  )
} else if (!/^\d+$/.test(propertyId)) {
  fail(
    `숫자만 있어야 하는데 다른 값입니다: ${propertyId}`,
    '측정 ID(G-...)가 아니라 속성 ID(숫자)입니다.',
  )
} else {
  ok(propertyId)
}

// 3. 서비스 계정 키
console.log('\n[3] 읽기 권한 (GOOGLE_APPLICATION_CREDENTIALS_JSON)')
const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
let credentials = null
if (!raw) {
  fail(
    '값이 없습니다.',
    'Google Cloud에서 만든 서비스 계정 JSON 키를 한 줄로 넣으세요.',
  )
} else {
  try {
    credentials = JSON.parse(raw)
    if (!credentials.client_email || !credentials.private_key) {
      fail('JSON에 client_email 또는 private_key가 없습니다.', '키 파일 전체를 넣었는지 확인하세요.')
      credentials = null
    } else {
      ok(credentials.client_email)
    }
  } catch (e) {
    fail(
      `JSON 파싱 실패: ${e.message}`,
      '줄바꿈 없이 한 줄이어야 합니다. 개행은 \\n 으로 이스케이프된 상태여야 합니다.',
    )
  }
}

// 4. 실제 조회
if (propertyId && credentials) {
  console.log('\n[4] 실제 데이터 조회 (최근 30일)')
  try {
    const {BetaAnalyticsDataClient} = await import('@google-analytics/data')
    const client = new BetaAnalyticsDataClient({credentials})
    const [res] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{startDate: '30daysAgo', endDate: 'today'}],
      dimensions: [{name: 'pagePath'}],
      metrics: [{name: 'screenPageViews'}],
      orderBys: [{metric: {metricName: 'screenPageViews'}, desc: true}],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {matchType: 'BEGINS_WITH', value: '/20'},
        },
      },
      limit: 10,
    })
    const rows = res.rows ?? []
    if (!rows.length) {
      console.log('  연결   API 호출은 성공했지만 데이터가 0건입니다.')
      console.log('         → 추적 코드를 막 붙였다면 정상입니다. 방문이 쌓이면 채워집니다.')
    } else {
      ok(`상위 ${rows.length}개를 받았습니다. 인기글이 조회수 기준으로 동작합니다.`)
      rows.forEach((r, i) => {
        console.log(
          `         ${String(i + 1).padStart(2, '0')}  ${r.metricValues?.[0]?.value?.padStart(6)}회  ${r.dimensionValues?.[0]?.value}`,
        )
      })
    }
  } catch (e) {
    const msg = String(e.message ?? e)
    let fix = '오류 메시지를 확인하세요.'
    if (msg.includes('PERMISSION_DENIED') || msg.includes('403')) {
      fix =
        'GA 속성에 서비스 계정 이메일을 뷰어로 추가했는지 확인하세요. (관리 > 속성 액세스 관리)'
    } else if (msg.includes('has not been used') || msg.includes('SERVICE_DISABLED')) {
      fix = 'Google Cloud에서 Google Analytics Data API를 사용 설정하세요.'
    } else if (msg.includes('NOT_FOUND') || msg.includes('404')) {
      fix = 'GA4_PROPERTY_ID가 실제 속성 ID와 일치하는지 확인하세요.'
    } else if (msg.includes('DECODER') || msg.includes('unsupported')) {
      fix =
        'private_key가 손상됐습니다. JSON을 한 줄로 만들 때 개행이 \\n 으로 유지됐는지 확인하세요(직접 손으로 지우지 말 것).'
    } else if (msg.includes('invalid_grant') || msg.includes('UNAUTHENTICATED')) {
      fix = '서비스 계정 키가 유효하지 않습니다. 키를 새로 발급받아 다시 넣으세요.'
    }
    fail(msg.split('\n')[0], fix)
  }
} else {
  console.log('\n[4] 실제 데이터 조회 — 앞 단계가 채워지지 않아 건너뜁니다.')
}

console.log(
  process.exitCode
    ? '\n결과: 설정이 미완입니다. 인기글은 최신순으로 폴백됩니다.\n'
    : '\n결과: 정상입니다.\n',
)
