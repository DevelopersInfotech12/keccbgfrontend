// src/lib/blogData.js
// Local fallback content for the Blog section. Used two ways:
//  1. generateStaticParams()/detail pages fall back to this if the backend
//     is unreachable or a slug isn't in the DB yet.
//  2. Gives the site real content to ship with on day one, before anyone
//     has posted through the admin panel.
// Once posts exist in MongoDB (via /admin/blogs), the backend list always
// wins — this file is a safety net, not the source of truth.
import { IMG } from "@/lib/images";

export const tagColors = {
  "CBG Basics":          { bg: "#EAF6EF", text: "#124B2F" },
  "Policy & Incentives": { bg: "#FEF3EF", text: "#7E3629" },
  "Feedstock":           { bg: "#D2EBDD", text: "#1A6A42" },
  "Plant Operations":    { bg: "#F7EFEB", text: "#1C2C24" },
  "Sustainability":      { bg: "#EAF6EF", text: "#218452" },
  "Industry News":       { bg: "#FBE0D8", text: "#B44E3D" },
};

export const BLOGS = [
  {
    slug: "what-is-bio-cbg-beginners-guide",
    category: "bioenergy-brief",
    tag: "CBG Basics",
    date: "March 3, 2026",
    readTime: "6 min read",
    featured: true,
    title: "What Is Bio-CBG? A Beginner's Guide to Compressed Biogas",
    excerpt:
      "Compressed Biogas is quietly becoming India's most practical route to carbon-negative fuel. Here's how a Bio-CBG plant actually turns organic waste into pipeline-grade gas.",
    img: IMG.industrialPlant,
    heroImg: IMG.industrialPlant,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(26,106,66,0.82) 100%)",
    tagStyle: { bg: "#EAF6EF", text: "#124B2F" },
    author: "Bio CBG Team",
    toc: [
      { id: "what-is-cbg", label: "What is CBG?" },
      { id: "how-it-works", label: "How a plant works" },
      { id: "why-carbon-negative", label: "Why it's carbon-negative" },
      { id: "getting-started", label: "Getting started" },
    ],
    meta: [
      { label: "Category", value: "CBG Basics" },
      { label: "Published", value: "March 3, 2026" },
      { label: "Read Time", value: "6 min read" },
    ],
    sidebarCta: { title: "Considering a plant?", body: "Talk to our team about feedstock, site and timelines for a Bio CBG plant tailored to you.", btn: "Get Free Consultation →" },
    highlights: [
      "CBG is chemically identical to natural gas — usable in existing pipelines and vehicles",
      "A typical plant turns 100 t/day of organic waste into ~4–5 t/day of CBG",
      "Digestate byproduct doubles as a high-grade organic fertiliser",
    ],
    sections: [
      {
        id: "what-is-cbg",
        heading: "What is CBG?",
        content: [
          { type: "p", text: "<strong>Compressed Biogas (CBG)</strong> is biogas — produced by anaerobic digestion of organic waste — that has been purified (mainly by scrubbing out CO₂ and H₂S) and compressed to match the specification of standard CNG. Once purified, it's functionally identical to fossil natural gas." },
          { type: "p", text: "That's the point: CBG doesn't need new pipelines, new vehicles, or new burners. It drops directly into infrastructure that already exists — which is a large part of why it scales faster than most other renewable fuels." },
        ],
      },
      {
        id: "how-it-works",
        heading: "How a Bio-CBG plant works",
        content: [
          { type: "steps", stepItems: [
            { n: "1", title: "Feedstock intake", desc: "Agricultural residue, cattle dung, municipal organic waste, or press-mud is collected and sorted.", tip: "Feedstock mix determines gas yield — it's the first thing we model on-site." },
            { n: "2", title: "Anaerobic digestion", desc: "Feedstock ferments in oxygen-free digester tanks for 20–30 days, producing raw biogas (~55–60% methane)." },
            { n: "3", title: "Upgrading", desc: "Raw biogas passes through a scrubbing system that strips CO₂ and H₂S, concentrating methane to 95%+." },
            { n: "4", title: "Compression & delivery", desc: "Purified gas is compressed to CNG-equivalent pressure and either piped to site or filled into cascades for transport." },
          ]},
          { type: "img", src: IMG.engineer, alt: "Engineers inspecting a Bio-CBG upgrading skid" },
        ],
      },
      {
        id: "why-carbon-negative",
        heading: "Why it's carbon-negative, not just carbon-neutral",
        image: IMG.foggyValley,
        imageAlt: "Farmland where crop residue would otherwise be open-burned",
        imageCaption: "Diverted methane — not the CO₂ from combustion — is where most of the climate benefit comes from.",
        content: [
          { type: "p", text: "Burning CBG releases CO₂ — same as any combustion. What makes the lifecycle carbon-negative is what <em>doesn't</em> happen upstream: the organic waste that would have released methane in open dumps or through crop-residue burning (both far worse greenhouse gases than CO₂) is instead captured and converted." },
          { type: "callout", text: "Methane traps roughly 28–34x more heat than CO₂ over a 100-year horizon. Capturing it before it escapes is where most of a CBG plant's climate benefit actually comes from." },
          { type: "ul", items: [
            "Diverted methane emissions from open dumping or field burning",
            "Displaced fossil CNG/LPG demand at the point of use",
            "Digestate replacing synthetic fertiliser, cutting its production emissions too",
          ]},
        ],
      },
      {
        id: "getting-started",
        heading: "Getting started",
        content: [
          { type: "p", text: "Every project starts the same way: a feedstock and site assessment, followed by a feasibility model covering capacity, offtake and payback. If you're evaluating a plant for your site or feedstock stream, that's exactly what our team walks through first." },
        ],
      },
    ],
    ctaTitle: "Thinking about a plant on your site?",
    ctaBody: "We handle development, financing, engineering and long-term operation — talk to us before you scope anything internally.",
    related: [],
  },
  {
    slug: "cbg-policy-incentives-india-2026",
    category: "kec-insights",
    tag: "Policy & Incentives",
    date: "February 14, 2026",
    readTime: "7 min read",
    featured: false,
    title: "CBG Policy & Incentives in India — What's Actually Changed in 2026",
    excerpt:
      "SATAT, the CBG-CGD synchronisation scheme, and state-level subsidies have all moved this year. Here's a practical read of what's live now and what it means for new plants.",
    img: IMG.solarField,
    heroImg: IMG.solarField,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(180,78,61,0.55) 100%)",
    tagStyle: { bg: "#FEF3EF", text: "#7E3629" },
    author: "Bio CBG Team",
    toc: [
      { id: "satat", label: "SATAT scheme status" },
      { id: "cgd-sync", label: "CBG–CGD synchronisation" },
      { id: "state-incentives", label: "State-level incentives" },
      { id: "practical-read", label: "What it means for you" },
    ],
    meta: [
      { label: "Category", value: "Policy & Incentives" },
      { label: "Published", value: "February 14, 2026" },
      { label: "Read Time", value: "7 min read" },
    ],
    sidebarCta: { title: "Need the incentive math?", body: "We model the applicable subsidies and offtake pricing into every feasibility study — free of charge.", btn: "Get Free Consultation →" },
    highlights: [
      "Central viability-gap funding remains available for new CBG capacity",
      "City Gas Distribution networks are now required to blend a rising share of CBG",
      "Several states run additional capital subsidies on top of the central scheme",
    ],
    sections: [
      {
        id: "satat",
        heading: "SATAT scheme — where it stands",
        content: [
          { type: "p", text: "The Sustainable Alternative Towards Affordable Transportation (SATAT) initiative remains the backbone of India's CBG push, with oil marketing companies contracted to purchase CBG at a fixed price for a fixed offtake volume. New entrants should confirm the current offtake price band with the relevant OMC before finalising a feasibility model — it is periodically revised." },
        ],
      },
      {
        id: "cgd-sync",
        heading: "CBG–CGD synchronisation",
        content: [
          { type: "p", text: "City Gas Distribution (CGD) licensees are now expected to source a rising minimum share of their supply as CBG, injected directly into their networks rather than only sold as standalone cylinders. For plant developers near an existing CGD network, this materially widens the offtake options beyond the OMC contract alone." },
          { type: "callout-warn", text: "Grid-injection quality specs are stricter than cylinder-fill specs — confirm the local CGD's exact gas-quality requirements before sizing your upgrading skid." },
        ],
      },
      {
        id: "state-incentives",
        heading: "State-level incentives worth checking",
        content: [
          { type: "ul", items: [
            "Capital subsidy on plant and machinery, varies by state",
            "Stamp duty exemption on land purchase for the plant",
            "Electricity duty exemption during the project's early operating years",
            "Priority allotment of government/municipal feedstock contracts",
          ]},
        ],
      },
      {
        id: "practical-read",
        heading: "What this means in practice",
        content: [
          { type: "p", text: "Stack central viability-gap support, a state capital subsidy, and a CGD offtake agreement together and the project economics shift meaningfully compared to a plant relying on the OMC contract alone. Which combination applies depends entirely on your state and feedstock — that's the first thing we map out with any new site." },
        ],
      },
    ],
    ctaTitle: "Not sure which incentives apply to your site?",
    ctaBody: "Send us your state and feedstock type — we'll map the applicable schemes before you commit to anything.",
    related: [],
  },
  {
    slug: "feedstock-selection-guide-anaerobic-digestion",
    category: "bioenergy-brief",
    tag: "Feedstock",
    date: "January 22, 2026",
    readTime: "5 min read",
    featured: false,
    title: "Choosing the Right Feedstock for an Anaerobic Digestion Plant",
    excerpt:
      "Gas yield, seasonality, and contract stability all trace back to one decision made before a plant is even designed: what you feed it.",
    img: IMG.cropRows,
    heroImg: IMG.cropRows,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(26,106,66,0.82) 100%)",
    tagStyle: { bg: "#D2EBDD", text: "#1A6A42" },
    author: "Bio CBG Team",
    toc: [
      { id: "common-feedstocks", label: "Common feedstocks" },
      { id: "yield-vs-stability", label: "Yield vs. supply stability" },
      { id: "blending", label: "Why blending usually wins" },
    ],
    meta: [
      { label: "Category", value: "Feedstock" },
      { label: "Published", value: "January 22, 2026" },
      { label: "Read Time", value: "5 min read" },
    ],
    sidebarCta: { title: "Have a feedstock stream in mind?", body: "We'll run a gas-yield estimate on your specific feedstock mix before you commit to anything.", btn: "Get Free Consultation →" },
    highlights: [
      "Press mud and cattle dung give the most stable, year-round supply",
      "Crop residue offers high yield but is seasonal and needs storage",
      "Municipal organic waste requires more upfront sorting infrastructure",
    ],
    sections: [
      {
        id: "common-feedstocks",
        heading: "The common feedstock options",
        content: [
          { type: "ul", items: [
            "<strong>Press mud</strong> — sugar mill byproduct, reliable supply near sugar belts",
            "<strong>Cattle dung</strong> — consistent year-round, common in dairy-heavy regions",
            "<strong>Crop residue</strong> — paddy straw, corn stover — high yield, seasonal",
            "<strong>Municipal solid waste (organic fraction)</strong> — large volume, needs sorting",
          ]},
        ],
      },
      {
        id: "yield-vs-stability",
        heading: "Yield vs. supply stability",
        content: [
          { type: "p", text: "Crop residue tends to produce the highest biogas yield per tonne, but arrives in a narrow harvest window — which means either a large storage footprint or a supply contract that bridges the off-season. Press mud and cattle dung yield less per tonne but arrive consistently, which is usually worth more to plant economics than the higher peak yield." },
        ],
      },
      {
        id: "blending",
        heading: "Why blending usually wins",
        content: [
          { type: "p", text: "Most well-run plants don't pick one feedstock — they blend two or three to smooth out seasonality while keeping average yield high. A typical mix pairs a stable base load (dung or press mud) with a seasonal high-yield addition (crop residue) during harvest windows." },
          { type: "callout", text: "The right blend is site-specific. It depends on what's actually available within an economical trucking radius — not on which feedstock has the best yield on paper." },
        ],
      },
    ],
    ctaTitle: "Want a yield estimate for your feedstock?",
    ctaBody: "Tell us what's available near your site and we'll model the expected gas output before any commitment.",
    related: [],
  },
];

export function getBlogBySlug(slug) {
  return BLOGS.find((b) => b.slug === slug) || null;
}

export const featuredBlog = BLOGS.find((b) => b.featured);
export const gridPosts = BLOGS.filter((b) => !b.featured);
