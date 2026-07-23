'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0, 0, 0.2, 1]
const AUTO_ADVANCE_MS = 8000

const PAIN_LAYERS = [
  {
    id: 'storm',
    color: '#D2B6F7',
    deep: '#6B3FA0',
    label: 'The Storm',
    title: 'The body.',
    image: '/images/pain/storm.png',
    imageAlt:
      'A woman sitting on the edge of a bed in a dark room, pressing her palm against her forehead in pain',
    lead: "The pressure that arrives before you've even opened your eyes.",
    support: [
      "Light that doesn't hurt. It assaults.",
      "Your hair hurts. You know this sounds absurd. You know it's true.",
    ],
    accentLast: false,
  },
  {
    id: 'theft',
    color: '#F5B061',
    deep: '#8A4A10',
    label: 'The Theft',
    title: 'The life.',
    image: '/images/pain/theft.png',
    imageAlt:
      'An empty chair at a warmly lit dinner table while a celebration continues blurred in the background',
    lead: 'The recital you watched from the back row, with sunglasses on.',
    support: [
      'The meeting you left early. Again.',
      "The plans you make with a silent asterisk — if I'm okay.",
    ],
    accentLast: false,
  },
  {
    id: 'erosion',
    color: '#8BB8FF',
    deep: '#2B4F8A',
    label: 'The Erosion',
    title: 'The self.',
    image: '/images/pain/erosion.png',
    imageAlt:
      'A woman looking at her faint, blurred reflection in a rain-streaked window at dusk',
    lead: "You used to be the reliable one. Now you're the one who cancels.",
    support: [
      'You manage around pain instead of living through possibility.',
      "That's not weakness. That's what happens when the tools are wrong.",
    ],
    accentLast: true,
  },
]

export default function PainAcknowledgment() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cycle, setCycle] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = useCallback((i: number) => {
    setActive(i)
    setCycle((c) => c + 1)
  }, [])

  useEffect(() => {
    if (reduce || paused) return
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % PAIN_LAYERS.length)
      setCycle((c) => c + 1)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [active, cycle, paused, reduce])

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (active + 1) % PAIN_LAYERS.length
    if (e.key === 'ArrowLeft') next = (active - 1 + PAIN_LAYERS.length) % PAIN_LAYERS.length
    if (next !== null) {
      e.preventDefault()
      select(next)
      tabRefs.current[next]?.focus()
    }
  }

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay, ease: EASE },
        }

  const layer = PAIN_LAYERS[active]

  return (
    <section className="pain has-grid-rules">
      <div className="pain__inner">
        {/* HEADER */}
        <div className="pain__header">
          <div>
            <motion.p className="pain__eyebrow" {...fadeUp(0.05)}>
              The Three Layers
            </motion.p>
            <h2 className="pain__h2">
              <motion.span {...fadeUp(0.1)}>You know exactly</motion.span>
              <motion.span className="pain__h2-italic" {...fadeUp(0.15)}>
                what this costs.
              </motion.span>
            </h2>
          </div>
          <motion.p className="pain__sub" {...fadeUp(0.2)}>
            Before anything else — we want you to know we understand the full
            weight of it. Not the clinical version. The real one.
          </motion.p>
        </div>

        {/* TAB SCROLLER */}
        <motion.div
          className="pain__tabs-wrap"
          {...fadeUp(0.25)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="pain__tabs"
            role="tablist"
            aria-label="The three layers of migraine cost"
            onKeyDown={onKeyDown}
          >
            {PAIN_LAYERS.map((l, i) => {
              const isActive = i === active
              return (
                <button
                  key={l.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`pain-tab-${l.id}`}
                  aria-selected={isActive}
                  aria-controls={`pain-panel-${l.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`pain__tab${isActive ? ' pain__tab--active' : ''}`}
                  onClick={() => select(i)}
                >
                  <span className="pain__tab-track" aria-hidden>
                    <span
                      className="pain__tab-base"
                      style={{ background: l.color, opacity: isActive ? 0.35 : 0.18 }}
                    />
                    {isActive && !reduce && (
                      <motion.span
                        key={`fill-${cycle}`}
                        className="pain__tab-fill"
                        style={{ background: l.color }}
                        initial={{ width: '0%' }}
                        animate={{ width: paused ? undefined : '100%' }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                    {isActive && reduce && (
                      <span className="pain__tab-fill" style={{ background: l.color, width: '100%' }} />
                    )}
                  </span>
                  <span className="pain__tab-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pain__tab-label">{l.label}</span>
                  <span className="pain__tab-title">{l.title}</span>
                </button>
              )
            })}
          </div>

          {/* ACTIVE PANEL */}
          <div className="pain__panel-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={layer.id}
                id={`pain-panel-${layer.id}`}
                role="tabpanel"
                aria-labelledby={`pain-tab-${layer.id}`}
                className="pain__panel"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {/* IMAGE — dominant on desktop, layered plate frame */}
                <div className="pain__panel-visual">
                  <span
                    className="pain__panel-plate"
                    style={{ background: layer.color, opacity: 0.28 }}
                    aria-hidden
                  />
                  <div className="pain__panel-image">
                    <img src={layer.image || '/placeholder.svg'} alt={layer.imageAlt} />
                    <div className="pain__panel-caption" aria-hidden>
                      <span className="pain__panel-caption-dot" style={{ background: layer.color }} />
                      <span className="pain__panel-caption-text">
                        {String(active + 1).padStart(2, '0')} — {layer.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* COPY — one lead line, two support lines */}
                <div className="pain__panel-copy">
                  <span className="pain__ghost-num" aria-hidden>
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <p className="pain__panel-kicker" style={{ color: layer.deep }}>
                    {layer.title}
                  </p>
                  <motion.p
                    className="pain__lead"
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
                  >
                    {layer.lead}
                  </motion.p>
                  <div className="pain__support">
                    {layer.support.map((s, j) => {
                      const isAccent = layer.accentLast && j === layer.support.length - 1
                      return (
                        <motion.p
                          key={j}
                          className={`pain__stmt${isAccent ? ' pain__stmt--accent' : ''}`}
                          initial={reduce ? { opacity: 1 } : { opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.25 + j * 0.09, ease: EASE }}
                        >
                          <span
                            className="pain__stmt-marker"
                            style={{ background: layer.color }}
                            aria-hidden
                          />
                          {s}
                        </motion.p>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* PIVOT */}
        <motion.div className="pain__pivot" {...fadeUp(0.3)}>
          <p className="pain__pivot-quote">
            &ldquo;That&apos;s not you. That&apos;s an incomplete tool set.&rdquo;
          </p>
          <a
            href="#five-pillars"
            className="pain__pivot-link"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('five-pillars')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            ↓ Here is what actually works
          </a>
        </motion.div>
      </div>

      <style>{`
        .pain {
          position: relative;
          overflow: hidden;
          background: var(--color-bg);
          padding: clamp(44px, 6vw, 76px) max(46px, 5.5vw);
        }
        .pain__inner {
          position: relative;
          z-index: 1;
          max-width: var(--container-max);
          margin: 0 auto;
        }

        /* HEADER */
        .pain__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 48px;
          margin-bottom: 40px;
        }
        .pain__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8F8981;
          margin-bottom: 16px;
        }
        .pain__h2 {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--color-text-primary);
          margin: 0;
        }
        .pain__h2 span { display: block; }
        .pain__h2 .pain__h2-italic { font-style: italic; }
        .pain__sub {
          font-family: var(--font-body);
          font-size: 15px;
          color: #5C5C5C;
          line-height: 1.7;
          letter-spacing: 0;
          max-width: 360px;
          margin: 0 0 6px;
        }

        /* TABS */
        .pain__tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }
        .pain__tab {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 14px 0 0;
          position: relative;
          transition: opacity 200ms var(--ease-out);
          opacity: 0.5;
        }
        .pain__tab--active { opacity: 1; }
        .pain__tab:hover { opacity: 0.85; }
        .pain__tab--active:hover { opacity: 1; }

        .pain__tab-track {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 2px;
          overflow: hidden;
          display: block;
        }
        .pain__tab-base { position: absolute; inset: 0; display: block; }
        .pain__tab-fill { position: absolute; top: 0; left: 0; bottom: 0; display: block; }

        .pain__tab-num {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #8F8981;
          margin-bottom: 6px;
        }
        .pain__tab-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin-bottom: 2px;
        }
        .pain__tab-title {
          display: block;
          font-family: var(--font-display);
          font-size: 15px;
          font-style: italic;
          color: #5C5C5C;
        }

        /* PANEL */
        .pain__panel-frame {
          border-top: 1px solid rgba(26,26,26,0.10);
          padding-top: 40px;
          min-height: 460px;
        }
        .pain__panel {
          display: grid;
          grid-template-columns: 52fr 48fr;
          gap: clamp(40px, 5vw, 72px);
          align-items: center;
        }

        /* VISUAL — layered plate + image */
        .pain__panel-visual {
          position: relative;
          padding: 0 14px 14px 0;
        }
        .pain__panel-plate {
          position: absolute;
          top: 14px; left: 14px; right: 0; bottom: 0;
          border-radius: 8px;
          display: block;
        }
        .pain__panel-image {
          position: relative;
          aspect-ratio: 5 / 4;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(26,26,26,0.10);
          box-shadow: 0 12px 32px rgba(26,26,26,0.14);
        }
        .pain__panel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pain__panel-caption {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: linear-gradient(to top, rgba(15,13,11,0.72), transparent);
        }
        .pain__panel-caption-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .pain__panel-caption-text {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #F2ECE4;
        }

        /* COPY */
        .pain__panel-copy {
          position: relative;
          max-width: 520px;
        }
        .pain__ghost-num {
          position: absolute;
          top: -56px;
          right: 0;
          font-family: var(--font-display);
          font-size: clamp(96px, 11vw, 160px);
          font-style: italic;
          line-height: 1;
          color: rgba(26,26,26,0.05);
          pointer-events: none;
          user-select: none;
        }
        .pain__panel-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .pain__lead {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.9vw, 36px);
          font-style: italic;
          font-weight: 400;
          line-height: 1.22;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0 0 28px;
          text-wrap: balance;
        }
        .pain__stmt {
          position: relative;
          font-family: var(--font-body);
          font-size: 15px;
          color: #5C5C5C;
          line-height: 1.7;
          letter-spacing: 0;
          margin-bottom: 14px;
          padding-left: 18px;
        }
        .pain__stmt:last-child { margin-bottom: 0; }
        .pain__stmt--accent {
          color: var(--color-text-primary);
          font-weight: 700;
        }
        .pain__stmt-marker {
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        /* PIVOT */
        .pain__pivot {
          margin-top: 40px;
          padding-top: 28px;
          border-top: 1px solid rgba(26,26,26,0.10);
          text-align: center;
        }
        .pain__pivot-quote {
          font-family: var(--font-display);
          font-size: clamp(18px, 2.4vw, 28px);
          font-style: italic;
          font-weight: 400;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
          margin: 0 auto 16px;
          max-width: none;
        }
        .pain__pivot-link {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          text-decoration: none;
          border-bottom: 1.5px solid rgba(26,26,26,0.25);
          padding-bottom: 2px;
          display: inline-block;
          transition: border-color 150ms ease;
        }
        .pain__pivot-link:hover { border-bottom-color: var(--color-text-primary); }

        @media (max-width: 860px) {
          .pain__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 32px;
          }
          .pain__tabs {
            display: flex;
            overflow-x: auto;
            gap: 24px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .pain__tabs::-webkit-scrollbar { display: none; }
          .pain__tab { flex: 0 0 auto; min-width: 160px; }
          .pain__panel {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .pain__panel-visual { padding: 0 10px 10px 0; }
          .pain__panel-plate { top: 10px; left: 10px; }
          .pain__panel-image { aspect-ratio: 16 / 10; }
          .pain__panel-frame { min-height: 0; }
          .pain__ghost-num { top: -40px; font-size: 80px; }
        }
      `}</style>
    </section>
  )
}
