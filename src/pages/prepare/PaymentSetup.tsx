import { useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon'

export default function PaymentSetup() {
  const navigate = useNavigate()

  const STEPS_WECHAT = [
    'App Storeで「WeChat」をインストール',
    '携帯番号で登録（外国番号OK）',
    '「Wallet」→「Cards」→「Add Credit/Debit Card」',
    '外国発行のVisa / Mastercardを登録',
    'QRコード決済が使えるようになる',
  ]

  const STEPS_ALIPAY = [
    'App Storeで「Alipay International」をインストール',
    'メールアドレスで登録',
    '「Add Card」から外国カードを追加',
    '本人確認（パスポート）を完了',
    '利用限度額: 年間50,000 CNY',
  ]

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <div className="px-5 pt-safe pt-4 pb-4 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-base font-semibold text-navy">決済設定ガイド</h2>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 pb-10">
        <div className="bg-primary/5 border border-primary/10 rounded-card p-4">
          <p className="text-sm font-semibold text-navy mb-1">中国は現金不要の社会</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            中国ではWeChat PayとAlipayが決済の中心。2023年より外国カードの紐付けが可能になりました。出発前に設定しておきましょう。
          </p>
        </div>

        {/* WeChat Pay */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Icon name="chat" size={22} color="#27AE60" />
            </div>
            <div>
              <p className="font-semibold text-navy">WeChat Pay</p>
              <p className="text-xs text-text-secondary">最も広く使われている決済</p>
            </div>
            <span className="chip chip-green ml-auto">推奨</span>
          </div>
          <div className="flex flex-col gap-2">
            {STEPS_WECHAT.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-navy">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alipay */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Icon name="creditcard" size={22} color="#2563EB" />
            </div>
            <div>
              <p className="font-semibold text-navy">Alipay（支付宝）</p>
              <p className="text-xs text-text-secondary">大手EC・タクシー系で主流</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {STEPS_ALIPAY.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-navy">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cash tips */}
        <div className="card p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="money" size={18} color="#F5A623" />
            <p className="section-header mb-0">現金も少額持参を</p>
          </div>
          {[
            '農村部・市場では現金のみの場合あり',
            '1,000〜2,000元程度の現金が目安',
            '空港・銀行ATMでキャッシング可能',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
              <p className="text-sm text-navy">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
