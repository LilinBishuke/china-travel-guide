// Wikivoyage article service — IndexedDB cached

import { apiFetch } from '../api/client'
import type { WikivoyageResponse } from '../api/types'
import { getDB } from './db'

const ARTICLE_TTL = 24 * 60 * 60 * 1000 // 24 hours

export interface CityArticle {
  slug: string
  title: string
  html: string
  sections: string[]
  fetchedAt: number
}

// Get article from IndexedDB cache or fetch from API
export async function getCityArticle(slug: string): Promise<CityArticle | null> {
  // Try IndexedDB cache first
  try {
    const db = await getDB()
    const cached = await db.get('wikivoyage-articles', slug)
    if (cached && Date.now() - cached.fetchedAt < ARTICLE_TTL) {
      return cached
    }
  } catch {
    // IDB not available, fall through to network
  }

  // Fetch from Wikivoyage API
  const url = `https://en.wikivoyage.org/w/api.php?action=parse&page=${encodeURIComponent(slug)}&format=json&origin=*&prop=text|sections`

  const result = await apiFetch<WikivoyageResponse>(url, { timeout: 15000 })

  if (!result.data?.parse) return null

  const parse = result.data.parse
  const article: CityArticle = {
    slug,
    title: parse.title,
    html: parse.text['*'],
    sections: parse.sections.map(s => s.line),
    fetchedAt: Date.now(),
  }

  // Cache to IndexedDB
  try {
    const db = await getDB()
    await db.put('wikivoyage-articles', article)
  } catch {
    // IDB write failed, article still usable
  }

  return article
}

// Pre-fetch articles for a list of slugs (called via requestIdleCallback)
export async function prefetchArticles(slugs: string[], signal?: AbortSignal): Promise<void> {
  for (const slug of slugs) {
    if (signal?.aborted) return
    try {
      const db = await getDB()
      const existing = await db.get('wikivoyage-articles', slug)
      if (existing && Date.now() - existing.fetchedAt < ARTICLE_TTL) {
        continue
      }
    } catch {
      // continue anyway
    }
    if (signal?.aborted) return
    await getCityArticle(slug)
    await new Promise(r => setTimeout(r, 1000))
  }
}
