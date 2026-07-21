"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { COLORS, fontBody, fontMono } from "@/lib/tokens";
import { useReveal } from "./Reveal";

/* Browser chrome wrapper - gives coded UI mockups a "real product" presentation */
export function BrowserFrame({
  children,
  url = "app.factweavers.com",
  elevated = true,
  style = {},
}: {
  children: React.ReactNode;
  url?: string;
  elevated?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: elevated ? "0 24px 60px -24px rgba(20,24,28,0.22)" : "none",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          borderBottom: `1px solid ${COLORS.border}`,
          background: COLORS.surface,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#E4E4DE", "#E4E4DE", "#E4E4DE"].map((c, i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: fontMono,
            fontSize: 11,
            color: COLORS.muted,
            background: COLORS.white,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 6,
            padding: "3px 10px",
            maxWidth: 260,
            margin: "0 auto",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

/* Micro-storytelling callout - insight / trade-off / decision / change */
const CALLOUT_KINDS = {
  insight: { label: "Key insight", color: COLORS.accent, bg: COLORS.accentSoft },
  tradeoff: { label: "Trade-off", color: "#8A5A1E", bg: "#F7EEDF" },
  decision: { label: "Design decision", color: COLORS.ink, bg: COLORS.surface },
  change: { label: "What changed", color: "#1E5A8A", bg: "#E7F0F7" },
} as const;

export function Callout({
  kind = "insight",
  title,
  children,
}: {
  kind?: keyof typeof CALLOUT_KINDS;
  title?: string;
  children: React.ReactNode;
}) {
  const k = CALLOUT_KINDS[kind];
  return (
    <div style={{ borderRadius: 10, background: k.bg, padding: "16px 18px", border: `1px solid ${COLORS.border}` }}>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: k.color,
          marginBottom: 6,
        }}
      >
        {k.label}
        {title ? ` · ${title}` : ""}
      </div>
      <div style={{ fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.6, color: COLORS.inkSoft }}>{children}</div>
    </div>
  );
}

/* Premium metric pop-in - used where values aren't clean integers (ranges, units) */
export function StatPop({
  value,
  label,
  note,
  size = 26,
  delay = 0,
}: {
  value: string;
  label: string;
  note?: string;
  size?: number;
  delay?: number;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.88)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div style={{ fontFamily: fontMono, fontSize: size, fontWeight: 500, color: COLORS.accent, marginBottom: 6, letterSpacing: "-0.01em" }}>
        {value}
      </div>
      <div style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.ink, marginBottom: 2 }}>{label}</div>
      {note && <div style={{ fontFamily: fontBody, fontSize: 12.5, color: COLORS.muted }}>{note}</div>}
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 70,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: COLORS.ink,
        color: COLORS.bg,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        boxShadow: "0 10px 24px -8px rgba(20,24,28,0.35)",
      }}
    >
      <ArrowUp size={16} />
    </button>
  );
}
