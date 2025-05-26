import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, MapPin, Clock, Calendar as CalendarIcon, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "wouter";
import { mockActivities, formatTime } from "../mockData";
import { AddToCalendarModal } from "../components/AddToCalendarModal";
import type { Activity } from "../../../shared/schema";

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Find the activity by ID
  const activity = mockActivities.find(a => a.id === parseInt(id || '0'));

  // Detect system preference and set initial theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!activity) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">Activity Not Found</h1>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              The activity you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button className={`border-0 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}>
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-800 bg-gray-900' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <h1 className="text-3xl font-light tracking-wide">Acroyoga Club</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valencia, Spain</p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className={`transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>Activities</a>
              <a href="#" className={`transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>About</a>
              <a href="#" className={`transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>Contact</a>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button className={`border-0 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}>
                Login
              </Button>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className={`${
                  isDarkMode 
                    ? 'text-white hover:bg-gray-700' 
                    : 'text-black hover:bg-gray-200'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-gray-100 border-gray-300'
          }`}>
            <div className="px-4 py-4 space-y-4">
              <a href="#" className={`block transition-colors py-2 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>Activities</a>
              <a href="#" className={`block transition-colors py-2 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>About</a>
              <a href="#" className={`block transition-colors py-2 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>Contact</a>
              <div className="pt-2">
                <Button className={`w-full border-0 ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button 
                variant="ghost" 
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calendar
              </Button>
            </Link>
          </div>

          {/* Activity Details Card */}
          <Card className={`border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-black border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-black'
          }`}>
            <CardContent className="p-6 lg:p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-light mb-4">{activity.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge variant="secondary" className={`px-3 py-1 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
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

              {/* Activity Image */}
              {activity.image && (
                <div className="mb-8">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Activity Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">When</h3>
                    <div className={`space-y-3 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{activity.dateTime.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(activity.dateTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Where</h3>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex items-start space-x-3 mb-2">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <div>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activity.locationName}, ${activity.locationAddress}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:underline transition-colors ${
                              isDarkMode 
                                ? 'hover:text-white' 
                                : 'hover:text-black'
                            }`}
                          >
                            <div className="font-medium">{activity.locationName}</div>
                            <div className="text-xs opacity-75">{activity.locationAddress}</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Description</h3>
                  <div className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
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
                  className={`flex-1 h-10 border-0 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Join Activity
                </Button>
                <Button 
                  size="default"
                  onClick={() => setShowCalendarModal(true)}
                  className={`flex-1 h-10 border-0 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
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