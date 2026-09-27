'use client'

import React from 'react'

interface TrustSignal {
  id: string
  label: string
  icon: React.ReactNode
}

const SIGNALS: TrustSignal[] = [
  {
    id: 'clinicians',
    label: 'Backed by Clinicians',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#1A1A2E"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3.5 2h1.5M11 2h1.5" />
        <path d="M4.25 2v2a3.75 3.75 0 0 0 7.5 0V2" />
        <path d="M8 7.75v2.75a2.5 2.5 0 0 0 5 0v-1.5" />
        <circle cx="13" cy="7.75" r="1.3" />
      </svg>
    ),
  },
  {
    id: 'ansi-z80',
    label: 'ANSI Z80.1-2025 Certified',
    icon: (
      <svg
        width="38"
        height="16"
        viewBox="0 0 38 16"
        fill="none"
        aria-hidden="true"
        className="trust-cert-mark"
      >
        <rect
          x="0.6"
          y="0.6"
          width="36.8"
          height="14.8"
          rx="2.5"
          stroke="#1A1A2E"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <text
          x="5"
          y="11"
          fill="#1A1A2E"
          fontSize="8"
          fontWeight="800"
          letterSpacing="0.06em"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          ANSI
        </text>
        <line
          x1="25.5"
          y1="3.5"
          x2="25.5"
          y2="12.5"
          stroke="#1A1A2E"
          strokeWidth="0.7"
          strokeOpacity="0.25"
        />
        <circle cx="31.5" cy="8" r="2.2" stroke="#1A1A2E" strokeWidth="0.9" />
        <circle cx="31.5" cy="8" r="0.8" fill="#1A1A2E" />
      </svg>
    ),
  },
  {
    id: 'users',
    label: '150,000+ Protocol Users',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#1A1A2E"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.5 14v-1.5a2.5 2.5 0 0 0-2.5-2.5H4a2.5 2.5 0 0 0-2.5 2.5V14" />
        <circle cx="6" cy="5" r="2.5" />
        <path d="M14.5 14v-1.2a2.5 2.5 0 0 0-2-2.4" />
        <path d="M11 2.6a2.5 2.5 0 0 1 0 4.8" />
      </svg>
    ),
  },
  {
    id: 'medical-review',
    label: 'Medically Reviewed for Accuracy',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#1A1A2E"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 14.5s5-2.5 5-6.5V3.5L8 1.5 3 3.5V8c0 4 5 6.5 5 6.5z" />
        <path d="M8 5.5v5M5.5 8h5" />
      </svg>
    ),
  },
  {
    id: 'guarantee',
    label: '30-Day Protocol Guarantee',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#1A1A2E"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 8a6 6 0 1 0 1.76-4.24L2 5.5" />
        <path d="M2 2v3.5h3.5" />
        <path d="M6 8l1.5 1.5 3-3" />
      </svg>
    ),
  },
  {
    id: 'hsa-fsa',
    label: 'HSA/FSA Eligible',
    icon: (
      <svg
        width="46"
        height="16"
        viewBox="0 0 46 16"
        fill="none"
        aria-hidden="true"
        className="trust-cert-mark"
      >
        <rect
          x="0.6"
          y="0.6"
          width="44.8"
          height="14.8"
          rx="2.5"
          stroke="#1A1A2E"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <text
          x="5"
          y="11"
          fill="#1A1A2E"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.04em"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          HSA
        </text>
        <line
          x1="23"
          y1="3.5"
          x2="23"
          y2="12.5"
          stroke="#1A1A2E"
          strokeWidth="0.7"
          strokeOpacity="0.25"
        />
        <text
          x="27.5"
          y="11"
          fill="#1A1A2E"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.04em"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          FSA
        </text>
      </svg>
    ),
  },
]

// Symmetrically repeated units so the track comfortably spans 4K viewports without empty gaps
const PRIMARY_GROUP = [...SIGNALS, ...SIGNALS, ...SIGNALS]

export default function TrustStripMarquee() {
  return (
    <section
      id="trust-strip-marquee"
      className="trust-marquee"
      aria-label="Verified clinical trust and certification signals"
    >
      <div className="trust-marquee__track">
        {/* Primary Set */}
        <div className="trust-marquee__group">
          {PRIMARY_GROUP.map((signal, index) => (
            <React.Fragment key={`sig-primary-${signal.id}-${index}`}>
              <div className="trust-marquee__item">
                <div className="trust-marquee__icon-box">
                  {signal.icon}
                </div>
                <span className="trust-marquee__label">{signal.label}</span>
              </div>
              <div className="trust-marquee__divider" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>

        {/* Identical Cloned Set for Seamless Infinite Loop */}
        <div className="trust-marquee__group" aria-hidden="true">
          {PRIMARY_GROUP.map((signal, index) => (
            <React.Fragment key={`sig-clone-${signal.id}-${index}`}>
              <div className="trust-marquee__item">
                <div className="trust-marquee__icon-box">
                  {signal.icon}
                </div>
                <span className="trust-marquee__label">{signal.label}</span>
              </div>
              <div className="trust-marquee__divider" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           TRUST STRIP MARQUEE — Slim, Precision Editorial Edition
           - Height: 42px slim, neat, refined
           - Background: luminous warm off-white #FAF8F5
           - Hairline top & bottom border: 1px rgba(26, 26, 46, 0.08)
           - Seamless loop: -50% translation over identical paired groups
           - Ambient linear speed: ~45px/second
           - Pause on hover (desktop only)
           ========================================================================== */
        .trust-marquee {
          width: 100%;
          height: 42px;
          background-color: #FAF8F5;
          border-top: 1px solid rgba(26, 26, 46, 0.08);
          border-bottom: 1px solid rgba(26, 26, 46, 0.08);
          margin-top: -1px; /* Prevents double border when stacked */
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          user-select: none;
          z-index: 2;
        }

        .trust-marquee__track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          animation: trust-marquee-scroll 84s linear infinite;
        }

        .trust-marquee__group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        /* ── PAUSE ON HOVER (DESKTOP ONLY) ───────────────────────────── */
        @media (hover: hover) {
          .trust-marquee:hover .trust-marquee__track {
            animation-play-state: paused;
          }
        }

        /* ── SEAMLESS LOOP KEYFRAMES ─────────────────────────────────── */
        @keyframes trust-marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* ── ITEM STYLING ────────────────────────────────────────────── */
        .trust-marquee__item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 18px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .trust-marquee__icon-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #1A1A2E;
        }

        .trust-marquee__label {
          font-family: 'General Sans', var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.005em;
          color: #1A1A2E;
        }

        /* ── HAIRLINE DIVIDER ────────────────────────────────────────── */
        .trust-marquee__divider {
          width: 1px;
          height: 10px;
          background-color: rgba(26, 26, 46, 0.12);
          flex-shrink: 0;
        }

        /* ── ACCESSIBILITY (PREFERS REDUCED MOTION) ─────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .trust-marquee__track {
            animation: none;
          }
          .trust-marquee {
            overflow-x: auto;
            scrollbar-width: none;
          }
          .trust-marquee::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
