import { writeFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig, type Plugin, type UserConfig } from 'vite';

import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { checker } from 'vite-plugin-checker';

import pkg from './package.json';

/**
 * Vite Configure
 *
 * @see {@link https://vitejs.dev/config/}
 */
export default defineConfig(({ command, mode }): UserConfig => {
  const config: UserConfig = {
    // https://vitejs.dev/config/shared-options.html#base
    base: './',
    // https://vitejs.dev/config/shared-options.html#define
    define: { 'process.env': {} },
    plugins: [
      // Vue3
      vue(),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        // vueTsc: true,
        // eslint: { lintCommand: 'eslint' },
        // stylelint: { lintCommand: 'stylelint' },
      }),
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
      // Element Plus
      // https://github.com/element-plus/unplugin-element-plus
      ElementPlus({
        // https://github.com/element-plus/unplugin-element-plus#usesource
        useSource: false,
        // https://github.com/element-plus/unplugin-element-plus#lib
        // lib: 'element-plus',
        // https://github.com/element-plus/unplugin-element-plus#format
        // format: 'esm',
        // https://github.com/element-plus/unplugin-element-plus#prefix
        // prefix: 'el'
        // https://github.com/element-plus/unplugin-element-plus#ignorecomponents
        ignoreComponents: [],
        // Replace default locale
        // see https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang
        // defaultLocale: 'ja',
      }),
      // UnoCSS
      // See uno.config.css
      UnoCSS(),
      // Fix Invalid event arguments.
      patchRawWindow(),
    ],
    // Resolver
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/element/index.scss" as *;',
        },
      },
    },
    // Build Options
    // https://vitejs.dev/config/build-options.html
    build: {
      // Build Target
      // https://vitejs.dev/config/build-options.html#build-target
      target: 'esnext',
      // Minify option
      // https://vitejs.dev/config/build-options.html#build-minify
      minify: 'esbuild',
      // Rollup Options
      // https://vitejs.dev/config/build-options.html#build-rollupoptions
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (
              id.includes('/node_modules/@vue/') ||
              id.includes('/node_modules/vue') ||
              id.includes('/node_modules/pinia') ||
              id.includes('/node_modules/destr/') || // pinia-plugin-persistedstate uses destr.
              id.includes('/node_modules/deep-pick-omit/') // pinia-plugin-persistedstate uses deep-pick-omit.
            ) {
              // Combine Vue and Pinia into a single chunk.
              // This is because Pinia is a state management library for Vue.
              return 'vue';
            }
            // TinyColor
            if (id.includes('/node_modules/@ctrl/tinycolor/')) {
              return 'tinycolor';
            }
            if (id.includes('/node_modules/element-plus/')) {
              return 'element-plus';
            }
            // Others
            if (id.includes('/node_modules/')) {
              return 'vendor';
            }
          },
          plugins: [
            mode === 'analyze'
              ? // rollup-plugin-visualizer
                // https://github.com/btd/rollup-plugin-visualizer
                visualizer({
                  open: true,
                  filename: 'dist/stats.html',
                })
              : undefined,
          ],
        },
      },
    },
    esbuild: {
      // Drop console when production build.
      drop: command === 'serve' ? [] : ['console'],
    },
  };

  // Write meta data.
  writeFileSync(
    fileURLToPath(new URL('./src/Meta.ts', import.meta.url)),
    `import type MetaInterface from '@/interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${pkg.version}',
  date: '${new Date().toISOString()}',
};
export default meta;
`
  );

  return config;
});

/**
 * Fix for Invalid event arguments: event validation failed for event "click".
 * @see {@link https://github.com/micro-zoe/micro-app/issues/756}
 */
function patchRawWindow(): Plugin {
  return {
    name: 'patchRawWindow',
    transform(code, id) {
      if (id.includes('/.vite/deps/chunk')) {
        let isFind = false;
        const _code = code.replace(
          /instanceof (([A-Z]+[a-zA-Z]+)?Event)/g,
          (_, $1: string) => {
            isFind = true;
            return `instanceof (patchRawWindow('${$1}') || ${$1})`;
          }
        );
        const fn = `function patchRawWindow(key) {
          if (window.__MICRO_APP_ENVIRONMENT__ && window[key]) {
            return window.rawWindow[key]
          } else {
            return false
          }
        }\n`;
        return isFind ? fn + _code : _code;
      }
      return code;
    },
  };
}
