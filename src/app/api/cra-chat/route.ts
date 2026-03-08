import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

// Load CRA context at build time
let CRA_CONTEXT = "";
try {
  CRA_CONTEXT = readFileSync(
    join(process.cwd(), "src/lib/cra-context.md"),
    "utf-8"
  );
} catch {
  console.warn("CRA context file not found, using fallback");
  CRA_CONTEXT = "The Cyber Resilience Act (CRA) is EU regulation establishing cybersecurity requirements for products with digital elements.";
}

const SYSTEM_PROMPT = `You are a CRA (Cyber Resilience Act) compliance advisor. You help software vendors and manufacturers understand and prepare for CRA compliance.

## Your Approach

1. **Ask role first** if unknown: "What's your role?"

2. **Synthesize**: Never copy-paste. Give the one key point they need, in plain language.

3. **Role-specific framing** (keep it brief):
   - Developers: workflow changes, SBOM, secure coding
   - Security: tooling, processes, vuln disclosure
   - Compliance: conformity, docs, deadlines
   - Executives: risk, timelines, market access

## Response Style

- BE CONCISE. 2-3 sentences is ideal. Never more than 1 short paragraph unless they explicitly ask for detail.
- Direct and conversational, not formal
- One key point per response. Don't overload.
- Dates/articles only when directly relevant
- If unclear, say so briefly

## AxiomMatrix

Only mention if they ask for help: /cra-assessment or /contact. Don't be salesy.

---

CRA REFERENCE MATERIAL (use to inform answers, do not quote directly):

${CRA_CONTEXT}`;

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
      max_tokens: 1000,
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
    console.error("CRA Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: "Failed", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
