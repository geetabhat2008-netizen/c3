'use client'

import { useEffect, useRef, useState } from 'react'

const LINKS = ['Science', 'Products', 'Blog']

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  // ponytail: plain scroll listener toggles the island class — no lib needed
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const onScroll = () => el.classList.toggle('nav--island', window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav ref={navRef} className="nav" aria-label="Primary">
      <a href="/" className="nav__logo">CrownCalm</a>

      <div className="nav__links">
        {LINKS.map((l) => (
          <a key={l} href={`/${l.toLowerCase()}`} className="nav__link">{l}</a>
        ))}
      </div>

      <div className="nav__right">
        <button className="nav__cart" aria-label="View cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
        <a href="/products" className="nav__cta btn">Begin the Protocol</a>
        <button className="nav__burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 5h16M2 10h16M2 15h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="nav__overlay" role="dialog" aria-modal="true">
          <button className="nav__close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
          <div className="nav__overlay-links">
            {LINKS.map((l) => (
              <a key={l} href={`/${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
            ))}
          </div>
          <a href="/products" className="nav__overlay-cta btn" onClick={() => setOpen(false)}>
            Begin the Protocol
          </a>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: var(--z-nav);
          /* centered by margin-auto, NOT transform — a transform here would make
             the fixed mobile overlay resolve against the nav box, not the viewport.
             width/max-width are real lengths at BOTH ends so the morph interpolates. */
          width: 100%; max-width: 100%; margin-inline: auto;
          height: var(--nav-height);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 var(--padding-page-x);
          background: transparent; border: 1px solid transparent;
          /* explicit list, never all (it would also tween transform into sideways jank) */
          transition:
            max-width 380ms var(--ease-in-out),
            width 380ms var(--ease-in-out),
            height 380ms var(--ease-in-out),
            top 380ms var(--ease-in-out),
            padding 380ms var(--ease-in-out),
            background 380ms var(--ease-default),
            border-color 380ms var(--ease-default),
            box-shadow 380ms var(--ease-default),
            backdrop-filter 380ms var(--ease-default);
          will-change: max-width, width, height, top;
        }
        .nav--island {
          max-width: var(--nav-island-max-width);
          width: calc(100% - 32px);
          top: 16px;
          height: 52px; padding: 0 10px 0 20px;
          background: var(--nav-island-bg);
          backdrop-filter: blur(var(--nav-island-blur)) saturate(1.3);
          -webkit-backdrop-filter: blur(var(--nav-island-blur)) saturate(1.3);
          border: 1px solid var(--nav-island-border);
          border-radius: var(--radius-island);
          box-shadow: 0 2px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4);
        }
        .nav__logo {
          font-family: var(--font-display); font-size: 16px; font-weight: 400;
          color: var(--color-text-primary); text-decoration: none; letter-spacing: 0;
        }
        .nav__links {
          display: flex; gap: 32px;
          position: absolute; left: 50%; transform: translateX(-50%);
          transition: gap 380ms var(--ease-in-out);
        }
        .nav--island .nav__links { position: static; transform: none; gap: 20px; }
        .nav__link {
          position: relative;
          font-family: var(--font-mono); font-size: 11px; font-weight: 400;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          color: var(--color-text-secondary); transition: color 150ms var(--ease-default);
        }
        .nav__link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 1px;
          background: var(--color-warm); transform: scaleX(0); transform-origin: left;
          transition: transform 200ms var(--ease-out);
        }
        .nav__link:hover { color: var(--color-text-primary); }
        .nav__link:hover::after { transform: scaleX(1); }
        .nav__right { display: flex; align-items: center; gap: var(--gap-base); }
        .nav__cart { display: none; background: none; border: none; padding: 4px; cursor: pointer; color: var(--color-text-secondary); }
        .nav__cart.cart-visible { display: flex; }
        .nav__cart:hover { color: var(--color-text-primary); }
        .nav__cta {
          height: 44px; padding: 0 20px; font-size: 11px; letter-spacing: 0.14em; min-height: 0;
          background: var(--color-text-primary); color: var(--color-bg);
          transition: background 150ms var(--ease-default), transform 150ms var(--ease-out),
                      height 380ms var(--ease-in-out), padding 380ms var(--ease-in-out),
                      font-size 380ms var(--ease-in-out), border-radius 380ms var(--ease-in-out);
        }
        .nav--island .nav__cta {
          height: 34px; padding: 0 16px; font-size: 10px;
          border-radius: 9999px;
        }
        .nav__cta:hover { background: var(--color-warm); color: #fff; transform: translateY(-1px); }
        .nav__cta:active { background: var(--color-warm-hover); transform: translateY(0); }
        .nav__burger { display: none; background: none; border: none; cursor: pointer; color: var(--color-text-primary); padding: 4px; }

        .nav__overlay {
          position: fixed; inset: 0; background: var(--color-bg); z-index: var(--z-toast);
          display: flex; flex-direction: column; padding: var(--padding-page-x);
          animation: navOverlayIn 250ms var(--ease-default);
        }
        @keyframes navOverlayIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .nav__close {
          position: absolute; top: 20px; right: 24px; background: none; border: none;
          font-family: var(--font-mono); font-size: 24px; color: var(--color-text-primary); cursor: pointer;
        }
        .nav__overlay-links { display: flex; flex-direction: column; margin-top: 80px; }
        .nav__overlay-links a {
          font-family: var(--font-display); font-size: 36px; font-weight: 400;
          color: var(--color-text-primary); text-decoration: none;
          height: 72px; display: flex; align-items: center;
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav__overlay-cta {
          margin-top: auto; width: 100%; height: 52px;
          background: var(--color-text-primary); color: var(--color-bg);
        }
        .nav__overlay-cta:hover { background: var(--color-warm); color: #fff; }

        @media (max-width: 767px) {
          .nav {
            max-width: var(--nav-island-max-width); width: calc(100% - 32px);
            top: 16px;
            height: 52px; padding: 0 12px 0 20px;
            background: var(--nav-island-bg);
            backdrop-filter: blur(var(--nav-island-blur)) saturate(1.3);
            -webkit-backdrop-filter: blur(var(--nav-island-blur)) saturate(1.3);
            border: 1px solid var(--nav-island-border);
            border-radius: var(--radius-island);
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          }
          .nav__links, .nav__cta, .nav__cart { display: none; }
          .nav__burger { display: flex; }
        }
      `}</style>
    </nav>
  )
}
