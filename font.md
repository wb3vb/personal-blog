# Typography System — `font.md`

이 문서는 블로그의 **폰트/타이포그래피**를 정의하는 단일 기준(Single Source of Truth)이다.
`design.md`가 색·레이아웃·컴포넌트를 정의하듯, 글꼴·굵기·자간·줄간격·타입스케일은 여기서 관리한다.
값을 바꿀 때는 코드만 고치지 말고 이 문서도 함께 갱신한다.

> **핵심 한 줄**: 국문(KO) 페이지는 `planwedding.io`에서 관찰한 "타이트한 자간 + 미디엄 굵기" 한글 스타일을 적용하고,
> 영문(EN) 페이지는 Inter 기반 기본 스타일을 유지한다. 로케일 분기는 `html[lang]` 속성으로 처리한다.

---

## 0. 한눈에 보기 (At a glance)

| 항목 | KO (`html[lang='ko']`) | EN (`html[lang='en']`) |
|---|---|---|
| 한글 글꼴 | Apple SD Gothic Neo → Noto Sans KR (시스템) | (동일, 단 한글 거의 없음) |
| 라틴/숫자 글꼴 | Inter (웹폰트) | Inter (웹폰트) |
| 본문 크기 | 16px | 16px |
| 본문 굵기 | **500 (medium)** | 400 (regular) |
| 본문 자간 | **−0.02em (≈ −0.32px@16px)** | normal |
| 본문 줄간격(`.post-article`) | **1.7 (27.2px)** | 1.8 (28.8px) |
| 참조 | planwedding.io/guide 스타일 계승 | 원본(yceffort) 스타일 유지 |

측정 검증값(2026-07): KO body `letter-spacing: -0.32px`, `font-weight: 500`; KO `.post-article` `line-height: 27.2px`.
EN은 `letter-spacing: normal`, `font-weight: 400`, `.post-article line-height: 28.8px`로 영향 없음.

---

## 1. 철학 (Philosophy)

1. **로케일별 최적 타이포.** 한글과 라틴은 이상적인 자간·굵기·줄간격이 다르다. 하나의 값으로 둘 다 만족시키지 않고,
   페이지 언어에 따라 갈라 준다.
2. **한글은 밀도, 영문은 공기.** 한글은 자간을 좁히고 굵기를 올려 "또렷하고 단단한" 느낌을, 영문은 Inter 기본값의
   넉넉한 리듬을 살린다.
3. **웹폰트 최소화.** 한글 웹폰트(Noto Sans KR 등)는 용량이 크다. 한글은 OS 시스템 폰트(Apple SD Gothic Neo)로
   렌더해 로딩 비용 0, FOUT 없음. 라틴/숫자만 Inter 웹폰트를 쓴다. (planwedding도 전부 시스템 폰트 전략)
4. **값은 문서로 고정한다.** "왜 이 값인가"를 코드 주석과 이 문서에 남겨, 다음 사람이 되돌리거나 흔들지 않게 한다.

---

## 2. 글꼴 패밀리 (Font families)

세 종류를 `next/font/google`로 로드하고 CSS 변수로 노출한다. (`src/app/layout.tsx`)

| 변수 | 글꼴 | 용도 |
|---|---|---|
| `--font-sans` | **Inter** | 본문·UI 전반(라틴/숫자). 기본 sans |
| `--font-mono` | **JetBrains Mono** | 코드, 메타 라벨(MIN/YEAR 등), 태그 |
| `--font-serif` | **Fraunces** | 세리프 강조가 필요한 특수 요소 |

기본 스택 (`body`, `src/app/tailwind.css`):

```css
font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI',
  'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
```

### 한글은 어떻게 렌더되나

**Inter에는 한글 글리프가 없다.** 따라서 한글 문자는 스택을 따라 내려가 다음으로 렌더된다:

- **macOS / iOS** → `Apple SD Gothic Neo` (planwedding.io/guide가 Mac에서 보이는 것과 동일한 글꼴)
- **Windows** → `Malgun Gothic` 계열(스택엔 명시 안 함, OS 기본 한글로 대체)
- **최종 폴백** → `Noto Sans KR`(설치돼 있을 경우) → 시스템 sans

즉 **라틴·숫자는 Inter, 한글은 시스템 고딕**이 자연스럽게 섞인다. 이는 의도된 설계다(웹폰트 비용 없이 planwedding과 같은
한글 렌더 결과). 한글 웹폰트를 도입하려면 §9의 레시피를 참고.

---

## 3. 로케일 스코핑 메커니즘 (Locale scoping)

KO/EN 스타일 분기의 기준은 `<html>`의 `lang` 속성이다.

- `src/app/layout.tsx` : 루트가 `<html lang="ko">`로 SSR (한글이 기본 로케일)
- `src/components/SetHtmlLang.tsx` : 클라이언트에서 `document.documentElement.lang = locale` 로 갱신.
  `/en/*` 경로에선 `lang="en"`으로 바뀐다.
- `src/proxy.ts` : `/` 진입 시 `Accept-Language` 기준으로 `/en` 리다이렉트(영어권 방문자 편의)

따라서 CSS는 아래처럼 스코프한다:

- `html[lang='ko'] …` → **국문 페이지에만** 적용
- `html[lang='en'] …` → 영문 페이지에만 적용(현재는 기본값 유지라 별도 규칙 없음)

> ⚠️ EN 페이지는 SSR 순간 `lang="ko"`였다가 hydration 후 `en`으로 바뀌므로, 첫 프레임에 KO 자간이 잠깐
> 보일 수 있다(자간·굵기 차이라 사실상 인지 불가). 완전 제거가 필요하면 EN 레이아웃에서 `lang`을 서버에서
> 직접 세팅하도록 바꾼다.

---

## 4. 국문(KO) 타이포 — planwedding 스타일

블로그 국문판의 시그니처. `planwedding.io/guide`에서 관찰한 한글 스타일을 계승한다.

### 4.1 실제 코드 (`src/app/tailwind.css` 최하단)

```css
/* ========= KR TYPOGRAPHY (planwedding.io-inspired: tight tracking + medium weight) =========
   Applied ONLY on Korean pages (html[lang='ko']); English pages keep the default Inter style. */
html[lang='ko'] {
  letter-spacing: -0.02em; /* ≈ planwedding -0.3px @16px — tight Korean tracking */
}
html[lang='ko'] body {
  font-weight: 500; /* medium body weight, like planwedding */
}
html[lang='ko'] .post-article {
  line-height: 1.7; /* tighter than default 1.8, still readable for long-form */
}
```

- `letter-spacing`는 `html[lang='ko']`에 걸어 KO 전체(제목·본문·네비 등)로 상속시킨다. 자기 자간을 명시한
  요소(제목류)는 각자 값을 유지한다.
- `font-weight: 500`은 `body`에 걸어 **기본 굵기만** 미디엄으로 올린다. 굵기를 직접 지정한 요소(제목 700~900,
  strong 700, 네비 500 등)는 영향받지 않는다.

### 4.2 planwedding.io 대조표 — 측정 vs 채택

| 속성 | planwedding.io/guide (측정) | 우리 KO (채택) | 판단 |
|---|---|---|---|
| 글꼴 | 전부 시스템 폰트(웹폰트 없음) | 한글 시스템, 라틴 Inter | **부분 채택** — 한글은 동일(Apple SD Gothic Neo), 숫자/영문은 Inter가 더 깔끔 |
| 본문 크기 | 16px | 16px | 동일 |
| 본문 굵기 | 500 (medium) | **500** | 동일 채택 |
| 본문 자간 | −0.3px | **−0.02em (≈−0.32px)** | 사실상 동일 채택 |
| 본문 줄간격 | ~normal (≈1.2, UI 성격) | **1.7** | **의도적 이탈** — planwedding은 UI/가이드 화면이라 촘촘하지만, 우리는 장문 읽기 블로그라 1.2는 너무 답답. 1.8→1.7로 좁혀 "밀도 상승 + 가독성 유지" 절충 |
| 제목 자간 | −0.3px | −0.02em~−0.045em | 동일 방향(타이트) |

**요약:** planwedding의 정체성인 *타이트한 자간 + 미디엄 굵기*는 그대로 가져오고, 장문 가독성을 위해 줄간격만
1.7로 완화했다. 이 이탈은 의도된 결정이며 되돌리지 말 것(필요 시 §9에서 조정).

---

## 5. 타입 스케일 레퍼런스 (Type scale)

주요 요소의 확정값. (전부 `src/app/tailwind.css`)

| 요소 | selector | size | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| 히어로 타이틀 | `.hero-title` | `clamp(44px, 9vw, 132px)` | 900 | 0.88 | −0.045em |
| 포스트 본문 | `.post-article` | 16px | 400 (KO 500) | 1.8 (KO 1.7) | (KO −0.02em) |
| 본문 H1 | `.post-article h1` | 32px | 700 | 1.3 | −0.02em |
| 본문 H2 | `.post-article h2` | 26px | 700 | 1.3 | −0.02em |
| 본문 H3 | `.post-article h3` | 20px | 600 | 1.3 | −0.02em |
| 본문 H4 | `.post-article h4` | 17px | 600 | 1.3 | −0.02em |
| 로고 이름 | `.logo-name` | 16px | 800 | 1.1 | −0.02em |
| 네비 링크 | `.nav-link` | 13.5px | 500 | — | −0.005em |
| 코드/메타 | `.font-mono` | (요소별) | — | — | — (JetBrains Mono) |

> 히어로/제목/네비는 자기 `letter-spacing`을 명시하므로 KO의 `−0.02em` 상속을 덮어쓴다(의도됨). KO에서
> 자간이 실제로 바뀌는 건 본문·라벨 등 **자간 미지정 텍스트**다.

---

## 6. 굵기 스케일 (Font weights)

| weight | 쓰임 |
|---|---|
| 400 | EN 본문 기본 |
| **500** | **KO 본문 기본(medium)**, 네비 링크 |
| 600 | 본문 H3/H4 |
| 700 | 본문 H1/H2, `strong` |
| 800 | 로고 이름 |
| 900 | 히어로 타이틀 |

Inter는 가변폰트로 400~900을 전부 지원한다. 한글(Apple SD Gothic Neo)은 시스템에 설치된 굵기만 쓰이며
500/700 등 주요 굵기는 문제없이 렌더된다.

---

## 7. 자간 스케일 (Letter-spacing)

| 값 | 쓰임 |
|---|---|
| `−0.045em` | 히어로 타이틀(가장 타이트) |
| `−0.02em` | **KO 전역 기본**, 본문 제목, 로고 |
| `−0.005em` | 네비 링크 |
| `normal` | EN 전역 기본 |
| 양수(예 `0.15em`) | 대문자 소형 라벨(eyebrow, MIN/YEAR 등)의 트래킹 확장 |

한글은 대체로 음수 자간(−0.02em 전후)이 정돈돼 보이고, 라틴 대문자 라벨은 양수 자간이 어울린다.

---

## 8. 파일 지도 (Where things live)

| 관심사 | 파일 |
|---|---|
| 웹폰트 로드(Inter/JetBrains/Fraunces) + `--font-*` 변수 | `src/app/layout.tsx` |
| 기본 폰트 스택, 본문/제목/네비 스타일, **KO 타이포 블록** | `src/app/tailwind.css` |
| 루트 `lang` 및 KO 기본 SSR | `src/app/layout.tsx` |
| 클라이언트 `lang` 갱신(EN 전환) | `src/components/SetHtmlLang.tsx` |
| `/` → `/en` 리다이렉트 | `src/proxy.ts` |
| 로케일 유틸(`pathPrefix` 등) | `src/hooks/useLocale.ts` |
| 이 명세 | `font.md` (본 문서) |

KO 타이포 블록은 `tailwind.css` **맨 아래** `KR TYPOGRAPHY` 주석 섹션에 있다(소스 순서상 마지막이라
우선순위 확보 목적).

---

## 9. 조정 레시피 (How to adjust)

모든 변경 후 검증: `pnpm build` → dev 재기동 → 브라우저에서 KO(`/pages/1`, 개별 포스트)와 EN(`/en/...`)의
computed style 재측정(자간/굵기/줄간격).

- **KO 본문을 더/덜 두껍게** → `html[lang='ko'] body { font-weight }`를 400~600 사이로.
  (500이 무겁게 느껴지면 450, 더 또렷하게는 600)
- **KO 자간 조정** → `html[lang='ko'] { letter-spacing }`. planwedding에 더 붙이려면 `-0.025em`,
  풀려면 `-0.015em`.
- **KO 본문 줄간격** → `html[lang='ko'] .post-article { line-height }`. 더 밀도 있게 `1.65`,
  더 편하게 `1.75`.
- **EN도 타이트하게 바꾸고 싶다** → KO 블록의 스코프를 `html[lang='ko']` → (스코프 제거)로 올리거나,
  `body`/`.post-article` 원본 규칙 자체를 수정. 단 이 경우 "로케일별 최적화" 철학과 어긋나므로 문서에 사유 기록.
- **한글 웹폰트(예: Pretendard) 도입** → `layout.tsx`에서 `next/font/local`로 Pretendard 로드 →
  `--font-sans` 앞에 삽입 또는 별도 `--font-kr` 변수 신설 후 KO 스택 최상단에 배치. 용량·FOUT 트레이드오프 유의.

---

## 10. 결정 로그 (Decisions log)

- **2026-07 — KO에 planwedding 한글 스타일 적용.** 사용자가 `planwedding.io/guide`의 한글 폰트 스타일
  (타이트 자간·미디엄 굵기)을 국문판에 이식 요청. `html[lang='ko']` 스코프로 자간 `−0.02em`, 본문 굵기 `500`,
  본문 줄간격 `1.7` 적용. EN은 원본 유지. 줄간격은 planwedding의 ~1.2 대신 장문 가독성을 위해 1.7로 절충(의도적 이탈).
- **초기 — 한글 웹폰트 미도입.** 로딩 비용/FOUT 회피 위해 한글은 시스템 폰트(Apple SD Gothic Neo)로 렌더,
  라틴/숫자만 Inter 웹폰트 사용.

---

## 11. Do / Don't

**Do**
- 타이포 값을 바꾸면 이 문서(§0, 관련 표, §10)도 같이 갱신한다.
- KO/EN 양쪽을 computed style로 측정해 스코핑이 유지되는지 확인한다.
- 새 굵기/자간을 도입하면 §6·§7 스케일에 편입한다.

**Don't**
- KO 줄간격을 planwedding처럼 1.2대로 되돌리지 않는다(장문 가독성 훼손). 이탈은 §4.2에 근거가 있다.
- 로케일 구분 없이 전역 `body`에 KO용 값을 직접 박지 않는다(EN까지 오염).
- 한글 웹폰트를 무단 추가하지 않는다(성능/FOUT). 도입 시 §9 절차와 트레이드오프 문서화.
