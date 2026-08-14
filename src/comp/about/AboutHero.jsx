"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Leaf } from "lucide-react";

import IMG from "@/lib/images";
import TiltCard from "@/comp/ui/TiltCard";

const ABOUT_HERO_IMAGE = IMG.fieldAerial;

// Single source of truth for theme colors — edit here, applies everywhere below.
const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
// const CORAL = "#ff4444";
// const CORAL = "#0ba0f7";
const SAGE = "#7FC49B";

// Converts a hex const to rgba(...) when opacity is needed.
function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const STATS = [
  { value: "13", unit: "yrs", label: "Building and operating plants" },
  { value: "18", unit: "sites", label: "Live across three countries" },
  { value: "1.1M", unit: "t CO₂e", label: "Avoided every year" },
];

const EASE = [0.16, 1, 0.3, 1];

export default function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about-top"
      className="relative bg-mist-50 px-2.5 pb-3 pt-2.5 sm:px-4 sm:pb-5 sm:pt-4"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="relative isolate flex min-h-[440px] w-full flex-col justify-end overflow-hidden rounded-[24px] shadow-panel sm:min-h-[560px] sm:rounded-[36px] md:min-h-[62svh] lg:min-h-[70svh]">
        {/* Fallback wash, shows before/if the real photo fails to load. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, ${DEEP} 0%, ${LEAF} 34%, ${SAGE} 58%, ${CORAL} 100%)`,
          }}
        />
        <img
          src="/images/kechero.png"
          alt="Aerial view of a Bio CBG anaerobic digestion plant surrounded by farmland"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, ${hexToRgba(DEEP, 0.3)} 0%, ${hexToRgba(DEEP, 0.1)} 40%, ${hexToRgba(DEEP, 0.55)} 82%, ${hexToRgba(DEEP, 0.9)} 100%)`,
          }}
        />
        {/* Coral bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-4 h-64 w-64 animate-float-slow rounded-full blur-[110px] sm:-right-24 sm:top-6 sm:h-80 sm:w-80"
          style={{ backgroundColor: hexToRgba(CORAL, 0.28) }}
        />
        {/* Sage bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full blur-[100px] sm:h-72 sm:w-72"
          style={{ backgroundColor: hexToRgba(SAGE, 0.24) }}
        />

        <div className="container-shell relative z-10 pb-8 pt-20 sm:pb-10 sm:pt-32">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
              <Leaf
                className="h-3.5 w-3.5"
                style={{ color: SAGE }}
                strokeWidth={2.2}
                aria-hidden="true"
              />
              About Bio CBG
            </span>

            <h1 className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:mt-6 sm:text-4xl md:text-5xl lg:text-[3.4rem] ">
              <span className="text-white">We build, own and run the plants that turn</span>
              <br />
              <span style={{ color: CORAL }}>waste into worth.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] font-[600] leading-[1.65] text-white/50 sm:mt-6 sm:text-[16px] md:text-[17px] text-justify">
              Bio CBG is a biogas and biomethane operator. We take on the full
              lifecycle of every plant we bring online — planning, construction,
              biological operation and the farmer relationships that feed it.
            </p>
          </motion.div>

          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="scene-3d mt-8 grid max-w-2xl grid-cols-3 gap-3 sm:mt-4 sm:gap-4"
          >
            {STATS.map(({ value, unit, label }, i) => (
              <div
                key={label}
                className="animate-float-slow gpu-isolate"
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <TiltCard
                  as="div"
                  max={12}
                  lift={8}
                  glare
                  wrapperClassName="group h-full"
                  className="glass-card h-full rounded-2xl p-4 sm:p-5"
                >
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <p className="pop-sm tabular text-xl font-semibold leading-none text-white sm:text-2xl md:text-[1.9rem]">
                      {value}
                      <span className="ml-1 text-xs font-medium text-white/60 sm:text-sm">
                        {unit}
                      </span>
                    </p>
                    <p className="mt-2 text-[11.5px] leading-snug text-white/60 sm:text-[12.5px] md:text-[13px]">
                      {label}
                    </p>
                  </dd>
                </TiltCard>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}