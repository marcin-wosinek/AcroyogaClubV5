import { ActivityCalendar } from "../components/ActivityCalendar";
import { ActivityDetailsSummary } from "../components/ActivityDetailsSummary";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";

export default function Home() {
  const [location, setLocation] = useLocation();
  const searchParams = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const formatDateString = (date: Date) => {
    // Ensure we're working with local date, not UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Parse date from URL or default to today
  const getInitialDate = (): Date => {
    const params = new URLSearchParams(searchParams);
    const dateParam = params.get("date");

    if (dateParam) {
      const parsedDate = new Date(dateParam);
      // Check if the date is valid
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    return new Date();
  };

  const [date, setDate] = useState<Date | undefined>(getInitialDate);

  // Update URL when date changes (without adding to history)
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    if (newDate) {
      const dateString = formatDateString(newDate);
      const params = new URLSearchParams(searchParams);
      params.set("date", dateString);

      // Use replaceState to update URL without creating new history entry
      const newUrl = `${location}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  };

  // Detect system preference and set initial theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Update date when URL changes (for browser back/forward)
  useEffect(() => {
    const newDate = getInitialDate();
    setDate(newDate);
  }, [searchParams]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
              <Button
                className={`border-0 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Login
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${
                isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
            }`}
          >
            <div className="px-4 py-4 space-y-4">
              <a
                href="#"
                className={`block transition-colors py-2 ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Activities
              </a>
              <a
                href="#"
                className={`block transition-colors py-2 ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                About
              </a>
              <a
                href="#"
                className={`block transition-colors py-2 ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Contact
              </a>
              <div className="flex items-center justify-between pt-2">
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
                  className={`flex-1 ml-4 border-0 ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
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
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-6 lg:mb-8">
            Activity Calendar
          </h2>

          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* Calendar Component */}
            <ActivityCalendar
              date={date}
              onDateChange={handleDateChange}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
            />

            {/* Activity Details Component */}
            <ActivityDetailsSummary date={date} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
