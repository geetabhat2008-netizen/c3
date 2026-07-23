'use client'

import { useEffect, useRef } from 'react'

// Bayer 4x4 ordered-dither thresholds (0..1) — gives the clean pixel-art
// checkerboard dissolve, not random noise.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16))

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Brand signature: a solid color rect that dissolves rightward into a dithered
// checkerboard. The dissolve edge flickers like embers/flame — pixels fade in
// and out smoothly. color must be a real hex (canvas can't read CSS vars).
export default function DissolveBlock({
  color,
  label,
  solid = 0.42,
  pixel = 6,
  height = 52,
  animate = true,
}: {
  color: string
  label?: string
  solid?: number // fraction of width that stays solid
  pixel?: number
  height?: number
  animate?: boolean // flame shimmer; falsy → static dither
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const shimmer = animate && !prefersReduced()

    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // t = time in seconds (passed in for reduced-motion determinism)
    const render = (t: number) => {
      if (!w || !h) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      const cols = Math.ceil(w / pixel)
      const rows = Math.ceil(h / pixel)
      for (let i = 0; i < cols; i++) {
        const x = i / cols
        // base coverage: fully solid up to `solid`, then linear ramp to 0
        const base = x <= solid ? 1 : 1 - (x - solid) / (1 - solid)
        for (let j = 0; j < rows; j++) {
          let coverage = base
          if (shimmer && base > 0 && base < 1) {
            // window peaks mid-gradient so only the edge breathes
            const win = 4 * base * (1 - base)
            // two desynced sines + slight upward drift → ember flicker
            const flick =
              Math.sin(t * 2.1 + i * 0.7 + j * 1.3) *
              Math.sin(t * 1.3 - j * 0.6 + i * 1.9)
            coverage = base + flick * 0.22 * win
          }
          if (coverage >= BAYER[j % 4][i % 4]) {
            ctx.fillRect(i * pixel, j * pixel, pixel, pixel)
          }
        }
      }
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (!shimmer) render(0)
    })
    ro.observe(canvas)

    if (shimmer) {
      const loop = (ms: number) => {
        render(ms / 1000)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    } else {
      render(0)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [color, solid, pixel, animate])

  return (
    <div className="dblock" style={{ height }}>
      <canvas ref={ref} className="dblock__canvas" aria-hidden />
      {label && <span className="dblock__label">{label}</span>}
      <style>{`
        .dblock {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 2px;
          transition: transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out);
        }
        .dblock:hover {
          transform: translateX(6px);
          box-shadow: -6px 0 0 0 rgba(26, 26, 26, 0.06);
        }
        .dblock__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          image-rendering: pixelated;
        }
        .dblock__label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          height: 100%;
          padding-left: 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  )
}
