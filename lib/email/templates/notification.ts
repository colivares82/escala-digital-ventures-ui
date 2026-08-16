/**
 * Internal notification email — SPEC-contact-email §5.1(1)
 *
 * Sent to CONTACT_TO on every valid submission. Reply-To is set to the
 * submitter's address by the transport, so replying from Gmail reaches the
 * client directly (AC6).
 *
 * Spanish only, by deliberate v1 decision (§5.3) — this module is the single
 * locale source for email copy and is intentionally NOT in content/{es,en,ca}/.
 *
 * Layout and copy follow specs/mockups/WIRE-contact-emails.html (email 1).
 */

import {
  COMPANY_LINE,
  brandHeader,
  escapeHtmlWithBreaks,
  fieldTable,
  heading,
  kicker,
  paragraph,
  quoteBlock,
  wrapDocument,
} from './shared'

export interface NotificationInput {
  name: string
  company: string
  email: string
  blocker: string
  locale: string
  /** Formatted timestamp, e.g. "14 ago 2026 · 11:42 CEST". */
  sentAt: string
}

export interface RenderedEmail {
  subject: string
  html: string
  text: string
}

const KICKER_LABEL = 'Formulario web'
const QUOTE_LABEL = '¿Qué frena tu crecimiento?'
const REPLY_HINT = 'Responde a este correo para contestarle directamente.'

/**
 * Subject: "Nuevo mensaje desde la web — {nombre} ({empresa})".
 * The parenthetical is omitted when company is empty (§5.1).
 */
export function notificationSubject(name: string, company: string): string {
  const base = `Nuevo mensaje desde la web — ${name}`
  return company ? `${base} (${company})` : base
}

/**
 * Heading: "Marta Ruiz, de Textil Norte." — falls back to just the name when
 * no company was supplied.
 */
function notificationHeading(name: string, company: string): string {
  return company ? `${name}, de ${company}.` : `${name}.`
}

export function renderNotificationEmail(
  input: NotificationInput,
): RenderedEmail {
  const { name, company, email, blocker, locale, sentAt } = input

  // Empty company: the row disappears entirely rather than rendering blank.
  const rows: (readonly [string, string])[] = [['Nombre', name]]
  if (company) rows.push(['Empresa', company])
  rows.push(['Correo', email])
  rows.push(['Idioma', `${locale} · enviado desde /contacto`])

  const body = [
    brandHeader(),
    kicker(KICKER_LABEL, sentAt),
    heading(notificationHeading(name, company)),
    fieldTable(rows),
    quoteBlock(QUOTE_LABEL, escapeHtmlWithBreaks(blocker)),
    paragraph(REPLY_HINT),
  ].join('\n')

  const html = wrapDocument(notificationSubject(name, company), body, [
    COMPANY_LINE,
  ])

  // Plain-text alternative — HTML-only mail scores badly with spam filters (§6.2).
  const text = [
    'ESCALA DIGITAL VENTURES',
    `${KICKER_LABEL} · ${sentAt}`,
    '',
    notificationHeading(name, company),
    '',
    `Nombre:  ${name}`,
    ...(company ? [`Empresa: ${company}`] : []),
    `Correo:  ${email}`,
    `Idioma:  ${locale} · enviado desde /contacto`,
    '',
    `${QUOTE_LABEL}`,
    blocker,
    '',
    REPLY_HINT,
    '',
    '—',
    COMPANY_LINE,
  ].join('\n')

  return { subject: notificationSubject(name, company), html, text }
}
