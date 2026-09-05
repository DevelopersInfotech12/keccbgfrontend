"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const TEAL = "#046f8d";
const ORANGE = "#FF7D44";

/* Two-tone heading palette — matched exact from ss (pixel-sampled).
   light bg  → dark-teal base + orange accent
   dark/green bg → white base + orange accent  */
const TONES = {
  light: {
    eyebrow: TEAL,
    base: TEAL,
    accent: ORANGE,
    lede: "text-ink-500",
  },
  dark: {
    eyebrow: ORANGE,
    base: "#FFFFFF",
    accent: ORANGE,
    lede: "text-mist-50/60",
  },
};

/**
 * Every section opens the same way: eyebrow, two-tone heading, optional lede.
 * `title` is the base-colour part, `titleAccent` the second-colour tail.
 * `stack` drops the accent onto its own line (teal line / orange line look).
 */
export default function SectionHeading({
  eyebrow,
  accent = "leaf",
  tone = "light",
  title,
  titleAccent,
  stack = true,
  lede,
  align = "left",
  className = "",
  children,
}) {
  const reduced = useReducedMotion();
  const c = TONES[tone] ?? TONES.light;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <span
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: c.eyebrow }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />
          {eyebrow}
        </span>
      )}

      <h2 className="mt-5 font-display font-semibold text-3xl leading-[1.06] tracking-[-0.025em] md:text-[2.75rem]">
        <span style={{ color: c.base }}>{title}</span>
        {titleAccent != null && titleAccent !== "" && (
          <>
            {stack ? <br /> : " "}
            <span style={{ color: c.accent }}>{titleAccent}</span>
          </>
        )}
      </h2>

      {lede && (
        <p className={`mt-5 max-w-xl text-[16.5px] text-justify leading-[1.7] ${c.lede}`}>
          {lede}
        </p>
      )}

      {children}
    </motion.div>
  );
}