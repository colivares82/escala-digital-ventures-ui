/**
 * ScenarioCard — one illustrative scenario (LANDING-01 §3.3).
 * Eyebrow «Escenario X · ilustrativo» is mandatory and comes from the dictionary.
 */
import type { ScenarioContent, ScenarioFlowLabels } from '@/content/types'
import { ScenarioFlow } from './scenario-flow'

export interface ScenarioCardProps {
  scenario: ScenarioContent
  flowLabels: ScenarioFlowLabels
  outcomeLabel: string
}

export function ScenarioCard({ scenario, flowLabels, outcomeLabel }: ScenarioCardProps) {
  return (
    <article className="scenario-card">
      <p className="scenario-card__eyebrow">{scenario.eyebrow}</p>
      <h3 className="scenario-card__title">{scenario.title}</h3>
      <p className="scenario-card__problem">{scenario.problem}</p>
      <div className="scenario-card__figbox">
        <ScenarioFlow before={scenario.before} after={scenario.after} labels={flowLabels} />
      </div>
      <p className="scenario-card__outcome-label">{outcomeLabel}</p>
      <p className="scenario-card__outcome">{scenario.outcome}</p>
    </article>
  )
}
