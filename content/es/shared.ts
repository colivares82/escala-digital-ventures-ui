export const sharedContent = {
  metadata: {
    title: 'Escala Digital Ventures | Producto y tecnología',
    description: 'Estudio de producto y tecnología que automatiza operaciones y construye plataformas digitales para empresas en crecimiento.',
  },
  accessibility: {
    skipToContent: 'Saltar al contenido',
    homeLabel: 'Escala, inicio',
    primaryNavigation: 'Navegación principal',
    footerNavigation: 'Navegación del pie',
    languages: 'Idiomas',
    keyMessages: 'Mensajes clave',
  },
  header: {
    brand: 'ESCALA',
    nav: [
      // Built pages: true route (Phase 2.2+).
      { label: 'Qué hacemos', href: '/que-hacemos', pageId: 'services' },
      // Built pages: true route (Phase 2.1+).
      { label: 'Cómo trabajamos', href: '/como-trabajamos', pageId: 'method' },
      { label: 'Casos de éxito', href: '/casos-de-exito', pageId: 'cases' },
      { label: 'Modelo de alianza', href: '/#alianza', pageId: 'alliance' },
      { label: 'Sobre Escala', href: '/#inicio', pageId: 'about' },
    ],
    contact: 'Hablemos',
    locales: ['ES', 'EN', 'CA'],
  },
  claims: [
    'Software a medida, criterio de producto y compromiso de socio.',
    'Convertimos procesos manuales en plataformas que crecen contigo.',
    'Cinco alianzas. Toda nuestra dedicación.',
    'IA aplicada con criterio: donde aporta, no donde adorna.',
  ],
  footer: {
    claim: 'Automatizamos tu negocio. Escalamos contigo.',
    company: 'Escala Digital Ventures, S.L.U. · Mataró, Barcelona',
    direction: 'Dirección general: referencia en colivares.com',
    navigation: [
      { label: 'Qué hacemos', href: '/que-hacemos' },
      { label: 'Cómo trabajamos', href: '/como-trabajamos' },
      { label: 'Casos de éxito', href: '/casos-de-exito' },
      { label: 'Modelo de alianza', href: '/#alianza' },
    ],
    legal: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Privacidad', href: '/privacidad' },
    ],
  },
  contactForm: {
    sectionLabel: 'CONVERSACIÓN',
    successLabel: 'ENVÍO / CONFIRMADO',
    fields: { name: 'Nombre', company: 'Empresa', email: 'Email', blocker: '¿Qué frena tu crecimiento?' },
    consentPrefix: 'Acepto el tratamiento de mis datos conforme a la',
    privacyLabel: 'política de privacidad',
    submit: 'Enviar',
    fallback: '¿Prefieres escribirnos directamente?',
    errors: {
      name: 'Introduce tu nombre.',
      company: 'Introduce tu empresa.',
      emailRequired: 'Introduce tu email.',
      emailInvalid: 'Introduce un email válido.',
      blocker: 'Cuéntanos qué frena tu crecimiento.',
      consent: 'Necesitamos tu consentimiento para responderte.',
    },
  },
} as const

export type SharedContent = typeof sharedContent
