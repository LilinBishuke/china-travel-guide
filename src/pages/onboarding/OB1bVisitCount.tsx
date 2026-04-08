import Icon from '../../components/Icon'
import type { Language, VisitCount } from '../../store/userStore'

interface Props {
  lang: Language
  onNext: (count: VisitCount) => void
}

const TITLES: Record<Language, { heading: string; sub: string }> = {
  ja: { heading: '中国への渡航経験', sub: 'あなたに合った情報をお届けします' },
  en: { heading: 'China Travel Experience', sub: "We'll tailor the guide for you" },
  ko: { heading: '중국 여행 경험', sub: '맞춤 정보를 안내합니다' },
  fr: { heading: 'Expérience en Chine', sub: 'Nous adapterons le guide pour vous' },
  de: { heading: 'China-Reiseerfahrung', sub: 'Wir passen den Guide für Sie an' },
  es: { heading: 'Experiencia en China', sub: 'Adaptaremos la guía para ti' },
}

const OPTIONS: Record<Language, { first: [string, string]; few: [string, string]; many: [string, string] }> = {
  ja: { first: ['初めての中国', '基本から丁寧にガイドします'], few: ['2〜3回目', '前回からの変更点をお伝えします'], many: ['4回以上のベテラン', '穴場・最新情報をお届けします'] },
  en: { first: ['First time in China', "We'll guide you from the basics"], few: ['2-3 visits', "We'll highlight what's changed"], many: ['4+ visits', "We'll show hidden gems & latest info"] },
  ko: { first: ['처음 방문', '기본부터 안내합니다'], few: ['2~3회 방문', '변경사항을 알려드립니다'], many: ['4회 이상', '숨은 명소와 최신 정보'] },
  fr: { first: ['Première fois', 'Guide complet depuis les bases'], few: ['2-3 visites', 'Les changements depuis votre dernière visite'], many: ['4+ visites', 'Perles cachées et dernières infos'] },
  de: { first: ['Erstes Mal', 'Wir führen Sie durch die Grundlagen'], few: ['2-3 Besuche', 'Was sich geändert hat'], many: ['4+ Besuche', 'Geheimtipps und neueste Infos'] },
  es: { first: ['Primera vez', 'Te guiaremos desde lo básico'], few: ['2-3 visitas', 'Novedades desde tu última visita'], many: ['4+ visitas', 'Lugares secretos e info actualizada'] },
}

export default function OB1bVisitCount({ lang, onNext }: Props) {
  const t = TITLES[lang] ?? TITLES.en
  const opts = OPTIONS[lang] ?? OPTIONS.en

  const cards: { value: VisitCount; iconName: string; label: string; sub: string }[] = [
    { value: 'first', iconName: 'nature', label: opts.first[0], sub: opts.first[1] },
    { value: 'few', iconName: 'visa_transit', label: opts.few[0], sub: opts.few[1] },
    { value: 'many', iconName: 'culture', label: opts.many[0], sub: opts.many[1] },
  ]

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy">{t.heading}</h2>
        <p className="text-text-secondary text-sm mt-1">{t.sub}</p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {cards.map(c => (
          <button
            key={c.value}
            onClick={() => onNext(c.value)}
            className="card p-5 flex items-center gap-4 active:opacity-70 transition-opacity text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name={c.iconName} size={24} color="#E8342A" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-navy">{c.label}</p>
              <p className="text-xs text-text-secondary mt-0.5">{c.sub}</p>
            </div>
            <svg className="text-gray-300 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
