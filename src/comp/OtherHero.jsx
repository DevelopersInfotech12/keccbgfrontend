"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ChevronRight,
    Factory,
    Recycle,
    Leaf,
    Award,
    Users,
    MapPin,
    CalendarCheck2,
    TrendingUp,
    Zap,
} from "lucide-react";

/* ── Icon map — resolved here (client component) so parent Server
   Components can pass a plain string instead of a function/component,
   which Next.js forbids across the server→client boundary. ────── */
const ICON_MAP = {
    factory: Factory,
    recycle: Recycle,
    leaf: Leaf,
    award: Award,
    users: Users,
    "map-pin": MapPin,
    calendar: CalendarCheck2,
    "trending-up": TrendingUp,
    zap: Zap,
};

/* ── Palette — same brand spec as HomeMain ───────────────────── */
const EMERALD = "#02303D";
const CORAL = "#FF7D44";
const ICON_BLUE = "#4F7CAC";
const ICON_BLUE_DARK = "#2E4F6E";
const BG = "#f6f7f6";

/**
 * OtherHero — reusable, medium-height hero banner for inner pages.
 *
 * Usage:
 * <OtherHero
 *   bgImage="/images/about-hero.jpg"
 *   eyebrow="About Us"
 *   title="Powering India's Bio-CNG Future"
 *   subtitle="18 plants across 6 states, one mission."
 *   breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
 *   cta={{ label: "Get in Touch", href: "#contact" }}
 *   badge={{ icon: "factory", value: "18", label: "Plants operated" }}
 * />
 */
export default function OtherHero({
    bgImage,
    eyebrow,
    title,
    subtitle,
    breadcrumbs,
    cta,
    secondaryCta,
    badge,
    minHeight = "clamp(360px, 48vh, 500px)",
}) {
    const reduced = useReducedMotion();

    return (
        <section id="hero-section" className="relative overflow-hidden" style={{ minHeight, background: EMERALD }}>
            {/* ── Background image ────────────────────────────────── */}
            <div className="absolute inset-0" aria-hidden="true">
                <img src={bgImage} alt="" className="h-full w-full object-cover" />
                {/* diagonal brand-tinted gradient, darker toward left where text sits */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(100deg, ${EMERALD}F2 0%, ${EMERALD}CC 32%, ${EMERALD}66 58%, ${CORAL}22 100%)`,
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, ${EMERALD}99 0%, transparent 30%, ${EMERALD}55 100%)` }}
                />
            </div>

            {/* ── Decorative glow orbs ─────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div
                    className="absolute -left-20 -top-20 h-[280px] w-[280px] rounded-full blur-[100px]"
                    style={{ background: `${ICON_BLUE}33` }}
                />
                <div
                    className="absolute right-[8%] bottom-[-15%] h-[240px] w-[240px] rounded-full blur-[90px]"
                    style={{ background: `${CORAL}2E` }}
                />
            </div>

            {/* ── Content ──────────────────────────────────────────── */}
            <div className="container-shell relative z-10 flex h-full min-h-inherit flex-col justify-center pt-28 pb-20">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <motion.div
                        initial={reduced ? {} : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-5 flex items-center gap-1.5 text-[12.5px] text-white/60"
                    >
                        {breadcrumbs.map((crumb, i) => (
                            <span key={crumb.label} className="flex items-center gap-1.5">
                                {crumb.href ? (
                                    <a href={crumb.href} className="transition-colors hover:text-white/90">
                                        {crumb.label}
                                    </a>
                                ) : (
                                    <span className="font-medium text-white/90">{crumb.label}</span>
                                )}
                                {i < breadcrumbs.length - 1 && (
                                    <ChevronRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                                )}
                            </span>
                        ))}
                    </motion.div>
                )}

                <motion.div
                    initial={reduced ? {} : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                >
                    {eyebrow && (
                        <span
                            className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(6px)" }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} aria-hidden="true" />
                            {eyebrow}
                        </span>
                    )}

                    {title && (
                        <h1 className="mt-5 max-w-xl font-display font-semibold leading-[1.08] tracking-[-0.02em] text-[2.1rem] sm:text-[2.75rem] lg:text-[3.25rem] text-white">
                            {title}
                        </h1>
                    )}

                    {subtitle && (
                        <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.7] text-white/75">
                            {subtitle}
                        </p>
                    )}

                    {(cta || secondaryCta) && (
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            {cta && (
                                <motion.a
                                    href={cta.href}
                                    whileHover={reduced ? {} : { y: -2 }}
                                    whileTap={reduced ? {} : { scale: 0.97 }}
                                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white [touch-action:manipulation]"
                                    style={{ background: CORAL, boxShadow: `0 16px 32px -16px ${CORAL}99` }}
                                >
                                    {cta.label}
                                    <ArrowUpRight
                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        strokeWidth={2.2}
                                        aria-hidden="true"
                                    />
                                </motion.a>
                            )}
                            {secondaryCta && (
                                <motion.a
                                    href={secondaryCta.href}
                                    whileHover={reduced ? {} : { y: -2 }}
                                    whileTap={reduced ? {} : { scale: 0.97 }}
                                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-[14px] font-semibold text-white [touch-action:manipulation]"
                                    style={{ borderColor: "rgba(255,255,255,0.35)" }}
                                >
                                    {secondaryCta.label}
                                </motion.a>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* ── Floating stat badge ─────────────────────────────── */}
                {badge && (() => {
                    // badge.icon is a string key ("factory", "recycle", ...),
                    // resolved to a component here — never accept a function/
                    // component object directly as a prop from a Server Component.
                    const BadgeIcon = ICON_MAP[badge.icon] || Factory;
                    return (
                        <motion.div
                            initial={reduced ? {} : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="mt-10 flex w-fit items-center gap-3 rounded-2xl px-4 py-3"
                            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", boxShadow: `0 20px 40px -20px ${EMERALD}88` }}
                        >
                            <span
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                                style={{ background: `linear-gradient(135deg, ${ICON_BLUE}, ${ICON_BLUE_DARK})` }}
                            >
                                <BadgeIcon className="h-[18px] w-[18px] text-white" strokeWidth={1.8} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="font-display text-[1.15rem] font-semibold leading-none" style={{ color: EMERALD }}>
                                    {badge.value}
                                </p>
                                <p className="mt-1 text-[12px]" style={{ color: `${EMERALD}80` }}>
                                    {badge.label}
                                </p>
                            </div>
                        </motion.div>
                    );
                })()}
            </div>

            {/* ── Curved base — smooth transition into page background ── */}
            <svg
                className="absolute bottom-[-1px] left-0 w-full"
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                style={{ height: "48px" }}
                aria-hidden="true"
            >
                <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill={BG} />
            </svg>
        </section>
    );
}