"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NEWSLETTERS } from "@/lib/newsletters";
import BioEnergyBriefCard from "@/comp/blog/BioEnergyBriefCard";
import KecInsightSeriesCard from "@/comp/blog/KecInsightSeriesCard";
import { Reveal } from "@/comp/motion/Reveal";
import { BG, EMERALD, EMERALD_LIGHT, INK, PANEL_INK } from "@/comp/blog/theme";

const EASE = [0.22, 1, 0.36, 1];

// Toggle buttons drive which panel is visible; only one newsletter shows
// at a time, so the click has a visible effect on the page (Content Guide
// Sec.7 — both options still reachable, one active view at a time).
const PANELS = {
  "bioenergy-brief": BioEnergyBriefCard,
  "kec-insight-series": KecInsightSeriesCard,
};

export default function InsightsNewsletters() {
  const [active, setActive] = useState(NEWSLETTERS[0].key);
  const Panel = PANELS[active] || PANELS["bioenergy-brief"];

  return (
    <section className="border-b border-ink-900/8" style={{ background: BG }}>
      <div className="container-shell py-10">
        <Reveal className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: INK, opacity: 0.6 }}>
              Follow our newsletters
            </p>

            {/* Toggle — segmented control, one active view at a time */}
            <div
              role="tablist"
              aria-label="Choose a newsletter"
              className="inline-flex gap-1 rounded-full p-1"
              style={{ background: PANEL_INK, border: `1px solid ${INK}1a` }}
            >
              {NEWSLETTERS.map((n) => {
                const isActive = active === n.key;
                return (
                  <button
                    key={n.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(n.key)}
                    className="relative min-h-9 cursor-pointer rounded-full px-4 text-[13px] font-semibold transition-colors duration-300 hover:bg-[var(--tab-hover)]"
                    style={{ color: isActive ? PANEL_INK : INK, "--tab-hover": isActive ? "transparent" : `${EMERALD_LIGHT}14` }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="newsletter-tab-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: EMERALD }}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                    <span className="relative">{n.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content swaps here on button click */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
