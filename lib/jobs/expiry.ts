import type { Job } from "../types/jobs";

export const KOLKATA_TIMEZONE = "Asia/Kolkata";

export interface KolkataDateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

/**
 * Returns date parts in Asia/Kolkata timezone.
 */
export function getKolkataParts(date: Date = new Date()): KolkataDateParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: KOLKATA_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const find = (type: string) => {
    const p = parts.find((pt) => pt.type === type);
    return p ? parseInt(p.value, 10) : 0;
  };

  return {
    year: find("year"),
    month: find("month"),
    day: find("day"),
    hour: find("hour") % 24,
    minute: find("minute"),
    second: find("second"),
  };
}

export interface JobExpiryInfo {
  isValidDate: boolean;
  isExpired: boolean;
  isManuallyClosed: boolean;
  isDraft: boolean;
  isOpen: boolean;
  label: string;
  deadlineMs?: number;
  diffDays?: number;
  accessibleDescription: string;
}

/**
 * Evaluates the closing date, expiry, and open status of a job.
 * Deadlines specified as YYYY-MM-DD are valid through 23:59:59.999 in Asia/Kolkata.
 */
export function getJobExpiryInfo(job: Job, now: Date = new Date()): JobExpiryInfo {
  const isManuallyClosed = job.status === "Closed";
  const isDraft = job.status === "Draft";

  if (!job.closesAt || typeof job.closesAt !== "string") {
    return {
      isValidDate: false,
      isExpired: false,
      isManuallyClosed,
      isDraft,
      isOpen: false,
      label: isManuallyClosed ? "Closed" : isDraft ? "Draft" : "Invalid closing date",
      accessibleDescription: "Closing date not specified or invalid.",
    };
  }

  const trimmedDate = job.closesAt.trim();
  let deadlineMs: number;
  let targetYear: number;
  let targetMonth: number;
  let targetDay: number;

  const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateOnlyRegex.test(trimmedDate)) {
    const [yStr, mStr, dStr] = trimmedDate.split("-");
    targetYear = parseInt(yStr, 10);
    targetMonth = parseInt(mStr, 10);
    targetDay = parseInt(dStr, 10);
    // End of that date in Asia/Kolkata is 23:59:59.999+05:30
    const endOfDayIso = `${yStr}-${mStr}-${dStr}T23:59:59.999+05:30`;
    deadlineMs = Date.parse(endOfDayIso);
  } else {
    deadlineMs = Date.parse(trimmedDate);
    if (!isNaN(deadlineMs)) {
      const parts = getKolkataParts(new Date(deadlineMs));
      targetYear = parts.year;
      targetMonth = parts.month;
      targetDay = parts.day;
    } else {
      targetYear = 0;
      targetMonth = 0;
      targetDay = 0;
    }
  }

  if (isNaN(deadlineMs) || !targetYear || !targetMonth || !targetDay) {
    return {
      isValidDate: false,
      isExpired: false,
      isManuallyClosed,
      isDraft,
      isOpen: false,
      label: isManuallyClosed ? "Closed" : isDraft ? "Draft" : "Invalid closing date",
      accessibleDescription: "Invalid closing date.",
    };
  }

  const nowMs = now.getTime();
  const isExpired = nowMs > deadlineMs;

  if (isManuallyClosed) {
    return {
      isValidDate: true,
      isExpired,
      isManuallyClosed: true,
      isDraft,
      isOpen: false,
      label: "Closed",
      deadlineMs,
      accessibleDescription: "This position is closed.",
    };
  }

  if (isExpired) {
    return {
      isValidDate: true,
      isExpired: true,
      isManuallyClosed: false,
      isDraft,
      isOpen: false,
      label: "Closed",
      deadlineMs,
      accessibleDescription: "Applications for this position have closed.",
    };
  }

  if (isDraft) {
    return {
      isValidDate: true,
      isExpired: false,
      isManuallyClosed: false,
      isDraft: true,
      isOpen: false,
      label: "Draft",
      deadlineMs,
      accessibleDescription: "This position is a draft and not publicly open.",
    };
  }

  // Active Open position: compute days remaining in Asia/Kolkata
  const todayParts = getKolkataParts(now);
  const todayMidnight = Date.UTC(todayParts.year, todayParts.month - 1, todayParts.day);
  const targetMidnight = Date.UTC(targetYear, targetMonth - 1, targetDay);
  const diffDays = Math.round((targetMidnight - todayMidnight) / 86400000);

  let label: string;
  let accessibleDescription: string;

  if (diffDays <= 0) {
    label = "Closes today";
    accessibleDescription = "Applications close today at end of day, Indian Standard Time.";
  } else if (diffDays === 1) {
    label = "Closes in 1 day";
    accessibleDescription = "Applications close tomorrow at end of day, Indian Standard Time.";
  } else {
    label = `Closes in ${diffDays} days`;
    accessibleDescription = `Applications close in ${diffDays} days, Indian Standard Time.`;
  }

  return {
    isValidDate: true,
    isExpired: false,
    isManuallyClosed: false,
    isDraft: false,
    isOpen: true,
    label,
    deadlineMs,
    diffDays,
    accessibleDescription,
  };
}

/**
 * Validates whether an application can proceed at this instant.
 */
export function isJobApplyable(job: Job, now: Date = new Date()): boolean {
  if (!job.applicationUrl || job.applicationUrl.trim() === "") {
    return false;
  }
  const expiry = getJobExpiryInfo(job, now);
  return expiry.isOpen;
}

/**
 * Filters the public open listings: excludes drafts, manually closed, expired,
 * and jobs with invalid closing dates.
 */
export function getPublicOpenJobs(jobs: Job[], now: Date = new Date()): Job[] {
  return jobs.filter((job) => {
    const expiry = getJobExpiryInfo(job, now);
    return expiry.isOpen;
  });
}
