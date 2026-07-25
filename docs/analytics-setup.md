# 인기글(Popular this season) 조회수 연동 설정

홈 상단의 **Popular this season**을 실제 조회수 기준으로 돌리기 위한 설정 문서다.

## 지금 상태

연동 전에는 조회수를 못 읽으므로 **최신순 6개로 자동 폴백**된다. 화면이 비지는 않지만
"인기글"이 아니라 "최신글"이 뜬다. 코드는 이미 준비돼 있고 값만 채우면 켜진다.

점검은 언제든 이 명령으로 한다.

```bash
pnpm check:analytics
```

## 필요한 값 세 가지

| 환경변수 | 역할 | 형식 |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 방문자 **수집**(사이트에 추적 코드를 심음) | `G-XXXXXXXXXX` |
| `GA4_PROPERTY_ID` | 조회수를 **읽을 대상** 속성 | 숫자 (예: `123456789`) |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | 읽을 **권한**(서비스 계정 키) | JSON 한 줄 |

측정 ID와 속성 ID는 다른 값이다. 헷갈리기 쉬우니 형식으로 구분하면 된다.
`G-`로 시작하면 측정 ID, 숫자만이면 속성 ID.

---

## 1단계. GA4 속성 만들고 측정 ID 얻기

이미 wb3vb.io용 GA 속성이 있다면 새로 만들지 말고 그것을 쓴다.

1. [analytics.google.com](https://analytics.google.com) 접속
2. 좌하단 **관리(톱니바퀴)** 클릭
3. 속성이 없으면 **속성 만들기**로 생성 (업종/시간대는 한국 기준)
4. **데이터 스트림 > 웹** 에서 스트림 추가, URL은 `https://wb3vb.com`
5. 스트림 상세에서 **측정 ID**(`G-`로 시작) 복사 → `NEXT_PUBLIC_GA_MEASUREMENT_ID`
6. **관리 > 속성 설정** 에서 **속성 ID**(숫자) 복사 → `GA4_PROPERTY_ID`

## 2단계. 조회수를 읽을 서비스 계정 만들기

사이트에 추적 코드를 심는 것과, 서버가 그 수치를 읽어오는 것은 별개의 권한이다.
읽기용으로 서비스 계정이 필요하다.

1. [console.cloud.google.com](https://console.cloud.google.com) 접속
2. 프로젝트 선택 또는 생성 (이름은 자유, 예: `wb3vb-blog`)
3. **API 및 서비스 > 라이브러리** 에서 `Google Analytics Data API` 검색 후 **사용 설정**
4. **API 및 서비스 > 사용자 인증 정보 > 사용자 인증 정보 만들기 > 서비스 계정**
   - 이름은 자유 (예: `blog-analytics-reader`)
   - 역할은 지정하지 않아도 된다 (GA 쪽에서 따로 권한을 준다)
5. 만들어진 서비스 계정 클릭 > **키** 탭 > **키 추가 > 새 키 만들기 > JSON**
   - JSON 파일이 다운로드된다. 이 파일이 곧 비밀번호다. 저장소에 커밋하지 않는다.
6. JSON 안의 `client_email` 값을 복사해 둔다 (`...@....iam.gserviceaccount.com`)

## 3단계. 서비스 계정에 GA 읽기 권한 주기

여기를 빼먹으면 4단계 점검에서 `PERMISSION_DENIED`가 뜬다.

1. Google Analytics > **관리 > 속성 액세스 관리**
2. 우상단 **+** > **사용자 추가**
3. 2단계에서 복사한 서비스 계정 이메일 입력
4. 역할은 **뷰어**로 충분
5. 추가

## 4단계. 값 넣기

### 로컬

```bash
cp .env.example .env.local
```

`.env.local`을 열어 세 값을 채운다. 서비스 계정 JSON은 **줄바꿈 없이 한 줄**이어야 한다.
아래 명령으로 한 줄 문자열을 만들 수 있다.

```bash
python3 -c "import json,sys;print(json.dumps(json.load(open(sys.argv[1]))))" ~/Downloads/키파일.json
```

출력된 내용을 `GOOGLE_APPLICATION_CREDENTIALS_JSON=` 뒤에 붙여넣는다.

확인:

```bash
pnpm check:analytics
```

### 배포 (Vercel)

프로젝트는 `finality/personal-blog`, 도메인은 `wb3vb.com`이다.

웹에서 하려면 프로젝트 > **Settings > Environment Variables** 에서 같은 이름으로 세 개를 추가한다.
환경은 Production과 Preview 모두 체크. 추가 후 **재배포**해야 반영된다.

CLI로 하려면 저장소 루트에서 아래를 실행한다. 값은 프롬프트에 붙여 넣는다.

```bash
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
vercel env add GA4_PROPERTY_ID production
vercel env add GOOGLE_APPLICATION_CREDENTIALS_JSON production
vercel deploy --prod
```

---

## 자주 막히는 지점

| 증상 | 원인 | 조치 |
|---|---|---|
| `PERMISSION_DENIED` / 403 | 3단계 누락 | GA 속성 액세스 관리에 서비스 계정 이메일 추가 |
| `SERVICE_DISABLED` | 2단계 3번 누락 | Google Cloud에서 Analytics Data API 사용 설정 |
| `NOT_FOUND` / 404 | 속성 ID 오기입 | 측정 ID(G-)가 아닌 속성 ID(숫자)인지 확인 |
| JSON 파싱 실패 | 여러 줄로 붙여넣음 | 위 python3 명령으로 한 줄로 변환 |
| 연결은 되는데 데이터 0건 | 아직 방문 기록 없음 | 정상. 추적 코드 심고 하루 이틀 기다리면 쌓인다 |

## 켜지고 나면

- **Popular this season** = 최근 30일 조회수 상위 6개 (글 페이지만 집계)
- **Recent** = 전체 글 최신순 (인기글도 포함해서 그대로 노출)

조회수가 쌓이기 전까지는 신규 글이 상위를 차지하기 쉽다. 기간을 늘리고 싶으면
`src/utils/analytics.ts`의 `startDate: '30daysAgo'`를 `'90daysAgo'` 등으로 바꾸면 된다.
