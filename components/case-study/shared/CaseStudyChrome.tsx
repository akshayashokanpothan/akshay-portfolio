"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Link2 } from "lucide-react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export interface TocItem {
  id: string;
  label: string;
}

/* Thin fixed progress bar tracking scroll depth of the whole document */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setPct(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "transparent", zIndex: 100 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: COLORS.accent, transition: "width 0.1s linear" }} />
    </div>
  );
}

/**
 * Case-study-specific utility bar - sits directly below the shared global Navbar.
 * Intentionally does NOT duplicate global nav links; only adds what every case
 * study uniquely needs: a way back to the homepage's work section, and reading time.
 */
export function CaseUtilityBar({ readingTime }: { readingTime: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 45,
        background: scrolled ? "rgba(250,250,248,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <Container>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 48 }}>
          <Link href="/#work" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontBody, fontSize: 13.5, color: COLORS.inkSoft, textDecoration: "none" }}>
            <ArrowLeft size={15} /> Back to work
          </Link>
          <span style={{ fontFamily: fontMono, fontSize: 12.5, color: COLORS.muted }}>{readingTime}</span>
        </nav>
      </Container>
    </div>
  );
}

/* Sticky scroll-spy table of contents - desktop only (hidden by the page's own media query below 980px) */
export function ScrollSpyTOC({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const els = items.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 2 }} aria-label="Section navigation">
      {items.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          style={{
            fontFamily: fontBody,
            fontSize: 13,
            padding: "7px 0 7px 14px",
            borderLeft: `2px solid ${active === t.id ? COLORS.accent : COLORS.border}`,
            color: active === t.id ? COLORS.ink : COLORS.muted,
            fontWeight: active === t.id ? 500 : 400,
            textDecoration: "none",
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
        >
          {t.label}
        </a>
      ))}
    </nav>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      }}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontBody, fontSize: 13, color: COLORS.muted, background: "none", border: "none", cursor: "pointer" }}
    >
      <Link2 size={14} /> {copied ? "Copied!" : "Copy link"}
    </button>
  );
}

/**
 * Ends every case study. If `href` is provided, the next project is real and
 * navigable via next/link. If it's omitted, the card renders a non-clickable
 * "Coming soon" state - never a link to a page that doesn't exist yet.
 */
export function NextProjectCard({
  title,
  tag,
  status,
  href,
}: {
  title: string;
  tag: string;
  status?: string;
  href?: string;
}) {
  return (
    <section style={{ padding: "80px 0" }}>
      <Container>
        <Reveal
          as={href ? Link : "div"}
          href={href}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "36px 40px",
            flexWrap: "wrap",
            textDecoration: "none",
            color: "inherit",
            cursor: href ? "pointer" : "default",
          }}
        >
          <div>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, marginBottom: 8 }}>Next project</div>
            <h3 style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 22, color: COLORS.ink, margin: "0 0 6px" }}>{title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: 13.5, color: COLORS.muted, margin: 0 }}>{tag}</p>
          </div>
          {href ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink }}>
              View case study <ArrowUpRight size={15} />
            </span>
          ) : (
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: COLORS.muted,
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 6,
                padding: "8px 14px",
              }}
            >
              {status ?? "Coming soon"}
            </span>
          )}
        </Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40, flexWrap: "wrap", gap: 16 }}>
          <Link href="/#work" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontBody, fontSize: 14, color: COLORS.inkSoft, textDecoration: "none" }}>
            <ArrowLeft size={15} /> Back to all work
          </Link>
          <CopyLinkButton />
        </div>
      </Container>
    </section>
  );
}
