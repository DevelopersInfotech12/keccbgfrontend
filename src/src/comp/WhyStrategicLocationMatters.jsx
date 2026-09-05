"use client";

import SectionHeading from "@/comp/ui/SectionHeading";
import { Reveal } from "@/comp/motion/Reveal";

/**
 * WhyStrategicLocationMatters
 * -----------------------------------------------------------------------
 * Page 3 — Bio-CNG strategic location deck section.
 * Single-column layout. Right-side orbiting globe removed.
 * Signature element: a horizontal "corridor route" strip — a straight
 * connectivity line running CBG Park -> corridor nodes, standing in for
 * the UP Defence Corridor network without the decorative globe motif.
 * Next.js 13+ (App Router) client component, Tailwind CSS, no external deps.
 * Colors + fonts unchanged from source.
 * -----------------------------------------------------------------------
 */

const EMERALD = "#02303D";
const CORAL = "#FF7D44";
const INK = "#0B1512";
const ICON_BLUE = "#4F7CAC";
const ICON_BLUE_DARK = "#2E4F6E";
const BG = "#f6f7f6";
const PANEL_BG = "#02303D";
const PANEL_INK = "#FFFFFF";

const FACTORS = [
    {
        label: "Feedstock transportation efficiency",
        icon: "route",
        note: "Shorter, predictable hauls from farm to plant.",
    },
    {
        label: "Utility connectivity",
        icon: "bolt",
        note: "Power, water and gas grids already in place.",
    },
    {
        label: "Industrial demand proximity",
        icon: "factory",
        note: "Off-take buyers within easy reach of the gate.",
    },
    {
        label: "Logistics coordination",
        icon: "truck",
        note: "Road and rail links that keep dispatch on schedule.",
    },
    {
        label: "Expansion capability",
        icon: "expand",
        note: "Room on-site to scale capacity as demand grows.",
    },
    {
        label: "Workforce accessibility",
        icon: "people",
        note: "Skilled labour pool within commuting distance.",
    },
    {
        label: "Long-term ecosystem integration",
        icon: "link",
        note: "Fits the corridor's wider industrial roadmap.",
    },
];

const ROUTE_NODES = [
    { label: "Feedstock Belt", hub: false },
    { label: "CBG Park, UP", hub: true },
    { label: "Industrial Zone", hub: false },
    { label: "Logistics Hub", hub: false },
];

function FactorIcon({ name }) {
    const common = {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "white",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };
    switch (name) {
        case "route":
            return (
                <svg {...common}>
                    <circle cx="6" cy="6" r="2.5" />
                    <circle cx="18" cy="18" r="2.5" />
                    <path d="M8 7c2 0 3 1.5 5 4s3 4 5 4" />
                </svg>
            );
        case "bolt":
            return (
                <svg {...common}>
                    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
                </svg>
            );
        case "factory":
            return (
                <svg {...common}>
                    <path d="M3 21V10l6 4v-4l6 4V6h6v15z" />
                    <path d="M3 21h18" />
                </svg>
            );
        case "truck":
            return (
                <svg {...common}>
                    <rect x="2" y="7" width="12" height="10" rx="1" />
                    <path d="M14 10h4l3 3v4h-7z" />
                    <circle cx="6" cy="19" r="1.6" />
                    <circle cx="17" cy="19" r="1.6" />
                </svg>
            );
        case "expand":
            return (
                <svg {...common}>
                    <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
                </svg>
            );
        case "people":
            return (
                <svg {...common}>
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M2 21c0-3.5 2.7-6 6-6s6 2.5 6 6M14.5 21c0-2.8 2-5 5-5" />
                </svg>
            );
        case "link":
            return (
                <svg {...common}>
                    <path d="M9 15 15 9" />
                    <path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1" />
                    <path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1" />
                </svg>
            );
        default:
            return null;
    }
}

/** Horizontal corridor route strip — signature element, replaces the globe. */
function CorridorRoute() {
    return (
        <div
            className="relative overflow-hidden rounded-3xl px-6 py-10 sm:px-12"
            style={{
                background: `linear-gradient(120deg, ${EMERALD} 0%, #01202a 100%)`,
            }}
        >
            <div
                className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full blur-3xl"
                style={{ background: "rgba(255,125,68,0.16)" }}
            />
            <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.55)" }}
            >
                Corridor Connectivity
            </p>

            <div className="relative mt-8 flex items-center justify-between">
                {/* base line */}
                <div
                    className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                />
                {/* progress line to hub */}
                <div
                    className="absolute left-0 top-1/2 h-px -translate-y-1/2"
                    style={{ width: "34%", background: CORAL, opacity: 0.7 }}
                />

                {ROUTE_NODES.map((n) => (
                    <div key={n.label} className="relative z-10 flex flex-col items-center">
                        <span
                            className="rounded-full"
                            style={{
                                width: n.hub ? 18 : 10,
                                height: n.hub ? 18 : 10,
                                background: n.hub ? CORAL : ICON_BLUE,
                                boxShadow: n.hub
                                    ? "0 0 0 6px rgba(255,125,68,0.18)"
                                    : "0 0 0 4px rgba(79,124,172,0.15)",
                            }}
                        />
                        <span
                            className={`mt-3 text-center text-[11px] leading-tight ${n.hub ? "font-semibold" : "font-medium"
                                }`}
                            style={{ color: n.hub ? PANEL_INK : "rgba(255,255,255,0.6)" }}
                        >
                            {n.label}
                        </span>
                    </div>
                ))}
            </div>

            <p
                className="relative mt-8 max-w-2xl text-[13.5px] leading-[1.7]"
                style={{ color: "rgba(255,255,255,0.65)" }}
            >
                The planned CBG Park sits along the feedstock belt and within reach
                of the corridor&rsquo;s industrial and logistics nodes &mdash; the
                chain a Bio-CNG project depends on, laid out end to end.
            </p>
        </div>
    );
}

export default function WhyStrategicLocationMatters() {
    return (
        <section
            className="w-full pb-16 sm:mt-[-60px] px-6 sm:px-10 lg:px-16"
            style={{ background: BG, color: INK }}
        >
            <div className="mx-auto max-w-5xl">
                <Reveal>
                    <SectionHeading
                        accent="leaf"
                        tone="light"
                        title="Why Strategic Location Matters"
                        titleAccent="in Bio-CNG Infrastructure"
                        stack
                        lede="In Bio-CNG projects, the plant is only one part of the equation. The surrounding infrastructure often determines the project's long-term operational efficiency."
                        className="mt-3 max-w-2xl"
                    />
                </Reveal>

                {/* signature element */}
                <div className="mt-10">
                    <CorridorRoute />
                </div>

                <h3
                    className="mt-12 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: ICON_BLUE_DARK }}
                >
                    Infrastructure Influences Performance
                </h3>

                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {FACTORS.map((f) => (
                        <li
                            key={f.label}
                            className="flex flex-col gap-3 rounded-2xl border border-black/5 px-5 py-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <span
                                className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
                                style={{ background: ICON_BLUE }}
                            >
                                <FactorIcon name={f.icon} />
                            </span>
                            <span
                                className="text-sm font-semibold leading-snug"
                                style={{ color: EMERALD }}
                            >
                                {f.label}
                            </span>
                            <span
                                className="text-[12.5px] leading-[1.6]"
                                style={{ color: "rgba(11,21,18,0.6)" }}
                            >
                                {f.note}
                            </span>
                        </li>
                    ))}

                    <li
                        className="flex flex-col justify-center gap-3 rounded-2xl border-l-4 px-6 py-6 sm:col-span-2"
                        style={{ borderColor: CORAL, background: "rgba(2,48,61,0.04)" }}
                    >
                        <p className="text-[13.5px] leading-[1.7] text-neutral-600">
                            KEC is exploring strategically planned CBG Park development
                            alongside emerging industrial and infrastructure corridors in
                            Uttar Pradesh, including regions influenced by the broader
                            industrial ecosystem associated with the{" "}
                            <span className="font-semibold" style={{ color: EMERALD }}>
                                Uttar Pradesh Defence Corridor
                            </span>
                            .
                        </p>

                        <p className="text-[13.5px] leading-[1.7] text-neutral-600">
                            The objective is to align Bio-CNG infrastructure with areas
                            that may benefit from enhanced connectivity, industrial
                            activity, logistics development, and future infrastructure
                            expansion.
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}