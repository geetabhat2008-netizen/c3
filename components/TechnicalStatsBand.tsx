'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface StatItem {
  id: string
  number: string
  unit?: string
  headline: string
  subline: string
}

const STATS: StatItem[] = [
  {
    id: 'episodes',
    number: '4,200+',
    headline: 'Documented Episodes',
    subline: 'Across community tracking & protocol trials',
  },
  {
    id: 'onset',
    number: '14',
    unit: 'min',
    headline: 'Median Relief Onset',
    subline: 'Sensory threshold elevation under acute storm',
  },
  {
    id: 'pathways',
    number: '4',
    headline: 'Synchronized Pathways',
    subline: 'Gate control, thermal, auditory, & spectral',
  },
  {
    id: 'adherence',
    number: '99.2%',
    headline: 'Protocol Adherence',
    subline: 'Zero prescription interaction or rebound risk',
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function TechnicalStatsBand() {
  const reduce = useReducedMotion()

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.5, delay, ease: EASE },
        }

  return (
    <section className="tech-stats" aria-label="Technical outcomes and validation metrics">
      <div className="tech-stats__container">
        <div className="tech-stats__grid">
          {STATS.map((stat, i) => (
            <motion.div key={stat.id} className="tech-stats__item" {...fadeUp(i * 0.08)}>
              <div className="tech-stats__num-row">
                <span className="tech-stats__num">{stat.number}</span>
                {stat.unit && <span className="tech-stats__unit">{stat.unit}</span>}
              </div>
              <h3 className="tech-stats__label">{stat.headline}</h3>
              <p className="tech-stats__sub">{stat.subline}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-stats {
          background: var(--color-dark-section, #0A0A0F);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: clamp(52px, 6vw, 76px) var(--padding-page-x);
          color: #FAFAF9;
        }
        .tech-stats__container {
          max-width: var(--max-width-page, 1280px);
          margin: 0 auto;
        }
        .tech-stats__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3.5vw, 44px);
        }
        .tech-stats__item {
          display: flex;
          flex-direction: column;
          padding-right: 12px;
        }
        .tech-stats__num-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 10px;
        }
        .tech-stats__num {
          font-family: var(--font-mono);
          font-size: clamp(34px, 3.8vw, 48px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #FAFAF9;
        }
        .tech-stats__unit {
          font-family: var(--font-mono);
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
        }
        .tech-stats__label {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.3;
          color: #FAFAF9;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .tech-stats__sub {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }
        @media (max-width: 960px) {
          .tech-stats__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px 24px;
          }
        }
        @media (max-width: 540px) {
          .tech-stats__grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </section>
  )
}
