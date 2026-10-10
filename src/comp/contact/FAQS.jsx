"use client";

import { useState } from "react";
import { Plus, Minus, Sprout, Factory, Building2, Leaf, ArrowRight } from "lucide-react";

import SectionHeading from "@/comp/ui/SectionHeading";
import { RevealSide } from "@/comp/motion/Reveal";

const TEAL = "#02303D";
const ORANGE = "#FF7D44";

/**
 * Answer format: array of blocks.
 *  - "string"                          -> paragraph
 *  - { type: "highlight", text }       -> highlighted callout line
 *  - { type: "list", items: [] }       -> bullet list
 *  - { type: "flow", steps: [] }       -> arrow-connected step chips
 */
const FAQS = [
    {
        icon: Sprout,
        tone: "leaf",
        q: "What is CBG Park™?",
        a: [
            "CBG Park™ is an integrated, cluster-based infrastructure model for developing CBG projects. Instead of developing every requirement separately, the park brings together key elements such as project infrastructure, feedstock ecosystem, common utilities, logistics, technology and market linkages within a coordinated development framework.",
            { type: "highlight", text: "In simple terms: CBG Park™ is more than a CBG plant, it is the ecosystem around the plant." },
        ],
    },
    {
        icon: Factory,
        tone: "blush",
        q: "Why should I consider CBG Park™ instead of developing a standalone CBG plant?",
        a: [
            "A standalone project may require the developer to independently coordinate land, infrastructure, feedstock, technology, project execution, logistics, approvals and market connectivity.",
            "CBG Park™ is designed to bring several of these requirements into a shared and coordinated ecosystem, helping project developers focus on their core CBG business rather than building every supporting infrastructure element from scratch.",
            { type: "highlight", text: "The objective is simpler project development through an integrated infrastructure model." },
        ],
    },
    {
        icon: Building2,
        tone: "leaf",
        q: "Is CBG Park™ a single CBG plant?",
        a: [
            "No. CBG Park™ is designed as a cluster of CBG projects supported by common infrastructure and ecosystem services.",
            "This allows individual project units to operate within a larger ecosystem while benefiting from shared facilities and coordinated support.",
            "The original KEC CBG Park model specifically describes clustered CBG units supported by common facilities.",
        ],
    },
    {
        icon: Leaf,
        tone: "blush",
        q: "What infrastructure and support can be available within a CBG Park™?",
        a: [
            "Depending on the specific park and project structure, the ecosystem can include:",
            {
                type: "list",
                items: [
                    "Common utilities and infrastructure",
                    "Feedstock aggregation and handling",
                    "Internal roads and logistics support",
                    "CBG processing/dispatch infrastructure",
                    "Weighing and storage facilities",
                    "Project development support",
                    "Technology support",
                    "EPC & PMC services",
                    "Training and technical support",
                    "Market/offtake linkage support",
                ],
            },
            "The exact facilities will vary according to the location, park design and project requirements. KEC's published CBG Park model lists several of these common services.",
        ],
    },
    {
        icon: Sprout,
        tone: "leaf",
        q: "Do I need to arrange the feedstock myself?",
        a: [
            "Feedstock is one of the most important parts of any CBG project, and CBG Park™ is designed to address this requirement as part of the wider ecosystem.",
            "The model can include feedstock aggregation, sourcing and supply-chain support, helping connect CBG projects with suitable biomass and organic-waste sources.",
            "However, feedstock availability remains project- and location-specific and must be assessed during project development.",
        ],
    },
    {
        icon: Factory,
        tone: "blush",
        q: "What about land and basic infrastructure?",
        a: [
            "One of the advantages of a park-based model is that land and common infrastructure can be planned at the park level rather than every developer having to independently create an entire industrial ecosystem.",
            "Depending on the particular CBG Park™, KEC may support land identification/procurement, project planning and common infrastructure development.",
            "The exact land arrangement, lease/ownership structure and infrastructure available will depend on the individual park and project.",
        ],
    },
    {
        icon: Building2,
        tone: "leaf",
        q: "How will the CBG produced in the park reach the market?",
        a: [
            "CBG Park™ is designed with the downstream side of the value chain in mind and not only production.",
            "The ecosystem can include support for CBG transportation, filling/dispatch infrastructure and market/offtake linkages, including connections with relevant OMC/CGD opportunities where applicable.",
            "However, offtake arrangements are project-specific and should not be treated as an automatic or unconditional guarantee.",
            "India's GOBARdhan framework also recognizes structured plant-to-CGD mapping and offtake mechanisms as part of strengthening the CBG ecosystem.",
        ],
    },
    // {
    //     icon: Leaf,
    //     tone: "blush",
    //     q: "Can someone with limited experience in CBG participate in CBG Park™?",
    //     a: [
    //         "Yes, that is one of the important use cases of the model.",
    //         "CBG Park™ is intended to make participation in the CBG sector more structured by bringing together project development, technology, engineering, infrastructure and ecosystem support.",
    //         "An entrepreneur does not necessarily need to build every part of the CBG value chain independently.",
    //         "KEC's original CBG Park positioning specifically identifies entrepreneurs, startups, corporates and government among the intended users of the model.",
    //     ],
    // },
    // {
    //     icon: Sprout,
    //     tone: "leaf",
    //     q: "Does CBG Park™ guarantee returns, financing, subsidy or offtake?",
    //     a: [
    //         "No. CBG is an infrastructure and energy business, and project economics depend on factors such as feedstock availability and cost, plant capacity, technology, CAPEX, financing terms, operating performance, logistics, offtake arrangements and applicable government policies.",
    //         "CBG Park™ is designed to create a more integrated project ecosystem and can facilitate relevant project-development and financing support, but investment returns, financing approval, subsidy and commercial outcomes cannot be guaranteed.",
    //     ],
    // },
    // {
    //     icon: Factory,
    //     tone: "blush",
    //     q: "What does KEC Agritech actually provide in a CBG Park™?",
    //     a: [
    //         "KEC Agritech's role can extend beyond EPC. Depending on the project structure, KEC can support the journey across:",
    //         {
    //             type: "flow",
    //             steps: [
    //                 "Project Concept",
    //                 "Feasibility",
    //                 "Development",
    //                 "Technology",
    //                 "PMC/EPC",
    //                 "Infrastructure",
    //                 "Feedstock Ecosystem",
    //                 "Commissioning",
    //                 "O&M / Commercialization",
    //             ],
    //         },
    //         "The objective is to provide an integrated project-development ecosystem, rather than leaving the investor to coordinate multiple disconnected vendors.",
    //         "KEC currently positions itself across EPC, PMC, technology transfer, O&M and CBG Park development.",
    //     ],
    // },
    // {
    //     icon: Building2,
    //     tone: "leaf",
    //     q: "What are the key benefits of investing in a CBG Park™ ecosystem?",
    //     a: [
    //         "CBG Park™ is designed to bring important elements of CBG project development together within an integrated infrastructure framework. Potential benefits include:",
    //         {
    //             type: "list",
    //             items: [
    //                 "Access to planned common infrastructure, where available",
    //                 "Coordinated project development and technical support",
    //                 "A structured approach to feedstock sourcing and logistics",
    //                 "Opportunities to benefit from shared facilities",
    //                 "Support in exploring potential market and offtake connections",
    //                 "Scope to develop projects within a larger renewable-energy ecosystem",
    //             ],
    //         },
    //         "The actual benefits depend on the specific park, participation model and services included in the agreement.",
    //     ],
    // },
    // {
    //     icon: Leaf,
    //     tone: "blush",
    //     q: "How can CBG Park™ help simplify the CBG project development journey?",
    //     a: [
    //         "Developing a CBG project involves multiple interconnected activities, from feedstock assessment and technology selection to engineering, infrastructure, regulatory compliance and commercialization.",
    //         "CBG Park™ aims to coordinate these requirements through a structured development model. Instead of independently managing every component, participants may be able to access relevant infrastructure and services through the park ecosystem.",
    //         "The goal is to simplify coordination, improve project planning and create a more organized path from concept to commissioning.",
    //     ],
    // },
    // {
    //     icon: Sprout,
    //     tone: "leaf",
    //     q: "Can CBG Park™ create opportunities for entrepreneurs and new investors?",
    //     a: [
    //         "Yes. CBG Park™ is designed to create opportunities for entrepreneurs, investors and businesses interested in participating in the renewable-energy sector.",
    //         "Depending on the park's participation structure, opportunities may include developing individual CBG units, participating in associated infrastructure or exploring businesses connected to feedstock aggregation, logistics, equipment, operations and organic-fertilizer by-products.",
    //         "The suitability of each opportunity depends on investment capacity, technical requirements and the commercial structure of the specific park.",
    //     ],
    // },
    // {
    //     icon: Factory,
    //     tone: "blush",
    //     q: "How can CBG Park™ support the growth of the CBG industry in India?",
    //     a: [
    //         "India's CBG industry requires more than individual production facilities. It also needs dependable feedstock supply chains, suitable infrastructure, efficient project execution and viable routes to market.",
    //         "A park-based model can help organize these elements within a coordinated ecosystem. By bringing multiple projects and supporting services together, CBG Park™ aims to support a more structured approach to CBG development.",
    //         "Over time, such models could contribute to the development of regional CBG clusters and a more connected renewable-gas value chain.",
    //     ],
    // },
    // {
    //     icon: Building2,
    //     tone: "leaf",
    //     q: "What is the long-term vision for CBG Park™?",
    //     a: [
    //         "The long-term vision is to develop a scalable model for CBG infrastructure that can be adapted to suitable locations and regional requirements.",
    //         "The concept extends beyond individual plants to an ecosystem connecting agricultural resources, waste management, energy production, infrastructure and commercial opportunities.",
    //         "As the network develops, the broader ambition is to support the growth of integrated CBG infrastructure across multiple regions, subject to project feasibility, investment, partnerships and local conditions.",
    //     ],
    // },
    // {
    //     icon: Leaf,
    //     tone: "blush",
    //     q: "Can CBG Park™ help create additional value from agricultural waste?",
    //     a: [
    //         "CBG production can convert suitable organic materials into compressed biogas, creating a productive use for feedstocks that might otherwise be underutilized or require different waste-management solutions.",
    //         "The wider ecosystem may also create opportunities around digestate processing and the production or use of organic soil amendments, subject to their quality and applicable requirements.",
    //         "By connecting biomass sources with energy infrastructure, CBG Park™ aims to support a more circular approach to resource utilization.",
    //     ],
    // },
    // {
    //     icon: Sprout,
    //     tone: "leaf",
    //     q: "What makes a park-based CBG model different from developing multiple independent plants?",
    //     a: [
    //         "The key difference is the approach to infrastructure and coordination.",
    //         "Independent plants may need to arrange many supporting facilities and services separately. A park-based model can plan selected infrastructure and services collectively, where technically and commercially feasible.",
    //         "This may create opportunities for shared facilities, coordinated logistics and more consistent project planning.",
    //         { type: "highlight", text: "The distinction is not simply the number of plants—it is how the surrounding ecosystem is planned and managed." },
    //     ],
    // },
    // {
    //     icon: Factory,
    //     tone: "blush",
    //     q: "Will CBG Park™ become more valuable as India's clean-energy sector grows?",
    //     a: [
    //         "The potential of CBG Park™ is linked to the broader development of India's renewable-gas ecosystem, including demand for cleaner fuels, suitable organic feedstocks, supporting infrastructure and commercial offtake arrangements.",
    //         "As the sector evolves, well-planned CBG parks could offer a structured platform for developing projects and connecting participants across the value chain.",
    //         "However, the commercial success of any individual park will depend on its execution, feedstock economics, technology, financing, regulatory environment and market access. Growth in the wider sector does not automatically guarantee returns for individual investors.",
    //     ],
    // },
    // {
    //     icon: Building2,
    //     tone: "leaf",
    //     q: "What role can CBG Park™ play in rural economic development?",
    //     a: [
    //         "A well-developed CBG ecosystem can create opportunities across several parts of the rural value chain, including biomass collection, transportation, plant operations, maintenance and the handling of suitable organic by-products.",
    //         "By connecting agricultural resources with renewable-energy infrastructure, CBG Park™ can help create avenues for local business participation and employment.",
    //         "The scale of these benefits will depend on the project's location, operating model, feedstock network and workforce requirements.",
    //     ],
    // },
    // {
    //     icon: Leaf,
    //     tone: "blush",
    //     q: "Why should businesses consider the CBG Park™ model for the future?",
    //     a: [
    //         "Businesses entering the CBG sector need to consider not only today's project requirements but also the long-term needs of infrastructure, feedstock security, operational efficiency and market connectivity.",
    //     ],
    // },
];

/**
 * Flip badge: true 3D coin-flip between Plus / Minus using rotateY on a
 * small icon-only element. Smaller size on mobile screens.
 */
function FlipBadge({ open, tone }) {
    return (
        <span
            className="relative grid h-7 w-7 shrink-0 place-items-center sm:h-10 sm:w-10"
            style={{ perspective: "300px" }}
        >
            <span
                className="absolute inset-0 grid place-items-center rounded-full text-white transition-transform duration-500"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${open ? 180 : 0}deg) translateZ(14px)`,
                }}
            >
                <span
                    className="absolute inset-0 grid place-items-center rounded-full"
                    style={{ backfaceVisibility: "hidden", background: ORANGE, boxShadow: `0 10px 20px -8px ${ORANGE}88` }}
                >
                    <Plus className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span
                    className="absolute inset-0 grid place-items-center rounded-full"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: ORANGE, boxShadow: `0 10px 20px -8px ${ORANGE}88` }}
                >
                    <Minus className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} aria-hidden="true" />
                </span>
            </span>
        </span>
    );
}

/** Renders one answer block (paragraph / highlight / list / flow). */
function AnswerBlock({ block, accentColor }) {
    if (typeof block === "string") {
        return <p className="text-justify">{block}</p>;
    }

    if (block.type === "highlight") {
        return (
            <p
                className="rounded-r-xl py-2 pl-4 pr-3 font-medium text-ink-900"
                style={{ borderLeft: `3px solid ${ORANGE}`, background: `${ORANGE}12` }}
            >
                {block.text}
            </p>
        );
    }

    if (block.type === "list") {
        return (
            <ul className="flex flex-col gap-1.5">
                {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                        <span
                            aria-hidden="true"
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: accentColor }}
                        />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    }

    if (block.type === "flow") {
        return (
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                {block.steps.map((step, i) => (
                    <span key={step} className="flex items-center gap-1.5">
                        <span
                            className="rounded-full px-3 py-1 text-[12.5px] font-semibold"
                            style={{ background: `${TEAL}0f`, color: TEAL, border: `1px solid ${TEAL}1f` }}
                        >
                            {step}
                        </span>
                        {i < block.steps.length - 1 && (
                            <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
                        )}
                    </span>
                ))}
            </div>
        );
    }

    return null;
}

function FaqCard({ item, open, onToggle }) {
    const { icon: Icon, tone, q, a } = item;
    const accentColor = tone === "blush" ? ORANGE : TEAL;

    return (
        <div
            className="rounded-[22px] bg-ink-0 transition-transform duration-300"
            style={{
                border: `1px solid ${TEAL}14`,
                boxShadow: open
                    ? "0 26px 50px -22px rgba(2,48,61,0.32)"
                    : "0 14px 28px -18px rgba(2,48,61,0.18)",
                transform: open ? "translateY(-4px)" : "translateY(0)",
            }}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-center gap-4 rounded-[22px] px-4 py-2 text-left sm:px-7"
            >
                <Icon className="sm:h-5 sm:w-5 w-4 h-4 shrink-0" style={{ color: accentColor }} strokeWidth={1.9} aria-hidden="true" />
                <span className="flex-1 font-display text-[15.5px] justify-content font-semibold text-ink-900 sm:text-[16.5px]">
                    {q}
                </span>
                <FlipBadge open={open} tone={tone} />
            </button>

            <div
                className="grid px-6 transition-[grid-template-rows] duration-400 ease-out sm:px-7"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden" style={{ perspective: "600px" }}>
                    <div
                        className="flex max-w-2xl flex-col gap-3 pb-6 pl-9 text-[14px] leading-[1.7] text-ink-500 transition-all duration-400 ease-out sm:pl-9"
                        style={{
                            opacity: open ? 1 : 0,
                            transform: open ? "translateZ(0px)" : "translateZ(-24px)",
                        }}
                    >
                        {a.map((block, i) => (
                            <AnswerBlock key={i} block={block} accentColor={accentColor} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-mist-50 py-24 md:py-12"
            style={{ perspective: "2200px" }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-[120px] animate-orbit-slow"
                style={{ background: `${ORANGE}1a` }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full blur-[110px] animate-orbit-slow-rev"
                style={{ background: `${TEAL}1a` }}
            />

            <div
                className="container-shell relative mx-auto flex items-stretch"
                style={{ maxWidth: "1100px" }}
            >
                <div className="flex w-10 shrink-0 items-center justify-center rounded-l-[22px] sm:w-16" style={{ background: TEAL, boxShadow: `0 14px 28px -18px ${TEAL}99` }}>
                    <span
                        className="font-display text-[25px] font-extrabold uppercase tracking-[0.35em] text-white sm:text-xl"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                        FAQ
                    </span>
                </div>

                <div className="flex-1 rounded-r-[22px] bg-ink-0 px-4 py-8 shadow-panel sm:px-9 sm:py-10" style={{ border: `1px solid ${TEAL}14`, borderLeft: "none" }}>
                    <RevealSide from="left">
                        <SectionHeading
                            eyebrow="FAQs"
                            accent="leaf"
                            title="Answers before"
                            titleAccent="you ask."
                            stack={false}
                            className="max-w-lg"
                        />
                    </RevealSide>

                    <RevealSide from="right" className="mt-10 flex flex-col gap-4">
                        {FAQS.map((item, i) => (
                            <FaqCard
                                key={item.q}
                                item={item}
                                open={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        ))}
                    </RevealSide>
                </div>
            </div>

            <style jsx global>{`
        @keyframes orbit-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-14px, 18px) scale(1.08); }
        }
        @keyframes orbit-slow-rev {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(16px, -14px) scale(1.06); }
        }
        .animate-orbit-slow { animation: orbit-slow 9s ease-in-out infinite; }
        .animate-orbit-slow-rev { animation: orbit-slow-rev 11s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-slow, .animate-orbit-slow-rev { animation: none !important; }
        }
      `}</style>
        </section>
    );
}