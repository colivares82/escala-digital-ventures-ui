/**
 * cases-data.test.ts — Data integrity tests for content/data/cases.ts.
 * Guards the CaseStudy model invariants, meta limits, getCase helper,
 * and the editorial guardrail on BioZero (AC-10).
 * Spec: SPEC-P2.3 §8 (test plan)
 */

import { cases, getCase } from '@/content/data/cases'

describe('cases data — structure', () => {
  it('exports exactly 2 cases', () => {
    expect(cases).toHaveLength(2)
  })

  it('cases are sorted by order', () => {
    const orders = [...cases].map((c) => c.order)
    expect(orders).toEqual([1, 2])
  })

  it('every case has required fields', () => {
    cases.forEach((c) => {
      expect(c.slug).toBeTruthy()
      expect(c.name).toBeTruthy()
      expect(c.href).toMatch(/^\/casos-de-exito\//)
      expect(c.sector).toBeTruthy()
      expect(c.mode).toMatch(/^(data-forward|capability-forward)$/)
      expect(c.brand.name).toBeTruthy()
      expect(c.brand.url).toMatch(/^https:\/\//)
      expect(c.cardSubtitle).toBeTruthy()
      expect(c.plate).toBeTruthy()
    })
  })

  it('every case has valid ES / EN / CA content entries', () => {
    cases.forEach((c) => {
      expect(c.content.es.eyebrow).toBeTruthy()
      expect(c.content.es.title).toBeTruthy()
      expect(c.content.es.status).toBeTruthy()
      expect(c.content.en).toBeTruthy()
      expect(c.content.ca).toBeTruthy()
    })
  })
})

describe('Magupell — canonical dossier invariants (SPEC-CASE-01)', () => {
  const mag = cases.find((c) => c.slug === 'magupell')!
  const esDossier = mag.dossierByLocale.es
  const enDossier = mag.dossierByLocale.en
  const caDossier = mag.dossierByLocale.ca

  it('has exactly 6 readouts in the canonical grid (ES/EN/CA)', () => {
    expect(esDossier.readoutGrid).toHaveLength(6)
    expect(enDossier.readoutGrid).toHaveLength(6)
    expect(caDossier.readoutGrid).toHaveLength(6)
  })

  it('readout grid uses DAT.01–DAT.06 mono keys in order', () => {
    const keys = esDossier.readoutGrid!.map((r) => r.key)
    expect(keys).toEqual(['DAT.01', 'DAT.02', 'DAT.03', 'DAT.04', 'DAT.05', 'DAT.06'])
  })

  it('readouts carry exactly the §2 verified figures (ES)', () => {
    const values = esDossier.readoutGrid!.map((r) => r.value)
    expect(values).toContain('167 → 216')
    expect(values).toContain('1.803')
    expect(values).toContain('7 meses')
    expect(values).toContain('4 roles')
    expect(values).toContain('3 entornos')
    expect(values).toContain('REAL')
  })

  it('EN readouts use comma-formatted test count (1,803) not ES dot format', () => {
    const values = enDossier.readoutGrid!.map((r) => r.value)
    expect(values).toContain('1,803')
    expect(values).not.toContain('1.803')
  })

  it('has exactly 7 canonical narrative sections (ES/EN/CA)', () => {
    expect(esDossier.narrative).toHaveLength(7)
    expect(enDossier.narrative).toHaveLength(7)
    expect(caDossier.narrative).toHaveLength(7)
  })

  it('narrative sections are numbered 01–07 in order', () => {
    const nums = esDossier.narrative!.map((b) => b.num)
    expect(nums).toEqual(['01', '02', '03', '04', '05', '06', '07'])
  })

  it('section 03 is the flow-fig variant with 4 flow nodes', () => {
    const flowBlock = esDossier.narrative!.find((b) => b.variant === 'flow-fig')
    if (flowBlock?.variant !== 'flow-fig') throw new Error('flow-fig block not found')
    expect(flowBlock.flowNodes).toHaveLength(4)
  })

  it('section 04 is the roles variant with 4 role cards', () => {
    const rolesBlock = esDossier.narrative!.find((b) => b.variant === 'roles')
    if (rolesBlock?.variant !== 'roles') throw new Error('roles block not found')
    expect(rolesBlock.roles).toHaveLength(4)
  })

  it('section 05 is the governance variant with 4 cards', () => {
    const govBlock = esDossier.narrative!.find((b) => b.variant === 'governance')
    if (govBlock?.variant !== 'governance') throw new Error('governance block not found')
    expect(govBlock.cards).toHaveLength(4)
  })

  it('section 06 is the timeline variant with 5 milestones', () => {
    const timelineBlock = esDossier.narrative!.find((b) => b.variant === 'timeline')
    if (timelineBlock?.variant !== 'timeline') throw new Error('timeline block not found')
    expect(timelineBlock.milestones).toHaveLength(5)
  })

  it('brand URL points to magupell.com', () => {
    expect(mag.brand.url).toBe('https://www.magupell.com')
  })

  it('card subtitle is localized (ES/EN/CA)', () => {
    expect(mag.cardSubtitleByLocale?.es).toBeTruthy()
    expect(mag.cardSubtitleByLocale?.en).toBeTruthy()
    expect(mag.cardSubtitleByLocale?.ca).toBeTruthy()
  })
})

describe('Magupell — content guardrails (SPEC-CASE-01 §0.3, AC-1/2/3)', () => {
  const mag = cases.find((c) => c.slug === 'magupell')!
  const allText = JSON.stringify([
    mag.content,
    mag.cardSubtitle,
    mag.cardSubtitleByLocale,
    mag.sector,
    mag.dossierByLocale,
  ])

  it('never mentions invoicing/billing-as-invoice (factura|facturación|facturar|invoic)', () => {
    expect(allText).not.toMatch(/factura|facturaci[oó]n|facturar|invoic/i)
  })

  it('never uses the MAGUPELL all-caps spelling in user-facing strings', () => {
    // "Magupell, S.L." legal form is fine; the bare all-caps brand is not.
    expect(allText).not.toMatch(/MAGUPELL/)
  })

  it('never republishes the retired 100+/200+ placeholder figures', () => {
    expect(allText).not.toMatch(/100\+|200\+/)
  })

  it('uses "resumen(es) de cobro" / "billing summar" / "resum(s) de cobrament" instead', () => {
    const esDossier = mag.dossierByLocale.es
    const enDossier = mag.dossierByLocale.en
    const caDossier = mag.dossierByLocale.ca
    expect(JSON.stringify(esDossier)).toMatch(/resum(?:en|ai)?e?s? de cobro/i)
    expect(JSON.stringify(enDossier)).toMatch(/billing summar(?:y|ies)/i)
    expect(JSON.stringify(caDossier)).toMatch(/resum(?:s)? de cobrament/i)
  })
})

describe('BioZero — capability-forward invariants', () => {
  const bz = cases.find((c) => c.slug === 'biozero')!

  it('is capability-forward mode', () => {
    expect(bz.mode).toBe('capability-forward')
  })

  it('has exactly 2 readouts (status cards)', () => {
    expect(bz.readouts).toHaveLength(2)
  })

  it('has exactly 3 capabilities', () => {
    expect(bz.capabilities).toHaveLength(3)
  })

  it('has exactly 3 dossier fields', () => {
    expect(bz.fields).toHaveLength(3)
  })

  it('capabilities have index, title, body', () => {
    bz.capabilities!.forEach((cap) => {
      expect(cap.index).toBeTruthy()
      expect(cap.title).toBeTruthy()
      expect(cap.body).toBeTruthy()
    })
  })

  it('brand URL points to biozeroplus.com', () => {
    expect(bz.brand.url).toBe('https://biozeroplus.com')
  })

  // AC-10: BioZero editorial guardrail — capability-framed, never diagnostic
  it('BioZero content contains no diagnostic claim language (AC-10)', () => {
    const allText = JSON.stringify([bz.readouts, bz.capabilities, bz.fields, bz.content])
    const diagnosticTerms = /diagnos|medical diagnosis|diagnóstico médico/i
    expect(allText).not.toMatch(diagnosticTerms)
  })

  it('BioZero describes imaging capability without implying diagnosis', () => {
    // Find the imaging capability by the 3rd index (it is always index '03' in the spec)
    const imagingCap = bz.capabilities!.find((c) => c.index === '03')
    expect(imagingCap).toBeDefined()
    // Must be capability-framed (mentions "salud oral" — analysis language), NOT diagnostic
    expect(imagingCap!.body).toContain('salud oral')
    expect(imagingCap!.body).not.toMatch(/diagnos/i)
    // All capabilities must avoid diagnostic language
    bz.capabilities!.forEach((cap) => {
      expect(cap.body).not.toMatch(/diagnos/i)
    })
  })
})

describe('BioZero — migrated onto the canonical CaseDossier template (SPEC-CASE-01)', () => {
  const bz = cases.find((c) => c.slug === 'biozero')!

  it('supplies readoutGrid + narrative in all 3 locales (canonical shape present)', () => {
    ;(['es', 'en', 'ca'] as const).forEach((locale) => {
      const dossier = bz.dossierByLocale[locale]
      expect(dossier.readoutGrid).toBeDefined()
      expect(dossier.readoutGrid!.length).toBeGreaterThan(0)
      expect(dossier.narrative).toBeDefined()
      expect(dossier.narrative!.length).toBeGreaterThan(0)
    })
  })

  it('narrative includes a capabilities-variant block carrying the original 3 capabilities', () => {
    const capBlock = bz.dossierByLocale.es.narrative!.find((b) => b.variant === 'capabilities')
    if (capBlock?.variant !== 'capabilities') throw new Error('capabilities block not found')
    expect(capBlock.capabilities).toHaveLength(3)
  })

  it('migrated copy is unchanged from the legacy fields (same text, new shape)', () => {
    const legacyContext = bz.dossierByLocale.es.fields.find((f) => f.key === 'CONTEXTO')!.body
    const narrativeContext = bz.dossierByLocale.es.narrative!.find(
      (b) => b.variant === 'prose' && b.label === 'CONTEXTO',
    )
    if (narrativeContext?.variant !== 'prose') throw new Error('prose CONTEXTO block not found')
    expect(narrativeContext.paragraphs[0]).toBe(legacyContext)
  })
})

describe('getCase helper', () => {
  it('returns Magupell by slug', () => {
    const c = getCase('magupell')
    expect(c).not.toBeNull()
    expect(c!.name).toBe('Magupell')
  })

  it('returns BioZero by slug', () => {
    const c = getCase('biozero')
    expect(c).not.toBeNull()
    expect(c!.name).toBe('BioZero')
  })

  it('returns null for unknown slug', () => {
    expect(getCase('unknown-slug')).toBeNull()
    expect(getCase('')).toBeNull()
  })

  it('locale param does not affect result (ES fallback Phase 5)', () => {
    const es = getCase('magupell', 'es')
    const en = getCase('magupell', 'en')
    expect(es?.slug).toBe(en?.slug)
  })
})

describe('case detail meta — length limits (SPEC-P2.3 FR-6.2)', () => {
  it('every case meta title is ≤60 characters', () => {
    cases.forEach((c) => {
      expect(c.meta.title.length).toBeLessThanOrEqual(60)
    })
  })

  it('every case meta description is ≤155 characters', () => {
    cases.forEach((c) => {
      expect(c.meta.description.length).toBeLessThanOrEqual(155)
    })
  })

  it('meta titles reference the client name', () => {
    const magMeta = getCase('magupell')!.meta
    const bzMeta = getCase('biozero')!.meta
    // SPEC-CASE-01 §0.3: spelling is "Magupell", never the all-caps "MAGUPELL".
    expect(magMeta.title).toContain('Magupell')
    expect(magMeta.title).not.toMatch(/MAGUPELL/)
    expect(bzMeta.title).toContain('BioZero')
  })
})

describe('AC-4 — data-driven extensibility', () => {
  /**
   * Verify that the CaseDossier template concept works for a hypothetical 3rd case.
   * We assert the data shape rather than rendering the component here, because
   * the component itself is tested separately. A 3rd entry in the cases array
   * would automatically produce a new card on the index and a working dossier page.
   */
  it('data-forward mode requires only readouts + fields (no capabilities)', () => {
    const dataForwardCases = cases.filter((c) => c.mode === 'data-forward')
    dataForwardCases.forEach((c) => {
      expect(c.readouts.length).toBeGreaterThanOrEqual(1)
      expect(c.fields.length).toBeGreaterThanOrEqual(1)
      // capabilities must be absent (undefined or empty)
      expect(!c.capabilities || c.capabilities.length === 0).toBe(true)
    })
  })

  it('capability-forward mode requires capabilities array', () => {
    const capForwardCases = cases.filter((c) => c.mode === 'capability-forward')
    capForwardCases.forEach((c) => {
      expect(c.capabilities).toBeDefined()
      expect(c.capabilities!.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('a third case with valid data shape would pass type requirements', () => {
    // Structural test: any new case must have all required scalar fields
    const requiredFields = [
      'slug', 'order', 'name', 'href', 'sector', 'mode',
      'brand', 'content', 'cardSubtitle', 'plate', 'readouts', 'fields', 'meta',
    ] as const

    cases.forEach((c) => {
      requiredFields.forEach((field) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((c as any)[field]).toBeDefined()
      })
    })
  })
})

describe('no hardcoded Russian language (AC-6 guard)', () => {
  it('cases data contains no Russian text', () => {
    const allText = JSON.stringify(cases.map((c) => c.fields))
    expect(allText).not.toMatch(/ruso|rusa|русский|russian/i)
  })
})
