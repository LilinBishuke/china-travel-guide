import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile, getDaysUntilDeparture } from '../../store/userStore'
import { CITIES } from '../../data/cities'
import { getDB } from '../../services/db'
import Icon from '../../components/Icon'

interface Itinerary {
  id: string
  name: string
  days: { date: string; cityId: string; activities: string[] }[]
  createdAt: number
  updatedAt: number
}

const TEMPLATES = [
  { name: '北京 3泊4日', cityId: 'beijing', nights: 3, desc: '故宮・長城・胡同散策' },
  { name: '上海 2泊3日', cityId: 'shanghai', nights: 2, desc: '外灘・豫園・ショッピング' },
  { name: '成都 2泊3日', cityId: 'chengdu', nights: 2, desc: 'パンダ基地・火鍋巡り' },
  { name: '西安 2泊3日', cityId: 'xian', nights: 2, desc: '兵馬俑・城壁・回民街' },
]

export default function MyTripPage() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'en'
  const isJa = lang === 'ja'
  const days = profile.departureDate ? getDaysUntilDeparture(profile.departureDate) : null

  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCity, setNewCity] = useState('beijing')
  const [newNights, setNewNights] = useState(3)

  useEffect(() => {
    loadItineraries()
  }, [])

  async function loadItineraries() {
    try {
      const db = await getDB()
      const all = await db.getAll('trip-itineraries')
      setItineraries(all.sort((a, b) => b.updatedAt - a.updatedAt))
    } catch { /* IDB not available */ }
  }

  async function createItinerary(name: string, cityId: string, nights: number) {
    const depDate = profile.departureDate ?? new Date().toISOString().split('T')[0]
    const itinerary: Itinerary = {
      id: `trip-${Date.now()}`,
      name,
      days: Array.from({ length: nights + 1 }, (_, i) => {
        const d = new Date(depDate)
        d.setDate(d.getDate() + i)
        const city = CITIES.find(c => c.id === cityId)
        return {
          date: d.toISOString().split('T')[0],
          cityId,
          activities: i === 0 ? [`${city?.name ?? cityId}に到着`] : [`${city?.name ?? cityId}観光 Day ${i}`],
        }
      }),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    try {
      const db = await getDB()
      await db.put('trip-itineraries', itinerary)
    } catch { /* fallback: just show in state */ }
    setItineraries(prev => [itinerary, ...prev])
    setShowCreate(false)
    setNewName('')
  }

  function generateAIPrompt() {
    const p = profile
    const styles = p.travelStyles?.join(', ') ?? 'general'
    const interests = p.interests?.join(', ') ?? 'culture'
    const prompt = `Plan a ${days ?? 7}-day trip to China for a ${p.nationalityName ?? 'foreign'} traveler.
Travel styles: ${styles}
Interests: ${interests}
Entry: ${p.entryPortName ?? 'Shanghai'}
Date: ${p.departureDate ?? 'flexible'}
Please create a day-by-day itinerary with specific attractions, restaurants, and transport tips.`
    const encoded = encodeURIComponent(prompt)
    window.open(`https://claude.ai/new?q=${encoded}`, '_blank')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-tab">
      <div className="px-5 pt-safe pt-6 pb-4 bg-white border-b border-gray-50">
        <h1 className="text-xl font-bold text-navy">{isJa ? '旅程' : 'My Trip'}</h1>
        {days !== null && (
          <p className="text-xs text-text-secondary mt-0.5">
            {isJa ? `出発まであと ${days} 日` : `${days} days until departure`}
          </p>
        )}
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Existing itineraries */}
        {itineraries.map(it => (
          <button key={it.id} onClick={() => navigate(`/mytrip/${it.id}`)} className="card p-4 text-left active:opacity-70 transition-opacity">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="calendar_plan" size={18} color="#E8342A" />
              <p className="text-sm font-bold text-navy flex-1">{it.name}</p>
              <span className="text-[10px] text-text-secondary">{it.days.length}日間</span>
            </div>
            <div className="flex flex-col gap-1">
              {it.days.slice(0, 3).map((day, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="font-medium text-navy w-16">{day.date.slice(5)}</span>
                  <span>{day.activities[0]}</span>
                </div>
              ))}
              {it.days.length > 3 && (
                <p className="text-[10px] text-text-secondary">...他 {it.days.length - 3} 日</p>
              )}
            </div>
          </button>
        ))}

        {/* Create new */}
        {showCreate ? (
          <div className="card p-4 flex flex-col gap-3">
            <p className="text-sm font-bold text-navy">{isJa ? '新しい旅程' : 'New Itinerary'}</p>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder={isJa ? '旅程名（例: 北京の旅）' : 'Trip name'}
              className="w-full bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:ring-1 focus:ring-primary"
            />
            <select
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
              className="w-full bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-navy outline-none"
            >
              {CITIES.map(c => <option key={c.id} value={c.id}>{c.name} ({c.nameEn})</option>)}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">{isJa ? '泊数' : 'Nights'}:</span>
              {[1, 2, 3, 4, 5, 7].map(n => (
                <button
                  key={n}
                  onClick={() => setNewNights(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold ${newNights === n ? 'bg-primary text-white' : 'bg-gray-100 text-navy'}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="btn-primary flex-1" onClick={() => createItinerary(newName || `${CITIES.find(c => c.id === newCity)?.name}の旅`, newCity, newNights)}>
                {isJa ? '作成' : 'Create'}
              </button>
              <button className="btn-secondary flex-1" onClick={() => setShowCreate(false)}>
                {isJa ? 'キャンセル' : 'Cancel'}
              </button>
            </div>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => setShowCreate(true)}>
            {isJa ? '旅程を作成' : 'Create Itinerary'}
          </button>
        )}

        {/* AI planner */}
        <button
          onClick={generateAIPrompt}
          className="card p-4 flex items-center gap-3 active:opacity-70 transition-opacity border border-primary/20"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="chat" size={20} color="#E8342A" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-navy">{isJa ? 'AI旅程プランナー' : 'AI Trip Planner'}</p>
            <p className="text-[10px] text-text-secondary">{isJa ? 'Claude AIがあなたの旅程を提案' : 'Get AI-powered itinerary suggestions'}</p>
          </div>
          <svg className="text-gray-300 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Templates */}
        <div>
          <p className="section-header">{isJa ? 'テンプレートから作成' : 'From Templates'}</p>
          <div className="flex flex-col gap-2">
            {TEMPLATES.map(t => (
              <button
                key={t.name}
                onClick={() => createItinerary(t.name, t.cityId, t.nights)}
                className="card flex items-center gap-3 p-3 active:opacity-70 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Icon name="city" size={20} color="#1A1A2E" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
