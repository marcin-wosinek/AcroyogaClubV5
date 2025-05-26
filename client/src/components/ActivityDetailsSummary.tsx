import type { Activity } from "../../../shared/schema";
import { useTheme } from "../contexts/ThemeContext";
import { mockActivities, formatTime } from "../mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "wouter";

interface ActivityDetailsSummaryProps {
  date: Date | undefined;
}

export function ActivityDetailsSummary({ date }: ActivityDetailsSummaryProps) {
  const { isDarkMode } = useTheme();
  const formatDateString = (date: Date) => {
    // Ensure we're working with local date, not UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateString = date ? formatDateString(date) : formatDateString(new Date());
  const activitiesForSelectedDate = mockActivities.filter((activity: Activity) => {
    const activityDate = formatDateString(activity.dateTime);
    return activityDate === selectedDateString;
  });

  return (
    <div className="flex-1">
      <h3 className="text-xl lg:text-2xl font-light mb-4 lg:mb-6">
        {date ? `Activities for ${date.toLocaleDateString()}` : "Today's Activities"}
      </h3>
      <div className="space-y-4">
        {activitiesForSelectedDate.length > 0 ? (
          activitiesForSelectedDate.map((activity) => (
            <Card
              key={activity.id}
              className={`border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-black border-gray-700 hover:border-gray-600 text-white"
                  : "bg-white border-gray-200 hover:border-gray-400 text-black"
              }`}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-base lg:text-lg">{activity.title}</h4>
                  <Badge
                    variant="secondary"
                    className={`${
                      isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    €{activity.priceForNonMembers}
                  </Badge>
                </div>

                <div
                  className={`space-y-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(activity.dateTime)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4" />
                    <span>{activity.locationName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4" />
                    <span>
                      {activity.participantCount}/{activity.capacity}
                    </span>
                  </div>
                </div>

                <Link href={`/activity/${activity.id}`}>
                  <Button
                    className={`w-full mt-6 border-0 ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <div className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No activities scheduled for this date</p>
            </div>
            <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
              Select a highlighted date to view available activities
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
