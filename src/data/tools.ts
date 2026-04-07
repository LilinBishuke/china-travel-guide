// Tools list — extracted from ToolsPage.tsx

export interface ToolItem {
  id: string
  iconName: string
  title: string
  desc: string
  tag: string
  route?: string       // internal route
  externalUrl?: string // external link (opens in new tab)
}

export const TOOLS: ToolItem[] = [
  { id: 'vpn', iconName: 'globe', title: 'VPNガイド', desc: 'GFW対策・おすすめVPN比較', tag: 'GFW', route: '/prepare/gfw' },
  { id: 'wechat', iconName: 'chat', title: 'WeChat セットアップ', desc: '外国人登録・決済紐付け手順', tag: 'アプリ', route: '/prepare/payment' },
  { id: 'alipay', iconName: 'creditcard', title: 'Alipay 設定', desc: '外国カード登録・国際版の使い方', tag: '決済', route: '/prepare/payment' },
  { id: 'esim', iconName: 'signal', title: 'eSIM・SIMガイド', desc: '中国で使えるeSIM/SIMプラン比較', tag: '通信', externalUrl: 'https://www.airalo.com/china' },
  { id: 'map', iconName: 'map', title: 'オフラインマップ', desc: 'Baidu Maps・MAPS.MEの使い方', tag: 'ナビ', externalUrl: 'https://maps.me/' },
  { id: 'emergency', iconName: 'ambulance', title: '緊急連絡先', desc: '大使館・警察・救急', tag: '緊急', route: '/prepare/emergency' },
  { id: 'translate', iconName: 'translate', title: '翻訳アプリ', desc: 'DeepL・Google翻訳', tag: '翻訳', externalUrl: 'https://www.deepl.com/translator' },
  { id: 'cash', iconName: 'money', title: '現金引き出し', desc: '中国で使えるATM・両替所', tag: '現金', externalUrl: 'https://www.wise.com/' },
]
