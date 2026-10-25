import type { Job } from "../types/jobs";

export const DEFAULT_CONTACT_EMAIL = "akshayashokan248@gmail.com";

/**
 * Confirmed Connection Jobs openings.
 * Implementation base date: 26 October 2026 (Asia/Kolkata).
 * Deadlines are valid through 23:59:59.999 IST of the configured closing date.
 */
export const JOBS: Job[] = [
  {
    id: "pd-ux-first-2026",
    slug: "product-designer-ux-first",
    title: "Product Designer",
    specialization: "UX-first designer",
    domain: "FinTech B2B",
    experienceMin: 2,
    experienceMax: 3,
    experienceLabel: "2–3 years",
    location: "Bangalore",
    workMode: "Remote",
    // Employment type unspecified: handled cleanly without fabrication
    closesAt: "2026-10-29", // 3 days from 26 Oct 2026 in Asia/Kolkata
    status: "Open",
    applicationUrl: "https://tally.so/r/2EqzVg",
    clarificationUrl: null, // Unconfigured
    description: "Emphasizes UX-first product design and user-centered problem-solving in FinTech B2B.",
  },
  {
    id: "pd-ui-first-2026",
    slug: "product-designer-ui-first",
    title: "Product Designer",
    specialization: "UI-first designer",
    domain: "FinTech B2B",
    experienceMin: 2,
    experienceMax: 3,
    experienceLabel: "2–3 years",
    location: "Bangalore",
    workMode: "Remote",
    // Employment type unspecified: handled cleanly without fabrication
    closesAt: "2026-10-31", // 5 days from 26 Oct 2026 in Asia/Kolkata
    status: "Open",
    applicationUrl: "https://tally.so/r/2EqzVg",
    clarificationUrl: null, // Unconfigured
    description: "Emphasizes UI craft, visual hierarchy, and interface design in FinTech B2B.",
  },
  {
    id: "creative-motion-graphics-2026",
    slug: "creative-motion-graphics-designer",
    title: "Creative & Motion Graphics Designer",
    team: "Marketing & Experience Design",
    seniority: "Entry level",
    experienceMin: 0,
    experienceMax: 2,
    experienceLabel: "0–2 years",
    location: "Kochi",
    workMode: "Hybrid",
    // Employment type unspecified: handled cleanly without fabrication
    closesAt: "2026-10-29", // 3 days from 26 Oct 2026 in Asia/Kolkata
    status: "Open",
    applicationUrl: `mailto:akshay.p@ideogfx.com?subject=${encodeURIComponent("Application — Creative & Motion Graphics Designer")}`,
    clarificationUrl: null, // Unconfigured
    description: "Marketing & Experience Design team role focusing on creative and motion graphics design.",
  },
];

/**
 * Returns formatted experience copy, handling overrides and ranges safely.
 */
export function formatExperience(job: Job): string {
  if (job.experienceLabel && job.experienceLabel.trim()) {
    return `Experience: ${job.experienceLabel.trim()}`;
  }
  if (typeof job.experienceMin === "number" && typeof job.experienceMax === "number") {
    return `Experience: ${job.experienceMin}–${job.experienceMax} years`;
  }
  if (typeof job.experienceMin === "number") {
    return `Experience: ${job.experienceMin}+ years`;
  }
  return "";
}

/**
 * Returns the clarification destination for a role only when explicitly configured.
 * If none is configured, returns null to avoid rendering misleading active actions.
 */
export function getClarificationUrl(job: Job): string | null {
  if (job.clarificationUrl && job.clarificationUrl.trim()) {
    return job.clarificationUrl.trim();
  }
  return null;
}
