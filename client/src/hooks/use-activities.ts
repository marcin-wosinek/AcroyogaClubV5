
import { useQuery } from "@tanstack/react-query";
import { mockActivities } from "../mockData";
import type { Activity } from "../../../shared/schema";

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return mock data with proper typing
      return mockActivities.map(activity => ({
        ...activity,
        priceForNonMembers: activity.priceForNonMembers || "0.00"
      }));
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
}

// Future implementation would replace the queryFn with:
// queryFn: async () => {
//   const response = await fetch("/api/activities", {
//     credentials: "include",
//   });
//   
//   if (!response.ok) {
//     throw new Error(`Failed to fetch activities: ${response.statusText}`);
//   }
//   
//   return response.json();
// },
