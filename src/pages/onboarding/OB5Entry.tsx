import { useState } from 'react'
import StepIndicator from '../../components/StepIndicator'
import { ENTRY_PORTS } from '../../data/visaRules'
import type { Language } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (port: string, portName: string, date: string) => void
}

const TITLES: Record<Language, { heading: string; sub: string; dateLabel: string; btn: string; skip: string; search: string }> = {
  ja: { heading: '入国予定', sub: '入国空港と出発日を教えてください', dateLabel: '出発日', btn: '続ける', skip: '後で設定する', search: '空港コードで検索...' },
  en: { heading: 'Entry Details', sub: 'Select your entry airport and departure date', dateLabel: 'Departure Date', btn: 'Continue', skip: 'Set up later', search: 'Search airport...' },
  ko: { heading: '입국 예정', sub: '입국 공항과 출발일을 선택하세요', dateLabel: '출발 날짜', btn: '계속', skip: '나중에 설정', search: '공항 검색...' },
  fr: { heading: "Détails d'entrée", sub: "Aéroport d'entrée et date de départ", dateLabel: 'Date de départ', btn: 'Continuer', skip: 'Plus tard', search: "Chercher l'aéroport..." },
  de: { heading: 'Einreisedetails', sub: 'Einreiseflughafen und Abreisedatum', dateLabel: 'Abreisedatum', btn: 'Weiter', skip: 'Später', search: 'Flughafen suchen...' },
  es: { heading: 'Detalles de entrada', sub: 'Aeropuerto de entrada y fecha de salida', dateLabel: 'Fecha de salida', btn: 'Continuar', skip: 'Configurar después', search: 'Buscar aeropuerto...' },
}

function defaultDate() {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().split('T')[0]
}

function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function OB5Entry({ lang, onNext }: Props) {
  const [selectedPort, setSelectedPort] = useState('')
  const [date, setDate] = useState(defaultDate())
  const [search, setSearch] = useState('')
  const t = TITLES[lang] ?? TITLES.en

  function handleNext() {
    if (!selectedPort) {
      // "Later" mode: skip with empty port
      onNext('', '', date)
      return
    }
    const port = ENTRY_PORTS.find(p => p.code === selectedPort)
    if (!port) return
    onNext(selectedPort, port.name, date)
  }

  const filtered = search
    ? ENTRY_PORTS.filter(p =>
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.name.includes(search) ||
        p.city.includes(search)
      )
    : ENTRY_PORTS

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={5} total={7} />

      <div className="mt-4 mb-3">
        <h2 className="text-2xl font-bold text-navy">{t.heading}</h2>
        <p className="text-text-secondary text-sm mt-1">{t.sub}</p>
      </div>

      {/* Date first (more important, always visible) */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-navy mb-2 block">{t.dateLabel}</label>
        <input
          type="date"
          value={date}
          min={minDate()}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy border border-gray-100 outline-none focus:border-primary"
        />
      </div>

      {/* Airport search */}
      <div className="relative mb-3">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl pl-8 pr-4 py-2.5 text-sm text-navy placeholder-gray-400 border border-gray-100 outline-none focus:border-primary"
        />
      </div>

      {/* Compact airport list */}
      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto max-h-[280px]">
        {filtered.map(port => (
          <button
            key={port.code}
            onClick={() => setSelectedPort(port.code)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all active:opacity-70 ${
              selectedPort === port.code
                ? 'border-primary bg-primary/5'
                : 'border-gray-100 bg-white'
            }`}
          >
            <span className={`text-xs font-bold w-8 ${selectedPort === port.code ? 'text-primary' : 'text-navy'}`}>
              {port.code}
            </span>
            <span className="text-xs text-navy flex-1 text-left">{port.name}</span>
            {selectedPort === port.code && (
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#E8342A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <button className="btn-primary" onClick={handleNext}>
          {selectedPort ? t.btn : t.skip}
        </button>
        {selectedPort && (
          <button
            className="text-xs text-text-secondary text-center py-2 active:opacity-70"
            onClick={() => { setSelectedPort(''); handleNext() }}
          >
            {t.skip}
          </button>
        )}
      </div>
    </div>
  )
}
