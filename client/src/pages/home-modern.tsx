
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomeModern() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activities = [
    {
      id: 1,
      title: "Morning Flow",
      date: "2024-01-15",
      time: "09:00",
      location: "Malvarosa Beach",
      participants: 6,
      capacity: 10,
      price: 12
    },
    {
      id: 2,
      title: "Evening Practice",
      date: "2024-01-15",
      time: "19:00",
      location: "Turia Gardens",
      participants: 14,
      capacity: 16,
      price: 15
    }
  ];

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
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Login
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Calendar */}
        <div className="flex-1 p-8 border-r border-gray-800">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-light mb-8 text-center">Activity Calendar</h2>
            <div className="bg-gray-900 rounded-2xl p-8">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full [&_.rdp-day_selected]:bg-white [&_.rdp-day_selected]:text-black"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Activities */}
        <div className="w-96 p-8 bg-gray-900">
          <h3 className="text-2xl font-light mb-6">Today's Activities</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="bg-black border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-lg">{activity.title}</h4>
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
                  
                  <Button className="w-full mt-6 bg-white text-black hover:bg-gray-200">
                    Join Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
