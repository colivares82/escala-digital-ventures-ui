# Infrastructure Runbook — Escala Digital Ventures

**SPEC-P6 FR-7.3 · Version 1.0 · August 2026**
**Region:** europe-west1 (Belgium)
**Account:** carlos.olivares.ve@gmail.com (personal, independent from MAGUPELL)

> **How to use this runbook:** Follow steps in order. Every step marked
> **[CARLOS INPUT REQUIRED]** needs you to provide a value or take an action
> in a browser/console before Cline can proceed. Steps marked **[COST]** state
> the expected spend before you apply them.

---

## Prerequisites

- `gcloud` CLI installed (already present on your machine)
- Docker Desktop running (for local image verification)
- GitHub repo: `git@github.com:colivares82/escala-digital-ventures-ui.git`
- GoDaddy credentials for `escaladigitalventures.com`

---

## Step 0 — Switch gcloud to the Escala account

Your machine is currently authenticated as `app.magupell@gmail.com` (MAGUPELL project).
Run the following to add and activate your personal account:

```bash
gcloud auth login carlos.olivares.ve@gmail.com
gcloud config set account carlos.olivares.ve@gmail.com
```

A browser window will open — log in with `carlos.olivares.ve@gmail.com`.

Verify:
```bash
gcloud auth list
# Should show carlos.olivares.ve@gmail.com as ACTIVE
```

---

## Step 1 — Create the GCP project

**[COST]** Creating a project is free. Billing is only charged when services are used.

```bash
# Proposed project id: escala-web
# If taken, try: escala-web-eu  or  escala-dv-web
gcloud projects create escala-web \
  --name="Escala Digital Ventures Web"
```

Set it as the active project:
```bash
gcloud config set project escala-web
```

**[CARLOS INPUT REQUIRED]** Link a billing account:
1. Go to: https://console.cloud.google.com/billing/projects
2. Find "Escala Digital Ventures Web" → click "Link a billing account"
3. Select your billing account (or create one — requires a credit card)
4. Confirm and come back here.

Verify billing is linked:
```bash
gcloud billing projects describe escala-web
# Should show billingEnabled: true
```

---

## Step 2 — Enable required APIs

**[COST]** Enabling APIs is free. Usage charges apply only when services are called.

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  --project escala-web
```

---

## Step 3 — Create Artifact Registry repository (EU)

**[COST]** Storage: ~€0.10/GB/month. With the cleanup policy (keep last 5 images),
expect < €0.05/month for this site.

```bash
gcloud artifacts repositories create escala-web-docker \
  --repository-format docker \
  --location europe-west1 \
  --description "Escala Digital Ventures web container images" \
  --project escala-web
```

Set a cleanup policy (keep last 5 images, delete older ones):
```bash
gcloud artifacts repositories set-cleanup-policies escala-web-docker \
  --location europe-west1 \
  --project escala-web \
  --policy '[{"name":"keep-last-5","action":{"type":"Keep"},"mostRecentVersions":{"keepCount":5}}]'
```

---

## Step 4 — Create the deployer service account (least privilege)

```bash
# Create the SA
gcloud iam service-accounts create escala-deployer \
  --display-name "Escala Web Deployer (CI/CD)" \
  --project escala-web

# Grant: Artifact Registry writer (push images)
gcloud projects add-iam-policy-binding escala-web \
  --member "serviceAccount:escala-deployer@escala-web.iam.gserviceaccount.com" \
  --role "roles/artifactregistry.writer"

# Grant: Cloud Run developer (deploy services)
gcloud projects add-iam-policy-binding escala-web \
  --member "serviceAccount:escala-deployer@escala-web.iam.gserviceaccount.com" \
  --role "roles/run.developer"

# Grant: Secret Manager accessor (read secrets at deploy time)
gcloud projects add-iam-policy-binding escala-web \
  --member "serviceAccount:escala-deployer@escala-web.iam.gserviceaccount.com" \
  --role "roles/secretmanager.secretAccessor"

# Grant: Service Account Token Creator (needed for WIF impersonation)
gcloud iam service-accounts add-iam-policy-binding \
  escala-deployer@escala-web.iam.gserviceaccount.com \
  --member "serviceAccount:escala-deployer@escala-web.iam.gserviceaccount.com" \
  --role "roles/iam.serviceAccountTokenCreator" \
  --project escala-web
```

---

## Step 5 — Workload Identity Federation (keyless GitHub→GCP auth)

**No JSON keys are created or stored. This is the security best practice (AC-4).**

```bash
# 1. Create the WIF pool
gcloud iam workload-identity-pools create github-pool \
  --location global \
  --display-name "GitHub Actions Pool" \
  --project escala-web

# 2. Get the pool's numeric project number (needed for the provider)
PROJECT_NUMBER=$(gcloud projects describe escala-web --format='value(projectNumber)')
echo "Project number: ${PROJECT_NUMBER}"

# 3. Create the OIDC provider for GitHub Actions
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location global \
  --workload-identity-pool github-pool \
  --display-name "GitHub Actions OIDC" \
  --issuer-uri "https://token.actions.githubusercontent.com" \
  --attribute-mapping "google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor" \
  --attribute-condition "assertion.repository=='colivares82/escala-digital-ventures-ui'" \
  --project escala-web

# 4. Allow the GitHub repo to impersonate the deployer SA
gcloud iam service-accounts add-iam-policy-binding \
  escala-deployer@escala-web.iam.gserviceaccount.com \
  --role "roles/iam.workloadIdentityUser" \
  --member "principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/colivares82/escala-digital-ventures-ui" \
  --project escala-web

# 5. Get the WIF provider full resource name (needed for GitHub variable)
gcloud iam workload-identity-pools providers describe github-provider \
  --location global \
  --workload-identity-pool github-pool \
  --project escala-web \
  --format 'value(name)'
# Copy this value — you'll need it for the WIF_PROVIDER GitHub variable
```

**[CARLOS INPUT REQUIRED]** Set these GitHub Actions Variables
(repo → Settings → Secrets and variables → Actions → Variables tab → New repository variable):

| Variable | Value |
|---|---|
| `GCP_PROJECT_ID` | `escala-web` |
| `GCP_REGION` | `europe-west1` |
| `AR_REPO` | `escala-web-docker` |
| `CLOUD_RUN_SERVICE_DEV` | `escala-web-dev` |
| `CLOUD_RUN_SERVICE_PROD` | `escala-web-prod` |
| `WIF_PROVIDER` | *(output of the last gcloud command above)* |
| `WIF_SERVICE_ACCOUNT` | `escala-deployer@escala-web.iam.gserviceaccount.com` |

---

## Step 6 — Create secrets in Secret Manager

**[CARLOS INPUT REQUIRED]** You will type the values directly into the terminal.
Nothing is stored in the repo or the image.

```bash
# CONTACT_TO — the internal inbox that receives form submissions
# Recommended: hola@escaladigitalventures.com (your Workspace inbox)
# Fallback: carlos.olivares.ve@gmail.com
echo -n "hola@escaladigitalventures.com" | \
  gcloud secrets create CONTACT_TO \
    --data-file=- \
    --replication-policy automatic \
    --project escala-web

# CONTACT_FROM is NOT a secret — hola@escaladigitalventures.com is published on
# the website. It is set as a plain --set-env-vars value in deploy.yml.

# resend-api-key — the Resend API key, mounted as SMTP_PASSWORD
gcloud secrets create resend-api-key \
  --replication-policy="user-managed" --locations="europe-west1" \
  --project escala-dv-web

gcloud secrets add-iam-policy-binding resend-api-key \
  --member="serviceAccount:228491148700-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" \
  --project escala-dv-web
```

Add the key value yourself — `read -rs` hides the input and keeps it out of shell
history. Never paste a key into a chat window or commit one:
```bash
read -rs -p "Resend API key: " RESEND_KEY && \
  printf '%s' "$RESEND_KEY" | \
  gcloud secrets versions add resend-api-key --data-file=- --project escala-dv-web && \
  unset RESEND_KEY
```

Verify by version count only, never by reading the value back:
```bash
gcloud secrets versions list resend-api-key --project escala-dv-web
```

---

## Step 7 — First manual deploy of dev service

**[COST]** Cloud Run scale-to-zero: idle cost ≈ €0. You pay only per request.
Free tier: 2M requests/month, 360K GB-seconds/month — this site will stay in free tier.

First, build and push the image manually (before CI is wired):
```bash
# Authenticate Docker
gcloud auth configure-docker europe-west1-docker.pkg.dev

# Build and push (from repo root)
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://escaladigitalventures.com \
  --tag europe-west1-docker.pkg.dev/escala-web/escala-web-docker/escala-web:initial \
  .

docker push europe-west1-docker.pkg.dev/escala-web/escala-web-docker/escala-web:initial
```

Deploy dev:
```bash
gcloud run deploy escala-web-dev \
  --image europe-west1-docker.pkg.dev/escala-web/escala-web-docker/escala-web:initial \
  --region europe-west1 \
  --platform managed \
  --no-allow-unauthenticated \
  --min-instances 0 \
  --max-instances 2 \
  --cpu 1 \
  --memory 512Mi \
  --concurrency 80 \
  --cpu-throttling \
  --set-env-vars "NODE_ENV=production,EMAIL_DRY_RUN=false,SMTP_HOST=smtp.resend.com,SMTP_PORT=587,SMTP_USER=resend,CONTACT_FROM=hola@escaladigitalventures.com,CONTACT_FROM_NAME=Escala Digital Ventures,CONTACT_TO=carlos.olivares.ve@gmail.com" \
  --set-secrets "SMTP_PASSWORD=resend-api-key:latest" \
  --project escala-web

# Get the dev URL
gcloud run services describe escala-web-dev \
  --region europe-west1 \
  --project escala-web \
  --format 'value(status.url)'
```

**Access the dev URL:** Since `--no-allow-unauthenticated` is set, you need to be
logged in with your Google account. Use:
```bash
# Open in browser with your identity token
gcloud run services proxy escala-web-dev \
  --region europe-west1 \
  --project escala-web
# Then open http://localhost:8080
```

Or grant yourself access:
```bash
gcloud run services add-iam-policy-binding escala-web-dev \
  --region europe-west1 \
  --member "user:carlos.olivares.ve@gmail.com" \
  --role "roles/run.invoker" \
  --project escala-web
```

---

## Step 8 — Wire GitHub Actions (CI/CD)

After completing Steps 5 (GitHub variables set), push to `main`:
```bash
git add Dockerfile .dockerignore .github/workflows/deploy.yml next.config.mjs
git commit -m "chore(infra): dockerfile + ci/cd pipeline (SPEC-P6)"
git push origin main
```

Watch the Actions tab at: https://github.com/colivares82/escala-digital-ventures-ui/actions

**[CARLOS INPUT REQUIRED]** Create the "production" GitHub Environment:
1. Go to: repo → Settings → Environments → New environment
2. Name: `production`
3. Required reviewers: add `colivares82` (your GitHub username)
4. Save

---

## Step 9 — Deploy prod service

```bash
gcloud run deploy escala-web-prod \
  --image europe-west1-docker.pkg.dev/escala-web/escala-web-docker/escala-web:initial \
  --region europe-west1 \
  --platform managed \
  --no-allow-unauthenticated \
  --min-instances 0 \
  --max-instances 4 \
  --cpu 1 \
  --memory 512Mi \
  --concurrency 80 \
  --cpu-throttling \
  --set-env-vars "NODE_ENV=production,EMAIL_DRY_RUN=true,SMTP_HOST=smtp.resend.com,SMTP_PORT=587,SMTP_USER=resend,CONTACT_FROM=hola@escaladigitalventures.com,CONTACT_FROM_NAME=Escala Digital Ventures" \
  --set-secrets "CONTACT_TO=CONTACT_TO:latest,SMTP_PASSWORD=resend-api-key:latest" \
  --project escala-web
```

---

## Step 10 — Domain mapping (prod) — prepared, DNS not switched

**[COST]** Cloud Run domain mapping is free. Managed TLS is free.

```bash
# Map the apex domain
gcloud run domain-mappings create \
  --service escala-web-prod \
  --domain escaladigitalventures.com \
  --region europe-west1 \
  --project escala-web

# Map www (will redirect to apex)
gcloud run domain-mappings create \
  --service escala-web-prod \
  --domain www.escaladigitalventures.com \
  --region europe-west1 \
  --project escala-web

# Get the DNS records to add at GoDaddy
gcloud run domain-mappings describe \
  --domain escaladigitalventures.com \
  --region europe-west1 \
  --project escala-web
```

The output will show the A/AAAA records to add at GoDaddy.
**Do NOT add them yet — DNS switch is Phase 7 (go-live).**
Document the records here once you have them.

---

## Step 11 — DNS record set (GoDaddy) — prepared, not applied

**[CARLOS INPUT REQUIRED]** Log in to GoDaddy DNS manager for `escaladigitalventures.com`.
Add these records (do NOT delete existing records until Phase 7 go-live):

### Website (Cloud Run) — ⚠️ GO-LIVE ACTION REQUIRED

**Verified state (15 Aug 2026), project `escala-dv-web`, region `europe-west1`:**

| Mapping | Service | Status |
|---|---|---|
| `escaladigitalventures.com` | `escala-web-prod` | `DomainRoutable: True` · `CertificatePending` |
| `www.escaladigitalventures.com` | `escala-web-prod` | `CertificatePending` |

Cloud Run reports: *"Waiting for certificate provisioning. You must configure your
DNS records for certificate issuance to begin."* — i.e. **the mappings are correct;
DNS is the only thing missing.**

**Step 1 — DELETE the GoDaddy parking records** (these are what currently answer):
```
A     @     15.197.148.33     ← DELETE (GoDaddy parking)
A     @     3.33.130.190      ← DELETE (GoDaddy parking)
CNAME www   escaladigitalventures.com   ← DELETE (points www at the parking apex)
```

**Step 2 — ADD these records** (from `gcloud beta run domain-mappings describe`):
```
A     @     216.239.32.21    TTL 3600
A     @     216.239.34.21    TTL 3600
A     @     216.239.36.21    TTL 3600
A     @     216.239.38.21    TTL 3600
AAAA  @     2001:4860:4802:32::15    TTL 3600
AAAA  @     2001:4860:4802:34::15    TTL 3600
AAAA  @     2001:4860:4802:36::15    TTL 3600
AAAA  @     2001:4860:4802:38::15    TTL 3600
CNAME www   ghs.googlehosted.com.    TTL 3600
```
The apex A/AAAA records are still required even though `www` is canonical — the apex
must resolve in order to serve the 308 redirect to `www`.

Managed TLS provisions automatically once these propagate (15 min – 24 h). Verify with:
```bash
gcloud beta run domain-mappings list --region europe-west1 --project escala-dv-web
# Both rows should lose the "X"/"…" marker and become ready
```

### Google Workspace (inbound email) — can be added NOW, independent of web DNS
**[CARLOS INPUT REQUIRED]** Sign up for Google Workspace at workspace.google.com.
During setup, Google will give you a TXT verification record and MX records.

```
# Workspace domain verification (Google provides the exact value):
TXT   @     google-site-verification=<VALUE_FROM_GOOGLE_ADMIN>

# Workspace MX records (standard):
MX    @     1   ASPMX.L.GOOGLE.COM.
MX    @     5   ALT1.ASPMX.L.GOOGLE.COM.
MX    @     5   ALT2.ASPMX.L.GOOGLE.COM.
MX    @     10  ALT3.ASPMX.L.GOOGLE.COM.
MX    @     10  ALT4.ASPMX.L.GOOGLE.COM.
```

### Email authentication (SPF / DKIM / DMARC)
**Important:** Only ONE SPF record is allowed. It must authorize BOTH the inbound
provider (Microsoft 365 via GoDaddy) and Resend (the outbound transactional sender).
Merge them into a single record:

```
# Merged SPF — authorizes Microsoft 365 (inbound) + Resend (outbound)
TXT   @     "v=spf1 include:secureserver.net include:_spf.resend.com ~all"
# Confirm the exact includes against the GoDaddy/Microsoft 365 DNS panel and
# the Resend dashboard — both publish the value they expect.

# Workspace DKIM — Google Admin Console → Apps → Gmail → Authenticate email
# Google generates the key; you add it as:
TXT   google._domainkey   "v=DKIM1; k=rsa; p=<KEY_FROM_GOOGLE_ADMIN>"

# Resend DKIM — Resend dashboard → Domains → Add domain → copy the DKIM record
TXT   resend._domainkey   "v=DKIM1; k=rsa; p=<KEY_FROM_RESEND>"

# DMARC — start at p=none (monitoring only); tighten to p=quarantine after 30 days
TXT   _dmarc   "v=DMARC1; p=none; rua=mailto:hola@escaladigitalventures.com"
```

---

## Step 12 — Budget alert (€10/month)

**[COST]** Budget alerts are free.

```bash
# [CARLOS INPUT REQUIRED] Get your billing account ID:
gcloud billing accounts list
# Note the ACCOUNT_ID (format: XXXXXX-XXXXXX-XXXXXX)

# Create the budget alert
gcloud billing budgets create \
  --billing-account=<YOUR_BILLING_ACCOUNT_ID> \
  --display-name="Escala Web — €10 alert" \
  --budget-amount=10EUR \
  --threshold-rule=percent=0.5 \
  --threshold-rule=percent=0.9 \
  --threshold-rule=percent=1.0 \
  --all-updates-rule-monitoring-notification-channels="" \
  --filter-projects=projects/escala-web
```

Or via console (simpler):
1. https://console.cloud.google.com/billing → select your billing account
2. Budgets & alerts → Create budget
3. Name: "Escala Web — €10 alert"
4. Scope: project "Escala Digital Ventures Web"
5. Amount: €10
6. Alerts: 50%, 90%, 100%
7. Email alerts to: carlos.olivares.ve@gmail.com

---

## Step 13 — Outbound mail (Resend) — ✅ configured

Inbound mail is Microsoft 365 via GoDaddy. Outbound transactional mail is Resend
over SMTP. See `docs/infra-decisions.md` D-11 for the decision record.

1. ✅ Domain `escaladigitalventures.com` verified in Resend
2. ✅ DKIM (`resend._domainkey`) + merged SPF published at GoDaddy (Step 11)
3. ✅ Secret `resend-api-key` created; runtime SA granted `secretAccessor`
4. ✅ `deploy.yml` mounts it as `SMTP_PASSWORD` on both services
5. ⬜ Carlos adds the key value — see the `read -rs` command in Step 6

`CONTACT_FROM` is no longer a secret: `hola@escaladigitalventures.com` is published
on the website, so it is a plain `--set-env-vars` value in `deploy.yml`.

**Retire the legacy secrets once dev verification passes:**
```bash
gcloud secrets delete EMAIL_API_KEY --project escala-dv-web
gcloud secrets delete CONTACT_FROM  --project escala-dv-web
```
8. Redeploy prod (no code change needed — env-flip only):
   ```bash
   gcloud run services update escala-web-prod \
     --region europe-west1 \
     --set-env-vars "EMAIL_DRY_RUN=false" \
     --project escala-web
   ```

---

## Verification checklist

After completing all steps:

- [ ] `docker build` succeeds locally; `docker run -p 8080:8080` serves the site
- [ ] dev URL loads (IAM-gated, your Google account)
- [ ] dev URL returns `X-Robots-Tag: noindex` (check browser DevTools → Network)
- [ ] Push to `main` triggers the GitHub Actions pipeline; dev auto-deploys
- [ ] Prod deploy requires manual approval in GitHub Actions
- [ ] No Cloud Run instances at idle (check Cloud Run metrics → instance count = 0)
- [ ] Budget alert email arrives when threshold is crossed
- [ ] No SA JSON keys in the repo or GitHub secrets
- [ ] Secrets visible in Secret Manager, not in any log or image

---

## Remaining Carlos-input points (before Phase 7 go-live)

| Item | Status |
|---|---|
| Resend account + domain verified | ✅ Done |
| Resend API key value added to `resend-api-key` secret | ⬜ Carlos |
| Microsoft 365 (GoDaddy) inbound mail + MX records | ✅ Done |
| Resend DKIM + merged SPF at GoDaddy | ✅ Done |
| DMARC record at GoDaddy | ⬜ Deferred |
| Cloud Run domain mapping DNS records at GoDaddy | ⬜ Phase 7 (go-live) |
| Legal placeholders resolved | ⬜ Before go-live |
| Legal advisor review | ⬜ Before go-live |
| EN/CA copy register review | ⬜ Before go-live |
| Favicon final artwork | ⬜ Before go-live |

---

*See also: `docs/infra-decisions.md` (why these choices) · `PLAN.md` Phase 6 · `SPEC-P6`*
