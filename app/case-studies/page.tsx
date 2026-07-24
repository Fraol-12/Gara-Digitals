import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies, stats } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CaseStudyCard } from '@/components/case-study-card'
import { Reveal } from '@/components/reveal'
import { ConsultationCTA } from '@/components/home/consultation-cta'

export const metadata: Metadata = {
  title: 'Work | Gara Media',
  description:
    'Selected case studies showcasing measurable outcomes in branding, software, and digital transformation for enterprise and institutional clients.',
}

export default function WorkPage() {
  const [featured, ...rest] = caseStudies

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Outcomes that speak louder than the brief."
        intro="A selection of engagements where strategy, design, and engineering combined to move perception, performance, and growth for our clients."
      />

      {/* Featured case study */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              href={`/case-studies/${featured.slug}`}
              className="group grid gap-10 overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-2"
            >
              <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image || '/placeholder.svg'}
                  alt={`${featured.client} — ${featured.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className="absolute left-6 top-6 rounded-sm bg-navy/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {featured.client} · {featured.industry}
                </p>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-balance text-navy lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-6">
                  {featured.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="font-heading text-2xl text-gold">
                        {m.value}
                      </span>
                      <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                  View case study
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All case studies */}
      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Case Studies"
            title="Engagements across industries and disciplines."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((study) => (
              <Reveal key={study.slug}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-navy py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={(i % 4) * 70}
                className="bg-navy p-8 text-center lg:p-10"
              >
                <span className="font-heading text-4xl text-gold lg:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
                  {stat.label}
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
