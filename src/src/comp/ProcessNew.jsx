"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin, Sprout, Settings, Network } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1];

const EMERALD = "#02303D";        // dark teal — card base again
const EMERALD_LIGHT = "#02303D";
const CORAL = "#FF7D44";
const CORAL_LIGHT = "#FF7D44";
const GOLD = "#FF7D44";
const BG = "#Ffff";             // section stays light
const NODE_BG = BG;

const STEPS = [
  {
    n: "01",
    icon: MapPin,
    title: "Strategic Location",
    body: "Planned around industrial connectivity and infrastructure access.",
  },
  {
    n: "02",
    icon: Sprout,
    title: "Feedstock Security",
    body: "Integrated planning for long-term biomass availability.",
  },
  {
    n: "03",
    icon: Settings,
    title: "Engineering-First Design",
    body: "Process, utilities, and performance considered from day one.",
  },
  {
    n: "04",
    icon: Network,
    title: "Scalable Ecosystem",
    body: "Designed for expansion, integration, and operational resilience.",
  },
];

export default function ProcessNew() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 78%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative overflow-hidden py-24 text-[#02303D] md:py-32"
      style={{ background: BG }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-24 -top-32 h-[460px] w-[460px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${EMERALD_LIGHT}20 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-28 bottom-0 h-[420px] w-[420px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${CORAL}22 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }}
        />

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 opacity-[0.06] md:-right-8 md:-top-10"
          animate={reduced ? {} : { rotate: [0, 6, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Network className="h-40 w-40 md:h-56 md:w-56" style={{ color: EMERALD }} strokeWidth={1} />
        </motion.span>
      </div>

      <div className="container-shell relative">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: CORAL_LIGHT }}
              >
                In a four block system
              </span>
            </div>
            <SectionHeading
              tone="light"
              accent="blush"
              title="What makes a KEC "
              titleAccent="CBG Park different?"
              className="mt-3 max-w-xl"
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#02303D]/80 text-justify">
            Four fundamentals behind every KEC CBG Park — planned as an
            integrated ecosystem, not a standalone plant.
          </p>
        </Reveal>

        <div ref={trackRef} className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[46px] hidden h-px md:block"
            style={{ background: "rgba(2,48,61,0.12)" }}
          >
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: reduced ? 1 : lineScale,
                background: `linear-gradient(90deg, ${EMERALD_LIGHT}, ${GOLD}, ${CORAL})`,
                boxShadow: `0 0 12px ${CORAL}55`,
              }}
            />
          </div>

          <Stagger as="ol" className="grid gap-5 md:grid-cols-4">
            {STEPS.map(({ n, icon: Icon, title, body }, i) => {
              const accent = CORAL;
              const accentDeep = CORAL;
              return (
                <StaggerItem as="li" key={n} className="group relative">
                  {/* Node on the rail — matches light section bg */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 mb-8 hidden h-[24px] w-[24px] place-items-center rounded-full md:grid"
                    style={{
                      background: NODE_BG,
                      border: `1px solid ${GOLD}55`,
                      boxShadow: `0 0 0 4px ${BG}`,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full transition-colors duration-300"
                      style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                    />
                  </span>
                  {/* #046f8d */}
                  {/* Card — dark again, floating on light section */}
                  <TiltCard
                    max={10}
                    lift={10}
                    glare={true}
                    wrapperClassName="h-full"
                    className="relative h-full overflow-hidden rounded-2xl p-7 transition-[box-shadow] duration-300"
                    style={{
                      background: "#014052",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: [
                        "0 40px 70px -35px rgba(0,0,0,0.35)",
                        "0 12px 24px -14px rgba(0,0,0,0.25)",
                        "inset 0 1px 0 rgba(255,255,255,0.12)",
                        "inset 0 -14px 24px -18px rgba(0,0,0,0.6)",
                        `inset 0 0 0 1px ${accent}14`,
                      ].join(", "),
                    }}
                  >
                    {/* Per-card ghost icon — one per card, not one global */}


                    {/* Top accent line — always on now, not hover-only */}
                    <span
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${accent}, ${GOLD})` }}
                    />

                    <div className="relative flex items-center justify-between">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-xl"
                        style={{
                          background: `linear-gradient(150deg, ${accent} 0%, ${accentDeep} 100%)`,
                          boxShadow: [
                            `0 14px 26px -10px ${accentDeep}cc`,
                            "inset 0 1.5px 0 rgba(255,255,255,0.45)",
                            "inset 0 -3px 6px rgba(0,0,0,0.30)",
                          ].join(", "),
                        }}
                      >
                        <Icon
                          className="h-[19px] w-[19px] text-white"
                          strokeWidth={1.8}
                          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="tabular font-display text-4xl font-bold transition-colors duration-300"
                        style={{ color: "rgba(255,255,255,0.10)", WebkitTextStroke: `0.5px ${GOLD}33` }}
                      >
                        {n}
                      </span>
                    </div>

                    <h3 className="relative mt-6 font-display text-[17px] font-semibold leading-snug text-mist-50">
                      {title}
                    </h3>
                    <p className="relative mt-3 text-[14.5px] leading-relaxed text-mist-50/75 text-justify">
                      {body}
                    </p>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}