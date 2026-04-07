// Pre-cache critical data after onboarding

import { TOP_CITIES } from '../data/cities'
import { prefetchArticles } from './wikivoyageService'

export function startPrecache(): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const slugs = TOP_CITIES.map(c => c.wikivoyageSlug)
      prefetchArticles(slugs)
    })
  }
}
