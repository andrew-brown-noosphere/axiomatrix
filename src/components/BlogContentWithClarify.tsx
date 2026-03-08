"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { HelpCircle } from "lucide-react";

interface BlogContentWithClarifyProps {
  html: string;
  enableClarify?: boolean;
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

export default function BlogContentWithClarify({ html, enableClarify = false }: BlogContentWithClarifyProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const rootsRef = useRef<Map<Element, ReturnType<typeof createRoot>>>(new Map());

  useEffect(() => {
    if (!enableClarify || !contentRef.current) return;

    // Find all h2 and h3 elements
    const headings = contentRef.current.querySelectorAll("h2, h3");

    headings.forEach((heading) => {
      // Skip if already has a clarify button
      if (heading.querySelector(".clarify-btn-container")) return;

      const topic = heading.textContent?.trim() || "";
      if (!topic) return;

      // Create container for React component
      const container = document.createElement("span");
      container.className = "clarify-btn-container";
      heading.appendChild(container);

      // Render React component
      const root = createRoot(container);
      root.render(<ClarifyButton topic={topic} />);
      rootsRef.current.set(container, root);
    });

    // Cleanup function
    return () => {
      rootsRef.current.forEach((root) => {
        root.unmount();
      });
      rootsRef.current.clear();
    };
  }, [html, enableClarify]);

  return (
    <div
      ref={contentRef}
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
