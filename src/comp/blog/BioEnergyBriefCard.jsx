"use client";

import { Linkedin, ArrowUpRight } from "lucide-react";
import { NEWSLETTERS } from "@/lib/newsletters";
import { CORAL, GOLD, ICON_BLUE, PANEL_BG, PANEL_INK } from "@/comp/blog/theme";

// Content Guide Sec.7 — "The BioEnergy Brief" LinkedIn newsletter panel.
// Rendered solo (one panel at a time) by InsightsNewsletters.jsx, swapped
// in/out via the BioEnergy Brief / KEC Insight Series toggle buttons.
// Pair: KecInsightSeriesCard.jsx. Copy/URL sourced from lib/newsletters.js.
const DATA = NEWSLETTERS.find((n) => n.key === "bioenergy-brief");

export default function BioEnergyBriefCard() {
  return (
    <a
      href={DATA.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
      style={{ background: PANEL_BG, borderColor: `${PANEL_INK}14` }}
    >
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: GOLD }} aria-hidden="true" />

      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full" style={{ background: ICON_BLUE }}>
          <Linkedin className="h-5 w-5" style={{ color: PANEL_INK }} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: `${PANEL_INK}99` }}>
            LinkedIn Newsletter
          </p>
          <p className="mt-0.5 text-[19px] font-semibold" style={{ color: PANEL_INK }}>{DATA.title}</p>
          <p className="mt-1 text-[13.5px]" style={{ color: `${PANEL_INK}b3` }}>{DATA.description}</p>
        </div>
      </div>
      <span
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold"
        style={{ background: CORAL, color: PANEL_INK }}
      >
        {DATA.buttonLabel || "Follow"}
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: PANEL_INK }}
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
