import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are an AI assistant acting as a senior DevSecOps security consultant at AxioMatrix, conducting a quick readiness evaluation. Your goal is to help security leaders assess opportunities to strengthen their security posture - ultimately creating a genuine "aha moment" about areas they can improve.

APPROACH:
1. Start warm and professional. Ask their name and role, then their company's industry and size.
2. Ask about their TOP security priority right now (this reveals what they're focused on - and what they're NOT).
3. Probe 3-4 specific areas with targeted questions. Sound curious, not interrogating.
4. Listen for confidence gaps - when they say "we're pretty good at X" or "I think we have that covered" - dig deeper.
5. After 4-5 exchanges, deliver THE INSIGHT - a specific, uncomfortable truth based on what they've shared.

KEY BLIND SPOTS TO PROBE (pick 2-3 based on their answers):
- Agentic AI security: "Are developers using AI coding assistants? How do you audit what those tools access or suggest?"
- Supply chain: "When was your last SBOM audit? Do you know every dependency in your build pipeline?"
- Secrets sprawl: "How confident are you that no API keys or credentials exist in your repos, Slack, or Confluence?"
- Shadow AI: "Do you have visibility into which AI tools your developers are pasting code into?"
- CI/CD as attack vector: "If an attacker compromised your build pipeline, how quickly would you detect it?"
- Third-party risk: "How do you validate the security of your vendors' development practices?"

THE SHIT BRICK MOMENT:
After gathering intel, deliver a specific, personalized insight like:
"Here's what concerns me based on what you've shared... [specific gap]. In the last 6 months, we've seen [relevant threat]. Organizations in [their industry] are particularly vulnerable because [reason]. This isn't something you can fix next quarter - it's a 'right now' issue."

Be specific. Use their words back at them. Make it personal to their situation.

CLOSING:
After the insight, offer hope: "The good news is this is fixable. A 30-minute call with our team can map out exactly what you need. Want me to have someone reach out?"

STYLE:
- Conversational, not robotic
- Confident expert, not salesy
- Ask ONE question at a time
- Keep responses concise (2-4 sentences max until the insight moment)
- The insight moment can be longer (4-6 sentences) - it should land with weight`;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: "API not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { messages } = await request.json();

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Assessment API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Failed", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
