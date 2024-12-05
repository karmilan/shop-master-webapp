import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', devOptions: {
      enabled: true
    },
    strategies: "injectManifest",
    srcDir: 'src',
    filename: 'sw.ts',
    // registerType:'autoUpdate',
    injectManifest: {
      swDest: 'dist/sw.js',
      swSrc: 'src/sw.js',
    },
    manifest: {
      "short_name": "MDN",
      "name": "MDN Web Docs",
      "icons": [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      "start_url": "/",
      "display": "standalone",
      "theme_color": "#000000",
      "background_color": "#ffffff",
      "orientation": "portrait"
    }

  })],
})
