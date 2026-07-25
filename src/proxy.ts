import {NextResponse} from 'next/server'

import {detectBot} from './constants/bot-signatures'

import type {NextRequest} from 'next/server'

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const {isBot, botName, botCategory} = detectBot(userAgent)
  const pathname = request.nextUrl.pathname

  if (pathname.includes('%23')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.split('%23')[0]
    url.search = ''
    return NextResponse.redirect(url, {status: 308})
  }

  // Locale redirect on root path
  //
  // 크롤러는 제외한다. 카톡·슬랙·X 등 링크 미리보기 봇 상당수가 Accept-Language: en-US 를
  // 보내는데, 그대로 두면 국문 링크를 붙여도 /en 으로 튕겨 영문 카드가 잡힌다.
  // 사람에게만 언어 자동 감지를 적용하고, 봇에게는 요청한 주소를 그대로 보여준다.
  if (!isBot && pathname === '/') {
    const localeCookie = request.cookies.get('locale')?.value

    if (localeCookie === 'en') {
      return NextResponse.redirect(new URL('/en', request.url))
    }

    if (!localeCookie) {
      const acceptLang = request.headers.get('accept-language') ?? ''
      const prefersKorean = acceptLang
        .split(',')
        .some((l) => l.trim().toLowerCase().startsWith('ko'))

      if (!prefersKorean && acceptLang) {
        const response = NextResponse.redirect(new URL('/en', request.url))
        response.cookies.set('locale', 'en', {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
        return response
      }
    }
  }

  const response = NextResponse.next()

  // 예전에는 판별 결과를 x-is-bot / x-bot-name / x-bot-category 헤더로 모든 응답에 실어
  // 내보냈다. 읽는 코드가 없는데 내부 탐지 규칙만 밖으로 드러내므로 걷어냈다.

  if (isBot) {
    // eslint-disable-next-line no-console
    console.log(
      `[Bot Visit] ${botCategory}/${botName} - ${pathname} - ${userAgent.slice(0, 100)}`,
    )
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
