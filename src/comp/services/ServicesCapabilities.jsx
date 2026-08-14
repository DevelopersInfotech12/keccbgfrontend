"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, HardHat, Wrench, TrendingUp } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";

// color den — swap here, whole section follow
const LEAF = "#02303D";
const BG_DARK_1 = "#0F241D";
const BG_DARK_2 = "#0B1512";
const BG_DARK_3 = "#0A0F0D";
const SAGE = "#7FC49B";
const CORAL = "#EC7C62";
const CORAL_DARK = "#B44E3D";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

const CORAL_RGB = hexToRgb(CORAL);

const PILLARS = [
  {
    icon: Compass,
    step: "01",
    title: "Develop",
    body: "Feasibility, permitting and financing — we de-risk a site before a single foundation is poured.",
  },
  {
    icon: HardHat,
    step: "02",
    title: "Build",
    body: "In-house EPC delivers the digester, upgrading skid and grid connection as one turnkey scope.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Operate",
    body: "We keep ownership and run the plant ourselves — biology, mechanical service and grid compliance.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Optimise",
    body: "Digital monitoring and process tuning push yield and uptime year after year, not just at handover.",
  },
];

export default function ServicesCapabilities() {
  const reduced = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: LEAF }}
    >
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${SAGE}22 0%, transparent 70%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${CORAL}22 0%, transparent 70%)` }}
      />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="How we work"
          tone="dark"
          align="center"
          title="Four capabilities,"
          titleAccent="one accountable team."
          lede="Most operators hand a plant off after commissioning. We keep every stage in-house — so the numbers we quote are the numbers we run."
          className="mx-auto max-w-2xl"
        />

        <Stagger className="scene-3d mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, step, title, body }, i) => (
            <StaggerItem key={title} className="h-full">
              <TiltCard
                max={11}
                lift={10}
                glare
                wrapperClassName="group h-full"
                className="relative h-full overflow-hidden rounded-3xl border border-white/10 p-7 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  boxShadow:
                    `inset 0 1px 0 rgba(255,255,255,0.06), 0 22px 44px -30px rgba(0,0,0,0.6), 16px 22px 46px -26px rgba(${CORAL_RGB},0.4)`,
                }}
              >
                {/* ghost watermark icon — top-right, exact texture from Process/Industries */}
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
                  <Icon className="h-32 w-32" style={{ color: "#FFFFFF" }} strokeWidth={1} />
                </motion.span>

                <span
                  aria-hidden="true"
                  className="pop-sm absolute -right-6 -top-6 font-display text-[5rem] font-bold leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-blush-500/20"
                >
                  {step}
                </span>
                <span
                  className="pop-md relative grid h-12 w-12 place-items-center rounded-xl"
                  style={{
                    background: `linear-gradient(150deg, ${CORAL} 0%, ${CORAL_DARK} 100%)`,
                    boxShadow: `0 14px 26px -10px rgba(${CORAL_RGB},0.6)`,
                  }}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="pop-sm relative mt-6 font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="relative mt-2 text-[14.5px] leading-relaxed text-mist-50/65">{body}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}