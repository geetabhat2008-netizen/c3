'use client'

import Image from 'next/image'

/* ------------------------------------------------------------------ */
/* DATA — editorial wall: videos (3:4), serif quotes, one dark anchor. */
/* Wire real footage later via videoSrc.                               */
/* ------------------------------------------------------------------ */

type WallItem =
  | {
      kind: 'video'
      name: string
      role: string
      duration: string
      poster: string
    }
  | {
      kind: 'quote'
      quote: string
      name: string
      meta: string
    }
  | {
      kind: 'anchor' /* inverted charcoal pull-quote — the one accent */
      pre: string
      accent: string
      post: string
      name: string
      meta: string
    }
  | {
      kind: 'pull' /* short oversized serif line, no chrome */
      line: string
      name: string
      meta: string
    }

const COLUMNS: WallItem[][] = [
  [
    {
      kind: 'video',
      name: 'Sarah M.',
      role: '9-Year Chronic Sufferer',
      duration: '0:52',
      poster: '/images/lifestyle/morning-session.png',
    },
    {
      kind: 'quote',
      quote:
        'Four migraine-free weeks. I keep waiting for the other shoe to drop and it just… doesn’t. The sequencing chapter alone was worth it.',
      name: 'Katherine W.',
      meta: 'Verified · Mar 2026',
    },
  ],
  [
    {
      kind: 'anchor',
      pre: 'Biggest difference is how fast I catch the prodrome now. The wrap goes on, the glasses go on, and ',
      accent: 'the attack never fully lands.',
      post: '',
      name: 'Jillian L.',
      meta: 'Verified · Feb 2026',
    },
    {
      kind: 'video',
      name: 'Daniel R.',
      role: 'Software Engineer',
      duration: '1:14',
      poster: '/images/lifestyle/office-glasses.png',
    },
  ],
  [
    {
      kind: 'video',
      name: 'Priya N.',
      role: 'ER Nurse · Night Shifts',
      duration: '0:47',
      poster: '/images/lifestyle/cryo-attack.png',
    },
    {
      kind: 'pull',
      line: 'Thirty-one attacks last year. Four this one.',
      name: 'Hannah K.',
      meta: 'Verified · May 2026',
    },
  ],
  [
    {
      kind: 'quote',
      quote:
        'My neurologist asked what changed between visits. That conversation — where the chart looks different — is the whole review.',
      name: 'Rosa M.',
      meta: 'Verified · Apr 2026',
    },
    {
      kind: 'video',
      name: 'Marcus T.',
      role: 'Father of Two · Light-Sensitive',
      duration: '1:02',
      poster: '/images/lifestyle/sleep-buds.png',
    },
    {
      kind: 'quote',
      quote:
        'Skeptical of the price until I did the math on my triptan copays. It paid for itself in a quarter.',
      name: 'Andre T.',
      meta: 'Verified · Jan 2026',
    },
  ],
]

function Stars({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const fill = tone === 'dark' ? '#1A1A1A' : '#F2ECE4'
  /* inline styles — styled-jsx scope does not reach nested components */
  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5px', flexShrink: 0 }}
      aria-label="5 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={fill} aria-hidden="true" style={{ display: 'block' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export default function ReviewsWall() {
  return (
    <section className="rw" aria-label="Customer reviews">
      <div className="rw__container">
        {/* ---- Header ---- */}
        <header className="rw__head">
          <h2 className="rw__h2">
            Member reports from
            <span className="rw__h2-sub">across the 30-day protocol.</span>
          </h2>
          <div className="rw__head-side">
            <p className="rw__agg">
              <span className="rw__agg-score">4.8</span>
              <span className="rw__agg-out">/5</span>
            </p>
            <p className="rw__agg-count">2,143 verified reviews</p>
            <a href="#reviews" className="rw__all">
              Read all reviews →
            </a>
          </div>
        </header>

        {/* ---- Wall ---- */}
        <div className="rw__wall" id="reviews">
          {COLUMNS.map((column, ci) => (
            <div key={ci} className={`rw__col rw__col--${ci + 1}`}>
              {column.map((item) => {
                if (item.kind === 'video') {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className="rw__vcard"
                      aria-label={`Play video testimonial from ${item.name}, ${item.role}`}
                    >
                      <Image
                        src={item.poster}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 50vw, 25vw"
                        className="rw__vposter"
                      />
                      <span className="rw__vscrim" aria-hidden="true" />
                      <span className="rw__vplay" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5-11-6.5z" />
                        </svg>
                      </span>
                      <span className="rw__vwho">
                        <span className="rw__vname">{item.name}</span>
                        <span className="rw__vrole">{item.role}</span>
                      </span>
                      <span className="rw__vduration">{item.duration}</span>
                    </button>
                  )
                }

                if (item.kind === 'anchor') {
                  return (
                    <figure key={item.name} className="rw__anchor">
                      <blockquote className="rw__anchor-text">
                        &ldquo;{item.pre}
                        <em>{item.accent}</em>
                        {item.post}&rdquo;
                      </blockquote>
                      <figcaption className="rw__cred rw__cred--light">
                        <Stars tone="light" />
                        <span className="rw__cred-name">{item.name}</span>
                        <span className="rw__cred-meta">{item.meta}</span>
                      </figcaption>
                    </figure>
                  )
                }

                if (item.kind === 'pull') {
                  return (
                    <figure key={item.name} className="rw__pull">
                      <blockquote className="rw__pull-text">{item.line}</blockquote>
                      <figcaption className="rw__cred">
                        <Stars />
                        <span className="rw__cred-name">{item.name}</span>
                        <span className="rw__cred-meta">{item.meta}</span>
                      </figcaption>
                    </figure>
                  )
                }

                return (
                  <figure key={item.name} className="rw__qcard">
                    <blockquote className="rw__qtext">&ldquo;{item.quote}&rdquo;</blockquote>
                    <figcaption className="rw__cred">
                      <Stars />
                      <span className="rw__cred-name">{item.name}</span>
                      <span className="rw__cred-meta">{item.meta}</span>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rw {
          position: relative;
          padding: clamp(56px, 7vw, 96px) max(20px, 4vw);
          background: var(--color-bg);
        }
        .rw__container {
          max-width: var(--container-max);
          margin: 0 auto;
        }

/* ── HEADER ────────────────────────────────────────────────────── */
        .rw__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: clamp(30px, 4vw, 48px);
        }
        .rw__h2 {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          margin: 0;
        }
        .rw__h2-sub {
          display: block;
          font-style: italic;
          color: var(--color-text-tertiary);
        }
        .rw__head-side {
          flex-shrink: 0;
          text-align: right;
        }
        .rw__agg {
          margin: 0;
          line-height: 1;
        }
        .rw__agg-score {
          font-family: var(--font-display);
          font-size: 44px;
          color: var(--color-text-primary);
        }
        .rw__agg-out {
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--color-text-tertiary);
        }
        .rw__agg-count {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          margin: 8px 0 10px;
        }
        .rw__all {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--color-text-primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(26, 26, 26, 0.35);
          padding-bottom: 2px;
        }
        .rw__all:hover {
          border-bottom-color: var(--color-text-primary);
        }

/* ── WALL ──────────────────────────────────────────────────────── */
        .rw__wall {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          align-items: start;
        }
        .rw__col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }
        .rw__col--2 { margin-top: 48px; }
        .rw__col--3 { margin-top: 16px; }
        .rw__col--4 { margin-top: 64px; }

/* ── VIDEO CARDS ───────────────────────────────────────────────── */
        .rw__vcard {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border: 1px solid rgba(26, 26, 26, 0.1);
          border-radius: 14px;
          padding: 0;
          background: var(--color-surface);
          cursor: pointer;
        }
        .rw__vcard:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 3px;
        }
        .rw__vposter {
          object-fit: cover;
          transition: transform 600ms var(--ease-out);
        }
        .rw__vcard:hover .rw__vposter {
          transform: scale(1.03);
        }
        .rw__vscrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(20, 16, 28, 0.02) 52%, rgba(20, 16, 28, 0.66) 100%);
          pointer-events: none;
        }
        .rw__vplay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          color: #fff;
          background: rgba(20, 16, 28, 0.25);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 50%;
          transition: transform 180ms var(--ease-out), background 180ms var(--ease-out);
        }
        .rw__vplay svg { margin-left: 2px; }
        .rw__vcard:hover .rw__vplay {
          transform: translate(-50%, -50%) scale(1.07);
          background: rgba(20, 16, 28, 0.45);
        }
        .rw__vwho {
          position: absolute;
          left: 16px;
          right: 52px;
          bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          text-align: left;
        }
        .rw__vname {
          font-family: var(--font-display);
          font-size: 19px;
          line-height: 1.1;
          color: #fff;
        }
        .rw__vrole {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
        }
        .rw__vduration {
          position: absolute;
          right: 16px;
          bottom: 16px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.85);
        }

/* ── QUOTE CARDS — flat, hairline, serif ───────────────────────── */
        .rw__qcard {
          margin: 0;
          padding: 24px 24px 20px;
          background: var(--color-surface);
          border: 1px solid rgba(26, 26, 26, 0.1);
          border-radius: 14px;
        }
        .rw__qtext {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--color-text-primary);
          margin: 0 0 18px;
          text-wrap: pretty;
        }

/* ── ANCHOR — inverted charcoal, the one accent ────────────────── */
        .rw__anchor {
          margin: 0;
          padding: 28px 26px 22px;
          background: var(--color-text-primary);
          border-radius: 14px;
        }
        .rw__anchor-text {
          font-family: var(--font-display);
          font-size: clamp(19px, 1.7vw, 23px);
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: var(--color-bg);
          margin: 0 0 22px;
          text-wrap: pretty;
        }
        .rw__anchor-text em {
          font-style: italic;
          color: var(--color-warm);
        }

/* ── PULL — bare oversized line, no card chrome ────────────────── */
        .rw__pull {
          margin: 0;
          padding: 18px 6px 14px;
          border-top: 1px solid rgba(26, 26, 26, 0.22);
          border-bottom: 1px solid rgba(26, 26, 26, 0.22);
        }
        .rw__pull-text {
          font-family: var(--font-display);
          font-size: clamp(21px, 1.9vw, 26px);
          font-style: italic;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0 0 16px;
          text-wrap: balance;
        }

/* ── SHARED ATTRIBUTION ────────────────────────────────────────── */
        .rw__cred {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(26, 26, 26, 0.1);
        }
        .rw__cred--light {
          border-top-color: rgba(242, 236, 228, 0.2);
        }
        .rw__stars {
          display: inline-flex;
          gap: 1.5px;
        }
        .rw__cred-name {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-text-primary);
          white-space: nowrap;
        }
        .rw__cred--light .rw__cred-name {
          color: var(--color-bg);
        }
        .rw__cred-meta {
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          white-space: nowrap;
        }
        .rw__cred--light .rw__cred-meta {
          color: rgba(242, 236, 228, 0.55);
        }
        .rw__pull .rw__cred {
          border-top: none;
          padding-top: 0;
        }

/* ── RESPONSIVE ────────────────────────────────────────────────── */
        @media (max-width: 900px) {
          .rw__head {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }
          .rw__head-side {
            text-align: left;
          }
          .rw__wall {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .rw__col { gap: 12px; }
          .rw__col--2 { margin-top: 32px; }
          .rw__col--3 { margin-top: 0; }
          .rw__col--4 { margin-top: 32px; }
        }
        @media (max-width: 520px) {
          .rw__wall {
            grid-template-columns: 1fr;
          }
          .rw__col--2,
          .rw__col--3,
          .rw__col--4 { margin-top: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rw__vposter,
          .rw__vplay {
            transition: none;
          }
          .rw__vcard:hover .rw__vposter {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
