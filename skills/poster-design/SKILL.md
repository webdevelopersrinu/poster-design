---
name: poster-design
description: Use when designing social media posters, promo graphics, sale banners, real-estate/service/product posts, testimonial cards, or any Instagram/Facebook post design. Produces posters that look made by a human designer (bold brand color blocks, asymmetric layouts, real photos, shaped buttons, business contact furniture) instead of AI-looking output (purple gradients, glow, centered symmetric heroes, emoji copy, Inter-everywhere). Works for HTML/CSS posters, image-generation prompts, and Canva-style layout specs.
---

# Poster Design — Human Touch

Design social media posters that look like a working designer made them for a real
small business. Before designing, look at the example images in `references/refs/`
(Read them — they are the ground truth) and skim `references/layouts.md` for the
layout recipe matching the poster type.

## The look (non-negotiable)

1. **One bold brand color + white + one accent.** Green/white, navy/yellow,
   red/cream, orange/dark. Flat solid blocks. NEVER purple-to-blue gradients,
   glow, glassmorphism, or gradient text.
2. **Asymmetric layout.** Photo on one side (50–70% of canvas), color block on
   the other, separated by a diagonal, curve, or shape cut. Never
   everything-centered.
3. **Real photo dominates.** Houses, people, products — cropped into the layout
   via diagonal cuts, circle crops, hexagons, or arch frames. Photo bleeds off
   at least one edge.
4. **Typography = 3 roles, 2–3 fonts max:**
   - Headline: big, heavy, condensed or extra-bold sans (Archivo Black, Anton,
     Bebas Neue, Oswald). Often UPPERCASE, sometimes two-tone ("Heavy Equipment
     **For Rent**" — second line in accent color).
   - One accent word MAY be script/serif italic ("Holiday *Package*",
     "Elegant House *For Sale*") — one word or line only, never body text.
   - Body/details: small clean sans (DM Sans, Jost, Poppins), 11–14px scale.
   - NEVER: Inter/system-ui as the display font, gradient text, letterspaced
     uppercase labels everywhere.
5. **Real-business furniture.** Posters earn trust with functional small
   elements: logo + company name top corner, phone with ☎-style icon, website,
   address, ✓ checkmark feature lists (3–5 items, two columns), price tag or
   badge ("PRICE START FROM $1,600,000", "30% Off" sticker — slightly rotated),
   pill-shaped CTA button ("BOOK NOW", "Shop Now ▸").
6. **Imperfect decoration, sparingly.** Small dot grids, a thin dashed line, a
   hand-drawn arrow, one rotated sticker. Decoration sits in corners/edges,
   never behind text, never glowing or pulsing.
7. **Copy sounds like a shop owner, not a landing page.** "We'll help you find
   the perfect match." "Message us to order." "Tell us in the comments."
   No emoji in copy, no "Unlock", no "Elevate", no "✨".

## Build rules (HTML/CSS posters) — defects seen in testing, never repeat them

- **Headline fits in 2 lines, 3 max.** Size the font so the longest word fits
  the column (`clamp` or just measure). Never let "&" or a short word sit on
  its own line — keep "Laundry & Dry" together, break before the noun.
  Exception: engagement posters (recipe 5) use a deliberate one-word-per-line
  giant stack ("WHAT'S / YOUR / HOT / TAKE?") — there, stack away.
- **No element collisions.** Lay out the text column as one flex column with
  explicit `gap`; only stickers/badges/logo may be absolutely positioned.
  CTA and contact strip get their own space — nothing touches or overlaps text.
- **Icons are inline SVG, never emoji.** Emoji (✆ 🌐 ☎) render as broken
  tofu/tiny glyphs in headless renders and across platforms. Use 3–4 line
  inline SVGs for phone/globe/pin/star; ✓ as text is fine.
- **Photo selection matters as much as layout.** Pick bright, well-lit photos
  with a person doing the thing (folding clothes, handing a package, smiling at
  camera) or a clean hero product on simple background. Reject dim, grainy,
  cluttered, or back-of-machine shots. Unsplash search terms: add "smiling",
  "bright", "studio" to the subject.
- **Echo the cut.** A diagonal/curve separating photo and color block looks
  more designed with a 10–16px white (or accent) border stripe along the cut,
  or a second offset shape behind it.
- **Spacing rhythm:** 48–56px canvas padding, 24–36px between content groups,
  one deliberate breathing gap before the CTA. If the column feels full, cut a
  checklist item — don't shrink gaps.

## Process

1. Ask (or infer) three things: business type, the one brand color, and the
   poster goal (sale / listing / engagement / announcement).
2. Pick the matching recipe from `references/layouts.md`.
3. Pick fonts per rule 4 (Google Fonts, pinned, with fallback stack).
4. Build at the right canvas: 1080×1080 (IG post), 1080×1350 (portrait),
   1200×630 (FB/link). HTML/CSS poster → fixed-size container, export-ready.
   Export/preview with `node scripts/render.mjs poster.html out.png --size ig`
   (`ig`/`portrait`/`fb` or `WxH`; `--scale 2` for retina). It warns if the
   page overflows the canvas — fix the layout, don't ignore the warning.
5. Self-check against `references/refs/` before delivering: would this sit
   unnoticed next to those examples? If it has a gradient background, centered
   stack, or glow — redo it.

## When generating with an image tool

Prompt with the same rules: name the layout ("left two-thirds photo of a modern
house, right third flat forest-green panel with white headline"), the exact
fonts/weights, the contact-strip furniture, and explicitly exclude "gradient,
glow, bokeh, 3D render, cinematic lighting".
