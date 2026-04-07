/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8342A',
        'primary-dark': '#C02A22',
        'primary-light': '#FFF0EF',
        navy: '#1A1A2E',
        'navy-light': '#2D2D4A',
        gold: '#F5A623',
        'gold-light': '#FFF8EC',
        success: '#27AE60',
        'success-light': '#E8F8EF',
        warning: '#F39C12',
        'warning-light': '#FEF9EC',
        'bg-app': '#F8F6F3',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        chip: '8px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
