/**
 * ClaimsMarquee — scrolling claims band.
 * ariaLabel comes from the locale-aware shared dictionary (SPEC-P5 FR-5).
 */

export function ClaimsMarquee({
  claims,
  ariaLabel,
}: {
  claims: readonly string[]
  ariaLabel: string
}) {
  // Duplicate the list so the CSS marquee animation loops seamlessly.
  const items = [...claims, ...claims]

  return (
    <div
      className="claims-marquee"
      aria-label={ariaLabel}
    >
      <div className="claims-marquee__track">
        {items.map((claim, i) => (
          <span
            aria-hidden={i >= claims.length}
            key={`${claim}-${i}`}
          >
            {claim}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
