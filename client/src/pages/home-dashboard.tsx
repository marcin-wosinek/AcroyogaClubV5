
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, Calendar as CalendarIcon, Activity, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function HomeDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { label: "This Month's Activities", value: "12", icon: Activity },
    { label: "Total Members", value: "87", icon: Users },
    { label: "Upcoming Events", value: "5", icon: CalendarIcon },
    { label: "Growth Rate", value: "+23%", icon: TrendingUp }
  ];

  const upcomingActivities = [
    {
      id: 1,
      title: "Beginner's Circle",
      date: "Today",
      time: "18:00",
      location: "Central Studio",
      spots: "3 spots left"
    },
    {
      id: 2,
      title: "Partner Acrobatics",
      date: "Tomorrow",
      time: "19:30",
      location: "Beach Location",
      spots: "Full"
    },
    {
      id: 3,
      title: "Flow & Meditation",
      date: "Thursday",
      time: "17:00",
      location: "Park Pavilion",
      spots: "8 spots left"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Acroyoga Club Valencia</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Activities</Button>
              <Button variant="ghost">Community</Button>
              <Button variant="outline">Login</Button>
              <Button>Join Club</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Acroyoga Club</h2>
          <p className="text-lg text-gray-600">Connect, learn, and grow with our community in Valencia</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Activity Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Date Activities</h4>
                  <p className="text-sm text-gray-600">
                    {date ? `Activities for ${date.toLocaleDateString()}` : 'Select a date to view activities'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Activities */}
          <div>
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Upcoming Activities</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {upcomingActivities.map((activity, index) => (
                    <div key={activity.id} className={`p-4 ${index !== upcomingActivities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <Badge variant={activity.spots === "Full" ? "destructive" : "secondary"} className="text-xs">
                          {activity.spots}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>{activity.date} at {activity.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3" disabled={activity.spots === "Full"}>
                        {activity.spots === "Full" ? "Full" : "Sign Up"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
