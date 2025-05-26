/**
 * Mock data for the Acroyoga Club application
 * This data matches the schemas defined in shared/schema.ts
 */

export interface MockActivity {
  id: number;
  title: string;
  locationName: string;
  locationAddress: string;
  description: string | null;
  image: string | null;
  dateTime: Date;
  participantCount: number;
  capacity: number;
  priceForNonMembers: string | null;
  createdAt: Date;
}

/**
 * Mock activities for May and June 2025
 */
export const mockActivities: MockActivity[] = [
  {
    id: 1,
    title: "Morning Flow",
    locationName: "Malvarosa Beach",
    locationAddress: "Playa de la Malvarosa, 46011 Valencia, Spain",
    description: "Start your day with energizing acroyoga flows by the Mediterranean sea. Perfect for all levels.",
    image: null,
    dateTime: new Date("2025-05-03T09:00:00Z"),
    participantCount: 6,
    capacity: 10,
    priceForNonMembers: "12.00",
    createdAt: new Date("2025-04-15T10:00:00Z"),
  },
  {
    id: 2,
    title: "Evening Practice",
    locationName: "Turia Gardens",
    locationAddress: "Jardín del Turia, 46003 Valencia, Spain",
    description: "Wind down with gentle acroyoga practice in the beautiful Turia Gardens. Focus on trust and connection.",
    image: null,
    dateTime: new Date("2025-05-03T19:00:00Z"),
    participantCount: 14,
    capacity: 16,
    priceForNonMembers: "15.00",
    createdAt: new Date("2025-04-15T10:15:00Z"),
  },
  {
    id: 3,
    title: "Beginner Workshop",
    locationName: "City of Arts & Sciences",
    locationAddress: "Av. del Professor López Piñero, 7, 46013 Valencia, Spain",
    description: "Complete introduction to acroyoga for absolute beginners. Learn basic positions and safety techniques.",
    image: null,
    dateTime: new Date("2025-05-10T10:00:00Z"),
    participantCount: 8,
    capacity: 12,
    priceForNonMembers: "20.00",
    createdAt: new Date("2025-04-20T14:30:00Z"),
  },
  {
    id: 4,
    title: "Advanced Flow",
    locationName: "Malvarosa Beach",
    locationAddress: "Playa de la Malvarosa, 46011 Valencia, Spain",
    description: "Challenge yourself with advanced acroyoga sequences. Requires solid foundation in basic poses.",
    image: null,
    dateTime: new Date("2025-05-15T18:30:00Z"),
    participantCount: 4,
    capacity: 8,
    priceForNonMembers: "18.00",
    createdAt: new Date("2025-04-25T09:45:00Z"),
  },
  {
    id: 5,
    title: "Sunrise Session",
    locationName: "Turia Gardens",
    locationAddress: "Jardín del Turia, 46003 Valencia, Spain",
    description: "Early morning practice to greet the sun. Meditation, breathwork, and gentle acroyoga flows.",
    image: null,
    dateTime: new Date("2025-05-22T07:30:00Z"),
    participantCount: 10,
    capacity: 15,
    priceForNonMembers: "15.00",
    createdAt: new Date("2025-05-01T12:00:00Z"),
  },
  {
    id: 6,
    title: "Partner Acro",
    locationName: "Malvarosa Beach",
    locationAddress: "Playa de la Malvarosa, 46011 Valencia, Spain",
    description: "Focus on partner-based acroyoga techniques. Build trust and communication with your practice partner.",
    image: null,
    dateTime: new Date("2025-06-05T17:00:00Z"),
    participantCount: 12,
    capacity: 16,
    priceForNonMembers: "20.00",
    createdAt: new Date("2025-05-10T15:20:00Z"),
  },
  {
    id: 7,
    title: "Flow & Meditation",
    locationName: "Turia Gardens",
    locationAddress: "Jardín del Turia, 46003 Valencia, Spain",
    description: "Combine acroyoga with mindfulness meditation. Find balance between movement and stillness.",
    image: null,
    dateTime: new Date("2025-06-12T08:00:00Z"),
    participantCount: 8,
    capacity: 12,
    priceForNonMembers: "15.00",
    createdAt: new Date("2025-05-15T11:10:00Z"),
  },
  {
    id: 8,
    title: "Advanced Workshop",
    locationName: "City of Arts & Sciences",
    locationAddress: "Av. del Professor López Piñero, 7, 46013 Valencia, Spain",
    description: "Master advanced acroyoga techniques with expert instruction. Intensive 3-hour workshop.",
    image: null,
    dateTime: new Date("2025-06-18T16:00:00Z"),
    participantCount: 6,
    capacity: 10,
    priceForNonMembers: "25.00",
    createdAt: new Date("2025-05-20T13:30:00Z"),
  },
  {
    id: 9,
    title: "Therapeutic Acro",
    locationName: "Wellness Center Valencia",
    locationAddress: "Carrer de Xàtiva, 24, 46002 Valencia, Spain",
    description: "Gentle therapeutic acroyoga for injury recovery and stress relief. Suitable for all ages.",
    image: null,
    dateTime: new Date("2025-05-28T10:30:00Z"),
    participantCount: 7,
    capacity: 10,
    priceForNonMembers: "22.00",
    createdAt: new Date("2025-05-05T16:45:00Z"),
  },
  {
    id: 10,
    title: "Beach Sunset Flow",
    locationName: "Malvarosa Beach",
    locationAddress: "Playa de la Malvarosa, 46011 Valencia, Spain",
    description: "Practice acroyoga as the sun sets over the Mediterranean. Magical atmosphere guaranteed.",
    image: null,
    dateTime: new Date("2025-06-25T20:00:00Z"),
    participantCount: 15,
    capacity: 20,
    priceForNonMembers: "18.00",
    createdAt: new Date("2025-06-01T10:00:00Z"),
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