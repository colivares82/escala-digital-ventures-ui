/**
 * Home page content — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import { sharedContent } from '@/content/ca/shared'
import { clients } from '@/content/es/clients'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  meta: {
    title: 'Escala Digital Ventures | Producte i Tecnologia',
    description:
      'Estudi de producte i tecnologia que automatitza operacions i construeix plataformes digitals per a empreses en creixement.',
  },

  header: sharedContent.header,

  labels: {
    hero: 'ESCALA DIGITAL VENTURES',
    problem: 'PUNT DE PARTIDA',
    symptoms: 'Símptomes operatius',
    services: 'CAPACITATS',
    framework: 'EL CICLE DE CREIXEMENT',
    frameworkLead: 'DEU FASES · UN CICLE CONTINU DE MILLORA',
    frameworkAria: 'Cicle de creixement de deu fases',
    phasePrefix: 'FASE',
    proof: 'EVIDÈNCIA',
    proofAttribution: 'EVIDÈNCIA VERIFICADA EN CLIENTS REALS',
    alliance: "MODEL D'ALIANÇA",
    allianceLegend: 'CADA ALIANÇA: PLA TÈCNIC · ESTRATÈGIC · VISIONARI',
  },

  diagrams: {
    hero: 'De processos manuals a valor real i mesurable mitjançant un sistema a mida',
    problem: 'Flux operatiu fragmentat entre fulls, correus i documents',
    proof: 'Evolució verificada de l\'operació',
    alliance: 'Cinc aliances, dedicació completa. Dues ocupades.',
  },

  /**
   * Hero narrative diagram (FIG.01) — SPEC-POLISH-01.
   * All copy comes from here; no hardcoded strings in the component.
   * Zone numbers and FIG number are not translated (kit grammar §3.3).
   */
  heroFigure: {
    zones: ['01 · PROCESSOS MANUALS', '02 · SISTEMA A MIDA', '03 · VALOR REAL I MESURABLE'],
    inputs: ['CORREUS', 'FULLS DE CÀLCUL', 'NOTES', 'CATÀLEG', 'HISTORIALS'],
    system: { title: '02 · SISTEMA A MIDA', innerLabel: 'ORDENA · MODELA' },
    outputs: [
      { label: 'INSIGHT', sub: 'Decisions i dades' },
      { label: 'OPTIMITZACIÓ', sub: 'de processos' },
    ],
    caption: 'FIG. 01 — DE MOLTS PROCESSOS MANUALS A VALOR REAL I MESURABLE',
  },

  hero: {
    eyebrow:
      'Escala Digital Ventures · Estudi de producte i tecnologia · Mataró, Barcelona',
    title: 'Automatitzem el teu negoci. Escalem amb tu.',
    description:
      'Convertim processos manuals en plataformes pròpies que creixen amb tu, amb la disciplina del programari empresarial global.',
    primaryCta: 'Parlem del teu negoci',
    secondaryCta: 'Com treballem',
  },

  claims: sharedContent.claims,

  problem: {
    title: 'El teu negoci funciona. Els teus sistemes, no.',
    body: 'Fulls de càlcul, correus, documents solts i el coneixement al cap de dues o tres persones. Funciona… fins que deixa de funcionar: el volum creix, els errors es multipliquen, la facturació es retarda i el negoci depèn que ningú es posi malalt. Escala entra exactament aquí: digitalitza i automatitza el cor operatiu de la teva empresa i el converteix en una plataforma pròpia sobre la qual pots créixer.',
    symptoms: [
      'volum que creix',
      'errors que es multipliquen',
      'facturació que es retarda',
      'dependència de persones',
    ],
  },

  services: {
    title: 'Què fem',
    action: 'Veure tots els serveis',
    items: [
      {
        title: 'Transformació digital i automatització de processos',
        text: 'Processos crítics que viuen en fulls de càlcul i al cap de les persones.',
      },
      {
        title: 'Desenvolupament de plataformes',
        text: 'El programari genèric no s\'adapta a la teva realitat.',
      },
      {
        title: 'Automatització i IA aplicada',
        text: 'Tothom parla de IA; pocs l\'apliquen amb retorn.',
      },
      {
        title: 'CTO i Product Leadership fraccional',
        text: 'Necessites criteri directiu de producte i tecnologia, sense contractar un perfil a temps complet.',
      },
      {
        title: 'Operació, suport i evolució contínua',
        text: 'El programari que no evoluciona, mor.',
      },
    ],
  },

  framework: {
    title: 'Un mètode propi: l\'Escala Growth Framework',
    description:
      'Deu fases que connecten negoci, persones, processos i tecnologia en un cicle continu de millora.',
    action: 'Com treballem',
    phases: [
      {
        name: 'Discover',
        description:
          'Comprendre profundament el negoci, els seus objectius, limitacions, oportunitats i processos. Escoltar abans de proposar.',
      },
      {
        name: 'Understand',
        description:
          'Modelar com funciona realment l\'organització, identificar colls d\'ampolla, dependències i fonts de fricció.',
      },
      {
        name: 'Simplify',
        description:
          'Eliminar complexitat innecessària abans d\'introduir tecnologia. Un mal procés automatitzat continua sent un mal procés.',
      },
      {
        name: 'Design',
        description:
          'Dissenyar l\'experiència, l\'arquitectura i el model operatiu pensant en escalabilitat, mantenibilitat i adopció.',
      },
      {
        name: 'Validate',
        description:
          'Validar hipòtesis ràpidament mitjançant prototips navegables, proves amb usuaris i lliuraments incrementals per reduir riscos abans d\'invertir en construcció.',
      },
      {
        name: 'Build',
        description:
          'Construir plataformes amb estàndards elevats d\'enginyeria, automatització, seguretat i qualitat.',
      },
      {
        name: 'Automate',
        description:
          'Automatitzar processos complets per reduir errors, augmentar productivitat i alliberar temps per a activitats de major valor.',
      },
      {
        name: 'Scale',
        description:
          'Preparar la plataforma i l\'organització per créixer sense necessitat de redissenys continus.',
      },
      {
        name: 'Measure',
        description:
          'Definir indicadors de negoci i mètriques tècniques que permetin mesurar l\'impacte real de cada iniciativa.',
      },
      {
        name: 'Evolve',
        description:
          'Entendre que cap producte no està acabat. La millora contínua forma part del model de col·laboració d\'Escala.',
      },
    ],
  },

  proof: {
    title: 'Fets, no promeses.',
    source: 'MAGUPELL',
    figures: [
      {
        value: '100+',
        label: 'REQUISITS',
        caption: 'implementats i verificats en producció',
      },
      {
        value: '200+',
        label: 'PROVES',
        caption: 'automatitzades sobre fluxos reals',
      },
      {
        value: 'JUL 2026',
        label: 'PRODUCCIÓ',
        caption: 'data verificada de posada en marxa',
      },
      {
        value: 'REAL',
        label: 'OPERATIVA',
        caption:
          'clients, proveïdors i gestió interna operant a la plataforma',
      },
    ],
    cases: clients,
  },

  alliance: {
    title: 'Cinc aliances. Tota la nostra dedicació.',
    body: 'Limitem deliberadament el nombre de clients actius per garantir dedicació, proximitat i acompanyament continu. No és una limitació: és el model.',
    action: "Coneix el model d'aliança",
  },

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
