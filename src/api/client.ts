// Centralized fetch wrapper with timeout, retry, and caching

export interface ApiResult<T> {
  data: T | null
  error: string | null
  fromCache: boolean
}

interface FetchOptions {
  timeout?: number
  retries?: number
  cacheKey?: string
  cacheTTL?: number // ms
}

const DEFAULT_TIMEOUT = 10_000
const DEFAULT_RETRIES = 2

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { signal: controller.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

export async function apiFetch<T>(url: string, opts: FetchOptions = {}): Promise<ApiResult<T>> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    cacheKey,
    cacheTTL,
  } = opts

  // Check cache first
  if (cacheKey && cacheTTL) {
    const cached = readCache<T>(cacheKey, cacheTTL)
    if (cached !== null) {
      return { data: cached, error: null, fromCache: true }
    }
  }

  let lastError = ''

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, timeout)
      if (!res.ok) {
        lastError = `HTTP ${res.status}`
        continue
      }
      const data = (await res.json()) as T

      // Write to cache
      if (cacheKey) {
        writeCache(cacheKey, data)
      }

      return { data, error: null, fromCache: false }
    } catch (e) {
      lastError = e instanceof Error ? e.message : 'Unknown error'
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)))
      }
    }
  }

  // All retries failed — try returning stale cache
  if (cacheKey) {
    const stale = readCache<T>(cacheKey, Infinity)
    if (stale !== null) {
      return { data: stale, error: lastError, fromCache: true }
    }
  }

  return { data: null, error: lastError, fromCache: false }
}

// --- localStorage cache helpers ---

function readCache<T>(key: string, ttl: number): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > ttl) return null
    return data as T
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }))
  } catch {
    // Storage full — silently skip
  }
}
