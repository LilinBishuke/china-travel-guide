import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile, saveProfile } from '../../store/userStore'
import type { Language, TripPurpose } from '../../store/userStore'
import { POPULAR_NATIONALITIES, ENTRY_PORTS } from '../../data/visaRules'
import CountryBadge from '../../components/CountryBadge'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ja', label: '日本語' }, { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' }, { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' }, { code: 'es', label: 'Español' },
]

const PURPOSES: { value: TripPurpose; label: string }[] = [
  { value: 'tourism', label: '観光・休暇' },
  { value: 'business', label: 'ビジネス' },
  { value: 'transit', label: 'トランジット' },
]

export default function EditProfile() {
  const navigate = useNavigate()
  const existing = getProfile()

  const [language, setLanguage] = useState(existing.language ?? 'ja')
  const [nationality, setNationality] = useState(existing.nationality ?? '')
  const [nationalityName, setNationalityName] = useState(existing.nationalityName ?? '')
  const [tripPurpose, setTripPurpose] = useState<TripPurpose>(existing.tripPurpose ?? 'tourism')
  const [entryPort, setEntryPort] = useState(existing.entryPort ?? '')
  const [departureDate, setDepartureDate] = useState(existing.departureDate ?? '')

  function handleSave() {
    const portObj = ENTRY_PORTS.find(p => p.code === entryPort)
    saveProfile({
      language,
      nationality,
      nationalityName,
      tripPurpose,
      entryPort,
      entryPortName: portObj?.name ?? existing.entryPortName ?? '',
      departureDate,
    })
    navigate(-1)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">プロフィール編集</h2>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 flex-1">
        {/* Language */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">言語</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  language === l.code ? 'bg-primary text-white' : 'bg-gray-100 text-navy'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nationality */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">国籍</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_NATIONALITIES.map(n => (
              <button
                key={n.code}
                onClick={() => { setNationality(n.code); setNationalityName(n.name) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  nationality === n.code ? 'bg-primary/10 border border-primary text-primary' : 'bg-gray-100 text-navy'
                }`}
              >
                <CountryBadge code={n.code} />
                <span>{n.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Purpose */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">渡航目的</p>
          <div className="flex gap-2">
            {PURPOSES.map(p => (
              <button
                key={p.value}
                onClick={() => setTripPurpose(p.value)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                  tripPurpose === p.value ? 'bg-primary text-white' : 'bg-gray-100 text-navy'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Entry port */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">入国空港</p>
          <select
            value={entryPort}
            onChange={e => setEntryPort(e.target.value)}
            className="w-full bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">選択してください</option>
            {ENTRY_PORTS.map(p => (
              <option key={p.code} value={p.code}>{p.name} ({p.code})</option>
            ))}
          </select>
        </div>

        {/* Departure date */}
        <div className="card p-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">出発日</p>
          <input
            type="date"
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
            className="w-full bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="px-5 pb-8 pt-2">
        <button className="btn-primary" onClick={handleSave}>
          保存
        </button>
      </div>
    </div>
  )
}
