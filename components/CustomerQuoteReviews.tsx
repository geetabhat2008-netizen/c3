'use client'

import { useRef } from 'react'
import Image from 'next/image'

interface QuoteReview {
  id: string
  quote: string
  name: string
  role: string
  avatar: string
}

const REVIEWS_DATA: QuoteReview[] = [
  {
    id: 'km-nurse',
    quote: 'The FL-41 was the first thing that made office lighting manageable.',
    name: 'K.M.',
    role: 'Nurse, 34 · Verified · Week 3',
    /* TODO: replace with real customer photo */
    avatar: '/images/testimonials/sarah-m.png',
  },
  {
    id: 'dr-marketing',
    quote:
      'The massage on Soothing mode during peak pain was the only non-pharmaceutical thing that ever made a difference.',
    name: 'D.R.',
    role: 'Marketing Director, 41 · Verified · Day 18',
    /* TODO: replace with real customer photo */
    avatar: '/images/testimonials/daniel-r.png',
  },
  {
    id: 'as-teacher',
    quote: 'The neck module is the only piece I can wear on client calls.',
    name: 'A.S.',
    role: 'Teacher, 29 · Verified · Day 12',
    /* TODO: replace with real customer photo */
    avatar: '/images/testimonials/jordan-k.png',
  },
]

export default function CustomerQuoteReviews() {
  const scrollRailRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="testimonials"
      className="quote-section"
      aria-labelledby="quote-section-headline"
    >
      {/* Invisible anchor target for nav link "/#reviews" */}
      <div id="reviews" className="quote-section__anchor" aria-hidden="true" />

      <div className="quote-section__inner">
        {/* ── 1. SECTION HEADER ROW ─────────────────────────────────────── */}
        <div className="quote-section__header">
          <div className="quote-section__header-left">
            {/* Small icon top-left: diagonal arrow glyph from site set */}
            <div className="quote-section__icon-badge" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>

            {/* Two-line headline: Line 1 regular weight, Line 2 bold */}
            <h2 id="quote-section-headline" className="quote-section__headline">
              <span className="quote-section__headline-l1">Real relief, in their words.</span>
              <span className="quote-section__headline-l2">What changes when the storm has an exit.</span>
            </h2>
          </div>

          {/* Top-right: View All Reviews CTA with terracotta accent */}
          <div className="quote-section__header-right">
            <a href="/products/sanctuary-suite#reviews" className="quote-section__cta">
              <span>View All Reviews</span>
              <svg
                className="quote-section__cta-arrow"
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── 2. CARD STRUCTURE (3 CARDS MATCHING REFERENCE) ─────────────── */}
        <div className="quote-section__grid" ref={scrollRailRef}>
          {REVIEWS_DATA.map((item) => (
            <article key={item.id} className="quote-card">
              {/* Top-left: Oversized decorative quotation mark in terracotta */}
              <div className="quote-card__mark" aria-hidden="true">
                <svg
                  width="36"
                  height="28"
                  viewBox="0 0 36 28"
                  fill="currentColor"
                >
                  <path d="M9.6 0C4.3 0 0 4.6 0 11.2c0 8.2 6.5 14.8 14.7 16.8l1.7-3.6C10.7 23 7.8 19.3 7.6 15c1-.4 2.2-.6 3.6-.6 4.3 0 7.8 3.2 7.8 7.2 0-4.8 0-10.4-3.6-15.6C13.6 3.6 11.7 0 9.6 0zm19 0c-5.3 0-9.6 4.6-9.6 11.2 0 8.2 6.5 14.8 14.7 16.8l1.7-3.6c-5.7-1.4-8.6-5.1-8.8-9.4 1-.4 2.2-.6 3.6-.6 4.3 0 7.8 3.2 7.8 7.2 0-4.8 0-10.4-3.6-15.6C32.6 3.6 30.7 0 28.6 0z" />
                </svg>
              </div>

              {/* Quote text: Geist Regular, sized for readability, 2-3 lines */}
              <blockquote className="quote-card__quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Footer: circular avatar + name (bold) + role (muted) stacked to right */}
              <div className="quote-card__footer">
                <div className="quote-card__avatar-wrap">
                  {/* TODO: replace with real customer photo */}
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="quote-card__avatar"
                  />
                </div>
                <div className="quote-card__meta">
                  <span className="quote-card__name">{item.name}</span>
                  <span className="quote-card__role">{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION CONTAINER: Deep #121212 Eight Sleep Surface ── */
        .quote-section {
          position: relative;
          width: 100%;
          background: #121212;
          padding: clamp(64px, 7.5vw, 92px) max(20px, 4vw);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-sizing: border-box;
          overflow: hidden;
          scroll-margin-top: calc(var(--nav-height, 102px) + 16px);
        }

        .quote-section__anchor {
          position: absolute;
          top: -110px;
          left: 0;
          height: 1px;
          width: 1px;
          pointer-events: none;
        }

        .quote-section__inner {
          width: 100%;
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
        }

        /* ── 1. HEADER ROW ── */
        .quote-section__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: clamp(36px, 4.5vw, 48px);
          flex-wrap: wrap;
        }

        .quote-section__header-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 780px;
        }

        /* Small icon top-left */
        .quote-section__icon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
        }

        /* Two-line headline */
        .quote-section__headline {
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .quote-section__headline-l1 {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(24px, 2.8vw, 36px);
          line-height: 1.2;
          letter-spacing: -0.015em;
          color: rgba(255, 255, 255, 0.65);
        }

        .quote-section__headline-l2 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(24px, 2.8vw, 36px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #FAFAF9;
        }

        /* Top-right CTA: White pill button matching Eight Sleep */
        .quote-section__header-right {
          display: flex;
          align-items: center;
        }

        .quote-section__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 9999px;
          background: #FFFFFF;
          color: #000000;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
          transition: all 220ms ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .quote-section__cta:hover {
          background: #EAEAEA;
          color: #000000;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
        }

        .quote-section__cta-arrow {
          transition: transform 200ms ease;
        }

        .quote-section__cta:hover .quote-section__cta-arrow {
          transform: translateX(3px);
        }

        /* ── 2. CARDS GRID ── */
        .quote-section__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.2vw, 24px);
          align-items: stretch;
        }

        /* Dark card on dark section */
        .quote-card {
          display: flex;
          flex-direction: column;
          background: #181818;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: clamp(26px, 2.8vw, 34px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background-color 220ms ease;
          position: relative;
        }

        .quote-card:hover {
          transform: translateY(-3px);
          background: #1C1C1C;
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        /* Oversized quotation glyph */
        .quote-card__mark {
          color: rgba(255, 255, 255, 0.35);
          opacity: 0.92;
          margin-bottom: 18px;
          line-height: 1;
        }

        /* Quote body text */
        .quote-card__quote {
          margin: 0 0 28px 0;
          font-family: var(--font-body);
          font-size: clamp(15.5px, 1.3vw, 17.5px);
          font-weight: 400;
          line-height: 1.55;
          color: #FAFAF9;
          letter-spacing: -0.01em;
          flex: 1;
        }

        /* Card footer: avatar + name + role */
        .quote-card__footer {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .quote-card__avatar-wrap {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          background: #1C1C22;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }

        .quote-card__avatar {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .quote-card__meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .quote-card__name {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          color: #FAFAF9;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .quote-card__role {
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.01em;
          line-height: 1.3;
        }

        /* ── RESPONSIVE: Tablet & Mobile Horizontal Scroll-Snap ── */
        @media (max-width: 1023px) {
          .quote-section__grid {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
            margin: 0 -20px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .quote-section__grid::-webkit-scrollbar {
            display: none;
          }

          .quote-card {
            flex: 0 0 clamp(285px, 80vw, 360px);
            scroll-snap-align: start;
          }

          .quote-section__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  )
}
