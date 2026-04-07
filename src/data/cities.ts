// City data — source of truth for coordinates, descriptions, Wikivoyage slugs, and YouTube video IDs

export interface City {
  id: string
  name: string
  nameEn: string
  lat: number
  lon: number
  description: string        // short Japanese description
  descriptionEn: string
  wikivoyageSlug: string     // en.wikivoyage.org page name
  youtubeIds: string[]       // curated video IDs (no API needed)
  highlights: string[]       // top attractions
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
  },
]

// Top 5 cities for weather strip and pre-fetching
export const TOP_CITIES = CITIES.slice(0, 5)

// Helper: get city by ID
export function getCityById(id: string): City | undefined {
  return CITIES.find(c => c.id === id)
}
