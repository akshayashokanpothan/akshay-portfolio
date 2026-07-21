export interface WorkItem {
  slug: string;
  href: string | null; // null = case study not yet published ("Coming soon")
  tag: string;
  title: string;
  role: string;
  timeline: string;
  summary: string;
  impact: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  illustration?: "sbi" | "quickbot" | "behance";
  featured?: boolean; // true = shown in "Selected Works" (prominent), false/undefined = "Other Works"
  external?: boolean; // true = real external link (not a case study), opens in a new tab
  ctaLabel?: string; // overrides the default "View case study" CTA text
}

export const WORK_ITEMS: WorkItem[] = [
  {
    slug: "factweavers",
    href: "/work/factweavers",
    tag: "AI decision intelligence",
    title: "FactWeavers AI",
    role: "Product Designer 2 · Dbiz AI",
    timeline: "2025 - 2026",
    summary:
      "Designed the core workspace for an AI-powered analytics platform that turns raw enterprise data into decision-ready narratives for data and business teams.",
    impact: "Cut time-to-insight for pilot customers from days to minutes",
    thumbnail: "/projects/factweavers/factweavers-thumbnail.png",
    thumbnailAlt: "FactWeavers Discover / Insights Hub showing metric cards with AI summaries and trend charts.",
    featured: true,
  },
  {
    slug: "asteradocs",
    href: "/work/asteradocs",
    tag: "Enterprise document management",
    title: "AsteraDocs",
    role: "Product Designer · Innovatily",
    timeline: "2025",
    summary:
      "Designed an enterprise document management system bringing storage, approvals, version control, permissions, and governance into one scalable workspace.",
    impact: "Structured fragmented document workflows into one role-aware system",
    thumbnail: "/projects/asteradocs/asteradocs-thumbnail.png",
    thumbnailAlt: "AsteraDocs dashboard showing document activity, recent documents, team activity, and storage usage.",
    featured: true,
  },
  {
  slug: "universal-ai",
  href: null,
  tag: "AI · Business intelligence",
  title: "Universal AI: Data into Actionable Insights",
  role: "Product Designer · FactWeavers",
  timeline: "2025-26",
  summary:
    "A conversational AI experience for FactWeavers that lets users interact with business data in natural language, discover insights, and move from AI-generated responses toward reusable metrics and dashboards.",
  impact: "Transformed complex BI workflows into a conversational AI experience for faster insight discovery and dashboard creation.",
  thumbnail: "/projects/thumbnails/universai-ai-thumbnail.png",
  thumbnailAlt: "FactWeavers Universal AI conversational analytics view generating a chart from a natural-language question.",
},

  {
  slug: "quickbot",
  href: null,
  tag: "Conversational commerce · AI",
  title: "Quickbot: Easy & Quick E-Commerce Chat Experiences",
  role: "Product Designer · Innovatily",
  timeline: "2024-25",
  summary:
    "A conversational commerce POC exploring how customers could discover, compare, and evaluate products through an AI-powered chatbot instead of navigating a traditional e-commerce site.",
  impact: "A conceptual POC; not an official partnership or deployment.",
  thumbnail: "/projects/thumbnails/quickbot-thumbnail.png",
  thumbnailAlt: "Quickbot conversational e-commerce chatbot experience POC.",
},

  {
  slug: "sbi-yono-login",
  href: null,
  tag: "Fintech · UX case study",
  title: "Revamping the SBI YONO Login Experience",
  role: "Independent UX Case Study",
  timeline: "2024",
  summary:
    "A UX exploration focused on rethinking the SBI YONO login experience to make authentication clearer, more intuitive, and easier to navigate.",
  impact: "An independent case study not commissioned or published by SBI.",
  thumbnail: "/projects/thumbnails/sbiyono-thumbnail.png",
  thumbnailAlt: "SBI YONO login experience redesign case study.",
},
  
  
  {
  slug: "behance",
  href: "https://www.behance.net/akshayashokan1",
  tag: "Visual design · Explorations",
  title: "Explore More on Behance; Mockups, UI Explorations, etc.",
  role: "",
  timeline: "",
  summary: "A collection of additional UI explorations, visual concepts, and design mockups.",
  impact: "Discover more visual design work and UI explorations on Behance.",
  thumbnail: "/projects/thumbnails/behance-thumbnail.png",
  thumbnailAlt: "Visual design mockups and UI explorations available on Behance.",
  external: true,
  ctaLabel: "Explore Behance",
},
];

// Used by the FactWeavers case study's "Next project" CTA
export const NEXT_PROJECT = {
  title: "Universal AI",
  tag: "Conversational AI · AI-powered analytics",
  status: "Coming soon",
};
