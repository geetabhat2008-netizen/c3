'use client'

import { useState } from 'react'
import Image from 'next/image'

/* ------------------------------------------------------------------ */
/* DATA — Category content with mechanism-first copy                   */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  {
    id: 'calm',
    label: 'Calm',
    color: '#D2B6F7', // phase-1 lavender
    textColor: '#6B3FA0',
    image: '/images/lifestyle/morning-session.png',
    alt: 'Morning Neuro-Massager session in soft daylight',
    headline: 'Reduce\nSensory Load',
    description:
      'Closes the two primary input channels — trigeminal gate and the 480–520nm light band — so your nervous system has room to settle.',
    stats: [
      { value: '40% Less', detail: 'photophobia' },
      { value: '2–4 Hrs', detail: 'sustained calm' },
    ],
    testimonial: {
      quote:
        'For the first time the noise in my head actually quieted. That was enough to function again.',
      author: 'MATT D.',
      role: 'VERIFIED CUSTOMER',
    },
  },
  {
    id: 'sleep',
    label: 'Sleep',
    color: '#E596FF', // phase-2 magenta
    textColor: '#7A2090',
    image: '/images/lifestyle/sleep-buds.png',
    alt: 'Acoustic Silence Sleep Buds resting before bed',
    headline: 'Protect the\nSleep Window',
    description:
      'Masks auditory load and holds vasoconstriction through the 20-minute window — removing the barriers that keep you awake.',
    stats: [
      { value: '30 dB', detail: 'attenuation' },
      { value: '+60 Min', detail: 'deeper sleep' },
    ],
    testimonial: {
      quote:
        'I used to sleep like the dead, then I had kids. This makes me sleep like I did before. It just works.',
      author: 'MAGGIE U.',
      role: 'VERIFIED CUSTOMER',
    },
  },
  {
    id: 'focus',
    label: 'Focus',
    color: '#F5B061', // phase-3 ochre
    textColor: '#7A4010',
    image: '/images/lifestyle/office-glasses.png',
    alt: 'FL-41 Optic Shield worn at a desk workstation',
    headline: 'Preserve Focus\nUnder Load',
    description:
      "With photosensitivity and neck tension off your cognitive load, you don't fight to concentrate — you just have it.",
    stats: [
      { value: '80% Less', detail: 'blue light' },
      { value: 'C0–C2', detail: 'decompression' },
    ],
    testimonial: {
      quote:
        'Energized and focused, without the buzz and crash I get from coffee. It is sustainable.',
      author: 'BRIAN R.',
      role: 'VERIFIED CUSTOMER',
    },
  },
] as const

/* ------------------------------------------------------------------ */
/* COMPONENT — Expanding filmstrip with glassmorphism                  */
/* ------------------------------------------------------------------ */

export default function BenefitsShowcase() {
  const [active, setActive] = useState<string>('calm')

  return (
    <section className="benefits" aria-label="Product benefits showcase">
      <div className="benefits__container">
        <header className="benefits__header">
          <h2 className="benefits__h2">
            Outcomes the protocol
            <span className="benefits__h2-2">is designed to support.</span>
          </h2>
        </header>

        <div className="benefits__pills" role="tablist" aria-label="Benefit categories">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`benefits-panel-${cat.id}`}
                className={`benefits__pill${isActive ? ' is-active' : ''}`}
                style={
                  isActive
                    ? { background: cat.color, color: cat.textColor, borderColor: cat.color }
                    : undefined
                }
                onClick={() => setActive(cat.id)}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        <div className="benefits__strip">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id
            return (
              <div
                key={cat.id}
                id={`benefits-panel-${cat.id}`}
                role="tabpanel"
                className={`benefits__panel${isActive ? ' is-active' : ''}`}
                onClick={() => !isActive && setActive(cat.id)}
              >
                <div className="benefits__imgwrap" aria-hidden="true">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    className="benefits__img"
                  />
                </div>
                <div
                  className="benefits__scrim"
                  aria-hidden="true"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(20,16,28,0.30) 0%, rgba(20,16,28,0.05) 34%, rgba(20,16,28,0.72) 100%)'
                      : 'linear-gradient(180deg, rgba(20,16,28,0.10) 0%, rgba(20,16,28,0.70) 100%)',
                  }}
                />

                {/* COLLAPSED — plus button + big label */}
                {!isActive && (
                  <>
                    <button
                      type="button"
                      className="benefits__plus"
                      aria-label={`Show ${cat.label}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActive(cat.id)
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                    <span className="benefits__collapsed-label">{cat.label}</span>
                  </>
                )}

                {/* EXPANDED — glass content */}
                {isActive && (
                  <div className="benefits__content">
                    <div className="benefits__top">
                      <span
                        className="benefits__badge"
                        style={{ background: cat.color, color: cat.textColor }}
                      >
                        {cat.label}
                      </span>
                      <button type="button" className="benefits__learn">
                        Learn More
                      </button>
                    </div>

                    <div className="benefits__bottom">
                      <div className="benefits__lead">
                        <h3 className="benefits__headline">{cat.headline}</h3>
                        <p className="benefits__desc">{cat.description}</p>
                      </div>

                      <div className="benefits__side">
                        <figure className="benefits__quote">
                          <blockquote className="benefits__quote-text">
                            &ldquo;{cat.testimonial.quote}&rdquo;
                          </blockquote>
                          <figcaption className="benefits__quote-author">
                            {cat.testimonial.author}
                            <span className="benefits__quote-role">{cat.testimonial.role}</span>
                          </figcaption>
                        </figure>
                        <div className="benefits__stats">
                          {cat.stats.map((s, i) => (
                            <div key={i} className="benefits__stat">
                              <span className="benefits__stat-value">{s.value}</span>
                              <span className="benefits__stat-detail">{s.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .benefits {
          position: relative;
          padding: clamp(56px, 7vw, 96px) max(20px, 4vw);
          background: var(--color-bg);
        }
        .benefits__container {
          max-width: var(--container-max);
          margin: 0 auto;
        }

/* ── HEADER ────────────────────────────────────────────────────── */
        .benefits__h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.4vw, 54px);
          font-weight: 400;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          margin: 0 0 clamp(22px, 3vw, 34px);
        }
        .benefits__h2-2 {
          display: block;
        }

/* ── PILLS ─────────────────────────────────────────────────────── */
        .benefits__pills {
          display: flex;
          gap: 10px;
          margin-bottom: clamp(20px, 2.5vw, 30px);
          flex-wrap: wrap;
        }
        .benefits__pill {
          padding: 8px 18px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--color-text-secondary);
          background: transparent;
          border: 1px solid transparent;
          border-radius: 999px;
          cursor: pointer;
          transition: background 200ms var(--ease-out), color 200ms var(--ease-out);
        }
        .benefits__pill:hover {
          color: var(--color-text-primary);
          background: rgba(26, 26, 26, 0.05);
        }
        .benefits__pill:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--color-secondary);
        }

/* ── FILMSTRIP ─────────────────────────────────────────────────── */
        .benefits__strip {
          display: flex;
          gap: 14px;
          height: clamp(440px, 46vw, 560px);
        }
        .benefits__panel {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(26, 26, 26, 0.08);
          cursor: pointer;
          transition: flex-grow 560ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .benefits__panel.is-active {
          flex-grow: 2.6;
          cursor: default;
        }
        /* fixed-width window: panels crop the photo instead of rescaling it */
        .benefits__imgwrap {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(620px, 60vw, 940px);
        }
        .benefits__img {
          object-fit: cover;
        }
        .benefits__scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: background 400ms var(--ease-out);
        }

/* ── COLLAPSED ─────────────────────────────────────────────────── */
        .benefits__plus {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          cursor: pointer;
          transition: transform 180ms var(--ease-out), background 180ms var(--ease-out);
        }
        .benefits__plus:hover {
          transform: scale(1.08);
          background: rgba(255, 255, 255, 0.28);
        }
        .benefits__collapsed-label {
          position: absolute;
          left: 20px;
          bottom: 20px;
          right: 20px;
          font-family: var(--font-display);
          font-size: clamp(20px, 2vw, 27px);
          font-weight: 400;
          line-height: 1.1;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

/* ── EXPANDED CONTENT ──────────────────────────────────────────── */
        .benefits__content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(22px, 2.6vw, 36px);
          animation: benefitsFade 420ms var(--ease-out) 120ms both;
        }
        @keyframes benefitsFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .benefits__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .benefits__badge {
          padding: 7px 15px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: 999px;
        }
        .benefits__learn {
          padding: 9px 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #fff;
          background: rgba(38, 32, 30, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 180ms var(--ease-out);
        }
        .benefits__learn:hover {
          background: rgba(38, 32, 30, 0.75);
        }

        .benefits__bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(16px, 2.5vw, 40px);
        }
        .benefits__lead {
          max-width: 44ch;
        }
        .benefits__headline {
          font-family: var(--font-display);
          font-size: clamp(26px, 2.9vw, 38px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 14px;
          white-space: pre-line;
        }
        .benefits__desc {
          font-family: var(--font-mono);
          font-size: 12.5px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.82);
          margin: 0;
          max-width: 42ch;
        }
        /* right column: quote card with stats row beneath — 555.png layout */
        .benefits__side {
          flex-shrink: 0;
          width: min(340px, 38%);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .benefits__stats {
          display: flex;
          gap: 10px;
        }
        .benefits__stat {
          flex: 1 1 0;
          padding: 12px 14px;
          background: rgba(38, 32, 30, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          text-align: center;
        }
        .benefits__stat-value {
          display: block;
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 3px;
        }
        .benefits__stat-detail {
          display: block;
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.66);
        }

/* ── GLASS TESTIMONIAL — smoky dark glass, 555.png style ───────── */
        .benefits__quote {
          margin: 0;
          padding: 18px 20px;
          background: rgba(38, 32, 30, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
        }
        .benefits__quote-text {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.94);
          margin: 0 0 12px;
        }
        .benefits__quote-author {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #fff;
        }
        .benefits__quote-role {
          display: block;
          margin-top: 2px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
        }

/* ── RESPONSIVE ────────────────────────────────────────────────── */
        @media (max-width: 900px) {
          .benefits__strip {
            flex-direction: column;
            height: auto;
            gap: 12px;
          }
          .benefits__panel {
            min-height: 84px;
            transition: none;
          }
          .benefits__panel.is-active {
            min-height: 600px;
          }
          .benefits__collapsed-label {
            bottom: 50%;
            transform: translateY(50%);
          }
          .benefits__bottom {
            flex-direction: column;
            align-items: stretch;
          }
          .benefits__side {
            width: 100%;
          }
          .benefits__lead {
            max-width: none;
          }
          .benefits__imgwrap {
            left: 0;
            right: 0;
            transform: none;
            width: auto;
          }
        }

        @media (max-width: 600px) {
          .benefits__content {
            padding: 20px;
          }
          .benefits__stats {
            gap: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .benefits__scrim,
          .benefits__panel,
          .benefits__plus,
          .benefits__learn,
          .benefits__pill {
            transition: none;
          }
          .benefits__content {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
