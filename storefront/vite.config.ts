import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],

  server: {
    cors: true,
    host: 'localhost',
    port: 5173,
    proxy: {
      '/store': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/store/, ''),
      },
    },
  },
});

