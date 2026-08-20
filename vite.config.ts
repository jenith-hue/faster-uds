/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),

    react(),

    babel({
      presets: []
    }),
  ],

  test: {
    projects: [
      {
        extends: true,

        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],

        test: {
          name: 'storybook',

          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),

            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },

  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'Faster',
      fileName: 'faster',
      formats: ['es', 'umd'],
    },

    rollupOptions: {
      // React must NOT be bundled inside your UI library
      external: ['react', 'react-dom', 'react-dom/client'],

      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },

        // Explicitly ensure modules are bundled
        preserveModules: false,
      },
    },

    // Don't copy source structure into dist
    emptyOutDir: true,
  },
});