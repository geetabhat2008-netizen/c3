'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ShaderBackground } from '@/components/ui/kk'

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
    ring: '#0F0F0F',
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
      {/* ── WebGL Mesh Drift Shader Background ── */}
      <div className="price__shader-wrap" aria-hidden="true">
        <ShaderBackground className="price__shader-canvas" />
      </div>

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
              <span className="price__h2-l1">The cost of migraine care,</span>
              <span className="price__h2-l2">made visible.</span>
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

          <button
            type="button"
            className="price__cta"
            onClick={() => {
              const buyBtn = document.querySelector('.sp__cta-btn') as HTMLElement | null
              if (buyBtn) {
                buyBtn.scrollIntoView({ behavior: 'smooth', block: 'center' })
                buyBtn.focus()
                return
              }
              const cartBtn = document.querySelector('.nav__cart-btn') as HTMLButtonElement | null
              if (cartBtn) {
                cartBtn.click()
                return
              }
              window.location.href = '/products/sanctuary-suite'
            }}
          >
            Begin the Protocol
          </button>
          <p className="price__hsa">HSA / FSA eligible · Free US shipping</p>
        </motion.aside>
      </div>

      <style>{`
        .price {
          position: relative;
          padding: clamp(64px, 7vw, 96px) max(20px, 4vw);
          background: #020617;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          isolation: isolate;
          scroll-margin-top: 100px;
        }

        /* ── Dynamic WebGL Shader Canvas ── */
        .price__shader-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .price__shader-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Framed Scene Container ── */
        .price__scene {
          position: relative;
          z-index: 1;
          max-width: var(--container-max, 1280px);
          min-height: 760px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 28px;
          background: rgba(3, 10, 24, 0.28);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 32px 90px -15px rgba(2, 6, 23, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          isolation: isolate;
        }

        .price__scene-image {
          z-index: -3;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
          opacity: 0.18;
          mix-blend-mode: luminosity;
        }

        .price__scene-shade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background: radial-gradient(ellipse 90% 80% at 50% 30%, rgba(14, 26, 52, 0.35) 0%, rgba(5, 9, 18, 0.62) 100%);
        }

        /* Comparison Board: Off-White Card inside Dark Section */
        .price__board {
          position: absolute;
          inset: clamp(28px, 4vw, 56px) calc(min(360px, 34vw) + clamp(18px, 3vw, 40px) - 24px) clamp(28px, 4vw, 56px) clamp(28px, 4vw, 56px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
          padding: clamp(28px, 3.5vw, 48px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          background: #FAFAF9;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
          color: #0F0F0F;
        }

        .price__header { max-width: 600px; margin: 0; }

        .price__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6B6B6B;
          margin-bottom: 12px;
        }

        .price__h2 {
          font-family: var(--font-display);
          max-width: 15ch;
          margin: 0 0 12px 0;
          font-size: clamp(34px, 4vw, 56px);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
        }

        .price__h2-l1 {
          display: block;
          font-weight: 700;
          color: #0F0F0F;
        }

        .price__h2-l2 {
          display: block;
          font-weight: 500;
          color: #6B6B6B;
          margin-top: 4px;
        }

        .price__sub {
          font-family: var(--font-body);
          max-width: 44ch;
          font-size: 14.5px;
          line-height: 1.5;
          color: #555555;
          margin: 0;
        }

        .price__comparison {
          display: grid;
          grid-template-columns: 100px minmax(0, 1fr);
          gap: 28px;
          align-items: end;
        }

        .price__index { display: flex; flex-direction: column; gap: 6px; }

        .price__index span {
          font-family: var(--font-display);
          font-size: clamp(56px, 6.5vw, 84px);
          line-height: 0.8;
          letter-spacing: -0.06em;
          color: #1A1A1A;
        }

        .price__index small {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #7D766E;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .price__chart-wrap { min-width: 0; }

        .price__chart-head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(26, 26, 26, 0.12);
          font-family: var(--font-mono);
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7D766E;
        }

        .price__chart-head p { margin: 0; font-weight: 700; color: #1A1A1A; }

        .price__bars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          height: 200px;
          align-items: end;
        }

        .price__bar-cell {
          display: flex;
          min-width: 0;
          height: 100%;
          flex-direction: column;
          justify-content: flex-end;
          text-align: center;
        }

        .price__bar-value {
          margin-bottom: 6px;
          font-family: var(--font-display);
          font-size: 14.5px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .price__bar-track {
          position: relative;
          height: 120px;
          border-bottom: 1.5px solid rgba(26, 26, 26, 0.18);
        }

        .price__bar-fill {
          position: absolute;
          right: 8%;
          bottom: 0;
          left: 8%;
          min-height: 8px;
          background: #B0A9A0;
          border-radius: 4px 4px 0 0;
        }

        .price__bar-cell:nth-child(2) .price__bar-fill { background: #7D766E; }
        .price__bar-cell:nth-child(3) .price__bar-fill { background: #444444; }
        .price__bar-cell--cc .price__bar-fill { background: #1A1A1A; }
        .price__bar-cell--cc .price__bar-value { color: #1A1A1A; font-weight: 700; }

        .price__bar-name {
          min-height: 30px;
          margin: 9px 0 2px;
          font-family: var(--font-mono);
          font-size: 9px;
          line-height: 1.4;
          color: #1A1A1A;
        }

        .price__bar-cadence {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7D766E;
        }

        .price__source {
          margin-top: 14px;
          font-family: var(--font-mono);
          font-size: 8px;
          line-height: 1.5;
          color: #7D766E;
        }

        /* What's Included: Light Cream Card inside Dark Section */
        .price__included-card {
          position: absolute;
          top: 50%;
          right: clamp(18px, 3vw, 40px);
          width: min(360px, 34vw);
          transform: translateY(-50%);
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          background: #FAFAF9;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }

        .price__included-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .price__included-head .price__col-label {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1A1A1A;
        }

        .price__included-head > span {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7D766E;
        }

        .price__stack { margin: 16px 0 0; }

        .price__stack-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(26, 26, 26, 0.08);
        }

        .price__stack-term {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        .price__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: #1A1A1A;
        }

        .price__stack-name {
          font-family: var(--font-mono);
          font-size: 10px;
          line-height: 1.35;
          color: #444444;
        }

        .price__stack-name--bonus {
          color: #1A1A1A;
          font-weight: 700;
        }

        .price__stack-tag {
          font-family: var(--font-mono);
          font-size: 8px;
          color: #7D766E;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-left: 6px;
        }

        .price__stack-value {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #1A1A1A;
          margin: 0;
        }

        .price__total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1.5px solid rgba(26, 26, 26, 0.15);
        }

        .price__total-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #7D766E;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .price__total-value {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7D766E;
          font-weight: 700;
        }

        .price__price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0 16px;
        }

        .price__suite-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-style: italic;
          color: #1A1A1A;
          margin: 0 0 2px;
        }

        .price__suite-sub {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #7D766E;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0;
        }

        .price__price-figure { text-align: right; }

        .price__price-amount {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: #1A1A1A;
          margin: 0;
          line-height: 1;
        }

        .price__price-save {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #C4503A;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 2px 0 0;
        }

        .price__guarantee {
          margin-bottom: 14px;
          padding: 14px 16px;
          background: #F0EAE0;
          border: 1px solid rgba(26, 26, 26, 0.08);
          border-radius: 12px;
        }

        .price__guarantee-title {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1A1A1A;
          margin: 0 0 4px;
        }

        .price__guarantee-body {
          font-family: var(--font-body);
          font-size: 12px;
          line-height: 1.5;
          color: #555555;
          margin: 0;
        }

        .price__cta {
          width: 100%;
          height: 50px;
          background: #1A1A1A;
          color: #FAF5EE;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 160ms ease, box-shadow 160ms ease;
        }

        .price__cta:hover {
          background: #333333;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        }

        .price__hsa {
          margin: 10px 0 0;
          font-family: var(--font-mono);
          font-size: 9px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7D766E;
        }

        @media (max-width: 900px) {
          .price__scene {
            min-height: 0;
            display: flex;
            flex-direction: column;
            padding: 24px;
            gap: 24px;
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
          .price__scene { border-radius: 18px; padding: 14px; gap: 14px; }
          .price__board { gap: 24px; padding: 20px 16px; border-radius: 16px; }
          .price__h2 { font-size: 34px; }
          .price__comparison { grid-template-columns: 1fr; gap: 16px; }
          .price__index { flex-direction: row; align-items: flex-end; justify-content: space-between; }
          .price__index span { font-size: 50px; }
          .price__chart-head span { display: none; }
          .price__bars { gap: 6px; height: 210px; }
          .price__included-card { padding: 20px 16px; border-radius: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .price__shader-wrap {
            opacity: 0.9;
          }
        }
      `}</style>
    </section>
  )
}
