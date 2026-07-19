'use client'

import {useEffect} from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // 개발 모드에서는 SW를 등록하지 않는다. sw.js가 정적 자산을 cache-first로
    // 캐싱하면 스타일/청크가 바뀌어도 옛 버전이 서빙되어 변경이 화면에 반영되지 않는다.
    // (프로덕션은 불변 해시 청크라 안전)
    if (process.env.NODE_ENV !== 'production') {
      // 이미 등록돼 있던 SW가 있으면 해제해 캐시 스테일을 방지.
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .getRegistrations()
          .then((regs) => regs.forEach((r) => r.unregister()))
          .catch(() => {})
      }
      return
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  return null
}
