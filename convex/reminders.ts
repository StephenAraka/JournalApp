import { internal } from './_generated/api';
import { internalMutation, MutationCtx } from "./_generated/server";


export const sendJournalEmails = internalMutation({
  args: {},
  handler: async (ctx, args) => {

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const allJournals = (await ctx.db.query('journals').collect()).filter(
      (j) => new Date(j.createdAt) >= since
    );

    const senders = Array.from(new Set(allJournals.map(j => j.owner)));

    for (const email of senders) {
      // - Journals NOT authored by this user
      const otherJournals = allJournals.filter(j => j.owner !== email);

      if (otherJournals.length === 0) continue;

      await Promise.all(
        allJournals
          .filter(j => j.owner !== email)
          .map((j, idx) => sendReminderEmail(ctx, j, idx * 200)),
      );
    }
  },
});

async function sendReminderEmail(
  ctx: MutationCtx,
  journal: { title: string; mood: string; description: string; createdAt: string; owner: string },
  delay: number
) {
  await ctx.scheduler.runAfter(
    delay,
    internal.emails.reminder.sendReminderEmail,
    {
      email: journal.owner,
      title: journal.title,
      journals: [
        {
          title: journal.title,
          mood: journal.mood,
          description: journal.description,
          createdAt: journal.createdAt,
        },
      ],
    }
  )
}