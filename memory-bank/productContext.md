# Product Context

## Why this project exists

Escala Digital Ventures needs a credible web presence that:
1. Communicates its positioning precisely: not a software house, not a digital agency, not a consultancy — a **technology partner** that builds durable digital capabilities for a deliberately small group of companies.
2. Proves claims with verifiable facts (real production, real invoicing, real tests).
3. Converts ideal-fit companies into qualified conversations — not lead-gen spray.

## The positioning (from El Libro de Escala v2.1, Chs. 1–2)

Escala partners with ~5 companies as their external technology, innovation and product department. Mission: automate business systems, foster scalability and efficiency, through growth alliances.

Primary claim: **«Automatizamos tu negocio. Escalamos contigo.»**

## Problems this site solves for visitors

The ideal visitor is a business owner/director of a solid SME or niche B2B company whose operations have grown faster than their systems. They recognize themselves in: "Hojas de cálculo, correos, documentos sueltos y el conocimiento en la cabeza de dos o tres personas." The site names their pain, shows the path, and provides verifiable proof that Escala delivers.

## Design principle — "Sistemas en movimiento"

The as-built visual identity (approved August 2026, spec v1.1 §3) is called **"Sistemas en movimiento"**. The name *Escala* evokes growth and scale; the identity expresses **systems working**, not decoration. Three layers:
- **FIG diagrams** — animated technical line illustrations with engineering-plate numbering and captions
- **Choreographed motion** — purposeful, never decorative (framer-motion / CSS transitions)
- **Alternating dark/light rhythm** — abisal (dark) ↔ paper (light) sections

Color tokens: `--paper` #F7F7F4 · `--ink` #16181D · `--mar` #0E3A5D · `--abisal` #0A2B45 · `--ambre` #FFB703 (single accent)

The Escala Growth Framework is shown as a **ring** ("El Ciclo") — a continuous improvement cycle — not a growth line. Component: `PhaseCycle`.

## UX goals — 7-section home

Home sections (spec §5.1):
```
00 Hero (abisal)       — FIG.01, primary CTA, ClaimsMarquee
01 Punto de partida (paper) — FIG.02, symptom list
02 Capacidades (paper)  — 5 service lines (editorial index)
03 El Ciclo (abisal)    — PhaseCycle (scroll-driven ring / static mobile)
04 Evidencia (paper)    — FIG.04, 4 DAT readouts, 2 ClientChips
05 Modelo de alianza (abisal) — FIG.05 constellation
06 Conversación (abisal) — ContactForm (integrated in home + dedicated /contacto)
Footer (paper)
```

Contact form intentionally simple: name, company, email, "¿Qué frena tu crecimiento?", RGPD consent.

## Key workflow decisions (from DECISIONS.md + spec v1.1)

- Navigation uses section anchors on home in v1; interior pages replace with true routes
- Section indices `00–06` are the wayfinding system (mono eyebrow)
- Alliance model shows 5 intentionally limited alliances as a constellation (FIG.05: 2 occupied with ambre pulses, 3 dashed/available)
- MAGUPELL and BioZero are typed client records rendered as ClientChips
- Contact form is local-only until the API is connected (CONTACT-01, Phase 3)
- PhaseCycle: scroll-driven sticky ring on desktop; static linear list on mobile/reduced-motion
- ClaimsMarquee: ambre band between hero and problem section (30s loop, pause on hover)
- No case cards on home (live on `/casos-de-exito`); home uses compact ClientChips + DAT grid
