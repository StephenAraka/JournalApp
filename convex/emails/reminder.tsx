import { v } from "convex/values";
import { Resend } from "resend";
import { internalAction } from "../_generated/server";

export const sendReminderEmail = internalAction({
  args: {
    email: v.string(),
    title: v.string(),
    journals: v.array(v.object({
      title: v.string(),
      mood: v.string(),
      description: v.string(),
      createdAt: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const resend = new Resend(resendApiKey);

    const content = args.journals.map(j => {
      return `Mood: ${j.mood}\nTitle: ${j.title}\nDescription: ${j.description}\nDate: ${new Date(j.createdAt).toLocaleString()}`;
    }).join("\n\n---\n\n");

    const htmlContent = `
        <div style="font-family: sans-serif; font-size: 14px;">
          <p>Here’s what others shared in the last 24 hours:</p>
          ${content}
          <p style="margin-top: 20px;">Stay consistent and keep journaling!</p>
        </div>
      `;

    const { error } = await resend.emails.send({
      from: `${fromEmail}`,
      to: args.email,
      subject: "Your Daily Journal Digest",
      html: htmlContent,
    })

    if (error) {
      console.error(`Failed to send email to ${args.email}:`, error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
})