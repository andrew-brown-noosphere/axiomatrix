"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { HelpCircle } from "lucide-react";
import CommunityCallout from "./CommunityCallout";

interface BlogContentWithClarifyProps {
  html: string;
  enableClarify?: boolean;
  topic?: string;
  enableCommunityCallouts?: boolean;
  calloutInterval?: number; // Inject callout every N paragraphs
}

function ClarifyButton({ topic }: { topic: string }) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("clarify-topic", { detail: { topic } })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors ml-2 align-middle"
    >
      <HelpCircle className="h-2.5 w-2.5" />
      Clarify
    </button>
  );
}

export default function BlogContentWithClarify({
  html,
  enableClarify = false,
  topic,
  enableCommunityCallouts = false,
  calloutInterval = 3
}: BlogContentWithClarifyProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const rootsRef = useRef<Map<Element, ReturnType<typeof createRoot>>>(new Map());

  useEffect(() => {
    if (!contentRef.current) return;

    // Clarify buttons on headings
    if (enableClarify) {
      const headings = contentRef.current.querySelectorAll("h2, h3");

      headings.forEach((heading) => {
        if (heading.querySelector(".clarify-btn-container")) return;

        const headingTopic = heading.textContent?.trim() || "";
        if (!headingTopic) return;

        const container = document.createElement("span");
        container.className = "clarify-btn-container";
        heading.appendChild(container);

        const root = createRoot(container);
        root.render(<ClarifyButton topic={headingTopic} />);
        rootsRef.current.set(container, root);
      });
    }

    // Community callouts before headers (not between paragraphs)
    if (enableCommunityCallouts && topic) {
      const headers = contentRef.current.querySelectorAll("h2, h3");
      const variants: Array<"quote" | "card" | "minimal"> = ["quote", "minimal", "card"];
      let calloutIndex = 0;

      headers.forEach((header, i) => {
        // Insert before every Nth header (skip first few to let content establish)
        if (i >= 1 && i % calloutInterval === 0) {
          // Skip if already has a callout before it
          if (header.previousElementSibling?.classList.contains("community-callout-container")) return;

          const container = document.createElement("div");
          container.className = "community-callout-container";
          header.parentNode?.insertBefore(container, header);

          const root = createRoot(container);
          root.render(
            <CommunityCallout
              topic={topic}
              index={calloutIndex}
              variant={variants[calloutIndex % variants.length]}
            />
          );
          rootsRef.current.set(container, root);
          calloutIndex++;
        }
      });
    }

    return () => {
      rootsRef.current.forEach((root) => {
        root.unmount();
      });
      rootsRef.current.clear();
    };
  }, [html, enableClarify, enableCommunityCallouts, topic, calloutInterval]);

  return (
    <div
      ref={contentRef}
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
