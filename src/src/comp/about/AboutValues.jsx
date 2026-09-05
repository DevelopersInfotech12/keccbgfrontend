"use client";

import { Sprout, Handshake, ShieldCheck, Lightbulb } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";

const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
const SAGE = "#7FC49B";
const PARA = "#434444d2";
const ICONOR = `linear-gradient(to bottom right, ${CORAL}, #C7511E)`;

const VALUES = [
  {
    icon: Sprout,
    title: "Sustainability first",
    body: "Every plant is sized to the feedstock a region can actually supply, sustainably, year after year — not the other way round.",
  },
  {
    icon: Handshake,
    title: "Fair, long-term partnership",
    body: "Farmers and industrial partners get open-book pricing and contracts built for decades, not the length of a subsidy cycle.",
  },
  {
    icon: ShieldCheck,
    title: "Safety and integrity",
    body: "Independently audited biological and technical service on every site — the same standard whether we're visited or not.",
  },
  {
    icon: Lightbulb,
    title: "Practical innovation",
    body: "We back upgrades that actually raise methane yield or lower downtime, and skip the ones that just look good on a slide.",
  },
];

export default function AboutValues() {
  return (
    <section id="our-values" className="relative overflow-hidden bg-mist-50 py-24 md:pb-32">
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="What we stand for"
          accent="leaf"
          title="Four commitments we don't"
          titleAccent="trade away for growth."
          stack
          lede="Bio CBG has turned down sites and partners that didn't fit these four — growth is welcome, but never at the cost of them."
          className="max-w-2xl"
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <TiltCard
                max={7}
                lift={5}
                wrapperClassName="group h-full"
                className="relative h-full overflow-hidden rounded-3xl border p-7"
                style={{ borderColor: `${LEAF}14`, background: "#fff" }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl shadow-panel"
                  style={{ background: ICONOR }}
                >
                  <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3
                  className="mt-5 font-display text-[1.25rem] font-semibold tracking-[-0.01em]"
                  style={{ color: DEEP }}
                >
                  {title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] font-semibold" style={{ color: PARA }}>
                  {body}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}