/**
 * Model d'aliança — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Ownership note: commitment 01 uses the corrected "A MIDA" framing.
 * DO NOT add any "client owns the code" wording here.
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  // SEO-01 §3.3 — primary term: "soci tecnològic per a pimes".
  meta: {
    title: "Soci tecnològic per a pimes: el model d'aliança",
    description:
      "Només cinc aliances actives. Acompanyament tècnic, estratègic i visionari, llicència d'ús indefinida sobre la plataforma i propietat de les teves dades.",
  },

  pageHeader: {
    eyebrow: "A / MODEL D'ALIANÇA",
    title: 'Cinc aliances. Tota la nostra dedicació.',
    // SEO-01 §4.6 — must contain "soci tecnològic" explicitly.
    lead: 'Treballem com a soci tecnològic d\'un nombre reduït d\'empreses. No busquem projectes; busquem socis. I triem els nostres socis tant com ells ens trien a nosaltres.',
  },

  whyFive: {
    sectionEyebrow: 'B / PER QUÈ NOMÉS CINC',
    heading: 'Per què només cinc',
    body: 'Limitem deliberadament el nombre de clients actius —aproximadament cinc aliances— per garantir dedicació, proximitat i acompanyament continu. No és una limitació: és el model de negoci. Cada client rep una implicació profunda i accés directe al coneixement estratègic acumulat.',
    constellationAria: "FIG. 05 — Constel·lació d'aliances: cinc places al voltant d'Escala, dues ocupades (Magupell, BioZero) i tres disponibles.",
  },

  seats: [
    { name: 'Magupell', state: 'occupied' },
    { name: 'BioZero',  state: 'occupied' },
    { name: 'DISPONIBLE', state: 'free' },
    { name: 'DISPONIBLE', state: 'free' },
    { name: 'DISPONIBLE', state: 'free' },
  ],

  planes: {
    sectionEyebrow: "C / TRES PLANS D'ACOMPANYAMENT",
    heading: "Tres plans d'acompanyament",
    lead: 'Cada aliança rep acompanyament simultani en tres plans.',
    items: [
      {
        index: '01',
        title: 'Tècnic',
        body: 'Dissenyem, construïm, despleguem i operem la teva plataforma de principi a fi: arquitectura, desenvolupament full-stack, cloud, seguretat, proves, monitorització i suport continu. La capacitat d\'un departament tècnic complet sense haver de crear-lo.',
        depth: 'ARQUITECTURA · CODI · OPERACIÓ',
      },
      {
        index: '02',
        title: 'Estratègic',
        body: 'Direcció externa de producte i tecnologia: prioritzem el roadmap, traduïm necessitats de negoci en especificacions executables, decidim què construir, què no i en quin ordre, i mesurem l\'impacte de cada iteració.',
        depth: 'ROADMAP · PRIORITAT · IMPACTE',
      },
      {
        index: '03',
        title: 'Visionari',
        body: 'Aportem perspectiva sobre cap on van el programari, l\'automatització i la IA, i t\'ajudem a anticipar-te: quins processos automatitzar després, quines dades capturar avui per explotar demà, quines capacitats de IA tenen sentit per al teu sector i quines són soroll.',
        depth: 'ANTICIPACIÓ · DADES · IA',
      },
    ],
  },

  commitments: {
    sectionEyebrow: "D / COMPROMISOS DE CADA ALIANÇA",
    heading: 'Compromisos de cada aliança',
    items: [
      {
        n: '01',
        tag: 'A MIDA',
        body: 'Solucions ajustades a les necessitats i oportunitats reals del teu negoci — no plantilles.',
      },
      {
        n: '02',
        tag: 'ESPECIFICACIÓ',
        body: 'Cada funcionalitat s\'especifica i s\'aprova abans de construir-se.',
      },
      {
        n: '03',
        tag: 'QUALITAT',
        body: 'Es demostra amb proves automatitzades i estabilitat en producció, no amb promeses.',
      },
      {
        n: '04',
        tag: 'SUPORT',
        body: 'Continu, traçable i transparent en la seva facturació.',
      },
      {
        n: '05',
        tag: 'MESURA',
        body: 'Un únic indicador final: el creixement i l\'eficiència del teu negoci.',
      },
    ],
  },

  /**
   * Q&A block — SEO-01 §5.7 / §5.8.
   * OWNERSHIP: the client owns their DATA and holds an indefinite use LICENCE;
   * IP and source code belong to Escala. Never say the client owns the code.
   */
  faq: {
    sectionEyebrow: 'E / PREGUNTES FREQÜENTS',
    sectionIndex: 'E',
    heading: 'Preguntes freqüents',
    items: [
      {
        question: 'Per què només cinc clients?',
        answer:
          'Perquè la dedicació no es pot repartir indefinidament. Amb cinc aliances actives podem conèixer cada negoci a fons, respondre ràpid i acompanyar en el pla tècnic, l\'estratègic i el visionari. No és una limitació de capacitat: és el model de negoci, i és el que separa un soci d\'un proveïdor.',
      },
      {
        question: 'De qui és el codi i de qui són les dades?',
        answer:
          'Les dades són enterament teves: les posseeixes, les exportes quan vulguis i se\'t retornen íntegres al final de la relació. La propietat intel·lectual i el codi font són d\'Escala, i tu reps una llicència d\'ús exclusiva, intransferible i per temps indefinit per operar la teva plataforma amb usuaris il·limitats.',
      },
      {
        question: 'Què passa si deixem de treballar junts?',
        answer:
          'La llicència d\'ús sobreviu al final del suport: mai no et quedes sense la teva eina. Les teves dades se\'t retornen completes. Les obligacions de confidencialitat i les restriccions sectorials continuen vigents després que acabi la relació.',
      },
      {
        question: 'Podríeu treballar amb la meva competència?',
        answer:
          'No amb el mateix sistema. Cada aliança inclou exclusivitat sectorial: no reutilitzem la teva plataforma ni les seves millores per a competidors teus en el teu sector. És la contrapartida natural que la propietat intel·lectual sigui nostra.',
      },
      {
        question: 'Què inclou exactament una aliança?',
        answer:
          'Disseny, construcció, desplegament i operació de la teva plataforma; direcció externa de producte i tecnologia per decidir què construir i en quin ordre; i perspectiva sobre què automatitzar després i quines dades començar a capturar avui. Tot amb especificació prèvia, qualitat verificable i facturació traçable del temps dedicat.',
      },
    ],
  },
} as const satisfies AllianceDictionary

export type AllianceContent = typeof allianceContent
