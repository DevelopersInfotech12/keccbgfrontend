"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./motion/Reveal";

// Display face: Fraunces — soft organic serif, fits a botanical/CBG brand.
// Body face: Manrope — clean, warm-neutral, pairs well with Fraunces.
const DISPLAY = "'Fraunces', Georgia, serif";
const BODY = "'Manrope', sans-serif";
const TEAL = "#02303D";
const ORANGE = "#FF7D44";

export const AnimatedTestimonialsDemo = () => {
  const router = useRouter();
  const [active, setActive] = useState(testimonials[0]);
  const reduced = useReducedMotion();

  const handleprev = () => {
    const i = testimonials.indexOf(active);
    setActive(testimonials[(i - 1 + testimonials.length) % testimonials.length]);
  };
  const handlenext = () => {
    const i = testimonials.indexOf(active);
    setActive(testimonials[(i + 1) % testimonials.length]);
  };
  const isActive = (index) => testimonials[index] === active;
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <section className="py-16 px-6 transition-colors duration-300" style={{ position: "relative", zIndex: 0, background: "#F6F4EF" }}>

      {/* ── Section Header (unified pattern — same as "From the Journal") ── */}
      <div className="w-full max-w-4xl mx-auto mb-12">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-4 sm:mb-6 w-full">
          <SectionHeading
            eyebrow="Client Stories"
            accent="leaf"
            title="What our clients"
            titleAccent="say about us"
            className="max-w-lg"
          />
          <Reveal as="button" onClick={() => router.push("/about")} delay={0.15}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            style={{ background: ORANGE }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Reveal>
        </div>
      </div>

      {/* Card — outer wrapper stays light, text side goes dark teal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto bg-white rounded-2xl p-8 border transition-colors duration-300" style={{ borderColor: `${TEAL}1a` }}>

        {/* Image stack */}
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9, z: -100, rotateY: randomRotateY() }}
                animate={{ opacity: isActive(index) ? 1 : 0.7, scale: isActive(index) ? 1 : 0.95, z: isActive(index) ? 0 : -100, rotate: isActive(index) ? 0 : randomRotateY(), zIndex: isActive(index) ? 10 : testimonials.length + 2 - index, y: isActive(index) ? [0, -80, 0] : 0 }}
                exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <Image src={testimonial.src} alt={testimonial.name} width={400} height={400} draggable={false} className="rounded-3xl h-full w-full object-cover object-center" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text side — dark teal box, inner content, matches inner-box pattern elsewhere */}
        <div
          className="relative flex flex-col justify-between overflow-hidden py-6 px-6 rounded-2xl transition-colors duration-300"
          style={{ background: TEAL }}
        >
          {/* Ghost watermark icon — top-right of teal panel */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 opacity-[0.10]"
            animate={
              reduced
                ? {}
                : { rotate: [0, 6, 0], scale: [1, 1.06, 1] }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Quote className="h-32 w-32" style={{ color: "#FFFFFF" }} strokeWidth={1} />
          </motion.span>

          <motion.div key={active.name} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
            {/* Name — Fraunces, orange for contrast on teal bg */}
            <h3 style={{ fontFamily: DISPLAY, fontSize: "1.9rem", fontWeight: 700, margin: 0, color: ORANGE }}>{active.name}</h3>
            {/* Designation — Manrope */}
            <p style={{ fontFamily: BODY, fontSize: 12, marginTop: 4, fontWeight: 300 }} className="text-white/80">{active.designation}</p>

            {/* Opening quote mark — Fraunces */}
            <span style={{ fontFamily: DISPLAY, fontSize: "4rem", lineHeight: 1, opacity: 0.35, display: "block", marginTop: "1rem" }} className="text-white">"</span>

            {/* Quote — Manrope, white on teal */}
            <motion.p
              style={{
                fontFamily: BODY,
                fontSize: 15,
                lineHeight: 1.75,
                marginTop: -16,
                fontWeight: 700,
                textAlign: "justify",
                textAlignLast: "left",
                width: "95%",
                color: "#fff"
              }}
            >
              {active.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  style={{ display: "inline" }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Nav — orange ring on teal bg */}
          <div className="flex gap-4 mt-8">
            <button onClick={handleprev} className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-white/15 transition-all duration-300" style={{ borderColor: ORANGE, color: ORANGE }}><ArrowLeft size={16} /></button>
            <button onClick={handlenext} className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-white/15 transition-all duration-300" style={{ borderColor: ORANGE, color: ORANGE }}><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonialsDemo;

const testimonials = [
  {
    quote:
      "Switching our shelves to this CBG line was the easiest call we made all year. Consistent potency, clean sourcing, and customers ask for it by name now. It's become the anchor product in our wellness bar.",
    name: "Meera Kapoor",
    designation: "Owner & Founder, Verdant Wellness Studio",
    src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb",
  },
  {
    quote:
      "We built a whole CBG tonic menu around this supplier because the quality never wavers batch to batch. Repeat customers went up within the first quarter, and reordering is painless.",
    name: "Daniel Osei",
    designation: "Owner & Founder, Coastline Coffee Co.",
    src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb",
  },
  {
    quote:
      "As a first-time founder, I needed a partner who wouldn't cut corners on sourcing. This team's transparency about extraction and testing is exactly why our serum line carries their CBG with confidence.",
    name: "Lena Fischer",
    designation: "Owner & Founder, Fischer Skincare Atelier",
    src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb",
  },
  {
    quote:
      "Our studio runs a recovery bar after every class, and this CBG blend is the one product nobody complains about. Reliable supply, honest labeling, and it fits our brand's values perfectly.",
    name: "Rahul Verma",
    designation: "Owner & Founder, Verma Yoga Collective",
    src: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb",
  },
];