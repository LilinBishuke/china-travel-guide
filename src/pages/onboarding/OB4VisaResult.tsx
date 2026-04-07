import StepIndicator from '../../components/StepIndicator'
import CountryBadge from '../../components/CountryBadge'
import Icon from '../../components/Icon'
import { checkVisaEligibility } from '../../data/visaRules'
import type { Language, TripPurpose } from '../../store/userStore'

interface Props {
  lang: Language
  nationality: string
  nationalityName: string
  purpose: TripPurpose
  onNext: () => void
}

export default function OB4VisaResult({ lang, nationality, nationalityName, purpose, onNext }: Props) {
  const isJa = lang === 'ja'
  const visa = checkVisaEligibility(nationality, purpose)

  const resultConfig = {
    visa_free_30: {
      iconName: 'visa_free', iconColor: '#27AE60',
      bg: 'bg-success-light',
      title: isJa ? 'ビザ免除（30日間）' : 'Visa-Free (30 days)',
      sub: isJa ? '事前のビザ申請は不要です' : 'No advance visa application needed',
    },
    transit_240h: {
      iconName: 'visa_transit', iconColor: '#27AE60',
      bg: 'bg-success-light',
      title: isJa ? '乗り継ぎビザ免除（240時間）' : 'Transit Visa-Free (240h)',
      sub: isJa ? '第三国への出発チケットが必要です' : 'Onward ticket to third country required',
    },
    evisa: {
      iconName: 'visa_evisa', iconColor: '#2563EB',
      bg: 'bg-blue-50',
      title: isJa ? 'eVisa申請が可能' : 'eVisa Available',
      sub: isJa ? 'オンラインでビザ申請できます' : 'You can apply for a visa online',
    },
    visa_required: {
      iconName: 'visa_required', iconColor: '#F39C12',
      bg: 'bg-warning-light',
      title: isJa ? 'ビザ申請が必要' : 'Visa Required',
      sub: isJa ? '大使館・領事館に申請してください' : 'Apply at the embassy or consulate',
    },
  }

  const config = resultConfig[visa.result]
  const purposeLabel = purpose === 'tourism' ? (isJa ? '観光・休暇' : 'Tourism')
    : purpose === 'business' ? (isJa ? 'ビジネス' : 'Business')
    : isJa ? 'トランジット' : 'Transit'

  return (
    <div className="flex flex-col min-h-screen px-6 py-6">
      <StepIndicator current={4} total={7} />

      <div className="flex-1 flex flex-col gap-5 mt-6">
        {/* Result card */}
        <div className={`rounded-card p-5 ${config.bg}`}>
          <div className="flex items-start gap-3">
            <Icon name={config.iconName} size={28} color={config.iconColor} />
            <div>
              <p className="text-base font-bold text-navy">{config.title}</p>
              <p className="text-xs text-text-secondary mt-1">{config.sub}</p>
            </div>
          </div>
        </div>

        {/* User info */}
        <div className="card p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CountryBadge code={nationality} size="md" />
            <span className="text-sm font-medium text-navy">{nationalityName}</span>
            <span className="text-xs text-text-secondary">· {purposeLabel}</span>
          </div>
          {visa.policyExpiry && (
            <p className="text-xs text-text-secondary">
              {isJa ? `ポリシー有効期限: ${visa.policyExpiry}` : `Policy valid until: ${visa.policyExpiry}`}
            </p>
          )}
        </div>

        {/* Notes */}
        {visa.notes && visa.notes.length > 0 && (
          <div className="card p-4">
            <p className="text-sm font-semibold text-navy mb-2">
              {isJa ? '注意事項' : 'Important Notes'}
            </p>
            <div className="flex flex-col gap-1.5">
              {visa.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-xs text-text-secondary leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="btn-primary mt-4" onClick={onNext}>
        {isJa ? '続ける' : 'Continue'}
      </button>
    </div>
  )
}
