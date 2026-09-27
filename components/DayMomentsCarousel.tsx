'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface SynergyCard {
  id: string
  title: string
  description: string
  useCase: string
  image: string
  objectPosition: string
  headerIcon: React.ReactNode
  bottomIcon: React.ReactNode
}

const CARDS: SynergyCard[] = [
  {
    id: 'neuro-massager',
    title: '360° Neuro-Massager',
    description:
      'Rhythmic pneumatic compression closes the pain gate at the cranial level. Vibration-based massagers can’t — disorganized input doesn’t close it.',
    useCase: 'Active Attack Relief',
    image: '/images/lifestyle/synergy-massager.jpg',
    objectPosition: 'center 20%',
    headerIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 5a7 7 0 0 1 7 7" />
        <path d="M5 12a7 7 0 0 1 7-7" />
        <path d="M12 19a7 7 0 0 1-7-7" />
        <path d="M19 12a7 7 0 0 1-7 7" />
      </svg>
    ),
    bottomIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12h4l3-7 4 14 3-7h6" />
      </svg>
    ),
  },
  {
    id: 'optic-shield',
    title: 'FL-41 Optic Shield',
    description:
      'Filters the exact 480–520nm band that fires the eye’s pain pathway. Not a blue-light filter — a precision one.',
    useCase: 'All-Day Office Light',
    image: '/images/lifestyle/synergy-glasses.jpg',
    objectPosition: 'center 20%',
    headerIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    bottomIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    id: 'cryo-core',
    title: 'Cryo-Compression Core',
    description:
      'Cold at the occipital and temporal sites shrinks swollen vessels, cutting the throbbing at its source. Reset every 20 minutes.',
    useCase: 'First 20 Minutes',
    image: '/images/lifestyle/synergy-cryo.jpg',
    objectPosition: 'center 40%',
    headerIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    bottomIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    id: 'sleep-buds',
    title: 'Acoustic Silence Sleep Buds',
    description:
      '30dB passive attenuation plus Brown Noise masking, without the high-frequency edge that irritates a sensitized system.',
    useCase: 'Flights & Sleep',
    image: '/images/lifestyle/synergy-buds.jpg',
    objectPosition: 'center 35%',
    headerIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="9" width="5" height="8" rx="2" />
        <rect x="15" y="9" width="5" height="8" rx="2" />
        <path d="M6 9V6a6 6 0 0 1 12 0v3" />
      </svg>
    ),
    bottomIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: 'cervical-axis',
    title: 'Cervical Axis Module',
    description:
      'Your neck and your migraine share a relay in the brainstem. The one Pillar built to wear during work, driving, or wind-down.',
    useCase: 'Desk & Commute',
    image: '/images/lifestyle/synergy-cervical.jpg',
    objectPosition: 'center 22%',
    headerIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M8 8c2-2 6-2 8 0" />
        <path d="M7 12c3-2 7-2 10 0" />
        <path d="M8 16c2-2 6-2 8 0" />
      </svg>
    ),
    bottomIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
        <path d="M4 11h16" />
        <path d="M8 16v5M16 16v5" />
      </svg>
    ),
  },
]

export default function DayMomentsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cardEl = track.firstElementChild as HTMLElement | null
    if (!cardEl) return
    const cardWidth = cardEl.offsetWidth + 16
    const scrollPos = track.scrollLeft
    const idx = Math.min(CARDS.length - 1, Math.max(0, Math.round(scrollPos / cardWidth)))
    setActiveIndex(idx)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const targetIdx = Math.max(0, Math.min(CARDS.length - 1, index))
    const cardEl = track.firstElementChild as HTMLElement | null
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : 316
    track.scrollTo({
      left: targetIdx * cardWidth,
      behavior: 'smooth',
    })
    setActiveIndex(targetIdx)
  }

  return (
    <section
      id="synergy-daily-protocol"
      className="synergy-sec"
      aria-label="One Protocol. Every Part of Your Day."
    >
      {/* Anchor for backward compatibility with #moments links */}
      <span id="moments" style={{ position: 'absolute', top: '-80px' }} aria-hidden="true" />

      <div className="synergy-sec__inner">
        {/* ── HEADER BLOCK ────────────────────────────────────────── */}
        <header className="synergy-sec__header">
          <h2 className="synergy-sec__headline">
            <span className="synergy-sec__headline-l1">One protocol.</span>
            <span className="synergy-sec__headline-l2">Every part of your day.</span>
          </h2>
          <p className="synergy-sec__subhead">
            Five synchronized pillars calibrated to specific neurological moments.
          </p>
        </header>

        {/* ── CARD ROW (5 Cards Carousel) ─────────────────────────── */}
        <div
          ref={trackRef}
          className="synergy-sec__track"
          role="region"
          aria-label="Five synchronized pillars carousel"
          tabIndex={0}
        >
          {CARDS.map((card) => (
            <article key={card.id} className="synergy-card">
              {/* Image Container with strict 4:5 aspect ratio */}
              <div className="synergy-card__image-box">
                <Image
                  src={card.image}
                  alt={`${card.title} during ${card.useCase}`}
                  fill
                  sizes="(max-width: 640px) 280px, 300px"
                  className="synergy-card__img"
                  style={{
                    objectFit: 'cover',
                    objectPosition: card.objectPosition,
                  }}
                />

                {/* 40px Gradient Transition Zone (Photo -> Solid Cream #F5F0E8) */}
                <div className="synergy-card__transition-scrim" aria-hidden="true" />
              </div>

              {/* Text Block — Solid Cream #F5F0E8 background */}
              <div className="synergy-card__body">
                {/* Header Row: Icon + Title */}
                <div className="synergy-card__title-row">
                  <span className="synergy-card__head-icon" aria-hidden="true">
                    {card.headerIcon}
                  </span>
                  <h3 className="synergy-card__title">{card.title}</h3>
                </div>

                {/* Description: 2 lines max with ellipsis */}
                <p className="synergy-card__desc">{card.description}</p>

                {/* 1px Hairline Divider with 12px margin above/below */}
                <hr className="synergy-card__divider" aria-hidden="true" />

                {/* Bottom Label Row: bold micro-label left, contextual icon right */}
                <div className="synergy-card__bottom-row">
                  <span className="synergy-card__usecase-label">{card.useCase}</span>
                  <span className="synergy-card__bottom-icon" aria-hidden="true">
                    {card.bottomIcon}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── PROGRESS DOTS + FOOTER ROW ─────────────────────────── */}
        <div className="synergy-sec__footer">
          <div className="synergy-sec__footer-left">
            {/* 5 Dots exactly matching 5 cards */}
            <div
              className="synergy-sec__dots"
              role="tablist"
              aria-label="Carousel pagination dots"
            >
              {CARDS.map((_, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to pillar ${idx + 1}`}
                    className={`synergy-sec__dot ${isActive ? 'synergy-sec__dot--active' : ''}`}
                    onClick={() => scrollToIndex(idx)}
                  />
                )
              })}
            </div>

            {/* Science link: Tier 4 text link style */}
            <a href="/products/sanctuary-suite" className="synergy-sec__link">
              Explore the science behind the Sanctuary Suite &rarr;
            </a>
          </div>

          {/* Arrow controls: 40px circle icon buttons */}
          <div className="synergy-sec__arrows" aria-label="Carousel navigation">
            <button
              type="button"
              className="synergy-sec__arrow"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous card"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="synergy-sec__arrow"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex >= CARDS.length - 1}
              aria-label="Next card"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION CONTAINER: Slate-blue matching announcement bar ─ */
        .synergy-sec {
          width: 100%;
          position: relative;
          background: var(--color-announcement-bar, #4B617A);
          padding: clamp(80px, 8vw, 112px) 0;
          overflow: hidden;
        }

        .synergy-sec__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 max(24px, 4vw);
        }

        /* ── HEADER BLOCK ────────────────────────────────────────── */
        .synergy-sec__header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto;
        }

        .synergy-sec__headline {
          font-family: var(--font-display);
          margin: 0;
          line-height: 1.15;
          letter-spacing: var(--tracking-heading, -0.02em);
        }

        .synergy-sec__headline-l1 {
          display: block;
          font-size: clamp(32px, 3.8vw, 44px);
          font-weight: 700;
          color: #FFFFFF;
        }

        .synergy-sec__headline-l2 {
          display: block;
          font-size: clamp(32px, 3.8vw, 44px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.70);
          margin-top: 4px;
        }

        .synergy-sec__subhead {
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.70);
          margin: 20px auto 0;
          max-width: 54ch;
        }

        /* ── CAROUSEL TRACK (4 cards on desktop + partial 5th peeking) ── */
        .synergy-sec__track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          margin: 64px 0 0; /* 64px gap below subhead */
          padding: 12px 4px 20px;
          outline: none;
        }

        .synergy-sec__track::-webkit-scrollbar {
          display: none;
        }

        /* ── CARD STRUCTURE (Single unified object, 16px radius) ─── */
        .synergy-card {
          flex: 0 0 300px;
          width: 300px;
          scroll-snap-align: start;
          border-radius: 16px;
          overflow: hidden;
          background: #F5F0E8; /* Cream base */
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
          display: flex;
          flex-direction: column;
          transition: transform 250ms ease, box-shadow 250ms ease;
        }

        .synergy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35);
        }

        /* Image Box with strict 4:5 Aspect Ratio */
        .synergy-card__image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #EAE5DC;
          overflow: hidden;
        }

        .synergy-card__img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block;
        }

        /* 40px Gradient Transition Zone (Photo -> Solid Cream #F5F0E8) */
        .synergy-card__transition-scrim {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(to bottom, rgba(245, 240, 232, 0) 0%, #F5F0E8 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Text Block: 20px padding */
        .synergy-card__body {
          background: #F5F0E8;
          padding: 16px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Header Row: Monoline Icon + Title */
        .synergy-card__title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .synergy-card__head-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #1A1A2E;
        }

        .synergy-card__title {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.25;
          color: #1A1A2E;
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* Description: 2 lines max with ellipsis */
        .synergy-card__desc {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 13px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(26, 26, 46, 0.70); /* Navy at 70% opacity */
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 39px; /* Holds consistent 2-line baseline */
        }

        /* 1px Hairline Divider */
        .synergy-card__divider {
          border: none;
          border-top: 1px solid #E5E0D5; /* Warm gray hairline */
          margin: 12px 0;
          width: 100%;
        }

        /* Bottom Row: Micro-label left, icon right */
        .synergy-card__bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .synergy-card__usecase-label {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 11.5px;
          font-weight: 700;
          color: #1A1A2E;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .synergy-card__bottom-icon {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A2E;
          opacity: 0.85;
          flex-shrink: 0;
        }

        /* ── FOOTER ROW ──────────────────────────────────────────── */
        .synergy-sec__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 36px;
          padding: 0 4px;
        }

        .synergy-sec__footer-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        /* 5 Progress Dots */
        .synergy-sec__dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .synergy-sec__dot {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.35);
          padding: 0;
          cursor: pointer;
          transition: width 200ms ease, background-color 200ms ease, border-radius 200ms ease;
        }

        .synergy-sec__dot--active {
          width: 24px;
          border-radius: 999px;
          background: #FFFFFF; /* Pure white active pill for slate-blue background */
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
        }

        .synergy-sec__dot:hover:not(.synergy-sec__dot--active) {
          background: rgba(255, 255, 255, 0.65);
        }

        /* Science Link: Tier 4 Text Link Style */
        .synergy-sec__link {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 14.5px;
          font-weight: 400;
          color: #FFFFFF;
          text-decoration: none;
          transition: text-decoration 150ms ease;
        }

        .synergy-sec__link:hover {
          text-decoration: underline;
        }

        /* Circular Arrow Buttons (40px) */
        .synergy-sec__arrows {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .synergy-sec__arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.20);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          outline: none;
          transition: background-color 150ms ease, border-color 150ms ease, opacity 150ms ease;
        }

        .synergy-sec__arrow:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.40);
        }

        .synergy-sec__arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .synergy-sec__arrow:focus-visible {
          outline: 2px solid #FFFFFF;
          outline-offset: 2px;
        }

        /* ── MOBILE RESPONSIVENESS (Below 768px) ─────────────────── */
        @media (max-width: 768px) {
          .synergy-sec {
            padding: 64px 0;
          }

          .synergy-sec__headline-l1,
          .synergy-sec__headline-l2 {
            font-size: 28px;
          }

          .synergy-sec__subhead {
            font-size: 15px;
            margin-top: 18px;
          }

          .synergy-sec__track {
            margin-top: 40px;
            gap: 14px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .synergy-card {
            flex: 0 0 280px;
            width: 280px;
          }

          .synergy-sec__footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding: 0 20px;
            margin-top: 24px;
          }

          .synergy-sec__footer-left {
            width: 100%;
            justify-content: space-between;
          }

          .synergy-sec__arrows {
            align-self: flex-end;
          }
        }
      `}</style>
    </section>
  )
}

export { DayMomentsCarousel as SynergyDailyProtocol }
