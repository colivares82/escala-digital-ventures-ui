/**
 * Home v2 sections 00–08 — CA (HOME-V2 §B.4).
 * REVIEW: Carlos — every string in this file is new (HOME-V2) and pending
 * register sign-off; each block is also marked inline. Brand names, the
 * approved H1 claim and verbatim figures are the only non-review strings.
 * Claims are recrafted, not word-for-word (glossary: docs/i18n-glossary.md).
 * Price rule: no price, amount, currency, discount or offer wording.
 */
import type { HomeLandingContent } from '@/content/types'

export const homeLandingContent = {
  // REVIEW: Carlos
  hero: {
    sectionIndex: { index: '00', label: 'Per a negocis que han crescut més de pressa que els seus sistemes' },
    // H1 = existing approved claim (SPEC-P5 Appendix A) — not under review.
    title1: 'Automatitzem el teu negoci. Escalem amb tu.',
    kicker: 'El teu negoci creix. La teva operativa també hauria de fer-ho.',
    lead: 'Passem el teu dia a dia de WhatsApp, fulls de càlcul i correus a un sistema propi, fet a la teva mida, que ordena la feina i et diu què passa al teu negoci.',
    ctaPrimary: 'Explica’ns el teu cas ↗',
    ctaSecondary: 'T’hi sents identificat? Fes la prova ↓',
    badge: 'Cinc aliances · avui queden 3 places',
    fig: {
      headers: ['AVUI · TOT REPARTIT', 'EL QUE GUANYES'],
      inputs: ['WHATSAPP', 'EXCEL', 'CORREUS', 'PAPER', 'TRUCADES'],
      coreTitle: 'EL TEU SISTEMA',
      coreSub: 'FET A LA TEVA MIDA',
      outputs: [
        { title: 'CONTROL', sub: 'Saps què passa, avui.' },
        { title: 'TEMPS', sub: 'El teu equip, en el que importa.' },
      ],
      caption: 'FIG. 01 — De l’operativa repartida al teu propi sistema',
      aria: 'Tot el que avui està repartit, en un sol sistema fet a la teva mida que et dona control i temps',
    },
  },

  // REVIEW: Carlos
  teSuena: {
    sectionIndex: { index: '01', label: 'T’hi sents identificat?' },
    title: 'Quantes d’aquestes frases has dit aquesta setmana?',
    lead: 'Marca les que reconeguis. No hi ha respostes dolentes: són les mateixes que sentim a gairebé tots els negocis que han crescut de pressa.',
    answerLabel: 'Amb el teu sistema',
    phrases: [
      { quote: 'Algú sap quina és l’última versió de l’Excel?', answer: 'Un sol lloc amb la dada bona. Tothom veu el mateix.', span: 'wide', tilt: -1.2 },
      { quote: 'Ja t’ho vaig enviar per WhatsApp.', answer: 'Cada cosa queda registrada on toca, no perduda en un xat.', span: 'half', tilt: 1.0 },
      { quote: 'Això només ho sap fer la Marta.', answer: 'El procés viu al sistema, no al cap d’una persona.', span: 'half', tilt: 0.6 },
      { quote: 'No puc marxar de vacances: si no hi soc, això s’atura.', answer: 'El teu negoci continua funcionant encara que tu no hi siguis.', span: 'wide', tilt: -0.8 },
      { quote: 'Me’n vaig assabentar a final de mes.', answer: 'Ho veus el mateix dia, quan encara té solució.', span: 'half', tilt: 1.4 },
      { quote: 'Cada local ho fa a la seva manera.', answer: 'Un mateix estàndard per a tot el teu equip i tota la teva xarxa.', span: 'half', tilt: -0.5 },
      { quote: 'Aquesta nit em poso a quadrar els números.', answer: 'Els números ja estan al dia. La teva nit, per a tu.', span: 'wide', tilt: 0.9 },
      { quote: 'Haurem de contractar algú només per passar dades.', answer: 'Creixes sense sumar hores de copiar i enganxar.', span: 'wide', tilt: -1.1 },
    ],
    panel: {
      label: 'El teu resultat',
      of: '/ 8',
      scaleLow: 'Sota control',
      scaleHigh: 'A pols',
      messages: {
        none: 'Cap, de moment. Si la teva operativa va per davant, genial. Si algun dia deixa d’anar-hi, aquí serem.',
        low: 'Comença a pesar. És el millor moment per ordenar-ho: abans que faci mal.',
        mid: 'El teu negoci ha crescut més de pressa que les seves eines. I això té solució.',
        high: 'Estàs sostenint el negoci a pols. Això és exactament el que resolem.',
      },
      cta: 'Explica’ns el teu cas',
      more: 'O continua llegint: així ho resolem ↓',
    },
    closing: {
      lead: 'No és falta d’esforç ni d’equip.',
      accent: 'És que el teu negoci ha crescut més de pressa que les seves eines.',
    },
  },
  // REVIEW: Carlos
  day: {
    sectionIndex: { index: '02', label: 'Un dilluns qualsevol' },
    title: 'Un dilluns qualsevol al teu negoci.',
    lead: 'No és falta de ganes ni d’equip. És que l’operativa viu repartida en massa llocs, i cada dia costa una mica més.',
    table: {
      cols: ['Hora', 'Avui', 'Amb el teu sistema'],
      mobileBefore: 'AVUI ·',
      mobileAfter: 'AMB EL TEU SISTEMA ·',
      rows: [
        { time: '08:30', before: 'Trenta missatges de WhatsApp. Tres són urgents; no saps quins.', after: 'Obres el teu panell: l’urgent, a dalt. La resta, ja assignat.' },
        { time: '10:00', before: 'Quina és l’última versió de l’Excel? Dues persones treballen sobre còpies diferents.', after: 'Un sol lloc amb la dada bona. Tothom veu el mateix.' },
        { time: '12:30', before: 'Un client pregunta per la seva comanda. Ningú ho sap sense trucar a algú.', after: 'El client ho consulta ell mateix. Ningú s’ha d’aturar.' },
        { time: '16:00', before: 'Algú està de baixa i el procés s’atura: només aquella persona sabia com anava.', after: 'El procés viu al sistema, no al cap d’una persona.' },
        { time: '20:30', before: 'Tu, a casa, quadrant dades per saber com va el mes.', after: 'Tu, a casa. Els números del mes ja estan al dia.' },
      ],
    },
    closing: 'T’hi sents identificat? Això és el que resolem.',
  },

  // REVIEW: Carlos
  scenarios: {
    sectionIndex: { index: '03', label: 'Com seria al teu negoci' },
    title: 'Com seria al teu negoci.',
    lead: 'Tres escenaris il·lustratius. Cada negoci és diferent: per això cada solució es construeix a mida.',
    flowLabels: {
      before: 'AVUI',
      after: 'AMB EL TEU SISTEMA',
      aria: 'Flux actual davant del flux amb el teu sistema',
    },
    outcomeLabel: 'Què canvia',
    items: [
      {
        eyebrow: 'Escenari A · il·lustratiu',
        title: 'Xarxa de franquícies',
        problem: 'Diversos locals, i cadascun fa la revisió de qualitat a la seva manera: en paper, amb una foto per WhatsApp… o no la fa.',
        before: ['LOCAL', 'WHATSAPP', 'EXCEL CENTRAL'],
        after: ['CHECKLIST MÒBIL', 'PANELL DE XARXA', 'ALERTA'],
        outcome: 'Veus tota la teva xarxa en una pantalla. Detectes un problema el mateix dia, no a final de mes. Tots els locals treballen igual.',
      },
      {
        eyebrow: 'Escenari B · il·lustratiu',
        title: 'Serveis de camp',
        problem: 'Els teus tècnics omplen parts en paper. L’oficina els passa a mà i el cobrament arriba setmanes tard.',
        before: ['PART EN PAPER', 'OFICINA', 'COBRAMENT TARD'],
        after: ['PART MÒBIL', 'SIGNATURA CLIENT', 'COBRAMENT AL DIA'],
        outcome: 'Menys hores copiant dades. Cobres abans. El teu client rep el seu informe al moment.',
      },
      {
        eyebrow: 'Escenari C · il·lustratiu',
        title: 'Comandes entre empreses',
        problem: 'Les comandes arriben per correu, telèfon i WhatsApp. S’apunten a mà i alguna es perd pel camí.',
        before: ['CORREU', 'APUNT A MÀ', 'COMANDA PERDUDA'],
        after: ['PORTAL CLIENT', 'ESTAT VISIBLE', 'AVÍS AUTOMÀTIC'],
        outcome: 'Cap comanda es perd. Els teus clients demanen sols, a qualsevol hora. El teu equip ven en lloc de transcriure.',
      },
    ],
  },

  // REVIEW: Carlos
  evidence: {
    sectionIndex: { index: '04', label: 'Evidència' },
    lead: 'Això ja no és il·lustratiu: és el que funciona avui en producció, amb dades verificades en un client real.',
  },
  // REVIEW: Carlos
  alliance: {
    sectionIndex: { index: '05', label: 'Una aliança, no un proveïdor' },
    title: 'No et venem un programa. Ens convertim en el teu equip de tecnologia.',
    lead: 'Treballem amb cinc negocis alhora, no amb cinquanta. Per això ens podem implicar com si el negoci fos nostre.',
    figCaption: 'FIG. 02 — Cinc places · dues actives · tres disponibles',
    planes: [
      { label: 'Pla tècnic', title: 'Ho construïm i en tenim cura', body: 'Dissenyem, construïm i mantenim el teu sistema. Si alguna cosa falla, ho resolem nosaltres. Tens un equip de tecnologia sense haver de crear-lo.' },
      { label: 'Pla estratègic', title: 'Decidim amb tu què va primer', body: 'Prioritzem per impacte al teu negoci: què automatitzar, què no i en quin ordre. Cada mes, sobre el que el teu equip fa servir de veritat.' },
      { label: 'Pla visionari', title: 'T’expliquem el que ve', body: 'IA, automatització, dades: et diem què té sentit per al teu negoci i què és soroll, abans que es converteixi en urgència.' },
    ],
    notLabel: 'El que no som',
    notMark: '✕',
    notItems: ['Una agència que lliura i desapareix', 'Plantilles genèriques', 'Tecnologia per la tecnologia'],
    link: 'Coneix el model d’aliança ↗',
  },

  // REVIEW: Carlos
  about: {
    sectionIndex: { index: '06', label: 'Qui hi ha al darrere' },
    title: 'Parles amb qui ho construeix.',
    name: 'Carlos Olivares',
    role: 'Fundador · Product Engineer',
    lead: 'Més de vint anys construint i dirigint plataformes de programari empresarial d’abast global. Aquesta mateixa disciplina, ara al servei de cinc negocis, amb tracte directe i sense intermediaris.',
    readouts: [
      { label: 'Trajectòria', value: '20+ anys', caption: 'Construint i dirigint plataformes de programari empresarial.' },
      { label: 'Abast', value: '40.000+', caption: 'Empreses que fan servir plataformes que hem construït i dirigit.' },
      { label: 'Presència', value: '+100', caption: 'Països. Estàndards de programari empresarial global.' },
      { label: 'IA aplicada', value: 'MIT', caption: 'Certificació en disseny i construcció de productes d’IA.' },
    ],
    link: 'Coneix Escala ↗',
  },

  // REVIEW: Carlos
  start: {
    sectionIndex: { index: '07', label: 'Com comencem' },
    title: 'Començar és senzill. I no et compromet a tot.',
    lead: 'Avancem per etapes. Només passes a la següent quan l’anterior t’ha demostrat el seu valor.',
    steps: [
      { n: '1', title: 'Parlem', body: 'Ens expliques com funciona el teu dia a dia i què frena el teu creixement. Escoltem abans de proposar.' },
      { n: '2', title: 'Diagnòstic i proposta', body: 'Et tornem què faríem i en quin ordre. Clar i per etapes.' },
      { n: '3', title: 'Prototip navegable', body: 'Veus la teva solució funcionant abans d’invertir a construir-la. Si no et convenç, no seguim.' },
    ],
    cta: { primary: 'Parlem del teu negoci ↗', secondary: 'Com treballem ↗' },
  },

  // REVIEW: Carlos
  deepLinks: {
    sectionIndex: { index: '08', label: 'A fons' },
    items: [
      { label: 'Què fem', title: 'Cinc línies, una aliança', line: 'Del procés manual a la plataforma pròpia.', page: 'services' },
      { label: 'Com treballem', title: 'Escala Growth Framework', line: 'Deu fases, un cicle continu de millora.', page: 'method' },
      { label: 'Casos d’èxit', title: 'Magupell i BioZero', line: 'Explicats amb dades verificables.', page: 'cases' },
      { label: 'Model d’aliança', title: 'Cinc aliances', line: 'Tota la nostra dedicació.', page: 'alliance' },
      { label: 'Sobre Escala', title: 'ADN i manifest', line: 'L’experiència darrere d’Escala.', page: 'about' },
    ],
  },
} as const satisfies HomeLandingContent
