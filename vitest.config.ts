import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    /**
     * `next build` with `output: 'standalone'` copies the project — tests
     * included — into .next/standalone/. Without this exclusion, running the
     * suite after a build collects every spec twice (once from source, once
     * from the build artefact), which double-counts tests and skews coverage.
     * Defaults are restated because supplying `exclude` overrides them.
     */
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    coverage: {
      provider: 'v8',
      include: ['components/**', 'lib/**', 'content/**'],
        exclude: [
          '**/__tests__/**',
          '**/*.test.*',
          'tests/**',
          // Build artefact copy of the source — see the note on test.exclude.
          '.next/**',
          // Type-only file — interface declarations only, no runtime code
          'content/types.ts',
          // Locale stub files — intentionally empty pending translation review (Phase 5)
          'content/ca/**',
          'content/en/**',
          // Utility available for future use; not yet called in production code
          'lib/utils.ts',
        ],
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
