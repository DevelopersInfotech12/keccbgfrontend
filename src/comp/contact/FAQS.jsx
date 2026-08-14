"use client";

import { useState } from "react";
import { Plus, Minus, Sprout, Factory, Building2, Leaf } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import { RevealSide } from "@/comp/motion/Reveal";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

const FAQS = [
    {
        icon: Sprout,
        tone: "leaf",
        q: "What kind of feedstock do you accept from farmers?",
        a: "We take crop residue, used cooking oil and other biomass leftovers most farms already produce. Our field team grades and prices it on pickup, so there's no separate lab visit before you get paid.",
    },
    {
        icon: Factory,
        tone: "blush",
        q: "How does an industry partnership with KEC work?",
        a: "You supply your waste stream — agricultural, food-processing or used oil — on a standing contract, and we handle collection logistics. Volumes and pickup schedule are set together during onboarding, and pricing is reviewed quarterly.",
    },
    {
        icon: Building2,
        tone: "leaf",
        q: "What does the plant partnership / franchise model include?",
        a: "A regional processing unit built to our spec, sourcing support from our farmer and industry network, and shared access to offtake buyers. We stay involved through commissioning and the first production cycles.",
    },
    {
        icon: Leaf,
        tone: "blush",
        q: "Is the biofuel you produce compliant with current emission norms?",
        a: "Yes — every batch is tested against BIS and Ministry of Petroleum specs before it leaves the plant, and batch-level test reports are available to buyers on request.",
    },
    {
        icon: Sprout,
        tone: "leaf",
        q: "How fast do farmers get paid after pickup?",
        a: "Payment is released within 48 hours of pickup, straight to the bank account or UPI ID registered with our field team — no waiting on a billing cycle.",
    },
];

/**
 * Flip badge: true 3D coin-flip between Plus / Minus using rotateY on a
 * small icon-only element. Smaller size on mobile screens.
 */
function FlipBadge({ open, tone }) {
    return (
        <span
            className="relative grid h-7 w-7 shrink-0 place-items-center sm:h-10 sm:w-10"
            style={{ perspective: "300px" }}
        >
            <span
                className="absolute inset-0 grid place-items-center rounded-full text-white transition-transform duration-500"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${open ? 180 : 0}deg) translateZ(14px)`,
                }}
            >
                <span
                    className="absolute inset-0 grid place-items-center rounded-full"
                    style={{ backfaceVisibility: "hidden", background: ORANGE, boxShadow: `0 10px 20px -8px ${ORANGE}88` }}
                >
                    <Plus className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span
                    className="absolute inset-0 grid place-items-center rounded-full"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: ORANGE, boxShadow: `0 10px 20px -8px ${ORANGE}88` }}
                >
                    <Minus className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} aria-hidden="true" />
                </span>
            </span>
        </span>
    );
}

function FaqCard({ item, open, onToggle }) {
    const { icon: Icon, tone, q, a } = item;
    const accentColor = tone === "blush" ? ORANGE : TEAL;

    return (
        <div
            className="rounded-[22px] bg-ink-0 transition-transform duration-300"
            style={{
                border: `1px solid ${TEAL}14`,
                boxShadow: open
                    ? "0 26px 50px -22px rgba(2,48,61,0.32)"
                    : "0 14px 28px -18px rgba(2,48,61,0.18)",
                transform: open ? "translateY(-4px)" : "translateY(0)",
            }}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-center gap-4 rounded-[22px] px-6 py-2 text-left sm:px-7"
            >
                <Icon className="h-5 w-5 shrink-0" style={{ color: accentColor }} strokeWidth={1.9} aria-hidden="true" />
                <span className="flex-1 font-display text-[15.5px] justify-content font-semibold text-ink-900 sm:text-[16.5px]">
                    {q}
                </span>
                <FlipBadge open={open} tone={tone} />
            </button>

            <div
                className="grid px-6 transition-[grid-template-rows] duration-400 ease-out sm:px-7"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden" style={{ perspective: "600px" }}>
                    <p
                        className="max-w-2xl pb-6 pl-9 text-[14px] leading-[1.7] text-ink-500 transition-all duration-400 ease-out sm:pl-9 text-justify"
                        style={{
                            opacity: open ? 1 : 0,
                            transform: open ? "translateZ(0px)" : "translateZ(-24px)",
                        }}
                    >
                        {a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-mist-50 py-24 md:py-12"
            style={{ perspective: "2200px" }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-[120px] animate-orbit-slow"
                style={{ background: `${ORANGE}1a` }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full blur-[110px] animate-orbit-slow-rev"
                style={{ background: `${TEAL}1a` }}
            />

            <div
                className="container-shell relative mx-auto flex items-stretch"
                style={{ maxWidth: "1100px" }}
            >
                <div className="flex w-14 shrink-0 items-center justify-center rounded-l-[22px] sm:w-16" style={{ background: TEAL, boxShadow: `0 14px 28px -18px ${TEAL}99` }}>
                    <span
                        className="font-display text-lg font-extrabold uppercase tracking-[0.35em] text-white sm:text-xl"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                        FAQ
                    </span>
                </div>

                <div className="flex-1 rounded-r-[22px] bg-ink-0 px-6 py-8 shadow-panel sm:px-9 sm:py-10" style={{ border: `1px solid ${TEAL}14`, borderLeft: "none" }}>
                    <RevealSide from="left">
                        <SectionHeading
                            eyebrow="FAQs"
                            accent="leaf"
                            title="Answers before"
                            titleAccent=" you ask."
                            className="max-w-sm"
                        />
                    </RevealSide>

                    <RevealSide from="right" className="mt-10 flex flex-col gap-4">
                        {FAQS.map((item, i) => (
                            <FaqCard
                                key={item.q}
                                item={item}
                                open={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        ))}
                    </RevealSide>
                </div>
            </div>

            <style jsx global>{`
        @keyframes orbit-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-14px, 18px) scale(1.08); }
        }
        @keyframes orbit-slow-rev {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(16px, -14px) scale(1.06); }
        }
        .animate-orbit-slow { animation: orbit-slow 9s ease-in-out infinite; }
        .animate-orbit-slow-rev { animation: orbit-slow-rev 11s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-slow, .animate-orbit-slow-rev { animation: none !important; }
        }
      `}</style>
        </section>
    );
} 