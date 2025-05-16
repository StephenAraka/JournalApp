import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submit = mutation({
  args: {
    title: v.string(),
    mood: v.string(),
    description: v.string(),
    date: v.string(),
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("journals", {
      title: args.title,
      mood: args.mood,
      description: args.description,
      createdAt: args.date,
      owner: args.owner,
    });
  },
});

export const get = query({
  args: {
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("journals")
      .filter((q) => q.eq(q.field("owner"), args.owner))
      .collect();
  },
});
