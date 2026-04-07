import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '../../store/userStore'
import { TOP_CITIES, CITIES } from '../../data/cities'
import { TRAVEL_STYLE_GUIDES } from '../../data/travelStyleGuides'
import { getCityWeather, type CityWeather } from '../../services/weatherService'
import type { TravelStyle } from '../../store/userStore'

const STYLE_CHIPS: { value: TravelStyle; label: string }[] = [
  { value: 'walking', label: '徒歩・ハイキング' },
  { value: 'cycling', label: 'サイクリング' },
  { value: 'motorcycle', label: 'バイク・スクーター' },
  { value: 'driving', label: 'レンタカー' },
  { value: 'tour', label: 'グループツアー' },
  { value: 'rail', label: '高速鉄道' },
]

// Use top 4 cities for recommendations
const RECOMMENDED = CITIES.slice(0, 4)

export default function ExploreMain() {
  const navigate = useNavigate()
  const profile = getProfile()
  const [weather, setWeather] = useState<CityWeather[]>([])
  const [activeStyle] = useState<TravelStyle | null>(
    profile.travelStyles?.[0] ?? null
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCityWeather(TOP_CITIES).then(setWeather)
  }, [])

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-tab bg-bg-app">
      {/* Header */}
      <div className="px-5 pt-safe pt-6 pb-4 bg-white">
        <h1 className="text-[26px] font-bold text-navy">探す</h1>

        {/* Search bar */}
        <div className="relative mt-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="都市、観光地、旅行スタイルを検索..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-3 text-sm text-navy placeholder-gray-400 outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-5">
        {/* Search results */}
        {search.trim() && (() => {
          const q = search.trim().toLowerCase()
          const matchedCities = CITIES.filter(c =>
            c.name.includes(q) || c.nameEn.toLowerCase().includes(q) ||
            c.description.includes(q) || c.highlights.some(h => h.includes(q))
          )
          const matchedStyles = TRAVEL_STYLE_GUIDES.filter(g =>
            g.title.includes(q) || g.titleEn.toLowerCase().includes(q)
          )
          if (matchedCities.length === 0 && matchedStyles.length === 0) {
            return <p className="text-sm text-text-secondary text-center py-4">結果が見つかりません</p>
          }
          return (
            <div className="flex flex-col gap-3">
              {matchedStyles.map(g => (
                <button key={g.style} onClick={() => navigate(`/explore/style/${g.style}`)}
                  className="card p-3 flex items-center gap-3 active:opacity-70 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{g.title.slice(0, 2)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{g.title}</p>
                    <p className="text-[10px] text-text-secondary">旅行スタイルガイド</p>
                  </div>
                </button>
              ))}
              {matchedCities.map(city => (
                <button key={city.id} onClick={() => navigate(`/explore/city/${city.id}`)}
                  className="card p-3 flex items-center gap-3 active:opacity-70 text-left">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-navy">{city.name}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{city.name} ({city.nameEn})</p>
                    <p className="text-[10px] text-text-secondary">{city.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )
        })()}

        {/* Main content (hidden when searching) */}
        {!search.trim() && (<>
          {/* Weather strip */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5">
            {(weather.length > 0 ? weather : TOP_CITIES.map(c => ({ cityId: c.id, name: c.name, temp: 0, weatherCode: -1 }))).map(city => (
              <div key={city.cityId} className="flex flex-col items-center gap-1 min-w-[56px]">
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-navy">{city.name}</span>
                  <span className="text-[11px] text-text-secondary">
                    {city.temp !== 0 ? `${city.temp}°` : '—'}
                  </span>
                </div>
              </div>
            ))}
            <span className="text-[10px] text-text-secondary self-end whitespace-nowrap ml-1">Open-Meteo</span>
          </div>

          {/* Travel style chips */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">旅行スタイル別ガイド</h2>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
              {STYLE_CHIPS.map(s => (
                <button
                  key={s.value}
                  onClick={() => navigate(`/explore/style/${s.value}`)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors shrink-0 ${
                    activeStyle === s.value
                      ? 'bg-primary text-white'
                      : 'bg-white text-navy shadow-sm'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended cities */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">おすすめ都市</h2>
            <div className="flex flex-col gap-3">
              {RECOMMENDED.map(city => (
                <button
                  key={city.id}
                  onClick={() => navigate(`/explore/city/${city.id}`)}
                  className="card p-4 flex items-center gap-4 active:opacity-70 transition-opacity text-left"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-[15px] font-bold text-navy">{city.name}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-bold text-navy">{city.name}</p>
                    <p className="text-[11px] font-medium text-text-secondary mt-0.5">{city.description}</p>
                  </div>
                  <svg className="text-gray-300 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </>)}
      </div>

      {/* Map FAB */}
      <button className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 active:opacity-80 transition-opacity z-10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 2v16M16 6v16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-semibold">地図を見る</span>
      </button>
    </div>
  )
}
