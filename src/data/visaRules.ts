// Visa rules data - update this JSON when policies change
// Last verified: 2026-04-06
// Sources: china-embassy.gov.cn, china-briefing.com

export type VisaResult = 'visa_free_30' | 'transit_240h' | 'evisa' | 'visa_required'

export interface VisaRule {
  result: VisaResult
  policyExpiry?: string   // ISO date
  notes?: string[]
}

// Countries eligible for 30-day visa-free entry (unilateral)
const VISA_FREE_30_COUNTRIES = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU',
  'IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES',
  'SE','IS','NO','LI','MC','AD','CH','MD','ME','MK','AL','RS','BA',
  'AU','NZ','JP','KR','MY','BN','SG','ID','TH',
])

// Countries eligible for 240-hour (10-day) transit visa exemption
const TRANSIT_240H_COUNTRIES = new Set([
  ...VISA_FREE_30_COUNTRIES,
  'US','GB','CA','RU','UA','BY','GE','AM','AZ','KZ','UZ','TM','TJ','KG',
  'MX','BR','AR','CL','CO','PE','ZA','EG','MA','TN',
])

export function checkVisaEligibility(
  nationality: string,
  purpose: 'tourism' | 'business' | 'transit',
): VisaRule {
  if (VISA_FREE_30_COUNTRIES.has(nationality) && purpose !== 'transit') {
    return {
      result: 'visa_free_30',
      policyExpiry: '2026-12-31',
      notes: [
        'パスポート有効期限6ヶ月以上必要',
        '帰国便のチケット推奨',
        '1回の入国で最大30日間',
        '中国国内での延長不可',
      ],
    }
  }

  if (TRANSIT_240H_COUNTRIES.has(nationality) && purpose === 'transit') {
    return {
      result: 'transit_240h',
      policyExpiry: '2026-12-31',
      notes: [
        '第三国への出発チケットが必要',
        '対象ポート（65カ所）からの入国のみ',
        '最大240時間（10日間）滞在可能',
        '滞在可能エリアに制限あり',
      ],
    }
  }

  // Some countries can apply for eVisa
  const EVISA_COUNTRIES = new Set(['US','GB','CA','AU','NZ','JP','KR','RU'])
  if (EVISA_COUNTRIES.has(nationality)) {
    return {
      result: 'evisa',
      notes: [
        'オンラインでビザ申請可能（COVA）',
        '通常4〜5営業日で発給',
        '申請URL: consular.mfa.gov.cn/VISA/',
      ],
    }
  }

  return {
    result: 'visa_required',
    notes: [
      '最寄りの中国大使館・領事館に申請',
      '通常4〜5営業日で発給',
      '申請書類を事前に準備してください',
    ],
  }
}

export const ENTRY_PORTS = [
  { code: 'PVG', name: '上海 浦東国際空港', city: '上海' },
  { code: 'PEK', name: '北京 首都国際空港', city: '北京' },
  { code: 'PKX', name: '北京 大興国際空港', city: '北京' },
  { code: 'CAN', name: '広州 白雲国際空港', city: '広州' },
  { code: 'CTU', name: '成都 天府国際空港', city: '成都' },
  { code: 'XIY', name: '西安 咸陽国際空港', city: '西安' },
  { code: 'SZX', name: '深圳 宝安国際空港', city: '深圳' },
  { code: 'KMG', name: '昆明 長水国際空港', city: '昆明' },
  { code: 'CKG', name: '重慶 江北国際空港', city: '重慶' },
  { code: 'SHA', name: '上海 虹橋国際空港', city: '上海' },
]

export const POPULAR_NATIONALITIES = [
  { code: 'JP', name: '日本', flag: '🇯🇵' },
  { code: 'US', name: 'アメリカ', flag: '🇺🇸' },
  { code: 'GB', name: 'イギリス', flag: '🇬🇧' },
  { code: 'KR', name: '韓国', flag: '🇰🇷' },
  { code: 'FR', name: 'フランス', flag: '🇫🇷' },
  { code: 'DE', name: 'ドイツ', flag: '🇩🇪' },
  { code: 'AU', name: 'オーストラリア', flag: '🇦🇺' },
  { code: 'CA', name: 'カナダ', flag: '🇨🇦' },
  { code: 'SG', name: 'シンガポール', flag: '🇸🇬' },
  { code: 'MY', name: 'マレーシア', flag: '🇲🇾' },
]

export const ALL_NATIONALITIES = [
  ...POPULAR_NATIONALITIES,
  { code: 'AT', name: 'オーストリア', flag: '🇦🇹' },
  { code: 'BE', name: 'ベルギー', flag: '🇧🇪' },
  { code: 'BR', name: 'ブラジル', flag: '🇧🇷' },
  { code: 'CH', name: 'スイス', flag: '🇨🇭' },
  { code: 'ES', name: 'スペイン', flag: '🇪🇸' },
  { code: 'ID', name: 'インドネシア', flag: '🇮🇩' },
  { code: 'IT', name: 'イタリア', flag: '🇮🇹' },
  { code: 'NL', name: 'オランダ', flag: '🇳🇱' },
  { code: 'NZ', name: 'ニュージーランド', flag: '🇳🇿' },
  { code: 'PL', name: 'ポーランド', flag: '🇵🇱' },
  { code: 'PT', name: 'ポルトガル', flag: '🇵🇹' },
  { code: 'RU', name: 'ロシア', flag: '🇷🇺' },
  { code: 'SE', name: 'スウェーデン', flag: '🇸🇪' },
  { code: 'TH', name: 'タイ', flag: '🇹🇭' },
  { code: 'ZA', name: '南アフリカ', flag: '🇿🇦' },
]
