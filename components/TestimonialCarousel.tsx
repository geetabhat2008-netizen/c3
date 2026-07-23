'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import './TestimonialCarousel.module.css'

const testimonials = [
  {
    quote: 'For the first time in nine years, I watched the storm coming — and had somewhere to go.',
    name: 'Sarah M.',
    role: 'Verified Customer · 9-Year Migraine History',
    image: '/images/testimonials/sarah-m.png',
  },
  {
    quote: 'The Sanctuary Protocol replaced the guesswork. At the first warning sign, I know exactly which step comes next.',
    name: 'Daniel R.',
    role: 'Verified Customer · Sanctuary Suite',
    image: '/images/testimonials/daniel-r.png',
  },
  {
    quote: 'The Cryo-Core and Neuro-Massager now live beside my bed. Starting early has changed how I meet difficult mornings.',
    name: 'Maya L.',
    role: 'Verified Customer · 6-Year Migraine History',
    image: '/images/testimonials/maya-l.png',
  },
  {
    quote: 'The Optic Shield lets me stay at my desk when light sensitivity begins, without forcing myself through the glare.',
    name: 'Elena V.',
    role: 'Verified Customer · Optic Shield User',
    image: '/images/testimonials/elena-v.png',
  },
  {
    quote: 'Five instruments sounds like a lot. In practice, the protocol is clear, quiet, and easy to follow when thinking is hardest.',
    name: 'Jordan K.',
    role: 'Verified Customer · Sanctuary Suite',
    image: '/images/testimonials/jordan-k.png',
  },
  {
    quote: 'The Cervical Axis Module gives me a way to address the neck tension that so often arrives before the rest.',
    name: 'Priya S.',
    role: 'Verified Customer · 11-Year Migraine History',
    image: '/images/testimonials/priya-s.png',
  },
  {
    quote: 'CrownCalm gave me one considered system instead of a drawer full of disconnected fixes.',
    name: 'Naomi C.',
    role: 'Verified Customer · Sanctuary Suite',
    image: '/images/testimonials/naomi-c.png',
  },
]

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollTestimonials = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="testimonial-carousel" aria-labelledby="testimonial-carousel-title">
      <div className="testimonial-carousel__header">
        <div>
          <p>Stories from the Sanctuary</p>
          <h2 id="testimonial-carousel-title">A protocol for when the storm arrives.</h2>
        </div>
        <div className="testimonial-carousel__controls" aria-label="Testimonial navigation">
          <button type="button" onClick={() => scrollTestimonials(-1)} aria-label="Previous testimonials">←</button>
          <button type="button" onClick={() => scrollTestimonials(1)} aria-label="Next testimonials">→</button>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        className="testimonial-carousel__track"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
        aria-label="Customer testimonials"
        tabIndex={0}
      >
        {testimonials.map((testimonial, index) => (
          <motion.figure
            className="testimonial-carousel__card"
            key={testimonial.name}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
            }}
          >
            <Image
              src={testimonial.image}
              alt={`Portrait of ${testimonial.name}`}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 360px"
              className="testimonial-carousel__portrait"
              priority={index < 2}
            />
            <div className="testimonial-carousel__shade" />
            <figcaption>
              <blockquote>{testimonial.quote}</blockquote>
              <p><strong>{testimonial.name}</strong><span>{testimonial.role}</span></p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}
