"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Factory, Leaf, MapPin } from "lucide-react";

import TiltCard from "@/comp/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1];

const CHIPS = [
  { icon: Factory, value: "5+", label: "Plants profiled" },
  { icon: Leaf, value: "12k t+", label: "CO₂e avoided / site / yr" },
  { icon: MapPin, value: "Pan-India", label: "Sectors covered" },
];

export default function CaseStudiesHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4">
      <div className="scene-3d relative isolate flex min-h-[480px] w-full flex-col justify-end overflow-hidden rounded-[28px] shadow-panel sm:min-h-[64svh] sm:rounded-[40px]">
        <img
          src="/images/projectbanner.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,19,16,0.60) 0%, rgba(10,19,16,0.28) 34%, rgba(10,19,16,0.80) 100%)" }} />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(90% 120% at 12% 8%, rgba(236,124,98,0.28) 0%, transparent 58%)" }} />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="preserve-3d pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="animate-float-slow gpu-isolate absolute right-[10%] top-[20%] h-36 w-36 rounded-full blur-[2px]"
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(127,196,155,0.5), rgba(26,106,66,0.12) 70%)", transform: "translateZ(60px)" }}
          />
        </div>

        <div className="relative z-10 w-full px-6 pb-12 pt-24 sm:px-12 sm:pb-16 md:px-16 lg:max-w-3xl">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blush-300" />
            Case Studies
          </motion.span>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.8rem]"
          >
            Real plants,<br />real numbers.
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="mt-6 max-w-lg text-[16px] leading-[1.7] text-white/75"
          >
            Every project here is one we developed, financed, engineered and
            still operate — with the emissions and yield numbers to show for it.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
            className="scene-3d mt-9 flex flex-wrap gap-3"
          >
            {CHIPS.map(({ icon: Icon, value, label }, i) => (
              <div key={label} className="animate-float-slow gpu-isolate" style={{ animationDelay: `${i * 0.6}s` }}>
                <TiltCard max={14} lift={8} glare wrapperClassName="group" className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="pop-md grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blush-400 to-blush-600">
                    <Icon className="h-[18px] w-[18px] text-white" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="pop-sm leading-tight">
                    <span className="tabular block font-display text-lg font-semibold text-white">{value}</span>
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
