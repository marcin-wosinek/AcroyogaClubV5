import { ActivityCalendar } from "../components/ActivityCalendar";
import { ActivityDetailsSummary } from "../components/ActivityDetailsSummary";
import { Layout } from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import { formatDateString } from "../lib/utils";
import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";

export default function Home() {
  const [location, setLocation] = useLocation();
  const searchParams = useSearch();
  const { isDarkMode } = useTheme();

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
    <Layout title="Activity Calendar">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Calendar */}
        <ActivityCalendar date={date} onDateChange={handleDateChange} />

        {/* Activity Details */}
        <ActivityDetailsSummary date={date} />
      </div>
    </Layout>
  );
}
