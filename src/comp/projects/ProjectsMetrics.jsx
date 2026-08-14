"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Gauge, Leaf, Handshake, Recycle } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1];
const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
const SAGE = "#7FC49B";
const TEAL = "#046f8d";

const METRICS = [
  { icon: Gauge, target: 18, suffix: "", label: "Plants online", sub: "built, owned & operated" },
  { icon: Leaf, target: 4.2, suffix: " TWh", label: "Biomethane / yr", sub: "injected to grid", decimals: 1 },
  { icon: Recycle, target: 1.1, suffix: "M t", label: "CO₂e avoided", sub: "every single year", decimals: 1 },
  { icon: Handshake, target: 240, suffix: "+", label: "Partner farms", sub: "supplying feedstock" },
];

function CountUp({ target, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  return (
    <span ref={ref} className="tabular">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function ProjectsMetrics() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-24 text-mist-50 md:py-32"
      style={{ background: LEAF }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-24 -top-32 h-[460px] w-[460px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${SAGE}30 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-28 bottom-0 h-[420px] w-[420px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${CORAL}2e 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${CORAL}55, transparent)` }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          tone="dark"
          eyebrow="Portfolio at a glance"
          accent="blush"
          align="center"
          title="A portfolio measured"
          titleAccent="in real tonnes."
          lede="Not pledges or pilots — operating assets, delivering renewable gas and closing the carbon loop on the ground."
          className="mx-auto max-w-2xl"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map(({ icon: Icon, target, suffix, label, sub, decimals }, i) => (
            <motion.div
              key={label}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="group"
            >
              <TiltCard
                max={10}
                lift={10}
                glare
                wrapperClassName="h-full"
                className="relative h-full overflow-hidden rounded-2xl p-7"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.15) 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: [
                    "0 40px 70px -35px rgba(0,0,0,0.75)",
                    "inset 0 1px 0 rgba(255,255,255,0.12)",
                    "inset 0 -14px 24px -18px rgba(0,0,0,0.6)",
                  ].join(", "),
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
                  className="pop-md relative grid h-12 w-12 place-items-center rounded-xl"
                  style={{
                    background: CORAL,
                    boxShadow: "0 14px 26px -10px rgba(26,106,66,0.8), inset 0 1.5px 0 rgba(255,255,255,0.4)",
                  }}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden="true" />
                </span>

                <p className="pop-sm relative mt-6 font-display text-4xl font-bold leading-none text-white">
                  <CountUp target={target} suffix={suffix} decimals={decimals} />
                </p>
                <p className="relative mt-3 text-[15px] font-semibold" style={{ color: "#fff" }}>
                  {label}
                </p>
                <p className="relative mt-1 text-[13px] leading-snug text-mist-50/55">{sub}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}