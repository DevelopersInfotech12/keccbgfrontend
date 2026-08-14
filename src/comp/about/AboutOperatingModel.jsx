"use client";

import { ClipboardList, Wrench, Gauge } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { RevealSide, RevealImage } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
const PARA = "#434444d2";
const ICONOR = `linear-gradient(to bottom right, ${CORAL}, #C7511E)`;

const MODEL_IMAGE = IMG.engineer;

const STEPS = [
  {
    icon: ClipboardList,
    title: "We plan and build it",
    body: "Feasibility, permitting, feedstock contracts and construction — one team, one point of accountability from day one.",
  },
  {
    icon: Wrench,
    title: "We own it",
    body: "Every plant stays on our balance sheet. If it underperforms, that's our problem to fix, not a client's to escalate.",
  },
  {
    icon: Gauge,
    title: "We run it",
    body: "Our own biological and technical service teams operate the plant daily, so yield and uptime stay our responsibility, always.",
  },
];

export default function AboutOperatingModel() {
  return (
    <section id="operating-model" className="relative overflow-hidden bg-mist-50 py-24 md:py-32">
      <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
        <RevealImage className="scene-3d">
          <TiltCard
            max={11}
            lift={14}
            glare
            className="aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-panel"
          >
            <img
              src={MODEL_IMAGE}
              alt="Technician monitoring a Bio CBG gas-upgrading unit"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </TiltCard>
        </RevealImage>

        <RevealSide from="right">
          <SectionHeading
            eyebrow="How we operate"
            accent="leaf"
            title="Built, owned, operated —"
            titleAccent="by the same team, always."
            stack
            lede="Most operators hand a plant off after commissioning. We don't. Keeping build, ownership and daily operation under one roof is what lets us guarantee the numbers we quote."
            className="max-w-xl"
          />

          <div className="mt-9 space-y-4">
            {STEPS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-panel"
              >
                <span
                  className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-panel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                  style={{ background: ICONOR }}
                >
                  <Icon className="h-[18px] w-[18px] text-white" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-[1.05rem] font-semibold" style={{ color: DEEP }}>
                    {title}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-[1.6] font-semibold" style={{ color: PARA }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealSide>
      </div>
    </section>
  );
}