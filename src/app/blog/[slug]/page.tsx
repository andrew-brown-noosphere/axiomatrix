import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getPost, getAllPosts, getAuthor } from "@/lib/blog-posts";
import type { Metadata } from "next";
import BlogAssistant from "@/components/BlogAssistant";
import BlogContentWithClarify from "@/components/BlogContentWithClarify";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | AxiomMatrix",
    };
  }

  return {
    title: `${post.title} | AxiomMatrix`,
    description: post.description,
  };
}

function parseMarkdown(content: string): string {
  // Simple markdown-like parsing
  let html = content
    // Headers
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-white mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-8 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Links - [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">$1</a>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm font-mono">$1</code>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto my-6"><code class="text-sm font-mono text-zinc-300">${code.trim()}</code></pre>`;
    })
    // Tables (simple)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells[0].includes('---')) {
        return ''; // Skip separator row
      }
      const isHeader = cells.some(c => c.includes('**'));
      const tag = isHeader ? 'th' : 'td';
      const className = isHeader
        ? 'px-4 py-2 text-left text-white font-medium bg-zinc-800/50'
        : 'px-4 py-2 text-left text-zinc-400 border-t border-zinc-800';
      return `<tr>${cells.map(c => `<${tag} class="${className}">${c.trim().replace(/\*\*/g, '')}</${tag}>`).join('')}</tr>`;
    })
    // Wrap tables
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<table class="w-full border-collapse my-6 text-sm">$&</table>');

  // Process lists separately - find consecutive lines starting with "- "
  html = html.replace(/(^- .+$\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const text = line.replace(/^- /, '');
      return `<li class="ml-4 text-zinc-400">${text}</li>`;
    }).join('\n');
    return `<ul class="my-4 space-y-2 list-disc list-inside">\n${items}\n</ul>`;
  });

  // Process numbered lists
  html = html.replace(/(^\d+\. .+$\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const text = line.replace(/^\d+\. /, '');
      return `<li class="ml-4 text-zinc-400">${text}</li>`;
    }).join('\n');
    return `<ol class="my-4 space-y-2 list-decimal list-inside">\n${items}\n</ol>`;
  });

  // Paragraphs - process remaining text
  const blockElements = ['<h2', '<h3', '<div', '<ul', '<ol', '<table', '<pre', '<hr'];
  html = html
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (trimmed === '') return para;
      // Skip wrapping if it's a block element
      if (blockElements.some(tag => trimmed.startsWith(tag))) return para;
      return `<p class="text-zinc-400 mb-4 leading-relaxed">${trimmed}</p>`;
    })
    .join('\n');

  return html;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthor(post.authorId);
  const contentHtml = parseMarkdown(post.content);
  const isAugmented = post.augmented === true;

  return (
    <div className="min-h-screen">
      {isAugmented ? (
        // Two-column layout for augmented posts
        <div className="flex">
          {/* Left pane - Article Assistant */}
          <aside className="hidden lg:block w-96 flex-shrink-0 border-r border-zinc-800 sticky top-0 h-screen overflow-y-auto">
            <div className="p-6 h-full">
              <BlogAssistant postContent={post.content} postTitle={post.title} />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {/* Featured Image */}
              {post.image && (
                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span className="text-cyan-400 font-medium uppercase tracking-wide text-xs">
                    {post.category}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <time className="text-zinc-500">{post.date}</time>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-xl text-zinc-300 italic text-center mb-6">
                  {post.description}
                </p>

                {/* Author */}
                {author && (
                  <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-white">{author.name}</p>
                      <p className="text-sm text-zinc-500">{author.role}</p>
                    </div>
                  </div>
                )}
              </header>

              {/* Content */}
              <BlogContentWithClarify html={contentHtml} enableClarify={true} />

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-zinc-800">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    About AxiomMatrix
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    We build DevSecOps infrastructure with AI-assisted security operations.
                    HSM code signing, supply chain attestation, and compliance automation.
                  </p>
                  <Link
                    href="/contact"
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Schedule a Discovery Call →
                  </Link>
                </div>
              </footer>

              {/* Mobile Article Assistant */}
              <div className="lg:hidden mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <BlogAssistant postContent={post.content} postTitle={post.title} />
              </div>
            </article>
          </div>
        </div>
      ) : (
        // Standard single-column layout
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        {post.image && (
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="text-cyan-400 font-medium uppercase tracking-wide text-xs">
              {post.category}
            </span>
            <span className="text-zinc-600">•</span>
            <time className="text-zinc-500">{post.date}</time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-zinc-300 italic text-center mb-6">
            {post.description}
          </p>

          {/* Author */}
          {author && (
            <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
              <Image
                src={author.image}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-white">{author.name}</p>
                <p className="text-sm text-zinc-500">{author.role}</p>
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-800">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              About AxiomMatrix
            </h3>
            <p className="text-zinc-400 mb-4">
              We build DevSecOps infrastructure with AI-assisted security operations.
              HSM code signing, supply chain attestation, and compliance automation.
            </p>
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Schedule a Discovery Call →
            </Link>
          </div>
        </footer>
      </article>
      )}
    </div>
  );
}
