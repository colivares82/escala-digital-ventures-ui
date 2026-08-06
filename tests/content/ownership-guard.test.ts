/**
 * Ownership guard — SPEC-FIX-01 FR-4.
 *
 * Scans `content/`, `components/`, and `app/` for patterns that assert the
 * client owns the source code or IP. Any match = test failure.
 *
 * Corrected model (Libro v2.2 Ch. 13):
 *   - Client gets: indefinite USE LICENCE over their platform + DATA OWNERSHIP.
 *   - Code and IP: belong to Escala.
 *   - Sector exclusivity: Escala won't reuse the system for the client's competitors.
 *
 * This test runs in `npm test` and is therefore part of the CI gate.
 * If you need to add a legitimate variant, discuss with Carlos first and update
 * the corrected wording in `content/es/services.ts` (§3.1) before removing it here.
 */

import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { describe, it, expect } from 'vitest'

// ---------------------------------------------------------------------------
// Forbidden patterns — any match in the source tree = fail (FR-4.1)
// ---------------------------------------------------------------------------
const FORBIDDEN_PATTERNS = [
  /propietario de (tu|su) código/i,
  /propietario de tu plataforma, tu código/i,
  /tu código y tus datos/i,
  /dueño del código/i,
]

// ---------------------------------------------------------------------------
// Gmail leak guard — SPEC-P2.6 AC-5
// The internal recipient address must NEVER appear in client-side code.
// It lives only in server env (CONTACT_TO) and .env.example at repo root.
// Scan includes .env.example exclusion: that file is root-level, not in these dirs.
// ---------------------------------------------------------------------------
const GMAIL_ADDRESS = 'carlos.olivares.ve@gmail.com'

// ---------------------------------------------------------------------------
// File extensions to check (skip binaries, lockfiles, generated dirs)
// ---------------------------------------------------------------------------
const CHECKED_EXTENSIONS = new Set(['.ts', '.tsx', '.md'])

// ---------------------------------------------------------------------------
// Directories to scan (relative to repo root)
// ---------------------------------------------------------------------------
const SCAN_DIRS = ['content', 'components', 'app']

// Directories to skip inside the scan roots
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build'])

// ---------------------------------------------------------------------------
// Recursive file collector
// ---------------------------------------------------------------------------
function collectFiles(dir: string): string[] {
  const results: string[] = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectFiles(full))
    } else if (entry.isFile()) {
      const ext = entry.name.slice(entry.name.lastIndexOf('.'))
      if (CHECKED_EXTENSIONS.has(ext)) {
        results.push(full)
      }
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// Resolve repo root (two levels up from tests/content/)
// ---------------------------------------------------------------------------
const REPO_ROOT = join(__dirname, '..', '..')

describe('Ownership guard — SPEC-FIX-01 FR-4', () => {
  const filePaths: string[] = []
  for (const dir of SCAN_DIRS) {
    const full = join(REPO_ROOT, dir)
    try {
      statSync(full)
      filePaths.push(...collectFiles(full))
    } catch {
      // directory doesn't exist — skip
    }
  }

  it('found at least one file to check', () => {
    expect(filePaths.length).toBeGreaterThan(0)
  })

  // One test per forbidden pattern so failures name the exact pattern.
  for (const pattern of FORBIDDEN_PATTERNS) {
    it(`no file contains the forbidden pattern: ${pattern}`, () => {
      const violations: string[] = []
      for (const filePath of filePaths) {
        const content = readFileSync(filePath, 'utf-8')
        if (pattern.test(content)) {
          // Collect line numbers for diagnostics
          const lines = content.split('\n')
          lines.forEach((line, idx) => {
            if (pattern.test(line)) {
              violations.push(`  ${filePath}:${idx + 1}  →  ${line.trim()}`)
            }
          })
        }
      }
      expect(violations, `Ownership violations found:\n${violations.join('\n')}`).toHaveLength(0)
    })
  }

  // ── Gmail leak guard (SPEC-P2.6 AC-5) ──────────────────────────────────
  it(`no file in content/, components/, or app/ contains the internal Gmail address (AC-5)`, () => {
    const violations: string[] = []
    for (const filePath of filePaths) {
      const fileContent = readFileSync(filePath, 'utf-8')
      if (fileContent.includes(GMAIL_ADDRESS)) {
        const lines = fileContent.split('\n')
        lines.forEach((line, idx) => {
          if (line.includes(GMAIL_ADDRESS)) {
            violations.push(`  ${filePath}:${idx + 1}  →  ${line.trim()}`)
          }
        })
      }
    }
    expect(
      violations,
      `Gmail address found in client-visible files (must stay server-only):\n${violations.join('\n')}`,
    ).toHaveLength(0)
  })
})
