/**
 * Model d'aliança — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * CONTENT-11: commercial terms are NEVER published on this site. They are
 * agreed privately with each client during commercial negotiation. Do not
 * reintroduce contractual wording here — the blocklist in
 * tests/content/ownership-guard.test.ts fails the build on any such term.
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  // SEO-01 §3.3 — primary term: "soci tecnològic per a pimes".
  meta: {
    title: "Soci tecnològic per a pimes: el model d'aliança",
    description:
      'Només cinc aliances actives. Acompanyament tècnic, estratègic i visionari, exclusivitat al teu sector i suport continu amb traçabilitat completa.',
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
        body: 'No es construeix res sense especificació prèvia: requisits, casos límit i criteris d\'acceptació.',
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
   * Q&A block — SEO-01 §5.7 / §5.8. Exactly 5 items.
   *
   * CONTENT-11: contractual ownership and licence terms are never published
   * here. Item 2 is an onboarding question ("Com comença una aliança?");
   * item 3 answers continuity in operational terms only.
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
        question: 'Com comença una aliança?',
        answer:
          'Amb una conversa sobre el teu negoci, no sobre tecnologia. Si hi veiem encaix, analitzem a fons el procés que més et frena i definim un primer abast acotat, amb la seva especificació i el seu prototip, abans de comprometre res més gran. D\'aquí surt una proposta concreta: què es construeix primer, en quant temps i amb quina inversió.',
      },
      {
        question: 'Què passa si deixem de treballar junts?',
        answer:
          'La teva plataforma continua operativa i les teves dades se\'t retornen íntegres, en formats estàndard i sense retencions. Les condicions de continuïtat s\'acorden per escrit al principi de l\'aliança, no quan arriba el moment.',
      },
      {
        question: 'Podríeu treballar amb la meva competència?',
        answer:
          'No amb el mateix sistema. Cada aliança inclou exclusivitat sectorial: no reutilitzem la teva plataforma ni les seves millores per a competidors teus en el teu sector.',
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
