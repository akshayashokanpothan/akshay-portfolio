import React, { ReactNode } from "react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/tokens";
import { Reveal } from "./Reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: fontMono,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: COLORS.accent,
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 2, background: COLORS.accent, display: "inline-block" }} />
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  maxWidth?: number;
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left", maxWidth = 620 }: SectionHeadingProps) {
  return (
    <Reveal
      id={id}
      style={{ textAlign: align, maxWidth, margin: align === "center" ? "0 auto" : 0, scrollMarginTop: 96 }}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        style={{
          fontFamily: fontDisplay,
          fontWeight: 500,
          fontSize: "clamp(26px, 3.2vw, 36px)",
          letterSpacing: "-0.02em",
          color: COLORS.ink,
          margin: 0,
          lineHeight: 1.18,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: fontBody, fontSize: 16, color: COLORS.muted, marginTop: 14, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
