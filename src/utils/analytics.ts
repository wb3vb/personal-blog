import {BetaAnalyticsDataClient} from '@google-analytics/data'

const propertyId = process.env.GA4_PROPERTY_ID

/**
 * 설정 누락/오류를 조용히 삼키면 "인기글이 왜 최신순이지?"를 진단할 수 없다.
 * 개발 모드에서만 한 번 경고를 남기고, 프로덕션에서는 조용히 폴백한다.
 */
let warned = false
function warnOnce(message: string) {
  if (warned || process.env.NODE_ENV === 'production') {
    return
  }
  warned = true
  console.warn(`[analytics] ${message} → 인기글이 최신순으로 폴백됩니다.`)
}

function getClient(): BetaAnalyticsDataClient | null {
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  if (!propertyId && !credentialsJson) {
    warnOnce('GA4_PROPERTY_ID와 GOOGLE_APPLICATION_CREDENTIALS_JSON이 없습니다')
    return null
  }
  if (!propertyId) {
    warnOnce('GA4_PROPERTY_ID가 없습니다')
    return null
  }
  if (!credentialsJson) {
    warnOnce('GOOGLE_APPLICATION_CREDENTIALS_JSON이 없습니다')
    return null
  }

  try {
    const credentials = JSON.parse(credentialsJson)
    return new BetaAnalyticsDataClient({credentials})
  } catch (error) {
    warnOnce(
      `GOOGLE_APPLICATION_CREDENTIALS_JSON 파싱 실패(한 줄 JSON인지 확인): ${String(error)}`,
    )
    return null
  }
}

export async function getPopularPostSlugs(count: number): Promise<string[]> {
  const client = getClient()
  if (!client) {
    return []
  }

  try {
    const [response] = await client.runReport({
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
      limit: count * 2,
    })

    if (!response.rows?.length) {
      warnOnce('GA4 응답에 데이터가 없습니다(최근 30일 조회수 0이거나 속성 불일치)')
      return []
    }

    return response.rows
      .map((row) => row.dimensionValues?.[0]?.value?.replace(/^\//, '') ?? '')
      .filter(Boolean)
      .slice(0, count)
  } catch (error) {
    warnOnce(`GA4 조회 실패: ${String(error)}`)
    return []
  }
}
