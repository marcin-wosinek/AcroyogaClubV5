import { ActivityCalendar } from "../components/ActivityCalendar";
import { ActivityDetailsSummary } from "../components/ActivityDetailsSummary";
import { Header } from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";

export default function Home() {
  const [location, setLocation] = useLocation();
  const searchParams = useSearch();
  const { isDarkMode } = useTheme();

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

  // Update date when URL changes (for browser back/forward)
  useEffect(() => {
    const newDate = getInitialDate();
    setDate(newDate);
  }, [searchParams]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header />

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-6 lg:mb-8">
            Activity Calendar
          </h2>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Calendar */}
            <ActivityCalendar date={date} onDateChange={handleDateChange} />

            {/* Activity Details */}
            <ActivityDetailsSummary date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
