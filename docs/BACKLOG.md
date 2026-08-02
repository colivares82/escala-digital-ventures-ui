# Backlog

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [CHANGELOG](./CHANGELOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md)

Items ordered by priority. The first open item is always "what to work on next."

---

## P0 — Must do before go-live

### [CONTACT-01] Connect contact form to API + email provider
- Add Next.js API route (`app/api/contact/route.ts`)
- Server-side validation (zod schema mirroring client validation)
- Honeypot field (anti-spam)
- Rate limiting per IP
- Transactional email via the same provider used in MAGUPELL
- Success/error response handled by `ContactForm` via fetch
- Confirm final `hola@escaladigitalventures.com` address with Carlos before wiring
- **Dependencies:** none

### [I18N-01] Locale routing — EN and CA
- Implement `app/[locale]/` segment routing following `lib/routes.ts` slug map
- Create `lib/i18n/routes.ts` with EN/CA slug → ES-default mapping
- Add `hreflang` alternates + `x-default` to every page
- Locale switcher preserves current page
- Professional translation review by Carlos before any locale is indexed
- **Content status:** `content/en/index.ts` and `content/ca/index.ts` are stubs marked `pending-review`

### [SEO-01] Metadata per page
- `title ≤ 60 chars`, `description ≤ 155 chars` per page per spec §7
- OG image generated with identity (paper background, claim, rule motif)
- `sitemap.xml` with all locale alternates
- `robots.txt` (index all except `/styleguide`)
- Structured data: `Organization` + `ProfessionalService` on home; `BreadcrumbList` on inner pages

---

## P1 — Interior pages (all spec §5)

### [PAGE-01] Qué hacemos `/que-hacemos`
- 5 service sections (problem-first, what-we-do paragraph per spec §5.2)
- IdealClientNote section + CTA

### [PAGE-02] Cómo trabajamos `/como-trabajamos`
- FrameworkFull: interactive `PhaseCycle` with full phase descriptions
- ExecutionPractice: 5 practices (H3 + paragraph)
- HowWeBuild section
- FinalCTA

### [PAGE-03] Casos de éxito index + detail pages
- Index: `/casos-de-exito` — two CaseStudyCards
- MAGUPELL: `/casos-de-exito/magupell` — narrative from spec §5.4
- BioZero: `/casos-de-exito/biozero` — narrative from spec §5.4
- CaseStudy template: eyebrow, H1, ImpactReadouts, narrative sections

### [PAGE-04] Modelo de alianza `/modelo-de-alianza`
- WhyFive, ThreePlanes, Commitments (vertical rule), FinalCTA

### [PAGE-05] Sobre Escala `/sobre-escala`
- DNA, Values (5), Experience (anonymized, per spec §5.6), Manifesto (10 beliefs)
- FinalCTA

### [PAGE-06] Contacto `/contacto`
- Dedicated contact page (reuses `ContactForm` + live API from CONTACT-01)

### [PAGE-07] Legal pages
- Aviso legal `/aviso-legal` — LSSI-CE data (Carlos to provide final CIF, address, registry)
- Privacidad `/privacidad` — RGPD privacy policy

---

## P2 — Quality and analytics

### [ANALYTICS-01] Cookieless analytics
- Integrate Plausible (self-hosted) or equivalent per spec §5.8
- No cookie banner required (cookieless)
- Conversion events: contact form submit, CTA clicks

### [PERF-01] Lighthouse ≥ 95 in all categories
- Fonts already self-hosted via `next/font`
- Verify zero third-party scripts post-analytics
- Image optimization: real case-study imagery if clients provide

### [TEST-01] Increase test coverage
- Add tests for `PhaseCycle`, `SystemDiagram`, `SiteHeader`, `SiteFooter`
- E2E tests (Playwright) for home page critical journey + contact form
- 70% gate is the floor; target 80%+ across all component tests

---

## Out of scope v1 (architecture-ready per spec §9)

- Blog/insights section
- Newsletter
- `colivares.com` link (text mention only until site is live — no `<a>` tag)
- Dark mode
- CRM integration
