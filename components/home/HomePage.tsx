"use client";

import React, { useState } from "react";
import { Mail, ExternalLink, FileText, Layers, Boxes, Sparkles, Users } from "lucide-react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/home/ProjectCard";
import { WORK_ITEMS } from "@/lib/data/work";

const METRICS = [
  { value: "5+", label: "Years in product design", note: "B2B SaaS & AI" },
  { value: "10+", label: "Enterprise platforms shipped", note: "Analytics, data tooling, HR" },
  { value: "3", label: "AI-powered products", note: "Decision intelligence, docs, ATS" },
  { value: "0→1", label: "End-to-end ownership", note: "Research through delivery" },
];

const PROCESS_STEPS = [
  { step: "Research", detail: "Talk to users, audit the system, find the real constraint." },
  { step: "Define", detail: "Frame the problem in language the business agrees with." },
  { step: "Ideate", detail: "Explore structure before surface — flows before pixels." },
  { step: "Prototype", detail: "Build it interactive enough to feel true to test." },
  { step: "Validate", detail: "Test with real users and real edge cases." },
  { step: "Ship", detail: "Hand off with rationale, not just redlines." },
  { step: "Measure", detail: "Track adoption and iterate against outcomes." },
];

const EXPERIENCE = [
  {
    company: "DBiz AI",
    role: "Product Designer 2",
    location: "Kochi, Kerala",
    duration: "Aug 25 — Mar 26",
    impact:
      "Own end-to-end design for AI-powered analytics and data engineering products, including FactWeavers AI, AsteraDocs, and Aptive.",
  },
  {
    company: "Innovatily Inc.",
    role: "Product Designer",
    location: "Bangalore, Karnataka",
    duration: "Dec 24 — May 25",
    impact:
      "Led UX for enterprise SaaS tools, translating complex backend logic into workflows non-technical users could operate confidently.",
  },
  {
    company: "Imiot Tech.",
    role: "Lead Product Designer",
    location: "Kannur, Kerala",
    duration: "Jul 22 — Dec 24",
    impact:
      "Led product design across the team's SaaS products, setting design direction and mentoring on design system and interaction decisions.",
  },
  {
    company: "Imiot Tech.",
    role: "Founding Product Designer",
    location: "Kannur, Kerala",
    duration: "Jun 20 — Jul 22",
    impact: "Established the company's earliest design practice, building foundational design systems and shipping early-stage product interfaces across web and mobile.",
  },
];

const PRINCIPLES = [
  { icon: Layers, title: "Systems over screens", detail: "A screen is one output of a system. Design the system first." },
  { icon: Boxes, title: "Business-driven UX", detail: "Every flow ties back to a metric someone in the room cares about." },
  { icon: Sparkles, title: "Design for clarity", detail: "If it needs a tooltip to explain itself, it needs a redesign." },
  { icon: Users, title: "Fast, honest iteration", detail: "Show rough work early. Precision comes after direction is right." },
];

function DotGrid() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
      <defs>
        <pattern id="dotgrid" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.3" fill={COLORS.borderStrong} />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fademask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" mask="url(#fademask)" />
    </svg>
  );
}

function HeroPanel() {
  const rows = [
    { label: "adoption_rate", value: "94.2%", trend: "+6.1" },
    { label: "time_to_insight", value: "3m 40s", trend: "-71%" },
    { label: "active_workspaces", value: "1,204", trend: "+18" },
  ];
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20, boxShadow: "0 20px 60px -20px rgba(20,24,28,0.18)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.muted }}>workspace_overview</span>
        <div style={{ display: "flex", gap: 6 }}>
          {["#E4E4DE", "#E4E4DE", COLORS.accent].map((c, i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }} />
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {[62, 88, 40, 74, 96, 55, 30, 70, 84].map((h, i) => (
          <div key={i} style={{ height: 64, display: "flex", alignItems: "flex-end", background: COLORS.surface, borderRadius: 6, padding: 4 }}>
            <div style={{ width: "100%", height: `${h}%`, borderRadius: 3, background: i % 3 === 2 ? COLORS.accent : COLORS.borderStrong }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: fontMono, fontSize: 12.5, borderTop: `1px solid ${COLORS.border}`, paddingTop: 10 }}>
            <span style={{ color: COLORS.muted }}>{r.label}</span>
            <span style={{ display: "flex", gap: 10 }}>
              <span style={{ color: COLORS.ink, fontWeight: 500 }}>{r.value}</span>
              <span style={{ color: COLORS.accent }}>{r.trend}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", paddingTop: 88, paddingBottom: 64 }}>
      <DotGrid />
      <Container style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center" }} className="hero-grid">
          <Reveal>
            <Eyebrow>Product designer · B2B SaaS &amp; AI</Eyebrow>
            <h1
              style={{
                fontFamily: fontDisplay,
                fontWeight: 500,
                fontSize: "clamp(38px, 5.4vw, 68px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: COLORS.ink,
                margin: "0 0 22px",
                maxWidth: 640,
              }}
            >
              I design enterprise software that survives contact with real data.
            </h1>
            <p style={{ fontFamily: fontBody, fontSize: 18, lineHeight: 1.6, color: COLORS.muted, maxWidth: 520, marginBottom: 32 }}>
              Product Designer with 5+ years shaping AI-powered analytics platforms, data
              engineering tools, and enterprise SaaS — from research to shipped systems, at
              Dbiz AI Solutions.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Button variant="accent" href="#work">View case studies</Button>
              <Button variant="secondary" href="#contact" icon={Mail}>Get in touch</Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <HeroPanel />
          </Reveal>
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function MetricStrip() {
  return (
    <section>
      <Container>
        <Reveal
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden", background: COLORS.white }}
          className="metric-grid"
        >
          {METRICS.map((m, i) => (
            <div key={m.label} style={{ padding: "28px 24px", borderLeft: i === 0 ? "none" : `1px solid ${COLORS.border}` }}>
              <div style={{ fontFamily: fontMono, fontSize: 30, fontWeight: 500, color: COLORS.ink, marginBottom: 6 }}>{m.value}</div>
              <div style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.inkSoft, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted }}>{m.note}</div>
            </div>
          ))}
        </Reveal>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .metric-grid { grid-template-columns: 1fr 1fr !important; }
          .metric-grid > div:nth-child(2n+1) { border-left: none !important; }
        }
      `}</style>
    </section>
  );
}

function FeaturedWork() {
  const selected = WORK_ITEMS.filter((s) => s.featured);
  const other = WORK_ITEMS.filter((s) => !s.featured);
  return (
    <section id="work" style={{ padding: "96px 0", scrollMarginTop: 80 }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <SectionHeading
            eyebrow="Selected works"
            title="Systems built for people who make decisions under pressure"
            subtitle="My two primary, in-depth case studies — taken from research through shipped design."
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="work-grid">
          {selected.map((s, i) => (
            <ProjectCard study={s} index={i} key={s.slug} />
          ))}
        </div>

        {other.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <SectionHeading eyebrow="Other work" title="Additional projects & explorations" maxWidth={560} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }} className="other-work-grid">
              {other.map((s, i) => (
                <ProjectCard study={s} index={i} key={s.slug} compact />
              ))}
            </div>
          </div>
        )}
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .other-work-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .other-work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "80px 0", background: COLORS.surface, scrollMarginTop: 80 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56 }} className="about-grid">
          <SectionHeading eyebrow="About" title="Product thinking, applied to systems most people never see" />
          <Reveal delay={100}>
            <p style={{ fontFamily: fontBody, fontSize: 17, lineHeight: 1.75, color: COLORS.inkSoft, marginBottom: 28 }}>
              I&apos;m a Product Designer based in Kerala, India, working on AI-powered analytics
              and enterprise SaaS at Dbiz AI Solutions. My work sits where complex backend
              logic meets people who need to make fast, confident decisions — data teams,
              HR managers, operations leads. I care about the parts of a product that don&apos;t
              photograph well: state design, edge cases, information hierarchy, the moment
              a system tells the truth about what just happened.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {["Product thinking", "Systems thinking", "Enterprise UX", "AI-powered products"].map((t) => (
                <div key={t} style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.ink, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 14px", background: COLORS.white }}>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProcessTimeline() {
  const [active, setActive] = useState(0);
  return (
    <section id="process" style={{ padding: "96px 0", scrollMarginTop: 80 }}>
      <Container>
        <SectionHeading eyebrow="How I work" title="A process built around evidence, not assumptions" subtitle="Seven stages I return to on every project — sometimes fast, sometimes slow, always in this order." />
        <Reveal delay={80} style={{ marginTop: 48 }}>
          <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 8 }} className="process-rail">
            {PROCESS_STEPS.map((p, i) => (
              <button
                key={p.step}
                onClick={() => setActive(i)}
                style={{
                  flex: "1 0 auto",
                  minWidth: 120,
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "16px 14px",
                  borderTop: `2px solid ${active === i ? COLORS.accent : COLORS.border}`,
                  transition: "border-color 0.2s ease",
                }}
              >
                <div style={{ fontFamily: fontMono, fontSize: 11, color: active === i ? COLORS.accent : COLORS.muted, marginBottom: 8 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: fontBody, fontSize: 14.5, fontWeight: 500, color: active === i ? COLORS.ink : COLORS.inkSoft }}>{p.step}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "24px 28px", minHeight: 84 }}>
            <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.6, color: COLORS.inkSoft, margin: 0 }}>{PROCESS_STEPS[active].detail}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <section style={{ padding: "96px 0", background: COLORS.surface }}>
      <Container>
        <SectionHeading eyebrow="Experience" title="Where I've built this" />
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column" }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal delay={i * 90} key={`${e.company}-${e.duration}`}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, padding: "26px 0", borderTop: `1px solid ${COLORS.border}` }} className="exp-row">
                <div style={{ fontFamily: fontMono, fontSize: 13, color: COLORS.muted, paddingTop: 2 }}>
                  <div>{e.duration}</div>
                  <div style={{ color: COLORS.muted, marginTop: 4, fontSize: 11.5 }}>{e.location}</div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 19, color: COLORS.ink, margin: 0 }}>{e.company}</h3>
                    <span style={{ fontFamily: fontBody, fontSize: 13.5, color: COLORS.accent }}>{e.role}</span>
                  </div>
                  <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.6, color: COLORS.inkSoft, margin: 0, maxWidth: 620 }}>{e.impact}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 620px) {
          .exp-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Principles() {
  return (
    <section style={{ padding: "96px 0" }}>
      <Container>
        <SectionHeading eyebrow="Principles" title="What I optimize for, in order" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 44 }} className="principle-grid">
          {PRINCIPLES.map((p, i) => (
            <Reveal delay={i * 80} key={p.title}>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "26px 22px", height: "100%", background: COLORS.white }}>
                <p.icon size={20} color={COLORS.accent} strokeWidth={1.75} style={{ marginBottom: 18 }} />
                <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: COLORS.ink, margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .principle-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .principle-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "110px 0", scrollMarginTop: 80 }}>
      <Container>
        <Reveal style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: "clamp(30px, 4vw, 44px)", letterSpacing: "-0.02em", color: COLORS.ink, margin: "0 0 20px", lineHeight: 1.15 }}>
            Let&apos;s build meaningful products together.
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 16, color: COLORS.muted, marginBottom: 36 }}>
            Open to Product Designer roles in B2B SaaS and AI-native teams.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Button variant="accent" href="mailto:akshayashokan248@gmail.com" icon={Mail}>Email me</Button>
            <Button variant="secondary" href="https://www.linkedin.com/in/akshayashokanpothan/" icon={ExternalLink}>LinkedIn</Button>
            <Button variant="secondary" href="https://drive.google.com/file/d/1fUnnjfw44ARqEOO-XzEEz8sHEeceDauG/view?usp=sharing" icon={FileText}>Resume</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function HomePage() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", fontFamily: fontBody }}>
      <Hero />
      <MetricStrip />
      <FeaturedWork />
      <About />
      <ProcessTimeline />
      <ExperienceTimeline />
      <Principles />
      <Contact />
    </div>
  );
}
