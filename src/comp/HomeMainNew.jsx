"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarCheck2, Factory, Recycle, MapPin } from "lucide-react";

import { Reveal } from "@/comp/motion/Reveal";
import { IMG } from "@/lib/images";

/* ── Palette — exact brand spec ──────────────────────────────── */
const EMERALD = "#02303D";
const CORAL = "#FF7D44";
const ICON_BLUE = "#4F7CAC";
const ICON_BLUE_DARK = "#2E4F6E";
const BG = "#f6f7f6";
const INK = "#0B1512";
const IVORY = "#F3EDE7"; // warm off-white for banner text — avoids stark/pure white

/* Reuse the same figures as the "Why Us" proof strip so numbers
   stay consistent across the site. */
const BADGES = [
    { icon: Factory, value: "18", label: "Plants operated" },
    { icon: Recycle, value: "1.1M t", label: "CO₂e avoided" },
];

/* ── City network data ─────────────────────────────────────── */
const CITY_PARKS = [
    { city: "Sangrur", state: "Punjab", stat: "3 Plants" },
    { city: "Karnal", state: "Haryana", stat: "2 Plants" },
    { city: "Meerut", state: "Uttar Pradesh", stat: "4 Plants" },
    { city: "Indore", state: "Madhya Pradesh", stat: "2 Plants" },
    { city: "Nagpur", state: "Maharashtra", stat: "3 Plants" },
    { city: "Hubballi", state: "Karnataka", stat: "4 Plants" },
];

export default function HomeMainNew() {
    const reduced = useReducedMotion();

    return (
        <section className="relative overflow-hidden" style={{ background: BG }}>
            {/* ── Banner hero — full-bleed image, centered content ───── */}
            <div className="relative px-2.5 pb-4 pt-16 sm:px-4 sm:pb-6 sm:pt-20 md:pt-24">
                <div className="relative isolate min-h-[560px] w-full overflow-hidden rounded-[28px] shadow-2xl sm:min-h-[85svh] sm:rounded-[40px]">
                    {/* swap the <img> below for a <video autoPlay muted loop playsInline> if you'd rather use footage */}
                    <img
                        src="/images/homemain.png"
                        alt="Bio-CNG upgrader at one of our CBG parks"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Scrim — brand emerald gradient, coral rim-light top edge */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            borderTop: `1px solid ${CORAL}4D`,
                            background: `linear-gradient(180deg, ${EMERALD}D9 0%, ${EMERALD}A6 45%, ${EMERALD}E6 100%)`,
                        }}
                    />

                    {/* Centered content */}
                    <div className="relative z-10 flex min-h-[560px] items-center justify-center px-6 py-14 sm:min-h-[85svh] sm:px-10">
                        <Reveal className="flex max-w-2xl flex-col items-center text-center">
                            <span
                                className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                                style={{ color: IVORY, background: "rgba(255,255,255,0.08)", border: `1px solid ${CORAL}55` }}
                            >
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} aria-hidden="true" />
                                Pan-India Bio-CNG Network
                            </span>

                            <h1
                                className="mt-6 font-display font-semibold leading-[1.08] tracking-[-0.025em] text-[2.1rem] sm:text-[3rem] lg:text-[3.6rem]"
                                style={{ color: IVORY, textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}
                            >
                                Building India&apos;s Next <span style={{ color: CORAL }}>Clean Energy</span> Ecosystem
                            </h1>

                            <p
                                className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] sm:text-[16.5px]"
                                style={{ color: `${IVORY}CC`, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                            >
                                Strategically planned CBG parks for the future of bio-CNG infrastructure.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                                <motion.a
                                    href="#cbg-park"
                                    whileHover={reduced ? {} : { y: -2 }}
                                    whileTap={reduced ? {} : { scale: 0.97 }}
                                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold text-white [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                    style={{ background: CORAL, boxShadow: `0 16px 32px -16px ${CORAL}99`, outlineColor: IVORY }}
                                >
                                    Explore the CBG Park
                                    <ArrowUpRight
                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        strokeWidth={2.2}
                                        aria-hidden="true"
                                    />
                                </motion.a>

                                <motion.a
                                    href="#investors"
                                    whileHover={reduced ? {} : { y: -2 }}
                                    whileTap={reduced ? {} : { scale: 0.97 }}
                                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-[14.5px] font-semibold [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                    style={{ color: IVORY, borderColor: "rgba(255,255,255,0.35)", outlineColor: IVORY }}
                                >
                                    <CalendarCheck2 className="h-4 w-4" style={{ color: CORAL }} strokeWidth={2} aria-hidden="true" />
                                    Book an Investor Interaction
                                </motion.a>
                            </div>

                            {/* Stat chips — inline row under CTAs */}
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                                {BADGES.map(({ icon: Icon, value, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-3 rounded-2xl px-4 py-3"
                                        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)" }}
                                    >
                                        <span
                                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                                            style={{ background: `linear-gradient(135deg, ${ICON_BLUE}, ${ICON_BLUE_DARK})` }}
                                        >
                                            <Icon className="h-4 w-4 text-white" strokeWidth={1.8} aria-hidden="true" />
                                        </span>
                                        <div className="text-left">
                                            <p className="font-display text-[1.05rem] font-semibold leading-none" style={{ color: IVORY }}>
                                                {value}
                                            </p>
                                            <p className="mt-1 text-[11.5px]" style={{ color: `${IVORY}99` }}>
                                                {label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* ── City network slider — cards, pause on hover ────────────── */}
            <div
                className="citymarquee-track relative mt-4 overflow-hidden border-t py-6"
                style={{ borderColor: `${EMERALD}14` }}
            >
                <div
                    className="citymarquee-inner flex w-max gap-4"
                    style={{ animationPlayState: reduced ? "paused" : "running" }}
                >
                    {[0, 1].map((rep) => (
                        <div key={rep} className="flex items-center gap-4 pr-4" aria-hidden={rep === 1}>
                            {CITY_PARKS.map(({ city, state, stat }) => (
                                <div
                                    key={`${rep}-${city}`}
                                    className="flex min-w-[220px] items-center gap-3 rounded-2xl px-4 py-3"
                                    style={{ background: "#fff", boxShadow: `0 10px 30px -18px ${EMERALD}40` }}
                                >
                                    <span
                                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                                        style={{ background: `linear-gradient(135deg, ${ICON_BLUE}, ${ICON_BLUE_DARK})` }}
                                    >
                                        <MapPin className="h-4 w-4 text-white" strokeWidth={1.8} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="text-[13.5px] font-semibold leading-none" style={{ color: EMERALD }}>
                                            {city}, {state}
                                        </p>
                                        <p className="mt-1 text-[11.5px]" style={{ color: `${INK}80` }}>
                                            {stat}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .citymarquee-inner {
          animation: hm-marquee 36s linear infinite;
          will-change: transform;
        }
        .citymarquee-track:hover .citymarquee-inner {
          animation-play-state: paused;
        }
        @keyframes hm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}