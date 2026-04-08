import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'China Travel Guide',
        short_name: 'China Travel',
        description: 'Your complete companion for traveling China',
        theme_color: '#E8342A',
        background_color: '#F8F6F3',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.frankfurter\.dev\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'exchange-rates', expiration: { maxAgeSeconds: 3600 } },
          },
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'weather', expiration: { maxAgeSeconds: 1800 } },
          },
          {
            urlPattern: /^https:\/\/en\.wikivoyage\.org\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'wikivoyage', expiration: { maxAgeSeconds: 86400 } },
          },
        ],
      },
    }),
  ],
})
