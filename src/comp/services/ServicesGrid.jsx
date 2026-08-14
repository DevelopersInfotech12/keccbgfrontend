"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  HardHat,
  Gauge,
  Wrench,
  FlaskConical,
  Sprout,
  Recycle,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1];

// color den — swap here, whole grid follow
const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
// const CORAL = "#ff4444";
// const CORAL = "#0ba0f7";
const SAGE = "#7FC49B";
const ICON_BLUE_LIGHT = "#4F7CAC";

// hex → "r,g,b" for rgba() string
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

const LEAF_RGB = hexToRgb(LEAF);
const DEEP_RGB = hexToRgb(DEEP);
const CORAL_RGB = hexToRgb(CORAL);
const SAGE_RGB = hexToRgb(SAGE);

const SERVICES = [
  {
    icon: Building2,
    title: "Development & Financing",
    body: "Site feasibility, permitting, feedstock contracts and bankable financial models that get a plant to final investment decision.",
  },
  {
    icon: HardHat,
    title: "Engineering & Construction",
    body: "Turnkey EPC of the full plant — digesters, gas handling, upgrading and grid connection, delivered as one scope.",
  },
  {
    icon: Gauge,
    title: "Biogas Upgrading & Gas-to-Grid",
    body: "Membrane and scrubbing skids that lift raw biogas to pipeline-grade biomethane / Compressed Biogas, ready to inject.",
  },
  {
    icon: Wrench,
    title: "Operation & Maintenance",
    body: "Round-the-clock O&M — mechanical service, spares, safety and grid compliance keeping uptime above spec.",
  },
  {
    icon: FlaskConical,
    title: "Biological Process Service",
    body: "In-house lab and process engineers monitor digester biology, dose micronutrients and troubleshoot to protect yield.",
  },
  {
    icon: Sprout,
    title: "Feedstock & Farmer Partnerships",
    body: "Fair, long-term feedstock agreements and agronomy support that secure supply and pay growers properly.",
  },
  {
    icon: Recycle,
    title: "Digestate & Biofertiliser",
    body: "Nutrient-rich digestate handled, certified and returned to partner farms — closing the loop, not creating waste.",
  },
  {
    icon: Cpu,
    title: "Digital Monitoring & Control",
    body: "Remote SCADA, live dashboards and predictive alerts that turn every plant into an optimisable, transparent asset.",
  },
];

export default function ServicesGrid() {
  const reduced = useReducedMotion();

  return (
    <section
      id="what-we-do"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: `linear-gradient(180deg, #F1EEE7 0%, #F6F4EF 100%)` }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, rgba(${SAGE_RGB},0.12) 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, rgba(${CORAL_RGB},0.12) 0%, transparent 70%)` }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Full-service scope"
          accent="leaf"
          title="Everything a plant needs,"
          titleAccent="start to finish."
          lede="Eight service lines that together cover the entire life of a biogas asset — pick the whole package or the parts you're missing."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: EASE }}
              className="group"
            >
              <TiltCard
                max={10}
                lift={12}
                glare
                wrapperClassName="h-full"
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0 p-7"
                style={{
                  boxShadow: `0 2px 6px rgba(10,19,16,0.05), 20px 30px 54px -22px rgba(${SAGE_RGB},0.5)`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, ${SAGE} 0%, ${CORAL} 100%)`,
                    transformOrigin: "left",
                  }}
                />

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
                    delay: (i % 4) * 0.3,
                  }}
                >
                  <Icon className="h-32 w-32" style={{ color: LEAF }} strokeWidth={1} />
                </motion.span>

                <span
                  className="pop-md relative grid h-12 w-12 place-items-center rounded-xl"
                  style={{
                    background: ICON_BLUE_LIGHT,
                    boxShadow: `0 14px 26px -10px rgba(${LEAF_RGB},0.55), inset 0 1.5px 0 rgba(255,255,255,0.4)`,
                  }}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="pop-sm relative mt-6 font-display text-[17px] font-semibold leading-snug text-ink-900">
                  {title}
                </h3>
                <p className="relative mt-3 flex-1 text-[14px] leading-relaxed text-ink-500">{body}</p>

                <span
                  className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
                  style={{ color: LEAF }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = LEAF)}
                >
                  Learn more
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </span>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}