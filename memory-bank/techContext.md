# Tech Context

## Stack — deliberate deviations from standard Escala template

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Runtime | Node.js | ≥22 | Enforced in `package.json` engines |
| Framework | Next.js (App Router) | ^16 | SSG marketing site; Vite+React SPA not suitable for multi-locale static routing |
| Language | TypeScript | 5.7.3 strict | |
| Styling | Tailwind CSS 4 + custom BEM CSS | ^4.3.3 | Tailwind used for `@theme` bridge only; BEM classes drive the design system |
| Fonts | Archivo · Instrument Sans · IBM Plex Mono | Google Fonts | Self-hosted via `next/font` — zero third-party font requests |
| Smooth scroll | Lenis | ^1.3.25 | Progressive enhancement; disabled for `prefers-reduced-motion` |
| Utilities | clsx + tailwind-merge | ^2.1.1 / ^3.3.0 | `cn()` in `lib/utils.ts`; currently unused but available |
| Testing | Vitest + RTL + jsdom | ^4.1.10 / ^16 | No Jest (no NestJS server) |
| Linting | ESLint + eslint-config-next | ^9 / 16.2.12 | |
| Animation CSS | tw-animate-css | ^1.4.0 | Imported in `globals.css` |

## Standard Escala stack NOT used (intentional)

| Standard | Reason absent |
|----------|---------------|
| Vite (SPA) | Next.js needed for SSG, `hreflang`, `sitemap.xml` |
| NestJS server | No backend in v1 |
| Prisma / PostgreSQL | No database in v1 |
| shadcn/Radix | Bespoke design system; no UI library components used |
| framer-motion | Lenis + CSS transitions cover v1 needs |
| date-fns | No date display in v1 |
| native fetch / MSW | No API client in v1 (contact form does not transmit yet) |
| Jest | Vitest used instead (no NestJS) |

## Dev commands

```bash
npm install
npm run dev          # Next.js dev server
npm run build        # Next.js production build
npm run start        # Run production build locally
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check
npm test             # Vitest run
npm run test:watch   # Vitest interactive
npm run test:coverage # Vitest + v8 coverage (enforces 70% gate)
```

## Configuration files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Security headers (CSP, HSTS, etc.) |
| `tsconfig.json` | Strict TS + `@/*` path alias + vitest/globals types |
| `vitest.config.ts` | Vitest + jsdom + 70% coverage threshold |
| `eslint.config.mjs` | Next.js + TypeScript rules |
| `postcss.config.mjs` | Tailwind CSS 4 PostCSS plugin |
| `components.json` | shadcn config (present but shadcn not actively used) |

## Path alias

`@/*` → project root (`./`). Example: `import { ROUTES } from '@/lib/routes'`.

## Font variables

| Variable | Typeface | Weights | Used for |
|----------|----------|---------|----------|
| `--font-archivo` | Archivo | 500, 600 | Display headings (H1–H2, claims) |
| `--font-instrument-sans` | Instrument Sans | 400, 500 | Body copy |
| `--font-ibm-plex-mono` | IBM Plex Mono | 400, 500 | Labels, eyebrows, form labels, data |

## Design tokens (CSS custom properties in `:root`)

```
--paper:               #f7f7f4   /* page background */
--ink:                 #16181d   /* text */
--mar:                 #0e3a5d   /* primary accent — links, buttons, active states */
--abisal:              #0a2b45   /* dark surface */
--ambre:               #ffb703   /* amber — tick marks, highlights ONLY */
--abisal-gradient-end: #082238   /* gradient end in framework/phase-cycle backgrounds */
--line:                rgba(22,24,29,0.2)
--line-light:          rgba(247,247,244,0.2)
```

## Deployment target

Google Cloud Run (containerized), separate dev and prod environments. CI/CD: GitHub Actions. Not yet configured — see `docs/BACKLOG.md` for infra items.
