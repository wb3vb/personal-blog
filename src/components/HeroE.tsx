'use client'

import {memo, useEffect, useRef} from 'react'

import {SiteConfig} from '@/config'

const YEAR = new Date().getFullYear()

interface HeroProps {
  postCount: number
  tagCount: number
  yearsWriting: number
}

const Hero = memo(function Hero({
  postCount,
  tagCount,
  yearsWriting,
}: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) {
      return
    }

    const el = titleRef.current
    if (!el) {
      return
    }
    const lines = el.querySelectorAll<HTMLSpanElement>('.ln')

    let raf = 0
    let targetX = 0
    let targetY = 0

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5
      targetY = e.clientY / window.innerHeight - 0.5
      if (!raf) {
        raf = window.requestAnimationFrame(() => {
          lines.forEach((ln, i) => {
            const depth = (i + 1) * 6
            ln.style.transform = `translate3d(${targetX * depth}px, ${targetY * depth}px, 0)`
          })
          raf = 0
        })
      }
    }

    window.addEventListener('pointermove', onMove, {passive: true})
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  return (
    <section className="home-hero">
      <div className="home-hero-inner">
        <div className="hero-eyebrow">
          <span className="dot" />
          LIVE · {SiteConfig.location} · {YEAR}
        </div>
        <h1 ref={titleRef} className="hero-title">
          <span className="ln">{SiteConfig.hero.titleLines[0]}</span>
          <span className="ln">
            <span className="accent">{SiteConfig.hero.titleLines[1]}</span>
          </span>
          <span className="ln">
            {SiteConfig.hero.titleLines[2].slice(0, -1)}
            <span className="accent">
              {SiteConfig.hero.titleLines[2].slice(-1)}
            </span>
          </span>
        </h1>
        <div className="hero-sub">
          <p>
            A blog by <b style={{color: 'var(--ink)'}}>{SiteConfig.title}</b> —{' '}
            {SiteConfig.hero.tagline}
          </p>
          <div className="hero-stats">
            <span>
              <b>{String(postCount).padStart(3, '0')}</b>posts
            </span>
            <span>
              <b>{String(tagCount).padStart(3, '0')}</b>tags
            </span>
            <span>
              <b>{String(yearsWriting).padStart(2, '0')}y</b>writing
            </span>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Hero
