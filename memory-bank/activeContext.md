# Active Context

_Last updated: August 2026 (Phase 6 code complete — SPEC-P6 GCP infrastructure)_

## Current state

**Phase 6 code COMPLETE.** All infrastructure artifacts delivered. GCP bootstrap requires Carlos to run the interactive steps in `docs/infra-runbook.md`. PLAN.md Phase 6 marked ◐ (in progress — code done, cloud bootstrap pending).

## What was just done (Phase 6 — SPEC-P6)

1. **`Dockerfile`** — Next.js standalone, multi-stage (deps → builder → runner), non-root user (`nextjs:1001`), PORT 8080 for Cloud Run. AC-1 complete.

2. **`.dockerignore`** — lean build context: excludes node_modules, .next, .env*, tests, docs, .git, CI.

3. **`next.config.mjs`** — `output: 'standalone'` added. `X-Robots-Tag: noindex, nofollow` header for dev env via `NEXT_PUBLIC_NOINDEX=true` env var (no-op in prod). AC-2 / D-09.

4. **`.github/workflows/deploy.yml`** — CI/CD pipeline:
   - CI job: lint + typecheck + test:coverage (≥70% gate, i18n coverage guard, placeholder guard all run as part of the test suite)
   - Build job: WIF keyless auth → build Docker image → push to Artifact Registry EU
   - Deploy dev: auto on every push to `main`, `--no-allow-unauthenticated`, `EMAIL_DRY_RUN=true`
   - Deploy prod: `workflow_dispatch` only, gated by GitHub Environment "production" (manual approval)
   - AC-2, AC-3, AC-4, AC-11 complete.

5. **`docs/infra-runbook.md`** — 13-step interactive runbook with every Carlos-input point marked. Covers: gcloud account switch, project creation, billing, APIs, Artifact Registry + cleanup policy, deployer SA, WIF, Secret Manager, dev deploy, CI wiring, prod deploy, domain mapping, GoDaddy DNS record set (web + Workspace MX + merged SPF + DKIM×2 + DMARC), budget alert. AC-10.

6. **`docs/infra-decisions.md`** — 12 architecture decisions with rationale (D-01 through D-12). FR-7.4.

7. **`.env.example`** — `NEXT_PUBLIC_NOINDEX` documented.

8. **`docs/REQUIREMENTS_TRACEABILITY.md`** — R-1.5 updated to ✅.

9. **`docs/CHANGELOG.md`** — Phase 6 entry added.

10. **`PLAN.md`** — Phase 6 updated to ◐ with all ☑/☐ items.

## Architecture confirmed (SPEC-P6)

- **Region:** europe-west1 (Belgium) — resolves `{{REGION_EU_GOOGLE_CLOUD}}` legal placeholder
- **Compute:** Cloud Run, scale-to-zero, min 0, CPU throttled
- **Services:** `escala-web-dev` (max 2, IAM-gated) + `escala-web-prod` (max 4, domain-mapped)
- **Auth:** Workload Identity Federation — no SA JSON keys
- **Secrets:** Secret Manager (EMAIL_API_KEY placeholder, CONTACT_TO, CONTACT_FROM)
- **Registry:** Artifact Registry EU + cleanup policy (keep last 5)
- **No:** VPC, load balancer, managed DB, Kubernetes, Cloud Build

## What was previously done

Phase 1–5 — see CHANGELOG and previous activeContext archived there.

## Known issues / open items

### Phase 6 — Carlos must complete (runbook)
- **GCP bootstrap:** gcloud auth login with personal account, create project `escala-web`, link billing (Runbook Step 0–1)
- **APIs + Artifact Registry:** enable 5 APIs, create EU repo + cleanup policy (Runbook Step 2–3)
- **Deployer SA + WIF:** create SA, grant roles, create WIF pool + provider, bind GitHub repo (Runbook Step 4–5)
- **GitHub Actions variables:** 7 variables to set in repo settings (Runbook Step 5)
- **Secret Manager:** create 3 secrets with real/placeholder values (Runbook Step 6)
- **First manual deploy:** docker build + push + gcloud run deploy dev (Runbook Step 7)
- **GitHub "production" environment:** create with manual approval gate (Runbook Step 8)
- **Prod service + domain mapping:** deploy prod, map domain (Runbook Step 9–10)
- **Budget alert €10:** create in Cloud Billing console (Runbook Step 12)

### Deferred (email + DNS)
- **Resend account + API key:** create at resend.com, update EMAIL_API_KEY secret (Runbook Step 13)
- **Google Workspace:** signup, add MX records at GoDaddy for inbound email (Runbook Step 11)
- **GoDaddy DNS records:** web A/AAAA + www, merged SPF, DKIM×2, DMARC — prepared in runbook, not applied (Phase 7 go-live)

### Inherited from previous phases
- **Carlos register review (AC-9):** EN + CA copy pending Carlos sign-off.
- **Legal placeholders:** `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}`, `{{REGION_EU_GOOGLE_CLOUD}}` — Carlos must fill before go-live. `{{REGION_EU_GOOGLE_CLOUD}}` = europe-west1 (Belgium) now confirmed.
- **Legal advisor review required** before go-live.
- **Favicon artwork is a draft** — Carlos to review and replace.
- **ServiceFig figures DRAFT** — Carlos will refine.
- **FIG.06 provisional** — `ExecutionPipelineFig` internals provisional.
- **Logo-display permission (BioZero):** pending Carlos confirmation.
- **Email delivery:** DRY_RUN active. Zero code change needed once Resend key + domain verified.
- **Rate limit store:** in-memory. TODO(P6): swap to Redis/Upstash if abuse observed.
- **`<html lang>` on root layout:** stays `lang="es"` until Phase 6 middleware sets it per-request.

## What comes next (Phase 7)

**Phase 7:** Launch QA & go-live — after Phase 6 GCP bootstrap is complete.
- Lighthouse ≥95 all categories, all pages
- AA + keyboard audit; real-device responsive pass
- DNS switch → production live
- Legal placeholders resolved + advisor review
- Carlos EN/CA register sign-off

## Active decisions open

- **Legal data:** `{{REGISTRO_MERCANTIL}}`, `{{JURISDICCION}}`, `{{FECHA_ACTUALIZACION}}` — Carlos to provide.
- **NIF confirmation:** `{{NIF_B88767520}}` pre-filled from MAGUPELL contract — Carlos to confirm.
- **EU region:** `{{REGION_EU_GOOGLE_CLOUD}}` = **europe-west1 (Belgium)** — confirmed in SPEC-P6.
- **Favicon artwork:** Carlos to review draft and replace with final approved logomark.
- **EN/CA copy register:** Carlos to review and sign off (AC-9).
- **Real imagery:** case-study context images pending from clients.
- **GCP project id:** proposed `escala-web` — Carlos to confirm availability when running Step 1.
- **CONTACT_TO final value:** recommended `hola@escaladigitalventures.com` (Workspace) — Carlos to confirm when creating secrets.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
