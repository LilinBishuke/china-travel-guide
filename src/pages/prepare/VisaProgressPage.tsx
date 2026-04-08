import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getVisaProgress, saveVisaProgress } from '../../store/userStore'
import type { VisaProgress } from '../../store/userStore'
import { getProfile } from '../../store/userStore'
import Icon from '../../components/Icon'

interface Step {
  num: 1 | 2 | 3 | 4 | 5
  iconName: string
  titleJa: string
  titleEn: string
  descJa: string
  descEn: string
}

const STEPS: Step[] = [
  { num: 1, iconName: 'clipboard', titleJa: '書類準備', titleEn: 'Documents', descJa: 'パスポート・写真・申請書を準備', descEn: 'Prepare passport, photo, application form' },
  { num: 2, iconName: 'upload', titleJa: '申請提出', titleEn: 'Submit Application', descJa: '大使館 / eVisaサイトで提出', descEn: 'Submit at embassy or eVisa portal' },
  { num: 3, iconName: 'hourglass', titleJa: '審査中', titleEn: 'Under Review', descJa: '通常4〜5営業日', descEn: 'Usually 4-5 business days' },
  { num: 4, iconName: 'airplane', titleJa: 'ビザ受領', titleEn: 'Visa Received', descJa: 'ビザを受け取り内容確認', descEn: 'Receive and verify your visa' },
  { num: 5, iconName: 'visa_free', titleJa: '入国準備完了', titleEn: 'Ready to Enter', descJa: '全ての準備が整いました！', descEn: "You're all set!" },
]

export default function VisaProgressPage() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'en'
  const [progress, setProgress] = useState<Partial<VisaProgress>>(getVisaProgress())

  function setStep(step: 1 | 2 | 3 | 4 | 5) {
    const updated = { ...progress, step }
    setProgress(updated)
    saveVisaProgress(updated)
  }

  const currentStep = progress.step ?? 1

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">
          {lang === 'ja' ? 'ビザ申請の進捗' : 'Visa Application Progress'}
        </h2>
      </div>

      <div className="px-5 py-6 flex flex-col gap-4">
        <div className="card p-5 flex flex-col gap-0">
          {STEPS.map((step, idx) => {
            const done = currentStep > step.num
            const active = currentStep === step.num
            return (
              <button
                key={step.num}
                onClick={() => setStep(step.num)}
                className={`progress-step text-left ${idx < STEPS.length - 1 ? 'pb-5' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 z-10 border-2 transition-colors ${
                  done ? 'bg-primary border-primary' :
                  active ? 'border-primary bg-white' :
                  'border-gray-200 bg-white'
                }`}>
                  {done
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span className={`text-xs font-bold ${active ? 'text-primary' : 'text-gray-400'}`}>{step.num}</span>
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon name={step.iconName} size={16} color={active ? '#E8342A' : done ? '#9CA3AF' : '#1A1A2E'} />
                    <p className={`text-sm font-semibold ${active ? 'text-primary' : done ? 'text-text-secondary' : 'text-navy'}`}>
                      {lang === 'ja' ? step.titleJa : step.titleEn}
                    </p>
                    {active && <span className="chip chip-amber text-[10px]">現在</span>}
                  </div>
                  <p className={`text-xs mt-0.5 ${active ? 'text-text-secondary' : 'text-text-secondary opacity-60'}`}>
                    {lang === 'ja' ? step.descJa : step.descEn}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Visa application document checklist */}
        {currentStep <= 2 && (
          <div className="card p-4">
            <p className="text-sm font-bold text-navy mb-2">
              {lang === 'ja' ? '申請に必要な書類' : 'Required Documents'}
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { ja: 'パスポート（有効期限6ヶ月以上、空白ページ2ページ以上）', en: 'Passport (6+ months validity, 2+ blank pages)' },
                { ja: '証明写真（48mm×33mm、白背景、6ヶ月以内撮影）', en: 'Photo (48×33mm, white background, within 6 months)' },
                { ja: '申請書の記入（consular.mfa.gov.cn/VISA/）', en: 'Application form (consular.mfa.gov.cn/VISA/)' },
                { ja: '宿泊予約確認書', en: 'Hotel reservation confirmation' },
                { ja: '航空券の予約確認（往復）', en: 'Flight booking confirmation (round-trip)' },
                { ja: '大使館/領事館の予約', en: 'Embassy/consulate appointment' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-xs text-navy">{lang === 'ja' ? item.ja : item.en}</p>
                </div>
              ))}
              <p className="text-[10px] text-text-secondary mt-2">
                {lang === 'ja' ? '審査期間: 通常4〜7営業日' : 'Processing: usually 4-7 business days'}
              </p>
            </div>
          </div>
        )}

        {currentStep >= 2 && (
          <div className="card p-4">
            <label className="text-xs font-semibold text-navy mb-2 block">
              {lang === 'ja' ? '申請番号（任意）' : 'Application Number (optional)'}
            </label>
            <input
              type="text"
              value={progress.applicationNumber ?? ''}
              onChange={e => {
                const updated = { ...progress, applicationNumber: e.target.value }
                setProgress(updated)
                saveVisaProgress(updated)
              }}
              placeholder="e.g. VISA-2026-XXXXXX"
              className="w-full bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-navy outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {currentStep >= 4 && (
          <div className="card p-4 flex flex-col gap-3">
            <p className="section-header mb-0">{lang === 'ja' ? 'ビザ詳細' : 'Visa Details'}</p>
            <div>
              <label className="text-xs text-text-secondary">{lang === 'ja' ? 'ビザ種別' : 'Visa Type'}</label>
              <input type="text" value={progress.visaType ?? ''} onChange={e => { const u = { ...progress, visaType: e.target.value }; setProgress(u); saveVisaProgress(u) }} placeholder="e.g. L (Tourist)" className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm text-navy outline-none focus:ring-1 focus:ring-primary mt-1" />
            </div>
            <div>
              <label className="text-xs text-text-secondary">{lang === 'ja' ? 'ビザ有効期限' : 'Visa Expiry'}</label>
              <input type="date" value={progress.visaExpiry ?? ''} onChange={e => { const u = { ...progress, visaExpiry: e.target.value }; setProgress(u); saveVisaProgress(u) }} className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm text-navy outline-none focus:ring-1 focus:ring-primary mt-1" />
            </div>
            <div>
              <label className="text-xs text-text-secondary">{lang === 'ja' ? '滞在可能日数' : 'Stay Duration (days)'}</label>
              <input type="number" value={progress.stayDays ?? ''} onChange={e => { const u = { ...progress, stayDays: parseInt(e.target.value) }; setProgress(u); saveVisaProgress(u) }} placeholder="30" className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm text-navy outline-none focus:ring-1 focus:ring-primary mt-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
