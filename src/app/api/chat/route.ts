import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a helpful AI assistant for AxioMatrix. You're friendly, knowledgeable, and genuinely helpful.

AxioMatrix helps security leaders (CISOs, VP SecOps) navigate the age of AI. We augment their superpowers as they lead technical teams.

Our services:
- Free Discovery Call - understand where you stand and what it takes to strengthen security posture
- Core DevSecOps Maturity Assessment - identify security challenges, deliver high-impact plans
- Tailored CI/CD Pipeline Security Integration - integrate security into delivery pipelines
- Custom AI Agents & MCP Servers - secure agentic workflows, custom APIs, and MCP servers (see DevExp.ai)

We work with Enterprise, Government (FedRAMP), and EU Compliance (NIS2, Cyber Resilience Act, GDPR).

Keep responses concise and helpful. If someone wants to book a consultation, direct them to the contact page or offer to have someone reach out.

Be warm, professional, and genuinely interested in helping security leaders thrive fearlessly.`;

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
      max_tokens: 500,
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
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Failed", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
