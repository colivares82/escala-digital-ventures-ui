import { ContactForm } from '@/components/contact-form'
import { WordReveal } from '@/components/motion-runtime'
import { SectionIndex } from '@/components/section-index'
import { sharedContent } from '@/content/es/shared'

/** Structural interface accepted by FinalCTA — any page can pass its own content. */
export interface FinalCtaContent {
  readonly title: string
  readonly body: string
  readonly success: string
  readonly email: string
  readonly location: string
  readonly languages: string
}

export function FinalCTA({
  content,
}: {
  content: FinalCtaContent
}) {
  return (
    <section className="final-cta dark-surface" id="contacto">
      <div className="page-shell final-cta__inner">
        <SectionIndex
          index="06"
          label={sharedContent.contactForm.sectionLabel}
        />

        <div className="final-cta__grid">
          <div className="final-cta__intro">
            <WordReveal
              as="h2"
              text={content.title}
              className="final-cta__title"
            />
            <p>{content.body}</p>
          </div>

          <div className="final-cta__contact">
            <ContactForm email={content.email} success={content.success} />

            <address className="contact-meta">
              <a href={`mailto:${content.email}`}>{content.email}</a>
              <span>{content.location}</span>
              <span>{content.languages}</span>
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
