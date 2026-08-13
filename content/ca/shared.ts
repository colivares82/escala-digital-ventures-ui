/**
 * Shared content — CA locale.
 * SPEC-P5 FR-1.2 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Note: SharedContent is typeof sharedContent (literal type from ES).
 * EN/CA use `as const` without satisfies — structural parity enforced by
 * tests/content/i18n-coverage.test.ts at runtime.
 */

export const sharedContent = {
  metadata: {
    title: 'Escala Digital Ventures | Producte i Tecnologia',
    description: 'Estudi de producte i tecnologia que automatitza operacions i construeix plataformes digitals per a empreses en creixement.',
  },
  accessibility: {
    skipToContent: 'Saltar al contingut',
    homeLabel: 'Escala, inici',
    primaryNavigation: 'Navegació principal',
    footerNavigation: 'Navegació del peu',
    languages: 'Idiomes',
    keyMessages: 'Missatges clau',
    // SPEC-POLISH-07 §5 — mobile menu trigger/close accessible labels.
    menuOpen: 'Obrir menú',
    menuClose: 'Tancar menú',
  },
  header: {
    brand: 'ESCALA',
    nav: [
      { label: 'Què fem', href: '/ca/que-fem', pageId: 'services' },
      { label: 'Com treballem', href: '/ca/com-treballem', pageId: 'method' },
      { label: "Casos d'èxit", href: '/ca/casos-dexit', pageId: 'cases' },
      { label: "Model d'aliança", href: '/ca/model-dalianca', pageId: 'alliance' },
      { label: 'Sobre Escala', href: '/ca/sobre-escala', pageId: 'about' },
    ],
    contact: 'Parlem',
    locales: ['ES', 'EN', 'CA'],
  },
  claims: [
    'Programari a mida, criteri de producte i compromís de soci.',
    'Convertim processos manuals en plataformes que creixen amb tu.',
    'Cinc aliances. Tota la nostra dedicació.',
    'IA aplicada amb criteri: on aporta, no on adorna.',
  ],
  footer: {
    claim: 'Automatitzem el teu negoci. Escalem amb tu.',
    company: 'Escala Digital Ventures, S.L.U. · Mataró, Barcelona',
    direction: 'Direcció general: referència a colivares.com',
    navigation: [
      { label: 'Què fem', href: '/ca/que-fem' },
      { label: 'Com treballem', href: '/ca/com-treballem' },
      { label: "Casos d'èxit", href: '/ca/casos-dexit' },
      { label: "Model d'aliança", href: '/ca/model-dalianca' },
    ],
    legal: [
      { label: 'Avís legal', href: '/ca/avis-legal' },
      { label: 'Privacitat', href: '/ca/privacitat' },
    ],
  },
  finalCta: {
    title: 'Parlem del teu negoci.',
    body: 'Explica\'ns què frena el teu creixement. Escoltem abans de proposar.',
    email: 'hola@escaladigitalventures.com',
    location: 'Mataró · Barcelona',
    languages: 'Treballem en espanyol, anglès i català.',
  },
  contactForm: {
    sectionLabel: 'CONVERSA',
    sendLabel: 'ENVIAR MISSATGE',
    submit: 'Enviar',
    sending: 'ENVIANT…',
    fields: { name: 'Nom', company: 'Empresa', email: 'Email', blocker: 'Què frena el teu creixement?' },
    consentPrefix: 'Accepto el tractament de les meves dades d\'acord amb la',
    privacyLabel: 'política de privacitat',
    successHeader: 'MISSATGE ENVIAT',
    successRef: 'ESCALA · REF. CONTACTE',
    successH2: 'Missatge enviat.',
    successBody:
      'Rebut. Et respondrem personalment en un termini de dos dies laborables.',
    successResend: 'ENVIAR UN ALTRE MISSATGE ↺',
    errorApiPrefix: 'No hem pogut enviar el teu missatge. Escriu-nos directament a',
    errorApiSuffix: 'i et responem de seguida.',
    fallback: 'Prefereixes escriure\'ns directament?',
    errors: {
      name: 'Introdueix el teu nom.',
      company: 'Introdueix la teva empresa.',
      emailRequired: 'Introdueix el teu email.',
      emailInvalid: 'Introdueix un email vàlid.',
      blocker: 'Explica\'ns què frena el teu creixement.',
      consent: 'Necessitem el teu consentiment per respondre\'t.',
    },
  },
  notFound: {
    code: 'ERROR 404 · RUTA NO TROBADA',
    h1: 'Fora del sistema.',
    body: 'La pàgina que busques no existeix o s\'ha mogut. Tornem a un lloc conegut.',
    ctaLabel: 'TORNAR A L\'INICI ↗',
    diagramAria: 'Diagrama de ruta interrompuda: node INICI connectat per línia discontínua a un node perdut marcat amb interrogació',
  },
} as const

export type SharedContent = typeof sharedContent
