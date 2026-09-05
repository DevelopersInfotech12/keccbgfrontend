"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Pause } from "lucide-react";

import { useParallaxTilt } from "@/lib/useParallaxTilt";
import TiltCard from "@/comp/ui/TiltCard"; // used by the commented-out HERO_STATS block below
import {
  LiveDigesterCard,
  BalanceCard,
  DigestateChip,
} from "@/comp/hero/HeroPanels";
import SocialDock from "@/comp/SocialDock";
import CallbackModal from "@/comp/CallbackModal";

const HERO_VIDEO = "/videos/productsvideo.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

const EASE = [0.16, 1, 0.3, 1];

const stage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const riseIn = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const CTA_STYLES = {
  primary:
    "text-white hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lift bg-[#FF7D44] hover:bg-[#ff8f5e]",
  ghost:
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/20 hover:border-[#FF7D44]/70",
};

function CtaLink({ href, variant = "primary", withArrow = false, children, ...rest }) {
  return (
    <a href={href} className={`group inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-full px-7 text-sm font-semibold transition-all duration-300 [touch-action:manipulation] ${CTA_STYLES[variant]}`} {...rest}>
      {children}
      {withArrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden="true" />
      )}
    </a>
  );
}

function CtaButton({ variant = "primary", withArrow = false, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`group inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-full px-7 text-sm font-semibold transition-all duration-300 [touch-action:manipulation] ${CTA_STYLES[variant]}`}>
      {children}
      {withArrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden="true" />
      )}
    </button>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cbOpen, setCbOpen] = useState(false);

  const { rotateX, rotateY, layers, handlers } = useParallaxTilt({ maxRotate: 9 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.3]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;

    const start = () => {
      const attempt = el.play();
      if (attempt?.catch) attempt.catch(() => setPaused(true));
    };

    if (el.readyState >= 2) start();
    el.addEventListener("canplay", start);
    return () => el.removeEventListener("canplay", start);
  }, []);

  const handleError = () => {
    setFailed(true);
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        [
          `[Hero] Background video failed to load: ${HERO_VIDEO}`,
          "Check, in order:",
          `  1. The file sits at public${HERO_VIDEO} — path is case-sensitive`,
          "  2. Restart `npm run dev`; Next serves public/ at boot, so a file",
          "     added while the server is running may not be picked up.",
          `  3. Open http://localhost:3000${HERO_VIDEO} directly. If it`,
          "     downloads instead of playing, the codec is wrong — re-encode",
          "     to H.264 + yuv420p.",
          "  4. Change HERO_VIDEO at the top of src/comp/Hero.jsx.",
        ].join("\n")
      );
    }
  };

  return (
    <section id="hero-section" ref={sectionRef} className="relative bg-mist-50 px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4">
      <motion.div style={reduced ? undefined : { scale: panelScale }} {...handlers} className="relative isolate flex min-h-[640px] w-full flex-col justify-end overflow-hidden rounded-[28px] shadow-panel sm:min-h-[88svh] sm:rounded-[40px]">
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: `linear-gradient(118deg, ${TEAL} 0%, #0A4A5C 34%, #4D8B98 62%, ${ORANGE} 100%)` }} />

        {!failed && (
          <motion.video
            ref={videoRef}
            style={reduced ? undefined : { y: videoY }}
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={handleError}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            aria-hidden="true"
            className="absolute inset-0 h-[108%] w-full object-cover [filter:contrast(1.07)_saturate(1.12)_brightness(1.05)]"
          />
        )}

        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(2,48,61,0.34) 0%, rgba(2,48,61,0.04) 26%, rgba(2,48,61,0.10) 48%, rgba(2,48,61,0.52) 80%, rgba(2,48,61,0.88) 100%)" }} />
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(2,48,61,0.80) 0%, rgba(2,48,61,0.44) 34%, rgba(2,48,61,0.08) 58%, rgba(2,48,61,0) 72%)" }} />
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(58% 55% at 24% 68%, rgba(2,48,61,0.55) 0%, rgba(2,48,61,0) 72%)" }} />

        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full blur-[110px]" style={{ backgroundColor: `${TEAL}1F` }} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/3 h-[380px] w-[380px] rounded-full blur-[110px]" style={{ backgroundColor: `${ORANGE}1A` }} />

        {!reduced && (
          <motion.div aria-hidden="true" style={{ opacity: veil, backgroundColor: TEAL }} className="absolute inset-0" />
        )}
        <div aria-hidden="true" className="grain absolute inset-0" />

        <motion.div style={reduced ? undefined : { y: contentY, opacity: contentFade }} className="container-shell relative z-10 pb-14 pt-32 sm:pb-20 sm:pt-28 lg:pb-24">
          <div className="grid items-start gap-14 lg:grid-cols-12">
            <motion.div variants={stage} initial="hidden" animate="show" className="lg:col-span-7">
              <motion.p variants={riseIn} className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md mt-8">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />
                Building India&apos;s Clean Energy Infrastructure
              </motion.p>

              <motion.h1 variants={riseIn} className="mt-7 font-display font-semibold tracking-[-0.03em] text-white text-balance sm:ml-[1px] ml-[20px]">
                <span className="block text-[2.15rem] leading-[1.06] sm:text-[2.75rem] lg:text-[3.2rem]">
                  CBG Park
                </span>
                <span className="mt-1 block font-body text-[1.5rem] italic leading-[1.15] tracking-[-0.01em] sm:text-[1.9rem] lg:text-[2.9rem]" style={{ color: ORANGE }}>
                  Strategically Planned
                </span>
                <span className="mt-1 block text-[1.55rem] font-medium leading-[1.15] text-white/90 sm:text-[1.95rem] lg:text-[2.3rem]">
                  Bio-CNG Industrial Ecosystems
                </span>
              </motion.h1>

              <motion.div variants={riseIn} className="mt-5 flex items-center gap-2.5 sm:ml-[1px] ml-[24px]">
                <span aria-hidden="true" className="h-px w-6" style={{ backgroundColor: ORANGE }} />
                <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-white/55">
                  KEC Agritech
                </span>
              </motion.div>

              <motion.p variants={riseIn} className="mt-4 max-w-xl text-pretty text-[15.5px] leading-[1.65] text-white/75 sm:text-[15px] ml-[24px] sm:ml-[1px]">
                Every park is engineered as a complete ecosystem — feedstock
                logistics, plant connectivity, and long-term infrastructure
                built to scale across India.
              </motion.p>

              <motion.div variants={riseIn} className="mt-9 flex flex-wrap items-center gap-3.5">
                <CtaLink href="/cbg-park" variant="primary" withArrow>
                  See the Blueprint
                </CtaLink>
                <CtaButton variant="ghost" onClick={() => setCbOpen(true)}>
                  Book a Session
                </CtaButton>
              </motion.div>
            </motion.div>

            <div className="hidden h-[540px] [perspective:1400px] lg:col-span-5 lg:block">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                style={reduced ? undefined : { rotateX, rotateY }}
                className="preserve-3d relative h-full w-full"
              >
                <motion.div style={reduced ? { z: 40 } : { ...layers.mid, z: 40 }} className="preserve-3d absolute right-0 top-0">
                  <BalanceCard />
                </motion.div>

                <motion.div style={reduced ? { z: 90 } : { ...layers.near, z: 90 }} className="preserve-3d absolute -left-8 top-[176px]">
                  <div className="animate-float gpu-isolate">
                    <LiveDigesterCard />
                  </div>
                </motion.div>

                <motion.div style={reduced ? { z: 14 } : { ...layers.far, z: 14 }} className="preserve-3d absolute bottom-0 right-0 w-[268px]">
                  <div className="animate-float-slow gpu-isolate">
                    <DigestateChip />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {!failed && (
          <button
            type="button"
            onClick={() => {
              const el = videoRef.current;
              if (!el) return;
              if (el.paused) el.play();
              else el.pause();
            }}
            aria-label={paused ? "Play background video" : "Pause background video"}
            className="absolute bottom-5 right-5 z-20 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:bottom-7 sm:right-7"
          >
            {paused ? (
              <Play className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            )}
          </button>
        )}
      </motion.div>

      <SocialDock />
      <CallbackModal open={cbOpen} onClose={() => setCbOpen(false)} />
    </section>
  );
}