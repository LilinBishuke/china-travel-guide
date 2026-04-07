import { useState } from 'react'
import StepIndicator from '../../components/StepIndicator'
import Icon from '../../components/Icon'
import type { Language, TravelStyle } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (styles: TravelStyle[]) => void
}

const TITLES: Record<Language, { heading: string; sub: string; btn: string }> = {
  ja: { heading: '旅のスタイル', sub: '複数選択できます', btn: '続ける' },
  en: { heading: 'Travel Style', sub: 'Select all that apply', btn: 'Continue' },
  ko: { heading: '여행 스타일', sub: '복수 선택 가능', btn: '계속' },
  fr: { heading: 'Style de voyage', sub: 'Sélection multiple', btn: 'Continuer' },
  de: { heading: 'Reisestil', sub: 'Mehrfachauswahl möglich', btn: 'Weiter' },
  es: { heading: 'Estilo de viaje', sub: 'Selección múltiple', btn: 'Continuar' },
}

const STYLES: { value: TravelStyle; icon: string; ja: string; en: string; ko: string; fr: string; de: string; es: string }[] = [
  { value: 'walking', icon: 'walking', ja: '徒歩・ハイキング', en: 'Walking / Hiking', ko: '도보 / 하이킹', fr: 'Marche / Randonnée', de: 'Wandern', es: 'Senderismo' },
  { value: 'cycling', icon: 'cycling', ja: 'サイクリング', en: 'Cycling', ko: '자전거', fr: 'Vélo', de: 'Radfahren', es: 'Ciclismo' },
  { value: 'motorcycle', icon: 'motorcycle', ja: 'バイク・スクーター', en: 'Motorcycle', ko: '오토바이', fr: 'Moto', de: 'Motorrad', es: 'Moto' },
  { value: 'driving', icon: 'car', ja: 'レンタカー', en: 'Self-drive', ko: '자가 운전', fr: 'Voiture', de: 'Autofahren', es: 'Conducir' },
  { value: 'tour', icon: 'bus', ja: 'グループツアー', en: 'Group Tour', ko: '패키지 투어', fr: 'Voyage organisé', de: 'Gruppenreise', es: 'Tour grupal' },
  { value: 'rail', icon: 'train', ja: '高速鉄道', en: 'High-speed Rail', ko: '고속철도', fr: 'TGV Chinois', de: 'Hochgeschwindigkeitszug', es: 'Tren de alta velocidad' },
]

export default function OB3Style({ lang, onNext }: Props) {
  const [selected, setSelected] = useState<TravelStyle[]>([])
  const t = TITLES[lang] ?? TITLES.en

  function toggle(style: TravelStyle) {
    setSelected(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    )
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={3} total={7} />

      <div className="mt-4 mb-6">
        <h2 className="text-2xl font-bold text-navy">{t.heading}</h2>
        <p className="text-text-secondary text-sm mt-1">{t.sub}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {STYLES.map(s => {
          const label = s[lang as keyof typeof s] as string ?? s.en
          const active = selected.includes(s.value)
          return (
            <button
              key={s.value}
              onClick={() => toggle(s.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-card border-2 transition-all active:opacity-70 ${
                active
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-white shadow-card'
              }`}
            >
              <Icon name={s.icon} size={36} color={active ? '#E8342A' : '#1A1A2E'} />
              <span className={`text-xs font-medium text-center ${active ? 'text-primary' : 'text-navy'}`}>
                {label}
              </span>
              {active && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <button
        className="btn-primary mt-6"
        onClick={() => onNext(selected.length > 0 ? selected : ['rail'])}
      >
        {t.btn}
      </button>
    </div>
  )
}
