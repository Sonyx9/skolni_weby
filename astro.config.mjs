import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Pro GitHub Pages použijeme base path, site může být undefined nebo GitHub Pages URL
  base: '/skolni_weby/',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  build: {
    assets: '_assets',
  },
});

