import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Importe o 'path' do Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ADICIONE ESTA SECÇÃO 'RESOLVE' ---
  resolve: {
    alias: {
      // Define que o atalho '@' aponta para o diretório 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
})