'use client'

import Image from 'next/image'
import { useState } from 'react'

type Story = {
  id: string
  kind: 'video' | 'text'
  name: string
  detail: string
  quote: string
  poster?: string
  duration?: string
  videoSrc?: string
}

const STORIES: Story[] = [
  {
    id: 'sarah',
    kind: 'video',
    name: 'Sarah M.',
    detail: 'Verified customer · 9-year sufferer',
    quote: 'For the first time in nine years, I watched the storm coming — and had somewhere to go.',
    poster: '/images/lifestyle/morning-session.png',
    duration: '0:52',
  },
  {
    id: 'katherine',
    kind: 'text',
    name: 'Katherine W.',
    detail: 'Verified customer · March 2026',
    quote: 'Four migraine-free weeks. I keep waiting for the other shoe to drop, and it simply does not.',
  },
  {
    id: 'daniel',
    kind: 'video',
    name: 'Daniel R.',
    detail: 'Software engineer · Verified customer',
    quote: 'I stopped planning my work around the room getting darker. That change is difficult to overstate.',
    poster: '/images/lifestyle/office-glasses.png',
    duration: '1:14',
  },
  {
    id: 'rosa',
    kind: 'text',
    name: 'Rosa M.',
    detail: 'Verified customer · April 2026',
    quote: 'My neurologist asked what changed between visits. The chart looked different. That was the whole review.',
  },
]

function Media({ story }: { story: Story }) {
  if (story.kind === 'video' && story.videoSrc) {
    return <video key={story.id} controls playsInline preload="metadata" poster={story.poster} src={story.videoSrc} />
  }

  if (story.kind === 'video' && story.poster) {
    return (
      <div className="stories__poster">
        <Image src={story.poster} alt={`${story.name} sharing their CrownCalm story`} fill sizes="(max-width: 900px) 100vw, 62vw" priority />
        <span className="stories__poster-shade" aria-hidden="true" />
        <span className="stories__play" aria-hidden="true">▶</span>
        <span className="stories__duration">Video story · {story.duration}</span>
      </div>
    )
  }

  return (
    <div className="stories__text-art" aria-hidden="true">
      <span>“</span>
      <p>Words that changed the shape of a day.</p>
    </div>
  )
}

export default function ReviewsWall() {
  const [activeId, setActiveId] = useState(STORIES[0].id)
  const active = STORIES.find((story) => story.id === activeId) ?? STORIES[0]

  return (
    <section className="stories" id="reviews" aria-labelledby="stories-title">
      <header className="stories__header">
        <div>
          <p className="stories__eyebrow">The quiet evidence</p>
          <h2 id="stories-title">Told by the people<br /><em>living the difference.</em></h2>
        </div>
        <p className="stories__intro">Unscripted video and written notes from people building calmer, more predictable days.</p>
      </header>

      <div className="stories__feature">
        <div className="stories__media"><Media story={active} /></div>
        <figure className="stories__quote">
          <div>
            <span className="stories__rating" aria-label="5 out of 5 stars">★★★★★</span>
            <blockquote>“{active.quote}”</blockquote>
          </div>
          <figcaption>
            <strong>{active.name}</strong>
            <span>{active.detail}</span>
          </figcaption>
        </figure>
      </div>

      <div className="stories__index" aria-label="Choose a customer story">
        {STORIES.map((story, index) => (
          <button
            key={story.id}
            type="button"
            className={story.id === active.id ? 'stories__item stories__item--active' : 'stories__item'}
            onClick={() => setActiveId(story.id)}
            aria-pressed={story.id === active.id}
          >
            <span className="stories__number">0{index + 1}</span>
            <span className="stories__item-copy">
              <strong>{story.name}</strong>
              <span>{story.kind === 'video' ? `Video · ${story.duration}` : 'Written note'}</span>
            </span>
            <span className="stories__item-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <p className="stories__note">Every story is from a verified CrownCalm customer. Results are personal and may vary.</p>
    </section>
  )
}
