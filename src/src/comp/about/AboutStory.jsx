"use client";

import { RevealSide, RevealImage } from "@/comp/motion/Reveal";
import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import IMG from "@/lib/images";

const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
const SAGE = "#7FC49B";
const PARA = "#434444d2"

const STORY_IMAGE = IMG.cropRows;

const TIMELINE = [
  { year: "2011", label: "Founded by three agricultural engineers with one shared digester" },
  { year: "2015", label: "First commercial-scale plant commissioned for a dairy cooperative" },
  { year: "2019", label: "Added biomethane upgrading — our first pipeline-grade injection" },
  { year: "2024", label: "18 plants live, built, owned and operated end to end" },
];

export default function AboutStory() {
  return (
    <section id="our-story" className="relative overflow-hidden bg-mist-50 py-24 md:pt-32">
      <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
        <RevealSide from="left" className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Our story"
            accent="leaf"
            title="Started on one farm."
            titleAccent="Never lost that instinct."
            stack
            lede="Bio CBG began with a single on-farm digester built to solve one farmer's slurry problem. Thirteen years on, the instinct hasn't changed — start with the feedstock and the land it comes from, and build the plant around that relationship, not the other way round."
            className="max-w-xl"
          />

          <ol
            className="mt-10 space-y-6 border-l pl-6"
            style={{ borderColor: `${DEEP}1A` }}
          >
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span
                  className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full ring-4"
                  style={{
                    background: `linear-gradient(to bottom right, ${CORAL}, ${LEAF})`,
                    // ring color same as section bg — swap token if bg changes
                    boxShadow: `0 0 0 4px var(--mist-50, #fff)`,
                  }}
                />
                <p className="font-display text-sm font-semibold" style={{ color: CORAL }}>
                  {item.year}
                </p>
                <p className="mt-1 text-[14.5px] leading-snug font-semibold" style={{ color: "#434444d2" }}>
                  {item.label}
                </p>
              </li>
            ))}
          </ol>
        </RevealSide>

        <RevealImage className="scene-3d order-1 lg:order-2">
          <TiltCard
            max={10}
            lift={14}
            glare
            className="aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-panel"
            style={{ boxShadow: `0 0 0 1px ${LEAF}33` }}
          >
            <img
              src="/images/aboutscreen1.png"
              alt="Early Bio CBG anaerobic digestion plant on a partner farm"
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