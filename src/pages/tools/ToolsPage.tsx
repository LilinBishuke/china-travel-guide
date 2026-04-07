import { useNavigate } from 'react-router-dom'
import { getProfile } from '../../store/userStore'
import Icon from '../../components/Icon'
import { TOOLS } from '../../data/tools'

const LABEL: Record<string, string> = {
  ja: 'ツール', en: 'Tools', ko: '도구', fr: 'Outils', de: 'Tools', es: 'Herramientas',
}

export default function ToolsPage() {
  const navigate = useNavigate()
  const profile = getProfile()
  const lang = profile.language ?? 'en'

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-tab">
      <div className="px-5 pt-safe pt-6 pb-4 bg-white border-b border-gray-50">
        <h1 className="text-xl font-bold text-navy">{LABEL[lang] ?? LABEL.en}</h1>
        <p className="text-xs text-text-secondary mt-0.5">
          {lang === 'ja' ? '中国旅行に必要なツール・ガイド' : 'Essential tools & guides for China'}
        </p>
      </div>

      <div className="px-5 py-5 grid grid-cols-1 gap-3">
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            onClick={() => {
              if (tool.route) navigate(tool.route)
              else if (tool.externalUrl) window.open(tool.externalUrl, '_blank')
            }}
            className="card flex items-center gap-4 p-4 text-left active:opacity-70 transition-opacity"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name={tool.iconName} size={24} color="#E8342A" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-navy">{tool.title}</p>
                <span className="chip chip-blue text-[10px] px-2 py-0.5">{tool.tag}</span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">{tool.desc}</p>
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
