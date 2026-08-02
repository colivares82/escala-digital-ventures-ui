import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['components/**', 'lib/**', 'content/**'],
      exclude: ['**/__tests__/**', '**/*.test.*', 'tests/**'],
      thresholds: {
        lines:      70,
        statements: 70,
        functions:  70,
        branches:   70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
