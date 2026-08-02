type ScaleRuleProps = {
  variant?: "hero" | "divider"
  className?: string
}

export function ScaleRule({ variant = "divider", className = "" }: ScaleRuleProps) {
  return (
    <div className={`scale-rule ${variant === "hero" ? "scale-rule--hero" : ""} ${className}`} aria-hidden="true">
      {Array.from({ length: 41 }, (_, index) => (
        <span className={index % 10 === 0 ? "scale-rule__tick scale-rule__tick--major" : "scale-rule__tick"} key={index} />
      ))}
    </div>
  )
}

type FrameworkRuleProps = { phases: readonly string[] }

export function FrameworkRule({ phases }: FrameworkRuleProps) {
  return (
    <ol className="framework-rule" aria-label="Las diez fases del Escala Growth Framework">
      {phases.map((phase, index) => (
        <li className="framework-rule__phase" key={phase}>
          <span className="framework-rule__tick" aria-hidden="true" />
          <span className="font-mono text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-mono text-xs font-medium uppercase tracking-wider">{phase}</span>
        </li>
      ))}
    </ol>
  )
}
