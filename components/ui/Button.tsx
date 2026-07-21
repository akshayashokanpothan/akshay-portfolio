"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { COLORS, fontBody } from "@/lib/tokens";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  href?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ children, variant = "primary", href = "#", icon: Icon = ArrowRight, onClick, disabled }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: fontBody,
    fontWeight: 500,
    fontSize: 14,
    padding: "12px 20px",
    borderRadius: 8,
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: disabled ? "default" : "pointer",
    border: "1px solid transparent",
    opacity: disabled ? 0.5 : 1,
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: COLORS.ink, color: COLORS.bg },
    secondary: { background: "transparent", color: COLORS.ink, border: `1px solid ${COLORS.borderStrong}` },
    accent: { background: COLORS.accent, color: "#fff" },
  };
  const style: React.CSSProperties = {
    ...base,
    ...variants[variant],
    transform: hover && !disabled ? "translateY(-1px)" : "none",
    boxShadow: hover && !disabled ? "0 6px 18px rgba(20,24,28,0.12)" : "none",
  };

  if (disabled) {
    return (
      <span style={style} aria-disabled="true">
        {children}
        <Icon size={15} strokeWidth={2} />
      </span>
    );
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");
  const handlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };

  if (isInternal) {
    return (
      <Link href={href} onClick={onClick} style={style} {...handlers}>
        {children}
        <Icon size={15} strokeWidth={2} />
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} style={style} target="_blank" rel="noopener noreferrer" {...handlers}>
      {children}
      <Icon size={15} strokeWidth={2} />
    </a>
  );
}
