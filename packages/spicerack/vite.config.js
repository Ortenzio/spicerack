import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByPlugin from 'vite-plugin-css-injected-by-js';
import { version } from './package.json' with { type: 'json' };
import { readFileSync } from 'node:fs';

process.env.VITE_Spicerack_VERSION = version;

function emitTypes () {
  return {
    name: 'spicerack-emit-types',
    generateBundle () {
      this.emitFile({
        type: 'asset',
        fileName: 'types/index.d.ts',
        source: readFileSync(new URL('./src/types/spicerack.d.ts', import.meta.url), 'utf8')
      });
    }
  };
}

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByPlugin(),
    emitTypes()
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  build: {
    minify: true,
    lib: {
      entry: resolve(import.meta.dirname, './index.js'),
      formats: ['es'],
      fileName: 'index'
    }
  }
});
