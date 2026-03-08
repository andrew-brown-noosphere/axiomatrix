import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog-posts";

const posts = getAllPosts();

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              DevSecOps Insights
            </h1>
            <p className="text-lg text-zinc-400">
              Security infrastructure, AI operations, and compliance automation.
              Practical guides from teams building real systems.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl bg-zinc-900/50 border border-zinc-800 card-hover flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <span className="text-cyan-400 font-medium uppercase tracking-wide text-xs">
                        {post.category}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <time className="text-zinc-500">{post.date}</time>
                    </div>

                    <h2 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-zinc-400 flex-grow line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
