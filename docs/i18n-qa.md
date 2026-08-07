# i18n QA Checklist — escaladigitalventures.com

**Spec:** SPEC-P5 FR-6 · AC-9
**Status:** Phase 5 complete — pending Carlos register review and manual walk-through
**Last updated:** August 2026

---

## How to use this document

For each page × locale combination, verify the items listed. Mark ✅ when confirmed, ⚠️ for issues found, ❌ for blockers.

**Test environment:** `npm run dev` → `http://localhost:3000`

---

## Automated checks (CI-enforced)

| Check | Status |
|-------|--------|
| Build clean (`npm run build`) | ✅ Pass |
| All 883 tests green (`npx vitest run`) | ✅ Pass |
| Coverage guard: no fallback re-exports | ✅ Pass |
| Coverage guard: key structure parity ES/EN/CA | ✅ Pass |
| Coverage guard: no placeholders in EN/CA (non-legal) | ✅ Pass |
| Coverage guard: meta titles differ from ES | ✅ Pass |
| Meta length ≤60/≤155 all locales | ✅ Pass |
| Editorial guardrails (no ruso, no code-ownership) | ✅ Pass |
| Ownership guard (SPEC-FIX-01) | ✅ Pass |

---

## Page × locale checklist

### Home (`/` · `/en` · `/ca`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Hero H1 renders in locale | ✅ | ⬜ | ⬜ |
| Claims marquee in locale | ✅ | ⬜ | ⬜ |
| Problem section in locale | ✅ | ⬜ | ⬜ |
| Services preview in locale | ✅ | ⬜ | ⬜ |
| Framework phases (names stay EN) | ✅ | ⬜ | ⬜ |
| Proof section in locale | ✅ | ⬜ | ⬜ |
| Alliance teaser in locale | ✅ | ⬜ | ⬜ |
| FinalCTA in locale | ✅ | ⬜ | ⬜ |
| Nav labels in locale | ✅ | ⬜ | ⬜ |
| Footer in locale | ✅ | ⬜ | ⬜ |
| LocaleSwitcher present | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |
| `<html lang>` correct | ✅ | ⬜ | ⬜ |
| No ES leakage in EN/CA | — | ⬜ | ⬜ |

### What we do (`/que-hacemos` · `/en/what-we-do` · `/ca/que-fem`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| 5 service rows in locale | ✅ | ⬜ | ⬜ |
| FIG captions (FIG. 07–11) unchanged | ✅ | ⬜ | ⬜ |
| "Do we fit?" section in locale | ✅ | ⬜ | ⬜ |
| IP/ownership wording correct (licence, not ownership) | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### How we work (`/como-trabajamos` · `/en/how-we-work` · `/ca/com-treballem`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| Phase cycle section in locale | ✅ | ⬜ | ⬜ |
| Phase names stay in English (Discover, …) | ✅ | ⬜ | ⬜ |
| Execution practices in locale | ✅ | ⬜ | ⬜ |
| Pipeline nodes in locale | ✅ | ⬜ | ⬜ |
| AI build section in locale | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### Case studies index (`/casos-de-exito` · `/en/case-studies` · `/ca/casos-dexit`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| Case cards in locale | ✅ | ⬜ | ⬜ |
| "DOSSIER" / "EXPEDIENTE" / "EXPEDIENT" label | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### MAGUPELL dossier (`/casos-de-exito/magupell` · `/en/case-studies/magupell` · `/ca/casos-dexit/magupell`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Case card copy in locale | ✅ | ⬜ | ⬜ |
| Dossier fields (ES only — Phase 5 scope) | ✅ | ✅ | ✅ |
| Readout labels (ES only — Phase 5 scope) | ✅ | ✅ | ✅ |
| LocaleSwitcher preserves slug across locales | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### BioZero dossier (`/casos-de-exito/biozero` · `/en/case-studies/biozero` · `/ca/casos-dexit/biozero`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Case card copy in locale | ✅ | ⬜ | ⬜ |
| No medical diagnosis claims | ✅ | ⬜ | ⬜ |
| LocaleSwitcher preserves slug across locales | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### Alliance model (`/modelo-de-alianza` · `/en/alliance-model` · `/ca/model-dalianca`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| Constellation aria-label in locale | ✅ | ⬜ | ⬜ |
| Seats: AVAILABLE/DISPONIBLE correct | ✅ | ⬜ | ⬜ |
| 3 planes in locale | ✅ | ⬜ | ⬜ |
| 5 commitments in locale | ✅ | ⬜ | ⬜ |
| Commitment 01 tag: CUSTOM/A MEDIDA/A MIDA | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### About Escala (`/sobre-escala` · `/en/about-escala` · `/ca/sobre-escala`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Ceremonial H1 in locale | ✅ | ⬜ | ⬜ |
| DNA section in locale | ✅ | ⬜ | ⬜ |
| Values in locale | ✅ | ⬜ | ⬜ |
| Expertise areas in locale | ✅ | ⬜ | ⬜ |
| Manifesto beliefs in locale | ✅ | ⬜ | ⬜ |
| colivares.com plain text (not a link) | ✅ | ⬜ | ⬜ |
| No employer names (anonymized) | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### Contact (`/contacto` · `/en/contact` · `/ca/contacte`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| Affinity filter in locale | ✅ | ⬜ | ⬜ |
| Direct meta (email/location/languages) in locale | ✅ | ⬜ | ⬜ |
| Form labels in locale | ✅ | ⬜ | ⬜ |
| Form validation errors in locale | ✅ | ⬜ | ⬜ |
| Success card in locale | ✅ | ⬜ | ⬜ |
| API error message in locale | ✅ | ⬜ | ⬜ |
| Trust line in locale | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### Legal notice (`/aviso-legal` · `/en/legal-notice` · `/ca/avis-legal`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| Anchor nav labels in locale | ✅ | ⬜ | ⬜ |
| 5 sections in locale | ✅ | ⬜ | ⬜ |
| Placeholders visible (ambre highlight) | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### Privacy (`/privacidad` · `/en/privacy` · `/ca/privacitat`)

| Item | ES | EN | CA |
|------|----|----|-----|
| Page header in locale | ✅ | ⬜ | ⬜ |
| Anchor nav labels in locale | ✅ | ⬜ | ⬜ |
| 6 sections in locale | ✅ | ⬜ | ⬜ |
| No-tracking-cookies statement present | ✅ | ⬜ | ⬜ |
| AEPD reference present | ✅ | ⬜ | ⬜ |
| Placeholders visible (ambre highlight) | ✅ | ⬜ | ⬜ |
| LocaleSwitcher → correct locale slug | ✅ | ⬜ | ⬜ |
| hreflang correct | ✅ | ⬜ | ⬜ |

### 404 page

| Item | ES | EN | CA |
|------|----|----|-----|
| Code line in locale | ✅ | ⬜ | ⬜ |
| H1 in locale | ✅ | ⬜ | ⬜ |
| Body in locale | ✅ | ⬜ | ⬜ |
| CTA label in locale | ✅ | ⬜ | ⬜ |
| CTA links to locale home | ✅ | ⬜ | ⬜ |

---

## Editorial guardrail grep results

Run these before go-live:

```bash
# No "ruso/russian" anywhere
grep -ri "ruso\|russian\|rusa" content/ app/ components/ --include="*.ts" --include="*.tsx"

# No code-ownership wording
grep -ri "propietario de.*código\|client owns.*code\|propietari.*codi" content/ --include="*.ts"

# No physical address
grep -ri "calle\|carrer\|street\|c/\|avda\|passeig" content/ --include="*.ts"

# No unresolved placeholders in non-legal EN/CA
grep -r "{{" content/en/ content/ca/ --include="*.ts" | grep -v "legal\|privacy"
```

Expected: all return 0 results (except the legal/privacy placeholder grep which should show the expected `{{FECHA_ACTUALIZACION}}` etc.).

---

## Carlos register review (AC-9)

**Status:** ⬜ Pending

Carlos must review and sign off on:
- [ ] EN copy register (voice, idioms, business-before-technology framing)
- [ ] CA copy register (Catalan orthography, accents, apostrophes)
- [ ] The nine claims (Appendix A) — EN and CA versions
- [ ] Legal/privacy translations (structure only; legal advisor reviews substance)

---

## Open items before go-live

1. **Legal placeholders** — `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}`, `{{REGION_EU_GOOGLE_CLOUD}}` — Carlos to fill.
2. **Legal advisor review** — EN/CA legal translations are faithful but not legal advice.
3. **Dossier fields/readouts** — MAGUPELL and BioZero dossier narrative fields and readout labels remain in ES (Phase 5 scope: index card copy only). Full dossier localization is a future enhancement.
4. **Carlos register sign-off** — AC-9 open until Carlos reviews EN + CA.
