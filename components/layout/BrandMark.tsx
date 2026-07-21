import React from "react";
import { COLORS } from "@/lib/tokens";

/**
 * Minimal geometric "A" monogram — a rounded ink square with a white
 * diagonal peak and a single teal crossbar. Built as plain SVG so it
 * stays crisp at navbar sizes without any raster assets or gradients.
 */
export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" role="img">
      <rect width="28" height="28" rx="8" fill={COLORS.ink} />
      <path d="M9 20 L14 8 L19 20" stroke={COLORS.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="11.2" y1="15" x2="16.8" y2="15" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
