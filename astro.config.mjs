// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(), 
    starlight({
      title: 'Books & Notes',
      customCss: ['./src/styles/starlight.css'],
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
      },
      sidebar: [
        {
          label: 'Books',
          autogenerate: { directory: 'books' }
        }
      ],
    }),
    mdx()
  ],
  site: 'https://Rduanchen.github.io',
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