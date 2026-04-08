// City data — source of truth for coordinates, descriptions, Wikivoyage slugs, and YouTube video IDs

export interface BlogLink {
  title: string
  url: string
  author: string
  lang: string
  tags: string[]
  year: number
}

export interface AirportGuide {
  code: string
  arrivalTips: string[]
  simPurchase: string
  transport: string[]
  tips: string[]
}

export interface City {
  id: string
  name: string
  nameEn: string
  lat: number
  lon: number
  description: string
  descriptionEn: string
  wikivoyageSlug: string
  youtubeIds: string[]
  highlights: string[]
  blogLinks: BlogLink[]
  airportGuide?: AirportGuide
}

export const CITIES: City[] = [
  {
    id: 'beijing',
    name: '北京',
    nameEn: 'Beijing',
    lat: 39.9042,
    lon: 116.4074,
    description: '文化・歴史の中心',
    descriptionEn: 'Cultural and historical heart of China',
    wikivoyageSlug: 'Beijing',
    youtubeIds: ['rbW5NRbGjL8', 'kIKzfOleYkY'],
    highlights: ['故宮（紫禁城）', '万里の長城', '天壇', '胡同散策', '798芸術区'],
    blogLinks: [
      { title: '北京3泊4日モデルコース', url: 'https://tabicoffret.com/article/76437/', author: 'たびこふれ', lang: 'ja', tags: ['culture', 'solo'], year: 2025 },
      { title: 'Beijing Travel Guide 2025', url: 'https://www.nomadicmatt.com/travel-guides/china-travel-tips/beijing/', author: 'Nomadic Matt', lang: 'en', tags: ['budget', 'culture'], year: 2025 },
      { title: '北京で絶対食べたいB級グルメ10選', url: 'https://tripnote.jp/beijing/best-street-food', author: 'Trip Note', lang: 'ja', tags: ['food'], year: 2025 },
    ],
    airportGuide: {
      code: 'PEK',
      arrivalTips: ['ターミナル3（T3）が国際線メイン', '入国審査は混雑時60分以上かかることも', '指紋採取が必要'],
      simPurchase: '到着ロビーにChina Mobile/Unicomのカウンターあり',
      transport: ['エアポートエクスプレス（25元、市内まで約30分）', '地下鉄（大興線経由）', 'タクシー（市内まで約100-150元）'],
      tips: ['両替レートは空港内は悪い。市内ATMを推奨', 'DiDi（配車アプリ）は到着前にセットアップ推奨'],
    },
  },
  {
    id: 'shanghai',
    name: '上海',
    nameEn: 'Shanghai',
    lat: 31.2304,
    lon: 121.4737,
    description: '近代都市の象徴',
    descriptionEn: 'Symbol of modern China',
    wikivoyageSlug: 'Shanghai',
    youtubeIds: ['JB4HWUPJJ5I', 'E3lM_fvVLCY'],
    highlights: ['外灘', '豫園', '浦東スカイライン', '田子坊', '南京路'],
    blogLinks: [
      { title: '上海2泊3日弾丸旅行記', url: 'https://tripnote.jp/shanghai/best-itinerary', author: 'Trip Note', lang: 'ja', tags: ['solo', 'food'], year: 2025 },
      { title: 'Shanghai on a Budget', url: 'https://www.nomadicmatt.com/travel-guides/china-travel-tips/shanghai/', author: 'Nomadic Matt', lang: 'en', tags: ['budget'], year: 2025 },
      { title: '上海のおすすめ夜景スポット', url: 'https://tabicoffret.com/article/shanghai-night/', author: 'たびこふれ', lang: 'ja', tags: ['culture', 'couple'], year: 2025 },
    ],
    airportGuide: {
      code: 'PVG',
      arrivalTips: ['T1が国際線メイン', '自動入国ゲート（一部国籍対応）', '入国カード記入不要（2024年〜）'],
      simPurchase: '到着ロビー1Fに複数キャリアのカウンター。eSIM事前準備推奨',
      transport: ['リニアモーターカー（8元、浦東→龍陽路8分）', '地下鉄2号線（市内まで約60分）', 'タクシー（市内まで約150-200元）'],
      tips: ['リニア→地下鉄乗換が最速＆最安', '深夜到着はタクシーのみ。DiDi推奨'],
    },
  },
  {
    id: 'chengdu',
    name: '成都',
    nameEn: 'Chengdu',
    lat: 30.5728,
    lon: 104.0668,
    description: 'パンダと四川料理',
    descriptionEn: 'Pandas and Sichuan cuisine',
    wikivoyageSlug: 'Chengdu',
    youtubeIds: ['iSmkqocn0oQ', 'fYILdHtPVng'],
    highlights: ['大熊猫研究基地', '錦里古街', '武侯祠', '九寨溝（日帰り不可）', '火鍋'],
    blogLinks: [
      { title: '成都パンダ基地完全ガイド', url: 'https://tripnote.jp/chengdu/panda-base', author: 'Trip Note', lang: 'ja', tags: ['culture', 'family'], year: 2025 },
      { title: 'Chengdu Food Guide', url: 'https://www.lostplate.com/chengdu-food-guide/', author: 'Lost Plate', lang: 'en', tags: ['food'], year: 2025 },
      { title: '四川火鍋の楽しみ方', url: 'https://tabicoffret.com/article/sichuan-hotpot/', author: 'たびこふれ', lang: 'ja', tags: ['food'], year: 2025 },
    ],
    airportGuide: {
      code: 'CTU',
      arrivalTips: ['天府国際空港（2021年開業）は新しく快適', '入国審査は比較的スムーズ'],
      simPurchase: '到着ロビーにカウンターあり。eSIM事前準備推奨',
      transport: ['地下鉄18号線（市内まで約50分）', 'エアポートバス（市内各所へ）', 'タクシー（市内まで約120-180元）'],
      tips: ['旧空港（双流）との間違いに注意', '地下鉄が最も便利で安い'],
    },
  },
  {
    id: 'xian',
    name: '西安',
    nameEn: "Xi'an",
    lat: 34.2658,
    lon: 108.9541,
    description: '兵馬俑と古都の魅力',
    descriptionEn: 'Terracotta Warriors and ancient capital',
    wikivoyageSlug: "Xi'an",
    youtubeIds: ['w2GMGIn8Iy4', 'YUTBhpQ3XiE'],
    highlights: ['兵馬俑', '城壁', '鐘楼', '回民街', '大雁塔'],
    blogLinks: [
      { title: '西安2泊3日歴史旅', url: 'https://tripnote.jp/xian/history-trip', author: 'Trip Note', lang: 'ja', tags: ['culture', 'solo'], year: 2025 },
      { title: "Xi'an Terracotta Warriors Guide", url: 'https://www.chinahighlights.com/xian/terracotta-army/', author: 'China Highlights', lang: 'en', tags: ['culture'], year: 2025 },
    ],
  },
  {
    id: 'guangzhou',
    name: '広州',
    nameEn: 'Guangzhou',
    lat: 23.1291,
    lon: 113.2644,
    description: '広東料理の本場',
    descriptionEn: 'Home of Cantonese cuisine',
    wikivoyageSlug: 'Guangzhou',
    youtubeIds: ['p3dBz0pnYgs'],
    highlights: ['陳氏書院', '沙面島', '広州タワー', '上下九歩行街', '飲茶'],
    blogLinks: [{ title: '広州飲茶巡り', url: 'https://tripnote.jp/guangzhou/dimsum', author: 'Trip Note', lang: 'ja', tags: ['food'], year: 2025 }],
  },
  {
    id: 'hangzhou',
    name: '杭州',
    nameEn: 'Hangzhou',
    lat: 30.2741,
    lon: 120.1551,
    description: '西湖と龍井茶',
    descriptionEn: 'West Lake and Longjing tea',
    wikivoyageSlug: 'Hangzhou',
    youtubeIds: ['c1dz-kP3oUQ'],
    highlights: ['西湖', '霊隠寺', '龍井茶畑', '宋城', '河坊街'],
    blogLinks: [{ title: '杭州西湖サイクリング', url: 'https://tripnote.jp/hangzhou/west-lake', author: 'Trip Note', lang: 'ja', tags: ['nature', 'cycling'], year: 2025 }],
  },
  {
    id: 'guilin',
    name: '桂林',
    nameEn: 'Guilin',
    lat: 25.2744,
    lon: 110.2990,
    description: 'カルスト地形と漓江',
    descriptionEn: 'Karst landscapes and Li River',
    wikivoyageSlug: 'Guilin',
    youtubeIds: ['qGo5qoWdyMo'],
    highlights: ['漓江クルーズ', '陽朔', '象鼻山', '龍脊棚田', '銀子岩'],
    blogLinks: [{ title: '桂林・陽朔4日間', url: 'https://tripnote.jp/guilin/yangshuo', author: 'Trip Note', lang: 'ja', tags: ['nature'], year: 2025 }],
  },
  {
    id: 'kunming',
    name: '昆明',
    nameEn: 'Kunming',
    lat: 25.0389,
    lon: 102.7183,
    description: '春城・雲南への玄関口',
    descriptionEn: 'Gateway to Yunnan',
    wikivoyageSlug: 'Kunming',
    youtubeIds: ['oY3rNjBq3Qs'],
    highlights: ['石林', '滇池', '翠湖公園', '雲南民族村', '大理・麗江への拠点'],
    blogLinks: [{ title: '雲南省周遊ガイド', url: 'https://tripnote.jp/kunming/yunnan-guide', author: 'Trip Note', lang: 'ja', tags: ['nature', 'culture'], year: 2025 }],
  },
]

// Top 5 cities for weather strip and pre-fetching
export const TOP_CITIES = CITIES.slice(0, 5)

// Helper: get city by ID
export function getCityById(id: string): City | undefined {
  return CITIES.find(c => c.id === id)
}
