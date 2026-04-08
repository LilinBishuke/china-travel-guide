import { useState } from 'react'
import StepIndicator from '../../components/StepIndicator'
import { ENTRY_PORTS } from '../../data/visaRules'
import type { Language } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (port: string, portName: string, date: string) => void
}

const CITY_AIRPORTS: { city: string; cityJa: string; ports: { code: string; label: string }[] }[] = [
  { city: 'Shanghai', cityJa: '上海', ports: [{ code: 'PVG', label: '浦東' }, { code: 'SHA', label: '虹橋' }] },
  { city: 'Beijing', cityJa: '北京', ports: [{ code: 'PEK', label: '首都' }, { code: 'PKX', label: '大興' }] },
  { city: 'Guangzhou', cityJa: '広州', ports: [{ code: 'CAN', label: '白雲' }] },
  { city: 'Chengdu', cityJa: '成都', ports: [{ code: 'CTU', label: '天府' }] },
  { city: "Xi'an", cityJa: '西安', ports: [{ code: 'XIY', label: '咸陽' }] },
  { city: 'Shenzhen', cityJa: '深圳', ports: [{ code: 'SZX', label: '宝安' }] },
  { city: 'Kunming', cityJa: '昆明', ports: [{ code: 'KMG', label: '長水' }] },
  { city: 'Chongqing', cityJa: '重慶', ports: [{ code: 'CKG', label: '江北' }] },
]

const TITLES: Record<Language, { heading: string; sub: string; dateLabel: string; btn: string; skip: string; selectAirport: string }> = {
  ja: { heading: '入国予定', sub: 'まず都市を選んでください', dateLabel: '出発日', btn: '続ける', skip: '後で設定する', selectAirport: '空港を選択' },
  en: { heading: 'Entry Details', sub: 'Select your destination city', dateLabel: 'Departure Date', btn: 'Continue', skip: 'Set up later', selectAirport: 'Select airport' },
  ko: { heading: '입국 예정', sub: '도시를 선택하세요', dateLabel: '출발 날짜', btn: '계속', skip: '나중에 설정', selectAirport: '공항 선택' },
  fr: { heading: "Détails d'entrée", sub: 'Choisissez votre ville', dateLabel: 'Date de départ', btn: 'Continuer', skip: 'Plus tard', selectAirport: "Choisir l'aéroport" },
  de: { heading: 'Einreisedetails', sub: 'Wählen Sie Ihre Stadt', dateLabel: 'Abreisedatum', btn: 'Weiter', skip: 'Später', selectAirport: 'Flughafen wählen' },
  es: { heading: 'Detalles de entrada', sub: 'Seleccione su ciudad', dateLabel: 'Fecha de salida', btn: 'Continuar', skip: 'Configurar después', selectAirport: 'Seleccionar aeropuerto' },
}

function defaultDate() {
  const d = new Date(); d.setDate(d.getDate() + 30)
  return d.toISOString().split('T')[0]
}
function minDate() {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function OB5Entry({ lang, onNext }: Props) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedPort, setSelectedPort] = useState('')
  const [date, setDate] = useState(defaultDate())
  const t = TITLES[lang] ?? TITLES.en
  const isJa = lang === 'ja'

  const cityData = selectedCity ? CITY_AIRPORTS.find(c => c.cityJa === selectedCity || c.city === selectedCity) : null

  // Auto-select port if city has only one airport
  function selectCity(cityJa: string) {
    setSelectedCity(cityJa)
    const data = CITY_AIRPORTS.find(c => c.cityJa === cityJa)
    if (data && data.ports.length === 1) {
      setSelectedPort(data.ports[0].code)
    } else {
      setSelectedPort('')
    }
  }

  function handleNext() {
    if (!selectedPort) {
      onNext('', '', date) // "Later" mode
      return
    }
    const port = ENTRY_PORTS.find(p => p.code === selectedPort)
    if (!port) return
    onNext(selectedPort, port.name, date)
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={6} total={8} />

      <div className="mt-4 mb-4">
        <h2 className="text-2xl font-bold text-navy">{t.heading}</h2>
        <p className="text-text-secondary text-sm mt-1">{t.sub}</p>
      </div>

      {/* Date first */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-navy mb-2 block">{t.dateLabel}</label>
        <input
          type="date" value={date} min={minDate()}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy border border-gray-100 outline-none focus:border-primary"
        />
      </div>

      {/* City chips */}
      <p className="text-xs font-semibold text-text-secondary mb-2">{isJa ? '入国都市' : 'Entry City'}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {CITY_AIRPORTS.map(c => (
          <button
            key={c.cityJa}
            onClick={() => selectCity(c.cityJa)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCity === c.cityJa ? 'bg-primary text-white' : 'bg-white text-navy border border-gray-100'
            }`}
          >
            {isJa ? c.cityJa : c.city}
          </button>
        ))}
      </div>

      {/* Airport selection (only for multi-airport cities) */}
      {cityData && cityData.ports.length > 1 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">{t.selectAirport}</p>
          <div className="flex gap-2">
            {cityData.ports.map(p => (
              <button
                key={p.code}
                onClick={() => setSelectedPort(p.code)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedPort === p.code ? 'bg-primary text-white' : 'bg-white text-navy border border-gray-100'
                }`}
              >
                {p.label} ({p.code})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected summary */}
      {selectedPort && (
        <div className="bg-primary/5 rounded-lg px-3 py-2 mb-4">
          <p className="text-xs text-primary font-medium">
            {ENTRY_PORTS.find(p => p.code === selectedPort)?.name ?? selectedPort}
          </p>
        </div>
      )}

      <div className="flex-1" />

      <div className="flex flex-col gap-2">
        <button className="btn-primary" onClick={handleNext}>
          {selectedPort ? t.btn : t.skip}
        </button>
        {selectedPort && (
          <button className="text-xs text-text-secondary text-center py-2 active:opacity-70"
            onClick={() => { setSelectedPort(''); setSelectedCity(null); onNext('', '', date) }}>
            {t.skip}
          </button>
        )}
      </div>
    </div>
  )
}
