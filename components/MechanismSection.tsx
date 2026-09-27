'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion, motion } from 'framer-motion'
import DissolveBlock from './DissolveBlock'

const EASE: [number, number, number, number] = [0, 0, 0.2, 1]

// ── Part A: the cost. Plain typographic columns — a thin colored rule is the
// only nod to the phase palette here (no pixelated blocks; those cheapen when
// repeated). ───────────────────────────────────────────────────────────────
const REGISTERS: {
  icon: 'eye' | 'calendar' | 'identity'
  label: string
  register: string
  descriptor: string
  peak?: boolean
  lines: string[]
}[] = [
  {
    icon: 'eye',
    label: 'Physical',
    register: 'Your body.',
    descriptor: 'Sensory impact',
    lines: [
      'The aura that steals your vision mid-sentence.',
      'Light becomes a weapon. Sound becomes a blade.',
      'Nausea that empties you out for hours.',
    ],
  },
  {
    icon: 'calendar',
    label: 'Functional',
    register: 'Your day.',
    descriptor: 'Life disruption',
    lines: [
      'The meeting you left. The deadline you missed.',
      'Plans cancelled at the last possible minute — again.',
      'A dark room, mid-afternoon, while life goes on without you.',
    ],
  },
  {
    icon: 'identity',
    label: 'Identity',
    register: 'Who you are.',
    descriptor: 'Emotional cost',
    peak: true,
    lines: [
      "The friend who's always flaking. The parent always lying down.",
      "The apology you're tired of making.",
      'You stopped calling it pain. You started calling it you.',
    ],
  },
]

function ImpactIcon({ type }: { type: 'eye' | 'calendar' | 'identity' }) {
  if (type === 'eye') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    )
  }
  if (type === 'calendar') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M3.5 9.5h17M8 14h3M13 14h3" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c.8-4.1 3-6.2 6.5-6.2s5.7 2.1 6.5 6.2M4 12h2M18 12h2" />
    </svg>
  )
}

// ── Part B: the mechanism. Triggers cascade in — the ONE tasteful use of the
// dissolve block (triggers filling the bucket). ──────────────────────────────
const TRIGGERS: [string, string][] = [
  ['#D2B6F7', 'Bright Light'],
  ['#E596FF', 'Stress Load'],
  ['#F5B061', 'Poor Sleep'],
  ['#FCD667', 'Noise Exposure'],
  ['#6FA4FF', 'Hormonal Shift'],
  ['#D2B6F7', 'Screen Time'],
]

const TAGS: { label: string; dot: string }[] = [
  { label: 'Gate Control', dot: '#D2B6F7' },
  { label: 'Spectral Filter', dot: '#E596FF' },
  { label: 'Vasoconstriction', dot: '#F5B061' },
  { label: 'Auditory Masking', dot: '#FCD667' },
]

const DRAINS: [string, string][] = [
  ['#6B3FA0', 'Gate Control'],
  ['#8B3FAF', 'FL-41'],
  ['#8B5E1A', 'Cryo-Wrap'],
  ['#7A6010', 'Sleep Buds'],
]

export default function MechanismSection() {
  const reduce = useReducedMotion()
  const diagramRef = useRef<HTMLDivElement>(null)
  const inView = useInView(diagramRef, { once: true, amount: 0.3 })
  const active = inView || !!reduce

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0.01 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { delay, duration: 0.6, ease: EASE },
        }

  return (
    <section id="mechanism" className="mech" aria-label="The real cost and the mechanism">
      <div className="mech__inner">
        {/* ── PART A — the cost ── */}
        <div className="mech__cost-panel">
          <header className="mech__head">
            <div>
              <p className="mech__eyebrow">The real cost of migraine</p>
              <h2 className="mech__hook">
                <span className="mech__hook-l1">It was never just a headache.</span>
                <span className="mech__hook-l2">Three neurological registers of impact.</span>
              </h2>
            </div>
            <p className="mech__intro">
              Migraine reaches your body, your day, and the way you see yourself.
            </p>
          </header>

          <div className="mech__registers">
            {REGISTERS.map((r) => (
              <article key={r.label} className="mech__reg">
                <span className="mech__reg-icon"><ImpactIcon type={r.icon} /></span>
                <div>
                  <span className="mech__reg-label">{r.label}</span>
                  <h3 className="mech__reg-word">{r.register}</h3>
                  <p className="mech__reg-line">{r.lines[2]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── PART B — the mechanism ── */}
        <div className="mech__physics">
          <div className="mech__copy">
            <h2 className="mech__h2">
              <span className="mech__h2-l1">Your migraines aren&apos;t random.</span>
              <span className="mech__h2-l2">They&apos;re threshold physics.</span>
            </h2>

            <p className="mech__p">
              Every trigger — light, noise, stress, poor sleep — fills a neurological
              bucket. When it overflows, the cascade begins. This isn&apos;t fate.
              It&apos;s physics.
            </p>
            <p className="mech__p">
              CrownCalm doesn&apos;t treat the overflow. It empties the bucket from four
              directions simultaneously — and raises the rim.
            </p>

            <div className="mech__tags">
              {TAGS.map((t) => (
                <span key={t.label} className="mech__tag">
                  <span className="mech__tag-dot" style={{ background: t.dot }} aria-hidden />
                  {t.label}
                </span>
              ))}
            </div>

            <a href="/science" className="mech__cta">
              <span>See the four mechanisms</span>
              <span className="mech__cta-arrow" aria-hidden>↓</span>
            </a>
          </div>

          {/* RIGHT — bucket diagram */}
          <div
            ref={diagramRef}
            className={`mech__diagram${active ? ' is-active' : ''}${reduce ? ' is-static' : ''}`}
          >
            <div className="mech__triggers">
              {TRIGGERS.map(([color, label], i) => (
                <div className="mech__trigger" key={label} style={{ '--i': i } as React.CSSProperties}>
                  <DissolveBlock color={color} label={label} height={26} solid={0.6} pixel={5} />
                </div>
              ))}
            </div>

            <div className="mech__stage">
              <span className="mech__rim-label">Raised Threshold</span>

              <svg className="mech__svg" viewBox="0 0 200 220" role="img" aria-label="A neurological bucket filling past its rim, then drained from four directions">
                <defs>
                  <clipPath id="bucketClip">
                    <path d="M46,30 L154,30 L148,172 Q148,194 130,194 L70,194 Q52,194 52,172 Z" />
                  </clipPath>
                  <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A7FC9" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.22" />
                  </linearGradient>
                  <filter id="meniscus">
                    <feTurbulence baseFrequency="0.02" numOctaves="2" seed="1" />
                    <feDisplacementMap in="SourceGraphic" scale="1.2" />
                  </filter>
                </defs>

                <line className="mech__rim" x1="30" y1="22" x2="185" y2="22" />

                {/* vessel body with inner highlight */}
                <path className="mech__vessel-inner" d="M48,32 L152,32 L145,170 Q145,191 130,191 L70,191 Q55,191 55,170 Z"
                      fill="rgba(26,26,26,0.02)" stroke="none" />
                <line className="mech__vessel-highlight" x1="49" y1="35" x2="49" y2="165"
                      stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />

                {/* measurement ticks */}
                <g className="mech__ticks">
                  <line x1="42" y1="60" x2="46" y2="60" stroke="rgba(26,26,26,0.15)" strokeWidth="0.8" />
                  <line x1="42" y1="95" x2="46" y2="95" stroke="rgba(26,26,26,0.15)" strokeWidth="0.8" />
                  <line x1="42" y1="130" x2="46" y2="130" stroke="rgba(26,26,26,0.15)" strokeWidth="0.8" />
                  <line x1="42" y1="165" x2="46" y2="165" stroke="rgba(26,26,26,0.15)" strokeWidth="0.8" />
                </g>

                {/* liquid fill with wavy meniscus */}
                <g clipPath="url(#bucketClip)">
                  <rect className="mech__fill" x="46" y="28" width="108" height="168" fill="url(#liquidGrad)" />
                  <ellipse className="mech__meniscus" cx="100" cy="30" rx="53" ry="3"
                           fill="rgba(232,98,74,0.4)" filter="url(#meniscus)" />
                </g>

                {/* overflow spill droplets */}
                <g className="mech__drips">
                  <ellipse cx="70" cy="32" rx="2.2" ry="3.6" />
                  <ellipse cx="85" cy="30" rx="1.8" ry="3.2" />
                  <ellipse cx="100" cy="29" rx="2.4" ry="4" />
                  <ellipse cx="115" cy="30" rx="1.8" ry="3.2" />
                  <ellipse cx="130" cy="32" rx="2.2" ry="3.6" />
                </g>

                <ellipse className="mech__opening" cx="100" cy="30" rx="54" ry="6" />
                <path className="mech__outline" d="M46,30 L154,30 L148,172 Q148,194 130,194 L70,194 Q52,194 52,172 Z" />
              </svg>

              <div className="mech__drains">
                {DRAINS.map(([color, label], i) => (
                  <span className="mech__drain" key={label} style={{ color, '--i': i } as React.CSSProperties}>
                    <span className="mech__drain-arrow" aria-hidden>↓</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mech {
          position: relative;
          overflow: hidden;
          background: var(--color-bg-primary, #FAFAF9);
          padding: var(--padding-section-y) 0;
        }
        .mech__inner {
          position: relative;
          z-index: var(--z-content);
          padding: 0 var(--padding-page-x);
          max-width: var(--container-max);
          margin: 0 auto;
        }

        /* ---- Part A: compact cost summary ---- */
        .mech__cost-panel {
          overflow: hidden;
          border: 1px solid rgba(15, 15, 15, 0.08);
          border-radius: var(--radius-card);
          background: var(--color-bg-secondary, #F2F1ED);
        }
        .mech__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-6);
          padding: var(--space-6);
          border-bottom: 1px solid rgba(15, 15, 15, 0.08);
        }
        .mech__eyebrow {
          margin-bottom: var(--space-3);
          font-family: var(--font-mono);
          font-size: var(--text-mono-2xs);
          font-weight: var(--weight-mono-bd);
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--color-text-secondary);
        }
        .mech__hook {
          font-family: var(--font-display);
          font-size: var(--text-display-lg);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
        }
        .mech__hook-l1 {
          display: block;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .mech__hook-l2 {
          display: block;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }
        .mech__intro {
          max-width: 34ch;
          font-family: var(--font-body);
          font-size: var(--text-body-md);
          font-weight: var(--weight-body);
          line-height: var(--leading-body);
          color: var(--color-text-secondary);
        }
        .mech__registers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .mech__reg {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          min-width: 0;
          padding: var(--space-5);
          border-right: 1px solid rgba(15, 15, 15, 0.08);
        }
        .mech__reg:last-child { border-right: 0; }
        .mech__reg-icon {
          display: inline-flex;
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(15, 15, 15, 0.12);
          border-radius: 50%;
          background: #FFFFFF;
          color: var(--color-text-primary);
        }
        .mech__reg-icon svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.5; }
        .mech__reg-label {
          font-family: var(--font-mono);
          font-size: var(--text-mono-2xs);
          font-weight: var(--weight-mono-bd);
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
        }
        .mech__reg-word {
          margin-top: 2px;
          font-family: var(--font-display);
          font-size: var(--text-display-sm);
          font-weight: var(--weight-display-bd);
          line-height: var(--leading-heading);
          color: var(--color-text-primary);
        }
        .mech__reg-line {
          margin-top: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-body-sm);
          font-weight: var(--weight-body);
          line-height: var(--leading-body);
          color: var(--color-text-secondary);
        }

        /* ---- pivot to Part B ---- */
        .mech__physics {
          margin-top: var(--space-11);
          padding-top: var(--space-9);
          border-top: 1px solid rgba(15, 15, 15, 0.08);
          display: grid;
          grid-template-columns: 48fr 52fr;
          gap: var(--space-8);
          align-items: center;
        }

        .mech__h2 {
          font-family: var(--font-display);
          font-size: var(--text-display-lg);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: var(--space-6);
        }
        .mech__h2-l1 {
          display: block;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .mech__h2-l2 {
          display: block;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }
        .mech__p {
          font-family: var(--font-body);
          font-size: var(--text-body-md);
          font-weight: var(--weight-body);
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: var(--color-text-secondary);
          max-width: 440px;
        }
        .mech__p + .mech__p { margin-top: var(--space-4); }

        .mech__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
        .mech__tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: var(--weight-mono-md);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 9999px;
          background: var(--color-bg-secondary, #F2F1ED);
          border: 1px solid rgba(15, 15, 15, 0.08);
          color: var(--color-text-primary, #0F0F0F);
          transition: transform 180ms var(--ease-out), box-shadow 180ms var(--ease-out);
        }
        .mech__tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          background: #EBEAE4;
        }
        .mech__tag-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .mech__cta {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          margin-top: 38px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: var(--weight-mono-bd);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          text-decoration: none;
          border-bottom: 1.5px solid rgba(15, 15, 15, 0.25);
          padding-bottom: 3px;
          transition: border-color 220ms var(--ease-default), color 220ms var(--ease-default);
        }
        .mech__cta:hover {
          border-bottom-color: var(--color-text-primary);
          color: var(--color-text-primary);
        }
        .mech__cta-arrow { display: inline-block; transition: transform 240ms var(--ease-out); }
        .mech__cta:hover .mech__cta-arrow { transform: translateY(4px); }

        /* ---- bucket diagram ---- */
        .mech__diagram {
          position: relative;
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .mech__triggers { display: flex; flex-direction: column; gap: 6px; }
        .mech__trigger { width: 58%; margin-left: calc(var(--i) * 8%); opacity: 0; transform: translateY(-12px); }
        .is-active .mech__trigger { animation: triggerIn 480ms var(--ease-out) forwards; animation-delay: calc(var(--i) * 80ms); }
        @keyframes triggerIn { to { opacity: 1; transform: translateY(0); } }

        .mech__stage { position: relative; }
        .mech__svg { width: 100%; height: auto; display: block; overflow: visible; }

        .mech__rim-label {
          position: absolute; top: -4px; right: 0;
          font-family: var(--font-mono); font-size: 10px; font-weight: var(--weight-mono-bd);
          letter-spacing: 0.12em; text-transform: uppercase; color: #6B655D; opacity: 0;
        }
        .is-active .mech__rim-label { animation: fadeIn 400ms 2600ms var(--ease-out) forwards; }

        .mech__rim { stroke: rgba(26,26,26,0.25); stroke-width: 1; stroke-dasharray: 4 3; opacity: 0; }
        .is-active .mech__rim { animation: rimRise 600ms 2600ms var(--ease-out) forwards; }
        @keyframes rimRise {
          0% { opacity: 0; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(-8px); }
        }

        .mech__vessel-inner { opacity: 0; }
        .is-active .mech__vessel-inner { animation: fadeIn 500ms 200ms forwards; }

        .mech__vessel-highlight { opacity: 0; }
        .is-active .mech__vessel-highlight { animation: fadeIn 500ms 300ms forwards; }

        .mech__ticks { opacity: 0; }
        .is-active .mech__ticks { animation: fadeIn 400ms 250ms forwards; }

        .mech__opening { fill: none; stroke: rgba(26,26,26,0.22); stroke-width: 1; }
        .mech__outline { fill: none; stroke: rgba(26,26,26,0.3); stroke-width: 1; }
        .is-active .mech__outline { animation: overflowPulse 700ms 1700ms var(--ease-in-out); }
        @keyframes overflowPulse {
          0% { stroke: rgba(26,26,26,0.3); stroke-width: 1; }
          40% { stroke: #C4503A; stroke-width: 1.8; }
          100% { stroke: rgba(26,26,26,0.3); stroke-width: 1; }
        }

        .mech__fill { transform: scaleY(0); transform-box: fill-box; transform-origin: bottom; }
        .is-active .mech__fill { animation: fillUp 1700ms 400ms var(--ease-in-out) forwards; }
        @keyframes fillUp {
          0% { transform: scaleY(0); }
          72% { transform: scaleY(0.85); }
          85% { transform: scaleY(0.85); }
          100% { transform: scaleY(1); }
        }

        .mech__meniscus { opacity: 0; }
        .is-active .mech__meniscus { animation: meniscusWave 2800ms 400ms ease-in-out infinite; }
        @keyframes meniscusWave {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
          50% { transform: translateY(-2px) scaleY(1.2); opacity: 0.8; }
        }

        .mech__drips ellipse { fill: #C4503A; opacity: 0; }
        .is-active .mech__drips ellipse { animation: drip 900ms 1850ms var(--ease-in) forwards; }
        .is-active .mech__drips ellipse:nth-child(2) { animation-delay: 1900ms; }
        .is-active .mech__drips ellipse:nth-child(3) { animation-delay: 1950ms; }
        .is-active .mech__drips ellipse:nth-child(4) { animation-delay: 2000ms; }
        .is-active .mech__drips ellipse:nth-child(5) { animation-delay: 2050ms; }
        .is-active .mech__drips ellipse:nth-child(3) { animation-delay: 2050ms; }
        @keyframes drip {
          0% { opacity: 0; transform: translateY(0); }
          25% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(10px); }
        }

        .mech__drains { display: flex; justify-content: space-around; gap: var(--space-2); margin-top: var(--space-3); }
        .mech__drain {
          display: inline-flex; flex-direction: column; align-items: center; gap: 2px;
          font-family: var(--font-mono); font-size: 10px; font-weight: var(--weight-mono-bd);
          letter-spacing: 0.08em; text-transform: uppercase; text-align: center;
          opacity: 0; transform: translateY(6px);
        }
        .is-active .mech__drain { animation: drainIn 360ms var(--ease-out) forwards; animation-delay: calc(2000ms + var(--i) * 120ms); }
        .mech__drain-arrow { font-size: 11px; }
        @keyframes drainIn { to { opacity: 1; transform: translateY(0); } }

        @keyframes fadeIn { to { opacity: 1; } }

        /* reduced motion / instant: settled final state */
        .is-static .mech__trigger { opacity: 1; transform: none; animation: none; }
        .is-static .mech__fill { transform: scaleY(1); animation: none; }
        .is-static .mech__meniscus { opacity: 0; animation: none; }
        .is-static .mech__rim,
        .is-static .mech__rim-label,
        .is-static .mech__vessel-inner,
        .is-static .mech__vessel-highlight,
        .is-static .mech__ticks,
        .is-static .mech__drain { opacity: 1; transform: none; animation: none; }
        .is-static .mech__drips ellipse { opacity: 0; animation: none; }

        /* ---- responsive ---- */
        @media (max-width: 900px) {
          .mech__head { align-items: flex-start; flex-direction: column; gap: var(--space-4); }
          .mech__intro { max-width: 52ch; }
        }
        @media (max-width: 860px) {
          .mech__physics { grid-template-columns: 1fr; gap: var(--space-8); }
          .mech__diagram { max-width: 320px; }
        }
        @media (max-width: 560px) {
          .mech { padding: var(--space-7) 0; }
          .mech__inner { padding: 0 var(--space-4); }
          .mech__head { padding: var(--space-5); }
          .mech__hook { font-size: clamp(32px, 10vw, 42px); }
          .mech__intro { font-size: 14px; }
          .mech__registers { grid-template-columns: 1fr; }
          .mech__reg { padding: var(--space-4) var(--space-5); border-right: 0; border-bottom: 1px solid var(--border-default); }
          .mech__reg:last-child { border-bottom: 0; }
          .mech__reg-word { font-size: 20px; }
          .mech__physics { margin-top: var(--space-9); padding-top: var(--space-7); }
          .mech__drains { gap: 4px; justify-content: space-between; padding: 0 2px; }
          .mech__drain { font-size: 8.5px; letter-spacing: 0.04em; white-space: nowrap; }
        }
      `}</style>
    </section>
  )
}
