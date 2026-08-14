"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { CASE_STUDIES as FALLBACK_CASE_STUDIES, sectorColors } from "@/lib/caseStudyData";

const EASE = [0.16, 1, 0.3, 1];
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const SECTORS = ["All", ...Object.keys(sectorColors)];

// color den — swap here, whole section follow
const BG_LIGHT_1 = "#F6F4EF";
const BG_LIGHT_2 = "#F1EEE7";
const SAGE = "#2E9E63";
const CORAL = "#EC7C62";
const INK_900 = "#0A1310";
const LEAF_DARK = "#1A6A42";
const LEAF_LIGHT = "#2E9E63";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

const SAGE_RGB = hexToRgb(SAGE);
const CORAL_RGB = hexToRgb(CORAL);
const INK_900_RGB = hexToRgb(INK_900);

export default function CaseStudiesGrid() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("All");
  const [items, setItems] = useState(FALLBACK_CASE_STUDIES);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/case-studies/published`, { cache: "no-store" });
        const data = await res.json();
        // See BlogScreen.jsx for why this trusts an empty response too.
        if (data.success) setItems(data.data || []);
      } catch {
        // keep local fallback content
      }
    })();
  }, []);

  const shown = useMemo(
    () => (active === "All" ? items : items.filter((c) => c.sector === active)),
    [active, items]
  );

  return (
    <section
      id="case-studies-grid"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: `linear-gradient(180deg, ${BG_LIGHT_1} 0%, ${BG_LIGHT_2} 100%)` }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, rgba(${SAGE_RGB},0.12) 0%, transparent 70%)` }} />
        <div className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, rgba(${CORAL_RGB},0.12) 0%, transparent 70%)` }} />
      </div>

      <div className="container-shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="By sector"
            accent="leaf"
            title="Plants proving"
            titleAccent="the economics work."
            className="max-w-xl"
          />

          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s) => {
              const on = active === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActive(s)}
                  className={`relative inline-flex min-h-[42px] cursor-pointer items-center rounded-full px-5 text-[13.5px] font-semibold transition-all duration-300 ${on ? "text-white shadow-lift" : "border border-ink-900/12 bg-white/70 text-ink-800 hover:border-leaf-500 hover:text-leaf-700"
                    }`}
                  style={on ? { background: `linear-gradient(120deg, ${LEAF_DARK}, ${LEAF_LIGHT})` } : undefined}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.length === 0 ? (
              <div className="col-span-full py-16 text-center text-ink-300">
                No case studies yet in this sector — check back soon.
              </div>
            ) : shown.map((c, i) => {
              const sc = sectorColors[c.sector] || { bg: "#EAF6EF", text: "#124B2F" };
              return (
                <motion.div
                  key={c.slug}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: reduced ? 0 : (i % 3) * 0.06, ease: EASE }}
                  className="group"
                >
                  <TiltCard
                    max={9}
                    lift={12}
                    glare
                    wrapperClassName="h-full"
                    className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0"
                    style={{ boxShadow: `0 2px 6px rgba(${INK_900_RGB},0.05), 20px 30px 54px -22px rgba(${SAGE_RGB},0.5)` }}
                    onClick={() => { window.location.href = `/case-studies/${c.slug}`; }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(${INK_900_RGB},0) 40%, rgba(${INK_900_RGB},0.72) 100%)` }} />
                      <span
                        className="pop-sm absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {c.sector}
                      </span>
                      {c.location && (
                        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/90">
                          <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                          {c.location}
                        </span>
                      )}
                    </div>

                    <div className="pop-sm flex flex-1 flex-col p-6">
                      <h3 className="font-display text-[19px] font-semibold leading-snug text-ink-900">{c.title}</h3>
                      {c.capacity && <p className="mt-2 text-[13.5px] font-semibold text-blush-600">{c.capacity}</p>}
                      <p className="mt-3 flex-1 text-[13.5px] leading-[1.6] text-ink-500 line-clamp-3">{c.excerpt}</p>

                      <div className="mt-6 flex items-center justify-between border-t border-ink-900/8 pt-4">
                        <span className="text-[13px] font-semibold text-ink-800">Read case study</span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-500 text-white transition-all duration-300 group-hover:bg-blush-600 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}