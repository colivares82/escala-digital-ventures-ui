/**
 * Shared email template chrome — SPEC-contact-email §6.2
 *
 * Email-safe building blocks for both transactional templates:
 *   - Table-based layout, 600px max width, inline styles only
 *   - NO <img> tags: the three-bar symbol is solid-colour table cells,
 *     the wordmark is letter-spaced text (§6.2, AC4)
 *   - Brand colours as literal hex (design tokens do not exist in mail clients)
 *   - System font stacks (Archivo / Instrument Sans / IBM Plex Mono do not load)
 *
 * These literals are a deliberate, documented exception to the no-hardcoded-hex
 * rule: mail clients strip <style> blocks and do not support CSS custom
 * properties, so inline hex is the only mechanism available.
 */

// ─── Brand palette (§6.2) ────────────────────────────────────────────────────

export const PAPER = '#F7F7F4'
export const INK = '#16181D'
export const ABISAL = '#0A2B45'
export const AMBER = '#FFB703'
export const AMBER_DARK = '#B85C00'
export const MUTED = '#6B6D72'
export const RULE = '#DCDCD6'
export const QUOTE_BG = '#EFEFEA'
export const PAGE_BG = '#EDEDE9'

// ─── Font stacks — system only (§6.2) ────────────────────────────────────────

export const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
export const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export const MAX_WIDTH_PX = 600

// ─── Company footer identity ─────────────────────────────────────────────────

export const COMPANY_LINE =
  'Escala Digital Ventures, S.L.U. · Mataró · Barcelona'

/**
 * Escapes user-supplied text for safe HTML interpolation (§6.2).
 *
 * Every field rendered into an email body MUST pass through this. Without it a
 * submitted message could inject markup into the notification Carlos opens.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Escapes user text and converts newlines to <br /> so the message body keeps
 * the line breaks the sender typed (§6.2 "Preserve line breaks").
 */
export function escapeHtmlWithBreaks(input: string): string {
  return escapeHtml(input).replace(/\r?\n/g, '<br />')
}

/**
 * The three-bar brand symbol + wordmark, drawn entirely with table cells.
 * No image, nothing to host, nothing for a mail client to block (§6.2).
 */
export function brandHeader(): string {
  const bar = (width: number): string =>
    `<tr><td style="width:${width}px;height:4px;background-color:${ABISAL};font-size:0;line-height:0;">&nbsp;</td></tr>`
  const gap =
    '<tr><td style="height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>'

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom:2px solid ${ABISAL};padding-bottom:20px;">
  <tr>
    <td valign="middle" style="width:38px;padding-right:12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        ${bar(26)}${gap}${bar(18)}${gap}${bar(22)}
      </table>
    </td>
    <td valign="middle">
      <div style="font-family:${SANS};font-size:18px;font-weight:700;letter-spacing:0.22em;color:${ABISAL};line-height:1;">ESCALA</div>
      <div style="font-family:${MONO};font-size:9px;letter-spacing:0.26em;color:${MUTED};line-height:1;padding-top:4px;">DIGITAL VENTURES</div>
    </td>
  </tr>
</table>`.trim()
}

/**
 * Monospace kicker row: a left label and a right-aligned reference/date.
 */
export function kicker(left: string, right: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding-top:22px;">
  <tr>
    <td style="font-family:${MONO};font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${AMBER_DARK};">${escapeHtml(left)}</td>
    <td align="right" style="font-family:${MONO};font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};">${escapeHtml(right)}</td>
  </tr>
</table>`.trim()
}

/**
 * Page heading — the "Marta Ruiz, de Textil Norte." / "Hola, Marta." line.
 */
export function heading(text: string): string {
  return `<h1 style="margin:18px 0 0;font-family:${SANS};font-size:22px;line-height:1.25;font-weight:600;letter-spacing:-0.01em;color:${INK};">${escapeHtml(text)}</h1>`
}

/**
 * Body paragraph. `lead` renders the larger opening paragraph.
 */
export function paragraph(text: string, lead = false): string {
  const size = lead ? '16px' : '15px'
  return `<p style="margin:16px 0 0;font-family:${SANS};font-size:${size};line-height:1.65;color:${INK};">${escapeHtml(text)}</p>`
}

/**
 * Definition-style field rows (Nombre / Empresa / Correo / Idioma).
 * Rows whose value is empty are omitted by the caller.
 */
export function fieldTable(rows: readonly (readonly [string, string])[]): string {
  const cells = rows
    .map(
      ([label, value]) => `
  <tr>
    <td valign="top" style="width:92px;padding:7px 14px 7px 0;font-family:${MONO};font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${MUTED};">${escapeHtml(label)}</td>
    <td valign="top" style="padding:7px 0;font-family:${SANS};font-size:14.5px;line-height:1.5;color:${INK};word-break:break-word;">${escapeHtml(value)}</td>
  </tr>`,
    )
    .join('')

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:20px;border-top:1px solid ${RULE};border-bottom:1px solid ${RULE};">${cells}
</table>`.trim()
}

/**
 * The amber-ruled quote block used for the submitted message in both emails.
 * `escapedBody` must already be escaped — callers pass escapeHtmlWithBreaks output.
 */
export function quoteBlock(label: string, escapedBody: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;background-color:${QUOTE_BG};border-left:3px solid ${AMBER};">
  <tr>
    <td style="padding:18px 20px;">
      <p style="margin:0 0 8px;font-family:${MONO};font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${AMBER_DARK};">${escapeHtml(label)}</p>
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};">${escapedBody}</p>
    </td>
  </tr>
</table>`.trim()
}

/**
 * Signature block — name over role. §8.1 pending Carlos's confirmation.
 */
export function signature(name: string, role: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:26px;border-top:1px solid ${RULE};">
  <tr>
    <td style="padding-top:16px;">
      <div style="font-family:${SANS};font-size:15px;font-weight:600;color:${INK};">${escapeHtml(name)}</div>
      <div style="font-family:${SANS};font-size:13px;color:${MUTED};padding-top:3px;">${escapeHtml(role)}</div>
    </td>
  </tr>
</table>`.trim()
}

/**
 * Wraps body HTML in the full email document: centred 600px table on the paper
 * background, with the shared footer.
 */
export function wrapDocument(
  title: string,
  bodyHtml: string,
  footerLines: readonly string[],
): string {
  const footer = footerLines
    .map(
      (line) =>
        `<p style="margin:0 0 6px;font-family:${SANS};font-size:12px;line-height:1.5;color:${MUTED};">${escapeHtml(line)}</p>`,
    )
    .join('\n        ')

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAGE_BG};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${PAGE_BG};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${MAX_WIDTH_PX}" style="max-width:${MAX_WIDTH_PX}px;width:100%;background-color:${PAPER};border:1px solid ${RULE};">
        <tr>
          <td style="padding:34px 36px 30px;">
${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:18px 36px 24px;border-top:1px solid ${RULE};">
        ${footer}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
