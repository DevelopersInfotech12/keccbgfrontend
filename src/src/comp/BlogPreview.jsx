"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import TiltCard from "@/comp/ui/TiltCard";
import { Stagger, StaggerItem } from "@/comp/motion/Reveal";
import { BLOGS as FALLBACK_BLOGS, tagColors } from "@/lib/blogData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

export default function BlogPreview() {
  const [posts, setPosts] = useState(FALLBACK_BLOGS.slice(0, 3));

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/published`, { cache: "no-store" });
        const data = await res.json();
        if (data.success) setPosts((data.data || []).slice(0, 3));
      } catch {
        // keep local fallback content
      }
    })();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-mist-50 pb-24 ">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(46,158,99,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(236,124,98,0.12) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="KEC Insights"
            accent="leaf"
            title="The BioEnergy"
            titleAccent="Brief."
            className="max-w-lg"
          />

          {/* Desktop-only top button */}
          <Link
            href="/blog"
            className="group hidden md:inline-flex min-h-[42px] shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white bg-white/70 px-5 text-[13.5px] font-semibold text-white transition-all duration-300 hover:border-leaf-500 hover:text-leaf-700"
            style={{ background: ORANGE }}
          >
            View all articles
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const tc = tagColors[post.tag] || { bg: "#EAF6EF", text: "#124B2F" };
            return (
              <StaggerItem key={post.slug} className="group">
                <TiltCard
                  max={9}
                  lift={10}
                  glare
                  wrapperClassName="h-full"
                  className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-0"
                  style={{
                    boxShadow: i % 2 === 0
                      ? "0 2px 6px rgba(10,19,16,0.05), 20px 30px 54px -22px rgba(46,158,99,0.5)"
                      : "0 2px 6px rgba(10,19,16,0.05), 20px 30px 54px -22px rgba(236,124,98,0.45)",
                  }}
                  onClick={() => { window.location.href = `/blog/${post.slug}`; }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,19,16,0) 45%, rgba(10,19,16,0.55) 100%)" }} />
                    <span
                      className="pop-sm absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em]"
                      style={{ background: tc.bg, color: tc.text }}
                    >
                      {post.tag}
                    </span>
                  </div>

                  <div className="pop-sm flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-1.5 text-[11.5px] text-ink-300">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.readTime}
                    </div>
                    <h3 className="mt-2 font-display text-[17px] font-semibold leading-snug text-ink-900">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-ink-500 line-clamp-2">{post.excerpt}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-ink-900/8 pt-4">
                      <span className="text-[13px] font-semibold text-ink-800">Read article</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-500 text-white transition-all duration-300 group-hover:bg-blush-600 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Mobile-only button, below grid, small width */}
        <Link
          href="/blog"
          className="group mt-8 flex md:hidden mx-auto w-fit cursor-pointer items-center gap-2 rounded-full border border-white bg-white/70 px-4 py-2 text-[12.5px] font-semibold text-white transition-all duration-300 hover:border-leaf-500 hover:text-leaf-700"
          style={{ background: ORANGE }}
        >
          View all articles
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}