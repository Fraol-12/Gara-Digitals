import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function IndustriesSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries We Transform"
          title="Deep expertise across the sectors that move economies."
          intro="From government institutions to high-growth enterprises, we adapt our discipline to the realities of each industry."
        />

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry, i) => (
            <Reveal
              key={industry.name}
              delay={(i % 5) * 60}
              className="group bg-card p-7 transition-colors duration-300 hover:bg-navy"
            >
              <h3 className="font-heading text-lg text-navy transition-colors group-hover:text-white">
                {industry.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-white/60">
                {industry.blurb}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
          >
            Explore industry capabilities
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
