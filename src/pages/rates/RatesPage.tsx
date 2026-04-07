import { useState, useEffect } from 'react'
import { getProfile } from '../../store/userStore'
import { getLatestRates, convertToCNY } from '../../services/ratesService'
import type { FrankfurterResponse } from '../../api/types'
import CountryBadge from '../../components/CountryBadge'

const CURRENCIES: { code: string; name: string }[] = [
  { code: 'JPY', name: '日本円' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'KRW', name: '한국 원' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'HKD', name: 'HK Dollar' },
]

export default function RatesPage() {
  const profile = getProfile()
  const [rates, setRates] = useState<FrankfurterResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState('10000')

  const lang = profile.language ?? 'en'

  useEffect(() => {
    getLatestRates().then(data => {
      setRates(data)
      setLoading(false)
    })
  }, [])

  const LABEL: Record<string, string> = {
    ja: '為替レート', en: 'Exchange Rates', ko: '환율', fr: 'Taux de change', de: 'Wechselkurse', es: 'Tipos de cambio',
  }

  function toCNY(code: string): string {
    if (!rates) return '—'
    const input = parseFloat(amount) || 0
    const val = convertToCNY(rates, input, code)
    return val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-tab">
      <div className="px-5 pt-safe pt-6 pb-4 bg-white border-b border-gray-50">
        <h1 className="text-xl font-bold text-navy">{LABEL[lang] ?? LABEL.en}</h1>
        {rates && <p className="text-xs text-text-secondary mt-0.5">更新: {rates.date}</p>}
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">
        <div className="card p-4">
          <p className="text-xs text-text-secondary mb-2">変換する金額（自国通貨）</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="flex-1 text-2xl font-bold text-navy bg-transparent outline-none"
            />
            <span className="text-sm text-text-secondary">→ CNY</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {CURRENCIES.map(c => (
              <div key={c.code} className="card flex items-center gap-3 px-4 py-3">
                <CountryBadge code={c.code.slice(0, 2)} size="md" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{c.code}</p>
                  <p className="text-xs text-text-secondary">{c.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">¥{toCNY(c.code)}</p>
                  <p className="text-xs text-text-secondary">CNY</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-text-secondary text-center">
          Powered by Frankfurter (ECB rates) · 1時間キャッシュ
        </p>
      </div>
    </div>
  )
}
