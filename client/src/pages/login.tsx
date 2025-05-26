import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sun, Moon } from "lucide-react";
import { mockUsers } from "@shared/mockData";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [, setLocation] = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user in mock data
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      setError("No account found with this email address");
      setIsLoading(false);
      return;
    }

    // For demo purposes, accept any password for existing users
    // In production, this would verify against hashed passwords
    if (password.length < 1) {
      setError("Please enter a password");
      setIsLoading(false);
      return;
    }

    // Use the centralized auth context to log in
    login(user);
    
    setIsLoading(false);
    // Redirect to home page
    setLocation('/');
  };

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          <Card className={`border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-black'
          }`}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-light text-center">
                Welcome back
              </CardTitle>
              <p className={`text-center text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Sign in to your account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className={`${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-black placeholder-gray-500'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={`${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-black placeholder-gray-500'
                    }`}
                  />
                </div>

                {error && (
                  <div className={`text-sm p-3 rounded-lg ${
                    isDarkMode 
                      ? 'bg-red-900/20 border border-red-800 text-red-400' 
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}>
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full border-0 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              <div className="mt-6">
                <div className={`text-center text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Demo Accounts:
                </div>
                <div className={`mt-2 space-y-1 text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <div>Admin: maria.gonzalez@email.com</div>
                  <div>Member: carlos.lopez@email.com</div>
                  <div>Non-member: ana.martin@email.com</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link href="/">
                  <Button 
                    variant="ghost"
                    className={`text-sm ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    ← Back to calendar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}