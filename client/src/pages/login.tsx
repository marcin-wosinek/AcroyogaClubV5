import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Login() {
  const [location, setLocation] = useLocation();
  const { isDarkMode } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Extract redirect parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Send credentials to backend
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setLocation(redirectTo);
  };

  return (
    <Layout maxWidth="md">
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="w-full">
          <Card
            className={`border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-light text-center">Welcome back</CardTitle>
              <p
                className={`text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
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
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-black placeholder-gray-500"
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
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-black placeholder-gray-500"
                    }`}
                  />
                </div>

                {error && (
                  <div
                    className={`text-sm p-3 rounded-lg ${
                      isDarkMode
                        ? "bg-red-900/20 border border-red-800 text-red-400"
                        : "bg-red-50 border border-red-200 text-red-600"
                    }`}
                  >
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full border-0 ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="mt-6">
                <div
                  className={`text-center text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Demo Accounts:
                </div>
                <div
                  className={`mt-2 space-y-1 text-xs ${
                    isDarkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
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
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
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
    </Layout>
  );
}
