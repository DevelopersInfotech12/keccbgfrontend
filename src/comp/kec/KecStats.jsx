"use client";

import { motion, useReducedMotion } from "framer-motion";

import TiltCard from "@/comp/ui/TiltCard";
import { Reveal } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B";
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288"; // "blush" confirmed navy, sampled from uploaded icon reference

const OVERLAY = "linear-gradient(180deg, rgba(10,19,16,0.72) 0%, rgba(10,19,16,0.92) 100%)";
const CARD_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.15) 100%)";
const CARD_BORDER = "1px solid rgba(255,255,255,0.10)";
const CARD_SHADOW =
  "0 40px 70px -35px rgba(0,0,0,0.75), 16px 22px 46px -26px rgba(46,158,99,0.4), inset 0 1px 0 rgba(255,255,255,0.12)";

const STATS = [
  { value: "100%", label: "Feedstock from agricultural waste", tone: "leaf" },
  { value: "Bio-CNG", label: "Pipeline-grade renewable gas", tone: "blue" },
  { value: "KEC", label: "Kisan Experience Centre model", tone: "leaf" },
  { value: "2025", label: "R.E.A.L Excellence Award winner", tone: "blue" },
];

export default function KecStats() {
  const reduced = useReducedMotion();

  return (
    <section className="grid-floor relative overflow-hidden py-24 md:py-28" style={{ background: LEAF }}>
      <img
        src={IMG.industrialPlant}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-2"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: OVERLAY }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[120px]"
        style={{ backgroundColor: `${ICON_BLUE}33` }}
      />

      <div className="container-shell relative">
        <Reveal>
          <p
            className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60"
            
          >
            Farm to Fuel, at scale
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.5rem]">
            <span style={{ color: "#FFFFFF" }}>Clean energy the countryside</span>
            <br />
            <span style={{ color: CORAL }}>can actually own.</span>
          </h2>
        </Reveal>

        <div className="scene-3d mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {STATS.map(({ value, label, tone }, i) => (
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
                style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
              >
                <p
                  className="pop-md tabular font-display text-3xl font-semibold sm:text-[2.6rem] text-white"
                >
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