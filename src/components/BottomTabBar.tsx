import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getProfile } from '../store/userStore'

// SVG icons as inline components
function IconPrepare({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="9" y="3" width="6" height="4" rx="1"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5"/>
      <path d="M9 12h6M9 16h4"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconExplore({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5"/>
      <path d="M12 3a9 9 0 010 18M3 12h18"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5"/>
      <path d="M12 3c-2 3-3 5.5-3 9s1 6 3 9"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5"/>
    </svg>
  )
}

function IconMyTrip({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5"/>
      <path d="M3 9h18M8 2v4M16 2v4"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 13h4v4H7z"
        fill={active ? '#E8342A' : '#9CA3AF'} fillOpacity="0.3"/>
    </svg>
  )
}

function IconRates({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5"/>
      <path d="M12 7v1.5M12 15.5V17M9.5 14.5c.5 1 1.4 1.5 2.5 1.5s2.5-.7 2.5-2c0-1.2-1-1.7-2.5-2S9.5 11.2 9.5 10c0-1.3 1.1-2 2.5-2s2 .5 2.5 1.5"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconTools({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a5 5 0 01-6.5 6.5L7.6 19.8A2.1 2.1 0 014.3 17l7.9-7.9A5 5 0 0114.7 3l-3 3z"
        stroke={active ? '#E8342A' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Tab labels by language
const labels: Record<string, string[]> = {
  ja: ['準備', '探す', '旅程', 'レート', 'ツール'],
  en: ['Prepare', 'Explore', 'My Trip', 'Rates', 'Tools'],
  ko: ['준비', '탐색', '여정', '환율', '도구'],
  fr: ['Préparer', 'Explorer', 'Voyage', 'Taux', 'Outils'],
  de: ['Vorbereitung', 'Erkunden', 'Reise', 'Kurse', 'Tools'],
  es: ['Preparar', 'Explorar', 'Viaje', 'Tasas', 'Herr.'],
}

export default function BottomTabBar() {
  const profile = getProfile()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = profile.language ?? 'en'
  const [prep, exp, trip, rates, tools] = labels[lang] ?? labels.en
  const path = location.pathname

  function isTab(prefix: string) {
    const p = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
    return p === prefix || p.startsWith(prefix + '/')
  }

  return (
    <nav className="tab-bar">
      {/* Profile icon */}
      <button
        onClick={() => navigate('/profile')}
        className="absolute right-3 -top-10 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center active:opacity-70 z-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="7" r="4" stroke="#6B7280" strokeWidth="1.5"/>
        </svg>
      </button>

      <NavLink to="/prepare" className={`tab-item${isTab('/prepare') ? ' active' : ''}`}>
        <IconPrepare active={isTab('/prepare')} /><span>{prep}</span>
      </NavLink>
      <NavLink to="/explore" className={`tab-item${isTab('/explore') ? ' active' : ''}`}>
        <IconExplore active={isTab('/explore')} /><span>{exp}</span>
      </NavLink>
      <NavLink to="/mytrip" className={`tab-item${isTab('/mytrip') ? ' active' : ''}`}>
        <IconMyTrip active={isTab('/mytrip')} /><span>{trip}</span>
      </NavLink>
      <NavLink to="/rates" className={`tab-item${isTab('/rates') ? ' active' : ''}`}>
        <IconRates active={isTab('/rates')} /><span>{rates}</span>
      </NavLink>
      <NavLink to="/tools" className={`tab-item${isTab('/tools') ? ' active' : ''}`}>
        <IconTools active={isTab('/tools')} /><span>{tools}</span>
      </NavLink>
    </nav>
  )
}
