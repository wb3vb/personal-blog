import {readFileSync} from 'node:fs'
import {join} from 'node:path'

import {ImageResponse} from 'next/og'

import {SiteConfig} from '@/config'

/**
 * 링크 프리뷰(Open Graph) 이미지.
 *
 * 카톡·슬랙·X에 링크를 붙이면 이 이미지가 카드로 뜬다. 구성은 About 페이지 히어로를 그대로
 * 옮긴 것이다. 왼쪽에 문구, 오른쪽에 초상, 하단에 도메인과 KR/EN 배지.
 *
 * 초상은 About의 HeroFxB(캔버스 디더)와 같은 알고리즘으로 미리 구워둔 정적 이미지다.
 * 캔버스는 여기서 돌릴 수 없으므로 scripts/build-og-portrait.py 로 다시 굽는다.
 *
 * 폰트는 저장소에 내장한다. 예전에는 요청마다 외부 CDN에서 받아왔는데, 그 CDN이 죽으면
 * 프리뷰가 통째로 깨졌다.
 *
 * 쿼리:
 *   title       카드 제목. 없으면 400
 *   description 제목 아래 문장
 *   tags        쉼표 구분. 상단 eyebrow 로 들어간다
 *   path        하단 주소 표시에 쓰인다 (url 이 있으면 그쪽이 우선)
 *   thumbnail   글 썸네일 경로. 있으면 오른쪽 슬롯이 초상 대신 썸네일이 된다
 *   type        'page' 면 사이트/고정 페이지 카드로 본다
 *   size        'large' 면 모바일 커버용으로 글자를 키운다
 *   locale      'ko' | 'en'. 하단 배지와 문구 언어를 결정한다
 */

const ASSETS = join(process.cwd(), 'src/assets/og')

let cached: {
  bold: Buffer
  medium: Buffer
  mono: Buffer
  portrait: string
} | null = null

function loadAssets() {
  if (!cached) {
    const read = (name: string) => readFileSync(join(ASSETS, name))
    cached = {
      bold: read('Pretendard-Bold.otf'),
      medium: read('Pretendard-Medium.otf'),
      mono: read('JetBrainsMono-Bold.ttf'),
      portrait: `data:image/png;base64,${read('portrait-dither.png').toString('base64')}`,
    }
  }
  return cached
}

/** src/app/tailwind.css 의 html.dark 토큰과 같은 값 */
const C = {
  bg: '#0a0a0f',
  ink: '#f5f5fa',
  ink2: '#c9c9d6',
  ink3: '#8b8ba3',
  border: '#26263a',
  primary: '#818cf8',
  sky: '#38bdf8',
}

function clamp(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url)

    const title = searchParams.get('title')
    if (!title) {
      return new Response('Missing title', {status: 400})
    }

    const locale = searchParams.get('locale') === 'en' ? 'en' : 'ko'
    const copy = SiteConfig.preview[locale]
    const isLarge = searchParams.get('size') === 'large'

    // 홈(사이트 자체) 카드만 브랜드 문구를 크게 쓴다.
    // About·Resume·Tags 도 type=page 로 오지만 그쪽은 각자의 제목을 그대로 보여준다.
    const isBrand =
      searchParams.get('type') === 'page' && title === SiteConfig.title

    const description = searchParams.get('description') ?? ''
    const tags = (searchParams.get('tags') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const thumbnail = searchParams.get('thumbnail')
    const pathParam = searchParams.get('path')
    const urlParam = searchParams.get('url')

    // 카드 하단 주소. 프로토콜과 끝 슬래시는 뺀다.
    // path=/ 인 홈 카드가 'wb3vb.com/' 로 찍히던 것을 막는다.
    const address = (
      urlParam ??
      (pathParam ? `${SiteConfig.url}${pathParam}` : SiteConfig.url)
    )
      .replace(/^https?:\/\//, '')
      .replace(/\/+$/, '')

    // 사이트/고정 페이지 카드는 브랜드 문구를, 글 카드는 글의 태그를 eyebrow 로 쓴다.
    const eyebrow = isBrand
      ? copy.eyebrow
      : tags.length > 0
        ? tags.join(' · ')
        : copy.eyebrow

    const {bold, medium, mono, portrait} = loadAssets()

    // 썸네일은 같은 오리진의 정적 파일만 읽는다. 예전처럼 주소를 문자열로 이어 붙여
    // fetch 하면 쿼리에 외부 주소를 넣어 서버가 아무 곳이나 요청하게 만들 수 있다.
    let thumbnailData: string | null = null
    if (thumbnail && /^\/[^/\\]/.test(thumbnail) && !thumbnail.includes('..')) {
      try {
        const file = readFileSync(join(process.cwd(), 'public', thumbnail))
        const ext = /\.jpe?g$/i.test(thumbnail) ? 'jpeg' : 'png'
        thumbnailData = `data:image/${ext};base64,${file.toString('base64')}`
      } catch {
        thumbnailData = null
      }
    }

    const fontSize = {
      title: isBrand ? (isLarge ? 88 : 76) : isLarge ? 60 : 52,
      body: isLarge ? 31 : 27,
      eyebrow: isLarge ? 24 : 21,
      meta: isLarge ? 25 : 22,
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: C.bg,
          }}
        >
          {/* 인디고/스카이 글로우. About 히어로 배경과 같은 인상을 준다 */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                'radial-gradient(900px 520px at 8% -10%, rgba(129,140,248,0.20), rgba(10,10,15,0) 60%), radial-gradient(760px 460px at 96% 108%, rgba(56,189,248,0.14), rgba(10,10,15,0) 62%)',
            }}
          />

          <div
            style={{
              display: 'flex',
              position: 'relative',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              padding: '56px 60px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: 618,
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Mono',
                  fontSize: fontSize.eyebrow,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: C.primary,
                }}
              >
                {clamp(eyebrow, 42)}
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  fontFamily: 'Pretendard',
                  fontWeight: 700,
                  fontSize: fontSize.title,
                  lineHeight: isBrand ? 1.05 : 1.2,
                  letterSpacing: '-0.045em',
                  wordBreak: 'keep-all',
                  color: isBrand ? C.sky : C.ink,
                }}
              >
                {isBrand ? SiteConfig.preview.heading : clamp(title, 62)}
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: isBrand ? 24 : 20,
                  fontFamily: 'Pretendard',
                  fontWeight: 400,
                  fontSize: fontSize.body,
                  lineHeight: 1.45,
                  letterSpacing: '-0.02em',
                  wordBreak: 'keep-all',
                  color: C.ink2,
                }}
              >
                {clamp(isBrand ? copy.lead : description, isBrand ? 92 : 108)}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 'auto',
                  paddingTop: 30,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Mono',
                    fontSize: fontSize.meta,
                    letterSpacing: '0.06em',
                    color: C.ink3,
                  }}
                >
                  {clamp(address, 46)}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 16,
                    padding: '7px 16px',
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    backgroundColor: 'rgba(129,140,248,0.10)',
                    fontFamily: 'Mono',
                    fontSize: fontSize.meta - 1,
                    letterSpacing: '0.18em',
                    color: C.primary,
                  }}
                >
                  {copy.badge}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {thumbnailData ? (
                <div
                  style={{
                    display: 'flex',
                    width: 370,
                    height: 370,
                    borderRadius: 18,
                    border: '1px solid rgba(255,255,255,0.09)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    alt=""
                    src={thumbnailData}
                    width={370}
                    height={370}
                    style={{objectFit: 'cover'}}
                  />
                </div>
              ) : (
                /* 초상은 아래쪽이 어두워 배경에 묻힌다. 옅은 링으로 형태를 잡아준다 */
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 370,
                    height: 370,
                    borderRadius: 185,
                    border: '1px solid rgba(255,255,255,0.09)',
                    backgroundColor: 'rgba(255,255,255,0.035)',
                  }}
                >
                  <img alt="" src={portrait} width={348} height={348} />
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {name: 'Pretendard', data: bold, weight: 700, style: 'normal'},
          {name: 'Pretendard', data: medium, weight: 400, style: 'normal'},
          {name: 'Mono', data: mono, weight: 700, style: 'normal'},
        ],
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
    )
  } catch {
    // 내부 경로나 스택이 밖으로 새지 않도록 예외 메시지를 그대로 흘리지 않는다.
    return new Response('Failed to generate the image', {status: 500})
  }
}
