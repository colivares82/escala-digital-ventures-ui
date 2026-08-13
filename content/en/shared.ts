/**
 * Shared content — EN locale.
 * SPEC-P5 FR-1.2 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Note: SharedContent is typeof sharedContent (literal type from ES).
 * EN/CA use `as const` without satisfies — structural parity enforced by
 * tests/content/i18n-coverage.test.ts at runtime.
 */

export const sharedContent = {
  metadata: {
    title: 'Escala Digital Ventures | Product & Technology',
    description: 'Product and technology studio that automates operations and builds digital platforms for growing businesses.',
  },
  accessibility: {
    skipToContent: 'Skip to content',
    homeLabel: 'Escala, home',
    primaryNavigation: 'Main navigation',
    footerNavigation: 'Footer navigation',
    languages: 'Languages',
    keyMessages: 'Key messages',
    // SPEC-POLISH-07 §5 — mobile menu trigger/close accessible labels.
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  header: {
    brand: 'ESCALA',
    nav: [
      { label: 'What we do', href: '/en/what-we-do', pageId: 'services' },
      { label: 'How we work', href: '/en/how-we-work', pageId: 'method' },
      { label: 'Case studies', href: '/en/case-studies', pageId: 'cases' },
      { label: 'Alliance model', href: '/en/alliance-model', pageId: 'alliance' },
      { label: 'About Escala', href: '/en/about-escala', pageId: 'about' },
    ],
    contact: "Let's talk",
    locales: ['ES', 'EN', 'CA'],
  },
  claims: [
    'Custom software, product judgement, partner commitment.',
    'We turn manual processes into platforms that grow with you.',
    'Five alliances. Our full dedication.',
    'AI applied with judgement: where it adds value, not where it decorates.',
  ],
  footer: {
    claim: 'We automate your business. We scale with you.',
    company: 'Escala Digital Ventures, S.L.U. · Mataró, Barcelona',
    direction: 'General management: reference at colivares.com',
    col: {
      navigation: 'Navigation',
      contact: 'Contact',
      legal: 'Legal',
    },
    navigation: [
      { label: 'What we do', href: '/en/what-we-do' },
      { label: 'How we work', href: '/en/how-we-work' },
      { label: 'Case studies', href: '/en/case-studies' },
      { label: 'Alliance model', href: '/en/alliance-model' },
      { label: 'About Escala', href: '/en/about-escala' },
    ],
    legal: [
      { label: 'Legal notice', href: '/en/legal-notice' },
      { label: 'Privacy', href: '/en/privacy' },
    ],
    noTracking: 'No tracking cookies',
  },
  finalCta: {
    title: "Let's talk about your business.",
    body: 'Tell us what is holding back your growth. We listen before we propose.',
    email: 'hola@escaladigitalventures.com',
    location: 'Mataró · Barcelona',
    languages: 'We work in Spanish, English and Catalan.',
  },
  contactForm: {
    sectionLabel: 'CONVERSATION',
    sendLabel: 'SEND MESSAGE',
    submit: 'Send',
    sending: 'SENDING…',
    fields: { name: 'Name', company: 'Company', email: 'Email', blocker: 'What is holding back your growth?' },
    consentPrefix: 'I accept the processing of my data in accordance with the',
    privacyLabel: 'privacy policy',
    successHeader: 'MESSAGE SENT',
    successRef: 'ESCALA · CONTACT REF.',
    successH2: 'Message sent.',
    successBody:
      'Received. We will reply personally within two business days.',
    successResend: 'SEND ANOTHER MESSAGE ↺',
    errorApiPrefix: 'We could not send your message. Write to us directly at',
    errorApiSuffix: 'and we will get back to you right away.',
    fallback: 'Would you prefer to write to us directly?',
    errors: {
      name: 'Please enter your name.',
      company: 'Please enter your company.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Please enter a valid email.',
      blocker: 'Please tell us what is holding back your growth.',
      consent: 'We need your consent to reply.',
    },
  },
  notFound: {
    code: 'ERROR 404 · ROUTE NOT FOUND',
    h1: 'Outside the system.',
    body: 'The page you are looking for does not exist or has moved. Let us get back to familiar ground.',
    ctaLabel: 'BACK TO HOME ↗',
    diagramAria: 'Interrupted route diagram: HOME node connected by a dashed line to a lost node marked with a question mark',
  },
} as const

export type SharedContent = typeof sharedContent
