# Active Context

_Last updated: August 2026 (SPEC-POLISH-03 COMPLETE — home section 04 real Magupell data)_

## Current state

**Phase 6 COMPLETE + SPEC-POLISH-02 COMPLETE + SPEC-POLISH-03 COMPLETE.** Both Cloud Run environments are live. CI/CD pipeline is fully operational. Home section 01 "Punto de partida" was polished in POLISH-02. Home section 04 "Evidencia" has now been polished with real Magupell data: 6 readouts (167→216, 1.803, 3 entornos, 7 meses, "Sustituyó lo manual.", "A medida de cada rol."), redesigned FIG.04 timeline with 5 real-dated milestones, and brand spelling corrected to "Magupell" everywhere. Carlos is working on Phase 7 content/QA before DNS switch.

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
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review
- **Logo-display permission:** Carlos to confirm for Magupell + BioZero before Phase 7 launch
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
- **Rate limit store:** in-memory. Swap to Redis/Upstash if abuse observed.
- **Resend account:** not yet created. EMAIL_DRY_RUN=true on both envs until set up.
- **Google Workspace:** not yet set up. Inbound email to hola@escaladigitalventures.com pending.
- **Next polish:** section 05 "Alianza" or section 02 "Capacidades" — Carlos to decide.
