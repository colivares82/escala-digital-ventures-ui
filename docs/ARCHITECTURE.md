# Architecture

> Cross-linked docs: [BACKLOG](./BACKLOG.md) · [CHANGELOG](./CHANGELOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md)

## Overview

`escala-digital-ventures-ui` is the corporate marketing website for Escala Digital Ventures, S.L.U. It is a **static Next.js application** (App Router, SSG) — not a full-stack monorepo. There is no server module, no database, and no backend API in this repository (v1).

## Stack (deliberate deviations from standard Escala template)

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | **Next.js 16 (App Router)** | SSG for marketing site; SEO, OG images, `hreflang`, `sitemap.xml`. Standard stack uses Vite+React SPA, which doesn't cover static multi-locale routing. |
| CSS | **Tailwind CSS 4 + custom CSS** | Design system uses bespoke BEM classes for the "Sistemas en movimiento" identity (spec v1.1 §3). Tailwind is used for bridge tokens only (`@theme`). |
| Animation | **Lenis** (smooth scroll) | Progressive enhancement; disabled when `prefers-reduced-motion` is set. |
| Testing | **Vitest + RTL** | Aligned with Escala standard; Jest not used because there is no NestJS server here. |
| No shared/ | Content in `content/` | There is no client/server split; shared types stay in project root. |

## Folder structure

```
escala-digital-ventures-ui/
├── app/                    # Next.js App Router routes + global CSS
│   ├── globals.css         # All design tokens + component styles (expanded, documented)
│   ├── layout.tsx          # Root layout: fonts, metadata, viewport
│   ├── page.tsx            # Home page (/)
│   └── styleguide/
│       └── page.tsx        # /styleguide — noindex dev reference (design system)
├── components/             # Typed presentational and interactive components
│   ├── claims-marquee.tsx  # Marquee strip (amber band, key claims)
│   ├── client-chip.tsx     # Case study chip with reveal animation
│   ├── contact-form.tsx    # Client-side validated contact form (browser-only in v1)
│   ├── final-cta.tsx       # Final CTA section (section 06)
│   ├── home-sections.tsx   # Home page section composition
│   ├── motion-runtime.tsx  # Lenis wrapper + Reveal/WordReveal/CountUp/DiagramReveal
│   ├── phase-cycle.tsx     # Escala Growth Framework interactive ring (scroll-driven)
│   ├── readout.tsx         # Instrument-style data readout with sparkline
│   ├── section-index.tsx   # Eyebrow counter "00 / LABEL"
│   ├── site-chrome.tsx     # SiteHeader + SiteFooter
│   └── system-diagram.tsx  # SVG proof diagrams (hero, problem, proof, alliance)
├── content/
│   ├── es/                 # Spanish master copy (approved, final)
│   │   ├── clients.ts      # Client records (MAGUPELL, BioZero)
│   │   ├── home.ts         # All home-page copy + labels + diagram captions
│   │   └── shared.ts       # Header, footer, claims, contact-form copy, a11y labels
│   ├── en/index.ts         # Reserved (pending professional review)
│   └── ca/index.ts         # Reserved (pending professional review)
├── lib/
│   ├── motion-constants.ts # All animation timing/threshold constants
│   ├── routes.ts           # All route + anchor constants (ROUTES, ANCHORS)
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
├── tests/
│   ├── setup.ts            # Vitest global mocks (IO, matchMedia, RAF)
│   ├── components/         # RTL component tests
│   ├── content/            # Content integrity tests
│   └── lib/                # Lib unit tests
├── docs/                   # Project documentation (this folder)
├── memory-bank/            # Agent persistent context
├── DECISIONS.md            # Approved design decisions
└── TODO.md                 # (superseded by docs/BACKLOG.md — kept for reference)
```

## Key design decisions

### Content architecture
All page copy lives in typed `const` dictionaries under `content/es/`. Components receive content as props and never contain inline user-facing strings. This enables future locale switching without component changes.

### CSS strategy — BEM + Tailwind bridge
The design system uses handcrafted BEM classes (`.phase-cycle__pin`, `.readout__trace`, etc.) for the bespoke "Sistemas en movimiento" identity (spec v1.1 §3). Tailwind's `@theme` directive bridges Escala tokens (`--paper`, `--mar`, etc.) to Tailwind's expected CSS variable names. No Tailwind utility classes are used in components — only design token variables via CSS.

### Motion — progressive enhancement
All animations use CSS transitions triggered by `data-visible="true"` set from `IntersectionObserver`. Lenis smooth scroll wraps the page only when `prefers-reduced-motion` is not set. Constants live in `lib/motion-constants.ts`.

### Phase Cycle component
The `PhaseCycle` component (`components/phase-cycle.tsx`) renders the Escala Growth Framework as a scroll-driven sticky experience on desktop, degrading to a static numbered list on mobile (`max-width: 767px`) and for reduced-motion users. It is always wrapped by `.framework-cycle` on this site.

### Routes
All internal links use constants from `lib/routes.ts` (`ROUTES.*`, `ANCHORS.*`). No inline string literals for URLs. EN/CA slug maps are reserved for future implementation in `lib/i18n/routes.ts`.

### Contact form
Client-side validation only in v1. The form does not transmit data. Server-side API + email provider connection is the top BACKLOG item. See `docs/BACKLOG.md`.

## Security headers

Defined in `next.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
