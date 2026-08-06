/**
 * Què fem — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  meta: {
    title: 'Què fem | Escala Digital Ventures',
    description:
      'Automatització, plataformes a mida, IA aplicada i CTO fraccional per a empreses en creixement.',
  },

  pageHeader: {
    eyebrow: 'A / QUÈ FEM',
    title: 'Què fem',
    lead: 'No oferim un catàleg de serveis: dissenyem cada col·laboració al voltant dels objectius del teu negoci. Aquestes són les cinc línies que gairebé sempre es combinen dins d\'una mateixa aliança.',
    problemPrefix: 'EL PROBLEMA',
  },

  services: [
    {
      index: '01',
      title: 'Transformació digital i automatització de processos',
      problem: 'Processos crítics que viuen en fulls de càlcul i al cap de les persones.',
      deliverable:
        'Analitzem processos, eines i fluxos per simplificar, automatitzar i modernitzar: des de la captura del dada en origen fins a la facturació i l\'informe final.',
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
        'Integrem models de llenguatge i de visió on generen valor real i mesurable: menys tasques repetitives, anàlisi d\'imatges, millors decisions. IA aplicada amb criteri: on aporta, no on adorna.',
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
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
