// client/src/components/Layout.tsx
import { useTheme } from "../contexts/ThemeContext";
import { Header } from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full";
  title?: string;
}

export function Layout({ children, maxWidth = "4xl", title }: LayoutProps) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header />

      <div className="min-h-[calc(100vh-80px)] p-4 lg:p-8">
        <div className={`max-w-${maxWidth} mx-auto`}>
          {title && (
            <h2 className="text-3xl lg:text-4xl font-light text-center mb-6 lg:mb-8">{title}</h2>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
