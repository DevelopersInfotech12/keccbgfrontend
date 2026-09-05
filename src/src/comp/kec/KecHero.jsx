"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Leaf, Sprout, Factory, ArrowUpRight } from "lucide-react";

import TiltCard from "@/comp/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1];

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

const FLOAT_PANELS = [
  {
    icon: Sprout,
    value: "Farm",
    label: "Agri-waste feedstock",
    className: "left-[4%] top-[16%]",
    delay: 0.2,
    tone: "leaf",
  },
  {
    icon: Factory,
    value: "Fuel",
    label: "Clean CBG & Bio-CNG",
    className: "right-[5%] top-[30%]",
    delay: 0.35,
    tone: "blush",
  },
];

export default function KecHero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="kec-top"
      className="relative overflow-hidden px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4"
    >
      <div className="scene-3d relative isolate flex min-h-[620px] w-full flex-col justify-center overflow-hidden rounded-[28px] shadow-panel sm:min-h-[96svh] sm:rounded-[40px]">
        {/* Green → pink brand wash (fallback behind the image) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(125deg, #0B2E1D 0%, #1A6A42 30%, #2E9E63 52%, #F0937B 82%, #EC7C62 100%)",
          }}
        />
        <img
          src="/images/kechero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="grain absolute inset-0" aria-hidden="true" />

        {/* Animated colour blooms */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-96 w-96 animate-float-slow rounded-full bg-leaf-400/30 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-4 h-96 w-96 animate-float rounded-full bg-blush-500/35 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,19,16,0.42) 0%, rgba(10,19,16,0.14) 40%, rgba(10,19,16,0.30) 72%, rgba(10,19,16,0.66) 100%)",
          }}
        />

        {/* Floating 3D stat panels */}
        {!reduced &&
          FLOAT_PANELS.map(({ icon: Icon, value, label, className, delay, tone }) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay, ease: EASE }}
              className={`absolute z-10 hidden lg:block ${className}`}
            >
              <div className="animate-float-slow gpu-isolate">
                <TiltCard
                  max={14}
                  lift={8}
                  className="solid-card w-56 rounded-2xl p-5"
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl pop-md ${tone === "blush"
                      ? "bg-gradient-to-br from-blush-400 to-blush-600"
                      : "bg-gradient-to-br from-blush-400 to-blush-600"
                      }`}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-white pop-sm">
                    {value}
                  </p>
                  <p className="mt-1 text-[13px] text-white/70">{label}</p>
                </TiltCard>
              </div>
            </motion.div>
          ))}

        {/* Copy — left-aligned so it clears the plant on the right */}
        <div className="container-shell relative z-20 text-left mt-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <Leaf className="h-3.5 w-3.5 text-blush-200" strokeWidth={2.2} aria-hidden="true" />
              Our Parent Company
            </span>

            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.1rem] ">
              KEC Biofuel
              <br />
              <span className="text-[#FF7D44] font-body italic" style={{ textColor: `${ORANGE}` }}>
                Farm to Fuel.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[16.5px] leading-[1.7] text-white/85 sm:text-[18px] text-justify">
              KEC Agritech turns agricultural waste into clean Compressed Biogas
              — while its Kisan Experience Centre model puts farmers and
              agri-entrepreneurs at the heart of India's renewable-energy shift.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-start gap-3">
              <a
                href="https://www.kecbiofuel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift" style={{ background: `${ORANGE}` }}
              >
                Explore the ecosystem
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-[52px] cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Talk to KEC
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}