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

// 9. Verification of Confirmed Job 1 (Product Designer - UX-first)
const job1 = JOBS.find((j) => j.id === "pd-ux-first-2026");
assert(job1, "Job 1 must exist");
assert.strictEqual(job1.title, "Product Designer");
assert.strictEqual(job1.specialization, "UX-first designer");
assert.strictEqual(job1.domain, "FinTech B2B");
assert.strictEqual(job1.location, "Bangalore");
assert.strictEqual(job1.workMode, "Remote");
assert.strictEqual(job1.employmentType, undefined, "Employment type must not be fabricated");
assert.strictEqual(job1.closesAt, "2026-10-29", "Job 1 closes 3 days from 26 Oct (2026-10-29)");
assert.strictEqual(job1.applicationUrl, "https://tally.so/r/2EqzVg");
assert.strictEqual(getClarificationUrl(job1), null, "Unconfigured clarification channel must return null");
const expiryJob1 = getJobExpiryInfo(job1, nowToday);
assert.strictEqual(expiryJob1.label, "Closes in 3 days");
assert.strictEqual(isJobApplyable(job1, nowToday), true);
console.log("✓ Test 9 Passed: Job 1 (Product Designer UX-first) fully verified.");

// 10. Verification of Confirmed Job 2 (Product Designer - UI-first)
const job2 = JOBS.find((j) => j.id === "pd-ui-first-2026");
assert(job2, "Job 2 must exist");
assert.strictEqual(job2.title, "Product Designer");
assert.strictEqual(job2.specialization, "UI-first designer");
assert.strictEqual(job2.domain, "FinTech B2B");
assert.strictEqual(job2.location, "Bangalore");
assert.strictEqual(job2.workMode, "Remote");
assert.strictEqual(job2.employmentType, undefined, "Employment type must not be fabricated");
assert.strictEqual(job2.closesAt, "2026-10-31", "Job 2 closes 5 days from 26 Oct (2026-10-31)");
assert.strictEqual(job2.applicationUrl, "https://tally.so/r/2EqzVg");
assert.strictEqual(getClarificationUrl(job2), null, "Unconfigured clarification channel must return null");
const expiryJob2 = getJobExpiryInfo(job2, nowToday);
assert.strictEqual(expiryJob2.label, "Closes in 5 days");
assert.strictEqual(isJobApplyable(job2, nowToday), true);
console.log("✓ Test 10 Passed: Job 2 (Product Designer UI-first) fully verified.");

// 11. Verification of Confirmed Job 3 (Creative & Motion Graphics Designer)
const job3 = JOBS.find((j) => j.id === "creative-motion-graphics-2026");
assert(job3, "Job 3 must exist");
assert.strictEqual(job3.title, "Creative & Motion Graphics Designer");
assert.strictEqual(job3.team, "Marketing & Experience Design");
assert.strictEqual(job3.seniority, "Entry level");
assert.strictEqual(job3.location, "Kochi");
assert.strictEqual(job3.workMode, "Hybrid");
assert.strictEqual(job3.employmentType, undefined, "Employment type must not be fabricated");
assert.strictEqual(job3.closesAt, "2026-10-29", "Job 3 closes 3 days from 26 Oct (2026-10-29)");
assert(job3.applicationUrl.startsWith("mailto:akshay.p@ideogfx.com"), "Must open mailto to akshay.p@ideogfx.com");
assert(job3.applicationUrl.includes("Application%20%E2%80%94%20Creative%20%26%20Motion%20Graphics%20Designer"), "Must include correctly encoded subject");
assert.strictEqual(getClarificationUrl(job3), null, "Unconfigured clarification channel must return null");
const expiryJob3 = getJobExpiryInfo(job3, nowToday);
assert.strictEqual(expiryJob3.label, "Closes in 3 days");
assert.strictEqual(isJobApplyable(job3, nowToday), true);
console.log("✓ Test 11 Passed: Job 3 (Creative & Motion Graphics Designer) email mailto verified.");

// 12. Public open jobs filter with the 3 confirmed roles
const activeJobs = getPublicOpenJobs(JOBS, nowToday);
assert.strictEqual(activeJobs.length, 3, "All 3 confirmed jobs should be active on 26 Oct");

// Check expiry in future: on 30 October 2026, Jobs 1 and 3 are closed, Job 2 remains open
const nowOct30 = new Date("2026-10-30T10:00:00.000+05:30");
const activeOnOct30 = getPublicOpenJobs(JOBS, nowOct30);
assert.strictEqual(activeOnOct30.length, 1, "Only Job 2 should remain open on Oct 30");
assert.strictEqual(activeOnOct30[0].id, "pd-ui-first-2026");

// On 1 November 2026, all jobs are expired
const nowNov1 = new Date("2026-11-01T00:00:01.000+05:30");
const activeOnNov1 = getPublicOpenJobs(JOBS, nowNov1);
assert.strictEqual(activeOnNov1.length, 0, "All jobs expired by Nov 1");
console.log("✓ Test 12 Passed: Lifecycle transitions over 3-day and 5-day deadlines verified.");

// 13. Experience formatting
assert.strictEqual(formatExperience(job1), "Experience: 2–3 years");
assert.strictEqual(formatExperience(job2), "Experience: 2–3 years");
assert.strictEqual(formatExperience(job3), "Experience: 0–2 years");
console.log("✓ Test 13 Passed: Experience labels correctly formatted for all 3 roles.");

console.log("\nALL 13 TESTS PASSED SUCCESSFULLY!");
