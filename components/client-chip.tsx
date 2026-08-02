import { Reveal } from '@/components/motion-runtime'
import type { Client } from '@/content/es/clients'

export function ClientChip({ client, delayed = false }: { client: Client; delayed?: boolean }) {
  return <Reveal className={`client-chip${delayed ? ' client-chip--delayed' : ''}`}><div><strong>{client.name}</strong><span>{client.eyebrow}</span></div><a href={client.href}>{client.status.toUpperCase()} <span aria-hidden="true">↗</span></a></Reveal>
}
