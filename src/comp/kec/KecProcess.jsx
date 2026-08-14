"use client";

import { Tractor, Trash2, Cog, Fuel } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";

const STEPS = [
  {
    icon: Tractor,
    step: "01",
    title: "Farm",
    body: "Crop residue and organic farm waste are collected from partner growers across the region.",
  },
  {
    icon: Trash2,
    step: "02",
    title: "Feed",
    body: "Waste is sorted and fed into anaerobic digesters instead of being burnt in the field.",
  },
  {
    icon: Cog,
    step: "03",
    title: "Process",
    body: "Biogas is captured, cleaned and upgraded to pipeline-grade Bio-CNG in the CBG Park.",
  },
  {
    icon: Fuel,
    step: "04",
    title: "Fuel",
    body: "Clean fuel powers industry and mobility; digestate returns to the soil as organic manure.",
  },
];

export default function KecProcess() {
  return (
    <section id="kec-process" className="relative overflow-hidden bg-mist-50 py-24 md:py-32">
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="How it works"
          accent="leaf"
          align="center"
          title="From the field"
          titleAccent="to the fuel line."
          lede="Four steps close the loop — nothing is wasted, and the value keeps circling back to the farm."
          className="mx-auto max-w-xl"
        />

        <Stagger className="scene-3d relative mt-16 grid gap-6 md:grid-cols-4">
          {/* connecting line on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[70px] hidden h-px bg-gradient-to-r from-leaf-400 via-leaf-300 to-blush-400 md:block"
          />
          {STEPS.map(({ icon: Icon, step, title, body }, i) => (
            <StaggerItem key={step} className="group">
              <TiltCard
                max={11}
                lift={12}
                glare
                wrapperClassName="h-full"
                className="relative h-full overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0 p-6"
                style={{
                  boxShadow:
                    "0 2px 6px rgba(10,19,16,0.05), 20px 30px 54px -22px rgba(46,158,99,0.5)",
                }}
              >
                <span
                  className={`pop-lg relative z-10 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lift ${
                    i === STEPS.length - 1
                      ? "bg-gradient-to-br from-blush-400 to-blush-600 shadow-lift-blush"
                      : "bg-gradient-to-br from-blush-400 to-blush-600 shadow-lift-blush"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <p className="pop-sm mt-5 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-blush-500">
                  Step {step}
                </p>
                <h3 className="pop-sm mt-1.5 font-display text-[1.3rem] font-semibold text-ink-900">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-500 text-justify">{body}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
