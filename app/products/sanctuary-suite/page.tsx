import type { Metadata } from 'next'
import SuiteProductPage from '../../../components/SuiteProductPage'
import AddressEveryStage from '../../../components/AddressEveryStage'
import FivePillars from '../../../components/FivePillars'
import ComparisonSuiteVsGeneric from '../../../components/ComparisonSuiteVsGeneric'
import TestimonialCarousel from '../../../components/TestimonialCarousel'
import DayMomentsCarousel from '../../../components/DayMomentsCarousel'
import BenefitsShowcase from '../../../components/BenefitsShowcase'
import PriceJustification from '../../../components/PriceJustification'
import FaqSection from '../../../components/FaqSection'
import Footer from '../../../components/Footer'

export const metadata: Metadata = {
  title: 'The Sanctuary Suite: CrownCalm',
  description:
    'Five instruments. Five documented neurological mechanisms. One compound protocol. The Sanctuary Suite addresses the conditions that create migraines, not the symptoms. $345, one-time.',
}

export default function SanctuarySuitePage() {
  return (
    <>
      <SuiteProductPage />
      <AddressEveryStage />
      <FivePillars />
      <ComparisonSuiteVsGeneric />
      <TestimonialCarousel />
      <DayMomentsCarousel />
      <BenefitsShowcase />
      <PriceJustification />
      <FaqSection />
      <Footer />
    </>
  )
}

