"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, CircleDot, Sprout, ArrowRight, Play, Pause } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";

/* ── Single palette, no outside colors — teal + orange only ── */
const EMERALD = "#02303D"; // dark teal
const CORAL = "#FF7D44";   // orange accent
const INK = "#0B1512";

const EASE = [0.16, 1, 0.3, 1];

const PRODUCTS_VIDEO = "/videos/cbghero.mp4";
const PRODUCTS_POSTER = "/images/products-poster.jpg";

const PRODUCTS = [
  {
    icon: Flame,
    name: "Bio CBG",
    tag: "Compressed Biogas",
    body: "Pipeline-grade renewable gas, upgraded from biogas, that substitutes directly for fossil natural gas in existing systems.",
    figure: "4.2 TWh",
    figureLabel: "delivered a year",
  },
  {
    icon: CircleDot,
    name: "Biogenic CO₂",
    tag: "Captured carbon",
    body: "Naturally occurring CO₂ released during upgrading, captured for reuse or permanent storage via integrated CCS.",
    figure: "1.1M t",
    figureLabel: "CO₂e avoided",
  },
  {
    icon: Sprout,
    name: "Digestate",
    tag: "Biofertiliser",
    body: "A nutrient-rich liquid and solid residue returned to partner farms, improving soil health and reducing synthetic inputs.",
    figure: "42,800 t",
    figureLabel: "returned to farms",
  },
];

/* Signature element: a single pipeline runs top-to-bottom through the three
   cards with a pulsing dot — the literal "closed carbon loop" the copy
   already promises, made visible instead of decorative. */
function FlowLine() {
  const reduced = useReducedMotion();
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-7 top-0 hidden h-full w-6 lg:block"
      viewBox="0 0 24 100"
      preserveAspectRatio="none"
    >
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="100"
        stroke={`${EMERALD}22`}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {!reduced && (
        <motion.circle
          cx="12"
          r="4"
          fill={CORAL}
          animate={{ cy: [0, 100] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
}

function VideoPanel() {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative h-[320px] overflow-hidden rounded-[28px] lg:sticky lg:top-24 lg:h-full"
      style={{ boxShadow: "0 30px 60px -30px rgba(2,48,61,0.45)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: `linear-gradient(150deg, ${EMERALD} 0%, #0A4A5C 60%, ${CORAL} 130%)` }}
      />

      {!failed && (
        <video
          ref={videoRef}
          src={PRODUCTS_VIDEO}
          poster={PRODUCTS_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onError={() => setFailed(true)}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          className="absolute inset-0 h-full w-full object-cover [filter:contrast(1.05)_saturate(1.08)]"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(0deg, ${EMERALD}D9 0%, ${EMERALD}00 45%, ${EMERALD}00 70%, ${EMERALD}66 100%)`,
        }}
      />

      <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CORAL }} />
        Inside a Bio CBG plant
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <p className="font-display text-lg font-semibold leading-snug text-white sm:text-xl w-[250px]">
          One feedstock line, three outputs, zero waste.
        </p>
      </div>

      {!failed && (
        <button
          type="button"
          onClick={() => {
            const el = videoRef.current;
            if (!el) return;
            el.paused ? el.play() : el.pause();
          }}
          aria-label={paused ? "Play video" : "Pause video"}
          className="absolute bottom-6 right-6 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
        >
          {paused ? <Play className="h-4 w-4" strokeWidth={2.2} /> : <Pause className="h-4 w-4" strokeWidth={2.2} />}
        </button>
      )}
    </motion.div>
  );
}

export default function Products() {
  const reduced = useReducedMotion();

  return (
    <section
      id="products"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: `linear-gradient(180deg, #F6F4EF 0%, #F1EEE7 100%)` }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${EMERALD}33 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-24 top-1/3 h-[440px] w-[440px] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${CORAL}40 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${CORAL}55, transparent)` }}
        />
      </div>

      <div className="container-shell relative">
        <div className="mt-0 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-5 lg:h-full">
            <Reveal>
              <SectionHeading
                eyebrow="What we produce"
                accent="leaf"
                title="Three outputs, one"
                titleAccent=" closed carbon loop"
                lede="Nothing leaves a Bio CBG plant as waste. Every stream has a buyer, a use, or a route back into the soil."
                className="max-w-xl"
              />
            </Reveal>

            <div className="flex-1 lg:min-h-0">
              <VideoPanel />
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <FlowLine />
            <Stagger className="flex flex-col gap-5 lg:pl-16">
              {PRODUCTS.map(({ icon: Icon, name, tag, body, figure, figureLabel }, i) => (
                <StaggerItem key={name}>
                  <TiltCard
                    as="a"
                    href="/about"
                    max={6}
                    lift={5}
                    glare
                    wrapperClassName="group block"
                    className="relative flex flex-col gap-5 overflow-hidden rounded-2xl p-6 sm:flex-row sm:items-center sm:p-7"
                    style={{
                      background: "rgba(255,255,255,0.72)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(11,21,18,0.06)",
                      boxShadow: "20px 28px 50px -28px rgba(255,125,68,0.45), inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-[3px]"
                      style={{ background: `linear-gradient(180deg, ${EMERALD}, ${CORAL})` }}
                    />

                    <motion.span
                      aria-hidden="true"
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${EMERALD}, #0A4A5C)`,
                        boxShadow: `0 12px 22px -8px ${EMERALD}99, inset 0 1px 0 rgba(255,255,255,0.3)`,
                      }}
                      animate={reduced ? {} : { rotate: [0, -4, 0, 4, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    >
                      <Icon className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden="true" />
                    </motion.span>

                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: `${INK}77` }}
                      >
                        {tag}
                      </p>
                      <h3
                        className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]"
                        style={{ color: CORAL }}
                      >
                        {name}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.65]" style={{ color: `${INK}99` }}>
                        {body}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-5 border-t pt-4 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0" style={{ borderColor: `${INK}14` }}>
                      <div>
                        <p className="tabular font-display text-lg font-semibold leading-none" style={{ color: EMERALD }}>
                          {figure}
                        </p>
                        <p className="mt-1.5 text-[12px]" style={{ color: `${INK}77` }}>
                          {figureLabel}
                        </p>
                      </div>
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"
                        style={{
                          background: `linear-gradient(135deg, ${EMERALD}, #0A4A5C)`,
                          boxShadow: `0 10px 18px -8px ${EMERALD}99`,
                        }}
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}