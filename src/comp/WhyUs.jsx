"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";
import { IMG } from "@/lib/images";
import {
  Zap,
  Handshake,
  BadgeCheck,
  Wind,
  Check,
  Factory,
  Sprout,
  Gauge,
  Recycle,
  Sparkles,
} from "lucide-react";

/* ── Palette matched exact from ss (pixel-sampled) ────────────── */
const EMERALD = "#02303D";
const EMERALD_LIGHT = "#02303D";
const CORAL = "#FF7D44";
const CORAL_LIGHT = "#FF7D44";
const GOLD = "#FF7D44";
const INK = "#0B1512";
const ICON_BLUE = "#4F7CAC";
const ICON_BLUE_DARK = "#2E4F6E";
const BG = "#f6f7f6";
const PANEL_BG = "#02303D";
const PANEL_INK = "#FFFFFF";

const REASONS = [
  {
    id: "drop-in",
    icon: Zap,
    label: "Drop-in substitution",
    title: "Real decarbonisation, zero disruption",
    body: "A drop-in substitute for natural gas that runs on existing infrastructure — cut emissions immediately, not eventually.",
    image: IMG.industrialPlant,
    points: [
      "No boiler, burner or pipework changes",
      "Certified to the same grid specification",
      "Switchover measured in days, not quarters",
    ],
  },
  {
    id: "partner",
    icon: Handshake,
    label: "Long-term partnership",
    title: "A trusted, long-term partner",
    body: "Transparent, win-win partnerships with farmers and industry, built on shared ambition rather than short-term contracts.",
    image: IMG.teamMeeting,
    points: [
      "Feedstock agreements that pay growers fairly",
      "Open-book pricing across the whole term",
      "One counterparty from feasibility to operation",
    ],
  },
  {
    id: "additional",
    icon: BadgeCheck,
    label: "Fully additional",
    title: "Unsubsidised and fully additional",
    body: "Every plant we bring online adds genuine new low-carbon capacity to the grid — not capacity shuffled from elsewhere.",
    image: IMG.solarField,
    points: [
      "No reliance on subsidy to reach viability",
      "Third-party verified additionality",
      "Retired certificates, never double-counted",
    ],
  },
  {
    id: "ccs",
    icon: Wind,
    label: "Carbon capture",
    title: "Carbon capture, taken further",
    body: "Integrated CCS on our newest sites turns biogenic CO₂ into permanent storage, making our plants carbon-negative.",
    image: IMG.foggyValley,
    points: [
      "Biogenic CO₂ captured at the upgrader",
      "Permanent geological storage, not offsets",
      "Net-negative across the full plant lifecycle",
    ],
  },
];

const PROOF = [
  { icon: Factory, value: "18", label: "Plants operated", tone: "leaf" },
  { icon: Gauge, value: "4.2 TWh", label: "Delivered a year", tone: "blush" },
  { icon: Recycle, value: "1.1M t", label: "CO₂e avoided", tone: "leaf" },
  { icon: Sprout, value: "15 yrs", label: "Operating record", tone: "blush" },
];

const EASE = [0.16, 1, 0.3, 1];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const reduced = useReducedMotion();

  const current = REASONS[active];
  const CurrentIcon = current.icon;

  const onKeyDown = (event) => {
    const keys = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: REASONS.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + REASONS.length) % REASONS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="why"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: BG }}
    >
      {/* ── Ambient mesh — dimmed so bg stays flat, matches ref ss ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${EMERALD_LIGHT}14 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }}
        />
      </div>

      <div className="container-shell relative">
        {/* ── Section header ───────────────────────────────────────── */}
        <Reveal>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: GOLD }} strokeWidth={1.8} aria-hidden="true" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: `${INK}99` }}
            >
              Why Bio CBG
            </span>
          </div>

          <SectionHeading
            accent="leaf"
            tone="light"
            title="Not just renewable."
            titleAccent="Responsible."
            stack
            lede="For over 15 years we've built, owned and operated anaerobic digestion plants that give organisations a viable, scalable route to net zero — today, not someday."
            className="mt-4 max-w-2xl"
          />
        </Reveal>

        {/* ── Rail + detail panel — floated as one lacquered slab ────── */}
        <Reveal
          delay={0.1}
          y={32}
          className="relative mt-14 rounded-[32px] p-[1px]"
          style={{
            background: `linear-gradient(145deg, ${GOLD}66, transparent 30%, transparent 70%, ${CORAL}44)`,
            boxShadow: `0 60px 100px -50px rgba(11,21,18,0.4), 26px 44px 90px -46px rgba(255,125,68,0.35), 0 2px 0 rgba(255,255,255,0.6) inset`,
          }}
        >
          <div
            className="overflow-hidden rounded-[31px] border border-white/10 backdrop-blur-xl"
            style={{ transformStyle: "preserve-3d", background: PANEL_BG }}
          >
            <div className="grid lg:grid-cols-[300px_1fr]">
              {/* Rail */}
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Reasons to choose Bio CBG"
                onKeyDown={onKeyDown}
                className="grid grid-cols-2 gap-2 border-white/10 p-3 sm:grid-cols-4 lg:grid-cols-1 lg:content-start lg:gap-2 lg:border-r lg:p-5"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))" }}
              >
                <p
                  className="hidden px-3 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] lg:block"
                  style={{ color: `${PANEL_INK}88` }}
                >
                  Our commitments
                </p>

                {REASONS.map((reason, i) => {
                  const Icon = reason.icon;
                  const selected = i === active;
                  return (
                    <button
                      key={reason.id}
                      ref={(el) => (tabRefs.current[i] = el)}
                      role="tab"
                      id={`why-tab-${reason.id}`}
                      aria-selected={selected}
                      aria-controls={`why-panel-${reason.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(i)}
                      className="flex min-h-[54px] cursor-pointer items-center gap-3 rounded-2xl px-3.5 text-left text-[13.5px] font-medium transition-all duration-200 [touch-action:manipulation] lg:text-sm"
                      style={
                        selected
                          ? {
                            color: "#fff",
                            background: `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`,
                            boxShadow: `0 14px 28px -12px ${CORAL}99, 0 1px 0 rgba(255,255,255,0.2) inset`,
                            transform: "translateY(-1px)",
                          }
                          : {
                            color: `${PANEL_INK}99`,
                            background: "rgba(255,255,255,0.06)",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          }
                      }
                    >
                      <Icon
                        className="h-[18px] w-[18px] shrink-0"
                        style={{ color: selected ? "#fff" : CORAL }}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      <span className="leading-tight">{reason.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detail panel */}
              <div className="relative min-h-[420px] overflow-hidden p-7 sm:p-10">
                {/* ghost icon — oversized, faint, matches Industries card treatment */}
                <motion.span
                  key={`ghost-${current.id}`}
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
                  }}
                >
                  <CurrentIcon className="h-32 w-32" style={{ color: "#FFFFFF" }} strokeWidth={1} />
                </motion.span>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    id={`why-panel-${current.id}`}
                    role="tabpanel"
                    aria-labelledby={`why-tab-${current.id}`}
                    tabIndex={0}
                    initial={reduced ? false : { opacity: 0, y: 12, rotateX: -3 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                    className="relative grid items-center gap-10 outline-none md:grid-cols-[1fr_320px]"
                  >
                    <div>
                      <h3
                        className="font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[1.9rem]"
                        style={{ color: PANEL_INK }}
                      >
                        {current.title}
                      </h3>
                      <p className="mt-4 max-w-[52ch] text-[15.5px] leading-[1.7] text-justify" style={{ color: `${PANEL_INK}99` }}>
                        {current.body}
                      </p>

                      <ul className="mt-7 space-y-3">
                        {current.points.map((point, i) => (
                          <motion.li
                            key={point}
                            initial={reduced ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.28,
                              delay: reduced ? 0 : 0.08 + i * 0.045,
                              ease: EASE,
                            }}
                            className="flex items-start gap-3 text-[14.5px] leading-snug"
                            style={{ color: `${PANEL_INK}CC` }}
                          >
                            <span
                              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                              style={{
                                background: `linear-gradient(135deg, ${CORAL_LIGHT}, ${CORAL})`,
                                boxShadow: `0 3px 8px -2px ${CORAL}88`,
                              }}
                            >
                              <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                            </span>
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Photo well */}
                    <div
                      className="relative hidden aspect-square place-items-center overflow-hidden rounded-[26px] md:grid"
                      style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)" }}
                    >
                      <img
                        src="/images/aboutscreen2.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{ background: `linear-gradient(160deg, ${CORAL}26 0%, rgba(0,0,0,0.4) 100%)` }}
                      />
                      <span
                        className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full"
                        style={{ background: "rgba(255,255,255,0.94)", boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)" }}
                      >
                        <CurrentIcon className="h-6 w-6" style={{ color: CORAL }} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Proof strip ── */}
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map(({ icon: Icon, value, label, tone }, i) => {
            const isLeaf = tone === "leaf";
            const c1 = isLeaf ? CORAL : EMERALD;
            const c2 = isLeaf ? CORAL_LIGHT : EMERALD_LIGHT;
            return (
              <StaggerItem key={label}>
                <TiltCard
                  max={8}
                  lift={6}
                  glare={true}
                  wrapperClassName="group h-full"
                  className="relative h-full overflow-hidden rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(11,21,18,0.06)",
                    boxShadow: `20px 28px 50px -24px rgba(255,125,68,0.5), inset 0 1px 0 rgba(255,255,255,0.8)`,
                  }}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
                  />

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
                    <Icon className="h-32 w-32" style={{ color: INK }} strokeWidth={1} />
                  </motion.span>

                  <span
                    className="relative grid h-11 w-11 place-items-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${ICON_BLUE}, ${ICON_BLUE_DARK})`,
                      boxShadow: `0 10px 20px -8px ${ICON_BLUE_DARK}88`,
                    }}
                  >
                    <Icon className="h-[20px] w-[20px] text-white" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p
                    className="tabular relative mt-5 font-display text-[1.75rem] font-semibold leading-none"
                    style={{ color: INK }}
                  >
                    {value}
                  </p>
                  <p className="relative mt-2 text-[13.5px]" style={{ color: `${INK}99` }}>
                    {label}
                  </p>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}