"use client";

import { Building2, Leaf, ArrowRight } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { RevealSide, RevealImage } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44";
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288"; // reserved — no matching usage in this component yet
const ICON_BLUE_LIGHT = "#4F7CAC";

export default function KecSynergy() {
  return (
    <section
      id="kec-synergy"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: LEAF }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 h-96 w-96 rounded-full blur-[130px]"
        style={{ backgroundColor: `${CORAL}40` }}
      />
      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-2">
        <RevealSide from="left">
          <SectionHeading
            tone="dark"
            eyebrow="Part of the family"
            accent="coral"
            title="Bio CBG is where the"
            titleAccent="KEC vision goes global."
            stack
            lede="KEC Agritech proved the Farm-to-Fuel model on Indian soil. Bio CBG carries it forward — building, owning and operating the plants that take that same conviction to markets worldwide."
            className="max-w-xl"
          />

          {/* Parent → child flow */}
          <div className="scene-3d mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <TiltCard
              max={12}
              lift={10}
              glare
              wrapperClassName="flex-1"
              className="rounded-2xl border border-white/12 bg-white/8 p-5 shadow-panel backdrop-blur-md"
            >
              <span
                className="pop-md grid h-10 w-10 place-items-center rounded-xl shadow-lift-blush"
                style={{ backgroundColor: ICON_BLUE_LIGHT }}
              >
                <Building2 className="h-5 w-5 text-white" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <p className="pop-sm mt-3 font-display text-[15px] font-semibold text-white">
                KEC Agritech
              </p>
              <p className="mt-0.5 text-[13px] text-white/60">Parent — Farm to Fuel origin</p>
            </TiltCard>

            <ArrowRight
              className="mx-auto h-6 w-6 rotate-90 sm:rotate-0"
              strokeWidth={2}
              aria-hidden="true"
              style={{ color: CORAL }}
            />

            <TiltCard
              max={12}
              lift={10}
              glare
              wrapperClassName="flex-1"
              className="rounded-2xl bg-white/8 p-5 shadow-panel backdrop-blur-md"
              style={{ borderWidth: 1, borderColor: `${CORAL}40` }}
            >
              <span
                className="pop-md grid h-10 w-10 place-items-center rounded-xl shadow-lift-blush"
                style={{ backgroundColor: ICON_BLUE_LIGHT }}
              >
                <Leaf className="h-5 w-5 text-white" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <p className="pop-sm mt-3 font-display text-[15px] font-semibold text-white">
                Bio CBG
              </p>
              <p className="mt-0.5 text-[13px] text-white/60">Global build-own-operate arm</p>
            </TiltCard>
          </div>
        </RevealSide>

        <RevealImage className="scene-3d">
          <TiltCard
            max={10}
            lift={14}
            glare
            className="aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-panel"
          >
            <img
              src="/images/kecscreen2.png"
              alt="Renewable energy landscape representing KEC and Bio CBG's shared mission"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </TiltCard>
        </RevealImage>
      </div>
    </section>
  );
}