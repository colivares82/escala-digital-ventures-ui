/**
 * Home sections component tests.
 * Phase 5: components now receive labels/diagrams/hrefs as props.
 */
import { render, screen } from '@testing-library/react'
import {
  Hero,
  ProblemSection,
  ServicesPreview,
  FrameworkSection,
  ProofSection,
  AllianceTeaser,
} from '@/components/home-sections'
import { homeContent } from '@/content/es/home'
import { sharedContent } from '@/content/es/shared'

const { labels, diagrams, heroFigure } = homeContent

describe('Hero', () => {
  it('renders the H1 heading with the hero title', () => {
    render(
      <Hero
        content={homeContent.hero}
        claims={homeContent.claims}
        labels={labels}
        diagrams={diagrams}
        heroFigure={heroFigure}
        claimsAriaLabel={sharedContent.accessibility.keyMessages}
      />,
    )
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveAttribute('aria-label', homeContent.hero.title)
  })

  it('renders the hero description', () => {
    render(
      <Hero
        content={homeContent.hero}
        claims={homeContent.claims}
        labels={labels}
        diagrams={diagrams}
        claimsAriaLabel={sharedContent.accessibility.keyMessages}
      />,
    )
    expect(screen.getByText(homeContent.hero.description)).toBeInTheDocument()
  })

  it('renders the primary CTA link', () => {
    render(
      <Hero
        content={homeContent.hero}
        claims={homeContent.claims}
        labels={labels}
        diagrams={diagrams}
        claimsAriaLabel={sharedContent.accessibility.keyMessages}
      />,
    )
    expect(
      screen.getByRole('link', { name: new RegExp(homeContent.hero.primaryCta) }),
    ).toBeInTheDocument()
  })

  it('renders the secondary CTA link', () => {
    render(
      <Hero
        content={homeContent.hero}
        claims={homeContent.claims}
        labels={labels}
        diagrams={diagrams}
        claimsAriaLabel={sharedContent.accessibility.keyMessages}
      />,
    )
    expect(
      screen.getByRole('link', { name: new RegExp(homeContent.hero.secondaryCta) }),
    ).toBeInTheDocument()
  })

  it('renders the claims marquee', () => {
    render(
      <Hero
        content={homeContent.hero}
        claims={homeContent.claims}
        labels={labels}
        diagrams={diagrams}
        claimsAriaLabel={sharedContent.accessibility.keyMessages}
      />,
    )
    expect(
      screen.getByLabelText(sharedContent.accessibility.keyMessages),
    ).toBeInTheDocument()
  })
})

describe('ProblemSection', () => {
  it('renders the section heading', () => {
    render(<ProblemSection content={homeContent.problem} labels={labels} diagrams={diagrams} />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('aria-label', homeContent.problem.title)
  })

  it('renders the problem body copy', () => {
    render(<ProblemSection content={homeContent.problem} labels={labels} diagrams={diagrams} />)
    expect(screen.getByText(homeContent.problem.body)).toBeInTheDocument()
  })

  it('renders all symptoms', () => {
    render(<ProblemSection content={homeContent.problem} labels={labels} diagrams={diagrams} />)
    homeContent.problem.symptoms.forEach((symptom) => {
      expect(screen.getByText(symptom)).toBeInTheDocument()
    })
  })

  it('renders the symptoms list with an accessible label', () => {
    render(<ProblemSection content={homeContent.problem} labels={labels} diagrams={diagrams} />)
    expect(
      screen.getByRole('list', { name: homeContent.labels.symptoms }),
    ).toBeInTheDocument()
  })
})

describe('ServicesPreview', () => {
  it('renders the services heading', () => {
    render(
      <ServicesPreview
        content={homeContent.services}
        labels={labels}
        servicesHref="/que-hacemos"
      />,
    )
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('aria-label', homeContent.services.title)
  })

  it('renders all 5 service titles', () => {
    render(
      <ServicesPreview
        content={homeContent.services}
        labels={labels}
        servicesHref="/que-hacemos"
      />,
    )
    homeContent.services.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('renders service item text descriptions', () => {
    render(
      <ServicesPreview
        content={homeContent.services}
        labels={labels}
        servicesHref="/que-hacemos"
      />,
    )
    homeContent.services.items.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument()
    })
  })

  it('renders a link to the services page', () => {
    render(
      <ServicesPreview
        content={homeContent.services}
        labels={labels}
        servicesHref="/que-hacemos"
      />,
    )
    expect(
      screen.getByRole('link', { name: new RegExp(homeContent.services.action) }),
    ).toHaveAttribute('href', '/que-hacemos')
  })

  it('renders a numbered ordered list', () => {
    render(
      <ServicesPreview
        content={homeContent.services}
        labels={labels}
        servicesHref="/que-hacemos"
      />,
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})

describe('FrameworkSection', () => {
  it('renders the framework section heading', () => {
    render(
      <FrameworkSection
        content={homeContent.framework}
        labels={labels}
        methodHref="/como-trabajamos"
      />,
    )
    // PhaseCycle renders the title in both the pinned and static layouts
    expect(screen.getAllByText(homeContent.framework.title)[0]).toBeInTheDocument()
  })

  it('renders the section label in the eyebrow', () => {
    render(
      <FrameworkSection
        content={homeContent.framework}
        labels={labels}
        methodHref="/como-trabajamos"
      />,
    )
    // Label appears in both the pinned header and static header SectionIndex
    expect(
      screen.getAllByText(homeContent.labels.framework)[0],
    ).toBeInTheDocument()
  })

  it('renders the first phase name', () => {
    render(
      <FrameworkSection
        content={homeContent.framework}
        labels={labels}
        methodHref="/como-trabajamos"
      />,
    )
    // First phase is visible in the active panel and the static list
    expect(
      screen.getAllByText(homeContent.framework.phases[0].name)[0],
    ).toBeInTheDocument()
  })
})

describe('ProofSection', () => {
  it('renders the proof heading', () => {
    render(<ProofSection content={homeContent.proof} labels={labels} diagrams={diagrams} />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('aria-label', homeContent.proof.title)
  })

  it('renders the proof attribution label', () => {
    render(<ProofSection content={homeContent.proof} labels={labels} diagrams={diagrams} />)
    expect(
      screen.getByText(homeContent.labels.proofAttribution),
    ).toBeInTheDocument()
  })

  it('renders both client chips', () => {
    render(<ProofSection content={homeContent.proof} labels={labels} diagrams={diagrams} />)
    expect(screen.getByText('MAGUPELL')).toBeInTheDocument()
    expect(screen.getByText('BioZero')).toBeInTheDocument()
  })

  it('renders the readouts dl with multiple terms', () => {
    render(<ProofSection content={homeContent.proof} labels={labels} diagrams={diagrams} />)
    // Each readout has a <dt> (role="term"); there are 4 proof figures
    expect(screen.getAllByRole('term').length).toBe(homeContent.proof.figures.length)
  })
})

describe('AllianceTeaser', () => {
  it('renders the alliance heading', () => {
    render(
      <AllianceTeaser
        content={homeContent.alliance}
        labels={labels}
        diagrams={diagrams}
        allianceHref="/modelo-de-alianza"
      />,
    )
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('aria-label', homeContent.alliance.title)
  })

  it('renders the body copy', () => {
    render(
      <AllianceTeaser
        content={homeContent.alliance}
        labels={labels}
        diagrams={diagrams}
        allianceHref="/modelo-de-alianza"
      />,
    )
    expect(screen.getByText(homeContent.alliance.body)).toBeInTheDocument()
  })

  it('renders a link to the alliance model page', () => {
    render(
      <AllianceTeaser
        content={homeContent.alliance}
        labels={labels}
        diagrams={diagrams}
        allianceHref="/modelo-de-alianza"
      />,
    )
    expect(
      screen.getByRole('link', { name: new RegExp(homeContent.alliance.action) }),
    ).toHaveAttribute('href', '/modelo-de-alianza')
  })

  it('renders the alliance legend', () => {
    render(
      <AllianceTeaser
        content={homeContent.alliance}
        labels={labels}
        diagrams={diagrams}
        allianceHref="/modelo-de-alianza"
      />,
    )
    expect(
      screen.getByText(homeContent.labels.allianceLegend),
    ).toBeInTheDocument()
  })
})
