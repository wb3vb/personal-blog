# personal-blog

[yceffort.kr](https://yceffort.kr) ([yceffort/blog](https://github.com/yceffort/blog), MIT)의 디자인·기능을 참고해 구축하는 개인 블로그.

## 스택

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4 (v3 config 하이브리드)
- **Language**: TypeScript 5
- **Content**: 파일 기반 (`posts/YYYY/MM/slug.md`, CMS 없음)
- **Package Manager**: pnpm 10.6.5
- **Runtime**: Node.js 24.14.1
- **Hosting**: Vercel

## 문서

- [design.md](./design.md) — 디자인 시스템 명세 (컬러 토큰·타이포·컴포넌트 스펙). **디자인 일관성의 단일 기준.**

## 로컬 개발

```bash
corepack enable            # pnpm 활성화
pnpm install
pnpm dev                   # http://localhost:3000
```

## 라이선스

코드는 원본([yceffort/blog](https://github.com/yceffort/blog)) MIT 라이선스를 따른다. 원저작권 고지를 유지한다.
글·이미지 등 콘텐츠는 본 저장소 소유자의 저작물이다.
