import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Používáme základní cestu pro nasazení na vlastní doménu (CNAME)
  base: '/',
  // Doporučené: nastavit `site` pro správné canonical/OG URL když máte vlastní doménu
  site: 'https://skolniweby.cz',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});

