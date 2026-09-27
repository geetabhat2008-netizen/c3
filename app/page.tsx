import HeroSection from "../components/HeroSection";
import TrustStripMarquee from "../components/TrustStripMarquee";
import GuaranteeTrustStrip from "../components/GuaranteeTrustStrip";
import BenefitsTabbedShowcase from "../components/BenefitsTabbedShowcase";
import AddressEveryStage from "../components/AddressEveryStage";
import PainAcknowledgment from "../components/PainAcknowledgment";
import MechanismSection from "../components/MechanismSection";
import DayMomentsCarousel from "../components/DayMomentsCarousel";
import CustomerQuoteReviews from "../components/CustomerQuoteReviews";
import FivePillars from "../components/FivePillars";
import ScientificAdvisoryGrid from "../components/ScientificAdvisoryGrid";
import CompetitorMatrix from "../components/CompetitorMatrix";
import PriceJustification from "../components/PriceJustification";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* Above-the-fold Hero & Trust Marquee */}
      <HeroSection />
      <TrustStripMarquee />
      <GuaranteeTrustStrip />

      {/* Outcome-Led Benefits Tabbed Showcase (Apollo Neuro Reference) */}
      <BenefitsTabbedShowcase />

      {/* Address It At Every Stage (3-panel alternating) */}
      <AddressEveryStage />

      {/* Real relief, in their words. What changes when the storm has an exit. */}
      <CustomerQuoteReviews />

      {/* Empathy & Foundations */}
      <PainAcknowledgment />
      <MechanismSection />

      {/* Dark Feature Band: Moments in Day */}
      <DayMomentsCarousel />

      {/* Light Science Section: Deep Engineering & Clinical Advisory */}
      <FivePillars />
      <ScientificAdvisoryGrid />

      {/* Light Mechanism Comparison */}
      <CompetitorMatrix />

      {/* Dark Commercial & Justification */}
      <PriceJustification />

      {/* Light FAQ */}
      <FaqSection />

      {/* Global Footer */}
      <Footer />
    </>
  );
}
