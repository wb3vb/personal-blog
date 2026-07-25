import type {Metadata} from 'next'

import TagGraph from '@/components/TagGraph'
import {SiteConfig} from '@/config'
import {getAllTagsFromPosts, getTagGraph} from '@/utils/Post'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'All tags',
  alternates: {
    canonical: `${SiteConfig.url}/tags`,
  },
}

export default async function TagsPage() {
  const [tags, graph] = await Promise.all([
    getAllTagsFromPosts(),
    getTagGraph(),
  ])
  const totalPosts = tags.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="page-view">
      <section className="page-hero">
        <div className="hero-eyebrow">
          {tags.length} TAGS · {totalPosts} POSTS
        </div>
        <h1 className="page-title">
          TAGS<span className="accent">,</span>
          <br />
          <span className="stroke">every</span> topic.
        </h1>
        <p className="page-sub">
          A map of what I write about. Big nodes are categories, small ones are
          tags, and the lines are posts that connect them.
        </p>
      </section>

      <TagGraph data={graph} />
    </div>
  )
}
