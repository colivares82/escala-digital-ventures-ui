/**
 * CaseRolesGrid component tests — section 04 (SPEC-CASE-01 §3).
 */
import { render, screen } from '@testing-library/react'
import { CaseRolesGrid } from '@/components/case-roles-grid'
import type { CaseRole } from '@/content/data/cases'

const LEAD = 'Una sola plataforma, cuatro formas de trabajar.'
const ROLES: CaseRole[] = [
  { index: 'ROL 01', title: 'Administración', body: 'Dirige la operación de principio a fin.' },
  { index: 'ROL 02', title: 'Inspector', body: 'Trabaja sobre el terreno desde la tablet.' },
  { index: 'ROL 03', title: 'Cliente', body: 'Accede a su portal.' },
  { index: 'ROL 04', title: 'Proveedor', body: 'Consulta el resultado de sus lotes.' },
]

describe('CaseRolesGrid', () => {
  it('renders the lead paragraph', () => {
    render(<CaseRolesGrid lead={LEAD} roles={ROLES} />)
    expect(screen.getByText(LEAD)).toBeInTheDocument()
  })

  it('renders exactly 4 role cards', () => {
    render(<CaseRolesGrid lead={LEAD} roles={ROLES} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  it('renders every role title', () => {
    render(<CaseRolesGrid lead={LEAD} roles={ROLES} />)
    ROLES.forEach((r) => {
      expect(screen.getByText(r.title)).toBeInTheDocument()
    })
  })

  it('renders every role body', () => {
    render(<CaseRolesGrid lead={LEAD} roles={ROLES} />)
    ROLES.forEach((r) => {
      expect(screen.getByText(r.body)).toBeInTheDocument()
    })
  })

  it('renders every role index', () => {
    render(<CaseRolesGrid lead={LEAD} roles={ROLES} />)
    ROLES.forEach((r) => {
      expect(screen.getByText(r.index)).toBeInTheDocument()
    })
  })
})
