import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ServicesGrid } from '@/components/services-grid'
import { SectionHeading } from '@/components/section-heading'

export function ServicesSection() {
  return (
    <section className="bg-navy-dark py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            variant="light"
            eyebrow="What We Do"
            title="Four core disciplines, executed to an enterprise standard."
            intro="A focused service architecture — not a sprawling menu. We go deeper, not wider, to deliver quality that premium clients trust."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            View all services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14">
          <ServicesGrid />
        </div>
      </div>
    </section>
  )
}
