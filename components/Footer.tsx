'use client'

import { useState } from 'react'

const LINK_COLUMNS = [
  {
    title: 'Product',
    links: ['The Suite', 'How It Works', 'Science', 'Testimonials'],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'FAQ', 'Returns', '30-Day Guarantee'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Shipping Policy'],
  },
]

function FooterLink({ label }: { label: string }) {
  return (
    <li style={{ marginBottom: '10px' }}>
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          lineHeight: 1.5,
          letterSpacing: '0.02em',
          color: '#BEBAB4',
          textDecoration: 'none',
          transition: 'color 200ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#F2ECE4'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#BEBAB4'
        }}
      >
        {label}
      </a>
    </li>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer
      style={{
        background: '#161514',
        color: '#F2ECE4',
        paddingTop: 'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(32px, 4vw, 44px)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 max(24px, 5vw)',
        }}
      >
        {/* ============ TOP: brand + newsletter | link columns ============ */}
        <div className="footer-top">
          {/* Left: brand + newsletter */}
          <div style={{ maxWidth: '420px' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#F2ECE4',
                margin: '0 0 10px 0',
              }}
            >
              CrownCalm
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                lineHeight: 1.7,
                letterSpacing: '0.02em',
                color: '#999999',
                margin: '0 0 28px 0',
                maxWidth: '320px',
              }}
            >
              Science-backed migraine relief. Five mechanisms, one daily
              protocol.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#BEBAB4',
                margin: '0 0 12px 0',
              }}
            >
              Join the newsletter
            </p>

            <form onSubmit={handleSubscribe}>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: '44px',
                    padding: '0 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    backgroundColor: 'rgba(242, 236, 228, 0.06)',
                    border: '1px solid rgba(242, 236, 228, 0.16)',
                    borderRadius: '6px',
                    color: '#F2ECE4',
                    transition: 'all 200ms ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C4503A'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      'rgba(242, 236, 228, 0.16)'
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  style={{
                    minHeight: '44px',
                    padding: '0 26px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    background: subscribed ? '#3FA35F' : '#C4503A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 200ms ease',
                    opacity: loading ? 0.7 : 1,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && !subscribed) {
                      e.currentTarget.style.background = '#A93E2B'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && !subscribed) {
                      e.currentTarget.style.background = '#C4503A'
                    }
                  }}
                >
                  {loading
                    ? 'Sending'
                    : subscribed
                      ? 'Subscribed'
                      : 'Subscribe'}
                </button>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: error ? '#E88A7D' : '#777777',
                  letterSpacing: '0.02em',
                  margin: '12px 0 0 0',
                }}
              >
                {error || "We'll never spam you. Unsubscribe anytime."}
              </p>
            </form>
          </div>

          {/* Right: link columns */}
          <div className="footer-links">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#F2ECE4',
                    margin: '0 0 16px 0',
                  }}
                >
                  {col.title}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {col.links.map((link) => (
                    <FooterLink key={link} label={link} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ============ OVERSIZED WORDMARK ============ */}
        <div
          aria-hidden="true"
          style={{
            marginTop: 'clamp(56px, 8vw, 88px)',
            marginBottom: 'clamp(20px, 3vw, 28px)',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 16vw, 200px)',
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'rgba(242, 236, 228, 0.06)',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            CrownCalm
          </p>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: 'clamp(24px, 4vw, 32px)',
            borderTop: '1px solid rgba(242, 236, 228, 0.1)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#777777',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            © 2026 CrownCalm. All rights reserved.
          </p>

          <a
            href="mailto:care@crowncalm.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#BEBAB4',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F2ECE4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#BEBAB4'
            }}
          >
            care@crowncalm.com
          </a>
        </div>
      </div>

      <style jsx>{`
        .footer-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 860px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 520px) {
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }
      `}</style>
    </footer>
  )
}
