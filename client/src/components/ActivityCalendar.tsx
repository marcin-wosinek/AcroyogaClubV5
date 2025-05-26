import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { mockActivities } from "../mockData";
import type { Activity } from "../../../shared/schema";

interface ActivityCalendarProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  isDarkMode: boolean;
}

export function ActivityCalendar({ 
  date, 
  onDateChange, 
  isDarkMode
}: ActivityCalendarProps) {
  const formatDateString = (date: Date) => {
    // Ensure we're working with local date, not UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const datesWithActivities = mockActivities.map((activity: Activity) => activity.dateTime);

  const modifiers = {
    hasActivity: datesWithActivities,
  };

  const modifiersClassNames = {
    hasActivity: `relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full ${
      isDarkMode ? 'after:bg-white' : 'after:bg-black'
    }`,
  };

  return (
    <div className="w-full xl:w-80 xl:flex-shrink-0">
      <div className={`rounded-2xl p-4 lg:p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Calendar</h3>
          <Button
            size="sm"
            onClick={() => onDateChange(new Date())}
            className={`border-0 ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Today
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className={`w-full [&_.rdp-day_selected]:rounded-lg [&_.rdp-day_selected]:relative [&_.rdp-day_selected]:z-10 ${
            isDarkMode 
              ? '[&_.rdp-day_selected]:bg-white [&_.rdp-day_selected]:text-black [&_.rdp-day_selected]:shadow-[0_0_0_8px_rgb(17_24_39)]' 
              : '[&_.rdp-day_selected]:bg-black [&_.rdp-day_selected]:text-white [&_.rdp-day_selected]:shadow-[0_0_0_8px_rgb(249_250_251)]'
          }`}
        />
      </div>
    </div>
  );
}