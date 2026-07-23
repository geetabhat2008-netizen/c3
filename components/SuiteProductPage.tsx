'use client'

import { useState } from 'react'
import Image from 'next/image'
import TrustBar from './TrustBar'

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const GALLERY = [
  { src: '/images/products/suite-hero.png', alt: 'The complete Sanctuary Suite — all five instruments arranged together' },
  { src: '/images/products/massager-hero.png', alt: 'The 360° Neuro-Massager' },
  { src: '/images/products/glasses-hero.png', alt: 'The FL-41 Optic Shield' },
  { src: '/images/products/cryo-hero.png', alt: 'The Cryo-Compression Core' },
  { src: '/images/products/buds-hero.png', alt: 'The Acoustic Silence Sleep Buds' },
  { src: '/images/products/cervical-hero.png', alt: 'The Cervical Axis Module' },
  { src: '/images/products/massager-use.png', alt: 'The Neuro-Massager worn during a session' },
  { src: '/images/products/glasses-use.png', alt: 'The Optic Shield worn at a desk workstation' },
]

const SUITE_ITEMS = [
  { name: '360° Neuro-Massager', mechanism: 'Gate Control Activation', value: 145, dot: '#D2B6F7', galleryIndex: 1 },
  { name: 'FL-41 Optic Shield', mechanism: 'Spectral Filtration', value: 120, dot: '#E596FF', galleryIndex: 2 },
  { name: 'Cryo-Compression Core', mechanism: 'Thermodynamic Vasoconstriction', value: 69, dot: '#F5B061', galleryIndex: 3 },
  { name: 'Acoustic Silence Sleep Buds', mechanism: 'Auditory Masking', value: 45, dot: '#FCD667', galleryIndex: 4 },
  { name: 'Cervical Axis Module', mechanism: 'Trigeminocervical Decompression', value: 120, dot: '#6FA4FF', galleryIndex: 5 },
]

const EBOOK = { name: 'The Sanctuary Protocol Ebook', value: 49 }
const TOTAL_VALUE = SUITE_ITEMS.reduce((s, i) => s + i.value, 0) + EBOOK.value // 548
const PRICE = 345

const BENEFITS = [
  'Attacks the migraine cascade from five documented angles — simultaneously',
  'Closes both pain gates: cranial (Neuro-Massager) and cervical (Axis Module)',
  'Filters the exact 480–520nm band that fires the ipRGC pain pathway',
  'Respects the 20-minute vasoconstriction window — cold that keeps working',
  'Brown Noise masking — quiets the auditory load without adding a new stressor',
]

const SPECS: [string, string][] = [
  ['Neuro-Massager pressure', '20–40 kPa therapeutic window'],
  ['Neuro-Massager session', '15 min auto-shutoff · <45 dB'],
  ['Optic Shield target band', '480–520nm · up to 80% blocked'],
  ['Optic Shield lens', 'CR-39 optical-grade · ANSI Z80.1-2025'],
  ['Cryo-Core temperature', '2–8°C · 20 min max continuous'],
  ['Cryo-Core retention', '30 min per freeze cycle'],
  ['Sleep Buds attenuation', '30 dB passive · <1.3cm shell'],
  ['Sleep Buds battery', '10hr · 48hr with case'],
  ['Cervical Axis target', 'C0–C2 vertebrae · 60 min wear'],
  ['Protocol Ebook', '100 pages · delivered instantly'],
]

const PROTOCOL_STEPS = [
  'At the first warning sign, apply the Cryo-Compression Core — never longer than 20 minutes.',
  'Run a 15-minute Neuro-Massager session while wearing the Optic Shield in bright environments.',
  'Wind down with the Cervical Axis Module at your desk, then the Sleep Buds through the night.',
]

/* ------------------------------------------------------------------ */
/* SMALL PIECES                                                        */
/* ------------------------------------------------------------------ */

function Stars() {
  return (
    <span className="sp__stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < 4 ? '#1A1A1A' : 'none'} stroke="#1A1A1A" strokeWidth="1.4">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

function Accordion({
  title,
  isOpen,
  onToggle,
  id,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="sp__acc">
      <button type="button" className="sp__acc-head" onClick={onToggle} aria-expanded={isOpen} aria-controls={`acc-${id}`}>
        <span>{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 300ms ease' }}
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={`acc-${id}`} className="sp__acc-body" hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function SuiteProductPage() {
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [openAcc, setOpenAcc] = useState<string | null>('protocol')

  const toggleAcc = (id: string) => setOpenAcc((cur) => (cur === id ? null : id))
  const prev = () => setActiveImg((i) => (i - 1 + GALLERY.length) % GALLERY.length)
  const next = () => setActiveImg((i) => (i + 1) % GALLERY.length)

  return (
    <>
      <section className="sp" aria-label="The Sanctuary Suite product details">
      <div className="sp__grid">
        {/* ── LEFT: GALLERY ─────────────────────────────── */}
        <div className="sp__gallery">
          <div className="sp__stage">
            <Image
              key={GALLERY[activeImg].src}
              src={GALLERY[activeImg].src || '/placeholder.svg'}
              alt={GALLERY[activeImg].alt}
              width={880}
              height={880}
              sizes="(max-width: 979px) 100vw, 55vw"
              priority
              className="sp__stage-img"
            />
            <button type="button" className="sp__arrow sp__arrow--l" onClick={prev} aria-label="Previous image">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="sp__arrow sp__arrow--r" onClick={next} aria-label="Next image">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="sp__thumbs" role="tablist" aria-label="Product images">
            {GALLERY.map((img, i) => (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={activeImg === i}
                aria-label={img.alt}
                className={`sp__thumb${activeImg === i ? ' sp__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <Image src={img.src || '/placeholder.svg'} alt="" width={112} height={112} sizes="56px" />
              </button>
            ))}
          </div>

          <figure className="sp__quote">
            <span className="sp__quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>
              For the first time in nine years, I watched the storm coming — and had somewhere to go.
            </blockquote>
            <figcaption>
              <span className="sp__quote-avatar">
                <Image src="/images/testimonials/sarah-m.png" alt="Sarah M." width={96} height={96} sizes="48px" />
              </span>
              <span className="sp__quote-meta">
                <span className="sp__quote-name">Sarah M.</span>
                <span className="sp__quote-role">Verified Customer · 9-Year Sufferer</span>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* ── RIGHT: BUY PANEL ──────────────────────────── */}
        <div className="sp__panel">
          <a href="#reviews" className="sp__rating">
            <Stars />
            <span className="sp__rating-count">4.8 · 2,143 Reviews</span>
          </a>

          <h1 className="sp__title">The Sanctuary Suite</h1>

          <p className="sp__price">
            <span className="sp__price-now">${PRICE}</span>
            <del className="sp__price-was" aria-label={`Full value ${TOTAL_VALUE} dollars`}>${TOTAL_VALUE}</del>
            <span className="sp__price-save">Save ${TOTAL_VALUE - PRICE}</span>
          </p>

          <p className="sp__desc">
            Five instruments. Five documented neurological mechanisms. One compound protocol. The Sanctuary
            Suite doesn&apos;t manage migraine symptoms — it addresses the conditions that create them,
            attacking the cascade from every angle at once.
          </p>

          <p className="sp__includes-line">
            Includes {EBOOK.name} <span className="sp__includes-value">(${EBOOK.value})</span> — delivered instantly.
          </p>

          <ul className="sp__benefits">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          {/* item selector — the bundle analog of a color swatch row */}
          <div className="sp__items">
            <p className="sp__items-label">
              Inside the Suite{' '}
              <span>
                {activeImg >= 1 && activeImg <= 5
                  ? SUITE_ITEMS[activeImg - 1].name
                  : 'Five instruments · one protocol'}
              </span>
            </p>
            <div className="sp__swatches">
              {SUITE_ITEMS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={`sp__swatch${activeImg === item.galleryIndex ? ' sp__swatch--active' : ''}`}
                  style={{ background: item.dot }}
                  onClick={() => setActiveImg(item.galleryIndex)}
                  aria-label={`View ${item.name}`}
                  title={item.name}
                />
              ))}
            </div>
          </div>

          {/* buy row */}
          <div className="sp__note-bar">One-time payment · No subscription · HSA/FSA eligible</div>
          <div className="sp__buy">
            <div className="sp__qty" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button type="button" className="sp__cta">
              <span className="sp__cta-label">Begin the Protocol</span>
              <span className="sp__cta-divider" aria-hidden="true" />
              <span className="sp__cta-price">${PRICE * qty}</span>
              <svg className="sp__cta-arrow" width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3.5 10H16.5M16.5 10L11 4.5M16.5 10L11 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="sp__pay" aria-label="Accepted payment methods">
            {[
              ['apple-pay', 'Apple Pay'],
              ['visa', 'Visa'],
              ['mastercard', 'Mastercard'],
              ['american-express', 'American Express'],
              ['discover', 'Discover'],
              ['paypal', 'PayPal'],
            ].map(([slug, name]) => (
              <span key={slug} className="sp__pay-chip">
                <img src={`/images/payments/${slug}.svg`} alt={name} loading="lazy" />
              </span>
            ))}
          </div>

          <div className="sp__trust">
            {[
              {
                t: '5 Mechanisms',
                s: 'One compound protocol',
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 12l10 5 10-5" />
                    <path d="M2 17l10 5 10-5" />
                  </svg>
                ),
              },
              {
                t: 'HSA / FSA',
                s: 'Pre-tax eligible',
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v6M9 11h6" />
                  </svg>
                ),
              },
              {
                t: 'Free Shipping',
                s: 'US orders',
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 8h13v9H1z" />
                    <path d="M14 11h4l3 3v3h-7v-6z" />
                    <circle cx="5.5" cy="18.5" r="1.8" />
                    <circle cx="17.5" cy="18.5" r="1.8" />
                  </svg>
                ),
              },
              {
                t: '30-Day Guarantee',
                s: 'Full refund policy',
                icon: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 1 0 3-6.7" />
                    <path d="M3 4v5h5" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
            ].map(({ t, s, icon }) => (
              <div key={t} className="sp__trust-cell">
                <span className="sp__trust-icon">{icon}</span>
                <p className="sp__trust-title">{t}</p>
                <p className="sp__trust-sub">{s}</p>
              </div>
            ))}
          </div>

          {/* accordions */}
          <div className="sp__accs">
            <Accordion title="How To Use" id="protocol" isOpen={openAcc === 'protocol'} onToggle={() => toggleAcc('protocol')}>
              <p className="sp__protocol-lead">
                Find sanctuary in <strong>3 phases</strong>:
              </p>
              <ol className="sp__steps">
                {PROTOCOL_STEPS.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <p className="sp__protocol-note">
                Session 1 won&apos;t fix your migraine. Session 7 might. The first 6 sessions are
                calibration, not failure — the full progression curve is in your Protocol Ebook.
              </p>
            </Accordion>

            <Accordion title="What's Included" id="included" isOpen={openAcc === 'included'} onToggle={() => toggleAcc('included')}>
              <dl className="sp__included">
                {SUITE_ITEMS.map((item) => (
                  <div key={item.name} className="sp__included-row">
                    <dt>
                      <span className="sp__included-dot" style={{ background: item.dot }} aria-hidden="true" />
                      <span className="sp__included-name">{item.name}</span>
                      <span className="sp__included-mech">{item.mechanism}</span>
                    </dt>
                    <dd>${item.value}</dd>
                  </div>
                ))}
                <div className="sp__included-row sp__included-row--bonus">
                  <dt>
                    <span className="sp__included-dot" style={{ background: '#1A1A1A' }} aria-hidden="true" />
                    <span className="sp__included-name">{EBOOK.name}</span>
                    <span className="sp__included-mech">Instant delivery</span>
                  </dt>
                  <dd>${EBOOK.value}</dd>
                </div>
                <div className="sp__included-total">
                  <span>Total value</span>
                  <span>
                    <del>${TOTAL_VALUE}</del> &nbsp;${PRICE}
                  </span>
                </div>
              </dl>
            </Accordion>

            <Accordion title="Specifications" id="specs" isOpen={openAcc === 'specs'} onToggle={() => toggleAcc('specs')}>
              <table className="sp__specs">
                <tbody>
                  {SPECS.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Accordion>
          </div>
        </div>
      </div>

      <style>{`
        .sp {
          background: var(--color-bg);
          padding: calc(var(--nav-height) + 48px) max(24px, 4vw) 24px;
        }
        .sp__grid {
          max-width: var(--container-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 44fr 56fr;
          gap: clamp(32px, 4.5vw, 64px);
          align-items: start;
        }

        /* ── GALLERY ─────────────────────────────────── */
        .sp__gallery {
          position: sticky;
          top: calc(var(--nav-height) + 24px);
          min-width: 0;
        }
        .sp__stage {
          position: relative;
          background: var(--color-surface);
          border: 1px solid rgba(255,255,255,0.65);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(26,26,26,0.04), 0 12px 40px -18px rgba(26,26,26,0.18);
        }
        .sp__stage-img {
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
        }
        .sp__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 50%;
          color: var(--color-text-primary);
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(26,26,26,0.08);
          transition: background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        }
        .sp__arrow:hover {
          background: rgba(255,255,255,0.85);
          box-shadow: 0 4px 16px rgba(26,26,26,0.12);
        }
        .sp__arrow--l { left: 14px; }
        .sp__arrow--r { right: 14px; }

        .sp__thumbs {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .sp__thumb {
          flex-shrink: 0;
          width: 60px; height: 60px;
          padding: 0;
          border: 1.5px solid var(--border-subtle);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: var(--color-surface);
          opacity: 0.72;
          transition: opacity 150ms ease, border-color 150ms ease;
        }
        .sp__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .sp__thumb:hover { opacity: 1; }
        .sp__thumb--active {
          opacity: 1;
          border-color: var(--color-text-primary);
        }

        .sp__quote {
          position: relative;
          margin: 20px 0 0;
          padding: 18px 20px 16px;
          background: var(--color-surface);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 12px;
          box-shadow: 0 8px 24px -16px rgba(26,26,26,0.18);
        }
        .sp__quote-mark {
          display: block;
          font-family: var(--font-display);
          font-size: 48px;
          line-height: 0.62;
          color: var(--color-text-primary);
          margin-bottom: 6px;
          opacity: 0.85;
          user-select: none;
        }
        .sp__quote blockquote {
          font-family: var(--font-display);
          font-size: clamp(16px, 1.8vw, 18px);
          font-weight: 500;
          font-style: normal;
          line-height: 1.38;
          letter-spacing: -0.015em;
          text-wrap: pretty;
          color: var(--color-text-primary);
          margin: 0 0 14px;
        }
        .sp__quote figcaption {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 12px;
          border-top: 1px solid rgba(26,26,26,0.08);
        }
        .sp__quote-avatar {
          flex-shrink: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--color-surface-raised);
          box-shadow: 0 0 0 1px rgba(26,26,26,0.08);
        }
        .sp__quote-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sp__quote-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .sp__quote-name {
          font-family: var(--font-mono);
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
        }
        .sp__quote-role {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8F8981;
        }

        /* ── PANEL ───────────────────────────────────── */
        .sp__panel { min-width: 0; }

        .sp__rating {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-bottom: 14px;
        }
        .sp__stars { display: inline-flex; gap: 2px; }
        .sp__rating-count {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #5C5C5C;
          border-bottom: 1px solid rgba(26,26,26,0.25);
          padding-bottom: 1px;
        }

        .sp__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.6vw, 46px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--color-text-primary);
          margin-bottom: 12px;
        }

        .sp__price {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 18px;
        }
        .sp__price-now {
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
        }
        .sp__price-was {
          font-family: var(--font-mono);
          font-size: 14px;
          color: #8F8981;
        }
        .sp__price-save {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C4503A;
          background: rgba(196,80,58,0.08);
          border: 1px solid rgba(196,80,58,0.25);
          border-radius: 999px;
          padding: 3px 10px;
        }

        .sp__desc {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.65;
          letter-spacing: 0;
          color: #5C5C5C;
          margin-bottom: 16px;
          max-width: 54ch;
        }
        .sp__includes-line {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-text-primary);
          margin-bottom: 16px;
        }
        .sp__includes-value { color: #C4503A; }

        .sp__benefits {
          list-style: none;
          margin: 0 0 24px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .sp__benefits li {
          position: relative;
          padding-left: 18px;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          letter-spacing: 0;
          color: #4A4A4A;
        }
        .sp__benefits li::before {
          content: '';
          position: absolute;
          left: 0; top: 8px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C4503A;
        }

        /* item swatches */
        .sp__items { margin-bottom: 24px; }
        .sp__items-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin-bottom: 10px;
        }
        .sp__items-label span {
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0.04em;
          color: #8F8981;
          margin-left: 8px;
        }
        .sp__swatches { display: flex; gap: 10px; }
        .sp__swatch {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          outline: 1px solid rgba(26,26,26,0.15);
          outline-offset: 2px;
          cursor: pointer;
          transition: outline-color 150ms ease, transform 150ms ease;
        }
        .sp__swatch:hover { transform: scale(1.08); }
        .sp__swatch--active { outline: 1.5px solid var(--color-text-primary); }

        /* buy */
        .sp__note-bar {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7D766E;
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.55);
          border-radius: 10px;
          padding: 9px 14px;
          margin-bottom: 12px;
        }
        .sp__buy {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }
        .sp__qty {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(26,26,26,0.14);
          border-radius: 12px;
          height: 54px;
        }
        .sp__qty button {
          width: 40px; height: 100%;
          background: none; border: none;
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--color-text-secondary);
          cursor: pointer;
        }
        .sp__qty button:hover { color: var(--color-text-primary); }
        .sp__qty span {
          min-width: 24px;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .sp__cta {
          position: relative;
          flex: 1;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          background: linear-gradient(180deg, #2A2A28 0%, #171716 100%);
          color: #F2ECE4;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 1px 2px rgba(26,26,26,0.2),
            0 12px 28px -12px rgba(26,26,26,0.45);
          transition: box-shadow 220ms ease, transform 220ms ease, background 220ms ease;
        }
        .sp__cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.14) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 600ms ease;
          pointer-events: none;
        }
        .sp__cta:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.14),
            0 2px 4px rgba(26,26,26,0.2),
            0 18px 36px -12px rgba(26,26,26,0.5);
        }
        .sp__cta:hover::after { transform: translateX(100%); }
        .sp__cta:active { transform: translateY(0); }
        .sp__cta-label { white-space: nowrap; }
        .sp__cta-divider {
          width: 1px;
          height: 16px;
          background: rgba(242,236,228,0.25);
        }
        .sp__cta-price {
          font-size: 13px;
          letter-spacing: 0.04em;
          color: #EDD9B8;
        }
        .sp__cta-arrow {
          transition: transform 220ms ease;
        }
        .sp__cta:hover .sp__cta-arrow { transform: translateX(4px); }

        .sp__pay {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .sp__pay-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 28px;
          padding: 0 9px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 7px;
          box-shadow: 0 1px 3px rgba(26,26,26,0.06);
        }
        .sp__pay-chip img {
          height: 14px;
          width: auto;
          display: block;
        }

        .sp__trust {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 28px;
        }
        .sp__trust-cell {
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 12px;
          background: rgba(255,255,255,0.42);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 6px 20px -14px rgba(26,26,26,0.16);
          padding: 14px 10px 12px;
          text-align: center;
          transition: background 180ms ease, box-shadow 180ms ease;
        }
        .sp__trust-cell:hover {
          background: rgba(255,255,255,0.6);
          box-shadow: 0 10px 26px -14px rgba(26,26,26,0.22);
        }
        .sp__trust-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          margin-bottom: 8px;
          border-radius: 50%;
          background: rgba(26,26,26,0.05);
          color: var(--color-text-primary);
        }
        .sp__trust-title {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin: 0 0 3px;
        }
        .sp__trust-sub {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          color: #8F8981;
          margin: 0;
        }

        /* accordions */
        .sp__accs { border-top: 1px solid rgba(26,26,26,0.15); }
        .sp__acc { border-bottom: 1px solid rgba(26,26,26,0.12); }
        .sp__acc-head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          text-align: left;
        }
        .sp__acc-head:hover { color: #C4503A; }
        .sp__acc-body { padding: 4px 0 26px; }

        .sp__protocol-lead {
          font-family: var(--font-body);
          font-size: 14px;
          letter-spacing: 0;
          color: #4A4A4A;
          margin-bottom: 10px;
        }
        .sp__steps {
          margin: 0 0 16px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sp__steps li {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
          letter-spacing: 0;
          color: #4A4A4A;
        }
        .sp__protocol-note {
          font-family: var(--font-display);
          font-size: 15px;
          font-style: italic;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          border-left: 3px solid #C4503A;
          padding-left: 14px;
          margin: 0;
        }

        .sp__included { margin: 0; }
        .sp__included-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(26,26,26,0.08);
        }
        .sp__included-row dt {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
          margin: 0;
        }
        .sp__included-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          align-self: center;
        }
        .sp__included-name {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.03em;
          color: var(--color-text-primary);
        }
        .sp__included-row--bonus .sp__included-name { font-weight: 700; }
        .sp__included-mech {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8F8981;
        }
        .sp__included-row dd {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #7D766E;
          margin: 0;
          flex-shrink: 0;
        }
        .sp__included-total {
          display: flex;
          justify-content: space-between;
          padding: 13px 0 0;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-text-primary);
        }
        .sp__included-total del { color: #8F8981; font-weight: 400; }

        .sp__specs {
          width: 100%;
          border-collapse: collapse;
        }
        .sp__specs th {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #8F8981;
          text-align: left;
          padding: 9px 12px 9px 0;
          border-bottom: 1px solid rgba(26,26,26,0.08);
          width: 46%;
        }
        .sp__specs td {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
          padding: 9px 0;
          border-bottom: 1px solid rgba(26,26,26,0.08);
        }

        /* ── RESPONSIVE ──────────────────────────────── */
        @media (max-width: 979px) {
          .sp__grid { grid-template-columns: 1fr; gap: 32px; }
          .sp__gallery { position: static; }
          .sp__trust { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .sp { padding-left: 18px; padding-right: 18px; }
          .sp__stage-img { aspect-ratio: 4 / 3; }
          .sp__buy { gap: 8px; }
          .sp__qty { height: 52px; border-radius: 12px; }
          .sp__qty button { width: 34px; font-size: 15px; }
          .sp__cta {
            height: 52px;
            gap: 8px;
            padding: 0 12px;
            font-size: 11px;
            letter-spacing: 0.06em;
          }
          .sp__cta-price { font-size: 12px; }
        }
        @media (max-width: 360px) {
          .sp__cta-label { letter-spacing: 0.02em; }
          .sp__cta { padding: 0 8px; }
        }
      `}</style>
    </section>
    <TrustBar />
    </>
  )
}
