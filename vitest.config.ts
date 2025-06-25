import { defineConfig } from 'vitest/config';
// import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    // vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom', 
    setupFiles: ['./vitest.setup.ts'],
    include: ['test/**/*.test.{ts,js}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/main.ts',
        'src/App.vue',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});