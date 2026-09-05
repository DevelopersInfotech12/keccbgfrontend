"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sprout,
  Blend,
  FlaskConical,
  Wind,
  Flame,
  Zap,
  MonitorSmartphone,
  BrainCircuit,
  ArrowUpRight,
  Gauge,
  Layers,
  SlidersHorizontal,
  Activity,
  Waves,
} from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal } from "@/comp/motion/Reveal";

/* ── Teal + orange, matches WhyUs / Products ── */
const TEAL = "#02303D";
const ORANGE = "#FF7D44";
const GOLD = "#FF7D44";
const INK = "#12100D";

const EASE = [0.16, 1, 0.3, 1];

const INDUSTRIES = [
  {
    icon: Sprout,
    title: "FeedSecure™",
    body: "Feedstock planning and supply-chain continuity framework.",
    tone: "navy",
  },
  {
    icon: Blend,
    title: "SmartMix™",
    body: "Optimized substrate blending and input balancing architecture.",
    tone: "wine",
  },
  {
    icon: FlaskConical,
    title: "HydroReact™",
    body: "Digestion process integration and reaction-stage management.",
    tone: "navy",
  },
  {
    icon: MonitorSmartphone,
    title: "DigiDigest™",
    body: "Digital digestion monitoring and operational visibility layer.",
    tone: "wine",
  },
  {
    icon: Flame,
    title: "BioHeat™",
    body: "Heat recovery and thermal utilization framework.",
    tone: "navy",
  },
  {
    icon: Zap,
    title: "EnergySync™",
    body: "Utility synchronization across gas, power, and process systems.",
    tone: "wine",
  },
  {
    icon: Gauge,
    title: "SmartPower™",
    body: "Power optimization and electrical load coordination.",
    tone: "navy",
  },
  {
    icon: Wind,
    title: "MethaPure™",
    body: "Gas upgrading and methane purification process layer.",
    tone: "wine",
  },
  {
    icon: Layers,
    title: "SmartCascade™",
    body: "Multi-stage process and utility cascade coordination.",
    tone: "navy",
  },
  {
    icon: SlidersHorizontal,
    title: "InfraCore™",
    body: "Core infrastructure planning and integration framework.",
    tone: "wine",
  },
  {
    icon: MonitorSmartphone,
    title: "SmartControl™",
    body: "Centralized control architecture for plant operations.",
    tone: "navy",
  },
  {
    icon: BrainCircuit,
    title: "ProcessSense™",
    body: "Process analytics, diagnostics, and performance intelligence.",
    tone: "wine",
  },
  {
    icon: Activity,
    title: "PlantVision™",
    body: "Real-time visualization and plant-wide operational dashboard.",
    tone: "navy",
  },
  {
    icon: Waves,
    title: "BioFlow IQ™",
    body: "Flow intelligence, performance insights, and optimization layer.",
    tone: "wine",
  },
];

export default function Industries() {
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, paused: false });
  const CARD_W = 280 + 20; // card width + gap
  const LOOP_ITEMS = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];
  const SET_W = CARD_W * INDUSTRIES.length;

  const normalize = () => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft <= SET_W * 0.15) {
      el.scrollLeft += SET_W;
    } else if (el.scrollLeft >= SET_W * 1.85) {
      el.scrollLeft -= SET_W;
    }
  };

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const onPointerUp = () => {
    drag.current.down = false;
    normalize();
  };
  const onScroll = () => {
    normalize();
  };
  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * CARD_W, behavior: "smooth" });
    setTimeout(normalize, 350);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = SET_W; // start on middle copy
    if (reduced) return;

    let raf;
    const speed = 0.6; // px per frame, right→left
    const tick = () => {
      const track = trackRef.current;
      if (track && !drag.current.down && !drag.current.paused) {
        track.scrollLeft += speed;
        normalize();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="industries"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: `linear-gradient(180deg, #F1EEE7 0%, #F6F4EF 100%)` }}
    >
      {/* ambient mesh — same recipe as WhyUs / Products, keeps the site cohesive */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${ORANGE}33 0%, transparent 70%)` }}
        />
        <div
          className="absolute -left-24 bottom-0 h-[440px] w-[440px] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${TEAL}30 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }}
        />
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="container-shell relative">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="KEC Technology & Process Stack"
            accent="leaf"
            title="KEC Integrated"
            titleAccent="CBG Technology Stack"
            lede="KEC's process architecture is being developed around a modular infrastructure framework designed for monitoring, synchronization, process optimization, and operational visibility."
            className="max-w-lg"
          />

          <a
            href="#contact"
            className="w-fit shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:gap-3"
            style={{ background: ORANGE }}
          >
            Talk to our team
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="relative mt-16">

          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onScroll={onScroll}
            onMouseEnter={() => { drag.current.paused = true; }}
            onMouseLeave={() => { drag.current.paused = false; }}
            className="flex cursor-grab gap-5 overflow-x-auto scroll-smooth px-1 pb-4 active:cursor-grabbing"
            style={{ scrollSnapType: "x proximity", touchAction: "pan-y", scrollbarWidth: "none" }}
          >
            {LOOP_ITEMS.map(({ icon: Icon, title, body, tone }, i) => {
              return (
                <div key={`${title}-${i}`} className="w-[260px] flex-none select-none sm:w-[280px]" style={{ scrollSnapAlign: "start" }}>
                  <TiltCard
                    max={8}
                    lift={6}
                    glare={true}
                    wrapperClassName="group h-full"
                    className="relative h-full overflow-hidden rounded-2xl p-7"
                    style={{
                      background: TEAL,
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow:
                        "20px 28px 50px -24px rgba(2,48,61,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* gem-cut top edge, teal → orange */}
                    <span
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})` }}
                    />

                    {/* ghost icon — oversized, faint, drifts slowly behind the card content. */}
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 -top-4 opacity-[0.10]"
                      animate={
                        reduced
                          ? {}
                          : { rotate: [0, 6, 0], scale: [1, 1.06, 1] }
                      }
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      }}
                    >
                      <Icon className="h-32 w-32" style={{ color: "#FFFFFF" }} strokeWidth={1} />
                    </motion.span>

                    {/* icon tile — orange fill, gentle float loop, hover lift */}
                    <motion.span
                      className="relative grid h-12 w-12 place-items-center rounded-xl"
                      style={{
                        background: ORANGE,
                        boxShadow: `0 12px 22px -8px ${ORANGE}99, inset 0 1px 0 rgba(255,255,255,0.4)`,
                      }}
                      animate={reduced ? {} : { y: [0, -3, 0] }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.25,
                      }}
                    >
                      <Icon className="h-[21px] w-[21px] text-white" strokeWidth={1.8} aria-hidden="true" />
                    </motion.span>

                    <h3
                      className="relative mt-6 font-display text-[16.5px] font-semibold leading-snug"
                      style={{ color: "#FFFFFF" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="relative mt-2.5 text-[14.5px] leading-relaxed text-justify"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {body}
                    </p>
                  </TiltCard>
                </div>
              );
            })}
          </div>

          {/* arrow controls */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll left"
              className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 border border-[#FF7D44]"
              style={{ color: "#FF7D44" }}
            >
              <ArrowUpRight className="h-4 w-4 rotate-[225deg]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Scroll right"
              className="grid h-10 w-10 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: ORANGE, color: "#fff" }}
            >
              <ArrowUpRight className="h-4 w-4 rotate-45" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* positioning note */}
        <div
          className="relative mt-14 rounded-2xl border-l-4 px-6 py-5"
          style={{ borderColor: ORANGE, background: "rgba(2,48,61,0.04)" }}
        >
          <p className="font-semibold text-[10.5px] uppercase tracking-[0.2em]" style={{ color: TEAL }}>
            Technology Positioning Note
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "rgba(18,16,13,0.65)" }}>
            The above modules represent KEC's branded infrastructure and process framework
            being developed for integrated CBG ecosystem deployment.
          </p>
        </div>
      </div>
    </section>
  );
}