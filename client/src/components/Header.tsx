import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      {/* Header */}
      <header
        className={`border-b transition-colors duration-300 ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="text-3xl font-light tracking-wide">Acroyoga Club</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Valencia, Spain
                </p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <a
                  className={`transition-colors ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  Activities
                </a>
              </Link>
              <Link href="/about">
                <a
                  className={`transition-colors ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  About
                </a>
              </Link>
              <Link href="/contact">
                <a
                  className={`transition-colors ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  Contact
                </a>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
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
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    className={`border-0 ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
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
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"
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
          <div
            className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            } shadow-xl`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div
                className={`flex items-center justify-between p-4 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h2 className="text-lg font-medium">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-black hover:bg-gray-200"
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
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Activities
                    </a>
                  </Link>
                  <Link href="/about">
                    <a
                      className={`block text-lg transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className={`block text-lg transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </Link>
                </nav>
              </div>

              {/* Authentication Section */}
              <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
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
                          ? "text-gray-300 hover:text-white hover:bg-gray-700"
                          : "text-gray-600 hover:text-black hover:bg-gray-200"
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
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
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
    </>
  );
}
