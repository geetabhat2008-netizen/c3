'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const MECHANISMS = [
  { label: 'Gate Control Activation', color: '#D2B6F7', textColor: '#6B3FA0' },
  { label: 'Spectral Filtration (FL-41)', color: '#E596FF', textColor: '#7A2090' },
  { label: 'Thermodynamic Vasoconstriction', color: '#F5B061', textColor: '#7A4010' },
  { label: 'Auditory Masking', color: '#F5D76E', textColor: '#7A6010' },
  { label: 'Trigeminocervical Decompression', color: '#8BB8FF', textColor: '#2B4F8A' },
]

type Result = 'full' | 'partial' | 'none'

const COMPETITORS: {
  name: string
  subtitle: string
  isCrownCalm: boolean
  image: { src: string; alt: string }
  results: readonly Result[]
}[] = [
  {
    name: 'CrownCalm',
    subtitle: 'Sanctuary Suite',
    isCrownCalm: true,
    image: { src: '/images/compare/crowncalm.png', alt: 'The CrownCalm Sanctuary Suite' },
    results: ['full', 'full', 'full', 'full', 'full'],
  },
  {
    name: 'Cold Cap',
    subtitle: 'Cryo wrap',
    isCrownCalm: false,
    image: { src: '/images/compare/cold-cap.png', alt: 'A generic cold cap product' },
    results: ['none', 'none', 'partial', 'none', 'none'],
  },
  {
    name: 'Blue-Light Glasses',
    subtitle: 'Generic filter',
    isCrownCalm: false,
    image: { src: '/images/compare/blue-light.png', alt: 'Generic blue-light glasses' },
    results: ['none', 'partial', 'none', 'none', 'none'],
  },
  {
    name: 'Head Massager',
    subtitle: 'Vibration-based',
    isCrownCalm: false,
    image: { src: '/images/compare/massager-gen.png', alt: 'A generic vibrating head massager' },
    results: ['partial', 'none', 'none', 'none', 'none'],
  },
  {
    name: 'OTC Medication',
    subtitle: 'Pain relief pills',
    isCrownCalm: false,
    image: { src: '/images/compare/otc-meds.png', alt: 'Over-the-counter medication packaging' },
    results: ['none', 'none', 'none', 'none', 'none'],
  },
]

/* Practical, conversion-focused rows.
 * Values: Result symbol OR display string per competitor (CrownCalm first). */
const PRACTICALS: {
  label: string
  values: readonly (Result | string)[]
}[] = [
  {
    label: 'Usable mid-attack, in a dark room',
    values: ['full', 'full', 'none', 'partial', 'partial'],
  },
  {
    label: 'Drug-free — no rebound headaches',
    values: ['full', 'full', 'full', 'full', 'none'],
  },
  {
    label: 'One-time purchase, no refills',
    values: ['full', 'full', 'full', 'full', 'none'],
  },
  {
    label: '30-day protocol guarantee',
    values: ['full', 'none', 'none', 'none', 'none'],
  },
  {
    label: 'Cost per mechanism covered',
    values: ['$69', '\u2014', '\u2014', '\u2014', '\u2014'],
  },
]

/* ------------------------------------------------------------------ */
/* DRAW-ON CHECKMARK                                                   */
/* ------------------------------------------------------------------ */

function DrawnCheck({
  color,
  delay,
  reduce,
}: {
  color: string
  delay: number
  reduce: boolean
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      role="img"
      aria-label="Yes"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <motion.path
        d="M3.5 9.5 L7.5 13.5 L14.5 4.5"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: 'easeOut' }}
      />
    </svg>
  )
}

function ResultMark({
  result,
  isCrownCalm,
  accentColor,
  delay,
  reduce,
}: {
  result: Result
  isCrownCalm: boolean
  accentColor: string
  delay: number
  reduce: boolean
}) {
  if (result === 'full') {
    return isCrownCalm ? (
      <DrawnCheck color={accentColor} delay={delay} reduce={reduce} />
    ) : (
      <span className="cm__sym cm__sym--full" role="img" aria-label="Yes">
        {'\u2713'}
      </span>
    )
  }
  if (result === 'partial') {
    return (
      <span className="cm__sym cm__sym--partial" role="img" aria-label="Partial">
        ~
      </span>
    )
  }
  return (
    <span className="cm__sym cm__sym--none" role="img" aria-label="No">
      {'\u2014'}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* COVERAGE SPECTRUM BAR                                               */
/* ------------------------------------------------------------------ */

function CoverageBar({
  results,
  reduce,
}: {
  results: readonly Result[]
  reduce: boolean
}) {
  return (
    <div className="cm__coverage" aria-hidden="true">
      {results.map((r, i) => (
        <motion.span
          key={i}
          className="cm__coverage-seg"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
          style={{
            background:
              r === 'full'
                ? MECHANISMS[i].color
                : r === 'partial'
                  ? `${MECHANISMS[i].color}55`
                  : 'rgba(26,26,26,0.07)',
            transformOrigin: 'left',
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PRODUCT COLUMN HEADER — image lives inside the table now            */
/* ------------------------------------------------------------------ */

function ProductHead({ comp }: { comp: (typeof COMPETITORS)[0] }) {
  const [errored, setErrored] = useState(false)

  return (
    <div className={comp.isCrownCalm ? 'cm__prod cm__prod--crown' : 'cm__prod'}>
      <div className="cm__prod-img">
        {errored ? (
          <div className="cm__img-fallback">
            <span>{comp.name}</span>
          </div>
        ) : (
          <Image
            src={comp.image.src || '/placeholder.svg'}
            alt={comp.image.alt}
            fill
            sizes="(max-width: 767px) 18vw, 12vw"
            style={{
              objectFit: 'cover',
              filter: comp.isCrownCalm ? 'none' : 'grayscale(35%) opacity(0.8)',
            }}
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <p className={comp.isCrownCalm ? 'cm__prod-name cm__prod-name--crown' : 'cm__prod-name'}>
        {comp.name}
      </p>
      <p className="cm__prod-sub">{comp.subtitle}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN SECTION                                                        */
/* ------------------------------------------------------------------ */

export default function CompetitorMatrix() {
  const reduce = useReducedMotion() ?? false

  return (
    <section id="competitor-matrix" className="cm" aria-label="Mechanism comparison">
      <div className="cm__inner">
        {/* ---------------- HEADER ---------------- */}
        <motion.div
          className="cm__header"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={reduce ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="cm__eyebrow">The Comparison</p>
          <h2 className="cm__title">
            <span className="cm__title-line">You haven&apos;t failed.</span>
            <span className="cm__title-line cm__title-line--sub">Single mechanisms have.</span>
          </h2>
        </motion.div>

        {/* ---------------- TABLE — 3D raised card ---------------- */}
        <motion.div
          className="cm__card"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
          <span className="cm__card-sheen" aria-hidden="true" />
          <div className="cm__scroll">
            <table className="cm__table" aria-label="What each solution actually covers">
              <thead>
                <tr>
                  <th scope="col" className="cm__th cm__th--mech">
                    <span className="sr-only">Criterion</span>
                  </th>
                  {COMPETITORS.map((comp) => (
                    <th
                      scope="col"
                      key={comp.name}
                      className={comp.isCrownCalm ? 'cm__th cm__th--crown' : 'cm__th'}
                    >
                      <ProductHead comp={comp} />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* -------- GROUP 1: the five mechanisms -------- */}
                <tr className="cm__group-row">
                  <th scope="rowgroup" colSpan={COMPETITORS.length + 1} className="cm__group-cell">
                    The five mechanisms of the migraine cascade
                  </th>
                </tr>

                {MECHANISMS.map((mech, mechIndex) => (
                  <motion.tr
                    key={mech.label}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.45, delay: mechIndex * 0.06 }}
                  >
                    <th scope="row" className="cm__mech-cell">
                      <div className="cm__mech-label">
                        <span className="cm__mech-bar" style={{ background: mech.color }} aria-hidden="true" />
                        <span className="cm__mech-text">{mech.label}</span>
                      </div>
                    </th>

                    {COMPETITORS.map((comp) => (
                      <td
                        key={comp.name}
                        className={comp.isCrownCalm ? 'cm__cell cm__cell--crown' : 'cm__cell'}
                      >
                        <ResultMark
                          result={comp.results[mechIndex]}
                          isCrownCalm={comp.isCrownCalm}
                          accentColor={mech.textColor}
                          delay={0.15 + mechIndex * 0.08}
                          reduce={reduce}
                        />
                      </td>
                    ))}
                  </motion.tr>
                ))}

                {/* -------- SUMMARY ROW -------- */}
                <tr className="cm__summary-row">
                  <th scope="row" className="cm__mech-cell cm__summary-label-cell">
                    <span className="cm__summary-label">Mechanisms covered</span>
                  </th>
                  {COMPETITORS.map((comp) => {
                    const score = comp.results.filter((r) => r === 'full').length
                    return (
                      <td
                        key={comp.name}
                        className={
                          comp.isCrownCalm
                            ? 'cm__cell cm__cell--crown cm__summary-cell'
                            : 'cm__cell cm__summary-cell'
                        }
                      >
                        <span className={comp.isCrownCalm ? 'cm__score cm__score--crown' : 'cm__score'}>
                          {score} / 5
                        </span>
                        <CoverageBar results={comp.results} reduce={reduce} />
                      </td>
                    )
                  })}
                </tr>

                {/* -------- GROUP 2: what it means in practice -------- */}
                <tr className="cm__group-row">
                  <th scope="rowgroup" colSpan={COMPETITORS.length + 1} className="cm__group-cell">
                    What that means in practice
                  </th>
                </tr>

                {PRACTICALS.map((row, rowIndex) => (
                  <motion.tr
                    key={row.label}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.45, delay: rowIndex * 0.06 }}
                  >
                    <th scope="row" className="cm__mech-cell">
                      <div className="cm__mech-label">
                        <span className="cm__mech-bar cm__mech-bar--neutral" aria-hidden="true" />
                        <span className="cm__mech-text">{row.label}</span>
                      </div>
                    </th>

                    {COMPETITORS.map((comp, colIndex) => {
                      const v = row.values[colIndex]
                      return (
                        <td
                          key={comp.name}
                          className={comp.isCrownCalm ? 'cm__cell cm__cell--crown' : 'cm__cell'}
                        >
                          {v === 'full' || v === 'partial' || v === 'none' ? (
                            <ResultMark
                              result={v}
                              isCrownCalm={comp.isCrownCalm}
                              accentColor="#1a1a1a"
                              delay={0.15 + rowIndex * 0.08}
                              reduce={reduce}
                            />
                          ) : (
                            <span
                              className={
                                comp.isCrownCalm ? 'cm__val cm__val--crown' : 'cm__val'
                              }
                            >
                              {v}
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ---------------- CLOSING QUOTE ---------------- */}
        <motion.div
          className="cm__closing"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
        >
          <p className="cm__quote">
            {'"You sent one firefighter to a five-alarm fire. Here\u2019s the full crew."'}
          </p>
          <button
            type="button"
            className="cm__link"
            onClick={() =>
              document.getElementById('social-proof')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            {'\u2193'} See what people experienced
          </button>
        </motion.div>
      </div>

      <style jsx global>{`
        .cm {
          background: var(--color-bg-primary, #FAFAF9);
          padding: clamp(48px, 6.5vw, 84px) max(46px, 5.5vw);
          position: relative;
          overflow: hidden;
        }
        .cm__inner {
          position: relative;
          z-index: 1;
        }

        /* ---------- header ---------- */
        .cm__header {
          margin-bottom: 36px;
          max-width: 600px;
        }
        .cm__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-secondary, #6B6B6B);
          margin: 0 0 20px;
        }
        .cm__title {
          font-family: var(--font-display);
          font-size: var(--text-display-lg);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          margin: 0;
        }
        .cm__title-line {
          display: block;
          font-weight: 700;
          color: var(--color-text-primary, #0F0F0F);
        }
        .cm__title-line--sub {
          display: block;
          font-weight: 500;
          font-size: clamp(16px, 1.8vw, 20px);
          color: var(--color-text-secondary, #6B6B6B);
          margin-top: 6px;
        }

        /* ---------- 3D raised card ---------- */
        .cm__card {
          position: relative;
          background: #FAFAF9;
          border: 1px solid rgba(15, 15, 15, 0.08);
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .cm__card::after {
          content: '';
          position: absolute;
          left: 6%;
          right: 6%;
          bottom: -14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(26, 26, 26, 0.12) 0%, transparent 70%);
          z-index: -1;
        }
        .cm__card-sheen {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.45), transparent);
          pointer-events: none;
        }
        .cm__scroll {
          position: relative;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .cm__table {
          width: 100%;
          min-width: 720px;
          border-collapse: collapse;
        }

        /* ---------- product column headers ---------- */
        .cm__th {
          padding: 4px 8px 14px;
          border-bottom: 1.5px solid rgba(26, 26, 26, 0.15);
          text-align: center;
          vertical-align: bottom;
          font-weight: 400;
        }
        .cm__th--mech {
          text-align: left;
          padding-left: 0;
          width: 27%;
        }
        .cm__prod {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .cm__prod-img {
          position: relative;
          width: 100%;
          max-width: 116px;
          aspect-ratio: 4 / 3;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(26, 26, 26, 0.08);
          background: #EBE4DB;
        }
        .cm__prod--crown .cm__prod-img {
          border: 1.5px solid rgba(210, 182, 247, 0.7);
          background: #D2B6F718;
        }
        .cm__img-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cm__img-fallback span {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #8F8981;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
          padding: 0 8px;
        }
        .cm__prod-name {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          color: #6B655D;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
          line-height: 1.3;
        }
        .cm__prod-name--crown {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: var(--weight-display);
          font-style: normal;
          color: #1a1a1a;
          letter-spacing: var(--tracking-heading);
          text-transform: none;
        }
        .cm__prod-sub {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: #8F8981;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0;
        }

        /* ---------- group label rows ---------- */
        .cm__group-cell {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7D766E;
          text-align: left;
          padding: 18px 0 8px;
          border-bottom: 1px solid rgba(26, 26, 26, 0.12);
        }

        /* ---------- body rows ---------- */
        .cm__mech-cell {
          padding: 13px 0;
          border-bottom: 1px solid rgba(26, 26, 26, 0.07);
          text-align: left;
          font-weight: 400;
        }
        .cm__mech-label {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cm__mech-bar {
          width: 4px;
          height: 20px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .cm__mech-bar--neutral {
          background: rgba(26, 26, 26, 0.18);
        }
        .cm__mech-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #444444;
        }
        .cm__cell {
          padding: 13px 8px;
          border-bottom: 1px solid rgba(26, 26, 26, 0.07);
          text-align: center;
        }
        .cm__cell--crown {
          border-left: 1px solid rgba(26, 26, 26, 0.12);
          border-right: 1px solid rgba(26, 26, 26, 0.12);
          background: linear-gradient(to bottom, rgba(210, 182, 247, 0.10), rgba(210, 182, 247, 0.05));
          box-shadow:
            inset 1px 0 0 rgba(255, 255, 255, 0.6),
            inset -1px 0 0 rgba(255, 255, 255, 0.6);
        }
        .cm__sym {
          font-family: var(--font-mono);
          line-height: 1;
        }
        .cm__sym--full {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .cm__sym--partial {
          font-size: 13px;
          font-weight: 400;
          color: #7D766E;
        }
        .cm__sym--none {
          font-size: 13px;
          font-weight: 400;
          color: #B5AFA6;
        }
        .cm__val {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 400;
          color: #7D766E;
          letter-spacing: 0.02em;
        }
        .cm__val--crown {
          font-weight: 700;
          font-size: 13px;
          color: #1a1a1a;
        }

        /* ---------- summary row ---------- */
        .cm__summary-row {
          background: rgba(26, 26, 26, 0.03);
        }
        .cm__summary-label-cell {
          padding: 14px 0;
          border-top: 1.5px solid rgba(26, 26, 26, 0.15);
          border-bottom: none;
        }
        .cm__summary-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a1a1a;
          padding-left: 14px;
        }
        .cm__summary-cell {
          padding: 14px 8px;
          border-top: 1.5px solid rgba(26, 26, 26, 0.15);
          border-bottom: none;
        }
        .cm__score {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          color: #8F8981;
          letter-spacing: -0.02em;
        }
        .cm__score--crown {
          font-size: 16px;
          color: #1a1a1a;
        }
        .cm__coverage {
          display: flex;
          gap: 3px;
          justify-content: center;
          margin-top: 8px;
        }
        .cm__coverage-seg {
          display: block;
          width: 14px;
          height: 4px;
          border-radius: 2px;
        }

        /* ---------- closing ---------- */
        .cm__closing {
          margin-top: 44px;
          padding-top: 32px;
          border-top: 1px solid rgba(26, 26, 26, 0.1);
          text-align: center;
        }
        .cm__quote {
          font-family: var(--font-display);
          font-size: var(--text-display-sm);
          font-style: normal;
          font-weight: var(--weight-display);
          color: #1a1a1a;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-heading);
          margin: 0 0 20px;
          text-wrap: balance;
        }
        .cm__link {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          background: none;
          border: none;
          border-bottom: 1.5px solid rgba(26, 26, 26, 0.25);
          padding: 0 0 2px;
          cursor: pointer;
          transition: border-color 150ms ease;
        }
        .cm__link:hover,
        .cm__link:focus-visible {
          border-bottom-color: #1a1a1a;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ---------- mobile ---------- */
        @media (max-width: 767px) {
          .cm {
            padding-left: 20px;
            padding-right: 20px;
          }
          .cm__card {
            padding: 12px 14px;
            border-radius: 10px;
          }
          .cm__prod-img {
            max-width: 72px;
          }
          .cm__prod-name {
            font-size: 9.5px;
          }
          .cm__prod-name--crown {
            font-size: 12.5px;
          }
          .cm__prod-sub {
            display: none;
          }
          .cm__mech-cell {
            position: sticky;
            left: 0;
            background: #FAF5EE;
            z-index: 10;
            padding-right: 10px;
          }
          .cm__summary-label-cell {
            background: #F5EFE7;
          }
          .cm__quote {
            font-size: clamp(16px, 4vw, 22px);
            padding: 0 8px;
          }
        }
      `}</style>
    </section>
  )
}
