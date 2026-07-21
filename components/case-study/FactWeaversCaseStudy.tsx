"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Users,
  Layers,
  Boxes,
  MessageSquare,
  SlidersHorizontal,
  UserCog,
  ShieldCheck,
  Clock,
  TrendingDown,
  TrendingUp,
  Quote,
  Target,
  Compass,
  Network,
  BarChart3,
  Handshake,
  GitBranch,
  LucideIcon,
} from "lucide-react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Callout, StatPop, BackToTop } from "@/components/ui/CaseStudyPrimitives";
import { ReadingProgress, CaseUtilityBar, ScrollSpyTOC, NextProjectCard } from "@/components/case-study/shared/CaseStudyChrome";
import { NEXT_PROJECT } from "@/lib/data/work";

/* ------------------------------------------------------------------ */
/* Content — sourced only from the approved case study                 */
/* ------------------------------------------------------------------ */

const META = {
  name: "FactWeavers",
  tagline: "Data-to-Metrics Transformation & Intelligent Analytics Platform",
  sub: "Converting unstructured and operational data into measurable metrics and actionable insights",
  role: "Product Designer",
  roleNote: "Data Systems & Analytics Experience",
  duration: "6 months",
  team: "4 designers",
  org: "Dbiz AI",
  readingTime: "11 min read",
};

const KEY_RESULTS = [
  { value: "3–4×", label: "Faster dashboard creation", note: "vs traditional workflows" },
  { value: "20–30 min", label: "Average time to build a dashboard", note: "using the guided flow" },
  { value: "↑ Trust", label: "In AI-generated insights", note: "through explainability" },
];

const TEAM = ["Junior Product Designer", "Product Designer (me)", "Principal Product Designer"];
const TOOLS = ["Figma", "FigJam", "shadcn/ui", "React"];
const ARCHETYPES = [
  { name: "Business users", detail: "Executives and managers who need answers, not configuration" },
  { name: "Data analysts / scientists", detail: "Deep, flexible exploration of underlying data" },
  { name: "Admin / super admin", detail: "System setup, access, and permissions" },
];

interface Challenge {
  n: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  impact: string;
  why: string;
  opportunity: string;
}

const CHALLENGES: Challenge[] = [
  { n: "01", icon: Clock, title: "Manual & inefficient metric creation", problem: "Data teams spent significant time manually defining and stitching metrics instead of focusing on deeper analysis.", impact: "Insight generation slowed down across every team waiting on a metric.", why: "Every hour spent stitching metrics manually was an hour not spent on analysis — the platform's core value.", opportunity: "AI-assisted metric creation (solution pillar 01)" },
  { n: "02", icon: Network, title: "Fragmented data-to-decision workflow", problem: "The journey from data onboarding to metric creation to dashboard building was disconnected across multiple steps.", impact: "Users lost context moving between steps, producing a broken end-to-end experience.", why: "A platform that can't carry context across its own workflow can't be trusted with a business's decisions.", opportunity: "A single connected flow, restructured through the information architecture" },
  { n: "03", icon: UserCog, title: "High dependency on technical teams", problem: "Business stakeholders and executives relied heavily on data teams to generate reports and dashboards.", impact: "Delays and reduced agility in decision-making for the people actually making decisions.", why: "The platform's promise was self-serve insight — this dependency broke that promise at the last mile.", opportunity: "Role-based onboarding & access control (solution pillar 04)" },
  { n: "04", icon: Sparkles, title: "Limited AI integration in core workflows", problem: "AI capabilities existed but weren't embedded into metric creation or dashboard generation.", impact: "AI functioned as an add-on rather than a core part of the experience.", why: "Bolted-on AI rarely gets used — it needed to live inside the workflows people already had.", opportunity: "AI-assisted metric creation & conversational data exploration (pillars 01–02)" },
  { n: "05", icon: ShieldCheck, title: "Low trust in AI-generated insights", problem: "Users lacked visibility into how metrics and insights were generated — sources, logic, transformations.", impact: "Reduced confidence in AI outputs limited adoption of the platform's core differentiator.", why: "Trust is the gate to adoption — an unexplainable AI is an unused AI in enterprise settings.", opportunity: "\u201cAI must be explainable and actionable\u201d (design principle 01)" },
  { n: "06", icon: Layers, title: "Cognitive overload in dashboard creation", problem: "Dashboard creation exposed too much complexity upfront, before users had context to use it.", impact: "Difficult to build or customize dashboards without technical knowledge or prior experience.", why: "Complexity shown too early reads as difficulty — even when the underlying task is simple.", opportunity: "Progressive disclosure & flexible dashboard filtering (principle 04, pillar 03)" },
];

const OWNERSHIP = { owned: "Owned", led: "Led", contributed: "Contributed", shared: "Shared with team" } as const;

interface Contribution {
  category: string;
  icon: LucideIcon;
  level: string;
  detail: string;
  outcome: string;
}

const MY_CONTRIBUTION: Contribution[] = [
  { category: "Product discovery", icon: Compass, level: OWNERSHIP.contributed, detail: "Worked with the founder, product owners, and principal designer to translate business goals into design requirements and constraints.", outcome: "Aligned design decisions with technical feasibility before any screen was drawn." },
  { category: "UX strategy", icon: Target, level: OWNERSHIP.led, detail: "Defined the design principles that guided metric creation, AI interaction, and dashboard experience across the platform.", outcome: "Gave the wider team a shared decision-making framework, not just a visual style." },
  { category: "Information architecture", icon: Network, level: OWNERSHIP.contributed, detail: "Contributed to restructuring the platform into a modular onboard → define → visualize → share flow, alongside the principal designer.", outcome: "Reduced context-switching across what had been a fragmented, multi-step journey." },
  { category: "AI experience design", icon: Sparkles, level: OWNERSHIP.led, detail: "Owned the conversational, AI-assisted metric creation feature end to end — from interaction model to explainability pattern.", outcome: "The feature most directly tied to the platform's 3–4× speed improvement." },
  { category: "Dashboard experience", icon: BarChart3, level: OWNERSHIP.owned, detail: "Owned dashboard customization and the real-time filtering system — dropdowns, text, number, and date-based conditions.", outcome: "Turned static dashboards into a self-serve exploration tool for non-technical users." },
  { category: "Design systems", icon: Boxes, level: OWNERSHIP.contributed, detail: "Designed dashboard theming and contributed component patterns to the shared system layer — cards, charts, and role-based states.", outcome: "Fed directly into a component library reused across three major platform surfaces." },
  { category: "Cross-functional collaboration", icon: Handshake, level: OWNERSHIP.shared, detail: "Worked closely with product, engineering, and data teams throughout to ensure feasibility of AI-driven workflows.", outcome: "Kept design decisions grounded in what was actually shippable within the 6-month timeline." },
  { category: "Developer handoff", icon: GitBranch, level: OWNERSHIP.contributed, detail: "Documented interaction states, permission logic, and component behavior for engineering handoff on owned workflows.", outcome: "Reduced back-and-forth during implementation of the metric creation and dashboard flows." },
];

const LEVEL_STYLE: Record<string, { color: string; bg: string }> = {
  [OWNERSHIP.owned]: { color: COLORS.accent, bg: COLORS.accentSoft },
  [OWNERSHIP.led]: { color: COLORS.accent, bg: COLORS.accentSoft },
  [OWNERSHIP.contributed]: { color: COLORS.inkSoft, bg: COLORS.surface },
  [OWNERSHIP.shared]: { color: COLORS.muted, bg: COLORS.surface },
};

const ROLE_ITEMS = [
  { title: "Product collaboration & requirement definition", detail: "Worked with the founder, product owners, and principal designer to align design decisions with business and technical constraints." },
  { title: "Metric creation experience", detail: "Enhanced the metric creation flow for basic and composite metrics, simplifying complex configuration." },
  { title: "Conversational metric creation (AI)", detail: "Led the design of an AI-driven feature for creating metrics instantly through conversational input." },
  { title: "User onboarding & role-based setup", detail: "Designed onboarding that differentiates BI users and admin users for structured organization setup." },
  { title: "Dashboard customization & controls", detail: "Built flexible filtering — dropdowns, text, number, and date-based inputs — for dashboard views." },
  { title: "Visual design & theming", detail: "Designed dashboard themes for visual consistency across data-heavy interfaces." },
  { title: "Cross-functional collaboration", detail: "Worked closely with product, engineering, and data teams to ensure feasibility of AI-driven workflows." },
];

const PRINCIPLES = [
  { n: "01", icon: ShieldCheck, title: "AI must be explainable and actionable", detail: "Every AI-generated metric needed to clearly communicate how it was derived, so users could validate outputs and act with confidence.", implication: "Every AI surface ships with a visible reasoning trail, not just an output.", business: "Higher enterprise adoption of AI features — the top blocker was trust, not capability." },
  { n: "02", icon: Layers, title: "From metric creation to insight in one flow", detail: "I designed a connected workflow so users move seamlessly from defining metrics to generating and visualizing insights.", implication: "Metric creation, exploration, and visualization share one continuous IA, not separate tools.", business: "Fewer drop-offs between steps that used to be handed off between teams." },
  { n: "03", icon: Users, title: "Enable non-technical users without limiting power", detail: "Simplified interactions for business users, while retaining flexibility for advanced configuration.", implication: "Every guided flow has an escape hatch into advanced configuration.", business: "Widened the addressable user base beyond data teams without losing power users." },
  { n: "04", icon: Boxes, title: "Progressive disclosure of complexity", detail: "Flows reveal complexity progressively — users start simple, and go deeper only when they need to.", implication: "Default views stay minimal; configuration surfaces expand on demand.", business: "Reduced onboarding drop-off caused by upfront complexity." },
  { n: "05", icon: SlidersHorizontal, title: "Flexible & customizable exploration", detail: "Flexible filtering lets users tailor dashboards to their context without breaking system consistency.", implication: "Filtering is a first-class system, not a per-dashboard configuration option.", business: "Reduced one-off dashboard requests routed through data teams." },
];

const PILLARS = [
  { n: "01", title: "AI-assisted metric creation", detail: "Generate and configure metrics using natural language and structured workflows, reducing manual setup." },
  { n: "02", title: "Conversational data exploration", detail: "Explore insights, refine queries, and compare outputs through AI-driven interaction." },
  { n: "03", title: "Flexible dashboard & filtering system", detail: "Interactive, real-time filtering turns dashboards into decision-making tools." },
  { n: "04", title: "Role-based onboarding & access control", detail: "Structured, role-aware setup replacing a one-size-fits-all onboarding flow." },
];

interface Workflow {
  tag: string;
  title: string;
  intro: string;
  steps: string[];
  aiSteps: string[] | null;
  impact: string;
  insight: string;
  icon: LucideIcon;
  decision: string;
  shots?: Shot[];
}

const WORKFLOWS: Workflow[] = [
  {
    tag: "Workflow 01",
    title: "Defining metrics & generating insights",
    intro: "Metric creation was one of the most complex and critical parts of the platform, often requiring multiple configuration steps and technical understanding. I redesigned it to support both structured configuration and AI-assisted creation.",
    steps: ["Select data entity", "Define logic", "Set dimensions", "Preview", "Publish"],
    aiSteps: ["Enter prompt", "Generate metric", "Review", "Configure", "Publish"],
    impact: "Reduced time and effort required to define metrics, enabling faster, self-serve analytics.",
    insight: "AI-assisted creation reduces setup complexity and accelerates metric definition compared to traditional workflows — supporting time-based, categorical, and non-dimensional configurations.",
    icon: Sparkles,
    decision: "I considered replacing structured configuration with AI entirely, but kept both paths. Business users default to the conversational flow; analysts who need precise control fall back to the structured one. Neither path was allowed to feel like a fallback.",
    shots: [
      { src: "/projects/factweavers/factweavers-schema-management.png", alt: "FactWeavers entity selection screen for choosing the dataset structure and attributes a metric will be built on." },
      { src: "/projects/factweavers/factweavers-create-metrics.png", alt: "FactWeavers manual metric creation wizard on the Choose Entity step, with a data preview table and step indicator." },
      { src: "/projects/factweavers/factweavers-create-metric-ai.png", alt: "FactWeavers conversational metric creation showing a natural-language request and a generated tabular result with a save-as-metric prompt." },
    ],
  },
  {
    tag: "Workflow 02",
    title: "Exploring data with AI",
    intro: "AI interactions were designed to enable intuitive data exploration — users interact with existing metrics through a conversational interface, shifting the experience from static dashboards to interactive decision-making.",
    steps: ["Ask query", "AI generates explainable insight", "Explore", "Refine", "Compare", "Apply to dashboard / decision"],
    aiSteps: null,
    impact: "Improved accessibility of insights and increased confidence in AI-driven outputs.",
    insight: "Explainable AI — reasoning, data sources, and assumptions surfaced with every response — helped bridge the gap between data complexity and user understanding.",
    icon: MessageSquare,
    decision: "The alternative was a black-box answer with a confidence score. I chose to always show reasoning and sources instead — slower to read, but it's what made enterprise users willing to act on an AI-generated number.",
    shots: [
      { src: "/projects/factweavers/factweavers-universal-ai.png", alt: "FactWeavers Universal AI conversational analytics view generating a top-clients chart from a natural-language question." },
      { src: "/projects/factweavers/factweavers-save-as-metric.png", alt: "FactWeavers save-as-metric modal showing calculation logic, unit, default dimension, time context, and time comparison settings." },
    ],
  },
  {
    tag: "Workflow 03",
    title: "Building & customizing dashboards",
    intro: "Dashboard creation was redesigned to support flexible visualization and real-time customization — users build with predefined components and refine views through dynamic filtering.",
    steps: ["Select dimension", "Choose condition (equals / contains / range)", "Define value or range", "Apply filter", "Dashboard updates in real time"],
    aiSteps: null,
    impact: "Reduced dependency on data teams, enabling faster, self-serve decision-making.",
    insight: "Treating filtering as an interactive system — not a static configuration — turned dashboards into dynamic exploration tools for both simple and advanced workflows.",
    icon: SlidersHorizontal,
    decision: "Real-time updates on every filter change felt magical in demos but strained performance at scale. I prioritized perceived performance — optimistic UI and progressive updates — over guaranteeing instant recalculation on every dataset size.",
    shots: [
      { src: "/projects/factweavers/factweavers-dashboard-builder.png", alt: "FactWeavers dashboard builder with the dataset panel open, showing a selected dataset and its attributes ready to add to the canvas." },
      { src: "/projects/factweavers/factweavers-filter-controls.png", alt: "FactWeavers filter control configuration panel, mapping a department dropdown filter to multiple dashboard widgets." },
      { src: "/projects/factweavers/factweavers-dashboard.png", alt: "FactWeavers completed dashboard with bar, donut, and area charts summarizing packaging and supply data." },
    ],
  },
  {
    tag: "Workflow 04",
    title: "User onboarding & role-based setup",
    intro: "The existing onboarding was fragmented and technically oriented, creating friction for business stakeholders. I redesigned it as a role-aware, guided system that adapts based on user context.",
    steps: ["User entry", "Identify role", "Business / analyst / admin path", "Setup & configure", "Validate & publish"],
    aiSteps: null,
    impact: "Reduced onboarding friction, enabling faster adoption across business and technical teams.",
    insight: "Designing onboarding as a role-aware system — rather than a linear flow — aligned the platform with real-world team structures.",
    icon: UserCog,
    decision: "A single onboarding path was simpler to build, but it forced business users through steps meant for admins. I split entry points by role instead, accepting more upfront design and engineering work for a much shorter path to first value.",
    shots: [
      { src: "/projects/factweavers/facweavers-onboarding-team.png", alt: "FactWeavers add-new-user dialog with a role dropdown listing BI user, Data Steward, Data Scientist, Data Engineer, Data Analyst, and Data Admin." },
      { src: "/projects/factweavers/factweavers-roles-permissions.png", alt: "FactWeavers user management table showing an invited teammate with their assigned role and pending status." },
      { src: "/projects/factweavers/factweavers-onboarding-data.png", alt: "FactWeavers Amazon Redshift connection dialog requesting host, port, database name, username, and password." },
    ],
  },
];

const SYSTEM_LAYERS = [
  { n: "1", title: "Composable component library", detail: "Data-carrying primitives — cards, inputs, controls — built to hold metrics, AI output, and interactive states within one consistent shell.", tags: ["Composable", "State-driven", "AI-aware zone"], impact: ["One shell resolved once, cutting repeated design effort across three major surfaces", "AI summary as a composable slot let engineering ship new AI-powered card variants without a design dependency", "Reduced new metric type implementation from multi-week design cycles to configuration decisions"] },
  { n: "2", title: "Role-aware, permission-driven UI", detail: "Component behavior, action visibility, and information depth adapt by role — each persona sees exactly what they need, with no interface clutter.", tags: ["Role-aware", "Permission-driven", "Contextually adaptive"], impact: ["One adaptive system served three distinct personas — no duplicate interfaces, no parallel design tracks", "Surfacing the access model in the UI (not just backend logic) reduced onboarding confusion and support escalation", "Role-conditional rendering meant new features automatically inherited correct access behavior"] },
  { n: "3", title: "Intent-mapped visualization system", detail: "A constrained set of chart types, readable at card scale and expandable to full screen, each mapped to a specific analytical intent.", tags: ["Intent-mapped", "Scale-adaptive", "Anomaly-aware"], impact: ["Constraining chart types to analytical intent prevented visualization sprawl and reduced misinterpretation", "Anomaly as a first-class data state meant engineers inherited exception handling from the system", "Same component served card-level scanning and deep analytical exploration — zero parallel implementations"] },
];

const PERMISSION_MATRIX = {
  roles: ["Viewer", "BI user", "Admin"],
  rows: [
    { capability: "View dashboards", access: [true, true, true] },
    { capability: "Create metrics", access: [false, true, true] },
    { capability: "AI exploration", access: [false, true, true] },
    { capability: "Manage permissions", access: [false, false, true] },
  ],
};

const TRADEOFFS = [
  { n: "01", title: "Simplicity vs. flexibility", detail: "Simplified interfaces reduced onboarding friction but limited advanced use cases. I addressed this with progressive disclosure — guided workflows that unlock deeper configuration as needed." },
  { n: "02", title: "AI automation vs. user control", detail: "Full automation accelerated workflows but reduced trust in high-stakes scenarios. I positioned AI as collaborative — offering suggestions and explainability while keeping users in control of final outputs." },
  { n: "03", title: "Standardization vs. customization", detail: "Strict standardization limited adaptability. I introduced reusable components combined with configurable filters and metrics, balancing consistency with flexibility." },
  { n: "04", title: "Guided experience vs. exploratory freedom", detail: "Guided flows improved onboarding but constrained experienced users. Entry points now transition from structured guidance to open-ended exploration." },
  { n: "05", title: "Performance vs. real-time interaction", detail: "Real-time interaction introduced performance constraints at scale. I prioritized perceived performance — optimized feedback loops and progressive updates over raw backend speed." },
];

const OUTCOME_SUMMARY = [
  { icon: TrendingDown, label: "Time-to-insight", detail: "Simplified metric creation with guided and AI-assisted flows." },
  { icon: TrendingUp, label: "Self-serve analytics", detail: "Business users can explore data independently." },
  { icon: TrendingDown, label: "Dependency on data teams", detail: "Reduced reliance on technical users for setup and analysis." },
  { icon: TrendingUp, label: "Decision confidence", detail: "Improved trust through explainable AI insights." },
];

const IMPACT_CATEGORIES = [
  { n: "01", title: "Product & user impact", items: ["Reduced time to define and configure metrics through structured and AI-assisted workflows", "Enabled non-technical users to explore data independently, without relying on data teams", "Improved clarity in AI-generated insights through explainability — reasoning, sources, assumptions", "Increased decision-making confidence by allowing users to explore, refine, and compare outputs"] },
  { n: "02", title: "System & design impact", items: ["Introduced a modular architecture separating onboarding, metric definition, exploration, and visualization", "Established consistent interaction patterns across workflows, reducing cognitive load", "Created a shared system layer — design system, components, permissions — to ensure scalability", "Enabled progressive disclosure of complexity, supporting both business and advanced users"] },
  { n: "03", title: "Business & team impact", items: ["Accelerated onboarding and activation by simplifying initial setup", "Reduced dependency on data teams by enabling self-serve analytics", "Improved cross-functional collaboration through clearer role-based workflows", "Positioned the platform as a decision-making tool rather than a reporting system"] },
];

const LESSONS = [
  "Designing scalable data systems means balancing flexibility with clarity across diverse user roles.",
  "Simplifying complexity is more effective than hiding it — structured guidance is key.",
  "AI is most valuable when it's explainable and integrated into workflows, not isolated as a feature.",
  "Strong information architecture is foundational to scalable product experiences.",
];

const IA_STAGES = ["Onboard", "Define & create (metrics & AI)", "Visualize (dashboards)", "Share & act"];

const IA_DESCRIPTIONS = [
  "Users onboard their data sources and are guided into the system by role.",
  "Metrics are defined and generated — with AI interaction embedded directly into the metric-creation flow, not bolted on afterward.",
  "Metrics become dynamic, filterable dashboards viewable across yearly, monthly, weekly, and real-time windows.",
  "Dashboards are shared and published across stakeholders, and insights turn into action.",
];

/* ------------------------------------------------------------------ */
/* Reading progress + section nav                                       */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "contribution", label: "My contribution" },
  { id: "problem", label: "The problem" },
  { id: "role", label: "My role" },
  { id: "principles", label: "Design principles" },
  { id: "architecture", label: "Information architecture" },
  { id: "workflows", label: "Key workflows" },
  { id: "system", label: "System design" },
  { id: "impact", label: "Impact" },
  { id: "lessons", label: "Lessons learned" },
];

/* ------------------------------------------------------------------ */
/* Hero + product preview                                               */
/* ------------------------------------------------------------------ */

function DotGrid() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
      <defs>
        <pattern id="dotgrid2" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.3" fill={COLORS.borderStrong} />
        </pattern>
        <radialGradient id="fade2" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fademask2">
          <rect width="100%" height="100%" fill="url(#fade2)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid2)" mask="url(#fademask2)" />
    </svg>
  );
}

interface Shot {
  src: string;
  alt: string;
  aspect?: string;
}

/* Real product screenshot, presented cleanly — no redraws, no device chrome */
function ProductShot({ src, alt, aspect = "3024 / 1964", priority = false }: { src: string; alt: string; aspect?: string; priority?: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${COLORS.border}`,
        background: COLORS.white,
        boxShadow: "0 16px 40px -22px rgba(20,24,28,0.18)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 860px) 100vw, (max-width: 1200px) 90vw, 1100px"
        style={{ objectFit: "cover", objectPosition: "top left" }}
      />
    </div>
  );
}

function ProductGallery({ shots }: { shots: Shot[] }) {
  const cols = shots.length >= 3 ? 3 : shots.length;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }} className="product-gallery">
      {shots.map((s) => (
        <ProductShot key={s.src} src={s.src} alt={s.alt} aspect={s.aspect} />
      ))}
      <style>{`
        @media (max-width: 900px) {
          .product-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .product-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function CaseHero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "40px 0 64px" }}>
      <DotGrid />
      <Container style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center", marginBottom: 40 }} className="hero-top-grid">
          <Reveal>
            <Eyebrow>UI / UX case study</Eyebrow>
            <h1 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: COLORS.ink, margin: "0 0 18px" }}>
              {META.name}
            </h1>
            <p style={{ fontFamily: fontBody, fontSize: 18, color: COLORS.inkSoft, lineHeight: 1.55, marginBottom: 8 }}>{META.tagline}</p>
            <p style={{ fontFamily: fontBody, fontSize: 15, color: COLORS.muted, lineHeight: 1.6, marginBottom: 28 }}>{META.sub}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", background: COLORS.border }} className="hero-meta-grid">
              {[
                { label: "Role", value: META.role, note: META.roleNote },
                { label: "Duration", value: META.duration },
                { label: "Team", value: META.team },
                { label: "Organization", value: META.org },
              ].map((m) => (
                <div key={m.label} style={{ padding: "14px 16px", background: COLORS.white }}>
                  <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink }}>{m.value}</div>
                  {m.note && <div style={{ fontFamily: fontBody, fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{m.note}</div>}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <ProductShot src="/projects/factweavers/factweavers-hero.png" alt="FactWeavers Discover workspace showing an AI-generated container utilisation insight with a chart and top-clients breakdown." priority />
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="key-results-grid">
            {KEY_RESULTS.map((r, i) => (
              <div key={r.label} style={{ background: COLORS.accentSoft, borderRadius: 12, padding: "22px 22px" }}>
                <StatPop value={r.value} label={r.label} note={r.note} delay={i * 90} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .hero-top-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .key-results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProductPreview() {
  const shots: Shot[] = [
    { src: "/projects/factweavers/factweavers-onboarding-organization.png", alt: "FactWeavers guided onboarding hub with cards for connecting data, exploring sample data, managing the team, and configuring the LLM." },
    { src: "/projects/factweavers/factweavers-connect-data.png", alt: "FactWeavers connect-a-data-source screen showing an active Amazon Redshift connection and available connectors including MS SQL and Databricks." },
    { src: "/projects/factweavers/factweavers-import-sample-data.png", alt: "FactWeavers onboarding confirmation after connecting sample data, prompting the user to invite teammates next." },
  ];
  return (
    <section style={{ padding: "0 0 72px" }}>
      <Container>
        <Reveal>
          <ProductGallery shots={shots} />
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Overview + contribution                                              */
/* ------------------------------------------------------------------ */

function QuickOverview() {
  return (
    <section id="overview" style={{ padding: "72px 0", borderTop: `1px solid ${COLORS.border}`, scrollMarginTop: 96 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56 }} className="overview-grid">
          <div>
            <SectionHeading eyebrow="Project overview" title="An AI-native path from raw data to decisions" maxWidth={560} />
            <Reveal delay={100}>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.75, color: COLORS.inkSoft, margin: 0 }}>
                  FactWeavers is an AI-powered decision intelligence platform that transforms raw data into
                  structured metrics, dashboards, and actionable insights. Teams onboard data sources, define
                  metrics, and convert them into dynamic dashboards tracking performance across yearly, monthly,
                  weekly, and real-time views — shared across internal teams and external clients.
                </p>
                <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.75, color: COLORS.inkSoft, margin: 0 }}>
                  At its core, an AI layer lets users interact with their data conversationally — asking
                  questions, generating insights, and exploring predictive trends. Beyond visualization, the
                  platform supports goal and target setting at the metric level.
                </p>
                <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.75, color: COLORS.inkSoft, margin: 0 }}>
                  While functionally robust, the experience lacked cohesion — workflows from onboarding to
                  insight generation were fragmented, and AI wasn&apos;t deeply embedded into decision-making. This
                  project focused on transforming FactWeavers into a unified, AI-native system.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 10 }}>Team</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {TEAM.map((t) => (
                    <div key={t} style={{ fontFamily: fontBody, fontSize: 14.5, color: t.includes("(me)") ? COLORS.accent : COLORS.inkSoft, fontWeight: t.includes("(me)") ? 500 : 400 }}>{t}</div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 10 }}>Tools & stack</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {TOOLS.map((t) => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 10 }}>User archetypes</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {ARCHETYPES.map((a) => (
                    <div key={a.name} style={{ borderLeft: `2px solid ${COLORS.border}`, paddingLeft: 12 }}>
                      <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink }}>{a.name}</div>
                      <div style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{a.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} style={{ marginTop: 40 }}>
          <ProductShot src="/projects/factweavers/factweavers-home-discover.png" alt="FactWeavers Discover / Insights Hub showing a catalog of metric cards with trend charts and AI summaries." />
          <p style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.muted, marginTop: 10 }}>
            Discover — the entry point where users browse the existing metric and dashboard catalog before creating something new.
          </p>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContributionSection() {
  return (
    <section id="contribution" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="My contribution"
          title="What I owned, on a four-designer team"
          subtitle="Not everything on this page was mine alone. Here's exactly where I held the pen — and where I worked in support of the wider team."
          maxWidth={680}
        />
        <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
          {Object.values(OWNERSHIP).map((l) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: LEVEL_STYLE[l].color, display: "inline-block" }} />
              <span style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted }}>{l}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 32 }} className="contribution-grid">
          {MY_CONTRIBUTION.map((c, i) => (
            <Reveal delay={i * 50} key={c.category} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "22px 22px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 9, background: COLORS.surface, flexShrink: 0 }}>
                  <c.icon size={16} color={COLORS.ink} strokeWidth={1.75} />
                </span>
                <span style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: LEVEL_STYLE[c.level].color, background: LEVEL_STYLE[c.level].bg, borderRadius: 5, padding: "4px 8px" }}>
                  {c.level}
                </span>
              </div>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 15.5, color: COLORS.ink, margin: "0 0 8px" }}>{c.category}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.6, color: COLORS.inkSoft, margin: "0 0 10px" }}>{c.detail}</p>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start", borderTop: `1px solid ${COLORS.border}`, paddingTop: 10 }}>
                <ArrowRight size={12} color={COLORS.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted, lineHeight: 1.5 }}>{c.outcome}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .contribution-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Problem / challenges                                                 */
/* ------------------------------------------------------------------ */

function ProblemSection() {
  return (
    <section id="problem" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="The problem" title="Technically capable. Not seamless, not trustworthy." subtitle="The platform failed to deliver a cohesive data-to-decision experience. Six structural challenges limited usability, scalability, and adoption." maxWidth={680} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginTop: 44, background: COLORS.border, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }} className="challenge-grid">
          {CHALLENGES.map((c, i) => (
            <Reveal delay={i * 60} key={c.n} style={{ background: COLORS.white, padding: "26px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, background: COLORS.accentSoft, flexShrink: 0 }}>
                    <c.icon size={15} color={COLORS.accent} strokeWidth={1.75} />
                  </span>
                  <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.muted }}>{c.n}</span>
                </div>
              </div>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: COLORS.ink, margin: "0 0 12px", lineHeight: 1.3 }}>{c.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "62px 1fr", gap: 8 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.muted, paddingTop: 1 }}>Problem</span>
                  <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.inkSoft, margin: 0 }}>{c.problem}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "62px 1fr", gap: 8 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.muted, paddingTop: 1 }}>Impact</span>
                  <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.inkSoft, margin: 0 }}>{c.impact}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "62px 1fr", gap: 8 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.accent, paddingTop: 1 }}>Why</span>
                  <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.inkSoft, margin: 0, fontStyle: "italic" }}>{c.why}</p>
                </div>
              </div>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${COLORS.border}`, display: "flex", alignItems: "center", gap: 6 }}>
                <ArrowRight size={12} color={COLORS.accent} />
                <span style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.accent }}>{c.opportunity}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} style={{ marginTop: 32, maxWidth: 680 }}>
          <p style={{ fontFamily: fontBody, fontSize: 15.5, lineHeight: 1.6, color: COLORS.inkSoft, fontStyle: "italic" }}>
            This wasn&apos;t a feature-level problem — it was a system-level challenge involving workflow
            fragmentation, trust in AI, and enabling fast, independent decision-making.
          </p>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .challenge-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Role                                                                  */
/* ------------------------------------------------------------------ */

function RoleSection() {
  return (
    <section id="role" style={{ padding: "72px 0", scrollMarginTop: 96 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56 }} className="role-grid">
          <SectionHeading eyebrow="My role" title="Where I focused, on a four-designer team" subtitle="I contributed to key platform workflows — how users create metrics, interact with AI, and customize dashboards." maxWidth={420} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ROLE_ITEMS.map((r, i) => (
              <Reveal delay={i * 60} key={r.title} style={{ padding: "18px 0", borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 4 }}>
                  <h3 style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 15, color: COLORS.ink, margin: 0 }}>{r.title}</h3>
                  <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.6, color: COLORS.muted, margin: 0 }}>{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .role-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Design principles                                                    */
/* ------------------------------------------------------------------ */

function PrinciplesSection() {
  return (
    <section id="principles" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Strategic direction" title="Five principles that guided every decision" subtitle="The platform was technically capable but lacked a cohesive experience. These principles guided metric creation, AI interaction, and dashboard design." maxWidth={680} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 44 }} className="principle-grid">
          {PRINCIPLES.map((p, i) => (
            <Reveal delay={i * 70} key={p.n} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <p.icon size={20} color={COLORS.accent} strokeWidth={1.75} />
                <span style={{ fontFamily: fontMono, fontSize: 11.5, color: COLORS.muted }}>{p.n}</span>
              </div>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 15.5, color: COLORS.ink, margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.muted, margin: "0 0 14px" }}>{p.detail}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 8 }}>
                  <Layers size={12} color={COLORS.inkSoft} style={{ marginTop: 2 }} />
                  <span style={{ fontFamily: fontBody, fontSize: 12, lineHeight: 1.5, color: COLORS.inkSoft }}>{p.implication}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 8 }}>
                  <TrendingUp size={12} color={COLORS.accent} style={{ marginTop: 2 }} />
                  <span style={{ fontFamily: fontBody, fontSize: 12, lineHeight: 1.5, color: COLORS.accent }}>{p.business}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} style={{ marginTop: 40, borderRadius: 14, padding: "28px 32px", background: COLORS.white, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 16 }}>Solution — four pillars</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="pillar-grid">
            {PILLARS.map((p) => (
              <div key={p.n}>
                <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 8 }}>{p.n}</div>
                <h4 style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 14.5, color: COLORS.ink, margin: "0 0 6px" }}>{p.title}</h4>
                <p style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .principle-grid { grid-template-columns: 1fr 1fr !important; }
          .pillar-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .principle-grid { grid-template-columns: 1fr !important; }
          .pillar-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Information architecture — interactive flow                          */
/* ------------------------------------------------------------------ */

function IAFlow() {
  const [active, setActive] = useState(0);
  return (
    <section id="architecture" style={{ padding: "72px 0", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Information architecture" title="A modular system, restructured for clear progression" subtitle="The existing platform had fragmented workflows and flows that assumed technical expertise. I restructured it into stages that reduce context switching." maxWidth={680} />
        <Reveal delay={100} style={{ marginTop: 44 }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: 4, overflowX: "auto" }} className="ia-rail">
            {IA_STAGES.map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => setActive(i)}
                  style={{
                    flex: "1 0 160px",
                    textAlign: "left",
                    cursor: "pointer",
                    background: active === i ? COLORS.ink : COLORS.white,
                    color: active === i ? COLORS.bg : COLORS.ink,
                    border: `1px solid ${active === i ? COLORS.ink : COLORS.border}`,
                    borderRadius: 10,
                    padding: "18px 16px",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ fontFamily: fontMono, fontSize: 11, opacity: 0.6, marginBottom: 6 }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500 }}>{s}</div>
                </button>
                {i < IA_STAGES.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", color: COLORS.muted }}>
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 4, borderRadius: 10, background: COLORS.accentSoft, padding: "16px 20px", fontFamily: fontBody, fontSize: 14, color: COLORS.inkSoft, lineHeight: 1.6 }}>
            {IA_DESCRIPTIONS[active]}
          </div>
          <div style={{ marginTop: 20, borderTop: `1px solid ${COLORS.border}`, paddingTop: 20 }}>
            <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 6 }}>System layer</div>
            <p style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.6, color: COLORS.inkSoft, margin: 0, maxWidth: 640 }}>
              A shared system layer — design system, themes, charts, and permissions — runs beneath all four
              stages, ensuring consistency, scalability, and alignment across every workflow.
            </p>
          </div>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .ia-rail { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Workflow sections — alternating layout                               */
/* ------------------------------------------------------------------ */



function WorkflowSection({ workflow, index }: { workflow: Workflow; index: number }) {
  return (
    <div style={{ padding: "56px 0", borderTop: index === 0 ? "none" : `1px solid ${COLORS.border}` }}>
      <Container>
        <Reveal style={{ maxWidth: 720, marginBottom: 32 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 10 }}>{workflow.tag}</div>
          <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(22px, 2.6vw, 28px)", color: COLORS.ink, margin: "0 0 14px", letterSpacing: "-0.01em" }}>{workflow.title}</h3>
          <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.7, color: COLORS.inkSoft, marginBottom: 20 }}>{workflow.intro}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Callout kind="insight" title="Impact">{workflow.impact}</Callout>
            <Callout kind="change" title="Insight">{workflow.insight}</Callout>
          </div>
        </Reveal>
        {workflow.shots && workflow.shots.length > 0 && (
          <Reveal delay={100} style={{ marginBottom: 28 }}>
            {workflow.shots.length === 1 ? <ProductShot src={workflow.shots[0].src} alt={workflow.shots[0].alt} /> : <ProductGallery shots={workflow.shots} />}
          </Reveal>
        )}
        {workflow.decision && (
          <Reveal delay={80}>
            <Callout kind="decision" title={`Why this approach — ${workflow.title.toLowerCase()}`}>{workflow.decision}</Callout>
          </Reveal>
        )}
      </Container>
    </div>
  );
}

function WorkflowsSection() {
  return (
    <section id="workflows" style={{ background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container style={{ paddingTop: 72 }}>
        <SectionHeading eyebrow="Key workflows & interaction design" title="From data setup to insight, with minimal friction" subtitle="Balancing guided experiences for non-technical users with flexibility for advanced ones." maxWidth={680} />
      </Container>
      {WORKFLOWS.map((w, i) => (
        <WorkflowSection workflow={w} index={i} key={w.title} />
      ))}
      <style>{`
        @media (max-width: 860px) {
          .workflow-grid { grid-template-columns: 1fr !important; }
          .workflow-grid > div { order: initial !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* System design                                                        */
/* ------------------------------------------------------------------ */

function CardAnatomy() {
  const layers = [
    { n: "01", label: "Context layer", detail: "Metric identity, scope, hierarchy" },
    { n: "02", label: "Primary data layer", detail: "Key value and performance change" },
    { n: "03", label: "Visualization layer", detail: "Trends and patterns over time" },
    { n: "04", label: "AI insight layer", detail: "Explainability, reasoning, anomaly detection" },
    { n: "05", label: "Metadata layer", detail: "Context for validation and traceability" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="anatomy-grid">
      <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20 }}>
        <div style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>Metric title</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 500, color: COLORS.ink }}>1.732M</span>
          <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent }}>MTD</span>
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>$350 · 26% vs previous month</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48, marginBottom: 14 }}>
          {[40, 55, 35, 70, 50, 90, 60, 75].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: i === 5 ? COLORS.accent : COLORS.borderStrong }} />
          ))}
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 12, color: COLORS.inkSoft, background: COLORS.surface, borderRadius: 7, padding: "9px 10px", marginBottom: 10 }}>
          AI summary — reasoning and anomaly flagged inline with the chart.
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 11.5, color: COLORS.muted }}>Last updated Jan 14, 2025 · Category name</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {layers.map((l) => (
          <div key={l.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontFamily: fontMono, fontSize: 11, color: COLORS.accent, paddingTop: 2 }}>{l.n}</span>
            <div>
              <div style={{ fontFamily: fontBody, fontSize: 13.5, fontWeight: 500, color: COLORS.ink }}>{l.label}</div>
              <div style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted }}>{l.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PermissionMatrixTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: fontBody, fontSize: 13.5 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px 12px", color: COLORS.muted, fontWeight: 500, fontSize: 12, borderBottom: `1px solid ${COLORS.border}` }}>Capability</th>
            {PERMISSION_MATRIX.roles.map((r) => (
              <th key={r} style={{ textAlign: "center", padding: "10px 12px", color: COLORS.muted, fontWeight: 500, fontSize: 12, borderBottom: `1px solid ${COLORS.border}` }}>{r}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERMISSION_MATRIX.rows.map((row) => (
            <tr key={row.capability}>
              <td style={{ padding: "10px 12px", color: COLORS.inkSoft, borderBottom: `1px solid ${COLORS.border}` }}>{row.capability}</td>
              {row.access.map((has, i) => (
                <td key={i} style={{ textAlign: "center", padding: "10px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", background: has ? COLORS.accentSoft : "transparent", color: COLORS.accent, lineHeight: "18px", fontSize: 12 }}>
                    {has ? "✓" : "–"}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SystemDesignSection() {
  return (
    <section id="system" style={{ padding: "72px 0", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Design system & system layer" title="A behavioral layer, not a visual one" subtitle="Structured across three interconnected layers — components, role-based behavior, and visualization — working together to enable scalable, AI-driven experiences." maxWidth={700} />

        <Reveal delay={100} style={{ marginTop: 44 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 12 }}>{SYSTEM_LAYERS[0].n} · {SYSTEM_LAYERS[0].title}</div>
          <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.7, color: COLORS.inkSoft, maxWidth: 700, marginBottom: 20 }}>{SYSTEM_LAYERS[0].detail}</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {SYSTEM_LAYERS[0].tags.map((t) => <Pill key={t}>{t}</Pill>)}
          </div>
          <div style={{ marginBottom: 28 }}>
            <ProductShot src="/projects/factweavers/factweavers-design-system.png" alt="FactWeavers exported design system showing metric card variants, dashboard collection cards, and menu/button component states across default, hover, active, and focused states." aspect="8000 / 3085" />
          </div>
          <CardAnatomy />
          <ul style={{ marginTop: 20, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {SYSTEM_LAYERS[0].impact.map((i) => (
              <li key={i} style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.6, color: COLORS.muted }}>{i}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} style={{ marginTop: 64, borderTop: `1px solid ${COLORS.border}`, paddingTop: 48 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 12 }}>{SYSTEM_LAYERS[1].n} · {SYSTEM_LAYERS[1].title}</div>
          <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.7, color: COLORS.inkSoft, maxWidth: 700, marginBottom: 20 }}>{SYSTEM_LAYERS[1].detail}</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {SYSTEM_LAYERS[1].tags.map((t) => <Pill key={t}>{t}</Pill>)}
          </div>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 22 }}>
            <PermissionMatrixTable />
            <p style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.6, color: COLORS.muted, marginTop: 16, marginBottom: 0 }}>
              Key design decision — the access model is reflected in the UI, not just backend logic. Role-awareness
              is a first-class system constraint, not a post-launch patch.
            </p>
          </div>
          <ul style={{ marginTop: 20, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {SYSTEM_LAYERS[1].impact.map((i) => (
              <li key={i} style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.6, color: COLORS.muted }}>{i}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} style={{ marginTop: 64, borderTop: `1px solid ${COLORS.border}`, paddingTop: 48 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 12 }}>{SYSTEM_LAYERS[2].n} · {SYSTEM_LAYERS[2].title}</div>
          <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.7, color: COLORS.inkSoft, maxWidth: 700, marginBottom: 20 }}>{SYSTEM_LAYERS[2].detail}</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {SYSTEM_LAYERS[2].tags.map((t) => <Pill key={t}>{t}</Pill>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="chart-type-grid">
            {[
              { label: "Line chart", note: "Trend over time" },
              { label: "Bar chart", note: "Comparison / volume" },
              { label: "Number metric", note: "Snapshot KPI" },
              { label: "Horizontal bar", note: "Ranked breakdown" },
            ].map((c) => (
              <div key={c.label} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36, marginBottom: 10 }}>
                  {[30, 55, 40, 70, 50, 85].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: COLORS.borderStrong }} />
                  ))}
                </div>
                <div style={{ fontFamily: fontBody, fontSize: 13, fontWeight: 500, color: COLORS.ink }}>{c.label}</div>
                <div style={{ fontFamily: fontBody, fontSize: 11.5, color: COLORS.muted }}>{c.note}</div>
              </div>
            ))}
          </div>
          <ul style={{ marginTop: 20, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {SYSTEM_LAYERS[2].impact.map((i) => (
              <li key={i} style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.6, color: COLORS.muted }}>{i}</li>
            ))}
          </ul>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .anatomy-grid { grid-template-columns: 1fr !important; }
          .chart-type-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trade-offs                                                           */
/* ------------------------------------------------------------------ */

function TradeoffsSection() {
  return (
    <section style={{ padding: "72px 0", background: COLORS.surface }}>
      <Container>
        <SectionHeading eyebrow="Design decisions & trade-offs" title="Five tensions I designed through" maxWidth={620} />
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column" }}>
          {TRADEOFFS.map((t, i) => (
            <Reveal delay={i * 50} key={t.n} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 20, padding: "22px 0", borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}` }} className="tradeoff-row">
              <div style={{ fontFamily: fontMono, fontSize: 13, color: COLORS.accent }}>{t.n}</div>
              <div>
                <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: COLORS.ink, margin: "0 0 8px" }}>{t.title}</h3>
                <p style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.65, color: COLORS.inkSoft, margin: 0, maxWidth: 640 }}>{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 560px) {
          .tradeoff-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact                                                                */
/* ------------------------------------------------------------------ */

function ImpactSection() {
  return (
    <section id="impact" style={{ padding: "72px 0", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Impact & outcomes" title="From reporting tool to decision-making system" subtitle="The redesign shifted users from fragmented, developer-led workflows to a fast, self-serve decision-making system." maxWidth={680} />

        <Reveal delay={100} style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="outcome-grid">
          {OUTCOME_SUMMARY.map((o) => (
            <div key={o.label} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 18px", background: COLORS.white }}>
              <o.icon size={18} color={COLORS.accent} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink, marginBottom: 4 }}>{o.label}</div>
              <div style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted, lineHeight: 1.5 }}>{o.detail}</div>
            </div>
          ))}
        </Reveal>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="impact-cat-grid">
          {IMPACT_CATEGORIES.map((c, i) => (
            <Reveal delay={i * 80} key={c.n} style={{ background: COLORS.surface, borderRadius: 14, padding: "26px 24px" }}>
              <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 10 }}>{c.n}</div>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16, color: COLORS.ink, margin: "0 0 14px" }}>{c.title}</h3>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.items.map((it) => (
                  <li key={it} style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.55, color: COLORS.muted }}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .outcome-grid { grid-template-columns: 1fr 1fr !important; }
          .impact-cat-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .outcome-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Lessons learned                                                      */
/* ------------------------------------------------------------------ */

function LessonsSection() {
  return (
    <section id="lessons" style={{ padding: "88px 0", background: COLORS.ink, scrollMarginTop: 96 }}>
      <Container>
        <Reveal>
          <Quote size={28} color={COLORS.accentSoft} style={{ marginBottom: 20 }} />
          <div style={{ fontFamily: fontMono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8FB8AC", marginBottom: 24 }}>Key learnings</div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="lessons-grid">
          {LESSONS.map((l, i) => (
            <Reveal delay={i * 80} key={l} style={{ borderLeft: "2px solid #2E5A4E", paddingLeft: 18 }}>
              <p style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(17px, 1.8vw, 20px)", lineHeight: 1.45, color: COLORS.bg, margin: 0, letterSpacing: "-0.01em" }}>{l}</p>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .lessons-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Next project (Coming soon) + Back to all work                        */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export function FactWeaversCaseStudy() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", fontFamily: fontBody }}>
      <ReadingProgress />
      <CaseUtilityBar readingTime={META.readingTime} />
      <CaseHero />
      <ProductPreview />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "200px 1fr", gap: 0 }} className="body-grid">
        <aside className="toc-col">
          <ScrollSpyTOC items={TOC} />
        </aside>
        <div style={{ minWidth: 0 }}>
          <QuickOverview />
          <ContributionSection />
          <ProblemSection />
          <RoleSection />
          <PrinciplesSection />
          <IAFlow />
          <WorkflowsSection />
          <SystemDesignSection />
          <TradeoffsSection />
          <ImpactSection />
        </div>
      </div>

      <LessonsSection />
      <NextProjectCard title={NEXT_PROJECT.title} tag={NEXT_PROJECT.tag} status={NEXT_PROJECT.status} />
      <BackToTop />

      <style>{`
        @media (max-width: 980px) {
          .body-grid { grid-template-columns: 1fr !important; }
          .toc-col { display: none; }
        }
      `}</style>
    </div>
  );
}
