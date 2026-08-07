# Active Context

_Last updated: August 2026 (Phase 6 COMPLETE — GCP infrastructure fully live)_

## Current state

**Phase 6 COMPLETE.** Both Cloud Run environments are live and publicly accessible. CI/CD pipeline is fully operational. Branch flow: `dev` → dev environment, `main` → prod environment. Carlos is working on Phase 7 content/QA over the next few days before DNS switch.

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
- **`dev` branch push** → CI (lint + tsc + 883 tests + coverage ≥70%) → build linux/amd64 → push to AR → deploy `escala-web-dev`
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

### Code changes in Phase 6
- `Dockerfile` — Next.js standalone, multi-stage, non-root, linux/amd64
- `.dockerignore` — lean build context
- `next.config.mjs` — `output: 'standalone'` + `X-Robots-Tag: noindex` for dev
- `app/[[...path]]/page.tsx` — `dynamicParams=true` (Next.js 16 SSR on-demand; notFound() guards unknown paths)
- `next-env.d.ts` — committed (needed for CI tsc to resolve image types)
- `tests/components/case-card.test.tsx` — added dossierByLocale/metaByLocale to mock
- `docs/infra-runbook.md` + `docs/infra-decisions.md` — complete

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

## Active decisions open

- **Legal data:** `{{REGISTRO_MERCANTIL}}`, `{{JURISDICCION}}`, `{{FECHA_ACTUALIZACION}}` — Carlos to provide
- **NIF confirmation:** `{{NIF_B88767520}}` pre-filled from MAGUPELL contract — Carlos to confirm
- **EU region:** `{{REGION_EU_GOOGLE_CLOUD}}` = **europe-west1 (Belgium)** — confirmed ✅
- **Favicon artwork:** Carlos to review draft and replace with final approved logomark
- **EN/CA copy register:** Carlos to review and sign off (AC-9)
- **Real imagery:** case-study context images pending from clients
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
- **Rate limit store:** in-memory. Swap to Redis/Upstash if abuse observed.
- **Resend account:** not yet created. EMAIL_DRY_RUN=true on both envs until set up.
- **Google Workspace:** not yet set up. Inbound email to hola@escaladigitalventures.com pending.
