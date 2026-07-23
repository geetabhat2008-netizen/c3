'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import DissolveBlock from './DissolveBlock'

const PILLARS = [
  {
    id: 'neuro-massager',
    number: '01',
    phase: 1,
    color: '#D2B6F7',
    textColor: '#6B3FA0',
    mechanism: 'GATE CONTROL ACTIVATION',
    product: '360° Neuro-Massager',
    mechTitle: 'Gate Control Theory.',
    differentiator:
      '"Every other head massager vibrates. Vibration is disorganized. Disorganized input doesn\'t close the pain gate. This one breathes. Rhythmic. Organized. Gate-closing."',
    points: [
      '**Gate control** — rhythmic, organized compression activates **T5 neurons**, closing the pain gate before signals reach the brain. Random vibration reads as **noise**: no gate response.',
      '**Therapeutic window** — pneumatic air-cells hold **20–40 kPa**. Above 40, the body triggers **muscular guarding**. Below 20, the gate stays open.',
      '**15-min auto-shutoff** — the nervous system **habituates** after 15 minutes. Stopping preserves the mechanism, not a safety feature.',
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
    textColor: '#7A2090',
    mechanism: 'SPECTRAL FILTRATION',
    product: 'FL-41 Optic Shield',
    mechTitle: 'The ipRGC pathway.',
    differentiator:
      '"The lights you\'re reading this under right now flicker 100–120 times per second. You can\'t see it. Your nervous system registers every cycle."',
    points: [
      '**The ipRGC pathway** — retinal cells wired to the brain\'s **pain centers**, not vision. Fired maximally by the **480–520nm** blue-green band.',
      '**Precision filtration** — FL-41 blocks up to **80%** of that exact band. Not a generic blue-light lens: a targeted **spectral filter**.',
      '**The rose tint** — vision recalibrates within **10–15 min** and the pink recedes. Filtration stays fully active. The tint is proof it\'s working.',
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
    textColor: '#7A4010',
    mechanism: 'THERMODYNAMIC VASOCONSTRICTION',
    product: 'Cryo-Compression Core',
    mechTitle: 'Cold that has a reason.',
    differentiator:
      '"Ice during the attack. Warmth after the storm. Most people do this backwards — and wonder why the cold stops working after 20 minutes."',
    points: [
      '**Vasoconstriction** — cold at **2–8°C** constricts the dilated **meningeal vessels** pressing on sensitized nerve tissue: pressure reduced at the throbbing\'s source.',
      '**The 20-minute rule** — beyond 20 min, the body triggers **paradoxical vasodilation** and undoes the effect. Sessions are capped and cycled.',
      '**S-Class Hydrogel** — holds therapeutic temperature **30 min** per freeze cycle. Seam-welded barrier keeps condensation off skin.',
    ],
    table: [
      ['Temperature', '2–8°C therapeutic'],
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
    textColor: '#7A6010',
    mechanism: 'AUDITORY MASKING',
    product: 'Acoustic Silence Sleep Buds',
    mechTitle: 'Brown Noise, not White.',
    differentiator:
      '"White Noise is full-spectrum noise. For a sensitized auditory system, it\'s a new stressor disguised as a solution. Brown Noise masks. It doesn\'t add."',
    points: [
      '**Passive first** — **30 dB** of mechanical attenuation turns an 80 dB cabin into a **50 dB** quiet office, before any audio plays.',
      '**Brown, not White** — low-frequency rumble **masks** environmental load. White Noise adds high-frequency energy a sensitized system reads as a **new irritant**.',
      '**Sub-1.3cm shell** — sits below the pillow-pressure threshold. Standard 2–3cm buds create a new **tactile trigger** for allodynia; this eliminates it.',
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
    textColor: '#2B4F8A',
    mechanism: 'TRIGEMINOCERVICAL DECOMPRESSION',
    product: 'Cervical Axis Module',
    mechTitle: 'The neck is a migraine generator.',
    differentiator:
      '"Your migraine doesn\'t start at your temples. For a lot of people, it starts three inches lower — in a nerve bundle at the base of the skull that every cranial-only device on the market ignores completely."',
    points: [
      '**Shared relay** — **C0–C2** nerve fibers converge with the trigeminal pathway at the **trigeminocervical complex**. Neck tension lowers the threshold for the entire pain cascade.',
      '**Occipital decompression** — tight suboccipitals compress the **occipital nerves**, generating continuous low-grade pain signal that fills the neurological bucket.',
      '**A second gate** — the Neuro-Massager closes the **cranial** gate; this closes the **cervical** one. Two gates, two locations. The only Pillar built for desk, drive, and wind-down.',
    ],
    table: [
      ['Target', 'C0–C2 vertebrae'],
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
        <p className="fp__mech-title">{pillar.mechTitle}</p>

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
                <td style={{ color: pillar.textColor }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="fp__quote" style={{ borderLeft: `3px solid ${pillar.color}` }}>
          <p>{pillar.differentiator}</p>
        </div>
      </div>

      {/* RIGHT — 3-image bento */}
      <motion.div
        className="fp__bento"
        initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.2, ease: [0, 0, 0.2, 1] }}
      >
        <div className="fp__bento-hero" style={{ background: `${pillar.color}18` }}>
          <ProductImage
            src={pillar.images.hero.src}
            alt={pillar.images.hero.alt}
            width={600}
            height={760}
            phaseColor={pillar.color}
            sizes="(max-width: 767px) 100vw, 25vw"
          />
        </div>
        <div className="fp__bento-cell" style={{ background: `${pillar.color}14` }}>
          <ProductImage
            src={pillar.images.detail.src}
            alt={pillar.images.detail.alt}
            width={400}
            height={300}
            phaseColor={pillar.color}
            sizes="(max-width: 767px) 100vw, 12vw"
          />
        </div>
        <div className="fp__bento-cell" style={{ background: `${pillar.color}10` }}>
          <ProductImage
            src={pillar.images.use.src}
            alt={pillar.images.use.alt}
            width={400}
            height={300}
            phaseColor={pillar.color}
            sizes="(max-width: 767px) 100vw, 12vw"
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
        <div className="fp__dissolve">
          <DissolveBlock color={pillar.color} label={pillar.number} height={40} solid={0.42} pixel={5} />
        </div>

        <div className="fp__names">
          <p
            className="fp__mechanism"
            style={{ color: isActive ? pillar.textColor : '#BEBAB4' }}
          >
            {pillar.mechanism}
          </p>
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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
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
                    height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.3, ease: 'easeOut', delay: 0.12 },
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
    <section id="five-pillars" className="fp has-grid-rules" aria-label="The five pillars — why it works">
      <div className="fp__inner">
        {/* HEADER */}
        <div className="fp__head">
          <p className="fp__eyebrow">The Engineering</p>
          <h2 className="fp__h2">
            <span>Here&apos;s why it</span>
            <span className="fp__h2-italic">actually works.</span>
          </h2>
          <p className="fp__sub">
            Five documented neurological mechanisms. Each product exists because of a specific,
            documented science — not the other way around. Every number has a reason.
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
          background: var(--color-bg);
          padding: clamp(48px, 6.5vw, 84px) max(46px, 5.5vw);
        }
        .fp__inner {
          position: relative;
          z-index: 1;
          max-width: var(--container-max);
          margin: 0 auto;
        }

        /* Header */
        .fp__head {
          margin-bottom: 44px;
          max-width: 600px;
        }
        .fp__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8F8981;
          margin-bottom: 20px;
        }
        .fp__h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
        }
        .fp__h2 span {
          display: block;
          color: var(--color-text-primary);
        }
        .fp__h2 .fp__h2-italic,
        .fp__h2-italic {
          font-style: italic;
          color: #C4503A;
        }
        .fp__sub {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.65;
          letter-spacing: 0;
          color: #666666;
          max-width: 460px;
          margin: 0;
        }

        /* Accordion */
        .fp__accordion {
          border-top: 1px solid rgba(26,26,26,0.15);
        }
        .fp__row {
          border-bottom: 1px solid rgba(26,26,26,0.12);
        }

        /* Row header */
        .fp__header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          border-radius: 4px;
          transition: background 150ms ease;
          min-height: var(--touch-min);
        }
        .fp__header:hover:not(.fp__header--active) {
          background: rgba(26,26,26,0.02);
        }
        .fp__header:hover:not(.fp__header--active) .fp__thumb {
          opacity: 1 !important;
        }
        .fp__header--active {
          cursor: default;
        }
        .fp__header:focus-visible {
          outline: 2px solid #1A1A1A;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .fp__dissolve {
          width: 64px;
          flex-shrink: 0;
        }
        .fp__names {
          flex: 1;
          min-width: 0;
        }
        .fp__mechanism {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 5px;
          transition: color 200ms ease;
        }
        .fp__product {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 400;
          color: var(--color-text-primary);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .fp__thumb {
          width: 64px;
          height: 48px;
          border-radius: 4px;
          overflow: hidden;
          flex-shrink: 0;
          transition: opacity 200ms ease;
        }
        .fp__chevron {
          flex-shrink: 0;
          color: #BEBAB4;
          display: flex;
        }

        /* Expanded content */
        .fp__expanded {
          padding-top: 32px;
          padding-bottom: 52px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .fp__mech-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-style: italic;
          font-weight: 400;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .fp__points {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 480px;
        }
        .fp__point {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .fp__point-marker {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          margin-top: 7px;
        }
        .fp__point-text {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.65;
          letter-spacing: 0;
          color: #666666;
        }
        .fp__point-text strong {
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .fp__table {
          width: 100%;
          max-width: 420px;
          border-collapse: collapse;
          margin-bottom: 28px;
        }
        .fp__table tr {
          border-bottom: 1px solid rgba(26,26,26,0.1);
        }
        .fp__table tr:first-child {
          border-top: 1px solid rgba(26,26,26,0.1);
        }
        .fp__table th,
        .fp__table td {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
          padding: 8px 4px;
          text-align: left;
        }
        .fp__table th {
          font-weight: 400;
          color: #7D766E;
          text-transform: uppercase;
          font-size: 10.5px;
          letter-spacing: 0.1em;
          width: 40%;
        }
        .fp__table td {
          font-weight: 700;
        }
        .fp__quote {
          padding-left: 16px;
        }
        .fp__quote p {
          font-family: var(--font-display);
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          color: #444444;
          margin: 0;
        }

        /* Bento */
        .fp__bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 8px;
          height: 380px;
        }
        .fp__bento-hero {
          grid-row: span 2;
          border-radius: 6px;
          overflow: hidden;
        }
        .fp__bento-cell {
          border-radius: 6px;
          overflow: hidden;
        }
        .fp .fp__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
            gap: 32px;
          }
          .fp__bento {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            height: auto;
          }
          .fp__bento-hero {
            grid-row: auto;
          }
          .fp__bento-hero,
          .fp__bento-cell {
            aspect-ratio: 4/3;
          }
          .fp__product {
            font-size: 16px;
          }
          .fp__points,
          .fp__table {
            max-width: 100%;
          }
          .fp__dissolve {
            width: 48px;
          }
          .fp__header {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
