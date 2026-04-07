import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon'
import { BLOCKED_SERVICES, VPN_LIST, GFW_CHECKLIST } from '../../data/gfwAlternatives'

const GFW_CL_KEY = 'ctg_gfw_checklist'
function getGfwChecked(): boolean[] {
  try { return JSON.parse(localStorage.getItem(GFW_CL_KEY) ?? '[]') } catch { return [] }
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-xs text-gold">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

export default function GFWGuide() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState<boolean[]>(() => {
    const saved = getGfwChecked()
    return GFW_CHECKLIST.map((_, i) => saved[i] ?? false)
  })
  function toggleGfw(i: number) {
    const next = checked.map((v, j) => j === i ? !v : v)
    setChecked(next)
    localStorage.setItem(GFW_CL_KEY, JSON.stringify(next))
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">GFWガイド</h2>
        <span className="chip chip-amber ml-auto">出発前に準備必須</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 pb-10">
        {/* Warning banner */}
        <div className="bg-warning-light border border-warning/20 rounded-card p-4 flex gap-3">
          <Icon name="visa_required" size={24} color="#F39C12" className="shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-warning">中国入国後はVPN設定不可</p>
            <p className="text-xs text-warning/80 mt-0.5 leading-relaxed">
              中国国内ではアプリストアへのアクセスも制限されます。<strong>出発前</strong>にVPNをインストール・設定してください。
            </p>
          </div>
        </div>

        {/* Blocked services */}
        <div className="card p-5">
          <p className="section-header">中国でブロックされるサービス</p>
          <div className="grid grid-cols-2 gap-2">
            {BLOCKED_SERVICES.map(s => (
              <div key={s.name} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5">
                  <Icon name={s.iconName} size={14} color="#9CA3AF" />
                  <span className="text-xs font-semibold text-navy line-through opacity-60">{s.name}</span>
                </div>
                <p className="text-xs text-success mt-1">→ {s.alt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VPN recommendations */}
        <div className="card p-5">
          <p className="section-header">おすすめVPN</p>
          <div className="flex flex-col gap-3">
            {VPN_LIST.map(vpn => (
              <div key={vpn.name} className={`flex items-center gap-3 p-3 rounded-xl ${vpn.recommended ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50'}`}>
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <Icon name="lock" size={20} color={vpn.recommended ? '#E8342A' : '#6B7280'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-navy">{vpn.name}</p>
                    {vpn.recommended && <span className="chip chip-red text-[10px]">推奨</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Stars count={vpn.rating} />
                    <span className="text-xs text-text-secondary">· {vpn.price}</span>
                  </div>
                  <p className="text-xs text-text-secondary">{vpn.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup checklist */}
        <div className="card p-5">
          <p className="section-header">出発前チェックリスト（GFW対策）</p>
          <div className="flex flex-col gap-2">
            {GFW_CHECKLIST.map((item, i) => (
              <button key={i} onClick={() => toggleGfw(i)} className="flex items-center gap-2.5 py-1.5 border-b border-gray-50 last:border-0 text-left active:opacity-70">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked[i] ? 'bg-primary border-primary' : 'border-gray-300'
                }`}>
                  {checked[i] && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p className={`text-sm ${checked[i] ? 'text-text-secondary line-through' : 'text-navy'}`}>{item}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
