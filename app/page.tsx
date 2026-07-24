import { Hero } from '@/components/home/hero'
import { TrustStats } from '@/components/home/trust-stats'
import { WhoWeAre } from '@/components/home/who-we-are'
import { ServicesSection } from '@/components/home/services-section'
import { IndustriesSection } from '@/components/home/industries-section'
import { FeaturedWork } from '@/components/home/featured-work'
import { ProcessSection } from '@/components/home/process-section'
import { ThoughtLeadership } from '@/components/home/thought-leadership'
import { ConsultationCTA } from '@/components/home/consultation-cta'

export default function Page() {
  return (
    <>
      <Hero />
      <TrustStats />
      <WhoWeAre />
      <ServicesSection />
      <IndustriesSection />
      <FeaturedWork />
      <ProcessSection />
      <ThoughtLeadership />
      <ConsultationCTA />
    </>
  )
}
