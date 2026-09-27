'use client'

import { useState } from 'react'
import Image from 'next/image'
import TrustBar from './TrustBar'

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const GALLERY = [
  { src: '/images/products/suite-hero.png', alt: 'The complete Sanctuary Suite — all five instruments arranged together' },
  { src: '/images/products/protocol-manual-hero.svg', alt: 'The Sanctuary Protocol — 100-page nervous system operating manual' },
  { src: '/images/products/massager-hero.png', alt: 'The 360° Neuro-Massager' },
  { src: '/images/products/glasses-hero.png', alt: 'The FL-41 Optic Shield' },
  { src: '/images/products/cryo-hero.png', alt: 'The Cryo-Compression Core' },
  { src: '/images/products/buds-hero.png', alt: 'The Acoustic Silence Sleep Buds' },
  { src: '/images/products/cervical-hero.png', alt: 'The Cervical Axis Module' },
  { src: '/images/products/massager-use.png', alt: 'The Neuro-Massager worn during a session' },
  { src: '/images/products/glasses-use.png', alt: 'The Optic Shield worn at a desk workstation' },
]

const SUITE_ITEMS = [
  { name: '360° Neuro-Massager', mechanism: 'Gate Control Activation', value: 145, dot: '#D2B6F7', galleryIndex: 2 },
  { name: 'FL-41 Optic Shield', mechanism: 'Spectral Filtration', value: 120, dot: '#E596FF', galleryIndex: 3 },
  { name: 'Cryo-Compression Core', mechanism: 'Thermodynamic Vasoconstriction', value: 69, dot: '#F5B061', galleryIndex: 4 },
  { name: 'Acoustic Silence Sleep Buds', mechanism: 'Auditory Masking', value: 45, dot: '#FCD667', galleryIndex: 5 },
  { name: 'Cervical Axis Module', mechanism: 'Trigeminocervical Decompression', value: 120, dot: '#6FA4FF', galleryIndex: 6 },
]

const EBOOK = { name: 'The Sanctuary Protocol Manual', value: 97 }
const SUITE_PRICE = 345
const PROTOCOL_PRICE = 97
const TOTAL_VALUE = SUITE_ITEMS.reduce((s, i) => s + i.value, 0) + EBOOK.value // 596
const PRICE = SUITE_PRICE

const PROTOCOL_INCLUDED = [
  { name: 'The Sanctuary Protocol (Manual)', mechanism: '100-Page Clinical Operating Manual', value: 97, dot: '#121D2F' },
  { name: 'Acute Abortive Decision Tree', mechanism: 'Cascade Interruption Reference Card', value: 29, dot: '#4A7FC9' },
  { name: '30-Day Calibration Journal', mechanism: 'Neurological Baseline Tracking Log', value: 25, dot: '#D2B6F7' },
  { name: 'Lossless Auditory Masking Audio', mechanism: 'Brown Noise & Binaural Frequency Files', value: 19, dot: '#FCD667' },
  { name: 'Suite Upgrade Guarantee', mechanism: '100% Investment Credit toward Hardware', value: 97, dot: '#22C55E' },
]

const PROTOCOL_SPECS: [string, string][] = [
  ['Format', 'Interactive PDF, ePub & Mobile Reader'],
  ['Page Count', '100 clinical pages · Peer-reviewed medical citations'],
  ['Delivery', 'Instant secure link via email (<60 seconds)'],
  ['Audio Companion', '3 Lossless auditory masking tracks (FLAC/MP3)'],
  ['Updates & Journal', 'Lifetime access to protocol revisions & printable logs'],
  ['Hardware Credit', '100% of $97 applied toward Suite upgrade within 30 days'],
]

const PROTOCOL_MANUAL_STEPS = [
  'Phase 1 — Mechanism Education (Pages 1–32): Decode the 5 dorsal pain gates, photic trigger bands (480–520nm), and vascular dilation patterns.',
  'Phase 2 — Acute Abortive Protocols (Pages 33–68): Step-by-step physical, thermal, and optical interventions to execute within the first 20 minutes of aura or prodrome.',
  'Phase 3 — 30-Day Calibration Curve (Pages 69–100): Chart your daily neurological calibration log to systematically establish a durable, symptom-free baseline.',
]

const SCIENTIFIC_BENEFITS = [
  {
    lead: 'Gate Control Activation',
    desc: 'Cranial nerve massage closes dorsal pain gates in 15 minutes.',
    color: '#D2B6F7',
  },
  {
    lead: 'Spectral Filtration',
    desc: 'FL-41 precision lenses block 80% of the 480–520nm trigger band.',
    color: '#E596FF',
  },
  {
    lead: 'Thermal Vasoconstriction',
    desc: 'Targeted cooling compresses cranial vessels within 20 minutes.',
    color: '#F5B061',
  },
  {
    lead: 'Auditory Masking',
    desc: 'Low-frequency brown noise removes sensory load without fatigue.',
    color: '#FCD667',
  },
  {
    lead: 'Cervical Decompression',
    desc: 'Suboccipital support releases chronic C1–C2 muscular tension.',
    color: '#6FA4FF',
  },
]

const SPECS: [string, string][] = [
  ['Neuro-Massager pressure', '20–40 kPa therapeutic window'],
  ['Neuro-Massager session', '15 min auto-shutoff · <45 dB'],
  ['Optic Shield target band', '480–520nm · up to 80% blocked'],
  ['Optic Shield lens', 'CR-39 optical-grade · ANSI Z80.1-2025'],
  ['Cryo-Core temperature', '0–4°C · 20 min max continuous'],
  ['Cryo-Core retention', '30 min per freeze cycle'],
  ['Sleep Buds attenuation', '30 dB passive · <1.3cm shell'],
  ['Sleep Buds battery', '10hr · 48hr with case'],
  ['Cervical Axis target', 'C1–C2 vertebrae · 60 min wear'],
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
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < 4 ? '#1A1A1A' : 'none'} stroke="#1A1A1A" strokeWidth="1.6">
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
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 220ms ease' }}
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

  const handleAddToBag = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('crowncalm:add-cart', {
          detail: {
            item: 'suite',
            name: 'The Sanctuary Suite',
            price: PRICE,
          },
        })
      )
    }
    const cartBtn = document.querySelector('.nav__cart-btn') as HTMLButtonElement | null
    if (cartBtn) cartBtn.click()
  }

  return (
    <>
      <section className="sp" aria-label="The Sanctuary Suite product details">
        <div className="sp__inner">
          {/* Breadcrumbs matching Therabody */}
          <nav className="sp__breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sp__bc-sep">&rsaquo;</span>
            <span className="sp__bc-curr">The Sanctuary Suite</span>
          </nav>

          {/* ── TOP SECTION: GALLERY + BUY BOX ──────────────────────── */}
          <div className="sp__grid">
            {/* ── LEFT: GALLERY (VERTICAL THUMBNAIL RAIL ON LEFT, MAIN IMAGE ON RIGHT) ── */}
            <div className="sp__gallery">
              {/* 1:1 Thumbnails Rail (vertical on desktop) */}
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
                    <Image src={img.src || '/placeholder.svg'} alt="" width={112} height={112} sizes="64px" />
                  </button>
                ))}
              </div>

              {/* Main Stage Image */}
              <div className="sp__stage">
                <Image
                  key={GALLERY[activeImg].src}
                  src={GALLERY[activeImg].src || '/placeholder.svg'}
                  alt={GALLERY[activeImg].alt}
                  width={880}
                  height={880}
                  sizes="(max-width: 979px) 100vw, 48vw"
                  priority
                  className="sp__stage-img"
                />
                <button type="button" className="sp__arrow sp__arrow--l" onClick={prev} aria-label="Previous image">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="sp__arrow sp__arrow--r" onClick={next} aria-label="Next image">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── RIGHT: BUY BOX (THERABODY CLEAN PATTERN) ───────────── */}
            <div className="sp__panel">
              {/* Product title */}
              <h1 className="sp__title">The Sanctuary Suite</h1>

              {/* 3. Short 2–3 sentence description */}
              <p className="sp__desc">
                The Sanctuary Suite delivers quiet, compound neurological therapy to reduce sensory overload, release suboccipital stress, and halt migraine cascades. With five synchronized clinical instruments, it offers hospital-grade relief for fast recovery.
              </p>

              {/* 4. Trust / spec chips row: all in the same rounded-rectangle chip style */}
              <div className="sp__chips-row">
                <div className="sp__chip">
                  <svg className="sp__chip-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v12M15 9.5a3 3 0 0 0-6 0c0 3 6 2 6 5a3 3 0 0 1-6 0" />
                  </svg>
                  <span>HSA/FSA Accepted</span>
                </div>
                <div className="sp__chip">
                  <svg className="sp__chip-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>FDA Registered</span>
                </div>
                <div className="sp__chip">
                  <svg className="sp__chip-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>30-Day Returns</span>
                </div>
                <div className="sp__chip">
                  <svg className="sp__chip-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>1-Year Limited Warranty</span>
                </div>
              </div>

              {/* 5. Plain star rating row under chips */}
              <a href="#reviews" className="sp__rating-row">
                <Stars />
                <span className="sp__rating-reviews">2,143 Reviews</span>
              </a>

              {/* 6. Device options section with Included Protocol Tab */}
              <div className="sp__options-wrap">
                <span className="sp__options-label">DEVICE OPTIONS</span>
                <div className="sp__options-stack">
                  {/* Row 1: The Sanctuary Suite (Active Selectable Option) */}
                  <div className="sp__option-card sp__option-card--active">
                    <div className="sp__option-left">
                      <div className="sp__option-thumb">
                        <Image
                          src="/images/products/suite-hero.png"
                          alt="The Sanctuary Suite"
                          width={44}
                          height={44}
                        />
                      </div>
                      <div className="sp__option-info">
                        <span className="sp__option-name">The Sanctuary Suite</span>
                        <span className="sp__option-sub">
                          5 synchronized clinical instruments + complete protocol
                        </span>
                      </div>
                    </div>
                    <span className="sp__option-price">$345</span>
                  </div>

                  {/* Row 2: The Sanctuary Protocol (Included-Item Tab, Non-Purchasable) */}
                  <div className="sp__option-card sp__option-card--included-static">
                    <div className="sp__option-left">
                      {/* Small checkmark reinforcing "already yours," not "add this" */}
                      <span className="sp__option-included-check" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>

                      {/* Manual Thumbnail Mockup (Cream cover, Navy Fraunces title) */}
                      <div className="sp__option-thumb sp__option-thumb--manual">
                        <Image
                          src="/images/products/protocol-manual-thumb.svg"
                          alt="The Sanctuary Protocol flat-lay manual"
                          width={44}
                          height={44}
                        />
                      </div>

                      <div className="sp__option-info">
                        <span className="sp__option-name">The Sanctuary Protocol</span>
                        <span className="sp__option-sub">
                          100-page nervous system operating manual &mdash; delivered instantly at purchase
                        </span>
                      </div>
                    </div>

                    <div className="sp__option-value-line">
                      Included &mdash; $97 value
                    </div>
                  </div>
                </div>

                {/* One line beneath both rows, once (not per-row) */}
                <p className="sp__options-reassurance">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Every Sanctuary Suite includes the Protocol at no extra cost &mdash; nothing else to add.</span>
                </p>
              </div>

              {/* 7. Popular urgency line */}
              <p className="sp__urgency-line">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span><strong>Popular</strong> &ndash; 450 people added to bag in 24 hours</span>
              </p>

              {/* 8. Full-width black CTA button matching Therabody */}
              <button
                type="button"
                className="sp__cta-btn"
                onClick={handleAddToBag}
              >
                Add to bag
              </button>

              {/* 9. Centered payment plan line below button */}
              <div className="sp__payment-plan">
                <span className="sp__payment-text">Pay 4 interest-free payments of ${(PRICE / 4).toFixed(2)} with</span>
                <span className="sp__afterpay-badge">
                  <span className="sp__afterpay-icon">▲</span>
                  <strong>Afterpay</strong>
                </span>
                <span className="sp__pay-or">or</span>
                <strong className="sp__klarna-text">Klarna</strong>
              </div>

              {/* 10. Accordions */}
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
                  <div className="sp__honesty-inset">
                    Session 1 won&apos;t fix your migraine. Session 7 might. The first 6 sessions are calibration, not failure — the full progression curve is detailed in your Protocol Ebook.
                  </div>
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
                        <span className="sp__included-dot" style={{ background: '#121D2F' }} aria-hidden="true" />
                        <span className="sp__included-name">{EBOOK.name}</span>
                        <span className="sp__included-mech">100-page nervous system operating manual (Normally $97)</span>
                      </dt>
                      <dd>Included Free</dd>
                    </div>
                    <div className="sp__included-total">
                      <span>Suite total</span>
                      <span>${PRICE}</span>
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

          {/* ── BELOW THE FOLD: HORIZONTAL BENEFIT STRIP ─────────────── */}
          {/* Mirroring Therabody's 'Scientifically-proven benefits' pattern */}
          <div className="sp__benefits-strip">
            <div className="sp__benefits-strip-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 12l10 5 10-5" />
                <path d="M2 17l10 5 10-5" />
              </svg>
              <span>Scientifically-Proven Mechanisms</span>
            </div>
            <div className="sp__benefits-columns">
              {SCIENTIFIC_BENEFITS.map((b) => (
                <div key={b.lead} className="sp__benefit-column">
                  <div className="sp__benefit-header">
                    <span className="sp__benefit-marker" style={{ background: b.color }} aria-hidden="true" />
                    <strong className="sp__benefit-lead">{b.lead}</strong>
                  </div>
                  <p className="sp__benefit-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .sp {
            position: relative;
            background: var(--color-bg-primary, #FAFAF9);
            padding: calc(var(--nav-height, 64px) + 24px) max(20px, 3.5vw) 64px;
          }
          .sp__inner {
            max-width: var(--container-max, 1280px);
            margin: 0 auto;
          }

          /* Breadcrumbs */
          .sp__breadcrumbs {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-body);
            font-size: 11.5px;
            color: #7D766E;
            margin-bottom: 16px;
          }
          .sp__breadcrumbs a {
            color: #7D766E;
            text-decoration: underline;
            text-underline-offset: 2px;
            transition: color 150ms ease;
          }
          .sp__breadcrumbs a:hover {
            color: #1A1A1A;
          }
          .sp__bc-sep {
            color: #A39D94;
            font-size: 12px;
          }
          .sp__bc-curr {
            color: #1A1A1A;
            font-weight: 500;
          }

          .sp__grid {
            display: grid;
            grid-template-columns: 48fr 52fr;
            gap: clamp(32px, 4vw, 56px);
            align-items: start;
          }

          /* ── GALLERY COLUMN (VERTICAL RAIL + MAIN STAGE) ────────── */
          .sp__gallery {
            position: sticky;
            top: calc(var(--nav-height, 64px) + 20px);
            min-width: 0;
            display: flex;
            gap: 14px;
            align-items: flex-start;
          }
          .sp__thumbs {
            display: flex;
            flex-direction: column;
            gap: 10px;
            flex-shrink: 0;
            max-height: 540px;
            overflow-y: auto;
            scrollbar-width: none;
          }
          .sp__thumbs::-webkit-scrollbar { display: none; }
          .sp__thumb {
            width: 60px;
            height: 60px;
            aspect-ratio: 1 / 1;
            padding: 0;
            border: 1px solid rgba(26, 26, 26, 0.12);
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            background: #FAF5EE;
            opacity: 0.75;
            transition: opacity 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
          }
          .sp__thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .sp__thumb:hover {
            opacity: 1;
          }
          .sp__thumb--active {
            opacity: 1;
            border-color: #1A1A1A;
            box-shadow: 0 0 0 1.5px #1A1A1A;
          }

          .sp__stage {
            flex: 1;
            min-width: 0;
            position: relative;
            background: #FAF5EE;
            border: 1px solid rgba(26, 26, 26, 0.08);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(26, 26, 26, 0.04);
          }
          .sp__stage-img {
            width: 100%;
            height: auto;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            display: block;
          }
          .sp__arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(26, 26, 26, 0.1);
            border-radius: 50%;
            color: var(--color-text-primary, #1A1A1A);
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(26, 26, 26, 0.08);
            transition: background 160ms ease, transform 160ms ease;
          }
          .sp__arrow:hover {
            background: #FFFFFF;
            transform: translateY(-50%) scale(1.05);
          }
          .sp__arrow--l { left: 12px; }
          .sp__arrow--r { right: 12px; }

          /* ── BUY BOX PANEL (THERABODY EXACT HIERARCHY) ───────────── */
          .sp__panel {
            min-width: 0;
          }

          .sp__eyebrow {
            font-family: var(--font-mono);
            font-size: 10.5px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #7D766E;
            margin: 0 0 8px 0;
          }

          .sp__title {
            font-family: var(--font-display);
            font-size: clamp(28px, 3.2vw, 38px);
            font-weight: 700;
            line-height: 1.12;
            letter-spacing: -0.02em;
            color: var(--color-text-primary, #1A1A1A);
            margin: 0 0 14px 0;
          }

          .sp__desc {
            font-family: var(--font-body);
            font-size: 14px;
            line-height: 1.55;
            color: #555555;
            margin: 0 0 16px 0;
            max-width: 52ch;
          }

          /* Trust / Spec Chips matching Therabody */
          .sp__chips-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 0 0 14px 0;
          }
          .sp__chip {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 5px 9px;
            background: #FAF5EE;
            border: 1px solid rgba(26, 26, 26, 0.14);
            border-radius: 6px;
            font-family: var(--font-body);
            font-size: 11px;
            font-weight: 500;
            color: #222222;
          }
          .sp__chip-icon {
            color: #333333;
            flex-shrink: 0;
          }

          /* Star Rating Row placed right under chips */
          .sp__rating-row {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            margin: 0 0 20px 0;
          }
          .sp__stars {
            display: inline-flex;
            gap: 2px;
            color: #1A1A1A;
          }
          .sp__rating-reviews {
            font-family: var(--font-body);
            font-size: 12px;
            color: #4A4A4A;
            text-decoration: underline;
            text-underline-offset: 2px;
          }

          /* Device Options Stacked Cards */
          .sp__options-wrap {
            margin: 0 0 14px 0;
          }
          .sp__options-label {
            display: block;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #7D766E;
            margin-bottom: 8px;
          }
          .sp__options-stack {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
          }
          .sp__option-card {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: #FFFFFF;
            border: 1px solid rgba(26, 26, 26, 0.14);
            border-radius: 8px;
            text-align: left;
            cursor: pointer;
            outline: none;
            transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 120ms ease;
            box-shadow: 0 1px 2px rgba(26, 26, 26, 0.03);
          }
          .sp__option-card:hover {
            background: #FAF8F5;
            border-color: rgba(26, 26, 26, 0.32);
          }
          .sp__option-card:focus-visible {
            box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.4);
          }
          .sp__option-card--active {
            background: #FAF5EE !important;
            border: 1.5px solid #1A1A1A !important;
            box-shadow: 0 1px 4px rgba(26, 26, 26, 0.08);
          }
          .sp__option-card--included-static {
            background: #EFEADD !important;
            border: 1px solid rgba(26, 26, 26, 0.12) !important;
            cursor: default !important;
            user-select: none;
            box-shadow: none !important;
            transform: none !important;
          }
          .sp__option-card--included-static:hover,
          .sp__option-card--included-static:active,
          .sp__option-card--included-static:focus {
            background: #EFEADD !important;
            border-color: rgba(26, 26, 26, 0.12) !important;
            box-shadow: none !important;
            transform: none !important;
          }
          .sp__option-card--included-static:focus-visible {
            box-shadow: none !important;
            outline: none !important;
          }
          .sp__option-left {
            display: flex;
            align-items: center;
            gap: 11px;
            min-width: 0;
          }
          .sp__option-included-check {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(18, 29, 47, 0.08);
            border: 1px solid rgba(18, 29, 47, 0.14);
            color: #121D2F;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .sp__option-thumb {
            width: 44px;
            height: 44px;
            border-radius: 6px;
            overflow: hidden;
            background: #FFFFFF;
            border: 1px solid rgba(26, 26, 26, 0.1);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sp__option-thumb--manual {
            background: #F4EFEB;
            border-color: rgba(18, 29, 47, 0.15);
          }
          .sp__option-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .sp__option-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }
          .sp__option-title-row {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .sp__option-name {
            font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
            font-size: 14.5px;
            font-weight: 600;
            color: #1A1A1A;
            line-height: 1.2;
          }
          .sp__option-badge {
            display: inline-flex;
            align-items: center;
            padding: 1.5px 7px;
            border-radius: 4px;
            background: #EFECE6;
            border: 1px solid rgba(26, 26, 26, 0.1);
            font-family: var(--font-general-sans, var(--font-body), sans-serif);
            font-size: 10px;
            font-weight: 600;
            color: #4A453F;
            letter-spacing: 0.01em;
            line-height: 1.2;
          }
          .sp__option-sub {
            font-family: var(--font-general-sans, var(--font-body), sans-serif);
            font-size: 11.5px;
            line-height: 1.35;
            color: #736B63;
          }
          .sp__option-price {
            font-family: var(--font-general-sans, var(--font-body), sans-serif);
            font-size: 14.5px;
            font-weight: 600;
            color: #1A1A1A;
            flex-shrink: 0;
            margin-left: 12px;
          }
          .sp__option-value-line {
            font-family: var(--font-general-sans, var(--font-body), sans-serif);
            font-size: 13.5px;
            font-weight: 600;
            color: #1A1A1A;
            text-align: right;
            flex-shrink: 0;
            white-space: nowrap;
            margin-left: 12px;
          }
          .sp__options-reassurance {
            display: flex;
            align-items: flex-start;
            gap: 6.5px;
            margin: 10px 0 16px 2px;
            font-family: var(--font-general-sans, var(--font-body), sans-serif);
            font-size: 11.5px;
            line-height: 1.4;
            color: #615A52;
          }
          .sp__options-reassurance svg {
            color: #121D2F;
            flex-shrink: 0;
            margin-top: 2px;
          }

          /* Urgency Line */
          .sp__urgency-line {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-body);
            font-size: 12px;
            color: #555555;
            margin: 0 0 14px 0;
          }
          .sp__urgency-line strong {
            color: #1A1A1A;
            font-weight: 600;
          }
          .sp__urgency-line svg {
            color: #1A1A1A;
            flex-shrink: 0;
          }

          /* Full-width Black CTA Button */
          .sp__cta-btn {
            width: 100%;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            border-radius: 8px;
            background: #1A1A1A;
            color: #FFFFFF;
            font-family: var(--font-body);
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.02em;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(26, 26, 26, 0.14);
            transition: background 160ms ease, transform 120ms ease;
            margin: 0 0 14px 0;
          }
          .sp__cta-btn:hover {
            background: #2D2D2D;
          }
          .sp__cta-btn:active {
            transform: scale(0.99);
          }

          /* Payment Plan Line */
          .sp__payment-plan {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            font-family: var(--font-body);
            font-size: 11.5px;
            color: #555555;
            margin: 0 0 22px 0;
            flex-wrap: wrap;
            text-align: center;
          }
          .sp__afterpay-badge {
            display: inline-flex;
            align-items: center;
            gap: 3px;
          }
          .sp__afterpay-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 15px;
            height: 15px;
            background: #000000;
            color: #B2FCE4;
            border-radius: 3px;
            font-size: 8px;
            line-height: 1;
          }
          .sp__pay-or {
            color: #7D766E;
          }
          .sp__klarna-text {
            color: #1A1A1A;
            font-weight: 700;
          }

          /* Accordions */
          .sp__accs {
            border-top: 1px solid rgba(26, 26, 26, 0.12);
          }
          .sp__acc {
            border-bottom: 1px solid rgba(26, 26, 26, 0.12);
          }
          .sp__acc-head {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px 0;
            background: none;
            border: none;
            cursor: pointer;
            font-family: var(--font-mono);
            font-size: 11.5px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--color-text-primary, #1A1A1A);
            text-align: left;
            transition: color 150ms ease;
          }
          .sp__acc-head:hover {
            color: #C4503A;
          }
          .sp__acc-body {
            padding: 0 0 20px;
          }

          .sp__protocol-lead {
            font-family: var(--font-body);
            font-size: 14px;
            line-height: 1.5;
            color: #4A4A4A;
            margin: 0 0 10px 0;
          }
          .sp__steps {
            margin: 0 0 14px 0;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .sp__steps li {
            font-family: var(--font-body);
            font-size: 13.5px;
            line-height: 1.55;
            color: #5C5C5C;
          }
          .sp__honesty-inset {
            border-left: 2px solid rgba(26, 26, 26, 0.25);
            background: rgba(26, 26, 26, 0.03);
            padding: 12px 14px;
            border-radius: 0 6px 6px 0;
            font-family: var(--font-body);
            font-size: 13px;
            line-height: 1.55;
            color: #5C5C5C;
          }

          .sp__included {
            margin: 0;
          }
          .sp__included-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(26, 26, 26, 0.08);
          }
          .sp__included-row dt {
            display: flex;
            align-items: baseline;
            gap: 8px;
            flex-wrap: wrap;
            margin: 0;
          }
          .sp__included-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            flex-shrink: 0;
            align-self: center;
          }
          .sp__included-name {
            font-family: var(--font-mono);
            font-size: 11.5px;
            color: var(--color-text-primary, #1A1A1A);
          }
          .sp__included-row--bonus .sp__included-name {
            font-weight: 700;
          }
          .sp__included-mech {
            font-family: var(--font-mono);
            font-size: 9px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #8F8981;
          }
          .sp__included-row dd {
            font-family: var(--font-mono);
            font-size: 11.5px;
            color: #7D766E;
            margin: 0;
            flex-shrink: 0;
          }
          .sp__included-total {
            display: flex;
            justify-content: space-between;
            padding: 12px 0 0;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            color: var(--color-text-primary, #1A1A1A);
          }
          .sp__included-total del {
            color: #8F8981;
            font-weight: 400;
          }

          .sp__specs {
            width: 100%;
            border-collapse: collapse;
          }
          .sp__specs th {
            font-family: var(--font-mono);
            font-size: 10.5px;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #8F8981;
            text-align: left;
            padding: 8px 12px 8px 0;
            border-bottom: 1px solid rgba(26, 26, 26, 0.08);
            width: 44%;
          }
          .sp__specs td {
            font-family: var(--font-mono);
            font-size: 11.5px;
            font-weight: 600;
            color: var(--color-text-primary, #1A1A1A);
            padding: 8px 0;
            border-bottom: 1px solid rgba(26, 26, 26, 0.08);
          }

          /* ── HORIZONTAL BENEFIT STRIP (BELOW THE FOLD) ───────────── */
          .sp__benefits-strip {
            margin-top: clamp(40px, 5vw, 64px);
            background: #FAF5EE;
            border: 1px solid rgba(26, 26, 26, 0.1);
            border-radius: 16px;
            padding: clamp(24px, 3.2vw, 36px);
            box-shadow: 0 1px 3px rgba(26, 26, 26, 0.04);
          }
          .sp__benefits-strip-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #7D766E;
            margin-bottom: 22px;
          }
          .sp__benefits-columns {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: clamp(16px, 2vw, 24px);
          }
          .sp__benefit-column {
            display: flex;
            flex-direction: column;
            gap: 6px;
            border-left: 1px solid rgba(26, 26, 26, 0.08);
            padding-left: 14px;
          }
          .sp__benefit-column:first-child {
            border-left: none;
            padding-left: 0;
          }
          .sp__benefit-header {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .sp__benefit-marker {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
          }
          .sp__benefit-lead {
            font-family: var(--font-display);
            font-size: 14px;
            font-weight: 700;
            color: var(--color-text-primary, #1A1A1A);
            line-height: 1.25;
          }
          .sp__benefit-desc {
            font-family: var(--font-body);
            font-size: 13px;
            line-height: 1.5;
            color: #5C5C5C;
            margin: 0;
          }

          /* ── RESPONSIVE ─────────────────────────────────────────── */
          @media (max-width: 1024px) {
            .sp__benefits-columns {
              grid-template-columns: repeat(3, 1fr);
            }
            .sp__benefit-column:nth-child(4) {
              border-left: none;
              padding-left: 0;
            }
          }

          @media (max-width: 900px) {
            .sp__grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }
            .sp__gallery {
              position: static;
            }
            .sp__benefits-columns {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .sp__benefit-column {
              border-left: none;
              padding-left: 0;
              padding-bottom: 14px;
              border-bottom: 1px solid rgba(26, 26, 26, 0.08);
            }
            .sp__benefit-column:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
          }

          @media (max-width: 520px) {
            .sp {
              padding-left: 16px;
              padding-right: 16px;
            }
            .sp__title {
              font-size: 26px;
            }
            .sp__chips-row {
              gap: 6px;
            }
            .sp__chip {
              font-size: 10px;
              padding: 5px 9px;
            }
            .sp__buy-row {
              gap: 8px;
            }
            .sp__qty {
              height: 48px;
            }
            .sp__cta-btn {
              height: 48px;
              font-size: 11px;
            }
          }
        `}</style>
      </section>
      <TrustBar />
    </>
  )
}
