import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/content'
import { Reveal } from '@/components/reveal'

export function ServicesGrid({ withLinks = false }: { withLinks?: boolean }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal
          key={service.id}
          delay={(i % 3) * 80}
          id={service.id}
          className="group relative scroll-mt-28 bg-navy p-8 transition-colors duration-300 hover:bg-slate-navy lg:p-10"
        >
          <span className="font-mono text-sm tracking-widest text-gold/70">
            {service.number}
          </span>
          <h3 className="mt-6 font-heading text-2xl text-white">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            {service.summary}
          </p>
          <ul className="mt-6 space-y-2.5">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-sm text-white/75"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>
          {withLinks && (
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
              Discuss this service
              <ArrowUpRight className="size-4" />
            </span>
          )}
        </Reveal>
      ))}
    </div>
  )
}
