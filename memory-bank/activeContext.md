# Active Context

_Last updated: 17 August 2026 (CONTENT-11 COMPLETE — commercial terms removed from all public
copy. Previous: GO-LIVE — canonical host = www, blocked on GoDaddy DNS)_

### CONTENT-11 — Commercial Terms Cleanup (COMPLETE, content-only)

**The rule that now governs all copy: IP, licensing and ownership terms are NEVER published.**
They are agreed per client during commercial negotiation. This *reverses the published side* of
SPEC-FIX-01: that spec corrected the wording to "the IP is Escala's"; CONTENT-11 removes the
subject from public surfaces entirely, in both directions. The contractual model itself is
unchanged and still lives in Libro Ch. 6/11/13 — now flagged `> INTERNO · NO PUBLICABLE`.

Changed (dictionaries + generator only): `/que-hacemos` service line 02 closes on architecture ·
`/modelo-de-alianza` FAQ item 2 replaced with "¿Cómo empieza una alianza?" (still exactly 5
items), items 3–4 rewritten, commitment 02 no longer claims per-feature approval, meta
description reworded (ES 150 / EN 149 / CA 145 chars) · `/como-trabajamos` FAQ item 1 corrected
so the client approves the **prototype**, not every spec · `lib/seo/llms-txt.ts` licence/IP
bullets replaced with onboarding + exclusivity + continuity.

**Second correction, unrelated to IP:** the site implied the client approves *every*
specification. It doesn't — prototypes and additional scoped implementations only.

**The guard is now a blocklist, not an allowlist** (`tests/content/ownership-guard.test.ts`):
12 ES/EN/CA terms, case- and accent-insensitive, scanning `content/ app/ lib/ components/
public/` plus the *generated* `/llms.txt` body (there is no static file — it's a route handler).
Sanctioned exception, by exact string: the legal pages' own website-content copyright notice
(site copyright ≠ client-platform ownership), so **zero legal sentences were removed**.

**A masking bug I introduced and caught via the AC-08 mutation test:** the first revision put
the short heading `'PROPIEDAD INTELECTUAL'` in the global allowlist and stripped it from every
file, so an injected `la propiedad intelectual …` went **unreported** while only the
second injected term fired. Fixed by scoping short headings to `content/*/legal.ts` and matching
them as whole `name:`/`title:` lines, plus scanning line-by-line instead of whole-file (a
whole-file shortcut let one sanctioned hit suppress a real violation in the same file). Verified
the guard now reports both terms. **Lesson: an allowlist entry short enough to appear inside
ordinary prose will silently disarm the guard — scope it, or don't allow it.**

**Four pre-existing tests asserted the OLD wording and had to be inverted** (reported as the
AC-09 scope exception): `tests/lib/seo/crawl.test.ts` ×2 required the exact sentences the
blocklist now forbids; `tests/content/seo-prohibitions-guard.test.ts` ×2 required IP to be
"attributed to Escala where discussed", which is obsolete once IP isn't discussed.

Also updated so future sessions can't reintroduce the copy: `.clinerules/project-ownership-rule.md`
(it *mandated* the removed wording verbatim — the single highest-risk file in this change),
`docs/i18n-glossary.md` (terms marked RETIRED), spec v1.1.1 §1/§5.2/§5.5 + superseded note.

Gate: 71 files · 1397 tests pass · coverage 78.35/76.54/82.53/80.39 (gate 70) · tsc clean ·
0 lint errors · build clean · zero component/SVG/style files touched.

---

### Previous focus — Phase 7 go-live (domain mapping)

### CURRENT FOCUS — Phase 7 go-live (domain mapping)

**The site is code-complete and deployable. One human action stands between it and being
live: the GoDaddy DNS switch.**

Two blockers were diagnosed (neither was a code defect):

1. **`main` was an empty v0 stub.** `origin/main` was 2 commits old (`918288c`) with **no
   `.github/` folder**, so merging into it never ran the pipeline — the workflow file didn't
   exist on that ref. All 44 commits of work were on `dev`. Prod was consequently running
   image `a674b5ce…` = the v0 scaffold. Fix: promote `dev` → `main`.
2. **DNS still points at GoDaddy parking** (`15.197.148.33`, `3.33.130.190`). Cloud Run
   mappings for apex **and** `www` both exist on `escala-web-prod` in `escala-dv-web` and
   report `CertificatePending` — *"You must configure your DNS records for certificate
   issuance to begin."* The apex mapping has been retrying since 7 Aug. Records to set are in
   `docs/infra-runbook.md` Step 11.

**Canonical host decision: `www`** (was apex). `www` is a CNAME to `ghs.googlehosted.com.`
and survives Google IP rotation; the apex is pinned to 8 hardcoded IPs. Apex→www 308 redirect
added in `next.config.mjs` because Cloud Run mappings cannot redirect. See DECISIONS.md
"Go-live decisions".

**Verified locally on the standalone build:** apex `/que-hacemos` → 308 → www; www → 200 (no
loop); sitemap/robots/canonical/hreflang all emit `www`. Gate green: 1313 tests, 83.04%
coverage, 0 lint errors, `tsc --noEmit` clean.

**Next step (Carlos, browser):** GoDaddy → delete the 2 parking A records + the `www` CNAME →
add 4×A, 4×AAAA, `CNAME www → ghs.googlehosted.com.` TLS then provisions automatically.

---

### BRAND-01 — Brand asset integration (COMPLETE)

Provisional mark (3 bordered squares + "ESCALA" in mono) replaced by the delivered identity in
all four visible places, plus metadata. **No redesign** — tokens, typography, grid and every FIG
untouched. 1363 tests pass · coverage 83.24/79.23/87.83/85.71 (gate 70) · tsc clean · lint 0
errors · build clean.

**Where each zone landed:** Z1 desktop header + Z3 footer → `components/site-chrome.tsx` ·
Z2 mobile bar → `components/mobile-menu.tsx` · Z4 seal → `components/ceremonial-header.tsx` ·
Z5 → `app/layout.tsx` + `lib/constants/seo.ts` + `lib/seo/page-meta.ts` · alt keys →
`content/{es,en,ca}/shared.ts`.

**Two defects I shipped and Carlos caught on the live site — both fixed:**
1. **Footer logo invisible.** Spec §2 says "the header and footer are `abisal`, so both take
   `paper`" — but `.site-footer` is `background: var(--paper)`. I applied the spec's stated
   variant without checking the actual surface, so a light mark landed on a light background:
   measured luminance **246 vs 247**. Now `logo-05-lockup-compact-ink.png` (**25** vs 247).
   **The lesson worth keeping: my §11 report said Z3 was "verified live" and it wasn't.** The DOM
   assertions (alt, dimensions, link) all passed while the logo was invisible — element-presence
   tests cannot see contrast. Two new guards now derive the expected variant from `globals.css`
   rather than the spec prose, and I verified they fail when the bug is put back.
2. **Seal vertically misaligned.** My `padding-top: 3.25rem` was a fixed guess at §6's
   "top-aligned to the body paragraph"; it couldn't track the H1's fluid
   `clamp(3rem, 7vw, 6rem)` wrapping to 2–3 lines, so the drift grew with viewport width. Now
   `align-items: center` on the grid — self-adjusting, and one less magic number. ≤767px keeps
   `start` + the seal's own padding.

**Rule for future brand work:** trust §2's colour *rule* (`ink` on light, `paper` on dark) over
any worked example, and confirm the surface in `globals.css` before choosing a variant.

**Real bug found and fixed — pre-existing, not caused by this spec:**
**`og:image` and `apple-touch-icon` had NEVER been emitted on any page.** SEO-01's changelog
records the og:image bug as fixed by not overriding `openGraph.images`; that was correct but
protected an injection that never arrived. `app/opengraph-image.*` applies only to its own
segment, and every page renders from the optional catch-all `app/[[...path]]/` — which Next
refuses to host a metadata file inside. Verified by building the pre-BRAND-01 commit: zero
og:image tags. Both now declared from `lib/constants/seo.ts` and asserted end-to-end. **The old
guard passed while the output was broken because it only asserted the override was absent, never
that the tag was present** — the same class of blind spot as SEO-01's title bug.

**Three spec inaccuracies recorded rather than rediscovered later:**
1. **§1's native-resolution table is wrong.** Delivered lockups are pre-scaled: L02 is 200×53
   (@2x 400×106), not 445×119; L05 is 180×30 (@2x 360×60), not 386×64. All render sizes still
   fit within the real @2x widths, so nothing is upscaled.
2. **§2's "26×19" mobile symbol is the visible INK, not the file.** `symbol-paper-96.png` is a
   square 96×96 canvas with 84×62 of ink. A 26×19 element would squash it ~26%; a 30×30 box
   gives ink of 26.25×19.38. Arithmetic in `lib/brand-constants.ts`.
3. **§6's "right-hand column ... already allocated and currently empty" did not exist.**
   `CeremonialHeader` was single-column. Adding the grid was unavoidable and was approved by
   Carlos before implementing (§0 requires stopping rather than widening scope).

**Decisions:** assets in `app/assets/escala-brand/` (Phase-2.3 precedent — static import gives
AC-8 intrinsic dimensions for free); favicon PNGs + apple-touch in `public/brand/` (need stable
URLs); footer logo `alt=""` keeping the anchor's `aria-label`, so the §8 footer key was **not**
added (unused-key precedent from SPEC-POLISH-07); header at **162px** per §3 despite the bundle
README recommending 200px (Carlos chose); Z4 collapse at the existing **767px**, never 900px.
Full rationale in `DECISIONS.md`.

**Kept deliberately:** `sharedContent.header.brand` — still consumed by
`lib/seo/page-graph.ts` breadcrumbs and passed as `SiteFooter`'s `brand` prop. Removing it would
touch SEO data and the page call site, outside §0's scope guard.

**Unused by design (§2/§10):** L04, L06, all `mar` variants, the icon SVGs, and
`maskable-{192,512}.png`. Copied into the repo, referenced nowhere. **No PWA manifest created** —
the bundle's `manifest.json` is asset metadata, not a web manifest, so §7's "if one exists"
resolves to no.

_Previous: SEO-01 (search & AI discoverability)_

### SEO-01 — Search & AI discoverability (COMPLETE)

Surgical SEO pass. **No layout change, no shared component touched, every `H1`
byte-identical** (verified by empty `git diff` on the protected list and by reading the
rendered H1 of every page).

**Three real bugs found and fixed — all pre-existing, none introduced by this spec:**
1. **Every title was double-branded.** `layout.tsx` applied
   `template: '%s | Escala Digital Ventures'` on top of dictionary titles that already
   carried that suffix → `Qué hacemos | Escala Digital Ventures | Escala Digital Ventures`
   on all 27 routes, well past 60 chars. **The existing ≤60 test never caught it because it
   measured the dictionary string, not the rendered title.** New guard asserts the rendered
   value; template is now `'%s'`.
2. **`og:image` was never emitted.** `app/opengraph-image.tsx` existed and returned 200, but
   returning an `openGraph` object without `images` from `generateMetadata` suppresses Next's
   file-convention injection. Fixed by not overriding it.
3. **Vitest double-collected after a build.** `output: 'standalone'` copies `tests/` into
   `.next/standalone/`; no `.next` exclusion existed, so `build && test:coverage` ran 140
   files / 2048 tests. Excluded in `vitest.config.ts`. Latent CI hazard, now closed.

**Delivered:** all 27 page metas + 6 case metas replaced · full OG/Twitter set (`en_GB`, not
`en_US`) · JSON-LD `@graph` per page (`lib/seo/`, `components/json-ld.tsx`) · `FaqBlock` +
16 Q&A pairs × 3 locales on the three §5.2 pages · `/llms.txt` · robots with 12 named AI
crawlers · sitemap `x-default` + content-derived `lastmod` · 6 new test files (+198 tests).

**Key structural decision:** the §2.1 canonical entity definition lives once in
`lib/seo/entity.ts` and is **imported** by `Organization.description`, `/llms.txt` and the
`/sobre-escala` lead — AC-19 requires the three to be identical, so composing them from one
constant makes drift impossible rather than merely unlikely. Verified live: all three byte-identical.

**Audited and already compliant — no change needed:** §4.8 generic anchor text (none found),
§4.9 image `alt` (both logos already descriptive; all figures use `aria-label`/`aria-hidden`).

**Documented deviation:** §5.4 says "reuse `Section`"; **no such shared component exists** in
this repo. `FaqBlock` follows the established `<section>` + `.page-shell` + `SectionIndex`
BEM pattern (same shape as `CommitmentsBand`). No shared component was created or modified.

**Guard rewrites worth remembering:** two of my first-pass assertions were wrong, not the code —
(a) `/\{\{|\}\}/` matches JSON's own nested `}}`, so the placeholder guard now matches
`{{IDENTIFIER}}`; (b) `/client owns/i` blocked the *required* "client owns their data", so the
ownership guards now bind to code/IP nouns. The EN FAQ question was reworded
("who does the code belong to") rather than relaxing `i18n-coverage`'s ownership guard.

**⚠ Blocking, not code:** `escaladigitalventures.com` still resolves to **GoDaddy parking**
(`3.33.130.190`, NS `domaincontrol.com`, JS redirect to `/lander`). The site is NOT live at
the domain — it lives at `escala-web-prod-…run.app`. AC-17 (one canonical host) and §9
(Search Console / Bing) cannot be satisfied until the DNS switch. GoDaddy's parked
`robots.txt` currently advertises `Disallow-Training: /`, the opposite of our §7.1 policy.

## Current state

**Phase 6 COMPLETE + SPEC-POLISH-02/03/04/05/06/07/09/10 COMPLETE (+ POLISH-07 hotfix) + SPEC-CASE-01 COMPLETE (+ hotfix).** Both Cloud Run environments are live. CI/CD pipeline is fully operational. `/casos-de-exito/magupell` was rewritten in ES/EN/CA with verified production figures (was carrying pre-launch `100+`/`200+` placeholders and invoicing language); `CaseDossier` was promoted to a single canonical case template (approved deviation — see below) and BioZero was migrated onto it with unchanged copy. Carlos is working on Phase 7 content/QA before DNS switch.

### SPEC-POLISH-10 — `/modelo-de-alianza` "Por qué solo cinco" split layout (COMPLETE)
CSS-only (`app/globals.css`, +54 lines, one file). At ≥1024px the section is now a 40/60
grid (text/diagram, 56px gap, centred) instead of POLISH-09's stacked layout; below that
it still stacks. Section height at 1440px down 1154.4px → 767.7px (−33%). One deviation:
diagram width at 1440px (801.6px) is narrower than POLISH-09's flat 900px cap (852px) —
the literal result of the mandated 40/60 ratio against the sitewide `.page-shell` cap;
implemented as specified rather than patched. Full writeup:
`specs/spec-polish-10-why-five-layout.md`.

### SPEC-POLISH-09 — `/modelo-de-alianza` constellation clipping fix (COMPLETE)
"Por qué solo cinco" rendered `AllianceConstellation` at `size="large"` (fixed 420×420
viewBox) inside a cramped side-by-side grid; the pentagon's widest points left only 60px
of margin for outward labels needing ~55-60px, so `BIOZERO`/`DISPONIBLE` were clipped to
`BIOZE`/`ONIBLE` by the SVG's default `overflow:hidden`. Fixed by switching the page to
`size="protagonist"` (the same 960×620 responsive variant already used on home, 280px of
margin per side) and restructuring the section to text-above/full-width-diagram-below —
**zero changes to `AllianceConstellation` or `GridBackground` themselves** (verified via
empty `git diff`). Also corrected a pre-existing casing mismatch: the alliance
dictionaries said `BIOZERO`, home said `BioZero` — home wins per spec, alliance
dictionaries corrected (one-token data change, prose copy untouched). A page-scoped CSS
counter-rule restores the scroll-reveal for the protagonist variant on this page without
touching home's own always-visible rule for the same classes. Live-verified over CDP
(label `getBBox()` geometry, not DOM presence, per the standing lesson below): zero
clipped labels post-fix at 360-1920px × ES/EN/CA, home page unaffected, connector geometry
unchanged, reveal fires correctly, reduced-motion fully static. One pre-existing,
out-of-scope defect flagged: an 8px horizontal overflow at 360px from
`.site-header`/`.page-header__*`, present on every `PageHeader` page (not introduced by
this change). Full writeup: `specs/spec-polish-09-alliance-constellation.md`.

### Post-completion hotfix: three POLISH-07 bugs found in live screenshots (found after being reported "complete")
`.site-header nav` (a bare element+descendant selector) matched **every** `<nav>`
inside `<header>` — not just the primary nav, but `.locale-switcher` and, while
`MobileMenu` still rendered as a child of `<header>`, the overlay's own `<nav>` too.
That zeroed the locale switcher's gap ("ESENCA" with no spacing) and hid the entire
mobile overlay nav below 1024px — the exact defect POLISH-07 was built to fix, now
silently reintroduced by a selector collision. A third, unrelated bug: the overlay's
brand slot never rendered the "ESCALA" wordmark, only the symbol. **The original
live verification (headless Chromium over CDP) queried `querySelectorAll(...).length`
and got the right count — it never checked visibility**, so all three shipped as
"verified." Fixed by giving the primary nav an explicit `site-header__nav` class
(every former `.site-header nav` selector renamed to it), moving `MobileMenu` to
render as a header **sibling** instead of a descendant, and adding the missing
`{content.brand}` render. Full writeup: `docs/CHANGELOG.md` → "SPEC-POLISH-07 hotfix"
and `specs/spec-polish-07-header-navigation.md` §9.

**Standing lesson (second instance of this pattern — apply going forward):**
existence in the DOM is not visibility. A live-verification script must assert
`getBoundingClientRect().width/height > 0` or a computed `display !== 'none'`, not
just `querySelectorAll(...).length`. (First instance: the SPEC-CASE-01 hotfix below,
which established the same lesson for *CSS reachability* — this one extends it to
*selector scope/specificity* causing an unrelated element to be hidden by a rule
that was never meant to target it.) Also: **bare `.parent element` selectors are a
standing risk in the header** — any future `<nav>`/`<button>`/etc. added inside
`.site-header` should get its own scoping class immediately, not rely on being "the
only one" of its element type.

### SPEC-POLISH-07 — header nav + mobile menu (completed, then hotfixed — see above)
Header nav/switcher/CTA raised 0.66rem → 0.80rem with a decorative `·` separator
between links; brand wrapped in a dimensioned slot (132×32 / 112×28) ready for the
upcoming logo spec. **The real defect fixed:** below 1024px the header rendered no
navigation at all (`nav { display: none }`, nothing replacing it) — there was no way
to move between pages from a phone. Built `components/mobile-menu.tsx`: a 3-bar
trigger opens a full-screen overlay (abisal surface, reused `GridBackground`) with
all 5 pages (mono `01`–`05` index), the locale switcher, «Hablemos», and the contact
email — hand-rolled focus trap, Lenis-aware scroll lock (restores exact scroll
position on close), `Escape`-to-close, close-on-navigate, and a `matchMedia` guard
that force-closes the overlay if the viewport crosses into desktop while open.
Two dead CSS rules were removed as part of this (`.locale-switcher` `display:none`
and a `.header-cta` padding tweak at 639px — both already covered once
`.site-header__actions` hides below 1024px). Full writeup + live verification log
(headless Chromium over CDP — header height measured 80px unchanged at three
viewports): `specs/spec-polish-07-header-navigation.md` and `docs/CHANGELOG.md`.
**Open follow-up:** EN/CA no-wrap check across the full QA matrix width×locale grid
was not re-verified live in this pass (flagged in the spec's §6) — worth a manual
check before considering this fully signed off, and a good candidate for the
project's first Playwright E2E once that's wired in (currently not part of the stack).

### Post-completion hotfix: SPEC-CASE-01's CSS was inert (found after being reported "complete")
The `app/globals.css` insert for SPEC-CASE-01 (~415 lines) landed *before* the closing `}` of a
pre-existing `.not-found__cta` reduced-motion media query instead of after it, silently
nesting the entire new section inside `@media (prefers-reduced-motion: reduce)`. Under normal
conditions the whole Magupell/BioZero case page rendered unstyled. **All 1051 existing tests
still passed** because they only assert markup/text — none checked whether a CSS rule was
actually reachable. Caught only by loading the live page. Fixed by restoring the correct brace
boundary (no rule content changed). Full writeup: `docs/CHANGELOG.md` → "SPEC-CASE-01 hotfix".

**Standing lesson (apply going forward):** verifying "CSS/styling was added" requires checking
*structural reachability* (brace balance, at-rule nesting, or an actual rendered/computed-style
check), not just that the expected class names and text exist in the source or in `curl`'d HTML.
`tests/content/css-structure-guard.test.ts` now encodes this check for the case-page CSS and
should be used as the template if another large CSS insert needs the same guard.

## What was done in SPEC-CASE-01

### Magupell case page rewrite — verified figures, no invoicing, two new sections
- **Figures replaced:** `167 → 216` requisitos, `1.803`/`1,803` pruebas (1.042 backend + 761 frontend), `7 meses` a producción, `4 roles`, `3 entornos` (confirmed with Carlos — matches the home page), `REAL` operativa desde jul 2026. The retired `100+`/`200+` placeholders and every `factura/facturación/facturar/invoic` reference were replaced with "resúmenes de cobro" (ES) / "billing summaries" (EN) / "resums de cobrament" (CA).
- **Spelling fixed:** "Magupell" (was "MAGUPELL") in every user-facing string on this page and its index card, in all 3 locales. The legal form "Magupell, S.L." is used once in section 01.
- **Two new sections:** 04 "A medida de cada rol" (2×2 role cards: Administración, Inspector, Cliente, Proveedor) and 05 "Gobernanza" (rendered on the abisal dark surface, 2×2 cards: Acceso, Trazabilidad, Datos en la UE, Cambios seguros).
- **Two new figures:** FIG. EXP-02 "El ciclo operativo" (`CaseFlowFig` — 4 nodes Catálogo→Inspección→Revisión y envío→Cobro, connectors terminating at node borders, one-shot L→R traversal on entry, full static fallback under `prefers-reduced-motion`, vertical stack <720px) and FIG. EXP-03 chronology ladder (`CaseTimelineLadder` — 5 milestones with an added detail line each, extends the home `ProofTimelineFig` concept without importing it).
- **Readout grid:** replaced the 4-cell `ReadoutStrip` with a page-local 6-cell `CaseReadoutGrid` (`DAT.0N / LABEL` mono keys + amber tick), deliberately not shared with the home `ProofSection` per spec §3.

### Approved deviation — CaseDossier is the canonical case template (important precedent)
- The spec's §0.2 froze all shared components (`ReadoutStrip`, `DossierField`, `CapabilityGrid`, `CaseDossier`) and said to stop and report rather than modify them. The new Magupell structure could not render through the old per-mode template.
- **Carlos's explicit ruling, mid-implementation:** *"Use this dossier as defined, and extend it to Biozero, moving forward for CaseDossier, this will be the source of truth."* This supersedes the original spec's AC-9 ("BioZero byte-identical") by design.
- **Implementation:** `CaseDossierLocale` gained two new **optional** fields — `readoutGrid: CaseReadoutCell[]` and `narrative: CaseNarrativeBlock[]` (a discriminated union: `prose | flow-fig | roles | governance | capabilities | timeline`). `CaseDossier` renders the canonical path (`CaseReadoutGrid` + `CaseNarrative`) when both are present, and falls back to the legacy `ReadoutStrip`/`DossierField`/`CapabilityGrid` rendering otherwise. This means: (a) BioZero's copy is byte-unchanged, only re-expressed in the canonical shape; (b) `ReadoutStrip`/`DossierField`/`CapabilityGrid` needed zero changes — they remain used by `/styleguide` and by the legacy fallback; (c) AC-4 ("a 3rd case needs only data") holds for both shapes.
- **Precedent for future case studies:** any new case going forward should be authored directly in the canonical `readoutGrid` + `narrative` shape. The legacy shape is a compatibility fallback, not the preferred path.
- Full rationale recorded in `DECISIONS.md` → "SPEC-CASE-01 decisions".

### Resolved blockers
- **Environments count:** confirmed **3 entornos** (local, desarrollo, producción, con pipelines protegidas) — matches `content/es/home.ts → proof.readouts[2]` verbatim.
- **FIG. EXP-02 caption collision:** BioZero's `BrandHeader` plate is also the literal string `FIG. EXP-02\nESCALA · PRIMER CLIENTE` — a different UI surface (header plate vs. in-page figure caption). Kept both as-is; flagged in `docs/CHANGELOG.md`.

### Diff scope
`content/data/cases.ts` (canonical types + Magupell rewrite ×3 locales + BioZero migration ×3 locales), `components/case-dossier.tsx` (canonical/legacy branch), `components/case-card.tsx` (`cardSubtitleByLocale`), 6 new components (`case-readout-grid.tsx`, `case-narrative.tsx`, `case-flow-fig.tsx`, `case-roles-grid.tsx`, `case-governance.tsx`, `case-timeline-ladder.tsx`), `app/globals.css` (new `SPEC-CASE-01` section), `lib/motion-constants.ts` (additive). `/docs` source narratives (Libro, Content Spec) still carry the pre-launch figures/invoicing/`MAGUPELL` spelling — known debt, reported not fixed, per spec §8.

## What was done in SPEC-POLISH-06

### /como-trabajamos: section order, execution cycle, build system
- **Section order** — Escala Growth Framework (`PhaseCycle`) moved B → E (last content section, immediately before `FinalCTA`). Final order: A·PageHeader → B·ExecutionCycleFig → C·ExecutionPractices → D·AiBuildBlock → E·PhaseCycle → FinalCTA. Re-lettered in all 3 locales (ES/EN/CA); the Framework's own copy/component/figure content is byte-unchanged — only its position and section letter moved.
- **Post-implementation addendum (approved deviation from §1.1):** Carlos requested B/C swapped after reviewing the initial implementation — "El flujo de ejecución" (ExecutionCycleFig) now precedes "La ejecución, en el día a día" (ExecutionPractices), reversing SPEC-POLISH-06 §1.1's exact order. Re-lettered (`pipeline` C→B, `executionPractices` B→C) in all 3 locales; pure reorder, no surface changes. This creates a paper→dark→paper→dark→dark surface rhythm that Carlos will review live before deciding whether to move `ExecutionPractices` to the dark surface — noted as an open decision below.
- **Figure numbering** — kept FIG.06 for the execution-cycle figure; the new "how we build" figure took **FIG.12** (next free global number) rather than the wireframe's placeholder FIG.07, because FIG.07 is already used by `/que-hacemos` and the site numbers figures globally, not per page. This was an explicit user decision after being shown the alternative (renumbering `/que-hacemos` 07–11 → 08–12), which was rejected to keep `/que-hacemos` untouched and `git diff --stat` scoped to this page only.
- **`ExecutionCycleFig` (new)** replaces `ExecutionPipelineFig` (deleted) — closed ring, 5 stations clockwise from 12 o'clock (Especificación → Aprobación → Construcción → Producción → Uso real), amber return edge with a chevron-arrowhead stopping at station 1's marker, 5 always-visible direction chevrons, phase-locked 12s pulse, `<720px` vertical-list fallback (same DOM-toggle pattern as `PhaseCycle`'s static list, not a scaled-down SVG). Quality is explicitly NOT a station (Libro Ch. 6 "calidad integrada, no inspeccionada") — it's a support line under Construcción only.
- **`AiBuildBlock` full replacement + `HowWeBuildFig` (new)** — heading/body now "Ingeniería con criterio, acelerada por agentes"; a dashed governing frame contains the approved-spec entry, 3 named parallel agent lanes, and 2 amber gates (Criterio senior, Calidad verificable); Producción sits outside the frame; an amber return path re-enters it. Full-content-width figure below the copy, 4-column legend below that (2 cols <900px, 1 col <560px).
- **Diff scope** — confined to `components/execution-cycle-fig.tsx` (new), `components/how-we-build-fig.tsx` (new), `components/ai-build-block.tsx`, `components/pages/method.tsx`, `content/{es,en,ca}/method.ts`, `content/types.ts`, plus the flagged-and-reported consequential edits: `app/globals.css` (no per-component stylesheets exist), `app/styleguide/page.tsx` (renders both changed components), `lib/motion-constants.ts` (additive constants only). `execution-pipeline-fig.tsx` deleted. No shared component (`PageHeader`, `Section`, `FinalCTA`, `GridBackground`, `AllianceConstellation`, `ServiceFig`, `ContactForm`, `PhaseCycle` internals) modified. No other page touched.

### Test results
- 54 test files · 991 tests · 100% pass · build clean · TypeScript strict clean · lint clean (0 new errors) · coverage 77.96%/76.14%/84.71%/80.85% (well above the 70% floor) · 0 hardcoded hex in the two new components.

## What was done in SPEC-POLISH-05

### /que-hacemos FIG.08/09/11 geometry & layering fixes
- **FIG.08 (`platform`)** — module boxes resized to fit their text; `PLATAFORMA` fits inside the core ring; connector endpoints computed geometrically (`pointOnCoreBorder()`) so every line lands exactly on the core border; five staggered, looping module→core pulses added (previously this figure had none).
- **FIG.09 (`ai`)** — flow line split into two edge-to-edge segments so it never crosses box text; process boxes given opaque `--paper` fill as a second safeguard; "DONDE APORTA" moved above the IA node, off the diagram; IA dashed connector meets the PROCESO box's top edge exactly; pulses added on both flow segments and the IA connector.
- **FIG.11 (`evolve`)** — z-order fixed: circle stroke drawn first, the three nodes drawn last with opaque `--paper` fill (hides the stroke behind them); the ambre progress arc now traces the FULL circle via a `stroke-dasharray`/`stroke-dashoffset` `<animate>` (previously a static quarter-arc with a traveling dot); reduced-motion renders the arc complete and static (no extra CSS needed — `stroke-dasharray` is simply omitted when `visible=false`).
- **Canvas normalisation (approved amendment)** — all five ServiceFig variants now share a 340×180 viewBox (was 320×150). FIG.07/FIG.10 receive canvas-only changes (new `LegacyCanvas` wrapper + `translate(10 15)`) — their drawing coordinates are byte-identical, verified by dedicated tests.
- **`lib/motion-constants.ts`** — additive `SERVICE_FIG_*` block (viewbox/offset/pulse-duration/arc-duration constants); no existing export touched.
- **Diff scope** — `components/service-fig.tsx`, `lib/motion-constants.ts`, `tests/components/service-fig.test.tsx`, `tests/components/service-fig-polish-05.test.tsx` (new). No page, no other component, no dictionary touched.

### Test results
- 53 test files · 970 tests · 100% pass · build clean · TypeScript strict clean · lint clean
- No hardcoded hex in `service-fig.tsx`

## What was done in SPEC-POLISH-04

### Constellation as protagonist
- **`AllianceConstellation`** — new `'protagonist'` size (960×620 viewBox, R=200, nodeR=30, coreR1=46, coreR2=60). `'compact'` and `'large'` unchanged — `/modelo-de-alianza` unaffected.
- **Connectors** — start at core OUTER ring edge (CORE_R2), end at node edge. Never crosses core or node.
- **Labels** — anchored by `cosA`/`sinA` thresholds: right-side=start, left-side=end, top/bottom=middle. No label overlaps its node.
- **Traveling pulse** — SVG `<animate>` elements for occupied seats (declarative, no JS). `prefers-reduced-motion` → `display:none` via CSS.
- **Corner ticks** — 4 `<path>` elements in `<g aria-hidden="true">` inside the protagonist SVG.
- **`coreSubLabel`** — new optional prop; renders "2 ALIANZAS ACTIVAS · 3 DISPONIBLES" inside the SVG.
- **`AllianceFigureContent`** — new type in `content/types.ts`; `allianceFigure` key added to ES/EN/CA home dictionaries (fully translatable).
- **`AllianceTeaser`** — accepts `allianceFigure?: AllianceFigureContent`; when provided renders protagonist constellation + caption + sub-caption; when absent falls back to legacy `SystemDiagram kind="outcome"` + legend.
- **`GridBackground`** — reused in `AllianceTeaser` (section has `position: relative`). No duplicate grid code.
- **CSS** — `.alliance-stage`, `.alliance-caption`, `.alliance-subcaption`, `.ac-core-sublabel`, protagonist overrides (opacity 1, no draw-on-scroll), reduced-motion pulse hide.

### Test results
- 52 test files · 953 tests · 100% pass · build clean · TypeScript strict clean
- No hardcoded hex in new components

## What was done in SPEC-POLISH-03

### Brand spelling fix
- `MAGUPELL` → `Magupell` everywhere in user-facing copy (content dictionaries, component labels, tests)
- Internal code identifiers (`const MAGUPELL`, `CASE_MAGUPELL`, test describe strings) left unchanged

### Section 04 redesign
- **`proof.readouts[6]`** — real Magupell data: 167→216 requisitos, 1.803 pruebas (1.042 backend + 761 frontend), 3 entornos, 7 meses, "Sustituyó lo manual.", "A medida de cada rol."
- **`proof.proofFigure`** — new key: timeline[5] (DIC 2025→JUL 2026), timelineCaption, timelineAria
- **`components/proof-timeline-fig.tsx`** — NEW: FIG.04 ascending stair, 5 real-dated milestones anchored to treads, ambre production node, corner ticks, tokens only
- **`components/readout.tsx`** — redesigned: `kind` (number/phrase), 6 `plotVariant` micro-plots (aria-hidden), body-font captions (~15px, max 42ch), no source suffix, no CountUp
- **`components/home-sections.tsx`** — `ProofSection` renders 6 readouts in 2×3 grid, delegates FIG.04 to `ProofTimelineFig`
- **CSS** — `.readout` cells redesigned (flex, body captions), 2×3 grid, responsive to 360px

### Test results
- 52 test files · 938 tests · 100% pass · build clean · TypeScript strict clean
- No hardcoded hex in new components

## What was done in Phase 6 (SPEC-P6)

### Infrastructure (all live on carlos.olivares.ve@gmail.com)
- **GCP project:** `escala-dv-web`, europe-west1 (Belgium)
- **Artifact Registry:** `escala-web-docker` (EU), cleanup policy: keep last 5 images
- **Deployer SA:** `escala-deployer@escala-dv-web.iam.gserviceaccount.com`
- **WIF:** keyless GitHub→GCP auth (no JSON keys anywhere)
- **Secret Manager:** `CONTACT_TO` (hola@escaladigitalventures.com), `CONTACT_FROM` (onboarding@resend.dev), `EMAIL_API_KEY` (placeholder)
- **Budget alert:** €10/month active

### Cloud Run services (both public, scale-to-zero)
| Service | URL | Access | Email | Noindex |
|---|---|---|---|---|
| `escala-web-dev` | `https://escala-web-dev-228491148700.europe-west1.run.app` | Public (allUsers) | DRY_RUN=true | Yes |
| `escala-web-prod` | `https://escala-web-prod-228491148700.europe-west1.run.app` | Public (allUsers) | DRY_RUN=true | No |

### CI/CD pipeline (`.github/workflows/deploy.yml`)
- **`dev` branch push** → CI (lint + tsc + 938 tests + coverage ≥70%) → build linux/amd64 → push to AR → deploy `escala-web-dev`
- **`main` branch push** → same CI → deploy `escala-web-prod`
- **Auth:** Workload Identity Federation (keyless)
- **GitHub variables set:** GCP_PROJECT_ID, GCP_REGION, AR_REPO, CLOUD_RUN_SERVICE_DEV, CLOUD_RUN_SERVICE_PROD, WIF_PROVIDER, WIF_SERVICE_ACCOUNT
- **GitHub "production" environment:** created (no approval gate — Carlos controls main merges)

### Domain mapping (prepared, DNS not switched)
- `escaladigitalventures.com` verified in Google Search Console ✅
- Domain mapping created on `escala-web-prod` ✅
- **GoDaddy DNS records ready to add at go-live (Phase 7):**
  ```
  A     @    216.239.32.21 / .34.21 / .36.21 / .38.21
  AAAA  @    2001:4860:4802:32::15 / :34: / :36: / :38:
  CNAME www  ghs.googlehosted.com.
  ```
- Managed TLS will provision automatically once DNS records are added

## What comes next (Phase 7 — Launch QA & go-live)

Carlos is working on content/QA over the next few days. When ready:

### Before DNS switch
1. **Resolve legal placeholders:** `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}` — Carlos to provide
2. **Legal advisor review** — required before go-live
3. **EN/CA copy register review** — Carlos to sign off (AC-9)
4. **Favicon final artwork** — Carlos to replace draft `app/icon.svg`
5. **Lighthouse ≥95** — all categories, all pages
6. **AA + keyboard audit** — real-device responsive pass
7. **Logo-display permission (BioZero)** — Carlos to confirm

### Email setup (before or at go-live)
1. Create Resend account at resend.com
2. Add domain `escaladigitalventures.com` → get DKIM + SPF records
3. Add records at GoDaddy (merge SPF: `include:_spf.google.com include:<resend-include>`)
4. Update `EMAIL_API_KEY` secret in Secret Manager
5. Update workflow: change `EMAIL_DRY_RUN=true` → `false` for prod

### DNS switch (go-live)
1. Add the 4 A + 4 AAAA + CNAME records at GoDaddy (documented above)
2. Wait ~15-60 min for propagation + TLS cert provisioning
3. `escaladigitalventures.com` serves the Escala site

### Google Workspace (inbound email — can be done any time)
- Sign up at workspace.google.com
- Add MX records at GoDaddy (independent of web DNS switch)
- Add Workspace DKIM record

## SPEC-POLISH-02 — completed (August 2026)

- **Headline:** "Tu operativa llegó a su límite, no tus objetivos." (Libro Ch. 10/12 framing)
- **Body:** two-paragraph tuple in ES/EN/CA; `problem.body` is `readonly [string, string]`
- **Layout:** full-width headline → horizontal symptoms strip (1px divider) → two balanced columns (body | FIG.02)
- **FIG.02:** `ProblemFlowsFig` component; five named pieces (HOJAS DE CÁLCULO · CORREOS · NOTAS · CATÁLOGO · HISTORIAL) around dashed ambre-dk core (PROCESOS MANUALES); solid segments stop at core border; dashed stubs at break; ambre pulses stop at break; core setInterval pulse
- **Files changed:** `content/{es,en,ca}/home.ts`, `components/problem-flows-fig.tsx`, `components/system-diagram.tsx`, `components/home-sections.tsx`, `app/[[...path]]/page.tsx`, `app/globals.css`, `lib/motion-constants.ts`, `docs/escala-web-content-spec-v1.1.1.md`, `docs/CHANGELOG.md`, `specs/spec-polish-02-punto-de-partida.md`
- **Tests:** 921/921 passing (51 files); build clean; no hardcoded hex in new components

## Active decisions open

- **Legal data:** `{{REGISTRO_MERCANTIL}}`, `{{JURISDICCION}}`, `{{FECHA_ACTUALIZACION}}` — Carlos to provide
- **NIF confirmation:** `{{NIF_B88767520}}` pre-filled from MAGUPELL contract — Carlos to confirm
- **EU region:** `{{REGION_EU_GOOGLE_CLOUD}}` = **europe-west1 (Belgium)** — confirmed ✅
- ~~**Favicon artwork:** Carlos to review draft~~ — **resolved by BRAND-01** (real bundle shipped)
- **Header lockup size:** rendered at 162px per spec §3; the bundle README recommends 200px for
  the header. Carlos chose 162px knowing the tagline sits at the edge of legibility at 1x.
  Revisit only if it reads poorly on a real 1x display.
- **Unplaced brand assets:** L04 wordmark, L06 stacked, all `mar` variants and `maskable-*` are
  in the repo but referenced nowhere — no placement assigned yet (BRAND-01 §2/§10).
- **EN/CA copy register:** Carlos to review and sign off (AC-9)
- **Real imagery:** case-study context images pending from clients
- **ServiceFig variants:** FIG.08/09/11 geometry fixed (SPEC-POLISH-05); FIG.07/FIG.10 canvas-normalised only. Still DRAFT VISUAL overall — Carlos may iterate further after live review
- **Logo-display permission:** Carlos to confirm for Magupell + BioZero before Phase 7 launch
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
- **Rate limit store:** in-memory. Swap to Redis/Upstash if abuse observed.
- **Resend account:** not yet created. EMAIL_DRY_RUN=true on both envs until set up.
- **Google Workspace:** not yet set up. Inbound email to hola@escaladigitalventures.com pending.
- **Next polish:** section 02 "Capacidades" — Carlos to decide (section 05 "Alianza" clipping fixed by SPEC-POLISH-09).
- **New follow-up candidate:** pre-existing 8px horizontal overflow at 360px viewport width caused by `.site-header`/`.page-header__*`, present on every page using `PageHeader` (`/como-trabajamos`, `/casos-de-exito`, `/modelo-de-alianza`). Found during SPEC-POLISH-09 live QA; out of that spec's scope (`PageHeader` protected). Not yet triaged into the backlog.
- **Figure numbering convention confirmed:** figures are numbered globally across the site (01–12+), never reset per page. When a page spec's wireframe suggests a number already taken elsewhere, the next free global number is used instead and the wireframe number is treated as a placeholder (per SPEC-POLISH-06 §1.3 precedent).
- **`/como-trabajamos` surface rhythm — pending Carlos review:** after the B/C swap, the page runs paper(A) → dark(B) → paper(C) → dark(D) → dark(E), sandwiching the light `ExecutionPractices` section between two dark ones. Carlos to review live and decide whether to flip `ExecutionPractices` to the dark abisal surface for a cleaner paper→dark×4 rhythm, or leave it as is.
