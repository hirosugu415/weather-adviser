import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        swSrc: 'src/sw.ts',
        swDest: 'dist/sw.js'
      },
      
      manifest: {
        name: 'weather-notify',
        short_name: 'weather-notify',
        description: '雨の接近を知らせるアプリ',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'weather-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'weather-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/weather-adviser/'
})