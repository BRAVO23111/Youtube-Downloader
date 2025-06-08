// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react() , tailwindcss()],
  server: {
    proxy: {
      '/api': 'https://youtube-downloader-2-p47c.onrender.com',
    },
  },
}); 