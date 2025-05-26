import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Mock activities data
  const activities = [
    {
      id: 1,
      title: "Beginner Acroyoga Workshop",
      date: "2024-01-15",
      time: "18:00",
      location: "Valencia Central Park",
      participants: 8,
      capacity: 15,
      price: 15
    },
    {
      id: 2,
      title: "Advanced Flow Session",
      date: "2024-01-17",
      time: "19:30",
      location: "Beach Studio",
      participants: 12,
      capacity: 12,
      price: 20
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold">Acroyoga Club Valencia</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="outline">Login</Button>
              <Button>Register</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="text-2xl">Activity Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Activities */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Upcoming Activities</h2>
            {activities.map((activity) => (
              <Card key={activity.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{activity.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{activity.date} at {activity.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{activity.participants}/{activity.capacity} participants</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Badge variant="secondary">€{activity.price}</Badge>
                    <Button size="sm">Sign Up</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}