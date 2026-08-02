type ScaleRuleProps = {
  variant?: "hero" | "divider"
  className?: string
}

export function ScaleRule({ className = "" }: ScaleRuleProps) {
  return (
    <div className={`scale-rule ${className}`} aria-hidden="true">
      {Array.from({ length: 21 }, (_, index) => (
        <span className={index % 5 === 0 ? "scale-rule__tick scale-rule__tick--major" : "scale-rule__tick"} key={index} />
      ))}
    </div>
  )
}

type FrameworkRuleProps = {
  phases: readonly string[]
}

export function FrameworkRule({ phases }: FrameworkRuleProps) {
  return (
    <ol className="framework-rule" aria-label="Las diez fases del Escala Growth Framework">
      {phases.map((phase, index) => {
        const isActive = index === 5

        return (
          <li className="framework-rule__phase" data-active={isActive || undefined} key={phase}>
            <span className="framework-rule__tick" aria-hidden="true" />
            <span className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider">{phase}</span>
          </li>
        )
      })}
    </ol>
  )
}
