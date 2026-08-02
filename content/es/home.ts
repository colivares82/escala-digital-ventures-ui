export const homeContent = {
  header: {
    brand: 'ESCALA',
    nav: ['Qué hacemos', 'Cómo trabajamos', 'Casos de éxito', 'Modelo de alianza', 'Sobre Escala'],
    contact: 'Hablemos',
    locales: ['ES', 'EN', 'CA'],
  },
  hero: {
    eyebrow: 'Escala Digital Ventures · Estudio de producto y tecnología · Mataró, Barcelona',
    title: 'Automatizamos tu negocio. Escalamos contigo.',
    description: 'Convertimos procesos manuales en plataformas propias que crecen contigo, con la disciplina del software empresarial global.',
    primaryCta: 'Hablemos de tu negocio',
    secondaryCta: 'Cómo trabajamos',
  },
  problem: {
    eyebrow: '01 · EL PUNTO DE PARTIDA',
    title: 'Tu negocio funciona. Tus sistemas, no.',
    body: 'Hojas de cálculo, correos, documentos sueltos y el conocimiento en la cabeza de dos o tres personas. Funciona… hasta que deja de funcionar: el volumen crece, los errores se multiplican, la facturación se retrasa y el negocio depende de que nadie se ponga enfermo. Escala entra exactamente ahí: digitaliza y automatiza el corazón operativo de tu empresa y lo convierte en una plataforma propia sobre la que puedes crecer.',
  },
  framework: {
    eyebrow: '02 · MÉTODO',
    title: 'Un método propio: el Escala Growth Framework',
    description: 'Diez fases que conectan negocio, personas, procesos y tecnología en un ciclo continuo de mejora.',
    phases: ['Discover', 'Understand', 'Simplify', 'Design', 'Validate', 'Build', 'Automate', 'Scale', 'Measure', 'Evolve'],
  },
  proof: {
    eyebrow: '03 · PRUEBA',
    title: 'Hechos, no promesas.',
    client: 'MAGUPELL',
    figures: [
      { value: '100+', label: 'requisitos en producción' },
      { value: '200+', label: 'pruebas automatizadas' },
      { value: 'JUL 2026', label: 'en producción desde' },
      { value: 'REAL', label: 'facturación a través de su plataforma' },
    ],
  },
  finalCta: {
    title: 'Hablemos de tu negocio.',
    body: 'Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer.',
    action: 'Hablemos',
  },
  footer: {
    claim: 'Automatizamos tu negocio. Escalamos contigo.',
    company: 'Escala Digital Ventures, S.L.U. · Mataró, Barcelona',
  },
} as const

export type HomeContent = typeof homeContent
