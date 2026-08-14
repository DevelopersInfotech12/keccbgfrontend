/**
 * Hero media.
 *
 * One explicit path — no candidate list. Guessing across several paths meant
 * a 404 on the first one could stall the whole element instead of falling
 * through. Move the file and change this line.
 */
export const HERO_VIDEO = "/videos/cbghero.mp4";
export const HERO_POSTER = "/images/hero-poster.jpg";

export const HERO_STATS = [
  { value: "18", unit: "plants", label: "Built, owned and operated" },
  { value: "4.2", unit: "TWh", label: "Biomethane delivered a year" },
  { value: "1.1M", unit: "t CO₂e", label: "Avoided annually" },
];
