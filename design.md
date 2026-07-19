# design.md — 디자인 시스템 명세

> 목표: [yceffort.kr](https://yceffort.kr) (yceffort/blog 저장소, `apps/blog`)의 디자인을 1:1로 재현한다.
> 이 문서의 모든 값은 원본 저장소의 `apps/blog/src/app/tailwind.css`(3,048줄), `apps/blog/tailwind.config.js`, `apps/blog/src/app/layout.tsx` 및 각 컴포넌트 소스에서 검증한 실측값이다. 임의로 값을 바꾸지 않는다.

---

## 0. 빌드 체인 전제 (스타일이 동일하게 해석되기 위한 조건)

- **Tailwind CSS v4 + v3 config 하이브리드**: `postcss.config.js`에는 `@tailwindcss/postcss` 플러그인 하나만 등록한다. 진입 CSS(`src/app/tailwind.css`) 첫 줄은 `@import 'tailwindcss'`, 둘째 줄은 `@config '../../tailwind.config.js'`로 v3 형식 JS 설정을 로드한다.
- `tailwind.config.js` 핵심: `darkMode: 'class'`, `content: ['./src/**/*.ts*', ...]`, `plugins: [@tailwindcss/forms, @tailwindcss/typography]`, `variants: {typography: ['dark']}`.
- **Tailwind v4 보더색 호환 셰임**(필수 — 없으면 모든 보더가 currentColor가 됨):
  ```css
  @layer base {
    *, ::after, ::before, ::backdrop, ::file-selector-button {
      border-color: var(--color-gray-200, currentColor);
    }
  }
  ```
- **`gray` = zinc**: `theme.extend.colors`에서 `gray: colors.zinc`로 재매핑한다. 즉 `bg-gray-100`은 zinc-100(#f4f4f5)이다. 이 매핑이 코드블록·Tag·Footer 색의 전제다.
- 기타 스케일: `primary: colors.indigo`, `secondary: colors.pink`, `accent: colors.teal`, `dark: '#09090b'`, `light: '#ffffff'`.

---

## 1. 디자인 원칙

1. **토큰 우선(CSS 변수 단일 소스)**: 표면·텍스트·보더·브랜드 색은 전부 `--bg/--surface/--ink/--primary` 계열 CSS 변수를 참조한다. 라이트/다크는 변수 재정의만으로 전환되고, 컴포넌트 CSS는 테마를 모른다.
2. **이중 스타일 체계의 명확한 분리**: 페이지 셸·카드·히어로 등 "브랜드 표면"은 수제 CSS 클래스(`.post-card`, `.site-header` 등, tailwind.css에 정의)로, 코드블록·Tag 배지·Footer·prose TOC 등 "콘텐츠 유틸"은 Tailwind 유틸리티 클래스로 작성한다. 두 체계를 임의로 섞지 않는다.
3. **파생 색은 `color-mix(in oklab, …)`**: 호버 보더, 반투명 배경, 글로우는 새 hex를 만들지 않고 항상 `color-mix(in oklab, var(--primary) N%, …)`로 파생한다. 이 규칙 덕에 액센트 프리셋(rose/emerald/amber/cyan)이 전 컴포넌트에 자동 전파된다.
4. **타이포 대비의 극단성**: 히어로/페이지 타이틀은 weight 900 + 음수 letter-spacing(-0.045em) + line-height 1 미만, 라벨류는 JetBrains Mono 10~12px + uppercase + 넓은 letter-spacing(0.08~0.35em). 이 대비가 아이덴티티의 핵심이다.
5. **모션은 두 개의 이징만**: 일반 인터랙션 `cubic-bezier(0.2, 0.9, 0.2, 1)`, 패널 스프링 `cubic-bezier(0.16, 1, 0.3, 1)`. 모든 장식 애니메이션은 `prefers-reduced-motion: reduce`에서 비활성화한다.
6. **앰비언트 레이어**: body 라디얼 그라데이션 2개 + `#grain`(SVG 노이즈) + `#cursor-glow`가 항상 깔린다. `body[data-minimal='true']`로 일괄 제거 가능해야 한다.

---

## 2. 컬러 토큰

### 2.1 CSS 변수 — 라이트(`:root`) / 다크(`html.dark`)

| 토큰 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `--bg` | `#fafafa` | `#0a0a0f` | 페이지 배경 |
| `--bg-2` | `#f2f2f5` | `#0f0f17` | 보조 배경 |
| `--surface` | `#fff` | `#16161f` | 카드/패널 표면 |
| `--surface-2` | `#f5f5f8` | `#1c1c28` | 인라인 코드·칩 배경 |
| `--border` | `#e5e5eb` | `#26263a` | 기본 보더 |
| `--border-2` | `#d4d4dc` | `#33334d` | 강조 보더 |
| `--ink` | `#0a0a0f` | `#f5f5fa` | 제목·강조 텍스트 |
| `--ink-2` | `#2a2a35` | `#c9c9d6` | 본문 텍스트 |
| `--ink-3` | `#64647a` | `#8b8ba3` | 보조 텍스트 |
| `--ink-4` | `#9b9bb0` | `#5c5c73` | 메타·힌트 텍스트 |
| `--primary` | `#6366f1` (indigo-500) | `#818cf8` (indigo-400) | 브랜드 1 |
| `--primary-2` | `#a78bfa` | `#a78bfa` | 브랜드 2 (그라데이션 중간) |
| `--primary-3` | `#ec4899` | `#f472b6` | 브랜드 3 (핑크 포인트) |
| `--accent` | `#14b8a6` | `#2dd4bf` | 틸 액센트 |
| `--radius` | `12px` | (동일) | 카드 라운드 |
| `--v-line` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.06)` | 세로 구분선 |

Tailwind 유틸 별칭: `colors`에 `bg/bg-2/surface/surface-2/ink/ink-2/ink-3/ink-4` 및 `brand.1~3 = var(--primary/-2/-3)`을 등록해 `bg-surface`, `text-ink-3` 형태로도 쓸 수 있게 한다.

### 2.2 액센트 프리셋 (`body[data-accent]`, `--primary/-2/-3`만 재정의)

| 프리셋 | --primary | --primary-2 | --primary-3 |
|---|---|---|---|
| rose | `#f472b6` | `#fb923c` | `#fbbf24` |
| emerald | `#34d399` | `#38bdf8` | `#fbbf24` |
| amber | `#fbbf24` | `#fb923c` | `#f472b6` |
| cyan | `#38bdf8` | `#a78bfa` | `#34d399` |

### 2.3 코드 토큰 팔레트 (tailwind.config `colors.code` / `colors['code-light']`)

| 토큰 | 다크 `code.*` | 라이트 `code-light.*` |
|---|---|---|
| green | `#a4f4c0` | `#16a34a` |
| yellow | `#ffeb99` | `#ca8a04` |
| purple | `#d7a9ff` | `#9333ea` |
| red | `#ff9999` | `#dc2626` |
| blue | `#98dcff` | `#2563eb` |
| white/black | `#ffffff` (white) | `#1f2937` (black) |

### 2.4 기타

- `::selection`: `background: color-mix(in oklab, var(--primary) 40%, transparent); color: var(--ink)`
- boxShadow 확장: `brutal '2px 2px 0px 0px #52525b'`, `brutal-lg '4px 4px…'`, `brutal-sm '1px 1px…'`, `brutal-dark '2px 2px 0 0 #a1a1aa'`, `brutal-lg-dark`
- 시리즈 필 전용 그린: `#22c55e` (보더 30% mix / 배경 12% mix)
- 태그 클라우드 TAG_PALETTE(10색, 각 항목 첫 값 사용): `#a78bfa #f472b6 #fbbf24 #38bdf8 #34d399 #fb923c #a3e635 #f87171 #c084fc #60a5fa`
- `meta theme-color`: `#ffffff`

---

## 3. 타이포그래피

### 3.1 폰트 패밀리 (next/font/google, `subsets: ['latin']`, `display: 'swap'`)

| 변수 | 폰트 | 비고 |
|---|---|---|
| `--font-sans` | Inter | html className에 variable 부착 |
| `--font-mono` | JetBrains_Mono | 라벨·메타·코드 |
| `--font-serif` | Fraunces | `style: ['italic', 'normal']` — blockquote·em 강조 |

- body 스택: `var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif` — **한글은 시스템 폰트 폴백. 한글 웹폰트를 로드하지 않는다.**
- `.font-mono`: `var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace`
- `.font-serif`: `var(--font-serif), ui-serif, Georgia, 'Times New Roman', serif` + `font-optical-sizing: auto`
- body는 `antialiased`.

### 3.2 디스플레이 스케일 (수제 CSS)

| 요소 | 크기 | weight / lh / ls |
|---|---|---|
| `.hero-title` (홈) | `clamp(56px, 12vw, 180px)` | 900 / 0.88 / -0.045em |
| `.page-title` (태그) | `clamp(48px, 10vw, 120px)` | 900 / 0.9 / -0.045em |
| `.post-title` (상세) | `clamp(32px, 5.5vw, 64px)` | 800 / 1.05 / -0.03em |
| `.sec-head h2` | `clamp(28px, 4vw, 48px)` | 900 / 1.05 / -0.03em |
| `.archive-head h1` | 32px | 800 / -0.02em |
| `.logo-name` | 18px | 800 / 1.1 / -0.02em |

- 그라데이션 강조(`.accent`, 타이틀 내 `em`): `linear-gradient(120deg, var(--primary) 0%, var(--primary-2) 50%, var(--primary-3) 100%)` + `background-clip: text` + `background-size: 200% 100%` + `animation: hero-hue 10s ease-in-out infinite`.
- `.hero-title .stroke`: `color: var(--ink-4)`, weight 700. `.page-title .stroke`: `color: transparent` + `-webkit-text-stroke: 2px var(--ink-3)` (두 페이지가 다름 — 주의).
- 모노 라벨 공통형: `font-family: var(--font-mono)` / 10~12px / uppercase / letter-spacing 0.08~0.35em / `var(--ink-3)` 또는 `var(--primary)`.

### 3.3 본문(`.post-article`) 스케일

- 기본: `font-size: 16px; line-height: 1.8; color: var(--ink-2)`
- 헤딩 공통: weight 700, lh 1.3, ls -0.02em, `color: var(--ink)`
  - h1 32px, margin `48px 0 18px` · h2 26px, margin `44px 0 16px`, padding-bottom 6px · h3 20px/600, margin `32px 0 12px` · h4 17px/600, margin `24px 0 10px`
- `p` margin `14px 0` · `strong` 600 `var(--ink)` · `ul/ol` margin `14px 0 14px 22px`, `li` margin `6px 0`
- 인라인 코드 `:not(pre) > code`: padding `2px 6px`, border 1px `var(--border)`, radius 5px, bg `var(--surface-2)`, mono `0.87em`, `color: var(--primary-3)`
- blockquote: margin `24px 0`, padding `14px 22px`, border-left `3px var(--primary)`, radius `0 10px 10px 0`, bg `color-mix(in oklab, var(--primary) 6%, var(--surface))`, **Fraunces serif italic 17px**, `color: var(--ink)`
- 링크: underline, `color: var(--primary)`, `text-underline-offset: 3px`, thickness 1px, hover `var(--primary-2)`. 외부링크 `.external-link::after`에 `'↗'` (0.78em/600, `var(--ink-4)`)
- table: 14px, th/td padding `10px 14px` + border 1px `var(--border)`, thead th는 bg `var(--surface-2)` / 700 / 좌측 정렬
- img: border 1px `var(--border)`, radius 10px · hr: margin `36px 0` · pre: margin `22px 0`, border 1px `var(--border)`, radius 10px
- 전역: `html { scroll-padding-top: 6rem }`, `h1~h6 { scroll-margin-top: 6rem }`, `a { word-break: break-all }`
- prose(typography 플러그인) 커스텀: DEFAULT는 본문 gray.700 / 링크 primary.500→hover 600 / h1,h2 weight 700 tracking tight / h3 600 / 인라인 code pink.500. dark variant는 본문 gray.300, 헤딩 gray.100, hr·blockquote 보더 gray.700 (`dark:prose-dark`로 활성).
- 헤딩 앵커 `span.icon.icon-link`: 0.8em 인라인블록, data-URI SVG(라이트: 체인 아이콘 stroke currentColor / 다크: 흰색 # 아이콘 별도 SVG). 크기 지정: h2 18px, h3 15px, h4 12px.

---

## 4. 레이아웃

### 4.1 컨테이너

- `SectionContainer` 기본: `mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8` (wide 변형 `mx-auto max-w-none w-[95vw] px-4 sm:px-6 lg:px-8`은 정의만 있고 미사용, `wide=false` 고정)
- `LayoutWrapper` 경로별 추가 클래스:
  - `/`, `/en` → `xl:max-w-7xl`
  - `/about` → `max-w-6xl`
  - `/pages*`, `/en/pages*`, `/tags*` → `xl:max-w-7xl`
  - 그 외 → `xl:max-w-5xl`
- `main`: `id="main"`, `min-h-[calc(100vh-260px)] pt-6`
- 포스트 상세 래퍼(`[year]/[...slug]/layout.tsx`): `mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0`
- **본문 컬럼**: `.post-masthead / .post-article / .post-footer / .post-back / .post-series-nav`는 `max-width: 820px; margin-left/right: auto` 단일 컬럼
- 헤더 inner(`.site-header-inner`): `max-width: 1440px`, padding `16px 32px`, gap 16px

### 4.2 브레이크포인트

- Tailwind 4 기본: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536
- 수제 미디어쿼리: `@media (max-width: 640px)` 히어로·post-row 축소, `@media (max-width: 639px)` 트윅 패널 바텀시트, `@media (min-width: 640px)` `.header-sep` 표시, `@media (max-width: 900px)` rec-row 3컬럼 축소, `@media (min-width: 900px)` about-hero 2컬럼(`1.3fr 1fr`)

### 4.3 z-index 계층

`#anim-bg`/`#cursor-glow` 0 → `.site-header` 40 → `.theme-menu` 45 → `.floating-toc`/ScrollTop 50 → `.tweaks-panel` 80 → `.search-overlay` 90 → `#grain`/`.skip-link` 100

### 4.4 앰비언트 배경 (전 페이지 공통)

- body: `overflow-x: hidden`, `background-attachment: fixed`, background-image =
  `radial-gradient(800px circle at 10% 10%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 60%)` + `radial-gradient(600px circle at 90% 80%, color-mix(in oklab, var(--primary-3) 10%, transparent), transparent 60%)`
- `#grain`: fixed z-100, SVG `feTurbulence baseFrequency 0.9, numOctaves 2` data URI(160px 타일), opacity 0.055, `mix-blend-mode: overlay`
- `#anim-bg`: fixed z-0, body와 동일 라디얼 2개, opacity 0.6
- `#cursor-glow`: 500×500px 원, `radial-gradient(circle, var(--primary) 0%, transparent 60%)`, `blur(20px)`, opacity 0.08(다크 0.12), left/top 전환 `400ms cubic-bezier(0.2,0.9,0.2,1)`
- `prefers-reduced-motion: reduce`에서 `#grain`/`#cursor-glow` display:none

---

## 5. 컴포넌트 스펙

### 5.1 헤더 (`.site-header`)

- `position: sticky; top: 0; z-index: 40`, border-bottom 1px `var(--border)`, bg `color-mix(in oklab, var(--bg) 70%, transparent)`, `backdrop-filter: blur(14px) saturate(140%)`
- 로고 `.logo-ring`: 44×44px 원, padding 2px, `conic-gradient(from 0deg, var(--primary), var(--primary-2), var(--primary-3), #fbbf24, var(--primary))`, `animation: logo-spin 14s linear infinite`, hover `rotate(8deg) scale(1.06)`; 내부 span은 `var(--bg)` 배경 원 + 40×40 프로필 이미지(rounded-full)
- `.nav-pills`: padding 4px, border 1px `var(--border)`, radius 999px, bg `color-mix(in oklab, var(--surface) 55%, transparent)`, `blur(10px) saturate(140%)`, shadow `inset 0 1px 0 …surface 80%` + `0 6px 20px -14px …ink 60%`, gap 2px. 640px 미만 숨김(`hidden sm:flex`)
- `.nav-link`: padding `7px 14px`, radius 999px, 13.5px/500, ls -0.005em, `var(--ink-3)`. 활성(`data-active='true'`): `inset 0 0 0 1px primary 35%` + `0 6px 18px -10px primary 60%` 그림자, bg `linear-gradient(180deg, primary 18% over surface → 10%)`, 라벨 앞 4px 글로우 도트(`var(--primary-3)`, `box-shadow 0 0 10px`)
- `.icon-btn`: 36×36px, radius 10px, hover `translateY(-1px)`, focus-visible ring `0 0 0 2px var(--bg), 0 0 0 4px var(--primary)`
- `.header-sep`: 1×22px, 세로 그라데이션(`transparent → var(--border-2) → transparent`), 640px 이상 표시
- 모바일: 햄버거(`sm:hidden`, h-10 w-10) → 바텀시트(`rounded-t-[28px]`, bg `var(--surface)`, shadow `0 -24px 60px -20px rgba(0,0,0,0.45)`, 드래그 핸들 `h-[5px] w-11`)

### 5.2 푸터 (`Footer.tsx` — Tailwind 유틸)

```
<footer><div class="mt-16 flex flex-col items-center">
  <div class="mb-3 flex space-x-4">  ← SocialIcon mail/github/twitter, size 6 (h-6 w-6, fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400)
  <div class="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">  ← 이름 • © YEAR • 사이트 URL
```

### 5.3 포스트 카드 (`.post-card`, 3D 틸트)

- border 1px `var(--border)`, radius `var(--radius)`(12px), bg `var(--surface)`, `transform-style: preserve-3d`, transition border-color/box-shadow 300ms
- hover: `border-color: color-mix(in oklab, var(--primary) 50%, var(--border))`, `box-shadow: 0 10px 40px -20px color-mix(in oklab, var(--primary) 80%, transparent)`
- 전체 클릭: 자식 `<a>`를 `absolute inset-0 z-3`으로
- `.thumb`: `aspect-ratio: 16/9`, border-bottom, img `object-fit: cover`, hover `scale(1.05)` 700ms `cubic-bezier(0.2,0.9,0.2,1)`
- `.body`: padding `18px 20px 20px`, gap 10px. h3: 17px/700/1.35, ls -0.015em, 2줄 클램프, `translateZ(20px)`. `.desc`: 13px/1.55 `var(--ink-3)` 2줄 클램프(썸네일 없을 때만). `.meta`: margin-top auto, padding-top 10px, 12px `var(--ink-4)`
- `.series` 필: padding `3px 9px`, radius 999px, `#22c55e` 보더 30% mix / bg 12% mix, 11.5px/500
- 글레어 `::after`: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 10%, transparent) 0%, transparent 45%)`, hover 시 opacity 1
- 틸트(JS): `perspective(1200px) rotateX((0.5-y)*tilt) rotateY((x-0.5)*tilt)`, tilt는 html `--tilt`(기본 8)
- 목록 행 `.post-row`: grid `96px 1fr 24px`, gap 20px, padding `18px 14px`; 썸네일 96px `aspect 3/2` radius 10px; 타이틀 17px/700 2줄 클램프, hover `var(--primary)`; 모바일(≤640px) grid `72px 1fr`, 타이틀 15.5px 3줄, desc/화살표 숨김

### 5.4 태그 칩

- `.tag-chip`(카드/상세 마스트헤드): padding `3px 9px`, border 1px `var(--border)`, radius 999px, bg `var(--surface-2)`, 11px/500, `var(--ink-2)`. `.primary` 변형: primary 30% 보더 / 12% bg / `var(--primary)` 텍스트
- `Tag.tsx`(링크형 배지): `rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-primary-900/40 dark:hover:text-primary-300`, href `/tags/{tag}`, 공백은 `-` 치환
- `.tchip`(태그 클라우드): padding `8px 16px`(인라인 스타일이 `8·16px × sqrt(size)`로 덮음), border 1px `color-mix(in oklab, var(--c1) 40%, transparent)`, radius 999px, bg `color-mix(in oklab, var(--c1) 14%, var(--surface))`, 600/-0.01em, `color: var(--c1)`; hover 시 보더 `var(--c1)` + shadow `0 12px 30px -14px c1 70%`; 카운트 배지 `.c`는 mono 10px, bg c1 10%. 등장 `tchip-in 420ms` + 칩당 32ms 스태거

### 5.5 페이지네이션

- `.pagination`: `margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border)`; `.pagination-slot` width 50% × 2 (`.end`는 `justify-content: flex-end`)
- `.pagination-link`: inline-flex, padding `10px 14px`, border 1px + radius 8px, bg `var(--surface)`, 14px/500 `var(--ink-2)`, gap 10px; hover 시 `border-color: color-mix(primary 50%, border)` + `box-shadow: 0 8px 24px -16px primary 80%` + `color: var(--ink)`
- 텍스트 링크만(`← Page N` / `Page N →`), 숫자 목록 없음

### 5.6 테마 스위치 / 트윅 패널

- next-themes `ThemeProvider attribute="class"` (`html.dark`), Light/Dark/System 3버튼 세그먼트 `.tweaks-theme`(grid 3열, 활성 `data-on='true'`: `inset 0 0 0 1px primary 35%` 링 + bg primary 14% mix + `color: var(--primary)`)
- 전환 애니메이션: `document.startViewTransition` + 클릭 좌표를 `--theme-toggle-x/y`로 → `.theme-transition-circle::view-transition-new(root)`에 `circle-clip 0.5s ease-in-out` (`clip-path: circle(0% → 150% at …)`). 미지원 브라우저 폴백: `.theme-fading` 클래스로 background/color/border 등 220ms 트랜지션
- `.tweaks-panel`: fixed `top: 82px; right: 24px`, width 300px, radius 14px, bg `color-mix(surface 96%)`, 등장 `260ms cubic-bezier(0.16,1,0.3,1)`; ≤639px에서 풀폭 바텀시트(radius `22px 22px 0 0`, `max-height: min(80vh, 640px)`)
- 상태 저장: 쿠키 `tw-theme / tw-accent / tw-grain / tw-minimal / tw-tilt` + head 인라인 스크립트로 쿠키→localStorage `theme` 동기화(FOUC 방지)

### 5.7 TOC (플로팅 다이얼 + 패널)

- `.floating-toc`: `fixed right: 24px; bottom: 24px; z-index: 50`
- `.reading-progress-dial`: 48×48px(모바일 42px) 원, border 1px `var(--border)`, bg `color-mix(surface 80%)`, `blur(14px) saturate(140%)`, shadow `0 10px 30px -12px rgba(0,0,0,0.35)`; SVG r=16, `stroke-dasharray: 100.53`, `stroke-dashoffset: calc(100.53 - (100.53 * var(--progress) / 100))`, fill `var(--primary)`, track `border 80% mix`; 중앙 % 숫자 mono 10.5px/600
- `.floating-toc-panel`: width 288px, `max-height: 60vh`, bottom 64px 우측 정렬, radius 12px, shadow `0 20px 50px -20px rgba(0,0,0,0.35)`; 닫힘 `translateY(16px) scale(0.9) opacity 0`, 열림 전환 `240ms cubic-bezier(0.16,1,0.3,1)`
- 리스트 링크: 13px, padding `6px 0 6px 12px`, border-left 2px transparent; `data-active='true'`면 border-left `var(--primary)` + `color: var(--primary)` + 500
- 별도 `.floating-toc-scroll-top`: 40px 원형, `data-show='false'`면 `translateY(8px) opacity 0`
- (remark-toc 본문 TOC 박스, prose): `.prose h2[id^='table-of-contents'] + ul` → `bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700 list-none`; 1단계 링크 `font-semibold text-gray-800 dark:text-gray-200 no-underline hover:text-primary-600`, 2단계 `pl-4 border-l-2 text-sm text-gray-600`, 3단계 `text-xs text-gray-500`, 4단계 `pl-3 text-xs text-gray-400` — 4단계 중첩까지 정의

### 5.8 코드블록

- 배경: `pre:has(> code) { @apply bg-gray-100 dark:bg-gray-900 }` (gray=zinc → 라이트 `#f4f4f5` / 다크 `#18181b`), `pre code { @apply text-gray-800 dark:text-gray-100 }`, `pre { overflow-x: auto }`
- 토큰 색: prism 테마 CSS를 임포트하지 않고, rehype-prism-plus가 붙인 `token X` 클래스를 빌드 시 Tailwind 클래스로 치환:
  - `tag`·`deleted`·`boolean` → `text-code-light-red dark:text-code-red`
  - `attr-name` → `…-yellow` · `attr-value`·`inserted`·`string` → `…-green`
  - `punctuation` → `text-code-light-black dark:text-code-white`
  - `keyword` → `…-purple` · `function` → `…-blue`
  - `comment` → `text-gray-500 dark:text-gray-400 italic`
- 라인: `.code-highlight { float: left; min-width: 100% }`; `.code-line`은 `display: block`, margin 좌우 -16px / padding 좌우 16px, border-left 4px transparent; `.inserted` → `bg-green-500/20`, `.deleted` → `bg-red-500/20`; `.highlight-line` → `border-l-amber-500 bg-amber-500/20 dark:border-l-yellow-400 dark:bg-yellow-400/15`
- 줄번호 `.line-number::before`: `content: attr(line)`, width 1rem, margin-right 16px / margin-left -8px, 우측 정렬, `text-gray-400 dark:text-gray-500`
- 파일명 바(` ```lang:filename ` 문법): `rounded-t-lg bg-gray-200 px-4 py-2 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300`, 이어지는 pre는 `!mt-0 rounded-t-none`. remark 타이틀 변형 `.remark-code-title`: `px-5 py-3 font-mono text-sm font-bold rounded-t bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200`
- 복사 버튼: `absolute right-2 top-2 rounded-md px-2 py-1 text-xs bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white` (클립보드 복사, 2초간 'Copied')

### 5.9 검색 오버레이

- `.search-overlay`: fixed inset-0 z-90, padding `12vh 20px 20px`, bg `color-mix(bg 55%)` + `blur(8px)`, `search-fade 160ms`
- `.search-panel`: max-width 600px, max-height 70vh, radius 16px, border `var(--border-2)`, bg `var(--surface)`; 입력 16px, ESC 배지 mono 11px; 결과행 radius 10px, 타이틀 14.5px/600

---

## 6. 다크모드 규칙

1. **전략은 class 단일**: `tailwind.config.js darkMode: 'class'` + next-themes `ThemeProvider attribute="class"` → `html.dark`. `prefers-color-scheme` 미디어쿼리로 스타일을 직접 분기하지 않는다(모션 감소 제외).
2. **토큰 레이어에서 해결**: 다크 색은 `html.dark { --bg: …; }` 재정의로 처리한다. 수제 CSS 컴포넌트에는 다크 분기가 거의 없어야 정상이다. 예외적으로 다크 분기가 필요한 곳: `#cursor-glow`(opacity .08→.12), `span.icon.icon-link`(다크용 흰색 SVG).
3. **Tailwind 유틸 영역은 `dark:` 접두사**: 코드블록/Tag/Footer/prose TOC처럼 gray-* 유틸을 쓰는 곳만 `dark:bg-gray-900` 식으로 명시 분기.
4. **prose는 `dark:prose-dark`**: `variants: {typography: ['dark']}` 설정 필수.
5. **FOUC 방지**: head 인라인 스크립트에서 `tw-theme` 쿠키 → localStorage `'theme'` 복사(하이드레이션 전). `html`에 `suppressHydrationWarning`.
6. **테마 전환 연출**: View Transitions `circle-clip 0.5s`(§5.6), 미지원 시 `.theme-fading` 220ms. `::view-transition-old/new(root)`는 `mix-blend-mode: normal`, old z-1 / new z-9999.

---

## 7. 페이지별 레이아웃

### 7.1 홈 (`/`)

- 컨테이너: SectionContainer + `xl:max-w-7xl`
- 구조: `.page-view`(page-fade 450ms) > `.home-hero` → "Popular this season" `.sec-head` + 카드 그리드 → "Recent" `.sec-head` + `.rec-list`
- `.home-hero`: padding `72px 0 56px`(≤640px `24px 0 20px`), `perspective: 1400px`
  - `.hero-eyebrow`: mono 12px, ls 0.35em, uppercase, `var(--primary)`, 7px 도트(`var(--primary-3)`, `box-shadow 0 0 12px`, `hero-blink 1.6s`)
  - `.hero-title`: 3줄(GRIND. / LEARN, / REPEAT.), 각 `.ln`은 포인터 추적 패럴랙스(depth = (i+1)*6)
  - `.hero-sub p`: 15px/1.6, max-width 420px, `var(--ink-2)`. `.hero-stats`: mono 11px uppercase ls 0.08em, gap 22px, `b`는 sans 20px/800 ls -0.02em, 숫자 `padStart(3,'0')`
  - 스태거 진입: `hero-fade-1~4` = `hero-fade-up 0.6s ease-out` + delay 0.1/0.25/0.4/0.55s
- 인기 그리드: `grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3`, PostCard 6개
- `.sec-head`: flex items-end, padding `28px 0 20px`, gap 20px; `.sec-count` mono 11px ls 0.15em uppercase(`NN ITEMS` 등 padStart 2); h2 안 `em`은 Fraunces italic 500 `var(--ink-3)`; `.line`은 flex-1 1px 그라데이션; `.hint` mono 11px `var(--ink-4)`
- `.rec-row`: grid `56px 1.2fr 1fr 130px 28px` gap 20px, padding `20px 12px`, border-bottom; 번호 `.rn` mono 12px ls 0.1em; h4 16px/700 2줄; `.rtags` mono 10.5px uppercase; `.rmeta` mono 11px 우측(날짜 `b` 12px/600); hover 시 화살표 `translateX(4px)` + `var(--primary)`; ≤900px에서 `40px 1fr 24px`로 축소(`.rd`/`.rmeta` 숨김)

### 7.2 포스트 상세 (`/{year}/{slug}`)

- 래퍼: `mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0`, 내부 컬럼 820px(§4.1)
- 순서: `.post-back` → `.post-masthead` → (`.post-cover`) → `.post-article` → `.post-series-nav` → `.post-footer` → `.post-related` + `.floating-toc`
- `.post-back`: mono 11px ls 0.16em uppercase `var(--ink-3)`, 22px 원형 `.dot`(border + `var(--surface-2)`), hover `var(--primary)`
- `.post-masthead`: flex column gap 20px, padding `24px 0 20px`
  - `.post-eyebrow`: mono 11px ls 0.2em uppercase `var(--primary)` — `◆ SERIES · {name}` 또는 `◆ ESSAY`
  - `.post-title`: §3.2. 제목 내 `em`은 120deg 그라데이션 + `hero-hue 10s` (frontmatter `<em>` 문법, 없으면 첫 단어 자동 강조)
  - `.post-meta-row`: border-top 1px, padding-top 16px, space-between; `.post-author .nm` 14px/600, `.sub` mono 11.5px `{yyyy-MM-dd} · {n}분`; `.post-stats` mono 11px uppercase gap 22px, `b` sans 18px/700 — `N min / YYYY year / KO original`
  - 태그: `Tag.tsx` 최대 5개
- `.post-cover`: margin `28px 0 40px`, radius 16px, `aspect-ratio: 1200/630`, `::after` 하단 그라데이션(`transparent 35% → bg 85% mix`)
- 본문: `.post-article`(§3.3) + 코드블록(§5.8) + KaTeX(`.math-display { overflow-x: auto }`)
- `.post-series-nav`: padding `18px 20px`, border + radius 12px, bg `color-mix(surface 70%)`; 키커 필 mono 10px ls 0.16em uppercase + bg primary 12%; 목록 li `padding 8px 10px radius 8px`, `data-current`는 `inset 0 0 0 1px primary 25%` 링 + bg primary 10% mix + `var(--primary)`; prev/next 링크 12.5px, max-width 48%, ellipsis
- `.post-footer`: margin-top 56px, border-top, 14px, space-between; 링크 `var(--primary)`, `.issue` `var(--ink-3)` ('Issue on GitHub →')
- `.post-related`: margin-top 56px; 제목 mono 12px/700 ls 0.12em uppercase; 항목은 `.post-row` 재사용(태그 겹침 점수 상위 4개)

### 7.3 태그 (`/tags`, `/tags/{tag}/pages/{id}`)

- 컨테이너: `xl:max-w-7xl`
- `/tags`: `.page-hero`(padding `60px 0 40px`) → `.hero-eyebrow` → `.page-title`(§3.2; `.accent` 그라데이션 + `.stroke` 텍스트 스트로크 2px `var(--ink-3)`) → `.page-sub`(max-width 540px, 15px/1.6) → `.tag-grid`(flex wrap, gap 12px, padding `36px 0 60px`, `perspective: 1200px`)
- `.tchip` 크기 공식: `size = 0.8 + (count / maxCount) * 1.2`, `fontSize = 14px × size`, `padding = 8px·16px × sqrt(size)`; 색은 `tagHash(tag) % 10`으로 TAG_PALETTE에서 결정적 선택 → `--c1` 주입(§5.4)
- 태그별 목록: `.sec-head`(h2 + `.sec-count` `NN POSTS` + `.line`) → `.post-row-list`(border-top, li별 border-bottom) → `.pagination`(§5.5). 페이지당 20개
- 빈 썸네일 플레이스홀더: `linear-gradient(135deg, primary 10% mix, primary-3 7% mix)` + 3줄 라인 SVG(width 60%, `var(--ink-4)`)

### 7.4 About (`/about`, `/resume`)

- 컨테이너: `max-w-6xl`
- `.about-hero`: grid `1fr`(≥900px `1.3fr 1fr`), align-items center, padding `24px 0 32px`, gap 24px
  - 좌: `.page-title-fx`(height `clamp(140px, 22vw, 240px)`, WebGL 파티클 텍스트 캔버스) + 소개문 + `.about-socials`(mono 13px; 링크는 padding `8px 14px` border+radius 8px bg `var(--surface)`, hover 보더/색 `var(--primary)`)
  - 우: `.hero-fx-b`(320×320 캔버스, `border-radius: 50%`, `cursor: crosshair` — 프로필 파티클 디졸브), `.hero-fx-hint` mono 10px ls 0.12em uppercase opacity 0.65
- `.tabs`(About/Resume 전환): flex, margin `32px 0 24px`, border-bottom 1px; `a`는 flex-1, padding `12px 24px`, 14px/600 center, `var(--ink-3)`(활성 `var(--ink)`); `a::after` 2px `var(--primary)` 언더라인 `scaleX(0→1)` 240ms `cubic-bezier(0.2,0.9,0.2,1)`
- Resume 본문(순수 Tailwind 카드): section `rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-10`, 타임라인 `ol.relative.border-l border-gray-200 dark:border-gray-700` + 도트 `absolute -left-3 h-6 w-6 rounded-full bg-gray-100 ring-8 ring-white dark:ring-gray-800`(내부 `h-3 w-3 rounded-full bg-gray-400`), 스킬 필 `rounded-full bg-gray-100 px-3 py-1 text-sm font-medium`, 링크 `text-primary-600 dark:text-primary-400 hover:underline`
- `prefers-reduced-motion`에서 두 캔버스 모두 `display: none`

### 7.5 공통 진입/전환

- 모든 페이지 최상위에 `.page-view`: `page-fade 450ms cubic-bezier(0.2,0.9,0.2,1) both` (translateY 10px→0 + opacity)
- 방향 전환: `[data-vt-direction='forward'|'back']::view-transition-old/new(root)`에 ±30px 슬라이드 `0.3s ease-in-out` (`vt-slide-out-left`/`in-right` 등 4종)
- 목록→상세 morph: React ViewTransition 이름 `post-{slug}`, `{…}-thumbnail`, `{…}-tags` 공유
- `.skip-link`: fixed `top/left 12px` z-100, bg `var(--primary)` 흰 글자, radius 8px, `translateY(-200%)` → `:focus`에서 0

---

## 8. 금지 사항 (일관성을 깨는 패턴)

1. **CSS 변수 우회 금지**: 표면·텍스트·보더·브랜드 색에 hex 직접 입력 금지. 반드시 `var(--…)` 또는 등록된 별칭 유틸(`bg-surface`, `text-ink-3`)만. hex 하드코딩이 허용된 예외는 소스에 실재하는 값뿐(시리즈 그린 `#22c55e`, 로고 링의 `#fbbf24`, TAG_PALETTE, brutal 그림자, code 팔레트).
2. **`--primary` 계열 직접 색 지정 금지**: 액센트 색이 필요한 곳에서 indigo hex를 쓰면 `data-accent` 프리셋이 깨진다. 항상 `var(--primary/-2/-3)` + `color-mix`.
3. **gray 스케일 혼용 금지**: `gray`는 zinc로 재매핑되어 있다. `slate-*`, `neutral-*`, `stone-*` 유틸 사용 금지. zinc 유틸을 직접 쓰지 말고 `gray-*`로 통일.
4. **prism/highlight.js 테마 CSS 임포트 금지**: 코드 색은 토큰 클래스 치환(§5.8) + `code`/`code-light` 팔레트만. 외부 테마를 얹으면 라이트/다크 팔레트가 무너진다.
5. **이징·시간 임의 추가 금지**: `cubic-bezier(0.2,0.9,0.2,1)`(일반)과 `cubic-bezier(0.16,1,0.3,1)`(패널)만 사용. `ease-in-out` 등은 소스에 있는 자리(View Transition 0.3s/0.5s, hero-hue 등)만.
6. **radius 스케일 이탈 금지**: 카드 `var(--radius)`(12px) / 이미지·pre·thumb 10px / 버튼·아이콘 8~10px / 필·칩 999px / 검색·커버 16px. 임의 radius 금지.
7. **다크모드 media query 전략 금지**: `html.dark` 클래스 전략 단일(§6). 수제 CSS 컴포넌트에 `dark:` 분기를 늘리는 것도 원칙 위반 — 토큰 재정의로 해결할 것.
8. **폰트 추가·한글 웹폰트 로드 금지**: Inter/JetBrains Mono/Fraunces 3종 + 시스템 폴백('Apple SD Gothic Neo', 'Noto Sans KR')이 전부. 히어로/blockquote 세리프는 반드시 Fraunces(`--font-serif`).
9. **본문 컬럼 폭 위반 금지**: `.post-article` 등 상세 컬럼은 820px 고정. prose에 `max-w-*`를 새로 걸거나 컨테이너 폭 규칙(§4.1)을 페이지별로 재발명하지 않는다.
10. **z-index 임의 값 금지**: §4.3 계층(0/40/45/50/80/90/100)만 사용.
11. **모션 접근성 예외 금지**: 장식성 애니메이션(그레인, 커서 글로우, 로고 회전, 틸트, 캔버스, 진행률 트랜지션)을 추가할 때는 반드시 `prefers-reduced-motion: reduce` 비활성 처리를 함께 작성.
12. **Tailwind v4 보더 셰임 제거 금지**: §0의 `border-color: var(--color-gray-200, currentColor)` 리셋을 지우면 사이트 전체 보더 색이 틀어진다.
13. **수제 CSS ↔ 유틸 체계 침범 금지**: `.post-card` 내부를 Tailwind 유틸로 덧칠하거나, 코드블록/Tag를 수제 클래스로 재작성하지 않는다. 각 컴포넌트는 원본과 같은 체계(§1-2)로 유지.
14. **글로우·그림자 공식 위반 금지**: 강조 그림자는 항상 `0 {8~20}px {18~50}px -{10~20}px color-mix(in oklab, var(--primary|--c1) {50~80}%, transparent)` 형태. 불투명 검정 그림자는 패널류(`rgba(0,0,0,.35~.5)`)에만.
15. **타이틀 강조 문법 파괴 금지**: 제목 `em` 그라데이션(120deg, primary→primary-2→primary-3, `hero-hue 10s`)은 `.post-title em / .post-card h3 em / .rec-row h4 em / .post-row-title em`에 공통 적용된다. 이 셀렉터 묶음을 깨거나 일부만 다른 그라데이션으로 바꾸지 않는다.
