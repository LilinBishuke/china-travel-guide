import { useNavigate } from 'react-router-dom'
import { getProfile, getChecklist, saveChecklist, getDaysUntilDeparture } from '../../store/userStore'
import { checkVisaEligibility } from '../../data/visaRules'
import { useState, useEffect } from 'react'
import CountryBadge from '../../components/CountryBadge'
import Icon from '../../components/Icon'

const CHECKLIST_LABELS: Record<string, Record<string, string>> = {
  ja: {
    passport: 'パスポート確認済み（有効）', visa: 'ビザ状況を確認', wechat: 'WeChatをダウンロード',
    style: '旅行スタイルを選択', vpn: 'VPNを設定する', alipay: 'Alipayを設定',
    offline_map: 'オフラインマップを準備', emergency: '緊急連絡先を保存',
    esim: 'eSIM / SIMフリー端末を確認', currency: '人民元（CNY）を両替', insurance: '旅行保険を手配',
    onward_ticket: '第三国への出発チケットを確保',
  },
  en: {
    passport: 'Passport verified (valid)', visa: 'Check visa status', wechat: 'Download WeChat',
    style: 'Choose travel style', vpn: 'Set up VPN', alipay: 'Set up Alipay',
    offline_map: 'Prepare offline maps', emergency: 'Save emergency contacts',
    esim: 'Check eSIM / unlocked phone', currency: 'Exchange CNY', insurance: 'Arrange travel insurance',
    onward_ticket: 'Secure onward flight ticket',
  },
}

// Items that show urgency badges
const URGENT_ITEMS = new Set(['vpn'])

interface RateCache {
  jpy_to_cny: number
  change: number
  ts: number
}

export default function PrepareMain() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'ja'
  const isJa = lang === 'ja'

  const [rate, setRate] = useState<RateCache | null>(null)

  const clLabels = CHECKLIST_LABELS[lang] ?? CHECKLIST_LABELS.en
  const days = profile.departureDate ? getDaysUntilDeparture(profile.departureDate) : null

  const visaInfo = profile.nationality && profile.tripPurpose
    ? checkVisaEligibility(profile.nationality, profile.tripPurpose)
    : null

  // Adapt checklist based on visa type
  const [items, setItems] = useState(() => {
    const base = getChecklist()
    if (visaInfo?.result === 'visa_free_30') {
      return base.filter(i => i.id !== 'visa')
    }
    if (visaInfo?.result === 'transit_240h') {
      const has = base.some(i => i.id === 'onward_ticket')
      if (!has) return [...base.filter(i => i.id !== 'visa'), { id: 'onward_ticket', done: false }]
    }
    return base
  })
  const doneCount = items.filter(i => i.done).length
  const progress = Math.round((doneCount / items.length) * 100)

  const visaLabel = visaInfo?.result === 'visa_free_30' ? 'ビザ免除'
    : visaInfo?.result === 'transit_240h' ? '240h免除'
    : visaInfo?.result === 'evisa' ? 'eVisa'
    : 'ビザ要'

  // Fetch exchange rate via service
  useEffect(() => {
    import('../../services/ratesService').then(({ getJpyCnyRate }) =>
      getJpyCnyRate().then(r => {
        if (r) setRate({ jpy_to_cny: r.value, change: 0.001, ts: Date.now() })
      })
    )
  }, [])

  function toggleItem(id: string) {
    const updated = items.map(i => i.id === id ? { ...i, done: !i.done } : i)
    setItems(updated)
    saveChecklist(updated)
  }

  // First incomplete task
  const nextTask = items.find(i => !i.done)

  // Greeting based on time + language
  const hour = new Date().getHours()
  const greetings: Record<string, [string, string, string]> = {
    ja: ['おはようございます', 'こんにちは', 'こんばんは'],
    en: ['Good morning', 'Good afternoon', 'Good evening'],
    ko: ['좋은 아침이에요', '안녕하세요', '좋은 저녁이에요'],
    fr: ['Bonjour', 'Bon après-midi', 'Bonsoir'],
    de: ['Guten Morgen', 'Guten Tag', 'Guten Abend'],
    es: ['Buenos días', 'Buenas tardes', 'Buenas noches'],
  }
  const g = greetings[lang] ?? greetings.en
  const greeting = hour < 12 ? g[0] : hour < 18 ? g[1] : g[2]

  // Format departure date nicely
  function formatDate(iso: string): string {
    const [y, m, d] = iso.split('-')
    return `${y}年${parseInt(m)}月${parseInt(d)}日`
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-tab bg-bg-app">
      {/* Header section */}
      <div className="px-5 pt-safe pt-5 pb-4 bg-white">
        {/* Greeting + profile icon */}
        <div className="flex items-center gap-2">
          <p className="text-[13px] text-text-secondary flex-1">{greeting}、旅人さん</p>
          {profile.nationality && <CountryBadge code={profile.nationality} />}
          <button onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:opacity-70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="#1A1A2E" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
        <h1 className="text-xl font-bold text-navy mt-1">
          {isJa ? '旅の準備を始めましょう' : 'Start preparing for your trip'}
        </h1>

        {/* Departure countdown + info */}
        {days !== null && profile.departureDate && (
          <div className="mt-4 bg-gray-50 rounded-card p-4">
            <div className="flex items-end gap-1">
              <span className="text-[13px] font-medium text-text-secondary">出発まで</span>
            </div>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-[48px] font-extrabold text-navy leading-none">{days}</span>
              <span className="text-[11px] text-text-secondary mb-2">日</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-medium text-text-secondary">出発日</span>
              <span className="text-[13px] font-bold text-navy">{formatDate(profile.departureDate)}</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {formatDate(profile.departureDate)} → {profile.entryPortName ?? '未設定'}
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-text-secondary">準備の進捗</span>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <p className="text-[10px] text-text-secondary mt-1">{doneCount} / {items.length} タスク完了</p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Visa status card */}
        {visaInfo && (
          <button
            onClick={() => navigate('/prepare/visa')}
            className="card p-4 flex items-center gap-3 active:opacity-70 transition-opacity"
          >
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[10px] font-semibold text-text-secondary">ビザ状況</span>
              <span className="text-[13px] font-bold text-navy">{visaLabel}</span>
              {visaInfo.result === 'visa_free_30' && (
                <span className="text-xs font-semibold text-success">30日間</span>
              )}
              {visaInfo.policyExpiry && (
                <span className="text-[10px] text-text-secondary">
                  {formatDate(visaInfo.policyExpiry)}まで有効
                </span>
              )}
            </div>
            <svg className="text-gray-300 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Next task highlight */}
        {nextTask && (
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold text-text-secondary">次のタスク</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy">{clLabels[nextTask.id] ?? nextTask.id}</span>
              {URGENT_ITEMS.has(nextTask.id) && (
                <span className="chip chip-red text-[9px] font-bold px-1.5 py-0.5">期限超過</span>
              )}
            </div>
          </div>
        )}

        {/* Pre-departure Timeline */}
        {days !== null && days > 0 && (
          <div className="card p-4">
            <p className="text-[13px] font-bold text-navy mb-3">出発前タイムライン</p>
            <div className="flex flex-col gap-0">
              {[
                { d: 90, label: 'VPN設定・アプリ準備', ids: ['vpn'] },
                { d: 60, label: 'ビザ申請（必要な場合）', ids: ['visa'] },
                { d: 30, label: 'WeChat / Alipay 設定', ids: ['wechat', 'alipay'] },
                { d: 14, label: 'eSIM購入・保険加入', ids: ['esim', 'insurance'] },
                { d: 7, label: 'オフラインマップ・両替', ids: ['offline_map', 'currency'] },
                { d: 1, label: '最終確認・緊急連絡先保存', ids: ['emergency'] },
              ].map((milestone, idx, arr) => {
                const past = days <= milestone.d
                const active = idx === 0 ? days <= milestone.d : days <= milestone.d && days > (arr[idx - 1]?.d ?? 0)
                const allDone = milestone.ids.every(id => items.find(i => i.id === id)?.done)
                return (
                  <div key={milestone.d} className="flex gap-3 relative">
                    {idx < arr.length - 1 && (
                      <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-gray-100" />
                    )}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      allDone ? 'bg-success' : active ? 'bg-primary' : past ? 'bg-warning' : 'bg-gray-200'
                    }`}>
                      {allDone ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : (
                        <span className="text-[8px] font-bold text-white">{milestone.d}</span>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-semibold ${active ? 'text-primary' : allDone ? 'text-success' : 'text-navy'}`}>
                          {milestone.d}日前
                        </p>
                        {active && !allDone && <span className="chip chip-amber text-[8px] px-1.5 py-0">今</span>}
                      </div>
                      <p className={`text-[11px] mt-0.5 ${allDone ? 'text-text-secondary line-through' : 'text-text-secondary'}`}>
                        {milestone.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Checklist */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-navy">チェックリスト</h2>
            <span className="text-xs text-text-secondary">{doneCount}/{items.length} 完了</span>
          </div>

          <div className="flex flex-col gap-0.5">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex items-center gap-3 py-2.5 text-left active:opacity-70 border-b border-gray-50 last:border-0"
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  item.done ? 'bg-primary border-primary' : 'border-gray-300'
                }`}>
                  {item.done && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[13px] ${item.done ? 'text-text-secondary line-through' : 'text-navy'}`}>
                  {clLabels[item.id] ?? item.id}
                </span>
                {!item.done && URGENT_ITEMS.has(item.id) && (
                  <span className="chip chip-red text-[9px] font-bold px-1.5 py-0.5 ml-auto">緊急</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Exchange rate widget */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[13px] font-semibold text-navy">為替レート</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success-light text-success text-[9px] font-bold">LIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-text-secondary">100円</span>
            <span className="text-lg font-extrabold text-navy">
              = {rate ? rate.jpy_to_cny.toFixed(2) : '—'}元
            </span>
          </div>
          {rate && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs font-bold text-success">+{rate.change.toFixed(3)}</span>
              <span className="text-[10px] text-text-secondary">前日比</span>
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="flex gap-3">
          {[
            { iconName: 'cloud', label: '天気', url: 'https://www.accuweather.com/en/cn/china-weather' },
            { iconName: 'map', label: '地図', url: 'https://maps.me/' },
            { iconName: 'translate', label: '翻訳', url: 'https://www.deepl.com/translator' },
          ].map(btn => (
            <button key={btn.label} onClick={() => window.open(btn.url, '_blank')} className="flex-1 card py-3 flex flex-col items-center gap-1.5 active:opacity-70 transition-opacity">
              <Icon name={btn.iconName} size={22} color="#1A1A2E" />
              <span className="text-[11px] font-medium text-navy">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Reminder */}
        <div className="card p-4 border-l-4 border-primary">
          <p className="text-xs font-semibold text-navy">次のリマインダー：{(() => {
            const d = new Date()
            d.setDate(d.getDate() + 30)
            return `${d.getMonth() + 1}月${d.getDate()}日`
          })()}</p>
          <p className="text-[11px] text-text-secondary mt-0.5">VPNの設定状況を確認してください</p>
        </div>
      </div>
    </div>
  )
}
