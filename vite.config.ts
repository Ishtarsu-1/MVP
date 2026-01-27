import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/MVP/',   // 👈 important pour GitHub Pages
  plugins: [react()],
})
