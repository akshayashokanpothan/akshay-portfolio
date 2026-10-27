import assert from "node:assert";

// Expiry logic tests
import {
  getKolkataParts,
  getJobExpiryInfo,
  isJobApplyable,
  getPublicOpenJobs,
} from "../lib/jobs/expiry.ts";

import {
  formatExperience,
  getClarificationUrl,
  getJobBySlug,
  getAllJobSlugs,
  JOBS,
} from "../lib/data/jobs.ts";

console.log("=== RUNNING CONNECTION JOBS AUTOMATED TEST SUITE ===");

// 1. Timezone safe Kolkata parts test
const refKolkataTime = new Date("2026-10-26T00:14:18.000+05:30");
const kolkataParts = getKolkataParts(refKolkataTime);
assert.strictEqual(kolkataParts.year, 2026, "Year in Kolkata must be 2026");
assert.strictEqual(kolkataParts.month, 10, "Month in Kolkata must be 10");
assert.strictEqual(kolkataParts.day, 26, "Day in Kolkata must be 26");
assert.strictEqual(kolkataParts.hour, 0, "Hour in Kolkata must be 0");
assert.strictEqual(kolkataParts.minute, 14, "Minute in Kolkata must be 14");
console.log("✓ Test 1 Passed: getKolkataParts correctly extracts IST timezone components.");

// 2. Deadline calculation: Closes today (valid through end of day 23:59:59.999+05:30)
const baseJob = {
  id: "test-1",
  slug: "test-role",
  title: "Product Designer",
  location: "Bangalore",
  workMode: "Remote",
  status: "Open",
  closesAt: "2026-10-26",
  applicationUrl: "https://tally.so/r/2EqzVg",
  clarificationUrl: null,
};

const nowToday = new Date("2026-10-26T12:00:00.000+05:30");
const expiryToday = getJobExpiryInfo(baseJob, nowToday);
assert.strictEqual(expiryToday.isOpen, true, "Should be open today before 23:59:59.999 IST");
assert.strictEqual(expiryToday.isExpired, false, "Should not be expired before end of today");
assert.strictEqual(expiryToday.label, "Closes today", "Label should be 'Closes today'");
console.log("✓ Test 2 Passed: 'Closes today' handled through 23:59:59.999 IST end-of-day boundary.");

// 3. Deadline calculation: Closes in 1 day (singular grammar)
const jobTomorrow = { ...baseJob, closesAt: "2026-10-27" };
const expiryTomorrow = getJobExpiryInfo(jobTomorrow, nowToday);
assert.strictEqual(expiryTomorrow.isOpen, true);
assert.strictEqual(expiryTomorrow.label, "Closes in 1 day", "Singular '1 day' grammar check");
console.log("✓ Test 3 Passed: Singular grammar 'Closes in 1 day' verified.");

// 4. Deadline calculation: Closes in 3 days & 5 days (plural grammar)
const job3Days = { ...baseJob, closesAt: "2026-10-29" };
const expiry3Days = getJobExpiryInfo(job3Days, nowToday);
assert.strictEqual(expiry3Days.isOpen, true);
assert.strictEqual(expiry3Days.label, "Closes in 3 days", "Plural '3 days' grammar check");

const job5Days = { ...baseJob, closesAt: "2026-10-31" };
const expiry5Days = getJobExpiryInfo(job5Days, nowToday);
assert.strictEqual(expiry5Days.isOpen, true);
assert.strictEqual(expiry5Days.label, "Closes in 5 days", "Plural '5 days' grammar check");
console.log("✓ Test 4 Passed: Plural grammar 'Closes in 3 days' & 'Closes in 5 days' verified.");

// 5. Expired deadline: Past 23:59:59.999 IST on closing day
const nowAfterMidnight = new Date("2026-10-27T00:00:01.000+05:30");
const expiryExpired = getJobExpiryInfo(baseJob, nowAfterMidnight);
assert.strictEqual(expiryExpired.isOpen, false, "Must not be open after deadline");
assert.strictEqual(expiryExpired.isExpired, true, "Must be marked expired");
assert.strictEqual(expiryExpired.label, "Closed", "Label must be 'Closed'");
assert.strictEqual(isJobApplyable(baseJob, nowAfterMidnight), false, "Must not allow application after deadline");
console.log("✓ Test 5 Passed: Expiry transition past midnight IST verified.");

// 6. Manually closed job: status === 'Closed' even if closesAt is in future
const jobClosedManually = { ...baseJob, closesAt: "2026-11-30", status: "Closed" };
const expiryClosedManually = getJobExpiryInfo(jobClosedManually, nowToday);
assert.strictEqual(expiryClosedManually.isOpen, false, "Manually closed job must not be open");
assert.strictEqual(expiryClosedManually.isManuallyClosed, true);
assert.strictEqual(expiryClosedManually.label, "Closed");
assert.strictEqual(isJobApplyable(jobClosedManually, nowToday), false, "Cannot apply to manually closed job");
console.log("✓ Test 6 Passed: Manually closed jobs treated as closed before deadline.");

// 7. Draft jobs: status === 'Draft' must never be public or open
const jobDraft = { ...baseJob, closesAt: "2026-11-30", status: "Draft" };
const expiryDraft = getJobExpiryInfo(jobDraft, nowToday);
assert.strictEqual(expiryDraft.isOpen, false, "Draft jobs must never be open");
assert.strictEqual(expiryDraft.isDraft, true);
assert.strictEqual(isJobApplyable(jobDraft, nowToday), false);
console.log("✓ Test 7 Passed: Draft jobs remain hidden and not applyable.");

// 8. Invalid closing dates: Must be safely excluded rather than treated as open
const jobInvalidDate1 = { ...baseJob, closesAt: "not-a-date" };
const expiryInvalid1 = getJobExpiryInfo(jobInvalidDate1, nowToday);
assert.strictEqual(expiryInvalid1.isValidDate, false);
assert.strictEqual(expiryInvalid1.isOpen, false);
assert.strictEqual(isJobApplyable(jobInvalidDate1, nowToday), false);
console.log("✓ Test 8 Passed: Invalid closing dates safely rejected.");

// 9. Verification of Confirmed Job A (Product Designer - UX-first)
const jobA = JOBS.find((j) => j.slug === "product-designer-ux");
assert(jobA, "Job A (product-designer-ux) must exist");
assert.strictEqual(jobA.title, "Product Designer");
assert.strictEqual(jobA.specialization, "UX-first designer");
assert.strictEqual(jobA.domain, "FinTech B2B");
assert.strictEqual(jobA.location, "Bangalore");
assert.strictEqual(jobA.workMode, "Remote");
assert.strictEqual(jobA.employmentType, "Full-time");
assert.strictEqual(jobA.closesAt, "2026-10-29");
assert.strictEqual(jobA.applicationUrl, "https://tally.so/r/2EqzVg");
assert.strictEqual(getClarificationUrl(jobA), null);
assert(jobA.summary && jobA.summary.length > 20, "Job A must have a detailed summary");
assert(Array.isArray(jobA.responsibilities) && jobA.responsibilities.length >= 3, "Job A must have structured responsibilities");
assert(Array.isArray(jobA.requirements) && jobA.requirements.length >= 5, "Job A must have requirements");
console.log("✓ Test 9 Passed: Job A (Product Designer UX-first) fully verified.");

// 10. Verification of Confirmed Job B (Product Designer - UI-first)
const jobB = JOBS.find((j) => j.slug === "product-designer-ui");
assert(jobB, "Job B (product-designer-ui) must exist");
assert.strictEqual(jobB.title, "Product Designer");
assert.strictEqual(jobB.specialization, "UI-first designer");
assert.strictEqual(jobB.domain, "FinTech B2B");
assert.strictEqual(jobB.location, "Bangalore");
assert.strictEqual(jobB.workMode, "Remote");
assert.strictEqual(jobB.employmentType, "Full-time");
assert.strictEqual(jobB.closesAt, "2026-10-31");
assert.strictEqual(jobB.applicationUrl, "https://tally.so/r/2EqzVg");
assert.strictEqual(getClarificationUrl(jobB), null);
assert(jobB.summary && jobB.summary.length > 20, "Job B must have a detailed summary");
assert(Array.isArray(jobB.responsibilities) && jobB.responsibilities.length >= 3, "Job B must have structured responsibilities");
console.log("✓ Test 10 Passed: Job B (Product Designer UI-first) fully verified.");

// 11. Verification of Confirmed Job C (Product Design Intern)
const jobC = JOBS.find((j) => j.slug === "product-design-intern");
assert(jobC, "Job C (product-design-intern) must exist");
assert.strictEqual(jobC.title, "Product Design Intern");
assert.strictEqual(jobC.specialization, "Design Systems");
assert.strictEqual(jobC.domain, "FinTech B2B");
assert.strictEqual(jobC.location, "Bangalore");
assert.strictEqual(jobC.workMode, "Remote");
assert.strictEqual(jobC.employmentType, "Internship");
assert.strictEqual(jobC.closesAt, "2026-10-31");
assert.strictEqual(jobC.applicationUrl, "https://tally.so/r/2EqzVg");
assert.strictEqual(getClarificationUrl(jobC), null);
assert(jobC.summary && jobC.summary.length > 20, "Job C must have a detailed summary");
console.log("✓ Test 11 Passed: Job C (Product Design Intern) fully verified.");

// 12. Verification of Confirmed Job D (Creative & Motion Graphics Designer)
const jobD = JOBS.find((j) => j.slug === "creative-motion-graphics-designer");
assert(jobD, "Job D (creative-motion-graphics-designer) must exist");
assert.strictEqual(jobD.title, "Creative & Motion Graphics Designer");
assert.strictEqual(jobD.team, "Marketing & Experience Design");
assert.strictEqual(jobD.seniority, "Entry level");
assert.strictEqual(jobD.location, "Kochi, Kerala");
assert.strictEqual(jobD.workMode, "Hybrid");
assert.strictEqual(jobD.employmentType, "Full-time");
assert.strictEqual(jobD.closesAt, "2026-10-29");
assert.strictEqual(jobD.applicationUrl, "https://tally.so/r/2jjrvD");
assert.strictEqual(getClarificationUrl(jobD), null);
assert(jobD.summary && jobD.summary.length > 20, "Job D must have a detailed summary");
assert(Array.isArray(jobD.portfolioRequirements) && jobD.portfolioRequirements.length >= 4, "Job D must have portfolio requirements");
console.log("✓ Test 12 Passed: Job D (Creative & Motion Graphics Designer) fully verified.");

// 13. Public open jobs filter with all 4 confirmed roles
const activeJobs = getPublicOpenJobs(JOBS, nowToday);
assert.strictEqual(activeJobs.length, 4, "All 4 confirmed jobs should be active on 26 Oct base date");

// Check expiry in future: on 30 October 2026, Jobs A and D are closed, Jobs B and C remain open
const nowOct30 = new Date("2026-10-30T10:00:00.000+05:30");
const activeOnOct30 = getPublicOpenJobs(JOBS, nowOct30);
assert.strictEqual(activeOnOct30.length, 2, "Jobs B and C should remain open on Oct 30");
const activeSlugsOct30 = activeOnOct30.map((j) => j.slug);
assert(activeSlugsOct30.includes("product-designer-ui"));
assert(activeSlugsOct30.includes("product-design-intern"));

// On 1 November 2026, all jobs are expired
const nowNov1 = new Date("2026-11-01T00:00:01.000+05:30");
const activeOnNov1 = getPublicOpenJobs(JOBS, nowNov1);
assert.strictEqual(activeOnNov1.length, 0, "All jobs expired by Nov 1");
console.log("✓ Test 13 Passed: Lifecycle transitions over 3-day and 5-day deadlines verified.");

// 14. Experience formatting
assert.strictEqual(formatExperience(jobA), "Experience: 2–3 years");
assert.strictEqual(formatExperience(jobB), "Experience: 2–3 years");
assert.strictEqual(formatExperience(jobC), "Experience: Internship / Entry-level");
assert.strictEqual(formatExperience(jobD), "Experience: 0–2 years");
console.log("✓ Test 14 Passed: Experience labels correctly formatted for all 4 roles.");

// 15. Helper functions: getJobBySlug and getAllJobSlugs
const allSlugs = getAllJobSlugs();
assert.strictEqual(allSlugs.length, 4);
assert(allSlugs.includes("product-designer-ux"));
assert(allSlugs.includes("product-designer-ui"));
assert(allSlugs.includes("product-design-intern"));
assert(allSlugs.includes("creative-motion-graphics-designer"));

assert.strictEqual(getJobBySlug("product-designer-ux")?.id, jobA.id);
assert.strictEqual(getJobBySlug("product-designer-ui")?.id, jobB.id);
assert.strictEqual(getJobBySlug("product-design-intern")?.id, jobC.id);
assert.strictEqual(getJobBySlug("creative-motion-graphics-designer")?.id, jobD.id);
assert.strictEqual(getJobBySlug("non-existent-slug"), undefined);
console.log("✓ Test 15 Passed: getJobBySlug and getAllJobSlugs helpers verified.");

console.log("\nALL 15 TESTS PASSED SUCCESSFULLY!");
