import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-heading'

const PILLARS = [
  { title: 'Vision', desc: 'To be Ethiopia’s leading enterprise transformation partner.' },
  { title: 'Mission', desc: 'Deliver enterprise-grade work with the agility of a dedicated team.' },
  { title: 'Purpose', desc: 'Help ambitious organizations achieve lasting, measurable growth.' },
]

export function WhoWeAre() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="/images/about-team.png"
                alt="Gara Media leadership in a strategic working session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden max-w-xs rounded-lg bg-navy p-7 shadow-xl lg:block">
              <p className="font-heading text-xl leading-snug text-white text-balance">
                “The discipline of an established partner.”
              </p>
            </div>
          </Reveal>

          <div>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-balance text-navy md:text-4xl lg:text-5xl">
              An established partner for organizations that take growth
              seriously.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Gara Media operates at the intersection of strategy, creativity,
              and technology. We bring structure, accountability, and
              enterprise-level execution to every engagement — without the
              overhead and slowness of large agencies.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.title} className="bg-card p-6">
                  <h3 className="font-heading text-lg text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
            >
              Read our full story
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
