'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function PreFooterCtaBand() {
  const reduce = useReducedMotion()

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-50px' },
          transition: { duration: 0.6, delay, ease: EASE },
        }

  return (
    <section className="prefooter-cta" aria-labelledby="prefooter-cta-headline">
      <div className="prefooter-cta__glow" aria-hidden />

      <div className="prefooter-cta__container">
        <motion.p className="prefooter-cta__eyebrow" {...fadeUp(0.05)}>
          Take Back Your Days
        </motion.p>

        <motion.h2 id="prefooter-cta-headline" className="prefooter-cta__headline" {...fadeUp(0.12)}>
          <span className="prefooter-cta__headline-l1">The storm doesn&apos;t have to run your calendar.</span>
          <span className="prefooter-cta__headline-l2">
            Join 4,200+ people reclaiming certainty with our 30-day protocol trial.
          </span>
        </motion.h2>

        <motion.div className="prefooter-cta__actions" {...fadeUp(0.2)}>
          <a href="/products" className="prefooter-cta__btn">
            <span>Shop the Sanctuary Suite</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        <motion.div className="prefooter-cta__trust-row" {...fadeUp(0.28)}>
          <span>Free 2-Day Insured Delivery</span>
          <span className="prefooter-cta__dot" aria-hidden>·</span>
          <span>HSA / FSA Eligible</span>
          <span className="prefooter-cta__dot" aria-hidden>·</span>
          <span>30-Day Full Refund Guarantee</span>
        </motion.div>
      </div>

      <style>{`
        .prefooter-cta {
          position: relative;
          background: var(--color-dark-section, #0A0A0F);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: clamp(96px, 11vw, 144px) var(--padding-page-x);
          color: #FAFAF9;
          text-align: center;
          overflow: hidden;
        }
        .prefooter-cta__glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 360px;
          background: radial-gradient(ellipse at center, rgba(74, 127, 201, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .prefooter-cta__container {
          position: relative;
          z-index: 1;
          max-width: 880px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .prefooter-cta__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 20px;
        }
        .prefooter-cta__headline {
          font-family: var(--font-display);
          font-size: var(--text-display-xl);
          line-height: var(--leading-display);
          letter-spacing: var(--tracking-display);
          margin: 0 0 clamp(32px, 4vw, 44px);
        }
        .prefooter-cta__headline-l1 {
          display: block;
          font-weight: 700;
          color: #FAFAF9;
        }
        .prefooter-cta__headline-l2 {
          display: block;
          font-weight: 500;
          font-size: clamp(16px, 1.8vw, 22px);
          color: #8E8E93;
          margin-top: 14px;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }
        .prefooter-cta__actions {
          margin-bottom: 32px;
        }
        .prefooter-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FAFAF9;
          color: #0F0F0F;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 16px 36px;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          transition: transform 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
                      background-color 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
                      box-shadow 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .prefooter-cta__btn:hover {
          background: #FFFFFF;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
        }
        .prefooter-cta__btn:active {
          transform: translateY(0);
        }
        .prefooter-cta__trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .prefooter-cta__dot {
          opacity: 0.4;
        }
        @media (max-width: 640px) {
          .prefooter-cta__btn {
            width: 100%;
            justify-content: center;
          }
          .prefooter-cta__trust-row {
            flex-direction: column;
            gap: 6px;
          }
          .prefooter-cta__dot {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
