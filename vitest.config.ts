import { fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

// @ts-expect-error
import viteConfig from './vite.config';

/**
 * Vitest Configure
 *
 * @see {@link https://vitest.dev/config/}
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      // @ts-expect-error
      vue(),
    ],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      deps: {
        //  inline: [/element-plus/],
      },
    },
  })
);
