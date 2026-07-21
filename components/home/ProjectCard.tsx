"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/tokens";
import { Reveal } from "@/components/ui/Reveal";
import type { WorkItem } from "@/lib/data/work";
import { SbiYonoThumbnail, QuickbotThumbnail, BehanceThumbnail } from "@/components/home/ProjectThumbnails";

const ILLUSTRATIONS = {
  sbi: SbiYonoThumbnail,
  quickbot: QuickbotThumbnail,
  behance: BehanceThumbnail,
} as const;

export function ProjectCard({ study, index, compact = false }: { study: WorkItem; index: number; compact?: boolean }) {
  const [hover, setHover] = useState(false);
  const clickable = Boolean(study.href);
  const Illustration = study.illustration ? ILLUSTRATIONS[study.illustration] : null;

  const cardStyle: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  color: "inherit",

  background: study.external ? "#e5fcf1" : COLORS.white,

  border: `1px solid ${
    hover && clickable
      ? COLORS.borderStrong
      : study.external
        ? "#D8EEE5"
        : COLORS.border
  }`,

  borderRadius: compact ? 12 : 16,
  padding: compact ? "18px 18px" : "32px 32px",
  transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
  transform: hover && clickable ? "translateY(-3px)" : "none",
  boxShadow: hover && clickable ? "0 18px 40px -18px rgba(20,24,28,0.18)" : "none",
  cursor: clickable ? "pointer" : "default",
  position: "relative",
};

  const inner = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: compact ? 12 : 22 }}>
        <span style={{ fontFamily: fontMono, fontSize: compact ? 10 : 12, color: COLORS.accent }}>{study.tag}</span>
        {study.external ? (
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: COLORS.accent,
              background: COLORS.accentSoft,
              borderRadius: 5,
              padding: "3px 7px",
              flexShrink: 0,
            }}
          >
            External
          </span>
        ) : !clickable ? (
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: COLORS.muted,
              background: COLORS.surface,
              borderRadius: 5,
              padding: "3px 7px",
              flexShrink: 0,
            }}
          >
            Coming soon
          </span>
        ) : (
          <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.muted }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div
        style={{
          ...(compact ? { height: 90 } : { aspectRatio: "16 / 9" }),
          borderRadius: 9,
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          marginBottom: compact ? 14 : 22,
          overflow: "hidden",
          position: "relative",
          display: study.thumbnail || Illustration ? "block" : "flex",
          alignItems: "flex-end",
          padding: study.thumbnail || Illustration ? 0 : 16,
          gap: 6,
        }}
      >
        {study.thumbnail ? (
          <Image
            src={study.thumbnail}
            alt={study.thumbnailAlt ?? `${study.title} preview`}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 25vw"
            style={compact ? { objectFit: "cover", objectPosition: "top left" } : { objectFit: "contain", objectPosition: "center" }}
          />
        ) : Illustration ? (
          <Illustration />
        ) : (
          [30, 55, 40, 70, 50, 85, 60, 95, 45, 75].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 3,
                background: i === 7 ? COLORS.accent : COLORS.borderStrong,
                transition: "height 0.3s ease",
                opacity: clickable ? 1 : 0.6,
              }}
            />
          ))
        )}
      </div>

      <h3
        style={{
          fontFamily: fontDisplay,
          fontWeight: 500,
          fontSize: compact ? 15 : 22,
          lineHeight: 1.28,
          color: COLORS.ink,
          margin: "0 0 6px",
          ...(compact
            ? { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }
            : {}),
        }}
      >
        {study.title}
      </h3>
      {(study.role || study.timeline) && (
        <div style={{ fontFamily: fontBody, fontSize: compact ? 11 : 13, color: COLORS.muted, marginBottom: compact ? 8 : 14 }}>
          {study.role}{study.role && study.timeline ? " · " : ""}{study.timeline}
        </div>
      )}
      {!compact && (
        <p style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.6, color: COLORS.inkSoft, marginBottom: 16 }}>
          {study.summary}
        </p>
      )}
      {compact ? (
        study.impact && (
          <p
            style={{
              fontFamily: fontBody,
              fontSize: 12,
              lineHeight: 1.5,
              color: COLORS.inkSoft,
              marginBottom: 12,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {study.impact}
          </p>
        )
      ) : (
        <div
          style={{
            fontFamily: fontBody,
            fontSize: 13.5,
            color: COLORS.ink,
            background: COLORS.accentSoft,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 20,
          }}
        >
          {study.impact}
        </div>
      )}
      {clickable && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontBody, fontSize: compact ? 12 : 14, fontWeight: 500, color: COLORS.ink }}>
          {study.ctaLabel ?? "View case study"}
          <ArrowUpRight size={compact ? 12 : 15} style={{ transform: hover ? "translate(2px,-2px)" : "none", transition: "transform 0.2s ease" }} />
        </span>
      )}
    </>
  );

  const sharedHandlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };

  return (
    <Reveal delay={index * 80}>
      {study.external ? (
        <a
          href={study.href as string}
          target="_blank"
          rel="noopener noreferrer"
          style={cardStyle}
          aria-label={`${study.ctaLabel ?? "Open"}: ${study.title}`}
          {...sharedHandlers}
        >
          {inner}
        </a>
      ) : clickable ? (
        <Link
          href={study.href as string}
          prefetch
          style={cardStyle}
          aria-label={`View case study: ${study.title}`}
          {...sharedHandlers}
        >
          {inner}
        </Link>
      ) : (
        <div style={cardStyle} aria-disabled="true">
          {inner}
        </div>
      )}
    </Reveal>
  );
}
