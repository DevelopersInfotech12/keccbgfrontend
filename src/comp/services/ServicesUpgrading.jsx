"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { IMG } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];

// color den — swap here, whole section follow
const BG_LIGHT_1 = "#F6F4EF";
const BG_LIGHT_2 = "#F1EEE7";
const INK_900 = "#0A1310";
const LEAF_500 = "#2E9E63";
const OVERLAY_DARK = "#0A1310";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

const INK_900_RGB = hexToRgb(INK_900);
const LEAF_500_RGB = hexToRgb(LEAF_500);
const OVERLAY_DARK_RGB = hexToRgb(OVERLAY_DARK);

const POINTS = [
  "Membrane and water-scrub trains sized to each plant's raw gas flow",
  "Methane slip minimised — more of the gas you make reaches the grid",
  "Continuous CH₄, CO₂ and H₂S monitoring for guaranteed pipeline spec",
  "Compression and odorisation packaged for direct grid or CBG dispensing",
];

const SPECS = [
  { value: ">98%", label: "CH₄ purity" },
  { value: "<1%", label: "Methane slip" },
  { value: "24/7", label: "Quality logging" },
];

export default function ServicesUpgrading() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: `linear-gradient(180deg, ${BG_LIGHT_1} 0%, ${BG_LIGHT_2} 100%)` }}
    >
      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="Upgrading & gas-to-grid"
            accent="blush"
            title="Raw biogas in,"
            titleAccent="grid-grade gas out."
            lede="Upgrading is where a plant either earns its return or leaks it away. Our skids are engineered to push nearly every molecule of methane into the pipeline — and to prove it, continuously."
            className="max-w-xl"
          />

          <ul className="mt-8 space-y-3.5">
            {POINTS.map((p, i) => (
              <motion.li
                key={p}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" strokeWidth={2} aria-hidden="true" />
                {p}
              </motion.li>
            ))}
          </ul>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {SPECS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink-900/8 bg-white/70 p-4">
                <p className="tabular font-display text-2xl font-bold leading-none text-leaf-700">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[12px] leading-snug text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D tilt image */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="scene-3d group"
        >
          <TiltCard
            max={12}
            lift={14}
            glare
            className="relative overflow-hidden rounded-[28px]"
            style={{
              boxShadow: `0 60px 120px -40px rgba(${INK_900_RGB},0.5), 24px 40px 80px -40px rgba(${LEAF_500_RGB},0.5)`,
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <img
              src="/images/servicesscreen1.png"
              alt="Biogas upgrading skid"
              className="h-[420px] w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, rgba(${OVERLAY_DARK_RGB},0) 45%, rgba(${OVERLAY_DARK_RGB},0.68) 100%)`,
              }}
            />
            <div className="pop-lg absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 backdrop-blur-md">
              <p className="tabular font-display text-3xl font-bold leading-none text-leaf-700">
                &gt;98<span className="ml-1 text-base font-semibold text-blush-600">% CH₄</span>
              </p>
              <p className="mt-1 text-[12px] font-medium text-ink-500">Pipeline-grade output</p>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}