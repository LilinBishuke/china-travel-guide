import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ja from './ja.json'
import en from './en.json'

// Get saved language from localStorage
function getSavedLanguage(): string {
  try {
    const profile = JSON.parse(localStorage.getItem('ctg_profile') ?? '{}')
    return profile.language ?? 'ja'
  } catch {
    return 'ja'
  }
}

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n

// Call this when user changes language
export function changeLanguage(lang: string) {
  i18n.changeLanguage(lang)
}
