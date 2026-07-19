'use client'

import Link from 'next/link'

import {useLocale} from '@/hooks/useLocale'

export default function LanguageSwitch() {
  const {locale, alternatePath} = useLocale()

  return (
    <Link
      href={alternatePath}
      onClick={() => {
        document.cookie = `locale=${locale === 'ko' ? 'en' : 'ko'};path=/;max-age=${60 * 60 * 24 * 365}`
      }}
      className="icon-btn text-xs font-semibold"
      aria-label={locale === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      {locale === 'ko' ? 'EN' : 'KO'}
    </Link>
  )
}
