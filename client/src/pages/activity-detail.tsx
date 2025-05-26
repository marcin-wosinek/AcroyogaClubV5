import type { Activity } from "../../../shared/schema";
import { AddToCalendarModal } from "../components/AddToCalendarModal";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { mockActivities, formatTime } from "../mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, MapPin, Clock, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useParams, useLocation, Link } from "wouter";

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();
  const { isDarkMode } = useTheme();
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Find the activity by ID
  const activity = mockActivities.find((a) => a.id === parseInt(id || "0"));

  const handleJoinActivity = async () => {
    if (!isAuthenticated) {
      // Redirect to login page with redirect parameter back to this activity
      setLocation(`/login?redirect=/activity/${id}`);
      return;
    }

    if (!activity || !user) return;

    setIsJoining(true);

    try {
      // Simulate API call to create sign-up
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a mock sign-up object (in real app, this would be sent to backend)
      const signUp = {
        id: Date.now(), // Mock ID
        userId: user.id,
        activityId: activity.id,
        transactionId: null, // No payment required for members
        createdAt: new Date(),
      };

      console.log("Created sign-up:", signUp);

      setHasJoined(true);

      toast({
        title: "Successfully joined!",
        description: `You've signed up for ${activity.title}`,
      });
    } catch (error) {
      toast({
        title: "Error joining activity",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  if (!activity) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">Activity Not Found</h1>
            <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              The activity you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button
                className={`border-0 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calendar
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            className={`transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-black hover:bg-gray-200"
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Button>
        </Link>
      </div>

      {/* Activity Title */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-light mb-4">{activity.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Badge
            variant="secondary"
            className={`px-3 py-1 ${
              isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
            }`}
          >
            €{activity.priceForNonMembers}
          </Badge>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>
              {activity.participantCount}/{activity.capacity} participants
            </span>
          </div>
        </div>
      </div>

      {/* Date and Time */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="h-5 w-5 flex-shrink-0" />
          <span className="text-lg">
            {activity.dateTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 flex-shrink-0" />
          <span className="text-lg">{formatTime(activity.dateTime)}</span>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2 mb-6">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">{activity.locationName}</h3>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activity.locationAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm transition-colors hover:underline ${
                isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {activity.locationAddress}
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Description</h3>
          <div
            className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {activity.description ? (
              <p>{activity.description}</p>
            ) : (
              <p>Join us for an amazing acroyoga session! Perfect for all skill levels.</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="default"
          onClick={handleJoinActivity}
          disabled={isJoining || hasJoined}
          className={`flex-1 h-10 border-0 ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          } ${isJoining || hasJoined ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isJoining ? "Joining..." : hasJoined ? "Already Joined" : "Join Activity"}
        </Button>
        <Button
          size="default"
          onClick={() => setShowCalendarModal(true)}
          className={`flex-1 h-10 border-0 ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Add to Calendar
        </Button>
      </div>

      {/* Add to Calendar Modal */}
      <AddToCalendarModal
        activity={activity}
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        isDarkMode={isDarkMode}
      />
    </Layout>
  );
}
