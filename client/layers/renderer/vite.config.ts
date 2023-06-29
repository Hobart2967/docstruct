import path from 'path';

import { defineConfig } from 'vite';

import solidPlugin from 'vite-plugin-solid';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: '../../dist/renderer',
  },
  define: {global: "window"},
  plugins: [
    solidPlugin({
      babel: {
        plugins: [['@babel/plugin-proposal-decorators', {
          legacy: true
        }]],
      },
    }),
    viteStaticCopy({
      targets: [{
        src: path.resolve(__dirname, './src/assets') + '/[!.]*', // 1️⃣
        dest: './assets', // 2️⃣
      }]
    }),
  ],
});