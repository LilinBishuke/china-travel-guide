// API response types for external services

// --- Frankfurter (Exchange Rates) ---
export interface FrankfurterResponse {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

// --- Open-Meteo (Weather) ---
export interface OpenMeteoCurrentWeather {
  temperature: number
  windspeed: number
  weathercode: number
  time: string
}

export interface OpenMeteoResponse {
  current_weather: OpenMeteoCurrentWeather
  latitude: number
  longitude: number
}

// Multi-location response is an array
export type OpenMeteoMultiResponse = OpenMeteoResponse[]

// --- Wikivoyage (City Articles) ---
export interface WikivoyageParsedSection {
  toclevel: number
  level: string
  line: string
  number: string
  index: string
}

export interface WikivoyageParseResult {
  title: string
  pageid: number
  text: { '*': string }
  sections: WikivoyageParsedSection[]
}

export interface WikivoyageResponse {
  parse: WikivoyageParseResult
}
