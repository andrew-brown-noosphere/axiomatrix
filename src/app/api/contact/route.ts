import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("[Contact Form] No RESEND_API_KEY configured");
      console.log("[Contact Form]", { name, email, company, message });
      return NextResponse.json({
        success: true,
        message: "Message received (email not configured)",
      });
    }

    // Dynamically import Resend only when needed
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email via Resend
    await resend.emails.send({
      from: "AxioMatrix <noreply@axiomatrix.tech>",
      to: "andrew@voyant.io",
      replyTo: email,
      subject: `[AxioMatrix] Contact from ${name}${company ? ` at ${company}` : ""}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}

Message:
${message}
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "Not provided"}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br />")}</p>
      `.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("[Contact Form Error]", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
