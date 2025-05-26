import { pgTable, text, integer, timestamp, boolean, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: text("full_name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  isMember: boolean("is_member").default(false).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  roles: text("roles").array(), // ['flyer', 'base']
  status: text("status").default("active").notNull(), // 'active', 'inactive'
  experience: text("experience"), // 'less_than_year', '1_to_3_years', 'above_3_years'
  mailingEnabled: boolean("mailing_enabled").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  description: text("description"), // HTML content
  image: text("image"),
  dateTime: timestamp("date_time").notNull(),
  participantCount: integer("participant_count").default(0).notNull(),
  capacity: integer("capacity").notNull(),
  priceForNonMembers: decimal("price_for_non_members", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const signUps = pgTable("sign_ups", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  activityId: integer("activity_id").references(() => activities.id).notNull(),
  transactionId: integer("transaction_id").references(() => transactions.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  signUpId: integer("sign_up_id").references(() => signUps.id),
  membershipFeeId: integer("membership_fee_id").references(() => membershipFees.id),
  paymentProviderLink: text("payment_provider_link"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending").notNull(), // 'pending', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trimesters = pgTable("trimesters", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  membershipFee: decimal("membership_fee", { precision: 10, scale: 2 }).default("45.00").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const membershipFees = pgTable("membership_fees", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  trimesterId: integer("trimester_id").references(() => trimesters.id).notNull(),
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending").notNull(), // 'paid', 'pending', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emails = pgTable("emails", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  status: text("status").default("draft").notNull(), // 'draft', 'sent'
  title: text("title").notNull(),
  body: text("body").notNull(), // HTML content
  filter: text("filter").notNull(), // 'members', 'non-members', 'pending_membership_fees'
  toUsers: json("to_users").$type<number[]>(), // Array of user IDs
  sentAt: timestamp("sent_at"),
  sendingResults: json("sending_results"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  participantCount: true,
  createdAt: true,
});

export const insertSignUpSchema = createInsertSchema(signUps).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertTrimesterSchema = createInsertSchema(trimesters).omit({
  id: true,
  createdAt: true,
});

export const insertMembershipFeeSchema = createInsertSchema(membershipFees).omit({
  id: true,
  createdAt: true,
});

export const insertEmailSchema = createInsertSchema(emails).omit({
  id: true,
  createdAt: true,
  sentAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertSignUp = z.infer<typeof insertSignUpSchema>;
export type SignUp = typeof signUps.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertTrimester = z.infer<typeof insertTrimesterSchema>;
export type Trimester = typeof trimesters.$inferSelect;

export type InsertMembershipFee = z.infer<typeof insertMembershipFeeSchema>;
export type MembershipFee = typeof membershipFees.$inferSelect;

export type InsertEmail = z.infer<typeof insertEmailSchema>;
export type Email = typeof emails.$inferSelect;