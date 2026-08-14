"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Clock, Building2 } from "lucide-react";

import TiltCard from "@/comp/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1];

const FLOAT_PANELS = [
  { icon: Clock, value: "< 2 days", label: "Typical reply time", className: "right-[5%] top-[20%]", delay: 0.3 },
  { icon: Building2, value: "4 offices", label: "Across India", className: "right-[16%] top-[48%]", delay: 0.45 },
];

export default function ContactHero() {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => { });
  }, []);

  return (
    <section className="relative overflow-hidden px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4">
      <div className="scene-3d relative isolate flex min-h-[380px] w-full flex-col justify-end overflow-hidden rounded-[28px] shadow-panel sm:min-h-[86svh] sm:rounded-[40px]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(125deg, #124B2F 0%, #2E9E63 42%, #F0937B 82%, #EC7C62 100%)",
          }}
        />
        {/* bg video: fallback gradient above stays behind it in DOM order, so
            it still shows briefly on load / if the file fails */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/contactherovideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-4 h-80 w-80 animate-float-slow rounded-full bg-blush-500/30 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 animate-float rounded-full bg-leaf-400/25 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,19,16,0.30) 0%, rgba(10,19,16,0.10) 45%, rgba(10,19,16,0.60) 100%)",
          }}
        />

        {/* Floating 3D panels — same depth cue as the KEC hero */}
        {!reduced &&
          FLOAT_PANELS.map(({ icon: Icon, value, label, className, delay }) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay, ease: EASE }}
              className={`absolute z-10 hidden lg:block ${className}`}
            >
              <div className="animate-float-slow gpu-isolate">
                <TiltCard max={14} lift={8} glare wrapperClassName="group" className="solid-card w-52 rounded-2xl p-5">
                  <span className="pop-md grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blush-400 to-blush-600">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <p className="pop-sm mt-4 font-display text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[13px] text-white/70">{label}</p>
                </TiltCard>
              </div>
            </motion.div>
          ))}

        <div className="container-shell relative z-10 pb-12 pt-32 sm:pb-16 sm:pt-28">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <MessageCircle className="h-3.5 w-3.5 text-blush-200" strokeWidth={2.2} aria-hidden="true" />
              Contact Us
            </span>
            <h1 className="mt-7 font-display text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.6rem]">
              <span className="text-white">Let's talk numbers</span>
              <br />
              {/* <span className="text-green-600 font-body italic tracking-[-0.01em]">
                Farm to Fuel.
              </span> */}
              <span className="text-gradient-leaf-blush font-body italic tracking-[-0.01em]">
                not promises.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-white/85 sm:text-[17px]">
              Whether you grow the feedstock, run the industry or want a plant of
              your own — the KEC &amp; Bio CBG team would love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}