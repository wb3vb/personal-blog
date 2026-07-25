# 링크 프리뷰(OG) 이미지 자산

`/api/og`가 카드 이미지를 그릴 때 파일로 직접 읽는 자산이다.
예전에는 폰트를 요청마다 외부 CDN에서 받아왔는데, 그 CDN이 죽으면 프리뷰가 통째로
깨지므로 저장소에 넣었다.

## 폰트

| 파일 | 서체 | 라이선스 |
|---|---|---|
| `Pretendard-Bold.otf` | Pretendard v1.3.9 | SIL Open Font License 1.1 — https://github.com/orioncactus/pretendard |
| `Pretendard-Medium.otf` | Pretendard v1.3.9 | SIL Open Font License 1.1 — https://github.com/orioncactus/pretendard |
| `JetBrainsMono-Bold.ttf` | JetBrains Mono v2.304 | SIL Open Font License 1.1 — https://github.com/JetBrains/JetBrainsMono |

둘 다 OFL 1.1이라 임베드·재배포가 허용된다. 서체 이름을 바꿔 재배포하지 않는 한 조건을 충족한다.

## 초상

`portrait-dither.png` — About 페이지 히어로의 디더 초상(`src/components/about-fx/HeroFxB.tsx`)과
같은 알고리즘으로 `public/profile.jpeg`를 미리 구운 것이다. 캔버스는 이미지 렌더러에서
돌릴 수 없어 정적 파일로 만들어 둔다.

프로필 사진을 바꾸면 아래를 다시 실행한다.

```bash
python3 scripts/build-og-portrait.py src/assets/og/portrait-dither.png
```
