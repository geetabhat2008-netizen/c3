'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const EASE: [number, number, number, number] = [0, 0, 0.2, 1]

const COST_DATA = [
  {
    label: 'OTC Medication',
    sublabel: 'Excedrin, ibuprofen',
    cost: 390,
    per: '/yr',
    fiveYear: 1950,
    recurring: true,
    ring: '#A9A29A',
    isCrownCalm: false,
  },
  {
    label: 'Triptans',
    sublabel: 'Sumatriptan Rx',
    cost: 600,
    per: '/yr',
    fiveYear: 3000,
    recurring: true,
    ring: '#7D766E',
    isCrownCalm: false,
  },
  {
    label: 'CGRP Injections',
    sublabel: 'Aimovig, Emgality',
    cost: 8400,
    per: '/yr',
    fiveYear: 42000,
    recurring: true,
    ring: '#3D3D3D',
    isCrownCalm: false,
  },
  {
    label: 'CrownCalm',
    sublabel: 'Sanctuary Suite',
    cost: 345,
    per: '',
    fiveYear: 345,
    recurring: false,
    ring: '#C4503A',
    isCrownCalm: true,
  },
]

const VALUE_ITEMS = [
  { label: '360° Neuro-Massager', value: 145, dot: '#D2B6F7', isBonus: false },
  { label: 'FL-41 Optic Shield', value: 120, dot: '#E596FF', isBonus: false },
  { label: 'Cryo-Compression Core', value: 69, dot: '#F5B061', isBonus: false },
  { label: 'Acoustic Silence Sleep Buds', value: 45, dot: '#FCD667', isBonus: false },
  { label: 'Cervical Axis Module', value: 120, dot: '#6FA4FF', isBonus: false },
  { label: 'The Sanctuary Protocol Ebook', value: 49, dot: '#1A1A1A', isBonus: true },
]
const TOTAL_VALUE = VALUE_ITEMS.reduce((s, i) => s + i.value, 0) // 548
const PRICE = 345

/* ------------------------------------------------------------------ */
/* ANIMATED COUNTER                                                    */
/* ------------------------------------------------------------------ */

function Counter({
  target,
  duration = 1.4,
  start,
  reduce,
}: {
  target: number
  duration?: number
  start: boolean
  reduce: boolean
}) {
  const [value, setValue] = useState(reduce ? target : 0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (reduce) {
      setValue(target)
      return
    }
    if (!start) return
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [start, target, duration, reduce])

  return <>{value.toLocaleString()}</>
}

/* ------------------------------------------------------------------ */
/* COMPARISON BAR — five-year cost, with a capped visual scale         */
/* ------------------------------------------------------------------ */

function DataBar({
  item,
  index,
  reduce,
}: {
  item: (typeof COST_DATA)[0]
  index: number
  reduce: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const height = Math.max(10, Math.sqrt(item.fiveYear / 42000) * 100)

  return (
    <div
      ref={ref}
      className={`price__bar-cell${item.isCrownCalm ? ' price__bar-cell--cc' : ''}`}
      role="img"
      aria-label={`${item.label}: $${item.fiveYear.toLocaleString()} over five years`}
    >
      <p className="price__bar-value">
        $<Counter target={item.fiveYear} start={inView} reduce={reduce} />
      </p>
      <div className="price__bar-track" aria-hidden="true">
        <motion.span
          className="price__bar-fill"
          initial={{ height: reduce ? `${height}%` : 0 }}
          animate={inView ? { height: `${height}%` } : undefined}
          transition={{ duration: reduce ? 0 : 0.8, delay: index * 0.09, ease: EASE }}
        />
      </div>
      <p className="price__bar-name">{item.label}</p>
      <p className="price__bar-cadence">{item.recurring ? 'Recurring' : 'One time'}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN SECTION                                                        */
/* ------------------------------------------------------------------ */

export default function PriceJustification() {
  const reduce = useReducedMotion() ?? false

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.6, delay, ease: EASE },
        }

  return (
    <section id="price" className="price">
      <div className="price__scene" aria-label="Sanctuary Suite value comparison">
        <Image
          src="/images/products/suite-hero.png"
          alt="The complete CrownCalm Sanctuary Suite"
          fill
          sizes="100vw"
          className="price__scene-image"
        />
        <div className="price__scene-shade" aria-hidden="true" />

        <motion.div className="price__board" {...fadeUp(0)}>
          <header className="price__header">
            <p className="price__eyebrow">Five-year cost comparison</p>
            <h2 className="price__h2">
              The cost of migraine care,
              <span className="price__h2-italic">made visible.</span>
            </h2>
            <p className="price__sub">
              A one-time Sanctuary Suite purchase compared with common recurring options.
            </p>
          </header>

          <div className="price__comparison">
            <div className="price__index" aria-hidden="true">
              <span>01</span>
              <small>5-year view</small>
            </div>
            <div className="price__chart-wrap">
              <div className="price__chart-head">
                <p>Total out-of-pocket cost</p>
                <span>USD · illustrative estimate</span>
              </div>
              <div className="price__bars">
                {COST_DATA.map((item, i) => (
                  <DataBar key={item.label} item={item} index={i} reduce={reduce} />
                ))}
              </div>
              <p className="price__source">
                Estimates use the annual assumptions shown above and do not include insurance reimbursement.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.aside className="price__included-card" {...fadeUp(0.14)}>
          <div className="price__included-head">
            <p className="price__col-label">What&apos;s included</p>
            <span>06 pieces</span>
          </div>

          <dl className="price__stack">
            {VALUE_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                className="price__stack-row"
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: 0.16 + i * 0.04, ease: EASE }}
              >
                <dt className="price__stack-term">
                  <span className="price__dot" aria-hidden="true" />
                  <span className={`price__stack-name${item.isBonus ? ' price__stack-name--bonus' : ''}`}>
                    {item.label}
                    {item.isBonus && <span className="price__stack-tag">digital</span>}
                  </span>
                </dt>
                <dd className="price__stack-value">${item.value}</dd>
              </motion.div>
            ))}
          </dl>

          <div className="price__total-row">
            <span className="price__total-label">Combined value</span>
            <del aria-label={`Original value $${TOTAL_VALUE}`} className="price__total-value">${TOTAL_VALUE}</del>
          </div>

          <div className="price__price-row">
            <div>
              <p className="price__suite-name">The complete suite</p>
              <p className="price__suite-sub">One payment · no subscription</p>
            </div>
            <div className="price__price-figure">
              <p className="price__price-amount">${PRICE}</p>
              <p className="price__price-save">Save ${TOTAL_VALUE - PRICE}</p>
            </div>
          </div>

          <div className="price__guarantee">
            <p className="price__guarantee-title">30-day protocol guarantee</p>
            <p className="price__guarantee-body">Use the complete protocol for 30 days. If it does not meaningfully reduce your sensory burden, receive a full refund.</p>
          </div>

          <button type="button" className="price__cta">Begin the Protocol — ${PRICE}</button>
          <p className="price__hsa">HSA / FSA eligible · Free US shipping</p>
        </motion.aside>
      </div>

      <style>{`
        .price {
          position: relative;
          overflow: hidden;
          background: var(--color-bg);
          padding: clamp(48px, 6.5vw, 84px) max(46px, 5.5vw);
        }
        .price__inner {
          position: relative;
          z-index: 1;
          max-width: var(--container-max);
          margin: 0 auto;
        }

        /* HEADER */
        .price__header {
          margin-bottom: 40px;
          max-width: 560px;
        }
        .price__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8F8981;
          margin-bottom: 20px;
        }
        .price__h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
        }
        .price__h2 span { display: block; color: var(--color-text-primary); }
        .price__h2 .price__h2-italic { font-style: italic; color: #C4503A; }
        .price__sub {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.65;
          letter-spacing: 0;
          color: #5C5C5C;
          max-width: 460px;
          margin: 0;
        }

        /* GRID */
        .price__grid {
          display: grid;
          grid-template-columns: 52fr 48fr;
          gap: 56px;
          align-items: start;
        }

        .price__col-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7D766E;
          margin-bottom: 28px;
        }

        /* DATA RINGS */
        .price__rings {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 20px;
        }
        .price__ring-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 12px 16px;
          border: 1px solid rgba(26,26,26,0.08);
          border-radius: 10px;
          background: rgba(255,255,255,0.28);
        }
        .price__ring-cell--cc {
          border: 1px solid rgba(26,26,26,0.22);
          background: rgba(255,255,255,0.5);
        }
        .price__ring-wrap {
          position: relative;
          margin-bottom: 14px;
        }
        .price__ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .price__ring-amount {
          font-family: var(--font-mono);
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          line-height: 1;
          margin: 0;
        }
        .price__ring-amount--cc { color: #C4503A; }
        .price__ring-per {
          font-size: 11px;
          font-weight: 400;
          color: #7D766E;
          letter-spacing: 0;
        }
        .price__ring-cadence {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8F8981;
          margin: 0;
        }
        .price__ring-name {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-text-primary);
          margin: 0 0 3px;
        }
        .price__ring-name--cc {
          font-family: var(--font-display);
          font-size: 16px;
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .price__ring-sub {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #8F8981;
          letter-spacing: 0.05em;
          margin: 0 0 10px;
        }
        .price__ring-5yr {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: #5C5C5C;
          letter-spacing: 0.02em;
          margin: 0;
          padding-top: 8px;
          border-top: 1px dashed rgba(26,26,26,0.14);
          width: 100%;
        }
        .price__ring-5yr span {
          font-weight: 400;
          color: #8F8981;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .price__ring-5yr--cc { color: #C4503A; }

        .price__rings-note {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #8F8981;
          line-height: 1.7;
          letter-spacing: 0.04em;
          margin: 20px 0 0;
        }

        /* Modern testimonial callout */
        .price__quote {
          margin: 28px 0 0;
          padding: 26px 26px 22px;
          background: var(--color-surface);
          border: 1px solid rgba(26,26,26,0.08);
          border-radius: 16px;
          box-shadow: 0 12px 32px -22px rgba(26,26,26,0.22);
        }
        .price__quote-mark {
          display: block;
          font-family: var(--font-display);
          font-size: 56px;
          line-height: 0.6;
          color: var(--color-text-primary);
          margin-bottom: 8px;
          user-select: none;
        }
        .price__quote-text {
          font-family: var(--font-display);
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: -0.02em;
          text-wrap: pretty;
          color: var(--color-text-primary);
          margin: 0 0 20px;
        }
        .price__quote-foot {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid rgba(26,26,26,0.08);
        }
        .price__quote-avatar {
          flex-shrink: 0;
          width: 46px; height: 46px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(26,26,26,0.08);
        }
        .price__quote-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .price__quote-meta { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .price__quote-name {
          font-family: var(--font-mono);
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
        }
        .price__quote-role {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #8F8981;
        }

        /* VALUE STACK */
        .price__stack { margin: 0; }
        .price__stack-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(26,26,26,0.08);
        }
        .price__stack-term {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }
        .price__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .price__stack-name {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #5C5C5C;
          letter-spacing: 0.03em;
        }
        .price__stack-name--bonus {
          color: var(--color-text-primary);
          font-weight: 700;
        }
        .price__stack-tag {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: #8F8981;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-left: 8px;
        }
        .price__stack-value {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #7D766E;
          letter-spacing: -0.01em;
          flex-shrink: 0;
          margin: 0;
        }
        .price__stack-value--bonus {
          color: var(--color-text-primary);
          font-weight: 700;
        }

        .price__total-row {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1.5px solid rgba(26,26,26,0.20);
        }
        .price__total-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7D766E;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .price__total-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #7D766E;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .price__price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0 24px;
        }
        .price__suite-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-style: italic;
          font-weight: 400;
          color: var(--color-text-primary);
          margin: 0 0 4px;
        }
        .price__suite-sub {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #8F8981;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
        }
        .price__price-figure { text-align: right; }
        .price__price-amount {
          font-family: var(--font-mono);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.03em;
          margin: 0 0 2px;
          line-height: 1;
        }
        .price__price-save {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #C4503A;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
        }

        .price__guarantee {
          background: rgba(26,26,26,0.03);
          border: 1px solid rgba(26,26,26,0.10);
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .price__guarantee-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin-bottom: 10px;
        }
        .price__guarantee-body {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.6;
          color: #5C5C5C;
          letter-spacing: 0;
          margin: 0;
        }

        .price__hsa {
          font-family: var(--font-body);
          font-size: 14px;
          color: #7D766E;
          letter-spacing: 0;
          line-height: 1.55;
        }

        .price__cta {
          width: 100%;
          height: 56px;
          margin-top: 24px;
          background: #1A1A1A;
          color: #F2ECE4;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 150ms ease, box-shadow 150ms ease;
        }
        .price__cta:hover {
          background: #2E2E2E;
          box-shadow: 0 6px 18px rgba(0,0,0,0.16);
        }
        .price__cta:active { background: #111111; box-shadow: none; }

        .price__subcta {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #7D766E;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          margin-top: 14px;
          max-width: none;
        }
        .price__subcta-link {
          background: none;
          border: none;
          border-bottom: 1px solid rgba(26,26,26,0.20);
          cursor: pointer;
          padding: 0 0 2px;
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
          transition: border-color 150ms ease;
        }
        .price__subcta-link:hover { border-bottom-color: var(--color-text-primary); }

        /* Layered editorial value scene */
        .price {
          padding: clamp(48px, 7vw, 96px) max(20px, 4vw);
          background: var(--color-bg);
        }
        .price__scene {
          position: relative;
          max-width: var(--container-max);
          min-height: 760px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 24px;
          background: var(--color-text-primary);
          isolation: isolate;
        }
        .price__scene-image {
          z-index: -3;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
        }
        .price__scene-shade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background: rgba(26, 26, 26, .24);
        }
        .price__board {
          position: absolute;
          /* right inset = card footprint (width + offset) minus the intended 28px layer overlap,
             so the card never covers chart content at any viewport width */
          inset: clamp(28px, 5vw, 64px) calc(min(350px, 34vw) + clamp(18px, 3vw, 40px) - 28px) clamp(28px, 5vw, 64px) clamp(28px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 36px;
          padding: clamp(28px, 4vw, 52px);
          border: 1px solid rgba(255, 255, 255, .38);
          border-radius: 18px;
          background: rgba(221, 226, 215, .92);
          backdrop-filter: blur(12px);
          color: var(--color-text-primary);
        }
        .price__header { max-width: 620px; margin: 0; }
        .price__eyebrow { margin-bottom: 14px; color: var(--color-primary); }
        .price__h2 {
          max-width: 15ch;
          margin-bottom: 14px;
          font-size: clamp(38px, 4.6vw, 64px);
          line-height: .98;
        }
        .price__h2 .price__h2-italic { display: block; color: var(--color-warm); font-style: italic; }
        .price__sub { max-width: 46ch; font-size: 15px; color: var(--color-text-secondary); }
        .price__comparison {
          display: grid;
          grid-template-columns: 110px minmax(0, 1fr);
          gap: 28px;
          align-items: end;
        }
        .price__index { display: flex; flex-direction: column; gap: 8px; }
        .price__index span {
          font-family: var(--font-display);
          font-size: clamp(60px, 7vw, 92px);
          line-height: .8;
          letter-spacing: -.06em;
        }
        .price__index small, .price__chart-head, .price__source {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        .price__index small { font-size: 9px; color: var(--color-text-secondary); }
        .price__chart-wrap { min-width: 0; }
        .price__chart-head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(26, 26, 26, .14);
          font-size: 9px;
          color: var(--color-text-secondary);
        }
        .price__chart-head p { margin: 0; font-weight: 700; color: var(--color-text-primary); }
        .price__bars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          height: 220px;
          align-items: end;
        }
        .price__bar-cell { display: flex; min-width: 0; height: 100%; flex-direction: column; justify-content: flex-end; text-align: center; }
        .price__bar-value { margin-bottom: 6px; font-family: var(--font-display); font-size: 15px; color: var(--color-text-primary); }
        .price__bar-track { position: relative; height: 124px; border-bottom: 1px solid rgba(26,26,26,.18); }
        .price__bar-fill {
          position: absolute;
          right: 10%;
          bottom: 0;
          left: 10%;
          min-height: 8px;
          background: var(--color-primary);
        }
        .price__bar-cell:nth-child(2) .price__bar-fill { background: var(--color-text-secondary); }
        .price__bar-cell:nth-child(3) .price__bar-fill { background: var(--color-text-primary); }
        .price__bar-cell--cc .price__bar-fill { background: var(--color-warm); }
        .price__bar-cell--cc .price__bar-value { color: var(--color-warm); }
        .price__bar-name { min-height: 30px; margin: 9px 0 2px; font-family: var(--font-mono); font-size: 9px; line-height: 1.4; color: var(--color-text-primary); }
        .price__bar-cadence { margin: 0; font-family: var(--font-mono); font-size: 8px; text-transform: uppercase; letter-spacing: .08em; color: var(--color-text-tertiary); }
        .price__source { margin-top: 14px; font-size: 8px; line-height: 1.5; color: var(--color-text-tertiary); }

        .price__included-card {
          position: absolute;
          top: 50%;
          right: clamp(18px, 3vw, 40px);
          width: min(350px, 34vw);
          transform: translateY(-50%);
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, .52);
          border-radius: 16px;
          background: rgba(242, 236, 228, .96);
          box-shadow: 0 24px 70px rgba(26, 26, 26, .24);
          backdrop-filter: blur(14px);
        }
        .price__included-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .price__included-head .price__col-label { margin: 0; color: var(--color-primary); }
        .price__included-head > span { font-family: var(--font-mono); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; color: var(--color-text-tertiary); }
        .price__stack { margin-top: 18px; }
        .price__stack-row { padding: 9px 0; }
        .price__dot { background: var(--color-primary); }
        .price__stack-name { font-size: 10px; line-height: 1.35; color: var(--color-text-secondary); }
        .price__stack-value { font-size: 10px; }
        .price__stack-tag { font-size: 8px; color: var(--color-warm); }
        .price__total-row { padding: 12px 0; }
        .price__price-row { padding: 16px 0; }
        .price__suite-name { font-size: 19px; }
        .price__price-amount { font-family: var(--font-display); font-size: 30px; }
        .price__guarantee { margin-bottom: 14px; padding: 14px; background: var(--color-primary-subtle); }
        .price__guarantee-title { margin-bottom: 6px; color: var(--color-primary); }
        .price__guarantee-body { font-size: 12px; line-height: 1.5; }
        .price__cta { height: 48px; margin-top: 0; background: var(--color-text-primary); color: var(--color-bg); }
        .price__hsa { margin: 12px 0 0; font-family: var(--font-mono); font-size: 9px; text-align: center; text-transform: uppercase; letter-spacing: .08em; }

        @media (max-width: 900px) {
          /* stacked layout flows naturally — no fixed heights, no pinned overlap */
          .price__scene {
            min-height: 0;
            display: flex;
            flex-direction: column;
            padding: 28px;
            gap: 28px;
          }
          .price__board { position: relative; inset: auto; min-height: 0; }
          .price__included-card {
            position: relative;
            top: auto; right: auto; bottom: auto; left: auto;
            width: auto;
            transform: none;
          }
        }
        @media (max-width: 600px) {
          .price { padding: 36px 14px; }
          .price__scene { border-radius: 16px; padding: 14px; gap: 14px; }
          .price__scene-image { object-position: 38% center; }
          .price__board { gap: 28px; padding: 24px 18px; border-radius: 12px; }
          .price__h2 { font-size: 38px; }
          .price__comparison { grid-template-columns: 1fr; gap: 18px; }
          .price__index { flex-direction: row; align-items: flex-end; justify-content: space-between; }
          .price__index span { font-size: 54px; }
          .price__chart-head span { display: none; }
          .price__bars { gap: 6px; height: 230px; }
          .price__bar-name { font-size: 8px; }
          .price__bar-value { font-size: 13px; }
          .price__included-card { padding: 22px 18px; border-radius: 12px; }
        }
      `}</style>
    </section>
  )
}
