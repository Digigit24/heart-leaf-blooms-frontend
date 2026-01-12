import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://heart-leaf-blooms-backend.onrender.com', // Your backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if backend doesn't use it, OR keep it if it does.
        // CAUTION: User's client.js uses base URL without /api prefix?
        // Actually, let's verify client.js paths. 
        // client.js base is 'https://heart-leaf-blooms-backend.onrender.com'.
        // Endpoints are like '/vendor/login'.
        // So we should proxy all requests that DON'T look like assets?
        // Safer: Proxy specific paths or define a prefix.
        // Let's assume we change client.js to use /api prefix.
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
})
