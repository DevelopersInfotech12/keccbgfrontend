"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  ArrowUpRight,
  ArrowRight,
  Sprout,
  Flame,
  Zap,
  Recycle,
} from "lucide-react";
import { Reveal } from "./motion/Reveal";

const LEAF = "#02303D";
const DEEP = "#012029";
const CORAL = "#FF7D44";
// const CORAL = "#ff4444";
// const CORAL = "#0ba0f7";
const SAGE = "#7FC49B";

const COMPANIES = [
  { label: "KEC Agritech", href: "https://kisanexperience.com/" },
  { label: "KEC Biofuel", href: "https://www.kecbiofuel.com/" },
  { label: "KEC Fintech", href: "https://www.kecfintech.com/" },
  { label: "KEC-Hemu", href: "https://www.haritenergymissionuk.com/" },
];

const SOCIALS = [
  { Icon: Facebook, label: "Bio CBG on Facebook", href: "https://www.facebook.com/" },
  { Icon: Instagram, label: "Bio CBG on Instagram", href: "https://www.instagram.com/" },
  { Icon: Youtube, label: "Bio CBG on YouTube", href: "https://www.youtube.com/" },
  { Icon: Linkedin, label: "Bio CBG on LinkedIn", href: "https://www.linkedin.com/company/kec-biofuel/" },
];

const CONTACT = [
  { Icon: Phone, text: "+91-8527626868", href: "tel:+918527626868", type: "external" },
  { Icon: Mail, text: "info@kecbiofuel.com", href: "mailto:info@kecbiofuel.com", type: "external" },
  { Icon: MapPin, text: "429, 4th Floor, Ansal Chamber 2, Bikaji Cama Place, New Delhi - 110066", href: "/contact#contact-body", type: "internal" },
];

// The cycle the whole business runs on. Closed loop, not a one-way pipeline —
// waste becomes fuel becomes power, and the park keeps running on it.
const LOOP = [
  { Icon: Sprout, label: "Feedstock", angle: -90 },
  { Icon: Flame, label: "Bio-CNG", angle: 30 },
  { Icon: Zap, label: "Power", angle: 150 },
];

// Ghost watermark icons — one per corner, faint, tie back to the closed-loop motif.
const CORNER_MARKS = [
  { Icon: Sprout, className: "-left-6 -top-6 md:-left-8 md:-top-10" },
  { Icon: Flame, className: "-right-6 -top-6 md:-right-8 md:-top-10" },
  { Icon: Zap, className: "-left-6 -bottom-6 md:-left-8 md:-bottom-10" },
  { Icon: Recycle, className: "-right-6 -bottom-6 md:-right-8 md:-bottom-10" },
];

function LoopMark() {
  const r = 42;
  const cx = 56;
  const cy = 56;
  return (
    <div className="relative mx-auto h-[112px] w-[112px] shrink-0" aria-hidden="true">
      <svg viewBox="0 0 112 112" className="h-full w-full animate-[spin_28s_linear_infinite] motion-reduce:animate-none">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${SAGE}30`} strokeWidth="1.5" strokeDasharray="2 6" />
      </svg>
      {LOOP.map(({ Icon, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return (
          <span
            key={i}
            className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border"
            style={{
              left: x,
              top: y,
              background: DEEP,
              borderColor: i === 1 ? `${CORAL}60` : `${SAGE}40`,
              color: i === 1 ? CORAL : SAGE,
            }}
          >
            <Icon className="h-[13px] w-[13px]" strokeWidth={2} />
          </span>
        );
      })}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.1em] text-mist-50/40">
        Closed
        <br />
        Loop
      </span>
    </div>
  );
}

function ContactRow({ Icon, text, href, type }) {
  const content = (
    <>
      <span
        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-200 group-hover:bg-[--coral]"
        style={{ background: `${CORAL}18`, color: CORAL, "--coral": CORAL }}
      >
        <Icon className="h-[15px] w-[15px] transition-colors duration-200 group-hover:text-white" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="pt-1.5 text-[13.5px] leading-snug text-mist-50/70 transition-colors duration-200 group-hover:text-mist-50">
        {text}
      </span>
    </>
  );
  const className = "group flex cursor-pointer items-start gap-3 py-1.5";
  return type === "internal" ? (
    <Link href={href} className={className}>{content}</Link>
  ) : (
    <a href={href} className={className}>{content}</a>
  );
}

function ActionCard({ Icon, eyebrow, title, description, buttonLabel, href, external, accent }) {
  return (
    <div
      className="group flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{ borderColor: `${accent}25`, background: `linear-gradient(155deg, ${accent}14, transparent 65%)` }}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border" style={{ borderColor: `${accent}40`, color: accent }}>
        <Icon className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-mist-50/40" style={{ color: "mist-50/40" }}>{eyebrow}</p>
      <p className="mt-1 text-[15px] font-semibold text-mist-50">{title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-mist-50/60">{description}</p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-50 transition-colors group-hover:text-white"
        style={{ color: accent }}
      >
        {buttonLabel}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} aria-hidden="true" />
      </a>
    </div>
  );
}

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="grid-floor relative overflow-hidden text-mist-50" style={{ background: LEAF }}>
      {/* ambient glow, ties to the loop mark below without adding a second motif */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-40"
        style={{ background: `radial-gradient(60% 100% at 50% 0%, ${SAGE}12, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Ghost watermark icons — all four corners */}
      {CORNER_MARKS.map(({ Icon, className }, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute opacity-[0.08] ${className}`}
          animate={
            reduced
              ? {}
              : { rotate: [0, 6, 0], scale: [1, 1.06, 1] }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        >
          <Icon className="h-32 w-32 md:h-40 md:w-40" style={{ color: "#FFFFFF" }} strokeWidth={1} />
        </motion.span>
      ))}

      <div className="container-shell relative pt-20">
        <Reveal as="div" className="grid gap-x-10 gap-y-14 pb-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex cursor-pointer items-center gap-2.5" aria-label="Bio CBG — home">
              <img src="/images/logo.png" alt="Bio CBG" className="h-10 w-auto" />
            </Link>
            <p className="mt-6 max-w-[240px] text-justify text-[13px] leading-relaxed text-mist-50/55">
              Strategically planned CBG Parks — Bio-CNG industrial ecosystems built around infrastructure, connectivity, and feedstock integration.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: CORAL }}
            >
              Partner with us
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <div className="mt-8 flex gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-mist-50/12 text-mist-50/60 transition-all duration-200 hover:border-mist-50/40 hover:text-mist-50"
                >
                  <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 lg:ml-[-60px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-50/40">Contact</p>
            <div className="mt-5 flex flex-col gap-0.5">
              {CONTACT.map((c) => (
                <ContactRow key={c.text} {...c} />
              ))}
            </div>
          </div>

          {/* Actions: support + newsletter, equal weight, distinct accents */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <ActionCard
              Icon={Linkedin}
              eyebrow="Stay Updated"
              title="BioEnergy Brief"
              description="Follow our LinkedIn newsletter for updates."
              buttonLabel="Follow on LinkedIn"
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7464982100782411778"
              external
              accent={CORAL}
            />
            <ActionCard
              Icon={MessageCircle}
              eyebrow="Stay Connected"
              title="Join the channel"
              description="Live updates from our official WhatsApp channel."
              buttonLabel="Join WhatsApp"
              href="https://whatsapp.com/channel/0029Vb7jpfd4yltQwMoQaD0z"
              external
              accent={CORAL}
            />
          </div>
        </Reveal>

        {/* KEC Companies — own row, one line, centered */}
        <nav
          aria-label="KEC Companies"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-mist-50/10 py-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-50/40">KEC Companies</p>
          {COMPANIES.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-[14px] text-mist-50/70 transition-colors duration-200 hover:text-[--coral]"
              style={{ "--coral": CORAL }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center justify-center gap-2 border-t border-mist-50/10 py-8 text-center text-[12.5px] text-mist-50/45">
          <p>
            © 2026 Bio CBG. All rights reserved. |{" "}
            <a
              href="http://developersinfotech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer underline-offset-2 transition-colors hover:text-mist-50 hover:underline"
            >
              Developed by Developers Infotech Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}