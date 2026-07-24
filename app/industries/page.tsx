import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Plane,
  Landmark,
  HeartPulse,
  GraduationCap,
  Banknote,
  Cpu,
  Building2,
  Hotel,
  HandHeart,
  Factory,
} from 'lucide-react'
import { industries } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { ConsultationCTA } from '@/components/home/consultation-cta'

export const metadata: Metadata = {
  title: 'Industries | Gara Media',
  description:
    'Deep sector expertise across tourism, government, healthcare, education, finance, technology, real estate, hospitality, NGOs, and manufacturing.',
}

const ICONS: Record<string, React.ElementType> = {
  Tourism: Plane,
  Government: Landmark,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Finance: Banknote,
  Technology: Cpu,
  'Real Estate': Building2,
  Hospitality: Hotel,
  NGOs: HandHeart,
  Manufacturing: Factory,
}

const approach = [
  {
    title: 'Sector fluency',
    desc: 'We invest in understanding the regulations, buyers, and competitive forces unique to each industry before we propose a single idea.',
  },
  {
    title: 'Trust-first delivery',
    desc: 'In sectors where credibility is currency, our work is engineered to signal reliability to the most discerning stakeholders.',
  },
  {
    title: 'Measurable outcomes',
    desc: 'Every engagement is tied to the metrics that matter to your industry — from citizen adoption to qualified pipeline.',
  },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve"
        title="Sector expertise that earns the trust of demanding stakeholders."
        intro="We partner with organizations across ten industries, bringing the strategic depth and engineering discipline each sector requires to move with confidence."
      />

      {/* Industry grid */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Industries"
            title="Specialized practice areas, one accountable partner."
            intro="From national institutions to ambitious private enterprises, we adapt our craft to the realities of your market."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => {
              const Icon = ICONS[industry.name] ?? Building2
              return (
                <Reveal
                  key={industry.name}
                  delay={(i % 3) * 70}
                  className="group bg-card p-8 transition-colors hover:bg-secondary lg:p-10"
                >
                  <span className="grid size-12 place-items-center rounded-sm bg-gold/12 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-heading text-xl text-navy">
                    {industry.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {industry.blurb}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="How we deliver advantage in every sector."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {approach.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 90}
                className="flex flex-col rounded-lg border border-border bg-card p-8"
              >
                <span className="font-mono text-sm tracking-widest text-gold">
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-4 font-heading text-xl text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-lg border border-border bg-navy p-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-heading text-2xl leading-snug text-balance text-white">
              Don&apos;t see your industry? We adapt our practice to ambitious
              organizations of every kind.
            </p>
            <Link
              href="/consultation"
              className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
            >
              Discuss your sector
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
