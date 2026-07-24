import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import { insights } from '@/lib/content'
import { ConsultationCTA } from '@/components/home/consultation-cta'
import { Reveal } from '@/components/reveal'

type Props = {
  params: Promise<{ slug: string }>
}

const ARTICLE_CONTENT: Record<
  string,
  {
    intro: string
    sections: { title: string; paragraphs: string[]; keyTakeaways?: string[] }[]
    quote?: string
  }
> = {
  'enterprise-brand-trust': {
    intro:
      'In high-stakes enterprise procurement and executive decision-making, competence is assumed as a baseline. The differentiator that wins contracts, partnerships, and market dominance is perceived credibility and operational trust.',
    quote:
      'Enterprise decision-makers rarely choose the vendor with the longest feature list. They select the partner that minimizes institutional risk.',
    sections: [
      {
        title: 'The Risk-Reduction Imperative',
        paragraphs: [
          'Enterprise buyers operate under tremendous scrutiny. When selecting an agency or technical partner, the chief risk is not underperformance — it is reputation loss and operational disruption.',
          'Building brand trust requires aligning every touchpoint: from high-level visual identity governance to the precision of technical documentation.',
        ],
        keyTakeaways: [
          'Signal clarity before capabilities.',
          'Consistently demonstrate enterprise-grade governance.',
          'Structure deliverables to reduce stakeholder friction.',
        ],
      },
      {
        title: 'Architecting Long-Term Advantage',
        paragraphs: [
          'Organizations that invest in disciplined brand positioning win higher margin contracts and sustain multi-year client relationships.',
          'At Gara Media, we structure brand systems to serve as institutional assets that compound value over time.',
        ],
      },
    ],
  },
  'ai-operations': {
    intro:
      'Artificial intelligence is transitioning from experimental novelty to core operational infrastructure. Ambitious organizations are identifying specific workflows where intelligent automation generates compound productivity.',
    quote:
      'The goal of operational AI is not to replace human judgment, but to augment decision bandwidth and remove execution friction.',
    sections: [
      {
        title: 'High-Impact Automation Vectors',
        paragraphs: [
          'We evaluate enterprise workflows across three core dimensions: frequency, rule complexity, and latency requirements.',
          'Intelligent document ingestion, client request routing, and automated compliance verification deliver immediate ROI without introducing system instability.',
        ],
        keyTakeaways: [
          'Target deterministic bottleneck processes first.',
          'Establish continuous quality validation pipelines.',
          'Integrate AI directly into existing CRM and ERP tools.',
        ],
      },
      {
        title: 'Engineering for Reliability & Compliance',
        paragraphs: [
          'Deploying AI in enterprise environments demands strict data privacy, determinism, and fallback pathways.',
          'Our engineering team builds resilient business automation systems designed for enterprise scalability.',
        ],
      },
    ],
  },
  'transformation-playbook': {
    intro:
      'Digital transformation projects frequently fail not from a lack of technical vision, but from inadequate change enablement and misaligned governance. This playbook outlines field-tested principles for modernizing legacy operations.',
    quote:
      'Modernization succeeds when legacy trust is preserved while modern capabilities are introduced incrementally.',
    sections: [
      {
        title: 'The Phased Modernization Strategy',
        paragraphs: [
          'Attempting a single monolithic upgrade creates unnecessary organizational risk. Successful leaders execute phased migrations with clear milestone metrics.',
          'Establishing a dual-track delivery system allows core legacy operations to run continuously while modern software platforms are deployed and tested.',
        ],
        keyTakeaways: [
          'Phase execution into 90-day value milestones.',
          'Prioritize user experience for internal team adoption.',
          'Maintain transparent, outcome-oriented metrics.',
        ],
      },
      {
        title: 'Sustaining Continuous Advantage',
        paragraphs: [
          'Transformation is not a one-time project — it is a organizational muscle. Building internal capability alongside strategic external partners ensures long-term agility.',
        ],
      },
    ],
  },
}

export async function generateStaticParams() {
  return insights.map((insight) => ({
    slug: insight.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)

  if (!insight) return {}

  return {
    title: `${insight.title} | Gara Media Insights`,
    description: insight.excerpt,
  }
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)

  if (!insight) {
    notFound()
  }

  const content = ARTICLE_CONTENT[slug] || {
    intro: insight.excerpt,
    sections: [
      {
        title: 'Strategic Insights',
        paragraphs: [insight.excerpt],
      },
    ],
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #c9a227 1px, transparent 0)',
            backgroundSize: '38px 38px',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to insights
            </Link>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/60">
              <span className="font-semibold text-gold">
                {insight.category}
              </span>
              <span className="size-1 rounded-full bg-white/30" />
              <span>{insight.readTime}</span>
              <span className="size-1 rounded-full bg-white/30" />
              <span>{insight.date}</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl leading-[1.08] text-balance text-white md:text-5xl lg:text-6xl max-w-4xl">
              {insight.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border mb-12 shadow-lg">
              <Image
                src={insight.image || '/images/insight-ai.png'}
                alt={insight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="text-xl leading-relaxed text-navy font-medium border-l-4 border-gold pl-6 my-6">
              {content.intro}
            </p>

            {content.quote && (
              <blockquote className="my-10 rounded-lg border border-gold/30 bg-gold/5 p-8 text-navy">
                <div className="flex gap-4">
                  <BookOpen className="size-6 text-gold shrink-0 mt-1" />
                  <p className="font-heading text-lg italic leading-relaxed">
                    "{content.quote}"
                  </p>
                </div>
              </blockquote>
            )}

            <div className="mt-10 space-y-12">
              {content.sections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="font-heading text-2xl font-bold text-navy">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                  {section.keyTakeaways && (
                    <div className="mt-6 rounded-md bg-secondary p-6 border border-border">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-navy mb-3">
                        Key Strategic Takeaways
                      </h4>
                      <ul className="space-y-2">
                        {section.keyTakeaways.map((takeaway, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-navy/80">
                            <CheckCircle2 className="size-4 text-gold shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-center justify-between border-t border-border pt-8">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                <ArrowLeft className="size-4" />
                All insights
              </Link>
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                Discuss this topic
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
