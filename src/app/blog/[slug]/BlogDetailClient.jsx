"use client";
// Client component — animation, interactivity. Data comes as props from the
// server component (page.jsx). Structure mirrors siacc's blog detail page
// exactly (flat full-bleed hero band with chips, boxed sidebar panels,
// related-articles grid, CTA band) — recoloured to cbg's own leaf/blush
// palette and Bricolage/Inter fonts instead of siacc's teal/orange/Poppins.

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import Header from "@/comp/Header";
import Footer from "@/comp/Footer";
import CTASection from "@/comp/CTASection";
import TiltCard from "@/comp/ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";
import CallbackModal from "@/comp/CallbackModal";

function ContentBlock({ block }) {
  if (block.type === "p")
    return <p className="mb-[18px] text-justify text-[16px] leading-[1.85] text-ink-500" dangerouslySetInnerHTML={{ __html: block.text }} />;
  if (block.type === "h3")
    return <h3 className="mb-2.5 mt-7 font-display text-[1.05rem] font-semibold text-ink-900">{block.text}</h3>;
  if (block.type === "ul")
    return (
      <ul className="mb-[18px] ml-[22px] space-y-2 text-[15.5px] leading-[1.85] text-ink-500">
        {block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ul>
    );
  if (block.type === "ol")
    return (
      <ol className="mb-[18px] ml-[22px] list-decimal space-y-2 text-[15.5px] leading-[1.85] text-ink-500">
        {block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ol>
    );
  if (block.type === "callout")
    return (
      <div className="my-7 rounded-r-lg border-l-4 border-leaf-500 bg-leaf-50 px-[22px] py-[18px]">
        <p className="text-left text-[15px] leading-[1.7] text-ink-700" dangerouslySetInnerHTML={{ __html: block.text }} />
      </div>
    );
  if (block.type === "callout-warn")
    return (
      <div className="my-7 rounded-r-lg border-l-4 border-blush-500 bg-blush-50 px-[22px] py-[18px]">
        <p className="text-left text-[15px] leading-[1.7] text-ink-700" dangerouslySetInnerHTML={{ __html: block.text }} />
      </div>
    );
  if (block.type === "steps")
    return (
      <div>
        {(block.stepItems || []).map((s, i) => (
          <div key={i} className="mb-3 flex items-start gap-4 rounded-2xl border border-ink-900/8 bg-white px-5 py-[18px] transition-all hover:border-leaf-500 hover:shadow-panel">
            <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-leaf-600 font-display text-[13px] font-bold text-white">
              {s.n}
            </div>
            <div className="flex-1">
              <div className="mb-[5px] font-display text-[15px] font-bold text-leaf-700">{s.title}</div>
              <p className="mb-2 text-[15px] leading-[1.7] text-ink-500">{s.desc}</p>
              {s.tip && (
                <div className="rounded-r-md border-l-[3px] border-leaf-500 bg-leaf-50 px-3 py-[7px]">
                  <span className="font-display text-[12px] font-semibold text-leaf-800">💡 {s.tip}</span>
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
        className="my-5 w-full rounded-lg"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    );
  return null;
}

function getHeroChips(blog) {
  return [
    { icon: "🏷️", label: blog.tag },
    { icon: "📅", label: blog.date },
    { icon: "⏱️", label: blog.readTime },
    { icon: "✍️", label: blog.author },
  ];
}

function HeroTitle({ title }) {
  if (title.includes(" — ")) {
    const [left, right] = title.split(" — ");
    return <>{left} — <span className="text-blush-400">{right}</span></>;
  }
  if (title.includes(": ")) {
    const idx = title.indexOf(": ");
    return <>{title.slice(0, idx)}: <span className="text-blush-400">{title.slice(idx + 2)}</span></>;
  }
  return <>{title}</>;
}

export default function BlogDetailClient({ blog, notFound }) {
  const [cbOpen, setCbOpen] = useState(false);

  if (notFound || !blog) {
    return (
      <main className="flex min-h-screen flex-col bg-mist-50">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <div className="mb-4 text-5xl">📄</div>
          <h1 className="font-display text-[2rem] font-bold text-ink-900">Article Not Found</h1>
          <p className="mb-7 mt-3 text-ink-500">This blog post doesn&apos;t exist or has been removed.</p>
          <a href="/blog" className="btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blog
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  const heroChips = getHeroChips(blog);

  return (
    <main className="min-h-screen bg-mist-50">
      <Header />

      {/* Hero — flat full-bleed band, not a rounded card, matching siacc's
          detail-page hero exactly */}
      <section className="relative min-h-[420px] overflow-hidden border-b border-ink-900/8 pt-16">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 z-[3] w-1" style={{ background: "linear-gradient(to bottom, #EC7C62, #2E9E63)" }} />
        <img
          src={blog.heroImg || blog.img}
          alt={blog.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, rgba(10,19,16,0.88) 0%, rgba(10,19,16,0.72) 60%, rgba(10,19,16,0.30) 100%)" }} />

        <div className="relative z-[2] mx-auto w-full max-w-[1280px] px-5 py-[clamp(48px,7vw,88px)] sm:px-[clamp(20px,4vw,60px)]">
          <Reveal>
            <div className="mb-[22px] inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-[6px] backdrop-blur-md">
              <span className="inline-block h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[#4ade80]" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white">
                {blog.tag} &nbsp;·&nbsp; {blog.date} &nbsp;·&nbsp; {blog.readTime}
              </span>
            </div>
            <h1 className="mb-5 max-w-[760px] font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.08] tracking-[-0.01em] text-white">
              <HeroTitle title={blog.title} />
            </h1>
            <div className="flex flex-wrap gap-2.5">
              {heroChips.map((chip) => (
                <span key={chip.label} className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-[9px] text-[12.5px] font-medium text-white/90 backdrop-blur-md">
                  <span className="text-[15px]">{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[2] h-[3px] bg-leaf-500 opacity-60" />
      </section>

      {/* Article body */}
      <section className="bg-mist-50 px-4 py-[clamp(48px,6vw,80px)] sm:px-[clamp(16px,4vw,48px)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="article-layout grid items-start gap-12 lg:grid-cols-[1fr_300px]">
            {/* Main content */}
            <Reveal>
              {blog.highlights?.length > 0 && (
                <div className="mb-9 rounded-[10px] border border-blush-200 bg-white px-7 py-6">
                  <div className="mb-3.5 flex items-center gap-2">
                    <span className="h-[1.5px] w-[22px] bg-leaf-500" />
                    <span className="font-display text-[10.5px] font-bold uppercase tracking-[0.13em] text-leaf-700">Key Highlights</span>
                  </div>
                  <ul className="list-none space-y-2.5">
                    {blog.highlights.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-ink-700">
                        <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-600">
                          <span className="text-[10px] font-bold text-white">✓</span>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {blog.sections?.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="mb-4 mt-10 border-b-2 border-leaf-50 pb-2.5 font-display text-[1.3rem] font-bold text-ink-900 first:mt-0">
                    {section.heading}
                  </h2>
                  {section.image && (
                    <figure className="my-5">
                      <img
                        src={section.image}
                        alt={section.imageAlt || section.heading}
                        className="w-full rounded-lg object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      {section.imageCaption && <figcaption className="mt-2 text-[12.5px] text-ink-300">{section.imageCaption}</figcaption>}
                    </figure>
                  )}
                  {section.content?.map((block, i) => <ContentBlock key={i} block={block} />)}
                </div>
              ))}

              {blog.ctaTitle && (
                <div className="mt-10 rounded-xl px-8 py-7" style={{ background: "linear-gradient(135deg, #218452 0%, #1A6A42 100%)" }}>
                  <div className="mb-2 font-display text-[16px] font-bold text-white">{blog.ctaTitle}</div>
                  <p className="mb-[18px] text-[14px] leading-[1.7] text-white/85">{blog.ctaBody}</p>
                  <button
                    type="button"
                    onClick={() => setCbOpen(true)}
                    className="rounded-lg bg-blush-500 px-[26px] py-[11px] font-display text-[13.5px] font-semibold text-white transition-colors hover:bg-blush-600"
                  >
                    Talk to an Expert →
                  </button>
                </div>
              )}
            </Reveal>

            {/* Sidebar */}
            <aside className="sidebar sticky top-[100px] flex flex-col gap-5">
              {blog.toc?.length > 0 && (
                <div className="rounded-[10px] border border-ink-900/8 bg-white p-[22px]">
                  <div className="mb-3.5 flex items-center gap-2">
                    <span className="h-[1.5px] w-5 bg-leaf-500" />
                    <span className="font-display text-[10.5px] font-bold uppercase tracking-[0.12em] text-leaf-700">Contents</span>
                  </div>
                  {blog.toc.map(({ id, label }) => (
                    <a key={id} href={`#${id}`} className="block rounded-md px-3 py-[7px] text-[13.5px] text-ink-700 transition-all hover:translate-x-1 hover:bg-leaf-50 hover:text-leaf-700">
                      {label}
                    </a>
                  ))}
                </div>
              )}

              {blog.meta?.length > 0 && (
                <div className="rounded-[10px] border border-blush-200 bg-blush-50 p-[22px]">
                  <div className="mb-3.5 font-display text-[13px] font-bold text-ink-900">Article Info</div>
                  {blog.meta.map((item, i) => (
                    <div key={item.label} className={`flex justify-between py-[9px] ${i < blog.meta.length - 1 ? "border-b border-blush-200" : ""}`}>
                      <span className="text-[12.5px] text-ink-500">{item.label}</span>
                      <span className="max-w-[55%] text-right font-display text-[12.5px] font-semibold text-ink-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {blog.sidebarCta?.title && (
                <div className="rounded-[10px] bg-[#1F6F54] p-[22px]">
                  <div className="mb-2 font-display text-[14px] font-bold text-white">{blog.sidebarCta.title}</div>
                  <p className="mb-4 text-[13px] leading-[1.7] text-white">{blog.sidebarCta.body}</p>
                  <button
                    type="button"
                    onClick={() => setCbOpen(true)}
                    className="w-full rounded-lg bg-blush-500 py-[11px] font-display text-[13px] font-semibold text-white transition-colors hover:bg-blush-600"
                  >
                    {blog.sidebarCta.btn}
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {blog.related?.length > 0 && (
        <section className="bg-white px-4 py-[clamp(32px,4vw,56px)] sm:px-[clamp(16px,4vw,48px)]">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-7">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="h-0.5 w-7 bg-leaf-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf-700">Keep Reading</span>
              </div>
              <h2 className="font-display text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-ink-900">Related Articles</h2>
            </div>

            <Stagger className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
              {blog.related.map((article, i) => (
                <StaggerItem key={i}>
                  <TiltCard
                    max={8}
                    lift={8}
                    glare
                    wrapperClassName="h-full"
                    className={`group relative overflow-hidden rounded-[14px] border border-ink-900/8 bg-white transition-all ${article.slug ? "cursor-pointer hover:border-leaf-500 hover:shadow-panel" : "opacity-70"}`}
                    onClick={() => { if (article.slug) window.location.href = `/blog/${article.slug}`; }}
                  >
                    <div className="relative h-[172px] overflow-hidden">
                      <img src={article.img} alt={article.title} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                      <span className="absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.07em] backdrop-blur" style={{ background: article.tagBg || "#EAF6EF", color: article.tagColor || "#124B2F" }}>
                        {article.tag}
                      </span>
                      <span className="absolute bottom-2.5 left-3.5 text-[11px] font-medium text-white/85">{article.date}</span>
                      {!article.slug && (
                        <span className="absolute right-3 top-3 rounded bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white">Coming soon</span>
                      )}
                    </div>
                    <div className="px-[18px] pb-[18px] pt-4">
                      <h3 className="mb-3 font-display text-[14.5px] font-semibold leading-snug text-ink-900">{article.title}</h3>
                      {article.slug && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12.5px] font-semibold text-leaf-700">Read article</span>
                          <span className="text-leaf-700">→</span>
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
      <section className="border-y border-blush-200 bg-blush-50 px-4 py-20 sm:px-[clamp(16px,5vw,56px)]">
        <div className="mx-auto max-w-[1100px]">
          <div className="cta-split grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[1.5px] w-7 bg-leaf-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf-700">Start Today</span>
              </div>
              <h2 className="mb-3.5 font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.01em] text-ink-900">
                Begin Your Bio CBG<br />Journey Today
              </h2>
              <p className="text-[16px] leading-[1.8] text-ink-500">
                Free consultation. Clear timeline. Transparent pricing.<br />Our experts respond within 2 hours.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <button
                type="button"
                onClick={() => setCbOpen(true)}
                className="whitespace-nowrap rounded-md bg-blush-500 px-9 py-[14px] font-display text-sm font-semibold text-white transition-colors hover:bg-leaf-600"
              >
                Get Free Consultation
              </button>
              <a
                href="tel:+918527626868"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ink-900/12 bg-white px-7 py-[13px] font-body text-sm font-medium text-ink-900 transition-colors hover:border-leaf-500"
              >
                📞 +91-8527626868
              </a>
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
