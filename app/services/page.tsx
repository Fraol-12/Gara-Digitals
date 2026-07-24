import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { services, processSteps } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { SectionHeading, Eyebrow } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { ConsultationCTA } from '@/components/home/consultation-cta'

export const metadata: Metadata = {
  title: 'Services | Gara Media',
  description:
    'Branding, digital marketing, social media, custom software, business automation, and digital transformation for ambitious organizations.',
}

const engagementModels = [
  {
    title: 'Project Engagement',
    desc: 'A defined scope with clear deliverables, timelines, and success metrics — ideal for a brand build, platform, or campaign.',
  },
  {
    title: 'Retained Partnership',
    desc: 'Ongoing strategic and execution support across disciplines, structured as a long-term relationship.',
  },
  {
    title: 'Transformation Program',
    desc: 'Multi-phase modernization combining strategy, design, and engineering across the organization.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Integrated capabilities, delivered to enterprise standards."
        intro="Six disciplines, one accountable partner. We combine brand, marketing, and engineering so every engagement compounds into measurable advantage."
      />

      {/* Services detail */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-px overflow-hidden rounded-lg border border-border">
            {services.map((service, i) => (
              <Reveal
                key={service.id}
                id={service.id}
                delay={(i % 2) * 80}
                className="group grid scroll-mt-28 gap-8 bg-card p-8 transition-colors hover:bg-secondary lg:grid-cols-12 lg:p-12"
              >
                <div className="lg:col-span-4">
                  <span className="font-mono text-sm tracking-widest text-gold">
                    {service.number}
                  </span>
                  <h2 className="mt-4 font-heading text-3xl text-navy">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <Link
                    href="/consultation"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold"
                  >
                    Discuss this service
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
                <div className="lg:col-span-8 lg:border-l lg:border-border lg:pl-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Capabilities
                  </p>
                  <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-base text-navy"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                          <Check className="size-3" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="How We Engage"
            title="Engagement models built around your ambitions."
            intro="From a single defined project to an organization-wide transformation, we structure the relationship to fit the outcome you need."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {engagementModels.map((model, i) => (
              <Reveal
                key={model.title}
                delay={i * 90}
                className="flex flex-col rounded-lg border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
              >
                <span className="font-mono text-sm tracking-widest text-gold">
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-4 font-heading text-xl text-navy">
                  {model.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {model.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            variant="light"
            eyebrow="Our Process"
            title="A disciplined path from ambition to measurable impact."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={(i % 4) * 70}
                className="bg-navy p-8 transition-colors hover:bg-slate-navy"
              >
                <span className="font-mono text-sm tracking-widest text-gold/70">
                  {step.number}
                </span>
                <h3 className="mt-5 font-heading text-xl text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
