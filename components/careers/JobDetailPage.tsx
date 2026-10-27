"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  MapPin,
  Briefcase,
  Layers,
  Users,
  CheckCircle2,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Job, ResponsibilityCategory } from "@/lib/types/jobs";
import { getJobExpiryInfo, isJobApplyable } from "@/lib/jobs/expiry";
import { formatExperience, getClarificationUrl, getJobBySlug } from "@/lib/data/jobs";
import { COLORS, fontBody, fontDisplay, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface JobDetailPageProps {
  slug?: string;
  job?: Job | null;
}

export function JobDetailPage({ slug, job: propJob }: JobDetailPageProps) {
  const job = propJob !== undefined ? propJob : (slug ? getJobBySlug(slug) : null);
  const [now, setNow] = useState<Date>(() => new Date());
  const [closedError, setClosedError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Not Found State
  if (!job) {
    return (
      <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "64px 0 100px" }}>
        <Container>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: "80px 24px" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: COLORS.surface,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.accent,
                marginBottom: 20,
              }}
              aria-hidden="true"
            >
              <AlertCircle size={24} strokeWidth={1.75} />
            </div>
            <h1
              style={{
                fontFamily: fontDisplay,
                fontWeight: 500,
                fontSize: 32,
                color: COLORS.ink,
                margin: "0 0 16px",
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
                margin: "0 0 32px",
              }}
            >
              The job you are looking for does not exist or may have been removed. Explore our other active openings in Connection Jobs.
            </p>
            <Button variant="primary" href="/careers" icon={ArrowLeft}>
              Back to all open positions
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const expiry = getJobExpiryInfo(job, now);
  const experienceText = formatExperience(job);
  const clarificationUrl = getClarificationUrl(job);
  const canApply = isJobApplyable(job, now) && !closedError;
  const isClosingUrgent = expiry.isOpen && expiry.diffDays !== undefined && expiry.diffDays <= 1;

  const handleApplyClick = (e?: React.MouseEvent) => {
    const currentValidation = isJobApplyable(job, new Date());
    if (!currentValidation) {
      if (e) {
        e.preventDefault();
      }
      setClosedError("This position is no longer accepting applications.");
    }
  };

  const isMailto = Boolean(job.applicationUrl?.startsWith("mailto:"));

  // Meta items for header
  const metaBadges: Array<{ id: string; label: string; icon: React.ReactNode }> = [];

  metaBadges.push({
    id: "location",
    label: job.location,
    icon: <MapPin size={13} strokeWidth={1.75} />,
  });

  metaBadges.push({
    id: "workMode",
    label: job.workMode,
    icon: <Briefcase size={13} strokeWidth={1.75} />,
  });

  if (job.employmentType) {
    metaBadges.push({
      id: "employmentType",
      label: job.employmentType,
      icon: <Briefcase size={13} strokeWidth={1.75} />,
    });
  }

  if (job.domain) {
    metaBadges.push({
      id: "domain",
      label: job.domain,
      icon: <Layers size={13} strokeWidth={1.75} />,
    });
  }

  if (job.team) {
    metaBadges.push({
      id: "team",
      label: job.team,
      icon: <Users size={13} strokeWidth={1.75} />,
    });
  }

  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "40px 0 120px" }}>
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: fontMono,
              fontSize: 13,
              color: COLORS.muted,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/careers"
              style={{
                color: COLORS.inkSoft,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <ArrowLeft size={13} />
              <span>Connection Jobs</span>
            </Link>
            <span aria-hidden="true" style={{ color: COLORS.borderStrong }}>/</span>
            <span style={{ color: COLORS.accent, fontWeight: 500 }}>
              {job.title} {job.specialization ? `(${job.specialization})` : ""}
            </span>
          </div>
        </nav>

        {/* Closed or Expired Notice Banner */}
        {!expiry.isOpen && (
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.borderStrong}`,
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
            role="status"
          >
            <AlertCircle size={20} color="#C0392B" />
            <div>
              <p style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.ink, margin: 0 }}>
                {expiry.label === "Closed"
                  ? "Applications for this position are now closed."
                  : "This position is not currently open for public applications."}
              </p>
              <p style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.muted, margin: "4px 0 0" }}>
                You can review the responsibilities and requirements below, or explore other active openings.
              </p>
            </div>
          </div>
        )}

        {/* Job Header Hero */}
        <header
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "36px 40px",
            marginBottom: 48,
          }}
          className="job-header-card"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div>
              <Eyebrow>{job.team || job.domain || "Connection Jobs"}</Eyebrow>
              <h1
                style={{
                  fontFamily: fontDisplay,
                  fontWeight: 500,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  letterSpacing: "-0.02em",
                  color: COLORS.ink,
                  margin: "8px 0 12px",
                  lineHeight: 1.2,
                }}
              >
                {job.title}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                {job.specialization && (
                  <span
                    style={{
                      fontFamily: fontMono,
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: COLORS.accent,
                      background: COLORS.accentSoft,
                      border: `1px solid ${COLORS.accent}`,
                      borderRadius: 6,
                      padding: "4px 10px",
                    }}
                  >
                    {job.specialization}
                  </span>
                )}
                {job.seniority && (
                  <span
                    style={{
                      fontFamily: fontMono,
                      fontSize: 12.5,
                      color: COLORS.inkSoft,
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 6,
                      padding: "4px 10px",
                    }}
                  >
                    {job.seniority}
                  </span>
                )}
                {experienceText && (
                  <span
                    style={{
                      fontFamily: fontMono,
                      fontSize: 12.5,
                      color: COLORS.inkSoft,
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 6,
                      padding: "4px 10px",
                    }}
                  >
                    {experienceText}
                  </span>
                )}
              </div>
            </div>

            {/* Closing Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: fontMono,
                fontSize: 12.5,
                padding: "6px 12px",
                borderRadius: 8,
                background: isClosingUrgent ? COLORS.accentSoft : COLORS.surface,
                color: isClosingUrgent ? COLORS.accent : COLORS.inkSoft,
                border: `1px solid ${isClosingUrgent ? COLORS.accent : COLORS.border}`,
              }}
              aria-label={expiry.accessibleDescription}
            >
              <Clock size={14} strokeWidth={2} />
              <span>{expiry.label}</span>
            </div>
          </div>

          {/* Badges Strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              paddingTop: 20,
              borderTop: `1px solid ${COLORS.border}`,
              marginTop: 20,
            }}
          >
            {metaBadges.map((badge) => (
              <span
                key={badge.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: fontBody,
                  fontSize: 13.5,
                  color: COLORS.inkSoft,
                  background: COLORS.surface,
                  padding: "5px 12px",
                  borderRadius: 6,
                }}
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </header>

        {/* Structured Job Content Layout */}
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          {/* Summary / Overview */}
          {(job.summary || job.description) && (
            <section style={{ marginBottom: 44 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 16px",
                }}
              >
                About the Role
              </h2>
              {job.summary && (
                <p
                  style={{
                    fontFamily: fontBody,
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: COLORS.ink,
                    fontWeight: 450,
                    margin: "0 0 16px",
                  }}
                >
                  {job.summary}
                </p>
              )}
              {job.description && (
                <p
                  style={{
                    fontFamily: fontBody,
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: COLORS.inkSoft,
                    margin: 0,
                  }}
                >
                  {job.description}
                </p>
              )}
            </section>
          )}

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 20px",
                }}
              >
                What You&apos;ll Do
              </h2>

              {Array.isArray(job.responsibilities) &&
              typeof job.responsibilities[0] === "object" &&
              "category" in (job.responsibilities[0] as object) ? (
                // Grouped by Category
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {(job.responsibilities as ResponsibilityCategory[]).map((group, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: COLORS.white,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 12,
                        padding: "24px 28px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: fontDisplay,
                          fontSize: 17,
                          fontWeight: 500,
                          color: COLORS.ink,
                          margin: "0 0 14px",
                        }}
                      >
                        {group.category}
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                        {group.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            style={{
                              fontFamily: fontBody,
                              fontSize: 14.5,
                              lineHeight: 1.6,
                              color: COLORS.inkSoft,
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                // Simple List
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "24px 28px 24px 44px",
                  }}
                >
                  {(job.responsibilities as string[]).map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: fontBody,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* What We're Looking For */}
          {job.requirements && job.requirements.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 20px",
                }}
              >
                What We&apos;re Looking For
              </h2>
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {job.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: fontBody,
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Nice to Have / Preferred Qualifications */}
          {job.preferredQualifications && job.preferredQualifications.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 20px",
                }}
              >
                A Strong Plus
              </h2>
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {job.preferredQualifications.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: fontBody,
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Portfolio Requirements (if applicable) */}
          {job.portfolioRequirements && job.portfolioRequirements.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 20px",
                }}
              >
                Portfolio Requirements
              </h2>
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <p style={{ fontFamily: fontBody, fontSize: 14.5, color: COLORS.inkSoft, margin: "0 0 12px" }}>
                  A portfolio is required as part of the application, demonstrating work across areas such as:
                </p>
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {job.portfolioRequirements.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: fontBody,
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Why Join This Team */}
          {job.whyJoin && job.whyJoin.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 20px",
                }}
              >
                Why Join This Team?
              </h2>
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {job.whyJoin.map((reason, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle2 size={16} color={COLORS.accent} style={{ marginTop: 3, flexShrink: 0 }} />
                      <span style={{ fontFamily: fontBody, fontSize: 14.5, lineHeight: 1.6, color: COLORS.inkSoft }}>
                        {reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Hiring Process */}
          {job.hiringProcess && job.hiringProcess.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 20px",
                }}
              >
                Hiring Process
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                {job.hiringProcess.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: "22px 24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fontMono,
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: COLORS.accent,
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      Step 0{idx + 1}
                    </span>
                    <h3
                      style={{
                        fontFamily: fontDisplay,
                        fontSize: 16,
                        fontWeight: 500,
                        color: COLORS.ink,
                        margin: "0 0 8px",
                      }}
                    >
                      {step.round}
                    </h3>
                    <p
                      style={{
                        fontFamily: fontBody,
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: COLORS.muted,
                        margin: 0,
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* How to Apply */}
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: fontDisplay,
                fontSize: 22,
                fontWeight: 500,
                color: COLORS.ink,
                margin: "0 0 16px",
              }}
            >
              How to Apply
            </h2>
            <div
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.borderStrong}`,
                borderRadius: 14,
                padding: "28px 32px",
              }}
            >
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: COLORS.inkSoft,
                  margin: "0 0 14px",
                }}
              >
                {job.applicationInstructions ||
                  "Submit your application through the official form with your portfolio and work samples."}
              </p>
              {job.contactEmail && (
                <p
                  style={{
                    fontFamily: fontMono,
                    fontSize: 13,
                    color: COLORS.muted,
                    margin: 0,
                  }}
                >
                  Direct hiring contact:{" "}
                  <a
                    href={`mailto:${job.contactEmail}`}
                    style={{ color: COLORS.accent, textDecoration: "none" }}
                  >
                    {job.contactEmail}
                  </a>
                </p>
              )}
            </div>
          </section>

          {/* Action Area */}
          <div
            style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: "32px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
            className="action-area"
          >
            <div>
              <h3
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 4px",
                }}
              >
                Ready to take ownership?
              </h3>
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: 14,
                  color: COLORS.muted,
                  margin: 0,
                }}
              >
                {canApply
                  ? "Submit your application or explore other available roles."
                  : "Applications for this position have closed."}
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="secondary" href="/careers" icon={ArrowLeft}>
                Back to Jobs
              </Button>

              {canApply ? (
                <Button
                  variant="primary"
                  href={job.applicationUrl || "#"}
                  icon={isMailto ? Mail : ArrowUpRight}
                  onClick={handleApplyClick}
                >
                  Apply Now
                </Button>
              ) : (
                <Button variant="primary" disabled icon={ArrowUpRight}>
                  Applications Closed
                </Button>
              )}

              {clarificationUrl && (
                <Button variant="secondary" href={clarificationUrl} icon={Mail}>
                  Clarify Doubts
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 640px) {
          .job-header-card {
            padding: 24px 20px !important;
          }
          .action-area {
            padding: 24px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
