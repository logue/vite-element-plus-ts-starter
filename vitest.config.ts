import { fileURLToPath } from 'node:url';

import { configDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [
    // Vue3
    vue(),
    // Element Plus
    // https://element-plus.org/en-US/guide/quickstart.html#vite
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    UnoCSS(),
  ],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    deps: {
      inline: [/element-plus/],
    },
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
});
