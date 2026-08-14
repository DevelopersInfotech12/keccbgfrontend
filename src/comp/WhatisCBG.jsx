"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMG } from "@/lib/images";
import SectionHeading from "@/comp/ui/SectionHeading";
import { Reveal } from "@/comp/motion/Reveal";

const EMERALD = "#02303D";
const CORAL = "#FF7D44";
const INK = "#0B1512";
const ICON_BLUE = "#4F7CAC";
const ICON_BLUE_DARK = "#2E4F6E";
const BG = "#f6f7f6";
const PANEL_BG = "#02303D";
const PANEL_INK = "#FFFFFF";

const heroNodes = [
    { id: "feedstock", label: "Feedstock", caption: "Organic waste streams enter the park from multiple supply points.", angle: -20 },
    { id: "digest", label: "Digestion", caption: "Anaerobic digesters break the feedstock down into raw biogas.", angle: -8 },
    { id: "upgrade", label: "Gas Upgrade", caption: "Raw gas is purified into pipeline- and vehicle-grade Bio-CNG.", angle: 6 },
    { id: "distribute", label: "Distribution", caption: "Finished Bio-CNG is routed out to end use and offtake.", angle: 18 },
];

const ecosystem = [
    { n: "01", tag: "CBG-01", title: "Feedstock Collection & Aggregation", blurb: "Sources and consolidates organic input from multiple supply points into a steady, park-wide stream.", angle: -70, image: "./images/what1.png" },
    { n: "02", tag: "CBG-02", title: "Pre-processing & SmartMix Optimization", blurb: "Sorts, conditions, and blends feedstock ratios to keep digester performance consistent.", angle: -45, image: "./images/what2.png" },
    { n: "03", tag: "CBG-03", title: "Anaerobic Digestion & HydroReact Process Integration", blurb: "Breaks down organic matter under controlled conditions, tuned for stable, higher-yield gas output.", angle: -20, image: "./images/what3.png" },
    { n: "04", tag: "CBG-04", title: "Gas Upgrading through MethaPure Systems", blurb: "Purifies raw biogas into pipeline- and vehicle-grade Bio-CNG.", angle: 5, image: "./images/what4.png" },
    { n: "05", tag: "CBG-05", title: "Heat Recovery with BioHeat", blurb: "Captures process heat and routes it back into the system, cutting overall energy loss.", angle: 30, image: "./images/what5.png" },
    { n: "06", tag: "CBG-06", title: "Utility Synchronization through EnergySync", blurb: "Balances power, water, and thermal loads across every unit in the park in real time.", angle: 55, image: "./images/what6.png" },
    { n: "07", tag: "CBG-07", title: "Digital Monitoring using DigiDigest & PlantVision", blurb: "Tracks digester health and plant conditions continuously, surfacing issues before they escalate.", angle: 75, image: "./images/what7.png" },
    { n: "08", tag: "CBG-08", title: "Operational Intelligence via ProcessSense & BioFlow IQ", blurb: "Turns live plant data into tuning recommendations that keep throughput and quality on target.", angle: 70, image: "./images/what8.png" },
];

function Gauge({ angle, size = 38, active = false }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="17" fill="none" stroke={ICON_BLUE} strokeWidth="1.4" opacity="0.5" />
            {[-60, -30, 0, 30, 60].map((a) => (
                <line key={a} x1="20" y1="5" x2="20" y2="8" stroke={ICON_BLUE} strokeWidth="1.4" opacity="0.6" transform={`rotate(${a} 20 20)`} />
            ))}
            <motion.line
                x1="20" y1="20" x2="20" y2="7"
                stroke={ICON_BLUE_DARK}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ transformOrigin: "20px 20px" }}
                animate={{ rotate: active ? angle : -70 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <circle cx="20" cy="20" r="2.4" fill={ICON_BLUE_DARK} />
        </svg>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" } }),
};

const rowVariant = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhatIsCBGPark() {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = heroNodes[activeIdx];

    const cardRefs = useRef([]);
    const imgRefs = useRef([]);
    const [offsets, setOffsets] = useState(Array(ecosystem.length).fill(0));

    useLayoutEffect(() => {
        const measure = () => {
            const next = ecosystem.map((_, i) => {
                if (i === 0) return 0;
                const prevCard = cardRefs.current[i - 1];
                const prevImg = imgRefs.current[i - 1];
                if (!prevCard || !prevImg) return 0;
                return -(prevCard.offsetHeight - prevImg.offsetHeight) + 24;
            });
            setOffsets(next);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return (
        <div style={{ backgroundColor: BG }} className="w-full">
            {/* ================= HERO ================= */}
            <section style={{ backgroundColor: PANEL_BG, color: PANEL_INK }} className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "42px 42px",
                        maskImage: "radial-gradient(ellipse 80% 60% at 50% 15%, black 40%, transparent 90%)",
                    }}
                />
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
                    style={{ background: "rgba(255,125,68,0.12)" }}
                />

                <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
                    <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl lg:max-w-xl">
                        <SectionHeading
                            eyebrow="Bio-CNG Infrastructure — Schematic 01"
                            accent="leaf"
                            tone="dark"
                            title="What is a"
                            titleAccent="CBG Park?"
                            stack={false}
                            lede="An integrated industrial ecosystem for the production, processing, utility management, logistics coordination, and future expansion of Bio-CNG infrastructure — feedstock handling, digestion, gas upgrading, power integration, heat recovery, storage, logistics, and utilities, run as one connected system."
                            className="max-w-2xl"
                        />
                    </motion.div>

                    {/* right-side process snapshot panel — fills the empty space */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        custom={1}
                        variants={fadeUp}
                        className="w-full max-w-xs flex-none rounded-2xl border p-6 lg:mt-2"
                        style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}
                    >
                        <p className="font-semibold text-[10.5px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Live Snapshot
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-4">
                            {[
                                { label: "Units integrated", value: "8" },
                                { label: "Feedstock streams", value: "Multi-point" },
                                { label: "Output grade", value: "Pipeline" },
                                { label: "Monitoring", value: "24/7" },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-xl px-3 py-3" style={{ background: "rgba(0,0,0,0.18)" }}>
                                    <div className="text-lg font-semibold" style={{ color: PANEL_INK }}>{stat.value}</div>
                                    <div className="mt-1 text-[10.5px] leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.18)" }}>
                            <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>System status</span>
                            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: CORAL }}>
                                <i className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CORAL, boxShadow: `0 0 6px 1px ${CORAL}99` }} />
                                Online
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* ---- process rail ---- */}
                <motion.div initial="hidden" animate="show" custom={2} variants={fadeUp} className="relative z-10 mx-auto mt-20 max-w-3xl">
                    <div
                        className="rounded-2xl border p-2"
                        style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}
                    >
                        {/* step tabs */}
                        <div className="relative grid grid-cols-4">
                            {/* track */}
                            <div className="absolute left-[12.5%] right-[12.5%] top-[26px] h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
                            {/* filled progress */}
                            <motion.div
                                className="absolute left-[12.5%] top-[26px] h-px origin-left"
                                style={{ background: CORAL, right: "12.5%" }}
                                animate={{ scaleX: activeIdx / (heroNodes.length - 1) || 0.0001 }}
                                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                            />

                            {heroNodes.map((node, i) => {
                                const isActive = i === activeIdx;
                                const isDone = i < activeIdx;
                                return (
                                    <button
                                        key={node.id}
                                        type="button"
                                        onMouseEnter={() => setActiveIdx(i)}
                                        onFocus={() => setActiveIdx(i)}
                                        className="relative flex flex-col items-center gap-3 rounded-xl px-2 py-3 outline-none transition-colors duration-300"
                                    >
                                        <span
                                            className="relative z-10 grid h-[26px] w-[26px] place-items-center rounded-full border-2 text-[11px] font-semibold transition-all duration-300"
                                            style={{
                                                borderColor: isActive ? CORAL : isDone ? `${CORAL}70` : "rgba(255,255,255,0.22)",
                                                backgroundColor: isActive ? CORAL : PANEL_BG,
                                                color: isActive ? PANEL_BG : "rgba(255,255,255,0.55)",
                                                boxShadow: isActive ? `0 0 0 5px ${CORAL}22` : "none",
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span
                                            className="text-center font-semibold text-[12px] tracking-wide transition-colors duration-300"
                                            style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                                        >
                                            {node.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* caption panel */}
                        <div className="relative mt-1 overflow-hidden rounded-xl px-6 py-5" style={{ background: "rgba(0,0,0,0.18)" }}>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={active.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="text-[14px] leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.75)" }}
                                >
                                    <span className="mr-2 font-semibold" style={{ color: CORAL }}>
                                        {String(activeIdx + 1).padStart(2, "0")}
                                    </span>
                                    {active.caption}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    <p className="mt-5 text-center font-semibold text-[10.5px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Trunk line runs feedstock → distribution, continuously
                    </p>
                </motion.div>
            </section>

            {/* ================= ECOSYSTEM PIPELINE ================= */}
            <section className="px-6 py-24 sm:px-10 lg:px-20">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mx-auto max-w-xl text-center">
                    <SectionHeading
                        eyebrow="8 connected units"
                        accent="leaf"
                        tone="light"
                        title="The Ecosystem"
                        titleAccent="Approach"
                        stack={false}
                        align="center"
                        lede="Each unit feeds the next — from raw feedstock to operational intelligence — reducing friction and building room for the park to scale."
                        className="mx-auto"
                    />
                </motion.div>

                <div className="relative mx-auto mt-16 max-w-4xl">
                    {/* trunk line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 sm:left-1/2 sm:-translate-x-1/2" style={{ background: `repeating-linear-gradient(180deg, ${ICON_BLUE} 0 6px, transparent 6px 12px)` }} />
                    {/* traveling gas dots */}
                    {[0, 1.8, 3.6].map((delay) => (
                        <motion.span
                            key={delay}
                            className="absolute left-4 h-2 w-2 -translate-x-1/2 rounded-full sm:left-1/2"
                            style={{ backgroundColor: CORAL, boxShadow: `0 0 10px 2px ${CORAL}99` }}
                            initial={{ top: "0%", opacity: 0 }}
                            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 5.5, delay, repeat: Infinity, ease: "linear", times: [0, 0.06, 0.94, 1] }}
                        />
                    ))}

                    {ecosystem.map((stage, i) => {
                        const alignEnd = i % 2 === 1;
                        return (
                            <motion.div
                                key={stage.n}
                                ref={(el) => (cardRefs.current[i] = el)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={rowVariant}
                                style={{ marginTop: offsets[i], position: "relative", zIndex: i + 1 }}
                                className={`flex items-center pl-14 sm:pl-0 ${alignEnd ? "sm:justify-end" : "sm:justify-start"}`}
                            >
                                {/* connector stub (desktop only) */}
                                <div
                                    className={`absolute top-1/2 hidden h-0.5 sm:block ${alignEnd ? "left-1/2 right-0" : "left-0 right-1/2"}`}
                                    style={{ width: "calc(50% - 6px)", backgroundColor: `${INK}14`, [alignEnd ? "left" : "right"]: "50%" }}
                                />
                                {/* joint dot — now at card TOP = prev image end */}
                                <span
                                    className="absolute left-4 top-0 z-10 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 sm:left-1/2"
                                    style={{ backgroundColor: BG, borderColor: CORAL }}
                                />

                                <div className="w-full overflow-hidden rounded-md border bg-white shadow-sm sm:w-[calc(50%-48px)]" style={{ borderColor: `${INK}14` }}>
                                    <div ref={(el) => (imgRefs.current[i] = el)} className="relative h-28 w-full overflow-hidden">
                                        <img src={stage.image} alt={stage.title} className="absolute inset-0 h-full w-full object-cover" />
                                        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(160deg, ${PANEL_BG}26 0%, rgba(0,0,0,0.55) 100%)` }} />
                                        <span className="absolute left-4 top-4 font-semibold text-[10.5px] uppercase tracking-[0.22em]" style={{ color: CORAL }}>
                                            {stage.tag}
                                        </span>
                                        <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full" style={{ background: "rgba(255,255,255,0.94)", boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)" }}>
                                            <Gauge angle={stage.angle} active size={30} />
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <span className="font-display text-2xl font-semibold opacity-20" style={{ color: ICON_BLUE_DARK }}>
                                                {stage.n}
                                            </span>
                                        </div>
                                        <h3 className="mt-1.5 font-display text-sm font-semibold leading-snug" style={{ color: INK }}>
                                            {stage.title}
                                        </h3>
                                        <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: `${INK}94` }}>
                                            {stage.blurb}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ================= CLOSING ================= */}
            <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} style={{ backgroundColor: PANEL_BG }} className="px-6 py-16 sm:px-10 lg:px-20">
                <div className="mx-auto max-w-4xl">
                    <div className="relative flex flex-col items-start justify-between gap-7 rounded-lg border border-dashed p-9 sm:flex-row sm:items-center" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
                        <span className="absolute left-3.5 top-3.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${CORAL}b3` }} />
                        <span className="absolute right-3.5 top-3.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${CORAL}b3` }} />
                        <div>
                            <div className="mb-2.5 font-semibold text-[10.5px] uppercase tracking-[0.22em]" style={{ color: CORAL }}>
                                Coordinated system
                            </div>
                            <p className="max-w-md text-lg font-medium text-white">Built for coordination, less friction, and room to scale over time.</p>
                        </div>
                        <button
                            className="group inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-semibold text-[12.5px] uppercase tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
                            style={{ backgroundColor: CORAL, color: PANEL_BG }}
                        >
                            Explore infrastructure
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-7 border-t border-dashed pt-6 font-semibold text-[11px]" style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.5)" }}>
                        <span className="inline-flex items-center gap-2">
                            <i className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: CORAL }} /> Gas flow
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <i className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: ICON_BLUE }} /> Process unit
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <i className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: ICON_BLUE_DARK }} /> Instrumentation tag
                        </span>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}