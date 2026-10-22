"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";

import Header from "@/comp/Header";
import Footer from "@/comp/Footer";
import ShareMenu from "@/comp/ShareMenu";

const ORANGE = "#FF7D44";

export default function InfographicDetailClient({ item }) {
  const [sharing, setSharing] = useState(false);

  return (
    <main className="min-h-screen bg-mist-50">
      <Header light />
      <div className="container-shell pb-20 pt-[calc(96px+2rem)] sm:pt-[calc(104px+3rem)]">
        <Link
          href="/infographics"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-800 hover:text-leaf-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All infographics
        </Link>

        <article className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-3xl border border-ink-900/8 bg-white shadow-lg">
          <img src={item.img} alt={item.title} className="max-h-[70vh] w-full object-cover" />
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[12px] text-ink-300">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {item.date} · {item.category}
            </div>
            <h1 className="mt-2 font-display text-[24px] font-semibold leading-snug text-ink-900">
              {item.title}
            </h1>
            <button
              type="button"
              onClick={() => setSharing(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white"
              style={{ background: ORANGE }}
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              Share this infographic
            </button>
          </div>
        </article>
      </div>
      <Footer />
      <ShareMenu item={sharing ? item : null} onClose={() => setSharing(false)} />
    </main>
  );
}
