// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Production is the live domain. A preview deployment (GitHub Pages, a Cloudflare preview
  // branch) sets SITE_URL so canonical tags and the sitemap point at the preview instead.
  site: process.env.SITE_URL || 'https://www.quantumcomms.com.au',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you/') && !page.includes('/downloads/') && !page.includes('/404'),
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  // Smartypants is off on purpose. It rewrites markdown bodies only, so the same apostrophe
  // rendered curly in a service body but straight in that page's frontmatter, in every .astro
  // template and in the registers. It also turns a typed "--" into an en dash, and house style
  // carries no dash glyphs (see NOT_STATED in src/lib/facts.ts and spellRanges on the plant lists).
  // With it off, every page renders exactly the characters written in the source.
  markdown: { smartypants: false },
  // Emit every <script> as an external file so the strict CSP in public/_headers (script-src 'self') allows it.
  vite: { build: { assetsInlineLimit: 0 } },
});
