import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { departments } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function OrgExcellence() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Organizational Excellence"
          title="Structure that signals enterprise readiness."
          intro="Six functional departments reporting to the CEO — with clear ownership, accountability, and reporting lines built for complex engagements."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, i) => (
            <Reveal
              key={dept.name}
              delay={(i % 3) * 70}
              className="bg-card p-8"
            >
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-gold" />
                <h3 className="font-heading text-xl text-navy">{dept.name}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {dept.desc}
              </p>
              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-navy/70">
                {dept.lead}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/about#leadership"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
          >
            Meet our leadership
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
