// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), starlight({
    title: 'Books & Notes',
    customCss: ['./src/styles/starlight.css'],
    components: {
      SiteTitle: './src/components/starlight/SiteTitle.astro',
    },
    sidebar: [
      {
        label: 'linear algebra',
        autogenerate: { directory: 'linear-algebra' }
      }
    ],
  }), mdx(), sitemap()],
  site: 'https://rduan.org',
  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-tw"],
    routing: {
      // false 代表預設語言 (en) 不會顯示 /en/ 前綴
      prefixDefaultLocale: false
    }
  }
});