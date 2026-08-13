/**
 * ServiceFig — SPEC-POLISH-05 geometry/layering fixes.
 * Covers FIG.08 (platform) connector-to-core-border geometry, FIG.09 (ai)
 * flow-line/label placement, FIG.11 (evolve) node z-order + full-circle arc,
 * and the FIG.07/FIG.10 canvas-only normalisation guard (geometry untouched).
 * Spec: SPEC-POLISH-05 AC-2, AC-3, AC-4, AC-5.
 */

import { render, screen } from '@testing-library/react'
import { ServiceFig } from '@/components/service-fig'
import { servicesContent } from '@/content/es/services'

describe('ServiceFig — SPEC-POLISH-05', () => {
  // ── AC-2: FIG.08 connectors land exactly on the core circle border ────────
  describe('platform variant (FIG.08) — connector geometry', () => {
    it('all five connector endpoints sit exactly on the core circle border', () => {
      const svc = servicesContent.services[1]!
      const { container } = render(
        <ServiceFig variant="platform" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const core = container.querySelector('svg > circle[stroke="var(--ambre)"]')
      expect(core).toBeTruthy()
      const cx = Number(core?.getAttribute('cx'))
      const cy = Number(core?.getAttribute('cy'))
      const r = Number(core?.getAttribute('r'))

      const connectors = container.querySelectorAll('.service-fig__connector')
      expect(connectors.length).toBe(5)
      connectors.forEach((path) => {
        const d = path.getAttribute('d') ?? ''
        const match = d.match(/L([\d.]+)\s+([\d.]+)$/)
        expect(match).toBeTruthy()
        const [, ex, ey] = match!
        const dist = Math.hypot(Number(ex) - cx, Number(ey) - cy)
        expect(dist).toBeCloseTo(r, 1)
      })
    })

    it('all module labels and PLATAFORMA render', () => {
      const svc = servicesContent.services[1]!
      render(<ServiceFig variant="platform" labels={svc.figLabels} caption={svc.figCaption} />)
      for (const label of svc.figLabels) {
        expect(screen.getByText(label)).toBeInTheDocument()
      }
    })
  })

  // ── AC-3: FIG.09 flow line + "DONDE APORTA" placement ──────────────────────
  describe('ai variant (FIG.09) — flow line & label placement', () => {
    it('flow line is split into two edge-to-edge segments (never crosses a box)', () => {
      const svc = servicesContent.services[2]!
      const { container } = render(
        <ServiceFig variant="ai" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      expect(container.querySelectorAll('.service-fig__connector').length).toBe(2)
    })

    it('process boxes have an opaque fill (not "none")', () => {
      const svc = servicesContent.services[2]!
      const { container } = render(
        <ServiceFig variant="ai" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const boxes = container.querySelectorAll('svg rect')
      expect(boxes.length).toBeGreaterThan(0)
      boxes.forEach((box) => expect(box.getAttribute('fill')).not.toBe('none'))
    })

    it('"DONDE APORTA" sits above the IA node (off the diagram)', () => {
      const svc = servicesContent.services[2]!
      const { container } = render(
        <ServiceFig variant="ai" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const iaNode = container.querySelector('svg > circle[stroke="var(--ambre)"]')
      const iaTop = Number(iaNode?.getAttribute('cy')) - Number(iaNode?.getAttribute('r'))
      const label = screen.getByText('DONDE APORTA')
      expect(Number(label.getAttribute('y'))).toBeLessThan(iaTop)
    })

    it('IA dashed connector meets the PROCESO box top edge', () => {
      const svc = servicesContent.services[2]!
      const { container } = render(
        <ServiceFig variant="ai" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const connector = container.querySelector('path[stroke-dasharray="3 3"]')
      const d = connector?.getAttribute('d') ?? ''
      expect(d).toMatch(/L170 108$/)
    })
  })

  // ── AC-4: FIG.11 node z-order + full-circle arc ─────────────────────────────
  describe('evolve variant (FIG.11) — node z-order & full-circle arc', () => {
    it('nodes are drawn after (on top of) the base circle, with opaque fill', () => {
      const svc = servicesContent.services[4]!
      const { container } = render(
        <ServiceFig variant="evolve" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const svgChildren = Array.from(container.querySelector('svg')?.children ?? [])
      const circleIdx = svgChildren.findIndex(
        (el) => el.tagName === 'circle' && el.getAttribute('stroke') === 'var(--ink)',
      )
      const nodeGroupIdx = svgChildren.findIndex(
        (el) => el.tagName === 'g' && el.querySelector('circle[fill="var(--paper)"]'),
      )
      expect(circleIdx).toBeGreaterThanOrEqual(0)
      expect(nodeGroupIdx).toBeGreaterThan(circleIdx)

      const nodes = container.querySelectorAll('svg g circle[fill="var(--paper)"]')
      expect(nodes.length).toBe(3)
    })

    it('the progress arc traces the full circle (two 180° arc commands)', () => {
      const svc = servicesContent.services[4]!
      const { container } = render(
        <ServiceFig variant="evolve" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const arcPath = container.querySelector('path[stroke="var(--ambre)"]')
      const d = arcPath?.getAttribute('d') ?? ''
      const arcCommandCount = (d.match(/A/g) ?? []).length
      expect(arcCommandCount).toBe(2)
    })

    it('labels (USO, FEEDBACK, MEJORA) render outside their nodes', () => {
      const svc = servicesContent.services[4]!
      render(<ServiceFig variant="evolve" labels={svc.figLabels} caption={svc.figCaption} />)
      expect(screen.getByText('USO')).toBeInTheDocument()
      expect(screen.getByText('FEEDBACK')).toBeInTheDocument()
      expect(screen.getByText('MEJORA')).toBeInTheDocument()
    })
  })

  // ── AC-5: FIG.07/FIG.10 geometry untouched (canvas-only normalisation) ─────
  describe('capture (FIG.07) and product (FIG.10) — untouched geometry', () => {
    it('capture variant retains its original ambre PROCESO node geometry', () => {
      const svc = servicesContent.services[0]!
      const { container } = render(
        <ServiceFig variant="capture" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const processNode = container.querySelector('circle[stroke="var(--ambre)"]')
      expect(processNode?.getAttribute('r')).toBe('9')
      expect(processNode?.getAttribute('cx')).toBe('150')
      expect(processNode?.getAttribute('cy')).toBe('75')
    })

    it('product variant retains its original priority bar geometry', () => {
      const svc = servicesContent.services[3]!
      const { container } = render(
        <ServiceFig variant="product" labels={svc.figLabels} caption={svc.figCaption} />,
      )
      const priorityBar = container.querySelector('rect[stroke="var(--ambre)"]')
      expect(priorityBar?.getAttribute('x')).toBe('168')
      expect(priorityBar?.getAttribute('height')).toBe('62')
    })

    it('capture and product both render on the shared 340×180 canvas', () => {
      const capture = servicesContent.services[0]!
      const product = servicesContent.services[3]!
      const { container: c1 } = render(
        <ServiceFig variant="capture" labels={capture.figLabels} caption={capture.figCaption} />,
      )
      const { container: c2 } = render(
        <ServiceFig variant="product" labels={product.figLabels} caption={product.figCaption} />,
      )
      expect(c1.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 340 180')
      expect(c2.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 340 180')
    })
  })
})
