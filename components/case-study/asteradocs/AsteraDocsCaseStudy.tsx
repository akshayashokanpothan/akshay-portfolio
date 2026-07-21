"use client";

import Image from "next/image";
import {
  ArrowRight,
  Upload,
  ClipboardCheck,
  History,
  Users,
  ShieldCheck as ShieldIcon,
  Webhook,
  Search,
  Share2,
  FolderTree,
  KeyRound,
  Wrench,
  Building2,
  Eye,
  ScanEye,
  Layers,
  MessageSquareWarning,
  LucideIcon,
} from "lucide-react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Callout, BackToTop } from "@/components/ui/CaseStudyPrimitives";
import { ReadingProgress, CaseUtilityBar, ScrollSpyTOC, NextProjectCard, TocItem } from "@/components/case-study/shared/CaseStudyChrome";

/* ------------------------------------------------------------------ */
/* Product's own visual identity - used ONLY where we're literally     */
/* documenting the AsteraDocs design system, never as the page's own   */
/* palette. The portfolio's ink/teal system stays dominant everywhere  */
/* else, per the brief.                                                */
/* ------------------------------------------------------------------ */

const PRODUCT = {
  primary: "#2F3A8F",
  accent: "#3DA9FC",
  text: "#6B7280",
  bg: "#F9FAFB",
};

const META = {
  name: "AsteraDocs",
  tagline: "Your workflow's best mate.",
  category: "Enterprise Document Management System (DMS)",
  headline: "Bringing structure, control, and collaboration to enterprise document workflows.",
  sub: "AsteraDocs is an enterprise document management system designed to simplify how teams store, organize, share, approve, version, and govern business-critical documents.",
  role: "UI/UX Designer",
  platform: "Desktop & Mobile",
  duration: "3 Months",
  designPhaseNote: "The UI/UX design phase took approximately 25 days, followed by product implementation during the remainder of the project timeline.",
  product: "Enterprise Document Management System",
  readingTime: "10 min read",
};

const FOCUS_AREAS = ["Enterprise UX", "Document management", "Role-based access", "Approval workflows", "Version control", "Design systems"];

const TECH_CONTEXT = "AsteraDocs leveraged Strapi as its CMS foundation, simplifying core content-management logic and allowing the product experience to focus on enterprise workflows including approvals, version control, access management, and integrations.";

/* ------------------------------------------------------------------ */
/* Problem                                                              */
/* ------------------------------------------------------------------ */

interface Problem {
  icon: LucideIcon;
  title: string;
  detail: string;
}

const PROBLEMS: Problem[] = [
  { icon: FolderTree, title: "Documents scattered across departments", detail: "Files lived across shared drives, email threads, and messaging platforms with no single source of truth." },
  { icon: ClipboardCheck, title: "No structured approval workflows", detail: "Approvals happened informally; over chat or email with no clear record of who approved what, or when." },
  { icon: KeyRound, title: "Poor experience managing roles & access", detail: "Granting or auditing access meant depending on IT, with little visibility into who could see or edit what." },
  { icon: History, title: "Difficult version tracking", detail: "Teams struggled to confirm which copy of a document was current, leading to duplicate and conflicting versions." },
  { icon: ScanEye, title: "Limited audit visibility", detail: "Compliance and risk teams had no centralized way to review activity, access history, or document lifecycle." },
];

/* ------------------------------------------------------------------ */
/* Goals → strategic pillars                                           */
/* ------------------------------------------------------------------ */

const PILLARS = [
  { icon: Search, title: "Findability", detail: "Reduce time spent searching for documents across departments." },
  { icon: Share2, title: "Collaboration", detail: "Enable seamless sharing and collaboration across teams." },
  { icon: ShieldIcon, title: "Control", detail: "Improve document access control and strengthen security." },
  { icon: ScanEye, title: "Governance", detail: "Support compliance with clear approval trails and audit visibility." },
  { icon: Building2, title: "Scalability", detail: "Scale cleanly across large organizations, teams, and departments." },
];

/* ------------------------------------------------------------------ */
/* Role & contribution                                                  */
/* ------------------------------------------------------------------ */

const ROLE_ITEMS = [
  { title: "UX research & problem framing", detail: "Framed the core coordination problem behind enterprise document management system: not just file storage, but people, permissions, and process." },
  { title: "Persona definition & user modeling", detail: "Defined three role-based archetypes to represent how operational, managerial, and governance users experience the same system differently." },
  { title: "Information architecture", detail: "Structured the full navigation model: documents, approvals, version control, team, admin, and integrations into one coherent hierarchy." },
  { title: "Document upload & metadata design", detail: "Designed the file-selection-to-completion upload flow, including metadata and classification steps." },
  { title: "Permission & approval workflow design", detail: "Designed role-aware permission states and the request → review → approve/reject workflow." },
  { title: "Version control experience", detail: "Designed version listing, history, comparison, and branching views for non-technical users." },
  { title: "Team & admin control design", detail: "Designed team/department management and the admin panel: users, roles, activity logs, storage." },
  { title: "Integration experience & interaction design", detail: "Took the product from wireframes through high-fidelity UI, a reusable component system, and an interactive prototype, including the third-party integrations experience." },
];

/* ------------------------------------------------------------------ */
/* User archetypes                                                      */
/* ------------------------------------------------------------------ */

interface Archetype {
  level: string;
  role: string;
  icon: LucideIcon;
  needs: string[];
  pains: string[];
  complexity: string;
}

const ARCHETYPES: Archetype[] = [
  {
    level: "Role 01 · Operational user",
    role: "Operations Executive",
    icon: Upload,
    needs: ["Upload documents", "Organize files", "Share files", "Maintain folder structure", "Archive documents"],
    pains: ["Repetitive organization", "Duplicate versions", "Limited activity visibility", "Reliance on email or messaging for sharing"],
    complexity: "Task-level: simple, frequent actions inside a stable folder structure.",
  },
  {
    level: "Role 02 · Power user",
    role: "Department Manager / HR Manager",
    icon: ShieldIcon,
    needs: ["Manage sensitive documents", "Control access", "Track versions", "Prepare for audits", "Manage document lifecycle"],
    pains: ["Difficulty identifying latest versions", "Limited renewal alerts", "Folder and naming conflicts", "Dependence on IT for permissions"],
    complexity: "Team-level: access control and lifecycle decisions across a department.",
  },
  {
    level: "Role 03 · Strategic / governance user",
    role: "Compliance or Risk Leader",
    icon: ScanEye,
    needs: ["Organization-wide oversight", "Retention policies", "Access visibility", "Audit preparation", "Risk monitoring"],
    pains: ["Fragmented departmental systems", "Inconsistent classification", "Limited risk visibility", "Weak integration with enterprise systems"],
    complexity: "System-level: oversight and policy across every team and document in the org.",
  },
];

/* ------------------------------------------------------------------ */
/* Design principles                                                    */
/* ------------------------------------------------------------------ */

const PRINCIPLES = [
  { n: "01", icon: Eye, title: "Make document state visible", detail: "Users should always understand current version, approval status, ownership, and permissions at a glance." },
  { n: "02", icon: Layers, title: "Progressive complexity", detail: "Common actions stay simple. Advanced controls surface only when a user actually needs them." },
  { n: "03", icon: KeyRound, title: "Permission transparency", detail: "Users should always understand who can view, edit, share, or approve a given document." },
  { n: "04", icon: MessageSquareWarning, title: "Build trust through feedback", detail: "Sensitive actions such as  delete, share, approve, require confirmation, status feedback, and clear microcopy." },
  { n: "05", icon: Building2, title: "Design for enterprise scale", detail: "Components and workflows need to hold up across teams, departments, roles, and large document libraries." },
];

/* ------------------------------------------------------------------ */
/* Information architecture                                             */
/* ------------------------------------------------------------------ */

const IA_MODULES = [
  { title: "Home", items: ["Recent activity", "Team activity"] },
  { title: "Documents", items: ["Search & filter", "Search folders", "Upload files", "Recent documents"] },
  { title: "Upload", items: ["File selection", "Metadata", "Permission management", "Completion"] },
  { title: "Approvals", items: ["Pending", "Completed", "My requests"] },
  { title: "Version control", items: ["Version listing", "Version history", "Compare versions", "Version branching", "Version analytics"] },
  { title: "Team", items: ["Team", "Departments", "Team activity", "Analytics"] },
  { title: "Admin panel", items: ["Users", "Roles & permissions", "Activity logs", "Storage management"] },
  { title: "Integrations", items: ["Connected", "Browse integrations", "Available integrations", "API & webhooks", "Manage webhooks"] },
  { title: "Help, support & settings", items: ["Help & support", "Settings"] },
];

/* ------------------------------------------------------------------ */
/* Core product architecture                                           */
/* ------------------------------------------------------------------ */

const SYSTEMS = [
  { icon: Upload, title: "Document management" },
  { icon: ClipboardCheck, title: "Approval engine" },
  { icon: History, title: "Version control" },
  { icon: Users, title: "Team & permissions" },
  { icon: Wrench, title: "Administration" },
  { icon: Webhook, title: "Integrations" },
];

const SHARED_ENTITIES = ["Users", "Documents", "Roles", "Permissions", "Statuses", "Versions", "Activity"];

/* ------------------------------------------------------------------ */
/* Workflows                                                            */
/* ------------------------------------------------------------------ */

interface WorkflowShot {
  src: string;
  alt: string;
}

interface Workflow {
  tag: string;
  title: string;
  intro: string;
  steps: string[];
  impact: string;
  insight: string;
  icon: LucideIcon;
  shots?: WorkflowShot[];
  capabilities?: string[];
  usability?: string;
}

const WORKFLOWS: Workflow[] = [
  {
    tag: "Workflow 01",
    title: "Document upload & organization",
    intro: "Uploading a document is simple. Preparing it for enterprise use is not. Users need to define context, classification, metadata, access, and ownership before a file becomes a governed enterprise document.",
    steps: ["File selection", "Metadata", "Permission management", "Completion"],
    impact: "A predictable, repeatable path from raw file to organized, access-controlled document.",
    insight: "Breaking the process into progressive steps; instead of one dense form - kept the common case fast while still capturing what governance requires.",
    icon: Upload,
  },
  {
    tag: "Workflow 02",
    title: "Document approval",
    intro: "Before AsteraDocs, documents and approval discussions were often fragmented across email, chat, and support tickets, making it hard for teams to maintain visibility into approval progress and decisions. The approval experience brings that into one structured, traceable system, supporting employees submitting documents, managers reviewing them, and admins overseeing the workflow.",
    steps: ["Request approval", "Pending", "Under review", "Approved / rejected", "Completed"],
    impact: "Reviewers and requesters both get a clear, current picture of where every document stands.",
    insight: "Separating \u201cPending,\u201d \u201cCompleted,\u201d and \u201cMy requests\u201d into distinct views answers three different questions with one workflow; what needs my attention, what's waiting on someone else, and what's already resolved.",
    icon: ClipboardCheck,
    capabilities: ["Reviewing the document and its relevant history", "Adding comments or feedback", "Requesting changes", "Approving or rejecting"],
    usability: "Usability testing with target users indicated that the overall approval workflow was easy to understand and navigate. Feedback informed minor UI and interaction refinements without requiring fundamental changes to the workflow.",
    shots: [
      { src: "/projects/asteradocs/approval-workflow1.png", alt: "AsteraDocs pending approvals view showing a document in a multi-stage review chain, Marketing Director, VP Marketing, and CMO. With stage progress indicated." },
      { src: "/projects/asteradocs/approval-workflow2.png", alt: "AsteraDocs completed approvals view showing an approved document and a rejected document with a recorded reason." },
      { src: "/projects/asteradocs/approval-workflow3.png", alt: "AsteraDocs my requests view within the approval workflow, shown in its empty state with an option to submit a new approval request." },
    ],
  },
  {
    tag: "Workflow 03",
    title: "Version control",
    intro: "Teams experienced confusion around duplicate document versions and needed clearer visibility into document history and the current version. The experience was designed to make the current document state clear while preserving access to version history, comparison, branching, and analytics.",
    steps: ["Version listing", "Version history", "Compare versions", "Version branching", "Version analytics"],
    impact: "All five capabilities; listing, history, comparison, branching, and analytics were designed and implemented.",
    insight: "Each version surfaces its author, timestamp, file size, and change type at a glance, so identifying the right version doesn't require opening the file.",
    icon: History,
    shots: [
      { src: "/projects/asteradocs/version-control.png", alt: "AsteraDocs version history view listing documents with version numbers, current/archived status, author, date, file size, and download counts." },
      { src: "/projects/asteradocs/version-control2.png", alt: "AsteraDocs version history filtered to a single document, showing its v3.2 current version alongside two earlier archived versions with author and change details." },
      { src: "/projects/asteradocs/version-control3.png", alt: "AsteraDocs version history for a different document, showing its current version alongside earlier archived versions with author and change details." },
    ],
  },
  {
    tag: "Workflow 04",
    title: "Team & permission management",
    intro: "Users belong to teams, departments, and roles. Permissions determine what each person can view, edit, upload, share, approve, or administrator and the design focus was making that logic transparent rather than inventing exact rules beyond what the product defines.",
    steps: ["Team members", "Departments", "Roles & permissions", "Team analytics"],
    impact: "Access decisions become visible and understandable, not a black box managed only by IT.",
    insight: "Permission transparency mattered more than permission granularity; users needed to see who could do what, more than configure every edge case themselves.",
    icon: Users,
    shots: [
      { src: "/projects/asteradocs/team-management1.png", alt: "AsteraDocs team members view showing member cards with role, department, storage, and last-active status." },
      { src: "/projects/asteradocs/team-management2.png", alt: "AsteraDocs departments view showing department cards with member count, storage usage, and document totals." },
      { src: "/projects/asteradocs/team-management4.png", alt: "AsteraDocs team analytics view showing total members, documents, active users, and department performance scores." },
    ],
  },
  {
    tag: "Workflow 05",
    title: "Admin controls",
    intro: "Administrators need system-level control, roles & permissions, activity logs, storage management - without that complexity leaking into the everyday experience of operational users.",
    steps: ["Users", "Roles & permissions", "Activity logs", "Storage management"],
    impact: "Two distinct experiences from one system: task-oriented for regular users, system-level for admins.",
    insight: "Role-aware interfaces meant the admin panel could hold real complexity without ever showing up for someone who just needs to upload a file.",
    icon: Wrench,
    shots: [
      { src: "/projects/asteradocs/admin-controls2.png", alt: "AsteraDocs roles & permissions view showing Admin, Manager, User, and Viewer roles with their permission sets and user counts." },
      { src: "/projects/asteradocs/admin-controls3.png", alt: "AsteraDocs activity logs view listing recent team actions with user, action type, timestamp, and IP address." },
      { src: "/projects/asteradocs/admin-controls4.png", alt: "AsteraDocs storage management view showing total storage, document counts, active users, and storage by department." },
    ],
  },
  {
    tag: "Workflow 06",
    title: "Third-party integrations",
    intro: "Enterprise document systems rarely operate in isolation. The integrations experience supports extensibility, connecting external tools and webhooks, while staying understandable to configure, including handling connection failures gracefully.",
    steps: ["Browse integrations", "Available integrations", "Connected", "API & webhooks", "Manage webhooks"],
    impact: "A clear separation between discovering, connecting, and managing integrations and their webhooks.",
    insight: "Treating \u201cavailable\u201d and \u201cconnected\u201d as distinct states rather than one long list made an inherently technical area easier to scan. The connected view also surfaces failure states, like an expired API key, rather than hiding them.",
    icon: Webhook,
    shots: [
      { src: "/projects/asteradocs/integrations1.png", alt: "AsteraDocs connected integrations view showing Google Drive and Slack connected successfully, and Zapier showing a connection error with an expired API key." },
      { src: "/projects/asteradocs/integrations2.png", alt: "AsteraDocs available integrations view showing Google Drive, Dropbox, OneDrive, Slack, Trello, and Zoom with feature lists and connect buttons." },
      { src: "/projects/asteradocs/integrations3.png", alt: "AsteraDocs API & webhooks view showing API key management and API usage monitoring." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Wireframe → final UI progression (representative examples only)     */
/* ------------------------------------------------------------------ */

const PROGRESSIONS = [
  {
    title: "Document upload",
    problem: "Enterprise uploads need context, not just a file.",
    wireframe: "Rough single-step form sketch, all fields at once.",
    decision: "Split into progressive steps: selection → metadata → permissions → completion.",
    final: "A guided, four-step upload flow with clear progress.",
  },
  {
    title: "Approval workflow",
    problem: "Reviewers couldn't tell what needed their attention.",
    wireframe: "Early sketch mixed pending, completed, and requested items in one list.",
    decision: "Separate Pending / Completed / My requests into distinct, filterable views.",
    final: "A tabbed approval workspace with reviewer-level clarity.",
  },
];

/* ------------------------------------------------------------------ */
/* Key design decisions                                                 */
/* ------------------------------------------------------------------ */

const DECISIONS = [
  { n: "01", title: "Simple actions vs. enterprise complexity", challenge: "Enterprise DMS products are, by nature, full of complex controls.", decision: "Keep primary document actions simple while progressively exposing advanced functionality only when needed." },
  { n: "02", title: "Flexibility vs. permission control", challenge: "Users need to collaborate freely without compromising sensitive information.", decision: "Design role-aware permissions and explicit, visible sharing states rather than implicit access." },
  { n: "03", title: "Latest version vs. full history", challenge: "Most users need the latest document; auditors sometimes need full historical context.", decision: "Prioritize the current version by default while keeping version history one step away, not hidden." },
  { n: "04", title: "User autonomy vs. administrative governance", challenge: "Teams need independence to move fast; organizations need centralized control.", decision: "Separate task-level workflows from administrative controls so neither gets in the other's way." },
  { n: "05", title: "Power vs. usability", challenge: "Advanced enterprise features can overwhelm non-technical, day-to-day users.", decision: "Use progressive disclosure and contextual actions so power is available without being the default view." },
];

/* ------------------------------------------------------------------ */
/* Trade-offs - framed as design considerations, not production claims */
/* ------------------------------------------------------------------ */

const TRADEOFFS = [
  { a: "Control", b: "Speed", detail: "More permission steps improve governance but increase workflow friction, a tension worth designing around rather than resolving once." },
  { a: "Flexibility", b: "Consistency", detail: "Custom folder structures give teams freedom but can reduce organization-wide consistency over time." },
  { a: "Visibility", b: "Information density", detail: "Enterprise dashboards need to be comprehensive without becoming overwhelming a balance explored throughout the admin and version-control views." },
  { a: "Automation", b: "User confidence", detail: "Automated workflows save time, but users still need visibility into document state to trust the system." },
];

/* ------------------------------------------------------------------ */
/* Design system                                                        */
/* ------------------------------------------------------------------ */

const TYPE_SCALE = [32, 24, 18, 16];
const TYPE_WEIGHTS = ["Bold", "Semi Bold", "Medium"];
const COMPONENTS = ["Buttons", "Inputs", "File cards", "Modals", "Tags", "Status badges", "Navigation", "Tables", "Permission controls", "Approval states", "Version indicators"];

/* ------------------------------------------------------------------ */
/* System layer                                                         */
/* ------------------------------------------------------------------ */

const SYSTEM_LAYERS = [
  {
    n: "1",
    title: "Status & state system",
    detail: "Document, approval, and version states share one visual language, so a status means the same thing everywhere it appears in the product.",
    tags: ["Document states", "Approval states", "Version states"],
  },
  {
    n: "2",
    title: "Role & permission system",
    detail: "Permission logic is expressed consistently across upload, sharing, and admin surfaces. The same visual pattern for \u201cwho can do what,\u201d wherever it shows up.",
    tags: ["Role system", "Permission system"],
  },
  {
    n: "3",
    title: "Feedback & confirmation patterns",
    detail: "Sensitive actions: delete, share, approve - trigger the same confirmation and toast patterns, building predictable trust across the whole system.",
    tags: ["Activity feedback", "Confirmation patterns"],
  },
];

/* ------------------------------------------------------------------ */
/* Outcomes & learnings - qualitative only, per the original reference */
/* ------------------------------------------------------------------ */

const OUTCOMES = [
  { title: "Designing for scale & versatility", detail: "The system supported different enterprise contexts, including operational documentation, HR workflows, and compliance-related use cases." },
  { title: "Simplifying complex workflows", detail: "Permissions, approvals, version tracking, and administrative workflows were structured into clearer, task-based experiences." },
  { title: "Usability validation", detail: "Usability testing with target users indicated that non-technical users could understand and navigate core document and approval workflows effectively. Feedback resulted in minor UI and interaction refinements." },
  { title: "System thinking", detail: "A structured information architecture, reusable components, and modular workflows supported consistency, prototyping, stakeholder collaboration, and implementation." },
];

const LEARNINGS = [
  { title: "Enterprise UX requires deep empathy", detail: "Understanding multiple user roles, operational, managerial, governance - was essential to building relevant, non-biased workflows for each." },
  { title: "Clear feedback prevents user anxiety", detail: "Sensitive actions like deleting, sharing, approving, or managing versions need clear system feedback. Microcopy, toasts, confirmation modals, version labels, and status indicators all build trust." },
  { title: "Modular design pays off", detail: "Reusable components, file cards, modals, tag chips, status badges. Improved consistency and made developer handoff smoother, while system thinking and modular workflows helped the product scale across different use cases." },
];

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "users", label: "Users" },
  { id: "architecture", label: "Architecture" },
  { id: "workflows", label: "Workflows" },
  { id: "decisions", label: "Decisions" },
  { id: "design-system", label: "Design system" },
  { id: "outcomes", label: "Outcomes" },
  { id: "learnings", label: "Learnings" },
];

/* ==================================================================== */
/* Hero                                                                  */
/* ==================================================================== */

function DotGrid() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
      <defs>
        <pattern id="ad-dotgrid" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.3" fill={COLORS.borderStrong} />
        </pattern>
        <radialGradient id="ad-fade" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="ad-fademask">
          <rect width="100%" height="100%" fill="url(#ad-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#ad-dotgrid)" mask="url(#ad-fademask)" />
    </svg>
  );
}

function CaseHero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "40px 0 64px" }}>
      <DotGrid />
      <Container style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 48, alignItems: "center" }} className="hero-top-grid">
          <Reveal>
            <Eyebrow>UI / UX case study</Eyebrow>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <h1 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: COLORS.ink, margin: 0 }}>
                {META.name}
              </h1>
              <span style={{ fontFamily: fontBody, fontSize: 15, fontStyle: "italic", color: COLORS.muted }}>{META.tagline}</span>
            </div>
            <p style={{ fontFamily: fontMono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 20 }}>{META.category}</p>
            <p style={{ fontFamily: fontBody, fontSize: 18, color: COLORS.inkSoft, lineHeight: 1.55, marginBottom: 8 }}>{META.headline}</p>
            <p style={{ fontFamily: fontBody, fontSize: 15, color: COLORS.muted, lineHeight: 1.6, marginBottom: 24 }}>{META.sub}</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {FOCUS_AREAS.map((f) => <Pill key={f}>{f}</Pill>)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", background: COLORS.border }} className="hero-meta-grid">
              {[
                { label: "Role", value: META.role },
                { label: "Platform", value: META.platform },
                { label: "Duration", value: META.duration },
              ].map((m) => (
                <div key={m.label} style={{ padding: "14px 16px", background: COLORS.white }}>
                  <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink }}>{m.value}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted, marginTop: 12, lineHeight: 1.5 }}>{META.designPhaseNote}</p>
          </Reveal>

          <Reveal delay={120}>
            <ProductShot src="/projects/asteradocs/dashboard.png" alt="AsteraDocs dashboard showing quick actions for uploading documents, requesting approval, and sharing files, alongside recent activity, team activity, and storage usage." priority />
          </Reveal>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .hero-top-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .hero-meta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Overview                                                              */
/* ==================================================================== */

function QuickOverview() {
  return (
    <section id="overview" style={{ padding: "72px 0", borderTop: `1px solid ${COLORS.border}`, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Project overview" title="Not a storage problem. A coordination problem." maxWidth={620} />
        <Reveal delay={100} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
          <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.75, color: COLORS.inkSoft, margin: 0 }}>
            Enterprise teams often manage critical documents across fragmented systems, shared drives,
            email threads, messaging platforms, and outdated document tools. That fragmentation creates
            duplicate versions, unclear ownership, manual approval processes, poor permission visibility,
            and weak auditability.
          </p>
          <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.75, color: COLORS.inkSoft, margin: 0 }}>
            Enterprise document management isn&apos;t simply a file-storage problem. It&apos;s a coordination
            problem involving people, permissions, versions, approvals, compliance, ownership, and
            auditability all at once.
          </p>
          <Callout kind="insight" title="Framing question">
            How might we make complex document workflows feel simple, without compromising the enterprise
            control that makes them trustworthy?
          </Callout>
          <Callout kind="change" title="Technical context">{TECH_CONTEXT}</Callout>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==================================================================== */
/* Challenge                                                            */
/* ==================================================================== */

function ChallengeSection() {
  return (
    <section id="challenge" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="The problem" title="Five structural gaps in how enterprise teams manage documents" maxWidth={680} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, marginTop: 44, background: COLORS.border, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }} className="problem-grid">
          {PROBLEMS.map((p, i) => (
            <Reveal delay={i * 60} key={p.title} style={{ background: COLORS.white, padding: "24px 26px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: COLORS.accentSoft, marginBottom: 14 }}>
                <p.icon size={15} color={COLORS.accent} strokeWidth={1.75} />
              </span>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 15.5, color: COLORS.ink, margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{p.detail}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} style={{ marginTop: 32, maxWidth: 680 }}>
          <p style={{ fontFamily: fontBody, fontSize: 15.5, lineHeight: 1.65, color: COLORS.inkSoft, fontStyle: "italic" }}>
            Employees waste time searching. Managers struggle to maintain control. Compliance teams lack
            visibility. Organizations become dependent on fragmented tools and manual processes.
          </p>
        </Reveal>

        <Reveal delay={100} style={{ marginTop: 56 }}>
          <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 20 }}>Goals, organized into strategic pillars</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="pillar-grid">
            {PILLARS.map((p) => (
              <div key={p.title} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "18px 16px" }}>
                <p.icon size={16} color={COLORS.accent} style={{ marginBottom: 10 }} />
                <div style={{ fontFamily: fontBody, fontSize: 13.5, fontWeight: 500, color: COLORS.ink, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontFamily: fontBody, fontSize: 12, lineHeight: 1.5, color: COLORS.muted }}>{p.detail}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 700px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .pillar-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .pillar-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Role                                                                  */
/* ==================================================================== */

function RoleSection() {
  return (
    <section style={{ padding: "72px 0" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56 }} className="role-grid">
          <SectionHeading eyebrow="My role & contribution" title="What I directly designed" subtitle="As the sole Product designer on this project, I owned the process end to end from research framing through interactive prototype." maxWidth={420} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ROLE_ITEMS.map((r, i) => (
              <Reveal delay={i * 50} key={r.title} style={{ padding: "16px 0", borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}` }}>
                <h3 style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 15, color: COLORS.ink, margin: "0 0 4px" }}>{r.title}</h3>
                <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.6, color: COLORS.muted, margin: 0 }}>{r.detail}</p>
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

/* ==================================================================== */
/* Users                                                                 */
/* ==================================================================== */

function UsersSection() {
  return (
    <section id="users" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Understanding the users" title="Three roles, three levels of system complexity" subtitle="Rather than long persona bios, these are the role-based archetypes that shaped every workflow decision." maxWidth={680} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 44 }} className="archetype-grid">
          {ARCHETYPES.map((a, i) => (
            <Reveal delay={i * 80} key={a.role} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "24px 22px", display: "flex", flexDirection: "column" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 9, background: COLORS.accentSoft, marginBottom: 14 }}>
                <a.icon size={16} color={COLORS.accent} strokeWidth={1.75} />
              </span>
              <div style={{ fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.accent, marginBottom: 6 }}>{a.level}</div>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: COLORS.ink, margin: "0 0 16px" }}>{a.role}</h3>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.muted, marginBottom: 8 }}>Needs</div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                  {a.needs.map((n) => <li key={n} style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.5, color: COLORS.inkSoft }}>{n}</li>)}
                </ul>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.muted, marginBottom: 8 }}>Pain points</div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                  {a.pains.map((n) => <li key={n} style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.5, color: COLORS.muted }}>{n}</li>)}
                </ul>
              </div>
              <div style={{ marginTop: "auto", borderTop: `1px dashed ${COLORS.border}`, paddingTop: 12, fontFamily: fontBody, fontSize: 12.5, color: COLORS.accent, lineHeight: 1.5 }}>
                {a.complexity}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .archetype-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Design principles                                                    */
/* ==================================================================== */

function PrinciplesSection() {
  return (
    <section style={{ padding: "72px 0" }}>
      <Container>
        <SectionHeading eyebrow="Design principles" title="Five principles derived from the project" maxWidth={620} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 44 }} className="principle-grid">
          {PRINCIPLES.map((p, i) => (
            <Reveal delay={i * 70} key={p.n} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "22px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <p.icon size={19} color={COLORS.accent} strokeWidth={1.75} />
                <span style={{ fontFamily: fontMono, fontSize: 11.5, color: COLORS.muted }}>{p.n}</span>
              </div>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 15, color: COLORS.ink, margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{p.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .principle-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .principle-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Information architecture - grouped modules, not a giant diagram      */
/* ==================================================================== */

function ArchitectureSection() {
  return (
    <section id="architecture" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Information architecture" title="Nine modules, one coherent system" subtitle="The full navigation model, grouped so each area reads as its own module rather than one unreadable tree." maxWidth={680} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 44 }} className="ia-grid">
          {IA_MODULES.map((m, i) => (
            <Reveal delay={i * 40} key={m.title} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "18px 18px" }}>
              <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink, marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${COLORS.border}` }}>{m.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {m.items.map((it) => (
                  <div key={it} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.accent, flexShrink: 0 }} />
                    <span style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted }}>{it}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .ia-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .ia-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Core product architecture                                            */
/* ==================================================================== */

function CoreArchitectureSection() {
  return (
    <section style={{ padding: "72px 0" }}>
      <Container>
        <SectionHeading eyebrow="Core product architecture" title="Six connected systems, sharing one set of entities" subtitle="AsteraDocs isn't one flow; it's several connected systems built on a shared data model. That's what makes the product scale instead of sprawl." maxWidth={680} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginTop: 40 }} className="systems-grid">
          {SYSTEMS.map((s, i) => (
            <Reveal delay={i * 40} key={s.title} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
              <s.icon size={18} color={COLORS.accent} style={{ margin: "0 auto 10px" }} />
              <div style={{ fontFamily: fontBody, fontSize: 12.5, fontWeight: 500, color: COLORS.ink, lineHeight: 1.3 }}>{s.title}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} style={{ marginTop: 24, background: COLORS.accentSoft, borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.accent, marginBottom: 10 }}>Shared entities</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SHARED_ENTITIES.map((e) => <Pill key={e}>{e}</Pill>)}
          </div>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .systems-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .systems-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Workflows - alternating layout                                       */
/* ==================================================================== */

/* Real product screenshot, presented cleanly - no redraws, no device chrome */
function ProductShot({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3160 / 2048",
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

function ProductGallery({ shots }: { shots: WorkflowShot[] }) {
  const cols = shots.length >= 3 ? 3 : shots.length;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }} className="product-gallery">
      {shots.map((s) => (
        <ProductShot key={s.src} src={s.src} alt={s.alt} />
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

function WorkflowVisual({ workflow }: { workflow: Workflow }) {
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 22, boxShadow: "0 16px 40px -20px rgba(20,24,28,0.14)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <workflow.icon size={16} color={COLORS.accent} />
        <span style={{ fontFamily: fontMono, fontSize: 11.5, color: COLORS.muted }}>{workflow.tag.toLowerCase().replace(" ", "_")}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {workflow.steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: COLORS.accentSoft, fontFamily: fontMono, fontSize: 10.5, color: COLORS.accent, flexShrink: 0 }}>
              {i + 1}
            </div>
            <div style={{ flex: 1, fontFamily: fontBody, fontSize: 13, color: COLORS.inkSoft, background: COLORS.surface, borderRadius: 7, padding: "9px 12px" }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowText({ workflow }: { workflow: Workflow }) {
  return (
    <>
      <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 10 }}>{workflow.tag}</div>
      <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(21px, 2.4vw, 26px)", color: COLORS.ink, margin: "0 0 14px", letterSpacing: "-0.01em" }}>{workflow.title}</h3>
      <p style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.7, color: COLORS.inkSoft, marginBottom: 18 }}>{workflow.intro}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Callout kind="insight" title="Impact">{workflow.impact}</Callout>
        <Callout kind="decision" title="Design decision">{workflow.insight}</Callout>
        {workflow.usability && <Callout kind="change" title="Usability testing">{workflow.usability}</Callout>}
      </div>
      {workflow.capabilities && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: COLORS.muted, marginBottom: 8 }}>Reviewer capabilities</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {workflow.capabilities.map((c) => <Pill key={c}>{c}</Pill>)}
          </div>
        </div>
      )}
    </>
  );
}

function WorkflowSection({ workflow, index }: { workflow: Workflow; index: number }) {
  const reversed = index % 2 === 1;

  if (workflow.shots && workflow.shots.length > 0) {
    return (
      <div style={{ padding: "52px 0", borderTop: index === 0 ? "none" : `1px solid ${COLORS.border}` }}>
        <Container>
          <Reveal style={{ maxWidth: 720, marginBottom: 32 }}>
            <WorkflowText workflow={workflow} />
          </Reveal>
          <Reveal delay={100}>
            {workflow.shots.length === 1 ? <ProductShot src={workflow.shots[0].src} alt={workflow.shots[0].alt} /> : <ProductGallery shots={workflow.shots} />}
          </Reveal>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ padding: "52px 0", borderTop: index === 0 ? "none" : `1px solid ${COLORS.border}` }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: reversed ? "0.9fr 1.1fr" : "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="workflow-grid">
          <Reveal style={{ order: reversed ? 2 : 1 }}>
            <WorkflowText workflow={workflow} />
          </Reveal>
          <Reveal delay={120} style={{ order: reversed ? 1 : 2 }}>
            <WorkflowVisual workflow={workflow} />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

function WorkflowsSection() {
  return (
    <section id="workflows" style={{ background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container style={{ paddingTop: 72 }}>
        <SectionHeading eyebrow="Key workflows" title="Six workflows, one connected document lifecycle" subtitle="From upload to approval, version history, permissions, admin control, and integrations." maxWidth={680} />
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

/* ==================================================================== */
/* Wireframe → final UI progression                                     */
/* ==================================================================== */

function ProgressionSection() {
  return (
    <section style={{ padding: "72px 0" }}>
      <Container>
        <SectionHeading eyebrow="From wireframes to final UI" title="How structure became product" subtitle="Two representative examples not every screen, just the workflows where the shift from sketch to system mattered most." maxWidth={680} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40 }}>
          {PROGRESSIONS.map((p, i) => (
            <Reveal delay={i * 100} key={p.title} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "24px 26px", background: COLORS.white }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: COLORS.ink, marginBottom: 16 }}>{p.title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="progression-grid">
                {[
                  { label: "Problem", value: p.problem },
                  { label: "Wireframe", value: p.wireframe },
                  { label: "Design decision", value: p.decision },
                  { label: "Final UI", value: p.final },
                ].map((step, si) => (
                  <div key={step.label} style={{ position: "relative" }}>
                    <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.04em", color: si === 3 ? COLORS.accent : COLORS.muted, marginBottom: 8 }}>
                      {step.label}
                    </div>
                    <p style={{ fontFamily: fontBody, fontSize: 12.5, lineHeight: 1.55, color: COLORS.inkSoft, margin: 0 }}>{step.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .progression-grid { grid-template-columns: 1fr 1fr !important; row-gap: 16px; }
        }
        @media (max-width: 480px) {
          .progression-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Key design decisions                                                 */
/* ==================================================================== */

function DecisionsSection() {
  return (
    <section id="decisions" style={{ padding: "72px 0", background: COLORS.surface, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Key design decisions" title="Five tensions that shaped the product" maxWidth={620} />
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column" }}>
          {DECISIONS.map((d, i) => (
            <Reveal delay={i * 50} key={d.n} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 20, padding: "22px 0", borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}` }} className="decision-row">
              <div style={{ fontFamily: fontMono, fontSize: 13, color: COLORS.accent }}>{d.n}</div>
              <div>
                <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: COLORS.ink, margin: "0 0 10px" }}>{d.title}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", color: COLORS.muted, paddingTop: 1 }}>Challenge</span>
                  <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{d.challenge}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 8 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", color: COLORS.accent, paddingTop: 1 }}>Decision</span>
                  <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: COLORS.inkSoft, margin: 0, maxWidth: 560 }}>{d.decision}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} style={{ marginTop: 56 }}>
          <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 20 }}>
            Trade-offs explored during the project
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }} className="tradeoff-grid">
            {TRADEOFFS.map((t) => (
              <div key={t.a} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "18px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontFamily: fontMono, fontSize: 13, color: COLORS.ink }}>
                  <span>{t.a}</span>
                  <ArrowRight size={13} color={COLORS.muted} />
                  <span style={{ color: COLORS.accent }}>{t.b}</span>
                </div>
                <p style={{ fontFamily: fontBody, fontSize: 13, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{t.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 560px) {
          .decision-row { grid-template-columns: 1fr !important; }
          .tradeoff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* Design system - the one place the product's own blue shows up       */
/* ==================================================================== */

function DesignSystemSection() {
  return (
    <section id="design-system" style={{ padding: "72px 0", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Design system" title="Modular components, built for consistency and handoff" subtitle="AsteraDocs uses its own product identity shown here as reference, not as this page's palette." maxWidth={680} />

        <Reveal delay={100} style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="ds-grid">
          <div>
            <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 14 }}>Typography - Urbanist</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              {TYPE_SCALE.map((size) => (
                <div key={size} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 11, color: COLORS.muted, width: 28 }}>{size}</span>
                  <span style={{ fontFamily: fontDisplay, fontSize: Math.min(size, 28), color: COLORS.ink }}>Document workspace</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {TYPE_WEIGHTS.map((w) => <Pill key={w}>{w}</Pill>)}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 14 }}>Product color system</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Primary", hex: PRODUCT.primary },
                { label: "Accent", hex: PRODUCT.accent },
                { label: "Text", hex: PRODUCT.text },
                { label: "Background", hex: PRODUCT.bg },
              ].map((c) => (
                <div key={c.label} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: 44, background: c.hex, border: c.label === "Background" ? `1px solid ${COLORS.border}` : "none" }} />
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontFamily: fontBody, fontSize: 12.5, fontWeight: 500, color: COLORS.ink }}>{c.label}</div>
                    <div style={{ fontFamily: fontMono, fontSize: 11, color: COLORS.muted }}>{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} style={{ marginTop: 40 }}>
          <div style={{ fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.muted, marginBottom: 14 }}>Reusable components</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {COMPONENTS.map((c) => <Pill key={c}>{c}</Pill>)}
          </div>
          <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.6, color: COLORS.muted, marginTop: 16, maxWidth: 640 }}>
            Modular components improved consistency, scalability, design speed, and developer handoff across
            every workflow in the product.
          </p>
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .ds-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================================================================== */
/* System layer                                                         */
/* ==================================================================== */

function SystemLayerSection() {
  return (
    <section style={{ padding: "72px 0", background: COLORS.surface }}>
      <Container>
        <SectionHeading eyebrow="System layer" title="Behavioral patterns, not just visual ones" subtitle="The design system isn't only components, it establishes predictable behavior across the whole product." maxWidth={680} />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          {SYSTEM_LAYERS.map((l, i) => (
            <Reveal delay={i * 80} key={l.n} style={{ padding: "24px 0", borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}` }}>
              <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 10 }}>{l.n} · {l.title}</div>
              <p style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.65, color: COLORS.inkSoft, maxWidth: 680, marginBottom: 14 }}>{l.detail}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {l.tags.map((t) => <Pill key={t}>{t}</Pill>)}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================================================================== */
/* Outcomes & learnings                                                 */
/* ==================================================================== */

function OutcomesSection() {
  return (
    <section id="outcomes" style={{ padding: "72px 0", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading eyebrow="Outcomes & reflections" title="Qualitative outcomes from the project" maxWidth={620} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 40 }} className="outcome-grid">
          {OUTCOMES.map((o, i) => (
            <Reveal delay={i * 80} key={o.title} style={{ background: COLORS.surface, borderRadius: 14, padding: "24px 22px" }}>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16, color: COLORS.ink, margin: "0 0 12px" }}>{o.title}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.6, color: COLORS.muted, margin: 0 }}>{o.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .outcome-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function LearningsSection() {
  return (
    <section id="learnings" style={{ padding: "88px 0", background: COLORS.ink, scrollMarginTop: 96 }}>
      <Container>
        <Reveal>
          <div style={{ fontFamily: fontMono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8FB8AC", marginBottom: 24 }}>What I learned</div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
          {LEARNINGS.map((l, i) => (
            <Reveal delay={i * 80} key={l.title} style={{ borderLeft: "2px solid #2E5A4E", paddingLeft: 18, maxWidth: 720 }}>
              <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 18, color: COLORS.bg, margin: "0 0 8px" }}>{l.title}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.6, color: "#B7C2C0", margin: 0 }}>{l.detail}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} style={{ borderTop: "1px solid #2E5A4E", paddingTop: 32 }}>
          <p style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.5, color: COLORS.bg, margin: 0, letterSpacing: "-0.01em", maxWidth: 720 }}>
            AsteraDocs reinforced that enterprise UX isn&apos;t about removing complexity entirely, it&apos;s
            about structuring complexity so users can act with confidence.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==================================================================== */
/* Page                                                                  */
/* ==================================================================== */

export function AsteraDocsCaseStudy() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", fontFamily: fontBody }}>
      <ReadingProgress />
      <CaseUtilityBar readingTime={META.readingTime} />
      <CaseHero />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "200px 1fr", gap: 0 }} className="body-grid">
        <aside className="toc-col">
          <ScrollSpyTOC items={TOC} />
        </aside>
        <div style={{ minWidth: 0 }}>
          <QuickOverview />
          <ChallengeSection />
          <RoleSection />
          <UsersSection />
          <PrinciplesSection />
          <ArchitectureSection />
          <CoreArchitectureSection />
          <WorkflowsSection />
          <ProgressionSection />
          <DecisionsSection />
          <DesignSystemSection />
          <SystemLayerSection />
          <OutcomesSection />
        </div>
      </div>

      <LearningsSection />
      <NextProjectCard title="FactWeavers" tag="AI-assisted business intelligence platform" href="/work/factweavers" />
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
