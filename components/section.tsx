import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type SectionProps<T extends ElementType = 'section'> = {
  as?: T
  children: ReactNode
  className?: string
  surface?: 'light' | 'dark'
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Section<T extends ElementType = 'section'>({ as, children, className = '', surface = 'light', ...props }: SectionProps<T>) {
  const Component = as ?? 'section'
  const surfaceClass = surface === 'dark' ? 'section--dark dark-surface' : 'section--light'
  return <Component className={`section ${surfaceClass} ${className}`.trim()} {...props}>{children}</Component>
}
