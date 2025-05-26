import { Request, Response } from "express";
import fetch from "node-fetch";

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

    // Integrate with Resend API to send emails
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Resend API key not configured"
      });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "contact@acroyogaclub.com", // Change as needed
        to: ["info@acroyogaclub.com"], // Change as needed
        subject: `[Contact] ${subject}`,
        reply_to: email,
        html: `<p><strong>Name:</strong> ${fullName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", errorText);
      return res.status(500).json({
        success: false,
        message: "Failed to send email"
      });
    }

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