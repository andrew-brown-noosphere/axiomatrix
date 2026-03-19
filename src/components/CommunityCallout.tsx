"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, ExternalLink, Users } from "lucide-react";

interface RedditThread {
  id: string;
  title: string;
  score: number;
  comments: number;
  url: string;
  subreddit: string;
  age: string;
  topComment?: {
    body: string;
    score: number;
    author: string;
  };
}

interface CommunityCalloutProps {
  topic: string;
  index?: number;
  variant?: "quote" | "card" | "minimal";
}

// Typewriter hook for streaming effect
function useTypewriter(text: string, speed: number = 15) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
}

export default function CommunityCallout({
  topic,
  index = 0,
  variant = "quote",
}: CommunityCalloutProps) {
  const [thread, setThread] = useState<RedditThread | null>(null);
  const [loading, setLoading] = useState(true);
  const [startStream, setStartStream] = useState(false);

  const commentText = thread?.topComment?.body || "";
  const { displayedText, isComplete } = useTypewriter(
    startStream ? commentText : "",
    35 // Slower, more readable streaming
  );

  useEffect(() => {
    async function fetchThread() {
      try {
        const response = await fetch(
          `/api/community-pulse?topic=${topic}&limit=${index + 3}`
        );
        if (!response.ok) return;
        const data = await response.json();
        if (data.posts && data.posts[index]) {
          setThread(data.posts[index]);
          // Delay starting stream for visual effect
          setTimeout(() => setStartStream(true), 300);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchThread();
  }, [topic, index]);

  if (loading || !thread || !thread.topComment) {
    return null;
  }

  // Shared wrapper for clear visual offset
  const OffsetWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="my-12 relative">
      {/* Top divider with label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
          <Users className="h-3 w-3 text-orange-400" />
          <span className="text-[10px] font-medium text-orange-400 uppercase tracking-wider">
            Community Voice
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      {/* Inset content with distinct background */}
      <div className="mx-4 sm:mx-8">{children}</div>

      {/* Bottom divider */}
      <div className="flex items-center gap-3 mt-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>
    </div>
  );

  if (variant === "minimal") {
    return (
      <OffsetWrapper>
        <a
          href={thread.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-5 py-4 bg-gradient-to-r from-orange-950/20 via-zinc-900/80 to-zinc-900/80 border border-orange-500/20 rounded-xl hover:border-orange-500/40 transition-all group"
        >
          <p className="text-sm text-zinc-300 italic leading-relaxed">
            &ldquo;{displayedText}
            {!isComplete && (
              <span className="inline-block w-0.5 h-4 bg-orange-400 ml-0.5 animate-pulse" />
            )}
            {isComplete && "&rdquo;"}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-orange-500/10">
            <p className="text-xs text-zinc-500 flex items-center gap-2">
              <span className="text-orange-400">r/{thread.subreddit}</span>
              <span>·</span>
              <span>{thread.topComment.score}↑</span>
            </p>
            <ExternalLink className="h-3 w-3 text-zinc-600 group-hover:text-orange-400 transition-colors" />
          </div>
        </a>
      </OffsetWrapper>
    );
  }

  if (variant === "quote") {
    return (
      <OffsetWrapper>
        <div className="relative bg-gradient-to-br from-orange-950/30 via-zinc-900/90 to-zinc-900/90 border border-orange-500/20 rounded-2xl p-6 shadow-xl shadow-orange-500/5">
          {/* Large quote mark */}
          <div className="absolute -top-3 -left-2 text-6xl text-orange-500/20 font-serif leading-none select-none">
            &ldquo;
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4 relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-orange-400">From the community</p>
              <p className="text-[10px] text-zinc-500">r/{thread.subreddit} · {thread.age}</p>
            </div>
          </div>

          {/* Streaming quote */}
          <blockquote className="text-zinc-200 leading-relaxed text-base pl-2 border-l-2 border-orange-500/30 italic">
            &ldquo;{displayedText}
            {!isComplete && (
              <span className="inline-block w-0.5 h-5 bg-orange-400 ml-1 animate-pulse" />
            )}
            {isComplete && "&rdquo;"}
          </blockquote>

          {/* Footer */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-orange-500/10">
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="text-orange-300">u/{thread.topComment.author}</span>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-medium">
                {thread.topComment.score}↑
              </span>
            </div>
            <a
              href={thread.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors"
            >
              View thread <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </OffsetWrapper>
    );
  }

  // Card variant
  return (
    <OffsetWrapper>
      <div className="bg-gradient-to-br from-orange-950/20 via-zinc-900/95 to-zinc-900/95 border border-orange-500/20 rounded-2xl overflow-hidden shadow-xl shadow-orange-500/5">
        {/* Header bar */}
        <div className="px-5 py-3 border-b border-orange-500/10 bg-orange-500/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <MessageSquare className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-zinc-200">What practitioners are saying</span>
          </div>
          <span className="text-xs text-orange-400/70 font-medium">r/{thread.subreddit}</span>
        </div>

        <div className="p-5">
          {/* Thread title */}
          <h4 className="text-sm font-medium text-zinc-300 mb-4 line-clamp-2">
            {thread.title}
          </h4>

          {/* Top comment with streaming */}
          <div className="bg-zinc-900/80 rounded-xl p-4 border border-orange-500/10">
            <p className="text-sm text-zinc-200 leading-relaxed italic">
              &ldquo;{displayedText}
              {!isComplete && (
                <span className="inline-block w-0.5 h-4 bg-orange-400 ml-0.5 animate-pulse" />
              )}
              {isComplete && "&rdquo;"}
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800">
              <span className="text-xs text-orange-300">u/{thread.topComment.author}</span>
              <span className="text-xs text-zinc-600">·</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">
                {thread.topComment.score}↑
              </span>
            </div>
          </div>

          <a
            href={thread.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 mt-4 font-medium transition-colors"
          >
            Join the discussion <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </OffsetWrapper>
  );
}
