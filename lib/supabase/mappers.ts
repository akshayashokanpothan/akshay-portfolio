import type { Job, ResponsibilityCategory, HiringProcessRound } from "../types/jobs";

export interface DatabaseJobRow {
  id: string;
  slug: string;
  title: string;
  specialization: string | null;
  domain: string | null;
  team: string | null;
  seniority: string | null;
  experience_min: number | null;
  experience_max: number | null;
  experience_label: string | null;
  location: string;
  work_mode: "On-site" | "Hybrid" | "Remote";
  employment_type: "Full-time" | "Internship" | "Contract" | null;
  closes_at: string;
  status: "Draft" | "Published" | "Closed";
  application_url: string | null;
  clarification_url: string | null;
  contact_email: string | null;
  summary: string | null;
  description: string | null;
  responsibilities: ResponsibilityCategory[] | string[] | null;
  requirements: string[] | null;
  preferred_qualifications: string[] | null;
  portfolio_requirements: string[] | null;
  why_join: string[] | null;
  hiring_process: HiringProcessRound[] | null;
  application_instructions: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Maps a Supabase database row to the frontend Job model.
 */
export function mapRowToJob(row: DatabaseJobRow): Job {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    specialization: row.specialization || undefined,
    domain: row.domain || undefined,
    team: row.team || undefined,
    seniority: row.seniority || undefined,
    experienceMin: row.experience_min !== null ? Number(row.experience_min) : undefined,
    experienceMax: row.experience_max !== null ? Number(row.experience_max) : undefined,
    experienceLabel: row.experience_label || undefined,
    location: row.location,
    workMode: row.work_mode,
    employmentType: row.employment_type || null,
    closesAt: row.closes_at,
    // Database 'Published' maps to Job 'Open' for public expiry and status checks
    status: row.status === "Published" ? "Open" : row.status === "Closed" ? "Closed" : "Draft",
    applicationUrl: row.application_url || null,
    clarificationUrl: row.clarification_url || null,
    contactEmail: row.contact_email || undefined,
    summary: row.summary || undefined,
    description: row.description || undefined,
    responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : undefined,
    requirements: Array.isArray(row.requirements) ? row.requirements : undefined,
    preferredQualifications: Array.isArray(row.preferred_qualifications)
      ? row.preferred_qualifications
      : undefined,
    portfolioRequirements: Array.isArray(row.portfolio_requirements)
      ? row.portfolio_requirements
      : undefined,
    whyJoin: Array.isArray(row.why_join) ? row.why_join : undefined,
    hiringProcess: Array.isArray(row.hiring_process) ? row.hiring_process : undefined,
    applicationInstructions: row.application_instructions || undefined,
  };
}

/**
 * Maps frontend Job model / form values to a database row for insert or update.
 */
export function mapJobToRow(job: Partial<Job> & { closesAt: string; title: string; slug: string; location: string; workMode: "On-site" | "Hybrid" | "Remote" }): Partial<DatabaseJobRow> {
  const status: "Draft" | "Published" | "Closed" =
    job.status === "Open" || job.status === "Published"
      ? "Published"
      : job.status === "Closed"
      ? "Closed"
      : "Draft";

  return {
    slug: job.slug.trim(),
    title: job.title.trim(),
    specialization: job.specialization?.trim() || null,
    domain: job.domain?.trim() || null,
    team: job.team?.trim() || null,
    seniority: job.seniority?.trim() || null,
    experience_min: typeof job.experienceMin === "number" ? job.experienceMin : null,
    experience_max: typeof job.experienceMax === "number" ? job.experienceMax : null,
    experience_label: job.experienceLabel?.trim() || null,
    location: job.location.trim(),
    work_mode: job.workMode,
    employment_type: job.employmentType || null,
    closes_at: job.closesAt.trim(),
    status,
    application_url: job.applicationUrl?.trim() || null,
    clarification_url: job.clarificationUrl?.trim() || null,
    contact_email: job.contactEmail?.trim() || null,
    summary: job.summary?.trim() || null,
    description: job.description?.trim() || null,
    responsibilities: job.responsibilities || [],
    requirements: job.requirements || [],
    preferred_qualifications: job.preferredQualifications || [],
    portfolio_requirements: job.portfolioRequirements || [],
    why_join: job.whyJoin || [],
    hiring_process: job.hiringProcess || [],
    application_instructions: job.applicationInstructions?.trim() || null,
  };
}
