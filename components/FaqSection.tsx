'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  DATA — grouped by topic with dedicated mechanism icons            */
/* ------------------------------------------------------------------ */

interface FaqItem {
  q: string
  a: string
  icon: React.ReactNode
}

interface TopicGroup {
  id: string
  label: string
  faqs: FaqItem[]
}

const TOPICS: TopicGroup[] = [
  {
    id: 'using',
    label: 'Using the Suite',
    faqs: [
      {
        q: 'Can I use it during an attack?',
        a: 'Yes — that is exactly what it is built for. Every module operates silently and in complete darkness. No screens, no app required mid-attack, no bright status lights.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        ),
      },
      {
        q: 'How long is a session?',
        a: 'The core calibration is 15 minutes. Each module holds its own therapeutic window — the massager auto-stops at 15 minutes to prevent habituation, the cryo-wrap caps at 20 minutes to avoid paradoxical vasodilation.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 14" />
          </svg>
        ),
      },
      {
        q: 'Do I need an app or a screen?',
        a: 'No. Every module runs standalone, from physical controls. Mid-attack operation is entirely screen-free by design — light is an input we refuse to add.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'science',
    label: 'The Science',
    faqs: [
      {
        q: 'How is this different from a massage gun or an ice hat?',
        a: 'Those address one mechanism. A migraine attack involves five — vascular pressure, photophobia, thermal dysregulation, phonophobia, and cervical tension. The Suite is the only system designed to cover all five at once.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        ),
      },
      {
        q: 'Why five mechanisms at once?',
        a: 'Because your threshold is a bucket, not a switch. Each unmanaged input keeps filling it. Managing one input while four keep pouring rarely changes the overflow. Managing all five does.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
      },
      {
        q: 'Is this a medical treatment?',
        a: 'No — and we will not pretend otherwise. The Suite does not treat or cure migraine. It manages the sensory conditions around your nervous system, and it works alongside whatever your clinician prescribes.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="12" y1="8" x2="12" y2="14" />
            <line x1="9" y1="11" x2="15" y2="11" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'guarantee',
    label: 'Guarantee & Returns',
    faqs: [
      {
        q: 'What if it does not work for me?',
        a: 'Follow the protocol for 30 days. If you experience no meaningful reduction in sensory burden, we issue a full refund. We guarantee the system — not just the hardware.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21.5 2v6h-6" />
            <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
          </svg>
        ),
      },
      {
        q: 'Why is the guarantee tied to the protocol?',
        a: 'Because the Suite is a system, not a gadget. Used at random, any single module underperforms. The 30-Day Protocol is the tested sequence — commit to it, and the refund terms commit to you.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="9" y1="7" x2="15" y2="7" />
            <line x1="9" y1="11" x2="13" y2="11" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing & Payment',
    faqs: [
      {
        q: 'Is it really a one-time purchase?',
        a: 'Yes. $345, once. No subscription, no refills, no consumables. Every module is rechargeable and built to last years, not months.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.083-8-12.178-8-5.096 0-5.096 8 0 8 5.095 0 7.083-8 12.178-8z" />
          </svg>
        ),
      },
      {
        q: 'Can I pay with HSA or FSA funds?',
        a: 'Yes — the Suite is HSA / FSA eligible. Using pre-tax health dollars, the effective post-tax cost for most users is under $260.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <line x1="6" y1="15" x2="10" y2="15" />
            <line x1="14" y1="15" x2="18" y2="15" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    faqs: [
      {
        q: 'How long does shipping take?',
        a: 'Orders ship within 24 hours. Delivery is 2–4 business days in the US. The Sanctuary Protocol ebook is delivered instantly by email.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        ),
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently the US and Canada. The Sanctuary Protocol ebook is delivered worldwide, instantly — hardware regions are expanding through the year.',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

export default function FaqSection() {
  const reduce = useReducedMotion()
  const [topic, setTopic] = useState(0)
  const [open, setOpen] = useState<number | null>(0) // Question 0 pre-expanded by default

  const activeTopic = TOPICS[topic]

  const selectTopic = (i: number) => {
    setTopic(i)
    setOpen(0) // Pre-expand first question of selected topic
  }

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: 'easeOut' as const },
  })

  return (
    <section id="faq-honestly-answered" className="faq" aria-labelledby="faq-heading">
      {/* Anchor for backward compatibility with #faq links */}
      <span id="faq" style={{ position: 'absolute', top: '-100px' }} aria-hidden="true" />

      <div className="faq__inner">
        {/* ── TOP ROW: HEADLINE + IMAGE CLUSTER (45% / 55%) ── */}
        <div className="faq__top-row">
          {/* Left: Headline block */}
          <motion.div className="faq__head-block" {...fadeUp(0)}>
            <h2 id="faq-heading" className="faq__title">
              <span className="faq__title-l1">Frequently asked,</span>
              <span className="faq__title-l2">honestly answered.</span>
            </h2>
            <p className="faq__subhead">
              Everything the label does not tell you &mdash; mechanisms, limits, and the guarantee, in plain language.
            </p>
          </motion.div>

          {/* Right: Image Cluster (Optic Shield, Customer photo, Cervical module) */}
          <motion.div className="faq__cluster-wrap" {...fadeUp(0.12)}>
            <div className="faq__cluster">
              {/* Image 1 — Anchor (largest, Optic Shield glasses 280×200) */}
              <div className="faq__img-card faq__img-card--anchor">
                <Image
                  src="/images/products/glasses-hero.png"
                  alt="CrownCalm Optic Shield glasses macro product shot"
                  width={280}
                  height={200}
                  className="faq__img"
                  sizes="(max-width: 768px) 100vw, 280px"
                  priority={false}
                />
              </div>

              {/* Image 2 — Customer photo (120×120 square, 3deg rotation, top-right) */}
              <div className="faq__img-card faq__img-card--customer">
                <Image
                  src="/images/testimonials/elena-v.png"
                  alt="Elena V., verified CrownCalm customer"
                  width={120}
                  height={120}
                  className="faq__img"
                  sizes="120px"
                  priority={false}
                />
              </div>

              {/* Image 3 — Second product shot (Cervical Axis Module 200×150, bottom-left) */}
              <div className="faq__img-card faq__img-card--cervical">
                <Image
                  src="/images/products/cervical-hero.png"
                  alt="CrownCalm Cervical Axis Module macro product shot"
                  width={200}
                  height={150}
                  className="faq__img"
                  sizes="200px"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: TOPIC SIDEBAR + QUESTION LIST (25% / 75%) ── */}
        <div className="faq__bottom-row">
          {/* Left: Topic Sidebar */}
          <motion.nav className="faq__sidebar-nav" aria-label="FAQ topics" {...fadeUp(0.16)}>
            <div className="faq__topic-head">
              <span className="faq__topic-label">TOPIC</span>
              <span className="faq__topic-italic" aria-hidden="true">&mdash; {activeTopic.label}</span>
            </div>

            <div className="faq__pills-wrapper">
              <ul className="faq__topic-list" role="tablist">
                {TOPICS.map((t, i) => {
                  const isActive = i === topic
                  return (
                    <li key={t.id} className="faq__topic-item">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`faq__topic-btn ${isActive ? 'faq__topic-btn--active' : ''}`}
                        onClick={() => selectTopic(i)}
                      >
                        <span className="faq__topic-bullet" aria-hidden="true" />
                        <span className="faq__topic-name">{t.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {/* Right-edge fade gradient to signal more pills on mobile */}
              <div className="faq__pills-fade" aria-hidden="true" />
            </div>
          </motion.nav>

          {/* Right: Question List */}
          <motion.div className="faq__questions-col" {...fadeUp(0.18)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTopic.id}
                className="faq__accordion"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={reduce ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
              >
                {activeTopic.faqs.map((item, i) => {
                  const isOpen = open === i
                  const numStr = String(i + 1).padStart(2, '0')

                  return (
                    <div
                      key={item.q}
                      className={`faq__row ${isOpen ? 'faq__row--open' : 'faq__row--closed'}`}
                    >
                      <h3 className="faq__q-heading">
                        <button
                          type="button"
                          className="faq__q-btn"
                          aria-expanded={isOpen}
                          aria-controls={`faq-ans-${activeTopic.id}-${i}`}
                          id={`faq-btn-${activeTopic.id}-${i}`}
                          onClick={() => setOpen(isOpen ? null : i)}
                        >
                          <div className="faq__q-left">
                            {/* Fraunces serif numeral for quiet typographic authority */}
                            <span className="faq__num" aria-hidden="true">{numStr}</span>

                            {/* Tailored mechanism monoline icon */}
                            <span className="faq__icon" aria-hidden="true">
                              {item.icon}
                            </span>

                            {/* Question text */}
                            <span className="faq__q-text">{item.q}</span>
                          </div>

                          {/* + / − Toggle in Fira Code */}
                          <span className="faq__toggle-hit" aria-hidden="true">
                            <span className={`faq__toggle-circle ${isOpen ? 'faq__toggle-circle--open' : ''}`}>
                              <span className="faq__toggle-symbol">{isOpen ? '−' : '+'}</span>
                            </span>
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-ans-${activeTopic.id}-${i}`}
                            role="region"
                            aria-labelledby={`faq-btn-${activeTopic.id}-${i}`}
                            initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduce ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={
                              reduce ? { duration: 0 } : { duration: 0.26, ease: 'easeOut' }
                            }
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="faq__a-content">
                              <p className="faq__a-text">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* Closing Line with 64px generous top margin */}
            <p className="faq__closing-line">
              Still unsure? Write to us at{' '}
              <a href="mailto:care@crowncalm.com" className="faq__closing-link">
                care@crowncalm.com
              </a>{' '}
              &mdash; a human replies within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION CONTAINER ── */
        .faq {
          position: relative;
          background: #F5F0E8; /* Cream throughout — seamless light palette */
          padding: 120px 80px; /* Desktop specs: 120px top/bottom, 80px horizontal margin */
          width: 100%;
        }

        .faq__inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── TOP ROW: HEADLINE + IMAGE CLUSTER (45% / 55%) ── */
        .faq__top-row {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 40px;
          align-items: center;
        }

        /* Headline block */
        .faq__head-block {
          max-width: 480px;
        }

        .faq__title {
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-size: 48px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .faq__title-l1 {
          display: block;
          color: #1A1A2E;
        }
        .faq__title-l2 {
          display: block;
          color: rgba(26, 26, 46, 0.70); /* Navy at 70% opacity */
        }

        .faq__subhead {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(26, 26, 46, 0.65); /* Navy at 65% opacity */
          max-width: 380px; /* Wraps to 2 lines */
          margin: 0;
        }

        /* Image cluster (top-right, three photos on Cream bg) */
        .faq__cluster-wrap {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .faq__cluster {
          position: relative;
          width: 420px;
          height: 270px;
        }

        .faq__img-card {
          position: absolute;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(26, 26, 46, 0.08); /* Soft, light shadow */
          overflow: hidden;
          background: #FAF7F2;
        }

        .faq__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Image 1: Anchor (Optic Shield glasses macro, 280×200) */
        .faq__img-card--anchor {
          top: 0;
          left: 40px;
          width: 280px;
          height: 200px;
          z-index: 2;
        }

        /* Image 2: Customer photo (120×120 square, 3deg rotation, top-right) */
        .faq__img-card--customer {
          top: 6px;
          left: 285px;
          width: 120px;
          height: 120px;
          transform: rotate(3deg);
          z-index: 3;
        }

        /* Image 3: Cervical Axis Module (200×150, bottom-left) */
        .faq__img-card--cervical {
          top: 115px;
          left: 0;
          width: 200px;
          height: 150px;
          z-index: 4;
        }

        /* ── BOTTOM ROW: TOPIC SIDEBAR + QUESTION LIST (25% / 75%) ── */
        .faq__bottom-row {
          display: grid;
          grid-template-columns: 25% 75%;
          gap: 28px;
          margin-top: 80px;
          align-items: start;
        }

        /* Topic sidebar (left) */
        .faq__sidebar-nav {
          display: flex;
          flex-direction: column;
        }

        .faq__topic-head {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin: 0 0 16px;
        }

        .faq__topic-label {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(26, 26, 46, 0.50); /* Navy at 50% opacity */
          text-transform: uppercase;
        }

        .faq__topic-italic {
          font-family: var(--font-fraunces, 'Fraunces', serif);
          font-style: italic;
          font-size: 14.5px;
          color: #1A1A2E;
          letter-spacing: 0;
          opacity: 0.85;
        }

        .faq__pills-wrapper {
          position: relative;
          width: 100%;
        }

        .faq__pills-fade {
          display: none;
        }

        /* Deliberately tighter vertical spacing: 12px gap between topics */
        .faq__topic-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq__topic-item {
          display: block;
        }

        .faq__topic-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 6px 0 6px 2px;
          cursor: pointer;
          outline: none;
          transition: color 150ms ease;
        }

        .faq__topic-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(26, 26, 46, 0.25);
          transition: background-color 150ms ease, transform 150ms ease;
          flex-shrink: 0;
        }

        .faq__topic-name {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 15.5px;
          font-weight: 400;
          color: rgba(26, 26, 46, 0.55); /* Navy at 55% opacity */
          transition: color 150ms ease;
        }

        .faq__topic-btn:hover .faq__topic-name {
          color: rgba(26, 26, 46, 0.85);
        }

        .faq__topic-btn:hover .faq__topic-bullet {
          background: rgba(26, 26, 46, 0.5);
        }

        .faq__topic-btn:focus-visible {
          outline: 2px solid #1A1A2E;
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Active Topic: Understated Navy weight + dot accent — NO AI blue line */
        .faq__topic-btn--active .faq__topic-name {
          color: #1A1A2E !important;
          font-weight: 600;
        }

        .faq__topic-btn--active .faq__topic-bullet {
          background: #1A1A2E !important;
          transform: scale(1.3);
        }

        /* ── QUESTION LIST (RIGHT COLUMN) ── */
        .faq__questions-col {
          display: flex;
          flex-direction: column;
        }

        .faq__accordion {
          display: flex;
          flex-direction: column;
        }

        /* ── BREAKING THE UNIFORM WHITE-RECTANGLE RULE ── */
        /* Collapsed item: Hairline top border only (1px Navy at 10%), no full box, no side borders */
        .faq__row--closed {
          background: transparent;
          border-top: 1px solid rgba(26, 26, 46, 0.10);
          border-bottom: none;
          border-left: none;
          border-right: none;
          padding: 20px 4px;
          transition: background-color 200ms ease, padding 200ms ease;
        }

        .faq__row--closed:first-child {
          border-top: 1px solid rgba(26, 26, 46, 0.10);
        }

        /* Active / elevated card: True elevated element with depth, 16px radius, warm background — NO blue line */
        .faq__row--open {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid rgba(229, 224, 213, 0.85);
          /* Soft two-layer shadow */
          box-shadow: 0 2px 4px rgba(26, 26, 46, 0.04), 0 12px 24px rgba(26, 26, 46, 0.08);
          /* Slightly asymmetric internal padding (more top padding for breathing room) */
          padding: 28px 28px 24px 28px;
          margin: 10px 0;
          transition: all 250ms ease;
        }

        .faq__q-heading {
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
        }

        .faq__q-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          outline: none;
        }

        .faq__q-btn:focus-visible {
          outline: 2px solid #1A1A2E;
          outline-offset: 4px;
          border-radius: 6px;
        }

        .faq__q-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        /* 1. Fraunces serif numeral (01, 02, 03) in Navy at 30% */
        .faq__num {
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-size: 26px;
          font-weight: 400;
          color: rgba(26, 26, 46, 0.30);
          line-height: 1;
          min-width: 32px;
          letter-spacing: -0.02em;
          flex-shrink: 0;
          transition: color 200ms ease;
        }

        .faq__row--open .faq__num {
          color: rgba(26, 26, 46, 0.65);
        }

        /* 2. Functional monoline mechanism icon */
        .faq__icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(26, 26, 46, 0.55);
          flex-shrink: 0;
          transition: color 200ms ease, transform 200ms ease;
        }

        .faq__row--open .faq__icon {
          color: #1A1A2E;
          transform: scale(1.05);
        }

        /* Question text */
        .faq__q-text {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 17px;
          line-height: 1.35;
          color: #1A1A2E;
          flex: 1;
        }

        .faq__row--closed .faq__q-text {
          font-weight: 500;
        }

        .faq__row--open .faq__q-text {
          font-weight: 600;
        }

        /* 3. + / − Swap in Fira Code inside 36px circle */
        .faq__toggle-hit {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq__toggle-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid #E5E0D5;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 150ms ease, background-color 150ms ease;
        }

        .faq__toggle-symbol {
          font-family: var(--font-mono, 'Fira Code', monospace);
          font-size: 18px;
          font-weight: 500;
          color: #1A1A2E;
          line-height: 1;
          display: block;
          user-select: none;
        }

        .faq__q-btn:hover .faq__toggle-circle {
          border-color: rgba(26, 26, 46, 0.40);
          background: rgba(26, 26, 46, 0.03);
        }

        .faq__row--open .faq__toggle-circle {
          border-color: rgba(26, 26, 46, 0.35);
          background: rgba(26, 26, 46, 0.04);
        }

        /* 4. Answer text with considered line-height (1.7) and letter spacing */
        .faq__a-content {
          margin: 0;
          /* Indent to align with the question text past the numeral & icon */
          padding: 16px 0 4px 64px;
        }

        .faq__a-text {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.7;
          letter-spacing: 0.01em;
          color: rgba(26, 26, 46, 0.82); /* Navy at 82% opacity */
          margin: 0;
          max-width: 62ch;
        }

        /* 5. Closing line with 64px generous top margin */
        .faq__closing-line {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(26, 26, 46, 0.70);
          margin: 64px 0 0 0; /* Deliberately more generous space */
          text-align: left;
        }

        .faq__closing-link {
          color: #1A1A2E;
          text-decoration: none;
          font-weight: 500;
          transition: text-decoration 150ms ease;
        }

        .faq__closing-link:hover {
          text-decoration: underline;
        }

        /* ── MOBILE FIXES (Below 768px) ── */
        @media (max-width: 768px) {
          .faq {
            padding: 64px 20px;
          }

          /* Top row: stack full width */
          .faq__top-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .faq__head-block {
            max-width: 100%;
          }

          .faq__title {
            font-size: 32px;
            margin-bottom: 14px;
          }

          .faq__subhead {
            font-size: 16px;
            max-width: 100%;
          }

          /* Image cluster: single image only (Image 1, Optic Shield), full width 16:10 */
          .faq__cluster-wrap {
            width: 100%;
            justify-content: stretch;
            margin-top: 32px;
          }

          .faq__cluster {
            position: relative;
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 10;
          }

          .faq__img-card--anchor {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          /* Images 2 and 3 removed entirely on mobile */
          .faq__img-card--customer,
          .faq__img-card--cervical {
            display: none !important;
          }

          /* Bottom row: stack full width */
          .faq__bottom-row {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 48px;
          }

          .faq__topic-head {
            display: none;
          }

          .faq__pills-wrapper {
            position: relative;
            width: 100%;
          }

          .faq__pills-fade {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 24px;
            pointer-events: none;
            background: linear-gradient(to right, rgba(245, 240, 232, 0), #F5F0E8);
            z-index: 2;
          }

          .faq__topic-list {
            flex-direction: row;
            overflow-x: auto;
            gap: 8px;
            padding-bottom: 6px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
          }

          .faq__topic-list::-webkit-scrollbar {
            display: none;
          }

          .faq__topic-item {
            flex-shrink: 0;
          }

          .faq__topic-btn {
            height: 36px;
            padding: 8px 16px;
            border-radius: 18px; /* Pill shape */
            background: transparent;
            border: 1px solid #E5E0D5;
            white-space: nowrap;
          }

          .faq__topic-bullet {
            display: none;
          }

          .faq__topic-btn .faq__topic-name {
            color: rgba(26, 26, 46, 0.70);
            font-size: 13px;
            font-weight: 500;
          }

          /* Active mobile pill: Navy fill with white text */
          .faq__topic-btn--active {
            background: #1A1A2E !important;
            border-color: #1A1A2E !important;
          }

          .faq__topic-btn--active .faq__topic-name {
            color: #FFFFFF !important;
            font-weight: 500;
          }

          /* Mobile question layout */
          .faq__row--closed {
            padding: 18px 0;
          }

          .faq__row--open {
            padding: 22px 18px 18px 18px;
            border-radius: 14px;
          }

          .faq__q-left {
            gap: 12px;
          }

          .faq__num {
            font-size: 22px;
            min-width: 24px;
          }

          .faq__icon {
            width: 20px;
            height: 20px;
          }

          .faq__icon svg {
            width: 20px;
            height: 20px;
          }

          .faq__q-text {
            font-size: 15.5px;
          }

          /* Chevron 44×44px hit area for easy tapping */
          .faq__toggle-hit {
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
          }

          .faq__a-content {
            padding: 12px 0 0 36px;
          }

          .faq__closing-line {
            margin-top: 40px;
          }
        }
      `}</style>
    </section>
  )
}
