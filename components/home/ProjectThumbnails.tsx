import React from "react";
import { COLORS } from "@/lib/tokens";

/**
 * SBI YONO - purple/magenta mobile-login abstraction.
 * Deliberately breaks from the portfolio's ink/teal accent because it represents
 * this specific external case study's own brand direction, contained entirely
 * within this one card (matches how AsteraDocs' own product blue was used
 * selectively and only within that case study's own design-system section).
 */
export function SbiYonoThumbnail() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sbi-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B1667" />
          <stop offset="100%" stopColor="#A6197A" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#sbi-grad)" />
      {/* back phone frame */}
      <g transform="translate(214, 24) rotate(8)">
        <rect width="96" height="176" rx="16" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.35)" />
      </g>
      {/* front phone frame */}
      <g transform="translate(120, 18)">
        <rect width="104" height="184" rx="18" fill="#ffffff" />
        <rect x="10" y="18" width="84" height="10" rx="3" fill="#E7D6EF" />
        <circle cx="52" cy="70" r="18" fill="none" stroke="#7C2D92" strokeWidth="2.5" />
        <path d="M52 62 v16 M44 70 h16" stroke="#7C2D92" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="14" y="108" width="76" height="12" rx="6" fill="#F1E7F5" />
        <rect x="14" y="128" width="76" height="12" rx="6" fill="#F1E7F5" />
        <rect x="14" y="154" width="76" height="16" rx="8" fill="#A6197A" />
      </g>
    </svg>
  );
}

/** Quickbot - conversational commerce: chat bubble with typing dots + product recommendation cards. */
export function QuickbotThumbnail() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <rect width="400" height="220" fill={COLORS.surface} />
      {/* chat bubble */}
      <g transform="translate(28, 70)">
        <rect width="150" height="64" rx="18" fill={COLORS.white} stroke={COLORS.border} />
        <path d="M18 64 L18 82 L38 64 Z" fill={COLORS.white} stroke={COLORS.border} />
        <circle cx="34" cy="32" r="5" fill={COLORS.accent} />
        <circle cx="54" cy="32" r="5" fill={COLORS.borderStrong} />
        <circle cx="74" cy="32" r="5" fill={COLORS.borderStrong} />
        <rect x="20" y="14" width="70" height="7" rx="3.5" fill={COLORS.surface} />
      </g>
      {/* product cards */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${210 + i * 90}, ${40 + i * 18})`}>
          <rect width="76" height="100" rx="10" fill={COLORS.white} stroke={COLORS.border} />
          <rect x="8" y="8" width="60" height="44" rx="6" fill={COLORS.accentSoft} />
          <rect x="8" y="60" width="48" height="7" rx="3.5" fill={COLORS.borderStrong} />
          <rect x="8" y="72" width="34" height="7" rx="3.5" fill={COLORS.border} />
          <rect x="8" y="84" width="26" height="10" rx="5" fill={COLORS.accent} />
        </g>
      ))}
      <path d="M180 100 h24" stroke={COLORS.muted} strokeWidth="2" strokeDasharray="3 4" />
    </svg>
  );
}

/** Behance - editorial grid of mockup frames, no logo. */
export function BehanceThumbnail() {
  const frames = [
    { x: 24, y: 30, w: 100, h: 72, r: -4 },
    { x: 140, y: 18, w: 90, h: 64, r: 3 },
    { x: 250, y: 40, w: 100, h: 70, r: -2 },
    { x: 60, y: 120, w: 90, h: 60, r: 5 },
    { x: 190, y: 130, w: 110, h: 62, r: -3 },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <rect width="400" height="220" fill={COLORS.surface} />
      {frames.map((f, i) => (
        <g key={i} transform={`translate(${f.x + f.w / 2}, ${f.y + f.h / 2}) rotate(${f.r})`}>
          <rect x={-f.w / 2} y={-f.h / 2} width={f.w} height={f.h} rx="8" fill={COLORS.white} stroke={COLORS.borderStrong} />
          <rect x={-f.w / 2 + 10} y={-f.h / 2 + 10} width={f.w - 20} height="6" rx="3" fill={i % 2 === 0 ? COLORS.accent : COLORS.border} />
          <rect x={-f.w / 2 + 10} y={-f.h / 2 + 22} width={f.w - 40} height="6" rx="3" fill={COLORS.border} />
        </g>
      ))}
    </svg>
  );
}
