"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Signature element: a carbon-balance dial. The green arc is the share of
 * this year's abatement target already delivered; the pink tick marks the
 * point where the plant crosses into carbon-negative.
 */
export default function RingGauge({
  value = 94,
  size = 168,
  stroke = 12,
  label = "of 2026 target",
  caption = "CO₂e avoided",
}) {
  const reduced = useReducedMotion();
  const gradientId = `ring-grad-${useId().replace(/:/g, "")}`;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${caption}: ${value} percent ${label}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7FC49B" />
            <stop offset="55%" stopColor="#83a6af" />
            <stop offset="100%" stopColor="#FF7D44" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={stroke}
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reduced ? offset : circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: reduced ? 0 : 1.6,
            delay: reduced ? 0 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="tabular font-display text-[2.1rem] font-semibold leading-none text-white">
            {value}
            <span className="text-[1.1rem] align-super text-white/80">%</span>
          </p>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
            {caption}
          </p>
          <p className="mt-0.5 text-[10px] text-white/65">{label}</p>
        </div>
      </div>
    </div>
  );
}