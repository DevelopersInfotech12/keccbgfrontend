"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

export default function KecCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-mist-50 pb-24 pt-8 md:pb-32">
      <div className="container-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-[2.25rem] px-8 py-14 sm:px-14"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #1A6A42 0%, #2E9E63 34%, #F0937B 78%, #EC7C62 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 animate-float-slow rounded-full bg-white/15 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 animate-float rounded-full bg-blush-700/25 blur-[90px]"
          />
          <div className="grain absolute inset-0" aria-hidden="true" />

          <div className="relative flex flex-col items-start justify-between gap-9 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Work with KEC
              </span>
              <h2 className="mt-5 max-w-xl font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[2.25rem]">
                <span style={{ color: "#FFFFFF" }}>Turn your farm waste into fuel —</span>
                <br />
                <span style={{ color: "#D2EBDD" }}>and income.</span>
              </h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-[1.7] text-white/85">
                Farmers, agri-entrepreneurs and industry partners: talk to the KEC
                team about feedstock supply, plant partnerships and the Kisan
                Experience Centre.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/contact"
                className="group inline-flex min-h-[54px] shrink-0 cursor-pointer items-center gap-2.5 rounded-full bg-white px-8 text-sm font-semibold text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Contact the team
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="tel:+918527626868"
                className="inline-flex min-h-[54px] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                +91 85276 26868
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
