import type { Activity } from "../../../shared/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Download, ExternalLink } from "lucide-react";

interface AddToCalendarModalProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export function AddToCalendarModal({
  activity,
  isOpen,
  onClose,
  isDarkMode,
}: AddToCalendarModalProps) {
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const formatDateForICS = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const createGoogleCalendarUrl = () => {
    const startTime = formatDateForCalendar(activity.dateTime);
    const endTime = new Date(activity.dateTime.getTime() + 90 * 60 * 1000);
    const endTimeFormatted = formatDateForCalendar(endTime);

    // Add a link back to the activity page
    const activityUrl = `${window.location.origin}/activity/${activity.id}`;
    const details = `${activity.description || "Join us for an amazing acroyoga session! Perfect for all skill levels."}\n\nSee details: ${activityUrl}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: activity.title,
      dates: `${startTime}/${endTimeFormatted}`,
      location: `${activity.locationName}, ${activity.locationAddress}`,
      details,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const downloadICalFile = () => {
    const startTime = formatDateForICS(activity.dateTime);
    const endTime = new Date(activity.dateTime.getTime() + 90 * 60 * 1000);
    const endTimeFormatted = formatDateForICS(endTime);
    const activityUrl = `${window.location.origin}/activity/${activity.id}`;
    const description = `${activity.description || "Join us for an amazing acroyoga session! Perfect for all skill levels."}\n\nSee details: ${activityUrl}`;

    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Acroyoga Club Valencia//EN\nBEGIN:VEVENT\nUID:${activity.id}@acroyoga-club-valencia.com\nDTSTART:${startTime}\nDTEND:${endTimeFormatted}\nSUMMARY:${activity.title}\nDESCRIPTION:${description}\nLOCATION:${activity.locationName}, ${activity.locationAddress}\nSTATUS:CONFIRMED\nBEGIN:VALARM\nTRIGGER:-PT15M\nACTION:DISPLAY\nDESCRIPTION:Reminder: ${activity.title} starts in 15 minutes\nEND:VALARM\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activity.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onClose();
  };

  const openGoogleCalendar = () => {
    window.open(createGoogleCalendarUrl(), "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-md ${
          isDarkMode
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Add to Calendar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg border ${
              isDarkMode ? "bg-gray-800 border-gray-600" : "bg-gray-50 border-gray-200"
            }`}
          >
            <h4 className="font-medium mb-2">{activity.title}</h4>
            <div className={`space-y-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <p>
                {activity.dateTime.toLocaleDateString()} at{" "}
                {activity.dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p>
                {activity.locationName}, {activity.locationAddress}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={openGoogleCalendar}
              className={`w-full justify-start gap-3 border-0 ${
                isDarkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <ExternalLink className="h-4 w-4" />
              Add to Google Calendar
            </Button>

            <Button
              onClick={downloadICalFile}
              className={`w-full justify-start gap-3 border-0 ${
                isDarkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <Download className="h-4 w-4" />
              Download iCal file
            </Button>
          </div>

          <div
            className={`text-xs text-center pt-2 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
          >
            The iCal file works with Apple Calendar, Outlook, and other calendar apps
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
