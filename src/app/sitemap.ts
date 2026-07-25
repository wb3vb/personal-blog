import type {MetadataRoute} from 'next'

import {SiteConfig} from '@/config'
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
      url: SiteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${SiteConfig.url}/about`,
      lastModified: new Date(),
    },
    {
      url: `${SiteConfig.url}/archive`,
      lastModified: new Date(),
    },
    {
      url: `${SiteConfig.url}/resume`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${SiteConfig.url}/${post.fields.slug}`,
      lastModified: new Date(post.frontMatter.date),
      ...(enSlugs.has(post.fields.slug) && {
        alternates: {
          languages: {
            ko: `${SiteConfig.url}/${post.fields.slug}`,
            en: `${SiteConfig.url}/en/${post.fields.slug}`,
          },
        },
      }),
    })),
    ...enPosts.map((post) => ({
      url: `${SiteConfig.url}/en/${post.fields.slug}`,
      lastModified: new Date(post.frontMatter.date),
      alternates: {
        languages: {
          ko: `${SiteConfig.url}/${post.fields.slug}`,
          en: `${SiteConfig.url}/en/${post.fields.slug}`,
        },
      },
    })),
    ...tags.map((tag) => ({
      url: `${SiteConfig.url}/tags/${tag}`,
    })),
  ]
}
