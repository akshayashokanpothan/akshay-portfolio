"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Job } from "@/lib/types/jobs";
import { JOBS, DEFAULT_CONTACT_EMAIL } from "@/lib/data/jobs";
import { getPublicOpenJobs } from "@/lib/jobs/expiry";
import { COLORS, fontBody, fontDisplay, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/careers/JobCard";

interface CareersPageProps {
  initialJobs?: Job[];
}

export function CareersPage({ initialJobs = JOBS }: CareersPageProps) {
  // Client state to ensure live countdown recalculations
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    // Recalculate deadline and countdowns every 30 seconds
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const openJobs = getPublicOpenJobs(initialJobs, now);

  const generalInquiryMailto = DEFAULT_CONTACT_EMAIL
    ? `mailto:${DEFAULT_CONTACT_EMAIL}?subject=${encodeURIComponent("General Inquiry — Connection Jobs")}&body=${encodeURIComponent("Hi Akshay,\n\nI'm reaching out regarding opportunities and future roles with creative teams:")}`
    : null;

  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "48px 0 100px" }}>
      <Container>
        {/* Back Link */}
        <div style={{ marginBottom: 36 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: fontMono,
              fontSize: 13,
              color: COLORS.muted,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to portfolio</span>
          </Link>
        </div>

        {/* Page Header */}
        <header style={{ maxWidth: 740, marginBottom: 56 }}>
          <Eyebrow>Careers</Eyebrow>
          <h1
            style={{
              fontFamily: fontDisplay,
              fontWeight: 500,
              fontSize: "clamp(34px, 4.5vw, 48px)",
              letterSpacing: "-0.025em",
              color: COLORS.ink,
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}
          >
            Connection Jobs
          </h1>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: 1.6,
              color: COLORS.inkSoft,
              margin: "0 0 12px",
            }}
          >
            Opportunities to work with creative teams, build meaningful products, and grow your craft.
          </p>
          <p
            style={{
              fontFamily: fontBody,
              fontSize: 15,
              lineHeight: 1.6,
              color: COLORS.muted,
              margin: 0,
            }}
          >
            Explore open roles, find the right fit, and reach out if you have questions.
          </p>
        </header>

        {/* Positions Section */}
        <section aria-labelledby="open-positions-heading">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
            <h2
              id="open-positions-heading"
              style={{
                fontFamily: fontDisplay,
                fontWeight: 500,
                fontSize: 22,
                color: COLORS.ink,
                margin: 0,
              }}
            >
              Open Positions
            </h2>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 12.5,
                color: COLORS.muted,
              }}
            >
              {openJobs.length} {openJobs.length === 1 ? "role" : "roles"} available
            </span>
          </div>

          {openJobs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {openJobs.map((job) => (
                <JobCard key={job.id} job={job} now={now} />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: COLORS.white,
                border: `1px dashed ${COLORS.borderStrong}`,
                borderRadius: 14,
                padding: "56px 32px",
                textAlign: "center",
                maxWidth: 640,
                margin: "12px auto 0",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: COLORS.surface,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.accent,
                  marginBottom: 18,
                }}
                aria-hidden="true"
              >
                <Sparkles size={20} strokeWidth={1.75} />
              </div>
              <h3
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 20,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 10px",
                }}
              >
                No open positions right now.
              </h3>
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: 15,
                  color: COLORS.muted,
                  lineHeight: 1.6,
                  margin: "0 auto 28px",
                  maxWidth: 480,
                }}
              >
                We&apos;re always interested in connecting with thoughtful people. Check back later for new opportunities.
              </p>
              {generalInquiryMailto && (
                <Button variant="secondary" href={generalInquiryMailto} icon={Mail}>
                  Reach out directly
                </Button>
              )}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
