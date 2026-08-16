/**
 * Sender confirmation email — SPEC-contact-email §5.1(2)
 *
 * Sent to the person who submitted the form. Reply-To is CONTACT_FROM so
 * replies land in the shared inbox, not on an individual.
 *
 * Spanish only, by deliberate v1 decision (§5.3).
 *
 * Deliberately contains NO links and NO buttons (§8.4): the recipient has
 * nothing to do but wait, and buttons would make it read like a newsletter.
 *
 * Layout and copy follow specs/mockups/WIRE-contact-emails.html (email 2).
 */

import {
  COMPANY_LINE,
  brandHeader,
  escapeHtmlWithBreaks,
  heading,
  kicker,
  paragraph,
  quoteBlock,
  signature,
  wrapDocument,
} from './shared'
import type { RenderedEmail } from './notification'

export interface ConfirmationInput {
  name: string
  blocker: string
  /** Formatted date, e.g. "14 ago 2026". */
  sentAt: string
}

export const CONFIRMATION_SUBJECT =
  'Hemos recibido tu mensaje — Escala Digital Ventures'

const KICKER_LABEL = 'Mensaje recibido'
const QUOTE_LABEL = 'Esto es lo que nos has enviado'

// §6.3 — "dos días laborables" must appear verbatim. Do NOT soften this to
// "a la mayor brevedad" or any equivalent: the site makes the same promise.
const LEAD =
  'Hemos recibido tu mensaje y lo vamos a leer con calma. Te responderemos personalmente en un plazo de dos días laborables — no con una plantilla, sino con una primera lectura de lo que nos cuentas.'

// §8.3 — pending Carlos's confirmation before merge.
const HONESTY_LINE =
  'Escuchamos antes de proponer. Si vemos que no somos el socio adecuado para lo que necesitas, también te lo diremos.'

// §8.1 — pending Carlos's confirmation before merge.
const SIGNATURE_NAME = 'Carlos Olivares'
const SIGNATURE_ROLE = 'Director General · Escala Digital Ventures'

const FOOTER_CONTACT = `${COMPANY_LINE} · hola@escaladigitalventures.com`
const FOOTER_DISCLAIMER =
  'Si no has escrito tú a través de escaladigitalventures.com, puedes ignorar este mensaje: no haremos nada más con él.'

export function renderConfirmationEmail(
  input: ConfirmationInput,
): RenderedEmail {
  const { name, blocker, sentAt } = input

  const body = [
    brandHeader(),
    kicker(KICKER_LABEL, sentAt),
    heading(`Hola, ${name}.`),
    paragraph(LEAD, true),
    paragraph(HONESTY_LINE),
    quoteBlock(QUOTE_LABEL, escapeHtmlWithBreaks(blocker)),
    signature(SIGNATURE_NAME, SIGNATURE_ROLE),
  ].join('\n')

  const html = wrapDocument(CONFIRMATION_SUBJECT, body, [
    FOOTER_CONTACT,
    FOOTER_DISCLAIMER,
  ])

  // Plain-text alternative (§6.2).
  const text = [
    'ESCALA DIGITAL VENTURES',
    `${KICKER_LABEL} · ${sentAt}`,
    '',
    `Hola, ${name}.`,
    '',
    LEAD,
    '',
    HONESTY_LINE,
    '',
    `${QUOTE_LABEL}:`,
    blocker,
    '',
    SIGNATURE_NAME,
    SIGNATURE_ROLE,
    '',
    '—',
    FOOTER_CONTACT,
    FOOTER_DISCLAIMER,
  ].join('\n')

  return { subject: CONFIRMATION_SUBJECT, html, text }
}
