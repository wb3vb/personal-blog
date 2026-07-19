'use client'

import dynamic from 'next/dynamic'

import {SiteConfig} from '@/config'

const HeroFxA = dynamic(() => import('@/components/about-fx/HeroFxA'), {
  ssr: false,
})
const HeroFxB = dynamic(() => import('@/components/about-fx/HeroFxB'), {
  ssr: false,
})

export function AboutHero() {
  return (
    <section className="about-hero">
      <div>
        <div className="hero-eyebrow">
          {SiteConfig.hero.aboutRole} · {SiteConfig.location}
        </div>
        <div className="page-title-fx">
          <HeroFxA />
          <span className="sr-only">{SiteConfig.author.name}.</span>
        </div>
        <p className="page-sub">{SiteConfig.hero.aboutIntro}</p>
        <div className="about-socials">
          <a href={`mailto:${SiteConfig.author.contacts.email}`}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16v16H4z" />
              <path d="m4 4 8 8 8-8" />
            </svg>
            {SiteConfig.author.contacts.email}
          </a>
          <a
            href={SiteConfig.author.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {SiteConfig.author.contacts.github.split('/').pop()}
          </a>
          {SiteConfig.author.contacts.twitter ? (
            <a
              href={SiteConfig.author.contacts.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {SiteConfig.author.contacts.twitter.split('/').pop()}
            </a>
          ) : null}
          {SiteConfig.author.contacts.linkedin ? (
            <a
              href={SiteConfig.author.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              {SiteConfig.author.contacts.linkedin.split('/').pop()}
            </a>
          ) : null}
          {SiteConfig.author.contacts.medium ? (
            <a
              href={SiteConfig.author.contacts.medium}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              {SiteConfig.author.contacts.medium.split('/').pop()}
            </a>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <HeroFxB />
      </div>
    </section>
  )
}
