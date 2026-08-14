"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, Check, Sprout, Factory, Building2 } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import { RevealSide } from "@/comp/motion/Reveal";

const CHANNELS = [
  {
    icon: Phone,
    label: "Call us",
    values: [
      { text: "+91-8527626868", href: "tel:+918527626868" },
      { text: "+91-9319719115", href: "tel:+919319719115" },
      { text: "+91-8287933634", href: "tel:+918287933634" },
    ],
    tone: "leaf",
  },
  {
    icon: Mail,
    label: "Email us",
    values: [
      { text: "info@kecbiofuel.com", href: "mailto:info@kecbiofuel.com" },
      { text: "info@kisanexpereince.com", href: "mailto:info@kisanexpereince.com" },
      { text: "Franchise@kisanexperience.com", href: "mailto:Franchise@kisanexperience.com" },
    ],
    tone: "leaf",
  },
];

const ADDRESSES = [
  { label: "Registered Address", lines: ["69/6A, Kirti Nagar,", "New Delhi – 110015"] },
  {
    label: "Corporate Address – Branch 1 (Delhi)",
    lines: ["429, 4th Floor, Ansal Chamber 2,", "Metro Station – Gate No. 3,", "Bikaji Cama Place, New Delhi – 110066"],
  },
  { label: "Branch 2 Address (Lucknow)", lines: ["H.No. 64, Seema City,", "Bijnor road, Lucknow – 226025"] },
  { label: "Branch 3 Address (Surat)", lines: ["519, Luxuria Business Hub,", "Near VR Mall, Vesu,", "Surat – 395007"] },
];

const INTERESTS = [
  { icon: Sprout, label: "Farmer / feedstock" },
  { icon: Factory, label: "Industry partner" },
  { icon: Building2, label: "Plant partnership" },
];

/**
 * Stack: renders 2 tinted "backing" plates behind the real card so every
 * card reads as a fanned 3D stack even in a frozen screenshot. Backing
 * plates are static (no hover dependency) — only translate/rotate, no opacity
 * fade, so they never disappear.
 *
 * h-full flows through: outer wrapper -> content plate, so callers can make
 * a Stack fill its flex/grid cell (used for equal-height columns).
 */
function Stack({ tone = "leaf", tilt = "right", children, className = "" }) {
  const backA = tone === "blush" ? "bg-blush-200" : "bg-leaf-200";
  const backB = tone === "blush" ? "bg-blush-100" : "bg-leaf-100";
  const dir = tilt === "right" ? 1 : -1;
  // Coloured cast shadow matched to the card's tone (from the ref).
  const cast =
    tone === "blush"
      ? "0 4px 10px rgba(10,19,16,0.06), 20px 30px 54px -20px rgba(236,124,98,0.55)"
      : "0 4px 10px rgba(10,19,16,0.06), 20px 30px 54px -20px rgba(46,158,99,0.55)";

  return (
    // NOTE: this wrapper is intentionally NOT 3D-rotated. Rotating (rotateX/
    // rotateY) an ancestor of real text forces the browser to rasterize that
    // text at a sub-pixel angle every frame, which reads as permanent blur.
    // Depth here comes only from flat 2D offsets + shadows — the content
    // card below never inherits a rotation, so its text stays crisp.
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-[26px] ${backB}`}
        style={{ transform: `translate(${dir * 14}px, 14px) rotate(${dir * 3}deg)` }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-[26px] ${backA}`}
        style={{ transform: `translate(${dir * 7}px, 7px) rotate(${dir * 1.5}deg)` }}
      />
      <div
        className="relative flex h-full flex-col rounded-[26px]"
        style={{ boxShadow: cast }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ContactBody() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [interest, setInterest] = useState(INTERESTS[0].label);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
  };

  return (
    <section
      id="contact-body"
      className="relative overflow-hidden bg-mist-50 py-24 md:py-32"
      style={{ perspective: "2200px" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-blush-500/10 blur-[120px] animate-orbit-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-leaf-500/10 blur-[110px] animate-orbit-slow-rev"
      />

      {/* items-stretch: on lg+ (single row, 2 cols) both columns match the
          tallest one. Below lg, grid drops to 1 col and this is a no-op. */}
      <div className="container-shell relative grid items-stretch gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Form — permanently tilted plate, fanned stack behind it */}
        <RevealSide from="left" className="h-full">
          <Stack tone="leaf" tilt="left" className="h-full">
            <div className="edge-leaf-blush flex h-full flex-col rounded-[26px] bg-ink-0 p-7 shadow-panel sm:p-10">
              <SectionHeading
                eyebrow="Send a message"
                accent="blush"
                title="Tell us"
                titleAccent="what you're building."
                className="max-w-md"
              />

              {sent ? (
                <div className="mt-8 flex flex-1 flex-col items-center justify-center rounded-2xl border border-leaf-500/25 bg-leaf-50 px-6 py-12 text-center">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 shadow-lift-blush"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <Check className="h-7 w-7 text-white" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-display text-xl font-semibold text-ink-900">
                    Thanks, {form.name.split(" ")[0] || "there"}!
                  </p>
                  <p className="mt-2 max-w-sm text-[14.5px] leading-[1.6] text-ink-500">
                    Your message is on its way to the KEC team. We'll get back to
                    you within two working days.
                  </p>
                </div>
              ) : (
                <div className="mt-8 flex flex-1 flex-col justify-between space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" required />
                    <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
                  </div>
                  <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="+91 ..." />

                  <div>
                    <p className="mb-2 text-[13px] font-semibold text-ink-800">I'm a…</p>
                    <div className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 sm:gap-2.5">
                      {INTERESTS.map(({ icon: Icon, label }) => {
                        const active = interest === label;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setInterest(label)}
                            className={`inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-[12px] font-medium transition-all duration-200 sm:gap-2 sm:px-4 sm:text-[13.5px] ${active
                              ? "border-transparent bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-lift-blush"
                              : "border-ink-900/12 text-ink-700 hover:border-leaf-400 hover:text-leaf-700"
                              }`}
                            style={active ? { transform: "translateZ(10px)" } : undefined}
                          >
                            <Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-semibold text-ink-800">Message</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={4}
                      placeholder="A few words about your farm, site or project…"
                      className="w-full resize-none rounded-2xl border border-ink-900/12 bg-mist-50 px-4 py-3.5 text-[14.5px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-leaf-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={submit}
                    className="group inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-leaf-600 to-blush-500 px-8 text-sm font-semibold text-white shadow-lift-blush transition-transform duration-300 hover:-translate-y-1 active:translate-y-0"
                  >
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                    Send message
                  </button>
                </div>
              )}
            </div>
          </Stack>
        </RevealSide>

        {/* Info column — flex-col fills same h-full as form; last card
            (addresses) gets flex-1 to soak up leftover space so bottom
            edges of both columns line up exactly. */}
        <RevealSide from="right" className="flex h-full flex-col gap-8">
          {CHANNELS.map(({ icon: Icon, label, values, tone }) => (
            <Stack key={label} tone={tone} tilt="right">
              <div className="flex items-start gap-4 rounded-2xl bg-ink-0 p-6">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white bg-gradient-to-br from-blush-400 to-blush-600 shadow-lift-blush"
                  style={{ transform: "translateZ(18px)" }}
                >
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-300">
                    {label}
                  </p>
                  {values.map((v) => (
                    <Link
                      key={v.text}
                      href={v.href}
                      className="font-display text-[15.5px] font-semibold text-ink-900 transition-colors hover:text-leaf-700"
                    >
                      {v.text}
                    </Link>
                  ))}
                </div>
              </div>
            </Stack>
          ))}

          <Stack tone="leaf" tilt="right" className="flex-1">
            <div className="flex h-full items-start gap-4 rounded-2xl bg-ink-0 p-6">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white bg-gradient-to-br from-blush-400 to-blush-600 shadow-lift-blush"
                style={{ transform: "translateZ(18px)" }}
              >
                <MapPin className="h-[22px] w-[22px]" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-300">
                  Our addresses
                </p>
                <div className="mt-1 divide-y divide-ink-900/8">
                  {ADDRESSES.map((a) => (
                    <div key={a.label} className="flex flex-col gap-1 py-3 first:pt-1 last:pb-0">
                      <p className="font-display text-[15.5px] font-semibold text-ink-900">{a.label}</p>
                      <p className="text-[13px] leading-[1.6] text-ink-500">{a.lines.join(" ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Stack>
        </RevealSide>
      </div>

      <style jsx global>{`
        @keyframes orbit-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-14px, 18px) scale(1.08); }
        }
        @keyframes orbit-slow-rev {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(16px, -14px) scale(1.06); }
        }
        @keyframes aurora {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-orbit-slow { animation: orbit-slow 9s ease-in-out infinite; }
        .animate-orbit-slow-rev { animation: orbit-slow-rev 11s ease-in-out infinite; }
        .animate-aurora { animation: aurora 8s ease infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-slow, .animate-orbit-slow-rev, .animate-aurora { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-ink-800">
        {label}
        {required && <span className="ml-1 text-blush-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink-900/12 bg-mist-50 px-4 py-3.5 text-[14.5px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-leaf-500"
      />
    </div>
  );
}