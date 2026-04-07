import { useState } from 'react'
import StepIndicator from '../../components/StepIndicator'
import { ENTRY_PORTS } from '../../data/visaRules'
import type { Language } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (port: string, portName: string, date: string) => void
}

const TITLES: Record<Language, { heading: string; sub: string; dateLabel: string; btn: string }> = {
  ja: { heading: '入国予定', sub: '入国空港と出発日を教えてください', dateLabel: '出発日', btn: '続ける' },
  en: { heading: 'Entry Details', sub: 'Select your entry airport and departure date', dateLabel: 'Departure Date', btn: 'Continue' },
  ko: { heading: '입국 예정', sub: '입국 공항과 출발일을 선택하세요', dateLabel: '출발 날짜', btn: '계속' },
  fr: { heading: "Détails d'entrée", sub: "Aéroport d'entrée et date de départ", dateLabel: 'Date de départ', btn: 'Continuer' },
  de: { heading: 'Einreisedetails', sub: 'Einreiseflughafen und Abreisedatum', dateLabel: 'Abreisedatum', btn: 'Weiter' },
  es: { heading: 'Detalles de entrada', sub: 'Aeropuerto de entrada y fecha de salida', dateLabel: 'Fecha de salida', btn: 'Continuar' },
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
  const t = TITLES[lang] ?? TITLES.en

  function handleNext() {
    if (!selectedPort) return
    const port = ENTRY_PORTS.find(p => p.code === selectedPort)!
    onNext(selectedPort, port.name, date)
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={5} total={7} />

      <div className="mt-4 mb-5">
        <h2 className="text-2xl font-bold text-navy">{t.heading}</h2>
        <p className="text-text-secondary text-sm mt-1">{t.sub}</p>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {ENTRY_PORTS.map(port => (
          <button
            key={port.code}
            onClick={() => setSelectedPort(port.code)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all active:opacity-70 ${
              selectedPort === port.code
                ? 'border-primary bg-primary/5'
                : 'border-transparent bg-white shadow-sm'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
              selectedPort === port.code ? 'bg-primary text-white' : 'bg-gray-100 text-navy'
            }`}>
              {port.code}
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-navy">{port.name}</div>
              <div className="text-xs text-text-secondary">{port.city}</div>
            </div>
            {selectedPort === port.code && (
              <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 mb-3">
        <label className="text-sm font-semibold text-navy mb-2 block">{t.dateLabel}</label>
        <input
          type="date"
          value={date}
          min={minDate()}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-white rounded-xl px-4 py-3 text-sm text-navy border border-gray-100 outline-none focus:border-primary"
        />
      </div>

      <button
        className={`btn-primary ${!selectedPort ? 'opacity-40 pointer-events-none' : ''}`}
        onClick={handleNext}
      >
        {t.btn}
      </button>
    </div>
  )
}
