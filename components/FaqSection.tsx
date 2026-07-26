'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  WIREFRAME VISUAL — abstract mesh ribbon, generated, no assets     */
/* ------------------------------------------------------------------ */

type MeshParams = {
  samples?: number
  spokes?: number
  ringEvery?: number
  turns?: number
  startAngle?: number
  x0?: number
  x1?: number
  cy?: number
  r0?: number
  r1?: number
  tube0?: number
  tube1?: number
  zAmp?: number
  tilt?: number
}

function wireframePaths({
  samples = 160,
  spokes = 10,
  ringEvery = 6,
  turns = 1.6,
  startAngle = Math.PI * 0.9,
  x0 = 66,
  x1 = 226,
  cy = 122,
  r0 = 74,
  r1 = 48,
  tube0 = 26,
  tube1 = 16,
  zAmp = 18,
  tilt = 0.22,
}: MeshParams) {
  const curve = (t: number): [number, number, number] => {
    const a = startAngle + t * turns * Math.PI * 2
    const r = r0 + (r1 - r0) * t
    return [
      x0 + (x1 - x0) * t + r * Math.cos(a),
      cy + r * Math.sin(a) * 0.78,
      zAmp * Math.sin(a),
    ]
  }

  const cosT = Math.cos(tilt)
  const sinT = Math.sin(tilt)
  const project = ([x, y, z]: [number, number, number]) =>
    [x + z * 0.08, cy + (y - cy) * cosT - z * sinT * 0.4] as const

  const norm = (v: [number, number, number]): [number, number, number] => {
    const l = Math.hypot(v[0], v[1], v[2]) || 1
    return [v[0] / l, v[1] / l, v[2] / l]
  }
  const cross = (
    a: [number, number, number],
    b: [number, number, number],
  ): [number, number, number] => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]

  /* tube surface points: grid[sample][spoke] */
  const grid: [number, number][][] = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const p = curve(t)
    const ahead = curve(Math.min(1, t + 0.004))
    const behind = curve(Math.max(0, t - 0.004))
    const tan = norm([ahead[0] - behind[0], ahead[1] - behind[1], ahead[2] - behind[2]])
    const n = norm(cross(tan, [0, 0, 1]))
    const b = norm(cross(tan, n))
    const tr = tube0 + (tube1 - tube0) * t
    const ring: [number, number][] = []
    for (let j = 0; j < spokes; j++) {
      const th = (j / spokes) * Math.PI * 2
      const q: [number, number, number] = [
        p[0] + tr * (Math.cos(th) * n[0] + Math.sin(th) * b[0]),
        p[1] + tr * (Math.cos(th) * n[1] + Math.sin(th) * b[1]),
        p[2] + tr * (Math.cos(th) * n[2] + Math.sin(th) * b[2]),
      ]
      const [px, py] = project(q)
      ring.push([Math.round(px * 10) / 10, Math.round(py * 10) / 10])
    }
    grid.push(ring)
  }

  const longs: string[] = []
  for (let j = 0; j < spokes; j++) {
    longs.push('M' + grid.map((ring) => ring[j].join(' ')).join(' L'))
  }
  const rings: string[] = []
  for (let i = 0; i < grid.length; i += ringEvery) {
    rings.push('M' + grid[i].map((pt) => pt.join(' ')).join(' L') + ' Z')
  }
  return { longs, rings }
}

function Wireframe({
  className,
  params,
  viewBox = '0 0 300 240',
}: {
  className?: string
  params?: MeshParams
  viewBox?: string
}) {
  const mesh = useMemo(() => wireframePaths(params ?? {}), []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <svg className={className} viewBox={viewBox} fill="none" aria-hidden="true" shapeRendering="geometricPrecision">
      {mesh.rings.map((d, i) => (
        <path key={`r${i}`} d={d} stroke="rgba(26, 26, 26, 0.28)" strokeWidth="0.55" />
      ))}
      {mesh.longs.map((d, i) => (
        <path
          key={`l${i}`}
          d={d}
          stroke={i === 0 ? 'rgba(232, 98, 74, 0.7)' : 'rgba(26, 26, 26, 0.4)'}
          strokeWidth={i === 0 ? 0.8 : 0.55}
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  DATA — grouped by topic                                           */
/* ------------------------------------------------------------------ */

const TOPICS = [
  {
    id: 'using',
    label: 'Using the Suite',
    faqs: [
      {
        q: 'Can I use it during an attack?',
        a: 'Yes — that is exactly what it is built for. Every module operates silently and in complete darkness. No screens, no app required mid-attack, no bright status lights.',
      },
      {
        q: 'How long is a session?',
        a: 'The core calibration is 15 minutes. Each module holds its own therapeutic window — the massager auto-stops at 15 minutes to prevent habituation, the cryo-wrap caps at 20 minutes to avoid paradoxical vasodilation.',
      },
      {
        q: 'Do I need an app or a screen?',
        a: 'No. Every module runs standalone, from physical controls. Mid-attack operation is entirely screen-free by design — light is an input we refuse to add.',
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
      },
      {
        q: 'Why five mechanisms at once?',
        a: 'Because your threshold is a bucket, not a switch. Each unmanaged input keeps filling it. Managing one input while four keep pouring rarely changes the overflow. Managing all five does.',
      },
      {
        q: 'Is this a medical treatment?',
        a: 'No — and we will not pretend otherwise. The Suite does not treat or cure migraine. It manages the sensory conditions around your nervous system, and it works alongside whatever your clinician prescribes.',
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
      },
      {
        q: 'Why is the guarantee tied to the protocol?',
        a: 'Because the Suite is a system, not a gadget. Used at random, any single module underperforms. The 30-Day Protocol is the tested sequence — commit to it, and the refund terms commit to you.',
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
      },
      {
        q: 'Can I pay with HSA or FSA funds?',
        a: 'Yes — the Suite is HSA / FSA eligible. Using pre-tax health dollars, the effective post-tax cost for most users is under $260.',
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    faqs: [
      {
        q: 'How long does shipping take?',
        a: 'Orders ship within 24 hours. Delivery is 3–5 business days in the US. The Sanctuary Protocol ebook is delivered instantly by email.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently the US and Canada. The Sanctuary Protocol ebook is delivered worldwide, instantly — hardware regions are expanding through the year.',
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
  const [open, setOpen] = useState<number | null>(0)

  const activeTopic = TOPICS[topic]

  const selectTopic = (i: number) => {
    setTopic(i)
    setOpen(0)
  }

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.55, delay, ease: 'easeOut' as const },
  })

  return (
    <section id="faq" className="faq has-grid-rules" aria-labelledby="faq-heading">
      <div className="faq__inner">
        {/* ---------- Header: title left, collage right ---------- */}
        <div className="faq__head">
          <motion.div className="faq__head-copy" {...fadeUp(0)}>
            <p className="faq__eyebrow">Before you begin</p>
            <h2 id="faq-heading" className="faq__title text-balance">
              Clear answers about the suite,
              <br />
              the protocol, and the guarantee.
            </h2>
            <p className="faq__dek">
              Everything the label does not tell you — mechanisms, limits, and
              the guarantee, in plain language.
            </p>
          </motion.div>

          <motion.div className="faq__visual" aria-hidden="true" {...fadeUp(0.12)}>
            <Wireframe className="faq__mesh" />
          </motion.div>
        </div>

        {/* ---------- Body: topics left, cards right ---------- */}
        <div className="faq__body">
          <motion.nav className="faq__topics" aria-label="FAQ topics" {...fadeUp(0.08)}>
            <p className="faq__topics-label">Topic</p>
            <ul className="faq__topics-list" role="list">
              {TOPICS.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`faq__topic ${i === topic ? 'faq__topic--active' : ''}`}
                    aria-pressed={i === topic}
                    onClick={() => selectTopic(i)}
                  >
                    <span className="faq__topic-marker" aria-hidden="true" />
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="faq__topics-visual" aria-hidden="true">
              <Wireframe
                className="faq__mesh faq__mesh--sm"
                viewBox="10 20 280 210"
                params={{
                  samples: 130,
                  spokes: 9,
                  ringEvery: 7,
                  turns: 1.35,
                  startAngle: Math.PI * 1.2,
                  x0: 74,
                  x1: 216,
                  cy: 120,
                  r0: 58,
                  r1: 36,
                  tube0: 22,
                  tube1: 13,
                  zAmp: 14,
                  tilt: 0.25,
                }}
              />
            </div>
          </motion.nav>

          <motion.div className="faq__panel" {...fadeUp(0.14)}>
            <p className="faq__panel-label">Questions and answers</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTopic.id}
                className="faq__list"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={reduce ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' }}
              >
                {activeTopic.faqs.map((item, i) => {
                  const isOpen = open === i
                  return (
                    <div
                      key={item.q}
                      className={`faq__card ${isOpen ? 'faq__card--open' : ''}`}
                    >
                      <h3 className="faq__q-wrap">
                        <button
                          type="button"
                          className="faq__q"
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${activeTopic.id}-${i}`}
                          id={`faq-trigger-${activeTopic.id}-${i}`}
                          onClick={() => setOpen(isOpen ? null : i)}
                        >
                          <span className="faq__q-text">{item.q}</span>
                          <span
                            className={`faq__icon ${isOpen ? 'faq__icon--open' : ''}`}
                            aria-hidden="true"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M6 1v10M1 6h10"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${activeTopic.id}-${i}`}
                            role="region"
                            aria-labelledby={`faq-trigger-${activeTopic.id}-${i}`}
                            initial={reduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
                            transition={
                              reduce ? { duration: 0 } : { duration: 0.32, ease: [0, 0, 0.2, 1] }
                            }
                            style={{ overflow: 'hidden' }}
                          >
                            <p className="faq__a">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            <p className="faq__note">
              Still unsure? Write to us at{' '}
              <a href="mailto:care@crowncalm.com" className="faq__link">
                care@crowncalm.com
              </a>{' '}
              — a human replies within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .faq {
          position: relative;
          background: var(--color-bg);
          padding: clamp(48px, 6.5vw, 84px) max(46px, 5.5vw);
        }
        .faq__inner {
          position: relative;
          z-index: 1;
          max-width: 1080px;
          margin: 0 auto;
        }

        /* ---------- header ---------- */
        .faq__head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .faq__head-copy {
          max-width: 520px;
        }
        .faq__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8f8981;
          margin: 0 0 16px;
        }
        .faq__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.4vw, 52px);
          font-weight: 400;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          margin: 0 0 18px;
        }
        .faq__title em {
          font-style: italic;
          color: #c4503a;
        }
        .faq__dek {
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.6;
          letter-spacing: 0;
          color: #6b655d;
          max-width: 40ch;
          margin: 0;
        }

        /* wireframe visual — flat line drawing, no fills, no shadow */
        .faq__visual {
          position: relative;
          flex-shrink: 0;
          width: clamp(300px, 34vw, 420px);
          align-self: center;
        }
        .faq__mesh {
          display: block;
          width: 100%;
          height: auto;
        }

        /* smaller ribbon below the topic list */
        .faq__topics-visual {
          margin-top: 48px;
        }
        .faq__mesh--sm {
          max-width: 230px;
        }

        /* ---------- body grid ---------- */
        .faq__body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }

        /* topics sidebar */
        .faq__topics-label,
        .faq__panel-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8f8981;
          margin: 0 0 18px;
        }
        .faq__topics-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .faq__topic {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-display);
          font-size: 16px;
          letter-spacing: -0.01em;
          color: #6b655d;
          transition: color 150ms ease;
        }
        .faq__topic:hover {
          color: var(--color-text-primary);
        }
        .faq__topic:focus-visible {
          outline: 2px solid #1a1a1a;
          outline-offset: 2px;
          border-radius: 4px;
        }
        .faq__topic-marker {
          width: 0;
          height: 1px;
          background: #c4503a;
          transition: width 220ms var(--ease-out);
        }
        .faq__topic--active {
          color: var(--color-text-primary);
          font-style: italic;
        }
        .faq__topic--active .faq__topic-marker {
          width: 18px;
        }

        /* ---------- cards ---------- */
        .faq__list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq__card {
          border: 1px solid rgba(26, 26, 26, 0.14);
          border-radius: 12px;
          background: var(--color-surface-inset);
          transition: background 240ms ease, border-color 240ms ease;
        }
        .faq__card--open {
          background: var(--color-surface);
          border-color: rgba(26, 26, 26, 0.24);
        }
        .faq__q-wrap {
          margin: 0;
        }
        .faq__q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 16px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .faq__q:focus-visible {
          outline: 2px solid #1a1a1a;
          outline-offset: 2px;
          border-radius: 10px;
        }
        .faq__q-text {
          font-family: var(--font-display);
          font-size: 16.5px;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.4;
          color: var(--color-text-primary);
        }
        .faq__icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border: 1px solid rgba(26, 26, 26, 0.2);
          border-radius: 50%;
          color: #1a1a1a;
          transition: transform 0.25s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .faq__icon--open {
          transform: rotate(45deg);
          background: #1a1a1a;
          color: #f2ece4;
          border-color: #1a1a1a;
        }
        .faq__a {
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.6;
          letter-spacing: 0;
          color: #5c5c5c;
          max-width: 560px;
          margin: 0;
          padding: 0 52px 18px 20px;
        }

        /* ---------- note ---------- */
        .faq__note {
          font-family: var(--font-body);
          font-size: 14.5px;
          letter-spacing: 0;
          line-height: 1.6;
          color: #6b655d;
          margin: 28px 0 0;
        }
        .faq__link {
          color: var(--color-text-primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(26, 26, 26, 0.3);
          padding-bottom: 1px;
        }
        .faq__link:hover {
          border-bottom-color: #1a1a1a;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 900px) {
          .faq__visual,
          .faq__topics-visual {
            display: none;
          }
          .faq__body {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .faq__topics-list {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 6px;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }
          .faq__topics-list li {
            flex-shrink: 0;
          }
          .faq__topic {
            padding: 8px 14px;
            border: 1px solid rgba(26, 26, 26, 0.16);
            border-radius: 9999px;
            font-size: 14px;
            white-space: nowrap;
          }
          .faq__topic--active {
            font-style: normal;
            border-color: #1a1a1a;
            background: #1a1a1a;
            color: #f2ece4;
          }
          .faq__topic-marker {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .faq__q-text {
            font-size: 15px;
          }
          .faq__a {
            padding-right: 20px;
          }
        }
      `}</style>
    </section>
  )
}
