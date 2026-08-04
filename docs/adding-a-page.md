# Adding a new interior page

> This guide demonstrates that adding a page is a **content task**, not an engineering task.
> Everything below can be done without touching routing internals.
> Established in Phase 1 — SPEC-P1 AC-9.

---

## Interior-page section index convention (established Phase 2.1 — SPEC-P2.1 FR-2.2)

Home page sections use numeric indexes `00`–`06` as wayfinding eyebrows (e.g. "03 / EL CICLO DE CRECIMIENTO"). Interior pages use **letter indexes** `A`, `B`, `C`… to avoid visual collision with the home's numeric system.

### Rules
- The letter index lives in the **content dictionary** (e.g. `method.phaseCycle.sectionIndex = 'B'`), not hardcoded in the component.
- `PhaseCycle` accepts a `sectionIndex?: string` prop (default `"03"` for home backward compat).
- All Phase 2 interior pages should follow A/B/C/D/E order for their sections.
- Example from `/como-trabajamos`: A·PageHeader · B·PhaseCycle · C·ExecutionPractices · D·FIG.06 · E·AiBuildBlock.

When building a new interior page, define the letter indexes in the page's content dictionary and pass them as props to `SectionIndex` or component-specific `sectionIndex` props.

---

## The four steps

### 1. Add the TypeScript interface in `content/types.ts`

Open `content/types.ts` and add an interface for your page's content:

```ts
/** Phase 2: Qué hacemos page content. */
export interface ServicesDictionary {
  readonly meta: PageMeta
  readonly hero: {
    readonly eyebrow: string
    readonly title: string
    readonly lead: string
  }
  readonly serviceLines: readonly { ... }[]
  // … add every field the page component needs
}
```

TypeScript will enforce that both the ES implementation AND the EN/CA re-exports satisfy this interface. A missing key fails compilation — no runtime surprises.

---

### 2. Create the ES dictionary in `content/es/<page>.ts`

```ts
// content/es/services.ts
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  meta: {
    title: 'Qué hacemos | Escala Digital Ventures',  // ≤60 chars
    description: 'Automatización, plataformas…',       // ≤155 chars
  },
  hero: {
    eyebrow: '01 / CAPACIDADES',
    title: 'Cinco líneas de servicio.',
    lead: 'Sin relleno de tecnología, sin promesas vacías.',
  },
  // … rest of content
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
```

Rules:
- `meta.title` ≤ 60 chars (enforced by `tests/lib/i18n/meta.test.ts`).
- `meta.description` ≤ 155 chars (same test file).
- `as const satisfies ServicesDictionary` makes TypeScript catch missing keys at compile time.

---

### 3. Add EN and CA re-exports (Phase 5 will replace these with real translations)

```ts
// content/en/services.ts
// TODO(P5): translate — Phase 5 will provide reviewed English copy.
export { servicesContent } from '@/content/es/services'
export type { ServicesContent } from '@/content/es/services'
```

```ts
// content/ca/services.ts
// TODO(P5): translate — Phase 5 will provide reviewed Catalan copy.
export { servicesContent } from '@/content/es/services'
export type { ServicesContent } from '@/content/es/services'
```

Also add the export to `content/en/index.ts` and `content/ca/index.ts` barrel files:
```ts
export * from './services'
```

---

### 4. Add the route-map entry in `lib/i18n/routes.ts`

The route map in `lib/i18n/routes.ts` already has all 10 pages defined (spec §4.1). If you're adding a new page that wasn't in the original spec, add it to `ROUTE_MAP` and the `PageId` type in `lib/i18n/types.ts`:

```ts
// lib/i18n/types.ts — add to the PageId union:
export type PageId =
  | 'home' | 'services' | 'method' | /* ... */ | 'myNewPage'

// lib/i18n/routes.ts — add to ROUTE_MAP:
const ROUTE_MAP = {
  // …existing entries…
  myNewPage: {
    es: '/mi-nueva-pagina',
    en: '/en/my-new-page',
    ca: '/ca/la-meva-nova-pagina',
  },
} as const satisfies Record<PageId, Record<Locale, string>>
```

For pages already in the spec (services, method, cases, etc.), the route map entry is already there — skip this step.

---

### 5. Create the page component and wire it into the catch-all

**a) Create `components/pages/services.tsx`** (or `app/[[...path]]/_pages/services.tsx`):

```tsx
// components/pages/services.tsx
import type { Dictionary } from '@/lib/i18n/dictionary'
import { PageHeader } from '@/components/page-header'
import { FinalCTA } from '@/components/final-cta'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'

export function ServicesPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <>
      <PageHeader
        eyebrow="01 / CAPACIDADES"
        title={dict.services.hero.title}
        lead={dict.services.hero.lead}
        surface="paper"
      />
      {/* … page sections */}
      <FinalCTA content={dict.home.finalCta} />
    </>
  )
}
```

**b) Add it to `app/[[...path]]/page.tsx`** — two places:

```ts
// 1. Add to generateStaticParams:
export async function generateStaticParams() {
  return [
    {},                           // ES home
    { path: ['en'] },             // EN home
    { path: ['ca'] },             // CA home
    { path: ['que-hacemos'] },    // ES services
    { path: ['en', 'what-we-do'] },
    { path: ['ca', 'que-fem'] },
  ]
}

// 2. Add to the page renderer:
import { ServicesPage } from '@/components/pages/services'
// …
if (page === 'services') return <ServicesPage dict={dict} locale={locale} />
```

**c) Update `app/sitemap.ts`** — uncomment or add the page:

```ts
const BUILT_PAGES: BuiltPageEntry[] = [
  { page: 'home' },
  { page: 'services' },  // ← uncomment
]
```

---

## Checklist before merging

- [ ] `content/types.ts` interface defined
- [ ] `content/es/<page>.ts` created with `satisfies` check
- [ ] `content/en/<page>.ts` and `content/ca/<page>.ts` re-exports added
- [ ] Barrel exports updated (`content/en/index.ts`, `content/ca/index.ts`)
- [ ] Route map entry verified (or added)
- [ ] Page component created
- [ ] Catch-all `generateStaticParams` updated
- [ ] Catch-all renderer switch updated
- [ ] `app/sitemap.ts` `BUILT_PAGES` updated
- [ ] `meta.test.ts` (re-run `npm test`) — title/description limits pass
- [ ] `npm run build` clean — new static pages appear in route list
- [ ] Visual check in dev server

---

## Key files reference

| What | Where |
|------|-------|
| Route map (slugs, locales) | `lib/i18n/routes.ts` |
| Types / interfaces | `content/types.ts` |
| ES content | `content/es/<page>.ts` |
| EN/CA stubs | `content/en/<page>.ts`, `content/ca/<page>.ts` |
| Content accessor | `lib/i18n/dictionary.ts` — `getDictionary(locale)` |
| Catch-all route | `app/[[...path]]/page.tsx` |
| Sitemap | `app/sitemap.ts` |
| Meta limits test | `tests/lib/i18n/meta.test.ts` |
