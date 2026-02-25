import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API requests to the Express backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Forward image requests to the Express static delivery pipeline
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
