'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import CrownCalmLogo, { CrownCalmMark } from './CrownCalmLogo'

interface NetworkMember {
  name: string
  role: string
  image: string
  x: number
  y: number
  size?: number
}

const NETWORK_MEMBERS: NetworkMember[] = [
  // Ring 2 (R ≈ 85px from center 200, 140)
  {
    name: 'Dr. Daniel R.',
    role: 'Neurology Fellow',
    image: '/images/testimonials/daniel-r.png',
    x: 135,
    y: 85,
    size: 28,
  },
  {
    name: 'Jordan K.',
    role: 'Sanctuary Suite User',
    image: '/images/testimonials/jordan-k.png',
    x: 270,
    y: 90,
    size: 28,
  },
  {
    name: 'Elena V.',
    role: 'Clinical Specialist',
    image: '/images/testimonials/elena-v.png',
    x: 285,
    y: 175,
    size: 26,
  },
  // Ring 3 (R ≈ 125px)
  {
    name: 'Sarah M.',
    role: 'Patient Advocate',
    image: '/images/testimonials/sarah-m.png',
    x: 200,
    y: 20,
    size: 28,
  },
  {
    name: 'Dr. Priya S.',
    role: 'Headache Specialist',
    image: '/images/testimonials/priya-s.png',
    x: 325,
    y: 130,
    size: 30,
  },
  {
    name: 'Maya L.',
    role: 'Chronic Migraineur',
    image: '/images/testimonials/maya-l.png',
    x: 78,
    y: 165,
    size: 26,
  },
  // Ring 4 (R ≈ 165px)
  {
    name: 'Naomi C.',
    role: 'Protocol Member',
    image: '/images/testimonials/naomi-c.png',
    x: 210,
    y: 250,
    size: 28,
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false)
  const [affiliateEmail, setAffiliateEmail] = useState('')
  const [affiliateSubmitted, setAffiliateSubmitted] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubscribed(true)
    setEmail('')
    setLoading(false)
  }

  const handleAffiliateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!affiliateEmail) return
    setAffiliateSubmitted(true)
    setTimeout(() => {
      setAffiliateSubmitted(false)
      setIsAffiliateModalOpen(false)
      setAffiliateEmail('')
    }, 2400)
  }

  return (
    <footer className="footer-root">
      <div className="footer-container">
        {/* ================================================================ */}
        {/* TOP FLOATING CARD: Product Sanctuary Suite / Orbit Visual         */}
        {/* ================================================================ */}
        <div className="product-card">
          {/* Left Column: Product Copy & Action */}
          <div className="product-card__content">
            <span className="product-card__eyebrow">The Complete Protocol</span>

            <h2 className="product-card__title">The Sanctuary Suite</h2>

            <p className="product-card__desc">
              Engineered with <strong>bilateral cranial decompression</strong>, rapid cryo-compression,
              and <strong>FL-41 optical shielding</strong> to halt acute sensory storms in minutes.
            </p>

            <a href="/products/sanctuary-suite" className="product-card__cta">
              Shop the Sanctuary Suite
            </a>
          </div>

          {/* Right Column: Orbital Clinical & Community Network Graphic */}
          <div className="product-card__orbit-wrap" aria-hidden="true">
            <div className="product-card__orbit-scene">
              {/* Concentric Dashed Radar / Orbit Rings */}
              <svg className="orbit-svg" viewBox="0 0 400 280" fill="none">
                {/* Ring 1 - innermost */}
                <circle
                  cx="200"
                  cy="140"
                  r="44"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
                {/* Ring 2 */}
                <circle
                  cx="200"
                  cy="140"
                  r="85"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
                {/* Ring 3 */}
                <circle
                  cx="200"
                  cy="140"
                  r="125"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
                {/* Ring 4 - outermost */}
                <circle
                  cx="200"
                  cy="140"
                  r="165"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
              </svg>

              {/* Center Node: CrownCalm Calibrated Core */}
              <div className="orbit-center">
                <CrownCalmMark size={18} color="#36495E" />
              </div>

              {/* Orbiting Avatar Nodes */}
              {NETWORK_MEMBERS.map((member, i) => (
                <div
                  key={member.name}
                  className={`orbit-node orbit-node--${i + 1}`}
                  style={{
                    left: `${member.x}px`,
                    top: `${member.y}px`,
                    width: `${member.size || 28}px`,
                    height: `${member.size || 28}px`,
                  }}
                  title={`${member.name} · ${member.role}`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={member.size || 28}
                    height={member.size || 28}
                    className="orbit-node__img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* BOTTOM SECTION: 4 Columns (Brand, Company, Socials, Newsletter)   */}
        {/* ================================================================ */}
        <div className="footer-columns">
          {/* Column 1: Brand & Bio */}
          <div className="col-brand">
            <a href="/" className="footer-logo-link" aria-label="CrownCalm Home">
              <CrownCalmLogo height={24} markSize={24} color="#FFFFFF" />
            </a>
            <p className="col-brand__tagline">
              The clinical-grade non-pharmacological protocol &amp; multi-sensory sanctuary for acute
              migraine relief.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="col-nav">
            <h3 className="col-nav__heading">Company</h3>
            <ul className="col-nav__list">
              <li>
                <a href="/products/sanctuary-suite#price">Pricing</a>
              </li>
              <li>
                <a href="/products/sanctuary-suite">The Sanctuary Suite</a>
              </li>
              <li>
                <a href="#science">Clinical Science</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsAffiliateModalOpen(true)}
                  className="link-button"
                >
                  <span>Become an Affiliate</span>
                  <span className="arrow">↗</span>
                </button>
              </li>
              <li>
                <a
                  href="mailto:partners@crowncalm.com?subject=Practitioner%20Inquiry"
                  className="link-arrow"
                >
                  <span>Physician Portal</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="col-nav">
            <h3 className="col-nav__heading">Socials</h3>
            <ul className="col-nav__list">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  <span>Instagram</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  <span>Twitter/X</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  <span>PubMed Studies</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:care@crowncalm.com">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-newsletter">
            <h3 className="col-nav__heading">Newsletter</h3>
            <p className="col-newsletter__desc">
              Receive product updates news, exclusive discounts and early access.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-pill">
              <span className="newsletter-pill__icon" aria-hidden="true">
                @
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                disabled={loading || subscribed}
                aria-label="Email address"
                className="newsletter-pill__input"
              />
              <button
                type="submit"
                disabled={loading || subscribed}
                aria-label="Submit newsletter subscription"
                className={`newsletter-pill__btn ${subscribed ? 'newsletter-pill__btn--done' : ''}`}
              >
                {subscribed ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </form>

            {subscribed && (
              <p className="newsletter-success">You are subscribed to protocol updates.</p>
            )}
          </div>
        </div>

        {/* ================================================================ */}
        {/* BOTTOM SUB-FOOTER: Copyright & Badges                             */}
        {/* ================================================================ */}
        <div className="footer-bottom">
          <div className="footer-bottom__left">
            <span>&copy; {new Date().getFullYear()} CrownCalm</span>
            <span className="dot">&middot;</span>
            <span className="made-with">Made for Migraine Relief</span>
          </div>

          <div className="footer-bottom__right">
            <span className="badge-item">HSA / FSA Eligible</span>
            <span className="dot">&middot;</span>
            <span className="badge-item">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: 'inline', marginRight: '5px', verticalAlign: '-1.5px' }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              US &amp; Global Shipping
            </span>
            <span className="dot">&middot;</span>
            <span className="badge-item">30-Day Protocol Guarantee</span>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* AFFILIATE APPLICATION MODAL                                      */}
      {/* ================================================================ */}
      {isAffiliateModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAffiliateModalOpen(false)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setIsAffiliateModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <span className="product-card__eyebrow">Partner Application</span>
            <h3 className="modal-title">Join the CrownCalm Partner Network</h3>
            <p className="modal-desc">
              Share clinically verified non-pharmacological relief with your patients, clients, or community.
            </p>

            {affiliateSubmitted ? (
              <div className="modal-success">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p>Application received! We will send your partner portal link shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleAffiliateSubmit} className="modal-form">
                <label className="modal-label">
                  Your Work / Primary Email
                  <input
                    type="email"
                    required
                    placeholder="doctor@practice.com or partner@domain.com"
                    value={affiliateEmail}
                    onChange={(e) => setAffiliateEmail(e.target.value)}
                    className="modal-input"
                  />
                </label>
                <button type="submit" className="modal-submit-btn">
                  Apply for Partner Link ↗
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SCOPED COMPONENT STYLES                                          */}
      {/* ================================================================ */}
      <style jsx>{`
        .footer-root {
          position: relative;
          background: var(--color-announcement-bar, #4B617A);
          color: #FFFFFF;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          padding: clamp(44px, 5.5vw, 68px) max(20px, 4vw) 32px;
          overflow: hidden;
          font-family: var(--font-body, 'Geist', -apple-system, sans-serif);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(38px, 4.5vw, 56px);
        }

        /* ── Top Floating Card (Slightly Smaller & Compact) ── */
        .product-card {
          position: relative;
          background: linear-gradient(135deg, #44576D 0%, #36495E 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: clamp(20px, 2.5vw, 28px);
          box-shadow:
            0 14px 38px -8px rgba(15, 23, 42, 0.35),
            0 4px 14px -2px rgba(15, 23, 42, 0.18);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          padding: clamp(22px, 3vw, 34px) clamp(24px, 3.6vw, 44px);
          overflow: hidden;
          min-height: 220px;
        }

        .product-card__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          max-width: 480px;
          z-index: 2;
        }

        .product-card__eyebrow {
          font-family: var(--font-body, 'Geist', sans-serif);
          font-size: 12.5px;
          font-weight: 500;
          color: #D3DFEE;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .product-card__title {
          font-family: var(--font-display, 'Geist', sans-serif);
          font-size: clamp(22px, 2.6vw, 32px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: #FFFFFF;
          margin: 0;
        }

        .product-card__desc {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.86);
          margin: 0 0 4px 0;
        }

        .product-card__desc strong {
          color: #FFFFFF;
          font-weight: 600;
        }

        .product-card__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          color: #1A1A2E;
          font-family: var(--font-general-sans, var(--font-body), sans-serif);
          font-size: 15px;
          font-weight: 500;
          line-height: 1;
          height: 48px;
          padding: 14px 28px;
          border-radius: 8px; /* Tier 1 spec */
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
          transition: background-color 150ms ease;
        }

        .product-card__cta:hover {
          background: #EFEADD;
          color: #1A1A2E;
          transform: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        }

        .product-card__cta:active {
          background: #E5DFD3;
          transform: none;
        }

        /* ── Orbit Graphic Right Side ── */
        .product-card__orbit-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .product-card__orbit-scene {
          position: relative;
          width: 400px;
          height: 280px;
          transform: translateX(15px);
        }

        .orbit-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .orbit-center {
          position: absolute;
          left: 200px;
          top: 140px;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }

        .orbit-node {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid #FFFFFF;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          background: #36495E;
          z-index: 3;
          pointer-events: auto;
          cursor: pointer;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .orbit-node:hover {
          transform: translate(-50%, -50%) scale(1.18);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.38);
          z-index: 10;
        }

        .orbit-node__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Subtle gentle floating animation for network nodes */
        .orbit-node--1 {
          animation: nodeFloat1 7s ease-in-out infinite alternate;
        }
        .orbit-node--2 {
          animation: nodeFloat2 8s ease-in-out infinite alternate;
        }
        .orbit-node--3 {
          animation: nodeFloat1 6.5s ease-in-out infinite alternate-reverse;
        }
        .orbit-node--4 {
          animation: nodeFloat2 7.5s ease-in-out infinite alternate-reverse;
        }
        .orbit-node--5 {
          animation: nodeFloat1 9s ease-in-out infinite alternate;
        }
        .orbit-node--6 {
          animation: nodeFloat2 8.5s ease-in-out infinite alternate;
        }
        .orbit-node--7 {
          animation: nodeFloat1 7.2s ease-in-out infinite alternate-reverse;
        }

        @keyframes nodeFloat1 {
          0% {
            margin-top: 0;
            margin-left: 0;
          }
          100% {
            margin-top: -3px;
            margin-left: 2px;
          }
        }

        @keyframes nodeFloat2 {
          0% {
            margin-top: 0;
            margin-left: 0;
          }
          100% {
            margin-top: 2px;
            margin-left: -2px;
          }
        }

        /* ── Main Footer Columns ── */
        .footer-columns {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.35fr;
          gap: clamp(28px, 4.5vw, 54px);
          align-items: flex-start;
        }

        .col-brand {
          max-width: 320px;
        }

        .footer-logo-link {
          display: inline-block;
          text-decoration: none;
          margin-bottom: 12px;
          transition: opacity 160ms ease;
        }

        .footer-logo-link:hover {
          opacity: 0.88;
        }

        .col-brand__tagline {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .col-nav__heading {
          font-size: 13.5px;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.01em;
          margin: 0 0 16px 0;
        }

        .col-nav__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .col-nav__list a,
        .link-button {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          transition: color 160ms ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }

        .col-nav__list a:hover,
        .link-button:hover {
          color: #FFFFFF;
        }

        .arrow {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          transition:
            transform 160ms ease,
            color 160ms ease;
        }

        .link-arrow:hover .arrow,
        .link-button:hover .arrow {
          color: #FFFFFF;
          transform: translate(1px, -1px);
        }

        /* ── Newsletter Column ── */
        .col-newsletter {
          max-width: 360px;
        }

        .col-newsletter__desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 14px 0;
        }

        .newsletter-pill {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 9999px;
          padding: 4px 5px 4px 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition:
            border-color 200ms ease,
            background-color 200ms ease,
            box-shadow 200ms ease;
        }

        .newsletter-pill:focus-within {
          border-color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.18);
        }

        .newsletter-pill__icon {
          color: rgba(255, 255, 255, 0.65);
          font-size: 13.5px;
          font-weight: 500;
          margin-right: 7px;
          user-select: none;
        }

        .newsletter-pill__input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          font-size: 13px;
          color: #FFFFFF;
          outline: none;
          font-family: inherit;
        }

        .newsletter-pill__input::placeholder {
          color: rgba(255, 255, 255, 0.55);
        }

        .newsletter-pill__btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #273748;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition:
            background-color 200ms ease,
            transform 200ms ease;
        }

        .newsletter-pill__btn:hover:not(:disabled) {
          background: #F1F5F9;
          transform: scale(1.05);
        }

        .newsletter-pill__btn:active:not(:disabled) {
          transform: scale(0.96);
        }

        .newsletter-pill__btn--done {
          background: #10B981 !important;
          color: #FFFFFF;
        }

        .newsletter-success {
          font-size: 12px;
          color: #86EFAC;
          margin: 7px 0 0 14px;
          font-weight: 500;
        }

        /* ── Sub-footer Bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .footer-bottom__left,
        .footer-bottom__right {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .dot {
          color: rgba(255, 255, 255, 0.35);
        }

        .made-with {
          color: rgba(255, 255, 255, 0.9);
        }

        .badge-item {
          color: rgba(255, 255, 255, 0.85);
        }

        /* ── Modal Dialog ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal-card {
          position: relative;
          background: #36495E;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 32px 28px;
          max-width: 460px;
          width: 100%;
          box-shadow: 0 24px 64px rgba(15, 23, 42, 0.45);
          color: #FFFFFF;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 18px;
          background: none;
          border: none;
          font-size: 24px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }

        .modal-close:hover {
          color: #FFFFFF;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 6px 0 8px 0;
        }

        .modal-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 20px 0;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .modal-label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 600;
          color: #E2E8F0;
        }

        .modal-input {
          padding: 11px 15px;
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          font-size: 13.5px;
          outline: none;
          transition: border-color 160ms;
        }

        .modal-input:focus {
          border-color: #FFFFFF;
          background: rgba(255, 255, 255, 0.12);
        }

        .modal-submit-btn {
          background: #FFFFFF;
          color: #273748;
          border: none;
          padding: 13px;
          border-radius: 11px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          transition: background 160ms;
        }

        .modal-submit-btn:hover {
          background: #F1F5F9;
        }

        .modal-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 14px 0;
          color: #86EFAC;
          font-weight: 500;
        }

        /* ── Responsive Queries ── */
        @media (max-width: 1024px) {
          .product-card {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 28px 24px;
          }
          .product-card__content {
            max-width: 100%;
          }
          .product-card__orbit-wrap {
            height: 220px;
            min-height: 220px;
          }
          .product-card__orbit-scene {
            transform: translateX(0);
          }
          .footer-columns {
            grid-template-columns: 1fr 1fr;
            gap: 36px 28px;
          }
          .col-brand,
          .col-newsletter {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .product-card {
            border-radius: 18px;
            padding: 24px 20px;
          }
          .product-card__title {
            font-size: 24px;
          }
          .product-card__orbit-wrap {
            display: none !important; /* Hide on mobile so it doesn't get cut off at container edge */
          }
          .product-card__cta {
            width: 100%;
            height: 44px;
            padding: 12px 20px;
            font-size: 14px;
          }
          /* Stack to single column, full width, generous vertical spacing (32px) */
          .footer-columns {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .col-brand,
          .col-nav,
          .col-newsletter {
            width: 100%;
            max-width: 100%;
          }
          /* Company/Socials: stacked full-width lists, each link as its own tappable row (44px min height) */
          .col-nav__list {
            gap: 0;
          }
          .col-nav__list li {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .col-nav__list li:last-child {
            border-bottom: none;
          }
          .col-nav__list a,
          .col-nav__list .link-button {
            min-height: 44px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14.5px;
            padding: 0 4px;
          }
          /* Newsletter input field full width, 44x44px circular submit button */
          .newsletter-pill {
            width: 100%;
            padding: 4px 6px 4px 16px;
          }
          .newsletter-pill__btn {
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
          }
          /* Bottom legal row: 2 stacked lines */
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding-top: 20px;
          }
          .footer-bottom__left {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12.5px;
            width: 100%;
          }
          .footer-bottom__right {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px 12px;
            font-size: 11.5px;
            line-height: 1.5;
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-node {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  )
}
