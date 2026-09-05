"use client";

import { motion } from "framer-motion";
import { Sprout, Gauge, TrendingUp } from "lucide-react";
import RingGauge from "./RingGauge";

/* Twelve hourly readings — steady climb, one dip after a feedstock change. */
const YIELD_SERIES = [42, 48, 51, 47, 55, 59, 57, 63, 66, 61, 69, 74];

export function LiveDigesterCard() {
  return (
    <div className="solid-card relative w-[268px] overflow-hidden rounded-3xl p-5 text-white sm:w-[300px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72">
            Digester D-04
          </p>
          <p className="mt-1 font-display text-[15px] font-semibold">
            Methane yield
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-500/25 px-2.5 py-1 text-[10px] font-semibold text-leaf-100 ring-1 ring-inset ring-leaf-300/40">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-leaf-300" />
          Live
        </span>
      </div>

      <div className="mt-5 flex items-end gap-[5px]" aria-hidden="true">
        {YIELD_SERIES.map((v, i) => (
          <motion.span
            key={i}
            initial={{ height: 4, opacity: 0 }}
            animate={{ height: v, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 1 + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`w-full rounded-full ${
              i === YIELD_SERIES.length - 1
                ? "bg-gradient-to-t from-blush-500 to-blush-300"
                : "bg-gradient-to-t from-leaf-600/70 to-leaf-300/90"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-white/16 pt-3">
        <p className="tabular font-display text-2xl font-semibold">
          61.4<span className="ml-0.5 text-sm font-medium text-white/75">% CH₄</span>
        </p>
        <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-leaf-300">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          +3.8 pts
        </p>
      </div>
      <p className="mt-1 text-[11px] text-white/70">Rolling 12-hour window</p>
    </div>
  );
}

export function BalanceCard() {
  return (
    <div className="solid-card relative w-[224px] rounded-[28px] p-5 text-white">
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4 text-leaf-300" strokeWidth={2} aria-hidden="true" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72">
          Carbon balance
        </p>
      </div>
      <div className="mt-3 grid place-items-center">
        <RingGauge value={94} size={156} stroke={11} />
      </div>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-white/72">
        Verified across all 18 sites, updated nightly
      </p>
    </div>
  );
}

export function DigestateChip() {
  return (
    <div className="solid-card flex items-center gap-3 rounded-2xl px-4 py-3 text-white">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blush-500 ring-1 ring-inset ring-blush-300/40">
        <Sprout className="h-[18px] w-[18px] text-blush-200" strokeWidth={2} aria-hidden="true" />
      </span>
      <div>
        <p className="tabular font-display text-[15px] font-semibold leading-none">
          42,800 t
        </p>
        <p className="mt-1 text-[11px] text-white/72">
          Digestate returned to partner farms
        </p>
      </div>
    </div>
  );
}