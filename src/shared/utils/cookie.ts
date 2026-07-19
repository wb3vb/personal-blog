interface CookieOptions {
  maxAge?: number
  path?: string
}

function getRootDomain(hostname: string): string | null {
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
  ) {
    return null
  }
  const parts = hostname.split('.')
  if (parts.length < 2) {
    return null
  }
  return parts.slice(-2).join('.')
}

export function setCookie(
  name: string,
  value: string,
  opts: CookieOptions = {},
): void {
  if (typeof document === 'undefined') {
    return
  }
  const maxAge = opts.maxAge ?? 60 * 60 * 24 * 365
  const path = opts.path ?? '/'
  const root = getRootDomain(window.location.hostname)
  const domainAttr = root ? `; domain=.${root}` : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${path}; max-age=${maxAge}; samesite=lax${domainAttr}`
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}
