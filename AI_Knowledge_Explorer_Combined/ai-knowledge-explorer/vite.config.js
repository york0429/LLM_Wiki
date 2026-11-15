import { defineConfig } from 'vite';

export default defineConfig({
  // 相對路徑適用於本機預覽，未預設任何公開部署環境。
  base: './',
  server: { host: '127.0.0.1' },
});
