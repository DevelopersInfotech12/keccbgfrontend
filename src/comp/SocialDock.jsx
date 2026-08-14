"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Youtube, Linkedin, Facebook, Share2 } from "lucide-react";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";
const INK = "#FFFFFF";

const SOCIALS = [
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/kisanexperiencecentre/?hl=en", Icon: Instagram },
    { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@KisanExperienceCentre", Icon: Youtube },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/kecbiofuel", Icon: Linkedin },
    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/KECBiofuel", Icon: Facebook },
];

const EASE = [0.16, 1, 0.3, 1];

const listVariants = {
    closed: {},
    open: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const itemVariants = {
    closed: { opacity: 0, y: 12, scale: 0.5 },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: EASE } },
};

export default function SocialDock() {
    const [open, setOpen] = useState(false);
    const [inHero, setInHero] = useState(true);

    useEffect(() => {
        let observer;
        let rafId;

        const setup = () => {
            const heroEl = document.getElementById("hero-section");
            if (!heroEl) {
                rafId = requestAnimationFrame(setup); // retry next frame till mounted
                return;
            }
            observer = new IntersectionObserver(
                ([entry]) => setInHero(entry.isIntersecting),
                { threshold: 0, rootMargin: "-80px 0px 0px 0px" } // -80px = navbar height, avoid dock hiding under fixed header trigger
            );
            observer.observe(heroEl);
        };

        setup();
        return () => {
            if (observer) observer.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <AnimatePresence>
            {inHero && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="pointer-events-none fixed inset-y-0 left-0 z-40 flex items-center"
                >
                    <motion.div
                        layout
                        transition={{ duration: 0.4, ease: EASE }}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        className="pointer-events-auto flex flex-col items-center gap-2 "
                    >
                        <AnimatePresence mode="popLayout">
                            {open && (
                                <motion.div
                                    key="icons"
                                    layout
                                    variants={listVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="flex flex-col items-center gap-2 rounded-r-2xl border border-l-0 border-white/10 py-3 pl-2 pr-2.5 bg-white/90"
                                >
                                    {SOCIALS.map(({ key, label, href, Icon }) => (
                                        <motion.a
                                            key={key}
                                            variants={itemVariants}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            whileHover={{ scale: 1.1, backgroundColor: ORANGE }}
                                            whileTap={{ scale: 0.92 }}
                                            className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition-colors text-ink-500"
                                        >
                                            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            layout
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-label={open ? "Hide social links" : "Show social links"}
                            className="flex cursor-pointer flex-col items-center gap-3 rounded-r-2xl border border-l-0 border-white/10 sm:px-2.5 px-2.5 py-4 bg-white/90 text-ink-500"
                        >
                            <Share2
                                className="h-3.5 w-3.5 ml-2"
                                strokeWidth={2.2}
                                style={{ color: ORANGE }}
                                aria-hidden="true"
                            />
                            <span
                                className="text-[13px] ml-2 font-semibold uppercase tracking-[0.2em] text-ink-500"
                                style={{ writingMode: "vertical-rl" }}
                            >
                                Social
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}