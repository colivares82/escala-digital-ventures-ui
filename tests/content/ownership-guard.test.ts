/**
 * Commercial-terms guard — CONTENT-11 §3.4.
 *
 * Supersedes the SPEC-FIX-01 ownership guard, which only blocked "the client
 * owns the code" phrasings. The rule is now broader and simpler:
 *
 *   IP, licensing and ownership terms are NEVER published on the public site.
 *   They are agreed privately with each client during commercial negotiation.
 *
 * So this is a BLOCKLIST, not an allowlist: any occurrence of a commercial-terms
 * term in the scanned surfaces fails the build, regardless of who the term
 * attributes ownership to. Prospects reacted badly to contractual language on a
 * marketing site; the fix is to remove the subject entirely, not to reword it.
 *
 * Scanned:  content/**, app/**, lib/**, public/**\/*.txt, and the GENERATED
 *           /llms.txt body (there is no static llms.txt file — it is a route
 *           handler fed by lib/seo/llms-txt.ts, so the built string is checked).
 * Excluded: docs/**, specs/** (internal, may discuss terms), this guard itself,
 *           and the legal pages' own website-copyright notice (exact string).
 *
 * Runs in `npm test` and is therefore part of the CI gate.
 * Do NOT relax an assertion to make a change pass — remove the copy instead.
 */

import { readdirSync, readFileSync, statSync } from 'fs'
import { join, relative } from 'path'
import { describe, it, expect } from 'vitest'
import { buildLlmsTxt } from '@/lib/seo/llms-txt'

// ---------------------------------------------------------------------------
// Blocklisted commercial-terms vocabulary — CONTENT-11 §3.4.
// Matched case-insensitively AND accent-insensitively (see `normalise`), so
// "PROPIETAT INTEL·LECTUAL" and "propietat intel.lectual" both trip the ES/CA
// terms without needing separate patterns per accent form.
// ---------------------------------------------------------------------------
const BLOCKLIST: readonly string[] = [
  // ES
  'propiedad intelectual',
  'codigo fuente',
  'licencia de uso',
  'intransferible',
  'propiedad del codigo',
  // EN
  'intellectual property',
  'source code',
  'licence to use',
  'license to use',
  'non-transferable',
  // CA
  'propietat intel·lectual',
  'codi font',
  "llicencia d'us",
]

/**
 * Lowercase + strip diacritics so one blocklist entry covers every accent
 * variant. `·` (CA middle dot) is normalised to `.` because both spellings
 * appear in the wild; NFD decomposition does not touch it.
 *
 * Backslash-escaped apostrophes (`\'`, pervasive in the CA/ES dictionaries
 * because the strings are single-quoted) collapse to a plain apostrophe: the
 * scanner reads raw source, so without this an escaped string would never match
 * the sanctioned exception below and the legal notice would false-positive.
 */
function normalise(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/·/g, '.')
    .replace(/\\'/g, "'")
    .toLowerCase()
}

const NORMALISED_BLOCKLIST = BLOCKLIST.map((term) => ({
  term,
  needle: normalise(term),
}))

/**
 * Sanctioned exception (§3.1): the legal pages carry a standard website-content
 * copyright notice covering Escala's OWN texts, brand, design and source code.
 * That is site copyright, not client-platform ownership, so it stays — and it is
 * excluded by exact string rather than by file, so the rest of those files stays
 * guarded. Kept per locale; each must match the dictionary body verbatim.
 */
const ALLOWED_EXACT_STRINGS: readonly string[] = [
  // content/es/legal.ts — sección 03 Propiedad intelectual e industrial
  'Todos los contenidos del sitio —textos, marca, metodologías (incluido el Escala Growth Framework), diseño y código fuente— son propiedad de Escala Digital Ventures, S.L.U. o de terceros que han autorizado su uso, y están protegidos por la normativa española e internacional de propiedad intelectual e industrial. Las marcas de clientes se muestran con su autorización expresa. Queda prohibida su reproducción, distribución o modificación sin autorización escrita del titular.',
  // content/en/legal.ts — section 03 Intellectual property
  'All content on this site — texts, brand, methodologies (including the Escala Growth Framework), design and source code — is the property of Escala Digital Ventures, S.L.U. or of third parties who have authorised its use, and is protected by Spanish and international intellectual and industrial property law. Client brands are displayed with their express authorisation. Reproduction, distribution or modification without written authorisation from the owner is prohibited.',
  // content/ca/legal.ts — secció 03 Propietat intel·lectual i industrial
  "Tots els continguts del lloc —textos, marca, metodologies (inclòs l'Escala Growth Framework), disseny i codi font— són propietat d'Escala Digital Ventures, S.L.U. o de tercers que n'han autoritzat l'ús, i estan protegits per la normativa espanyola i internacional de propietat intel·lectual i industrial. Les marques de clients es mostren amb la seva autorització expressa. Queda prohibida la seva reproducció, distribució o modificació sense autorització escrita del titular.",
]

const NORMALISED_ALLOWED = ALLOWED_EXACT_STRINGS.map(normalise)

/**
 * The legal pages also carry SHORT section headings/titles that name the section
 * ("PROPIEDAD INTELECTUAL", "Intellectual and industrial property", …). Those are
 * only sanctioned inside the legal dictionaries: allowing them globally would let
 * a genuine violation elsewhere hide behind a two-word phrase, which is exactly
 * what an earlier revision of this guard did (an injected
 * "la propiedad intelectual …" went unreported because the heading string was
 * being stripped from every file). Scoped by file, and matched as whole lines.
 */
const LEGAL_FILE_PATTERN = /content[\\/](es|en|ca)[\\/]legal\.ts$/
const LEGAL_HEADINGS: readonly string[] = [
  'propiedad intelectual',
  'propiedad intelectual e industrial',
  'intellectual property',
  'intellectual and industrial property',
  'propietat intel·lectual',
  'propietat intel·lectual i industrial',
]
const NORMALISED_LEGAL_HEADINGS = LEGAL_HEADINGS.map(normalise)

/**
 * True when a line is nothing but a legal section heading/title assignment —
 * e.g. `name: 'PROPIEDAD INTELECTUAL',` or `title: 'Propiedad intelectual e
 * industrial',`. Anything longer than the heading itself is still scanned.
 */
function isLegalHeadingLine(filePath: string, rawLine: string): boolean {
  if (!LEGAL_FILE_PATTERN.test(filePath)) return false
  const value = /^\s*(?:name|title):\s*'([^']*)'\s*,?\s*$/.exec(rawLine)
  if (!value) return false
  return NORMALISED_LEGAL_HEADINGS.includes(normalise(value[1]).trim())
}

/**
 * Strip every sanctioned string from a line before scanning it, so an allowed
 * notice cannot mask an adjacent violation on the same line.
 */
function stripAllowed(normalisedLine: string): string {
  let out = normalisedLine
  for (const allowed of NORMALISED_ALLOWED) {
    out = out.split(allowed).join(' ')
  }
  return out
}

// ---------------------------------------------------------------------------
// Gmail leak guard — SPEC-P2.6 AC-5
// The internal recipient address must NEVER appear in client-side code.
// It lives only in server env (CONTACT_TO) and .env.example at repo root.
// Scan includes .env.example exclusion: that file is root-level, not in these dirs.
// ---------------------------------------------------------------------------
const GMAIL_ADDRESS = 'carlos.olivares.ve@gmail.com'

// ---------------------------------------------------------------------------
// File extensions to check (skip binaries, lockfiles, generated dirs).
// `.md` is included so a stray internal note in a scanned dir is still caught;
// docs/ and specs/ are excluded at the directory level instead.
// ---------------------------------------------------------------------------
const CHECKED_EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.txt'])

// ---------------------------------------------------------------------------
// Directories to scan (relative to repo root) — CONTENT-11 §3.4.
// `components` is retained from the SPEC-FIX-01 guard: it is a published
// surface, so dropping it would silently widen what may ship.
// ---------------------------------------------------------------------------
const SCAN_DIRS = ['content', 'app', 'lib', 'components', 'public']

// Directories to skip inside the scan roots
const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'docs',
  'specs',
])

/** This guard names every blocklisted term, so it must never scan itself. */
const SELF = 'tests/content/ownership-guard.test.ts'

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

describe('Commercial-terms guard — CONTENT-11 §3.4', () => {
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

  const scanned = filePaths.filter(
    (p) => relative(REPO_ROOT, p).split(/[\\/]/).join('/') !== SELF,
  )

  it('found at least one file to check', () => {
    expect(scanned.length).toBeGreaterThan(0)
  })

  // One test per blocklisted term, so a failure names the exact term (§3.4).
  for (const { term, needle } of NORMALISED_BLOCKLIST) {
    it(`no scanned file contains the blocklisted term: "${term}"`, () => {
      const violations: string[] = []
      for (const filePath of scanned) {
        // Scanned line by line rather than whole-file: a whole-file shortcut
        // would let one sanctioned occurrence suppress a real violation
        // elsewhere in the same file.
        readFileSync(filePath, 'utf-8')
          .split('\n')
          .forEach((line, idx) => {
            if (isLegalHeadingLine(filePath, line)) return
            if (!stripAllowed(normalise(line)).includes(needle)) return
            violations.push(
              `  ${relative(REPO_ROOT, filePath)}:${idx + 1}  →  "${term}"  in:  ${line.trim()}`,
            )
          })
      }
      expect(
        violations,
        `Commercial-terms violations for "${term}" — IP/licensing/ownership wording must not be published:\n${violations.join('\n')}`,
      ).toHaveLength(0)
    })
  }

  // The generated /llms.txt body: there is no static file to walk, so the built
  // string is checked directly. Without this, the AEO surface would be unguarded.
  describe('generated /llms.txt body', () => {
    const llms = normalise(buildLlmsTxt())

    for (const { term, needle } of NORMALISED_BLOCKLIST) {
      it(`does not contain the blocklisted term: "${term}"`, () => {
        expect(llms.includes(needle), `/llms.txt contains "${term}"`).toBe(false)
      })
    }
  })

  // Approval-subject correction (§2 C5/C7, AC-02): the client approves the
  // PROTOTYPE and additional scoped implementations — not every specification.
  describe('approval subject is the prototype, not every spec (AC-02)', () => {
    const RETIRED_APPROVAL_STRINGS: readonly string[] = [
      'se especifica y aprueba',
      'por que la apruebo',
      'lo apruebas tu',
      'every feature is specified and approved',
      'why do i approve it before you build',
      "s'especifica i s'aprova",
      "per que l'aprovo",
      "l'aproves tu",
    ]

    for (const phrase of RETIRED_APPROVAL_STRINGS) {
      it(`no scanned file contains: "${phrase}"`, () => {
        const needle = normalise(phrase)
        const violations: string[] = []
        for (const filePath of scanned) {
          const content = readFileSync(filePath, 'utf-8')
          if (!normalise(content).includes(needle)) continue
          content.split('\n').forEach((line, idx) => {
            if (normalise(line).includes(needle)) {
              violations.push(`  ${relative(REPO_ROOT, filePath)}:${idx + 1}  →  ${line.trim()}`)
            }
          })
        }
        expect(violations, `Retired approval wording found:\n${violations.join('\n')}`).toHaveLength(0)
      })
    }
  })

  // ── Gmail leak guard (SPEC-P2.6 AC-5) ──────────────────────────────────
  it(`no scanned file contains the internal Gmail address (AC-5)`, () => {
    const violations: string[] = []
    for (const filePath of scanned) {
      const fileContent = readFileSync(filePath, 'utf-8')
      if (fileContent.includes(GMAIL_ADDRESS)) {
        const lines = fileContent.split('\n')
        lines.forEach((line, idx) => {
          if (line.includes(GMAIL_ADDRESS)) {
            violations.push(`  ${relative(REPO_ROOT, filePath)}:${idx + 1}  →  ${line.trim()}`)
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
