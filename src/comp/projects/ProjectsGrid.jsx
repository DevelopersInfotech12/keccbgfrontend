"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { IMG } from "@/lib/images";

const LEAF = "#02303D";
const DEEP = "#012029"; // reserved — no matching usage in this component yet
const CORAL = "#FF7D44"; // reserved — no matching usage in this component yet
const SAGE = "#7FC49B"; // reserved — no matching usage in this component yet
const PARA = "#434444d2"; // reserved — no matching usage in this component yet
const ICON_BLUE = "#2B5288";
const ICON_BLUE_LIGHT = "#4F7CAC"; // reserved — no matching usage in this component yet

const EASE = [0.16, 1, 0.3, 1];

const FILTERS = ["All", "Renewable Gas", "Waste-to-X", "Engineering", "O&M"];

const PROJECTS = [
  {
    id: "kerala-flagship",
    name: "Kerala Bio CBG Flagship",
    location: "Palakkad, India",
    category: "Renewable Gas",
    capacity: "12 t/day CBG",
    image: IMG.industrialPlant,
    tags: ["Renewable Gas", "Development & Financing"],
  },
  {
    id: "gujarat-digester",
    name: "Gujarat Agri-Digester Cluster",
    location: "Anand, India",
    category: "Waste-to-X",
    capacity: "40k t/yr feedstock",
    image: IMG.cropRows,
    tags: ["Waste-to-X", "Engineering"],
  },
  {
    id: "punjab-straw",
    name: "Punjab Straw-to-Gas Park",
    location: "Ludhiana, India",
    category: "Renewable Gas",
    capacity: "9 t/day CBG",
    image: IMG.fieldAerial,
    tags: ["Renewable Gas", "O&M"],
  },
  {
    id: "maharashtra-upgrade",
    name: "Maharashtra Upgrading Skid",
    location: "Pune, India",
    category: "Engineering",
    capacity: "Grid-injection",
    image: IMG.engineer,
    tags: ["Engineering", "Digital Solutions"],
  },
  {
    id: "tamilnadu-loop",
    name: "Tamil Nadu Closed-Loop Site",
    location: "Coimbatore, India",
    category: "Waste-to-X",
    capacity: "Biofertiliser loop",
    image: IMG.greenhouse,
    tags: ["Waste-to-X", "O&M"],
  },
  {
    id: "up-biomethane",
    name: "Uttar Pradesh Biomethane Plant",
    location: "Lucknow, India",
    category: "Renewable Gas",
    capacity: "15 t/day CBG",
    image: IMG.solarField,
    tags: ["Renewable Gas", "Engineering"],
  },
  {
    id: "karnataka-om",
    name: "Karnataka O&M Programme",
    location: "Mysuru, India",
    category: "O&M",
    capacity: "6 sites serviced",
    image: IMG.windTurbines,
    tags: ["O&M", "Digital Solutions"],
  },
  {
    id: "rajasthan-arid",
    name: "Rajasthan Arid-Feedstock Trial",
    location: "Jaipur, India",
    category: "Engineering",
    capacity: "Pilot line",
    image: IMG.ricePaddy,
    tags: ["Engineering", "Development & Financing"],
  },
  {
    id: "telangana-waste",
    name: "Telangana Municipal Waste Hub",
    location: "Hyderabad, India",
    category: "Waste-to-X",
    capacity: "55k t/yr feedstock",
    image: IMG.foggyValley,
    tags: ["Waste-to-X", "O&M"],
  },
];

export default function ProjectsGrid() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("All");

  const shown = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active))),
    [active]
  );

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #F6F4EF 0%, #F1EEE7 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${LEAF}1F 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${ICON_BLUE}1F 0%, transparent 70%)` }}
        />
      </div>

      <div className="container-shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The live portfolio"
            accent="leaf"
            title="Sites turning waste"
            titleAccent="into clean gas."
            className="max-w-xl"
          />

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`relative inline-flex min-h-[42px] cursor-pointer items-center rounded-full px-5 text-[13.5px] font-semibold transition-all duration-300 ${on
                      ? "text-white shadow-lift"
                      : "border border-ink-900/12 bg-white/70 text-ink-800 hover:border-[color:var(--leaf)] hover:text-[color:var(--leaf)]"
                    }`}
                  style={on ? { backgroundColor: LEAF, "--leaf": LEAF } : { "--leaf": LEAF }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: reduced ? 0 : (i % 3) * 0.06, ease: EASE }}
                className="group"
              >
                <TiltCard
                  max={9}
                  lift={12}
                  glare
                  wrapperClassName="h-full"
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0"
                  style={{
                    boxShadow: `0 2px 6px rgba(10,19,16,0.05), 20px 30px 54px -22px ${LEAF}80`,
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(10,19,16,0) 40%, rgba(10,19,16,0.72) 100%)",
                      }}
                    />
                    <span
                      className="pop-sm absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur"
                      style={{ color: LEAF }}
                    >
                      {p.category}
                    </span>
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/90">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      {p.location}
                    </span>
                  </div>

                  <div className="pop-sm flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[19px] font-semibold leading-snug text-ink-900">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[13.5px] font-semibold" style={{ color: ICON_BLUE }}>
                      {p.capacity}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-mist-100 px-2.5 py-1 text-[11px] font-medium text-ink-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-ink-900/8 pt-4">
                      <span className="text-[13px] font-semibold text-ink-800">
                        View project
                      </span>
                      <span
                        className="grid h-9 w-9 place-items-center rounded-full text-white transition-all duration-300 group-hover:rotate-45"
                        style={{ backgroundColor: ICON_BLUE }}
                      >
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}