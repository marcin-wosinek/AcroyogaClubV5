
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Menu, X, Calendar as CalendarIcon, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { mockActivities, formatTime, type MockActivity } from "../mockData";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  // Using properly structured mock data from shared schema

  const formatDateString = (date: Date) => {
    // Ensure we're working with local date, not UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const selectedDateString = date ? formatDateString(date) : formatDateString(new Date());
  const activitiesForSelectedDate = mockActivities.filter((activity: MockActivity) => {
    const activityDate = formatDateString(activity.dateTime);
    return activityDate === selectedDateString;
  });

  const datesWithActivities = mockActivities.map((activity: MockActivity) => activity.dateTime);

  const modifiers = {
    hasActivity: datesWithActivities,
  };

  const modifiersClassNames = {
    hasActivity: `relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full ${
      isDarkMode ? 'after:bg-white' : 'after:bg-black'
    }`,
  };

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
            <Button 
              variant="ghost" 
              size="icon"
              className={`md:hidden ${
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
              <div className="flex items-center justify-between pt-2">
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
                <Button className={`flex-1 ml-4 border-0 ${
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-3xl lg:text-4xl font-light text-center flex-1">Activity Calendar</h2>
            <Button
              size="sm"
              onClick={() => setDate(new Date())}
              className={`ml-4 border-0 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Today
            </Button>
          </div>
          
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* Calendar */}
            <div className={`flex-1 rounded-2xl p-4 lg:p-8 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className={`w-full [&_.rdp-day_selected]:rounded-lg [&_.rdp-day_selected]:relative [&_.rdp-day_selected]:z-10 ${
                  isDarkMode 
                    ? '[&_.rdp-day_selected]:bg-white [&_.rdp-day_selected]:text-black [&_.rdp-day_selected]:shadow-[0_0_0_8px_rgb(17_24_39)]' 
                    : '[&_.rdp-day_selected]:bg-black [&_.rdp-day_selected]:text-white [&_.rdp-day_selected]:shadow-[0_0_0_8px_rgb(249_250_251)]'
                }`}
              />
            </div>

            {/* Activities Section */}
            <div className="w-full xl:w-96 xl:flex-shrink-0">
              <h3 className="text-xl lg:text-2xl font-light mb-4 lg:mb-6">
                {date ? `Activities for ${date.toLocaleDateString()}` : "Today's Activities"}
              </h3>
              <div className="space-y-4">
                {activitiesForSelectedDate.length > 0 ? (
                  activitiesForSelectedDate.map((activity) => (
                    <Card key={activity.id} className={`border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-black border-gray-700 hover:border-gray-600 text-white' 
                        : 'bg-white border-gray-200 hover:border-gray-400 text-black'
                    }`}>
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-base lg:text-lg">{activity.title}</h4>
                          <Badge variant="secondary" className={`${
                            isDarkMode 
                              ? 'bg-gray-800 text-gray-300' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            €{activity.priceForNonMembers}
                          </Badge>
                        </div>
                        
                        <div className={`space-y-3 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(activity.dateTime)}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-4 w-4" />
                            <span>{activity.location}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Users className="h-4 w-4" />
                            <span>{activity.participantCount}/{activity.capacity}</span>
                          </div>
                        </div>
                        
                        <Button className={`w-full mt-6 border-0 ${
                          isDarkMode 
                            ? 'bg-white text-black hover:bg-gray-200' 
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}>
                          Join Activity
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className={`mb-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No activities scheduled for this date</p>
                    </div>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      Select a highlighted date to view available activities
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
