export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type EmploymentType = "Full-time" | "Internship" | "Contract";
export type JobStatus = "Draft" | "Open" | "Closed";

export interface ResponsibilityCategory {
  category: string;
  items: string[];
}

export interface HiringProcessRound {
  round: string;
  detail: string;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  specialization?: string; // e.g. "UX-first designer" | "UI-first designer" | "Design Systems"
  domain?: string; // e.g. "FinTech B2B"
  team?: string; // e.g. "Marketing & Experience Design" | "Product Design"
  seniority?: string; // e.g. "Entry level" | "Mid-level"
  experienceMin?: number;
  experienceMax?: number;
  experienceLabel?: string; // e.g. "0–1 year", "0–2 years", "2–3 years", "Internship"
  location: string; // e.g. "Bangalore" or "Kochi, Kerala"
  workMode: WorkMode;
  employmentType?: EmploymentType | null; // Optional: do not fabricate when unspecified
  closesAt: string; // ISO date string (YYYY-MM-DD or full ISO string with timezone)
  status: JobStatus;
  applicationUrl?: string | null;
  clarificationUrl?: string | null;
  summary?: string;
  description?: string;
  responsibilities?: ResponsibilityCategory[] | string[];
  requirements?: string[];
  preferredQualifications?: string[];
  portfolioRequirements?: string[];
  whyJoin?: string[];
  hiringProcess?: HiringProcessRound[];
  applicationInstructions?: string;
  contactEmail?: string;
}
