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

## BRAND-01 decisions (brand asset integration)

- **Spec §2 is factually wrong about the footer's surface; the footer takes `ink`, not `paper`.**
  §2 asserts "The header and footer are `abisal`, so both take `paper`." The header is `abisal`
  (`globals.css` line ~175), but **`.site-footer` is `background: var(--paper)`** — a light
  surface. Following the worked example instead of the rule above it shipped the light `paper`
  lockup onto a light background: measured mean ink luminance **246 against a 247 background**,
  i.e. invisible. The `ink` variant measures **25** on the same background. Resolution: trust
  §2's *rule* (`ink` on `paper`, `paper` on dark) over its *example*, and derive the expectation
  from `globals.css` rather than from prose. Two regression guards now do exactly that — both
  verified to fail when the bug is reintroduced.
  **Process lesson:** the original §11 report claimed Z3 was "verified live". It was not — the
  DOM assertions (correct `alt`, dimensions, link target) all passed while the mark was
  invisible. Element-presence checks cannot detect a contrast failure; only rendered-pixel
  inspection or a human can. The guard now asserts the variant-to-surface pairing instead.

- **Z4 seal is vertically centred against the text block, not top-aligned to the body copy.**
  §6 says "top-aligned to the start of the body paragraph — not to the H1". Implemented first as
  a fixed `padding-top: 3.25rem`, which could not track the H1's fluid
  `clamp(3rem, 7vw, 6rem)` at `line-height: 1` wrapping to 2–3 lines: the wider the viewport,
  the further the seal drifted above the text block's optical centre. Replaced with
  `align-items: center` on the grid, which self-adjusts at every width and removes the magic
  number. Approved by Carlos after seeing it live. Below 767px the grid is a single column, so
  `align-items` reverts to `start` and the seal's own `padding-top: 2.5rem` does the separating.

- **Asset location `app/assets/escala-brand/` (not `public/brand/`) for in-page marks.** Spec §2
  suggests `public/brand/` but defers to "whatever convention the project already uses". The
  Phase 2.3 decision above already settled this for logos: static import via `next/image` gives
  build-time missing-file detection, content-hashed URLs, and — decisive for BRAND-01 AC-8 —
  **intrinsic width/height inferred from the import**, so no image can ship without reserved
  space. `public/brand/` is used only for the favicon PNGs and the apple-touch icon, which must
  be reachable at stable URLs from a `<link>` tag.

- **Z4 required adding a grid that spec §6 assumed already existed.** §6 says to place the seal
  in section A's "right-hand column", described as "already allocated and currently empty", and
  in the same breath forbids changing "the section's ... grid definition, or column ratio".
  Both cannot hold: `CeremonialHeader` was deliberately **single-column** (no `display:grid`
  anywhere in `.ceremonial-header__inner`). The wireframe invents the column
  (`grid-template-columns:1.35fr .65fr`). Decision: add the two-column grid to
  `CeremonialHeader`, keeping the kicker/H1/sub markup, copy and type scale byte-identical.
  Raised before implementing rather than resolved silently; Carlos chose this over deferring Z4.

- **Z4 collapse uses 767px, the project's existing breakpoint — not the wireframe's 900px.**
  `globals.css` has breakpoints at 1023 / 767 / 639 / 479px; **900px appears nowhere**, and all
  Phase-2.5 `/sobre-escala` rules already use 767px. §6 itself says to use "the project's actual
  value", and §11.4 asks for confirmation that it is existing rather than new. It is.

- **Footer logo takes `alt=""`, not the §8 dictionary key.** The footer brand node is an anchor
  that already carries `aria-label={accessibility.homeLabel}`, and the company name sits
  separately in `.site-footer__meta` — not adjacent to the mark. A non-empty `alt` inside that
  anchor would be overridden by the `aria-label` anyway, so it buys nothing and risks a
  duplicated accessible name. §8 anticipates this ("judge from the actual markup and say which
  you chose"). Consequence: the §8 table's footer key would be **unused**, so it was not added —
  same reasoning as SPEC-POLISH-07 omitting `menuTitle`.

- **Header renders at 162px per spec §3, not the 200px the bundle README recommends.** The
  bundle's own `manifest.json` lists `display_widths: [200, 400]` for L02 and names the header as
  its destination. §3 mandates 162px and pre-accepts the consequence ("at 162 px the 'DIGITAL
  VENTURES' tagline measures 6.5 CSS px ... at the edge of legibility. This is accepted"). Both
  were put to Carlos with the discrepancy stated; he chose 162px. Revisit if it reads poorly on a
  1x display in the field.

- **The mobile symbol is rendered in a 30×30 box, not the 26×19 §2 asks for.**
  `symbol-paper-96.png` is a **square 96×96 canvas** whose ink occupies 84×62 (aspect 1.3548,
  matching the manifest's 1.3514) with transparent padding. §2's "26 px wide (19 px tall)"
  describes the *visible ink*, not the file. Setting the element to 26×19 would squash the mark
  ~26% vertically. A 30px square box yields ink of 26.25×19.38 — §2's intent to a quarter-pixel,
  with the true aspect preserved. Arithmetic recorded in `lib/brand-constants.ts`.

- **`og:image` / `apple-touch-icon` are declared in metadata rather than by file convention.**
  Not a preference — a Next.js constraint. `app/opengraph-image.*` and `app/apple-icon.*` apply
  only to routes in their own segment; every page here renders from the optional catch-all
  `app/[[...path]]/`, and Next refuses to host a metadata file inside one ("Optional catch-all
  must be the last part of the URL"). So neither tag had ever been emitted — confirmed by
  building the pre-BRAND-01 commit and finding zero `og:image` tags. SEO-01's changelog records
  this bug as fixed; the fix (not overriding `openGraph.images`) was correct in itself but
  protected an injection that never arrived. Now sourced from `lib/constants/seo.ts` so there is
  still exactly one definition, and asserted end-to-end instead of by absence.

- **`sharedContent.header.brand` (`'ESCALA'`) is kept, though nothing renders it visually.**
  It is still consumed by `lib/seo/page-graph.ts` for breadcrumb names and passed as
  `SiteFooter`'s `brand` prop. Deleting it would touch SEO structured data and the page call
  site — outside §0's scope guard, for no functional gain. The prop is documented as accepted
  but unrendered, and is not destructured.

