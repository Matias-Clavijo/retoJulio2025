import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://back-2025-gestion-stock-ventas.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
