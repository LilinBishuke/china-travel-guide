// Emergency numbers and embassy data — extracted from EmergencyContacts.tsx

export interface EmergencyNumber {
  iconName: string
  label: string
  number: string
  note: string
}

export interface Embassy {
  name: string
  tel: string
  city: string
}

export const EMERGENCY_NUMBERS: EmergencyNumber[] = [
  { iconName: 'police', label: '警察', number: '110', note: 'Police' },
  { iconName: 'ambulance', label: '救急', number: '120', note: 'Ambulance' },
  { iconName: 'fire', label: '消防', number: '119', note: 'Fire' },
  { iconName: 'sos', label: '交通事故', number: '122', note: 'Traffic accident' },
]

export const EMBASSIES: Record<string, Embassy> = {
  JP: { name: '在中国日本国大使館', tel: '+86-10-6532-2361', city: '北京' },
  US: { name: 'U.S. Embassy Beijing', tel: '+86-10-8531-4000', city: '北京' },
  GB: { name: 'British Embassy Beijing', tel: '+86-10-5192-4000', city: '北京' },
  KR: { name: '주중한국대사관', tel: '+86-10-8532-0290', city: '北京' },
  AU: { name: 'Australian Embassy Beijing', tel: '+86-10-5140-4111', city: '北京' },
  CA: { name: 'Embassy of Canada Beijing', tel: '+86-10-5139-4000', city: '北京' },
  FR: { name: 'Ambassade de France', tel: '+86-10-8531-2200', city: '北京' },
  DE: { name: 'Deutsche Botschaft Peking', tel: '+86-10-8532-9000', city: '北京' },
  NZ: { name: 'NZ Embassy Beijing', tel: '+86-10-8531-2700', city: '北京' },
  SG: { name: 'Singapore Embassy Beijing', tel: '+86-10-6532-1115', city: '北京' },
  MY: { name: 'Malaysian Embassy Beijing', tel: '+86-10-6532-2531', city: '北京' },
  IT: { name: 'Ambasciata d\'Italia Pechino', tel: '+86-10-8532-7600', city: '北京' },
  ES: { name: 'Embajada de España Beijing', tel: '+86-10-6532-3629', city: '北京' },
  NL: { name: 'Netherlands Embassy Beijing', tel: '+86-10-8532-0200', city: '北京' },
  RU: { name: 'Посольство России в Пекине', tel: '+86-10-6532-2051', city: '北京' },
}

export const MEDICAL_INFO = [
  { iconName: 'hospital', title: '国際病院', desc: '北京・上海に英語対応病院あり（SOS International等）' },
  { iconName: 'medicine', title: '処方薬', desc: '常備薬は多めに持参。中国語名が違う場合あり' },
  { iconName: 'receipt', title: '海外保険', desc: 'キャッシュレス対応の海外旅行保険に加入推奨' },
  { iconName: 'water', title: '飲料水', desc: '水道水は飲めません。ペットボトル水を利用' },
]
