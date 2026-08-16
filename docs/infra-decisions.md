# Infrastructure Decisions — Escala Digital Ventures

**SPEC-P6 FR-7.4 · Version 1.0 · August 2026**

> This document records the WHY behind every infrastructure choice so future
> changes are informed. See `docs/infra-runbook.md` for the HOW.

---

## D-01 · Cloud Run (not GKE, not App Engine)

**Decision:** Cloud Run (fully managed).

**Why:**
- Scale-to-zero: idle cost ≈ €0. A low-traffic marketing site has long idle periods.
- No cluster management, no node pools, no Kubernetes overhead.
- Managed HTTPS + domain mapping out of the box.
- Sufficient for a stateless Next.js standalone server with a single API route.
- GKE would cost ~€50–100/month minimum (control plane + nodes) for no benefit here.
- App Engine Standard doesn't support arbitrary Docker images; App Engine Flex is
  always-on (no scale-to-zero).

**Trade-off accepted:** Cold-start latency (~1–2s on first request after idle).
Acceptable for a marketing site; not acceptable for a real-time app.

---

## D-02 · europe-west1 (Belgium) region

**Decision:** europe-west1.

**Why:**
- Data-protection alignment with the privacy policy (RGPD/GDPR, EU data residency).
- Resolves the `{{REGION_EU_GOOGLE_CLOUD}}` legal placeholder.
- europe-west1 is one of GCP's oldest, most stable EU regions with full service
  availability (Cloud Run, Artifact Registry, Secret Manager all available).
- Closest to Spain (Mataró, Barcelona) among the EU regions with full feature parity.

**Alternative considered:** europe-southwest1 (Madrid) — newer, slightly closer,
but fewer services available and higher pricing tier. Not worth the risk for v1.

---

## D-03 · GitHub Actions only (no Cloud Build)

**Decision:** GitHub Actions for CI/CD; Cloud Build NOT used.

**Why:**
- Cloud Build charges per build minute (~€0.003/min). For a small site with
  infrequent deploys, GitHub Actions free tier (2,000 min/month) covers it entirely.
- Keeping CI/CD in one place (GitHub) reduces cognitive overhead.
- The workflow file is version-controlled alongside the code.
- Cloud Build would add a second system to monitor and configure.

**Trade-off accepted:** GitHub Actions runners are outside GCP. The image is pushed
to Artifact Registry over the internet (authenticated via WIF). This is standard
practice and adds negligible latency to the build step.

---

## D-04 · Workload Identity Federation (no SA JSON keys)

**Decision:** Keyless auth via WIF. No service-account JSON keys created or stored.

**Why:**
- JSON keys are long-lived credentials that can be leaked (repo, logs, CI env).
  WIF tokens are short-lived (1 hour) and scoped to the specific GitHub repo.
- WIF is the GCP-recommended best practice for GitHub Actions since 2022.
- Zero additional cost.
- The deployer SA has least-privilege roles: AR writer + Cloud Run developer +
  Secret Manager accessor. It cannot create/delete projects, billing, or IAM.

**How it works:** GitHub Actions generates an OIDC token signed by GitHub.
GCP's WIF pool verifies the token against GitHub's JWKS endpoint and exchanges
it for a short-lived GCP access token impersonating the deployer SA.

---

## D-05 · Secret Manager (not env vars in the workflow)

**Decision:** All sensitive runtime config in Secret Manager; mounted as env vars
at Cloud Run deploy time via `--set-secrets`.

**Why:**
- Secrets never appear in the GitHub workflow file, the Docker image, or build logs.
- Secret Manager provides versioning (easy rollback), audit logs, and IAM-gated access.
- The deployer SA has `secretmanager.secretAccessor` — it can read but not create/delete.
- Free tier: 6 active secret versions free; 10,000 access operations free/month.
  This site uses 3 secrets with rare access — well within free tier.

**Secrets managed:**
| Secret | Purpose |
|---|---|
| `resend-api-key` | Resend API key — mounted as `SMTP_PASSWORD` on both services |
| `CONTACT_TO` | Internal inbox receiving form submissions (prod only) |

**Not in Secret Manager:** `NODE_ENV`, `EMAIL_DRY_RUN`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `CONTACT_FROM`, `CONTACT_FROM_NAME` — non-sensitive operational config set
directly as Cloud Run env vars. `CONTACT_FROM` (`hola@escaladigitalventures.com`) is
published on the website, so it is not a secret. Dev's `CONTACT_TO` is likewise a plain
env var: it is a test recipient, not a credential.

**Pending retirement:** the legacy `EMAIL_API_KEY` and `CONTACT_FROM` secrets are
unmounted but still present; delete once dev verification passes.

---

## D-06 · Artifact Registry (not Container Registry)

**Decision:** Artifact Registry (europe-west1).

**Why:**
- Container Registry is deprecated by Google (EOL announced). Artifact Registry is
  the successor and the only supported option going forward.
- Artifact Registry supports cleanup policies natively (keep last N images).
- Same pricing as Container Registry.

**Cleanup policy:** Keep last 5 images per tag. Older images are deleted automatically.
This prevents storage creep from frequent CI builds.

---

## D-07 · No VPC, no serverless VPC connector, no load balancer

**Decision:** Default Cloud Run networking (managed URL + domain mapping).

**Why:**
- Cloud Run provides HTTPS + a managed URL out of the box. No load balancer needed.
- A load balancer (Cloud Load Balancing) costs ~€15–20/month minimum (forwarding rule
  + backend service). Not justified for a static marketing site.
- A VPC connector costs ~€5–10/month. Not needed — the app has no private resources
  (no Cloud SQL, no Memorystore, no internal services).
- The contact form reaches Resend over public SMTP — no private network path needed.

**When to revisit:** If a future version adds a database (Cloud SQL) or a private
service, add a serverless VPC connector at that point. Do not pre-provision it.

---

## D-08 · In-memory rate limit (not Redis/Upstash)

**Decision:** Keep the existing in-memory rate limit (5 req/IP/min) for now.

**Why:**
- The in-memory store is free and sufficient for a low-traffic marketing site.
- Cloud Run scale-to-zero means the store resets on cold-start — acceptable because
  the contact form is not a high-value attack target.
- Adding Redis/Upstash adds cost (Upstash free tier: 10K commands/day, then pay-per-use)
  and operational complexity.

**When to revisit:** If abuse is observed (spam submissions, rate-limit bypass).
The cheapest durable option at that point: Upstash Redis free tier or Firestore
native free quota. Do not pre-provision.

---

## D-09 · dev environment — IAM-gated, no custom domain

**Decision:** dev service uses `--no-allow-unauthenticated` (IAM gate) + generic
Cloud Run URL. No `dev.escaladigitalventures.com` subdomain.

**Why:**
- IAM gate is free and requires zero code. The only person accessing dev is Carlos
  (carlos.olivares.ve@gmail.com) — a Google-account gate is sufficient.
- No custom subdomain = no DNS record to manage, no TLS cert to provision.
- `X-Robots-Tag: noindex` is set in `next.config.mjs` headers for all routes on dev
  (via the Cloud Run env var `NEXT_PUBLIC_NOINDEX=true` — see runbook).
- The raw Cloud Run URL is not guessable and not indexed.

**Note:** The `X-Robots-Tag: noindex` header is added at the Next.js level via
`next.config.mjs` headers config. The dev service sets `EMAIL_DRY_RUN=true` so
no real emails are sent from dev.

---

## D-10 · Next.js `output: "standalone"`

**Decision:** `output: "standalone"` in `next.config.mjs`.

**Why:**
- Standalone mode produces a self-contained `server.js` + minimal `node_modules`
  (only production runtime deps, no dev deps). The Docker image is significantly
  smaller than copying the full `node_modules`.
- The standalone output is the recommended approach for containerized Next.js
  deployments (official Next.js docs + Vercel recommendation).
- The Dockerfile copies only `.next/standalone`, `.next/static`, and `public` —
  the three directories needed to run the server.

---

## D-11 · Outbound mail: Resend over SMTP

**Decision:** Outbound transactional email via **Resend SMTP** (`smtp.resend.com`, STARTTLS
on port 587), sent with nodemailer from `lib/email.ts`. Sending region: `eu-west-1`.

**Inbound mail is unchanged:** Microsoft 365 via GoDaddy. Only outbound is Resend.

**Why SMTP rather than the REST API:**
- One transport for the whole app — nodemailer was already added for the earlier
  Google Workspace attempt, so SMTP means no additional dependency.
- Microsoft 365 SMTP was evaluated and abandoned: the tenant does not expose app
  passwords, and basic auth is being retired in favour of OAuth 2.0.

**Configuration:** `SMTP_USER` is the literal string `resend` (not an email address);
`SMTP_PASSWORD` is the Resend API key, stored in Secret Manager as `resend-api-key`
and mounted on both Cloud Run services.

**Known limitations:**
- **Free tier caps at 100 emails/day.** Each submission sends two (notification +
  confirmation), so this is roughly **50 submissions/day**.
- **No delivery telemetry** wired into the app — bounces and failures are visible only
  in the Resend dashboard.
- **Resend stores account data and logs in the US.** Submitter personal data therefore
  transits a US-based processor. `/privacidad` needs a corresponding update — a legal
  copy decision, not a code change.

**Status:** Dev active. Prod remains `EMAIL_DRY_RUN=true` until dev verification passes
and go-live is approved separately.

---

## D-12 · CONTACT_TO = hola@escaladigitalventures.com (Google Workspace)

**Decision:** Form submissions go to `hola@escaladigitalventures.com` (Workspace inbox).

**Why:**
- Carlos uses this address as the public-facing contact. Submissions arriving in the
  same inbox he replies from reduces friction.
- `carlos.olivares.ve@gmail.com` may remain as an optional CC/fallback.
- The destination address is server-side config only (Secret Manager). The public site
  only shows `hola@escaladigitalventures.com` as the contact address.

**Note:** Google Workspace MX records must be added at GoDaddy for inbound email to
work. This is independent of the website DNS switch (can be done at any time).

---

*See also: `docs/infra-runbook.md` (step-by-step setup) · `PLAN.md` Phase 6 · `SPEC-P6`*
