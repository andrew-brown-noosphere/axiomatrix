"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, Sparkles, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface BlogAssistantProps {
  postContent: string;
  postTitle: string;
}

export default function BlogAssistant({ postContent, postTitle }: BlogAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "What's your role? I'll tailor my answers for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoadingRef = useRef(false);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useCallback(async (userMessage: string, currentMessages: Message[]) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const allMessages: Message[] = [...currentMessages, { role: "user" as const, content: userMessage }];
      const messagesToSend = allMessages.slice(1);

      const response = await fetch("/api/blog-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesToSend,
          context: `Title: ${postTitle}\n\n${postContent}`
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let assistantMessage = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        assistantMessage += text;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [postContent, postTitle]);

  // Listen for clarify events from the blog content
  useEffect(() => {
    const handleClarify = (e: CustomEvent<{ topic: string }>) => {
      const question = `Clarify: ${e.detail.topic}`;
      sendMessage(question, messages);
    };

    window.addEventListener("clarify-topic", handleClarify as EventListener);
    return () => window.removeEventListener("clarify-topic", handleClarify as EventListener);
  }, [messages, sendMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    sendMessage(userMessage, messages);
  };

  const suggestedQuestions = [
    "I'm a developer",
    "I'm in security",
    "I'm in compliance",
    "I'm an executive",
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
          <Sparkles className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Article Assistant</h3>
          <p className="text-xs text-zinc-500">Ask about this article</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === "user" ? "ml-4" : ""
            }`}
          >
            <div
              className={`rounded-xl px-3 py-2.5 ${
                message.role === "user"
                  ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-100"
                  : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-300"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.content === "" && (
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-3 py-2.5 w-fit">
            <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          </div>
        )}

        {/* Suggested questions - show only at start */}
        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              Select your role
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white hover:border-zinc-600 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this article..."
            className="flex-1 px-3 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* CTA */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <Link
          href="/contact"
          className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors group"
        >
          <div>
            <p className="text-sm font-medium text-white">Need Help?</p>
            <p className="text-xs text-zinc-500">Talk to a DevSecOps expert</p>
          </div>
          <ExternalLink className="h-4 w-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
