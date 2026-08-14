"use client";

import { Linkedin } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B";
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288"; // "blush" confirmed navy, sampled from uploaded icon reference

const TEAM = [
  { name: "Maren Holt", title: "Chief Executive Officer", photo: IMG.portraitA },
  { name: "Jonas Feld", title: "Chief Operating Officer", photo: IMG.ceo },
  { name: "Priya Raman", title: "Head of Biological Service", photo: IMG.portraitB },
  { name: "Tomas Aguilar", title: "Head of Feedstock Partnerships", photo: IMG.portraitC },
];

export default function AboutTeam() {
  return (
    <section id="leadership" className="relative overflow-hidden bg-mist-50 py-24 md:py-2 lg:mb-12">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Leadership"
          accent="blush"
          align="center"
          title="The people accountable"
          titleAccent="for every plant"
          className="mx-auto max-w-xl"
        />

        <Stagger className="scene-3d mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map(({ name, title, photo }) => (
            <StaggerItem key={name} className="group">
              <TiltCard
                max={10}
                lift={12}
                glare
                wrapperClassName="h-full"
                className="h-full overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0 shadow-panel"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-mist-200">
                  <img
                    src={photo}
                    alt={`Portrait of ${name}, ${title}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="pop-sm flex items-center justify-between gap-2 p-5">
                  <div>
                    <p className="font-display text-[15px] font-semibold text-ink-900">{name}</p>
                    <p className="mt-0.5 text-[13px] text-ink-500">{title}</p>
                  </div>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white shadow-lift-blush transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                    style={{ backgroundColor: ICON_BLUE }}
                  >
                    <Linkedin className="h-[15px] w-[15px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}