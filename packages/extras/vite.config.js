import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, './index.js'),
      formats: ['es'],
      fileName: 'index'
    },
    rolldownOptions: {
      external: [
        'vue'
      ]
    }
  }
});

