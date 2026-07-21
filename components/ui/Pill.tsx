import React from "react";
import { COLORS, fontMono } from "@/lib/tokens";

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: fontMono,
        fontSize: 11.5,
        color: COLORS.inkSoft,
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 6,
        padding: "4px 9px",
      }}
    >
      {children}
    </span>
  );
}
