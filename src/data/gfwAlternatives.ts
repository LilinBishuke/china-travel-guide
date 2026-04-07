// GFW blocked services and VPN recommendations — extracted from GFWGuide.tsx

export interface BlockedService {
  iconName: string
  name: string
  alt: string
}

export interface VpnRecommendation {
  name: string
  rating: number  // 1-5
  price: string
  note: string
  recommended: boolean
}

export const BLOCKED_SERVICES: BlockedService[] = [
  { iconName: 'search', name: 'Google', alt: 'Baidu（百度）' },
  { iconName: 'email', name: 'Gmail', alt: 'QQメール / 163メール' },
  { iconName: 'tv', name: 'YouTube', alt: 'iQIYI / Bilibili' },
  { iconName: 'camera', name: 'Instagram', alt: 'Weibo / RED（小红书）' },
  { iconName: 'bird', name: 'X / Twitter', alt: 'Weibo' },
  { iconName: 'chat', name: 'WhatsApp', alt: 'WeChat' },
  { iconName: 'map', name: 'Google Maps', alt: 'Baidu Maps / Gaode Maps' },
  { iconName: 'book', name: 'Facebook', alt: 'WeChat / Weibo' },
]

export const VPN_LIST: VpnRecommendation[] = [
  { name: 'ExpressVPN', rating: 5, price: '$8.32/月', note: '速度・安定性No.1', recommended: true },
  { name: 'NordVPN', rating: 4, price: '$3.99/月', note: 'コスパ良好', recommended: false },
  { name: 'Surfshark', rating: 4, price: '$2.49/月', note: '複数デバイス無制限', recommended: false },
  { name: 'Astrill VPN', rating: 5, price: '$12.50/月', note: '中国での実績が高い', recommended: true },
]

export const GFW_CHECKLIST = [
  'VPNアプリをインストール（iOS / Android）',
  'VPNを起動してテスト接続',
  'WeChat / Alipay のセットアップ完了',
  'Baidu Maps をオフラインダウンロード',
  '翻訳アプリのオフラインパック取得',
  'ホテル・連絡先をスクリーンショット保存',
]
