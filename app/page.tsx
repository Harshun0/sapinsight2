import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
// import { SectorsSections } from "@/components/landing/sectors-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { WhySection } from "@/components/landing/why-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { FaqSection } from "@/components/landing/faq-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ContactSection } from "@/components/landing/contact-section";
import { FooterSection } from "@/components/landing/footer-section";
import { PageWrapper } from "@/components/landing/page-wrapper";
import { AgentTypesSection } from "@/components/landing/agent-types-section";

export default function Home() {
  return (
    <PageWrapper>
      <main className="relative min-h-screen">
        <Navigation />
        <HeroSection />
        {/* <FeaturesSection /> */}
        <HowItWorksSection />
        <InfrastructureSection />
        {/* <SectorsSection /> */}
        <AgentTypesSection />
        <MetricsSection />
        <WhySection />
        {/* <IntegrationsSection /> */}
        <SecuritySection />
        <FaqSection />
            {/* <DevelopersSection />
            <TestimonialsSection />
            <PricingSection /> */}
        {/* <CtaSection /> */}
        {/* <ContactSection /> */}
        <FooterSection />
      </main>
    </PageWrapper>
  );
}
