// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiFetch } from '../client'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('apiFetch', () => {
  it('returns data on successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ value: 42 }),
    } as Response)

    const result = await apiFetch<{ value: number }>('https://example.com/api')
    expect(result.data).toEqual({ value: 42 })
    expect(result.error).toBeNull()
    expect(result.fromCache).toBe(false)
  })

  it('retries on failure and returns error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))

    const result = await apiFetch('https://example.com/api', { retries: 1, timeout: 1000 })
    expect(result.data).toBeNull()
    expect(result.error).toBe('Network error')
  })

  it('returns cached data when available', async () => {
    localStorage.setItem('test_key', JSON.stringify({ data: { cached: true }, ts: Date.now() }))

    const result = await apiFetch<{ cached: boolean }>('https://example.com/api', {
      cacheKey: 'test_key',
      cacheTTL: 60000,
    })
    expect(result.data).toEqual({ cached: true })
    expect(result.fromCache).toBe(true)
  })

  it('ignores expired cache and fetches fresh', async () => {
    localStorage.setItem('test_key', JSON.stringify({ data: { old: true }, ts: Date.now() - 120000 }))

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ fresh: true }),
    } as Response)

    const result = await apiFetch('https://example.com/api', {
      cacheKey: 'test_key',
      cacheTTL: 60000,
    })
    expect(result.data).toEqual({ fresh: true })
    expect(result.fromCache).toBe(false)
  })

  it('returns stale cache on network failure', async () => {
    localStorage.setItem('stale_key', JSON.stringify({ data: { stale: true }, ts: Date.now() - 999999 }))

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Offline'))

    const result = await apiFetch('https://example.com/api', {
      cacheKey: 'stale_key',
      cacheTTL: 60000,
      retries: 0,
    })
    expect(result.data).toEqual({ stale: true })
    expect(result.fromCache).toBe(true)
    expect(result.error).toBe('Offline')
  })

  it('handles HTTP error status codes', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as Response)

    const result = await apiFetch('https://example.com/api', { retries: 0 })
    expect(result.data).toBeNull()
    expect(result.error).toBe('HTTP 500')
  })
})
