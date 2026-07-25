const CACHE_VERSION = 'v4'
const STATIC_CACHE = `static-${CACHE_VERSION}`
const PAGES_CACHE = `pages-${CACHE_VERSION}`
const IMAGES_CACHE = `images-${CACHE_VERSION}`

const OFFLINE_URL = '/offline'
const PRECACHE_URLS = [OFFLINE_URL]
const ALL_CACHES = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !ALL_CACHES.includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

function isStaticAsset(url) {
  return url.pathname.startsWith('/_next/static/')
}

function isFontRequest(url) {
  return /\.woff2?$/.test(url.pathname) || url.hostname === 'fonts.gstatic.com'
}

function isImageRequest(url) {
  // 사이트가 실제로 부르는 이미지는 /_next/image?url=... 형태라 확장자가 없다.
  // 확장자만 보던 예전 판정은 이 분기를 한 번도 타지 못했다.
  return (
    /\.(?:png|jpe?g|gif|webp|avif|svg|ico)$/.test(url.pathname) ||
    url.pathname === '/_next/image'
  )
}

function shouldSkip(url) {
  return (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('vercel-insights.com') ||
    url.hostname.includes('va.vercel-scripts.com')
  )
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    return new Response('', {status: 408})
  }
}

/**
 * 캐시가 있으면 즉시 주고, 뒤에서 새로 받아 캐시를 갱신한다.
 *
 * 이미지에 cache-first 를 쓰면 파일을 교체해도 주소가 그대로라 영영 옛 그림이 뜬다.
 * 실제로 글 대표 이미지를 바꿨는데 브라우저에 반영되지 않는 일이 있었다.
 * 첫 화면 속도는 cache-first 와 같고, 교체분은 다음 방문에 반영된다.
 */
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request)

  const fetching = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        const cache = await caches.open(cacheName)
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => null)

  if (cached) {
    return cached
  }

  const fresh = await fetching
  return fresh ?? new Response('', {status: 408})
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) {
      return cached
    }

    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL)
    }
    return new Response('', {status: 408})
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (event.request.method !== 'GET') {
    return
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return
  }
  if (shouldSkip(url)) {
    return
  }
  if (url.origin !== self.location.origin) {
    return
  }

  // Content-hashed static assets: cache forever
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE))
    return
  }

  // Fonts: cache forever
  if (isFontRequest(url)) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE))
    return
  }

  // Page navigations: network-first, offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request, PAGES_CACHE))
    return
  }

  // Images: 캐시를 먼저 주되 뒤에서 갱신한다(교체분이 반영되도록)
  if (isImageRequest(url)) {
    event.respondWith(staleWhileRevalidate(event.request, IMAGES_CACHE))
    return
  }

  // RSC payloads and other same-origin data: network-first
  if (url.pathname.startsWith('/_next/')) {
    event.respondWith(networkFirst(event.request, PAGES_CACHE))
  }
})
