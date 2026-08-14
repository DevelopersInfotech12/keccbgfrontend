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

/* Reuse the same figures as the "Why Us" proof strip so numbers
   stay consistent across the site. */
const BADGES = [
    { icon: Factory, value: "18", label: "Plants operated" },
    { icon: Recycle, value: "1.1M t", label: "CO₂e avoided" },
];

/* ── City network data — richer than before ─────────────────── */
const CITY_PARKS = [
    { city: "Sangrur", state: "Punjab", stat: "3 Plants" },
    { city: "Karnal", state: "Haryana", stat: "2 Plants" },
    { city: "Meerut", state: "Uttar Pradesh", stat: "4 Plants" },
    { city: "Indore", state: "Madhya Pradesh", stat: "2 Plants" },
    { city: "Nagpur", state: "Maharashtra", stat: "3 Plants" },
    { city: "Hubballi", state: "Karnataka", stat: "4 Plants" },
];

export default function HomeMain() {
    const reduced = useReducedMotion();

    return (
        <section className="relative overflow-hidden" style={{ background: BG }}>
            {/* ── Ambient tint — kept soft so the bg reads white ─────── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div
                    className="absolute -left-24 top-6 h-[420px] w-[420px] rounded-full blur-[120px]"
                    style={{ background: `${ICON_BLUE}14` }}
                />
                <div
                    className="absolute right-[36%] -bottom-24 h-[360px] w-[360px] rounded-full blur-[110px]"
                    style={{ background: `${CORAL}12` }}
                />
            </div>

            <div className="relative grid gap-y-14 pb-10 pt-20 md:pt-28 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:pb-0">
                {/* ── Copy column ───────────────────────────────────────── */}
                <div className="container-shell relative z-10 flex flex-col justify-center lg:py-14">
                    <Reveal>
                        <span
                            className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                            style={{ color: EMERALD, background: `${ICON_BLUE}14`, border: `1px solid ${ICON_BLUE}33` }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} aria-hidden="true" />
                            Pan-India Bio-CNG Network
                        </span>

                        <h1
                            className="mt-6 max-w-xl font-display font-semibold leading-[1.05] tracking-[-0.025em] text-[2.5rem] sm:text-[3.3rem] lg:text-[3.85rem]"
                            style={{ color: ICON_BLUE_DARK }}
                        >
                            Building India&apos;s Next <span style={{ color: CORAL }}>Clean Energy</span> Ecosystem
                        </h1>

                        <p className="mt-6 max-w-[42ch] text-[16.5px] leading-[1.7]" style={{ color: `${INK}B3` }}>
                            Strategically planned CBG parks for the future of bio-CNG infrastructure.
                        </p>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <motion.a
                                href="#cbg-park"
                                whileHover={reduced ? {} : { y: -2 }}
                                whileTap={reduced ? {} : { scale: 0.97 }}
                                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold text-white [touch-action:manipulation] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{ background: CORAL, boxShadow: `0 16px 32px -16px ${CORAL}99`, outlineColor: EMERALD }}
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
                                style={{ color: EMERALD, borderColor: `${EMERALD}2E`, outlineColor: EMERALD }}
                            >
                                <CalendarCheck2 className="h-4 w-4" style={{ color: CORAL }} strokeWidth={2} aria-hidden="true" />
                                Book an Investor Interaction
                            </motion.a>
                        </div>
                    </Reveal>

                    {/* Mobile / tablet photo — plain card, no diagonal cut */}
                    <Reveal delay={0.16} className="mt-12 lg:hidden">
                        <div className="relative overflow-hidden rounded-[24px]" style={{ boxShadow: `0 30px 60px -30px ${EMERALD}59` }}>
                            {/* swap the <img> below for a <video autoPlay muted loop playsInline> if you'd rather use footage */}
                            <img
                                src={IMG.industrialPlant}
                                alt="Bio-CNG upgrader at one of our CBG parks"
                                className="h-64 w-full object-cover sm:h-80"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: `linear-gradient(180deg, transparent 40%, ${EMERALD}66 100%)` }}
                                aria-hidden="true"
                            />
                            <span className="absolute bottom-4 left-4 text-[12px] font-medium text-white/90">
                                Bio-CNG upgrader — Punjab
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {BADGES.map(({ icon: Icon, value, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                                    style={{ background: "#fff", boxShadow: `0 10px 30px -18px ${EMERALD}59` }}
                                >
                                    <span
                                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                                        style={{ background: `linear-gradient(135deg, ${ICON_BLUE}, ${ICON_BLUE_DARK})` }}
                                    >
                                        <Icon className="h-4 w-4 text-white" strokeWidth={1.8} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="font-display text-[1.05rem] font-semibold leading-none" style={{ color: EMERALD }}>
                                            {value}
                                        </p>
                                        <p className="mt-1 text-[11.5px]" style={{ color: `${INK}80` }}>
                                            {label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* ── Desktop signature: diagonal photo bleed + pinned stats ── */}
                <Reveal delay={0.15} className="relative hidden lg:block">
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
                    >
                        {/* swap the <img> below for a <video autoPlay muted loop playsInline> if you'd rather use footage */}
                        <img
                            src="/images/homemain.png"
                            alt="Bio-CNG upgrader at one of our CBG parks"
                            className="h-full w-full object-cover"
                        />
                        <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(200deg, ${CORAL}14 0%, ${EMERALD}55 100%)` }}
                            aria-hidden="true"
                        />

                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
                        transition={
                            reduced
                                ? { duration: 0.5 }
                                : { opacity: { duration: 0.5 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }
                        }
                        className="absolute left-[3%] top-[16%] flex items-center gap-3 rounded-2xl px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)", boxShadow: `0 20px 40px -20px ${EMERALD}66` }}
                    >
                        <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                            style={{ background: `linear-gradient(135deg, ${ICON_BLUE}, ${ICON_BLUE_DARK})` }}
                        >
                            <Factory className="h-[18px] w-[18px] text-white" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <div>
                            <p className="font-display text-[1.2rem] font-semibold leading-none" style={{ color: EMERALD }}>
                                {BADGES[0].value}
                            </p>
                            <p className="mt-1 text-[12px]" style={{ color: `${INK}80` }}>
                                {BADGES[0].label}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 10, 0] }}
                        transition={
                            reduced
                                ? { duration: 0.5 }
                                : { opacity: { duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 } }
                        }
                        className="absolute right-[8%] bottom-[14%] flex items-center gap-3 rounded-2xl px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)", boxShadow: `0 20px 40px -20px ${EMERALD}66` }}
                    >
                        <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                            style={{ background: `linear-gradient(135deg, ${CORAL}, ${CORAL})` }}
                        >
                            <Recycle className="h-[18px] w-[18px] text-white" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <div>
                            <p className="font-display text-[1.2rem] font-semibold leading-none" style={{ color: EMERALD }}>
                                {BADGES[1].value}
                            </p>
                            <p className="mt-1 text-[12px]" style={{ color: `${INK}80` }}>
                                {BADGES[1].label}
                            </p>
                        </div>
                    </motion.div>
                </Reveal>
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