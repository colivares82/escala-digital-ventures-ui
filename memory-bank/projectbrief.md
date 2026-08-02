# Project Brief

## Identity

**Project:** `escala-digital-ventures-ui`
**Repo:** `git@github.com:colivares82/escala-digital-ventures-ui.git`
**Client:** Escala Digital Ventures, S.L.U. — Mataró (Barcelona)
**Owner/Director:** Carlos Olivares

## What it is

Corporate marketing website for Escala Digital Ventures. **Not** an app, **not** a monorepo — a static Next.js site deployed to Google Cloud Run. The site communicates what Escala is, proves it with verifiable facts, and drives qualified conversations.

## Spec source of truth

`escala-web-content-spec.md` (v1.0, August 2026) — derived from "El Libro de Escala v2.1". All copy, routes, design decisions, and requirements originate from this spec. Never contradict it.

## Goals

1. **Primary:** generate qualified conversations ("Hablemos de tu negocio")
2. **Secondary:** establish credibility through verifiable facts (MAGUPELL: 100+ reqs, 200+ tests, live Jul 2026; BioZero: first client, AI vision)

## Non-goals (v1)

- Blog/insights
- Newsletter
- Dark mode
- CRM integration
- colivares.com link (mention as plain text only — the site doesn't exist yet)

## Languages

- **ES** — default (no `/es` prefix), master copy, fully implemented
- **EN** — at `/en`, pending professional translation review by Carlos
- **CA** — at `/ca`, pending professional translation review by Carlos

## Pages planned (spec §4.1)

Home (done), Qué hacemos, Cómo trabajamos, Casos de éxito (index + MAGUPELL + BioZero), Modelo de alianza, Sobre Escala, Contacto, Aviso legal, Privacidad.

## Constraints

- Case study names (MAGUPELL, BioZero): real names, client permission confirmed
- Former employers: never named. Use anonymized formulas only.
- Founder trajectory: mention `colivares.com` without a link until that site is live.
- Contact form email: `hola@escaladigitalventures.com` — placeholder; confirm final address before connecting API.
