"use client";

import { MessageCircle, ArrowUpRight, Truck, FlaskConical, Gauge, CalendarClock, Check, Zap } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "@/comp/ui/SectionHeading";
import { Reveal } from "@/comp/motion/Reveal";

/* ── Palette — matched to WhyUs.jsx ──────────────────────────── */
const CORAL = "#FF7D44";
const INK = "#0B1512";
const BG = "#f6f7f6";
const PANEL = "#02303D";
const LINE = "#4F7CAC";

const EASE = [0.16, 1, 0.3, 1];

// Generates an S-curve entrance path: starts below rest position, sweeps
// right through a half circle, then sweeps left through a second half
// circle, landing at rest (0,0).
function buildArcPath(radius = 42, stepsPerHalf = 6) {
    const xs = [];
    const ys = [];
    const push = (deg, cx, cy) => {
        const rad = (deg * Math.PI) / 180;
        xs.push(cx + radius * Math.cos(rad));
        ys.push(cy + radius * Math.sin(rad));
    };
    // circle 1: bottom -> mid, swept through the RIGHT side (90deg -> -90deg)
    const c1y = 3 * radius;
    for (let i = 0; i <= stepsPerHalf; i++) {
        push(90 - (180 * i) / stepsPerHalf, 0, c1y);
    }
    // circle 2: mid -> rest, swept through the LEFT side (90deg -> 270deg)
    const c2y = radius;
    for (let i = 1; i <= stepsPerHalf; i++) {
        push(90 + (180 * i) / stepsPerHalf, 0, c2y);
    }
    return { x: xs, y: ys, times: xs.map((_, i) => i / (xs.length - 1)) };
}
const ARC = buildArcPath();

const TASK_CARDS = [
    { icon: Truck, time: "9:02 AM", title: "Feedstock delivered", sub: "42T received — Site A", tint: "#DCFCE7", ic: "#16A34A" },
    { icon: FlaskConical, time: "9:03 AM", title: "Digestion logged", sub: "Batch B4 — nominal", tint: "#DBEAFE", ic: "#2563EB" },
    { icon: Gauge, time: "9:23 AM", title: "CBG dispatched", sub: "12T — Grid Line 2", tint: "#FFE4E0", ic: "#E24B36" },
    { icon: CalendarClock, time: "9:34 AM", title: "Inspection scheduled", sub: "Site audit — Aug 16", tint: "#EDE4FF", ic: "#7C3AED" },
];

export default function CBGParkHero() {
    const reduced = useReducedMotion();
    const [phase, setPhase] = useState(0); // 0: stacking cards, 1: summary card, 2: summary + you-did

    useEffect(() => {
        const timers = [];
        const run = () => {
            setPhase(0);
            timers.push(setTimeout(() => setPhase(1), 2400));
            timers.push(setTimeout(() => setPhase(2), 3400));
            timers.push(setTimeout(run, 6200));
        };
        run();
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section id="cbg-park" className="relative overflow-hidden py-24 md:py-32" style={{ background: BG }}>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div
                    className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full blur-[110px]"
                    style={{ background: `radial-gradient(circle, ${CORAL}12 0%, transparent 70%)` }}
                />
                <svg className="absolute right-0 top-0 h-full w-[60%] opacity-[0.35]" viewBox="0 0 600 600" fill="none">
                    <circle cx="560" cy="120" r="380" stroke={`${LINE}`} strokeWidth="1" strokeDasharray="1 6" />
                    <circle cx="560" cy="120" r="260" stroke={`${LINE}`} strokeWidth="1" strokeDasharray="1 6" />
                    <line x1="120" y1="0" x2="600" y2="380" stroke={`${LINE}`} strokeWidth="1" strokeDasharray="1 6" />
                </svg>
            </div>

            <div className="container-shell relative grid gap-16 lg:grid-cols-[1fr_480px] lg:items-center">
                {/* ── Copy ─────────────────────────────────────────────── */}
                <div>
                    <Reveal>
                        <SectionHeading
                            eyebrow="KEC Agritech"
                            accent="leaf"
                            tone="light"
                            title="Building India's next"
                            titleAccent="clean energy ecosystem."
                            stack
                            lede="KEC Agritech is developing a new generation of CBG Parks designed around infrastructure, connectivity, feedstock integration, logistics efficiency, and industrial ecosystem planning. Our approach goes beyond standalone Bio-CNG plants to create scalable clean-energy infrastructure for long-term performance."
                            className="max-w-xl"
                        />
                    </Reveal>

                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <motion.a
                            href="#cbg-park-explore"
                            whileHover={reduced ? {} : { y: -3, boxShadow: `0 20px 34px -14px ${CORAL}bb` }}
                            whileTap={{ scale: 0.97 }}
                            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white"
                            style={{ background: CORAL, boxShadow: `0 14px 28px -12px ${CORAL}99` }}
                        >
                            Explore the CBG Park
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                        </motion.a>

                        <motion.a
                            href="#investor-interaction"
                            whileHover={reduced ? {} : { y: -3, borderColor: `${PANEL}66` }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[14.5px] font-semibold"
                            style={{ borderColor: `${PANEL}33`, color: PANEL }}
                        >
                            Book an Investor Interaction
                        </motion.a>
                    </motion.div>

                    <motion.p
                        initial={reduced ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.65 }}
                        className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px]"
                        style={{ background: `${PANEL}0D`, color: `${PANEL}CC` }}
                    >
                        <MessageCircle className="h-3.5 w-3.5" style={{ color: CORAL }} strokeWidth={2} aria-hidden="true" />
                        Queries submitted here route directly to our official WhatsApp line.
                    </motion.p>
                </div>

                {/* ── Signature — live ops feed, cascades then collapses ──── */}
                <div className="relative mx-auto h-[420px] w-full max-w-[460px]">
                    <AnimatePresence mode="wait">
                        {phase === 0 && (
                            <motion.div key="stack" className="absolute inset-0">
                                {TASK_CARDS.map((c, i) => {
                                    const Icon = c.icon;
                                    return (
                                        <motion.div
                                            key={c.title}
                                            initial={reduced ? { opacity: 0 } : { opacity: 0, x: ARC.x[0], y: ARC.y[0] }}
                                            animate={
                                                reduced
                                                    ? { opacity: 1 }
                                                    : { opacity: 1, x: ARC.x, y: ARC.y }
                                            }
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={
                                                reduced
                                                    ? { duration: 0.3, delay: i * 0.35 }
                                                    : { duration: 1.1, delay: 0.15 + i * 0.35, ease: "easeInOut", times: ARC.times }
                                            }
                                            className="absolute right-0 flex w-[280px] items-start gap-3 rounded-2xl p-4"
                                            style={{
                                                top: `${i * 92}px`,
                                                background: "#fff",
                                                boxShadow: "0 20px 40px -18px rgba(2,48,61,0.28)",
                                            }}
                                        >
                                            <span
                                                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                                                style={{ background: c.tint }}
                                            >
                                                <Icon className="h-[18px] w-[18px]" style={{ color: c.ic }} strokeWidth={2} />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-medium" style={{ color: CORAL }}>{c.time}</p>
                                                <p className="mt-0.5 truncate text-[14px] font-semibold" style={{ color: INK }}>{c.title}</p>
                                                <p className="truncate text-[12.5px]" style={{ color: `${INK}88` }}>{c.sub}</p>
                                            </div>
                                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: "#16A34A" }}>
                                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {phase >= 1 && (
                            <motion.div
                                key="summary"
                                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="absolute right-0 top-6 flex w-[260px] items-center gap-3 rounded-2xl p-4"
                                style={{ background: "#fff", boxShadow: "0 24px 48px -20px rgba(2,48,61,0.32)" }}
                            >
                                <span
                                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                                    style={{ background: PANEL }}
                                >
                                    <Zap className="h-5 w-5" style={{ color: CORAL }} strokeWidth={2} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[14.5px] font-semibold" style={{ color: INK }}>KEC did</p>
                                    <div className="mt-1 flex items-center gap-1.5">
                                        <Check className="h-3.5 w-3.5" style={{ color: "#16A34A" }} strokeWidth={3} />
                                        <span className="text-[12.5px]" style={{ color: `${INK}88` }}>14 tasks</span>
                                        <span
                                            className="ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white"
                                            style={{ background: "#16A34A" }}
                                        >
                                            +12
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {phase === 2 && (
                            <motion.div
                                key="you-did"
                                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                                className="absolute right-8 top-[168px] flex w-[240px] items-center gap-3 rounded-2xl p-4"
                                style={{ background: "#fff", boxShadow: "0 24px 48px -20px rgba(2,48,61,0.32)" }}
                            >
                                <span
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-white"
                                    style={{ background: PANEL }}
                                >
                                    YD
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[14px] font-semibold" style={{ color: INK }}>You did</p>
                                    <div className="mt-0.5 flex items-center gap-1.5">
                                        <Check className="h-3.5 w-3.5" style={{ color: "#16A34A" }} strokeWidth={3} />
                                        <span className="text-[12.5px]" style={{ color: `${INK}88` }}>Approved dispatch</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}