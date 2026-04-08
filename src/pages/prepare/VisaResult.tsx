import { useNavigate } from 'react-router-dom'
import { getProfile } from '../../store/userStore'
import { checkVisaEligibility } from '../../data/visaRules'
import Icon from '../../components/Icon'

export default function VisaResult() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'en'

  const nationality = profile.nationality ?? ''
  const nationalityName = profile.nationalityName ?? ''
  const purpose = profile.tripPurpose ?? 'tourism'
  const visa = checkVisaEligibility(nationality, purpose)

  const resultConfig = {
    visa_free_30: {
      iconName: 'visa_free', iconColor: '#27AE60',
      color: 'bg-success-light text-success',
      title: lang === 'ja' ? 'ビザ免除（30日間）' : 'Visa-Free (30 days)',
      sub: lang === 'ja' ? '事前のビザ申請は不要です' : 'No advance visa application needed',
    },
    transit_240h: {
      iconName: 'visa_transit', iconColor: '#27AE60',
      color: 'bg-success-light text-success',
      title: lang === 'ja' ? '乗り継ぎビザ免除（240時間）' : 'Transit Visa-Free (240h)',
      sub: lang === 'ja' ? '第三国への出発チケットが必要です' : 'Onward ticket to third country required',
    },
    evisa: {
      iconName: 'visa_evisa', iconColor: '#2563EB',
      color: 'bg-blue-50 text-blue-600',
      title: lang === 'ja' ? 'eVisa申請が可能' : 'eVisa Available',
      sub: lang === 'ja' ? 'オンラインでビザ申請できます' : 'You can apply for a visa online',
    },
    visa_required: {
      iconName: 'visa_required', iconColor: '#F39C12',
      color: 'bg-warning-light text-warning',
      title: lang === 'ja' ? 'ビザ申請が必要' : 'Visa Required',
      sub: lang === 'ja' ? '大使館・領事館に申請してください' : 'Apply at the embassy or consulate',
    },
  }

  const config = resultConfig[visa.result]

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">
          {lang === 'ja' ? 'ビザ情報' : 'Visa Information'}
        </h2>
      </div>

      <div className="px-5 py-6 flex flex-col gap-5">
        <div className="card p-5">
          <div className="flex items-start gap-4">
            <Icon name={config.iconName} size={32} color={config.iconColor} />
            <div className="flex-1">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-2 ${config.color}`}>
                {config.title}
              </div>
              <p className="text-sm text-text-secondary">{config.sub}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="chip chip-blue">{nationalityName}</span>
                <span className="chip chip-blue">
                  {purpose === 'tourism' ? (lang === 'ja' ? '観光' : 'Tourism') :
                   purpose === 'business' ? (lang === 'ja' ? 'ビジネス' : 'Business') :
                   lang === 'ja' ? 'トランジット' : 'Transit'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {visa.policyExpiry && (
          <div className="card px-4 py-3 flex items-center gap-3">
            <Icon name="calendar" size={20} color="#1A1A2E" />
            <div>
              <p className="text-xs text-text-secondary">
                {lang === 'ja' ? 'ポリシー有効期限' : 'Policy valid until'}
              </p>
              <p className="text-sm font-semibold text-navy">{visa.policyExpiry}</p>
            </div>
          </div>
        )}

        {visa.notes && visa.notes.length > 0 && (
          <div className="card p-5">
            <p className="section-header">{lang === 'ja' ? '注意事項' : 'Important Notes'}</p>
            <div className="flex flex-col gap-2">
              {visa.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-navy leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-50 rounded-card px-4 py-3">
          <p className="text-[11px] text-text-secondary leading-relaxed">
            {lang === 'ja'
              ? 'この情報は2026年4月時点のものです。ビザポリシーは予告なく変更される可能性があります。渡航前に必ず公式サイトで最新情報をご確認ください。'
              : 'This information is as of April 2026. Visa policies may change without notice. Please verify with the official source before travel.'}
          </p>
          <a
            href="https://en.nia.gov.cn/n147418/n147463/c183390/content.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-primary font-medium mt-1 inline-block"
          >
            {lang === 'ja' ? '中国国家移民管理局 公式サイト →' : 'Official NIA Website →'}
          </a>
        </div>

        {(visa.result === 'evisa' || visa.result === 'visa_required') && (
          <button
            onClick={() => navigate('/prepare/visa-progress')}
            className="btn-primary"
          >
            {lang === 'ja' ? '申請進捗を記録する' : 'Track Application Progress'}
          </button>
        )}
      </div>
    </div>
  )
}
