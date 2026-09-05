"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { IMG } from "@/lib/images";

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288";
const ICON_BLUE_LIGHT = "#4F7CAC"; // reserved — no matching usage in this component yet

const EASE = [0.16, 1, 0.3, 1];

const HIGHLIGHTS = [
  "First unsubsidised Bio CBG plant in the region",
  "Feedstock sourced from 240+ partner farms within 40 km",
  "Digestate returned to the same fields as biofertiliser",
  "Grid-injection uptime above 96% across the year",
];

const STATS = [
  { value: "12", unit: "t/day", label: "CBG output" },
  { value: "40k", unit: "t/yr", label: "Feedstock processed" },
  { value: "96%", unit: "", label: "Injection uptime" },
];

export default function ProjectsFeatured() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #F1EEE7 0%, #F6F4EF 100%)" }}
    >
      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="scene-3d group order-2 lg:order-1"
        >
          <TiltCard
            max={12}
            lift={14}
            glare
            className="relative overflow-hidden rounded-[28px]"
            style={{
              boxShadow: "0 60px 120px -40px rgba(10,19,16,0.5), 24px 40px 80px -40px rgba(46,158,99,0.5)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <img
              src="/images/projectscreen1.png"
              alt="Delhi Bio CBG flagship plant"
              className="h-[420px] w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,19,16,0) 45%, rgba(10,19,16,0.68) 100%)",
              }}
            />
            <div className="pop-lg absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 backdrop-blur-md">
              <p className="tabular font-display text-3xl font-bold leading-none" style={{ color: LEAF }}>
                12<span className="ml-1 text-base font-semibold" style={{ color: ICON_BLUE }}>t/day</span>
              </p>
              <p className="mt-1 text-[12px] font-medium text-ink-500">Compressed Biogas</p>
            </div>
          </TiltCard>
        </motion.div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Flagship project"
            accent="blush"
            title="Delhi Bio CBG —"
            titleAccent="proof the model works."
            lede="Our Palakkad flagship took the Farm-to-Fuel loop from a whiteboard to a bankable, grid-connected asset — and it still runs on the same principle: start with the feedstock, build the plant around the land."
            className="max-w-xl"
          />

          <ul className="mt-8 space-y-3.5">
            {HIGHLIGHTS.map((h, i) => (
              <motion.li
                key={h}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                  style={{ color: LEAF }}
                />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink-900/8 bg-white/70 p-4">
                <p className="tabular font-display text-2xl font-bold leading-none text-ink-900">
                  {s.value}
                  {s.unit && <span className="ml-1 text-sm font-semibold" style={{ color: LEAF }}>{s.unit}</span>}
                </p>
                <p className="mt-1.5 text-[12px] leading-snug text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}