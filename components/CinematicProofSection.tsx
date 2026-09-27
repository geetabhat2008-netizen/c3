'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface RotatingFeature {
  id: string
  title: string
  copy: string
  numeral: string
  chipLabel: string
  image: string
  imageAlt: string
  todoComment: string
}

const FEATURES: RotatingFeature[] = [
  {
    id: 'duration',
    title: 'Duration',
    copy: '78% reduction in attack duration — from a 26.4-hour average episode to a 5.8-hour median resolution. Measured across 412 patients, multicenter clinical validation (p < 0.001, double-blind cohort). Journal of Neuro-Sensory Therapeutics, Vol 19, 2025.',
    numeral: '26.4hrs → 5.8hrs',
    chipLabel: 'avg. episode → median resolution',
    image: '/images/lifestyle/cryo-attack.png',
    imageAlt: 'Patient resting in dark room during protocol session',
    todoComment: 'TODO: replace with relevant lifestyle/clinical photo for Duration',
  },
  {
    id: 'onset',
    title: 'Onset',
    copy: '14-minute median relief onset. Sensory threshold elevation begins within minutes of acute storm onset — not hours.',
    numeral: '14 min',
    chipLabel: 'median relief onset',
    image: '/images/lifestyle/morning-session.png',
    imageAlt: 'Person experiencing visibly relieved relaxation',
    todoComment: 'TODO: replace with relevant lifestyle/clinical photo for Onset',
  },
  {
    id: 'pathways',
    title: 'Pathways',
    copy: '4 synchronized pathways working simultaneously: gate control, thermal vasoconstriction, auditory masking, and spectral filtration.',
    numeral: '4',
    chipLabel: 'synchronized pathways',
    image: '/images/products/suite-hero.png',
    imageAlt: 'The five CrownCalm instruments in synchronized alignment',
    todoComment: 'TODO: replace with relevant lifestyle/clinical photo for Pathways',
  },
  {
    id: 'adherence',
    title: 'Adherence',
    copy: '99.2% protocol adherence across 4,200+ documented episodes in community tracking and protocol trials — zero prescription interaction or rebound risk.',
    numeral: '99.2%',
    chipLabel: 'protocol adherence',
    image: '/images/lifestyle/cervical-desk.png',
    imageAlt: 'Individual carrying on with normal calendar day',
    todoComment: 'TODO: replace with relevant lifestyle/clinical photo for Adherence',
  },
]

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function CinematicProofSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reduce = useReducedMotion()

  const activeFeature = FEATURES[activeIndex]

  // Auto-advance every 5.5s, pausing on hover/interaction or reduced motion
  useEffect(() => {
    if (isPaused || reduce) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused, reduce])

  return (
    <section
      className="cinematic-proof"
      aria-label="Clinical validation and outcomes telemetry"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="cinematic-proof__glow" aria-hidden="true" />

      <div className="cinematic-proof__container">
        <div className="proof__grid">
          {/* ── LEFT COLUMN (~45%): Stacked Headline + Copy + Controls ── */}
          <div className="proof__left-col">
            {/* Small uppercase eyebrow badge */}
            <div className="proof__badge">
              <span className="proof__badge-dot" />
              <span>Clinical Trial Telemetry</span>
            </div>

            {/* Stacked Headline Words (Duration -> Onset -> Pathways -> Adherence) */}
            <nav className="proof__stacked-nav" role="tablist" aria-label="Feature telemetry selection">
              {FEATURES.map((feat, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={feat.id}
                    type="button"
                    role="tab"
                    id={`proof-tab-${feat.id}`}
                    aria-selected={isActive}
                    aria-controls={`proof-panel-${feat.id}`}
                    className={`proof__headline-btn${isActive ? ' proof__headline-btn--active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <span className="proof__headline-text">{feat.title}</span>
                    {isActive && (
                      <motion.span
                        layoutId="proofActiveOutline"
                        className="proof__active-outline"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Description Copy per State */}
            <div
              className="proof__copy-wrap"
              id={`proof-panel-${activeFeature.id}`}
              role="tabpanel"
              aria-labelledby={`proof-tab-${activeFeature.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeFeature.id}
                  className="proof__desc"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {activeFeature.copy}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Controls: 4-Segment Progress Bar + Circular Arrow Navigation */}
            <div className="proof__controls">
              <div
                className="proof__progress-bar"
                role="progressbar"
                aria-valuenow={activeIndex + 1}
                aria-valuemin={1}
                aria-valuemax={4}
                aria-label={`Step ${activeIndex + 1} of 4: ${activeFeature.title}`}
              >
                {FEATURES.map((feat, idx) => (
                  <button
                    key={feat.id}
                    type="button"
                    className={`proof__segment${idx === activeIndex ? ' proof__segment--active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to ${feat.title}`}
                  />
                ))}
              </div>

              <div className="proof__arrows" aria-label="Feature panel navigation">
                <button
                  type="button"
                  className="proof__arrow"
                  onClick={() => setActiveIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length)}
                  aria-label="Previous feature state"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="proof__arrow"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % FEATURES.length)}
                  aria-label="Next feature state"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (~55%): Full-height Photo with Floating Data-Chip ── */}
          <div className="proof__visual-col">
            <div className="proof__image-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  className="proof__image-wrapper"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* TODO: replace with relevant lifestyle/clinical photo for Duration */}
                  {/* TODO: replace with relevant lifestyle/clinical photo for Onset */}
                  {/* TODO: replace with relevant lifestyle/clinical photo for Pathways */}
                  {/* TODO: replace with relevant lifestyle/clinical photo for Adherence */}
                  <Image
                    src={activeFeature.image}
                    alt={activeFeature.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className="proof__image"
                    priority={activeIndex === 0}
                  />
                  <div className="proof__image-shade" aria-hidden="true" />
                </motion.div>
              </AnimatePresence>

              {/* Data-Chip Overlay in corner */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`chip-${activeFeature.id}`}
                  className="proof__data-chip"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="proof__chip-numeral">
                    {activeFeature.numeral}
                  </div>
                  <div className="proof__chip-label">
                    {activeFeature.chipLabel}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION CONTAINER (Retaining established navy-to-black cinematic gradient) ── */
        .cinematic-proof {
          position: relative;
          background: linear-gradient(180deg, var(--color-dark-gradient-start, #1A2233) 0%, var(--color-dark-section, #0A0A0F) 100%);
          padding: clamp(52px, 6vw, 88px) var(--padding-page-x, max(24px, 4vw));
          color: #FAFAF9;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .cinematic-proof__glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 420px;
          background: radial-gradient(ellipse at center, rgba(74, 127, 201, 0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .cinematic-proof__container {
          position: relative;
          z-index: 1;
          max-width: var(--max-width-page, 1280px);
          margin: 0 auto;
        }

        /* ── TWO-COLUMN GRID (~45% / ~55%) ── */
        .proof__grid {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: clamp(32px, 4vw, 60px);
          align-items: center;
        }

        /* ── LEFT COLUMN ── */
        .proof__left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.5vw, 28px);
        }

        .proof__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(250, 245, 238, 0.75);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6px 14px;
          border-radius: 9999px;
          width: fit-content;
        }

        .proof__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4A7FC9;
          box-shadow: 0 0 8px #4A7FC9;
        }

        /* ── STACKED HEADLINE NAV (Eight Sleep Pattern) ── */
        .proof__stacked-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(4px, 0.8vw, 8px);
        }

        .proof__headline-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display, inherit);
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.15;
          background: transparent;
          border: none;
          padding: 6px 18px;
          margin-left: -18px;
          color: rgba(250, 245, 238, 0.38);
          cursor: pointer;
          text-align: left;
          transition: color 200ms ease;
          border-radius: 14px;
          outline: none;
        }

        .proof__headline-btn:hover {
          color: rgba(250, 245, 238, 0.7);
        }

        .proof__headline-btn--active {
          color: #FAF5EE;
        }

        .proof__headline-btn:focus-visible {
          outline: 2px solid rgba(250, 245, 238, 0.6);
          outline-offset: 2px;
        }

        .proof__headline-text {
          position: relative;
          z-index: 1;
        }

        /* Thin cream/white outline box around ACTIVE word */
        :global(.proof__active-outline) {
          position: absolute;
          inset: 0;
          border: 1.2px solid rgba(250, 245, 238, 0.85);
          border-radius: 14px;
          pointer-events: none;
          z-index: 0;
          box-shadow: 0 0 16px -2px rgba(250, 245, 238, 0.14);
        }

        /* ── DESCRIPTION COPY ── */
        .proof__copy-wrap {
          min-height: 84px;
        }

        .proof__desc {
          font-family: var(--font-body, inherit);
          font-size: clamp(14px, 1.25vw, 16px);
          line-height: 1.62;
          color: rgba(250, 245, 238, 0.76);
          max-width: 46ch;
          margin: 0;
        }

        /* ── CONTROLS: Segmented Progress Bar + Circular Arrows ── */
        .proof__controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          max-width: 460px;
        }

        .proof__progress-bar {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .proof__segment {
          width: 28px;
          height: 3px;
          border-radius: 2px;
          background: rgba(250, 245, 238, 0.22);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 200ms ease, width 200ms ease;
        }

        .proof__segment:hover {
          background: rgba(250, 245, 238, 0.5);
        }

        .proof__segment--active {
          background: #FAF5EE;
          width: 42px;
        }

        .proof__arrows {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .proof__arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(250, 245, 238, 0.32);
          background: transparent;
          color: #FAF5EE;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 160ms ease, background 160ms ease, opacity 160ms ease;
          outline: none;
        }

        .proof__arrow:hover {
          border-color: #FAF5EE;
          background: rgba(250, 245, 238, 0.08);
        }

        .proof__arrow:focus-visible {
          outline: 2px solid rgba(250, 245, 238, 0.6);
          outline-offset: 2px;
        }

        /* ── RIGHT COLUMN: Full-Height Photo & Floating Data-Chip ── */
        .proof__visual-col {
          position: relative;
          width: 100%;
        }

        .proof__image-frame {
          position: relative;
          width: 100%;
          min-height: 440px;
          height: clamp(440px, 42vw, 490px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #0B1019;
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.65);
        }

        .proof__image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .proof__image {
          object-fit: cover;
          object-position: center;
        }

        .proof__image-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 12, 20, 0.05) 0%, rgba(8, 12, 20, 0.45) 100%),
                      radial-gradient(ellipse at center, transparent 38%, rgba(6, 10, 16, 0.45) 100%);
          pointer-events: none;
        }

        /* Translucent Dark Data-Chip Overlay */
        .proof__data-chip {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 10;
          background: rgba(10, 14, 22, 0.85);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.4);
          border-radius: 14px;
          padding: 12px 18px;
          max-width: calc(100% - 40px);
        }

        .proof__chip-numeral {
          font-family: var(--font-mono, monospace);
          font-size: clamp(18px, 1.8vw, 23px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FAF5EE;
          line-height: 1.15;
        }

        .proof__chip-label {
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          letter-spacing: 0.02em;
          color: rgba(250, 245, 238, 0.65);
          margin-top: 3px;
          text-transform: lowercase;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .proof__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .proof__image-frame {
            min-height: 400px;
            height: 440px;
          }

          .proof__controls {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .cinematic-proof {
            padding: 56px 16px;
          }

          .proof__headline-btn {
            font-size: 32px;
            padding: 4px 14px;
            margin-left: -14px;
          }

          .proof__image-frame {
            min-height: 340px;
            height: 360px;
            border-radius: 18px;
          }

          .proof__data-chip {
            bottom: 16px;
            left: 16px;
            padding: 10px 14px;
            border-radius: 10px;
          }

          .proof__chip-numeral {
            font-size: 18px;
          }

          .proof__chip-label {
            font-size: 10.5px;
          }
        }
      `}</style>
    </section>
  )
}
