'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import './TestimonialCarousel.module.css'

const testimonials = [
  {
    quote: 'For the first time, I have a ritual that helps before the pain takes over. It feels considered, calming, and genuinely useful.',
    name: 'Sarah M.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/sarah-m.png',
  },
  {
    quote: 'The suite has changed how I approach difficult days. Everything works together, and I no longer feel like I am improvising relief.',
    name: 'Daniel R.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/daniel-r.png',
  },
  {
    quote: 'I keep it beside my bed and reach for it at the earliest sign. That small sense of control has made an enormous difference.',
    name: 'Maya L.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/maya-l.png',
  },
  {
    quote: 'It is beautifully made, but more importantly, it fits into real life. I can use the protocol without stopping my entire day.',
    name: 'Elena V.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/elena-v.png',
  },
  {
    quote: 'The experience feels quiet and intentional. Even on high-pressure workdays, I have a clear plan instead of simply pushing through.',
    name: 'Jordan K.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/jordan-k.png',
  },
  {
    quote: 'My evenings feel less anxious because I know what to do when symptoms begin. The whole system is reassuringly simple.',
    name: 'Priya S.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/priya-s.png',
  },
  {
    quote: 'I was looking for something more thoughtful than another quick fix. CrownCalm gave me a routine I can actually stay consistent with.',
    name: 'Naomi C.',
    role: 'Verified Sanctuary Suite owner',
    image: '/images/testimonials/naomi-c.png',
  },
]

export default function TestimonialCarousel() {
  return (
    <section className="testimonial-carousel" aria-labelledby="testimonial-carousel-title">
      <div className="testimonial-carousel__header">
        <p>Real routines, real relief</p>
        <h2 id="testimonial-carousel-title">What life feels like with a plan.</h2>
        <span>Seven members share how the Sanctuary Suite fits into their everyday lives.</span>
      </div>

      <motion.div
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
              <span className="testimonial-carousel__quote-mark" aria-hidden="true">“</span>
              <blockquote>{testimonial.quote}</blockquote>
              <p><strong>{testimonial.name}</strong><span>{testimonial.role}</span></p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <p className="testimonial-carousel__hint">Scroll to read more <span aria-hidden="true">→</span></p>
    </section>
  )
}
