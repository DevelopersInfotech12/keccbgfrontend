"use client";

import { MapPin } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { RevealSide, RevealImage } from "@/comp/motion/Reveal";
import IMG from "@/lib/images";

const LEAF = "#02303D";
const CORAL = "#FF7D44";
const ICONOR = `linear-gradient(to bottom right, ${CORAL}, #C7511E)`;

const LOCATIONS_IMAGE = IMG.fieldAerial;

const REGIONS = [
  { region: "Home markets", detail: "11 plants across our founding region" },
  { region: "Northern expansion", detail: "5 plants added since 2021" },
  { region: "New builds", detail: "2 plants in commissioning right now" },
];

export default function AboutLocations() {
  return (
    <section
      id="locations"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: LEAF }}
    >
      <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
        <RevealSide from="left">
          <SectionHeading
            tone="dark"
            eyebrow="Where we operate"
            accent="leaf"
            title="18 plants, three countries,"
            titleAccent="one operating standard"
            lede="Every site — whether it's our oldest digester or the newest gas-upgrading skid — runs the same biological service protocol and reports into the same control room."
            className="max-w-xl"
          />

          <ul className="mt-9 space-y-4">
            {REGIONS.map(({ region, detail }) => (
              <li key={region} className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full shadow-panel"
                  style={{ background: ICONOR }}
                >
                  <MapPin className="h-4 w-4 text-white" strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold text-white">{region}</p>
                  <p className="mt-0.5 text-[14px] text-white/65">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </RevealSide>

        <RevealImage className="scene-3d">
          <TiltCard max={11} lift={14} glare className="aspect-square w-full overflow-hidden rounded-[28px] shadow-panel">
            <img
              src="/images/aboutscreen2.png"
              alt="Map of Bio CBG plant locations"
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