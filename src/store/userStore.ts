// User profile stored in localStorage

export type Language = 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es'
export type TripPurpose = 'tourism' | 'business' | 'transit'
export type TravelStyle = 'walking' | 'cycling' | 'motorcycle' | 'driving' | 'tour' | 'rail'
export type Interest = 'culture' | 'food' | 'nature' | 'shopping' | 'entertainment' | 'wellness'
export type VisitCount = 'first' | 'few' | 'many'

export interface UserProfile {
  language: Language
  nationality: string        // ISO 3166-1 alpha-2 e.g. "JP"
  nationalityName: string    // e.g. "日本"
  tripPurpose: TripPurpose
  travelStyles: TravelStyle[]
  entryPort: string          // e.g. "PVG"
  entryPortName: string      // e.g. "上海 浦東国際空港"
  departureDate: string      // ISO date string e.g. "2026-07-15"
  interests: Interest[]
  visitCount: VisitCount
  onboardingComplete: boolean
}

export interface VisaProgress {
  step: 1 | 2 | 3 | 4 | 5
  step1Complete: boolean
  applicationNumber: string
  trackingNumber: string
  step4Complete: boolean
  visaType: string
  visaExpiry: string
  stayDays: number
}

export interface ChecklistItem {
  id: string
  done: boolean
}

const PROFILE_KEY = 'ctg_profile'
const VISA_PROGRESS_KEY = 'ctg_visa_progress'
const CHECKLIST_KEY = 'ctg_checklist'

export function getProfile(): Partial<UserProfile> {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveProfile(profile: Partial<UserProfile>): void {
  const current = getProfile()
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...current, ...profile }))
}

export function getVisaProgress(): Partial<VisaProgress> {
  try {
    const raw = localStorage.getItem(VISA_PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveVisaProgress(data: Partial<VisaProgress>): void {
  const current = getVisaProgress()
  localStorage.setItem(VISA_PROGRESS_KEY, JSON.stringify({ ...current, ...data }))
}

export function getChecklist(): ChecklistItem[] {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY)
    return raw ? JSON.parse(raw) : defaultChecklist()
  } catch {
    return defaultChecklist()
  }
}

export function saveChecklist(items: ChecklistItem[]): void {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(items))
}

function defaultChecklist(): ChecklistItem[] {
  // Base items for all travelers
  const items: ChecklistItem[] = [
    { id: 'passport', done: false },
    { id: 'wechat', done: false },
    { id: 'vpn', done: false },
    { id: 'alipay', done: false },
    { id: 'offline_map', done: false },
    { id: 'emergency', done: false },
    { id: 'esim', done: false },
    { id: 'currency', done: false },
    { id: 'insurance', done: false },
  ]

  // visa item added by default — removed at runtime if visa-free
  items.splice(1, 0, { id: 'visa', done: false })
  items.push({ id: 'style', done: false })
  return items
}

// Storage quota check — warn at 80%
export function checkStorageQuota(): { used: number; percentage: number } {
  let used = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) used += (localStorage.getItem(key)?.length ?? 0) * 2
  }
  const percentage = (used / 5_242_880) * 100
  if (percentage > 80) {
    // Clear old caches to free space
    const cacheKeys = ['ctg_weather_v2', 'ctg_rates_v2', 'ctg_rate_jpy']
    cacheKeys.forEach(k => localStorage.removeItem(k))
  }
  return { used, percentage }
}

// Multi-tab sync: listen for storage changes from other tabs
let onProfileChangeCallback: ((profile: Partial<UserProfile>) => void) | null = null

export function onProfileChange(cb: (profile: Partial<UserProfile>) => void) {
  onProfileChangeCallback = cb
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'ctg_profile' && e.newValue && onProfileChangeCallback) {
      try { onProfileChangeCallback(JSON.parse(e.newValue)) } catch {}
    }
  })
}

export function getDaysUntilDeparture(departureDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dep = new Date(departureDate)
  dep.setHours(0, 0, 0, 0)
  return Math.ceil((dep.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
