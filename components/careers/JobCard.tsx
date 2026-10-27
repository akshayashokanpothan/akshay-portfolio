"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Briefcase, Layers, Users, Mail } from "lucide-react";
import { Job } from "@/lib/types/jobs";
import { getJobExpiryInfo, isJobApplyable } from "@/lib/jobs/expiry";
import { formatExperience } from "@/lib/data/jobs";
import { COLORS, fontBody, fontDisplay, fontMono } from "@/lib/tokens";
import { Button } from "@/components/ui/Button";

interface JobCardProps {
  job: Job;
  now: Date;
}

export function JobCard({ job, now }: JobCardProps) {
  const [hover, setHover] = useState(false);
  const [titleHover, setTitleHover] = useState(false);
  const [closedError, setClosedError] = useState<string | null>(null);

  const expiry = getJobExpiryInfo(job, now);
  const experienceText = formatExperience(job);
  const canApply = isJobApplyable(job, now) && !closedError;
  const detailUrl = `/careers/${job.slug}`;

  const handleApplyClick = (e?: React.MouseEvent) => {
    // Re-validate deadline at time of action
    const currentValidation = isJobApplyable(job, new Date());
    if (!currentValidation) {
      if (e) {
        e.preventDefault();
      }
      setClosedError("This position is no longer accepting applications.");
    }
  };

  const isClosingUrgent = expiry.isOpen && expiry.diffDays !== undefined && expiry.diffDays <= 1;

  // Build metadata items dynamically so unspecified values are not fabricated
  const metaItems: Array<{ id: string; content: React.ReactNode }> = [];

  metaItems.push({
    id: "location",
    content: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
        <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
        {job.location}
      </span>
    ),
  });

  metaItems.push({
    id: "workMode",
    content: <span>{job.workMode}</span>,
  });

  if (job.domain) {
    metaItems.push({
      id: "domain",
      content: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Layers size={14} strokeWidth={1.75} aria-hidden="true" />
          {job.domain}
        </span>
      ),
    });
  }

  if (job.team) {
    metaItems.push({
      id: "team",
      content: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Users size={14} strokeWidth={1.75} aria-hidden="true" />
          {job.team}
        </span>
      ),
    });
  }

  if (job.employmentType) {
    metaItems.push({
      id: "employmentType",
      content: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Briefcase size={14} strokeWidth={1.75} aria-hidden="true" />
          {job.employmentType}
        </span>
      ),
    });
  }

  const isMailtoApplication = Boolean(job.applicationUrl?.startsWith("mailto:"));

  return (
    <article
      style={{
        background: COLORS.white,
        border: `1px solid ${hover ? COLORS.borderStrong : COLORS.border}`,
        borderRadius: 14,
        padding: "28px 32px",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        transform: hover ? "translateY(-2px)" : "none",
        boxShadow: hover ? "0 12px 28px -10px rgba(20,24,28,0.08)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-labelledby={`job-title-${job.id}`}
      className="job-card"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <h3
              id={`job-title-${job.id}`}
              style={{
                fontFamily: fontDisplay,
                fontSize: "clamp(20px, 2.2vw, 24px)",
                fontWeight: 500,
                color: COLORS.ink,
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              <Link
                href={detailUrl}
                style={{
                  color: titleHover ? COLORS.accent : COLORS.ink,
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={() => setTitleHover(true)}
                onMouseLeave={() => setTitleHover(false)}
              >
                {job.title}
              </Link>
            </h3>

            {/* Visual distinction for role specializations */}
            {job.specialization && (
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 12,
                  fontWeight: 500,
                  color: COLORS.accent,
                  background: COLORS.accentSoft,
                  border: `1px solid ${COLORS.accent}`,
                  borderRadius: 6,
                  padding: "3px 8px",
                  letterSpacing: "0.02em",
                }}
              >
                {job.specialization}
              </span>
            )}

            {job.seniority && (
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 12,
                  color: COLORS.inkSoft,
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                {job.seniority}
              </span>
            )}
          </div>

          {experienceText && (
            <p
              style={{
                fontFamily: fontMono,
                fontSize: 13,
                color: COLORS.inkSoft,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              {experienceText}
            </p>
          )}
        </div>

        {/* Closing status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fontMono,
            fontSize: 12,
            padding: "5px 10px",
            borderRadius: 6,
            background: isClosingUrgent ? COLORS.accentSoft : COLORS.surface,
            color: isClosingUrgent ? COLORS.accent : COLORS.inkSoft,
            border: `1px solid ${isClosingUrgent ? COLORS.accent : COLORS.border}`,
          }}
          aria-label={expiry.accessibleDescription}
        >
          <Clock size={13} strokeWidth={2} aria-hidden="true" />
          <span>{expiry.label}</span>
        </div>
      </div>

      {/* Metadata strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: fontBody,
          fontSize: 14,
          color: COLORS.muted,
          marginBottom: 14,
        }}
      >
        {metaItems.map((item, idx) => (
          <React.Fragment key={item.id}>
            {idx > 0 && <span aria-hidden="true">·</span>}
            {item.content}
          </React.Fragment>
        ))}
      </div>

      {/* Summary / description excerpt */}
      {(job.summary || job.description) && (
        <p
          style={{
            fontFamily: fontBody,
            fontSize: 14.5,
            lineHeight: 1.6,
            color: COLORS.inkSoft,
            margin: "0 0 24px",
            maxWidth: 740,
          }}
        >
          {job.summary || job.description}
        </p>
      )}

      {closedError && (
        <p
          style={{
            fontFamily: fontMono,
            fontSize: 12.5,
            color: "#C0392B",
            margin: "0 0 16px",
          }}
          role="alert"
        >
          {closedError}
        </p>
      )}

      {/* Actions: Detail-first exploration with direct apply option */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="primary" href={detailUrl} icon={ArrowRight}>
          Explore Role
        </Button>

        {canApply ? (
          <Button
            variant="secondary"
            href={job.applicationUrl || "#"}
            icon={isMailtoApplication ? Mail : ArrowUpRight}
            onClick={handleApplyClick}
          >
            Apply
          </Button>
        ) : (
          <Button variant="secondary" disabled icon={ArrowUpRight}>
            Applications Closed
          </Button>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .job-card {
            padding: 20px !important;
          }
        }
      `}</style>
    </article>
  );
}
