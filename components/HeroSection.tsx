'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import DissolveBlock from './DissolveBlock'

const EASE: [number, number, number, number] = [0, 0, 0.2, 1]

// 5 phase colors — placeholder avatars until real photos
const AVATAR_COLORS = ['#D2B6F7', '#E596FF', '#F5B061', '#FCD667', '#6FA4FF']

// Phase palette + mechanism labels — the dissolve-block stack (right column).
const PHASES: [string, string][] = [
  ['#D2B6F7', 'Gate Control'],
  ['#E596FF', 'Spectral Filter'],
  ['#F5B061', 'Thermal Vasoconstrict'],
  ['#FCD667', 'Auditory Masking'],
  ['#6FA4FF', 'The Compound Protocol'],
]

const REVIEW_FILTERS = ['All', 'Light', 'Focus', 'Attack', 'Sleep'] as const

const REVIEWS = [
  {
    name: 'K.M.', role: 'Nurse, 34', tenure: 'Week 3', color: '#D2B6F7', tag: 'Light',
    image: '/images/lifestyle/office-glasses.png',
    headline: 'The glasses changed everything about office work.',
    body: "I wear the FL-41 shield from 9am. By 3pm I've stopped doing my usual 'how much longer can I last' math. The sub-visible flicker reduction is real — I can feel it when I take them off.",
  },
  {
    name: 'D.R.', role: 'Marketing Director, 41', tenure: 'Day 18', color: '#E596FF', tag: 'Focus',
    image: '/images/lifestyle/morning-session.png',
    headline: "The massager doesn't feel like much. Until it does.",
    body: "First three sessions I thought I'd wasted $345. Session seven, the pressure behind my eye hadn't arrived by noon. I kept every meeting that Tuesday.",
  },
  {
    name: 'T.B.', role: 'Parent, 38', tenure: 'Week 2', color: '#F5B061', tag: 'Sleep',
    image: '/images/lifestyle/sleep-buds.png',
    headline: 'Brown Noise is not white noise. This matters.',
    body: "I tried white noise apps for years. The sleep buds are different. The low-frequency profile doesn't add to the load. I stopped waking at 2am with pressure by Week 2.",
  },
  {
    name: 'A.S.', role: 'Teacher, 29', tenure: 'Day 12', color: '#FCD667', tag: 'Attack',
    image: '/images/lifestyle/cryo-attack.png',
    headline: 'The cold wrap sequence changed the outcome.',
    body: 'Heat first, then cold. I always did it backwards. The ebook explains why. First time I did it in the right order — the attack never fully arrived.',
  },
  {
    name: 'R.P.', role: 'Researcher, 44', tenure: 'Month 3', color: '#6FA4FF', tag: 'Focus',
    image: '/images/lifestyle/cervical-desk.png',
    headline: 'I was the sceptic in this story.',
    body: "I have a neuroscience background. I expected wellness nonsense. The Gate Control literature is real. I ordered it as an experiment. I'm now on Month 3.",
  },
  {
    name: 'M.L.', role: 'Analyst, 32', tenure: 'Week 6', color: '#D2B6F7', tag: 'Light',
    image: '/images/lifestyle/office-glasses.png',
    headline: 'The 15-minute calibration note saved me from returning it.',
    body: "The glasses looked pink. I almost returned them in 10 minutes. The ebook said to wait. At 12 minutes the tint receded. I've worn them every workday since.",
  },
]

// Faint indigo dot-matrix on cream — breathing pulse + pointer drift.
function CanvasBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) {
      setSupported(false)
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const SPACING = 36
    const RADIUS = 1.2
    let width = 0
    let height = 0
    let time = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = 0

    const resize = () => {
      const parent = canvas.parentElement
      width = parent?.clientWidth ?? window.innerWidth
      height = parent?.clientHeight ?? window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / width - 0.5) * 18
      targetY = (e.clientY / height - 0.5) * 18
    }

    const draw = () => {
      curX += (targetX - curX) * 0.06
      curY += (targetY - curY) * 0.06
      ctx.clearRect(0, 0, width, height)
      const cols = Math.ceil(width / SPACING) + 2
      const rows = Math.ceil(height / SPACING) + 2
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING + curX
          const y = j * SPACING + curY
          const opacity = 0.03 + 0.04 * Math.abs(Math.sin(time + i * 0.4 + j * 0.3))
          ctx.beginPath()
          ctx.arc(x, y, RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(37, 99, 235, ${opacity})`
          ctx.fill()
        }
      }
      time += 0.006
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  if (!supported) return <div className="hero__canvas-fallback" aria-hidden />
  return <canvas ref={ref} className="hero__canvas" aria-hidden />
}

// Overlapping avatars + stars (click → drawer) and static trust signals.
function TrustBar({ onOpen, reduce }: { onOpen: () => void; reduce: boolean | null }) {
  const fade = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.75, duration: 0.45 } }

  return (
    <motion.div className="trustbar" {...fade}>
      <button className="trustbar__reviews" onClick={onOpen} aria-label="Read verified outcomes">
        <span className="trustbar__avatars">
          {AVATAR_COLORS.map((c, i) => (
            <span
              key={c}
              className="trustbar__avatar"
              style={{ background: c, zIndex: 5 - i, marginLeft: i === 0 ? 0 : -10 }}
            />
          ))}
        </span>
        <span className="trustbar__rating">
          <span className="trustbar__stars">★★★★★</span>
          <span className="trustbar__count">4,247 verified outcomes</span>
        </span>
      </button>

      <div className="trustbar__signals">
        <span>Medically Reviewed</span>
        <span aria-hidden>·</span>
        <span>ANSI Z80.1-2025 Certified</span>
        <span aria-hidden>·</span>
        <span>30-Day Protocol Guarantee</span>
      </div>
    </motion.div>
  )
}

// Filterable testimonial carousel. Category pills filter the set; a horizontal
// scroll-snap rail holds photo-topped quote cards with prev/next controls.
function ReviewsCarousel() {
  const [filter, setFilter] = useState<(typeof REVIEW_FILTERS)[number]>('All')
  const railRef = useRef<HTMLDivElement>(null)

  const cards = filter === 'All' ? REVIEWS : REVIEWS.filter((r) => r.tag === filter)

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.min(rail.clientWidth * 0.8, 360)
    rail.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="reviews" aria-label="Verified outcomes">
      <div className="reviews__head">
        <div className="reviews__headtext">
          <h2 className="reviews__title">
            Over 4,000 People,<br />Fewer Lost Days
          </h2>
          <div className="reviews__filters" role="tablist" aria-label="Filter outcomes">
            {REVIEW_FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`reviews__filter${filter === f ? ' is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="reviews__nav">
          <button className="reviews__arrow" onClick={() => scrollBy(-1)} aria-label="Previous outcomes">
            ←
          </button>
          <button className="reviews__arrow" onClick={() => scrollBy(1)} aria-label="Next outcomes">
            →
          </button>
        </div>
      </div>

      <div className="reviews__rail" ref={railRef}>
        {cards.map((r) => (
          <article className="rcard" key={r.name + r.headline}>
            <div className="rcard__media">
              <Image
                src={r.image || '/placeholder.svg'}
                alt=""
                fill
                sizes="(max-width: 767px) 78vw, 320px"
                style={{ objectFit: 'cover' }}
              />
              <span className="rcard__tag" style={{ background: r.color }}>{r.tag}</span>
            </div>
            <div className="rcard__body">
              <span className="rcard__stars">★★★★★</span>
              <h3 className="rcard__headline">{r.headline}</h3>
              <p className="rcard__quote">{r.body}</p>
              <div className="rcard__foot">
                <span className="rcard__name">{r.name}</span>
                <span className="rcard__meta">{r.role} · Verified · {r.tenure}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function HeroSection() {
  const reduce = useReducedMotion()

  const scrollToReviews = () =>
    document.getElementById('testimonials')?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })

  const rise = (y: number, delay: number, duration: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0.01 } }
      : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { delay, duration, ease: EASE } }

  const slideIn = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0.01 } }
    : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3, duration: 0.8, ease: EASE } }

  return (
    <main className="hero has-grid-rules">
      <CanvasBackground />

      <div className="hero__grid">
        <div className="hero__left">
          <motion.p className="hero__eyebrow" {...rise(16, 0.1, 0.55)}>
            <span className="hero__eyebrow-tick" aria-hidden />
            Neurological Environment Management
          </motion.p>

          <h1 className="hero__h1">
            <motion.span {...rise(20, 0.2, 0.65)}>You&apos;ve tried everything.</motion.span>
            <motion.span className="italic" {...rise(20, 0.3, 0.65)}>Nothing&apos;s worked</motion.span>
            <motion.span {...rise(20, 0.4, 0.65)}>well enough.</motion.span>
          </h1>

          <motion.p className="hero__sub" {...rise(14, 0.5, 0.55)}>
            Four neurological mechanisms. One compound protocol. The first migraine
            system that manages conditions — not symptoms.
          </motion.p>

          <motion.div className="hero__ctas" {...rise(10, 0.62, 0.5)}>
            <a href="/products" className="btn hero__cta-primary">Begin the Protocol</a>
            <Link href="/#mechanism" className="btn btn-ghost hero__cta-ghost">
              Understand the Science <span className="hero__arrow" aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div className="hero__right" {...slideIn}>
          <div className="hero__stack">
            {PHASES.map(([color, label]) => (
              <DissolveBlock key={label} color={color} label={label} />
            ))}
          </div>
        </motion.div>
      </div>

      <TrustBar onOpen={scrollToReviews} reduce={reduce} />

      <ReviewsCarousel />

      <style>{`
        /* batch 6: hero styles */
        .hero {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: var(--color-bg);
          padding-top: var(--nav-height);
          display: flex;
          flex-direction: column;
        }
        .hero__canvas,
        .hero__canvas-fallback {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero__canvas-fallback {
          background: radial-gradient(ellipse at 20% 60%, rgba(37, 99, 235, 0.04) 0%, transparent 55%);
        }

        .hero__grid {
          position: relative;
          z-index: 1;
          flex: 1;
          display: grid;
          grid-template-columns: 55fr 45fr;
          align-items: center;
          min-height: calc(100vh - var(--nav-height));
          padding: clamp(24px, 5vh, 64px) var(--padding-page-x) clamp(48px, 9vh, 104px);
        }
        .hero__left { position: relative; z-index: 1; }
        .hero__eyebrow {
          display: flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          margin-bottom: 24px;
        }
        .hero__eyebrow-tick {
          width: 22px;
          height: 9px;
          margin-right: 12px;
          background: var(--color-warm);
          border-radius: 1px;
        }
        .hero__h1 {
          font-family: var(--font-display);
          font-size: clamp(52px, 7.5vw, 96px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.05em;
          color: var(--color-text-primary);
          margin-bottom: 28px;
        }
        .hero__h1 span { display: block; font-style: normal; }
        .hero__h1 .italic { font-style: italic; }
        .hero__sub {
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.65;
          letter-spacing: 0;
          color: var(--color-text-secondary);
          max-width: 460px;
          margin-bottom: 40px;
        }
        .hero__ctas { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .hero__cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--color-text-primary);
          color: var(--color-bg);
          min-height: var(--btn-height-lg);
          padding: 0 26px;
          border-radius: 9999px;
          box-shadow: 0 2px 10px rgba(26, 26, 26, 0.12);
          transition: background 200ms var(--ease-out), transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
        }
        .hero__cta-primary:hover {
          background: var(--color-warm);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(232, 98, 74, 0.3);
        }
        .hero__cta-primary:active {
          background: var(--color-warm-hover);
          transform: translateY(0);
          box-shadow: none;
        }
        .hero__cta-ghost {
          display: inline-flex;
          align-items: center;
          font-weight: 500;
          letter-spacing: 0.1em;
          min-height: var(--btn-height-lg);
          padding: 0 22px;
          border-radius: 9999px;
          border: 1px solid var(--border-default);
          background: transparent;
          color: var(--color-text-primary);
          transition: background 200ms var(--ease-out), border-color 200ms var(--ease-out), transform 200ms var(--ease-out);
        }
        .hero__cta-ghost:hover {
          background: rgba(26, 26, 26, 0.04);
          border-color: var(--color-text-primary);
          transform: translateY(-2px);
        }
        .hero__arrow {
          display: inline-block;
          margin-left: 6px;
          transition: transform 200ms var(--ease-out);
        }
        .hero__cta-ghost:hover .hero__arrow { transform: translateX(4px); }
        .hero__right {
          position: relative;
          height: 100%;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero__stack {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hero__stack > * { width: 100%; }

        .trustbar {
          position: relative;
          z-index: 1;
          height: 56px;
          background: rgba(26, 26, 26, 0.03);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 0 var(--padding-page-x);
        }
        .trustbar__reviews {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .trustbar__reviews:hover { background: rgba(26, 26, 26, 0.04); }
        .trustbar__avatars { display: flex; }
        .trustbar__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--color-bg);
          overflow: hidden;
          transition: transform 240ms var(--ease-out);
        }
        .trustbar__reviews:hover .trustbar__avatar { transform: translateY(-3px); }
        .trustbar__reviews:hover .trustbar__avatar:nth-child(1) { transform: translate(-6px, -3px); }
        .trustbar__reviews:hover .trustbar__avatar:nth-child(2) { transform: translate(-3px, -3px); }
        .trustbar__reviews:hover .trustbar__avatar:nth-child(4) { transform: translate(3px, -3px); }
        .trustbar__reviews:hover .trustbar__avatar:nth-child(5) { transform: translate(6px, -3px); }
        .trustbar__rating { display: flex; align-items: center; gap: 8px; }
        .trustbar__stars {
          color: var(--color-primary);
          font-size: 13px;
          letter-spacing: 1px;
        }
        .trustbar__count {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-secondary);
          letter-spacing: 0.08em;
        }
        .trustbar__signals {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Filterable testimonial carousel */
        .reviews {
          position: relative;
          z-index: 1;
          padding: clamp(56px, 8vw, 88px) 0 clamp(64px, 9vw, 96px);
          background: var(--color-bg);
          border-bottom: 1px solid var(--border-subtle);
        }
        .reviews__head {
          padding: 0 var(--padding-page-x);
          margin-bottom: 32px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .reviews__title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          margin: 0 0 20px;
        }
        .reviews__filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .reviews__filter {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1px solid var(--border-subtle);
          background: transparent;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: background 180ms var(--ease-out), color 180ms var(--ease-out), border-color 180ms var(--ease-out);
        }
        .reviews__filter:hover { background: rgba(26,26,26,0.04); }
        .reviews__filter.is-active {
          background: var(--color-text-primary);
          border-color: var(--color-text-primary);
          color: var(--color-bg);
        }
        .reviews__nav { display: flex; gap: 8px; }
        .reviews__arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-default);
          background: var(--color-surface);
          color: var(--color-text-primary);
          font-size: 16px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 180ms var(--ease-out), transform 180ms var(--ease-out);
        }
        .reviews__arrow:hover { background: var(--color-warm); color: #fff; transform: translateY(-2px); }

        .reviews__rail {
          display: flex;
          gap: 18px;
          padding: 8px var(--padding-page-x) 4px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }
        .reviews__rail::-webkit-scrollbar { display: none; }

        .rcard {
          flex: 0 0 320px;
          width: 320px;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out);
        }
        .rcard:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
        .rcard__media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--color-surface-raised);
        }
        .rcard__tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #1A1A1A;
          padding: 5px 11px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(26,26,26,0.18);
        }
        .rcard__body { display: flex; flex-direction: column; gap: 10px; padding: 20px; flex: 1; }
        .rcard__stars { color: var(--color-primary); font-size: 12px; letter-spacing: 2px; }
        .rcard__headline {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0;
        }
        .rcard__quote {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rcard__foot {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .rcard__name {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-text-primary);
        }
        .rcard__meta {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
        }
        @media (min-width: 768px) {
          /* cascading timeline offsets — echoes the Master Strategy reference */
          .hero__stack > :nth-child(1) { width: 68%; margin-left: 0; }
          .hero__stack > :nth-child(2) { width: 72%; margin-left: 12%; }
          .hero__stack > :nth-child(3) { width: 64%; margin-left: 24%; }
          .hero__stack > :nth-child(4) { width: 70%; margin-left: 14%; }
          .hero__stack > :nth-child(5) { width: 60%; margin-left: 30%; }
        }

        @media (max-width: 767px) {
          .hero {
            padding-top: 100px;
          }
          .hero__grid {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }
          .hero__right {
            min-height: 0;
            margin-top: 40px;
          }
          .hero__ctas { flex-direction: column; align-items: stretch; }
          .hero__ctas .btn { width: 100%; }
          .hero__cta-primary, .hero__cta-ghost { width: 100%; justify-content: center; }
          .trustbar { gap: 0; }
          .trustbar__signals { display: none; }
          .reviews__head { align-items: flex-start; }
          .rcard { flex-basis: 78vw; width: 78vw; }
        }
      `}</style>
    </main>
  )
}
