import type {MetadataRoute} from 'next'

import {getAllPosts, getAllTagsFromPosts} from '@/utils/Post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, enPosts, tags] = await Promise.all([
    getAllPosts(),
    getAllPosts('en'),
    getAllTagsFromPosts(),
  ])

  const enSlugs = new Set(enPosts.map((p) => p.fields.slug))

  return [
    {
      url: 'https://personal-blog.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://personal-blog.vercel.app/about',
      lastModified: new Date(),
    },
    {
      url: 'https://personal-blog.vercel.app/archive',
      lastModified: new Date(),
    },
    {
      url: 'https://personal-blog.vercel.app/resume',
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `https://personal-blog.vercel.app/${post.fields.slug}`,
      lastModified: new Date(post.frontMatter.date),
      ...(enSlugs.has(post.fields.slug) && {
        alternates: {
          languages: {
            ko: `https://personal-blog.vercel.app/${post.fields.slug}`,
            en: `https://personal-blog.vercel.app/en/${post.fields.slug}`,
          },
        },
      }),
    })),
    ...enPosts.map((post) => ({
      url: `https://personal-blog.vercel.app/en/${post.fields.slug}`,
      lastModified: new Date(post.frontMatter.date),
      alternates: {
        languages: {
          ko: `https://personal-blog.vercel.app/${post.fields.slug}`,
          en: `https://personal-blog.vercel.app/en/${post.fields.slug}`,
        },
      },
    })),
    ...tags.map((tag) => ({
      url: `https://personal-blog.vercel.app/tags/${tag}`,
    })),
  ]
}
