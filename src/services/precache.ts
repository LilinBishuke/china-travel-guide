// Pre-cache critical data after onboarding

import { TOP_CITIES } from '../data/cities'
import { prefetchArticles } from './wikivoyageService'

let abortController: AbortController | null = null

export function startPrecache(): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      abortController = new AbortController()
      const slugs = TOP_CITIES.map(c => c.wikivoyageSlug)
      prefetchArticles(slugs, abortController.signal)
    })
  }
}

export function stopPrecache(): void {
  abortController?.abort()
  abortController = null
}
