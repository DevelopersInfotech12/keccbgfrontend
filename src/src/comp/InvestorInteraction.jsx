"use client";

import { MapPin, Check, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/comp/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";
const INK = "#12100D";
const BG = "#f6f7f6";

/**
 * Edit this list whenever the interaction city schedule changes —
 * nothing else in the component needs to change.
 */
const CITIES = [
    "Bangalore",
    "Udaipur",
    "Jharkhand",
    "Gurgaon",
    "Kanpur",
    "Bhubaneswar",
    "Nasik",
    "Mumbai",
    "Hyderabad",
];

const AGENDA = [
    "CBG Park ecosystem walkthrough",
    "Strategic location discussion",
    "Infrastructure planning overview",
    "Process architecture understanding",
    "Project development pathway",
    "KEC engineering & execution capability",
];

export default function InvestorInteraction() {
    return (
        <section
            id="investor-interaction"
            className="relative overflow-hidden py-24 md:py-32"
            style={{ background: BG }}
        >
            <div className="container-shell relative">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                    <Reveal className="max-w-2xl">
                        <SectionHeading
                            eyebrow="Investor Interaction"
                            accent="leaf"
                            tone="light"
                            title="Private One-to-One"
                            titleAccent="Investor Interactions"
                            stack
                            lede="KEC conducts city-based private investor interactions for entrepreneurs, industrial investors, infrastructure stakeholders, and clean-energy participants seeking a deeper understanding of CBG ecosystem development."
                        />
                    </Reveal>

                    <Reveal className="w-full max-w-xs flex-none sm:mt-16 sm:max-w-[480px]">
                        <div
                            className="overflow-hidden rounded-2xl"
                            style={{ border: "1px solid rgba(2,48,61,0.10)" }}
                        >
                            <img
                                src="./images/investor.png"
                                alt="Investor interaction session"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-5">
                    {/* Current interaction cities */}
                    <Reveal className="lg:col-span-2">
                        <div
                            className="h-full rounded-2xl p-7"
                            style={{ background: TEAL, border: "1px solid rgba(255,255,255,0.10)" }}
                        >
                            <p
                                className="font-semibold text-[10.5px] uppercase tracking-[0.22em]"
                                style={{ color: ORANGE }}
                            >
                                Current Interaction Cities
                            </p>

                            <Stagger className="mt-5 flex flex-wrap gap-2.5">
                                {CITIES.map((city) => (
                                    <StaggerItem key={city}>
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-medium"
                                            style={{ background: "rgba(255,255,255,0.06)", color: "#FFFFFF" }}
                                        >
                                            <MapPin className="h-3.5 w-3.5" style={{ color: ORANGE }} aria-hidden="true" />
                                            {city}
                                        </span>
                                    </StaggerItem>
                                ))}
                            </Stagger>

                            <p
                                className="mt-6 text-[12.5px] leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                            >
                                City list updates as new interactions are scheduled.
                            </p>
                        </div>
                    </Reveal>

                    {/* What happens in the interaction */}
                    <Reveal className="lg:col-span-3">
                        <div
                            className="h-full rounded-2xl p-7"
                            style={{ background: "#FFFFFF", border: `1px solid ${TEAL}14` }}
                        >
                            <p
                                className="font-semibold text-[10.5px] uppercase tracking-[0.22em]"
                                style={{ color: TEAL }}
                            >
                                What Happens in the Interaction?
                            </p>

                            <Stagger className="mt-5 grid gap-3 sm:grid-cols-2">
                                {AGENDA.map((item) => (
                                    <StaggerItem key={item}>
                                        <div className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: `${TEAL}08` }}>
                                            <span
                                                className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full"
                                                style={{ background: ORANGE }}
                                            >
                                                <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                                            </span>
                                            <span
                                                className="font-display text-[13.5px] font-medium leading-snug"
                                                style={{ color: INK }}
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </Stagger>

                            <a
                                href="#contact"
                                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:gap-3"
                                style={{ background: ORANGE }}
                            >
                                Reserve an Interaction
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}