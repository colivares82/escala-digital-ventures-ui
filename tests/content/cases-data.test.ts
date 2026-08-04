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

describe('MAGUPELL — data-forward invariants', () => {
  const mag = cases.find((c) => c.slug === 'magupell')!

  it('is data-forward mode', () => {
    expect(mag.mode).toBe('data-forward')
  })

  it('has exactly 4 readouts', () => {
    expect(mag.readouts).toHaveLength(4)
  })

  it('has exactly 5 dossier fields', () => {
    expect(mag.fields).toHaveLength(5)
  })

  it('has no capabilities (data-forward)', () => {
    expect(mag.capabilities).toBeUndefined()
  })

  it('readouts include the 100+ requisitos figure', () => {
    const values = mag.readouts.map((r) => r.value)
    expect(values).toContain('100+')
    expect(values).toContain('200+')
  })

  it('readouts include production date and operational status', () => {
    const values = mag.readouts.map((r) => r.value)
    expect(values).toContain('JUL 2026')
    expect(values).toContain('REAL')
  })

  it('field keys match the spec verbatim', () => {
    const keys = mag.fields.map((f) => f.key)
    expect(keys).toContain('CONTEXTO')
    expect(keys).toContain('PROBLEMA')
    expect(keys).toContain('SOLUCIÓN')
    expect(keys).toContain('IMPACTO')
    expect(keys).toContain('SIGUIENTES PASOS')
  })

  it('brand URL points to magupell.com', () => {
    expect(mag.brand.url).toBe('https://www.magupell.com')
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

describe('getCase helper', () => {
  it('returns MAGUPELL by slug', () => {
    const c = getCase('magupell')
    expect(c).not.toBeNull()
    expect(c!.name).toBe('MAGUPELL')
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
    expect(magMeta.title.toUpperCase()).toContain('MAGUPELL')
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
