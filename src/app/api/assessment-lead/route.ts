import { NextRequest, NextResponse } from "next/server";

interface AssessmentLead {
  email: string;
  scores: Record<string, number>;
  overall: number;
  answers: Record<string, number>;
  timestamp: string;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, scores, overall, answers } = body;

    // Validate required fields
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Create lead record
    const lead: AssessmentLead = {
      email,
      scores: scores || {},
      overall: overall || 0,
      answers: answers || {},
      timestamp: new Date().toISOString(),
      source: "quick-assessment",
    };

    // Log for now - in production this would go to a database or CRM
    console.log("[Assessment Lead]", JSON.stringify(lead, null, 2));

    // TODO: Integrate with your preferred backend:
    // - Save to database (Supabase, MongoDB, etc.)
    // - Send to CRM (HubSpot, Salesforce, etc.)
    // - Trigger email via SendGrid, Resend, etc.
    // - Add to mailing list (Mailchimp, ConvertKit, etc.)

    // For now, we'll just acknowledge receipt
    // You can add real integrations later

    return NextResponse.json({
      success: true,
      message: "Assessment lead captured successfully",
      maturityLevel: getMaturityLevel(overall),
    });
  } catch (error) {
    console.error("[Assessment Lead Error]", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}

function getMaturityLevel(score: number): string {
  if (score < 1) return "Initial";
  if (score < 2) return "Developing";
  if (score < 2.5) return "Established";
  return "Advanced";
}
