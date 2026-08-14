"use client";

import { UtensilsCrossed, Beer, Trash2, Tractor, FlaskRound, Zap } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";

// Dynamic palette — single source of truth for all colors in this section
const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
const SAGE = "#7FC49B";
const ICON_BLUE_LIGHT = "#4F7CAC";
const LEAF_RGB = hexToRgb(LEAF);
const SAGE_RGB = hexToRgb(SAGE);

// hex -> "r, g, b" for use inside rgba()
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

const CORAL_RGB = hexToRgb(CORAL);
const DEEP_RGB = hexToRgb(DEEP);

const SECTORS = [
  { icon: UtensilsCrossed, title: "Food & Beverage", body: "Processing residues and wastewater turned into on-site renewable gas and heat." },
  { icon: Beer, title: "Distilleries & Breweries", body: "Spent grain, pot ale and vinasse digested into biomethane instead of hauled away." },
  { icon: Trash2, title: "Municipal Waste", body: "Source-separated organics diverted from landfill into grid-ready Compressed Biogas." },
  { icon: Tractor, title: "Agriculture & Dairy", body: "Manure, slurry and crop residue closed back into biofertiliser for the same land." },
  { icon: FlaskRound, title: "Chemicals & Industry", body: "Hard-to-abate process heat switched to a drop-in renewable gas supply." },
  { icon: Zap, title: "Utilities & Grid", body: "Certified biomethane injected to specification, backed by continuous quality data." },
];

export default function ServicesSectors() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: `linear-gradient(180deg, ${SAGE}1A 0%, ${LEAF}0D 100%)` }}
    >
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Who we serve"
          accent="leaf"
          title="Built for the sectors"
          titleAccent="hardest to decarbonise."
          // lede="Wherever there's an organic waste stream and a gas or heat demand, the same service scope applies."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          {/* Image */}
          <Reveal
            as="div"
            className="group relative min-h-[280px] overflow-hidden rounded-3xl border border-ink-900/8"
            style={{
              boxShadow: `0 1px 2px rgba(${DEEP_RGB},0.04), 0 30px 60px -34px rgba(${CORAL_RGB},0.45)`,
            }}
          >
            <img
              src="/images/servicescreen.png"
              alt="Bio CBG plant serving multiple industrial sectors"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
            />
          </Reveal>

          {/* Cards */}
          <Stagger className="scene-3d grid gap-5 sm:grid-cols-2">
            {SECTORS.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="h-full">
                <TiltCard
                  max={9}
                  lift={8}
                  glare
                  wrapperClassName="group h-full"
                  className="flex h-full items-start gap-4 rounded-3xl border border-ink-900/8 bg-ink-0 p-6"
                  style={{
                    boxShadow: `0 2px 6px rgba(${DEEP_RGB},0.05), 20px 30px 54px -22px rgba(${CORAL_RGB},0.5)`,
                  }}
                >
                  <span
                    className="pop-md grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                    style={{
                      background: ICON_BLUE_LIGHT,
                      boxShadow: `0 14px 26px -10px rgba(${LEAF_RGB},0.55), inset 0 1.5px 0 rgba(255,255,255,0.4)`,
                    }}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="pop-sm">
                    <h3 className="font-display text-[16px] font-semibold text-ink-900">{title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "#555454" }}>{body}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}