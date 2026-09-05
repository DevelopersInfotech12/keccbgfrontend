"use client";

import { Award, Quote, Linkedin } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { RevealSide, RevealImage } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const LEAF = "#02303D"; // reserved — no matching usage in this component yet
const DEEP = "#012029";
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288"; // "blush" confirmed navy, sampled from uploaded icon reference

export default function KecLeadership() {
  return (
    <section
      id="kec-leadership"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: LEAF }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 h-96 w-96 rounded-full blur-[130px]"
        style={{ backgroundColor: `${ICON_BLUE}40` }}
      />
      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-2">
        <RevealImage className="edge-leaf-blush order-1 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] shadow-panel lg:order-1">
          <img
            src="/images/ceo_desk.jpeg"
            alt="Jitendra Narayan, CEO & Founder of KEC Agritech"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </RevealImage>

        <RevealSide from="right" className="order-2">
          <SectionHeading
            tone="dark"
            eyebrow="Leadership"
            accent="blush"
            title="Led by a farmer's-eye"
            titleAccent="view of energy."
            lede="KEC Agritech is founded and led by Jitendra Narayan, whose conviction that rural India should own its clean-energy transition shapes everything the company builds."
            className="max-w-xl"
          />

          <TiltCard max={7} lift={5} className="solid-card mt-9 rounded-3xl p-7">
            <Quote className="h-7 w-7" style={{ color: ICON_BLUE }} strokeWidth={1.6} aria-hidden="true" />
            <p className="mt-4 font-accent text-[1.35rem] italic leading-[1.5] text-white">
              "When a farmer profits from the waste they once burnt, clean energy
              stops being charity and starts being business."
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/12 pt-5">
              <div>
                <p className="font-display text-[15px] font-semibold text-white">
                  Jitendra Narayan
                </p>
                <p className="mt-0.5 text-[13px] text-white/60">CEO &amp; Founder, KEC Agritech</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#2B5288] hover:text-[#2B5288]">
                <Linkedin className="h-[15px] w-[15px]" strokeWidth={1.8} aria-hidden="true" />
              </span>
            </div>
          </TiltCard>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/8 px-5 py-3.5 backdrop-blur-md">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{ background: `linear-gradient(to bottom right, ${ICON_BLUE}, ${DEEP})` }}
            >
              <Award className="h-[18px] w-[18px] text-white" strokeWidth={1.9} aria-hidden="true" />
            </span>
            <p className="text-[13.5px] leading-snug text-white/85">
              Honoured with the{" "}
              <span className="font-semibold text-white">R.E.A.L Excellence Award 2025</span>{" "}
              for leadership in agri-innovation and Bio-CNG.
            </p>
          </div>
        </RevealSide>
      </div>
    </section>
  );
}