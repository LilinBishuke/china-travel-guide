// Policy updates for repeat visitors — "what changed since your last trip"

export interface PolicyUpdate {
  date: string
  category: 'visa' | 'payment' | 'transport' | 'gfw' | 'other'
  title: { ja: string; en: string }
  description: { ja: string; en: string }
  impact: 'high' | 'medium' | 'low'
}

export const POLICY_UPDATES: PolicyUpdate[] = [
  {
    date: '2026-02',
    category: 'visa',
    title: { ja: 'ビザ免除対象国の拡大（50カ国）', en: 'Visa-free expanded to 50 countries' },
    description: { ja: 'カナダ・イギリスが30日ビザ免除に追加。2026年12月31日まで延長。', en: 'Canada & UK added to 30-day visa-free. Extended to Dec 31, 2026.' },
    impact: 'high',
  },
  {
    date: '2025-12',
    category: 'visa',
    title: { ja: '240時間トランジット免除が55カ国に', en: '240h transit expanded to 55 countries' },
    description: { ja: 'インドネシアが追加。省をまたいだ移動も可能に（2024年改正適用）。', en: 'Indonesia added. Cross-province travel now allowed.' },
    impact: 'high',
  },
  {
    date: '2025-11',
    category: 'visa',
    title: { ja: 'スウェーデンがビザ免除に追加', en: 'Sweden added to visa-free list' },
    description: { ja: '2025年11月10日〜2026年12月31日まで30日ビザ免除。', en: 'Nov 10, 2025 to Dec 31, 2026. 30-day visa-free.' },
    impact: 'medium',
  },
  {
    date: '2025-09',
    category: 'payment',
    title: { ja: 'Alipay国際版の機能拡張', en: 'Alipay international features expanded' },
    description: { ja: '外国カードからのチャージ上限が年間10万元に引き上げ。QRコード決済がほぼ全店舗で利用可能に。', en: 'Foreign card top-up limit raised to 100k CNY/year. QR payments available nearly everywhere.' },
    impact: 'medium',
  },
  {
    date: '2025-07',
    category: 'transport',
    title: { ja: '高速鉄道の外国人予約が簡素化', en: 'HSR booking simplified for foreigners' },
    description: { ja: 'Trip.comアプリからパスポート番号で直接予約・改札通過が可能に。紙チケット不要。', en: 'Book directly with passport on Trip.com. No paper ticket needed.' },
    impact: 'medium',
  },
  {
    date: '2025-05',
    category: 'gfw',
    title: { ja: 'VPN規制の強化', en: 'VPN restrictions tightened' },
    description: { ja: '一部の無料VPNが使用不能に。有料VPN（ExpressVPN, Astrill）は引き続き利用可能。出発前の設定が重要。', en: 'Some free VPNs blocked. Paid VPNs (ExpressVPN, Astrill) still work. Set up before departure.' },
    impact: 'high',
  },
]
