/**
 * Email transport — SPEC-contact-email §5, §6.1
 *
 * SMTP (Google Workspace) via nodemailer, STARTTLS on port 587.
 * Replaces the previous Resend HTTP integration: mail now originates from the
 * Workspace domain whose SPF/DKIM/DMARC records were configured in
 * RUNBOOK-workspace-dns.md.
 *
 * Config (all via env — NEVER hardcoded, AC3):
 *   SMTP_HOST          = smtp.gmail.com
 *   SMTP_PORT          = 587
 *   SMTP_USER          = <workspace mailbox>
 *   SMTP_PASSWORD      = <App Password, from Secret Manager>
 *   CONTACT_TO         = <internal inbox>   (server-only, never in client code)
 *   CONTACT_FROM       = hola@escaladigitalventures.com
 *   CONTACT_FROM_NAME  = Escala Digital Ventures
 *
 * DRY_RUN mode (EMAIL_DRY_RUN=true OR no SMTP_PASSWORD): logs what would be
 * sent instead of connecting. This is the default for local development so a
 * dev machine can never send real mail (§4).
 */

import nodemailer, { type Transporter } from 'nodemailer'
import {
  renderNotificationEmail,
  type RenderedEmail,
} from './email/templates/notification'
import { renderConfirmationEmail } from './email/templates/confirmation'

export interface ContactPayload {
  name: string
  company: string
  email: string
  blocker: string
  locale?: string
  timestamp?: string
}

// ─── Env config ───────────────────────────────────────────────────────────────

const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? '587', 10)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASSWORD = process.env.SMTP_PASSWORD

const CONTACT_TO = process.env.CONTACT_TO
const CONTACT_FROM = process.env.CONTACT_FROM
const CONTACT_FROM_NAME =
  process.env.CONTACT_FROM_NAME ?? 'Escala Digital Ventures'

// DRY_RUN when explicitly enabled or when no SMTP password exists (safe local dev)
const IS_DRY_RUN = process.env.EMAIL_DRY_RUN === 'true' || !SMTP_PASSWORD

// Timeouts so a hung SMTP session cannot hold the request open indefinitely (§6.1)
const SMTP_CONNECTION_TIMEOUT_MS = 10_000
const SMTP_GREETING_TIMEOUT_MS = 10_000
const SMTP_SOCKET_TIMEOUT_MS = 20_000

// Locale label shown in the notification body
const LOCALE_LABELS: Record<string, string> = {
  es: 'Español',
  en: 'Inglés',
  ca: 'Catalán',
}

// ─── Transport ────────────────────────────────────────────────────────────────

let cachedTransporter: Transporter | null = null

/**
 * Lazily creates the SMTP transporter. Cached so a warm Cloud Run instance
 * reuses the connection pool instead of reconnecting per request.
 */
function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // STARTTLS upgrade on 587 (§6.1)
    requireTLS: true,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
    greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
    socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
  })

  return cachedTransporter
}

interface SendArgs {
  to: string
  replyTo: string
  email: RenderedEmail
}

async function send({ to, replyTo, email }: SendArgs): Promise<void> {
  if (IS_DRY_RUN) {
    // No SMTP connection — log the envelope so the flow can be verified locally.
    // Addresses redacted: this branch runs wherever credentials are absent.
    console.log('[email:DRY_RUN]', {
      to: '[redacted]',
      replyTo: '[redacted]',
      from: `${CONTACT_FROM_NAME} <${CONTACT_FROM ?? 'unset'}>`,
      subject: email.subject,
      htmlBytes: email.html.length,
      textBytes: email.text.length,
    })
    return
  }

  if (!CONTACT_FROM) {
    throw new Error('CONTACT_FROM env var is missing — cannot send email')
  }

  await getTransporter().sendMail({
    from: { name: CONTACT_FROM_NAME, address: CONTACT_FROM },
    to,
    replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  })
}

// ─── Formatting ───────────────────────────────────────────────────────────────

/** "14 ago 2026 · 11:42 CEST" (withTime) or "14 ago 2026". */
function formatSentAt(iso: string, withTime: boolean): string {
  const date = new Date(iso)
  const base: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  }
  const opts: Intl.DateTimeFormatOptions = withTime
    ? {
        ...base,
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }
    : base

  return new Intl.DateTimeFormat('es-ES', opts).format(date)
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Notification to the internal inbox (CONTACT_TO).
 * Reply-To is the submitter so Carlos can reply directly from Gmail (AC6).
 *
 * Throws on failure — the API route converts this to an error response,
 * because a lost lead must never be shown to the user as success (§5.2).
 */
export async function sendContactNotification(
  payload: ContactPayload,
): Promise<void> {
  if (!CONTACT_TO && !IS_DRY_RUN) {
    throw new Error('CONTACT_TO env var is missing — cannot send notification')
  }

  const locale = payload.locale ?? 'es'
  const email = renderNotificationEmail({
    name: payload.name,
    company: payload.company,
    email: payload.email,
    blocker: payload.blocker,
    locale: LOCALE_LABELS[locale] ?? locale,
    sentAt: formatSentAt(payload.timestamp ?? new Date().toISOString(), true),
  })

  await send({
    to: CONTACT_TO ?? '',
    replyTo: payload.email, // AC6
    email,
  })
}

/**
 * Spanish confirmation to the person who submitted the form (§5.1).
 * Reply-To is the shared inbox so replies do not land on an individual.
 *
 * Throws on failure; the caller logs and still returns success, because the
 * lead is already captured and the courtesy email is not worth failing on (§5.2).
 */
export async function sendContactConfirmation(
  payload: ContactPayload,
): Promise<void> {
  const email = renderConfirmationEmail({
    name: payload.name,
    blocker: payload.blocker,
    sentAt: formatSentAt(payload.timestamp ?? new Date().toISOString(), false),
  })

  await send({
    to: payload.email,
    replyTo: CONTACT_FROM ?? '',
    email,
  })
}
