---
title: '첫 글: 블로그를 열며'
tags:
  - essay
published: true
date: 2026-07-19 12:00:00
description: 'yceffort.kr 디자인을 기반으로 만든 개인 블로그의 첫 글입니다.'
---

# 안녕하세요

이 블로그의 첫 글입니다. 이 글은 새 글을 쓸 때 참고할 수 있는 예시이기도 합니다.

## 글 쓰는 법

`posts/YYYY/MM/slug.md` 형식으로 마크다운 파일을 만들면 됩니다. 파일 경로가 그대로 URL이 됩니다. 상단 프론트매터에는 다음을 채웁니다.

- `title` — 글 제목 (`<em>...</em>`로 일부 강조 가능)
- `tags` — 태그 목록
- `published` — `true`면 공개, `false`면 개발 모드에서만 보이는 초안
- `date` — 작성일시
- `description` — 목록·검색·OG에 쓰이는 요약

## 코드 블록

```ts
function greet(name: string): string {
  return `Hello, ${name}!`
}
```

## 마무리

이제 이 파일을 지우고 직접 글을 써 보세요. 디자인 규칙은 저장소의 `design.md`를 참고하면 됩니다.
