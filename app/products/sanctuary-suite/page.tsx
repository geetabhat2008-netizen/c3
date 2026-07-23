import type { Metadata } from 'next'
import SuiteProductPage from '../../../components/SuiteProductPage'
import TestimonialRail from '../../../components/TestimonialRail'
import FivePillars from '../../../components/FivePillars'
import BenefitsShowcase from '../../../components/BenefitsShowcase'
import ReviewsWall from '../../../components/ReviewsWall'
import FaqSection from '../../../components/FaqSection'
import Footer from '../../../components/Footer'

export const metadata: Metadata = {
  title: 'The Sanctuary Suite — CrownCalm',
  description:
    'Five instruments. Five documented neurological mechanisms. One compound protocol. The Sanctuary Suite addresses the conditions that create migraines — not the symptoms. $345, one-time.',
}

export default function SanctuarySuitePage() {
  return (
    <>
      <SuiteProductPage />
      <TestimonialRail />
      <FivePillars />
      <BenefitsShowcase />
      <ReviewsWall />
      <FaqSection />
      <Footer />
    </>
  )
}
