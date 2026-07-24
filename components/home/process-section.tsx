import { processSteps } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          variant="light"
          eyebrow="Our Process"
          title="A disciplined path from discovery to durable growth."
          intro="Eight deliberate stages that bring structure and accountability to every engagement."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              key={step.number}
              delay={(i % 4) * 80}
              className="group bg-navy p-8 transition-colors duration-300 hover:bg-slate-navy"
            >
              <span className="font-mono text-sm tracking-widest text-gold">
                {step.number}
              </span>
              <h3 className="mt-5 font-heading text-xl text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
