import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are an expert assistant helping readers understand a technical blog post. You have the full article content below.

## Your Approach

1. **Ask role first** if unknown: "What's your role? I'll tailor my answers."

2. **Synthesize**: Never copy-paste from the article. Distill the key point they need, in plain language.

3. **Role-specific framing** (keep it brief):
   - Developers: practical implications, code-level concerns
   - Security: tooling, processes, threat models
   - Compliance: requirements, documentation, audits
   - Executives: risk, business impact, priorities

## Response Style

- BE CONCISE. 2-3 sentences is ideal. Never more than 1 short paragraph unless they explicitly ask for detail.
- Direct and conversational, not formal
- One key point per response. Don't overload.
- If they ask about something not in the article, say so briefly and give your best general guidance.

## AxiomMatrix

Only mention if they ask for help: /contact for DevSecOps consulting. Don't be salesy.

---

ARTICLE CONTENT:

`;

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

    const { messages, context } = await request.json();

    const systemPrompt = SYSTEM_PROMPT + (context || "No article content provided.");

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
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
    console.error("Blog Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Failed", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
