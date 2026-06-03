// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://viesigners.github.io',
  srcDir: './src',
  publicDir: './public',
  build: {
    format: 'directory',
  },
});
