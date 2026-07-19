---
title: 'First Post: Opening the Blog'
tags:
  - essay
published: true
date: 2026-07-19 12:00:00
description: 'The first post of a personal blog built on the yceffort.kr design.'
---

# Hello

This is the first post on this blog, and also a sample you can refer to when writing new ones.

## How to write a post

Create a markdown file at `posts/YYYY/MM/slug.md`. The file path becomes the URL. Fill in the front matter at the top:

- `title` — the post title (parts can be emphasized with `<em>...</em>`)
- `tags` — a list of tags
- `published` — `true` to publish, `false` for a draft visible only in dev mode
- `date` — the publish date and time
- `description` — the summary used in lists, search, and OG images

For an English version of a post, add a sibling file ending in `.en.md`.

## Code blocks

```ts
function greet(name: string): string {
  return `Hello, ${name}!`
}
```

## Wrapping up

Delete this file and write your own. See `design.md` in the repo for the design rules.
