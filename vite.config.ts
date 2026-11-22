import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 5190 },
  build: {
    rollupOptions: {
      // 메인과 상세 페이지 2개를 각각 실제 HTML로 만든다 (GitHub Pages에서 주소로 바로 열림)
      input: {
        main: 'index.html',
        planning: 'planning/index.html',
        ax: 'ax/index.html',
      },
    },
  },
})
