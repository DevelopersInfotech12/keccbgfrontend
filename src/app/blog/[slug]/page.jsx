// /app/blog/[slug]/page.jsx
// Server component — SEO metadata, canonical URLs, server-side data fetch, JSON-LD.

import BlogDetailClient from "./BlogDetailClient";
import { getBlogBySlug, BLOGS } from "@/lib/blogData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://biocbg.com";

// Allow slugs not covered by generateStaticParams to render on-demand
// (new posts added via the admin panel after build, or local fallback slugs).
export const dynamicParams = true;

export async function generateStaticParams() {
  const localSlugs = BLOGS.filter((b) => b.slug).map((b) => ({ slug: b.slug }));
  try {
    const res = await fetch(`${API_URL}/blogs/public/all-slugs`, { next: { revalidate: 86400 } });
    const data = await res.json();
    const apiSlugs = (data.slugs || []).map((slug) => ({ slug }));
    const all = [...localSlugs, ...apiSlugs];
    const seen = new Set();
    return all.filter(({ slug }) => (seen.has(slug) ? false : seen.add(slug)));
  } catch (err) {
    console.error("[blog generateStaticParams] fetch failed:", err);
    return localSlugs;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let blog = null;
  try {
    const res = await fetch(`${API_URL}/blogs/public/${slug}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success) blog = data.data;
  } catch {
    // fall through to local fallback below
  }
  if (!blog) blog = getBlogBySlug(slug);
  if (!blog) return { title: "Article Not Found | Bio CBG" };

  const description = blog.seo?.metaDescription || blog.excerpt || "";
  const image = blog.heroImg || blog.img || `${SITE_URL}/images/logo.png`;
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${blog.title} | Bio CBG`,
    description,
    alternates: { canonical: blog.seo?.canonicalUrl || url },
    openGraph: {
      title: blog.seo?.ogTitle || blog.title,
      description: blog.seo?.ogDescription || description,
      url,
      type: "article",
      siteName: "Bio CBG",
      locale: "en_IN",
      images: [{ url: blog.seo?.ogImage || image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  let blog = null;
  let notFound = false;

  try {
    const res = await fetch(`${API_URL}/blogs/public/${slug}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.data) blog = data.data;
  } catch (err) {
    console.error("[BlogPage] fetch error:", err);
  }

  if (!blog) blog = getBlogBySlug(slug);
  if (!blog) notFound = true;

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        description: blog.seo?.metaDescription || blog.excerpt || "",
        image: blog.heroImg || blog.img,
        datePublished: blog.date,
        dateModified: blog.updatedAt || blog.date,
        author: { "@type": "Organization", name: blog.author || "Bio CBG" },
        publisher: {
          "@type": "Organization",
          name: "Bio CBG",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <BlogDetailClient blog={blog} notFound={notFound} />
    </>
  );
}
