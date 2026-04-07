// Weather service — Open-Meteo API wrapper

import { apiFetch } from '../api/client'
import type { OpenMeteoResponse } from '../api/types'
import type { City } from '../data/cities'

const CACHE_KEY = 'ctg_weather'
const CACHE_TTL = 30 * 60 * 1000 // 30 min

export interface CityWeather {
  cityId: string
  name: string
  temp: number
  weatherCode: number
}

export async function getCityWeather(cities: City[]): Promise<CityWeather[]> {
  const lats = cities.map(c => c.lat).join(',')
  const lons = cities.map(c => c.lon).join(',')
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current_weather=true`

  const result = await apiFetch<OpenMeteoResponse[]>(url, {
    cacheKey: CACHE_KEY,
    cacheTTL: CACHE_TTL,
  })

  if (!result.data || !Array.isArray(result.data)) {
    return cities.map(c => ({
      cityId: c.id,
      name: c.name,
      temp: 0,
      weatherCode: -1,
    }))
  }

  return cities.map((city, i) => ({
    cityId: city.id,
    name: city.name,
    temp: Math.round(result.data![i]?.current_weather?.temperature ?? 0),
    weatherCode: result.data![i]?.current_weather?.weathercode ?? -1,
  }))
}

// Weather code → simple icon name
export function weatherIcon(code: number): string {
  if (code === 0) return 'sun'
  if (code <= 3) return 'cloud-sun'
  if (code <= 48) return 'cloud'
  if (code <= 67) return 'rain'
  if (code <= 77) return 'snow'
  return 'cloud'
}
