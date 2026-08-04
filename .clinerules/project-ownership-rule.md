# Standing rule — IP / ownership wording

**Spec authority:** SPEC-FIX-01 · Libro v2.2 Ch. 6, 11, 13 · escala-web-content-spec-v1.1.1.

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
