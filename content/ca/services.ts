/**
 * Què fem — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  // SEO-01 §3.3 — primary term: "desenvolupament de plataformes a mida".
  meta: {
    title: 'Automatització, plataformes a mida i IA per a empreses',
    description:
      'Automatitzem processos, desenvolupem plataformes a mida i apliquem IA on aporta retorn. També direcció de producte i tecnologia fraccional.',
  },

  pageHeader: {
    eyebrow: 'A / QUÈ FEM',
    title: 'Què fem',
    // SEO-01 §4.3 — category stated plainly before the brand framing.
    lead: 'Automatització de processos, desenvolupament de plataformes a mida i IA aplicada per a empreses que han crescut més ràpid que els seus sistemes. No oferim un catàleg de serveis: dissenyem cada col·laboració al voltant dels objectius del teu negoci. Aquestes són les cinc línies que gairebé sempre es combinen dins d\'una mateixa aliança.',
    problemPrefix: 'EL PROBLEMA',
  },

  services: [
    {
      index: '01',
      title: 'Transformació digital i automatització de processos',
      problem: 'Processos crítics que viuen en fulls de càlcul i al cap de les persones.',
      deliverable:
        // SEO-01 §4.4 — must contain "automatització de processos".
        'Automatització de processos de punta a punta: analitzem processos, eines i fluxos per simplificar, automatitzar i modernitzar, des de la captura de la dada en origen fins a la facturació i l\'informe final.',
      figVariant: 'capture',
      figLabels: ['FULL', 'CORREU', 'DADA', 'PROCÉS', 'INFORME', 'FACTURA'],
      figCaption: 'FIG. 07 — CAPTURA A INFORME',
    },
    {
      index: '02',
      title: 'Desenvolupament de plataformes',
      problem: 'El programari genèric no s\'adapta a la teva realitat.',
      deliverable:
        'Dissenyem i construïm aplicacions web i plataformes a mida —no plantilles—, amb usuaris i rols, domini propi, correu transaccional, generació de documents i facturació integrada. Una solució construïda a mida del teu negoci: obtens una llicència d\'ús indefinida sobre la teva plataforma i la propietat de les teves dades. La propietat intel·lectual i el codi són d\'Escala.',
      figVariant: 'platform',
      figLabels: ['PLATAFORMA', 'USUARIS · ROLS', 'DOMINI', 'CORREU', 'DOCUMENTS', 'FACTURACIÓ'],
      figCaption: 'FIG. 08 — ARQUITECTURA MODULAR',
    },
    {
      index: '03',
      title: 'Automatització i IA aplicada',
      problem: 'Tothom parla de IA; pocs l\'apliquen amb retorn.',
      deliverable:
        // SEO-01 §4.5 — "intel·ligència artificial aplicada" spelled out at
        // least once, not only the "IA" abbreviation.
        'Intel·ligència artificial aplicada a la teva operativa: integrem models de llenguatge i de visió on generen valor real i mesurable: menys tasques repetitives, anàlisi d\'imatges, millors decisions. IA aplicada amb criteri: on aporta, no on adorna.',
      figVariant: 'ai',
      figLabels: ['ENTRADA', 'PROCÉS', 'DECISIÓ', 'IA', 'ON APORTA'],
      figCaption: 'FIG. 09 — IA EN EL PROCÉS',
    },
    {
      index: '04',
      title: 'CTO i Product Leadership fraccional',
      problem: 'Necessites criteri directiu de producte i tecnologia, sense contractar un perfil a temps complet.',
      deliverable:
        'Visió tecnològica, roadmap, especificació funcional, priorització, gestió de proveïdors i iniciatives d\'innovació, amb experiència executiva real.',
      figVariant: 'product',
      figLabels: ['ARA', 'SEGÜENT', 'DESPRÉS', 'PRIORITAT'],
      figCaption: 'FIG. 10 — DIRECCIÓ DE PRODUCTE',
    },
    {
      index: '05',
      title: 'Operació, suport i evolució contínua',
      problem: 'El programari que no evoluciona, mor.',
      deliverable:
        'Mantenim la teva plataforma en producció, resolem incidències i la millorem cada mes a partir del feedback real dels teus usuaris. Amb traçabilitat completa del treball realitzat.',
      figVariant: 'evolve',
      figLabels: ['ÚS', 'FEEDBACK', 'MILLORA'],
      figCaption: 'FIG. 11 — EVOLUCIÓ CONTÍNUA',
    },
  ],

  idealClient: {
    eyebrow: 'B / ENCAIXEM?',
    title: 'Encaixem?',
    body: 'Treballem amb negocis sòlids la operativa dels quals ha crescut més ràpid que els seus sistemes: empreses familiars i pimes consolidades, negocis de nínxol B2B i companyies que volen incorporar IA amb retorn real. El requisit més important no és el sector ni la mida: és la voluntat de construir una relació de llarg termini.',
    cta: 'Parlem del teu negoci',
  },

  /**
   * Q&A block — SEO-01 §5.5 / §5.8. Recrafted, not translated word for word.
   * Figures per §0.4; CA formatting: 1.803.
   */
  faq: {
    sectionEyebrow: 'C / PREGUNTES FREQÜENTS',
    sectionIndex: 'C',
    heading: 'Preguntes freqüents',
    items: [
      {
        question:
          'En què es diferencia una plataforma a mida d\'un programari genèric?',
        answer:
          'Un programari genèric obliga la teva empresa a adaptar-se a com ho va pensar algú altre. Una plataforma a mida es construeix sobre el teu procés real, amb els teus rols i el teu vocabulari, i creix quan el teu negoci canvia. La diferència es nota sobretot en els processos que cap producte de catàleg no cobreix bé: els que avui viuen en fulls de càlcul i al cap de dues persones.',
      },
      {
        question: 'Com sé si la meva empresa està preparada per automatitzar processos?',
        answer:
          'Sol estar-ho quan el volum ha crescut més ràpid que els sistemes: els errors es repeteixen, la informació es busca en diversos llocs i l\'operativa depèn que no falti ningú. No cal tenir res digitalitzat prèviament. El que sí que cal és que el procés existeixi i que algú de dins el conegui a fons.',
      },
      {
        question: 'Quant tarda una plataforma a mida a estar en producció?',
        answer:
          'Depèn de l\'abast, però un cicle complet es mesura en mesos, no en anys. La plataforma de Magupell va passar de la primera conversa a producció en uns set mesos, entre el desembre del 2025 i el juliol del 2026, incloent-hi prototip aprovat, desenvolupament i preproducció.',
      },
      {
        question: 'On té sentit aplicar intel·ligència artificial al meu negoci?',
        answer:
          'On hi ha volum repetitiu o decisions que avui depenen de criteri expert dispers: anàlisi d\'imatges, classificació i extracció d\'informació, generació de documents, cerca interna. Integrem models de llenguatge i de visió només quan el retorn és mesurable. IA aplicada amb criteri: on aporta, no on adorna.',
      },
      {
        question: 'Necessito contractar un CTO a temps complet?',
        answer:
          'No sempre. Moltes empreses necessiten criteri directiu de producte i tecnologia unes hores al mes, no un sou a jornada completa: decidir què construir, en quin ordre, amb quins proveïdors i amb quina arquitectura. Això és el que cobreix la direcció de producte i tecnologia fraccional.',
      },
      {
        question: 'Treballeu amb empreses fora de Barcelona?',
        answer:
          'Sí. Som a Mataró (Barcelona) i treballem amb empreses de tot Espanya i d\'Europa. El model de treball és remot amb presència quan el projecte ho demana, i mai no ha estat una limitació.',
      },
    ],
  },
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
