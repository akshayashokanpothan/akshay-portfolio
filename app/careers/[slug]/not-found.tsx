"use client";

import React from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { COLORS, fontBody, fontDisplay } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function CareersNotFound() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "80vh", padding: "64px 0 100px", display: "flex", alignItems: "center" }}>
      <Container>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "40px 20px" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: COLORS.surface,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.accent,
              marginBottom: 24,
            }}
            aria-hidden="true"
          >
            <AlertCircle size={26} strokeWidth={1.75} />
          </div>
          <h1
            style={{
              fontFamily: fontDisplay,
              fontWeight: 500,
              fontSize: "clamp(26px, 3.5vw, 36px)",
              color: COLORS.ink,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Position Not Found
          </h1>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: 16,
              color: COLORS.muted,
              lineHeight: 1.6,
              margin: "0 auto 32px",
              maxWidth: 480,
            }}
          >
            The role you are looking for does not exist, may have been retired, or the URL may be incorrect.
          </p>
          <Button variant="primary" href="/careers" icon={ArrowLeft}>
            Back to open positions
          </Button>
        </div>
      </Container>
    </div>
  );
}
