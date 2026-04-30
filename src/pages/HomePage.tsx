import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import StatsStrip from '@/components/landing/StatsStrip';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionsGrid from '@/components/landing/SolutionsGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TierShowcase from '@/components/landing/TierShowcase';
import IntegrationsSection from '@/components/landing/IntegrationsSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Aiaura — 12 AI Employees for US Car Rental Operators</title>
        <meta
          name="description"
          content="Stop losing 60–80% of after-hours bookings. Aiaura deploys 12 AI employees that answer every call, DM, and email — 24/7, in your brand voice. Live in 14 days."
        />
        <meta property="og:title" content="Aiaura — 12 AI Employees for US Car Rental Operators" />
        <meta
          property="og:description"
          content="Answer every call, reply to every DM, close every booking. Built exclusively for US car rental operators."
        />
      </Helmet>
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <ProblemSection />
      <SolutionsGrid />
      <HowItWorks />
      <TierShowcase />
      <IntegrationsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
