import type { Activity } from "../../../shared/schema";
import { AddToCalendarModal } from "../components/AddToCalendarModal";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { mockActivities, formatTime } from "../mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useParams, useLocation, Link } from "wouter";

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  // Find the activity by ID
  const activity = mockActivities.find((a) => a.id === parseInt(id || "0"));

  const handleJoinActivity = async () => {
    if (!isAuthenticated) {
      // Redirect to login page
      setLocation("/login");
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
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-center min-h-screen">
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
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b transition-colors duration-300 ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <h1 className="text-3xl font-light tracking-wide">Acroyoga Club</h1>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Valencia, Spain
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className={`transition-colors ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Activities
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                About
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Contact
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user?.fullName}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className={`${
                      isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    className={`border-0 ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            } shadow-xl`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div
                className={`flex items-center justify-between p-4 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h2 className="text-lg font-medium">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-black hover:bg-gray-200"
                  }`}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-4 py-6">
                <nav className="space-y-6">
                  <Link href="/">
                    <a
                      className={`block text-lg transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Activities
                    </a>
                  </Link>
                  <a
                    href="#"
                    className={`block text-lg transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className={`block text-lg transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </nav>
              </div>

              {/* Authentication Section */}
              <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 py-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">{user?.fullName}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start ${
                        isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-700"
                          : "text-gray-600 hover:text-black hover:bg-gray-200"
                      }`}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button
                      className={`w-full border-0 ${
                        isDarkMode
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
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

          {/* Activity Details Card */}
          <Card
            className={`border transition-colors duration-300 ${
              isDarkMode
                ? "bg-black border-gray-700 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
          >
            <CardContent className="p-6 lg:p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
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
                        isDarkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
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
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add to Calendar Modal */}
      <AddToCalendarModal
        activity={activity}
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
