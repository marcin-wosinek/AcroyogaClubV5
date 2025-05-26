import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, X, Sun, Moon, User, LogOut, ArrowLeft, Users, Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-800 bg-gray-900' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-3xl font-light tracking-wide">Acroyoga Club</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valencia, Spain</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <a className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                }`}>Activities</a>
              </Link>
              <a href="#" className={`transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}>About</a>
              <Link href="/contact">
                <a className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                }`}>Contact</a>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user?.fullName}</span>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className={`${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-200'
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className={`border-0 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}>
                    Login
                  </Button>
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className={`${
                  isDarkMode 
                    ? 'text-white hover:bg-gray-700' 
                    : 'text-black hover:bg-gray-200'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
            isDarkMode 
              ? 'bg-gray-900 text-white' 
              : 'bg-white text-black'
          } shadow-xl`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className="text-lg font-medium">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 px-4 py-6">
                <nav className="space-y-6">
                  <Link href="/">
                    <a 
                      className={`block text-lg transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Activities
                    </a>
                  </Link>
                  <a 
                    href="#" 
                    className={`block text-lg transition-colors ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <Link href="/contact">
                    <a 
                      className={`block text-lg transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </Link>
                </nav>
              </div>
              
              {/* Authentication Section */}
              <div className={`p-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 py-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">{user?.fullName}</span>
                    </div>
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-black hover:bg-gray-200'
                      }`}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button 
                      className={`w-full border-0 ${
                        isDarkMode 
                          ? 'bg-white text-black hover:bg-gray-200' 
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button 
                variant="ghost"
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
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
              <p className={`text-xl lg:text-2xl ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Building connections through movement and trust in Valencia
              </p>
            </div>

            {/* What is Acroyoga */}
            <Card className={`border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-black border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-black'
            }`}>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-2xl font-light mb-4">What is Acroyoga?</h2>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Acroyoga is a beautiful practice that combines the wisdom of yoga, the dynamic power of acrobatics, 
                  and the loving-kindness of healing arts. It's about connection, trust, and playful exploration of 
                  movement with partners. Whether you're flying through the air or providing a stable base, 
                  every role teaches us something valuable about ourselves and others.
                </p>
              </CardContent>
            </Card>

            {/* Our Mission */}
            <Card className={`border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-black border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-black'
            }`}>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-2xl font-light mb-4">Our Mission</h2>
                <p className={`text-lg leading-relaxed mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We're dedicated to creating a welcoming space where people of all backgrounds and skill levels 
                  can explore the joy of acroyoga. Our club fosters community, personal growth, and the magic 
                  that happens when we support each other both on and off the mat.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <Users className="h-8 w-8 mx-auto" />
                    <h3 className="font-medium">Community</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Building lasting friendships through shared practice
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <Heart className="h-8 w-8 mx-auto" />
                    <h3 className="font-medium">Trust</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Developing confidence in ourselves and others
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <Star className="h-8 w-8 mx-auto" />
                    <h3 className="font-medium">Growth</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Expanding physical and emotional boundaries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Join Us */}
            <Card className={`border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-black border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-black'
            }`}>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-2xl font-light mb-4">Join Our Community</h2>
                <p className={`text-lg leading-relaxed mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Ready to start your acroyoga journey? We welcome practitioners of all levels, from complete 
                  beginners to experienced acrobats. Our regular sessions include warm-ups, skill-building, 
                  and plenty of time for creative flow.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/">
                    <Button className={`flex-1 border-0 ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}>
                      View Activities
                    </Button>
                  </Link>
                  {!isAuthenticated && (
                    <Link href="/login">
                      <Button 
                        variant="outline" 
                        className={`flex-1 ${
                          isDarkMode 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Join the Club
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}