'use client';

/**
 * MyProjects.jsx
 * Full-bleed animated project slider (Next.js App Router + Tailwind).
 *
 * Usage:
 *   1. npm install lucide-react
 *   2. import MyProjects from '@/components/MyProjects';
 *      <MyProjects />
 *
 * Accent colors:
 *   Green #2A9D8F -> CTA button, active progress dot
 *   Pink  #E76F51 -> eyebrow label, hover accents, icon/arrow color
 *
 * Replace the `projects` array below with your real data/images.
 */
import Link from 'next/link';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/comp/motion/Reveal';

const AUTOPLAY_MS = 6000;

const projects = [
  {
    id: 1,
    name: 'CBG Plant, Panipat, Haryana',
    image: '/images/kechero.png',
    tags: ['Compressed Biogas', 'Engineering & Construction', 'EPC Solutions'],
  },
  {
    id: 2,
    name: 'Bio CNG Project, Indore, Madhya Pradesh',
    image: '/images/projectbanner.png',
    tags: ['Compressed Biogas', 'Project Development'],
  },
  {
    id: 3,
    name: 'Organic Waste to CBG, Pune, Maharashtra',
    image: '/images/projectcase1.png',
    tags: ['Organic Waste', 'Plant Operations', 'O&M'],
  },
  {
    id: 4,
    name: 'Agricultural Waste CBG Plant, Ludhiana, Punjab',
    image: '/images/projectcase2.png',
    tags: ['Renewable Energy', 'Compressed Biogas'],
  },
  {
    id: 5,
    name: 'Municipal Waste CBG Facility, Jaipur, Rajasthan',
    image: '/images/projectcase3.png',
    tags: ['Waste Management', 'Engineering & Construction'],
  },
];

export default function MyProjects() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef(false);
  const timeoutRef = useRef(null);

  const current = projects[index];

  const goTo = useCallback((next) => {
    setIndex((prev) => (next + projects.length) % projects.length);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Slide-in animation for text block on every index change
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [index]);

  // Autoplay + progress bar fill
  useEffect(() => {
    if (paused || reduceMotionRef.current) return;

    setProgress(0);
    const raf = requestAnimationFrame(() => setProgress(100));
    timeoutRef.current = setTimeout(() => goNext(), AUTOPLAY_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  return (
    <section
      className="relative w-full min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] overflow-hidden bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image crossfade */}
      <div className="absolute inset-0">
        {projects.map((p, i) => (
          <img
            key={p.id}
            src={p.image}
            alt={p.name}
            className="absolute inset-0 h-full w-full object-cover motion-reduce:transition-none"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? 'scale(1.08)' : 'scale(1)',
              transition: 'opacity 1200ms ease, transform 8000ms linear',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex h-full min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] flex-col justify-end gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:justify-center lg:gap-0 lg:px-16">
        {/* Left: heading */}
        <Reveal className="max-w-xl lg:mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#E76F51]">
            Projects
          </p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            <span style={{ color: "#FFFFFF" }}>Global projects,</span>
            <span className="block" style={{ color: "#FFFF" }}>local impact</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-white/80 text-justify">
            With more than 2000 executed projects, we are empowering a cleaner,
            more resource-efficient future worldwide.
          </p>
          <Link
            href="/projects"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF7D44] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:gap-3 hover:bg-[#24857A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D8F] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          >
            All projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-1" />
          </Link>
        </Reveal>

        {/* Right: floating project card */}
        <div className="w-full max-w-md rounded-3xl border border-white/40 bg-gradient-to-b from-white/70 via-white/90 to-white p-5 shadow-2xl backdrop-blur-xl sm:p-6 lg:absolute lg:right-16 lg:top-1/2 lg:w-[420px] lg:-translate-y-1/2">
          {/* Dots + arrows */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {projects.map((p, i) =>
                i === index ? (
                  <span
                    key={p.id}
                    className="relative h-1.5 w-8 overflow-hidden rounded-full bg-[#02303D]"
                  >
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-[#2A9D8F] motion-reduce:transition-none"
                      style={{
                        width: `${progress}%`,
                        transition: paused ? 'none' : `width ${AUTOPLAY_MS}ms linear`,
                      }}
                    />
                  </span>
                ) : (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Go to project ${i + 1}: ${p.name}`}
                    onClick={() => goTo(i)}
                    className="h-1.5 w-1.5 rounded-full bg-black/20 transition-all duration-300 hover:w-3 hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D8F]"
                  />
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                onClick={goPrev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E76F51] text-[#E76F51] transition-all duration-300 hover:scale-110 hover:bg-[#CC5B3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E76F51]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={goNext}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E76F51] text-white transition-all duration-300 hover:scale-110 hover:bg-[#CC5B3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E76F51]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title + tags (slide/fade on change) */}
          <div
            className={`transition-all duration-500 ease-out motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
          >
            <button type="button" className="group mb-4 flex w-full items-center justify-between gap-2 text-left">
              <span className="text-lg font-bold text-neutral-900 sm:text-xl">
                {current.name}
              </span>
              <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[#E76F51] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>

            <div className="flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/5 bg-[#02303D] px-4 py-2 text-xs font-medium text-white sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}