import HeroSection from "../components/HeroSection";
import MechanismSection from "../components/MechanismSection";
import PainAcknowledgment from "../components/PainAcknowledgment";
import FivePillars from "../components/FivePillars";
import CompetitorMatrix from "../components/CompetitorMatrix";
import PriceJustification from "../components/PriceJustification";
import ProtocolInYourDay from "../components/ProtocolInYourDay";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MechanismSection />
      <PainAcknowledgment />
      <FivePillars />
      <CompetitorMatrix />
      <PriceJustification />
      <ProtocolInYourDay />
      <FaqSection />
      <Footer />
    </>
  );
}
