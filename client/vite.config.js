import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://jiitech.onrender.com" || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
})
