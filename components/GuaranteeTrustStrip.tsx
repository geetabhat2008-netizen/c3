'use client'

import React from 'react'

interface TrustItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'guarantee',
    title: '30-Day Protocol Guarantee',
    description: 'Test CrownCalm across your full migraine cycle. If frequency and intensity don\'t drop, return for a full refund.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'shipping',
    title: 'Free Insured Express Delivery',
    description: 'Complimentary 2-day domestic transit. Discreet, temperature-controlled packaging with door-to-door tracking.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
  {
    id: 'hsa-fsa',
    title: 'HSA / FSA Eligible',
    description: 'Use your pre-tax health savings or flexible spending funds directly at checkout. Fully itemized for medical claim records.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="7" y1="15" x2="7.01" y2="15" strokeWidth="2.5" />
        <line x1="11" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
]

export default function GuaranteeTrustStrip() {
  return (
    <section className="guarantee-strip" aria-label="Purchase guarantees and benefits">
      <div className="guarantee-strip__container">
        <div className="guarantee-strip__grid">
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className="guarantee-strip__card">
              <div className="guarantee-strip__icon" aria-hidden>
                {item.icon}
              </div>
              <div className="guarantee-strip__content">
                <h3 className="guarantee-strip__title">{item.title}</h3>
                <p className="guarantee-strip__desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .guarantee-strip {
          background: var(--color-bg-primary, #FAFAF9);
          padding: 24px var(--padding-page-x) 48px;
          position: relative;
          z-index: 2;
        }
        .guarantee-strip__container {
          max-width: var(--max-width-page, 1280px);
          margin: 0 auto;
        }
        .guarantee-strip__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .guarantee-strip__card {
          background: var(--color-bg-secondary, #F2F1ED);
          border-radius: 12px;
          padding: 28px 24px;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          transition: transform 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
                      background-color 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .guarantee-strip__card:hover {
          transform: translateY(-2px);
          background: #ECEAE4;
        }
        .guarantee-strip__icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary, #0F0F0F);
          box-shadow: 0 1px 4px rgba(15, 15, 15, 0.05);
        }
        .guarantee-strip__content {
          flex: 1;
        }
        .guarantee-strip__title {
          font-family: var(--font-display, inherit);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.3;
          color: var(--color-text-primary, #0F0F0F);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }
        .guarantee-strip__desc {
          font-family: var(--font-body, inherit);
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-secondary, #6B6B6B);
          margin: 0;
        }
        @media (max-width: 900px) {
          .guarantee-strip__grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .guarantee-strip {
            padding: 16px 20px 40px;
          }
          .guarantee-strip__card {
            padding: 22px 20px;
          }
        }
      `}</style>
    </section>
  )
}
