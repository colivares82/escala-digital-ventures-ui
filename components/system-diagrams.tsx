'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function Figure({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        observer.disconnect()
      }
    }, { threshold: 0.28 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <figure ref={ref} className={cn('system-figure', active && 'is-active', className)} aria-label={label}>{children}</figure>
}

const Node = ({ x, y, delay = 0, active = false }: { x: number; y: number; delay?: number; active?: boolean }) => (
  <g className={cn('diagram-node', active && 'diagram-node--accent')} style={{ '--delay': `${delay}ms` } as React.CSSProperties}>
    <circle cx={x} cy={y} r='8' />
    <circle cx={x} cy={y} r='2' className='diagram-node__core' />
  </g>
)

export function HeroSystemDiagram() {
  return (
    <Figure label='Proceso manual fragmentado que se transforma en una plataforma conectada' className='system-figure--hero'>
      <svg viewBox='0 0 680 520' role='img'>
        <title>De proceso manual a plataforma propia</title>
        <desc>Varias fuentes manuales convergen en un sistema automatizado y medible.</desc>
        <g className='diagram-grid' aria-hidden='true'><path d='M40 80H640M40 180H640M40 280H640M40 380H640M140 40V480M340 40V480M540 40V480' /></g>
        <g className='diagram-paths'>
          <path style={{ '--delay': '0ms' } as React.CSSProperties} d='M72 100H210L260 170H338' />
          <path style={{ '--delay': '100ms' } as React.CSSProperties} d='M72 220H188L260 170' />
          <path style={{ '--delay': '180ms' } as React.CSSProperties} d='M72 340H205L274 270H338' />
          <path style={{ '--delay': '260ms' } as React.CSSProperties} d='M338 170V270M338 220H452V148H592' />
          <path style={{ '--delay': '360ms' } as React.CSSProperties} d='M452 220V360H592' />
        </g>
        <g className='diagram-labels' aria-hidden='true'><text x='54' y='78'>DATOS</text><text x='54' y='198'>CORREO</text><text x='54' y='318'>HOJAS</text><text x='302' y='145'>NÚCLEO</text><text x='520' y='124'>PLATAFORMA</text><text x='520' y='336'>MEDICIÓN</text></g>
        <Node x={72} y={100} delay={80} /><Node x={72} y={220} delay={160} /><Node x={72} y={340} delay={240} /><Node x={338} y={170} delay={380} active /><Node x={338} y={270} delay={460} active /><Node x={592} y={148} delay={580} active /><Node x={592} y={360} delay={660} active />
        <circle className='diagram-pulse diagram-pulse--hero' r='5'><animateMotion dur='2.8s' begin='1s' repeatCount='1' path='M72 220H188L260 170H338V220H452V148H592' /></circle>
      </svg>
      <figcaption className='diagram-caption'>ENTRADA / SISTEMA / RESULTADO</figcaption>
    </Figure>
  )
}

export function ProblemDiagram() {
  return (
    <Figure label='Flujo fragmentado con múltiples dependencias y puntos de error'>
      <svg viewBox='0 0 680 420' role='img'>
        <title>Operativa fragmentada</title>
        <desc>Conexiones cruzadas entre herramientas y personas muestran un proceso frágil.</desc>
        <g className='diagram-paths diagram-paths--ink'>
          <path d='M74 72C190 72 144 210 280 210S390 78 590 78' /><path d='M74 210C170 210 206 330 326 330S440 214 590 214' /><path d='M74 342C240 342 170 112 340 112S430 342 590 342' /><path d='M144 72V342M280 210L340 112M326 330L590 78' />
        </g>
        <g className='diagram-labels diagram-labels--ink' aria-hidden='true'><text x='52' y='48'>ARCHIVOS</text><text x='52' y='186'>PERSONAS</text><text x='52' y='318'>CORREO</text><text x='514' y='54'>ERRORES</text><text x='514' y='190'>RETRASOS</text><text x='514' y='318'>RIESGO</text></g>
        <Node x={74} y={72} delay={60} /><Node x={74} y={210} delay={120} /><Node x={74} y={342} delay={180} /><Node x={280} y={210} delay={300} /><Node x={340} y={112} delay={360} /><Node x={326} y={330} delay={420} /><Node x={590} y={78} delay={560} active /><Node x={590} y={214} delay={620} active /><Node x={590} y={342} delay={680} active />
      </svg>
      <figcaption className='diagram-caption diagram-caption--ink'>DEPENDENCIAS / FRICCIÓN / FRAGILIDAD</figcaption>
    </Figure>
  )
}

export function FrameworkDiagram({ phases }: { phases: readonly string[] }) {
  return (
    <Figure label='Las diez fases conectadas del Escala Growth Framework'>
      <div className='framework-system'>
        <svg viewBox='0 0 1000 150' role='img'>
          <title>Escala Growth Framework</title>
          <path className='framework-system__line' d='M50 52H950' />
          {phases.map((_, index) => <g key={index}><line className='framework-system__tick' x1={50 + index * 100} y1='40' x2={50 + index * 100} y2='68' /><circle className='framework-system__node' cx={50 + index * 100} cy='52' r='6' style={{ '--delay': `${index * 70}ms` } as React.CSSProperties} /></g>)}
          <circle className='diagram-pulse framework-system__pulse' r='6'><animateMotion dur='3.5s' begin='0.8s' repeatCount='1' path='M50 52H950' /></circle>
        </svg>
        <ol className='framework-system__labels'>{phases.map((phase, index) => <li key={phase}><span>{String(index + 1).padStart(2, '0')}</span>{phase}</li>)}</ol>
      </div>
    </Figure>
  )
}

export function ProofChart() {
  return (
    <Figure label='Gráfico ascendente de requisitos y pruebas en producción'>
      <svg viewBox='0 0 680 350' role='img'>
        <title>Evolución de la plataforma MAGUPELL</title>
        <desc>Una curva técnica conecta requisitos, pruebas y producción real.</desc>
        <g className='chart-grid' aria-hidden='true'><path d='M64 54V290H632M64 102H632M64 150H632M64 198H632M64 246H632' /></g>
        <path className='chart-line' d='M74 270L210 228L348 178L486 104L616 70' />
        <path className='chart-area' d='M74 270L210 228L348 178L486 104L616 70V290H74Z' />
        <g className='diagram-labels' aria-hidden='true'><text x='70' y='316'>INICIO</text><text x='300' y='316'>VALIDACIÓN</text><text x='548' y='316'>PRODUCCIÓN</text></g>
        <Node x={74} y={270} delay={80} /><Node x={210} y={228} delay={180} /><Node x={348} y={178} delay={300} active /><Node x={486} y={104} delay={420} active /><Node x={616} y={70} delay={540} active />
      </svg>
      <figcaption className='diagram-caption'>REQUISITOS / PRUEBAS / PRODUCCIÓN REAL</figcaption>
    </Figure>
  )
}
