// Exchange rate service — single source for all rate data

import { apiFetch } from '../api/client'
import type { FrankfurterResponse } from '../api/types'

const CACHE_KEY = 'ctg_rates'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

const CURRENCIES = 'CNY,JPY,USD,EUR,GBP,KRW,AUD,SGD,HKD'

let cachedRates: FrankfurterResponse | null = null

export async function getLatestRates(): Promise<FrankfurterResponse | null> {
  if (cachedRates) return cachedRates

  const result = await apiFetch<FrankfurterResponse>(
    `https://api.frankfurter.app/latest?to=${CURRENCIES}`,
    { cacheKey: CACHE_KEY, cacheTTL: CACHE_TTL }
  )

  if (result.data) {
    cachedRates = result.data
  }

  return result.data
}

// Convert amount from a given currency to CNY
export function convertToCNY(
  rates: FrankfurterResponse,
  amount: number,
  fromCurrency: string,
): number {
  const cnyPerEur = rates.rates['CNY']
  const fromPerEur = rates.rates[fromCurrency]
  if (!cnyPerEur || !fromPerEur) return 0
  return amount * (cnyPerEur / fromPerEur)
}

// Get JPY→CNY rate for 100 JPY (dashboard widget)
export async function getJpyCnyRate(): Promise<{ value: number; date: string } | null> {
  const rates = await getLatestRates()
  if (!rates) return null
  const val = convertToCNY(rates, 100, 'JPY')
  return { value: val, date: rates.date }
}
