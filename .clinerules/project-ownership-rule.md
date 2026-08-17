# Standing rule — IP / ownership wording

**Spec authority:** CONTENT-11 (current) · supersedes SPEC-FIX-01 · Libro v2.2 Ch. 6, 11, 13 · escala-web-content-spec-v1.1.1.

---

## ⚠️ CURRENT RULE (CONTENT-11) — read this first

**Commercial terms are NEVER published on the public site.** Do not write copy that states
who owns the intellectual property or the source code, or that describes a use licence — in
**either** direction. Removing "the client owns the code" and replacing it with "the IP is
Escala's" is **not** compliant: the whole subject is off the public site. It is agreed
privately with each client during commercial negotiation.

**Blocklisted terms** (case- and accent-insensitive) in `content/`, `app/`, `lib/`,
`components/`, `public/`, and the generated `/llms.txt`:

```
ES: propiedad intelectual · código fuente · licencia de uso · intransferible · propiedad del código
EN: intellectual property · source code · licence to use · license to use · non-transferable
CA: propietat intel·lectual · codi font · llicència d'ús · intransferible
```

Enforced by `tests/content/ownership-guard.test.ts` (fails the build, naming file + line +
term). **Never relax the guard to make a change pass — remove the copy instead.**

**Sanctioned exception:** the legal pages' own website-content copyright notice
(`content/{es,en,ca}/legal.ts`, section `propiedad-intelectual`), which covers Escala's own
texts, brand, design and site source code. That is site copyright, not client-platform
ownership. It is excluded by exact string, not by file.

**What IS still sayable:** the client owns **their data** (export + return in full on
termination) · **sector exclusivity** stated operationally, with no link to code ownership ·
continuity conditions are agreed in writing at the start of the alliance.

**Approval subject:** the client approves **prototypes** and **additional scoped
implementations** — never "every specification" or "every feature".

---

## Historical context (SPEC-FIX-01 — SUPERSEDED, do not apply)

The section below records the contractual model and the *previous* published wording. The
model remains contractually accurate and is fine in internal docs and private negotiation;
the **published wording it prescribes is now forbidden**. Kept only so the history of the
decision is legible.

## The corrected model (Libro v2.2, from the MAGUPELL contract)

| Who | Gets |
|-----|------|
| **Escala** | Source code · Intellectual property · Architecture decisions |
| **Client** | Indefinite **use licence** over their platform · Full **data ownership** (export + return on termination) · **Sector exclusivity** (Escala won't reuse the system for competitors) |

The licence **survives** the end of the support service.

## Rule: NEVER state the client owns the source code or IP

**Forbidden phrases** — any of these in `content/`, `components/`, `app/` = test failure:
- "propietario de (tu|su) código"
- "propietario de tu plataforma, tu código"
- "tu código y tus datos"
- "dueño del código"

The guard lives at `tests/content/ownership-guard.test.ts` and runs in `npm test`.

## Correct canonical wording to use

**Service line 2 deliverable (`content/es/services.ts`):**
> "…Una solución construida a medida de tu negocio: obtienes una licencia de uso indefinida sobre tu plataforma y la propiedad de tus datos. La propiedad intelectual y el código son de Escala."

**Commitment 01 (`content/es/alliance.ts`):**
> "A MEDIDA — Soluciones ajustadas a las necesidades y oportunidades reales de tu negocio — no plantillas."

**Optional alliance detail (if a licence micro-line is needed on /modelo-de-alianza):**
> "El cliente conserva la propiedad de sus datos y una licencia de uso indefinida; la propiedad intelectual y el código son de Escala, con exclusividad de sector para el cliente."

## For future pages (2.5+)

Always use the corrected model above. Never copy the old v2.1 wording. When describing what the client receives, use "licencia de uso indefinida" and "propiedad de sus datos", not "propietario de su código".
