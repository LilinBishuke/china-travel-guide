// Centralized SVG icon library — replaces all emoji usage
// Each icon is a pure SVG path, no emoji dependencies

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
  label?: string  // accessible label
}

const paths: Record<string, (c: string) => JSX.Element> = {
  // === Travel Styles ===
  walking: (c) => <><path d="M13 4a2 2 0 100-4 2 2 0 000 4zM7 21l3-7 2.5 2v5h2v-6.5l-2.5-2.5 1-3A7 7 0 0018 11v-2a5 5 0 00-4-2l-2 3-3.5-2L5 21h2z" fill={c}/></>,
  cycling: (c) => <><circle cx="6" cy="18" r="3.5" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="18" cy="18" r="3.5" stroke={c} strokeWidth="1.5" fill="none"/><path d="M18 18l-3-8h-4l-2.5 5M9 10l3-4M13 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  motorcycle: (c) => <><circle cx="5" cy="17" r="3" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="19" cy="17" r="3" stroke={c} strokeWidth="1.5" fill="none"/><path d="M5 17h3l4-5h4l1.5 2.5M10 12l1-4h3M17 8l2 2" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  car: (c) => <><path d="M5 17h14M6 17V9.5L8.5 6h7L18 9.5V17" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="17" r="1.5" fill={c}/><circle cx="16" cy="17" r="1.5" fill={c}/><path d="M6 10h12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  bus: (c) => <><rect x="4" y="3" width="16" height="16" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M4 11h16M4 7h16" stroke={c} strokeWidth="1.5"/><circle cx="7.5" cy="15" r="1" fill={c}/><circle cx="16.5" cy="15" r="1" fill={c}/><path d="M4 19v2M20 19v2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  train: (c) => <><rect x="5" y="2" width="14" height="16" rx="3" stroke={c} strokeWidth="1.5" fill="none"/><path d="M5 10h14M12 2v8" stroke={c} strokeWidth="1.5"/><circle cx="8.5" cy="14" r="1" fill={c}/><circle cx="15.5" cy="14" r="1" fill={c}/><path d="M7 22l2-4h6l2 4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,

  // === Interests ===
  culture: (c) => <><path d="M3 21h18M5 21V7l7-5 7 5v14" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21v-6h6v6M9 10h.01M15 10h.01" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  food: (c) => <><path d="M3 6h18M5 6v2a7 7 0 007 7 7 7 0 007-7V6M12 15v6M8 21h8" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  nature: (c) => <><path d="M12 3l-8 9h4l-3 5h5v4h4v-4h5l-3-5h4L12 3z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  shopping: (c) => <><path d="M6 6h15l-1.5 9H7.5L6 6zM6 6L5 2H2" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="19" r="1.5" fill={c}/><circle cx="17" cy="19" r="1.5" fill={c}/></>,
  entertainment: (c) => <><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  wellness: (c) => <><path d="M12 21a9 9 0 010-18M12 3a9 9 0 010 18" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="12" cy="8" r="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 10v4l-3 4M12 14l3 4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,

  // === Visa / Status ===
  visa_free: (c) => <><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 12l3 3 7-7" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  visa_transit: (c) => <><path d="M21 12a9 9 0 11-9-9" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M21 3v6h-6" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  visa_evisa: (c) => <><rect x="3" y="4" width="18" height="14" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 15h4M3 10h18" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  visa_required: (c) => <><path d="M12 2L2 20h20L12 2z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 9v4M12 16h.01" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
  calendar: (c) => <><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M3 10h18M8 2v4M16 2v4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,

  // === Tools / General ===
  globe: (c) => <><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" fill="none"/><path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10M12 2a15 15 0 00-4 10 15 15 0 004 10" stroke={c} strokeWidth="1.5" fill="none"/></>,
  chat: (c) => <><path d="M21 12a9 9 0 01-9 9 9.5 9.5 0 01-4.24-1L3 21l1-4.76A9 9 0 1121 12z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  creditcard: (c) => <><rect x="2" y="5" width="20" height="14" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M2 10h20M6 15h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  signal: (c) => <><path d="M5 12.55a11 11 0 0114 0M8.5 16.35a7 7 0 017 0M12 20h.01" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  map: (c) => <><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  ambulance: (c) => <><rect x="1" y="8" width="16" height="10" rx="1" stroke={c} strokeWidth="1.5" fill="none"/><path d="M17 8l4 4v6h-4M1 14h16M7 11v4M5 13h4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="6" cy="18" r="2" fill={c}/><circle cx="18" cy="18" r="2" fill={c}/></>,
  translate: (c) => <><path d="M4 5h7M7.5 2v3M5.5 5a5 5 0 003.5 5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M13 14l2.5-6L18 14M13.8 12.5h3.4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 19l2-4M22 19l-2-4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  money: (c) => <><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 6v2M12 16v2M9 14c.5 1 1.5 2 3 2s3-1 3-2.5-1.5-2-3-2.5S9 10 9 8.5 10.5 6 12 6s2.5.5 3 1.5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  lock: (c) => <><rect x="5" y="11" width="14" height="10" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 11V7a4 4 0 018 0v4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  cloud: (c) => <><path d="M18 10h1a4 4 0 010 8H7a5 5 0 01-.5-10A7 7 0 0118 10z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,

  // === Emergency ===
  police: (c) => <><path d="M12 2l-8 4v4c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4M12 15h.01" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  fire: (c) => <><path d="M12 2c-2 4-6 6-6 11a6 6 0 0012 0c0-5-4-7-6-11z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22c-1.5 0-3-1.3-3-3 0-2 3-4 3-4s3 2 3 4c0 1.7-1.5 3-3 3z" stroke={c} strokeWidth="1.5" fill="none"/></>,
  sos: (c) => <><rect x="2" y="6" width="20" height="12" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 10c-.6 0-1 .4-1 1s.4 1 1 1h1c.6 0 1 .4 1 1s-.4 1-1 1H6M12 10v4M17 10c-.6 0-1 .4-1 1s.4 1 1 1h1c.6 0 1 .4 1 1s-.4 1-1 1h-2" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  hospital: (c) => <><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 12h8M12 8v8" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
  medicine: (c) => <><rect x="6" y="2" width="12" height="7" rx="1" stroke={c} strokeWidth="1.5" fill="none"/><path d="M9 2v7M15 2v7M6 9v11a2 2 0 002 2h8a2 2 0 002-2V9M10 14h4M12 12v4" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  receipt: (c) => <><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 8h8M8 12h6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  water: (c) => <><path d="M12 2c-4 6-7 9-7 13a7 7 0 0014 0c0-4-3-7-7-13z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  embassy: (c) => <><path d="M3 21h18M4 21V10l8-7 8 7v11M9 21v-5h6v5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7v3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,

  // === Progress steps ===
  clipboard: (c) => <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke={c} strokeWidth="1.5" fill="none"/></>,
  upload: (c) => <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M12 3v12M7 8l5-5 5 5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  hourglass: (c) => <><path d="M6 2h12M6 22h12M6 2v5l4 4-4 4v5M18 2v5l-4 4 4 4v5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  airplane: (c) => <><path d="M22 2L11 13M22 2l-7 20-3-9-9-3 20-7z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,

  // === Blocked services ===
  search: (c) => <><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.5" fill="none"/><path d="M16.5 16.5L21 21" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  email: (c) => <><rect x="2" y="4" width="20" height="16" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M2 4l10 8 10-8" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  tv: (c) => <><rect x="2" y="3" width="20" height="14" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 21h8M12 17v4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  camera: (c) => <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="12" cy="13" r="4" stroke={c} strokeWidth="1.5" fill="none"/></>,
  bird: (c) => <><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke={c} strokeWidth="1.5" fill="none"/></>,
  book: (c) => <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,

  // === MyTrip ===
  calendar_plan: (c) => <><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M3 10h18M8 2v4M16 2v4M7 14h4v4H7z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
  city: (c) => <><path d="M3 21V8l5-3v16M8 5l8-3v19M16 2l5 3v16" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 21h18" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
  skyline: (c) => <><path d="M3 21h18M5 21V11l3-2v12M11 21V7l4-3v17M17 21V9l3-2v14" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  panda: (c) => <><circle cx="12" cy="13" r="7" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="9" cy="12" r="1.5" fill={c}/><circle cx="15" cy="12" r="1.5" fill={c}/><ellipse cx="12" cy="15" rx="2" ry="1" stroke={c} strokeWidth="1" fill="none"/><circle cx="7" cy="7" r="2.5" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="17" cy="7" r="2.5" stroke={c} strokeWidth="1.5" fill="none"/></>,
}

export default function Icon({ name, size = 24, color = 'currentColor', className, label }: IconProps) {
  const render = paths[name]
  if (!render) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={!label}
    >
      {render(color)}
    </svg>
  )
}
