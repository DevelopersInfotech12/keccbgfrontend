"use client";
// Public blog listing — a news-homepage layout: one lead story + a
// secondary-stories rail, a double-image feature band, then a "Latest
// Articles" grid. Deliberately data-dense rather than editorial/magazine —
// this is the layout style, the detail page (BlogDetailClient.jsx) is
// styled to match siacc's dashboard-card article template instead.

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

import Header from "@/comp/Header";
import Footer from "@/comp/Footer";
import CTASection from "@/comp/CTASection";
import InsightsNewsletters from "@/comp/InsightsNewsletters";
import { Reveal, Stagger, StaggerItem } from "@/comp/motion/Reveal";
import { BLOGS as FALLBACK_BLOGS, tagColors } from "@/lib/blogData";
import OtherHero from "@/comp/OtherHero";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const CATEGORIES = ["All", ...Object.keys(tagColors)];

// color den — swap here, whole page follow
const TAG_FALLBACK = "#218452";
const INK_900 = "#0A1310";
const LEAF_DARK = "#1A6A42";
const LEAF_LIGHT = "#2E9E63";

function TagLabel({ tag }) {
  const color = tagColors[tag]?.text || TAG_FALLBACK;
  return (
    <span className="font-display text-[12.5px] font-bold" style={{ color }}>
      {tag}
    </span>
  );
}

function Avatar({ name }) {
  const initial = (name || "B").trim().charAt(0).toUpperCase();
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf-600 font-display text-[12px] font-bold text-white">
      {initial}
    </span>
  );
}

function Byline({ author, sub }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar name={author} />
      <div className="leading-tight">
        {author && <div className="text-[13px] font-semibold text-ink-900">{author}</div>}
        <div className="text-[12px] text-ink-300">{sub}</div>
      </div>
    </div>
  );
}

// Compact right-column row: text on the left, small thumbnail on the right.
function SecondaryStoryRow({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="group flex items-center gap-4 border-b border-ink-900/8 py-6 first:pt-0 last:border-b-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <TagLabel tag={post.tag} />
        <h4 className="mt-1.5 line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-leaf-700">
          {post.title}
        </h4>
        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-300">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {post.readTime}
        </div>
      </div>
      <div className="h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-32">
        <img
          src={post.img}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
    </a>
  );
}

// Big image tile, dark-gradient bottom, headline overlaid. Used for the
// "double feature" band between the top story and the latest-articles grid.
function MiddleFeatureCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="group relative block aspect-[16/11] overflow-hidden rounded-2xl">
      <img
        src={post.img}
        alt={post.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${INK_900}0d 0%, ${INK_900}26 45%, ${INK_900}d1 100%)` }} />
      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-bold backdrop-blur">
        <span style={{ color: tagColors[post.tag]?.text || TAG_FALLBACK }}>{post.tag}</span>
        <span className="text-ink-300">· {post.readTime}</span>
      </div>
      <h3 className="absolute inset-x-4 bottom-4 font-display text-[17px] font-bold leading-snug text-white sm:text-[19px]">
        {post.title}
      </h3>
    </a>
  );
}

function LatestCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl">
        <img
          src={post.img}
          alt={post.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <div className="mt-3">
        <Byline author={post.author} sub={post.date} />
        <h4 className="mt-2.5 line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-leaf-700">
          {post.title}
        </h4>
        <div className="mt-2 flex items-center gap-1.5 text-[12px]">
          <TagLabel tag={post.tag} />
          <span className="text-ink-300">· {post.readTime}</span>
        </div>
      </div>
    </a>
  );
}

export default function BlogScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allBlogs, setAllBlogs] = useState(FALLBACK_BLOGS);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/published`, { cache: "no-store" });
        const data = await res.json();
        // Trust the backend the moment it answers, even with an empty list —
        // only the local dummy content stays up if the request itself fails.
        if (data.success) setAllBlogs(data.data || []);
      } catch {
        // keep local fallback content
      }
    })();
  }, []);

  const filtered = useMemo(
    () => (activeCategory === "All" ? allBlogs : allBlogs.filter((p) => p.tag === activeCategory)),
    [activeCategory, allBlogs]
  );

  const featured = filtered[0] || null;
  const rest = filtered.slice(1);
  const secondary = rest.slice(0, 4);
  const remainder = rest.slice(4);
  // The double-image band only looks right in pairs — a lone leftover post
  // rendering alone as one oversized tile looked broken, so it now falls
  // through to the Latest Articles grid instead, where a single card is
  // completely normal.
  const middleBand = remainder.length >= 2 ? remainder.slice(0, 2) : [];
  const latest = remainder.length >= 2 ? remainder.slice(2) : remainder;

  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <OtherHero
        bgImage="/images/kechero.png"
        eyebrow="Insights & Articles"
        title="Insights Shaping India's Bio-CNG Future"
        subtitle="Explore perspectives, industry trends and insights driving India's clean energy transition."
        cta={{ label: "Know More", href: "/contact" }}
      />
      {/* <div className="pt-[calc(96px+1.5rem)] sm:pt-[calc(104px+2rem)]" /> */}

      {/* Content Guide Sec.7 — both newsletter options, clearly visible */}
      <div className="mt-16">
        <InsightsNewsletters />
      </div>


      {/* Category filters */}
      <div className="container-shell mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const on = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative inline-flex min-h-[38px] cursor-pointer items-center rounded-full px-4 text-[13px] font-semibold transition-all duration-300 ${on ? "text-white shadow-lift" : "border border-ink-900/12 bg-white text-ink-800 hover:border-leaf-500 hover:text-leaf-700"
                  }`}
                style={on ? { background: `linear-gradient(120deg, ${LEAF_DARK}, ${LEAF_LIGHT})` } : undefined}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="container-shell py-24 text-center text-ink-300">No articles yet in this category — check back soon.</div>
      ) : (
        <>
          {/* Top story + secondary rail */}
          <section className="pb-14">
            <div className="container-shell grid gap-10 lg:grid-cols-[1fr_360px]">
              {featured && (
                <Reveal>
                  <Byline author={featured.author} sub="Author" />
                  <a href={`/blog/${featured.slug}`} className="group mt-4 block">
                    <h1 className="font-display text-[1.7rem] font-bold leading-[1.15] text-ink-900 transition-colors group-hover:text-leaf-700 sm:text-[2.1rem]">
                      {featured.title}
                    </h1>
                  </a>
                  <div className="mt-3 flex items-center gap-2 text-[13px]">
                    <TagLabel tag={featured.tag} />
                    <span className="text-ink-300">· {featured.readTime}</span>
                  </div>
                  <a href={`/blog/${featured.slug}`} className="group mt-6 block overflow-hidden rounded-2xl">
                    <img
                      src={featured.img}
                      alt={featured.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </a>
                </Reveal>
              )}

              {secondary.length > 0 && (
                <div className="flex h-full flex-col justify-between lg:pt-[52px]">
                  {secondary.map((post) => <SecondaryStoryRow key={post.slug} post={post} />)}
                </div>
              )}
            </div>
          </section>

          {/* Double-image feature band */}
          {middleBand.length > 0 && (
            <section className="pb-16">
              <div className="container-shell">
                <Stagger className={`grid gap-5 ${middleBand.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {middleBand.map((post) => (
                    <StaggerItem key={post.slug}>
                      <MiddleFeatureCard post={post} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </section>
          )}

          {/* Latest articles grid */}
          {latest.length > 0 && (
            <section className="pb-24">
              <div className="container-shell">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="font-display text-[1.4rem] font-bold text-ink-900">Latest Articles</h2>
                  <a href="/blog" className="group inline-flex items-center gap-1 text-[13px] font-semibold text-leaf-700">
                    Show More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
                <motion.div layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {latest.map((post) => (
                      <motion.div key={post.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <LatestCard post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Site-wide final CTA (guide Sec.9) */}
      <CTASection />
      <Footer />
    </main>
  );
}