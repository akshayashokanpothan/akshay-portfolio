export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type EmploymentType = "Full-time" | "Internship" | "Contract";
export type JobStatus = "Draft" | "Open" | "Closed";

export interface Job {
  id: string;
  slug: string;
  title: string;
  specialization?: string; // e.g. "UX-first designer" | "UI-first designer"
  domain?: string; // e.g. "FinTech B2B"
  team?: string; // e.g. "Marketing & Experience Design"
  seniority?: string; // e.g. "Entry level"
  experienceMin?: number;
  experienceMax?: number;
  experienceLabel?: string; // e.g. "Freshers", "0–2 years", "2–3 years", "5+ years"
  location: string; // e.g. "Bangalore" or "Kochi"
  workMode: WorkMode;
  employmentType?: EmploymentType | null; // Optional: do not fabricate when unspecified
  closesAt: string; // ISO date string (YYYY-MM-DD or full ISO string with timezone)
  status: JobStatus;
  applicationUrl?: string | null;
  clarificationUrl?: string | null;
  description?: string;
  requirements?: string[];
}
