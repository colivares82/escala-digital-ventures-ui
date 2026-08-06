/**
 * Sobre Escala — ES content dictionary.
 * Full content: DNA, values, anonymized experience, manifesto (10 beliefs).
 * Spec: SPEC-P2.5 FR-9 · Sources: Libro v2.2 Ch. 1 (DNA/values), Ch. 3 (manifesto),
 * Ch. 4 (experience — anonymized per Ch. 19), Spec v1.1.1 §5.6.
 *
 * Anonymization rule (Ch. 19): no former-employer names.
 * Use only anonymized formulas: "plataformas de software empresarial de alcance global",
 * "decenas de miles de empresas en más de cien países".
 * MIT certification may be named (it belongs to the firm, not an employer).
 *
 * Ownership rule (SPEC-FIX-01 / .clinerules): no code-ownership wording. See ownership-guard.test.ts.
 */
import type { AboutDictionary } from '@/content/types'

export const aboutContent = {
  meta: {
    title: 'Sobre Escala | Escala Digital Ventures',
    description:
      'ADN, valores, los 10 principios y la experiencia detrás de Escala. Mataró, Barcelona.',
  },

  ceremonial: {
    kicker: 'A · SOBRE ESCALA · ESTUDIO DE PRODUCTO Y TECNOLOGÍA',
    h1: 'Construimos capacidades, no aplicaciones.',
    sub: 'Escala Digital Ventures, S.L.U. es un estudio de producto y tecnología con sede en Mataró (Barcelona), constituido en 2026. Existimos para que un número reducido de empresas crezca mediante tecnología entendida como estrategia de negocio.',
  },

  dna: {
    sectionEyebrow: 'B / NUESTRO ADN',
    missionLabel: 'Misión.',
    mission:
      'Automatizar sistemas y procesos de negocio, fomentar la escalabilidad y la eficiencia, y hacerlo a través de alianzas de crecimiento en las que acompañamos a cada cliente de la mano — a nivel técnico, estratégico y visionario.',
    visionLabel: 'Visión.',
    vision:
      'Ser el socio tecnológico de referencia de un grupo selecto de empresas, actuando como su departamento externo de tecnología, innovación y producto, y participando en su crecimiento como si fuera parte del propio negocio.',
    quote:
      '«Cada decisión debe responder a una pregunta: ¿seguirá aportando valor dentro de diez años?»',
  },

  values: {
    sectionEyebrow: 'C / VALORES',
    items: [
      {
        n: '01',
        title: 'Compromiso de socio',
        body: 'No entregamos un proyecto y desaparecemos: nos quedamos, operamos, mejoramos y evolucionamos el producto junto al cliente.',
      },
      {
        n: '02',
        title: 'Excelencia de ingeniería',
        body: 'Código probado, arquitectura sólida, despliegues automatizados y estándares propios reutilizables. La estabilidad en producción es un requisito de entrada.',
      },
      {
        n: '03',
        title: 'Producto antes que tecnología',
        body: 'Pensamos primero en el problema, el usuario y el retorno, y después en la herramienta.',
      },
      {
        n: '04',
        title: 'Transparencia radical',
        body: 'Especificaciones antes de construir, alcance claro, comunicación honesta y facturación trazable.',
      },
      {
        n: '05',
        title: 'Velocidad con criterio',
        body: 'Metodología dirigida por especificaciones y flujo asistido por IA: la velocidad de equipos mucho mayores, sin sacrificar control.',
      },
    ],
  },

  divider: '— — —  DE LA IDENTIDAD A LA EXPERIENCIA  — — —',

  expertise: {
    sectionEyebrow: 'D / LA EXPERIENCIA DETRÁS DE ESCALA',
    heading: 'Más de dos décadas, seis disciplinas',
    lead: 'La experiencia que sustenta a Escala abarca más de veinte años construyendo y dirigiendo plataformas de software empresarial de alcance global — soluciones utilizadas por decenas de miles de empresas en más de cien países. Lo relevante no es la cronología, sino el resultado: seis disciplinas operando juntas.',
    areas: [
      {
        index: '01',
        title: 'Ingeniería full-stack',
        body: 'Frontend, backend, datos, cloud, seguridad, pruebas y automatización de despliegues. Diseñar y también ejecutar.',
        figVariant: 'fullstack',
      },
      {
        index: '02',
        title: 'Arquitectura de plataformas',
        body: 'Sistemas modulares, escalables y extensibles pensados para durar años: APIs claras, observabilidad, evolución sin rediseños.',
        figVariant: 'hub',
      },
      {
        index: '03',
        title: 'Dirección de producto',
        body: 'Visión, estrategia, roadmap, priorización por impacto, especificación funcional y alineación negocio-ingeniería-UX.',
        figVariant: 'bars',
      },
      {
        index: '04',
        title: 'Liderazgo y transformación',
        body: 'Años dirigiendo equipos multidisciplinares y transformando organizaciones técnicas en organizaciones orientadas a producto.',
        figVariant: 'nodes',
      },
      {
        index: '05',
        title: 'Developer experience',
        body: 'Tooling, testing e integración continua: la disciplina de hacer que construir, desplegar y mantener sea rápido y fiable.',
        figVariant: 'signal',
      },
      {
        index: '06',
        title: 'IA aplicada y cloud-native',
        body: 'Plataformas modernas, cloud-native y AI-first, con formación específica en diseño de productos de IA (certificación del MIT).',
        figVariant: 'insertion',
      },
    ],
  },

  manifesto: {
    sectionEyebrow: 'E / EL MANIFIESTO',
    heading: 'El Manifiesto de Escala',
    lead: 'DIEZ CREENCIAS · UNA FORMA DE ENTENDER LA TECNOLOGÍA',
    beliefs: [
      'La tecnología solo tiene sentido cuando mejora la vida de las personas y el funcionamiento de las empresas.',
      'El software es un activo estratégico, no un gasto.',
      'La simplicidad es una de las formas más avanzadas de ingeniería.',
      'Negocio, producto y tecnología forman una única disciplina.',
      'La automatización libera el potencial humano para tareas de mayor valor.',
      'La inteligencia artificial debe amplificar las capacidades de las personas, no sustituirlas.',
      'La calidad no es negociable: las decisiones técnicas de hoy determinan el éxito de mañana.',
      'Creemos en relaciones de largo plazo basadas en confianza, transparencia y compromiso.',
      'El aprendizaje continuo es imprescindible para mantener una ventaja competitiva.',
      'El verdadero éxito consiste en ayudar a nuestros clientes a crecer de forma sostenible.',
    ],
  },

  // Plain text — NOT a link until colivares.com is live (projectbrief.md non-goal).
  // TODO: linkify colivares.com when live.
  colivaresLine:
    'DIRECCIÓN GENERAL · La trayectoria completa de nuestro Director General está disponible como referencia pública en colivares.com',
} as const satisfies AboutDictionary

export type AboutContent = typeof aboutContent
