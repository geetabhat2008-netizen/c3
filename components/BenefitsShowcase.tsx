'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/* TYPES & DATA — Mapped Exactly to Apollo Neuro Reference Structure  */
/* ------------------------------------------------------------------ */

interface Stat {
  value: string
  detail: string
}

interface Testimonial {
  quote: string
  author: string
  role: string
}

interface Category {
  id: string
  label: string
  pillBg: string
  pillColor: string
  statBg: string
  previewTitle1: string
  previewTitle2: string
  image: string
  objectPosition: string
  alt: string
  headlineLine1: string
  headlineLine2: string
  body: string
  stats: [Stat, Stat, Stat]
  testimonial: Testimonial
}

const CATEGORIES: Category[] = [
  {
    id: 'calm',
    label: 'Calm',
    pillBg: '#C4B5FD', // Soft lavender (Reference Image 2)
    pillColor: '#1E1B4B',
    statBg: 'rgba(92, 64, 34, 0.78)', // Warm amber-brown tint (Reference Images 1 & 3)
    previewTitle1: 'Reduce',
    previewTitle2: 'Stress',
    image: '/images/lifestyle/morning-session.png',
    objectPosition: 'top center', // Frames her face cleanly when cropped narrower
    alt: 'Morning Neuro-Massager session in soft daylight',
    headlineLine1: 'Reduce Stress,',
    headlineLine2: 'Relieve Anxiety',
    body: 'Gentle rhythmic compression closes the two primary input channels — the trigeminal gate and cervical convergence — so your nervous system finally gets room to settle.',
    testimonial: {
      quote:
        'Apollo has been a miracle. It\'s a natural way I can get better sleep, manage stress, and combat anxiety.',
      author: 'MATT D.',
      role: 'VERIFIED CUSTOMER',
    },
    stats: [
      { value: '40% Less', detail: 'stress and feelings of anxiety' },
      { value: '25% More', detail: 'focus and concentration' },
      { value: '46 Min More', detail: 'sleep per night' },
    ],
  },
  {
    id: 'sleep',
    label: 'Sleep',
    pillBg: '#FED7AA', // Soft warm peach
    pillColor: '#7C2D12',
    statBg: 'rgba(75, 55, 40, 0.78)',
    previewTitle1: 'Drift',
    previewTitle2: 'Deeper',
    image: '/images/lifestyle/sleep-buds.png',
    objectPosition: '38% 45%', // Perfectly centers the sleeping portrait & earbud
    alt: 'Acoustic Silence Sleep Buds resting before bed',
    headlineLine1: 'Drift Deeper,',
    headlineLine2: 'Wake Restored',
    body: 'Low-frequency brown noise masks sudden acoustic spikes without introducing high-frequency irritation, holding quiet through the sleep onset window.',
    testimonial: {
      quote:
        'I used to sleep like the dead, then I had kids. This makes me sleep like I did before. It just works.',
      author: 'MAGGIE U.',
      role: 'VERIFIED CUSTOMER',
    },
    stats: [
      { value: '30 dB', detail: 'passive quiet isolation' },
      { value: '+60 Min', detail: 'deeper restorative sleep' },
      { value: '<1.3 cm', detail: 'sub-pillow flush profile' },
    ],
  },
  {
    id: 'focus',
    label: 'Focus',
    pillBg: '#E9D5FF', // Soft rose/lilac
    pillColor: '#581C87',
    statBg: 'rgba(85, 55, 50, 0.78)',
    previewTitle1: 'Steady',
    previewTitle2: 'Flow',
    image: '/images/lifestyle/office-glasses.png',
    objectPosition: '36% 26%', // Centers the workstation glasses portrait
    alt: 'FL-41 Optic Shield worn at a desk workstation',
    headlineLine1: 'Clear Mind,',
    headlineLine2: 'Steady Flow',
    body: 'Precision FL-41 optical filtration blocks up to 80% of the 480–520nm trigger band, removing photosensitivity and glare from your cognitive load so you stay locked in.',
    testimonial: {
      quote:
        'Energized and focused, without the buzz and crash I get from coffee. It is sustainable.',
      author: 'BRIAN R.',
      role: 'VERIFIED CUSTOMER',
    },
    stats: [
      { value: '80% Less', detail: 'blue-green trigger band' },
      { value: '480–520nm', detail: 'precision optical cutoff' },
      { value: '15 Min', detail: 'natural adaptation window' },
    ],
  },
  {
    id: 'recovery',
    label: 'Recovery',
    pillBg: '#BFDBFE', // Soft azure
    pillColor: '#1E3A8A',
    statBg: 'rgba(50, 65, 80, 0.78)',
    previewTitle1: 'Restore',
    previewTitle2: 'Stillness',
    image: '/images/lifestyle/cervical-desk.png',
    objectPosition: '60% 32%', // Centers the cervical neck relief alignment
    alt: 'Cervical Axis Module worn at a desk workstation',
    headlineLine1: 'Release the Axis,',
    headlineLine2: 'Restore Stillness',
    body: 'Targeted suboccipital decompression arrests C1–C2 convergence at the trigeminocervical complex, releasing chronic muscular loading in postdrome.',
    testimonial: {
      quote:
        'The Cervical Axis Module gives me a way to address the neck tension that so often arrives before the rest.',
      author: 'PRIYA S.',
      role: 'VERIFIED CUSTOMER',
    },
    stats: [
      { value: 'C1–C2', detail: 'trigeminocervical release' },
      { value: '60 Min', detail: 'continuous relief wear' },
      { value: '0–4°C', detail: 'vasoconstriction core' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* COMPONENT — Apollo-Accurate Tabbed Showcase                        */
/* ------------------------------------------------------------------ */

export default function BenefitsShowcase() {
  const [activeId, setActiveId] = useState<string>('calm')
  const [animKey, setAnimKey] = useState<number>(0)

  const activeIndex = CATEGORIES.findIndex((c) => c.id === activeId)
  const currentActive = CATEGORIES[activeIndex >= 0 ? activeIndex : 0]

  // Previews for desktop: the next two categories in cycle
  const preview1 = CATEGORIES[(activeIndex + 1) % CATEGORIES.length]
  const preview2 = CATEGORIES[(activeIndex + 2) % CATEGORIES.length]

  const switchTab = useCallback(
    (newId: string) => {
      if (newId === activeId) return
      setActiveId(newId)
      setAnimKey((prev) => prev + 1)
    },
    [activeId]
  )

  // Mobile Touch Swipe Handling
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Next tab
        const nextIdx = (activeIndex + 1) % CATEGORIES.length
        switchTab(CATEGORIES[nextIdx].id)
      } else {
        // Prev tab
        const prevIdx = (activeIndex - 1 + CATEGORIES.length) % CATEGORIES.length
        switchTab(CATEGORIES[prevIdx].id)
      }
    }
    touchStartXRef.current = null
    touchStartYRef.current = null
  }

  return (
    <section
      id="benefits-tabbed-showcase"
      className="ap-benefits"
      aria-label="Product benefits showcase"
    >
      <div className="ap-container">
        {/* ── CENTERED HEADER (Reference Image 2) ───────────────────── */}
        <header className="ap-header">
          <h2 className="ap-title">
            Meet The Benefits
            <span className="ap-title-sub">You Can Actually Feel</span>
          </h2>
        </header>

        {/* ── CENTERED TABS (Reference Image 2: plain text inactive, soft pill active) ── */}
        <div className="ap-tabs-wrap" role="tablist" aria-label="Benefit categories">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeId
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`ap-tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`ap-panel-${cat.id}`}
                className={`ap-tab-btn${isActive ? ' is-active' : ''}`}
                style={
                  isActive
                    ? {
                        backgroundColor: cat.pillBg,
                        color: cat.pillColor,
                      }
                    : undefined
                }
                onClick={() => switchTab(cat.id)}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* ── DESKTOP VIEW: Asymmetric Row (Reference Image 1) ──────── */}
        <div className="ap-desktop-row" role="region" aria-label="Benefits deck">
          {/* Active Card (~60% Width) */}
          <div
            key={`active-${currentActive.id}-${animKey}`}
            id={`ap-panel-${currentActive.id}`}
            role="tabpanel"
            aria-labelledby={`ap-tab-${currentActive.id}`}
            className="ap-card ap-card--active"
          >
            {/* Photography (Sharp, no blur) */}
            <div className="ap-img-frame" aria-hidden="true">
              <Image
                src={currentActive.image}
                alt={currentActive.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 60vw"
                className="ap-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: currentActive.objectPosition || 'center',
                }}
              />
            </div>

            {/* Gradient Scrim (Darkens bottom and right, leaves photo clear) */}
            <div className="ap-scrim" aria-hidden="true" />

            {/* Top Bar: Category Pill (top-left) + Learn More Button (top-right) */}
            <div className="ap-card-top">
              <div
                className="ap-category-pill"
                style={{
                  backgroundColor: currentActive.pillBg,
                  color: currentActive.pillColor,
                }}
              >
                {currentActive.label}
              </div>

              <Link
                href="/products/sanctuary-suite"
                className="ap-learn-pill"
                style={{
                  backgroundColor: 'rgba(38, 34, 32, 0.75)',
                  border: '1.5px solid rgba(255, 255, 255, 0.55)',
                  borderRadius: '999px',
                  color: '#FFFFFF',
                  padding: '7px 20px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
                aria-label={`Learn more about ${currentActive.label} protocol`}
              >
                Learn More
              </Link>
            </div>

            {/* Bottom 2-Column Area (Reference Image 1) */}
            <div className="ap-card-bottom">
              {/* Left Column: Headline + Body (Sits directly on image) */}
              <div className="ap-lead-col">
                <h3 className="ap-headline">
                  <span>{currentActive.headlineLine1}</span>
                  <span>{currentActive.headlineLine2}</span>
                </h3>
                <p className="ap-body">{currentActive.body}</p>
              </div>

              {/* Right Column: Testimonial Box + 3 Stat Boxes (Reference Image 1) */}
              <div className="ap-side-col">
                {/* Testimonial Box (Dark translucent rounded box) */}
                <figure className="ap-testimonial-box">
                  <blockquote className="ap-quote-text">
                    &ldquo;{currentActive.testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="ap-quote-meta">
                    <span className="ap-quote-author">{currentActive.testimonial.author}</span>
                    <span className="ap-quote-verified">{currentActive.testimonial.role}</span>
                  </figcaption>
                </figure>

                {/* 3 Stat Boxes (Warm brown tint, Reference Image 1) */}
                <div className="ap-stats-grid">
                  {currentActive.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="ap-stat-box"
                      style={{ backgroundColor: currentActive.statBg }}
                    >
                      <span className="ap-stat-val">{stat.value}</span>
                      <span className="ap-stat-lbl">{stat.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card 1 (~21% Width, Reference Image 1) */}
          <div
            role="button"
            tabIndex={0}
            className="ap-card ap-card--preview"
            aria-label={`Switch to ${preview1.label}`}
            onClick={() => switchTab(preview1.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                switchTab(preview1.id)
              }
            }}
          >
            {/* Cropped Photo (object-fit: cover + calibrated object-position) */}
            <div className="ap-img-frame" aria-hidden="true">
              <Image
                src={preview1.image}
                alt={preview1.alt}
                fill
                sizes="25vw"
                className="ap-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: preview1.objectPosition || 'center',
                }}
              />
            </div>

            {/* Gradient Scrim (Top subtle shadow for '+', bottom shadow for pill & title) */}
            <div className="ap-preview-scrim" aria-hidden="true" />

            {/* Top-Right Action Corner: Expand '+' Button */}
            <button
              type="button"
              className="ap-expand-btn"
              aria-label={`Expand ${preview1.label} benefit`}
              onClick={(e) => {
                e.stopPropagation()
                switchTab(preview1.id)
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Bottom Area: Category Label Pill (bottom-left) + Preview Title */}
            <div className="ap-preview-content">
              <div
                className="ap-preview-pill"
                style={{
                  backgroundColor: preview1.pillBg,
                  color: preview1.pillColor,
                }}
              >
                {preview1.label}
              </div>
              <div className="ap-preview-title">
                <span>{preview1.previewTitle1}</span>
                <span>{preview1.previewTitle2}</span>
              </div>
            </div>
          </div>

          {/* Preview Card 2 (~21% Width, Reference Image 1) */}
          <div
            role="button"
            tabIndex={0}
            className="ap-card ap-card--preview"
            aria-label={`Switch to ${preview2.label}`}
            onClick={() => switchTab(preview2.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                switchTab(preview2.id)
              }
            }}
          >
            {/* Cropped Photo (object-fit: cover + calibrated object-position) */}
            <div className="ap-img-frame" aria-hidden="true">
              <Image
                src={preview2.image}
                alt={preview2.alt}
                fill
                sizes="25vw"
                className="ap-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: preview2.objectPosition || 'center',
                }}
              />
            </div>

            {/* Gradient Scrim (Top subtle shadow for '+', bottom shadow for pill & title) */}
            <div className="ap-preview-scrim" aria-hidden="true" />

            {/* Top-Right Action Corner: Expand '+' Button */}
            <button
              type="button"
              className="ap-expand-btn"
              aria-label={`Expand ${preview2.label} benefit`}
              onClick={(e) => {
                e.stopPropagation()
                switchTab(preview2.id)
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Bottom Area: Category Label Pill (bottom-left) + Preview Title */}
            <div className="ap-preview-content">
              <div
                className="ap-preview-pill"
                style={{
                  backgroundColor: preview2.pillBg,
                  color: preview2.pillColor,
                }}
              >
                {preview2.label}
              </div>
              <div className="ap-preview-title">
                <span>{preview2.previewTitle1}</span>
                <span>{preview2.previewTitle2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE VIEW: Single Full-Width Card (Reference Images 2 & 3) ── */}
        <div
          className="ap-mobile-view"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Mobile benefits carousel"
        >
          <div
            key={`mobile-${currentActive.id}-${animKey}`}
            className="ap-card ap-card--mobile"
          >
            <div className="ap-img-frame" aria-hidden="true">
              <Image
                src={currentActive.image}
                alt={currentActive.alt}
                fill
                priority
                sizes="100vw"
                className="ap-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: currentActive.objectPosition || 'center',
                }}
              />
            </div>

            {/* Mobile Gradient Scrim */}
            <div className="ap-mobile-scrim" aria-hidden="true" />

            {/* Top Bar: Category Pill (left) + Learn More Button (right) */}
            <div className="ap-card-top">
              <div
                className="ap-category-pill"
                style={{
                  backgroundColor: currentActive.pillBg,
                  color: currentActive.pillColor,
                }}
              >
                {currentActive.label}
              </div>

              <Link
                href="/products/sanctuary-suite"
                className="ap-learn-pill"
                style={{
                  backgroundColor: 'rgba(38, 34, 32, 0.75)',
                  border: '1.5px solid rgba(255, 255, 255, 0.55)',
                  borderRadius: '999px',
                  color: '#FFFFFF',
                  padding: '7px 20px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
                aria-label={`Learn more about ${currentActive.label} protocol`}
              >
                Learn More
              </Link>
            </div>

            {/* Mobile Vertical Flow (Reference Image 3) */}
            <div className="ap-mobile-content">
              {/* 1. Headline directly on photo */}
              <h3 className="ap-headline ap-headline--mobile">
                <span>{currentActive.headlineLine1}</span>
                <span>{currentActive.headlineLine2}</span>
              </h3>

              {/* 2. Body copy directly on photo */}
              <p className="ap-body ap-body--mobile">{currentActive.body}</p>

              {/* 3. Full-width Testimonial Box */}
              <figure className="ap-testimonial-box ap-testimonial-box--mobile">
                <blockquote className="ap-quote-text ap-quote-text--mobile">
                  &ldquo;{currentActive.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="ap-quote-meta">
                  <span className="ap-quote-author">{currentActive.testimonial.author}</span>
                  <span className="ap-quote-verified">{currentActive.testimonial.role}</span>
                </figcaption>
              </figure>

              {/* 4. 3 Stat Boxes side-by-side (Reference Image 3) */}
              <div className="ap-stats-grid ap-stats-grid--mobile">
                {currentActive.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="ap-stat-box ap-stat-box--mobile"
                    style={{ backgroundColor: currentActive.statBg }}
                  >
                    <span className="ap-stat-val ap-stat-val--mobile">{stat.value}</span>
                    <span className="ap-stat-lbl ap-stat-lbl--mobile">{stat.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Pagination Dots (Reference Image 3: active warm orange, inactive cream) */}
          <div className="ap-dot-row" role="tablist" aria-label="Carousel pagination dots">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeId
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Jump to ${cat.label} benefit`}
                  className={`ap-dot${isActive ? ' is-active' : ''}`}
                  onClick={() => switchTab(cat.id)}
                />
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ==========================================================================
           SECTION CONTAINER — Warm luminous background matching Reference Image 2
           ========================================================================== */
        .ap-benefits {
          background-color: #FAF8F5;
          padding: clamp(64px, 8vw, 104px) max(20px, 4vw);
          color: #1A1A2E;
          position: relative;
          z-index: 2;
          scroll-margin-top: 80px;
        }

        .ap-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* ── CENTERED HEADER (Reference Image 2) ───────────────────── */
        .ap-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .ap-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #1A1A2E;
          margin: 0;
        }

        .ap-title-sub {
          display: block;
          font-weight: 400;
          color: #2D2A32;
        }

        /* ── CENTERED TABS (Reference Image 2) ─────────────────────── */
        .ap-tabs-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 3vw, 32px);
          margin-bottom: clamp(24px, 3.2vw, 36px);
          overflow-x: auto;
          scrollbar-width: none;
          padding: 4px 8px;
        }

        .ap-tabs-wrap::-webkit-scrollbar {
          display: none;
        }

        /* Inactive: plain text, NO border! (Reference Image 2) */
        .ap-tab-btn {
          background: transparent;
          border: none;
          padding: 8px 20px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: #1A1A2E;
          cursor: pointer;
          border-radius: 999px;
          transition: background-color 200ms ease, color 200ms ease;
          white-space: nowrap;
        }

        .ap-tab-btn:hover:not(.is-active) {
          color: #000000;
          background-color: rgba(26, 26, 46, 0.05);
        }

        /* Active: soft solid pill (Reference Image 2) */
        .ap-tab-btn.is-active {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* ── DESKTOP CARDS ROW (Reference Image 1) ─────────────────── */
        .ap-desktop-row {
          display: flex;
          gap: 16px;
          height: 520px;
          align-items: stretch;
        }

        .ap-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #181514;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
        }

        /* Active card: wider aspect, roughly 16:11 */
        .ap-card--active {
          flex: 0 0 calc(58% - 11px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          animation: apFade 350ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        /* Inactive preview cards: taller/narrower portrait aspect */
        .ap-card--preview {
          flex: 0 0 calc(21% - 11px);
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 20px;
          transition: transform 250ms ease, box-shadow 250ms ease;
        }

        .ap-card--preview:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
        }

        .ap-img-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Crop, not compress: cover on every card image */
        .ap-img {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }

        /* ── EXPAND '+' BUTTON (Inactive Cards Top-Right) ──────────── */
        .ap-expand-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 5;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(26, 26, 46, 0.55); /* Flat fill Navy at 55% */
          border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle white border */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          outline: none;
          transition: transform 150ms ease, background-color 150ms ease, border-color 150ms ease;
        }

        .ap-card--preview:hover .ap-expand-btn,
        .ap-expand-btn:hover {
          transform: scale(1.1);
          background-color: rgba(26, 26, 46, 0.70);
          border-color: rgba(255, 255, 255, 0.30);
        }

        .ap-expand-btn:focus-visible {
          outline: 2px solid #FFFFFF;
          outline-offset: 2px;
        }

        /* ── SCRIMS (Darkens bottom and right, keeps photo sharp) ───── */
        .ap-scrim {
          position: absolute;
          inset: 0;
          background:
            /* Top bar shading */
            linear-gradient(to bottom, rgba(20, 16, 14, 0.55) 0%, transparent 28%),
            /* Bottom & right darkening for clean contrast */
            linear-gradient(to top, rgba(16, 12, 10, 0.92) 0%, rgba(16, 12, 10, 0.55) 45%, rgba(16, 12, 10, 0.08) 80%),
            radial-gradient(ellipse at bottom right, rgba(16, 12, 10, 0.82) 0%, transparent 65%);
          pointer-events: none;
        }

        .ap-preview-scrim {
          position: absolute;
          inset: 0;
          background:
            /* Top gradient shading for + button */
            linear-gradient(to bottom, rgba(16, 12, 10, 0.45) 0%, transparent 28%),
            /* Bottom gradient for category pill & title */
            linear-gradient(to top, rgba(16, 12, 10, 0.92) 0%, rgba(16, 12, 10, 0.5) 45%, transparent 75%);
          pointer-events: none;
        }

        /* ── PREVIEW CONTENT & CATEGORY PILL (Bottom-Left) ─────────── */
        .ap-preview-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          width: 100%;
        }

        .ap-preview-pill {
          display: inline-block;
          border-radius: 18px; /* 18px radius pill shape */
          padding: 5px 14px;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          line-height: 1.2;
        }

        /* ── TOP BAR (Reference Image 2) ───────────────────────────── */
        .ap-card-top {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        /* Category Pill (Top-Left): Rounded 999px, soft solid fill */
        .ap-category-pill {
          border-radius: 999px;
          padding: 8px 22px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        /* ── BOTTOM AREA (Reference Image 1: 2-Column Split) ────────── */
        .ap-card-bottom {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(20px, 3vw, 36px);
        }

        /* Left Column: Headline + Body directly on photo */
        .ap-lead-col {
          flex: 1 1 0;
          min-width: 0;
          max-width: 44ch;
        }

        .ap-headline {
          font-family: var(--font-display);
          font-size: clamp(26px, 2.8vw, 36px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 12px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .ap-headline span {
          display: block;
        }

        .ap-body {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
          margin: 0;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        }

        /* Right Column: Testimonial Box + 3 Stat Boxes (Reference Image 1) */
        .ap-side-col {
          flex: 0 0 min(330px, 46%);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Testimonial Box (Reference Image 1: Dark translucent rounded box) */
        .ap-testimonial-box {
          margin: 0;
          background: rgba(35, 30, 28, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          padding: 15px 18px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        .ap-quote-text {
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 8px;
          font-style: normal;
        }

        .ap-quote-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ap-quote-author {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.04em;
        }

        .ap-quote-verified {
          font-family: var(--font-mono);
          font-size: 8.5px;
          font-variant: all-small-caps;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.75);
        }

        /* 3 Stat Boxes in a row (Reference Image 1) */
        .ap-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .ap-stat-box {
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 12px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
          min-height: 76px;
        }

        .ap-stat-val {
          font-family: var(--font-body);
          font-size: 14.5px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 4px;
          line-height: 1.15;
        }

        .ap-stat-lbl {
          font-family: var(--font-body);
          font-size: 9.5px;
          line-height: 1.25;
          color: rgba(255, 255, 255, 0.88);
          text-align: center;
        }

        /* ── PREVIEW CARDS (Reference Image 1: Bottom text) ────────── */
        .ap-preview-title {
          position: relative;
          z-index: 4;
          font-family: var(--font-display);
          font-size: clamp(22px, 1.9vw, 28px);
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.15;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .ap-preview-title span {
          display: block;
        }

        /* ── MOBILE VIEW (Reference Images 2 & 3) ───────────────────── */
        .ap-mobile-view {
          display: none;
        }

        @keyframes apFade {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── RESPONSIVE ADAPTATIONS (Mobile Breakpoint <= 900px) ────── */
        @media (max-width: 900px) {
          .ap-desktop-row {
            display: none;
          }

          .ap-mobile-view {
            display: block;
            width: 100%;
          }

          .ap-card--mobile {
            width: 100%;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 16px 20px;
            min-height: 620px;
            animation: apFade 300ms ease both;
          }

          .ap-mobile-scrim {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(to bottom, rgba(16, 12, 10, 0.55) 0%, transparent 22%),
              linear-gradient(to top, rgba(16, 12, 10, 0.96) 0%, rgba(16, 12, 10, 0.7) 50%, rgba(16, 12, 10, 0.1) 85%);
            pointer-events: none;
          }

          /* Mobile Content Stack (Reference Image 3: Headline -> Body -> Testimonial -> 3 Stats) */
          .ap-mobile-content {
            position: relative;
            z-index: 4;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: auto;
          }

          .ap-headline--mobile {
            font-size: clamp(24px, 6.5vw, 30px);
            margin: 0;
          }

          .ap-body--mobile {
            font-size: 13px;
            line-height: 1.45;
            color: rgba(255, 255, 255, 0.92);
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 0;
          }

          .ap-testimonial-box--mobile {
            padding: 14px 16px;
            border-radius: 16px;
          }

          .ap-quote-text--mobile {
            font-size: 12px;
            margin-bottom: 6px;
          }

          .ap-stats-grid--mobile {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }

          .ap-stat-box--mobile {
            padding: 10px 4px;
            min-height: 72px;
          }

          .ap-stat-val--mobile {
            font-size: 13.5px;
          }

          .ap-stat-lbl--mobile {
            font-size: 9px;
          }

          /* 4 Pagination Dots (Reference Image 3: active orange #F5A623, inactive #F0E5D8) */
          .ap-dot-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 18px;
          }

          .ap-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background-color: #F0E5D8;
            padding: 0;
            cursor: pointer;
            transition: background-color 200ms ease, transform 200ms ease;
          }

          .ap-dot.is-active {
            background-color: #F5A623;
            transform: scale(1.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ap-card--active,
          .ap-card--mobile {
            animation: none !important;
          }

          .ap-card--preview,
          .ap-tab-btn,
          .ap-dot {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export { BenefitsShowcase as BenefitsTabbedShowcase }
