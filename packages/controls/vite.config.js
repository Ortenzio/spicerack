import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByPlugin()
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
        'vue',
        '@ozio/spicerack-icons'
      ]
    }
  }
});

