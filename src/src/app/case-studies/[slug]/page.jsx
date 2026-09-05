// /app/case-studies/[slug]/page.jsx
// Server component — SEO metadata, canonical URLs, server-side data fetch, JSON-LD.

import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { getCaseStudyBySlug, CASE_STUDIES } from "@/lib/caseStudyData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://biocbg.com";

export const dynamicParams = true;

export async function generateStaticParams() {
  const localSlugs = CASE_STUDIES.filter((c) => c.slug).map((c) => ({ slug: c.slug }));
  try {
    const res = await fetch(`${API_URL}/case-studies/public/all-slugs`, { next: { revalidate: 86400 } });
    const data = await res.json();
    const apiSlugs = (data.slugs || []).map((slug) => ({ slug }));
    const all = [...localSlugs, ...apiSlugs];
    const seen = new Set();
    return all.filter(({ slug }) => (seen.has(slug) ? false : seen.add(slug)));
  } catch (err) {
    console.error("[case-study generateStaticParams] fetch failed:", err);
    return localSlugs;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let item = null;
  try {
    const res = await fetch(`${API_URL}/case-studies/public/${slug}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success) item = data.data;
  } catch {
    // fall through to local fallback below
  }
  if (!item) item = getCaseStudyBySlug(slug);
  if (!item) return { title: "Case Study Not Found | Bio CBG" };

  const description = item.seo?.metaDescription || item.excerpt || "";
  const image = item.heroImg || item.img || `${SITE_URL}/images/logo.png`;
  const url = `${SITE_URL}/case-studies/${slug}`;

  return {
    title: `${item.title} | Bio CBG Case Studies`,
    description,
    alternates: { canonical: item.seo?.canonicalUrl || url },
    openGraph: {
      title: item.seo?.ogTitle || item.title,
      description: item.seo?.ogDescription || description,
      url,
      type: "article",
      siteName: "Bio CBG",
      locale: "en_IN",
      images: [{ url: item.seo?.ogImage || image, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  let item = null;
  let notFound = false;

  try {
    const res = await fetch(`${API_URL}/case-studies/public/${slug}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.data) item = data.data;
  } catch (err) {
    console.error("[CaseStudyPage] fetch error:", err);
  }

  if (!item) item = getCaseStudyBySlug(slug);
  if (!item) notFound = true;

  const jsonLd = item
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: item.title,
        description: item.seo?.metaDescription || item.excerpt || "",
        image: item.heroImg || item.img,
        datePublished: item.date,
        dateModified: item.updatedAt || item.date,
        author: { "@type": "Organization", name: item.author || "Bio CBG" },
        publisher: {
          "@type": "Organization",
          name: "Bio CBG",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/case-studies/${slug}` },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <CaseStudyDetailClient item={item} notFound={notFound} />
    </>
  );
}
