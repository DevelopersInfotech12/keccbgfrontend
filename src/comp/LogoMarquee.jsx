"use client";

import { useRef, useState } from "react";
import {
  Wheat,
  Zap,
  FlaskConical,
  Server,
  Truck,
  Factory,
  CircuitBoard,
  Sprout,
} from "lucide-react";

import { Reveal } from "./motion/Reveal";

const EMERALD = "#1F6F54";
const CORAL = "#E8887A";

const PARTNERS = [
  { name: "Meridian Foods", sector: "Food production", Icon: Wheat },
  { name: "Northfield Energy", sector: "Energy", Icon: Zap },
  { name: "Arden Chemicals", sector: "Chemicals", Icon: FlaskConical },
  { name: "Vantage Data Centres", sector: "Data infrastructure", Icon: Server },
  { name: "Greenline Logistics", sector: "Logistics", Icon: Truck },
  { name: "Harrow Manufacturing", sector: "Manufacturing", Icon: Factory },
  { name: "Solstice Grid", sector: "Grid operations", Icon: CircuitBoard },
  { name: "Union Agritech", sector: "Agritech", Icon: Sprout },
  { name: "Arden Chemicals", sector: "Chemicals", Icon: FlaskConical },
  { name: "Vantage Data Centres", sector: "Data infrastructure", Icon: Server },
  { name: "Greenline Logistics", sector: "Logistics", Icon: Truck },
  { name: "Harrow Manufacturing", sector: "Manufacturing", Icon: Factory },
  { name: "Solstice Grid", sector: "Grid operations", Icon: CircuitBoard },
  { name: "Union Agritech", sector: "Agritech", Icon: Sprout },
];

function PartnerCard({ name, sector, Icon }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -14, y: px * 16 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hover ? 22 : 0
          }px)`,
        transition: "transform 220ms ease-out, box-shadow 220ms ease-out",
        boxShadow: hover
          ? "0 22px 44px -18px rgba(15,30,25,0.28)"
          : "0 1px 2px rgba(15,30,25,0.05)",
        borderColor: hover ? `${EMERALD}40` : "rgba(15,30,25,0.08)",
      }}
      className="flex shrink-0 cursor-pointer items-center gap-3.5 rounded-2xl border bg-white px-6 py-4"
    >
      <span
        style={{
          background: hover ? EMERALD : `${EMERALD}14`,
          color: hover ? "#fff" : EMERALD,
          transition: "background 220ms ease-out, color 220ms ease-out",
        }}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="whitespace-nowrap">
        <p className="font-display text-[15px] font-medium leading-tight text-ink-500">
          {name}
        </p>
        <p
          style={{ color: hover ? CORAL : undefined }}
          className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-300"
        >
          {sector}
        </p>
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section
      aria-label="Partner organisations"
      className="border-b border-ink-900/6 bg-mist-50 py-14"
      style={{ perspective: "1200px" }}
    >
      <div className="container-shell">
        <Reveal as="p" className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-300">
          Trusted by industry leaders decarbonising today
        </Reveal>
      </div>

      <Reveal
        as="div"
        y={16}
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]"
      >
        <div
          className="marquee-track flex w-max gap-3.5 motion-reduce:animate-none"
        >
          {loop.map((p, i) => (
            <PartnerCard key={`${p.name}-${i}`} {...p} />
          ))}
        </div>
      </Reveal>

      <style>{`
        .marquee-track {
          animation: cbg-marquee 34s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes cbg-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}