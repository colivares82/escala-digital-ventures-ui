# Active Context

_Last updated: August 2026 (SPEC-POLISH-05 COMPLETE — /que-hacemos FIG.08/09/11 overlap & layering fixes)_

## Current state

**Phase 6 COMPLETE + SPEC-POLISH-02/03/04/05 COMPLETE.** Both Cloud Run environments are live. CI/CD pipeline is fully operational. `/que-hacemos` FIG.08 (arquitectura modular), FIG.09 (IA en el proceso), and FIG.11 (evolución continua) had overlap/layering defects (text spilling, flow line crossing text, misplaced label, nodes under the line) — all three fixed surgically in `ServiceFig`, with animations preserved/corrected. Carlos is working on Phase 7 content/QA before DNS switch.

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
- **Favicon artwork:** Carlos to review draft and replace with final approved logomark
- **EN/CA copy register:** Carlos to review and sign off (AC-9)
- **Real imagery:** case-study context images pending from clients
- **ServiceFig variants:** FIG.08/09/11 geometry fixed (SPEC-POLISH-05); FIG.07/FIG.10 canvas-normalised only. Still DRAFT VISUAL overall — Carlos may iterate further after live review
- **Logo-display permission:** Carlos to confirm for Magupell + BioZero before Phase 7 launch
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
- **Rate limit store:** in-memory. Swap to Redis/Upstash if abuse observed.
- **Resend account:** not yet created. EMAIL_DRY_RUN=true on both envs until set up.
- **Google Workspace:** not yet set up. Inbound email to hola@escaladigitalventures.com pending.
- **Next polish:** section 05 "Alianza" or section 02 "Capacidades" — Carlos to decide.
