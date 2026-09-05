"use client";

import { useMemo, useState } from "react";
import { Calendar, Eye, Share2, X } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";
import { INFOGRAPHICS, INFOGRAPHIC_CATEGORIES } from "@/lib/infographicsData";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

/**
 * Content Guide Sec.8 — "Infographics" page. Required: a place to publish
 * daily infographics and share them from the website, each with image,
 * title, date/category, and a sharing/view option. Kept as a standalone
 * page component (not folded into Articles) per the guide's recommendation.
 */
function shareInfographic(item) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/infographics#${item.slug}` : "";
  if (typeof navigator !== "undefined" && navigator.share) {
    navigator.share({ title: item.title, url }).catch(() => {});
    return;
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(url).catch(() => {});
  }
}

function InfographicCard({ item, onView }) {
  return (
    <TiltCard
      max={8}
      lift={8}
      glare
      wrapperClassName="h-full"
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0"
      style={{ boxShadow: "0 2px 6px rgba(10,19,16,0.05), 20px 30px 54px -22px rgba(2,48,61,0.28)" }}
    >
      <button
        type="button"
        onClick={() => onView(item)}
        aria-label={`View ${item.title}`}
        className="relative block aspect-[4/5] w-full overflow-hidden text-left"
      >
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,48,61,0) 50%, rgba(2,48,61,0.65) 100%)" }} />
        <span
          className="pop-sm absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em]"
          style={{ background: "#FFFFFF", color: TEAL }}
        >
          {item.category}
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[13px] font-semibold text-ink-900">
            <Eye className="h-4 w-4" aria-hidden="true" />
            View
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-[11.5px] text-ink-300">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          {item.date}
        </div>
        <h3 className="mt-2 font-display text-[15.5px] font-semibold leading-snug text-ink-900">
          {item.title}
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-ink-900/8 pt-4">
          <button
            type="button"
            onClick={() => onView(item)}
            className="text-[13px] font-semibold text-ink-800 transition-colors hover:text-leaf-700"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => shareInfographic(item)}
            aria-label={`Share ${item.title}`}
            className="grid h-9 w-9 place-items-center rounded-full text-white transition-all duration-300 hover:opacity-90"
            style={{ background: ORANGE }}
          >
            <Share2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </TiltCard>
  );
}

function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/80 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-900"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <img src={item.img} alt={item.title} className="max-h-[60vh] w-full object-cover" />
        <div className="p-6">
          <div className="flex items-center gap-2 text-[12px] text-ink-300">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {item.date} · {item.category}
          </div>
          <h3 className="mt-2 font-display text-[18px] font-semibold text-ink-900">{item.title}</h3>
          <button
            type="button"
            onClick={() => shareInfographic(item)}
            className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white"
            style={{ background: ORANGE }}
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            Share this infographic
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Infographics() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewing, setViewing] = useState(null);

  const categories = useMemo(() => ["All", ...INFOGRAPHIC_CATEGORIES], []);
  const filtered = useMemo(
    () => (activeCategory === "All" ? INFOGRAPHICS : INFOGRAPHICS.filter((i) => i.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section className="relative overflow-hidden bg-mist-50 py-16 md:py-20">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="KEC CBG Park"
            accent="leaf"
            tone="light"
            title="Daily &amp; Visual"
            titleAccent="Infographics"
            stack
            lede="Bite-sized, visual explainers on CBG Parks, feedstock, policy, and plant operations — published regularly and easy to share."
          />
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const on = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative inline-flex min-h-[38px] cursor-pointer items-center rounded-full px-4 text-[13px] font-semibold transition-all duration-300 ${on ? "text-white" : "border border-ink-900/12 bg-white text-ink-800 hover:border-leaf-500 hover:text-leaf-700"
                  }`}
                style={on ? { background: TEAL } : undefined}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-ink-300">No infographics yet in this category — check back soon.</div>
        ) : (
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <StaggerItem key={item.slug}>
                <InfographicCard item={item} onView={setViewing} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <Lightbox item={viewing} onClose={() => setViewing(null)} />
    </section>
  );
}
