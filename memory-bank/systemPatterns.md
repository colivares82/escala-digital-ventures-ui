# System Patterns

## Architecture pattern

This is a **single-package Next.js App Router site** — not a client/server monorepo. No `/server`, no `/client` split, no Prisma. All content is static.

```
Next.js App Router (SSG)
  └── app/                  # routes
  └── components/           # UI components (no 'use client' unless necessary)
  └── content/es/           # typed content dictionaries (source of truth for all copy)
  └── lib/                  # constants, utilities
  └── tests/                # Vitest + RTL
  └── docs/                 # ARCHITECTURE, BACKLOG, CHANGELOG, TRACEABILITY, Libro v2.1, Spec v1.1
  └── specs/                # implementation specs; specs/mockups/ for wireframes
  └── memory-bank/          # agent persistent context
  └── PLAN.md               # phase tracking and backlog backbone (repo root)
```

## Component pattern

**Component → Content → CSS** (not Component → Hook → Service as in the Escala SPA standard — there is no API layer in v1.)

- Components receive content as props — never import content directly (except `home-sections.tsx` which is a composition layer and imports for convenience)
- All user-facing strings come from `content/es/` dictionaries
- No hardcoded copy in component files (one documented exception: SVG node labels in `system-diagram.tsx` — justified by comment)
- `'use client'` only where browser APIs are needed (`motion-runtime.tsx`, `contact-form.tsx`, `phase-cycle.tsx`, `system-diagram.tsx`)

## CSS pattern

**BEM + Tailwind bridge** — not utility-first.

- All design tokens defined as CSS custom properties in `:root` in `app/globals.css`
- Tailwind's `@theme inline` bridges tokens to Tailwind names (`--color-background: var(--paper)`)
- Components use BEM class names (`.phase-cycle__pin`, `.readout__trace`) — NOT Tailwind classes in JSX
- Animations via CSS transitions triggered by `data-visible="true"` (set by `IntersectionObserver` in `useVisible`)
- One documented exception: `background: white` on `.client-chip` (approved for contrast against `--paper`)

## Content pattern

All copy in typed `as const` dictionaries:
- `content/es/shared.ts` — header, footer, accessibility labels, claims, contact-form copy
- `content/es/home.ts` — all home-page sections + labels + diagram captions
- `content/es/clients.ts` — MAGUPELL and BioZero client records
- `content/en/` and `content/ca/` — stubs (`pending-review`)

Adding a new interior page: add a new file under `content/es/`, add the page under `app/`, wire content as props. Zero changes to existing components.

## i18n routing pattern (Phase 1 — SPEC-P1)

Single catch-all route `app/[[...path]]/page.tsx`:
- `resolvePath(segments)` → `RouteResolution | null` — O(1) lookup via pre-built reverse map
- `dynamicParams = false` — unrecognized paths → 404; no runtime
- `generateStaticParams` emits only BUILT pages (Option A); interior pages added as Phase 2 builds them
- `generateMetadata` sets canonical + hreflang × 3 + x-default per resolved page
- `getDictionary(locale)` returns typed `Dictionary` bundle; Phase 1 returns ES for all locales

Adding a page: interface in `content/types.ts` + ES dict + EN/CA re-exports + route entry (if new) + component + `generateStaticParams` update. Full guide: `docs/adding-a-page.md`.

Known limitation: `<html lang>` is `"es"` globally; EN/CA get correct `lang` on `<main>` instead. Phase 6 middleware will fix `<html lang>` properly.

## Constants pattern

- **Routes (ES anchors):** `lib/routes.ts` — `ROUTES.*` and `ANCHORS.*`. Home page uses these.
- **Routes (i18n):** `lib/i18n/routes.ts` — `getPath`, `resolvePath`, `getAlternates`. All locale-aware routing uses this. Never hard-code localized slugs.
- **Motion:** `lib/motion-constants.ts` — all timings, thresholds, media queries. Never use magic numbers.
- **CSS tokens:** `--paper`, `--ink`, `--mar`, `--abisal`, `--ambre` in `:root`. Never use hex inline.
- **Site URL:** `lib/config.ts` — `SITE_URL` (env-aware). Never hard-code the domain.

## Animation pattern

Progressive enhancement with three layers:
1. **Default (reduced motion off, large screen):** full animations (Lenis smooth scroll, `WordReveal`, `DiagramReveal`, `PhaseCycle` scroll-driven ring)
2. **Mobile (`max-width: 767px`):** `PhaseCycle` collapses to static numbered list; other animations preserved
3. **`prefers-reduced-motion: reduce`:** all animations disabled; all content shown immediately; Lenis not loaded

The `useVisible` hook (inside `motion-runtime.tsx`) uses `IntersectionObserver` to set `data-visible="true"` on elements when they enter the viewport. CSS transitions fire on this attribute change.

## Testing pattern

Vitest + React Testing Library:
- `IntersectionObserver` mocked as a constructor class — fires immediately with `isIntersecting: true`
- `matchMedia` mocked to return `matches: false` (no reduced motion in tests)
- `requestAnimationFrame` mocked with `now + 10_000ms` to terminate animation loops on first tick
- `lenis/react` and `lenis/dist/lenis.css` mocked
- Content integrity tests guard against accidental removal of required copy keys
- 70% coverage threshold enforced in `vitest.config.ts` — gates CI

## Naming conventions

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS: `.BEM__block--modifier`
- Content keys: `camelCase`

## Spec-driven development loop

All implementation follows the spec-driven flow (per `.clinerules/agentic-workflow.md`):
1. Spec first (English, lives in `specs/`) → approved by Carlos
2. Wireframe if new UI (lives in `specs/mockups/`)
3. Implement → test → update traceability → update memory bank
