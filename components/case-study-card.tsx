import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { caseStudies } from '@/lib/content'

type CaseStudy = (typeof caseStudies)[number]

export function CaseStudyCard({
  study,
  featured = false,
}: {
  study: CaseStudy
  featured?: boolean
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[16/11]'}`}>
        <Image
          src={study.image || '/placeholder.svg'}
          alt={`${study.client} — ${study.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-5 top-5 rounded-sm bg-navy/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
          {study.industry}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {study.client}
        </p>
        <h3 className="mt-3 font-heading text-xl leading-snug text-navy text-balance">
          {study.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {study.excerpt}
        </p>

        <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
          <div className="flex gap-6">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <span className="font-heading text-xl text-gold">{m.value}</span>
                <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <span className="grid size-10 place-items-center rounded-full border border-border text-navy transition-colors group-hover:border-gold group-hover:bg-gold">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
