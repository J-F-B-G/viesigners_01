// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-domain.com',
  srcDir: './src',
  publicDir: './public',
  build: {
    format: 'directory',
  },
});
