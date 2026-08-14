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
    // SPEC-POLISH-07 §5 — mobile menu trigger/close accessible labels.
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    // BRAND-01 §8 — alt text for the header brand lockup (desktop + mobile).
    // The footer lockup is decorative (its anchor already carries `homeLabel`),
    // so it takes an empty alt and deliberately has no key here.
    logoAlt: 'Escala Digital Ventures — Inicio',
  },
  header: {
    brand: 'ESCALA',
    nav: [
      // Built pages: true route (Phase 2.2+).
      { label: 'Qué hacemos', href: '/que-hacemos', pageId: 'services' },
      // Built pages: true route (Phase 2.1+).
      { label: 'Cómo trabajamos', href: '/como-trabajamos', pageId: 'method' },
      { label: 'Casos de éxito', href: '/casos-de-exito', pageId: 'cases' },
      // Phase 2.4: true route (SPEC-P2.4 FR-1.1 / AC-10).
      { label: 'Modelo de alianza', href: '/modelo-de-alianza', pageId: 'alliance' },
      // Phase 2.5: true route — SPEC-P2.5 FR-1.1 / AC-10
      { label: 'Sobre Escala', href: '/sobre-escala', pageId: 'about' },
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
    // SPEC-POLISH-08 §4 — column headings, the only new copy this spec adds
    // besides `noTracking` (no reusable key existed for it — see spec §0).
    col: {
      navigation: 'Navegación',
      contact: 'Contacto',
      legal: 'Legal',
    },
    // SPEC-POLISH-08 §2 Band 2 — 5th link ("Sobre Escala") added to reach page
    // parity with the header nav; label reused from `header.nav`, no new copy.
    navigation: [
      { label: 'Qué hacemos', href: '/que-hacemos' },
      { label: 'Cómo trabajamos', href: '/como-trabajamos' },
      { label: 'Casos de éxito', href: '/casos-de-exito' },
      { label: 'Modelo de alianza', href: '/modelo-de-alianza' },
      { label: 'Sobre Escala', href: '/sobre-escala' },
    ],
    legal: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Privacidad', href: '/privacidad' },
    ],
    // SPEC-POLISH-08 §2 Band 2 — short mono note; no reusable key existed
    // (privacy.ts carries only a full paragraph), so this is new copy.
    noTracking: 'Sin cookies de seguimiento',
  },
  /**
   * Canonical FinalCTA content — single source for all pages.
   * Used by FinalCTA component directly; no per-page duplication.
   */
  finalCta: {
    title: 'Hablemos de tu negocio.',
    body: 'Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer.',
    email: 'hola@escaladigitalventures.com',
    location: 'Mataró · Barcelona',
    languages: 'Trabajamos en español, inglés y catalán.',
  },
  contactForm: {
    sectionLabel: 'CONVERSACIÓN',
    /** Dossier variant button label (ENVIAR MENSAJE) — section variant keeps submit */
    sendLabel: 'ENVIAR MENSAJE',
    submit: 'Enviar',
    /** Loading button label while the API call is in flight */
    sending: 'ENVIANDO…',
    fields: { name: 'Nombre', company: 'Empresa', email: 'Email', blocker: '¿Qué frena tu crecimiento?' },
    consentPrefix: 'Acepto el tratamiento de mis datos conforme a la',
    privacyLabel: 'política de privacidad',
    /** Success card — shown after successful API submit (replaces form in place) */
    successHeader: 'MENSAJE ENVIADO',
    successRef: 'ESCALA · REF. CONTACTO',
    successH2: 'Mensaje enviado.',
    successBody:
      'Recibido. Te responderemos personalmente en un plazo de dos días laborables.',
    successResend: 'ENVIAR OTRO MENSAJE ↺',
    /** API error copy — email link injected between prefix and suffix */
    errorApiPrefix: 'No hemos podido enviar tu mensaje. Escríbenos directamente a',
    errorApiSuffix: 'y te respondemos enseguida.',
    /** Validation error fallback shown when client-side errors are present */
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
  /**
   * Phase 4 — 404 not-found copy. Spec: SPEC-P4 FR-5.
   * Defaults to ES; not-found.tsx cannot resolve locale in App Router.
   */
  notFound: {
    code: 'ERROR 404 · RUTA NO ENCONTRADA',
    h1: 'Fuera del sistema.',
    body: 'La página que buscas no existe o se ha movido. Volvamos a un lugar conocido.',
    ctaLabel: 'VOLVER AL INICIO ↗',
    diagramAria: 'Diagrama de ruta interrumpida: nodo INICIO conectado por línea discontinua a un nodo perdido marcado con interrogación',
  },
} as const

export type SharedContent = typeof sharedContent
