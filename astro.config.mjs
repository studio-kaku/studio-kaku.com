import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import jaPages from './integrations/ja-pages.mjs';

export default defineConfig({
  site: 'https://studio-kaku.com',
  integrations: [jaPages()],
  vite: {
    plugins: [tailwindcss()],
  },
});
