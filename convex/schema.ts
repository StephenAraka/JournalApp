import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  journals: defineTable({
    title: v.string(),
    mood: v.string(),
    description: v.string(),
    createdAt: v.string(),
    owner: v.string(),
  }),
});
