/**
 * Mock data for the Acroyoga Club application
 * This data matches the schemas defined in shared/schema.ts
 */

export interface MockActivity {
  id: number;
  title: string;
  location: string;
  description: string | null;
  dateTime: Date;
  participantCount: number;
  capacity: number;
  priceForNonMembers: string;
}

/**
 * Mock activities for May and June 2025
 */
export const mockActivities: MockActivity[] = [
  {
    id: 1,
    title: "Morning Flow",
    location: "Malvarosa Beach",
    description: "Start your day with energizing acroyoga flows by the Mediterranean sea. Perfect for all levels.",
    dateTime: new Date("2025-05-03T09:00:00Z"),
    participantCount: 6,
    capacity: 10,
    priceForNonMembers: "12.00",
  },
  {
    id: 2,
    title: "Evening Practice",
    location: "Turia Gardens",
    description: "Wind down with gentle acroyoga practice in the beautiful Turia Gardens. Focus on trust and connection.",
    dateTime: new Date("2025-05-03T19:00:00Z"),
    participantCount: 14,
    capacity: 16,
    priceForNonMembers: "15.00",
  },
  {
    id: 3,
    title: "Beginner Workshop",
    location: "City of Arts & Sciences",
    description: "Complete introduction to acroyoga for absolute beginners. Learn basic positions and safety techniques.",
    dateTime: new Date("2025-05-10T10:00:00Z"),
    participantCount: 8,
    capacity: 12,
    priceForNonMembers: "20.00",
  },
  {
    id: 4,
    title: "Advanced Flow",
    location: "Malvarosa Beach",
    description: "Challenge yourself with advanced acroyoga sequences. Requires solid foundation in basic poses.",
    dateTime: new Date("2025-05-15T18:30:00Z"),
    participantCount: 4,
    capacity: 8,
    priceForNonMembers: "18.00",
  },
  {
    id: 5,
    title: "Sunrise Session",
    location: "Turia Gardens",
    description: "Early morning practice to greet the sun. Meditation, breathwork, and gentle acroyoga flows.",
    dateTime: new Date("2025-05-22T07:30:00Z"),
    participantCount: 10,
    capacity: 15,
    priceForNonMembers: "15.00",
  },
  {
    id: 6,
    title: "Partner Acro",
    location: "Malvarosa Beach",
    description: "Focus on partner-based acroyoga techniques. Build trust and communication with your practice partner.",
    dateTime: new Date("2025-06-05T17:00:00Z"),
    participantCount: 12,
    capacity: 16,
    priceForNonMembers: "20.00",
  },
  {
    id: 7,
    title: "Flow & Meditation",
    location: "Turia Gardens",
    description: "Combine acroyoga with mindfulness meditation. Find balance between movement and stillness.",
    dateTime: new Date("2025-06-12T08:00:00Z"),
    participantCount: 8,
    capacity: 12,
    priceForNonMembers: "15.00",
  },
  {
    id: 8,
    title: "Advanced Workshop",
    location: "City of Arts & Sciences",
    description: "Master advanced acroyoga techniques with expert instruction. Intensive 3-hour workshop.",
    dateTime: new Date("2025-06-18T16:00:00Z"),
    participantCount: 6,
    capacity: 10,
    priceForNonMembers: "25.00",
  },
  {
    id: 9,
    title: "Therapeutic Acro",
    location: "Wellness Center Valencia",
    description: "Gentle therapeutic acroyoga for injury recovery and stress relief. Suitable for all ages.",
    dateTime: new Date("2025-05-28T10:30:00Z"),
    participantCount: 7,
    capacity: 10,
    priceForNonMembers: "22.00",
  },
  {
    id: 10,
    title: "Beach Sunset Flow",
    location: "Malvarosa Beach",
    description: "Practice acroyoga as the sun sets over the Mediterranean. Magical atmosphere guaranteed.",
    dateTime: new Date("2025-06-25T20:00:00Z"),
    participantCount: 15,
    capacity: 20,
    priceForNonMembers: "18.00",
  },
];

/**
 * Helper function to format time from Date object
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}