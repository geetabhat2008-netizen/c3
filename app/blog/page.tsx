import type { Metadata } from 'next'
import { POSTS } from '../../lib/blog'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'The Journal — CrownCalm',
  description:
    'Field notes for the sensitized mind. Practical, honest writing on living well with a migraine brain — no jargon, no pamphlets.',
}

export default function BlogIndex() {
  const [featured, ...rest] = POSTS

  return (
    <>
      <main className="journal">
        {/* ---- Header ---- */}
        <header className="journal__head">
          <p className="journal__eyebrow">The Journal</p>
          <h1 className="journal__title">
            Field notes for the
            <br />
            <em>sensitized</em> mind.
          </h1>
          <p className="journal__dek">
            {
              'Honest, practical writing on living with a migraine brain. No jargon. No pamphlets. No \u201Cavoid stress and bright lights.\u201D'
            }
          </p>
        </header>

        {/* ---- Featured ---- */}
        <a href={`/blog/${featured.slug}`} className="feat">
          <div className="feat__media">
            <img src={featured.hero || "/placeholder.svg"} alt={featured.heroAlt} />
          </div>
          <div className="feat__body">
            <div className="feat__meta">
              <span className="chip" style={{ background: featured.phase }}>
                {featured.category}
              </span>
              <span className="meta-mono">
                {featured.date} · {featured.readTime} read
              </span>
            </div>
            <h2 className="feat__title">{featured.title}</h2>
            <p className="feat__dek">{featured.dek}</p>
            <span className="feat__cta meta-mono">Read the essay →</span>
          </div>
        </a>

        {/* ---- Grid ---- */}
        <div className="grid-head">
          <span className="meta-mono">All essays</span>
          <span className="meta-mono">{String(rest.length + 1).padStart(2, '0')} published</span>
        </div>
        <div className="grid">
          {rest.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="card">
              <div className="card__media">
                <img src={post.hero || "/placeholder.svg"} alt={post.heroAlt} />
              </div>
              <div className="card__meta">
                <span className="chip" style={{ background: post.phase }}>
                  {post.category}
                </span>
                <span className="meta-mono">{post.readTime}</span>
              </div>
              <h3 className="card__title">{post.title}</h3>
              <p className="card__dek">{post.dek}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer />

      <style>{`
        .journal {
          max-width: 1200px;
          margin: 0 auto;
          padding: calc(var(--nav-height) + 72px) var(--padding-page-x) 96px;
        }
        .journal__head {
          max-width: 720px;
          margin-bottom: 72px;
        }
        .journal__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          margin: 0 0 20px;
        }
        .journal__title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0 0 24px;
          text-wrap: balance;
        }
        .journal__title em {
          font-style: italic;
        }
        .journal__dek {
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
          max-width: 520px;
          text-wrap: pretty;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          height: 24px;
          padding: 0 12px;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-primary);
        }
        .meta-mono {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
        }

        /* ---- Featured ---- */
        .feat {
          display: flex;
          gap: 48px;
          align-items: center;
          text-decoration: none;
          padding: 32px;
          border: 1px solid var(--border-subtle, rgba(26, 26, 26, 0.1));
          border-radius: 20px;
          background: var(--color-surface);
          margin-bottom: 64px;
          transition: transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
        }
        .feat:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(26, 26, 26, 0.08);
        }
        .feat__media {
          flex: 1.15;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
        }
        .feat__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .feat__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }
        .feat__meta {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .feat__title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.12;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0;
          text-wrap: balance;
        }
        .feat__dek {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
          text-wrap: pretty;
        }
        .feat__cta {
          color: var(--color-text-primary);
        }

        /* ---- Grid ---- */
        .grid-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          margin-bottom: 36px;
          border-bottom: 1px solid var(--border-subtle, rgba(26, 26, 26, 0.12));
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px 28px;
        }
        .card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-decoration: none;
        }
        .card__media {
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 3 / 2;
        }
        .card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 400ms var(--ease-out);
        }
        .card:hover .card__media img {
          transform: scale(1.03);
        }
        .card__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card__title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 24px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0;
          text-wrap: balance;
        }
        .card:hover .card__title {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
        }
        .card__dek {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
          text-wrap: pretty;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .feat {
            flex-direction: column;
            gap: 28px;
            align-items: stretch;
            padding: 20px;
          }
        }
        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .journal__head {
            margin-bottom: 48px;
          }
        }
      `}</style>
    </>
  )
}
