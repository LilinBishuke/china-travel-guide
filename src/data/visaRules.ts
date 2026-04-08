// Visa rules data - update this JSON when policies change
// Last verified: 2026-04-08
// Sources: en.nia.gov.cn/n147418/n147463/c183390/content.html (official NIA Feb 17, 2026)
//          us.china-embassy.gov.cn (240h transit, Dec 2024)

export type VisaResult = 'visa_free_30' | 'transit_240h' | 'evisa' | 'visa_required'

export interface VisaRule {
  result: VisaResult
  policyExpiry?: string   // ISO date
  notes?: string[]
}

// === 30-Day Unilateral Visa-Free (50 countries, NIA Feb 17 2026) ===
// Source: en.nia.gov.cn official list
const VISA_FREE_30_COUNTRIES = new Set([
  // Europe (35)
  'AD','AT','BE','BG','HR','CY','DK','EE','FI','FR','DE','GR','HU',
  'IE','IT','LV','LU','MT','NL','PL','PT','RO','SK','SI','ES',
  'SE','IS','NO','LI','MC','CH','ME','MK','GB','RU',
  // Oceania (2)
  'AU','NZ',
  // Asia (7)
  'BH','BN','JP','KR','KW','OM','SA',
  // Americas (6)
  'AR','BR','CA','CL','PE','UY',
])

// === 240-Hour Transit Visa-Free (55 countries) ===
// Source: us.china-embassy.gov.cn, Dec 2024 update (+Indonesia = 55)
const TRANSIT_240H_COUNTRIES = new Set([
  // Europe (40)
  'AL','AT','BE','BG','HR','CY','DK','EE','FI','FR','DE','GR','HU',
  'IE','IS','IT','LV','LT','LU','MT','NL','NO','PL','PT','RO',
  'SK','SI','ES','SE','CH','GB','RU','UA','BY',
  'MC','ME','MK','RS','BA',
  'AD', // Andorra through border
  // Americas (6)
  'US','CA','MX','BR','AR','CL',
  // Asia-Pacific (9)
  'JP','KR','SG','BN','ID','QA','AE','AU','NZ',
])

// Countries with mutual visa exemption agreements (separate from unilateral)
// These have permanent agreements, not subject to the 2026-12-31 expiry
const MUTUAL_VISA_FREE = new Set([
  'SG','BN','TH','MY','KZ','GE','MV','MU','SR','BB','BS','GD','TN',
  'QA','AE','BO','AM',
])

export function checkVisaEligibility(
  nationality: string,
  purpose: 'tourism' | 'business' | 'transit',
): VisaRule {
  // Check mutual visa-free agreements first (permanent, separate policy)
  if (MUTUAL_VISA_FREE.has(nationality) && purpose !== 'transit') {
    const hasMutual = ['SG','BN','TH','MY','QA','AE'].includes(nationality)
    return {
      result: 'visa_free_30',
      policyExpiry: hasMutual ? undefined : '2026-12-31',
      notes: [
        '相互ビザ免除協定に基づく入国',
        'パスポート有効期限6ヶ月以上必要',
        '1回の入国で最大30日間',
      ],
    }
  }

  // Check unilateral 30-day visa-free (50 countries)
  if (VISA_FREE_30_COUNTRIES.has(nationality) && purpose !== 'transit') {
    return {
      result: 'visa_free_30',
      policyExpiry: '2026-12-31',
      notes: [
        'パスポート有効期限6ヶ月以上必要',
        '帰国便のチケット推奨',
        '1回の入国で最大30日間',
        '中国国内での延長不可',
        '対象: 観光・ビジネス・親族訪問・交流・トランジット',
      ],
    }
  }

  // Check 240-hour transit visa-free (55 countries)
  if (TRANSIT_240H_COUNTRIES.has(nationality) && purpose === 'transit') {
    return {
      result: 'transit_240h',
      policyExpiry: '2026-12-31',
      notes: [
        '第三国への出発チケットが必要（出発国に戻ることは不可）',
        '対象ポート（60カ所、24省）からの入国のみ',
        '最大240時間（10日間）滞在可能',
        '入国翌日0:00から起算',
        '省をまたいだ移動が可能（2024年改正）',
      ],
    }
  }

  // Also check if unilateral visa-free countries can transit
  if (VISA_FREE_30_COUNTRIES.has(nationality) && purpose === 'transit') {
    return {
      result: 'visa_free_30',
      policyExpiry: '2026-12-31',
      notes: [
        '30日間ビザ免除がトランジットにも適用されます',
        'パスポート有効期限6ヶ月以上必要',
      ],
    }
  }

  return {
    result: 'visa_required',
    notes: [
      '最寄りの中国大使館・領事館にビザを申請',
      '通常4〜5営業日で発給',
      'eVisa申請も可能: consular.mfa.gov.cn/VISA/',
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
  { code: 'TH', name: 'タイ', flag: '🇹🇭' },
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
  { code: 'MY', name: 'マレーシア', flag: '🇲🇾' },
  { code: 'NL', name: 'オランダ', flag: '🇳🇱' },
  { code: 'NZ', name: 'ニュージーランド', flag: '🇳🇿' },
  { code: 'PL', name: 'ポーランド', flag: '🇵🇱' },
  { code: 'PT', name: 'ポルトガル', flag: '🇵🇹' },
  { code: 'RU', name: 'ロシア', flag: '🇷🇺' },
  { code: 'SE', name: 'スウェーデン', flag: '🇸🇪' },
  { code: 'MX', name: 'メキシコ', flag: '🇲🇽' },
  { code: 'IN', name: 'インド', flag: '🇮🇳' },
  { code: 'ZA', name: '南アフリカ', flag: '🇿🇦' },
  { code: 'SA', name: 'サウジアラビア', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'AR', name: 'アルゼンチン', flag: '🇦🇷' },
]
