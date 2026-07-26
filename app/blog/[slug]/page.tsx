import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { POSTS, getPost, type BlogBlock } from '../../../lib/blog'
import Footer from '../../../components/Footer'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'The Journal — CrownCalm' }
  return {
    title: `${post.title} — CrownCalm Journal`,
    description: post.dek,
  }
}

function Block({ block, phase }: { block: BlogBlock; phase: string }) {
  switch (block.type) {
    case 'lead':
      return <p className="art__lead">{block.text}</p>
    case 'p':
      return <p className="art__p">{block.text}</p>
    case 'h2':
      return <h2 className="art__h2">{block.text}</h2>
    case 'pull':
      return (
        <blockquote className="art__pull" style={{ borderColor: phase }}>
          {block.text}
        </blockquote>
      )
    case 'tip':
      return (
        <aside className="art__tip">
          <p className="art__tip-label">
            <span className="art__tip-dot" style={{ background: phase }} />
            {block.title}
          </p>
          <p className="art__tip-text">{block.text}</p>
        </aside>
      )
    case 'science':
      return (
        <aside className="art__sci">
          <p className="art__sci-label">The science, briefly</p>
          <p className="art__sci-text">{block.text}</p>
        </aside>
      )
    case 'list':
      return (
        <ul className="art__list">
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="art__list-marker" style={{ background: phase }} />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'image':
      return (
        <figure className="art__fig">
          {/* eslint-disable-next-line @next/next/no-img-element -- blog body images have
              unknown intrinsic dimensions; next/image fill or fixed sizing would require
              per-image metadata that is not available in the blog data model */}
          <img src={block.src || "/placeholder.svg"} alt={block.alt} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )
    default:
      return null
  }
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const index = POSTS.findIndex((p) => p.slug === post.slug)
  const next = POSTS[(index + 1) % POSTS.length]

  return (
    <>
      <main className="art">
        {/* ---- Header ---- */}
        <header className="art__head">
          <Link href="/blog" className="art__back">
            ← The Journal
          </Link>
          <div className="art__meta">
            <span className="art__chip" style={{ background: post.phase }}>
              {post.category}
            </span>
            <span className="art__meta-mono">
              {post.date} · {post.readTime} read
            </span>
          </div>
          <h1 className="art__title">{post.title}</h1>
          <p className="art__dek">{post.dek}</p>
        </header>

        {/* ---- Hero ---- */}
        <div className="art__hero">
          <Image
            src={post.hero || '/placeholder.svg'}
            alt={post.heroAlt}
            fill
            sizes="(max-width: 1000px) 100vw, 1000px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ---- Body ---- */}
        <article className="art__body">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} phase={post.phase} />
          ))}

          <div className="art__sig">
            <span className="art__sig-rule" style={{ background: post.phase }} />
            <p>{'\u2014 The CrownCalm Team'}</p>
          </div>
        </article>

        {/* ---- Next ---- */}
        <Link href={`/blog/${next.slug}`} className="art__next">
          <span className="art__next-label">Read next</span>
          <span className="art__next-title">{next.title}</span>
          <span className="art__next-arrow">→</span>
        </Link>
      </main>
      <Footer />

      <style>{`
        .art {
          padding: calc(var(--nav-height) + 64px) var(--padding-page-x) 96px;
        }
        .art__head {
          max-width: 720px;
          margin: 0 auto 48px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
        }
        .art__back {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          text-decoration: none;
        }
        .art__back:hover {
          color: var(--color-text-primary);
        }
        .art__meta {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .art__chip {
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
        .art__meta-mono {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
        }
        .art__title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(36px, 5.5vw, 60px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0;
          text-wrap: balance;
        }
        .art__dek {
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
          text-wrap: pretty;
        }

        .art__hero {
          max-width: 1000px;
          margin: 0 auto 64px;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 21 / 10;
          position: relative;
        }
        .art__hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .art__body {
          max-width: 680px;
          margin: 0 auto;
        }
        .art__lead {
          font-family: var(--font-display);
          font-size: clamp(21px, 2.6vw, 26px);
          line-height: 1.45;
          color: var(--color-text-primary);
          margin: 0 0 36px;
          text-wrap: pretty;
        }
        .art__p {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.75;
          color: var(--color-text-primary);
          margin: 0 0 28px;
          text-wrap: pretty;
        }
        .art__h2 {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(25px, 3vw, 30px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 56px 0 20px;
          text-wrap: balance;
        }
        .art__pull {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(21px, 2.6vw, 26px);
          line-height: 1.45;
          color: var(--color-text-primary);
          margin: 48px 0;
          padding-left: 24px;
          border-left: 2px solid;
          text-wrap: pretty;
        }
        .art__tip {
          background: var(--color-surface);
          border: 1px solid var(--border-subtle, rgba(26, 26, 26, 0.1));
          border-radius: 14px;
          padding: 24px 26px;
          margin: 40px 0;
        }
        .art__tip-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin: 0 0 12px;
        }
        .art__tip-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .art__tip-text {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
          text-wrap: pretty;
        }
        .art__sci {
          border-top: 1px solid var(--border-subtle, rgba(26, 26, 26, 0.12));
          border-bottom: 1px solid var(--border-subtle, rgba(26, 26, 26, 0.12));
          padding: 28px 0;
          margin: 44px 0;
        }
        .art__sci-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          margin: 0 0 14px;
        }
        .art__sci-text {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.75;
          color: var(--color-text-secondary);
          margin: 0;
          text-wrap: pretty;
        }
        .art__list {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .art__list li {
          position: relative;
          padding-left: 22px;
          font-family: var(--font-body);
          font-size: 15.5px;
          line-height: 1.7;
          color: var(--color-text-primary);
          text-wrap: pretty;
        }
        .art__list-marker {
          position: absolute;
          left: 0;
          top: 7px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .art__fig {
          margin: 44px 0;
        }
        .art__fig img {
          width: 100%;
          border-radius: 14px;
          display: block;
        }
        .art__fig figcaption {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--color-text-tertiary);
          margin-top: 12px;
        }

        .art__sig {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 56px;
        }
        .art__sig-rule {
          width: 40px;
          height: 3px;
          border-radius: 2px;
        }
        .art__sig p {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          margin: 0;
        }

        .art__next {
          max-width: 680px;
          margin: 72px auto 0;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px 32px;
          border: 1px solid var(--border-subtle, rgba(26, 26, 26, 0.1));
          border-radius: 16px;
          background: var(--color-surface);
          text-decoration: none;
          transition: transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
        }
        .art__next:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(26, 26, 26, 0.08);
        }
        .art__next-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          flex-shrink: 0;
        }
        .art__next-title {
          font-family: var(--font-display);
          font-size: 20px;
          line-height: 1.25;
          color: var(--color-text-primary);
          flex: 1;
          text-wrap: balance;
        }
        .art__next-arrow {
          font-family: var(--font-mono);
          font-size: 18px;
          color: var(--color-text-primary);
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .art__hero {
            aspect-ratio: 4 / 3;
          }
          .art__next {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  )
}
