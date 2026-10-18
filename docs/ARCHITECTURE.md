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
│   ├── [[...path]]/page.tsx # Catch-all: every localized route (home × 3, interior pages, /oportunidad)
│   └── styleguide/
│       └── page.tsx        # /styleguide — noindex dev reference (design system)
├── components/             # Typed presentational and interactive components
│   ├── claims-marquee.tsx  # Marquee strip (amber band, key claims) — /styleguide only since HOME-V2
│   ├── client-chip.tsx     # Case study chip with reveal animation
│   ├── contact-form.tsx    # Validated contact form → app/api/contact
│   ├── final-cta.tsx       # Site-wide contact section (ContactSection, #contacto)
│   ├── landing/            # HOME-V2: sections shared by the home and /oportunidad
│   │   ├── oportunidad-hero.tsx    # § 00 hero; variant 'home' | 'oportunidad'
│   │   ├── te-suena-section.tsx    # § 01 «¿Te suena?» self-diagnosis (only client island)
│   │   ├── oportunidad-story.tsx   # § Un lunes · Escenarios · Alianza
│   │   ├── oportunidad-closing.tsx # § Quién está detrás · Cómo empezamos
│   │   ├── evidence-section.tsx    # § 04 Evidencia (home only)
│   │   └── deep-links.tsx          # § 08 A fondo (home only)
│   ├── pages/              # Page composers: home.tsx, oportunidad.tsx, services.tsx, …
│   ├── motion-runtime.tsx  # Lenis wrapper + Reveal/WordReveal/CountUp/DiagramReveal
│   ├── phase-cycle.tsx     # Escala Growth Framework interactive ring (scroll-driven)
│   ├── readout.tsx         # Instrument-style data readout with sparkline
│   ├── section-index.tsx   # Eyebrow counter "00 / LABEL"
│   ├── site-chrome.tsx     # SiteHeader + SiteFooter
│   └── system-diagram.tsx  # SVG diagram plates — /styleguide only since HOME-V2
├── content/
│   ├── types.ts            # Dictionary contracts (incl. LandingSections, HomeLandingContent)
│   ├── data/cases.ts       # Case studies — single source, per-locale copy
│   ├── es/                 # Spanish master copy
│   │   ├── home.ts         # Home meta + slices other pages reuse (framework, proof, allianceFigure) + landing
│   │   ├── home-landing.ts # HOME-V2: visible copy of home sections 00–08
│   │   ├── oportunidad.ts  # /oportunidad (ES only)
│   │   └── shared.ts       # Header, footer, claims, contact-form copy, a11y labels
│   ├── en/                 # Full EN dictionaries (same shapes as ES; coverage-guarded)
│   └── ca/                 # Full CA dictionaries (same shapes as ES; coverage-guarded)
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

### Home — composed from shared landing sections (HOME-V2)
The home (`components/pages/home.tsx`) renders 00 Hero · 01 ¿Te suena? · 02 Un lunes · 03 Escenarios ·
04 Evidencia · 05 Alianza · 06 Quién · 07 Cómo empezamos · 08 A fondo · A Contacto. Sections
00–03 and 05–07 are the same components `/oportunidad` renders (`components/landing/`); where the
pages differ, one explicit prop decides (hero `variant`; `StartSection` shows the price/offer boxes
only when the dictionary carries them; link targets are passed in). Never fork a section.

- **Copy:** `dict.home.landing` (`content/{es,en,ca}/home-landing.ts`). The ES file spreads the
  `/oportunidad` dictionary for unchanged sections, so the two pages cannot drift.
- **Price rule:** the home carries no price/offer copy. `HomePage` strips the ES-only `oportunidad`
  slice before handing `dict` to the client `FinalCTA`, because a client component's props are
  serialized into the page's RSC payload (i.e. shipped in the HTML) even when unread.
- **Guards:** `tests/components/home-page.test.tsx` (order, anchors, H1, price rule, routes);
  `/oportunidad` output must stay unchanged when a shared section is edited.

### Routes
All internal links use constants from `lib/routes.ts` (`ROUTES.*`, `ANCHORS.*`). No inline string literals for URLs. EN/CA slug maps are reserved for future implementation in `lib/i18n/routes.ts`.

### Contact form
Client-side validation plus `app/api/contact` (server) → `lib/email.ts`. One shared `ContactSection`
renders `/contacto` (page mode) and the end-of-page `#contacto` block (section mode, via `FinalCTA`).

## Security headers

Defined in `next.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
