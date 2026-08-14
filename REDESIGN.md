<!-- Red Icon color -->
<!-- background: "linear-gradient(150deg, #EC7C62 0%, #B44E3D 100%)", -->

# Hero redesign — what changed

## Run it

```bash
npm install
npm run dev
```

The hero plays `public/cbghero.mp4`. It also checks
`public/videos/cbghero.mp4` and `public/video/cbghero.mp4`, using the first
that loads — see `public/videos/README.md`. If none resolve, it falls back to
an on-brand gradient so nothing looks broken.

---

## Palette

Two colours, sampled from the references you sent:

| Token | Hex | From |
|---|---|---|
| `leaf-500` | `#2E9E63` | the green in the SVGREPO shot |
| `blush-500` | `#EC7C62` | the coral/pink in the Happy Hues shot |

Full 50–900 ramps exist for both. The old `moss` and `ember` names are kept
as aliases pointing at the new ramps, so every section further down the page
repainted itself — no orange left anywhere.

Gradient `bg-leaf-blush` runs deep green → soft green → pink and is the
through-line: headline, ring gauge, logo mark, fallback wash.

## Type

- **Display — Bricolage Grotesque.** Optically-sized grotesque with real
  character in the counters. Replaces Plus Jakarta Sans, which read as a
  default UI sans.
- **Accent — Instrument Serif italic.** Used in exactly one place: the second
  half of the headline. The contrast between an engineered grotesque and a
  soft italic serif is what makes the hero feel expensive rather than loud.
- **Body — Inter.** Unchanged, with `font-variant-numeric: tabular-nums` on
  every figure so the stats stop jittering.

## Layout

The hero is an inset panel, not a full-bleed band — 40px radius, deep
shadow, page background visible around all four edges. That framing is what
the references you sent all have in common, and it's what makes it read as a
product shot rather than a stock header.

The nav bar is now adaptive: dark glass while it floats over the video, then
it flips to the light pill once you scroll past the hero.

## The 3D scene

Three frosted panels float over the video on separate z-depths inside a
`perspective: 1400px` container:

| Panel | Depth | Content |
|---|---|---|
| Carbon balance | `z: 40` | animated ring gauge, 94% |
| Live digester | `z: 90` | 12-bar methane yield series, live badge |
| Digestate | `z: 14` | tonnage returned to farms |

Move the pointer across the hero and the whole cluster rotates on X/Y while
each panel translates at its own rate — near panels travel further than far
ones, which is what sells the depth. All of it is spring-smoothed, so it
settles instead of snapping.

**Signature element:** the ring gauge. Its arc is stroked with the
green→pink gradient and draws itself on load.

## Motion

One orchestrated page-load sequence (eyebrow → headline → body → buttons →
stats, 90ms apart), then the scene goes quiet: slow ambient float on the
panels, a drifting aurora field per brand colour, and scroll-linked parallax
where the video and content separate as you leave.

Every transform is either Framer's or CSS's — never both on the same element,
which is the usual reason 3D card effects silently break.

## Details that aren't decoration

- **Pause button.** Auto-playing video has to be stoppable (WCAG 2.2.2).
- **`prefers-reduced-motion`** kills tilt, parallax, and the gauge draw —
  the layout is identical, just still.
- **Video failure is handled.** `onError` swaps in the gradient and hides the
  pause button.
- **Focus rings** are restyled, never removed. All targets ≥44px.
- **Text contrast** holds against the video via two targeted gradients — a
  vertical scrim for the nav and stats, and a left wash that runs out by 72%
  so the right two-thirds of the footage stays untouched. Deliberately light:
  darkening the whole frame is what makes a video hero look muddy.
- **Stats are a real `<dl>`** with screen-reader-only terms.
- Cluster is desktop-only; mobile gets the stats row instead, so there's no
  horizontal scroll and no cramped glass panels.

## Files touched

```
tailwind.config.js          palette, gradients, shadows, keyframes
src/app/globals.css         tokens, glass/3D/grain helpers, focus rings
src/app/layout.jsx          font pairing + viewport
src/comp/Hero.jsx           rebuilt
src/comp/Header.jsx         adaptive dark/light, new palette
src/comp/hero/HeroPanels.jsx    the three floating panels   (new)
src/comp/hero/RingGauge.jsx     animated dial               (new)
src/lib/useParallaxTilt.js      pointer-driven 3D hook      (new)
src/lib/site.js                 video paths + hero stats    (new)
src/comp/Footer.jsx         off-scale size utilities fixed
src/comp/WhyUs.jsx          off-scale size utilities fixed
public/videos/README.md     how to add your video           (new)
public/images/hero-poster.jpg   placeholder poster          (new)
```

Copy in the hero is placeholder-quality on the numbers — swap the figures in
`src/lib/site.js` and the panel values in `src/comp/hero/HeroPanels.jsx` for
your real plant data before this goes live.

---

## If the footage looks soft

The overlays are now minimal, so remaining softness is the source file.
Check the video's real resolution:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,bit_rate,codec_name \
  -of default=nw=1 public/cbghero.mp4
```

The hero panel is ~1900px wide on a desktop and the video is drawn at 108%
to leave room for parallax, so anything under **1920×1080** gets upscaled and
will look soft no matter what the CSS does. Bitrate under ~2 Mbps will show
blocking in the dark areas of the frame — re-export higher, then compress
with the ffmpeg recipe in `public/videos/README.md`.

---

# Full-site pass — futuristic 3D

Every section now runs on two shared primitives instead of nine private
implementations.

## `src/comp/ui/TiltCard.jsx`

The 3D primitive. Perspective wrapper → spring-rotated layer → `preserve-3d`
children. Pointer position drives `rotateX`/`rotateY` and a specular
highlight that tracks the cursor. Under `prefers-reduced-motion` it renders a
plain static container — not a shortened animation.

Use `.pop-sm` / `.pop-md` / `.pop-lg` on any child to float it above the card
face (24 / 44 / 70px of `translateZ`).

Two constraints it enforces, both of which silently break 3D otherwise:

- **Caller `style` is merged, never spread after.** A caller passing `style`
  used to overwrite `rotateX`/`rotateY` and kill the tilt with no error.
- **No `overflow-hidden` on a tilt card.** It forces `transform-style` back
  to `flat`, collapsing every `translateZ` inside.

## `src/comp/ui/SectionHeading.jsx`

Eyebrow + heading + lede, with `tone` (light/dark) and `accent`
(leaf/blush). One type scale for the whole page.

## Shared surfaces (`globals.css`)

| Class | Use |
|---|---|
| `.panel` | white card, hairline border, two-stage shadow |
| `.panel-dark` | dark card with inner top highlight |
| `.edge-leaf-blush` | 1px green→pink gradient outline, mask-drawn |
| `.grid-floor` | receding perspective grid on dark sections |
| `.aura` | coloured bloom under a card on hover |
| `.pop-*` | `translateZ` depth steps |

`.aura` is a `box-shadow`, not a pseudo-element — a pseudo-element paints
above the card background and can cover content.

## Pink is now a co-equal accent, not a garnish

It carries: the "Responsible." headline, the Process rail terminus and final
stage, two of three product cards, half the industry tiles, the case-study
eyebrow and two of three result figures, the CTA eyebrow, and the footer
wordmark and social hovers.

**Contrast rule, because coral is a trap on light backgrounds:**
`blush-500` (`#EC7C62`) is 2.6:1 on white — it fails even the 3:1 large-text
bar. On light surfaces pink text is `blush-600` (3.6:1) for headings and
`blush-700` (5.1:1) for anything smaller. On dark it's `blush-300`. The
`blush-500` fill is only ever used for dots, glows, and gradient stops.

## Section rhythm

light → light → **dark** → light → light → **dark panel** → light → **dark**

Hero, Process, CaseStudy and Footer carry the dark weight; the grid floor
appears on three of them, which is what ties the "futuristic" read together
rather than leaving it as one novelty section.

## Motion budget

Micro-interactions 200–320ms, list stagger 70–90ms, one scroll-linked effect
per section maximum (hero parallax; the Process rail filling as you pass).
Transform and opacity only. Every component reads `useReducedMotion` and
disables entrance animation outright rather than shortening it.

## Still yours to do

The figures throughout — plants operated, TWh, tonnage, case-study
percentages — are placeholders carried over from the original copy. Replace
them before launch.
