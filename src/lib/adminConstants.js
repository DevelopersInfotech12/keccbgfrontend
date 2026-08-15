// Shared design tokens + constants for the admin panel.
// Colours are pulled straight from the site's own Tailwind palette
// (leaf = green, blush = coral) so the admin UI reads as part of the
// same product instead of a bolted-on tool.
export const C = {
  bg: "#F3F6F4",            // mist-100
  sidebar: "#0A1310",        // ink-900
  sidebarHover: "rgba(255,255,255,0.06)",
  sidebarActive: "rgba(33,132,82,0.30)",
  accent: "#218452",         // leaf-600 — primary actions
  accentDark: "#1A6A42",     // leaf-700
  accentLight: "#EAF6EF",    // leaf-50
  coral: "#EC7C62",          // blush-500 — featured / highlight
  coralLight: "#FEF3EF",     // blush-50
  white: "#fff",
  border: "#E6ECE8",         // mist-200
  text: "#0A1310",           // ink-900
  body: "#41544B",           // ink-500
  muted: "#7F8F87",          // ink-300
  success: "#218452", successBg: "#EAF6EF",
  warn: "#B45309", warnBg: "#FEF3DC",
  danger: "#DC2626", dangerBg: "#FEE2E2",
  info: "#1A6A42", infoBg: "#EAF6EF",
  card: "#fff",
  display: "var(--font-display), system-ui, sans-serif",
  sans: "var(--font-inter), system-ui, sans-serif",
};

// ── Blog verticals ───────────────────────────────────────────
// Which public blog section a post belongs to — separate from the
// topic "Tag" below. Every blog must pick exactly one.
export const BLOG_CATEGORIES = [
  { key: "kec-insights", label: "KEC Insights" },
  { key: "bioenergy-brief", label: "The BioEnergy Brief" },
];
export const BLOG_CATEGORY_LABELS = BLOG_CATEGORIES.reduce((m, c) => ({ ...m, [c.key]: c.label }), {});

// ── Blog categories ─────────────────────────────────────────
export const TAGS = ["CBG Basics", "Policy & Incentives", "Feedstock", "Plant Operations", "Sustainability", "Industry News"];

export const TAG_COLORS = {
  "CBG Basics":          { bg: "#EAF6EF", text: "#124B2F" },
  "Policy & Incentives": { bg: "#FEF3EF", text: "#7E3629" },
  "Feedstock":           { bg: "#D2EBDD", text: "#1A6A42" },
  "Plant Operations":    { bg: "#F7EFEB", text: "#1C2C24" },
  "Sustainability":      { bg: "#EAF6EF", text: "#218452" },
  "Industry News":       { bg: "#FBE0D8", text: "#B44E3D" },
};

export const EMPTY_BLOG = {
  title: "", slug: "", excerpt: "", category: "bioenergy-brief", tag: "CBG Basics", date: "", readTime: "5 min read",
  author: "Bio CBG Team", featured: false, status: "draft",
  img: "", heroImg: "",
  heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.94) 0%,rgba(26,106,66,0.80) 100%)",
  tagStyle: { bg: "#EAF6EF", text: "#124B2F" },
  highlights: [], toc: [], meta: [], sections: [], tags: [], related: [],
  sidebarCta: { title: "", body: "", btn: "" },
  ctaTitle: "", ctaBody: "",
  seo: { metaTitle: "", metaDescription: "", metaKeywords: [], ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", noIndex: false, structuredData: "" },
};

// ── Case study sectors ──────────────────────────────────────
export const SECTORS = ["Life Sciences", "Agriculture", "Municipal Waste", "Dairy & Food Processing", "Manufacturing"];

export const SECTOR_COLORS = {
  "Life Sciences":            { bg: "#EAF6EF", text: "#124B2F" },
  "Agriculture":               { bg: "#D2EBDD", text: "#1A6A42" },
  "Municipal Waste":           { bg: "#F7EFEB", text: "#1C2C24" },
  "Dairy & Food Processing":   { bg: "#FBE0D8", text: "#B44E3D" },
  "Manufacturing":             { bg: "#FEF3EF", text: "#7E3629" },
};

export const EMPTY_CASE_STUDY = {
  title: "", slug: "", excerpt: "", sector: "Life Sciences", client: "", location: "", capacity: "",
  date: "", readTime: "4 min read", author: "Bio CBG Team", featured: false, status: "draft",
  img: "", heroImg: "",
  heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.94) 0%,rgba(26,106,66,0.80) 100%)",
  gallery: [],
  highlights: [], results: [], toc: [], meta: [], sections: [], tags: [], related: [],
  sidebarCta: { title: "", body: "", btn: "" },
  ctaTitle: "", ctaBody: "",
  seo: { metaTitle: "", metaDescription: "", metaKeywords: [], ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", noIndex: false, structuredData: "" },
};
