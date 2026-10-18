# HOME-V2 — Home redesign from /oportunidad + legal placeholder fixes

**Version:** 1.0 · 18 Oct 2026 · **Owner:** Carlos · **Mode:** surgical (site is in production)
**Wireframe (authoritative layout):** `specs/mockups/wireframe-home-v2.html`. Toggle "Notas de spec" to read per-section notes.
**Sources of truth:** El Libro de Escala v2.2 · Website Content & Design Spec v1.1.1 · project context v1.0. Nothing here may contradict them.

---

## §0 Scope guard

**Changes (only these):**
1. **Part A.** Legal placeholders on `/aviso-legal` and `/privacidad`, in ES, EN and CA (dictionary content only).
2. **Part B.** Composition and copy of the **home page** (`/`, `/en`, `/ca`).
3. **Shared components.** Extract the `/oportunidad` sections into shared components where needed so the home can reuse them (§B.1).
4. **Content guard.** Add one check to the existing content/coverage guard (§A.3).

**Must stay byte-identical in rendered output:**
- `/oportunidad`: same DOM text, same layout, still ES-only and noindex. Refactors are allowed only if its output is unchanged.
- Header, footer, the contact block "A / Conversación" and `ContactForm` (incl. `app/api/contact`, `lib/email.ts`).
- All inner pages: `/que-hacemos`, `/como-trabajamos`, `/casos-de-exito/*`, `/modelo-de-alianza`, `/sobre-escala`, `/contacto`.
- Home metadata: title, description, OG, canonical/hreflang and JSON-LD (SEO-01). Also `sitemap`, `robots`, `llms.txt`, analytics (FEAT-01), tokens and fonts.

**If a change would leave this scope, STOP and ask Carlos.** Examples: modifying a component used by an inner page, or changing `/oportunidad` output.

**Economy rules for this task:**
- Read only the files you need: the home route/sections, `/oportunidad` sections, the legal dictionaries, `routes.ts` and the guard. Do not audit the whole repo.
- Do not write new unit or e2e tests.
- Verification is: run the existing typecheck, lint, guards and build once, then do the manual checks in §6.

---

## Part A — Legal placeholders (ES · EN · CA)

No `{{…}}` marker may remain anywhere. Apply the equivalent change in each locale's dictionary. Cline translates EN/CA in the existing legal register; Carlos reviews.

### A.1 `/aviso-legal`

| Item | Current | New (ES master) |
|---|---|---|
| Última actualización | `{{FECHA_ACTUALIZACION}}` | `18 de octubre de 2026` · EN `18 October 2026` · CA `18 d'octubre de 2026` |
| NIF | `{{NIF_B88767520}}` | `B88767520` |
| Registro Mercantil | `{{REGISTRO_MERCANTIL}}` | **ASK CARLOS in Plan mode** for the exact registry data. If he does not provide it, **remove the whole row** (label + value) in all locales. Never invent it. Never include a physical address. |
| §05 sentence | `…conforme a la legislación aplicable {{JURISDICCION}}.` | `…conforme a la legislación aplicable.` (marker and the space before it removed; no court or city named) |

The §05 heading stays "Legislación aplicable y jurisdicción". Everything else on the page stays unchanged.

### A.2 `/privacidad`

| Item | Current | New (ES master) |
|---|---|---|
| Última actualización | `{{FECHA_ACTUALIZACION}}` | same dates as A.1 |
| NIF | `{{NIF_B88767520}}` | `B88767520` |
| §04 sentence | `…dentro de la Unión Europea {{REGION_EU_GOOGLE_CLOUD}}.` | `…dentro de la Unión Europea (Google Cloud, región europe-west1, Bélgica).` |

The §04 sentence describes the hosting of this website and its contact-form data only. Do not add any wording about client platforms.

### A.3 Guard

Extend the existing content/coverage guard so the build **fails** if any locale dictionary contains the pattern `{{` … `}}`.

If the guard already does this, make no change and note it in the report.

---

## Part B — Home v2

### B.1 Reuse principle

The home is composed mostly from the `/oportunidad` sections.

- **If those sections are page-local:** extract them into shared components that take their copy from props/dictionary keys. One component per section.
- **If they are already shared:** compose them directly.
- **Never copy-paste a section.**

Requirements for the shared components:
- **Copy source.** `/oportunidad` keeps its current dictionary (ES only). The home gets its own keys in `content/{es,en,ca}/` for every visible string.
- **Single variant prop.** Where the home differs from `/oportunidad`, use one explicit variant prop, e.g. hiding the investment box. Do not fork the component.
- **Existing visual components.** Reuse `GridBackground`, `AllianceConstellation`, readouts, the case-link component and the `/oportunidad` FIG.01 and scenario mini-figures. Do not create new ones.

### B.2 Final home order

The order, anchor ids and surfaces are as in the wireframe.

| # | Section | Anchor | Surface | Source |
|---|---|---|---|---|
| 00 | Hero | `#inicio` | dark | /oportunidad hero (changed, §B.3) |
| 01 | ¿Te suena? (quiz) | `#te-suena` | light | /oportunidad, as-is |
| 02 | Un lunes cualquiera | — | dark | /oportunidad, as-is |
| 03 | Cómo sería en tu negocio | `#escenarios` | light | /oportunidad, as-is |
| 04 | Evidencia | — | dark | current home Evidence (reduced, §B.3) |
| 05 | Una alianza, no un proveedor | `#alianza` | light | /oportunidad + 1 link |
| 06 | Quién está detrás | — | dark | /oportunidad + CTA change |
| 07 | Cómo empezamos | — | light | /oportunidad, without price |
| 08 | A fondo | — | light-alt (paper2) | **NEW** |
| A | Conversación + ContactForm | `#contacto` | as today | **existing reusable contact module, unchanged** (see note) |

> **Contact module.** Render the existing reusable contact section exactly as it is on the current home: the "A / Conversación" block, "Trabajamos mejor con", the contact meta and the "Ficha de contacto" `ContactForm`.
> - Same component, same props, same styles and same dictionary keys.
> - Do not restyle it, rebuild it or create a variant.
> - The contact block in the wireframe is only a placeholder, so ignore its look.

Section indices on the home are numeric (00–08) plus `A` for contact, as today.

**Removed from the home render:** claims marquee · 01 Punto de partida + FIG.02 · 02 Qué hacemos list · 03 Growth Framework · 04 FIG.04 timeline + DAT.03 + DAT.06 · old 05 Modelo de alianza block · the current home FIG.01 (POLISH-01).

- Do **not** touch these components' code or their use on other pages.
- Delete a component file only if it becomes unreferenced **and** was home-only. List every deletion in the report.
- Remove home dictionary keys that become unused, in all three locales.

### B.3 Per-section deltas vs. source

Everything not listed here equals the source verbatim, in ES.

**00 Hero**
- **Eyebrow:** `00 / Para negocios que han crecido más rápido que sus sistemas` (from /oportunidad).
- **H1:** `Automatizamos tu negocio. Escalamos contigo.` This is the primary claim and must stay as the H1 (SEO).
- **Kicker line** (new element, display font, amber, below the H1): `Tu negocio crece. Tu operativa también debería.`
- **Lead and figure:** the lead and FIG.01 are as on /oportunidad.
- **CTAs:**
  - Primary: `Cuéntanos tu caso ↗` → `#contacto`.
  - Secondary: `¿Te suena? Haz la prueba ↓` → `#te-suena` (new copy).
- **Meta line:** `Cinco alianzas · hoy quedan 3 plazas` stays, with its 5-dot indicator (2 filled).

**01 Quiz**
- Same component, behaviour and copy as /oportunidad. This includes:
  - checked-card reaction and the reveal of "Con tu sistema";
  - live 0/8 score;
  - the Bajo control ↔ A pulso band;
  - the result message per range;
  - the closing line.
- The result-range copy is the existing /oportunidad copy. The wireframe's range texts are illustrative only.
- **Only change:** the secondary link `O sigue leyendo: así lo resolvemos ↓` → `#alianza`.

**02 Un lunes cualquiera and 03 Escenarios**
- No content change. Keep the "ilustrativo" labels.

**04 Evidencia**
- H2 stays `Hechos, no promesas.`
- **New lead:** `Esto ya no es ilustrativo: es lo que funciona hoy en producción, con datos verificados en un cliente real.`
- **Readouts:** only DAT.01, DAT.02, DAT.04 and DAT.05, with their existing copy verbatim. Layout is a 4-column row; it drops to 2 columns below 1024px and 1 column below 700px.
- **Case links:** the existing Magupell and BioZero links. BioZero is framed as a capability, never as diagnosis.

**05 Alianza**
- Add the link `Conoce el modelo de alianza ↗` → `/modelo-de-alianza`, resolved via `routes.ts` per locale.
- The constellation caption is `FIG. 02 — …`, as on /oportunidad.

**06 Quién está detrás**
- Replace the CTA `Ver nuestros casos de éxito →` with `Conoce Escala ↗` → `/sobre-escala`. This is home only; /oportunidad keeps its CTA.

**07 Cómo empezamos**
- Render the 3 steps only.
- **Hide on the home:** the "Inversión / Prototipos desde 2.000 €" box and the "Oferta −10%" box.
- **Step 2 body (home only):** `Te devolvemos qué haríamos y en qué orden. Claro y por etapas.` This removes "y cuánto cuesta".
- **Add:** primary CTA `Hablemos de tu negocio ↗` → `#contacto`, and link `Cómo trabajamos ↗` → `/como-trabajamos`.

**08 A fondo (NEW)**
- Index row with 5 link tiles. Each tile has a mono label + ↗, a display title and a one-line description:

| Label | Title | Line | Route key |
|---|---|---|---|
| Qué hacemos | Cinco líneas, una alianza | Del proceso manual a la plataforma propia. | services |
| Cómo trabajamos | Escala Growth Framework | Diez fases, un ciclo continuo de mejora. | method |
| Casos de éxito | Magupell y BioZero | Contados con datos verificables. | cases |
| Modelo de alianza | Cinco alianzas | Toda nuestra dedicación. | alliance |
| Sobre Escala | ADN y manifiesto | La experiencia detrás de Escala. | about |

- Static, with a hover state only. Layout is 5 columns on desktop, 2 on tablet and 1 on mobile.

**Price rule (home, all locales):** the home must contain no price, amount, currency symbol, discount or offer wording.

### B.4 i18n

- **Home keys:** add all new and changed home keys in ES, EN and CA. **Cline translates EN/CA** in the site's existing professional register. Claims may be recrafted, not word-for-word.
  - The EN H1 uses the existing approved claim "We automate your business. We scale with you."
  - The CA H1 uses «Automatitzem el teu negoci. Escalem amb tu.»
- **Coverage:** the coverage guard must pass with no silent fallback.
- **Marking:** mark every EN/CA string added by this spec with a `// REVIEW: Carlos` comment in the dictionary.
- **/oportunidad:** stays ES-only. Do not add EN/CA routes for it.

### B.5 Floor standard

The following apply to every new or changed element:
- TypeScript strict.
- Copy from dictionaries only; colours from tokens only.
- AA contrast on every surface, including the amber kicker on abisal.
- Visible keyboard focus. The quiz checkboxes stay real inputs with labels, and the score region keeps `aria-live="polite"`.
- `prefers-reduced-motion` gives static fallbacks: no flow dashes, no pulse, no score bump.
- Responsive down to 360px with no horizontal scroll.
- The page stays SSG; only the quiz is interactive client code, as on /oportunidad.
- Lighthouse at or above the current home baseline.

---

## §6 Acceptance criteria

**Part A**
- [ ] AC-A1 — `/aviso-legal` and `/privacidad` in ES, EN and CA render no `{{` sequence.
- [ ] AC-A2 — Both pages show the date 18 Oct 2026 in each locale and NIF `B88767520`.
- [ ] AC-A3 — Registro Mercantil shows Carlos's exact data, or the row is absent in all 3 locales. No address appears anywhere.
- [ ] AC-A4 — The aviso-legal §05 sentence ends "…legislación aplicable." with no jurisdiction named.
- [ ] AC-A5 — The privacidad §04 sentence ends "…Unión Europea (Google Cloud, región europe-west1, Bélgica)." (and its EN/CA equivalents).
- [ ] AC-A6 — The guard fails if a `{{…}}` marker is reintroduced. Verify once by temporarily adding one, then revert.

**Part B**
- [ ] AC-B1 — `/`, `/en` and `/ca` render sections 00–08 + A in the order and with the anchors of §B.2. All in-page CTAs scroll to their anchor.
- [ ] AC-B2 — The H1 on `/` is exactly "Automatizamos tu negocio. Escalamos contigo." The home `<head>` (title, meta, OG, canonical, hreflang, JSON-LD) is unchanged versus `main`.
- [ ] AC-B3 — The quiz on the home behaves identically to /oportunidad: reaction, reveal, score, band and messages.
- [ ] AC-B4 — The home HTML in all locales contains none of: `€`, `2.000`, `2,000`, `−10%`, `-10%`, `oferta`/`offer`/`oferta` (CA), `cuánto cuesta`, `Inversión`.
- [ ] AC-B5 — The removed sections (§B.2) do not render on the home. Inner pages still render them unchanged.
- [ ] AC-B6 — `/oportunidad` rendered text is identical to before. Compare the page text before and after, and confirm the investment and offer boxes are still present there.
- [ ] AC-B7 — All "A fondo" tiles and section links resolve to the correct localized route via `routes.ts`, with no 404s in ES, EN or CA.
- [ ] AC-B8 — The coverage guard, typecheck, lint and build all pass. Reduced-motion and 360px checks pass on the home.
- [ ] AC-B9 — The `git diff --stat` shows changes limited to:
  - home composition;
  - extracted shared sections;
  - the new A fondo component;
  - home and legal dictionaries (es/en/ca);
  - the guard;
  - `/oportunidad` wiring, only if extraction required it.

## §7 Report (end of Act)

1. `git diff --stat`.
2. Components extracted, created and deleted.
3. The Registro Mercantil outcome (value used or row removed).
4. The list of EN/CA strings marked `REVIEW: Carlos`.
5. Any deviation from the wireframe, with its reason.
