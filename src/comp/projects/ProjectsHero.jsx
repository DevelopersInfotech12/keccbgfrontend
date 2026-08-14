"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Factory, Zap } from "lucide-react";

import { IMG } from "@/lib/images";
import TiltCard from "@/comp/ui/TiltCard";

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288"; // reserved — no matching usage in this component yet
const ICON_BLUE_LIGHT = "#4F7CAC";

const EASE = [0.16, 1, 0.3, 1];

const CHIPS = [
  { icon: Factory, value: "18", label: "Plants operated" },
  { icon: Zap, value: "4.2 TWh", label: "Biomethane / yr" },
  { icon: MapPin, value: "3", label: "Countries" },
];

export default function ProjectsHero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="projects-top"
      className="relative overflow-hidden px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4"
    >
      <div className="scene-3d relative isolate flex min-h-[560px] w-full flex-col justify-end overflow-hidden rounded-[28px] shadow-panel sm:min-h-[78svh] sm:rounded-[40px]">
        <img
          src="/images/projectbanner.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,19,16,0.55) 0%, rgba(10,19,16,0.25) 34%, rgba(10,19,16,0.72) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 120% at 12% 8%, rgba(46,158,99,0.32) 0%, transparent 58%)",
          }}
        />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="preserve-3d pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="animate-float-slow gpu-isolate absolute right-[8%] top-[18%] h-40 w-40 rounded-full blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(127,196,155,0.55), rgba(26,106,66,0.15) 70%)",
              transform: "translateZ(60px)",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="animate-float gpu-isolate absolute right-[22%] top-[46%] h-24 w-24 rounded-full blur-[1px]"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(240,147,123,0.5), rgba(180,78,61,0.12) 70%)",
              transform: "translateZ(30px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 pb-12 pt-28 sm:px-12 sm:pb-16 md:px-16 lg:max-w-4xl">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-leaf-300" />
            Our Projects
          </motion.span>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.0] tracking-[-0.035em] sm:text-6xl lg:text-[4.2rem]"
          >
            <span style={{ color: "#FFFFFF" }}>Plants we built,</span>
            <br />
            <span style={{ color: "#FFFFFF" }}>own and run.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="mt-6 max-w-xl text-[16px] leading-[1.7] text-white/75 sm:text-[17px]"
          >
            Every site on this page is one we developed, financed, engineered and
            still operate today — a live portfolio turning organic waste into
            pipeline-grade Compressed Biogas.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
            className="scene-3d mt-9 flex flex-wrap gap-3"
          >
            {CHIPS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className="animate-float-slow gpu-isolate"
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <TiltCard
                  max={14}
                  lift={8}
                  glare
                  wrapperClassName="group"
                  className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3"
                >
                  <span
                    className="pop-md grid h-10 w-10 place-items-center rounded-xl"
                    style={{ backgroundColor: ICON_BLUE_LIGHT }}
                  >
                    <Icon className="h-[18px] w-[18px] text-white" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="pop-sm leading-tight">
                    <span className="tabular block font-display text-lg font-semibold text-white">
                      {value}
                    </span>
                    <span className="block text-[12px] text-white/60">{label}</span>
                  </span>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}