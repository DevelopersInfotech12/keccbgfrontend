// ─────────────────────────────────────────────────────────────────────────────
// KEC Integrated CBG Technology Stack — MODAL CONTENT (single source of truth)
// Source: TRADEMARK_Web_Pages.docx
//
// Edit copy HERE only. UI lives in comp/TechnologyModal.jsx, cards in
// comp/Industries.jsx (icons only). Keyed by the card title in Industries.jsx.
//
// Per-module shape:
//   layer      → key of STACK_LAYERS (header badge + strip)
//   focus      → short label (from "KEC Solution Ecosystem" list in the docx)
//   tagline    → hero headline            subtitle → hero sub-line (also card text)
//   lead       → optional extra intro paragraphs   leadTags → optional "A • B • C" line
//   challenge  → { heading, paras[], listIntro?, list?[], closing?[] }
//   addresses  → { heading?, intro?, items:[{ title, desc }] }     (numbered 01, 02 …)
//   flow       → { heading?, intro?, steps[], closing?[] }
//   why        → { heading?, paras[], listIntro?, list?[], closing?[], pull?[] }
//   approach   → { heading?, before?[], flow, after?[] }
//   cta        → { heading, line, keywords }
// ─────────────────────────────────────────────────────────────────────────────

export const STACK_LAYERS = {
  feed: { label: "Feedstock", bg: "#E8F1F3", text: "#02303D", dot: "#0B6E85" },
  process: { label: "Process", bg: "#FFF0E8", text: "#B8470F", dot: "#FF7D44" },
  energy: { label: "Energy & Utilities", bg: "#FEF3DC", text: "#8A5A06", dot: "#D99A1C" },
  digital: { label: "Digital & Control", bg: "#EAF0F7", text: "#1C3558", dot: "#2B5288" },
  infra: { label: "Infrastructure", bg: "#EEF4EC", text: "#2F5A2B", dot: "#4E8B47" },
};

export const BRAND_FOOTER = { name: "KEC AGRITECH", line: "BUILD IT RIGHT. BUILD IT WITH KEC." };

// Umbrella page (15th item in the docx). Not a card — shown inside every modal's "KEC Approach" tab.
export const BUILD_IT_RIGHT = {
  title: "Build It Right™",
  tagline: "ENGINEERING THE PROJECT. NOT JUST THE PLANT.",
  subtitle: "An engineering philosophy built around understanding the complete CBG project—from resource and process to infrastructure, energy and utilisation.",
  framework: "RESOURCE → PROCESS → UTILITIES → INFRASTRUCTURE → CONTROL → ENERGY → UTILISATION",
  philosophy: ["DON'T DESIGN THE PARTS IN ISOLATION.", "DESIGN THE SYSTEM."],
  closing: "At KEC Agritech, engineering begins by understanding the complete project ecosystem.",
  cta: "BUILD IT RIGHT. BUILD IT WITH KEC.",
};

export const TECH_STACK = {
  /* 01 ───────────────────────────────────────────────────────── FeedSecure™ */
  "FeedSecure™": {
    layer: "feed",
    focus: "Feedstock Planning",
    tagline: "SECURE THE FEEDSTOCK. STRENGTHEN THE PROJECT.",
    subtitle: "Feedstock intelligence and supply planning for CBG projects.",
    lead: [
      "A CBG project starts with a resource reality. FeedSecure™ helps project teams understand that reality—where feedstock comes from, how much is available, how consistently it can be supplied, and how it can be moved to the plant.",
    ],
    leadTags: "Source • Availability • Consistency • Logistics",
    challenge: {
      heading: "A CBG PLANT CANNOT BE PLANNED IN ISOLATION FROM ITS FEEDSTOCK.",
      paras: [
        "The availability of suitable feedstock is one of the fundamental considerations in CBG project planning.",
        "A project may have the right technology and infrastructure, but its operational planning must also account for the nature, source, quantity, consistency and movement of the feedstock.",
      ],
      listIntro: "Feedstock conditions can vary by:",
      list: [
        "Source and geographic distribution",
        "Seasonal availability",
        "Material characteristics",
        "Collection practices",
        "Aggregation requirements",
        "Transportation distance and logistics",
        "Supply consistency",
      ],
      closing: ["FeedSecure™ brings these considerations into the project planning framework."],
    },
    addresses: {
      heading: "FROM FEEDSTOCK SOURCES TO A PLANNED SUPPLY SYSTEM.",
      intro: "FeedSecure™ focuses on four foundational dimensions:",
      items: [
        { title: "SOURCE", desc: "Identify and understand potential feedstock sources relevant to the project." },
        { title: "AVAILABILITY", desc: "Assess the availability pattern of the identified resources, including seasonal and location-related considerations." },
        { title: "CONSISTENCY", desc: "Understand variations in feedstock characteristics and supply conditions that may influence planning." },
        { title: "LOGISTICS", desc: "Evaluate collection, aggregation, transportation and movement requirements between source and project site." },
      ],
    },
    flow: {
      heading: "BETTER FEEDSTOCK UNDERSTANDING. BETTER PROJECT PLANNING.",
      intro: "FeedSecure™ helps connect resource-side realities with project-side planning.",
      steps: ["FEEDSTOCK SOURCES", "RESOURCE ASSESSMENT", "AVAILABILITY & CONSISTENCY", "COLLECTION & LOGISTICS", "PROJECT PLANNING"],
      closing: ["This creates a more structured basis for coordinating feedstock planning with process design, plant capacity considerations, infrastructure and operational requirements."],
    },
    why: {
      heading: "THE PROJECT BEGINS BEFORE THE FEEDSTOCK REACHES THE PLANT.",
      paras: [],
      listIntro: "Understanding the supply environment early can help project teams:",
      list: [
        "Build a more realistic feedstock planning framework",
        "Identify supply-side constraints earlier",
        "Align collection and logistics considerations with project requirements",
        "Improve coordination between resource planning and plant design",
        "Prepare a stronger foundation for operational planning",
      ],
      closing: [
        "FeedSecure™ does not guarantee feedstock availability.",
        "It provides a structured engineering approach to understanding and planning around the feedstock reality of a CBG project.",
      ],
    },
    approach: {
      heading: "ENGINEERING THE RESOURCE SIDE OF THE PROJECT.",
      before: [
        "At KEC Agritech, we believe CBG project engineering begins with understanding the complete system—not just the plant boundary.",
        "FeedSecure™ is part of our engineering-led approach to connecting:",
      ],
      flow: "RESOURCE → PROCESS → INFRASTRUCTURE → ENERGY",
      after: ["By bringing feedstock considerations into the early stages of project planning, we work toward a more integrated view of the CBG project."],
    },
    cta: {
      heading: "SECURE THE FEEDSTOCK. STRENGTHEN THE PROJECT.",
      line: "Explore FeedSecure™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Project Engineering • Infrastructure • Execution",
    },
  },

  /* 02 ─────────────────────────────────────────────────────────── Smart Mix™ */
  "Smart Mix™": {
    layer: "feed",
    focus: "Feedstock Mix Planning",
    tagline: "BALANCE THE MIX. OPTIMISE THE PROCESS.",
    subtitle: "Feedstock mix planning for more informed CBG project design.",
    lead: [
      "Different feedstocks can vary in composition, moisture, biodegradability, nutrient characteristics, availability and handling requirements. Smart Mix™ brings these variables into the planning framework to help project teams evaluate how different feedstock combinations may influence process requirements and overall project design.",
    ],
    challenge: {
      heading: "NOT ALL FEEDSTOCKS BEHAVE THE SAME.",
      paras: [
        "A CBG project may depend on one feedstock or a combination of available organic resources.",
        "But simply having multiple feedstocks does not automatically make a better input strategy.",
      ],
      listIntro: "Different materials can have different:",
      list: [
        "Moisture characteristics",
        "Organic matter content",
        "Biodegradability",
        "Physical properties",
        "Seasonal availability",
        "Handling requirements",
        "Supply consistency",
      ],
      closing: ["The challenge is to understand how the available feedstocks work together as an input mix and how that mix relates to the project's process requirements."],
    },
    addresses: {
      heading: "FROM INDIVIDUAL FEEDSTOCKS TO AN ENGINEERED INPUT STRATEGY.",
      items: [
        { title: "FEEDSTOCK CHARACTERISTICS", desc: "Understand relevant physical and process-related characteristics of available feedstocks." },
        { title: "MIX COMPATIBILITY", desc: "Evaluate how different feedstocks may complement each other within the planned process." },
        { title: "MIX CONSISTENCY", desc: "Consider variations in composition, moisture and availability across different sources and seasons." },
        { title: "PROCESS ALIGNMENT", desc: "Relate the planned feedstock mix to the project's process design and operating requirements." },
      ],
    },
    flow: {
      heading: "THE INPUT MIX INFLUENCES THE PROCESS.",
      steps: ["FEEDSTOCK OPTIONS", "CHARACTERISATION", "MIX ASSESSMENT", "PROCESS ALIGNMENT", "PROJECT PLANNING"],
      closing: [
        "Smart Mix™ helps bring feedstock-mix considerations into the engineering discussion before they become operational constraints.",
        "It can support better coordination between resource planning, process design, handling systems and plant infrastructure.",
      ],
    },
    why: {
      heading: "A BETTER MIX STARTS WITH BETTER UNDERSTANDING.",
      paras: [],
      listIntro: "A structured feedstock-mix approach can help project teams:",
      list: [
        "Compare available feedstock options",
        "Identify potential variability in the input stream",
        "Consider seasonal and supply-side changes",
        "Align feedstock characteristics with process requirements",
        "Support more informed process and infrastructure planning",
      ],
      closing: [
        "Smart Mix™ does not prescribe a universal feedstock recipe or guarantee gas yield.",
        "The appropriate mix depends on the specific feedstocks, their characteristics, project process design, operating conditions and local supply environment.",
      ],
    },
    approach: {
      heading: "ENGINEER THE INPUT. UNDERSTAND THE PROCESS.",
      before: [
        "At KEC Agritech, we look beyond individual feedstock sources to understand how the available resource base can fit into the overall CBG project.",
        "Smart Mix™ forms the next layer of our engineering-led approach:",
      ],
      flow: "SOURCE → MIX → PROCESS → INFRASTRUCTURE → ENERGY",
      after: ["Because project engineering should begin with understanding what enters the plant—not only what happens inside it."],
    },
    cta: {
      heading: "BALANCE THE MIX. OPTIMISE THE PROCESS.",
      line: "Explore Smart Mix™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Feedstock Planning • Process Engineering • Project Infrastructure",
    },
  },

  /* 03 ───────────────────────────────────────────────────────── HydroReact™ */
  "HydroReact™": {
    layer: "process",
    focus: "Water & Process Readiness",
    tagline: "WATER MANAGEMENT. PROCESS READINESS.",
    subtitle: "Aligning water requirements with process and infrastructure planning for CBG projects.",
    challenge: {
      heading: "WATER IS PART OF THE PROCESS.",
      paras: [
        "Water requirements in a CBG project are influenced by feedstock characteristics, process configuration, utilities, cleaning requirements and operating practices.",
        "Availability alone is not enough.",
        "The engineering challenge is to understand where water is required, in what quantity, with what characteristics, and how it integrates with the overall plant system.",
      ],
    },
    addresses: {
      items: [
        { title: "WATER AVAILABILITY", desc: "Understanding available water sources and their reliability for project planning." },
        { title: "WATER REQUIREMENTS", desc: "Mapping water requirements across relevant process and utility systems." },
        { title: "WATER CHARACTERISTICS", desc: "Considering water quality and characteristics wherever they can influence process or equipment requirements." },
        { title: "WATER SYSTEM INTEGRATION", desc: "Coordinating water storage, distribution, treatment and related infrastructure with the overall plant design." },
      ],
    },
    flow: { steps: ["WATER SOURCE", "CHARACTERISATION", "REQUIREMENT MAPPING", "PROCESS ALIGNMENT", "INFRASTRUCTURE PLANNING"] },
    why: {
      paras: [
        "A water system designed in isolation can create problems elsewhere.",
        "HydroReact™ helps project teams consider water as part of the larger engineering interface—connecting source availability, process requirements, utilities and infrastructure planning.",
        "The objective is not simply to provide water.",
        "It is to ensure that the water system is planned around the project.",
      ],
    },
    approach: {
      flow: "SOURCE → WATER → PROCESS → UTILITIES → PLANT",
      after: [
        "At KEC Agritech, water planning is considered within the broader project-engineering framework.",
        "Because process readiness depends not only on what enters the digester—but also on whether the supporting utility systems are designed to work with it.",
      ],
    },
    cta: {
      heading: "WATER MANAGEMENT. PROCESS READINESS.",
      line: "Explore HydroReact™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Utility Engineering • Process Integration • Project Infrastructure",
    },
  },

  /* 04 ───────────────────────────────────────────────────────── DigiDigest™ */
  "DigiDigest™": {
    layer: "digital",
    focus: "Digestion Visibility",
    tagline: "BETTER VISIBILITY. BETTER DIGESTION DECISIONS.",
    subtitle: "Structured process monitoring to help teams understand digestion performance and respond to operating conditions.",
    challenge: {
      heading: "YOU CAN'T MANAGE WHAT YOU CAN'T SEE.",
      paras: [
        "Anaerobic digestion is influenced by multiple interacting variables.",
        "Feedstock characteristics, feeding patterns, operating conditions, temperature, process stability and gas production can change over time.",
        "The challenge is not simply collecting data.",
        "It is turning operating information into useful process visibility.",
      ],
    },
    addresses: {
      items: [
        { title: "PROCESS VISIBILITY", desc: "Bringing relevant operating information together for clearer understanding of digestion conditions." },
        { title: "TREND MONITORING", desc: "Tracking changes over time instead of relying only on isolated observations." },
        { title: "PROCESS INTERPRETATION", desc: "Helping teams relate operating observations with process behaviour." },
        { title: "DECISION SUPPORT", desc: "Supporting timely operational decisions based on available process information." },
      ],
    },
    flow: { steps: ["DATA", "VISIBILITY", "TREND", "INTERPRETATION", "DECISION"] },
    why: {
      paras: [
        "A digestion system can generate significant operating information.",
        "But information becomes valuable only when the project team can see patterns, understand changes and act appropriately.",
        "DigiDigest™ supports a more structured approach to process monitoring—helping create better coordination between plant data, operating teams and engineering decisions.",
      ],
    },
    approach: {
      flow: "FEED → DIGESTION → MONITORING → INTERPRETATION → ACTION",
      after: [
        "KEC Agritech looks at digestion not as an isolated biological stage, but as part of the larger CBG engineering system.",
        "Because better process visibility can support better operational awareness—and better operational awareness supports more informed decisions.",
      ],
    },
    cta: {
      heading: "BETTER VISIBILITY. BETTER DIGESTION DECISIONS.",
      line: "Explore DigiDigest™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Process Monitoring • Digestion Management • Plant Operations",
    },
  },

  /* 05 ─────────────────────────────────────────────────────────── BioHeat™ */
  "BioHeat™": {
    layer: "energy",
    focus: "Thermal Integration",
    tagline: "CAPTURE THE HEAT. USE THE ENERGY.",
    subtitle: "Thermal-energy integration for better utility planning across CBG projects.",
    challenge: {
      heading: "ENERGY DOESN'T END WITH GAS PRODUCTION.",
      paras: [
        "A CBG project can involve multiple thermal requirements across process and utility systems.",
        "At the same time, different plant systems may generate or carry usable heat.",
        "The engineering opportunity is to understand these heat sources, heat requirements and system interfaces and evaluate where thermal integration makes practical sense.",
      ],
    },
    addresses: {
      items: [
        { title: "HEAT SOURCE MAPPING", desc: "Identify available or potentially recoverable thermal-energy sources within the project." },
        { title: "THERMAL REQUIREMENTS", desc: "Understand where heat is required across relevant process and utility systems." },
        { title: "HEAT INTEGRATION", desc: "Evaluate practical interfaces between available heat and plant requirements." },
        { title: "UTILITY PLANNING", desc: "Incorporate thermal-energy considerations into broader utility and infrastructure planning." },
      ],
    },
    flow: { steps: ["HEAT SOURCE", "HEAT CHARACTERISATION", "DEMAND MAPPING", "INTEGRATION", "UTILITY PLANNING"] },
    why: {
      paras: [
        "Thermal energy that is available but poorly integrated can become an overlooked project resource.",
        "BioHeat™ helps project teams look beyond individual equipment and consider the thermal relationship between process systems and utilities.",
        "The objective is simple:",
      ],
      pull: ["UNDERSTAND THE HEAT.", "UNDERSTAND THE REQUIREMENT.", "DESIGN THE CONNECTION."],
    },
    approach: {
      flow: "PROCESS → HEAT → UTILITIES → INTEGRATION → PLANT",
      after: [
        "At KEC Agritech, thermal considerations are evaluated as part of the wider project-engineering architecture.",
        "Because efficient infrastructure is not only about producing energy.",
        "It is also about understanding where energy exists, where it is required, and how the systems can work together.",
      ],
    },
    cta: {
      heading: "CAPTURE THE HEAT. USE THE ENERGY.",
      line: "Explore BioHeat™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Thermal Integration • Utility Engineering • Process Infrastructure",
    },
  },

  /* 06 ──────────────────────────────────────────────────────── Energy Sync™ */
  "Energy Sync™": {
    layer: "energy",
    focus: "Energy Planning",
    tagline: "CONNECT THE ENERGY. ALIGN THE SYSTEMS.",
    subtitle: "Integrated energy planning for better coordination between generation, utilities and plant demand.",
    challenge: {
      heading: "ENERGY SYSTEMS DON'T OPERATE IN ISOLATION.",
      paras: [
        "A CBG project involves multiple energy-consuming and energy-generating systems.",
        "Process equipment, electrical systems, thermal utilities, compression, gas handling and auxiliary infrastructure all create interconnected energy requirements.",
        "The engineering challenge is to understand these relationships early and plan the system accordingly.",
      ],
    },
    addresses: {
      items: [
        { title: "ENERGY MAPPING", desc: "Identify major energy sources, consumers and utility requirements across the project." },
        { title: "DEMAND ALIGNMENT", desc: "Understand how energy demand changes across process and operating conditions." },
        { title: "SYSTEM COORDINATION", desc: "Coordinate electrical, thermal and process-energy interfaces wherever relevant." },
        { title: "ENERGY UTILISATION", desc: "Evaluate how available energy can be aligned with practical plant requirements and end uses." },
      ],
    },
    flow: { steps: ["ENERGY SOURCES", "DEMAND MAPPING", "LOAD ALIGNMENT", "SYSTEM INTEGRATION", "ENERGY PLANNING"] },
    why: {
      paras: [
        "A plant can have efficient individual systems and still face challenges when those systems are not properly coordinated.",
        "Energy Sync™ brings the energy picture together so that generation, consumption and utility requirements can be considered as part of the same engineering framework.",
        "The goal is not simply to produce energy.",
        "It is to understand how energy moves through the project.",
      ],
    },
    approach: {
      flow: "GENERATE → CONVERT → DISTRIBUTE → UTILISE → COORDINATE",
      after: [
        "KEC Agritech approaches energy planning as a system-level engineering exercise.",
        "From process requirements to electrical and thermal utilities, the objective is to create better coordination between the different energy interfaces within the project.",
        "Because energy infrastructure works best when its systems work together.",
      ],
    },
    cta: {
      heading: "CONNECT THE ENERGY. ALIGN THE SYSTEMS.",
      line: "Explore Energy Sync™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Energy Planning • Utility Integration • Process Engineering",
    },
  },

  /* 07 ──────────────────────────────────────────────────────── Smart Power™ */
  "Smart Power™": {
    layer: "energy",
    focus: "Electrical Infrastructure",
    tagline: "RELIABLE POWER. BETTER PLANT READINESS.",
    subtitle: "Electrical infrastructure planning for dependable operation of CBG projects.",
    challenge: {
      heading: "A PROCESS PLANT NEEDS POWER THAT IS PLANNED—NOT JUST CONNECTED.",
      paras: [
        "CBG projects depend on electrical systems across process equipment, pumps, motors, instrumentation, compression, utilities and auxiliary systems.",
        "As the plant evolves, electrical demand can also change.",
        "The engineering challenge is to understand the load, distribution, criticality and operating requirements before designing the electrical infrastructure.",
      ],
    },
    addresses: {
      items: [
        { title: "LOAD MAPPING", desc: "Identify major electrical loads across process, utilities and auxiliary systems." },
        { title: "POWER DISTRIBUTION", desc: "Plan electrical distribution around equipment requirements and plant layout." },
        { title: "CRITICAL LOADS", desc: "Identify systems where continuity of power is important for safe and orderly operation." },
        { title: "BACKUP & READINESS", desc: "Consider backup-power requirements and electrical-system resilience during project planning." },
      ],
    },
    flow: { steps: ["LOAD IDENTIFICATION", "LOAD ASSESSMENT", "DISTRIBUTION PLANNING", "CRITICALITY", "POWER INFRASTRUCTURE"] },
    why: {
      paras: [
        "Electrical infrastructure is deeply connected to plant operation.",
        "An under-planned electrical system can create constraints when equipment is added, operating conditions change or the plant expands.",
        "Smart Power™ helps bring electrical requirements into the project-engineering conversation before they become execution challenges.",
      ],
    },
    approach: {
      flow: "LOAD → POWER → DISTRIBUTION → CONTROL → OPERATION",
      after: [
        "KEC Agritech considers electrical infrastructure as an integral part of CBG project engineering—not an isolated utility package.",
        "The objective is to create an electrical system that is aligned with process requirements, equipment loads, plant layout and operational needs.",
        "Because plant readiness begins with infrastructure readiness.",
      ],
    },
    cta: {
      heading: "RELIABLE POWER. BETTER PLANT READINESS.",
      line: "Explore Smart Power™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Electrical Engineering • Power Distribution • Plant Infrastructure",
    },
  },

  /* 08 ──────────────────────────────────────────────────────── Gas Balance™ */
  "Gas Balance™": {
    layer: "energy",
    focus: "Gas System Planning",
    tagline: "BALANCE THE GAS. CONTROL THE FLOW.",
    subtitle: "Gas-system planning for better coordination between production, storage, conditioning and utilisation.",
    challenge: {
      heading: "PRODUCING GAS IS ONLY ONE PART OF THE SYSTEM.",
      paras: [
        "A CBG project must manage gas across multiple interconnected stages.",
        "Production conditions can vary. Gas may need conditioning, temporary storage, compression or pressure management before reaching its intended point of utilisation.",
        "The engineering challenge is to ensure these interfaces are properly understood and coordinated.",
      ],
    },
    addresses: {
      items: [
        { title: "GAS PRODUCTION", desc: "Understand expected gas generation patterns and their relationship with process operation." },
        { title: "GAS CONDITIONING", desc: "Consider the gas-quality and conditioning requirements associated with the intended utilisation pathway." },
        { title: "STORAGE & BUFFERING", desc: "Evaluate storage or buffering requirements in relation to production and downstream demand." },
        { title: "PRESSURE & FLOW", desc: "Coordinate pressure, flow and gas-handling requirements across the relevant plant systems." },
        { title: "GAS UTILISATION", desc: "Align the gas system with the final application—whether compression, dispensing, pipeline supply or other intended utilisation." },
      ],
    },
    flow: { steps: ["PRODUCTION", "CONDITIONING", "STORAGE", "PRESSURE MANAGEMENT", "UTILISATION"] },
    why: {
      paras: [
        "Gas does not simply move from the digester to the end user.",
        "It moves through a network of equipment, pressure conditions, storage interfaces and utilisation requirements.",
        "Gas Balance™ helps bring these interfaces into one engineering framework so that the gas system can be planned around the actual project requirement.",
        "The objective is simple:",
      ],
      pull: ["UNDERSTAND THE GAS.", "UNDERSTAND THE FLOW.", "DESIGN THE SYSTEM."],
    },
    approach: {
      flow: "GENERATE → CONDITION → BUFFER → COMPRESS → DELIVER",
      after: [
        "KEC Agritech approaches the gas system as an integrated part of CBG project engineering.",
        "From process-side gas generation to downstream utilisation, the objective is to coordinate the gas-handling infrastructure, operating requirements and end-use interface.",
        "Because a CBG project is not complete when gas is produced.",
        "It is complete when the gas system is ready for its intended use.",
      ],
    },
    cta: {
      heading: "BALANCE THE GAS. CONTROL THE FLOW.",
      line: "Explore Gas Balance™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Gas Handling • Gas Conditioning • Compression • Gas Infrastructure",
    },
  },

  /* 09 ───────────────────────────────────────────────────────── MethaPure™ */
  "MethaPure™": {
    layer: "process",
    focus: "Gas Upgrading",
    tagline: "CLEANER GAS. BETTER UTILISATION.",
    subtitle: "Gas-upgrading and purification planning for CBG systems designed around downstream utilisation requirements.",
    challenge: {
      heading: "RAW BIOGAS IS NOT THE FINAL PRODUCT.",
      paras: [
        "Biogas generated through anaerobic digestion contains methane along with carbon dioxide, moisture and other components.",
        "For CBG applications, the gas must be processed according to the required quality and utilisation pathway.",
        "The engineering challenge is to design the upgrading and conditioning system around the actual project requirement.",
      ],
    },
    addresses: {
      items: [
        { title: "GAS CHARACTERISATION", desc: "Understand incoming biogas composition and relevant gas-quality parameters." },
        { title: "UPGRADING REQUIREMENTS", desc: "Evaluate the appropriate gas-upgrading approach based on feed gas characteristics and project objectives." },
        { title: "GAS CONDITIONING", desc: "Consider moisture and other conditioning requirements associated with downstream use." },
        { title: "QUALITY ALIGNMENT", desc: "Plan gas quality around the applicable specification and intended utilisation pathway." },
      ],
    },
    flow: { steps: ["RAW BIOGAS", "CHARACTERISATION", "UPGRADING", "CONDITIONING", "QUALITY CHECK", "CBG"] },
    why: {
      paras: [
        "Gas quality is directly connected to downstream utilisation.",
        "The upgrading system therefore cannot be treated as an isolated equipment package.",
        "MethaPure™ brings together gas composition, upgrading requirements, conditioning and utilisation requirements to support a more integrated gas-quality engineering approach.",
        "The objective is not simply to remove unwanted components.",
        "It is to engineer the gas for its intended use.",
      ],
    },
    approach: {
      flow: "CHARACTERISE → UPGRADE → CONDITION → VERIFY → UTILISE",
      after: [
        "KEC Agritech approaches gas upgrading as part of the wider CBG process architecture.",
        "The selection and integration of gas-treatment systems should be based on feed gas characteristics, required gas quality, plant configuration, operating conditions and end-use requirements.",
        "Because gas quality should be engineered—not assumed.",
      ],
    },
    cta: {
      heading: "CLEANER GAS. BETTER UTILISATION.",
      line: "Explore MethaPure™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Biogas Upgrading • Gas Purification • Gas Conditioning • Process Engineering",
    },
  },

  /* 10 ─────────────────────────────────────────────────────── Smart Cascade™ */
  "Smart Cascade™": {
    layer: "process",
    focus: "Resource Integration",
    tagline: "USE THE FLOW. MAXIMISE THE SYSTEM.",
    subtitle: "Engineering cascading utilisation pathways across CBG and bioenergy infrastructure.",
    challenge: {
      heading: "ONE SYSTEM CAN CREATE MORE THAN ONE OPPORTUNITY.",
      paras: [
        "A CBG project does not operate as a collection of completely independent systems.",
        "Gas, heat, water, digestate, utilities and other process outputs can create interfaces with downstream or supporting applications.",
        "The engineering challenge is to identify these relationships early and determine where integration is technically practical and commercially relevant.",
      ],
    },
    addresses: {
      items: [
        { title: "RESOURCE FLOW MAPPING", desc: "Identify relevant material, energy and utility flows across the project." },
        { title: "OUTPUT–INPUT CONNECTIONS", desc: "Evaluate where one system's output can potentially support another system." },
        { title: "CASCADING UTILISATION", desc: "Explore practical secondary or downstream utilisation pathways." },
        { title: "SYSTEM INTEGRATION", desc: "Coordinate these interfaces with plant layout, utilities and infrastructure requirements." },
      ],
    },
    flow: { steps: ["PRIMARY PROCESS", "OUTPUT", "SECONDARY USE", "INTEGRATION", "VALUE CHAIN"] },
    why: {
      paras: [
        "A project can contain useful resources that remain underutilised simply because the connections between systems were never considered during planning.",
        "Smart Cascade™ helps project teams look beyond the primary output and examine how relevant resources may move through the wider project ecosystem.",
        "The objective is not to force additional applications.",
        "It is to identify technically viable connections where they make sense.",
      ],
    },
    approach: {
      flow: "MAP → CONNECT → INTEGRATE → UTILISE",
      after: [
        "KEC Agritech approaches cascading utilisation through a system-level engineering lens.",
        "Process outputs, utilities and downstream applications are evaluated together so that potential interfaces can be considered before infrastructure decisions are locked in.",
        "Because sometimes the next opportunity is already present inside the system.",
      ],
    },
    cta: {
      heading: "USE THE FLOW. MAXIMISE THE SYSTEM.",
      line: "Explore Smart Cascade™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Resource Integration • Energy Utilisation • Process Engineering • Infrastructure Planning",
    },
  },

  /* 11 ───────────────────────────────────────────────────────── InfraCore™ */
  "InfraCore™": {
    layer: "infra",
    focus: "Plant Infrastructure",
    tagline: "BUILD THE CORE. CONNECT THE SYSTEMS.",
    subtitle: "Integrated infrastructure planning for connected, execution-ready CBG projects.",
    challenge: {
      heading: "A PLANT IS MORE THAN ITS EQUIPMENT.",
      paras: [
        "Digesters, gas systems, utilities and process equipment only work as intended when the infrastructure around them is properly planned.",
        "Civil works, equipment foundations, pipe routing, access, utility networks, drainage, structural requirements and system interfaces must work together.",
        "The challenge is to build this infrastructure framework around the process—not around isolated equipment.",
      ],
    },
    addresses: {
      items: [
        { title: "SITE & LAYOUT", desc: "Planning plant layout around process flow, equipment, access and infrastructure requirements." },
        { title: "CIVIL & STRUCTURAL", desc: "Coordinating foundations, structures and civil infrastructure with equipment and process needs." },
        { title: "UTILITY NETWORKS", desc: "Integrating relevant water, electrical, gas and other utility corridors across the site." },
        { title: "EQUIPMENT INTERFACES", desc: "Coordinating physical connections between equipment, piping, utilities and supporting infrastructure." },
        { title: "EXECUTION READINESS", desc: "Translating the engineering framework into infrastructure that can be executed, coordinated and maintained." },
      ],
    },
    flow: { steps: ["SITE", "LAYOUT", "CIVIL", "UTILITIES", "EQUIPMENT INTERFACES", "EXECUTION"] },
    why: {
      paras: [
        "Equipment can be technically suitable and still perform poorly as part of a project if the surrounding infrastructure is not properly coordinated.",
        "InfraCore™ brings the physical backbone of the project into one engineering framework.",
        "The objective is to reduce disconnects between process design, site development, equipment installation and utility infrastructure.",
      ],
    },
    approach: {
      flow: "PROCESS → LAYOUT → INFRASTRUCTURE → INTERFACES → EXECUTION",
      after: [
        "KEC Agritech approaches infrastructure as an integrated part of project engineering.",
        "Because the real test of engineering is not whether individual components work on paper.",
        "It is whether the complete system can be built, connected, operated and maintained as one project.",
      ],
    },
    cta: {
      heading: "BUILD THE CORE. CONNECT THE SYSTEMS.",
      line: "Explore InfraCore™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Civil Infrastructure • Plant Layout • Utility Integration • Project Engineering",
    },
  },

  /* 12 ──────────────────────────────────────────────────────── Smart Control™ */
  "Smart Control™": {
    layer: "digital",
    focus: "Automation & Control",
    tagline: "CONTROL THE PROCESS. COORDINATE THE PLANT.",
    subtitle: "Integrated instrumentation and control planning for more coordinated CBG plant operations.",
    challenge: {
      heading: "A CONNECTED PLANT NEEDS A CONNECTED CONTROL SYSTEM.",
      paras: [
        "A CBG plant involves multiple process stages, equipment packages and utility systems operating together.",
        "Without appropriate instrumentation and control architecture, operators may have limited visibility into process conditions and system status.",
        "The engineering challenge is to create a control framework that connects field-level measurement, equipment operation, process logic and operator interaction.",
      ],
    },
    addresses: {
      items: [
        { title: "INSTRUMENTATION", desc: "Identify relevant measurement and sensing requirements across process and utility systems." },
        { title: "CONTROL LOGIC", desc: "Translate process requirements into appropriate control and operating logic." },
        { title: "EQUIPMENT COORDINATION", desc: "Coordinate equipment operation and interlocks across connected systems." },
        { title: "OPERATOR VISIBILITY", desc: "Provide relevant operating information through appropriate control and monitoring interfaces." },
        { title: "SYSTEM INTEGRATION", desc: "Connect instrumentation and control architecture with the wider plant engineering framework." },
      ],
    },
    flow: { steps: ["MEASURE", "MONITOR", "CONTROL", "COORDINATE", "OPERATE"] },
    why: {
      paras: [
        "Automation is not simply about adding sensors or a control panel.",
        "A useful control system begins with understanding what needs to be measured, what needs to be controlled, what conditions require intervention, and how different systems interact.",
        "Smart Control™ helps translate those process requirements into a structured control architecture.",
      ],
    },
    approach: {
      flow: "PROCESS → INSTRUMENTATION → CONTROL LOGIC → INTERFACES → OPERATION",
      after: [
        "KEC Agritech approaches automation as part of the overall plant-engineering system.",
        "The objective is to create appropriate connections between process conditions, field instrumentation, equipment controls and operator visibility.",
        "Because better control begins with better engineering understanding.",
      ],
    },
    cta: {
      heading: "CONTROL THE PROCESS. COORDINATE THE PLANT.",
      line: "Explore Smart Control™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Instrumentation • Automation • Control Systems • Plant Integration",
    },
  },

  /* 13 ──────────────────────────────────────────────────────── Process Sense™ */
  "Process Sense™": {
    layer: "digital",
    focus: "Process Understanding",
    tagline: "UNDERSTAND THE PROCESS. RESPOND WITH CLARITY.",
    subtitle: "Process-condition understanding for more informed CBG plant operation and engineering decisions.",
    challenge: {
      heading: "PROCESS CONDITIONS ARE ALWAYS TELLING A STORY.",
      paras: [
        "A CBG process is influenced by changing feedstock characteristics, feeding conditions, temperature, loading, retention, gas production and other operating variables.",
        "Looking at individual parameters in isolation may not provide the complete picture.",
        "The engineering challenge is to understand what the process conditions are indicating—and how different variables relate to each other.",
      ],
    },
    addresses: {
      items: [
        { title: "PROCESS CONDITIONS", desc: "Understand relevant operating conditions across the digestion and process systems." },
        { title: "PARAMETER RELATIONSHIPS", desc: "Consider how changes in one operating parameter may relate to changes elsewhere in the process." },
        { title: "TREND RECOGNITION", desc: "Identify developing patterns rather than relying only on individual readings." },
        { title: "PROCESS AWARENESS", desc: "Support operators and engineering teams in developing a clearer understanding of process behaviour." },
      ],
    },
    flow: { steps: ["MEASURE", "RELATE", "INTERPRET", "RESPOND", "LEARN"] },
    why: {
      heading: "A NUMBER IS NOT AN INSIGHT.",
      paras: [
        "A process parameter only becomes useful when it is understood in context.",
        "Process Sense™ encourages a more connected approach to process interpretation—bringing together operating conditions, trends and process behaviour to support informed decisions.",
        "It does not replace operator judgement.",
        "It helps strengthen the information available for that judgement.",
      ],
    },
    approach: {
      flow: "PROCESS → PARAMETERS → RELATIONSHIPS → INTERPRETATION → ACTION",
      after: [
        "KEC Agritech approaches process understanding as an engineering discipline.",
        "The objective is to move beyond simply asking:",
        "“What is the reading?”",
        "and towards:",
        "“What is the process telling us?”",
        "Because better process understanding creates a stronger foundation for operation, control and continuous improvement.",
      ],
    },
    cta: {
      heading: "UNDERSTAND THE PROCESS. RESPOND WITH CLARITY.",
      line: "Explore Process Sense™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Process Engineering • Process Monitoring • Digestion Management • Plant Operations",
    },
  },

  /* 14 ──────────────────────────────────────────────────────── Plant Vision™ */
  "Plant Vision™": {
    layer: "digital",
    focus: "Plant Visibility",
    tagline: "SEE THE PLANT. UNDERSTAND THE SYSTEM.",
    subtitle: "Integrated plant visibility for better operational awareness and engineering decisions.",
    challenge: {
      heading: "A COMPLEX PLANT NEEDS MORE THAN INDIVIDUAL DATA POINTS.",
      paras: [
        "A CBG plant consists of interconnected process, utility, gas, electrical and supporting systems.",
        "Information may exist across different equipment and operating areas, but isolated information does not always provide a clear picture of what is happening across the plant.",
        "The challenge is to bring relevant information together into a more connected view of plant performance and operating conditions.",
      ],
    },
    addresses: {
      items: [
        { title: "PLANT VISIBILITY", desc: "Bring relevant plant information together for a clearer operational view." },
        { title: "SYSTEM STATUS", desc: "Understand the status of key process, utility and supporting systems." },
        { title: "TREND AWARENESS", desc: "Identify changes and operating patterns across the plant." },
        { title: "ENGINEERING INSIGHT", desc: "Support teams with information that can contribute to better operational and engineering decisions." },
        { title: "CONNECTED VIEW", desc: "Create a broader picture of how different plant systems are operating together." },
      ],
    },
    flow: { steps: ["DATA", "VISIBILITY", "SYSTEM VIEW", "INSIGHT", "DECISION"] },
    why: {
      paras: [
        "A modern CBG plant generates information across multiple systems.",
        "The value comes from being able to see the relationship between those systems, rather than viewing every parameter independently.",
        "Plant Vision™ supports a more connected understanding of plant operation—helping teams move from individual observations to a broader system view.",
      ],
    },
    approach: {
      flow: "PROCESS → SYSTEMS → DATA → VISIBILITY → DECISION",
      after: [
        "KEC Agritech approaches plant visibility as an extension of engineering—not simply as a dashboard exercise.",
        "The objective is to connect relevant operational information with the physical and process architecture of the plant.",
        "Because when you understand the complete system, you can make better-informed decisions about the parts.",
      ],
    },
    cta: {
      heading: "SEE THE PLANT. UNDERSTAND THE SYSTEM.",
      line: "Explore Plant Vision™ with KEC Agritech.",
      keywords: "CBG • Bio-CNG • Plant Monitoring • Operational Visibility • Engineering Intelligence",
    },
  },
};
