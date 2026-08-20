import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  build: {
    lib: {
      entry: fileURLToPath(
        new URL('./src/index.ts', import.meta.url)
      ),
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
    },
  },
});