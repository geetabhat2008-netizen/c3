'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
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
          ctx.fillStyle = `rgba(15, 15, 15, ${opacity * 0.4})`
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
    <main className="hero">
      {/* Ambient Sanctuary Atmosphere under Floating Nav Bar */}
      <div className="hero__ambient-sanctuary" aria-hidden="true">
        <Image
          src="/images/lifestyle/hero-sanctuary-ambient.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__ambient-img"
        />
        <div className="hero__ambient-gradient" />
      </div>

      <CanvasBackground />

      <div className="hero__grid">
        <div className="hero__left">
          <motion.p className="hero__eyebrow" {...rise(16, 0.1, 0.55)}>
            <span className="hero__eyebrow-tick" aria-hidden />
            Neurological Environment Management
          </motion.p>

          <h1 className="hero__h1">
            <motion.span className="hero__h1-lead" {...rise(20, 0.2, 0.65)}>
              You&apos;ve tried everything.
            </motion.span>
            <motion.span className="hero__h1-sub" {...rise(20, 0.3, 0.65)}>
              Nothing worked well enough.
            </motion.span>
          </h1>

          <motion.p className="hero__sub" {...rise(14, 0.5, 0.55)}>
            Four neurological mechanisms. One compound protocol. The first migraine
            system that manages conditions, not symptoms.
          </motion.p>

          <motion.div className="hero__ctas" {...rise(10, 0.62, 0.5)}>
            <a href="/products" className="btn hero__cta-primary">Begin the Protocol</a>
            <a href="/science" className="btn btn-ghost hero__cta-ghost">
              Understand the Science <span className="hero__arrow" aria-hidden>→</span>
            </a>
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

      <style>{`
        /* batch 6: hero styles */
        .hero {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: var(--color-bg-primary, #FAFAF9);
          padding-top: var(--nav-height);
          display: flex;
          flex-direction: column;
        }
        .hero__ambient-sanctuary {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 580px;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .hero__ambient-img {
          object-fit: cover;
          object-position: center 22%;
          opacity: 0.84;
          filter: saturate(114%) contrast(103%);
        }
        .hero__ambient-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(250, 250, 249, 0) 0%,
            rgba(250, 250, 249, 0.04) 22%,
            rgba(250, 250, 249, 0.42) 54%,
            rgba(250, 250, 249, 0.92) 82%,
            var(--color-bg-primary, #FAFAF9) 100%
          );
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
          background: radial-gradient(ellipse at 20% 60%, rgba(15, 15, 15, 0.02) 0%, transparent 55%);
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
          font-size: var(--text-mono-xs);
          font-weight: var(--weight-mono-md);
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--color-text-secondary);
          margin-bottom: 24px;
        }
        .hero__eyebrow-tick {
          width: 22px;
          height: 8px;
          margin-right: 12px;
          background: var(--color-text-primary);
          border-radius: 2px;
        }
        .hero__h1 {
          font-family: var(--font-display);
          font-size: var(--text-display-xl);
          line-height: var(--leading-display);
          letter-spacing: var(--tracking-display);
          margin-bottom: 28px;
        }
        .hero__h1-lead {
          display: block;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .hero__h1-sub {
          display: block;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }
        .hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-body-lg);
          font-weight: var(--weight-body);
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: var(--color-text-secondary);
          max-width: 480px;
          margin-bottom: 40px;
        }
        .hero__ctas { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .hero__cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--color-text-primary);
          color: #FAFAF9;
          font-weight: 500;
          min-height: var(--btn-height-lg);
          padding: 0 28px;
          border-radius: 9999px;
          box-shadow: 0 2px 10px rgba(15, 15, 15, 0.12);
          transition: background 200ms var(--ease-out), transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
        }
        .hero__cta-primary:hover {
          background: #2A2A2E;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(15, 15, 15, 0.2);
        }
        .hero__cta-primary:active {
          background: #000000;
          transform: translateY(0);
          box-shadow: none;
        }
        .hero__cta-ghost {
          display: inline-flex;
          align-items: center;
          font-weight: 500;
          letter-spacing: 0.04em;
          min-height: var(--btn-height-lg);
          padding: 0 24px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 15, 15, 0.15);
          background: transparent;
          color: var(--color-text-primary);
          transition: background 200ms var(--ease-out), border-color 200ms var(--ease-out), transform 200ms var(--ease-out);
        }
        .hero__cta-ghost:hover {
          background: rgba(15, 15, 15, 0.04);
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
        }
      `}</style>
    </main>
  )
}
