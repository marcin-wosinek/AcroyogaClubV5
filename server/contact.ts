import { Request, Response } from "express";

// Contact form submission handler
export async function contactHandler(req: Request, res: Response) {
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

    // TODO: Integrate with Resend API to send emails

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
}