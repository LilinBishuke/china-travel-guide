import { useNavigate } from 'react-router-dom'
import CountryBadge from '../../components/CountryBadge'
import { checkVisaEligibility } from '../../data/visaRules'
import { getDaysUntilDeparture } from '../../store/userStore'
import type { Language, TripPurpose, TravelStyle, Interest } from '../../store/userStore'

interface Props {
  lang: Language
  nationality: string
  nationalityName: string
  purpose: TripPurpose
  travelStyles: TravelStyle[]
  interests: Interest[]
  departureDate: string
  onComplete: () => void
}

const STYLE_LABELS: Record<TravelStyle, string> = {
  walking: '徒歩・ハイキング',
  cycling: 'サイクリング',
  motorcycle: 'バイク・スクーター',
  driving: 'レンタカー',
  tour: 'グループツアー',
  rail: '高速鉄道',
}

const INTEREST_LABELS: Record<Interest, string> = {
  culture: '文化・歴史',
  food: 'グルメ',
  nature: '自然・絶景',
  shopping: 'ショッピング',
  entertainment: 'エンタメ・夜遊び',
  wellness: 'ウェルネス・スパ',
}

export default function OB7SetupComplete({
  lang, nationality, nationalityName, purpose, travelStyles, interests, departureDate, onComplete,
}: Props) {
  const navigate = useNavigate()
  const isJa = lang === 'ja'
  const visa = checkVisaEligibility(nationality, purpose)
  const days = departureDate ? getDaysUntilDeparture(departureDate) : null

  const visaLabel = visa?.result === 'visa_free_30' ? '30日ビザ免除'
    : visa?.result === 'transit_240h' ? '240h免除'
    : visa?.result === 'evisa' ? 'eVisa'
    : 'ビザ要'

  const purposeLabel = purpose === 'tourism' ? '観光' : purpose === 'business' ? 'ビジネス' : 'トランジット'

  function handleSetupVPN() {
    onComplete()
    navigate('/prepare/gfw', { replace: true })
  }

  function handleGoToPrepare() {
    onComplete()
    navigate('/prepare', { replace: true })
  }

  function handleSkip() {
    onComplete()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-navy">
            {isJa ? 'セットアップ完了！' : 'Setup Complete!'}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {isJa ? '中国への旅の準備を始めましょう' : "Let's start preparing for your trip to China"}
          </p>
        </div>

        {/* Profile summary card */}
        <div className="card p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-navy">
            {isJa ? 'あなたのプロフィール' : 'Your Profile'}
          </p>

          <div className="flex flex-col gap-2.5">
            {/* Route */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#E8342A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-1.5">
                <CountryBadge code={nationality} size="md" />
                <span className="text-sm font-medium text-navy">
                  {nationalityName} → 中国（{purposeLabel}・{visaLabel}）
                </span>
              </div>
            </div>

            {/* Departure */}
            {departureDate && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#E8342A" strokeWidth="2"/>
                    <path d="M3 9h18M8 2v4M16 2v4" stroke="#E8342A" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-navy">
                  出発 {departureDate.replace(/-/g, '年').replace(/年(\d{2})$/, '月$1日')}
                  {days !== null ? `（${days}日後）` : ''}
                </span>
              </div>
            )}

            {/* Travel styles */}
            {travelStyles.length > 0 && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E8342A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-navy">
                  {travelStyles.map(s => STYLE_LABELS[s]).join('、')}
                </span>
              </div>
            )}

            {/* Interests */}
            {interests.length > 0 && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="#E8342A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-navy">
                  {interests.map(i => INTEREST_LABELS[i]).join('、')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Urgent action */}
        <div className="card p-4 mt-4 border-l-4 border-warning">
          <p className="text-sm font-bold text-navy">
            {isJa ? '今すぐ対応が必要' : 'Action Required'}
          </p>
          <p className="text-[13px] text-text-secondary mt-1">
            VPN設定（出発90日前・期限超過）
          </p>
          <button
            className="mt-3 w-full py-2.5 bg-warning/10 text-warning font-semibold text-sm rounded-xl active:opacity-70 transition-opacity"
            onClick={handleSetupVPN}
          >
            {isJa ? '今すぐ設定する' : 'Set Up Now'}
          </button>
        </div>

        {/* Info */}
        <p className="text-[13px] font-medium text-text-secondary text-center mt-5">
          {isJa ? '準備リストで残りのタスクを管理できます' : 'Manage remaining tasks in the preparation list'}
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mt-6">
        <button className="btn-primary" onClick={handleGoToPrepare}>
          {isJa ? '準備リストを見る' : 'View Preparation List'}
        </button>
        <button
          className="w-full py-3 text-sm font-medium text-text-secondary active:opacity-70 transition-opacity"
          onClick={handleSkip}
        >
          {isJa ? '後で確認する' : 'Check Later'}
        </button>
      </div>
    </div>
  )
}
