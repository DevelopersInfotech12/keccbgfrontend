"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Search, Handshake, HardHat, Zap, Gauge } from "lucide-react";


import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1];

// color den — swap here, whole section follow
const LEAF = "#02303D";
const EMERALD_LIGHT = "#2A9D8F";
const CORAL = "#E8887A";
const GOLD = "#C9A227";
const ORANGE = "#FF7D44";
const ORANGE_DARK = "#C7511E";
const ICON_BLUE_LIGHT = "#4F7CAC";
const ICON_BLUE_DARK = "#2E4F6E";
const BG_DARK_1 = "#0F241D";
const BG_DARK_2 = "#0B1512";
const BG_DARK_3 = "#0A0F0D";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

const ICON_BLUE_DARK_RGB = hexToRgb(ICON_BLUE_DARK);

const STAGES = [
  { n: "01", icon: Search, title: "Feasibility", body: "Feedstock survey, energy modelling and site diligence establish whether — and how big — a plant should be." },
  { n: "02", icon: Handshake, title: "Financing", body: "We structure and fund the project, so partners get a plant without carrying the capital risk themselves." },
  { n: "03", icon: HardHat, title: "Engineering & Build", body: "In-house EPC delivers digesters, upgrading and grid tie-in to a single programme and safety standard." },
  { n: "04", icon: Zap, title: "Commissioning", body: "Biology is seeded, gas quality is proven and the connection is energised to grid specification." },
  { n: "05", icon: Gauge, title: "Operate & Optimise", body: "We own and run the asset — monitoring, servicing and tuning it for uptime and yield over its whole life." },
];

export default function ServicesLifecycle() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 78%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="lifecycle"
      className="relative overflow-hidden py-24 text-mist-50 md:py-32"
      style={{ background: LEAF }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-24 -top-32 h-[460px] w-[460px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${EMERALD_LIGHT}30 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-28 bottom-0 h-[420px] w-[420px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${CORAL}2e 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }}
        />
      </div>

      <div className="container-shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="End to end"
            accent="blush"
            title="Five stages,"
            titleAccent="one continuous handshake."
            className="max-w-xl"
          />
          <p className="max-w-sm text-[15px] leading-relaxed text-mist-50/55">
            The same team carries a project from an idea on a whiteboard to a
            plant injecting gas — no hand-offs, no gaps in accountability.
          </p>
        </div>

        <div ref={trackRef} className="relative mt-16">
          <div
            aria-hidden="true"
            className="relative mb-10 hidden h-px w-full md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: reduced ? 1 : lineScale,
                background: `linear-gradient(90deg, ${EMERALD_LIGHT}, ${GOLD}, ${CORAL})`,
                boxShadow: `0 0 12px ${EMERALD_LIGHT}88`,
              }}
            />
          </div>

          <ol className="grid gap-5 md:grid-cols-5">
            {STAGES.map(({ n, icon: Icon, title, body }, i) => (
              <motion.li
                key={n}
                initial={reduced ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
                className="group relative"
              >
                <TiltCard
                  max={10}
                  lift={10}
                  glare
                  wrapperClassName="h-full"
                  className="relative h-full overflow-hidden rounded-2xl p-6"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.15) 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: [
                      "0 40px 70px -35px rgba(0,0,0,0.75)",
                      "inset 0 1px 0 rgba(255,255,255,0.12)",
                    ].join(", "),
                  }}
                >
                  {/* ghost watermark icon — top-right, matches Process/Industries texture */}
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
                      delay: i * 0.3,
                    }}
                  >
                    <Icon className="h-28 w-28" style={{ color: "#FFFFFF" }} strokeWidth={1} />
                  </motion.span>

                  <div className="relative flex items-center justify-between">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{
                        background: `linear-gradient(150deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%)`,
                        boxShadow: `0 14px 26px -10px ${ORANGE_DARK}b3, inset 0 1.5px 0 rgba(255,255,255,0.45)`,
                      }}
                    >
                      <Icon className="h-[18px] w-[18px] text-white" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span
                      className="tabular font-display text-2xl font-bold"
                      style={{ color: "rgba(255,255,255,0.12)", WebkitTextStroke: `0.5px ${GOLD}33` }}
                    >
                      {n}
                    </span>
                  </div>
                  <h3 className="relative mt-5 font-display text-[16px] font-semibold text-mist-50">
                    {title}
                  </h3>
                  <p className="relative mt-2 text-[13.5px] leading-relaxed text-mist-50/55">{body}</p>
                </TiltCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}