import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
  server: {
    https: true,
    host: 'localhost'
  }
});