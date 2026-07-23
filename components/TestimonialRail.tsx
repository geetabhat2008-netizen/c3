'use client'

import Image from 'next/image'
import { useRef } from 'react'

const STORIES = [
  {
    image: '/images/lifestyle/morning-session.png',
    alt: 'A calm morning migraine-care session at home',
    quote: 'My mornings feel possible again.',
    name: 'Sarah M.',
  },
  {
    image: '/images/lifestyle/office-glasses.png',
    alt: 'A customer wearing light-filtering glasses while working',
    quote: 'I can finish the workday without hiding from the screen.',
    name: 'Daniel R.',
  },
  {
    image: '/images/lifestyle/cryo-attack.png',
    alt: 'A customer using cooling therapy during a migraine attack',
    quote: 'The first sign no longer becomes the whole day.',
    name: 'Priya N.',
  },
  {
    image: '/images/lifestyle/cervical-desk.png',
    alt: 'A customer using cervical support at a desk',
    quote: 'Relief finally fits into my actual routine.',
    name: 'Hannah K.',
  },
  {
    image: '/images/lifestyle/sleep-buds.png',
    alt: 'A restful bedroom prepared for quiet sleep',
    quote: 'I sleep through the noise instead of bracing for it.',
    name: 'Marcus T.',
  },
]

export default function TestimonialRail() {
  const railRef = useRef<HTMLDivElement>(null)

  const move = (direction: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.72, 520), behavior: 'smooth' })
  }

  return (
    <section className="testimonial-rail" aria-labelledby="testimonial-rail-title">
      <div className="testimonial-rail__header">
        <div>
          <p className="testimonial-rail__eyebrow">In their own rhythm</p>
          <h2 id="testimonial-rail-title">Small shifts. Real days returned.</h2>
        </div>
        <div className="testimonial-rail__controls" aria-label="Testimonial carousel controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous testimonials">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next testimonials">→</button>
        </div>
      </div>

      <div ref={railRef} className="testimonial-rail__track" tabIndex={0} aria-label="Customer stories">
        {STORIES.map((story) => (
          <figure key={story.name} className="testimonial-rail__card">
            <div className="testimonial-rail__image">
              <Image src={story.image} alt={story.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1100px) 46vw, 34vw" />
            </div>
            <figcaption>
              <blockquote>{story.quote}</blockquote>
              <span>{story.name} · Verified customer</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
