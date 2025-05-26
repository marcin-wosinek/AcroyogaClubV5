
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Menu, X, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allActivities = [
    {
      id: 1,
      title: "Morning Flow",
      date: "2025-05-03",
      time: "09:00",
      location: "Malvarosa Beach",
      participants: 6,
      capacity: 10,
      price: 12
    },
    {
      id: 2,
      title: "Evening Practice",
      date: "2025-05-03",
      time: "19:00",
      location: "Turia Gardens",
      participants: 14,
      capacity: 16,
      price: 15
    },
    {
      id: 3,
      title: "Beginner Workshop",
      date: "2025-05-10",
      time: "10:00",
      location: "City of Arts & Sciences",
      participants: 8,
      capacity: 12,
      price: 20
    },
    {
      id: 4,
      title: "Advanced Flow",
      date: "2025-05-15",
      time: "18:30",
      location: "Malvarosa Beach",
      participants: 4,
      capacity: 8,
      price: 18
    },
    {
      id: 5,
      title: "Sunrise Session",
      date: "2025-05-22",
      time: "07:30",
      location: "Turia Gardens",
      participants: 10,
      capacity: 15,
      price: 15
    },
    {
      id: 6,
      title: "Partner Acro",
      date: "2025-06-05",
      time: "17:00",
      location: "Malvarosa Beach",
      participants: 12,
      capacity: 16,
      price: 20
    },
    {
      id: 7,
      title: "Flow & Meditation",
      date: "2025-06-12",
      time: "08:00",
      location: "Turia Gardens",
      participants: 8,
      capacity: 12,
      price: 15
    },
    {
      id: 8,
      title: "Advanced Workshop",
      date: "2025-06-18",
      time: "16:00",
      location: "City of Arts & Sciences",
      participants: 6,
      capacity: 10,
      price: 25
    }
  ];

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateString = date ? formatDateString(date) : formatDateString(new Date());
  const activitiesForSelectedDate = allActivities.filter(activity => activity.date === selectedDateString);

  const datesWithActivities = allActivities.map(activity => new Date(activity.date));

  const modifiers = {
    hasActivity: datesWithActivities,
  };

  const modifiersClassNames = {
    hasActivity: 'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-white after:rounded-full',
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <h1 className="text-3xl font-light tracking-wide">Acroyoga Club</h1>
              <p className="text-gray-400 text-sm">Valencia, Spain</p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Activities</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <Button className="bg-white text-black hover:bg-gray-200 border-0">
                Login
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-white hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Activities</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">About</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Contact</a>
              <Button className="w-full bg-white text-black hover:bg-gray-200 border-0">
                Login
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Calendar Section */}
        <div className="flex-1 p-4 lg:p-8 lg:border-r border-gray-800">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="text-3xl lg:text-4xl font-light text-center flex-1">Activity Calendar</h2>
              <Button
                size="sm"
                onClick={() => setDate(new Date())}
                className="ml-4 bg-white text-black hover:bg-gray-200 border-0"
              >
                Today
              </Button>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 lg:p-8">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className="w-full [&_.rdp-day_selected]:bg-white [&_.rdp-day_selected]:text-black [&_.rdp-day_selected]:rounded-lg [&_.rdp-day_selected]:before:content-[''] [&_.rdp-day_selected]:before:absolute [&_.rdp-day_selected]:before:inset-0 [&_.rdp-day_selected]:before:bg-white [&_.rdp-day_selected]:before:opacity-20 [&_.rdp-day_selected]:before:rounded-lg [&_.rdp-day_selected]:before:-z-10"
              />
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div className="w-full lg:w-96 p-4 lg:p-8 bg-gray-900">
          <h3 className="text-xl lg:text-2xl font-light mb-4 lg:mb-6">
            {date ? `Activities for ${date.toLocaleDateString()}` : "Today's Activities"}
          </h3>
          <div className="space-y-4">
            {activitiesForSelectedDate.length > 0 ? (
              activitiesForSelectedDate.map((activity) => (
                <Card key={activity.id} className="bg-black border-gray-700 hover:border-gray-600 transition-colors">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-base lg:text-lg">{activity.title}</h4>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        €{activity.price}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="h-4 w-4" />
                        <span>{activity.participants}/{activity.capacity}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-white text-black hover:bg-gray-200 border-0">
                      Join Activity
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No activities scheduled for this date</p>
                </div>
                <p className="text-sm text-gray-500">
                  Select a highlighted date to view available activities
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
