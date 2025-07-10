import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './'),
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
  }
})
