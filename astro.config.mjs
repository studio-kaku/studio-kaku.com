import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://studio-kaku.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
