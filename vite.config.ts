import { dirname } from 'path';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const currentDir = __dirname.split('/').slice(-1).join();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `${currentDir}/assets/[name]-[hash][extname]`,
        chunkFileNames: `${currentDir}/assets/[name].js`,
        entryFileNames: `${currentDir}/assets/[name]-[hash].js`
      }
    },
  },
})
