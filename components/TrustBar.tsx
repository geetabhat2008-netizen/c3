'use client'

import { useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/* DATA — trust/credibility badges                                     */
/* ------------------------------------------------------------------ */

const BADGES = [
  { icon: '⏱', label: '+60m sleep evidence' },
  { icon: '⚕', label: 'Non-Invasive' },
  { icon: '🩺', label: 'Backed by clinicians' },
  { icon: '👥', label: '150k+ users' },
] as const

/* ------------------------------------------------------------------ */
/* COMPONENT — infinite auto-scroll marquee                            */
/* ------------------------------------------------------------------ */

export default function TrustBar() {
  const reduce = useReducedMotion()

  /* Duplicate badges 3× for seamless loop */
  const items = [...BADGES, ...BADGES, ...BADGES]

  return (
    <div className="trust-bar" aria-label="Trust indicators">
      <div className={`trust-bar__track${reduce ? ' trust-bar__track--paused' : ''}`}>
        {items.map((badge, i) => (
          <div key={i} className="trust-bar__item" aria-hidden={i >= BADGES.length}>
            <span className="trust-bar__icon" aria-hidden="true">{badge.icon}</span>
            <span className="trust-bar__label">{badge.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trust-bar {
          position: relative;
          overflow: hidden;
          background: #D2B6F7;
          padding: 18px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.4);
          border-bottom: 1px solid rgba(26, 26, 26, 0.12);
        }

        .trust-bar__track {
          display: flex;
          gap: clamp(48px, 6vw, 80px);
          width: max-content;
          animation: trust-scroll 40s linear infinite;
        }

        .trust-bar__track--paused {
          animation-play-state: paused;
        }

        @keyframes trust-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* scroll exactly one set (4 badges + 3 gaps) */
            transform: translateX(calc(-100% / 3));
          }
        }

        .trust-bar__item {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .trust-bar__icon {
          font-size: 20px;
          line-height: 1;
          filter: grayscale(0.3);
        }

        .trust-bar__label {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(26, 26, 26, 0.85);
        }

        @media (max-width: 640px) {
          .trust-bar {
            padding: 14px 0;
          }
          .trust-bar__track {
            gap: 40px;
          }
          .trust-bar__icon {
            font-size: 18px;
          }
          .trust-bar__label {
            font-size: 11.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-bar__track {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
