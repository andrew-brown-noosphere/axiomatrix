"use client";

import { HelpCircle } from "lucide-react";

interface ClarifyButtonProps {
  topic: string;
}

export default function ClarifyButton({ topic }: ClarifyButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("cra-clarify", { detail: { topic } })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-md hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors ml-2"
    >
      <HelpCircle className="h-3 w-3" />
      Clarify
    </button>
  );
}
