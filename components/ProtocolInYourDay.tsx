'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const TABS = [
  {
    id: 'morning', label: 'Morning', time: '6–9am', image: '/images/lifestyle/morning-session.png',
    alt: 'A woman using the Neuro-Massager during a quiet morning routine', title: 'Morning Focus',
    body: 'Start with the gate already closed — 15 quiet minutes before the day begins.',
    stat: '15', unit: 'min', statTitle: 'before your day begins', statBody: 'Rhythmic compression helps close the pain gate before daily sensory load builds.',
    mode: 'Morning Session', spec1: '15 minutes', spec2: '20–40 kPa', quote: 'I do 15 minutes before I open my laptop. I haven’t missed a Monday in six weeks.', name: 'K.M.',
  },
  {
    id: 'office', label: 'Office', time: '9am–5pm', image: '/images/lifestyle/office-glasses.png',
    alt: 'A man wearing the FL-41 Optic Shield at a bright office desk', title: 'At the Office',
    body: 'Filter the exact wavelength that fires the pathway, so 3pm never becomes a countdown.',
    stat: '80', unit: '%', statTitle: 'of trigger light filtered', statBody: 'FL-41 lenses reduce exposure across the working day without darkening your world.',
    mode: 'Optic Shield', spec1: '480–520 nm', spec2: 'All-day wear', quote: 'By 3pm I’ve stopped my usual countdown to how much longer I can last.', name: 'D.R.',
  },
  {
    id: 'attack', label: 'Attack', time: 'Any time', image: '/images/lifestyle/cryo-attack.png',
    alt: 'A woman resting with the Cryo-Compression Core in a dim room', title: 'At the First Sign',
    body: 'Cold at the vascular source, in the right order — before the attack fully arrives.',
    stat: '20', unit: 'min', statTitle: 'at first onset', statBody: 'Targeted cooling constricts inflamed vessels while gentle pressure settles the signal.',
    mode: 'Cryo Relief', spec1: '2–8°C', spec2: '20 min max', quote: 'The first time I used the cryo wrap in the right order, the attack never fully arrived.', name: 'A.S.',
  },
  {
    id: 'sleep', label: 'Sleep', time: '10pm–6am', image: '/images/lifestyle/sleep-buds.png',
    alt: 'A woman sleeping on her side wearing the Acoustic Silence Sleep Buds', title: 'Rest & Sleep',
    body: 'Mask the room without pillow pressure, so sensory load does not follow you into sleep.',
    stat: '30', unit: 'dB', statTitle: 'of disruption masked', statBody: 'Low-profile buds deliver brown noise for side-sleep comfort through the night.',
    mode: 'Sleep Mode', spec1: '10 hr playback', spec2: 'Brown noise', quote: 'I stopped waking at 2am with pressure behind my eye. It’s part of my nightly routine.', name: 'T.B.',
  },
  {
    id: 'desk', label: 'Desk', time: 'Work hours', image: '/images/lifestyle/cervical-desk.png',
    alt: 'A man wearing the Cervical Axis Module at a modern desk', title: 'At the Desk',
    body: 'Decompress the second gate cranial devices cannot reach while you continue your day.',
    stat: '60', unit: 'min', statTitle: 'of targeted decompression', statBody: 'The cervical module addresses upper-neck tension without interrupting desk work.',
    mode: 'Desk Mode', spec1: 'C0–C2 target', spec2: '60 min wear', quote: 'The neck module is the only piece I wear on calls. My afternoon threshold is higher.', name: 'R.P.',
  },
] as const

type Tab = (typeof TABS)[number]

export default function ProtocolInYourDay() {
  const [activeId, setActiveId] = useState<Tab['id']>('morning')
  const reduceMotion = useReducedMotion()
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0]

  return (
    <section id="protocol-in-your-day" className="piyd">
      <div className="piyd__inner">
        <header className="piyd__header">
          <div>
            <p className="piyd__eyebrow">The protocol, hour by hour</p>
            <h2>A pillar for every part of your day.</h2>
            <p className="piyd__lede">One compound protocol adapts from morning focus and office light to attacks, sleep, and desk work.</p>
          </div>
          <a href="/products" className="piyd__cta">Explore the Suite <span aria-hidden="true">↗</span></a>
        </header>

        <div className="piyd__tabs" role="tablist" aria-label="Moments in your day">
          {TABS.map((tab) => {
            const selected = tab.id === activeId
            return (
              <button key={tab.id} id={`tab-${tab.id}`} role="tab" aria-selected={selected} aria-controls="piyd-panel" tabIndex={selected ? 0 : -1} onClick={() => setActiveId(tab.id)} className={selected ? 'is-active' : ''}>
                <span className="piyd__tab-mark" aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            id="piyd-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            key={active.id}
            className={`piyd__grid piyd__grid--${active.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
          >
            <article className="piyd__image-card">
              <Image src={active.image} alt={active.alt} fill sizes="(max-width: 800px) 100vw, 48vw" className="piyd__image" />
              <div className="piyd__image-shade" aria-hidden="true" />
              <span className="piyd__time">{active.time}</span>
              <div className="piyd__image-copy">
                <p>{active.title}</p>
                <h3>{active.body}</h3>
              </div>
            </article>

            <div className="piyd__details">
              <div className="piyd__top-cards">
                <article className="piyd__stat-card">
                  <div className="piyd__ring" aria-hidden="true"><span>{active.stat}<small>{active.unit}</small></span></div>
                  <h3>{active.statTitle}</h3>
                  <p>{active.statBody}</p>
                </article>
                <article className="piyd__mode-card">
                  <div className="piyd__mode-chip">
                    <strong>{active.mode}</strong>
                    <span>{active.spec1}</span><span>{active.spec2}</span>
                  </div>
                  <p>Use this pillar at <strong>{active.time}</strong> as part of the full CrownCalm protocol.</p>
                </article>
              </div>

              <figure className="piyd__quote">
                <div className="piyd__quote-top">
                  <span>Member perspective</span>
                  <div className="piyd__stars" aria-label="5 out of 5 stars">★★★★★</div>
                </div>
                <blockquote>“{active.quote}”</blockquote>
                <figcaption>
                  <span className="piyd__author-mark" aria-hidden="true">{active.name.replaceAll('.', '')}</span>
                  <span className="piyd__author-copy">
                    <strong>{active.name}</strong>
                    <span>Verified CrownCalm member</span>
                  </span>
                  <span className="piyd__verified">Verified experience</span>
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .piyd { background: var(--color-bg); padding: clamp(64px, 9vw, 112px) 0; }
        .piyd__inner { max-width: 1200px; margin: 0 auto; padding: 0 max(24px, 4vw); }
        .piyd__header { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 34px; }
        .piyd__header > div { max-width: 720px; }
        .piyd__eyebrow { margin: 0 0 12px; font: 700 10px/1.4 var(--font-mono); letter-spacing: .14em; text-transform: uppercase; color: var(--color-primary); }
        .piyd__header h2 { margin: 0; font: 400 clamp(36px, 4.5vw, 58px)/1 var(--font-display); letter-spacing: -.035em; color: var(--color-text-primary); }
        .piyd__lede { max-width: 620px; margin: 16px 0 0; font: 400 15px/1.6 var(--font-body); color: var(--color-text-secondary); }
        .piyd__cta { display: inline-flex; min-height: 46px; flex: 0 0 auto; align-items: center; gap: 12px; padding: 0 20px; border: 1px solid var(--color-text-primary); border-radius: 999px; font: 700 10px/1 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--color-text-primary); }
        .piyd__tabs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 18px; }
        .piyd__tabs button { display: flex; min-width: 0; height: 54px; align-items: center; justify-content: center; gap: 10px; border: 1px solid var(--border-default); border-radius: 999px; background: var(--color-surface-inset); font: 700 11px/1 var(--font-mono); color: var(--color-text-secondary); cursor: pointer; transition: background-color .18s ease, color .18s ease, border-color .18s ease; }
        .piyd__tabs button:nth-child(1) { --tab-accent: #cdb4f5; }
        .piyd__tabs button:nth-child(2) { --tab-accent: #df83ef; }
        .piyd__tabs button:nth-child(3) { --tab-accent: #f2a24c; }
        .piyd__tabs button:nth-child(4) { --tab-accent: #f0c85b; }
        .piyd__tabs button:nth-child(5) { --tab-accent: #6e9cf2; }
        .piyd__tabs button:hover { border-color: var(--color-text-tertiary); color: var(--color-text-primary); }
        .piyd__tabs button.is-active { border-color: var(--color-text-primary); background: var(--color-surface-inset); color: var(--color-text-primary); box-shadow: inset 0 0 0 1px var(--color-text-primary); }
        .piyd__tab-mark { width: 14px; height: 14px; border: 1px solid var(--tab-accent); border-radius: 50%; background: transparent; }
        .piyd__tabs button.is-active .piyd__tab-mark { background: var(--tab-accent); border-color: var(--tab-accent); box-shadow: inset 0 0 0 3px var(--color-surface-inset); }
        .piyd__grid { --moment-accent: #cdb4f5; --moment-soft: #eee4fa; --moment-deep: #6e4e93; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; min-height: 570px; }
        .piyd__grid--morning { --moment-accent: #cdb4f5; --moment-soft: #eee4fa; --moment-deep: #6e4e93; }
        .piyd__grid--office { --moment-accent: #df83ef; --moment-soft: #f6e2f8; --moment-deep: #8d3f99; }
        .piyd__grid--attack { --moment-accent: #f2a24c; --moment-soft: #fae7d1; --moment-deep: #9a5720; }
        .piyd__grid--sleep { --moment-accent: #f0c85b; --moment-soft: #f8efd2; --moment-deep: #7c651f; }
        .piyd__grid--desk { --moment-accent: #6e9cf2; --moment-soft: #dfe9fa; --moment-deep: #315caa; }
        .piyd__image-card { position: relative; min-height: 570px; overflow: hidden; border-radius: 18px; background: var(--color-text-primary); }
        .piyd__image { object-fit: cover; }
        .piyd__image-shade { position: absolute; inset: 0; background: rgba(20, 18, 16, .28); }
        .piyd__time { position: absolute; top: 28px; left: 28px; padding: 10px 16px; border: 1px solid rgba(255,255,255,.7); border-radius: 999px; background: rgba(20,18,16,.42); font: 700 10px/1 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--color-surface-inset); backdrop-filter: blur(8px); }
        .piyd__image-copy { position: absolute; right: 24px; bottom: 24px; left: 24px; max-width: 520px; padding: 22px; border-radius: 12px; background: rgba(20,18,16,.58); color: var(--color-surface-inset); backdrop-filter: blur(6px); }
        .piyd__image-copy p { margin: 0 0 14px; font: 700 11px/1.3 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; color: var(--color-surface-inset); }
        .piyd__image-copy h3 { max-width: 19ch; margin: 0; font: 400 clamp(25px, 3vw, 38px)/1.2 var(--font-display); letter-spacing: -.02em; color: var(--color-surface-inset); text-wrap: pretty; }
        .piyd__details { display: grid; grid-template-rows: 1fr .8fr; gap: 18px; min-width: 0; }
        .piyd__top-cards { display: grid; grid-template-columns: .9fr 1.1fr; gap: 18px; }
        .piyd__stat-card, .piyd__mode-card, .piyd__quote { margin: 0; border: 1px solid var(--border-default); border-radius: 18px; }
        .piyd__stat-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px 24px; border-color: var(--moment-accent); background: var(--moment-deep); text-align: center; color: var(--color-surface-inset); transition: background-color .24s ease, border-color .24s ease; }
        .piyd__ring { display: grid; width: 106px; height: 106px; place-items: center; border: 9px solid rgba(242,236,228,.32); border-top-color: var(--moment-accent); border-radius: 50%; transform: rotate(18deg); }
        .piyd__ring span { font: 400 31px/1 var(--font-display); transform: rotate(-18deg); }
        .piyd__ring small { margin-left: 3px; font: 700 10px/1 var(--font-mono); text-transform: uppercase; }
        .piyd__stat-card h3 { margin: 22px 0 8px; font: 400 21px/1.2 var(--font-display); }
        .piyd__stat-card p { max-width: 24ch; margin: 0; font: 400 12px/1.5 var(--font-body); color: rgba(255,255,255,.78); }
        .piyd__mode-card { display: flex; flex-direction: column; justify-content: space-between; padding: 24px; background: var(--color-surface-inset); }
        .piyd__mode-chip { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 14px; padding: 18px; border-radius: 12px; background: var(--moment-soft); color: var(--color-text-primary); transition: background-color .24s ease; }
        .piyd__mode-chip strong { grid-column: 1 / -1; font: 400 22px/1.1 var(--font-display); color: var(--moment-deep); }
        .piyd__mode-chip span { padding-top: 9px; border-top: 1px solid var(--border-default); font: 700 9px/1.3 var(--font-mono); text-transform: uppercase; letter-spacing: .06em; }
        .piyd__mode-card > p { margin: 24px 0 4px; font: 400 18px/1.4 var(--font-body); color: var(--color-text-primary); }
        .piyd__quote { position: relative; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; padding: clamp(26px, 3.2vw, 38px); border-color: rgba(26,26,26,.15); background: var(--color-surface-inset); box-shadow: none; }
        .piyd__quote::before { position: absolute; top: 0; right: 0; width: 8px; height: 100%; background: var(--moment-accent); content: ''; }
        .piyd__quote::after { position: absolute; right: 8px; bottom: 0; width: 92px; height: 92px; border-radius: 92px 0 0 0; background: var(--moment-soft); content: ''; opacity: .65; }
        .piyd__quote-top { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .piyd__quote-top > span { font: 700 9px/1 var(--font-mono); letter-spacing: .14em; text-transform: uppercase; color: var(--color-text-tertiary); }
        .piyd__stars { margin: 0; font: 700 12px/1 var(--font-mono); letter-spacing: .16em; color: var(--moment-deep); }
        .piyd__quote blockquote { position: relative; z-index: 1; max-width: 30ch; margin: 22px 0 26px; font: 400 clamp(22px, 2.2vw, 29px)/1.28 var(--font-display); letter-spacing: -.02em; color: var(--color-text-primary); text-wrap: pretty; }
        .piyd__quote figcaption { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; padding-top: 18px; border-top: 1px solid rgba(26,26,26,.12); }
        .piyd__author-mark { display: inline-flex; width: 38px; height: 38px; flex: 0 0 38px; align-items: center; justify-content: center; margin: 0; border-radius: 50%; background: var(--moment-soft); font: 700 10px/1 var(--font-mono); letter-spacing: .06em; color: var(--moment-deep); }
        .piyd__author-copy { display: flex; min-width: 0; flex-direction: column; gap: 4px; margin: 0; }
        .piyd__author-copy strong { font: 700 10px/1 var(--font-mono); letter-spacing: .12em; color: var(--color-text-primary); }
        .piyd__author-copy > span { margin: 0; font: 500 8px/1.2 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; color: var(--color-text-tertiary); }
        .piyd__verified { margin: 0 12px 0 auto; padding: 7px 9px; border: 1px solid rgba(26,26,26,.12); border-radius: 999px; font: 700 8px/1 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--color-text-secondary); }
        @media (max-width: 900px) {
          .piyd__tabs { display: flex; overflow-x: auto; scrollbar-width: none; }
          .piyd__tabs button { min-width: 150px; }
          .piyd__grid { grid-template-columns: 1fr; }
          .piyd__image-card { min-height: 560px; }
        }
        @media (max-width: 600px) {
          .piyd { padding: 64px 0; }
          .piyd__inner { padding: 0 16px; }
          .piyd__header { align-items: flex-start; flex-direction: column; margin-bottom: 26px; }
          .piyd__header h2 { font-size: 39px; }
          .piyd__cta { min-height: 42px; }
          .piyd__tabs { margin-right: -16px; padding-right: 16px; }
          .piyd__tabs button { min-width: 130px; height: 48px; }
          .piyd__image-card { min-height: 480px; border-radius: 14px; }
          .piyd__time { top: 18px; left: 18px; }
          .piyd__image-copy { right: 22px; bottom: 24px; left: 22px; }
          .piyd__image-copy h3 { font-size: 27px; }
          .piyd__details { grid-template-rows: auto; }
          .piyd__top-cards { grid-template-columns: 1fr; }
          .piyd__stat-card, .piyd__mode-card, .piyd__quote { border-radius: 14px; }
          .piyd__stat-card { min-height: 330px; }
          .piyd__quote { min-height: 320px; padding: 26px 22px; }
          .piyd__quote blockquote { margin: 24px 0 28px; font-size: 24px; }
          .piyd__verified { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .piyd__tabs button { transition: none; } }
      `}</style>
    </section>
  )
}
