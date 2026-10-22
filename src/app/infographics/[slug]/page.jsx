// Server component — each infographic gets its own shareable URL with
// Open Graph / Twitter tags, so WhatsApp, LinkedIn, X, Facebook etc. show
// an image + title preview card. Data: published API list, local fallback.
import { notFound } from "next/navigation";

import InfographicDetailClient from "./InfographicDetailClient";
import {
  INFOGRAPHICS as FALLBACK,
  SITE_URL,
  getInfographicUrl,
} from "@/lib/infographicsData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const dynamicParams = true;

async function loadInfographics() {
  try {
    const res = await fetch(`${API_URL}/infographics/published`, { next: { revalidate: 60 } });
    const json = await res.json();
    if (json?.success && json.data?.length) return json.data;
  } catch {
    /* use fallback */
  }
  return FALLBACK;
}

async function findItem(slug) {
  const list = await loadInfographics();
  return list.find((i) => i.slug === slug) || FALLBACK.find((i) => i.slug === slug) || null;
}

export async function generateStaticParams() {
  const list = await loadInfographics();
  const seen = new Set();
  return [...list, ...FALLBACK]
    .filter((i) => i.slug && !seen.has(i.slug) && seen.add(i.slug))
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await findItem(slug);
  if (!item) return { title: "Infographic Not Found | KEC CBG Park" };

  const description = `${item.title} — a ${item.category} infographic from KEC CBG Park, published ${item.date}.`;
  const url = getInfographicUrl(slug);

  return {
    metadataBase: new URL(SITE_URL),
    title: `${item.title} | KEC CBG Park`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description,
      url,
      type: "article",
      siteName: "KEC CBG Park",
      locale: "en_IN",
      images: [{ url: item.img, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [item.img],
    },
  };
}

export default async function InfographicPage({ params }) {
  const { slug } = await params;
  const item = await findItem(slug);
  if (!item) notFound();
  return <InfographicDetailClient item={item} />;
}
