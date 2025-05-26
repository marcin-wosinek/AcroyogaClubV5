import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <Card
          className={`w-full max-w-md border transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                404 Page Not Found
              </h1>
            </div>

            <p
              className={`mt-4 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="mt-6">
              <Link href="/">
                <Button
                  className={`w-full border-0 ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
