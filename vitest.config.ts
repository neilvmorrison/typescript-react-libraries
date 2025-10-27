import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'build/'],
    },
  },
  resolve: {
    alias: {
      '@libraries/utilities': '/packages/utilities/src/index.ts',
      '@libraries/hooks': '/packages/hooks/src/index.ts',
      '@libraries/primitives': '/packages/primitives/src/index.ts',
    },
  },
});
