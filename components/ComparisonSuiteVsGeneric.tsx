'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ComparisonRow {
  text: string
  included: boolean
}

const GENERIC_ROWS: ComparisonRow[] = [
  { text: 'Addresses one mechanism only', included: false },
  { text: 'No cervical or occipital relief', included: false },
  { text: "Vibration-based massage — doesn't trigger Gate Control response", included: false },
  { text: 'No spectral filtration for sub-visible flicker', included: false },
  { text: 'Requires buying multiple separate products to approach full coverage', included: false },
  { text: 'No guided protocol or progression plan', included: false },
]

const SUITE_ROWS: ComparisonRow[] = [
  { text: 'Five neurological mechanisms, used together', included: true },
  { text: 'Cervical + occipital relief via Trigeminocervical Decompression', included: true },
  { text: 'Rhythmic pneumatic compression — built for Gate Control activation', included: true },
  { text: 'FL-41 filtration blocks up to 80% of the 480–520nm trigger band', included: true },
  { text: 'One suite, one price — replaces 4–5 separate purchases', included: true },
  { text: 'Includes the 30-Day Protocol and progression guide', included: true },
]

export default function ComparisonSuiteVsGeneric() {
  const handleScrollToOrder = () => {
    const cta = document.querySelector('.sp__cta-btn') as HTMLElement | null
    if (cta) {
      cta.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="comparison-suite-vs-generic"
      className="comp-section"
      aria-label="Sanctuary Suite vs Generic Solutions Comparison"
    >
      <div className="comp-container">
        {/* ── LEFT COLUMN: HEADLINE & NARRATIVE ───────────────────────── */}
        <div className="comp-left">
          <div className="comp-left-sticky">
            <h2 className="comp-headline">
              Compare the Sanctuary Suite to what you&apos;ve already tried
            </h2>
            <p className="comp-subhead">
              You haven&apos;t failed migraine management. Single-mechanism solutions have failed you.
              Here&apos;s what changes when five mechanisms work together.
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN: COMPARISON CARDS ──────────────────────────── */}
        <div className="comp-cards-grid">
          {/* ── CARD 1: Generic Single-Mechanism Solutions ── */}
          <motion.div
            className="comp-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Numeral Badge "1" */}
            <div className="comp-badge comp-badge--generic" aria-label="1 mechanism">
              1
            </div>

            {/* Product Image with Organic Blob */}
            <div className="comp-image-area">
              <div className="comp-blob comp-blob--card1" aria-hidden="true" />
              <div className="comp-image-wrap">
                <Image
                  src="/images/compare/cold-cap.png"
                  alt="Generic single-mechanism cold therapy wrap"
                  width={280}
                  height={220}
                  className="comp-product-img"
                />
              </div>
            </div>

            {/* Header info */}
            <div className="comp-card-header">
              <h3 className="comp-card-name">Generic Single-Mechanism Solutions</h3>
              <p className="comp-card-price comp-card-price--muted">
                $15–$200 (varies by category)
              </p>
            </div>

            {/* Comparison Rows */}
            <ul className="comp-rows" aria-label="Generic product features">
              {GENERIC_ROWS.map((row, idx) => (
                <li key={idx} className="comp-row">
                  <span className="comp-icon comp-icon--excluded" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
                        stroke="#8A8577"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="comp-row-text">{row.text}</span>
                </li>
              ))}
            </ul>

            {/* Empty footer spacer so row bottoms align */}
            <div className="comp-card-footer-spacer" aria-hidden="true" />
          </motion.div>

          {/* ── CARD 2: The Sanctuary Suite ── */}
          <motion.div
            className="comp-card comp-card--suite"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Numeral Badge "5" */}
            <div className="comp-badge comp-badge--suite" aria-label="5 mechanisms">
              5
            </div>

            {/* Product Image with Mirrored Organic Blob */}
            <div className="comp-image-area">
              <div className="comp-blob comp-blob--card2" aria-hidden="true" />
              <div className="comp-image-wrap">
                <Image
                  src="/images/compare/crowncalm.png"
                  alt="The CrownCalm Sanctuary Suite compound protocol"
                  width={280}
                  height={220}
                  className="comp-product-img"
                />
              </div>
            </div>

            {/* Header info */}
            <div className="comp-card-header">
              <h3 className="comp-card-name">The Sanctuary Suite</h3>
              <p className="comp-card-price comp-card-price--indigo">
                $345 — one-time, no subscription
              </p>
            </div>

            {/* Comparison Rows */}
            <ul className="comp-rows" aria-label="Sanctuary Suite features">
              {SUITE_ROWS.map((row, idx) => (
                <li key={idx} className="comp-row">
                  <span className="comp-icon comp-icon--included" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="comp-row-text">{row.text}</span>
                </li>
              ))}
            </ul>

            {/* Action CTA Button */}
            <div className="comp-card-cta-wrap">
              <button
                type="button"
                className="comp-cta-btn"
                onClick={handleScrollToOrder}
              >
                Begin the Protocol
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           SECTION CONTAINER — Cream #F5F0E8, No divider lines, 96–120px padding
           ========================================================================== */
        .comp-section {
          background-color: #F5F0E8;
          color: #1A1A2E;
          padding: clamp(96px, 10vw, 120px) max(24px, 4.5vw);
          position: relative;
        }

        .comp-container {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(300px, 360px) 1fr;
          gap: clamp(40px, 5vw, 68px);
          align-items: start;
        }

        /* ── LEFT COLUMN ────────────────────────────────────────────── */
        .comp-left {
          position: relative;
        }

        .comp-left-sticky {
          position: sticky;
          top: 100px;
        }

        .comp-headline {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.2vw, 42px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #1A1A2E;
          margin: 0 0 18px 0;
          text-wrap: balance;
        }

        .comp-subhead {
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.65;
          color: #4B506D;
          margin: 0;
          max-width: 360px;
        }

        /* ── RIGHT COLUMN: CARDS GRID ───────────────────────────────── */
        .comp-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        /* ── CARD CONTAINER ─────────────────────────────────────────── */
        .comp-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E5E0D5;
          padding: 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px -4px rgba(26, 26, 46, 0.04);
        }

        /* Numeral Badge overlapping top edge */
        .comp-badge {
          position: absolute;
          top: -14px;
          left: 24px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .comp-badge--generic {
          background-color: #E5E0D5;
          color: #1A1A2E;
        }

        .comp-badge--suite {
          background-color: #4361EE;
          color: #FFFFFF;
        }

        /* ── PRODUCT IMAGE & BLOB ───────────────────────────────────── */
        .comp-image-area {
          position: relative;
          height: 200px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .comp-blob {
          position: absolute;
          width: 180px;
          height: 180px;
          background-color: #4361EE;
          opacity: 0.07; /* 6-8% opacity */
          pointer-events: none;
        }

        .comp-blob--card1 {
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          transform: rotate(-10deg);
        }

        .comp-blob--card2 {
          border-radius: 58% 42% 30% 70% / 55% 55% 45% 45%;
          transform: scaleX(-1) rotate(10deg);
        }

        .comp-image-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comp-product-img {
          max-width: 230px;
          max-height: 170px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.04));
        }

        /* ── CARD HEADER (Name + Price) ─────────────────────────────── */
        .comp-card-header {
          margin-bottom: 24px;
          min-height: 64px;
        }

        .comp-card-name {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 600;
          line-height: 1.25;
          color: #1A1A2E;
          margin: 0 0 6px 0;
        }

        .comp-card-price {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .comp-card-price--muted {
          color: #78716C;
        }

        .comp-card-price--indigo {
          color: #4361EE;
          font-weight: 600;
        }

        /* ── COMPARISON ROWS ────────────────────────────────────────── */
        .comp-rows {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid #EFEBE4;
          flex-grow: 1;
        }

        .comp-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #EFEBE4;
        }

        /* 32x32px square check/X icon with 6px border radius */
        .comp-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Included row: Indigo #4361EE full opacity, white check */
        .comp-icon--included {
          background-color: #4361EE;
        }

        /* Excluded row: Neutral gray #E5E0D5, muted gray #8A8577 X (never red) */
        .comp-icon--excluded {
          background-color: #E5E0D5;
        }

        .comp-row-text {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.45;
          color: #1A1A2E;
        }

        /* ── FOOTER ACTIONS ─────────────────────────────────────────── */
        .comp-card-cta-wrap {
          margin-top: 28px;
        }

        .comp-card-footer-spacer {
          height: 48px;
          margin-top: 28px;
        }

        /* CTA button (Card 2 only): 8px radius, Navy #1A1A2E fill, white text */
        .comp-cta-btn {
          width: 100%;
          height: 48px;
          background-color: #1A1A2E;
          color: #FFFFFF;
          font-family: var(--font-body);
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 200ms ease, transform 150ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comp-cta-btn:hover {
          background-color: #2D2D4B;
          transform: translateY(-1px);
        }

        .comp-cta-btn:active {
          transform: translateY(0);
        }

        /* ── RESPONSIVE ADAPTATION ──────────────────────────────────── */
        @media (max-width: 1024px) {
          .comp-container {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .comp-left-sticky {
            position: static;
          }

          .comp-subhead {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .comp-section {
            padding: 72px 20px;
          }

          .comp-cards-grid {
            grid-template-columns: 1fr;
            gap: 32px; /* 32px vertical gap on mobile */
          }

          .comp-card {
            padding: 24px;
          }

          .comp-card-footer-spacer {
            display: none;
          }

          .comp-headline {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  )
}
