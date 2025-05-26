import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginHandler, logoutHandler, sessionHandler, sessionTrackingMiddleware } from "./auth";
import { contactHandler } from "./contact";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session tracking middleware - creates session for all requests
  app.use(sessionTrackingMiddleware);

  // Health check endpoint with session info
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Server is running",
      timestamp: new Date().toISOString(),
      sessionId: req.sessionID,
      visitCount: req.session.visitCount
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

  // Authentication endpoints
  app.post("/api/auth/login", loginHandler);
  app.post("/api/auth/logout", logoutHandler);
  app.get("/api/auth/session", sessionHandler);

  // Contact form submission endpoint
  app.post("/api/contact", contactHandler);

  const httpServer = createServer(app);

  return httpServer;
}
