"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ArrowUpRight, TrendingUp, RefreshCw } from "lucide-react";

interface CommunityPost {
  id: string;
  title: string;
  excerpt: string;
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

interface CommunityPulseProps {
  topic: string;
  limit?: number;
  title?: string;
}

export default function CommunityPulse({
  topic,
  limit = 3,
  title = "What the community is saying",
}: CommunityPulseProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/community-pulse?topic=${topic}&limit=${limit}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError("Couldn't load community discussions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [topic, limit]);

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />
          <span className="text-sm text-zinc-400">Loading community pulse...</span>
        </div>
      </div>
    );
  }

  if (error || posts.length === 0) {
    return null; // Silently fail - don't show broken component
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
        </div>
        <span className="text-xs text-zinc-500">from Reddit</span>
      </div>

      {/* Posts */}
      <div className="divide-y divide-zinc-800/50">
        {posts.map((post) => (
          <div
            key={post.id}
            className="px-5 py-4 hover:bg-zinc-800/30 transition-colors"
          >
            {/* Post header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-cyan-400 transition-colors line-clamp-2 flex-1"
              >
                {post.title}
              </a>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 flex-shrink-0" />
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                r/{post.subreddit}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-cyan-400">↑{post.score}</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {post.comments}
              </span>
              <span>{post.age}</span>
            </div>

            {/* Top comment preview */}
            {post.topComment && (
              <button
                onClick={() =>
                  setExpanded(expanded === post.id ? null : post.id)
                }
                className="w-full text-left"
              >
                <div
                  className={`bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50 transition-all ${
                    expanded === post.id ? "" : "line-clamp-2"
                  }`}
                >
                  <p className="text-sm text-zinc-300 italic">
                    "{post.topComment.body}
                    {post.topComment.body.length >= 200 && "..."}
                    "
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">
                    — u/{post.topComment.author} · {post.topComment.score}↑
                  </p>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-900/30">
        <p className="text-xs text-zinc-500 text-center">
          Live discussions from security communities
        </p>
      </div>
    </div>
  );
}
