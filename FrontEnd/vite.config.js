import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {//if it starts with api
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
    
  },
  plugins: [react()],
})
