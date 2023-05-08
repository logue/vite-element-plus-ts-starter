import { fileURLToPath } from 'node:url';

import { configDefaults, defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

/**
 * Vitest Configure
 *
 * @see {@link https://vitest.dev/config/}
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      deps: {
        inline: [/element-plus/],
      },
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  })
);
