'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Testimonial {
  name: string
  role: string
  quote: string
  image: string
  duration?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Verified Customer · 9-Year Migraine History',
    quote: 'For the first time in nine years, I watched the storm coming — and had somewhere to go.',
    image: '/images/testimonials/sarah-m.png',
    duration: '1:14',
  },
  {
    name: 'Daniel R.',
    role: 'Verified Customer · Sanctuary Suite',
    quote: 'The Sanctuary Protocol replaced the guesswork. At the first warning sign, I know exactly which step comes next.',
    image: '/images/testimonials/daniel-r.png',
    duration: '0:58',
  },
  {
    name: 'Maya L.',
    role: 'Verified Customer · 6-Year Migraine History',
    quote: 'The Cryo-Core and Neuro-Massager now live beside my bed. Starting early has changed how I meet difficult mornings.',
    image: '/images/testimonials/maya-l.png',
    duration: '1:22',
  },
  {
    name: 'Elena V.',
    role: 'Verified Customer · Optic Shield User',
    quote: 'The Optic Shield lets me stay at my desk when light sensitivity begins, without forcing myself through the glare.',
    image: '/images/testimonials/elena-v.png',
    duration: '1:05',
  },
  {
    name: 'Jordan K.',
    role: 'Verified Customer · Sanctuary Suite',
    quote: 'Five instruments sounds like a lot. In practice, the protocol is clear, quiet, and easy to follow when thinking is hardest.',
    image: '/images/testimonials/jordan-k.png',
    duration: '1:18',
  },
  {
    name: 'Priya S.',
    role: 'Verified Customer · 11-Year Migraine History',
    quote: 'The Cervical Axis Module gives me a way to address the neck tension that so often arrives before the rest.',
    image: '/images/testimonials/priya-s.png',
    duration: '1:30',
  },
  {
    name: 'Naomi C.',
    role: 'Verified Customer · Sanctuary Suite',
    quote: 'CrownCalm gave me one considered system instead of a drawer full of disconnected fixes.',
    image: '/images/testimonials/naomi-c.png',
    duration: '1:08',
  },
]

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  /* Update active slide index on scroll */
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cardEl = track.firstElementChild as HTMLElement | null
    if (!cardEl) return
    const cardWidth = cardEl.offsetWidth + 24
    const scrollPos = track.scrollLeft
    const idx = Math.min(TESTIMONIALS.length - 1, Math.max(0, Math.round(scrollPos / cardWidth)))
    setActiveIndex(idx)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* Scroll to specific slide */
  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const targetIdx = Math.max(0, Math.min(TESTIMONIALS.length - 1, index))
    const cardEl = track.firstElementChild as HTMLElement | null
    const cardWidth = cardEl ? cardEl.offsetWidth + 24 : 290
    track.scrollTo({
      left: targetIdx * cardWidth,
      behavior: 'smooth',
    })
    setActiveIndex(targetIdx)
  }

  /* Handle video modal open / close & Esc key listener */
  const openModal = (t: Testimonial) => {
    setActiveVideo(t)
    setIsPlaying(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveVideo(null)
    setIsPlaying(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeVideo])

  return (
    <section id="reviews" className="v-reviews" aria-labelledby="v-reviews-title">
      <div className="v-reviews__inner">
        {/* Section Header: Left Title + Right Controls */}
        <header className="v-reviews__header">
          <div className="v-reviews__header-left">
            <p className="v-reviews__eyebrow">Curious how people are using CrownCalm</p>
            <h2 id="v-reviews-title" className="v-reviews__headline">
              Hear what our customers are saying
            </h2>
          </div>

          <div className="v-reviews__arrows" aria-label="Testimonial navigation">
            <button
              type="button"
              className="v-reviews__arrow"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="v-reviews__arrow"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex >= TESTIMONIALS.length - 1}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* Carousel Track: 4 cards wide portrait row */}
        <div
          ref={trackRef}
          className="v-reviews__track"
          role="region"
          aria-label="Customer video testimonials"
          tabIndex={0}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div key={t.name} className="v-reviews__item">
              {/* Standalone Portrait Video Card */}
              <div
                className="v-reviews__video-card"
                onClick={() => openModal(t)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openModal(t)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Play testimonial video from ${t.name}`}
              >
                <Image
                  src={t.image}
                  alt={`Video thumbnail of ${t.name}`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 290px"
                  className="v-reviews__video-poster"
                  priority={idx < 2}
                />

                {/* Duration Badge Top Right */}
                {t.duration && (
                  <div className="v-reviews__duration-badge" aria-hidden="true">
                    <span className="v-reviews__duration-dot" />
                    <span>{t.duration}</span>
                  </div>
                )}

                {/* Centered Frosted Glass Play Button Overlay */}
                <div className="v-reviews__play-overlay" aria-hidden="true">
                  <div className="v-reviews__play-btn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="v-reviews__play-icon">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Separate Metadata Row Beneath Card: Avatar + Bold Name + Subtitle */}
              <div className="v-reviews__info">
                <div className="v-reviews__avatar">
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="42px"
                    className="v-reviews__avatar-img"
                  />
                </div>
                <div className="v-reviews__meta">
                  <div className="v-reviews__name-row">
                    <strong className="v-reviews__name">{t.name}</strong>
                    <span className="v-reviews__verified-tag">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Verified
                    </span>
                  </div>
                  <span className="v-reviews__role">{t.role.replace(/^Verified Customer ·\s*/, '')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Progress Dots */}
        <div className="v-reviews__dots" aria-hidden="true">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`v-reviews__dot ${activeIndex === i ? 'v-reviews__dot--active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video Lightbox / Modal Overlay */}
      {activeVideo && (
        <div
          className="v-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-author"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="v-modal__card">
            {/* Modal Header */}
            <div className="v-modal__header">
              <div className="v-modal__user">
                <div className="v-modal__avatar">
                  <Image
                    src={activeVideo.image}
                    alt=""
                    fill
                    sizes="40px"
                    className="v-reviews__avatar-img"
                  />
                </div>
                <div>
                  <strong id="modal-author" className="v-modal__name">{activeVideo.name}</strong>
                  <span className="v-modal__role">{activeVideo.role}</span>
                </div>
              </div>

              <button
                type="button"
                className="v-modal__close"
                onClick={closeModal}
                aria-label="Close video"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Video Stage */}
            <div className="v-modal__stage">
              <Image
                src={activeVideo.image}
                alt=""
                fill
                sizes="(max-width: 640px) 90vw, 480px"
                className="v-modal__stage-img"
              />

              <div className="v-modal__quote-overlay">
                <blockquote className="v-modal__quote">
                  “{activeVideo.quote}”
                </blockquote>

                <div className="v-modal__player-bar">
                  <button
                    type="button"
                    className="v-modal__play-toggle"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="v-modal__scrubber">
                    <div className={`v-modal__scrubber-fill${isPlaying ? ' is-playing' : ''}`} />
                  </div>

                  <span className="v-modal__time">0:14 / {activeVideo.duration || '1:14'}</span>
                </div>

                <p className="v-modal__note">
                  Spoken Customer Testimonial · Full recording
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Section: Off-white canvas with elegant borders ── */
        .v-reviews {
          width: 100%;
          background: #FAFAF9;
          padding: clamp(64px, 7vw, 96px) max(24px, 5vw);
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
          overflow: hidden;
          scroll-margin-top: 100px;
        }

        .v-reviews__inner {
          max-width: 1320px;
          margin: 0 auto;
        }

        /* ── Header: Left-aligned Title + Right-aligned Arrow Controls ── */
        .v-reviews__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: clamp(32px, 4vw, 48px);
          flex-wrap: wrap;
        }

        .v-reviews__header-left {
          display: flex;
          flex-direction: column;
          max-width: 720px;
        }

        .v-reviews__eyebrow {
          font-family: var(--font-mono, 'Geist Mono', monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #64748B;
          margin: 0 0 10px 0;
        }

        .v-reviews__headline {
          font-family: var(--font-display, 'Geist', -apple-system, sans-serif);
          font-weight: 700;
          font-size: clamp(30px, 3.6vw, 44px);
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #0F172A;
          margin: 0;
        }

        /* ── Top-Right Header Arrow Controls (Eight Sleep style) ── */
        .v-reviews__arrows {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .v-reviews__arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #111111;
          color: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          outline: none;
        }

        .v-reviews__arrow:hover:not(:disabled) {
          background: #000000;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
        }

        .v-reviews__arrow:active:not(:disabled) {
          transform: scale(0.95);
        }

        .v-reviews__arrow:focus-visible {
          outline: 2px solid #111111;
          outline-offset: 2px;
        }

        .v-reviews__arrow:disabled {
          opacity: 0.28;
          background: rgba(15, 23, 42, 0.08);
          color: rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(15, 23, 42, 0.06);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ── Track: Horizontal Scroll Snap with 4 Cards in View ── */
        .v-reviews__track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding: 8px 4px 16px 4px;
          margin: -8px -4px 0 -4px;
          outline: none;
        }

        .v-reviews__track::-webkit-scrollbar {
          display: none;
        }

        /* ── Individual Testimonial Column (4 Cards Across on Desktop + 5th Peek) ── */
        .v-reviews__item {
          flex: 0 0 clamp(260px, 23vw, 296px);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }

        /* ── Standalone Rounded Portrait Video Card ── */
        .v-reviews__video-card {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          background: #E2E8F0;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 4px 18px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
          cursor: pointer;
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease, border-color 240ms ease;
          outline: none;
        }

        .v-reviews__video-card:hover,
        .v-reviews__video-card:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(15, 23, 42, 0.16);
          box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .v-reviews__video-card:focus-visible {
          box-shadow: 0 0 0 2px #111111, 0 16px 36px -4px rgba(0, 0, 0, 0.12);
        }

        .v-reviews__video-poster {
          object-fit: cover;
          transition: transform 480ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .v-reviews__video-card:hover .v-reviews__video-poster {
          transform: scale(1.04);
        }

        /* ── Frosted Duration Badge on Top-Right of Card ── */
        .v-reviews__duration-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-family: var(--font-mono, 'Geist Mono', monospace);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          pointer-events: none;
        }

        .v-reviews__duration-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E8624A;
        }

        /* ── Centered Frosted Glass Play Button ── */
        .v-reviews__play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        .v-reviews__play-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 #FFFFFF;
          transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), background 220ms ease, box-shadow 220ms ease;
          padding-left: 3px;
        }

        .v-reviews__video-card:hover .v-reviews__play-btn {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 #FFFFFF;
        }

        /* ── Separate Avatar + Name Row Beneath Card ── */
        .v-reviews__info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
          padding: 0 2px;
        }

        .v-reviews__avatar {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: #E2E8F0;
          border: 1.5px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .v-reviews__avatar-img {
          object-fit: cover;
        }

        .v-reviews__meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .v-reviews__name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .v-reviews__name {
          font-family: var(--font-body, 'Geist', -apple-system, sans-serif);
          font-size: 14.5px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .v-reviews__verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 1.5px 6px;
          border-radius: 4px;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .v-reviews__role {
          font-family: var(--font-body, 'Geist', -apple-system, sans-serif);
          font-size: 12.5px;
          color: #64748B;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Carousel Pagination Dots ── */
        .v-reviews__dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 36px;
        }

        .v-reviews__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.16);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .v-reviews__dot:hover {
          background: rgba(15, 23, 42, 0.4);
        }

        .v-reviews__dot--active {
          width: 24px;
          border-radius: 4px;
          background: #0F172A;
        }


        /* ── Modal / Lightbox ── */
        .v-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(18, 17, 15, 0.88);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 220ms ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .v-modal__card {
          width: 100%;
          max-width: 460px;
          background: #FAF5EE;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          animation: modalSlideUp 240ms ease;
        }

        @keyframes modalSlideUp {
          from { transform: translateY(16px); }
          to { transform: translateY(0); }
        }

        .v-modal__header {
          padding: 16px 20px;
          background: #FAF5EE;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(26, 26, 26, 0.08);
        }

        .v-modal__user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .v-modal__avatar {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background: #EAE3D8;
          border: 1px solid rgba(26, 26, 26, 0.12);
        }

        .v-modal__name {
          display: block;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          color: #1A1A1A;
          line-height: 1.2;
        }

        .v-modal__role {
          display: block;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #7D766E;
          letter-spacing: 0.02em;
          margin-top: 2px;
        }

        .v-modal__close {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(26, 26, 26, 0.15);
          background: transparent;
          color: #1A1A1A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
          outline: none;
        }

        .v-modal__close:hover {
          background: rgba(26, 26, 26, 0.08);
          border-color: #1A1A1A;
        }

        .v-modal__stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #1A1A1A;
          overflow: hidden;
        }

        .v-modal__stage-img {
          object-fit: cover;
          filter: brightness(0.65) contrast(1.05);
        }

        .v-modal__quote-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 22px;
          background: linear-gradient(180deg, transparent 20%, rgba(18, 17, 15, 0.88) 100%);
          color: #FAF5EE;
        }

        .v-modal__quote {
          margin: 0 0 20px 0;
          font-family: var(--font-display);
          font-size: clamp(16px, 2.5vw, 18px);
          font-weight: 500;
          line-height: 1.42;
          color: #FAF5EE;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .v-modal__player-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(26, 26, 26, 0.7);
          backdrop-filter: blur(8px);
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(250, 245, 238, 0.15);
        }

        .v-modal__play-toggle {
          background: transparent;
          border: none;
          color: #FAF5EE;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }

        .v-modal__scrubber {
          flex: 1;
          height: 4px;
          background: rgba(250, 245, 238, 0.25);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .v-modal__scrubber-fill {
          height: 100%;
          width: 35%;
          background: #FAF5EE;
          border-radius: 2px;
        }

        .v-modal__scrubber-fill.is-playing {
          animation: scrubberProgress 40s linear infinite;
        }

        @keyframes scrubberProgress {
          0% { width: 10%; }
          50% { width: 65%; }
          100% { width: 95%; }
        }

        .v-modal__time {
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(250, 245, 238, 0.8);
          letter-spacing: 0.04em;
        }

        .v-modal__note {
          margin: 10px 0 0 0;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(250, 245, 238, 0.6);
          text-align: center;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .v-reviews {
            padding: 48px 16px;
          }

          .v-reviews__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .v-reviews__arrows {
            align-self: flex-start;
          }

          .v-reviews__item {
            flex: 0 0 78vw;
          }
        }
      `}</style>
    </section>
  )
}
