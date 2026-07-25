# personal-blog

[wb3vb.com](https://wb3vb.com) 을 굴리는 소스. 파일 기반 개인 블로그이고 국문·영문 두 벌로 운영한다.
글은 마크다운 파일로 쓰고, 커밋을 `main` 에 올리면 Vercel 이 알아서 배포한다.

## 스택

| 항목 | 값 |
|---|---|
| Framework | Next.js 16 (App Router, `cacheComponents`, View Transitions) |
| UI | React 19 + Tailwind CSS 4 (v3 config 하이브리드, `@config` 지시어) |
| Language | TypeScript 5 (**5.x 고정 필수**, 7.x preview 가 들어오면 빌드가 깨진다) |
| Content | 파일 기반 `posts/YYYY/MM/slug.md`. CMS 없음 |
| Package Manager | pnpm 10.6.5 |
| Runtime | Node.js 24.14.1 |
| Hosting | Vercel (`main` 푸시 → 자동 프로덕션 배포) |

## 로컬 개발

```bash
corepack enable            # pnpm 활성화
pnpm install
pnpm dev                   # http://localhost:3000
```

시크릿이 없어도 전부 동작한다. 인기글만 조회수 대신 최신순으로 폴백된다.

## 글 쓰기

`posts/YYYY/MM/slug.md` 에 국문, 같은 자리에 `slug.en.md` 로 영문을 둔다.
파일명이 곧 URL 이라 `/2026/07/npm-debut` 으로 열린다.

```yaml
---
title: '[Neurain 개발일지] #7. 나만 쓰기 아까워서: npm 데뷔, 그리고 남은 숙제'
category: ai
tags:
  - ai
  - second brain
published: true              # false 면 목록·검색·사이트맵·원문 API 전부에서 빠진다
date: 2026-07-25 23:15:00
series: 'Neurain 개발일지'    # 같은 값끼리 시리즈로 묶인다
seriesOrder: 7
description: '목록 카드와 링크 프리뷰에 그대로 들어가는 문장.'
---
```

썸네일은 `public/thumbnails/YYYY/MM/slug.png` 를 두면 자동으로 붙는다.
글 원문은 주소 끝에 `.md` 를 붙여 받을 수 있다 (`/2026/07/npm-debut.md`).

### 문체 기준

글은 감으로 쓰지 않고 계측해서 맞춘다. 기준선은 이미 쓴 글이고, 아래 스크립트로 대조한다.

```bash
pnpm style:check           # 기준선(2025년 글) 대비 문체 수치 비교
pnpm style:pairs           # 국·영문 쌍 점검
```

## 명령어

| 명령 | 하는 일 |
|---|---|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드. **글 안전 검사를 먼저 통과해야 진행된다** |
| `pnpm check:posts` | 글에 실행 가능한 코드가 섞였는지 검사 |
| `pnpm check:analytics` | GA4 연동 3종(측정 ID·속성 ID·서비스 계정) 점검 |
| `pnpm translate` | 국문 글을 영문으로 번역 (ANTHROPIC_API_KEY 필요) |
| `pnpm lint` / `pnpm lint:style` | ESLint / Stylelint |

## 구조

```
posts/YYYY/MM/         글. slug.md(국문) + slug.en.md(영문)
public/                이미지·썸네일·첨부·파비콘
src/
  app/                 App Router. /en 아래가 영문 트리
    api/og/            링크 프리뷰(OG) 이미지 렌더러
    api/posts-raw/     글 원문(.md) 응답
  assets/og/           OG 렌더러가 파일로 읽는 폰트·초상
  components/          UI. about-fx/ 는 About 히어로의 캔버스·WebGL 효과
  config.ts            사이트 전역 설정. 개인화 값은 전부 여기 모여 있다
  proxy.ts             봇 판별, 로케일 리다이렉트
  utils/               글 로딩·검색·OG·애널리틱스
scripts/               번역·썸네일·문체 계측·점검 스크립트
```

## 국문 / 영문

`/` 가 국문, `/en` 이 영문이다. 처음 방문한 사람의 브라우저 언어가 한국어가 아니면 `/en` 으로
보내고 선택을 쿠키에 기억한다.

**크롤러는 이 리다이렉트에서 제외한다.** 카톡·슬랙 같은 링크 미리보기 봇 상당수가
`Accept-Language: en-US` 를 보내는데, 그대로 두면 국문 링크를 붙여도 영문 카드가 잡힌다.

## 링크 프리뷰 (OG)

카톡·슬랙·X 에 링크를 붙였을 때 뜨는 카드는 `/api/og` 가 그때그때 그린다.
구성은 About 페이지 히어로를 그대로 옮긴 것이고, 국문에는 `KR`, 영문에는 `EN` 배지가 붙는다.

- 문구는 `src/config.ts` 의 `preview` 한 곳에서 관리한다. 카드·메타태그·탭 제목이 같이 따라온다.
- 초상은 About 의 캔버스 디더와 같은 알고리즘으로 미리 구워둔 정적 이미지다.
  프로필 사진을 바꾸면 다시 굽는다.

```bash
python3 scripts/build-og-portrait.py
```

- 폰트는 저장소에 내장한다(`src/assets/og`). 외부 CDN 에서 받아오면 그 CDN 장애가 곧 프리뷰 장애가 된다.
- 메신저는 예전 카드를 캐시한다. 확인할 때는 `wb3vb.com/?v=2` 처럼 주소 뒤에 값을 붙이면 새로 그려진다.

## 보안

전면 감사를 한 번 돌렸고 그 결과가 코드에 반영돼 있다. 손댈 때 알아야 할 것만 적는다.

- **보안 헤더는 `next.config.ts` 한 곳**에서 관리한다. CSP 포함. 값을 바꾸면 홈·글·About(three.js)
  에서 콘솔 오류가 없는지 반드시 확인한다. `vercel.json` 에 나눠 두면 로컬에서 검증할 수 없다.
- **글 안의 HTML 은 실제로 실행된다.** MDX 가 마크다운 속 태그를 컴포넌트로 만들기 때문이다.
  그래서 `pnpm build` 앞단에서 `<script>`·이벤트 속성·`javascript:` 링크를 검사해 막는다.
  번역 결과나 복붙으로 섞여 들어오는 경우를 잡기 위한 것이다.
- **글 원문 API 는 `posts` 폴더 밖으로 못 나간다.** 경로 조각 화이트리스트와 절대경로 재확인,
  두 겹으로 막혀 있고 미발행 글도 걸러낸다.
- 서비스 계정 키 파일은 `.gitignore` 가 이름 패턴으로 막고 있다. 이 저장소는 공개다.

## 환경변수

`.env.example` 을 `.env.local` 로 복사해 채운다. 배포는 Vercel 프로젝트 설정에 같은 이름으로 넣는다.
없어도 사이트는 동작한다.

| 변수 | 용도 | 없으면 |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 방문자 수집 | GA 비활성 |
| `GA4_PROPERTY_ID` | 조회수 읽기 대상 | 인기글이 최신순 폴백 |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | 조회수 읽기 권한 | 인기글이 최신순 폴백 |
| `ANTHROPIC_API_KEY` | 번역·태그 생성 스크립트 | 해당 스크립트만 못 씀 |
| `GEMINI_API_KEY` | 썸네일 생성 스크립트 | 해당 스크립트만 못 씀 |

인기글(Popular this season)은 **최근 30일 조회수 상위 6개**다. 글 페이지만 집계하고 국문에만 적용된다.
설정 절차는 [docs/analytics-setup.md](./docs/analytics-setup.md) 에 있다.

## 문서

값을 바꿀 때는 코드만 고치지 말고 해당 문서도 같이 갱신한다.

| 문서 | 다루는 것 |
|---|---|
| [design.md](./design.md) | 컬러 토큰·레이아웃·컴포넌트 스펙. 디자인 일관성의 단일 기준 |
| [typography.md](./typography.md) | 글꼴·굵기·자간·줄간격·타입스케일 |
| [docs/analytics-setup.md](./docs/analytics-setup.md) | GA4 연동 절차 |
