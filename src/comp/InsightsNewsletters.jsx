"use client";

import { Linkedin, ArrowUpRight } from "lucide-react";
import { NEWSLETTERS } from "@/lib/newsletters";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

/**
 * Content Guide Sec.7 (Insights & Articles page) — required sections:
 * "The BioEnergy Brief" and "KEC Insight Series", each with the supplied
 * LinkedIn subscription option, both clearly visible. Data is shared with
 * Footer.jsx (lib/newsletters.js) so there's one place to update a URL.
 */
export default function InsightsNewsletters() {
  return (
    <section className="border-b border-ink-900/8 bg-mist-50">
      <div className="container-shell py-10">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {NEWSLETTERS.map((n) => (
            <StaggerItem key={n.key}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: `${TEAL}1a`, background: `linear-gradient(155deg, ${TEAL}0a, transparent 65%)` }}
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: TEAL }}>
                    <Linkedin className="h-[17px] w-[17px] text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-300">
                      LinkedIn Newsletter
                    </p>
                    <p className="text-[15px] font-semibold text-ink-900">{n.title}</p>
                  </div>
                </div>
                <span
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white"
                  style={{ background: ORANGE }}
                >
                  Follow
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
