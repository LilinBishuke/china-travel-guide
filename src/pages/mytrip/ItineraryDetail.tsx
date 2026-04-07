import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDB } from '../../services/db'
import { getCityById } from '../../data/cities'
import Icon from '../../components/Icon'

interface Itinerary {
  id: string
  name: string
  days: { date: string; cityId: string; activities: string[] }[]
  createdAt: number
  updatedAt: number
}

export default function ItineraryDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [editing, setEditing] = useState<{ dayIdx: number; actIdx: number } | null>(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    if (!id) return
    getDB().then(db => db.get('trip-itineraries', id)).then(it => {
      if (it) setItinerary(it)
    }).catch(() => {})
  }, [id])

  async function saveActivity(dayIdx: number, actIdx: number, text: string) {
    if (!itinerary) return
    const updated = { ...itinerary }
    updated.days = updated.days.map((d, i) => {
      if (i !== dayIdx) return d
      const acts = [...d.activities]
      acts[actIdx] = text
      return { ...d, activities: acts }
    })
    updated.updatedAt = Date.now()
    setItinerary(updated)
    setEditing(null)
    try {
      const db = await getDB()
      await db.put('trip-itineraries', updated)
    } catch {}
  }

  async function addActivity(dayIdx: number) {
    if (!itinerary) return
    const updated = { ...itinerary }
    updated.days = updated.days.map((d, i) => {
      if (i !== dayIdx) return d
      return { ...d, activities: [...d.activities, '新しいアクティビティ'] }
    })
    updated.updatedAt = Date.now()
    setItinerary(updated)
    try {
      const db = await getDB()
      await db.put('trip-itineraries', updated)
    } catch {}
  }

  async function deleteItinerary() {
    if (!itinerary) return
    try {
      const db = await getDB()
      await db.delete('trip-itineraries', itinerary.id)
    } catch {}
    navigate(-1)
  }

  if (!itinerary) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-app">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-navy">{itinerary.name}</h2>
          <p className="text-[10px] text-text-secondary">{itinerary.days.length}日間</p>
        </div>
        <button onClick={deleteItinerary} className="text-xs text-primary font-medium active:opacity-70">
          削除
        </button>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4 pb-10">
        {itinerary.days.map((day, dayIdx) => {
          const city = getCityById(day.cityId)
          return (
            <div key={dayIdx} className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{dayIdx + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">Day {dayIdx + 1}</p>
                  <p className="text-[10px] text-text-secondary">{day.date} · {city?.name ?? day.cityId}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {day.activities.map((act, actIdx) => (
                  <div key={actIdx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {editing?.dayIdx === dayIdx && editing?.actIdx === actIdx ? (
                      <div className="flex-1 flex gap-1">
                        <input
                          type="text"
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && saveActivity(dayIdx, actIdx, editText)}
                          className="flex-1 bg-gray-50 rounded-lg px-2 py-1 text-sm text-navy outline-none focus:ring-1 focus:ring-primary"
                          autoFocus
                        />
                        <button
                          onClick={() => saveActivity(dayIdx, actIdx, editText)}
                          className="text-xs text-primary font-semibold px-2"
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditing({ dayIdx, actIdx }); setEditText(act) }}
                        className="flex-1 text-left text-sm text-navy active:opacity-70"
                      >
                        {act}
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addActivity(dayIdx)}
                  className="flex items-center gap-1.5 text-xs text-primary font-medium mt-1 active:opacity-70"
                >
                  <Icon name="visa_free" size={12} color="#E8342A" />
                  アクティビティを追加
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
