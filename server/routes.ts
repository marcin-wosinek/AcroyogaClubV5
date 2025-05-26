import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mockUsers } from "@shared/mockData";

// Extend the session interface to include our custom properties
declare module 'express-session' {
  interface SessionData {
    userId?: number;
    user?: any;
    visitCount?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session tracking middleware - creates session for all requests
  app.use((req, res, next) => {
    if (!req.session.visitCount) {
      req.session.visitCount = 1;
      console.log(`New session created: ${req.sessionID}`);
    } else {
      req.session.visitCount += 1;
    }
    next();
  });

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
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }

      // Find user in shared mock data
      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      // Create new session on successful login
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Session creation failed"
          });
        }

        // Store user info in session
        req.session.userId = user.id;
        req.session.user = {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          isMember: user.isMember,
          isAdmin: user.isAdmin
        };

        req.session.save((err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Session save failed"
            });
          }

          console.log(`User ${user.email} logged in, new session: ${req.sessionID}`);
          
          res.json({
            success: true,
            message: "Login successful",
            user: req.session.user
          });
        });
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    if (req.session.userId) {
      console.log(`User ${req.session.user?.email} logged out, destroying session: ${req.sessionID}`);
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed"
        });
      }

      res.clearCookie('acroyoga.sid');
      res.json({
        success: true,
        message: "Logout successful"
      });
    });
  });

  app.get("/api/auth/session", (req, res) => {
    res.json({
      isAuthenticated: !!req.session.userId,
      user: req.session.user || null,
      sessionId: req.sessionID,
      visitCount: req.session.visitCount
    });
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
