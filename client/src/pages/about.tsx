import { Layout } from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Users, Heart, Star } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            className={`transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-black hover:bg-gray-200"
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Button>
        </Link>
      </div>

      {/* About Content */}
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-light">About Acroyoga Club</h1>
          <p className={`text-xl lg:text-2xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Building connections through movement and trust in Valencia
          </p>
        </div>

        {/* What is Acroyoga */}
        <Card
          className={`border transition-colors duration-300 ${
            isDarkMode
              ? "bg-black border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-2xl font-light mb-4">What is Acroyoga?</h2>
            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Acroyoga is a beautiful practice that combines the wisdom of yoga, the dynamic power
              of acrobatics, and the loving-kindness of healing arts. It's about connection, trust,
              and playful exploration of movement with partners. Whether you're flying through the
              air or providing a stable base, every role teaches us something valuable about
              ourselves and others.
            </p>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card
          className={`border transition-colors duration-300 ${
            isDarkMode
              ? "bg-black border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-2xl font-light mb-4">Our Mission</h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              We're dedicated to creating a welcoming space where people of all backgrounds and
              skill levels can explore the joy of acroyoga. Our club fosters community, personal
              growth, and the magic that happens when we support each other both on and off the mat.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <Users className="h-8 w-8 mx-auto" />
                <h3 className="font-medium">Community</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Building lasting friendships through shared practice
                </p>
              </div>
              <div className="text-center space-y-3">
                <Heart className="h-8 w-8 mx-auto" />
                <h3 className="font-medium">Trust</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Developing confidence in ourselves and others
                </p>
              </div>
              <div className="text-center space-y-3">
                <Star className="h-8 w-8 mx-auto" />
                <h3 className="font-medium">Growth</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Expanding physical and emotional boundaries
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Join Us */}
        <Card
          className={`border transition-colors duration-300 ${
            isDarkMode
              ? "bg-black border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-2xl font-light mb-4">Join Our Community</h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Ready to start your acroyoga journey? We welcome practitioners of all levels, from
              complete beginners to experienced acrobats. Our regular sessions include warm-ups,
              skill-building, and plenty of time for creative flow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button
                  className={`flex-1 border-0 ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  View Activities
                </Button>
              </Link>
              {/* {!isAuthenticated && ( */}
              <Link href="/login">
                <Button
                  variant="outline"
                  className={`flex-1 ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Join the Club
                </Button>
              </Link>
              {/* )} */}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
