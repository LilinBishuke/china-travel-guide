import { useState } from 'react'
import StepIndicator from '../../components/StepIndicator'
import Icon from '../../components/Icon'
import type { Language, Interest } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (interests: Interest[]) => void
}

const TITLES: Record<Language, { heading: string; sub: string; btn: string }> = {
  ja: { heading: '興味・関心', sub: 'おすすめスポットに反映されます', btn: '続ける' },
  en: { heading: 'Your Interests', sub: "We'll personalize recommendations", btn: 'Continue' },
  ko: { heading: '관심사', sub: '맞춤 추천에 반영됩니다', btn: '계속' },
  fr: { heading: 'Vos intérêts', sub: 'Pour personnaliser vos recommandations', btn: 'Continuer' },
  de: { heading: 'Ihre Interessen', sub: 'Für personalisierte Empfehlungen', btn: 'Weiter' },
  es: { heading: 'Sus intereses', sub: 'Para personalizar recomendaciones', btn: 'Continuar' },
}

const INTERESTS: { value: Interest; icon: string; ja: string; en: string; ko: string; fr: string; de: string; es: string }[] = [
  { value: 'culture', icon: 'culture', ja: '文化・歴史', en: 'Culture & History', ko: '문화/역사', fr: 'Culture', de: 'Kultur', es: 'Cultura' },
  { value: 'food', icon: 'food', ja: 'グルメ', en: 'Food & Drink', ko: '음식', fr: 'Gastronomie', de: 'Essen', es: 'Gastronomía' },
  { value: 'nature', icon: 'nature', ja: '自然・絶景', en: 'Nature & Scenery', ko: '자연', fr: 'Nature', de: 'Natur', es: 'Naturaleza' },
  { value: 'shopping', icon: 'shopping', ja: 'ショッピング', en: 'Shopping', ko: '쇼핑', fr: 'Shopping', de: 'Einkaufen', es: 'Compras' },
  { value: 'entertainment', icon: 'entertainment', ja: 'エンタメ・夜遊び', en: 'Entertainment', ko: '엔터테인먼트', fr: 'Divertissement', de: 'Unterhaltung', es: 'Entretenimiento' },
  { value: 'wellness', icon: 'wellness', ja: 'ウェルネス・スパ', en: 'Wellness & Spa', ko: '웰니스', fr: 'Bien-être', de: 'Wellness', es: 'Bienestar' },
]

export default function OB6Interests({ lang, onNext }: Props) {
  const [selected, setSelected] = useState<Interest[]>([])
  const t = TITLES[lang] ?? TITLES.en

  function toggle(interest: Interest) {
    setSelected(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={6} total={7} />

      <div className="mt-4 mb-6">
        <h2 className="text-2xl font-bold text-navy">{t.heading}</h2>
        <p className="text-text-secondary text-sm mt-1">{t.sub}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {INTERESTS.map(item => {
          const label = item[lang as keyof typeof item] as string ?? item.en
          const active = selected.includes(item.value)
          return (
            <button
              key={item.value}
              onClick={() => toggle(item.value)}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-card border-2 transition-all active:opacity-70 min-h-[100px] ${
                active
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-white shadow-card'
              }`}
            >
              <Icon name={item.icon} size={36} color={active ? '#E8342A' : '#1A1A2E'} />
              <span className={`text-xs font-medium text-center leading-tight ${active ? 'text-primary' : 'text-navy'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>

      <button
        className="btn-primary mt-6"
        onClick={() => onNext(selected.length > 0 ? selected : ['culture'])}
      >
        {t.btn}
      </button>
    </div>
  )
}
