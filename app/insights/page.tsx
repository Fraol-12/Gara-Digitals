import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { insights } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { InsightCard } from '@/components/insight-card'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Insights | Gara Media',
  description:
    'Perspectives on branding, technology, and digital transformation for ambitious organizations — written by the Gara Media team.',
}

const topics = ['All', 'Branding', 'Technology', 'Transformation', 'Marketing']

export default function InsightsPage() {
  const [featured, ...rest] = insights

  return (
    <>
      <PageHero
        eyebrow="Perspectives"
        title="Ideas that shape how ambitious organizations grow."
        intro="Field-tested thinking on brand, technology, and transformation — distilled from the work we do with demanding clients every day."
      />

      {/* Featured insight */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid gap-10 overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-2"
            >
              <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image || '/placeholder.svg'}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="font-semibold text-gold">
                    {featured.category}
                  </span>
                  <span className="size-1 rounded-full bg-border" />
                  <span>{featured.readTime}</span>
                  <span className="size-1 rounded-full bg-border" />
                  <span>{featured.date}</span>
                </div>
                <h2 className="mt-5 font-heading text-3xl leading-tight text-balance text-navy lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                  Read insight
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All insights */}
      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Latest Thinking"
            title="Explore our perspectives."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {topics.map((topic, i) => (
              <span
                key={topic}
                className={
                  i === 0
                    ? 'rounded-full bg-navy px-5 py-2 text-sm font-medium text-white'
                    : 'rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-navy'
                }
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight) => (
              <Reveal key={insight.slug}>
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-navy-dark py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl leading-tight text-balance text-white lg:text-4xl">
              Receive our perspectives, directly.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Occasional, considered thinking on brand, technology, and growth —
              no noise, only signal.
            </p>
            <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your work email"
                className="w-full rounded-sm border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
              >
                Subscribe
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
