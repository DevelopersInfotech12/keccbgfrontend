"use client";

import { RevealSide, RevealImage } from "@/comp/motion/Reveal";
import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import IMG from "@/lib/images";

// Single source of truth for theme colors — edit here, applies everywhere below.
const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2";
// "blush" confirmed navy, sampled from your uploaded icon reference earlier.
const ICON_BLUE = "#2B5288";

// Reads rgb from a hex (6 or 8-digit) const and applies a custom alpha.
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "").slice(0, 6);
  const n = parseInt(clean, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const POINTS = [
  "Sources feedstock from crop residue and farm waste that would otherwise be burnt.",
  "Runs the Kisan Experience Centre — hands-on training for farmers and agri-entrepreneurs.",
  "Delivers pipeline-grade Bio-CNG and biogenic CO₂ back into the economy.",
];

export default function KecStory() {
  return (
    <section
      id="kec-about"
      className="relative overflow-hidden bg-mist-50 py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-[120px]"
        style={{ backgroundColor: hexToRgba(ICON_BLUE, 0.1) }}
      />
      <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
        <RevealImage className="scene-3d order-1">
          <TiltCard max={10} lift={14} glare className="edge-leaf-blush mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] shadow-panel">
            <img
              src="/images/kecscreen1.png"
              alt="Farmer standing in a field that supplies KEC's biofuel feedstock"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </TiltCard>
        </RevealImage>

        <RevealSide from="right" className="order-2">
          <SectionHeading
            eyebrow="Who KEC is"
            accent="blush"
            title="A farmer-first energy company,"
            titleAccent="built around the land."
            stack
            lede="KEC Agritech was founded on a simple conviction — that the fastest route to clean energy in rural India runs straight through the farm gate. Every plant, every training centre and every rupee of value is designed to flow back to the people who grow the feedstock."
            className="max-w-xl"
          />

          <ul className="mt-9 space-y-4">
            {POINTS.map((p, i) => (
              <li key={p} className="flex items-start gap-3">
                <span
                  className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: ICON_BLUE }}
                >
                  {i + 1}
                </span>
                <p className="text-[15px] leading-[1.65] font-semibold" style={{ color: PARA }}>
                  {p}
                </p>
              </li>
            ))}
          </ul>
        </RevealSide>
      </div>
    </section>
  );
}