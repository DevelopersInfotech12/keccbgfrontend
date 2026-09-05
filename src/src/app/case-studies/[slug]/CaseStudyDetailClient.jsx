"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Building2, Calendar, MapPin } from "lucide-react";

import Header from "@/comp/Header";
import Footer from "@/comp/Footer";
import CTASection from "@/comp/CTASection";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, RevealScale, Stagger, StaggerItem } from "@/comp/motion/Reveal";
import CallbackModal from "@/comp/CallbackModal";

const EASE = [0.16, 1, 0.3, 1];

function ContentBlock({ block }) {
  if (block.type === "p")
    return <p className="mb-[18px] text-justify text-[16px] leading-[1.85] text-ink-500" dangerouslySetInnerHTML={{ __html: block.text }} />;
  if (block.type === "h3")
    return <h3 className="mb-3 mt-7 font-display text-[1.05rem] font-semibold text-ink-900">{block.text}</h3>;
  if (block.type === "ul")
    return (
      <ul className="mb-[18px] ml-5 list-disc space-y-2 text-[15.5px] leading-[1.8] text-ink-500">
        {block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ul>
    );
  if (block.type === "ol")
    return (
      <ol className="mb-[18px] ml-5 list-decimal space-y-2 text-[15.5px] leading-[1.8] text-ink-500">
        {block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ol>
    );
  if (block.type === "callout")
    return (
      <div className="my-7 rounded-r-lg border-l-4 border-leaf-500 bg-leaf-50 p-5">
        <p className="text-[15px] leading-[1.7] text-ink-700" dangerouslySetInnerHTML={{ __html: block.text }} />
      </div>
    );
  if (block.type === "callout-warn")
    return (
      <div className="my-7 rounded-r-lg border-l-4 border-blush-500 bg-blush-50 p-5">
        <p className="text-[15px] leading-[1.7] text-ink-700" dangerouslySetInnerHTML={{ __html: block.text }} />
      </div>
    );
  if (block.type === "steps")
    return (
      <div className="my-4 space-y-3">
        {(block.stepItems || []).map((s, i) => (
          <div key={i} className="flex gap-4 rounded-2xl border border-ink-900/8 bg-white p-5 shadow-panel">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf-600 font-display text-[13px] font-bold text-white">
              {s.n}
            </div>
            <div className="flex-1">
              <div className="font-display text-[15px] font-semibold text-ink-900">{s.title}</div>
              <p className="mt-1.5 text-[14.5px] leading-[1.7] text-ink-500">{s.desc}</p>
              {s.tip && (
                <div className="mt-2.5 rounded-lg border-l-2 border-leaf-500 bg-leaf-50 px-3 py-2 text-[12.5px] font-semibold text-leaf-800">
                  💡 {s.tip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  if (block.type === "img")
    return (
      <img
        src={block.src}
        alt={block.alt || ""}
        className="my-6 w-full rounded-2xl border border-ink-900/8 object-cover"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    );
  return null;
}

export default function CaseStudyDetailClient({ item, notFound }) {
  const reduced = useReducedMotion();
  const [cbOpen, setCbOpen] = useState(false);

  if (notFound || !item) {
    return (
      <main className="flex min-h-screen flex-col bg-mist-50">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <div className="mb-4 text-5xl">📄</div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Case study not found</h1>
          <p className="mt-3 text-ink-500">This case study doesn&apos;t exist or has been removed.</p>
          <a href="/case-studies" className="btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Case Studies
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mist-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden px-2.5 pb-4 pt-2.5 sm:px-4 sm:pb-6 sm:pt-4">
        <div className="scene-3d relative isolate flex min-h-[420px] w-full flex-col justify-end overflow-hidden rounded-[28px] shadow-panel sm:min-h-[52svh] sm:rounded-[40px]">
          <img
            src={item.heroImg || item.img}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div aria-hidden="true" className="absolute inset-0" style={{ background: item.heroGradient || "linear-gradient(180deg, rgba(10,19,16,0.7) 0%, rgba(10,19,16,0.3) 34%, rgba(10,19,16,0.85) 100%)" }} />
          <div className="grain absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 w-full px-6 pb-10 pt-24 sm:px-12 sm:pb-12 md:px-16 lg:max-w-3xl">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-wrap gap-2"
            >
              {[
                { icon: Building2, label: item.sector },
                { icon: MapPin, label: item.location },
                { icon: Calendar, label: item.date },
              ].filter((c) => c.label).map((chip) => (
                <span key={chip.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold text-white/90 backdrop-blur-md">
                  <chip.icon className="h-3 w-3" aria-hidden="true" />
                  {chip.label}
                </span>
              ))}
            </motion.div>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.6rem]"
            >
              {item.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Result stat plinths */}
      {item.results?.length > 0 && (
        <section className="pt-10">
          <div className="container-shell">
            <Stagger as="dl" className="scene-3d grid grid-cols-1 gap-4 sm:grid-cols-3">
              {item.results.map(({ value, label, tone }) => (
                <StaggerItem key={label} className="group">
                  <TiltCard max={12} lift={8} glare className="panel-dark rounded-2xl p-6 text-center">
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <p className={`pop-md tabular font-display text-[2rem] font-bold leading-none ${tone === "blush" ? "text-blush-300" : "text-leaf-300"}`}>
                        {value}
                      </p>
                      <p className="pop-sm mt-2.5 text-[13px] leading-snug text-mist-50/60">{label}</p>
                    </dd>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
          <Reveal>
            {item.highlights?.length > 0 && (
              <div className="panel mb-9 p-7">
                <div className="mb-3.5 flex items-center gap-2">
                  <span className="h-px w-6 bg-leaf-500" />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-leaf-700">At a glance</span>
                </div>
                <ul className="space-y-2.5">
                  {item.highlights.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-ink-700">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-600 text-[10px] font-bold text-white">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.sections?.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="mt-10 mb-4 border-b-2 border-leaf-50 pb-2.5 font-display text-[1.3rem] font-semibold text-ink-900 first:mt-0">
                  {section.heading}
                </h2>
                {section.image && (
                  <figure className="my-6">
                    <img
                      src={section.image}
                      alt={section.imageAlt || section.heading}
                      className="w-full rounded-2xl border border-ink-900/8 object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    {section.imageCaption && (
                      <figcaption className="mt-2 text-[12.5px] text-ink-300">{section.imageCaption}</figcaption>
                    )}
                  </figure>
                )}
                {section.content?.map((block, i) => <ContentBlock key={i} block={block} />)}
              </div>
            ))}

            {item.gallery?.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 border-b-2 border-leaf-50 pb-2.5 font-display text-[1.3rem] font-semibold text-ink-900">Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {item.gallery.map((src, i) => (
                    <RevealScale key={i} delay={i * 0.06} className="overflow-hidden rounded-2xl border border-ink-900/8">
                      <img src={src} alt={`${item.title} — photo ${i + 1}`} className="h-52 w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    </RevealScale>
                  ))}
                </div>
              </div>
            )}

            {item.ctaTitle && (
              <div className="mt-10 rounded-2xl bg-gradient-to-br from-leaf-700 to-leaf-600 p-8">
                <div className="font-display text-[16px] font-bold text-white">{item.ctaTitle}</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-white/85">{item.ctaBody}</p>
                <button
                  type="button"
                  onClick={() => setCbOpen(true)}
                  className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center rounded-full bg-blush-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-blush-600"
                >
                  Talk to an Expert →
                </button>
              </div>
            )}
          </Reveal>

          <aside className="sticky top-28 flex flex-col gap-5">
            {item.toc?.length > 0 && (
              <div className="panel p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-5 bg-leaf-500" />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-leaf-700">Contents</span>
                </div>
                {item.toc.map(({ id, label }) => (
                  <a key={id} href={`#${id}`} className="block rounded-md px-3 py-1.5 text-[13.5px] text-ink-700 transition-all hover:translate-x-0.5 hover:bg-leaf-50 hover:text-leaf-700">
                    {label}
                  </a>
                ))}
              </div>
            )}

            {item.meta?.length > 0 && (
              <div className="rounded-2xl border border-blush-200 bg-blush-50 p-5">
                <div className="mb-3.5 font-display text-[13px] font-bold text-ink-900">Project Info</div>
                {item.meta.map((m, i) => (
                  <div key={m.label} className={`flex justify-between py-2 text-[12.5px] ${i < item.meta.length - 1 ? "border-b border-blush-200" : ""}`}>
                    <span className="text-ink-500">{m.label}</span>
                    <span className="max-w-[55%] text-right font-semibold text-ink-900">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {item.sidebarCta?.title && (
              <div className="rounded-2xl bg-ink-900 p-5">
                <div className="font-display text-[14px] font-bold text-white">{item.sidebarCta.title}</div>
                <p className="mt-2 text-[13px] leading-[1.7] text-white/70">{item.sidebarCta.body}</p>
                <button
                  type="button"
                  onClick={() => setCbOpen(true)}
                  className="mt-4 w-full cursor-pointer rounded-full bg-blush-500 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-blush-600"
                >
                  {item.sidebarCta.btn}
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Related */}
      {item.related?.length > 0 && (
        <section className="pb-20">
          <div className="container-shell">
            <div className="mb-7 flex items-center gap-2.5">
              <span className="h-0.5 w-7 bg-leaf-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf-700">More case studies</span>
            </div>
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {item.related.map((c, i) => (
                <StaggerItem key={i}>
                  <TiltCard
                    max={8}
                    lift={8}
                    glare
                    wrapperClassName="h-full"
                    className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-panel ${c.slug ? "cursor-pointer" : "opacity-70"}`}
                    onClick={() => { if (c.slug) window.location.href = `/case-studies/${c.slug}`; }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={c.img} alt={c.title} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {c.tag && <span className="absolute left-3 top-3 rounded-full bg-leaf-50 px-2.5 py-1 text-[10px] font-bold uppercase text-leaf-800">{c.tag}</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-[14.5px] font-semibold leading-snug text-ink-900">{c.title}</h3>
                      {c.slug && (
                        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-leaf-700">
                          Read case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-mist-50 pb-24">
        <div className="container-shell">
          <div className="edge-leaf-blush relative overflow-hidden rounded-[2rem] bg-ink-0 px-8 py-12 sm:px-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blush-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blush-500" />
                  Start today
                </span>
                <h2 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.15] text-ink-900 sm:text-[2.1rem]">
                  Want results<br /><span className="text-blush-600">like this on your site?</span>
                </h2>
              </div>
              <div className="flex flex-shrink-0 gap-3">
                <button type="button" onClick={() => setCbOpen(true)} className="btn-primary">
                  Get Free Consultation
                </button>
                <a href="/contact" className="btn-ghost">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site-wide final CTA (guide Sec.9) */}
      <CTASection />
      <Footer />
      <CallbackModal open={cbOpen} onClose={() => setCbOpen(false)} />
    </main>
  );
}
