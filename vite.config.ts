import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "^/(login|signup|logout|me|save|saved)(/|$)": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
