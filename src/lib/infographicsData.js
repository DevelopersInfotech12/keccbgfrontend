// src/lib/infographicsData.js
// Content Guide Sec.8 — "Infographics" page, the clearest missing client
// requirement (Sec.8 "Current website: Infographics section/page is
// missing. Action: ADD this page."). Each entry needs an image, title,
// date/category, and a sharing/view option (handled in Infographics.jsx).
//
// This is placeholder sample content so the page ships non-empty — swap in
// real daily infographics (ideally from the admin panel / backend, the same
// way Blog content is fetched in BlogScreen.jsx) as they're produced.
import { IMG } from "@/lib/images";

export const INFOGRAPHIC_CATEGORIES = [
  "CBG Basics",
  "Feedstock",
  "Policy & Incentives",
  "Plant Operations",
  "Sustainability",
];

export const INFOGRAPHICS = [
  {
    slug: "cbg-park-ecosystem-at-a-glance",
    title: "The CBG Park Ecosystem at a Glance",
    category: "CBG Basics",
    date: "August 10, 2026",
    img: IMG.industrialPlant,
  },
  {
    slug: "feedstock-to-fuel-in-8-steps",
    title: "Feedstock to Fuel — In 8 Steps",
    category: "Feedstock",
    date: "August 7, 2026",
    img: IMG.cropRows,
  },
  {
    slug: "why-location-matters-for-cbg",
    title: "Why Location Matters for a CBG Plant",
    category: "Plant Operations",
    date: "August 3, 2026",
    img: IMG.fieldAerial,
  },
  {
    slug: "cbg-vs-cng-explained",
    title: "Bio-CNG vs CNG — What's the Difference?",
    category: "CBG Basics",
    date: "July 29, 2026",
    img: IMG.windTurbines,
  },
  {
    slug: "digestate-the-closed-loop",
    title: "Digestate: Closing the Loop Back to the Farm",
    category: "Sustainability",
    date: "July 24, 2026",
    img: IMG.greenhouse,
  },
  {
    slug: "cbg-policy-incentives-india",
    title: "CBG Policy & Incentives in India — A Quick Map",
    category: "Policy & Incentives",
    date: "July 18, 2026",
    img: IMG.ricePaddy,
  },
];
