"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Globe,
  Phone,
  Calendar,
  PhoneCall,
} from "lucide-react";

import { Reveal, RevealScale, RevealSide } from "@/comp/motion/Reveal";
import CallbackModal from "@/comp/CallbackModal";
import SectionHeading from "./ui/SectionHeading";

const CTA_VIDEO = "/videos/ctavideo.mp4";
const CTA_POSTER = "/images/plant-walkthrough-poster.jpg";

const GREEN = "#3DDC84";

const CONTACTS = {
  sites: [
    { label: "www.kecbiofuel.com", href: "https://www.kecbiofuel.com" },
    { label: "www.kisanexperience.com", href: "https://www.kisanexperience.com" },
  ],
  phones: [
    { label: "+91 9319719115", href: "tel:+919319719115" },
    { label: "+91 8527626868", href: "tel:+918527626868" },
  ],
};

export default function CTASection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [cbOpen, setCbOpen] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;

    const start = () => {
      const attempt = el.play();
      if (attempt?.catch) attempt.catch(() => setIsPlaying(false));
    };

    if (el.readyState >= 2) start();
    el.addEventListener("canplay", start);
    return () => el.removeEventListener("canplay", start);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <>
      <section id="contact" className="bg-mist-50 pb-24 pt-8 md:pb-32">
        <div className="container-shell">
          <Reveal
            className="edge-leaf-blush relative overflow-hidden rounded-[2.25rem] bg-ink-0 px-8 py-14 sm:px-10 lg:px-14"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-[100px]"
              style={{ background: `${GREEN}1f` }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              {/* Copy + CTA */}
              <div>
                <RevealSide from="left">
                  <SectionHeading
                    eyebrow="KEC CBG Park"
                    accent="leaf"
                    tone="light"
                    title="Let&rsquo;s Discuss Your Next"
                    titleAccent="Bio-CNG Infrastructure Opportunity"
                    stack
                    lede="Connect with KEC&rsquo;s engineering and ecosystem team for a strategic discussion on CBG Park development, infrastructure planning, and integrated clean-energy deployment."
                    className="max-w-lg"
                  />
                </RevealSide>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCbOpen(true)}
                    className="group inline-flex min-h-[50px] items-center gap-2.5 rounded-full px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 [touch-action:manipulation]"
                    style={{ background: "#046f8d" }}
                  >
                    <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    Book Investor Interaction
                  </button>

                  <a
                    href="tel:+919319719115"
                    className="group inline-flex min-h-[50px] items-center gap-2.5 rounded-full border px-6 text-sm font-semibold text-ink-900 transition-all duration-300 hover:-translate-y-0.5 [touch-action:manipulation]"
                    style={{ borderColor: "rgba(11,15,13,0.15)" }}
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    Talk to KEC Team
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
                  {CONTACTS.sites.map((site) => (
                    <a
                      key={site.href}
                      href={site.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-ink-900"
                      style={{ color: "#484948" }}
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      {site.label}
                      <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
                  {CONTACTS.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-ink-900"
                      style={{ color: "#484948" }}
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {phone.label}
                    </a>
                  ))}
                </div>

                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-500/60">
                  Build It Right. Build It With KEC.
                </p>
              </div>

              {/* Video */}
              <RevealScale
                delay={0.1}
                className="group relative aspect-video overflow-hidden rounded-[1.5rem] bg-neutral-900 shadow-lift"
              >
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={CTA_VIDEO}
                  poster={CTA_POSTER}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                  CBG Park walkthrough
                </div>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute inset-0 flex items-center justify-center [touch-action:manipulation]"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-lift transition-all duration-300 hover:scale-105 hover:bg-white ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      }`}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/70 [touch-action:manipulation]"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Volume2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </RevealScale>
            </div>
          </Reveal>
        </div>
      </section>
      <CallbackModal open={cbOpen} onClose={() => setCbOpen(false)} />
    </>
  );
}