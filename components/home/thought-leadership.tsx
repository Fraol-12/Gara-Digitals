import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { insights } from '@/lib/content'
import { InsightCard } from '@/components/insight-card'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function ThoughtLeadership() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Thought Leadership"
            title="Perspectives on brand, technology & transformation."
            intro="Research-driven insights for leaders navigating growth, modernization, and market positioning."
          />
          <Link
            href="/insights"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
          >
            All insights
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, i) => (
            <Reveal key={insight.slug} delay={i * 80}>
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
