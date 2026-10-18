/**
 * Home v2 sections 00–08 — EN (HOME-V2 §B.4).
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
    sectionIndex: { index: '00', label: 'For businesses that have outgrown their systems' },
    // H1 = existing approved claim (SPEC-P5 Appendix A) — not under review.
    title1: 'We automate your business. We scale with you.',
    kicker: 'Your business is growing. Your operations should too.',
    lead: 'We move your day-to-day off WhatsApp, spreadsheets and email into a system of your own, built around you, that organises the work and tells you what is happening in your business.',
    ctaPrimary: 'Tell us about your business ↗',
    ctaSecondary: 'Sound familiar? Take the test ↓',
    badge: 'Five alliances · 3 places left today',
    fig: {
      headers: ['TODAY · SCATTERED', 'WHAT YOU GAIN'],
      inputs: ['WHATSAPP', 'EXCEL', 'EMAIL', 'PAPER', 'CALLS'],
      coreTitle: 'YOUR SYSTEM',
      coreSub: 'BUILT AROUND YOU',
      outputs: [
        { title: 'CONTROL', sub: 'You know what is happening, today.' },
        { title: 'TIME', sub: 'Your team, on what matters.' },
      ],
      caption: 'FIG. 01 — From scattered operations to a system of your own',
      aria: 'Everything that is scattered today, in a single system built around you that gives you control and time',
    },
  },

  // REVIEW: Carlos
  teSuena: {
    sectionIndex: { index: '01', label: 'Sound familiar?' },
    title: 'How many of these have you said this week?',
    lead: 'Tick the ones you recognise. There are no wrong answers: we hear the same ones in almost every business that has grown fast.',
    answerLabel: 'With your system',
    phrases: [
      { quote: 'Does anyone know which Excel is the latest version?', answer: 'One place with the right data. Everyone sees the same thing.', span: 'wide', tilt: -1.2 },
      { quote: 'I already sent it to you on WhatsApp.', answer: 'Everything is recorded where it belongs, not lost in a chat.', span: 'half', tilt: 1.0 },
      { quote: 'Only Marta knows how to do that.', answer: 'The process lives in the system, not in one person’s head.', span: 'half', tilt: 0.6 },
      { quote: 'I can’t go on holiday: if I’m not here, everything stops.', answer: 'Your business keeps running even when you are away.', span: 'wide', tilt: -0.8 },
      { quote: 'I only found out at the end of the month.', answer: 'You see it the same day, while it can still be fixed.', span: 'half', tilt: 1.4 },
      { quote: 'Every location does it its own way.', answer: 'One standard for your whole team and your whole network.', span: 'half', tilt: -0.5 },
      { quote: 'Tonight I’ll sit down and reconcile the numbers.', answer: 'The numbers are already up to date. Your evening is yours.', span: 'wide', tilt: 0.9 },
      { quote: 'We’ll have to hire someone just to copy data.', answer: 'You grow without adding hours of copy and paste.', span: 'wide', tilt: -1.1 },
    ],
    panel: {
      label: 'Your result',
      of: '/ 8',
      scaleLow: 'Under control',
      scaleHigh: 'Holding it together',
      messages: {
        none: 'None, for now. If your operations are ahead of you, great. If that ever changes, we’ll be here.',
        low: 'It is starting to weigh. This is the best moment to sort it out: before it hurts.',
        mid: 'Your business has grown faster than its tools. And that can be fixed.',
        high: 'You are holding the business together by hand. That is exactly what we solve.',
      },
      cta: 'Tell us about your business',
      more: 'Or keep reading: this is how we solve it ↓',
    },
    closing: {
      lead: 'It is not a lack of effort or of people.',
      accent: 'Your business has simply grown faster than its tools.',
    },
  },
  // REVIEW: Carlos
  day: {
    sectionIndex: { index: '02', label: 'An ordinary Monday' },
    title: 'An ordinary Monday in your business.',
    lead: 'It is not a lack of will or of people. Your operations live in too many places, and every day costs a little more.',
    table: {
      cols: ['Time', 'Today', 'With your system'],
      mobileBefore: 'TODAY ·',
      mobileAfter: 'WITH YOUR SYSTEM ·',
      rows: [
        { time: '08:30', before: 'Thirty WhatsApp messages. Three are urgent; you don’t know which.', after: 'You open your dashboard: urgent things on top. The rest, already assigned.' },
        { time: '10:00', before: 'Which Excel is the latest? Two people are working on different copies.', after: 'One place with the right data. Everyone sees the same thing.' },
        { time: '12:30', before: 'A customer asks about their order. Nobody knows without calling someone.', after: 'The customer checks it themselves. Nobody has to stop.' },
        { time: '16:00', before: 'Someone is off sick and the process stops: only they knew where it stood.', after: 'The process lives in the system, not in one person’s head.' },
        { time: '20:30', before: 'You, at home, reconciling data to see how the month is going.', after: 'You, at home. The month’s numbers are already up to date.' },
      ],
    },
    closing: 'Sound familiar? That is what we solve.',
  },

  // REVIEW: Carlos
  scenarios: {
    sectionIndex: { index: '03', label: 'What it would look like for you' },
    title: 'What it would look like in your business.',
    lead: 'Three illustrative scenarios. Every business is different: that is why every solution is built to measure.',
    flowLabels: {
      before: 'TODAY',
      after: 'WITH YOUR SYSTEM',
      aria: 'Current flow compared with the flow with your system',
    },
    outcomeLabel: 'What changes',
    items: [
      {
        eyebrow: 'Scenario A · illustrative',
        title: 'Franchise network',
        problem: 'Several locations, and each runs its quality check its own way: on paper, with a WhatsApp photo… or not at all.',
        before: ['LOCATION', 'WHATSAPP', 'CENTRAL EXCEL'],
        after: ['MOBILE CHECKLIST', 'NETWORK PANEL', 'ALERT'],
        outcome: 'You see your whole network on one screen. You spot a problem the same day, not at month end. Every location works the same way.',
      },
      {
        eyebrow: 'Scenario B · illustrative',
        title: 'Field services',
        problem: 'Your technicians fill in paper job sheets. The office retypes them and payment arrives weeks late.',
        before: ['PAPER SHEET', 'OFFICE', 'LATE PAYMENT'],
        after: ['MOBILE SHEET', 'CLIENT SIGN-OFF', 'PAID ON TIME'],
        outcome: 'Fewer hours copying data. You get paid sooner. Your customer receives their report on the spot.',
      },
      {
        eyebrow: 'Scenario C · illustrative',
        title: 'Business-to-business orders',
        problem: 'Orders arrive by email, phone and WhatsApp. They are noted down by hand and some get lost along the way.',
        before: ['EMAIL', 'HAND NOTES', 'LOST ORDER'],
        after: ['CLIENT PORTAL', 'VISIBLE STATUS', 'AUTO NOTICE'],
        outcome: 'No order gets lost. Your customers order on their own, at any hour. Your team sells instead of transcribing.',
      },
    ],
  },

  // REVIEW: Carlos
  evidence: {
    sectionIndex: { index: '04', label: 'Evidence' },
    lead: 'This is no longer illustrative: it is what runs in production today, with verified data from a real client.',
  },
  // REVIEW: Carlos
  alliance: {
    sectionIndex: { index: '05', label: 'An alliance, not a supplier' },
    title: 'We don’t sell you software. We become your technology team.',
    lead: 'We work with five businesses at a time, not fifty. That is why we can commit as if the business were our own.',
    figCaption: 'FIG. 02 — Five seats · two active · three available',
    planes: [
      { label: 'Technical layer', title: 'We build it and look after it', body: 'We design, build and maintain your system. If something fails, we fix it. You get a technology team without having to create one.' },
      { label: 'Strategic layer', title: 'We decide with you what comes first', body: 'We prioritise by business impact: what to automate, what not to, and in what order. Every month, based on what your team actually uses.' },
      { label: 'Visionary layer', title: 'We tell you what is coming', body: 'AI, automation, data: we tell you what makes sense for your business and what is noise, before it becomes urgent.' },
    ],
    notLabel: 'What we are not',
    notMark: '✕',
    notItems: ['An agency that delivers and disappears', 'Generic templates', 'Technology for its own sake'],
    link: 'Discover the alliance model ↗',
  },

  // REVIEW: Carlos
  about: {
    sectionIndex: { index: '06', label: 'Who is behind it' },
    title: 'You talk to the person who builds it.',
    name: 'Carlos Olivares',
    role: 'Founder · Product Engineer',
    lead: 'More than twenty years building and leading enterprise software platforms with global reach. The same discipline, now at the service of five businesses, with direct contact and no intermediaries.',
    readouts: [
      { label: 'Track record', value: '20+ years', caption: 'Building and leading enterprise software platforms.' },
      { label: 'Reach', value: '40,000+', caption: 'Companies using platforms we have built and led.' },
      { label: 'Presence', value: '+100', caption: 'Countries. Global enterprise software standards.' },
      { label: 'Applied AI', value: 'MIT', caption: 'Certification in designing and building AI products.' },
    ],
    link: 'Meet Escala ↗',
  },

  // REVIEW: Carlos
  start: {
    sectionIndex: { index: '07', label: 'How we start' },
    title: 'Getting started is simple. And it doesn’t commit you to everything.',
    lead: 'We move in stages. You only go on to the next once the previous one has proven its value.',
    steps: [
      { n: '1', title: 'We talk', body: 'You tell us how your day-to-day works and what is holding your growth back. We listen before we propose.' },
      { n: '2', title: 'Diagnosis and proposal', body: 'We come back with what we would do and in what order. Clear, and in stages.' },
      { n: '3', title: 'Clickable prototype', body: 'You see your solution working before investing in building it. If it doesn’t convince you, we stop there.' },
    ],
    cta: { primary: 'Let’s talk about your business ↗', secondary: 'How we work ↗' },
  },

  // REVIEW: Carlos
  deepLinks: {
    sectionIndex: { index: '08', label: 'In depth' },
    items: [
      { label: 'What we do', title: 'Five lines, one alliance', line: 'From manual process to a platform of your own.', page: 'services' },
      { label: 'How we work', title: 'Escala Growth Framework', line: 'Ten phases, one continuous improvement cycle.', page: 'method' },
      { label: 'Case studies', title: 'Magupell and BioZero', line: 'Told with verifiable data.', page: 'cases' },
      { label: 'Alliance model', title: 'Five alliances', line: 'Our full dedication.', page: 'alliance' },
      { label: 'About Escala', title: 'DNA and manifesto', line: 'The experience behind Escala.', page: 'about' },
    ],
  },
} as const satisfies HomeLandingContent
