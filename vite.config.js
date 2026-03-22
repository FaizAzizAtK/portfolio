import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/portfolio/',
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
