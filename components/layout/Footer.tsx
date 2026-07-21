import React from "react";
import Link from "next/link";
import { COLORS, fontBody, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "28px 0" }}>
      <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12.5, color: COLORS.muted }}>© 2026 Akshay Ashokan Pothan</span>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.inkSoft, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.behance.net/akshayashokan1"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.inkSoft, textDecoration: "none" }}
          >
            Behance ↗
          </a>
        </div>
      </Container>
    </footer>
  );
}
