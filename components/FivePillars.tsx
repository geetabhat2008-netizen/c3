'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PILLARS = [
  {
    id: 'neuro-massager',
    number: '01',
    phase: 1,
    color: '#D2B6F7',
    mechanism: 'GATE CONTROL ACTIVATION',
    product: '360° Neuro-Massager',
    differentiator:
      'Every other head massager vibrates. Vibration is disorganized. Disorganized input doesn\'t close the pain gate. This one breathes. Rhythmic. Organized. Gate-closing.',
    points: [
      '**Gate control** — Rhythmic compression activates **T5 neurons**, closing the pain gate before signals reach the brain. Random vibration doesn\'t trigger this response.',
      '**Therapeutic window** — Pneumatic air-cells maintain **20–40 kPa**. Above 40 triggers muscular guarding; below 20 fails to close the gate.',
      '**15-min auto-shutoff** — The nervous system habituates after **15 minutes**. Halting the cycle preserves neurological response.',
    ],
    table: [
      ['Pressure', '20–40 kPa'],
      ['Noise', '<45 dB'],
      ['Warmth', '38–42°C'],
      ['Session', '15 min auto-shutoff'],
    ],
    images: {
      hero: { src: '/images/products/massager-hero.png', alt: 'The 360° Neuro-Massager product shot' },
      detail: { src: '/images/products/massager-detail.png', alt: 'Close-up of the pneumatic compression nodes' },
      use: { src: '/images/products/massager-use.png', alt: 'The massager worn during a session' },
    },
  },
  {
    id: 'optic-shield',
    number: '02',
    phase: 2,
    color: '#E596FF',
    mechanism: 'SPECTRAL FILTRATION',
    product: 'FL-41 Optic Shield',
    differentiator:
      'The lights you\'re reading this under right now flicker 100–120 times per second. You can\'t see it. Your nervous system registers every cycle.',
    points: [
      '**ipRGC pathway** — Retinal cells wired directly to pain centers fire maximally from the **480–520nm** blue-green band.',
      '**Precision filtration** — Optical-grade FL-41 lenses block up to **80%** of that specific trigger band.',
      '**Rose tint** — Vision recalibrates within **10–15 minutes** while filtration stays fully active.',
    ],
    table: [
      ['Target band', '480–520nm'],
      ['Blocked', 'up to 80%'],
      ['Lens', 'CR-39 optical-grade'],
      ['Standard', 'ANSI Z80.1-2025'],
    ],
    images: {
      hero: { src: '/images/products/glasses-hero.png', alt: 'FL-41 Optic Shield glasses product shot' },
      detail: { src: '/images/products/glasses-detail.png', alt: 'Close-up of the FL-41 precision tinted lens' },
      use: { src: '/images/products/glasses-use.png', alt: 'The glasses being worn at a desk workstation' },
    },
  },
  {
    id: 'cryo-wrap',
    number: '03',
    phase: 3,
    color: '#F5B061',
    mechanism: 'THERMODYNAMIC VASOCONSTRICTION',
    product: 'Cryo-Compression Core',
    differentiator:
      'Ice during the attack. Warmth after the storm. Most people do this backwards — and wonder why the cold stops working after 20 minutes.',
    points: [
      '**Vasoconstriction** — Controlled cold at **0–4°C** constricts dilated meningeal vessels, reducing throbbing pressure at the source.',
      '**20-minute limit** — Sessions cap at **20 minutes** to prevent paradoxical vasodilation from reversing relief.',
      '**S-Class Hydrogel** — Maintains therapeutic temperature for **30 minutes** per freeze cycle with condensation-proof sealing.',
    ],
    table: [
      ['Temperature', '0–4°C therapeutic'],
      ['Max continuous', '20 min'],
      ['Cold retention', '30 min per cycle'],
      ['Shell', 'medical-grade neoprene'],
    ],
    images: {
      hero: { src: '/images/products/cryo-hero.png', alt: 'The Cryo-Compression Core product shot' },
      detail: { src: '/images/products/cryo-detail.png', alt: 'Close-up of the S-Class hydrogel interior material' },
      use: { src: '/images/products/cryo-use.png', alt: 'The cryo wrap applied at occipital and temporal sites' },
    },
  },
  {
    id: 'sleep-buds',
    number: '04',
    phase: 4,
    color: '#F5D76E',
    mechanism: 'AUDITORY MASKING',
    product: 'Acoustic Silence Sleep Buds',
    differentiator:
      'White Noise is full-spectrum noise. For a sensitized auditory system, it\'s a new stressor disguised as a solution. Brown Noise masks. It doesn\'t add.',
    points: [
      '**Passive isolation** — Mechanical attenuation delivers **30 dB** of quiet before any sound plays.',
      '**Brown noise masking** — Low-frequency brown noise masks sudden acoustic spikes without introducing high-frequency irritation.',
      '**Sub-1.3cm shell** — Low-profile enclosure sits below the pillow line, preventing pressure points and allodynia triggers.',
    ],
    table: [
      ['Attenuation', '30 dB passive'],
      ['Driver', '6mm micro-dynamic'],
      ['Profile', '<1.3cm shell'],
      ['Battery', '10hr · 48hr case'],
    ],
    images: {
      hero: { src: '/images/products/buds-hero.png', alt: 'Acoustic Silence Sleep Buds product shot' },
      detail: { src: '/images/products/buds-detail.png', alt: 'Close-up of the 6mm driver and sub-1.3cm shell' },
      use: { src: '/images/products/buds-use.png', alt: 'The sleep buds worn while lying down to rest' },
    },
  },
  {
    id: 'cervical-axis',
    number: '05',
    phase: 5,
    color: '#8BB8FF',
    mechanism: 'TRIGEMINOCERVICAL DECOMPRESSION',
    product: 'Cervical Axis Module',
    differentiator:
      'Your migraine doesn\'t start at your temples. For a lot of people, it starts three inches lower — in a nerve bundle at the base of the skull that every cranial-only device on the market ignores completely.',
    points: [
      '**Shared relay** — **C1–C2** nerve fibers converge with the trigeminal pathway at the trigeminocervical complex, where neck tension triggers migraine cascades.',
      '**Occipital decompression** — Ergonomic curvature decompresses suboccipital nerves, relieving persistent muscular loading.',
      '**Dual-gate relief** — While cranial massage closes the upper gate, cervical decompression arrests lower spinal inputs.',
    ],
    table: [
      ['Target', 'C1–C2 vertebrae'],
      ['Wear', '60 min continuous'],
      ['Action', 'occipital decompression'],
      ['Context', 'desk · drive · wind-down'],
    ],
    images: {
      hero: { src: '/images/products/cervical-hero.png', alt: 'The Cervical Axis Module product shot' },
      detail: { src: '/images/products/cervical-detail.png', alt: 'Close-up of the cervical contact surface and curvature' },
      use: { src: '/images/products/cervical-use.png', alt: 'The module worn while seated at a desk during work' },
    },
  },
]

type Pillar = (typeof PILLARS)[0]

function ProductImage({
  src,
  alt,
  width,
  height,
  phaseColor,
  sizes,
}: {
  src: string
  alt: string
  width: number
  height: number
  phaseColor: string
  sizes?: string
}) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className="fp__img-fallback"
        style={{
          background: `linear-gradient(145deg, ${phaseColor}20 0%, ${phaseColor}08 100%)`,
        }}
      >
        <span>{alt.split(' ').slice(0, 4).join(' ')}</span>
      </div>
    )
  }

  return (
    <Image
      src={src || '/placeholder.svg'}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className="fp__img"
      onError={() => setErrored(true)}
    />
  )
}

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  )
}

function ExpandedContent({ pillar, reduce }: { pillar: Pillar; reduce: boolean }) {
  return (
    <div className="fp__expanded">
      {/* LEFT — copy */}
      <div className="fp__copy">
        {/* Step 3: Redundant mechTitle ("Gate Control Theory.") removed entirely */}

        <ul className="fp__points">
          {pillar.points.map((point, i) => (
            <li key={i} className="fp__point">
              <span className="fp__point-marker" style={{ background: pillar.color }} aria-hidden="true" />
              <span className="fp__point-text">{renderBold(point)}</span>
            </li>
          ))}
        </ul>

        <table className="fp__table">
          <tbody>
            {pillar.table.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Step 5: Simplified pull-quote as a quiet aside without decorative colored border */}
        <div className="fp__aside">
          <p>&ldquo;{pillar.differentiator.replace(/^["']|["']$/g, '')}&rdquo;</p>
        </div>
      </div>

      {/* RIGHT — cohesive 2-image pair (Step 6) */}
      <motion.div
        className="fp__image-pair"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: reduce ? 0 : 0.15, ease: [0, 0, 0.2, 1] }}
      >
        <div className="fp__image-card">
          <ProductImage
            src={pillar.images.hero.src}
            alt={pillar.images.hero.alt}
            width={600}
            height={450}
            phaseColor={pillar.color}
            sizes="(max-width: 767px) 100vw, 25vw"
          />
        </div>
        <div className="fp__image-card">
          <ProductImage
            src={pillar.images.use.src}
            alt={pillar.images.use.alt}
            width={600}
            height={450}
            phaseColor={pillar.color}
            sizes="(max-width: 767px) 100vw, 25vw"
          />
        </div>
      </motion.div>
    </div>
  )
}

function PillarRow({
  pillar,
  index,
  isActive,
  reduce,
  onClick,
}: {
  pillar: Pillar
  index: number
  isActive: boolean
  reduce: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      className="fp__row"
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.07, ease: 'easeOut' }}
    >
      {/* ROW HEADER */}
      <button
        type="button"
        className={`fp__header${isActive ? ' fp__header--active' : ''}`}
        onClick={onClick}
        aria-expanded={isActive}
        aria-controls={`pillar-body-${pillar.id}`}
      >
        {/* Step 1: Monochrome badge with minimal phase indicator dot */}
        <div className="fp__badge">
          <span className="fp__badge-dot" style={{ background: pillar.color }} aria-hidden="true" />
          <span>{pillar.number}</span>
        </div>

        <div className="fp__names">
          <p className="fp__mechanism">{pillar.mechanism}</p>
          <p className="fp__product">{pillar.product}</p>
        </div>

        <div
          className="fp__thumb"
          style={{ opacity: isActive ? 1 : 0.55, background: `${pillar.color}22` }}
        >
          <ProductImage
            src={pillar.images.hero.src}
            alt={pillar.images.hero.alt}
            width={128}
            height={96}
            phaseColor={pillar.color}
            sizes="64px"
          />
        </div>

        <motion.div
          className="fp__chevron"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* EXPANDED CONTENT */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`pillar-body-${pillar.id}`}
            key={`body-${pillar.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduce
                ? { height: { duration: 0.01 }, opacity: { duration: 0.01 } }
                : {
                    height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.25, ease: 'easeOut', delay: 0.1 },
                  }
            }
            style={{ overflow: 'hidden' }}
          >
            <ExpandedContent pillar={pillar} reduce={reduce} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FivePillars() {
  const reduce = useReducedMotion() ?? false
  const [activeId, setActiveId] = useState<string>('neuro-massager')

  const handleClick = (id: string) => {
    if (id !== activeId) setActiveId(id)
  }

  return (
    <section id="five-pillars" className="fp" aria-label="The five pillars — why it works">
      <div className="fp__inner">
        {/* HEADER */}
        <div className="fp__head">
          <p className="fp__eyebrow">The Engineering</p>
          <h2 className="fp__h2">
            <span className="fp__h2-l1">Here&apos;s why it actually works.</span>
            <span className="fp__h2-l2">Five synchronized pillars, one daily protocol.</span>
          </h2>
          <p className="fp__sub">
            Five documented neurological mechanisms. Each product exists because of a specific
            science — not the other way around. Every parameter has a reason.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="fp__accordion">
          {PILLARS.map((pillar, index) => (
            <PillarRow
              key={pillar.id}
              pillar={pillar}
              index={index}
              isActive={activeId === pillar.id}
              reduce={reduce}
              onClick={() => handleClick(pillar.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .fp {
          position: relative;
          overflow: hidden;
          background: var(--color-bg-primary, #FAFAF9);
          padding: clamp(40px, 5vw, 64px) max(32px, 4.5vw);
        }
        .fp__inner {
          position: relative;
          z-index: 1;
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
        }

        /* Header — tightened vertical rhythm (Step 7) */
        .fp__head {
          margin-bottom: 28px;
          max-width: 600px;
        }
        .fp__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-secondary, #6B6B6B);
          margin-bottom: 8px;
        }
        .fp__h2 {
          font-family: var(--font-display);
          font-size: var(--text-display-lg);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 12px;
        }
        .fp__h2-l1 {
          display: block;
          font-weight: 700;
          color: var(--color-text-primary, #0F0F0F);
        }
        .fp__h2-l2 {
          display: block;
          font-weight: 500;
          font-size: clamp(16px, 1.8vw, 20px);
          color: var(--color-text-secondary, #6B6B6B);
          margin-top: 6px;
        }
        .fp__sub {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--color-text-secondary, #6B6B6B);
          max-width: 480px;
          margin: 0;
        }

        /* Accordion */
        .fp__accordion {
          border-top: 1px solid rgba(15, 15, 15, 0.08);
        }
        .fp__row {
          border-bottom: 1px solid rgba(15, 15, 15, 0.08);
        }

        /* Row header — Step 7 tightened spacing */
        .fp__header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 13px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          border-radius: 6px;
          transition: background 150ms ease;
        }
        .fp__header:hover:not(.fp__header--active) {
          background: rgba(15, 15, 15, 0.02);
        }
        .fp__header:hover:not(.fp__header--active) .fp__thumb {
          opacity: 0.9 !important;
        }
        .fp__header--active {
          cursor: default;
        }
        .fp__header:focus-visible {
          outline: 2px solid #0F0F0F;
          outline-offset: 3px;
        }

        /* Step 1: Plain solid badge with minimal phase indicator dot */
        .fp__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 28px;
          padding: 0 8px;
          border-radius: 6px;
          background: var(--color-bg-secondary, #F2F1ED);
          border: 1px solid rgba(15, 15, 15, 0.08);
          flex-shrink: 0;
        }
        .fp__badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fp__badge span {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-primary, #0F0F0F);
          line-height: 1;
        }

        .fp__names {
          flex: 1;
          min-width: 0;
        }
        .fp__mechanism {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7D766E;
          margin: 0 0 3px 0;
        }
        .fp__product {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          line-height: 1.25;
          color: var(--color-text-primary, #1A1A1A);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .fp__thumb {
          width: 58px;
          height: 44px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          transition: opacity 160ms ease;
          border: 1px solid rgba(26, 26, 26, 0.08);
        }
        .fp__chevron {
          flex-shrink: 0;
          color: #7D766E;
          display: flex;
        }

        /* Expanded content — Step 7 tightened vertical rhythm */
        .fp__expanded {
          padding-top: 18px;
          padding-bottom: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .fp__copy {
          min-width: 0;
        }

        /* Bullets — Step 4 condensed copy, Step 2 uniform charcoal color */
        .fp__points {
          list-style: none;
          margin: 0 0 18px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
          max-width: 520px;
        }
        .fp__point {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .fp__point-marker {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 7px;
        }
        .fp__point-text {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 400;
          line-height: 1.5;
          color: #4A4A4A;
        }
        .fp__point-text strong {
          font-weight: 600;
          color: #1A1A1A;
        }

        /* Spec table — Step 4 specs preserved 100%, Step 2 uniform charcoal color */
        .fp__table {
          width: 100%;
          max-width: 440px;
          border-collapse: collapse;
          margin-bottom: 16px;
        }
        .fp__table tr {
          border-bottom: 1px solid rgba(26, 26, 26, 0.08);
        }
        .fp__table tr:first-child {
          border-top: 1px solid rgba(26, 26, 26, 0.08);
        }
        .fp__table th,
        .fp__table td {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 6px 4px;
          text-align: left;
        }
        .fp__table th {
          font-weight: 500;
          color: #7D766E;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          width: 38%;
        }
        .fp__table td {
          font-weight: 600;
          color: #1A1A1A;
        }

        /* Step 5: Simplified pull-quote as a quiet aside (no colored border, muted text) */
        .fp__aside {
          padding: 0;
          margin-top: 14px;
        }
        .fp__aside p {
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.5;
          color: #666666;
          margin: 0;
          font-style: normal;
        }

        /* Step 6: Cohesive 2-image pair with matching crop and aspect ratio */
        .fp__image-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-self: start;
        }
        .fp__image-card {
          aspect-ratio: 4 / 3;
          border-radius: 10px;
          overflow: hidden;
          background: #FAF5EE;
          border: 1px solid rgba(26, 26, 26, 0.08);
        }
        .fp .fp__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fp__img-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fp__img-fallback span {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #8F8981;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          padding: 0 12px;
        }

        /* Mobile */
        @media (max-width: 767px) {
          .fp__expanded {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .fp__image-pair {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .fp__product {
            font-size: 16px;
          }
          .fp__points,
          .fp__table {
            max-width: 100%;
          }
          .fp__header {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
