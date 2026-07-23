# CrownCalm — Sanctuary Suite
### Next.js + Tailwind CSS · DTC Neurological Wellness Brand

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS custom properties (tokens.css) |
| Animations | Framer Motion |
| WebGL Background | Vanilla Canvas 2D (dot-matrix, no Three.js) |
| Fonts | Playfair Display (Google Fonts) + Space Mono (Google Fonts) |
| Deploy | Vercel |

---

## Project Structure

```
crowncalm/
├── app/
│   ├── layout.tsx              # Root layout — nav, fonts, WebGL bg
│   ├── page.tsx                # Home page
│   ├── products/
│   │   └── page.tsx            # Product listing — Specimen Expander
│   └── products/[slug]/
│       └── page.tsx            # PDP — full specs + bento grid
├── components/
│   ├── Nav.tsx                 # Sticky frosted-glass nav
│   ├── WebGLBackground.tsx     # Dot-matrix canvas (full-bleed, always behind)
│   ├── HeroSection.tsx         # Home S1
│   ├── TrustBar.tsx            # 5-signal strip (always below hero + CTA)
│   ├── BucketTheory.tsx        # Home S2 — animated diagram
│   ├── PainAcknowledgment.tsx  # Home S3 — 3-column typographic
│   ├── FourPillars.tsx         # Home S4 — expandable panels
│   ├── CompetitorMatrix.tsx    # Home S5 — comparison table
│   ├── SocialProof.tsx         # Home S6 — 3 zones
│   ├── ThirtyDayChallenge.tsx  # Home S7 — timeline
│   ├── PriceJustification.tsx  # Home S8 — ROI comparison
│   ├── IdentityShiftCTA.tsx    # Home S9 — Emotional Delta + final CTA
│   ├── SpecimenExpander.tsx    # Products page — 5-product accordion
│   ├── ProductBento.tsx        # PDP — asymmetric image bento grid
│   └── SpecTable.tsx           # PDP — spec table with mechanism reasons
├── data/
│   └── products.ts             # All product data, specs, copy
├── styles/
│   └── tokens.css              # All design tokens (import in globals.css)
└── public/
    └── images/                 # Product photography placeholders
```

---

## Pages

### `/` — Home
Two audiences on one page:

**Above fold (converted traffic):**
- Hero with cinematic product visual + identity headline
- Sticky CTA bar on mobile
- Trust bar (5 signals, 1 line)

**Below fold (cold/unconverted traffic) — full conversion arc:**
- S2: Bucket Theory (animated overflow diagram)
- S3: Pain Acknowledgment (3-layer: Physical / Functional / Identity)
- S4: 4 Pillars with expandable mechanism panels
- S5: Competitor Matrix (4 mechanisms vs. single-mechanism competitors)
- S6: Social Proof — 3 strategic zones
- S7: 30-Day Challenge timeline
- S8: Price Justification (ROI vs. medication costs)
- S9: Emotional Delta CTA (the final descent + Begin the Protocol)

### `/products` — Sanctuary Suite Overview
- Short intro section (eyebrow + headline)
- **Specimen Expander** — the 5-product interactive accordion (see below)
- Trust bar repeat
- CTA to bundle purchase

### `/products/[slug]` — Individual PDP
Slug values: `neuro-massager` | `optic-shield` | `cryo-wrap` | `sleep-buds` | `sanctuary-bundle`

Sections:
- Hero: product name + mechanism headline + 1-line spec summary + CTA
- Synergy callout: when to use this product in the cascade
- Asymmetric bento grid of product images (3–5 cells, varied sizing)
- Full spec table (every number has a mechanism reason, never just a feature)
- FAQ (pre-empts the 5 highest return triggers for that product)
- Related products strip
- Trust bar + CTA repeat

---

## The Specimen Expander (Key Component)

**Location:** `/products` page, spans full viewport height when open.

**Behavior:**
- 5 rows stacked vertically. Each row = one product.
- **Inactive state:** Full-width row. Left side: product number (01–05 in Space Mono), mechanism name (eyebrow), product name (Playfair Display, large), 1-line description. Right side: small square product image (120×120px), flush right.
- **Active state:** Row expands to ~100vh. Left panel: product name (large), mechanism explanation (2–3 paragraphs), key specs rendered in `<code>` tags. Right panel: asymmetric bento grid of 3–4 product images (varied `grid-row: span` values).
- One product is always active (default: first).
- Clicking an inactive row collapses the current active one and expands the clicked one.
- Transition: height animate with Framer Motion `AnimatePresence` + `layout` prop. Duration 400ms, ease.

**Product order:**
1. 360° Neuro-Massager — Gate Control Activation
2. FL-41 Optic Shield — Spectral Filtration
3. Cryo-Compression Core — Thermodynamic Vasoconstriction
4. Acoustic Silence Sleep Buds — Auditory Masking
5. The Sanctuary Bundle — The Compound Protocol

---

## Nav — Apollo Neuro Pattern
- Fixed, 64px tall
- Initially transparent over the hero
- On scroll > 80px: `backdrop-filter: blur(20px)` + bottom border + multi-layer shadow
- Links: Home · The Protocol · Products · Science · Bundle
- Right side: "Begin the Protocol" CTA button (warm accent)
- Max 5 links total
- Mobile: hamburger → full-screen overlay with large tap targets

---

## CTA Language Rules (NEVER violate)

| ❌ Never | ✅ Always |
|---|---|
| Buy Now | Begin the Protocol |
| Add to Cart | Start the Protocol |
| Purchase | Join the System |
| Kit / Bundle | Sanctuary Suite / Sanctuary Bundle |
| Revolutionary / Breakthrough | (omit — use mechanism specificity instead) |
| Clinically proven | Scientifically inspired / Mechanism-based |
| Treats pain / Cures | Manages conditions / Down-regulates |
| ! (exclamation points in body) | . (period — calm, precise, confident) |

---

## Design Rules (from tokens.css — NEVER override these)

1. Background is always `var(--color-bg)` — #000000. No exceptions.
2. No multi-color gradients. Single-hue lightness shifts only.
3. No pill-shaped buttons. `border-radius: 6px` on all buttons.
4. Typography: Playfair Display for all headings. Space Mono for all labels, specs, data, CTAs.
5. Spacing must come from the 8px scale. No arbitrary px values.
6. Cards use flat treatment with `var(--border-subtle)`. No heavy shadows.
7. WebGL canvas is always the lowest z-index layer. Never cover interactive elements.
8. All spec numbers (`480–520nm`, `20–40 kPa`, `<45dB`) are wrapped in `<code>` tags and styled with `var(--color-spec)`.
9. `prefers-reduced-motion` must disable all animations (instant opacity instead).
10. No AI-aesthetic decorations: no purple/blue/pink gradients, no blobs, no generic stock photos.

---

## Product Data Reference

### 1. 360° Neuro-Massager
- **Mechanism:** Gate Control Activation via Rhythmic Intermittent Compression
- **Pressure range:** 20–40 kPa (therapeutic window; >40 kPa triggers guarding response)
- **Motor noise:** <45 dB (below phonophobic trigger threshold of 45–55 dB)
- **Heat range:** 38°C–42°C (dual-zone carbon fiber heating elements)
- **Session duration:** 15 min auto-shutoff (habituation prevention)
- **Modes:** Relax / Sleep / Vitality / Beauty / Soothing
- **Key differentiator:** Pneumatic compression (rhythmic) vs. vibration (random noise). Gate Control only responds to organized rhythmic input.

### 2. FL-41 Optic Shield
- **Mechanism:** Spectral filtration of 480–520nm blue-green light (ipRGC pathway)
- **Filtration:** Blocks up to 80% of the 480–520nm band
- **Lens material:** CR-39 (Polyallyl Diglycol Carbonate) — optical grade, 50% lighter than glass
- **Indoor transmission:** 50% (functional indoors, not dark glasses)
- **Certification:** ANSI Z80.1-2025
- **Flicker reduction:** Sub-visible 100–120Hz flicker load reduction
- **Adaptation window:** 10–15 min for visual cortex white-balance recalibration (pink tint recedes)
- **Key differentiator:** Not a blue-light filter. Targets the exact ipRGC-activating wavelength band.

### 3. Cryo-Compression Core
- **Mechanism:** Active thermodynamic vasoconstriction at occipital + temporal + carotid arterial sites
- **Temperature range:** 2°C–8°C (therapeutic; below 2°C = cold burn risk)
- **Freeze cycle:** 20 min in standard freezer
- **Therapeutic window:** 30 min of effective cold per freeze cycle
- **Application rule:** Max 20 min continuous (paradoxical vasodilation after 20 min)
- **Exterior:** Medical-grade neoprene
- **Interior:** S-Class Hydrogel (high thermal conductivity vs. standard gel)
- **Construction:** Seam-welded barrier (condensation cannot reach electronics)
- **Sequencing:** Heat first (massager 8–10 min) → then cold (cryo-wrap 20 min). Not cold-only.

### 4. Acoustic Silence Sleep Buds
- **Mechanism:** Passive attenuation + active auditory masking (Brown Noise)
- **Passive attenuation:** Up to 30 dB (seal-fit silicone tips)
- **Driver size:** 6mm micro-dynamic
- **Noise type:** Brown Noise (low-frequency weighted; minimal high-frequency content vs. White Noise)
- **Shell thickness:** <1.3cm (side-sleeper threshold — below outer ear profile)
- **Playback:** 10 hours continuous / 48 hours case capacity
- **Connectivity:** Bluetooth 6.0
- **Key differentiator:** White Noise adds high-frequency irritant load for sensitized listeners. Brown Noise masks without adding neurological burden.

### 5. The Sanctuary Bundle
- **Price:** $345 (one-time; no subscription)
- **Includes:** All 4 devices + The Sanctuary Protocol ebook (instant digital delivery)
- **Protocol ebook:** 130 pages, covers Bucket Theory, 4-Phase Migraine Cycle, 15-Min Calibration, 30-Day Challenge, Lifestyle Architecture, Travel Protocol
- **Guarantee:** 30-Day Protocol Guarantee (follow the protocol; full refund if no meaningful reduction in sensory burden)
- **Certifications:** FL-41 ANSI Z80.1-2025 · Medically Reviewed · Motor <45dB acoustic safety
- **Key differentiator:** Only compound multi-mechanism protocol at DTC accessible price. Every competitor addresses 1 mechanism. This addresses 4 simultaneously.

---

## Science Copy Bank (use verbatim in components)

**Bucket Theory (S2 headline):**
"Your migraines aren't random. They're physics."

**Gate Control (massager):**
"Every other head massager vibrates. Vibration is disorganized. Disorganized input doesn't close the pain gate — it just adds more input. This one breathes. Rhythmic. Organized. Gate-closing."

**Sub-visible flicker (glasses):**
"The lights you're reading this under right now flicker 100–120 times per second. You can't see it. Your nervous system registers every cycle."

**Cold sequencing (cryo-wrap):**
"Ice during the attack. Warmth after the storm. Most people do this backwards. Here's the exact sequence — and why it changes everything."

**Brown Noise (buds):**
"White Noise is full-spectrum noise. For a sensitized auditory system, it's a new stressor disguised as a solution. Brown Noise is low-frequency. It masks. It doesn't add."

**Identity CTA:**
"You are not a migraine victim. You are someone who has been given the wrong tools."

**Competitor reframe:**
"You haven't failed migraine management. Single-mechanism solutions have failed you."

---

## Trust Signals (use in TrustBar component)

```
⭐⭐⭐⭐⭐ 4.8/5  ·  Medically Reviewed  ·  ANSI Z80.1-2025 Certified  ·  30-Day Protocol Guarantee  ·  Instant Ebook Delivery
```

---

## Getting Started

```bash
npx create-next-app@latest crowncalm --typescript --tailwind --app
cd crowncalm
npm install framer-motion
# Copy tokens.css into styles/
# Import tokens.css in app/globals.css
npm run dev
```

---

## Key References
- Brand strategy: Master Brand & Conversion Brief v1.0
- Science content: The Sanctuary Protocol (ebook, 130 pages)
- Design system: Master Strategy design tokens
- Store layout reference: apolloneuro.com (structure + CTA pattern, not visual style)
