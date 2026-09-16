"use client";

import { Factory, Clock, Truck, Gauge, TrendingUp, Recycle } from "lucide-react";
import SectionHeading from "@/comp/ui/SectionHeading";
import { Reveal } from "@/comp/motion/Reveal";

/**
 * WhyCBGPark
 * -----------------------------------------------------------------------
 * "Why a CBG Park?" — sits directly after WhatisCBG on the CBG Park page.
 * Where WhatisCBG explains the ecosystem, this section makes the case for
 * the park model itself: shared infrastructure, pooled feedstock, unified
 * monitoring, and room to scale — vs. a standalone Bio-CNG plant.
 * Tailwind CSS, framer-motion via Reveal/SectionHeading. Palette matches
 * the rest of the CBG Park page.
 * -----------------------------------------------------------------------
 */

const EMERALD = "#02303D";
const CORAL = "#FF7D44";
const INK = "#0B1512";
const ICON_BLUE = "#4F7CAC";
const BG = "#f6f7f6";
const PANEL_BG = "#02303D";

const REASONS = [
    {
        icon: Factory,
        title: "Shared Infrastructure, Lower Capex",
        body: "Roads, power, water and gas utilities are built once and shared across every plant in the park — cutting the capital a standalone facility would carry alone.",
    },
    {
        icon: Clock,
        title: "Faster Time-to-Operation",
        body: "Land, approvals and utility connections are cleared at the park level, so new plants move from groundbreaking to production in a fraction of the usual timeline.",
    },
    {
        icon: Truck,
        title: "Pooled Feedstock Security",
        body: "Multiple plants draw from a shared, aggregated feedstock network — smoothing out the supply swings any single site would face on its own.",
    },
    {
        icon: Gauge,
        title: "Centralized Monitoring & Quality",
        body: "One digital layer watches every digester across the park, keeping throughput and gas quality consistent from site to site.",
    },
    {
        icon: TrendingUp,
        title: "Stronger Offtake & Logistics",
        body: "Consolidated volumes give the park more leverage with offtake buyers and shared distribution routes than any individual plant could negotiate.",
    },
    {
        icon: Recycle,
        title: "Built for the Circular Economy",
        body: "Every plant converts agricultural and organic waste into clean Bio-CNG — cutting emissions and giving farmers a steady market for feedstock residue.",
    },
];

const STATS = [
    { value: "18", label: "Plants" },
    { value: "6", label: "States" },
    { value: "1", label: "Shared Ecosystem" },
];

export default function WhyCBGPark() {
    return (
        <section
            className="w-full px-6 py-20 sm:px-10 lg:px-20"
            style={{ background: BG, color: INK }}
        >
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <SectionHeading
                        eyebrow="The Park Advantage"
                        accent="leaf"
                        tone="light"
                        title="Why a"
                        titleAccent="CBG Park?"
                        stack={false}
                        lede="A standalone Bio-CNG plant solves one site's problem. A park solves the infrastructure problem — sharing utilities, feedstock, monitoring and logistics across every plant it hosts."
                        className="max-w-2xl"
                    />
                </Reveal>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {REASONS.map((r, i) => (
                        <Reveal key={r.title} delay={i * 0.06}>
                            <div className="flex h-full flex-col gap-4 rounded-2xl border border-black/5 bg-white px-6 py-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                                <span
                                    className="flex h-10 w-10 flex-none items-center justify-center rounded-full"
                                    style={{ background: ICON_BLUE }}
                                >
                                    <r.icon className="h-[18px] w-[18px]" stroke="white" strokeWidth={1.8} />
                                </span>
                                <h3
                                    className="font-display text-sm font-semibold leading-snug"
                                    style={{ color: EMERALD }}
                                >
                                    {r.title}
                                </h3>
                                <p className="text-[13.5px] leading-[1.6]" style={{ color: `${INK}94` }}>
                                    {r.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1}>
                    <div
                        className="mt-10 flex flex-col items-start justify-between gap-8 rounded-2xl px-8 py-9 sm:flex-row sm:items-center"
                        style={{ backgroundColor: PANEL_BG }}
                    >
                        <p className="max-w-md text-[15px] leading-[1.7] text-white/80">
                            The park model turns individual Bio-CNG plants into one
                            coordinated system — built to run efficiently today and expand
                            without friction tomorrow.
                        </p>
                        <div className="flex flex-none gap-8">
                            {STATS.map((s) => (
                                <div key={s.label} className="text-center sm:text-left">
                                    <div
                                        className="font-display text-3xl font-semibold"
                                        style={{ color: CORAL }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
