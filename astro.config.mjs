import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://baannockdown-nakhonsawan.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'th', locales: { th: 'th-TH' } },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  vite: { build: { cssCodeSplit: true } },
});
