'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface SpecItem {
  label: string
  value: string
}

interface StagePanel {
  id: string
  headline: string
  body: string
  specs: SpecItem[]
  image: string
  imageAlt: string
  reverse: boolean // false = text left / image right; true = image left / text right
}

const PANELS: StagePanel[] = [
  {
    id: 'prodrome-stage',
    headline: 'Address it before the storm arrives.',
    body: "Migraines rarely start at full intensity. There's a warning window first — tension building at the base of the skull, across the neck and shoulders — before the cascade fully takes hold. The 360° Neuro-Massager and Cervical Axis Module are built for that window, not the peak. Rhythmic, organized compression at the cranial and cervical relay points closes the pain gate at its source, before the trigeminal cascade engages. Used during prodrome, this pairing can change the trajectory of the attack, not just soften the discomfort.",
    specs: [
      { label: 'Pressure', value: '20–40 kPa therapeutic window' },
      { label: 'Wear time', value: 'up to 60 min, hands-free' },
      { label: 'Best used', value: 'at first tension or tightness' },
    ],
    image: '/images/stages/prodrome-stage.jpg',
    imageAlt: 'Person seated, calm, wearing Neuro-Massager with Cervical Axis Module visible around neck in an everyday home living setting',
    reverse: false,
  },
  {
    id: 'active-attack-stage',
    headline: 'When the storm is already here.',
    body: 'Once a migraine reaches full swing, the mechanism changes — and so should the response. Dilated meningeal vessels are pressing against sensitized nerve tissue, producing the throbbing that matches a heartbeat. Cold applied to the occipital and temporal sites causes vasoconstriction, narrowing those vessels and directly reducing the pressure driving the pain. This is the exact moment the Cryo-Compression Core is designed for — active attack, not before it and not after.',
    specs: [
      { label: 'Temperature', value: '2–8°C sustained cooling' },
      { label: 'Session', value: '20 min on, 10 min off — never longer' },
      { label: 'Why not heat', value: 'heat dilates vessels further mid-attack' },
    ],
    image: '/images/stages/active-attack-stage.jpg',
    imageAlt: 'Person lying down in dim, quiet room, Cryo-Compression Core in place, dark room, minimal light, conveying sanctuary retreat',
    reverse: true,
  },
  {
    id: 'prevention-stage',
    headline: 'Prevent it before it fills the bucket.',
    body: "Most triggers don't announce themselves. Office lighting flickers at 100–120Hz — below what's consciously visible, not below what the eye's second nervous system registers. Ambient noise does the same, filling the sensory bucket hours before symptoms appear. FL-41 filters the exact 480–520nm band responsible for that activation, while the Sleep Buds attenuate incoming sound and mask what's left with low-frequency Brown Noise. Worn during ordinary hours — at a desk, on a commute — they're built to prevent the overflow, not respond to it.",
    specs: [
      { label: 'FL-41 filtration', value: 'up to 80% of 480–520nm band' },
      { label: 'Passive attenuation', value: '30dB' },
      { label: 'Best used', value: 'proactively, during daily exposure' },
    ],
    image: '/images/stages/prevention-stage.jpg',
    imageAlt: 'Person at a desk under office lighting, wearing FL-41 glasses and sleep buds, calm and focused in a professional workplace setting',
    reverse: false,
  },
]

export default function AddressEveryStage() {
  return (
    <section
      id="address-every-stage"
      className="aes-section"
      aria-label="Address It At Every Stage"
    >
      <div className="aes-container">
        {PANELS.map((panel, idx) => (
          <motion.div
            key={panel.id}
            className={`aes-row ${panel.reverse ? 'aes-row--reverse' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── TEXT COLUMN ────────────────────────────────────────── */}
            <div className="aes-text-col">
              <div className="aes-text-wrap">
                {/* Headline: Editorial serif */}
                <h2 className="aes-headline">{panel.headline}</h2>

                {/* Body Copy: Airy, comfortable line-height */}
                <p className="aes-body">{panel.body}</p>

                {/* Clean Specs Strip: Understated micro-data */}
                <div className="aes-spec-strip">
                  {panel.specs.map((item, sIdx) => (
                    <span key={sIdx} className="aes-spec-item">
                      <span className="aes-spec-label">{item.label}:</span>{' '}
                      <span className="aes-spec-val">{item.value}</span>
                      {sIdx < panel.specs.length - 1 && (
                        <span className="aes-spec-dot" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── IMAGE COLUMN ───────────────────────────────────────── */}
            <div className="aes-image-col">
              <div className="aes-image-frame">
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  width={1000}
                  height={667}
                  sizes="(max-width: 960px) 100vw, 55vw"
                  className="aes-image"
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        /* ==========================================================================
           SECTION CONTAINER — Warm luminous ivory #FAF8F5, luxury editorial aesthetic
           ========================================================================== */
        .aes-section {
          background-color: #FAF8F5;
          color: #171717;
          padding: clamp(80px, 8vw, 130px) max(24px, 5vw);
          position: relative;
        }

        .aes-container {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(80px, 9vw, 130px);
        }

        /* ── TWO-COLUMN ROW GRID (Side-by-Side) ──────────────────────── */
        .aes-row {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(300px, 530px);
          gap: clamp(44px, 5.5vw, 84px);
          align-items: center;
        }

        /* Panel 2 (Reverse): Image Left / Text Right */
        .aes-row--reverse {
          grid-template-columns: minmax(300px, 530px) minmax(320px, 1fr);
        }

        .aes-row--reverse .aes-text-col {
          order: 2;
        }

        .aes-row--reverse .aes-image-col {
          order: 1;
        }

        /* ── TEXT COLUMN ────────────────────────────────────────────── */
        .aes-text-col {
          display: flex;
          align-items: center;
          width: 100%;
          min-width: 0;
        }

        .aes-text-wrap {
          width: 100%;
          max-width: 480px;
        }

        /* Headline: Brand display font (Geist Display) */
        .aes-headline {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.4vw, 44px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--color-text-primary, #0F0F0F);
          margin: 0 0 20px 0;
          text-wrap: balance;
        }

        /* Body copy: Brand body font (Geist Sans) */
        .aes-body {
          font-family: var(--font-body);
          font-size: clamp(15px, 1.08vw, 16px);
          line-height: 1.65;
          letter-spacing: -0.01em;
          color: var(--color-text-secondary, #4A453F);
          margin: 0 0 24px 0;
          max-width: 470px;
        }

        /* Specs Strip: Technical data font (Geist Mono) */
        .aes-spec-strip {
          border-top: 1px solid #E6E0D5;
          padding-top: 18px;
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 8px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          line-height: 1.55;
          letter-spacing: -0.01em;
          color: #635E57;
        }

        .aes-spec-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .aes-spec-label {
          font-weight: 600;
          color: #2E2B27;
        }

        .aes-spec-val {
          color: #635E57;
        }

        .aes-spec-dot {
          color: #A8A196;
          margin-left: 6px;
          margin-right: 2px;
          user-select: none;
        }

        /* ── IMAGE COLUMN (Slightly narrower width, no zoom on hover) ── */
        .aes-image-col {
          width: 100%;
          max-width: 530px;
          min-width: 0;
        }

        .aes-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 20px;
          overflow: hidden;
          background-color: #EAE5DC;
          box-shadow: 0 8px 24px -4px rgba(24, 24, 27, 0.05), 0 2px 6px -2px rgba(24, 24, 27, 0.03);
        }

        .aes-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── RESPONSIVE ADAPTATION ──────────────────────────────────── */
        @media (max-width: 960px) {
          .aes-section {
            padding: 64px 20px;
          }

          .aes-container {
            gap: 68px;
          }

          .aes-row,
          .aes-row--reverse {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .aes-row--reverse .aes-text-col,
          .aes-row--reverse .aes-image-col {
            order: unset;
          }

          .aes-text-col,
          .aes-text-wrap {
            max-width: 100%;
          }

          .aes-headline {
            font-size: 28px;
          }

          .aes-image-frame {
            aspect-ratio: 16 / 10;
            border-radius: 18px;
          }
        }

        @media (max-width: 540px) {
          .aes-container {
            gap: 52px;
          }

          .aes-headline {
            font-size: 25px;
          }

          .aes-body {
            font-size: 14.5px;
          }

          .aes-spec-strip {
            font-size: 11.5px;
            gap: 4px 8px;
          }

          .aes-image-frame {
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  )
}
