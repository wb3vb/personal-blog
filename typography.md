# Typography System — `typography.md`

이 문서는 블로그의 **폰트/타이포그래피**를 정의하는 단일 기준(Single Source of Truth)이다.
`design.md`가 색·레이아웃·컴포넌트를 정의하듯, 글꼴·굵기·자간·줄간격·타입스케일은 여기서 관리한다.
값을 바꿀 때는 코드만 고치지 말고 이 문서도 함께 갱신한다.

> **핵심 한 줄**: 라틴/숫자는 국·영문 모두 **Inter Tight** 하나로 통일하고, 한글은 시스템 고딕에 맡긴다.
> 밀도는 로케일별로 다르게 준다. KO는 자간 −0.02em·굵기 500, EN은 자간 −0.006em·굵기 450.
> 분기 기준은 `html[lang]` 속성이다.

---

## 0. 한눈에 보기 (At a glance)

| 항목 | KO (`html[lang='ko']`) | EN (`html[lang='en']`) |
|---|---|---|
| 한글 글꼴 | Apple SD Gothic Neo → Noto Sans KR (시스템) | (동일, 단 한글 거의 없음) |
| 라틴/숫자 글꼴 | **Inter Tight** (UI·글 본문 공통) | **Inter Tight** (동일) |
| 본문 크기 | 16px | 16px |
| 본문 굵기 | **500 (medium)** | **450** |
| 전역 자간 | **−0.02em (≈ −0.32px @16px)** | **−0.006em (≈ −0.096px @16px)** |
| 본문 줄간격(`.post-article`) | **1.4 (22.4px)** | **1.4 (22.4px)** |
| 글 읽기 컬럼 | **720px** | **720px** |
| 참조 | planwedding.io/guide 계승 | 2026-07-25 밀도 상향 개편 |

실측 검증값(2026-07-25, dev):

- KO `/2026/07/npm-debut` — `html` 자간 `-0.32px`, `body` 굵기 `500`,
  `.post-article` = Inter Tight / 16px / `22.4px`(=1.4) / 폭 `720px`
- EN `/en/...` — `html` 자간 `-0.096px`, `body` 굵기 `450`, 글꼴 Inter Tight
- 로드된 웹폰트: `Inter Tight 100–900`, `JetBrains Mono 100–800`, `Fraunces 100–900` (Manrope 제거됨)

---

## 1. 철학 (Philosophy)

1. **글꼴은 하나, 밀도는 로케일별로.** 한글과 라틴은 이상적인 자간·굵기가 다르다. 글꼴 수를 늘리는 대신
   같은 글꼴에 로케일별 자간·굵기를 달리 준다.
2. **국·영문 모두 밀도를 지향한다.** 2026-07-25 이전에는 "한글은 밀도, 영문은 공기"였으나, 영문도
   또렷하고 단단한 쪽이 이 블로그에 맞는다는 판단으로 EN에도 음수 자간과 450 굵기를 적용했다.
   기준 글꼴 자체도 Inter → Inter Tight로 바꿔 폭을 좁혔다.
3. **웹폰트 최소화.** 한글 웹폰트(Noto Sans KR 등)는 용량이 크다. 한글은 OS 시스템 폰트(Apple SD Gothic Neo)로
   렌더해 로딩 비용 0, FOUT 없음. 라틴/숫자만 웹폰트를 쓴다.
4. **값은 문서로 고정한다.** "왜 이 값인가"를 코드 주석과 이 문서에 남겨, 다음 사람이 되돌리거나 흔들지 않게 한다.

---

## 2. 글꼴 패밀리 (Font families)

세 종류를 `next/font/google`로 로드하고 CSS 변수로 노출한다. (`src/app/layout.tsx`)

| 변수 | 글꼴 | 용도 |
|---|---|---|
| `--font-sans` | **Inter Tight** | 기본 sans. UI·홈·목록·**글 본문** 라틴/숫자 전부 |
| `--font-mono` | **JetBrains Mono** | 코드, 메타 라벨(eyebrow·날짜·카운터), 태그 칩, 태그 그래프 노드 라벨 |
| `--font-serif` | **Fraunces** | 세리프 이탤릭 강조(`Popular *this season*` 등). **본문 인용 블록에는 쓰지 않는다** |

> **한글에 이탤릭을 쓰지 않는다.** 한글 글꼴에는 이탤릭 자형이 없어서 브라우저가 글자를 강제로
> 기울인 가짜 이탤릭(synthetic oblique)을 그린다. 자간과 획 굵기가 무너져 가장 낡아 보이는 지점이라,
> 2026-07-25에 본문 인용 블록을 세리프 이탤릭에서 산세리프 정체로 바꿨다. 장식용 이탤릭은
> 라틴 전용 요소(섹션 헤드의 `this season` 등)에만 남긴다.

기본 스택 (`body`, `src/app/tailwind.css`):

```css
font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI',
  'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
```

### 왜 Inter Tight인가

Inter의 공식 폭 좁은 변형이다. 글자 모양이 Inter와 같은 설계라 교체해도 레이아웃이 깨지지 않으면서,
같은 크기에서 한 줄에 더 많은 글자가 들어간다(15px·640px 폭 기준 히어로 부제가 한 단어 더 들어감).
**100~900 전구간 가변폰트**라 히어로 900도 가짜 볼드 없이 렌더된다.

> 후보였던 Instrument Sans는 굵기가 400~700까지만 있어 히어로 900을 브라우저 합성 볼드로 그리게 되므로
> 탈락했다. Geist는 900까지 있어 가능했으나 글자 얼굴이 더 많이 바뀌는 쪽이라 선택하지 않았다.

### 한글은 어떻게 렌더되나

**Inter Tight에는 한글 글리프가 없다.** 따라서 한글 문자는 스택을 따라 내려가 다음으로 렌더된다:

- **macOS / iOS** → `Apple SD Gothic Neo`
- **Windows** → `Malgun Gothic` 계열(스택엔 명시 안 함, OS 기본 한글로 대체)
- **최종 폴백** → `Noto Sans KR`(설치돼 있을 경우) → 시스템 sans

즉 **라틴·숫자는 Inter Tight, 한글은 시스템 고딕**이 자연스럽게 섞인다. 이는 의도된 설계다.
글이 대부분 한글이므로, 본문에서 글꼴 교체가 실제로 바꾸는 것은 `npm`, `100`, `42.7` 같은
**라틴·숫자 조각뿐**이다. 한글 웹폰트를 도입하려면 §9의 레시피를 참고.

---

## 3. 로케일 스코핑 메커니즘 (Locale scoping)

KO/EN 스타일 분기의 기준은 `<html>`의 `lang` 속성이다.

- `src/app/layout.tsx` : 루트가 `<html lang="ko">`로 SSR (한글이 기본 로케일)
- `src/components/SetHtmlLang.tsx` : 클라이언트에서 `document.documentElement.lang = locale` 로 갱신.
  `/en/*` 경로에선 `lang="en"`으로 바뀐다.
- `src/proxy.ts` : `/` 진입 시 `Accept-Language` 기준으로 `/en` 리다이렉트(영어권 방문자 편의)

따라서 CSS는 아래처럼 스코프한다:

- `html[lang='ko'] …` → 국문 페이지에만 적용
- `html[lang='en'] …` → 영문 페이지에만 적용

> ⚠️ EN 페이지는 SSR 순간 `lang="ko"`였다가 hydration 후 `en`으로 바뀌므로, 첫 프레임에 KO 자간이 잠깐
> 보일 수 있다(−0.32px ↔ −0.096px 차이라 사실상 인지 불가). 완전 제거가 필요하면 EN 레이아웃에서 `lang`을
> 서버에서 직접 세팅하도록 바꾼다.

---

## 4. 로케일별 타이포

### 4.1 실제 코드 (`src/app/tailwind.css` 최하단)

```css
/* ========= KR TYPOGRAPHY (planwedding.io-inspired: tight tracking + medium weight) ========= */
html[lang='ko'] {
  letter-spacing: -0.02em; /* ≈ planwedding -0.3px @16px — tight Korean tracking */
}
html[lang='ko'] body {
  font-weight: 500; /* medium body weight, like planwedding */
}
html[lang='ko'] .post-article {
  line-height: 1.4; /* 사용자 지정: KO·EN 공통 1.4 */
}

/* ========= EN TYPOGRAPHY ========= */
html[lang='en'] {
  letter-spacing: -0.006em;
}
html[lang='en'] body {
  font-weight: 450;
}
```

- `letter-spacing`는 `html`에 걸어 전체(제목·본문·네비 등)로 상속시킨다. 자기 자간을 명시한
  요소(제목류)는 각자 값을 유지한다.
- `font-weight`는 `body`에 걸어 **기본 굵기만** 올린다. 굵기를 직접 지정한 요소(제목 700~900,
  `strong` 700, 네비 500 등)는 영향받지 않는다.
- EN 자간을 KO(−0.02em)만큼 조이지 않은 이유: 라틴 소문자는 한글보다 자간 민감도가 높아 −0.02em이면
  글자가 서로 붙어 보인다. Inter Tight로 이미 폭이 줄었으므로 −0.006em이면 충분하다.

### 4.2 planwedding.io 대조표 — 측정 vs 채택 (KO)

| 속성 | planwedding.io/guide (측정) | 우리 KO (채택) | 판단 |
|---|---|---|---|
| 글꼴 | 전부 시스템 폰트(웹폰트 없음) | 한글 시스템, 라틴 Inter Tight | **부분 채택** — 한글은 동일(Apple SD Gothic Neo), 숫자/영문은 웹폰트가 더 깔끔 |
| 본문 크기 | 16px | 16px | 동일 |
| 본문 굵기 | 500 (medium) | **500** | 동일 채택 |
| 본문 자간 | −0.3px | **−0.02em (≈−0.32px)** | 사실상 동일 채택 |
| 본문 줄간격 | ~normal (≈1.2, UI 성격) | **1.4** | **의도적 이탈** — planwedding은 UI/가이드 화면이라 촘촘하지만 장문 읽기에는 답답하다. 1.8~1.0을 오간 끝에 1.4로 확정 |
| 제목 자간 | −0.3px | −0.02em~−0.045em | 동일 방향(타이트) |

**요약:** planwedding의 정체성인 *타이트한 자간 + 미디엄 굵기*는 그대로 가져오고, 장문 가독성을 위해 줄간격만
1.4로 완화했다. 이 이탈은 의도된 결정이며 되돌리지 말 것(필요 시 §9에서 조정).

---

## 5. 타입 스케일 레퍼런스 (Type scale)

주요 요소의 확정값. (전부 `src/app/tailwind.css`, 글꼴은 별도 표기 없으면 Inter Tight)

| 요소 | selector | size | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| 히어로 타이틀 | `.hero-title` | `clamp(44px, 9vw, 132px)` | 900 | 0.88 | −0.045em |
| 히어로 부제 | `.hero-sub p` | 15px | (상속) | **1.5** | (상속) |
| 포스트 본문 | `.post-article` | 16px | 400 (KO 500 / EN 450) | **1.4** | (KO −0.02em / EN −0.006em) |
| 본문 H1 | `.post-article h1` | 32px | 700 | 1.3 | −0.02em |
| 본문 H2 | `.post-article h2` | 26px | 700 | 1.3 | −0.02em |
| 본문 H3 | `.post-article h3` | 20px | 600 | 1.3 | −0.02em |
| 본문 H4 | `.post-article h4` | 17px | 600 | 1.3 | −0.02em |
| 인용/TL;DR 블록 | `.post-article blockquote` | 15px | 400 (`strong` 700) | 1.6 | (상속) |
| 로고 이름 | `.logo-name` | 16px | 800 | 1.1 | −0.02em |
| 네비 링크 | `.nav-link` | 13.5px | 500 | — | −0.005em |
| 태그 그래프 노드 | `.tg-node text` | 10.5px (카테고리 12.5px) | 500 / 700 | — | −0.02em (JetBrains Mono) |
| 코드/메타 | `.font-mono` | (요소별) | — | — | — (JetBrains Mono) |

> 히어로/제목/네비는 자기 `letter-spacing`을 명시하므로 전역 상속을 덮어쓴다(의도됨). 로케일 자간이
> 실제로 바뀌는 건 본문·라벨 등 **자간 미지정 텍스트**다.

---

## 6. 굵기 스케일 (Font weights)

| weight | 쓰임 |
|---|---|
| 400 | 글꼴 기본값(로케일 규칙이 걸리지 않는 경우) |
| **450** | **EN 본문 기본** |
| **500** | **KO 본문 기본(medium)**, 네비 링크, 태그 그래프 태그 라벨 |
| 600 | 본문 H3/H4 |
| 700 | 본문 H1/H2, `strong`, 태그 그래프 카테고리 라벨 |
| 800 | 로고 이름 |
| 900 | 히어로 타이틀 |

Inter Tight는 가변폰트로 100~900을 전부 지원하므로 450 같은 중간값도 실제 굵기로 렌더된다.
한글(Apple SD Gothic Neo)은 시스템에 설치된 굵기만 쓰이며 500/700 등 주요 굵기는 문제없이 렌더된다.

---

## 7. 자간 스케일 (Letter-spacing)

| 값 | 쓰임 |
|---|---|
| `−0.045em` | 히어로 타이틀(가장 타이트) |
| `−0.02em` | **KO 전역 기본**, 본문 제목, 로고, 태그 그래프 라벨 |
| `−0.006em` | **EN 전역 기본** |
| `−0.005em` | 네비 링크 |
| 양수(예 `0.1em`~`0.35em`) | 대문자 소형 라벨(eyebrow, 섹션 헤드 등)의 트래킹 확장 |

한글은 대체로 음수 자간(−0.02em 전후)이 정돈돼 보이고, 라틴 소문자는 그보다 얕은 음수가 적절하다.
라틴 대문자 라벨은 양수 자간이 어울린다.

---

## 8. 파일 지도 (Where things live)

| 관심사 | 파일 |
|---|---|
| 웹폰트 로드(Inter Tight/JetBrains Mono/Fraunces) + `--font-*` 변수 | `src/app/layout.tsx` |
| Tailwind `font-sans/mono/serif` 별칭 | `tailwind.config.js` |
| 기본 폰트 스택, 본문/제목/네비 스타일, **KO·EN 타이포 블록** | `src/app/tailwind.css` |
| 루트 `lang` 및 KO 기본 SSR | `src/app/layout.tsx` |
| 클라이언트 `lang` 갱신(EN 전환) | `src/components/SetHtmlLang.tsx` |
| `/` → `/en` 리다이렉트 | `src/proxy.ts` |
| 로케일 유틸(`pathPrefix` 등) | `src/hooks/useLocale.ts` |
| 이 명세 | `typography.md` (본 문서) |

로케일 타이포 블록은 `tailwind.css` **맨 아래** `KR TYPOGRAPHY` / `EN TYPOGRAPHY` 주석 섹션에 있다
(소스 순서상 마지막이라 우선순위 확보 목적).

---

## 9. 조정 레시피 (How to adjust)

모든 변경 후 검증: `pnpm build` → dev 재기동 → 브라우저에서 KO(`/pages/1`, 개별 포스트)와 EN(`/en/...`)의
computed style 재측정(글꼴/자간/굵기/줄간격).

- **KO 본문을 더/덜 두껍게** → `html[lang='ko'] body { font-weight }`를 400~600 사이로.
  (500이 무겁게 느껴지면 450, 더 또렷하게는 600)
- **EN 본문을 더/덜 두껍게** → `html[lang='en'] body { font-weight }`. 개편 이전으로 되돌리려면 400.
- **자간 조정** → `html[lang='ko'|'en'] { letter-spacing }`. KO를 planwedding에 더 붙이려면 `-0.025em`,
  풀려면 `-0.015em`. EN은 `-0.01em`을 넘기면 소문자가 붙어 보이므로 넘지 말 것.
- **본문 줄간격** → `.post-article { line-height }` (+ KO override). 더 밀도 있게 `1.35`, 더 편하게 `1.5`.
- **본문만 다른 글꼴로 되돌리고 싶다** → `layout.tsx`에 해당 글꼴을 `--font-body`로 추가하고
  `.post-article`의 `font-family` 첫 항목만 교체. 되돌릴 대상은 §10의 Manrope 항목 참고.
- **한글 웹폰트(예: Pretendard) 도입** → `layout.tsx`에서 `next/font/local`로 Pretendard 로드 →
  `--font-sans` 앞에 삽입 또는 별도 `--font-kr` 변수 신설 후 KO 스택 최상단에 배치. 용량·FOUT 트레이드오프 유의.

---

## 10. 결정 로그 (Decisions log)

- **2026-07-25 — 본문 인용 블록을 세리프 이탤릭에서 산세리프 정체로.** 인용/TL;DR 블록이
  Fraunces 17px 이탤릭이었는데, 한글에 이탤릭 자형이 없어 가짜 이탤릭으로 렌더돼 낡아 보였다.
  `--font-sans` 15px 정체 / 줄간 1.6 / 색 `--ink-2`로 바꾸고, 구분은 왼쪽 선과 배경으로만 준다.
  여러 문단 인용에 `p + p { margin-top: 12px }`를 추가하고, `strong`은 `--ink`로 대비를 살렸다.
  같은 날 `prose`가 blockquote에 자동으로 붙이던 따옴표(`open-quote`/`close-quote`)도 껐다.
  인용문은 마크다운에 이미 따옴표가 있어 두 겹이 됐고 TL;DR 블록은 인용이 아닌데도 씌워졌다.
- **2026-07-25 — 라틴 글꼴을 Inter Tight로 교체하고 글 본문까지 통일. EN 밀도 상향. 문서명 `font.md` → `typography.md`.**
  사용자가 영문이 "깔끔/심플/밀도 있는" 쪽이면 좋겠다고 요청. 임시 비교 페이지(`/font-lab`)에서
  Inter / Inter Tight / Geist를 히어로·부제·본문(영문)·본문(한글 혼용)·목록 제목 다섯 요소로 대조한 뒤
  **Inter Tight** 채택. 동시에 적용 범위를 **글 본문까지 통일**로 결정해 `--font-manrope`와 Manrope 로드를 제거하고
  `.post-article`을 `--font-sans`로 변경(웹폰트 4종 → 3종). EN에 `letter-spacing: -0.006em`과
  `body { font-weight: 450 }`을 신설하고, `.hero-sub p` 줄간격을 1.6 → 1.5로 조정.
  이로써 철학 2번이 "영문은 공기"에서 "국·영문 모두 밀도"로 바뀌었다.
- **2026-07 — 글 본문에 Ghost 값 일부만 채택(720/1.4/Manrope).** Ghost 전면 정렬을 적용했다가
  전부 되돌린 뒤(제목 세리프·인용·이미지 브레이크아웃 등 폐기), 사용자가 **읽기 컬럼 720px·줄간격 1.4·본문
  폰트 Manrope** 세 가지만 재적용 요청. 줄간격은 1.7→1.3→1.0→1.3→1.5→1.8을 오간 뒤 **1.4로 확정**.
  이 중 Manrope는 2026-07-25에 철회됐고, 720px과 1.4는 유지된다.
- **2026-07 — KO에 planwedding 한글 스타일 적용.** 사용자가 `planwedding.io/guide`의 한글 폰트 스타일
  (타이트 자간·미디엄 굵기)을 국문판에 이식 요청. `html[lang='ko']` 스코프로 자간 `−0.02em`, 본문 굵기 `500` 적용.
  당시 EN은 원본(Inter 기본값) 유지.
- **초기 — 한글 웹폰트 미도입.** 로딩 비용/FOUT 회피 위해 한글은 시스템 폰트(Apple SD Gothic Neo)로 렌더,
  라틴/숫자만 웹폰트 사용.

---

## 11. Do / Don't

**Do**
- 타이포 값을 바꾸면 이 문서(§0, 관련 표, §10)도 같이 갱신한다.
- KO/EN 양쪽을 computed style로 측정해 스코핑이 유지되는지 확인한다.
- 새 굵기/자간을 도입하면 §6·§7 스케일에 편입한다.
- 글꼴 후보를 비교할 때는 **한글 혼용 문장**으로도 본다. 글이 대부분 한글이라 라틴만 보면 판단이 어긋난다.

**Don't**
- KO 줄간격을 planwedding처럼 1.2대로 되돌리지 않는다(장문 가독성 훼손). 이탈은 §4.2에 근거가 있다.
- 로케일 구분 없이 전역 `body`에 로케일 전용 값을 직접 박지 않는다(반대쪽 로케일까지 오염).
- 히어로 900을 쓰는 상태에서 굵기 700까지만 있는 글꼴로 `--font-sans`를 바꾸지 않는다(합성 볼드가 된다).
- 한글 웹폰트를 무단 추가하지 않는다(성능/FOUT). 도입 시 §9 절차와 트레이드오프 문서화.
