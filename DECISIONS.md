# Design decisions

## Approved home v1

- Palette: paper, ink, mar, abisal, and amber are the only product colors. Dark sections use `abisal`; amber is reserved for state, emphasis, and progress.
- Type: Archivo carries display headings, Instrument Sans carries body copy, and IBM Plex Mono carries labels and operational data.
- Scale: `--text-display-xl`, `--text-display-lg`, and `--text-figure` are the three fluid display tokens.
- Motion: reveals, diagram assembly, count-up, marquee, and the phase cycle reinforce sequence and system behavior. Reduced-motion users receive static, complete states.
- FIG. system: diagrams are functional evidence, not decoration. Captions retain their numbered FIG. convention.
- El Ciclo: the ten-phase framework is a pinned continuous journey on desktop and a linear accessible sequence on small screens.
- Evidence: MAGUPELL and BioZero are typed client records rendered as chips; operational claims use verified language including "operativa real."
- Conversion: the contact form remains on the home page and is intentionally local-only until the contact service is connected.
- Navigation: the experimental side rail was removed. Section indices `00`–`06` are the primary wayfinding system.
- Alliance model: the constellation communicates five intentionally limited alliances, with occupied and available positions.
- `--ambre-dk` (#b85c00): dark amber token introduced in SPEC-P2.2 for the ServiceRow problem-line text on `--paper` surfaces. The pure `--ambre` (#ffb703) does NOT pass AA contrast on paper; `--ambre-dk` was chosen as the darkest amber shade that passes WCAG AA (4.5:1) on light backgrounds. Used exclusively for problem-line text in service rows and dossier field keys — no other use.

## SPEC-POLISH-05 decisions (/que-hacemos FIG.08/09/11 fixes)

- **Shared 340×180 canvas for all five ServiceFig variants (was 320×150).** FIG.08/09/11 needed the larger canvas to reproduce the approved wireframe geometry (module boxes sized to text, edge-to-edge flow segments, full-circle arc). To avoid five figures rendering at unequal heights in the shared 320px column, FIG.07 (`capture`) and FIG.10 (`product`) were given a **canvas-only normalisation**: `viewBox` changed to the same 340×180, and their existing (untouched) markup wrapped in one `<g transform="translate(10 15)">` via a shared `LegacyCanvas` helper. No coordinate, stroke, label, or animation inside FIG.07/FIG.10 changed — verified by dedicated geometry assertions in `tests/components/service-fig-polish-05.test.tsx` (asserts exact `cx`/`cy`/`r`/`x`/`height` on both variants' ambre-accented elements). Approved by Carlos (August 2026); amends SPEC-POLISH-05 §0/AC-5.
- **FIG.08 connector endpoints computed geometrically, not hand-authored.** `pointOnCoreBorder()` derives each connector's core-side endpoint from the core center/radius and the module-facing anchor point, so every connector lands exactly on the ring border (distance from core center == radius, verified in tests) — never short, never crossing into the circle.
- **FIG.11 full-circle arc via `stroke-dasharray`/`stroke-dashoffset` `<animate>`, not `<animateMotion>`.** The previous quarter-arc pulse used `<animateMotion>` tracing a path; the fix instead animates the arc's own `stroke-dashoffset` from full length to 0, which draws the complete loop continuously and, when `visible=false` (reduced-motion), simply omits `stroke-dasharray` so the arc renders as a complete, static circle — satisfying "reduced-motion → arc shown complete" without extra CSS.

## Phase 2.3 decisions

- **Logo asset location (`app/assets/brand/` not `public/brand/`):** spec says `public/brand/`. Logos are stored instead as `app/assets/brand/magupell-logo.png` and `app/assets/brand/biozero-logo.png` and imported as Next.js static images (`StaticImageData`) via `next/image`. Rationale: (1) build fails at compile time if the file is missing (vs. silent 404 from `public/`); (2) content-hashed URLs for optimal long-term caching; (3) intrinsic width/height inferred automatically from the import. See `content/data/cases.ts` for the import.

## Phase 2.4 decisions

- **AllianceConstellation: standalone component, not embedded in SystemDiagram.** SPEC-P2.4 FR-3.2/AC-3 says "reuse the home constellation." The home constellation lives inline in `SystemDiagram` (`kind="outcome"`) with irregular hand-placed geometry, not a regular pentagon. Decision: extract `components/alliance-constellation.tsx` as a parameterized component (prop `size: 'compact' | 'large'`) with correct regular-pentagon geometry (first seat at −90°, every 72°). `SystemDiagram`'s outcome branch remains unchanged (home has zero regression). `AllianceConstellation` is used: (a) standalone on `/modelo-de-alianza` at size "large"; (b) shown in `/styleguide` at both sizes. The styleguide proves one component, two instances. Rationale: preserving exact home pixel-fidelity (no regression) vs. embedding via nested SVG were in conflict; standalone is simpler and equally spec-compliant.

- **FinalCTA typed to structural interface, not `typeof homeContent.finalCta`.** Phase 2.4 adds a different `success` message in `alliance.ts`, which broke the old `typeof homeContent.finalCta` type. Fixed by extracting `FinalCtaContent` interface in `final-cta.tsx` — any page can now pass its own `finalCta` content without literal-type collisions. No existing behavior changed.

- **Ownership wording: fully resolved by SPEC-FIX-01.** Reference docs promoted to Libro v2.2 + spec v1.1.1. `content/es/services.ts` service line 2 patched with §3.1 canonical wording ("…licencia de uso indefinida … La propiedad intelectual y el código son de Escala."). Guard installed at `tests/content/ownership-guard.test.ts` (5 tests, 4 patterns). Standing rule codified in `.clinerules/project-ownership-rule.md`. AC-5 verified: guard fires on bad phrase. Sitewide grep = 0 matches. See SPEC-FIX-01.

## Phase 2.5 decisions

- **GridBackground opacity 0.05 (not 0.045 as spec suggests):** SPEC-P2.5 FR-6 proposes ~0.045 opacity for the engineering-grid lines. Every existing abisal section (hero, framework, ideal-client, alliance-why, alliance-planes) already uses 0.05. Defaulting to 0.05 keeps the new page visually consistent with the rest of the site. Deviation is intentional; can be adjusted globally once existing sections migrate to `<GridBackground />`.

- **GridBackground: TODO-not-migrate for existing abisal sections.** FR-6.3 allows leaving existing sections with `// TODO: migrate to GridBackground` if migration is non-zero visual risk. The five existing sections differ in radial-gradient ellipse position (60%/40% vs 50%/45%), so migrating them in this change would require visual QA per section and risks zero-regression promise. Left as-is with TODO comments in `globals.css`; the new `/sobre-escala` abisal sections use `<GridBackground />` exclusively. No visual change to existing pages.

- **Manifesto IntersectionObserver test: data-visible="true" in test env.** The `Manifesto` component sets `data-visible="true"` via IntersectionObserver. In the Vitest environment the IO mock fires immediately with `isIntersecting: true`, so `data-visible` is `"true"` synchronously after mount. The test for this attribute was updated to expect `"true"` (confirming the reveal mechanism works) rather than the initial `"false"` (which is only meaningful before first intersection in a real browser). Documented here to explain why the test differs from production behavior.

- **Manifesto ambre bar: hover-driven (not scroll-driven).** Initial implementation drove the ambre bar via `[data-visible="true"]` scroll entry (staggered `scaleY 0→1`). The wireframe defines the bar as a hover interaction: `.plate:hover .bar { transform: scaleY(1) }`, transition 0.3s. Corrected: bar is now `scaleY(0)` by default, grows to `scaleY(1)` on `.manifesto__plate:hover`. The scroll stagger (`--man-delay`, `IntersectionObserver`) was repurposed to drive a plate fade/slide entrance (`opacity 0→1`, `translateY 0.4rem → none`), so the section still has purposeful motion when it scrolls into view. Reduced-motion: plates shown immediately at full opacity; bars shown at full `scaleY(1)` static.

## Phase 2.6 decisions (SPEC-P2.6 — /contacto + contact backend)

- **Honeypot: silent 200 (no email sent) on bot fill.** SPEC-P2.6 FR-3.4 gives two options: 200 without sending, or 400. Decision: 200 without sending. Rationale: returning 400 reveals the honeypot mechanism to automated scanners; 200 is indistinguishable from a successful submission and never triggers retry behavior. Documented in `lib/email.ts` and `app/api/contact/route.ts`.

- **Gmail address server-only — never in client code.** `CONTACT_TO` (carlos.olivares.ve@gmail.com) lives exclusively in `.env`/`.env.example`. It is referenced only inside `lib/email.ts` via `process.env.CONTACT_TO`. A dedicated test in `tests/content/ownership-guard.test.ts` greps `content/`, `components/`, and `app/` and fails if the Gmail string appears (AC-5). The public display address `hola@escaladigitalventures.com` is in `content/es/contact.ts → directMeta.email` and `sharedContent`.

- **DRY_RUN mode active when no API key.** `lib/email.ts` checks `!API_KEY` and falls back to `EMAIL_DRY_RUN=true` behavior — logs the payload (email field redacted) instead of calling the provider. Allows local dev and test environments to verify the full submission flow end-to-end without a real provider key. Production: set `EMAIL_API_KEY` + `EMAIL_DRY_RUN=false` in Cloud Run Secret Manager (Phase 6).

- **ContactForm variants: section (default) + dossier.** The existing `ContactForm` was upgraded in-place (no new URL or component name) and made reusable with a `variant` prop. `variant="section"` is the default and preserves all existing call-sites (FinalCTA on every page) with zero behavior change. `variant="dossier"` adds the FICHA DE CONTACTO header, ENVIAR MENSAJE button label, and ambre trust micro-line — used only on /contacto. All API logic (fetch, honeypot, loading/success/error) is shared between both variants.

- **ContactSuccess extracted as reusable component.** The success card is a standalone `components/contact-success.tsx` (not inlined in `contact-form.tsx`) because it has two visual variants (section/dossier) and is likely to be used in future flows. It reads copy from `sharedContent.contactForm` — no per-page override needed since the success message is always the same.

- **«Hablemos» CTA now links to /contacto (not #contacto anchor).** Prior to Phase 2.6 the header CTA linked to `ANCHORS.CONTACTO = '#contacto'` (in-page form on home). Now /contacto exists as a full page and is the canonical contact destination for nav, IdealClientNote, hero secondary CTA, etc. The home form section still exists (id="contacto") for in-page scrolling but is no longer the nav target. `IdealClientNote` on /que-hacemos also updated (`ctaHref={ROUTES.CONTACT}`).

- **Rate limiter: in-memory token bucket, ephemeral on Cloud Run.** Spec FR-3.3 notes that Cloud Run instances are ephemeral so the in-memory rate limit resets on cold-start. Decision: acceptable pre-launch. A `// TODO(P6): swap to durable store (Redis/Upstash)` comment is in `app/api/contact/route.ts`. The limit (5/min/IP, configurable via `RATE_LIMIT_PER_MIN`) prevents casual abuse; the ephemeral reset is an acceptable compromise at this traffic level.

- **Phase 2 status: COMPLETE (2.6 = last missing piece).** All interior pages ship: method, services, cases (2), alliance, about, contact. Phase 3 is folded into 2.6. Next milestone is Phase 4 (legal pages + analytics).
