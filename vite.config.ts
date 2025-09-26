import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // PWAの manifest.json の設定
      manifest: {
        name: 'weather-notify', // アプリ名
        short_name: 'weather-notify', // ホーム画面に表示される短い名前
        description: '雨の接近を知らせるアプリ', // 説明
        theme_color: '#ffffff', // テーマカラー
        // アプリアイコンの設定
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
