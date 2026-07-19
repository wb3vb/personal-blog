const CACHE_VERSION = 'v3'
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
  return /\.(?:png|jpe?g|gif|webp|avif|svg|ico)$/.test(url.pathname)
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

  // Images: cache-first
  if (isImageRequest(url)) {
    event.respondWith(cacheFirst(event.request, IMAGES_CACHE))
    return
  }

  // RSC payloads and other same-origin data: network-first
  if (url.pathname.startsWith('/_next/')) {
    event.respondWith(networkFirst(event.request, PAGES_CACHE))
  }
})
