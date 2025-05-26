import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Home from "@/pages/home";
import HomeDashboard from "@/pages/home-dashboard";
import HomeModern from "@/pages/home-modern";
import NotFound from "@/pages/not-found";

type HomePageVariant = "original" | "dashboard" | "modern";

function HomePage() {
  const [activeVariant, setActiveVariant] = useState<HomePageVariant>("original");

  const variants = [
    { id: "original" as const, label: "Original", description: "Clean boilerplate showcase" },
    { id: "dashboard" as const, label: "Dashboard", description: "Project management interface" },
    { id: "modern" as const, label: "Modern", description: "Cutting-edge design with gradients" }
  ];

  const renderHomeVariant = () => {
    switch (activeVariant) {
      case "dashboard":
        return <HomeDashboard />;
      case "modern":
        return <HomeModern />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Home Page Variant Selector */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="font-semibold text-gray-900">Home Page Designs</h2>
              <span className="text-sm text-gray-500">Choose a design variant to preview</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              {variants.map((variant) => (
                <Button
                  key={variant.id}
                  variant={activeVariant === variant.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveVariant(variant.id)}
                  className={
                    activeVariant === variant.id
                      ? "bg-black text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-black hover:bg-white"
                  }
                >
                  {variant.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {variants.find(v => v.id === activeVariant)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Render Selected Variant */}
      <div className="relative">
        {renderHomeVariant()}
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
