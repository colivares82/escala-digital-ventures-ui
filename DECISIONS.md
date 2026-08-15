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

## SPEC-POLISH-10 decisions (/modelo-de-alianza "Por qué solo cinco" split layout)

- **CSS-only, one file.** Recomposed the section into a 40/60 grid (text/diagram) at
  ≥1024px purely via `app/globals.css`; no TSX or content change was needed since the
  existing DOM order (eyebrow → text → stage) already matches both the stacked and split
  layouts.
- **Override block placement matters.** The ≥1024px media-query override must come
  *after* the base `.alliance-why__*` rules in source order — a media query alone does
  not raise specificity, so placing it earlier (as first attempted) let the later base
  rules silently win. Caught during live measurement (stage `padding-inline` wasn't
  actually zeroing out), fixed by reordering.
- **AC-5 diagram-width target not fully met, and left as-is rather than patched around.**
  The literal 40/60 split of `.page-shell`'s capped content width tops out the diagram
  around 800–811px at 1440–1920px, ~50px *narrower* than POLISH-09's flat 900px cap.
  Implemented exactly per the given ratio/gap/100%-of-column instructions rather than
  adding an unspecified minimum-width rule to force the number up — see
  `specs/spec-polish-10-why-five-layout.md` §3 for the full numbers and the open decision
  (keep the literal ratio, or add a floor width).

## SPEC-POLISH-09 decisions (/modelo-de-alianza constellation clipping fix)

- **`size="large"` → `size="protagonist"`, component untouched.** The reported clipping
  (`BIOZERO` → `BIOZE`, `DISPONIBLE` → `ONIBLE`) was a geometry-budget problem specific to
  the `large` variant: fixed 420×420 viewBox, pentagon spans x=60…360, leaving only 60px of
  margin for labels needing ~55-60px. The `protagonist` variant (960×620, responsive width)
  already used on home leaves 280px of margin per side. Switching the page's `size` prop is
  the entire fix — no change to `AllianceConstellation`'s geometry, props, or defaults.
- **Casing conflict (BIOZERO vs BioZero) resolved in favor of home, per explicit approval.**
  `content/{es,en,ca}/alliance.ts` used `BIOZERO`; `content/{es,en,ca}/home.ts`
  `allianceFigure.seats` used `BioZero`. Corrected the alliance dictionaries to match home
  exactly. This is a one-token data change (seat name), not the section's prose copy — the
  eyebrow/heading/body/aria strings are untouched. A permanent regression test now asserts
  the two dictionaries' occupied-seat names stay identical.
- **Reveal on a home-tuned CSS rule: page-scoped counter-rule, not a component change.** The
  home page has `.alliance-constellation--protagonist .ac-draw { opacity: 1 }` because home
  renders the protagonist constellation without a reveal wrapper. `/modelo-de-alianza` wraps
  it in the existing `DiagramReveal`, so a page-scoped, higher-specificity counter-rule
  (`.alliance-why__stage .diagram-reveal[data-visible='true'] .ac-draw`) restores the
  fade-in for this page only. The selector is unreachable outside `.alliance-why__stage`, so
  home cannot regress.
- **`coreSubLabel` intentionally omitted on `/modelo-de-alianza`.** No such copy exists in
  `alliance.ts`; adding a new dictionary key was outside the approved scope. The alliance
  page's constellation therefore lacks the "2 ALIANZAS ACTIVAS · 3 DISPONIBLES" sub-line
  visible on home — a deliberate, documented gap, not an oversight.
- **Pre-existing `.site-header`/`.page-header__*` 8px overflow at 360px left unfixed.** Live
  measurement showed this on every `PageHeader`-using page (`/como-trabajamos`,
  `/casos-de-exito`, `/modelo-de-alianza` alike), not introduced by this change and out of
  this spec's scope (`PageHeader` is explicitly protected). Flagged as a follow-up.

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

## SPEC-CASE-01 decisions (Magupell case page rewrite)

- **`CaseDossier` promoted to the canonical case template — approved deviation from §0.2.**
  SPEC-CASE-01 §0.2 froze all shared components, including `ReadoutStrip`, `DossierField`,
  `CapabilityGrid` and `CaseDossier` itself, and instructed: "if a shared component cannot
  render a new section as specified, stop and report rather than modifying it." The new
  Magupell structure (2×3 readout grid, role cards, dark governance block, two new figures)
  cannot render through the old per-mode (`data-forward`/`capability-forward`) template. Given
  the choice between (a) a page-local `MagupellDossier` leaving `CaseDossier` untouched, or
  (b) upgrading `CaseDossier` itself and migrating BioZero onto it, Carlos explicitly chose
  (b): "Use this dossier as defined, and extend it to Biozero, moving forward for CaseDossier,
  this will be the source of truth." This supersedes AC-9 ("BioZero page byte-identical") by
  design — BioZero's *copy* is unchanged, but its *rendering* now goes through the same
  `CaseReadoutGrid` + `CaseNarrative` path as Magupell.
- **Backward-compatible canonical shape, not a breaking rewrite.** `CaseDossierLocale` gained
  two new **optional** fields, `readoutGrid` and `narrative`. `CaseDossier` renders the
  canonical path when both are present and falls back to the legacy `ReadoutStrip` /
  `DossierField` / `CapabilityGrid` rendering otherwise. This keeps AC-4 (a 3rd case needs only
  data, no component changes) true for both shapes and required no changes to `ReadoutStrip`,
  `DossierField`, or `CapabilityGrid` themselves — they remain in use by `/styleguide` and by
  the legacy fallback path.
- **Environments count resolved as 3 (not 2).** Spec §2 flagged this as blocking and explicit:
  "Do not implement DAT.05 or that governance card until this is confirmed. Ask." Carlos
  confirmed **3 entornos — local, desarrollo y producción, con pipelines protegidas**, matching
  `content/es/home.ts → proof.readouts[2]` verbatim (already published on the home page). This
  keeps the site internally consistent between the home evidence grid and the case dossier.
- **`FIG. EXP-02` caption reused despite BioZero's `plate` string collision.** BioZero's header
  plate is the literal string `'FIG. EXP-02\nESCALA · PRIMER CLIENTE'` (a different UI surface —
  the engineering plate in `BrandHeader`, not an in-page figure caption). The wireframe assigns
  `FIG. EXP-02` to Magupell's new operational-flow figure caption. Decision: keep both as-is;
  they render in visually distinct contexts and neither is a global figure-numbering violation
  in the sense the site's FIG.01–FIG.12 convention addresses (that convention numbers the home/
  interior-page figures; the `FIG. EXP-0N` series is a separate, case-dossier-scoped label).
  Flagged in `docs/CHANGELOG.md` rather than silently resolved.
- **`CaseFlowFig` and `CaseTimelineLadder` render as HTML/CSS grids, not SVG.** The home
  `ProofTimelineFig` uses an SVG stair; the case page's chronology ladder needed a full prose
  detail line per milestone (SPEC-CASE-01 §3), which reads far better as HTML text than as SVG
  `<text>`. Both new figures use bordered CSS grids with a CSS keyframe traversal accent
  (`case-flow-traversal`, gated by `[data-visible="true"]` and disabled entirely under
  `prefers-reduced-motion: reduce`), consistent with the project's existing `DiagramReveal` +
  `data-visible` reveal pattern rather than introducing a new animation primitive.

## Go-live decisions (domain / canonical host)

- **`www` is the canonical host, not the apex.** Reverses the original runbook plan
  ("map www → redirects to apex"). Rationale: DNS forbids `CNAME` at a zone apex, so the apex
  must use the four hardcoded Google A records (`216.239.32/34/36/38.21`) plus four AAAA — if
  Google ever rotates those front-end IPs the site goes dark until someone edits GoDaddy by
  hand. `www` is a `CNAME` to `ghs.googlehosted.com.`, which Google maintains, so it survives
  IP rotation. Secondary benefits: cookies scope to `www` instead of leaking to every future
  subdomain, and a CDN can later be introduced by repointing one CNAME. SEO impact is neutral —
  Google has no host preference; it only penalises *inconsistency*. The switch was made now
  because the domain still has zero backlinks (parked), making it free; after launch it becomes
  a migration. Changed in `lib/config.ts`, `Dockerfile` ARG, `deploy.yml` build-arg.

- **The apex→www redirect lives in `next.config.mjs`, not in infrastructure.** Cloud Run domain
  mappings only *serve* — unlike nginx there is no server-level redirect primitive, and both
  hosts map to the same `escala-web-prod` service. Without an app-level redirect the identical
  content would answer on two hosts (duplicate content, split link equity, R-7.9 red).
  Implemented with `redirects()` + `has: [{ type: 'host', value: 'escaladigitalventures.com' }]`.
  Next.js emits **308** (not 301) for `permanent: true` — the method-preserving equivalent;
  search engines treat it as canonical. Verified locally against the standalone build:
  `Host: escaladigitalventures.com` → `308` to `https://www.escaladigitalventures.com/que-hacemos`;
  `Host: www...` → `200` (no loop).

- **`NEXT_PUBLIC_SITE_URL` must change in three places, not one.** It is a *build-time* var
  baked into the image, so it cannot be flipped at the Cloud Run/runtime level: `Dockerfile:33`
  (default), `deploy.yml:104` (CI build-arg), and `lib/config.ts` (runtime fallback). Leaving
  any of them on the apex while the redirect points to `www` would make the sitemap, hreflang,
  canonical tags and JSON-LD contradict the redirect.

- **`main` was never a deployable branch.** Discovered during go-live: `origin/main` was still
  the 2-commit v0 scaffold (`918288c`) with **no `.github/` directory at all**, so pushing to
  it could never trigger the pipeline — the workflow file did not exist on that ref. All 44
  commits of real work lived on `dev`. This, not CI misconfiguration, is why merging to `main`
  appeared to "complete" without updating the site. Resolved by promoting `dev` → `main`.

