'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CrownCalmLogo from './CrownCalmLogo'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'How It Works', href: '/#mechanism' },
  { label: 'The Protocol', href: '/#five-pillars' },
  { label: 'Shop', href: '/products/sanctuary-suite' },
  { label: 'Reviews', href: '/#testimonials' },
]

const SEARCH_SUGGESTIONS = [
  { title: 'The Sanctuary Suite', category: 'Flagship System · 5 Instruments', href: '/products/sanctuary-suite', price: '$345' },
  { title: 'The Sanctuary Protocol', category: '100-page nervous system operating manual', href: '/products/sanctuary-suite', price: 'Included' },
  { title: '360° Cranial NeuroMassager', category: 'Pillar 01 · Pneumatic Relief', href: '/#five-pillars' },
  { title: 'FL-41 Optic Shield', category: 'Pillar 02 · Light Sensitivity', href: '/#five-pillars' },
  { title: 'CryoCore Headband', category: 'Pillar 03 · Cold Vasoconstriction', href: '/#five-pillars' },
  { title: 'Acoustic Silence Sleep Buds', category: 'Pillar 04 · Noise Attenuation', href: '/#five-pillars' },
  { title: 'Cervical Axis Module', category: 'Pillar 05 · Suboccipital Release', href: '/#five-pillars' },
  { title: '30-Day Protocol Guarantee', category: 'Full Protocol Guarantee', href: '/#guarantee' },
  { title: 'HSA / FSA Pre-Tax Eligibility', category: 'Receipts & Coverage', href: '/#faq' },
]

function FlagIcon({ code }: { code: 'USD' | 'CAD' | 'GBP' | 'EUR' }) {
  if (code === 'USD') {
    return (
      <svg width="18" height="13" viewBox="0 0 24 16" className="nav__flag-svg" aria-hidden="true">
        <rect width="24" height="16" fill="#B22234" rx="1.5" />
        <path d="M0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0z" fill="#FFFFFF" />
        <rect width="9.6" height="8.6" fill="#3C3B6E" rx="1" />
        <circle cx="2.4" cy="2.2" r="0.6" fill="#FFFFFF" />
        <circle cx="4.8" cy="2.2" r="0.6" fill="#FFFFFF" />
        <circle cx="7.2" cy="2.2" r="0.6" fill="#FFFFFF" />
        <circle cx="3.6" cy="4.3" r="0.6" fill="#FFFFFF" />
        <circle cx="6.0" cy="4.3" r="0.6" fill="#FFFFFF" />
        <circle cx="2.4" cy="6.4" r="0.6" fill="#FFFFFF" />
        <circle cx="4.8" cy="6.4" r="0.6" fill="#FFFFFF" />
        <circle cx="7.2" cy="6.4" r="0.6" fill="#FFFFFF" />
      </svg>
    )
  }
  if (code === 'CAD') {
    return (
      <svg width="18" height="13" viewBox="0 0 24 16" className="nav__flag-svg" aria-hidden="true">
        <rect width="24" height="16" fill="#FF0000" rx="1.5" />
        <rect x="6" width="12" height="16" fill="#FFFFFF" />
        <path d="M12 4l1 3 2-1-1 3 3 1-3 1 1 3-2-1-1 3-1-3-2 1 1-3-3-1 3-1-1-3 2 1z" fill="#FF0000" />
      </svg>
    )
  }
  if (code === 'GBP') {
    return (
      <svg width="18" height="13" viewBox="0 0 24 16" className="nav__flag-svg" aria-hidden="true">
        <rect width="24" height="16" fill="#012169" rx="1.5" />
        <path d="M0 0l24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M12 0v16M0 8h24" stroke="#FFFFFF" strokeWidth="4.5" />
        <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2.5" />
      </svg>
    )
  }
  return (
    <svg width="18" height="13" viewBox="0 0 24 16" className="nav__flag-svg" aria-hidden="true">
      <rect width="24" height="16" fill="#003399" rx="1.5" />
      <circle cx="12" cy="8" r="4.5" fill="none" stroke="#FFCC00" strokeWidth="1" strokeDasharray="1.5 1.5" />
    </svg>
  )
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountTab, setAccountTab] = useState<'signup' | 'signin'>('signup')
  const [isAttached, setIsAttached] = useState(false)
  const [currency, setCurrency] = useState<'USD' | 'CAD' | 'GBP' | 'EUR'>('USD')
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  // Account form state
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [authSuccessMsg, setAuthSuccessMsg] = useState('')

  // Cart state
  const [suiteQty, setSuiteQty] = useState(1)
  const [protocolQty, setProtocolQty] = useState(0)
  const totalCartCount = suiteQty + protocolQty
  const subtotal = suiteQty * 345 + protocolQty * 97

  // Listen to add-to-cart events across the site
  useEffect(() => {
    const handleAddCart = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.item === 'protocol') {
        setProtocolQty((prev) => prev + 1)
      } else {
        setSuiteQty((prev) => prev + 1)
      }
      setCartOpen(true)
    }

    window.addEventListener('crowncalm:add-cart', handleAddCart)
    return () => window.removeEventListener('crowncalm:add-cart', handleAddCart)
  }, [])

  // ── Eight Sleep pattern: Floating translucent pill at top -> Attached solid full-width when scrolled ──
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) return

      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = Math.max(0, window.scrollY || window.pageYOffset)
        // Attach to top when scrolled past 25px; detach back to floating pill when scrolled to top
        if (currentScrollY > 25) {
          setIsAttached(true)
        } else if (currentScrollY <= 15) {
          setIsAttached(false)
        }
        rafIdRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    const initialScrollY = Math.max(0, window.scrollY || window.pageYOffset)
    if (initialScrollY > 25) {
      setIsAttached(true)
    }

    // Close currency dropdown on global click
    const handleGlobalClick = () => setCurrencyOpen(false)
    window.addEventListener('click', handleGlobalClick)

    // Restore saved user if any in localStorage
    try {
      const savedUser = localStorage.getItem('crowncalm_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleGlobalClick)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  // Lock body scroll + handle Escape for mobile menu, cart drawer, account modal, and search modal
  useEffect(() => {
    const anyOpen = open || cartOpen || accountOpen || searchOpen
    const prevOverflow = document.body.style.overflow
    if (anyOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setCartOpen(false)
        setAccountOpen(false)
        setSearchOpen(false)
        setCurrencyOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, cartOpen, accountOpen, searchOpen])

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (accountTab === 'signup') {
      const newUser = {
        name: nameInput.trim() || 'Sanctuary Member',
        email: emailInput.trim() || 'member@crowncalm.com',
      }
      setUser(newUser)
      try {
        localStorage.setItem('crowncalm_user', JSON.stringify(newUser))
      } catch { }
      setAuthSuccessMsg('Account created successfully! Welcome to CrownCalm.')
    } else {
      const existingUser = {
        name: emailInput.split('@')[0] || 'Sanctuary Member',
        email: emailInput.trim() || 'member@crowncalm.com',
      }
      setUser(existingUser)
      try {
        localStorage.setItem('crowncalm_user', JSON.stringify(existingUser))
      } catch { }
      setAuthSuccessMsg('Welcome back to your Sanctuary Protocol.')
    }

    setTimeout(() => {
      setAuthSuccessMsg('')
      setAccountOpen(false)
    }, 1200)
  }

  const handleSignOut = () => {
    setUser(null)
    try {
      localStorage.removeItem('crowncalm_user')
    } catch { }
    setAccountOpen(false)
  }

  return (
    <>
      {/* ── 1. ANNOUNCEMENT BAR (TOP: 0, STICKY AT ALL TIMES) ── */}
      <aside className="announcement-bar" aria-label="Special Offer">
        <div className="announcement-bar__inner">
          <a href="/products/sanctuary-suite" className="announcement-bar__link">
            <span className="announcement-bar__text announcement-bar__text--full">
              THE 30-DAY PROTOCOL GUARANTEE · FREE SHIPPING ON THE SANCTUARY SUITE
            </span>
            <span className="announcement-bar__text announcement-bar__text--short">
              THE 30-DAY PROTOCOL GUARANTEE · FREE SHIPPING
            </span>
            <span className="announcement-bar__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </aside>

      {/* ── 2. THERABODY-STYLE NAVIGATION (THREE-ZONE HORIZONTAL SPLIT) ── */}
      <nav
        ref={navRef}
        className={`nav-bar ${isAttached ? 'nav-bar--attached' : 'nav-bar--floating'}`}
        aria-label="Primary"
      >
        <div className="nav-inner">
          {/* Zone 1 — Logo (far left, sits alone with clear space around it) */}
          <div className="nav-left">
            <a href="/" className="nav-logo" aria-label="CrownCalm Home">
              <CrownCalmLogo markSize={21} height={21} />
            </a>
          </div>

          {/* Zone 2 — Nav links (centered as a group) */}
          <div className="nav-center" role="navigation" aria-label="Main Navigation">
            <div className="nav__links-group">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="nav__link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Zone 3 — Icons (far right, tight group) */}
          <div className="nav-right">
            {/* Search Icon (20px, Navy stroke #1A1A2E) */}
            <button
              type="button"
              className="nav__icon-btn nav__icon-btn--search"
              onClick={() => setSearchOpen(true)}
              aria-label="Search CrownCalm"
              title="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Account Icon (20px, Navy stroke person outline) */}
            <button
              type="button"
              className="nav__icon-btn nav__icon-btn--account"
              onClick={() => {
                setAccountTab('signin')
                setAccountOpen(true)
              }}
              aria-label={user ? `Account: ${user.name}` : 'Member Account'}
              title={user ? `Signed in as ${user.name}` : 'Member Account'}
            >
              {user ? (
                <span className="nav__avatar-badge">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </button>

            {/* Region / Flag Selector (Icon-only + tiny chevron) */}
            <div className="nav__currency-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="nav__icon-btn nav__icon-btn--region"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                aria-label="Change currency / region"
                aria-expanded={currencyOpen}
                title={`Currency: ${currency}`}
              >
                <span className="nav__flag">
                  <FlagIcon code={currency} />
                </span>
                <svg width="8" height="5" viewBox="0 0 10 6" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="nav__caret-svg">
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>

              {currencyOpen && (
                <div className="nav__currency-dropdown" role="menu">
                  <button
                    type="button"
                    className={`nav__currency-opt ${currency === 'USD' ? 'active' : ''}`}
                    onClick={() => { setCurrency('USD'); setCurrencyOpen(false); }}
                  >
                    <FlagIcon code="USD" />
                    <span>USD ($)</span>
                  </button>
                  <button
                    type="button"
                    className={`nav__currency-opt ${currency === 'CAD' ? 'active' : ''}`}
                    onClick={() => { setCurrency('CAD'); setCurrencyOpen(false); }}
                  >
                    <FlagIcon code="CAD" />
                    <span>CAD ($)</span>
                  </button>
                  <button
                    type="button"
                    className={`nav__currency-opt ${currency === 'GBP' ? 'active' : ''}`}
                    onClick={() => { setCurrency('GBP'); setCurrencyOpen(false); }}
                  >
                    <FlagIcon code="GBP" />
                    <span>GBP (£)</span>
                  </button>
                  <button
                    type="button"
                    className={`nav__currency-opt ${currency === 'EUR' ? 'active' : ''}`}
                    onClick={() => { setCurrency('EUR'); setCurrencyOpen(false); }}
                  >
                    <FlagIcon code="EUR" />
                    <span>EUR (€)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button with Count Badge */}
            <button
              type="button"
              className="nav__icon-btn nav__icon-btn--cart"
              onClick={() => setCartOpen(true)}
              aria-label={`View cart (${totalCartCount} items)`}
              title="View Cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A1A2E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1.2" />
                <circle cx="19" cy="20" r="1.2" />
                <path d="M1 1h3.5l2.4 12a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 5H5.2" />
              </svg>
              {totalCartCount > 0 && (
                <span className="nav__cart-badge" aria-label={`${totalCartCount} items in cart`}>
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              type="button"
              className="nav__burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── SEARCH MODAL OVERLAY ────────────────────────────────────────── */}
      {searchOpen && (
        <div className="nav__search-modal" role="dialog" aria-modal="true" aria-label="Search Site">
          <div className="nav__search-backdrop" onClick={() => setSearchOpen(false)} />
          <div className="nav__search-panel">
            <div className="nav__search-input-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="nav__search-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder="Search the Sanctuary Protocol, instruments, science..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nav__search-field"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="nav__search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className="nav__search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            <div className="nav__search-results">
              <p className="nav__search-eyebrow">
                {searchQuery ? `Matching Results for "${searchQuery}"` : 'Quick Navigation & Suggestions'}
              </p>
              <div className="nav__search-list">
                {SEARCH_SUGGESTIONS
                  .filter((item) => !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="nav__search-item"
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="nav__search-item-info">
                        <span className="nav__search-item-title">{item.title}</span>
                        <span className="nav__search-item-cat">{item.category}</span>
                      </div>
                      {item.price && <span className="nav__search-item-price">{item.price}</span>}
                      <span className="nav__search-item-arrow" aria-hidden="true">→</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE OVERLAY MENU ────────────────────────────────────────── */}
      {open && (
        <div className="nav__overlay" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="nav__overlay-backdrop" onClick={() => setOpen(false)} />
          <div className="nav__overlay-panel">
            <div className="nav__overlay-header">
              <a href="/" className="nav__logo" onClick={() => setOpen(false)}>
                <CrownCalmLogo markSize={20} height={20} />
              </a>
              <button
                type="button"
                className="nav__close-btn"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links Stack — 48px height minimum per row */}
            <div className="nav__overlay-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav__overlay-link"
                  onClick={() => setOpen(false)}
                >
                  <span>{link.label}</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M7 4l6 6-6 6" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Mobile Account and Region in Drawer */}
            <div className="nav__overlay-meta">
              <button
                type="button"
                className="nav__overlay-meta-btn"
                onClick={() => {
                  setOpen(false)
                  setAccountTab('signin')
                  setAccountOpen(true)
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{user ? `Account (${user.name})` : 'Member Sign In'}</span>
              </button>

              <div className="nav__overlay-currency-row">
                <span className="nav__overlay-currency-label">Region:</span>
                <div className="nav__overlay-currency-chips">
                  {(['USD', 'CAD', 'GBP', 'EUR'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`nav__overlay-chip ${currency === c ? 'is-active' : ''}`}
                      onClick={() => setCurrency(c)}
                    >
                      <FlagIcon code={c} />
                      <span>{c}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav__overlay-footer">
              <div className="nav__overlay-trust">
                <span>✓ HSA/FSA Pre-Tax Eligible</span>
                <span>✓ 30-Day Guarantee</span>
              </div>
              <a
                href="/products/sanctuary-suite"
                className="nav__overlay-cta btn"
                onClick={() => setOpen(false)}
              >
                Begin the Protocol — $345
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── ACCOUNT SIGN UP / LOGIN MODAL ──────────────────────────────── */}
      {accountOpen && (
        <div className="nav__modal-wrap" role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
          <div className="nav__modal-backdrop" onClick={() => setAccountOpen(false)} />
          <div className="nav__modal-card">
            <button
              type="button"
              className="nav__modal-close"
              onClick={() => setAccountOpen(false)}
              aria-label="Close Account Dialog"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {user ? (
              /* Signed In Profile View */
              <div className="nav__account-profile">
                <div className="nav__avatar-large">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 id="account-modal-title" className="nav__modal-title">
                  Sanctuary Member Portal
                </h3>
                <p className="nav__profile-email">{user.email}</p>
                <div className="nav__profile-badge">Active Protocol Member · Tier 1</div>

                <div className="nav__profile-features">
                  <div className="nav__profile-feat-row">
                    <span className="nav__feat-icon">⚡</span>
                    <div>
                      <strong>30-Day Calibration Log</strong>
                      <p>Session data and response curves active</p>
                    </div>
                  </div>
                  <div className="nav__profile-feat-row">
                    <span className="nav__feat-icon">🧾</span>
                    <div>
                      <strong>HSA/FSA Itemized Receipts</strong>
                      <p>Instant PDF download for reimbursement</p>
                    </div>
                  </div>
                  <div className="nav__profile-feat-row">
                    <span className="nav__feat-icon">🩺</span>
                    <div>
                      <strong>Direct Protocol Advisory</strong>
                      <p>Priority communication channel open</p>
                    </div>
                  </div>
                </div>

                <div className="nav__profile-actions">
                  <a
                    href="/products/sanctuary-suite"
                    className="nav__modal-btn btn"
                    onClick={() => setAccountOpen(false)}
                  >
                    View Suite Order Status
                  </a>
                  <button
                    type="button"
                    className="nav__modal-btn-sec"
                    onClick={handleSignOut}
                  >
                    Sign Out of Sanctuary
                  </button>
                </div>
              </div>
            ) : (
              /* Sign Up / Sign In Form View */
              <div className="nav__account-form-wrap">
                <div className="nav__modal-header">
                  <span className="nav__modal-eyebrow">CrownCalm Sanctuary</span>
                  <h3 id="account-modal-title" className="nav__modal-title">
                    {accountTab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                  </h3>
                  <p className="nav__modal-sub">
                    {accountTab === 'signup'
                      ? 'Unlock your personal calibration logs, HSA/FSA itemized receipts, and protocol updates.'
                      : 'Sign in to access your calibration schedule and order management.'}
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="nav__auth-tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={accountTab === 'signup'}
                    className={`nav__auth-tab ${accountTab === 'signup' ? 'nav__auth-tab--active' : ''}`}
                    onClick={() => setAccountTab('signup')}
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={accountTab === 'signin'}
                    className={`nav__auth-tab ${accountTab === 'signin' ? 'nav__auth-tab--active' : ''}`}
                    onClick={() => setAccountTab('signin')}
                  >
                    Sign In
                  </button>
                </div>

                {authSuccessMsg ? (
                  <div className="nav__auth-success">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{authSuccessMsg}</span>
                  </div>
                ) : (
                  <form onSubmit={handleAuthSubmit} className="nav__auth-form">
                    {accountTab === 'signup' && (
                      <div className="nav__form-group">
                        <label htmlFor="auth-name">Full Name</label>
                        <input
                          id="auth-name"
                          type="text"
                          required
                          placeholder="e.g. Dr. Eleanor Vance"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="nav__form-input"
                        />
                      </div>
                    )}

                    <div className="nav__form-group">
                      <label htmlFor="auth-email">Email Address</label>
                      <input
                        id="auth-email"
                        type="email"
                        required
                        placeholder="name@sanctuary.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="nav__form-input"
                      />
                    </div>

                    <div className="nav__form-group">
                      <label htmlFor="auth-pass">Password</label>
                      <input
                        id="auth-pass"
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={passInput}
                        onChange={(e) => setPassInput(e.target.value)}
                        className="nav__form-input"
                      />
                    </div>

                    {accountTab === 'signup' && (
                      <div className="nav__signup-perks">
                        <span>✓ Instant Protocol Ebook link</span>
                        <span>✓ HSA/FSA claim verification</span>
                      </div>
                    )}

                    <button type="submit" className="nav__modal-btn btn">
                      {accountTab === 'signup' ? 'Create Sanctuary Account' : 'Sign In'}
                    </button>

                    <div className="nav__auth-divider">
                      <span>or continue with</span>
                    </div>

                    <div className="nav__social-btns">
                      <button
                        type="button"
                        className="nav__social-btn"
                        onClick={() => {
                          const mockUser = { name: 'Apple Sanctuary Member', email: 'member@icloud.com' }
                          setUser(mockUser)
                          try {
                            localStorage.setItem('crowncalm_user', JSON.stringify(mockUser))
                          } catch { }
                          setAccountOpen(false)
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                        </svg>
                        <span>Apple</span>
                      </button>

                      <button
                        type="button"
                        className="nav__social-btn"
                        onClick={() => {
                          const mockUser = { name: 'Google Sanctuary Member', email: 'member@gmail.com' }
                          setUser(mockUser)
                          try {
                            localStorage.setItem('crowncalm_user', JSON.stringify(mockUser))
                          } catch { }
                          setAccountOpen(false)
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.48 10.9v3.26h7.62c-.31 1.76-1.85 5.16-7.62 5.16-4.59 0-8.33-3.79-8.33-8.47s3.74-8.47 8.33-8.47c2.61 0 4.36 1.11 5.36 2.07l2.58-2.48C16.78 2.37 14.81 1.5 12.48 1.5 6.69 1.5 2 6.2 2 12s4.69 10.5 10.48 10.5c6.05 0 10.05-4.25 10.05-10.23 0-.69-.07-1.21-.16-1.73H12.48z" />
                        </svg>
                        <span>Google</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CART SLIDEOUT DRAWER ────────────────────────────────────────── */}
      {cartOpen && (
        <div className="nav__drawer-wrap" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
          <div className="nav__drawer-backdrop" onClick={() => setCartOpen(false)} />
          <div className="nav__drawer-panel">
            <div className="nav__drawer-header">
              <div className="nav__drawer-title-row">
                <h3 id="cart-drawer-title" className="nav__drawer-title">
                  Your Protocol Cart
                </h3>
                <span className="nav__drawer-count-badge">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                type="button"
                className="nav__drawer-close"
                onClick={() => setCartOpen(false)}
                aria-label="Close Cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Cart Body */}
            <div className="nav__drawer-body">
              {totalCartCount > 0 ? (
                <>
                  {suiteQty > 0 && (
                    <div className="nav__cart-item-card">
                      <div className="nav__cart-item-thumb">
                        <Image
                          src="/images/products/suite-hero.png"
                          alt="The Sanctuary Suite"
                          width={80}
                          height={80}
                          className="nav__cart-img"
                        />
                      </div>

                      <div className="nav__cart-item-details">
                        <div className="nav__cart-item-title-row">
                          <h4 className="nav__cart-item-name">The Sanctuary Suite</h4>
                          <span className="nav__cart-item-price">${345 * suiteQty}</span>
                        </div>

                        <p className="nav__cart-item-sub">
                          5 Neurological Instruments · 1 Compound Protocol
                        </p>
                        <p className="nav__cart-item-bonus">
                          + Includes The Sanctuary Protocol Manual ($97 Value Free)
                        </p>

                        <div className="nav__cart-qty-row">
                          <div className="nav__cart-stepper" role="group" aria-label="Item quantity">
                            <button
                              type="button"
                              onClick={() => setSuiteQty((q) => Math.max(0, q - 1))}
                              aria-label="Decrease quantity"
                              className="nav__stepper-btn"
                            >
                              −
                            </button>
                            <span className="nav__stepper-val">{suiteQty}</span>
                            <button
                              type="button"
                              onClick={() => setSuiteQty((q) => Math.min(9, q + 1))}
                              aria-label="Increase quantity"
                              className="nav__stepper-btn"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="nav__cart-remove"
                            onClick={() => setSuiteQty(0)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {protocolQty > 0 && (
                    <div className="nav__cart-item-card">
                      <div className="nav__cart-item-thumb" style={{ background: '#F4EFEB' }}>
                        <Image
                          src="/images/products/protocol-manual-thumb.svg"
                          alt="The Sanctuary Protocol"
                          width={80}
                          height={80}
                          className="nav__cart-img"
                        />
                      </div>

                      <div className="nav__cart-item-details">
                        <div className="nav__cart-item-title-row">
                          <h4 className="nav__cart-item-name">The Sanctuary Protocol</h4>
                          <span className="nav__cart-item-price">${97 * protocolQty}</span>
                        </div>

                        <p className="nav__cart-item-sub">
                          100-page nervous system operating manual — instant digital delivery
                        </p>
                        <p className="nav__cart-item-bonus" style={{ color: '#2563EB' }}>
                          ✓ 100% of $97 credited toward Suite hardware within 30 days
                        </p>

                        <div className="nav__cart-qty-row">
                          <div className="nav__cart-stepper" role="group" aria-label="Item quantity">
                            <button
                              type="button"
                              onClick={() => setProtocolQty((q) => Math.max(0, q - 1))}
                              aria-label="Decrease quantity"
                              className="nav__stepper-btn"
                            >
                              −
                            </button>
                            <span className="nav__stepper-val">{protocolQty}</span>
                            <button
                              type="button"
                              onClick={() => setProtocolQty((q) => Math.min(9, q + 1))}
                              aria-label="Increase quantity"
                              className="nav__stepper-btn"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="nav__cart-remove"
                            onClick={() => setProtocolQty(0)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="nav__cart-empty">
                  <div className="nav__empty-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <h4>Your cart is empty</h4>
                  <p>Begin your compound protocol with the complete Sanctuary Suite or start with the Protocol manual.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '12px' }}>
                    <button
                      type="button"
                      className="nav__cart-add-btn btn"
                      onClick={() => setSuiteQty(1)}
                    >
                      Add Sanctuary Suite ($345)
                    </button>
                    <button
                      type="button"
                      className="nav__cart-add-btn btn"
                      style={{ background: '#FAF5EE', color: '#1A1A1A', border: '1.5px solid #1A1A1A' }}
                      onClick={() => setProtocolQty(1)}
                    >
                      Add The Sanctuary Protocol ($97)
                    </button>
                  </div>
                </div>
              )}

              {/* Trust Guarantees */}
              <div className="nav__cart-guarantees">
                <div className="nav__guarantee-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4503A" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v6M9 11h6" />
                  </svg>
                  <div>
                    <strong>100% HSA &amp; FSA Eligible</strong>
                    <p>Itemized receipts generated upon order</p>
                  </div>
                </div>

                <div className="nav__guarantee-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4503A" strokeWidth="1.8">
                    <path d="M1 8h13v9H1z" />
                    <path d="M14 11h4l3 3v3h-7v-6z" />
                    <circle cx="5.5" cy="18.5" r="1.8" />
                    <circle cx="17.5" cy="18.5" r="1.8" />
                  </svg>
                  <div>
                    <strong>{suiteQty > 0 ? 'Free 2-Day Insured US Shipping' : 'Instant Digital Delivery Link'}</strong>
                    <p>{suiteQty > 0 ? 'Discreet eco-packaging delivered to your door' : 'PDF, ePub & audio companions sent to email'}</p>
                  </div>
                </div>

                <div className="nav__guarantee-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4503A" strokeWidth="1.8">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <strong>30-Day Protocol Guarantee</strong>
                    <p>Complete calibration trial with 100% money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Footer */}
            {totalCartCount > 0 && (
              <div className="nav__drawer-footer">
                <div className="nav__drawer-summary">
                  <div className="nav__sum-line">
                    <span>Subtotal</span>
                    <span>${subtotal}.00</span>
                  </div>
                  <div className="nav__sum-line">
                    <span>Delivery</span>
                    <span className="nav__free-tag">
                      {suiteQty > 0 ? 'FREE 2-DAY US' : 'INSTANT DIGITAL'}
                    </span>
                  </div>
                  <div className="nav__sum-total">
                    <span>Total</span>
                    <span>${subtotal}.00</span>
                  </div>
                </div>

                <a
                  href="/products/sanctuary-suite"
                  className="nav__drawer-checkout btn"
                  onClick={() => setCartOpen(false)}
                >
                  <span>Checkout — ${subtotal}</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M4 10h12M11 5l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STYLES ──────────────────────────────────────────────────────── */}
      <style>{`
        /* ── 1. ANNOUNCEMENT BAR (TOP: 0, HEIGHT: 36px, Z-INDEX: 50, PERMANENTLY STICKY) ── */
        .announcement-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 36px;
          z-index: 50;
          background: var(--color-announcement-bar, #4B617A);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-sizing: border-box;
        }

        .announcement-bar__inner {
          width: 100%;
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .announcement-bar__link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #FFFFFF;
          text-decoration: none;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: opacity 160ms ease, color 160ms ease;
        }

        .announcement-bar__link:hover {
          color: #FFFFFF;
          opacity: 0.92;
        }

        .announcement-bar__arrow {
          display: inline-block;
          font-size: 13px;
          line-height: 1;
          transition: transform 160ms ease;
        }

        .announcement-bar__link:hover .announcement-bar__arrow {
          transform: translateX(3px);
        }

        .announcement-bar__text--short {
          display: none;
        }

        /* ── 2. THERABODY-STYLE NAVIGATION BAR (TOP: 36px, HEIGHT: 72px, Z-INDEX: 49) ── */
        .nav-bar {
          position: fixed;
          z-index: 49;
          left: 0;
          top: 36px;
          width: 100%;
          height: 72px;
          box-sizing: border-box;
          transform: none;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E0D5;
          transition:
            background 200ms ease,
            border-color 200ms ease,
            box-shadow 200ms ease;
        }

        /* STATE 1: TOP UNSCROLLED STATE */
        .nav-bar--floating {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid #E5E0D5;
          box-shadow: none;
        }

        /* STATE 2: ATTACHED FIXED TO TOP: 36px (Sticky Scrolled) */
        .nav-bar--attached {
          background: #FFFFFF;
          border-bottom: 1px solid #E5E0D5;
          box-shadow: 0 2px 10px rgba(26, 26, 46, 0.04);
        }

        /* ── 3. CSS GRID 3-ZONE LAYOUT ── */
        .nav-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
          max-width: 1440px;
          height: 100%;
          margin: 0 auto;
          padding: 0 40px;
          box-sizing: border-box;
        }

        /* Zone 1 — Logo (far left, clear space around it) */
        .nav-left {
          grid-column: 1;
          justify-self: start;
          display: flex;
          align-items: center;
        }

        .nav-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          color: #1A1A2E;
          transition: opacity 160ms ease;
        }

        .nav-logo:hover {
          opacity: 0.82;
        }

        /* Zone 2 — Nav links (centered as a group) */
        .nav-center {
          grid-column: 2;
          justify-self: center;
          display: flex;
          align-items: center;
        }

        .nav__links-group {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav__link {
          position: relative;
          font-family: var(--font-general-sans, 'General Sans', var(--font-body), sans-serif);
          font-size: 15px;
          font-weight: 500;
          color: rgba(26, 26, 46, 0.85);
          text-decoration: none;
          padding: 8px 0;
          white-space: nowrap;
          text-transform: none;
          transition: opacity 150ms ease;
        }

        .nav__link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #1A1A2E;
          opacity: 0;
          transform: translateY(2px);
          transition: opacity 150ms ease, transform 150ms ease;
        }

        .nav__link:hover::after,
        .nav__link.is-active::after {
          opacity: 1;
          transform: translateY(0);
        }

        /* Zone 3 — Icons (far right, tight group) */
        .nav-right {
          grid-column: 3;
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }

        /* Minimal icon button utility */
        .nav__icon-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          padding: 0;
          color: #1A1A2E;
          cursor: pointer;
          border-radius: 50%;
          transition: background-color 150ms ease, transform 150ms ease;
        }

        .nav__icon-btn:hover {
          background-color: rgba(26, 26, 46, 0.06);
          transform: translateY(-1px);
        }

        .nav__icon-btn:active {
          transform: translateY(0);
        }

        .nav__avatar-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1A1A2E;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
        }

        /* Currency Selector */
        .nav__currency-wrap {
          position: relative;
        }

        .nav__icon-btn--region {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          width: auto;
          height: 36px;
          padding: 0 6px;
          border-radius: 6px;
        }

        .nav__flag {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }

        .nav__flag-svg {
          display: block;
          border-radius: 1.5px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .nav__caret-svg {
          display: block;
          color: #1A1A2E;
          margin-top: 1px;
        }

        .nav__currency-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 135px;
          z-index: 100;
          animation: dropIn 180ms ease;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav__currency-opt {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 8px 10px;
          border-radius: 6px;
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 12px;
          font-weight: 500;
          color: #1A1A2E;
          cursor: pointer;
          transition: background 120ms ease;
        }

        .nav__currency-opt:hover {
          background: #F5F0E8;
        }

        .nav__currency-opt.active {
          font-weight: 600;
          background: #EBE4DB;
        }

        /* Cart Badge */
        .nav__cart-badge {
          position: absolute;
          top: 1px;
          right: -1px;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          border-radius: 9999px;
          background: #1A1A2E;
          color: #FFFFFF;
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        /* ── BURGER MENU BUTTON ── */
        .nav__burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #1A1A2E;
          padding: 6px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          transition: background-color 150ms ease;
        }

        .nav__burger:hover {
          background-color: rgba(26, 26, 46, 0.06);
        }

        /* ── SEARCH MODAL ── */
        .nav__search-modal {
          position: fixed;
          inset: 0;
          z-index: 10001;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 72px 20px 20px;
          animation: navFadeIn 180ms ease;
        }

        .nav__search-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 46, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .nav__search-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 640px;
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 16px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.16);
          overflow: hidden;
          margin-top: 24px;
          animation: searchSlideDown 200ms ease;
        }

        @keyframes searchSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav__search-input-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid #EAE5DC;
          background: #FAFAF9;
        }

        .nav__search-field {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 15px;
          color: #1A1A2E;
          outline: none;
        }

        .nav__search-field::placeholder {
          color: #8E8E93;
        }

        .nav__search-clear {
          background: none;
          border: none;
          color: #8E8E93;
          font-size: 14px;
          cursor: pointer;
          padding: 4px;
        }

        .nav__search-close {
          background: #EAE5DC;
          border: none;
          color: #555555;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .nav__search-results {
          padding: 16px 20px 24px;
          max-height: 420px;
          overflow-y: auto;
        }

        .nav__search-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8E8E93;
          margin: 0 0 12px;
        }

        .nav__search-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav__search-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          background: transparent;
          transition: background-color 140ms ease;
        }

        .nav__search-item:hover {
          background: #F5F0E8;
        }

        .nav__search-item-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav__search-item-title {
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 14.5px;
          font-weight: 500;
          color: #1A1A2E;
        }

        .nav__search-item-cat {
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          color: #71717A;
        }

        .nav__search-item-price {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          font-weight: 600;
          color: #1A1A2E;
          margin-right: 12px;
        }

        .nav__search-item-arrow {
          color: #8E8E93;
          font-size: 14px;
        }

        /* ── RESPONSIVE BREAKPOINT (Mobile & Tablet <= 900px) ── */
        @media (max-width: 900px) {
          .nav-bar {
            height: 62px;
          }

          .nav-inner {
            padding: 0 20px;
          }

          .nav-center {
            display: none !important;
          }

          .nav__icon-btn--account,
          .nav__currency-wrap {
            display: none !important;
          }

          .nav-right {
            gap: 16px;
          }

          .nav__burger {
            display: inline-flex;
          }

          .announcement-bar__text--full {
            display: none;
          }

          .announcement-bar__text--short {
            display: inline;
          }
        }

        /* ── MOBILE OVERLAY MENU ── */
        .nav__overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          animation: navFadeIn 220ms ease;
        }

        .nav__overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 46, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .nav__overlay-panel {
          position: relative;
          z-index: 1;
          width: min(88vw, 380px);
          height: 100%;
          background: #FFFFFF;
          margin-left: auto;
          display: flex;
          flex-direction: column;
          padding: 24px 20px;
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.16);
          animation: navSlideLeft 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes navFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes navSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .nav__overlay-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 1px solid #E5E0D5;
        }

        .nav__close-btn {
          background: none;
          border: none;
          color: #1A1A2E;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav__overlay-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 16px;
        }

        .nav__overlay-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 48px;
          padding: 12px 14px;
          border-radius: 8px;
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 16px;
          font-weight: 500;
          color: #1A1A2E;
          text-decoration: none;
          border-bottom: 1px solid rgba(26, 26, 46, 0.05);
          transition: background-color 150ms ease, padding-left 150ms ease;
        }

        .nav__overlay-link:hover,
        .nav__overlay-link:active {
          background-color: #F5F0E8;
          padding-left: 18px;
        }

        .nav__overlay-meta {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #E5E0D5;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .nav__overlay-meta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 44px;
          background: #F5F0E8;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          padding: 0 16px;
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          color: #1A1A2E;
          cursor: pointer;
        }

        .nav__overlay-currency-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav__overlay-currency-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: #8E8E93;
        }

        .nav__overlay-currency-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .nav__overlay-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background: #FAFAF9;
          border: 1px solid #E5E0D5;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 600;
          color: #1A1A2E;
          cursor: pointer;
        }

        .nav__overlay-chip.is-active {
          background: #1A1A2E;
          color: #FFFFFF;
          border-color: #1A1A2E;
        }

        .nav__overlay-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-top: 20px;
        }

        .nav__overlay-trust {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: #777;
          letter-spacing: 0.04em;
        }

        .nav__overlay-cta {
          width: 100%;
          height: 48px;
          background: var(--color-text-primary, #1A1A1A);
          color: #ffffff;
          border-radius: 12px;
          font-size: 11.5px;
        }

        /* ── ACCOUNT MODAL ── */
        .nav__modal-wrap {
          position: fixed;
          inset: 0;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: navFadeIn 220ms ease;
        }

        .nav__modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(20, 18, 16, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .nav__modal-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 460px;
          background: #FAF6F0;
          border: 1px solid rgba(26, 26, 26, 0.1);
          border-radius: 20px;
          padding: clamp(24px, 4vw, 36px);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.25);
          animation: modalPop 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .nav__modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 150ms ease, color 150ms ease;
        }

        .nav__modal-close:hover {
          background: rgba(26, 26, 26, 0.08);
          color: #1A1A1A;
        }

        .nav__modal-header {
          margin-bottom: 20px;
        }

        .nav__modal-eyebrow {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C4503A;
          display: block;
          margin-bottom: 6px;
        }

        .nav__modal-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          color: var(--color-text-primary, #1A1A1A);
          margin: 0 0 6px;
        }

        .nav__modal-sub {
          font-family: var(--font-body, serif);
          font-size: 13.5px;
          line-height: 1.5;
          color: #666;
          margin: 0;
        }

        /* Auth Tabs */
        .nav__auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(26, 26, 26, 0.05);
          padding: 4px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .nav__auth-tab {
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 7px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #777;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .nav__auth-tab--active {
          background: #ffffff;
          color: #1A1A1A;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        /* Auth Form */
        .nav__auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .nav__form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav__form-group label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #555;
        }

        .nav__form-input {
          height: 44px;
          padding: 0 14px;
          background: #ffffff;
          border: 1px solid rgba(26, 26, 26, 0.15);
          border-radius: 10px;
          font-family: var(--font-body, serif);
          font-size: 14px;
          color: #1A1A1A;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .nav__form-input:focus {
          border-color: #C4503A;
          box-shadow: 0 0 0 3px rgba(196, 80, 58, 0.12);
        }

        .nav__signup-perks {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #2E7D32;
          margin: 4px 0 6px;
        }

        .nav__modal-btn {
          height: 48px;
          width: 100%;
          background: var(--color-text-primary, #1A1A1A);
          color: #FAF6F0;
          border-radius: 10px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          margin-top: 6px;
          transition: background 200ms ease;
        }

        .nav__modal-btn:hover {
          background: #C4503A;
          color: #ffffff;
        }

        .nav__auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 8px 0;
        }

        .nav__auth-divider::before,
        .nav__auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(26, 26, 26, 0.1);
        }

        .nav__auth-divider span {
          padding: 0 12px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #999;
        }

        .nav__social-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .nav__social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px;
          background: #ffffff;
          border: 1px solid rgba(26, 26, 26, 0.12);
          border-radius: 9px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #1A1A1A;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
        }

        .nav__social-btn:hover {
          background: rgba(26, 26, 26, 0.03);
          border-color: rgba(26, 26, 26, 0.25);
        }

        .nav__auth-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background: rgba(46, 125, 50, 0.08);
          border: 1px solid rgba(46, 125, 50, 0.25);
          border-radius: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: #2E7D32;
        }

        /* Profile View in Modal */
        .nav__account-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .nav__avatar-large {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #1A1A1A;
          color: #FAF6F0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 26px;
          margin-bottom: 14px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .nav__profile-email {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #666;
          margin: 0 0 8px;
        }

        .nav__profile-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(196, 80, 58, 0.1);
          color: #C4503A;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .nav__profile-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          text-align: left;
          background: #ffffff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(26, 26, 26, 0.08);
          margin-bottom: 24px;
        }

        .nav__profile-feat-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .nav__feat-icon {
          font-size: 16px;
        }

        .nav__profile-feat-row strong {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #1A1A1A;
        }

        .nav__profile-feat-row p {
          margin: 2px 0 0;
          font-family: var(--font-body, serif);
          font-size: 12px;
          color: #777;
        }

        .nav__profile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .nav__modal-btn-sec {
          background: none;
          border: none;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #888;
          cursor: pointer;
          padding: 8px;
          text-decoration: underline;
        }

        .nav__modal-btn-sec:hover {
          color: #C4503A;
        }

        /* ── CART DRAWER ── */
        .nav__drawer-wrap {
          position: fixed;
          inset: 0;
          z-index: 10001;
          display: flex;
          justify-content: flex-end;
          animation: navFadeIn 220ms ease;
        }

        .nav__drawer-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(20, 18, 16, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .nav__drawer-panel {
          position: relative;
          z-index: 1;
          width: min(92vw, 440px);
          height: 100%;
          background: #FAF6F0;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
          animation: navSlideLeft 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav__drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 24px 18px;
          border-bottom: 1px solid rgba(26, 26, 26, 0.08);
        }

        .nav__drawer-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav__drawer-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          margin: 0;
          color: #1A1A1A;
        }

        .nav__drawer-count-badge {
          padding: 2px 8px;
          background: rgba(26, 26, 26, 0.08);
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #666;
        }

        .nav__drawer-close {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .nav__drawer-close:hover {
          background: rgba(26, 26, 26, 0.08);
          color: #1A1A1A;
        }

        .nav__drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .nav__cart-item-card {
          display: flex;
          gap: 16px;
          background: #ffffff;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid rgba(26, 26, 26, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .nav__cart-item-thumb {
          position: relative;
          width: 80px;
          height: 80px;
          background: #F4EFEA;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav__cart-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav__cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .nav__cart-item-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }

        .nav__cart-item-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          color: #1A1A1A;
          margin: 0;
        }

        .nav__cart-item-price {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: #1A1A1A;
        }

        .nav__cart-item-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #777;
          margin: 4px 0 2px;
        }

        .nav__cart-item-bonus {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: #C4503A;
          margin: 0 0 10px;
        }

        .nav__cart-qty-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .nav__cart-stepper {
          display: inline-flex;
          align-items: center;
          background: #F4EFEA;
          border: 1px solid rgba(26, 26, 26, 0.1);
          border-radius: 8px;
          height: 28px;
        }

        .nav__stepper-btn {
          background: none;
          border: none;
          width: 26px;
          height: 100%;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 13px;
          color: #1A1A1A;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav__stepper-val {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          min-width: 18px;
          text-align: center;
        }

        .nav__cart-remove {
          background: none;
          border: none;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #999;
          cursor: pointer;
          text-decoration: underline;
        }

        .nav__cart-remove:hover {
          color: #C4503A;
        }

        /* Cart Empty State */
        .nav__cart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 10px;
        }

        .nav__empty-icon {
          color: #AAA;
          margin-bottom: 12px;
        }

        .nav__cart-empty h4 {
          font-family: var(--font-display);
          font-size: 20px;
          margin: 0 0 6px;
          color: #1A1A1A;
        }

        .nav__cart-empty p {
          font-family: var(--font-body, serif);
          font-size: 13px;
          color: #777;
          margin: 0 0 18px;
        }

        .nav__cart-add-btn {
          height: 42px;
          padding: 0 20px;
          background: #1A1A1A;
          color: #ffffff;
          border-radius: 10px;
          font-size: 11px;
        }

        /* Guarantees */
        .nav__cart-guarantees {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #ffffff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(26, 26, 26, 0.08);
        }

        .nav__guarantee-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .nav__guarantee-row strong {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #1A1A1A;
        }

        .nav__guarantee-row p {
          margin: 2px 0 0;
          font-family: var(--font-body, serif);
          font-size: 11.5px;
          color: #777;
        }

        /* Drawer Footer */
        .nav__drawer-footer {
          padding: 20px 24px 28px;
          border-top: 1px solid rgba(26, 26, 26, 0.08);
          background: #FAF6F0;
        }

        .nav__drawer-summary {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .nav__sum-line {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: #666;
        }

        .nav__free-tag {
          color: #2E7D32;
          font-weight: 700;
        }

        .nav__sum-total {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          color: #1A1A1A;
          padding-top: 8px;
          border-top: 1px solid rgba(26, 26, 26, 0.08);
        }

        .nav__drawer-checkout {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #1A1A1A;
          color: #ffffff;
          border-radius: 12px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(26, 26, 26, 0.2);
          transition: background 200ms ease, transform 150ms ease;
        }

        .nav__drawer-checkout:hover {
          background: #C4503A;
          transform: translateY(-1px);
        }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (max-width: 900px) {
          .nav-center {
            display: none !important;
          }
          .nav__icon-btn--account,
          .nav__currency-wrap {
            display: none !important;
          }
          .nav__burger {
            display: inline-flex;
          }
          .nav-inner {
            padding: 0 20px;
          }
        }

        @media (max-width: 640px) {
          .announcement-bar {
            height: 34px;
          }
          .announcement-bar__link {
            font-size: 10.5px;
            letter-spacing: 0.03em;
            gap: 5px;
          }
          .announcement-bar__text--full {
            display: none;
          }
          .announcement-bar__text--short {
            display: inline;
          }
          .nav-bar {
            top: 34px;
            height: 60px;
          }
          .nav-inner {
            padding: 0 16px;
          }
          .nav-right {
            gap: 14px;
          }
        }
      `}</style>
    </>
  )
}
