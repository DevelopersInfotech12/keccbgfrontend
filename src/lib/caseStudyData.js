// src/lib/caseStudyData.js
// Local fallback content for the Case Study section — same role as
// blogData.js: a safety net for generateStaticParams()/detail pages and
// real launch content before anything exists in MongoDB.
//
// NOTE: the first entry ("unsubsidised-bio-cbg-plant-life-sciences") is the
// exact case study already featured on the homepage (see CaseStudy.jsx) —
// its slug is what that section's "Read the case study" link points to.
import { IMG } from "@/lib/images";

export const sectorColors = {
  "Life Sciences":            { bg: "#EAF6EF", text: "#124B2F" },
  "Agriculture":               { bg: "#D2EBDD", text: "#1A6A42" },
  "Municipal Waste":           { bg: "#F7EFEB", text: "#1C2C24" },
  "Dairy & Food Processing":   { bg: "#FBE0D8", text: "#B44E3D" },
  "Manufacturing":             { bg: "#FEF3EF", text: "#7E3629" },
};

export const CASE_STUDIES = [
  {
    slug: "unsubsidised-bio-cbg-plant-life-sciences",
    title: "Pioneering the Region's First Unsubsidised Bio-CBG Plant",
    excerpt:
      "A dedicated plant now supplies renewable gas equivalent to a significant share of the site's total gas consumption — cutting emissions without a single change to existing infrastructure.",
    sector: "Life Sciences",
    client: "Life-sciences manufacturer (name withheld under NDA)",
    location: "Western India",
    capacity: "70% of site gas demand",
    date: "November 2025",
    readTime: "4 min read",
    featured: true,
    img: "/images/cbgcasestudy.png",
    heroImg: "/images/cbgcasestudy.png",
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(26,106,66,0.82) 100%)",
    gallery: [IMG.industrialPlant, IMG.engineer],
    results: [
      { value: "70%", label: "of site gas demand met", tone: "leaf" },
      { value: "12k t", label: "CO₂e avoided / year", tone: "blush" },
      { value: "100%", label: "unsubsidised delivery", tone: "blush" },
    ],
    toc: [
      { id: "challenge", label: "The challenge" },
      { id: "approach", label: "Our approach" },
      { id: "results", label: "Results" },
    ],
    meta: [
      { label: "Sector", value: "Life Sciences" },
      { label: "Location", value: "Western India" },
      { label: "Commissioned", value: "November 2025" },
      { label: "Model", value: "Fully unsubsidised" },
    ],
    sidebarCta: { title: "Considering something similar?", body: "We'll assess your site's gas demand and feedstock access at no cost.", btn: "Get Free Consultation →" },
    highlights: [
      "No changes required to the client's existing gas infrastructure",
      "First plant of its kind in the region built without subsidy support",
      "Delivered on a fixed-price, fixed-timeline development contract",
    ],
    sections: [
      { id: "challenge", heading: "The challenge", content: [
        { type: "p", text: "The client, a life-sciences manufacturer with continuous, high-volume gas demand, wanted to cut emissions without touching a single piece of existing plant infrastructure or accepting any risk on gas supply continuity." },
      ]},
      { id: "approach", heading: "Our approach", content: [
        { type: "steps", stepItems: [
          { n: "1", title: "Site & demand assessment", desc: "Mapped the client's exact gas consumption profile and feedstock available within an economical radius." },
          { n: "2", title: "Financing & development", desc: "Structured and financed the plant without relying on central or state subsidy support." },
          { n: "3", title: "Engineering & build", desc: "Designed for direct pipeline injection matching the client's existing gas specification exactly." },
          { n: "4", title: "Commissioning", desc: "Brought the plant online with zero disruption to the client's ongoing operations." },
        ]},
      ]},
      { id: "results", heading: "Results", content: [
        { type: "p", text: "The plant now supplies renewable gas equivalent to 70% of the site's total gas consumption, avoiding roughly 12,000 tonnes of CO₂e annually — delivered entirely without subsidy." },
      ]},
    ],
    ctaTitle: "Want a plant like this on your site?",
    ctaBody: "We handle development, financing, engineering and long-term operation end to end.",
    related: [],
  },
  {
    slug: "gujarat-agri-digester-cluster-dairy-cooperative",
    title: "A Feedstock Cluster Model for a Gujarat Dairy Cooperative",
    excerpt:
      "Pooling cattle-dung feedstock across a cooperative of small dairy farms to feed one shared digester cluster — turning a logistics problem into a stable fuel supply.",
    sector: "Dairy & Food Processing",
    client: "Regional dairy cooperative",
    location: "Anand, Gujarat",
    capacity: "40,000 t/yr feedstock",
    date: "August 2025",
    readTime: "4 min read",
    featured: false,
    img: IMG.cropRows,
    heroImg: IMG.cropRows,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(26,106,66,0.82) 100%)",
    gallery: [IMG.greenhouse, IMG.ricePaddy],
    results: [
      { value: "40k t", label: "feedstock processed / yr", tone: "leaf" },
      { value: "220+", label: "member farms supplying", tone: "blush" },
      { value: "9 t/day", label: "CBG output", tone: "leaf" },
    ],
    toc: [
      { id: "challenge", label: "The challenge" },
      { id: "approach", label: "Our approach" },
      { id: "results", label: "Results" },
    ],
    meta: [
      { label: "Sector", value: "Dairy & Food Processing" },
      { label: "Location", value: "Anand, Gujarat" },
      { label: "Commissioned", value: "August 2025" },
      { label: "Feedstock", value: "Cattle dung, pooled" },
    ],
    sidebarCta: { title: "Running a cooperative or cluster?", body: "We design pooled-feedstock logistics for multi-farm digester clusters.", btn: "Get Free Consultation →" },
    highlights: [
      "Pooled feedstock logistics across 220+ member dairy farms",
      "Digestate returned to member farms as organic fertiliser",
      "Cooperative structure shares plant revenue back to supplying farms",
    ],
    sections: [
      { id: "challenge", heading: "The challenge", content: [
        { type: "p", text: "No single farm in the cooperative produced enough dung to justify its own digester. The opportunity only existed if supply could be pooled reliably across 200+ small farms without the logistics collapsing under its own complexity." },
      ]},
      { id: "approach", heading: "Our approach", content: [
        { type: "p", text: "We designed a collection-route model and a shared digester cluster sized to the cooperative's aggregate supply, with a revenue-sharing structure that returns both cash and digestate fertiliser back to contributing farms." },
      ]},
      { id: "results", heading: "Results", content: [
        { type: "p", text: "The cluster now processes 40,000 tonnes of feedstock a year from over 220 member farms, producing 9 tonnes/day of CBG while returning organic fertiliser to every contributing farm." },
      ]},
    ],
    ctaTitle: "Have a farmer cooperative or cluster in mind?",
    ctaBody: "We'll model the pooled-feedstock logistics before anything is committed.",
    related: [],
  },
  {
    slug: "punjab-straw-to-gas-park-stubble-burning",
    title: "Turning Paddy Straw Into Gas Instead of Smoke in Punjab",
    excerpt:
      "A straw-to-gas park built specifically to give farmers a paid alternative to stubble burning — with a supply contract structured around the harvest calendar.",
    sector: "Agriculture",
    client: "State agricultural board (contracted developer)",
    location: "Ludhiana, Punjab",
    capacity: "9 t/day CBG",
    date: "May 2025",
    readTime: "4 min read",
    featured: false,
    img: IMG.fieldAerial,
    heroImg: IMG.fieldAerial,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(180,78,61,0.5) 100%)",
    gallery: [IMG.foggyValley, IMG.solarField],
    results: [
      { value: "9 t/day", label: "CBG output", tone: "leaf" },
      { value: "60k t", label: "straw diverted / season", tone: "blush" },
      { value: "0", label: "open-field burns on contracted acreage", tone: "leaf" },
    ],
    toc: [
      { id: "challenge", label: "The challenge" },
      { id: "approach", label: "Our approach" },
      { id: "results", label: "Results" },
    ],
    meta: [
      { label: "Sector", value: "Agriculture" },
      { label: "Location", value: "Ludhiana, Punjab" },
      { label: "Commissioned", value: "May 2025" },
      { label: "Feedstock", value: "Paddy straw" },
    ],
    sidebarCta: { title: "Tackling stubble burning at scale?", body: "We design straw-collection logistics tied to the harvest calendar.", btn: "Get Free Consultation →" },
    highlights: [
      "Straw collection contract paid directly to participating farmers",
      "Storage sized for the full off-season gap between harvests",
      "Built in direct response to regional stubble-burning pressure",
    ],
    sections: [
      { id: "challenge", heading: "The challenge", content: [
        { type: "p", text: "Paddy straw is a high-yield feedstock, but only exists in a narrow post-harvest window — and the default farmer behaviour, burning it in the field, was the very emissions problem the project needed to solve." },
      ]},
      { id: "approach", heading: "Our approach", content: [
        { type: "p", text: "We structured a straw-collection contract that pays farmers directly for baled straw at harvest, sized on-site storage to bridge the full off-season, and built the plant's intake system around that seasonal delivery pattern." },
      ]},
      { id: "results", heading: "Results", content: [
        { type: "p", text: "The park now diverts roughly 60,000 tonnes of straw per season into 9 tonnes/day of CBG output, with zero recorded open-field burns across the contracted acreage." },
      ]},
    ],
    ctaTitle: "Facing a similar residue-burning problem?",
    ctaBody: "Tell us the crop and acreage — we'll model a straw-to-gas plant sized to it.",
    related: [],
  },
  {
    slug: "telangana-municipal-waste-hub-hyderabad",
    title: "A Municipal Organic-Waste Hub Serving Metropolitan Hyderabad",
    excerpt:
      "Sorting and digesting the organic fraction of municipal solid waste at city scale — cutting landfill volume while producing pipeline-grade gas for the city's CGD network.",
    sector: "Municipal Waste",
    client: "Municipal corporation (PPP contract)",
    location: "Hyderabad, Telangana",
    capacity: "55,000 t/yr feedstock",
    date: "September 2025",
    readTime: "5 min read",
    featured: false,
    img: IMG.foggyValley,
    heroImg: IMG.foggyValley,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(26,106,66,0.82) 100%)",
    gallery: [IMG.industrialPlant, IMG.teamMeeting],
    results: [
      { value: "55k t", label: "MSW organic fraction / yr", tone: "leaf" },
      { value: "30%", label: "landfill volume reduction", tone: "blush" },
      { value: "15 t/day", label: "CBG injected to CGD grid", tone: "leaf" },
    ],
    toc: [
      { id: "challenge", label: "The challenge" },
      { id: "approach", label: "Our approach" },
      { id: "results", label: "Results" },
    ],
    meta: [
      { label: "Sector", value: "Municipal Waste" },
      { label: "Location", value: "Hyderabad, Telangana" },
      { label: "Commissioned", value: "September 2025" },
      { label: "Offtake", value: "CGD grid injection" },
    ],
    sidebarCta: { title: "Planning a municipal waste-to-energy project?", body: "We handle sorting infrastructure design through to CGD offtake agreements.", btn: "Get Free Consultation →" },
    highlights: [
      "Upfront sorting line separates organics from mixed municipal waste",
      "Gas meets CGD grid-injection specification, not just cylinder-fill",
      "Structured as a public-private partnership with the municipal corporation",
    ],
    sections: [
      { id: "challenge", heading: "The challenge", content: [
        { type: "p", text: "Mixed municipal solid waste isn't digester-ready — it needed a sorting line to reliably separate the organic fraction before anaerobic digestion could even start, at a throughput matching a metropolitan city's daily waste volume." },
      ]},
      { id: "approach", heading: "Our approach", content: [
        { type: "p", text: "We built a dedicated sorting line ahead of the digesters, sized the plant to metropolitan throughput, and upgraded the gas to meet the local City Gas Distribution network's stricter grid-injection specification rather than only cylinder-fill quality." },
      ]},
      { id: "results", heading: "Results", content: [
        { type: "p", text: "The hub now processes 55,000 tonnes of organic waste a year, cutting landfill volume by roughly 30% while injecting 15 tonnes/day of CBG directly into the city's gas network." },
      ]},
    ],
    ctaTitle: "Handling municipal waste at city scale?",
    ctaBody: "We'll scope the sorting infrastructure and CGD offtake path specific to your city.",
    related: [],
  },
  {
    slug: "maharashtra-grid-injection-upgrading-skid",
    title: "Retrofitting an Existing Digester With Grid-Injection Capability",
    excerpt:
      "An existing biogas plant near Pune was flaring excess gas. A retrofitted upgrading skid turned that waste stream into a saleable, grid-ready product.",
    sector: "Manufacturing",
    client: "Industrial manufacturing plant",
    location: "Pune, Maharashtra",
    capacity: "Grid-injection retrofit",
    date: "March 2025",
    readTime: "4 min read",
    featured: false,
    img: IMG.engineer,
    heroImg: IMG.engineer,
    heroGradient: "linear-gradient(135deg,rgba(10,19,16,0.95) 0%,rgba(26,106,66,0.82) 100%)",
    gallery: [IMG.industrialPlant, IMG.windTurbines],
    results: [
      { value: "100%", label: "of flared gas now captured", tone: "leaf" },
      { value: "6 mo", label: "retrofit to commissioning", tone: "blush" },
      { value: "1", label: "new revenue stream created", tone: "leaf" },
    ],
    toc: [
      { id: "challenge", label: "The challenge" },
      { id: "approach", label: "Our approach" },
      { id: "results", label: "Results" },
    ],
    meta: [
      { label: "Sector", value: "Manufacturing" },
      { label: "Location", value: "Pune, Maharashtra" },
      { label: "Commissioned", value: "March 2025" },
      { label: "Project type", value: "Retrofit, not new-build" },
    ],
    sidebarCta: { title: "Already flaring biogas on-site?", body: "A retrofit upgrading skid can often be commissioned faster than a new plant.", btn: "Get Free Consultation →" },
    highlights: [
      "Retrofit onto an existing digester — no new digestion capacity built",
      "Converted a flared waste stream into a saleable product",
      "Commissioned in six months from contract signature",
    ],
    sections: [
      { id: "challenge", heading: "The challenge", content: [
        { type: "p", text: "The client already operated an anaerobic digester for on-site effluent treatment, but had no use for the biogas it produced — most of it was simply flared, an emissions and cost liability with no offsetting revenue." },
      ]},
      { id: "approach", heading: "Our approach", content: [
        { type: "p", text: "Rather than building new digestion capacity, we retrofitted a compact upgrading and compression skid directly onto the existing plant, engineered to meet local grid-injection specifications with minimal footprint and downtime during installation." },
      ]},
      { id: "results", heading: "Results", content: [
        { type: "p", text: "Gas that was previously flared is now fully captured and sold as grid-injected CBG, commissioned within six months of contract signature and turning a cost centre into a new revenue stream." },
      ]},
    ],
    ctaTitle: "Already flaring biogas you could be selling?",
    ctaBody: "A retrofit is often faster and cheaper than it sounds — let's scope yours.",
    related: [],
  },
];

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug) || null;
}

export const featuredCaseStudy = CASE_STUDIES.find((c) => c.featured);
export const gridCaseStudies = CASE_STUDIES.filter((c) => !c.featured);
