import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { insights } from '@/lib/content'

type Insight = (typeof insights)[number]

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={insight.image || '/placeholder.svg'}
          alt={insight.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="font-semibold text-gold">{insight.category}</span>
          <span className="size-1 rounded-full bg-border" />
          <span>{insight.readTime}</span>
        </div>
        <h3 className="mt-4 font-heading text-xl leading-snug text-navy text-balance">
          {insight.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {insight.excerpt}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
          Read insight
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
