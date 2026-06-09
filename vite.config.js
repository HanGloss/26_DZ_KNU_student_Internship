import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 프로젝트 페이지(/<repo>/)에서 자산 경로가 깨지지 않도록 상대경로 사용.
  // HashRouter와 함께 쓰면 레포 이름이 바뀌어도 수정할 필요가 없다.
  base: './',
  server: {
    port: 5173,
    open: true,
  },
});
