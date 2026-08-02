const paths = [
  "M20 60H72L94 30H142L164 60H220", "M20 30H66V86H120V30H220", "M20 82L62 40L104 82L146 40L220 82",
  "M20 58C54 10 86 106 120 58S186 10 220 58", "M20 30H80V86H160V30H220", "M20 58H76L104 24L140 92L170 58H220",
  "M20 86V30H76V86H132V30H188V86H220", "M20 30L70 86L120 30L170 86L220 30", "M20 58H52C80 58 80 24 108 24S136 92 164 92S192 58 220 58",
  "M20 84L58 34L96 68L134 26L172 60L220 28",
]

export function PhaseIllustration({ index }: { index: number }) {
  return (
    <svg className="phase-art" viewBox="0 0 240 116" role="img" aria-label={`Diagrama técnico de la fase ${index + 1}`}>
      <path d={paths[index % paths.length]} fill="none" vectorEffect="non-scaling-stroke" />
      {[20, 70, 120, 170, 220].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 34 : 82} r="3" />)}
      <path className="phase-art__accent" d={`M${30 + index * 8} 104H${80 + index * 8}`} />
    </svg>
  )
}

export function ProblemIllustration() {
  return (
    <svg className="problem-art" viewBox="0 0 520 320" role="img" aria-label="Flujo fragmentado entre procesos manuales y herramientas desconectadas">
      <g fill="none">
        <path d="M28 72C120 72 90 246 210 246S300 52 486 52" />
        <path d="M28 160C118 160 122 86 220 86S320 270 486 270" />
        <path d="M28 254C138 254 138 148 262 148S376 166 486 166" />
        <path className="problem-art__accent" d="M216 246L264 148L316 218" />
      </g>
      {[{x:28,y:72},{x:28,y:160},{x:28,y:254},{x:486,y:52},{x:486,y:166},{x:486,y:270}].map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="6" />)}
    </svg>
  )
}
