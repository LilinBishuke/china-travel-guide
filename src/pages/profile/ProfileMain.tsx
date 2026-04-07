import { useNavigate } from 'react-router-dom'
import { getProfile, getDaysUntilDeparture } from '../../store/userStore'
import { checkVisaEligibility } from '../../data/visaRules'
import Icon from '../../components/Icon'

const STYLE_LABELS: Record<string, string> = {
  walking: '徒歩・ハイキング', cycling: 'サイクリング', motorcycle: 'バイク・スクーター',
  driving: 'レンタカー', tour: 'グループツアー', rail: '高速鉄道',
}
const INTEREST_LABELS: Record<string, string> = {
  culture: '文化・歴史', food: 'グルメ', nature: '自然・絶景',
  shopping: 'ショッピング', entertainment: 'エンタメ', wellness: 'ウェルネス',
}
const LANG_LABELS: Record<string, string> = {
  ja: '日本語', en: 'English', ko: '한국어', fr: 'Français', de: 'Deutsch', es: 'Español',
}

export default function ProfileMain() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'en'
  const isJa = lang === 'ja'

  const visa = profile.nationality && profile.tripPurpose
    ? checkVisaEligibility(profile.nationality, profile.tripPurpose)
    : null

  const visaLabel = visa?.result === 'visa_free_30' ? 'ビザ免除 30日'
    : visa?.result === 'transit_240h' ? '240h免除'
    : visa?.result === 'evisa' ? 'eVisa'
    : 'ビザ要'

  const days = profile.departureDate ? getDaysUntilDeparture(profile.departureDate) : null

  function clearCache() {
    const keys = ['ctg_rates', 'ctg_weather', 'ctg_rate_jpy', 'ctg_rates_cache']
    keys.forEach(k => localStorage.removeItem(k))
    if ('caches' in window) {
      caches.keys().then(names => names.forEach(n => caches.delete(n)))
    }
    alert(isJa ? 'キャッシュをクリアしました' : 'Cache cleared')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">{isJa ? 'プロフィール' : 'Profile'}</h2>
        <button
          onClick={() => navigate('/profile/edit')}
          className="ml-auto text-primary text-sm font-semibold"
        >
          {isJa ? '編集' : 'Edit'}
        </button>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        {/* User card */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              {profile.nationality
                ? <span className="text-white text-sm font-bold">{profile.nationality}</span>
                : <Icon name="walking" size={24} color="white" />
              }
            </div>
            <div>
              <p className="text-base font-bold text-navy">{profile.nationalityName ?? 'Traveler'}</p>
              <p className="text-xs text-text-secondary">{LANG_LABELS[lang] ?? lang}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Visa */}
            {visa && (
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Icon name="visa_free" size={18} color="#6B7280" className="shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">{isJa ? 'ビザ状況' : 'Visa Status'}</p>
                  <p className="text-sm font-medium text-navy">{visaLabel}</p>
                </div>
              </div>
            )}

            {/* Departure */}
            {profile.departureDate && (
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Icon name="calendar" size={18} color="#6B7280" className="shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">{isJa ? '出発日' : 'Departure'}</p>
                  <p className="text-sm font-medium text-navy">
                    {profile.departureDate}{days !== null ? ` (${days}${isJa ? '日後' : ' days'})` : ''}
                  </p>
                </div>
              </div>
            )}

            {/* Entry port */}
            {profile.entryPortName && (
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Icon name="airplane" size={18} color="#6B7280" className="shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">{isJa ? '入国空港' : 'Entry Port'}</p>
                  <p className="text-sm font-medium text-navy">{profile.entryPortName}</p>
                </div>
              </div>
            )}

            {/* Travel styles */}
            {profile.travelStyles && profile.travelStyles.length > 0 && (
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Icon name="train" size={18} color="#6B7280" className="shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">{isJa ? '旅行スタイル' : 'Travel Style'}</p>
                  <p className="text-sm font-medium text-navy">
                    {profile.travelStyles.map(s => STYLE_LABELS[s] ?? s).join('、')}
                  </p>
                </div>
              </div>
            )}

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="flex items-center gap-3 py-2">
                <Icon name="culture" size={18} color="#6B7280" className="shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">{isJa ? '興味・関心' : 'Interests'}</p>
                  <p className="text-sm font-medium text-navy">
                    {profile.interests.map(i => INTEREST_LABELS[i] ?? i).join('、')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="card p-4 flex flex-col gap-0">
          <button onClick={clearCache} className="flex items-center gap-3 py-3 border-b border-gray-50 active:opacity-70">
            <Icon name="globe" size={18} color="#6B7280" />
            <span className="text-sm text-navy flex-1 text-left">{isJa ? 'キャッシュをクリア' : 'Clear Cache'}</span>
            <svg className="text-gray-300" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-3 py-3">
            <Icon name="lock" size={18} color="#6B7280" />
            <span className="text-sm text-navy flex-1">{isJa ? 'バージョン' : 'Version'}</span>
            <span className="text-xs text-text-secondary">0.1.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
