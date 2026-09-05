"use client";

import { ArrowUpRight, Flame } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, RevealScale, Stagger, StaggerItem } from "@/comp/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1];

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

const RESULTS = [
  { value: "70%", label: "of site gas demand met", tone: "leaf" },
  { value: "12k t", label: "CO₂e avoided / year", tone: "blush" },
  { value: "100%", label: "unsubsidised delivery", tone: "blush" },
];

export default function CaseStudy() {
  const reduced = useReducedMotion();

  return (
    <section id="insights" className="bg-mist-50 py-24 md:pt-32">
      <div className="container-shell">
        <Reveal
          className="grid-floor relative overflow-hidden rounded-[2.25rem] px-8 py-14 text-mist-50 sm:px-14 sm:py-12"
          style={{ background: TEAL }}
        >
          {/* Two blooms, teal + orange, kept low enough not to wash out the type sitting over them. */}
          <div
            aria-hidden="true"
            className="animate-drift pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[110px]"
            style={{ background: `${ORANGE}22` }}
          />
          <div
            aria-hidden="true"
            className="animate-drift pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full blur-[110px] [animation-delay:-4s]"
            style={{ background: `${ORANGE}18` }}
          />

          {/* Ghost watermark icon — section-level, top-right */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 opacity-[0.10] md:-right-8 md:-top-10"
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
            <Flame
              className="h-40 w-40 md:h-56 md:w-56"
              style={{ color: "#FFFFFF" }}
              strokeWidth={1}
            />
          </motion.span>

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: ORANGE }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE }} />
                Case study
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
                <span style={{ color: "#FFFFFF" }}>Pioneering the region&apos;s first unsubsidised Bio CBG plant</span>
                <br />
                <span style={{ color: ORANGE }}>for a life-sciences manufacturer</span>
              </h2>
              <p className="mt-5 text-[15.5px] lg:max-w-[470px] leading-[1.7] text-mist-50/62 text-justify">
                A dedicated plant now supplies renewable gas equivalent to a
                significant share of the site&apos;s total gas consumption —
                cutting emissions without a single change to existing
                infrastructure. A dedicated plant now supplies renewable gas equivalent to a significant share of the site's total gas consumption — cutting emissions without a single change to existing infrastructure.
              </p>
              <a
                href="/case-studies/unsubsidised-bio-cbg-plant-life-sciences"
                className="mt-9 inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-all duration-300 [touch-action:manipulation] hover:-translate-y-0.5"
                style={{ background: ORANGE }}
              >
                Read the case study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Image */}
            <RevealScale
              delay={0.1}
              className="group relative min-h-[260px] overflow-hidden rounded-[1.5rem] border border-mist-50/10"
              style={{ boxShadow: "0 30px 60px -34px rgba(255,125,68,0.35)" }}
            >
              <img
                src="/images/cbgcasestudy.png"
                alt="Unsubsidised Bio CBG plant for a life-sciences manufacturer"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10"
              />
            </RevealScale>
          </div>

          {/* Results as raised plinths rather than plain numbers. */}
          {/* Results as raised plinths rather than plain numbers. */}
          <Stagger as="dl" className="scene-3d relative mt-4 grid grid-cols-1 gap-3 border-t border-mist-50/10 pt-4 sm:grid-cols-3">
            {RESULTS.map(({ value, label, tone }) => (
              <StaggerItem key={label} className="group">
                <TiltCard
                  max={14}
                  lift={8}
                  glare
                  className="rounded-2xl border border-mist-50/30 bg-transparent shadow-2xl py-3 px-4 backdrop-blur-sm sm:px-6"
                >
                  <dt className="sr-only">{label}</dt>
                  <dd className="flex items-center gap-3 sm:block">
                    <p
                      className="pop-md tabular font-display text-[1.35rem] font-bold leading-none shrink-0 sm:text-[1.6rem]"
                      style={{ color: ORANGE }}
                    >
                      {value}
                    </p>
                    <p className="pop-sm text-[12px] leading-snug text-mist-50/55 sm:mt-2 sm:text-[11.5px]">
                      {label}
                    </p>
                  </dd>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}