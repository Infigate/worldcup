import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages (https://<owner>.github.io/worldcup/) 配信用のベースパス
  base: '/worldcup/',
})
