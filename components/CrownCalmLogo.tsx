import React from 'react'

interface CrownCalmLogoProps {
  className?: string
  markSize?: number
  height?: number
  showMark?: boolean
  showWordmark?: boolean
  color?: string
}

/**
 * CrownCalm Engineered SVG Logo System
 * - Minimal Gate Control mark: precision bilateral neural arcs + focal node
 * - Wordmark: "CrownCalm" set in Geist Bold with tight geometric tracking (-0.02em)
 * - Themeable via currentColor (inherits charcoal or cream across light/dark surfaces)
 */
export default function CrownCalmLogo({
  className = '',
  markSize = 22,
  height = 24,
  showMark = true,
  showWordmark = true,
  color = 'currentColor',
}: CrownCalmLogoProps) {
  return (
    <span
      className={`crowncalm-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        color: color,
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {/* ── MINIMAL GATE CONTROL GLYPH (< 24px) ── */}
      {showMark && (
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ flexShrink: 0, display: 'block' }}
        >
          {/* Left Gateway Arc */}
          <path
            d="M7 4.5A9.5 9.5 0 0 0 7 19.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Right Gateway Arc */}
          <path
            d="M17 4.5A9.5 9.5 0 0 1 17 19.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Calibrated Neural Focal Core */}
          <circle cx="12" cy="12" r="2.75" fill="currentColor" />
        </svg>
      )}

      {/* ── GEIST BOLD WORDMARK ── */}
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-display, 'Geist', -apple-system, sans-serif)",
            fontSize: `${height * 0.82}px`,
            fontWeight: 700,
            letterSpacing: '-0.022em',
            color: 'inherit',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          CrownCalm
        </span>
      )}
    </span>
  )
}

/**
 * Standalone Gate Mark SVG for favicons and compact icon contexts
 */
export function CrownCalmMark({ size = 24, color = '#1A1A1A' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 4.5A9.5 9.5 0 0 0 7 19.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M17 4.5A9.5 9.5 0 0 1 17 19.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.75" fill={color} />
    </svg>
  )
}
