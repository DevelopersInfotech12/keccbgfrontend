"use client";

import { Recycle, GraduationCap, FlaskConical, Fuel, ArrowUpRight } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288"; // reserved — no matching usage in this component yet
const ICON_BLUE_LIGHT = "#4F7CAC"; // light blue, applied uniformly to all icon tiles per latest ask

const PILLARS = [
  {
    icon: Recycle,
    title: "CBG Park",
    body: "An integrated compressed-biogas park where agricultural waste is digested, upgraded and bottled into clean fuel on a single site.",
  },
  {
    icon: GraduationCap,
    title: "Kisan Experience Centre",
    body: "The KEC model — a hands-on centre that trains farmers and agri-entrepreneurs to build, feed and profit from biogas value chains.",
  },
  {
    icon: FlaskConical,
    title: "Research & Development",
    body: "In-house R&D pushing digester yield, feedstock blends and process efficiency so every plant runs harder on the same input.",
  },
  {
    icon: Fuel,
    title: "Bio-CNG & Biogas",
    body: "Pipeline-grade Bio-CNG and renewable gas delivered to industry and mobility — carbon cut at the source, not offset elsewhere.",
  },
];

export default function KecEcosystem() {
  return (
    <section
      id="kec-ecosystem"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #F6F4EF 0%, #F1EEE7 100%)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full blur-[120px]"
        style={{ backgroundColor: `${ICON_BLUE_LIGHT}1A` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full blur-[120px]"
        style={{ backgroundColor: `${ICON_BLUE_LIGHT}1F` }}
      />

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="The KEC ecosystem"
          accent="blush"
          align="center"
          stack
          title="One company,"
          titleAccent="four moving parts."
          lede="KEC doesn't just run plants — it builds the whole loop, from the training that empowers a farmer to the fuel that leaves the park."
          className="mx-auto max-w-2xl"
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <TiltCard
                max={10}
                lift={7}
                wrapperClassName="group h-full"
                className="aura relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0 p-7"
                style={{ "--aura": `${ICON_BLUE_LIGHT}80` }}
              >
                <span
                  className="grid place-items-center rounded-2xl pop-md shadow-lift-blush"
                  style={{ height: 52, width: 52, backgroundColor: ICON_BLUE_LIGHT }}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-ink-900 pop-sm">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-ink-500 text-justify">{body}</p>
                <button
                  type="button"
                  className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 shadow-lift-blue"
                  style={{ backgroundColor: ICON_BLUE_LIGHT }}
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                </button>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}