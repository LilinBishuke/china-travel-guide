import { useNavigate } from 'react-router-dom'
import { getProfile } from '../../store/userStore'
import Icon from '../../components/Icon'
import { EMERGENCY_NUMBERS, EMBASSIES, MEDICAL_INFO } from '../../data/emergencyContacts'

export default function EmergencyContacts() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'en'
  const nationality = profile.nationality ?? ''
  const embassy = EMBASSIES[nationality]

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">
          {lang === 'ja' ? '緊急連絡先' : 'Emergency Contacts'}
        </h2>
        <span className="chip chip-red ml-auto">オフライン保存済</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 pb-10">
        {/* Emergency numbers */}
        <div className="card p-5">
          <p className="section-header">{lang === 'ja' ? '中国の緊急番号' : 'China Emergency Numbers'}</p>
          <div className="grid grid-cols-2 gap-3">
            {EMERGENCY_NUMBERS.map(e => (
              <a
                key={e.number}
                href={`tel:${e.number}`}
                className="bg-primary/5 rounded-xl p-4 flex flex-col gap-1.5 active:bg-primary/10 transition-colors"
              >
                <Icon name={e.iconName} size={24} color="#E8342A" />
                <p className="text-sm font-semibold text-navy">{e.label}</p>
                <p className="text-xl font-bold text-primary">{e.number}</p>
                <p className="text-xs text-text-secondary">{e.note}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Embassy */}
        {embassy ? (
          <div className="card p-5">
            <p className="section-header">{lang === 'ja' ? '自国大使館' : 'Your Embassy'}</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Icon name="embassy" size={24} color="#1A1A2E" />
                <div>
                  <p className="text-sm font-semibold text-navy">{embassy.name}</p>
                  <p className="text-xs text-text-secondary">{embassy.city}</p>
                </div>
              </div>
              <a
                href={`tel:${embassy.tel}`}
                className="flex items-center gap-3 bg-primary/5 rounded-xl px-4 py-3 active:bg-primary/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 010 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" stroke="#E8342A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-semibold text-primary">{embassy.tel}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="card p-4">
            <p className="text-sm text-text-secondary">
              {lang === 'ja' ? '大使館情報はオンボーディングで国籍を選択すると表示されます' : 'Set your nationality in onboarding to see embassy info'}
            </p>
          </div>
        )}

        {/* Health tips */}
        <div className="card p-5">
          <p className="section-header">{lang === 'ja' ? '医療・健康情報' : 'Medical Info'}</p>
          {MEDICAL_INFO.map(item => (
            <div key={item.title} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <Icon name={item.iconName} size={20} color="#1A1A2E" className="mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy">{item.title}</p>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
