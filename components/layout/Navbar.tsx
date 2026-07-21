"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLORS, fontBody, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/layout/BrandMark";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > lastY.current && y > 120) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(250,250,248,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
      }}
    >
      <Container>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: fontMono,
              fontWeight: 500,
              fontSize: 14.5,
              color: COLORS.ink,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            <BrandMark size={26} />
            AAP
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <div style={{ display: "flex", gap: 28 }} className="nav-links">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.inkSoft, textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Button variant="secondary" href="https://drive.google.com/file/d/1fUnnjfw44ARqEOO-XzEEz8sHEeceDauG/view?usp=sharing" icon={ArrowUpRight}>
              Resume
            </Button>
          </div>
        </nav>
      </Container>
      <style>{`
        @media (max-width: 720px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
}
