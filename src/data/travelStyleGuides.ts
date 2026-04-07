// Travel style guide content for each of the 6 styles

import type { TravelStyle } from '../store/userStore'

export interface StyleGuide {
  style: TravelStyle
  iconName: string
  title: string
  titleEn: string
  overview: string
  tips: string[]
  regulations: string[]
  recommended: string[]  // city IDs from cities.ts
}

export const TRAVEL_STYLE_GUIDES: StyleGuide[] = [
  {
    style: 'walking',
    iconName: 'walking',
    title: '徒歩・ハイキング',
    titleEn: 'Walking / Hiking',
    overview: '中国には世界クラスのハイキングコースが多数。都市散策も安全で楽しい。歩道は概ね整備されており、主要観光地にはバリアフリー対応あり。',
    tips: [
      '大気汚染の日はマスク（N95推奨）を携帯',
      '水分補給：ペットボトル水を常に携帯（水道水は飲めない）',
      'トイレ：公衆トイレはティッシュ持参推奨',
      '夏季（6-8月）は帽子・日焼け止め必須',
      '高地（雲南・チベット方面）は高山病に注意',
    ],
    regulations: [
      '一部の自然保護区は事前予約制',
      '万里の長城の野長城（未整備区間）は立入禁止エリアあり',
      'チベット自治区は外国人旅行許可証が必要',
    ],
    recommended: ['beijing', 'guilin', 'kunming'],
  },
  {
    style: 'cycling',
    iconName: 'cycling',
    title: 'サイクリング',
    titleEn: 'Cycling',
    overview: '中国はシェアサイクル大国。美団（Meituan）、ハローバイク等のアプリで即座にレンタル可能。長距離ツーリングも人気。',
    tips: [
      'シェアサイクル利用にはAlipay / WeChat Payが必要',
      '都市部は自転車専用レーンが充実（特に成都・杭州）',
      '夜間走行はライト必須（無灯火は罰金）',
      '長距離の場合、中国製ロードバイクのレンタルショップあり',
      'GPSはBaidu Maps / Gaode Maps推奨（Google Maps精度低い）',
    ],
    regulations: [
      '高速道路は自転車通行禁止',
      '一部の都市中心部は時間帯制限あり',
      'ヘルメット着用は法的義務ではないが強く推奨',
    ],
    recommended: ['chengdu', 'hangzhou', 'guilin'],
  },
  {
    style: 'motorcycle',
    iconName: 'motorcycle',
    title: 'バイク・スクーター',
    titleEn: 'Motorcycle / Scooter',
    overview: '電動スクーターが急増中。ただし外国人のバイクレンタル・運転は制約が多い。国際免許は中国では無効。',
    tips: [
      '中国の運転免許に切替が必要（国際免許不可）',
      '電動スクーターは免許不要の地域あり（確認必要）',
      '都市部の交通は混沌としている — 防御的運転を',
      'ガソリンスタンドではパスポート提示が求められる場合あり',
    ],
    regulations: [
      '国際運転免許証は中国では法的に無効',
      '中国の運転免許への書換が必須（筆記試験あり）',
      '多くの大都市（北京・上海等）はバイク登録が困難',
      '一部都市では外環道路以内のバイク走行禁止',
    ],
    recommended: ['kunming', 'guilin'],
  },
  {
    style: 'driving',
    iconName: 'car',
    title: 'レンタカー',
    titleEn: 'Self-drive / Rental Car',
    overview: '中国でのレンタカーには中国の運転免許が必要。高速道路網は世界最大級で整備状態も良い。ETCカードで料金所通過可能。',
    tips: [
      '中国の運転免許書換が必須（国際免許不可）',
      'レンタカー：神州租車（Shenzhou Zuche）が外国人対応あり',
      '高速道路の制限速度は120km/h、一般道は60-80km/h',
      'ナビはBaidu Maps / Gaode Maps必須',
      'ETCカードはレンタカー会社で付帯可能',
    ],
    regulations: [
      '国際運転免許証は中国では法的に無効',
      '運転免許書換には健康診断書・中国語筆記試験が必要',
      '飲酒運転は厳罰（アルコール0.02%以上で処罰）',
      '信号無視・速度超過はカメラで自動検知',
    ],
    recommended: ['kunming', 'xian'],
  },
  {
    style: 'tour',
    iconName: 'bus',
    title: 'グループツアー',
    titleEn: 'Group Tour',
    overview: '言葉の壁を気にせず効率的に観光できる。現地発着の日帰りツアーから、数日間のパッケージまで選択肢は豊富。',
    tips: [
      'Trip.com / Klook でツアー予約が便利',
      '日本語ガイド付きツアーは北京・上海で多い',
      '万里の長城ツアーは八達嶺（混雑）より慕田峪がおすすめ',
      'フリータイムの有無を事前確認',
      'チップは不要（中国にチップ文化はない）',
    ],
    regulations: [
      'チベットは旅行会社経由でのツアー参加が義務',
      '一部の少数民族地域は団体ツアーのみ入域可',
    ],
    recommended: ['beijing', 'xian', 'chengdu'],
  },
  {
    style: 'rail',
    iconName: 'train',
    title: '高速鉄道',
    titleEn: 'High-speed Rail',
    overview: '中国の高速鉄道（高铁）は世界最大のネットワーク。時速350kmで都市間を効率的に移動。Trip.comまたは12306.cnで予約。',
    tips: [
      '予約は12306.cn（公式）またはTrip.com（英語対応）',
      'パスポート番号で購入、乗車時にパスポート提示',
      '座席クラス：二等（普通）、一等（グリーン）、商務（ファースト）',
      '駅では出発30分前に到着推奨（セキュリティチェックあり）',
      '車内販売あり、駅弁（盒饭）も充実',
    ],
    regulations: [
      'チケットはパスポート番号に紐付け（譲渡不可）',
      '大型荷物は棚に収まるサイズ推奨',
      '列車内は全面禁煙',
    ],
    recommended: ['beijing', 'shanghai', 'xian', 'chengdu'],
  },
]

export function getGuideByStyle(style: TravelStyle): StyleGuide | undefined {
  return TRAVEL_STYLE_GUIDES.find(g => g.style === style)
}
