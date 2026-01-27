import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/B-TBM-100-BDX-1-1-yowl-3/',   // ← même nom que le repo
  plugins: [react()],
})
