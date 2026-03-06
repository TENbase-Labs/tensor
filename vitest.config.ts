import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.storybook/**', '**/storybook-static/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      reportsDirectory: './coverage',
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/dist/**',
        '**/node_modules/**',
        '**/.storybook/**',
        '**/storybook-static/**',
        '**/coverage/**',
        '**/src/test/**',
        '**/scripts/**',
        '**/*.config.{js,ts}',
        '**/sd.config.js',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './packages/tensor/src/components'),
      '@/tokens': resolve(__dirname, './packages/tensor/src/tokens'),
    },
  },
})
