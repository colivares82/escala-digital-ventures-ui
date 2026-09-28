/**
 * /oportunidad — ES-only conversion landing (LANDING-01).
 * Wireframe: specs/mockups/wireframe-landing01-oportunidad.html
 *
 * Rules for this file:
 *   - ES only (D1): no EN/CA counterpart, deliberately absent from the i18n
 *     coverage guard's parity list.
 *   - No client names (D5).
 *   - Experience readouts reuse the /sobre-escala metrics ("más de veinte
 *     años", "decenas de miles de empresas", "más de cien países", MIT).
 *     Never "100+"/"200+" — blocked by seo-prohibitions-guard.
 *   - Offer copy + date are edited by hand here; there is no date logic (D8).
 */
import type { OportunidadDictionary } from '@/content/types'

export const oportunidadContent = {
  meta: {
    title: 'Tu operativa, a tu medida · Escala Digital Ventures',
    description:
      'Pasamos tu negocio de WhatsApp, hojas de cálculo y correos a un sistema propio, hecho a tu medida. Prototipos desde 2.000 €.',
  },

  hero: {
    sectionIndex: {
      index: '00',
      label: 'Para negocios que han crecido más rápido que sus sistemas',
    },
    title1: 'Tu negocio crece.',
    title2: 'Tu operativa también debería.',
    lead: 'Pasamos tu día a día de WhatsApp, hojas de cálculo y correos a un sistema propio, hecho a tu medida, que ordena el trabajo y te dice qué está pasando en tu negocio.',
    ctaPrimary: 'Cuéntanos tu caso',
    ctaSecondary: 'Ver cómo sería en tu negocio ↓',
    badge: 'Cinco alianzas · hoy quedan 3 plazas',
    fig: {
      headers: ['HOY · TODO REPARTIDO', 'UN SOLO LUGAR', 'LO QUE GANAS'],
      inputs: ['WHATSAPP', 'HOJAS DE CÁLCULO', 'CORREOS', 'PAPEL', 'LLAMADAS'],
      coreTitle: 'TU SISTEMA',
      coreSub: 'HECHO A TU MEDIDA',
      outputs: [
        { title: 'CONTROL', sub: 'Sabes qué pasa, hoy' },
        { title: 'TIEMPO', sub: 'Tu equipo, en lo que importa' },
      ],
      caption: 'FIG. 01 — De la operativa repartida a tu propio sistema',
      aria: 'De la operativa repartida a tu propio sistema',
    },
  },

  day: {
    sectionIndex: { index: '01', label: 'Un lunes cualquiera' },
    title: 'Un lunes cualquiera en tu negocio.',
    lead: 'No es falta de ganas ni de equipo. Es que la operativa vive repartida en demasiados sitios, y cada día cuesta un poco más.',
    table: {
      cols: ['Hora', 'Hoy', 'Con tu sistema'],
      mobileBefore: 'HOY ·',
      mobileAfter: 'CON TU SISTEMA ·',
      rows: [
        {
          time: '08:30',
          before: 'Treinta mensajes de WhatsApp. Tres son urgentes; no sabes cuáles.',
          after: 'Abres tu panel: lo urgente, arriba. Lo demás, ya asignado.',
        },
        {
          time: '10:00',
          before: '¿Cuál es la última versión del Excel? Dos personas trabajan sobre copias distintas.',
          after: 'Un solo lugar con el dato bueno. Todos ven lo mismo.',
        },
        {
          time: '12:30',
          before: 'Un cliente pregunta por su pedido. Nadie lo sabe sin llamar a alguien.',
          after: 'El cliente lo consulta él mismo. Nadie tiene que parar.',
        },
        {
          time: '16:00',
          before: 'Alguien está de baja y el proceso se para: solo esa persona sabía cómo iba.',
          after: 'El proceso vive en el sistema, no en la cabeza de una persona.',
        },
        {
          time: '20:30',
          before: 'Tú, en casa, cuadrando datos para saber cómo va el mes.',
          after: 'Tú, en casa. Los números del mes ya están al día.',
        },
      ],
    },
    closing: '¿Te suena? Eso es lo que resolvemos.',
  },

  scenarios: {
    sectionIndex: { index: '02', label: 'Cómo sería en tu negocio' },
    title: 'Cómo sería en tu negocio.',
    lead: 'Tres escenarios ilustrativos. Cada negocio es distinto: por eso cada solución se construye a medida.',
    flowLabels: {
      before: 'HOY',
      after: 'CON TU SISTEMA',
      aria: 'Flujo actual frente al flujo con tu sistema',
    },
    outcomeLabel: 'Qué cambia',
    items: [
      {
        eyebrow: 'Escenario A · ilustrativo',
        title: 'Red de franquicias',
        problem:
          'Varios locales, y cada uno hace la revisión de calidad a su manera: en papel, con una foto por WhatsApp… o no la hace.',
        before: ['LOCAL', 'WHATSAPP', 'EXCEL CENTRAL'],
        after: ['CHECKLIST MÓVIL', 'PANEL DE RED', 'ALERTA'],
        outcome:
          'Ves toda tu red en una pantalla. Detectas un problema el mismo día, no a final de mes. Todos los locales trabajan igual.',
      },
      {
        eyebrow: 'Escenario B · ilustrativo',
        title: 'Servicios en campo',
        problem:
          'Tus técnicos rellenan partes en papel. La oficina los pasa a mano y el cobro sale semanas tarde.',
        before: ['PARTE EN PAPEL', 'OFICINA', 'COBRO TARDE'],
        after: ['PARTE MÓVIL', 'FIRMA CLIENTE', 'COBRO AL DÍA'],
        outcome:
          'Menos horas copiando datos. Cobras antes. Tu cliente recibe su informe en el momento.',
      },
      {
        eyebrow: 'Escenario C · ilustrativo',
        title: 'Pedidos entre empresas',
        problem:
          'Los pedidos llegan por correo, teléfono y WhatsApp. Se apuntan a mano y alguno se pierde por el camino.',
        before: ['CORREO', 'APUNTE A MANO', 'PEDIDO PERDIDO'],
        after: ['PORTAL CLIENTE', 'ESTADO VISIBLE', 'AVISO AUTOMÁTICO'],
        outcome:
          'Ningún pedido se pierde. Tus clientes piden solos, a cualquier hora. Tu equipo vende en vez de transcribir.',
      },
    ],
  },

  alliance: {
    sectionIndex: { index: '03', label: 'Una alianza, no un proveedor' },
    title: 'No te vendemos un programa. Nos convertimos en tu equipo de tecnología.',
    lead: 'Trabajamos con cinco negocios a la vez, no con cincuenta. Por eso podemos implicarnos como si el negocio fuera nuestro.',
    constellation: {
      active: 'ACTIVA',
      available: 'DISPONIBLE',
      core: 'ESCALA',
      caption: 'FIG. 02 — Cinco plazas · dos activas · tres disponibles',
      aria: 'Cinco plazas de alianza: dos activas y tres disponibles alrededor de Escala',
    },
    planes: [
      {
        label: 'Plano técnico',
        title: 'Lo construimos y lo cuidamos',
        body: 'Diseñamos, construimos y mantenemos tu sistema. Si algo falla, lo resolvemos nosotros. Tienes un equipo de tecnología sin tener que crearlo.',
      },
      {
        label: 'Plano estratégico',
        title: 'Decidimos contigo qué va primero',
        body: 'Priorizamos por impacto en tu negocio: qué automatizar, qué no y en qué orden. Cada mes, sobre lo que tu equipo usa de verdad.',
      },
      {
        label: 'Plano visionario',
        title: 'Te contamos lo que viene',
        body: 'IA, automatización, datos: te decimos qué tiene sentido para tu negocio y qué es ruido, antes de que se convierta en urgencia.',
      },
    ],
    notLabel: 'Lo que no somos',
    notMark: '✕',
    notItems: [
      'Una agencia que entrega y desaparece',
      'Plantillas genéricas',
      'Tecnología por la tecnología',
    ],
  },

  about: {
    sectionIndex: { index: '04', label: 'Quién está detrás' },
    title: 'Hablas con quien lo construye.',
    name: 'Carlos Olivares',
    role: 'Fundador · Product Engineer',
    lead: 'Más de veinte años construyendo y dirigiendo plataformas de software empresarial de alcance global. Esa misma disciplina, ahora al servicio de cinco negocios, con trato directo y sin intermediarios.',
    // Same metrics as /sobre-escala (content/es/about.ts · expertise.lead).
    readouts: [
      {
        label: 'Trayectoria',
        value: 'Más de 20 años',
        caption: 'Construyendo y dirigiendo plataformas de software empresarial.',
      },
      {
        label: 'Alcance',
        value: 'Decenas de miles',
        caption: 'De empresas usando plataformas que hemos construido y dirigido.',
      },
      {
        label: 'Presencia',
        value: 'Más de cien',
        caption: 'Países. Estándares de software empresarial global.',
      },
      {
        label: 'IA aplicada',
        value: 'MIT',
        caption: 'Certificación en diseño y construcción de productos de IA.',
      },
    ],
    link: 'Ver nuestros casos de éxito →',
  },

  start: {
    sectionIndex: { index: '05', label: 'Cómo empezamos' },
    title: 'Empezar es sencillo. Y no te compromete a todo.',
    lead: 'Avanzamos por etapas. Solo pasas a la siguiente cuando la anterior te ha demostrado su valor.',
    steps: [
      {
        n: '1',
        title: 'Hablamos',
        body: 'Nos cuentas cómo funciona tu día a día y qué frena tu crecimiento. Escuchamos antes de proponer.',
      },
      {
        n: '2',
        title: 'Diagnóstico y propuesta',
        body: 'Te devolvemos qué haríamos, en qué orden y cuánto cuesta. Claro y por etapas.',
      },
      {
        n: '3',
        title: 'Prototipo navegable',
        body: 'Ves tu solución funcionando antes de invertir en construirla. Si no te convence, no seguimos.',
      },
    ],
    price: {
      label: 'Inversión',
      value: 'Prototipos desde 2.000 €',
      note: 'Cada proyecto se presupuesta después de entender tu negocio, su complejidad y tus necesidades.',
    },
    offer: {
      label: 'Oferta · hasta el 30.11.2026',
      big: '−10%',
      line: 'en tu prototipo',
      note: 'al firmar tu alianza antes del 30 de noviembre de 2026.',
    },
  },

  contact: {
    sectionIndex: { index: '06', label: 'Hablemos' },
    title: 'Cuéntanos qué frena tu negocio.',
    lead: 'Te respondemos personalmente en un plazo de dos días laborables. Y te diremos con honestidad si podemos ayudarte.',
  },
} as const satisfies OportunidadDictionary

export type OportunidadContent = typeof oportunidadContent
