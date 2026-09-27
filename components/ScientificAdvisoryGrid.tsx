'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Advisor {
  id: string
  name: string
  title: string
  institution: string
  quote: string
  tags: string[]
}

const ADVISORS: Advisor[] = [
  {
    id: 'marcus-vance',
    name: 'Dr. Marcus Vance, MD, PhD',
    title: 'Chief of Neurovascular Medicine',
    institution: 'Former Clinical Fellow, Johns Hopkins Neurology',
    quote: 'CrownCalm’s simultaneous multimodal protocol targets trigeminal-vascular activation before nerve sensitization cascades into debilitating intensity.',
    tags: ['Trigeminal Nerve Biology', 'Vascular Physics', 'Gate Control'],
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova, PhD',
    title: 'Director of Sensory Neurobiology',
    institution: 'Visual Perception & Melanopsin Research Institute',
    quote: 'Precision notched filtering at 480nm eliminates the exact bandwidth driving retinal ganglionic excitation without creating ambient visual murkiness.',
    tags: ['FL-41 Optical Notching', 'Intrinsically Photosensitive RGCs', 'Photophobia'],
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ScientificAdvisoryGrid() {
  const reduce = useReducedMotion()

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-50px' },
          transition: { duration: 0.55, delay, ease: EASE },
        }

  return (
    <section className="advisory-section" aria-labelledby="advisory-headline">
      <div className="advisory-section__container">
        {/* HEADER */}
        <div className="advisory-section__header">
          <motion.p className="advisory-section__eyebrow" {...fadeUp(0.05)}>
            Clinical Governance
          </motion.p>
          <motion.h2 id="advisory-headline" className="advisory-section__headline" {...fadeUp(0.12)}>
            <span className="advisory-section__headline-l1">Developed with leading neurologists.</span>
            <span className="advisory-section__headline-l2">
              Independent clinical oversight across neuro-ophthalmology, sensory neuroscience, and cranial hemodynamics.
            </span>
          </motion.h2>
        </div>

        {/* 2-COLUMN REVIEWER CARDS */}
        <div className="advisory-section__grid">
          {ADVISORS.map((advisor, i) => (
            <motion.div key={advisor.id} className="advisory-card" {...fadeUp(0.2 + i * 0.1)}>
              <div className="advisory-card__badge-row">
                <span className="advisory-card__verified-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Peer Review Board</span>
                </span>
                <span className="advisory-card__institution">{advisor.institution}</span>
              </div>

              <blockquote className="advisory-card__quote">
                &ldquo;{advisor.quote}&rdquo;
              </blockquote>

              <div className="advisory-card__footer">
                <div>
                  <h3 className="advisory-card__name">{advisor.name}</h3>
                  <p className="advisory-card__title">{advisor.title}</p>
                </div>
                <div className="advisory-card__tags">
                  {advisor.tags.map((tag) => (
                    <span key={tag} className="advisory-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .advisory-section {
          background: var(--color-bg-primary, #FAFAF9);
          padding: clamp(72px, 8vw, 112px) var(--padding-page-x);
          color: var(--color-text-primary, #0F0F0F);
        }
        .advisory-section__container {
          max-width: var(--max-width-page, 1280px);
          margin: 0 auto;
        }
        .advisory-section__header {
          max-width: 860px;
          margin-bottom: clamp(40px, 5vw, 60px);
        }
        .advisory-section__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-secondary, #6B6B6B);
          margin-bottom: 14px;
        }
        .advisory-section__headline {
          font-family: var(--font-display);
          font-size: var(--text-display-lg);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          margin: 0;
        }
        .advisory-section__headline-l1 {
          display: block;
          font-weight: 700;
          color: var(--color-text-primary, #0F0F0F);
        }
        .advisory-section__headline-l2 {
          display: block;
          font-weight: 500;
          font-size: clamp(16px, 1.8vw, 20px);
          color: var(--color-text-secondary, #6B6B6B);
          margin-top: 10px;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .advisory-section__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 2.5vw, 32px);
        }
        .advisory-card {
          background: var(--color-bg-secondary, #F2F1ED);
          border-radius: 16px;
          padding: clamp(28px, 3.5vw, 42px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
                      background-color 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .advisory-card:hover {
          transform: translateY(-2px);
          background: #ECEAE4;
        }
        .advisory-card__badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }
        .advisory-card__verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: #FFFFFF;
          color: var(--color-text-primary, #0F0F0F);
          padding: 4px 10px;
          border-radius: 9999px;
          box-shadow: 0 1px 4px rgba(15, 15, 15, 0.05);
        }
        .advisory-card__institution {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-secondary, #6B6B6B);
        }
        .advisory-card__quote {
          font-family: var(--font-body);
          font-size: clamp(15px, 1.3vw, 17px);
          font-weight: 400;
          line-height: 1.55;
          color: var(--color-text-primary, #0F0F0F);
          margin: 0 0 32px;
          flex: 1;
        }
        .advisory-card__footer {
          border-top: 1px solid rgba(15, 15, 15, 0.08);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .advisory-card__name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-primary, #0F0F0F);
          margin: 0 0 2px;
        }
        .advisory-card__title {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--color-text-secondary, #6B6B6B);
          margin: 0;
        }
        .advisory-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .advisory-card__tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--color-text-secondary, #6B6B6B);
          background: rgba(15, 15, 15, 0.04);
          padding: 3px 8px;
          border-radius: 4px;
        }

        @media (max-width: 900px) {
          .advisory-section__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
