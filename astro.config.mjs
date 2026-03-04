import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://studio-kaku.com',
  integrations: [tailwind()],
});
