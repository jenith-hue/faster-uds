import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    libInjectCss(),
  ],

  build: {
    cssCodeSplit: true,
    lib: {
      // entry: fileURLToPath(
      //   new URL('./src/index.ts', import.meta.url)
      // ),
      entry: './src/index.ts',
      name: 'Faster',
      formats: ['es', 'cjs'],
      cssFileName: 'faster',
      fileName: (format) =>
        format === 'es' ? 'faster.js' : 'faster.cjs',
    },

    rolldownOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css')
            ? 'library.css'
            : 'assets/[name]-[hash][extname]',
      },
    },
  },
});
