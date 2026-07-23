---
version: "alpha"
name: "Master Strategy"
description: "Master Strategy Background Effect is designed for delivering a visual treatment or immersive background effect. Key features include atmospheric visuals, motion depth, and flexible presentation layering. It is suitable for visual-first pages, motion studies, and atmospheric hero treatments."
colors:
  primary: "#2563EB"
  secondary: "#111111"
  tertiary: "#7628F3"
  neutral: "#111111"
  background: "#000000"
  surface: "#000000"
  text-primary: "#111111"
  text-secondary: "#666666"
  accent: "#2563EB"
typography:
  display-lg:
    fontFamily: "Playfair Display"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: "72px"
    letterSpacing: "-0.05em"
  body-md:
    fontFamily: "Space Mono"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "15px"
    letterSpacing: "0.1em"
    textTransform: "uppercase"
spacing:
  base: "8px"
  sm: "8px"
  md: "46.1px"
  gap: "8px"
  card-padding: "46.1px"
  section-padding: "46.1px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Open
  - Grid: Strong

## Colors

The color system uses light mode with #2563EB as the main accent and #111111 as the neutral foundation.

- **Primary (#2563EB):** Main accent and emphasis color.
- **Secondary (#111111):** Supporting accent for secondary emphasis.
- **Tertiary (#7628F3):** Reserved accent for supporting contrast moments.
- **Neutral (#111111):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #000000; Surface: #000000; Text Primary: #111111; Text Secondary: #666666; Accent: #2563EB

## Typography

Typography pairs Playfair Display for display hierarchy with Space Mono for supporting content and interface copy.

- **Display (`display-lg`):** Playfair Display, 72px, weight 400, line-height 72px, letter-spacing -0.05em.
- **Body (`body-md`):** Space Mono, 12px, weight 400, line-height 15px, letter-spacing 0.1em, uppercase.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 8px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 8px
- **Scale:** 8px, 46.1px
- **Section padding:** 46.1px
- **Card padding:** 46.1px
- **Gaps:** 8px, 16px

## Elevation & Depth

Depth is communicated through flat, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as flat first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Flat

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 8px rhythm.
- Do reuse the Flat surface treatment consistently across cards and controls.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't exceed the detected minimal motion intensity without a deliberate reason.

## Motion

Motion stays restrained and interface-led across text, layout, and scroll transitions. Easing favors ease.

**Motion Level:** minimal

**Easings:** ease

## WebGL

Reconstruct the graphics as a full-bleed background field using alpha. The effect should read as technical, meditative, and atmospheric: dot-matrix particle field with soft red on soft orange and moderate spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** alpha

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, Noise fields, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- Background Animated Canvas (WebGL feel) -->
      <canvas id="timeline-canvas" class="absolute inset-0 z-10 pointer-events-none w-full h-full"></canvas>

      <!-- Grid Lines Container -->
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      const canvas = document.getElementById('timeline-canvas');
      const ctx = canvas.getContext('2d', { alpha: true });

      let width, height;
      let time = 0;

      // Data for blocks: [top_vh, left_vw, width_vw, height_vh, r, g, b]
      const blocks = [
      …
      ```
