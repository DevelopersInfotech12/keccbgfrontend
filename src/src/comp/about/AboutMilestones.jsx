"use client";

import { motion, useReducedMotion } from "framer-motion";

import TiltCard from "@/comp/ui/TiltCard";
import { Reveal } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];
const MILESTONES_IMAGE = IMG.industrialPlant;

// Single source of truth for theme colors — edit here, applies everywhere below.
const LEAF = "#02303D"; // reserved — no matching hardcoded value in this component yet
const DEEP = "#012029";
const CORAL = "#FF7D44";
const SAGE = "#7FC49B";
const PARA = "#434444d2";

// Reads rgb from a hex (6 or 8-digit) const and applies a custom alpha.
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "").slice(0, 6);
  const n = parseInt(clean, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const MILESTONES = [
  { value: "13", label: "Years building and operating plants" },
  { value: "18", label: "Biogas and biomethane plants" },
  { value: "1.1M t", label: "CO₂e avoided every year" },
  { value: "240+", label: "People across our sites" },
];

export default function AboutMilestones() {
  const reduced = useReducedMotion();

  return (
    <section id="milestones" className="relative overflow-hidden bg-ink-900 py-24 md:py-28">
      <img
        src={MILESTONES_IMAGE}
        alt="Wide view of a Bio CBG plant site"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${hexToRgba(DEEP, 0.55)} 0%, ${hexToRgba(DEEP, 0.88)} 100%)`,
        }}
      />

      <div className="container-shell relative">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-blush-300">
            Thirteen years, one focus
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.5rem]">
            <span className="text-white">Know-how for new energy,</span>
            <br />
            <span style={{ color: CORAL }}>proven at scale.</span>
          </h2>
        </Reveal>

        <div className="scene-3d mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {MILESTONES.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="group"
            >
              <TiltCard
                max={12}
                lift={10}
                glare
                wrapperClassName="h-full"
                className="relative h-full overflow-hidden rounded-2xl p-6 text-center"
                style={{
                  background: `linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 40%, ${hexToRgba(PARA, 0.15)} 100%)`,
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: `0 40px 70px -35px ${hexToRgba(DEEP, 0.75)}, 16px 22px 46px -26px ${hexToRgba(SAGE, 0.4)}, inset 0 1px 0 rgba(255,255,255,0.12)`,
                }}
              >
                <p className="pop-md tabular font-display text-4xl font-semibold text-white sm:text-5xl">
                  {value}
                </p>
                <p className="pop-sm mt-2 text-[13px] leading-snug text-white/60 sm:text-[13.5px]">
                  {label}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}