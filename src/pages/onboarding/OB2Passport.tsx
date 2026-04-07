import { useState } from 'react'
import CountryBadge from '../../components/CountryBadge'
import StepIndicator from '../../components/StepIndicator'
import { POPULAR_NATIONALITIES, checkVisaEligibility } from '../../data/visaRules'
import type { Language, TripPurpose } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (nationality: string, nationalityName: string, purpose: TripPurpose) => void
}

const PURPOSES: { value: TripPurpose; ja: string; jaDesc: string; en: string; enDesc: string }[] = [
  { value: 'tourism', ja: '観光・休暇', jaDesc: '観光、レジャー、文化体験', en: 'Tourism', enDesc: 'Sightseeing, leisure, culture' },
  { value: 'business', ja: 'ビジネス', jaDesc: '会議、出張、商談', en: 'Business', enDesc: 'Meetings, business trips' },
  { value: 'transit', ja: 'トランジット（通過）', jaDesc: '第三国への乗り継ぎ', en: 'Transit', enDesc: 'Stopover to third country' },
]

// Top 7 countries shown as quick-select badges
const TOP_COUNTRIES = POPULAR_NATIONALITIES.slice(0, 8)

export default function OB2Passport({ lang, onNext }: Props) {
  const [nationality, setNationality] = useState('')
  const [nationalityName, setNationalityName] = useState('')
  const [purpose, setPurpose] = useState<TripPurpose | ''>('')
  const [search, setSearch] = useState('')
  const isJa = lang === 'ja'

  const visaPreview = nationality && purpose
    ? checkVisaEligibility(nationality, purpose as TripPurpose)
    : null

  function getPreviewText(): string {
    if (!visaPreview || !nationalityName) return ''
    switch (visaPreview.result) {
      case 'visa_free_30':
        return isJa
          ? `${nationalityName}パスポートお持ちの方は、観光目的で30日間のビザ免除が適用されます。次のステップで詳しく確認します。`
          : `${nationalityName} passport holders are eligible for 30-day visa-free entry for tourism. Details in the next step.`
      case 'transit_240h':
        return isJa
          ? `${nationalityName}パスポートお持ちの方は、240時間のトランジットビザ免除が適用されます。`
          : `${nationalityName} passport holders are eligible for 240-hour transit visa exemption.`
      case 'evisa':
        return isJa
          ? `${nationalityName}パスポートお持ちの方は、eVisa申請が可能です。`
          : `${nationalityName} passport holders can apply for an eVisa online.`
      default:
        return isJa
          ? `${nationalityName}パスポートお持ちの方は、大使館でのビザ申請が必要です。`
          : `${nationalityName} passport holders need to apply for a visa at the embassy.`
    }
  }

  const filteredCountries = search
    ? POPULAR_NATIONALITIES.filter(n =>
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.code.toLowerCase().includes(search.toLowerCase())
      )
    : null

  function selectCountry(code: string, name: string) {
    setNationality(code)
    setNationalityName(name)
    setSearch('')
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={2} total={7} />

      <h1 className="text-2xl font-bold text-navy mt-4">
        {isJa ? '旅の情報を教えてください' : 'Tell us about your trip'}
      </h1>
      <p className="text-sm text-text-secondary mt-1">
        {isJa ? '最適なビザ情報をご案内します' : "We'll recommend the best visa option"}
      </p>

      <div className="flex flex-col gap-6 mt-6 flex-1">
        {/* Section 1: Nationality */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[13px] font-bold">1</span>
            <h2 className="text-[15px] font-semibold text-navy">
              {isJa ? 'パスポートの国籍' : 'Passport Nationality'}
            </h2>
          </div>

          {/* Search input */}
          <div className="relative mb-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder={isJa ? '国名を検索...' : 'Search country...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white rounded-xl pl-9 pr-4 py-3 text-sm text-navy placeholder-gray-400 border border-gray-100 outline-none focus:border-primary"
            />
          </div>

          {/* Country grid */}
          {filteredCountries ? (
            <div className="flex flex-wrap gap-2">
              {filteredCountries.map(c => (
                <button
                  key={c.code}
                  onClick={() => selectCountry(c.code, c.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    nationality === c.code
                      ? 'bg-primary/10 border border-primary'
                      : 'bg-white border border-gray-100'
                  }`}
                >
                  <CountryBadge code={c.code} />
                  <span className="text-[13px] text-navy">{c.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {TOP_COUNTRIES.map(c => (
                <button
                  key={c.code}
                  onClick={() => selectCountry(c.code, c.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    nationality === c.code
                      ? 'bg-primary/10 border border-primary'
                      : 'bg-white border border-gray-100'
                  }`}
                >
                  <CountryBadge code={c.code} />
                  <span className={`text-[13px] ${nationality === c.code ? 'font-semibold text-primary' : 'text-navy'}`}>
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Purpose */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[13px] font-bold">2</span>
            <h2 className="text-[15px] font-semibold text-navy">
              {isJa ? '訪問の目的' : 'Purpose of Visit'}
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {PURPOSES.map(p => (
              <button
                key={p.value}
                onClick={() => setPurpose(p.value)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  purpose === p.value
                    ? 'bg-primary/5 border-2 border-primary'
                    : 'bg-white border-2 border-transparent shadow-sm'
                }`}
              >
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${purpose === p.value ? 'text-primary' : 'text-navy'}`}>
                    {isJa ? p.ja : p.en}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {isJa ? p.jaDesc : p.enDesc}
                  </p>
                </div>
                {purpose === p.value && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Visa preview text */}
        {visaPreview && (
          <p className="text-xs text-text-secondary leading-relaxed bg-gray-50 rounded-xl p-3">
            {getPreviewText()}
          </p>
        )}
      </div>

      <button
        className={`btn-primary mt-4 ${(!nationality || !purpose) ? 'opacity-40 pointer-events-none' : ''}`}
        onClick={() => nationality && purpose && onNext(nationality, nationalityName, purpose as TripPurpose)}
      >
        {isJa ? '続ける' : 'Continue'}
      </button>
    </div>
  )
}
