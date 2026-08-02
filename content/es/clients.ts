export type Client = {
  readonly name: string
  readonly eyebrow: string
  readonly title: string
  readonly text: string
  readonly href: string
  readonly status: string
}

export const clients = [
  {
    name: 'MAGUPELL',
    eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
    title: 'Digitalización integral de la inspección de calidad en el sector de la piel',
    text: '100+ requisitos funcionales · 200+ pruebas automatizadas · Producción: 1 julio 2026 · Facturación real a través de la plataforma',
    href: '/casos-de-exito/magupell',
    status: 'Ver caso',
  },
  {
    name: 'BioZero',
    eyebrow: 'V1 ENTREGADA · CLÍNICA DENTAL + IA',
    title: 'Plataforma de gestión clínica dental con IA',
    text: 'Registros clínicos colaborativos, gamificación del paciente y análisis de imágenes con modelos de visión de última generación.',
    href: '/casos-de-exito/biozero',
    status: 'Ver caso',
  },
] as const satisfies readonly Client[]
