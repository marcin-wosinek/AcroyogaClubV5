/**
 * Mock data for development and testing
 * Matches the schemas defined in shared/schema.ts
 */

import type { 
  User, 
  Activity, 
  SignUp, 
  Transaction, 
  Trimester, 
  MembershipFee, 
  Email 
} from './schema';

/**
 * Mock users representing different user types in the system
 */
export const mockUsers: User[] = [
  {
    id: 1,
    fullName: "Maria Rodriguez",
    email: "maria.admin@acroyogavalencia.com",
    password: "$2b$10$hashedpassword1", // hashed "password123"
    isMember: true,
    isAdmin: true,
    roles: ["flyer", "base"],
    status: "active",
    experience: "above_3_years",
    mailingEnabled: true,
    createdAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: 2,
    fullName: "Carlos Martinez",
    email: "carlos.member@email.com",
    password: "$2b$10$hashedpassword2", // hashed "password123"
    isMember: true,
    isAdmin: false,
    roles: ["base"],
    status: "active",
    experience: "1_to_3_years",
    mailingEnabled: true,
    createdAt: new Date("2024-03-20T14:30:00Z"),
  },
  {
    id: 3,
    fullName: "Ana Garcia",
    email: "ana.nonmember@email.com",
    password: "$2b$10$hashedpassword3", // hashed "password123"
    isMember: false,
    isAdmin: false,
    roles: ["flyer"],
    status: "active",
    experience: "less_than_year",
    mailingEnabled: true,
    createdAt: new Date("2024-12-01T09:15:00Z"),
  },
  {
    id: 4,
    fullName: "David Lopez",
    email: "david.member@email.com",
    password: "$2b$10$hashedpassword4", // hashed "password123"
    isMember: true,
    isAdmin: false,
    roles: ["flyer", "base"],
    status: "active",
    experience: "1_to_3_years",
    mailingEnabled: false,
    createdAt: new Date("2024-05-10T16:45:00Z"),
  },
  {
    id: 5,
    fullName: "Sofia Fernandez",
    email: "sofia.inactive@email.com",
    password: "$2b$10$hashedpassword5", // hashed "password123"
    isMember: false,
    isAdmin: false,
    roles: null,
    status: "inactive",
    experience: "less_than_year",
    mailingEnabled: false,
    createdAt: new Date("2024-08-05T11:20:00Z"),
  },
];

/**
 * Mock activities for May and June 2025
 */
export const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Morning Flow",
    location: "Malvarosa Beach",
    description: "Start your day with energizing acroyoga flows by the Mediterranean sea. Perfect for all levels.",
    image: "/images/morning-flow.jpg",
    dateTime: new Date("2025-05-03T09:00:00Z"),
    participantCount: 6,
    capacity: 10,
    priceForNonMembers: "12.00",
    createdAt: new Date("2025-04-15T10:00:00Z"),
  },
  {
    id: 2,
    title: "Evening Practice",
    location: "Turia Gardens",
    description: "Wind down with gentle acroyoga practice in the beautiful Turia Gardens. Focus on trust and connection.",
    image: "/images/evening-practice.jpg",
    dateTime: new Date("2025-05-03T19:00:00Z"),
    participantCount: 14,
    capacity: 16,
    priceForNonMembers: "15.00",
    createdAt: new Date("2025-04-15T10:15:00Z"),
  },
  {
    id: 3,
    title: "Beginner Workshop",
    location: "City of Arts & Sciences",
    description: "Complete introduction to acroyoga for absolute beginners. Learn basic positions and safety techniques.",
    image: "/images/beginner-workshop.jpg",
    dateTime: new Date("2025-05-10T10:00:00Z"),
    participantCount: 8,
    capacity: 12,
    priceForNonMembers: "20.00",
    createdAt: new Date("2025-04-20T14:30:00Z"),
  },
  {
    id: 4,
    title: "Advanced Flow",
    location: "Malvarosa Beach",
    description: "Challenge yourself with advanced acroyoga sequences. Requires solid foundation in basic poses.",
    image: "/images/advanced-flow.jpg",
    dateTime: new Date("2025-05-15T18:30:00Z"),
    participantCount: 4,
    capacity: 8,
    priceForNonMembers: "18.00",
    createdAt: new Date("2025-04-25T09:45:00Z"),
  },
  {
    id: 5,
    title: "Sunrise Session",
    location: "Turia Gardens",
    description: "Early morning practice to greet the sun. Meditation, breathwork, and gentle acroyoga flows.",
    image: "/images/sunrise-session.jpg",
    dateTime: new Date("2025-05-22T07:30:00Z"),
    participantCount: 10,
    capacity: 15,
    priceForNonMembers: "15.00",
    createdAt: new Date("2025-05-01T12:00:00Z"),
  },
  {
    id: 6,
    title: "Partner Acro",
    location: "Malvarosa Beach",
    description: "Focus on partner-based acroyoga techniques. Build trust and communication with your practice partner.",
    image: "/images/partner-acro.jpg",
    dateTime: new Date("2025-06-05T17:00:00Z"),
    participantCount: 12,
    capacity: 16,
    priceForNonMembers: "20.00",
    createdAt: new Date("2025-05-10T15:20:00Z"),
  },
  {
    id: 7,
    title: "Flow & Meditation",
    location: "Turia Gardens",
    description: "Combine acroyoga with mindfulness meditation. Find balance between movement and stillness.",
    image: "/images/flow-meditation.jpg",
    dateTime: new Date("2025-06-12T08:00:00Z"),
    participantCount: 8,
    capacity: 12,
    priceForNonMembers: "15.00",
    createdAt: new Date("2025-05-15T11:10:00Z"),
  },
  {
    id: 8,
    title: "Advanced Workshop",
    location: "City of Arts & Sciences",
    description: "Master advanced acroyoga techniques with expert instruction. Intensive 3-hour workshop.",
    image: "/images/advanced-workshop.jpg",
    dateTime: new Date("2025-06-18T16:00:00Z"),
    participantCount: 6,
    capacity: 10,
    priceForNonMembers: "25.00",
    createdAt: new Date("2025-05-20T13:30:00Z"),
  },
  {
    id: 9,
    title: "Therapeutic Acro",
    location: "Wellness Center Valencia",
    description: "Gentle therapeutic acroyoga for injury recovery and stress relief. Suitable for all ages.",
    image: "/images/therapeutic-acro.jpg",
    dateTime: new Date("2025-05-28T10:30:00Z"),
    participantCount: 7,
    capacity: 10,
    priceForNonMembers: "22.00",
    createdAt: new Date("2025-05-05T16:45:00Z"),
  },
  {
    id: 10,
    title: "Beach Sunset Flow",
    location: "Malvarosa Beach",
    description: "Practice acroyoga as the sun sets over the Mediterranean. Magical atmosphere guaranteed.",
    image: "/images/sunset-flow.jpg",
    dateTime: new Date("2025-06-25T20:00:00Z"),
    participantCount: 15,
    capacity: 20,
    priceForNonMembers: "18.00",
    createdAt: new Date("2025-06-01T10:00:00Z"),
  },
];

/**
 * Mock trimesters for 2025
 */
export const mockTrimesters: Trimester[] = [
  {
    id: 1,
    name: "Q1 2025",
    membershipFee: "45.00",
    createdAt: new Date("2024-12-01T00:00:00Z"),
  },
  {
    id: 2,
    name: "Q2 2025",
    membershipFee: "45.00",
    createdAt: new Date("2025-03-01T00:00:00Z"),
  },
  {
    id: 3,
    name: "Q3 2025",
    membershipFee: "45.00",
    createdAt: new Date("2025-06-01T00:00:00Z"),
  },
];

/**
 * Mock membership fees including pending payment for member
 */
export const mockMembershipFees: MembershipFee[] = [
  {
    id: 1,
    userId: 2, // Carlos Martinez (member)
    trimesterId: 1,
    fee: "45.00",
    status: "paid",
    createdAt: new Date("2025-01-05T10:00:00Z"),
  },
  {
    id: 2,
    userId: 2, // Carlos Martinez (member) - pending payment
    trimesterId: 2,
    fee: "45.00",
    status: "pending",
    createdAt: new Date("2025-04-01T10:00:00Z"),
  },
  {
    id: 3,
    userId: 4, // David Lopez (member)
    trimesterId: 1,
    fee: "45.00",
    status: "paid",
    createdAt: new Date("2025-01-10T14:30:00Z"),
  },
  {
    id: 4,
    userId: 4, // David Lopez (member)
    trimesterId: 2,
    fee: "45.00",
    status: "paid",
    createdAt: new Date("2025-04-05T09:15:00Z"),
  },
];

/**
 * Mock sign-ups linking users to activities
 */
export const mockSignUps: SignUp[] = [
  {
    id: 1,
    userId: 1, // Maria (admin)
    activityId: 1, // Morning Flow
    transactionId: null, // Member, no payment required
    createdAt: new Date("2025-04-20T10:30:00Z"),
  },
  {
    id: 2,
    userId: 2, // Carlos (member)
    activityId: 1, // Morning Flow
    transactionId: null, // Member, no payment required
    createdAt: new Date("2025-04-21T14:15:00Z"),
  },
  {
    id: 3,
    userId: 3, // Ana (non-member)
    activityId: 2, // Evening Practice
    transactionId: 1, // Non-member, payment required
    createdAt: new Date("2025-04-22T16:45:00Z"),
  },
  {
    id: 4,
    userId: 4, // David (member)
    activityId: 3, // Beginner Workshop
    transactionId: null, // Member, no payment required
    createdAt: new Date("2025-04-25T11:20:00Z"),
  },
  {
    id: 5,
    userId: 1, // Maria (admin)
    activityId: 6, // Partner Acro
    transactionId: null, // Member, no payment required
    createdAt: new Date("2025-05-15T13:00:00Z"),
  },
];

/**
 * Mock transactions for payments
 */
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    userId: 3, // Ana (non-member)
    signUpId: 3, // Evening Practice sign-up
    membershipFeeId: null,
    paymentProviderLink: "https://stripe.com/payments/pi_example123",
    amount: "15.00",
    status: "completed",
    createdAt: new Date("2025-04-22T16:50:00Z"),
  },
  {
    id: 2,
    userId: 2, // Carlos (member) - membership fee payment
    signUpId: null,
    membershipFeeId: 2, // Q2 2025 membership fee
    paymentProviderLink: "https://stripe.com/payments/pi_example456",
    amount: "45.00",
    status: "pending",
    createdAt: new Date("2025-04-01T10:05:00Z"),
  },
  {
    id: 3,
    userId: 4, // David (member) - membership fee payment
    signUpId: null,
    membershipFeeId: 4, // Q2 2025 membership fee
    paymentProviderLink: "https://stripe.com/payments/pi_example789",
    amount: "45.00",
    status: "completed",
    createdAt: new Date("2025-04-05T09:20:00Z"),
  },
];

/**
 * Mock emails for campaign management
 */
export const mockEmails: Email[] = [
  {
    id: 1,
    status: "sent",
    title: "Welcome to Acroyoga Club Valencia!",
    body: "<h1>Welcome!</h1><p>We're excited to have you join our acroyoga community...</p>",
    filter: "members",
    toUsers: null,
    sentAt: new Date("2025-04-15T12:00:00Z"),
    sendingResults: { sent: 25, failed: 0 },
    createdAt: new Date("2025-04-15T11:30:00Z"),
  },
  {
    id: 2,
    status: "draft",
    title: "Upcoming Beach Sessions",
    body: "<h1>Beach Sessions This Summer</h1><p>Join us for beautiful beach practice sessions...</p>",
    filter: "non-members",
    toUsers: null,
    sentAt: null,
    sendingResults: null,
    createdAt: new Date("2025-05-01T14:20:00Z"),
  },
  {
    id: 3,
    status: "sent",
    title: "Membership Fee Reminder",
    body: "<h1>Quarterly Membership Fee Due</h1><p>This is a friendly reminder that your Q2 2025 membership fee is due...</p>",
    filter: "pending_membership_fees",
    toUsers: [2], // Carlos Martinez
    sentAt: new Date("2025-04-10T09:00:00Z"),
    sendingResults: { sent: 1, failed: 0 },
    createdAt: new Date("2025-04-10T08:30:00Z"),
  },
];

/**
 * Helper function to get activities for a specific date
 */
export function getActivitiesForDate(date: Date): Activity[] {
  const targetDate = date.toISOString().split('T')[0];
  return mockActivities.filter(activity => {
    const activityDate = activity.dateTime.toISOString().split('T')[0];
    return activityDate === targetDate;
  });
}

/**
 * Helper function to get user by ID
 */
export function getUserById(id: number): User | undefined {
  return mockUsers.find(user => user.id === id);
}

/**
 * Helper function to get activities with participant counts
 */
export function getActivitiesWithParticipants() {
  return mockActivities.map(activity => ({
    ...activity,
    signUps: mockSignUps.filter(signUp => signUp.activityId === activity.id),
    participants: mockSignUps
      .filter(signUp => signUp.activityId === activity.id)
      .map(signUp => mockUsers.find(user => user.id === signUp.userId))
      .filter(Boolean)
  }));
}

/**
 * Helper function to get pending membership fees
 */
export function getPendingMembershipFees(): (MembershipFee & { user: User; trimester: Trimester })[] {
  return mockMembershipFees
    .filter(fee => fee.status === "pending")
    .map(fee => ({
      ...fee,
      user: mockUsers.find(user => user.id === fee.userId)!,
      trimester: mockTrimesters.find(trimester => trimester.id === fee.trimesterId)!,
    }));
}