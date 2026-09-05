"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import SocialDock from "@/comp/SocialDock";
import CallbackModal from "@/comp/CallbackModal";

const HERO_IMAGE = "/images/homehero/sonubanner.png";

export default function HomeHeronew() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const [cbOpen, setCbOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative bg-mist-50 px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4"
    >
      <motion.div
        style={reduced ? undefined : { scale: panelScale }}
        className="relative isolate min-h-[640px] w-full overflow-hidden rounded-[28px] shadow-panel sm:min-h-[95svh] sm:rounded-[40px]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />

        {/* Content boxed to the empty lot area in banner only — tune % if crop shifts it */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-[24%] right-[26%] top-[58%] bottom-[4%] flex items-center justify-center overflow-hidden rounded-xl p-3 sm:rounded-2xl sm:p-6"
        >
          {/* Single scrim: black → emerald-950 → black, amber rim-light top edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl border-t border-amber-400/30 bg-gradient-to-b from-black/85 via-emerald-950/65 to-black/90 backdrop-blur-[3px] sm:rounded-2xl"
          />

          <div className="relative z-10 text-center">
            <h1 className="text-[11px] font-semibold leading-tight text-teal-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] xs:text-xs sm:text-lg md:text-2xl lg:text-3xl">
              CBG Park | Strategically Planned Bio-CNG Industrial Ecosystems by{" "}
              <span className="text-amber-300">KEC Agritech</span>
            </h1>
            <p className="mt-1.5 text-[9px] leading-snug text-teal-100/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] sm:mt-3 sm:text-xs md:text-sm lg:text-[14px]">
              Explore KEC&rsquo;s strategically planned CBG Parks designed around infrastructure, connectivity, feedstock integration, and long-term clean energy ecosystem development.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <SocialDock />
      <CallbackModal open={cbOpen} onClose={() => setCbOpen(false)} />
    </section>
  );
}