import { render } from '@testing-library/react'
import { writeFileSync } from 'node:fs'
import { OportunidadPage } from '@/components/pages/oportunidad'
import { getDictionary } from '@/lib/i18n/dictionary'
it('baseline', () => {
  const { container } = render(<OportunidadPage dict={getDictionary('es')} locale="es" />)
  writeFileSync(process.env.OUT ?? '/tmp/homev2/oport-before.html', container.innerHTML)
})
