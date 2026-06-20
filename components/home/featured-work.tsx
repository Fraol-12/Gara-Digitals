import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '@/lib/content'
import { CaseStudyCard } from '@/components/case-study-card'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function FeaturedWork() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Transformations"
            title="Consulting-grade case studies, not portfolio thumbnails."
            intro="Each engagement is documented as a business story — challenge, strategy, execution, and measurable results."
          />
          <Link
            href="/case-studies"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
          >
            View all case studies
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
