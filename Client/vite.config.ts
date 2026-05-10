import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      '@tanstack/react-query-devtools',
    ],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      '@tanstack/react-query-devtools',
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mkcert(),
  ],
})
