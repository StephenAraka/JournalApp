import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "send journal emails",
  { hourUTC: 9, minuteUTC: 0 }, // Every day at 12 pm East Africa Time
  internal.reminders.sendJournalEmails,
);

export default crons;