import { stats } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-heading'

export function TrustStats() {
  return (
    <section className="border-b border-border bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <Eyebrow>Trust & Authority</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-balance text-navy md:text-4xl">
              A track record built on measurable business impact.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We earn long-term partnerships by delivering execution quality
              that premium and enterprise clients can rely on.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 80}
                className="flex flex-col justify-between bg-card p-8"
              >
                <span className="font-heading text-4xl font-semibold text-gold md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-6 text-sm leading-snug text-muted-foreground">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
