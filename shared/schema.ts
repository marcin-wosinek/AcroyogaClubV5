import { pgTable, text, integer, timestamp, boolean, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Users table schema for storing user account information
 * Represents club members, non-members, and administrators
 */
export const users = pgTable("users", {
  /** Unique identifier for the user */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Full name of the user as displayed in the system */
  fullName: text("full_name").notNull(),
  /** Email address used for login and communications */
  email: text("email").unique().notNull(),
  /** Hashed password for authentication */
  password: text("password").notNull(),
  /** Whether the user has an active club membership */
  isMember: boolean("is_member").default(false).notNull(),
  /** Whether the user has administrative privileges */
  isAdmin: boolean("is_admin").default(false).notNull(),
  /** Acroyoga roles the user can perform ['flyer', 'base'] */
  roles: text("roles").array(),
  /** Current status of the user account: 'active' | 'inactive' */
  status: text("status").default("active").notNull(),
  /** Experience level in acroyoga: 'less_than_year' | '1_to_3_years' | 'above_3_years' */
  experience: text("experience"),
  /** Whether the user wants to receive email notifications */
  mailingEnabled: boolean("mailing_enabled").default(true).notNull(),
  /** Timestamp when the user account was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Activities table schema for storing acroyoga sessions and workshops
 * Represents scheduled training sessions, workshops, and events
 */
export const activities = pgTable("activities", {
  /** Unique identifier for the activity */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Name/title of the activity session */
  title: text("title").notNull(),
  /** Name of the location where the activity takes place */
  locationName: text("location_name").notNull(),
  /** Full address of the location where the activity takes place */
  locationAddress: text("location_address").notNull(),
  /** Detailed description of the activity (HTML content supported) */
  description: text("description"),
  /** URL or path to the activity's promotional image */
  image: text("image"),
  /** Scheduled date and time for the activity */
  dateTime: timestamp("date_time").notNull(),
  /** Current number of registered participants */
  participantCount: integer("participant_count").default(0).notNull(),
  /** Maximum number of participants allowed */
  capacity: integer("capacity").notNull(),
  /** Price charged to non-members (members attend for free) */
  priceForNonMembers: decimal("price_for_non_members", { precision: 10, scale: 2 }),
  /** Timestamp when the activity was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Sign-ups table schema for tracking user registrations to activities
 * Links users to activities they want to attend
 */
export const signUps = pgTable("sign_ups", {
  /** Unique identifier for the sign-up */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Reference to the user who signed up */
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  /** Reference to the activity being signed up for */
  activityId: integer("activity_id")
    .references(() => activities.id)
    .notNull(),
  /** Reference to the payment transaction (if payment required) */
  transactionId: integer("transaction_id").references(() => transactions.id),
  /** Timestamp when the sign-up was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Transactions table schema for tracking payments
 * Handles both activity payments and membership fee payments
 */
export const transactions = pgTable("transactions", {
  /** Unique identifier for the transaction */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Reference to the user making the payment */
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  /** Reference to activity sign-up (if paying for activity) */
  signUpId: integer("sign_up_id").references(() => signUps.id),
  /** Reference to membership fee (if paying membership) */
  membershipFeeId: integer("membership_fee_id").references(() => membershipFees.id),
  /** External payment provider link (Stripe, etc.) */
  paymentProviderLink: text("payment_provider_link"),
  /** Amount to be paid in euros */
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  /** Payment status: 'pending' | 'completed' | 'failed' */
  status: text("status").default("pending").notNull(),
  /** Timestamp when the transaction was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Trimesters table schema for defining membership periods
 * Represents quarterly membership billing cycles
 */
export const trimesters = pgTable("trimesters", {
  /** Unique identifier for the trimester */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Name of the trimester (e.g., "Q1 2025", "Spring 2025") */
  name: text("name").notNull(),
  /** Standard membership fee for this trimester in euros */
  membershipFee: decimal("membership_fee", { precision: 10, scale: 2 }).default("45.00").notNull(),
  /** Timestamp when the trimester was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Membership fees table schema for tracking user membership payments
 * Links users to their quarterly membership obligations
 */
export const membershipFees = pgTable("membership_fees", {
  /** Unique identifier for the membership fee */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Reference to the user who owes the fee */
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  /** Reference to the trimester period */
  trimesterId: integer("trimester_id")
    .references(() => trimesters.id)
    .notNull(),
  /** Amount due for this membership period */
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
  /** Payment status: 'paid' | 'pending' | 'cancelled' */
  status: text("status").default("pending").notNull(),
  /** Timestamp when the membership fee was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Emails table schema for managing email campaigns
 * Stores email templates and campaign results
 */
export const emails = pgTable("emails", {
  /** Unique identifier for the email */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Email status: 'draft' | 'sent' */
  status: text("status").default("draft").notNull(),
  /** Subject line of the email */
  title: text("title").notNull(),
  /** Email content (HTML format supported) */
  body: text("body").notNull(),
  /** Target audience filter: 'members' | 'non-members' | 'pending_membership_fees' */
  filter: text("filter").notNull(),
  /** Array of specific user IDs to send to (overrides filter) */
  toUsers: json("to_users").$type<number[]>(),
  /** Timestamp when the email was sent */
  sentAt: timestamp("sent_at"),
  /** Results from the email service provider */
  sendingResults: json("sending_results"),
  /** Timestamp when the email was created */
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

// =============================================================================
// ADDITIONAL SCHEMAS FOR FRONTEND AND API USE
// =============================================================================

/**
 * User status enumeration
 * Defines possible states for user accounts
 */
export const UserStatusEnum = z.enum(["active", "inactive"]);
export type UserStatus = z.infer<typeof UserStatusEnum>;

/**
 * User experience level enumeration
 * Categorizes acroyoga experience levels
 */
export const ExperienceLevelEnum = z.enum(["less_than_year", "1_to_3_years", "above_3_years"]);
export type ExperienceLevel = z.infer<typeof ExperienceLevelEnum>;

/**
 * Acroyoga roles enumeration
 * Defines the roles users can perform in acroyoga
 */
export const AcroyogaRoleEnum = z.enum(["flyer", "base"]);
export type AcroyogaRole = z.infer<typeof AcroyogaRoleEnum>;

/**
 * Transaction status enumeration
 * Tracks payment processing states
 */
export const TransactionStatusEnum = z.enum(["pending", "completed", "failed"]);
export type TransactionStatus = z.infer<typeof TransactionStatusEnum>;

/**
 * Membership fee status enumeration
 * Tracks membership payment states
 */
export const MembershipFeeStatusEnum = z.enum(["paid", "pending", "cancelled"]);
export type MembershipFeeStatus = z.infer<typeof MembershipFeeStatusEnum>;

/**
 * Email status enumeration
 * Tracks email campaign states
 */
export const EmailStatusEnum = z.enum(["draft", "sent"]);
export type EmailStatus = z.infer<typeof EmailStatusEnum>;

/**
 * Email filter enumeration
 * Defines target audiences for email campaigns
 */
export const EmailFilterEnum = z.enum(["members", "non-members", "pending_membership_fees"]);
export type EmailFilter = z.infer<typeof EmailFilterEnum>;

/**
 * Login credentials schema
 * Used for user authentication
 */
export const LoginSchema = z.object({
  /** Email address for authentication */
  email: z.string().email("Please enter a valid email address"),
  /** Password for authentication */
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginCredentials = z.infer<typeof LoginSchema>;

/**
 * Registration schema
 * Used for new user registration with validation
 */
export const RegistrationSchema = z
  .object({
    /** Full name of the new user */
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    /** Email address for the account */
    email: z.string().email("Please enter a valid email address"),
    /** Password with strength requirements */
    password: z.string().min(8, "Password must be at least 8 characters"),
    /** Password confirmation for validation */
    confirmPassword: z.string(),
    /** Acroyoga experience level */
    experience: ExperienceLevelEnum.optional(),
    /** Roles the user can perform */
    roles: z.array(AcroyogaRoleEnum).optional(),
    /** Email notification preference */
    mailingEnabled: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegistrationData = z.infer<typeof RegistrationSchema>;

/**
 * Activity creation schema
 * Used for creating new activities with validation
 */
export const ActivityCreationSchema = z.object({
  /** Activity title/name */
  title: z.string().min(3, "Title must be at least 3 characters"),
  /** Location name */
  locationName: z.string().min(3, "Location name must be at least 3 characters"),
  /** Location address */
  locationAddress: z.string().min(5, "Location address must be at least 5 characters"),
  /** Detailed description */
  description: z.string().optional(),
  /** Activity date and time */
  dateTime: z.date(),
  /** Maximum participants allowed */
  capacity: z.number().min(1, "Capacity must be at least 1"),
  /** Price for non-members */
  priceForNonMembers: z.number().min(0, "Price cannot be negative").optional(),
  /** Activity image URL */
  image: z.string().url().optional(),
});
export type ActivityCreationData = z.infer<typeof ActivityCreationSchema>;

/**
 * Activity with participants schema
 * Extended activity data including participant information
 */
export const ActivityWithParticipantsSchema = z.object({
  /** Base activity data */
  id: z.number(),
  title: z.string(),
  locationName: z.string(),
  locationAddress: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  dateTime: z.date(),
  participantCount: z.number(),
  capacity: z.number(),
  priceForNonMembers: z.string().nullable(),
  createdAt: z.date(),
  /** List of signed-up participants */
  participants: z
    .array(
      z.object({
        id: z.number(),
        fullName: z.string(),
        email: z.string(),
        isMember: z.boolean(),
      }),
    )
    .optional(),
});
export type ActivityWithParticipants = z.infer<typeof ActivityWithParticipantsSchema>;

/**
 * User profile update schema
 * Used for updating user profile information
 */
export const UserProfileUpdateSchema = z.object({
  /** Updated full name */
  fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
  /** Updated experience level */
  experience: ExperienceLevelEnum.optional(),
  /** Updated acroyoga roles */
  roles: z.array(AcroyogaRoleEnum).optional(),
  /** Email notification preference */
  mailingEnabled: z.boolean().optional(),
});
export type UserProfileUpdate = z.infer<typeof UserProfileUpdateSchema>;

/**
 * API response wrapper schema
 * Standard format for API responses
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    /** Whether the request was successful */
    success: z.boolean(),
    /** Response data (present on success) */
    data: dataSchema.optional(),
    /** Error message (present on failure) */
    error: z.string().optional(),
    /** Additional error details for debugging */
    details: z.record(z.any()).optional(),
  });

/**
 * Pagination parameters schema
 * Used for paginated API requests
 */
export const PaginationSchema = z.object({
  /** Page number (1-based) */
  page: z.number().min(1).default(1),
  /** Number of items per page */
  limit: z.number().min(1).max(100).default(20),
  /** Optional search query */
  search: z.string().optional(),
  /** Optional sort field */
  sortBy: z.string().optional(),
  /** Sort direction */
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
export type PaginationParams = z.infer<typeof PaginationSchema>;

/**
 * Paginated response schema
 * Standard format for paginated API responses
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    /** Array of items for current page */
    items: z.array(itemSchema),
    /** Total number of items across all pages */
    total: z.number(),
    /** Current page number */
    page: z.number(),
    /** Number of items per page */
    limit: z.number(),
    /** Total number of pages */
    pages: z.number(),
    /** Whether there are more pages */
    hasNext: z.boolean(),
    /** Whether there are previous pages */
    hasPrev: z.boolean(),
  });

/**
 * Dashboard statistics schema
 * Summary data for admin dashboard
 */
export const DashboardStatsSchema = z.object({
  /** Total number of registered users */
  totalUsers: z.number(),
  /** Number of active members */
  activeMembers: z.number(),
  /** Number of upcoming activities */
  upcomingActivities: z.number(),
  /** Total revenue this month */
  monthlyRevenue: z.number(),
  /** Number of pending payments */
  pendingPayments: z.number(),
  /** Recent activity summary */
  recentSignUps: z.number(),
});
export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
