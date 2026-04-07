import { useState } from 'react'
import CountryBadge from '../../components/CountryBadge'
import type { Language } from '../../store/userStore'

interface Props {
  onNext: (lang: Language) => void
}

const LANGUAGES: { code: Language; badge: string; label: string }[] = [
  { code: 'en', badge: 'EN', label: 'English' },
  { code: 'ja', badge: 'JA', label: '日本語' },
  { code: 'ko', badge: 'KO', label: '한국어' },
  { code: 'fr', badge: 'FR', label: 'Français' },
  { code: 'de', badge: 'DE', label: 'Deutsch' },
  { code: 'es', badge: 'ES', label: 'Español' },
]

export default function OB1Welcome({ onNext }: Props) {
  const [lang, setLang] = useState<Language>('ja')

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-12">
      <div />

      <div className="flex flex-col items-center gap-5 text-center">
        {/* Title */}
        <h1 className="text-[28px] font-bold text-navy">China Travel Guide</h1>
        <p className="text-[15px] font-light text-text-secondary">
          中国旅行のすべてがわかるコンパニオンアプリ
        </p>

        {/* Feature pills */}
        <div className="flex gap-2 mt-2">
          {['Safe', 'Offline', '10 languages'].map(f => (
            <span key={f} className="text-[11px] font-medium text-navy bg-gray-100 px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        {/* Language selection */}
        <div className="mt-6 w-full">
          <p className="text-[17px] font-semibold text-navy mb-4">言語を選んでください</p>
          <div className="flex flex-col gap-2">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  lang === l.code
                    ? 'bg-primary/5 border-2 border-primary'
                    : 'bg-white border-2 border-transparent shadow-sm'
                }`}
              >
                <CountryBadge code={l.badge} size="md" />
                <span className={`text-[13px] ${lang === l.code ? 'font-semibold text-primary' : 'font-medium text-navy'}`}>
                  {l.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="btn-primary w-full" onClick={() => onNext(lang)}>
        はじめる
      </button>
    </div>
  )
}
