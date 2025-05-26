import type { Request, Response } from "express";
import { mockUsers } from "@shared/mockData";

// Extend the session interface to include our custom properties
declare module 'express-session' {
  interface SessionData {
    userId?: number;
    user?: any;
    visitCount?: number;
  }
}

export async function loginHandler(req: Request, res: Response) {
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
}

export function logoutHandler(req: Request, res: Response) {
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
}

export function sessionHandler(req: Request, res: Response) {
  res.json({
    isAuthenticated: !!req.session.userId,
    user: req.session.user || null,
    sessionId: req.sessionID,
    visitCount: req.session.visitCount
  });
}

export function sessionTrackingMiddleware(req: Request, res: Response, next: Function) {
  if (!req.session.visitCount) {
    req.session.visitCount = 1;
    console.log(`New session created: ${req.sessionID}`);
  } else {
    req.session.visitCount += 1;
  }
  next();
}