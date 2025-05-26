import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Server is running",
      timestamp: new Date().toISOString()
    });
  });

  // Basic API info endpoint
  app.get("/api", (req, res) => {
    res.json({
      name: "React + Express Boilerplate API",
      version: "1.0.0",
      description: "A minimalistic fullstack JavaScript boilerplate",
      endpoints: {
        health: "/api/health",
        users: "/api/users (placeholder)"
      }
    });
  });

  // Placeholder users endpoint structure (ready for future implementation)
  app.get("/api/users", async (req, res) => {
    try {
      // This is where you would implement user fetching logic
      res.json({
        message: "Users endpoint ready for implementation",
        users: []
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      // This is where you would implement user creation logic
      res.json({
        message: "User creation endpoint ready for implementation",
        data: req.body
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { fullName, email, subject, message } = req.body;

      // Validate required fields
      if (!fullName || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }

      // Log the contact form submission
      console.log("Contact form submission received:", {
        fullName,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      // TODO: Integrate with email service provider (Resend) to actually send emails
      // For now, we'll just simulate successful processing
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      res.json({
        success: true,
        message: "Message sent successfully"
      });

    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
