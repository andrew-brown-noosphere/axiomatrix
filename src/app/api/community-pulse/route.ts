import { NextRequest, NextResponse } from "next/server";

const USER_AGENT = "AxioMatrix:CommunityPulse:1.0";

interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  score: number;
  num_comments: number;
  permalink: string;
  subreddit: string;
  created_utc: number;
  author: string;
}

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

// Topic to search queries mapping
const TOPIC_QUERIES: Record<string, string[]> = {
  cra: ["cyber resilience act", "CRA compliance", "EU CRA"],
  "ai-act": ["EU AI act", "AI act compliance", "artificial intelligence act"],
  sbom: ["SBOM", "software bill of materials", "supply chain security"],
  devsecops: ["DevSecOps", "shift left security", "pipeline security"],
  "code-signing": ["code signing", "software signing"],
  aisecops: ["AI SOC", "AI security operations", "LLM security", "AI replacing analysts"],
};

// Fallback data when Reddit is unavailable
const FALLBACK_POSTS: Record<string, CommunityPost[]> = {
  cra: [
    {
      id: "fallback-cra-1",
      title: "CRA has 22 requirements but only ~9 applied to our SaaS product",
      excerpt: "I spent the last month figuring out which CRA requirements actually apply...",
      score: 156,
      comments: 89,
      url: "https://reddit.com/r/cybersecurity/comments/1r7jc51",
      subreddit: "cybersecurity",
      age: "3d ago",
      topComment: {
        body: "Article 10.5 (SBOM) is the big one most of us are missing. For those generating SBOMs, are you doing it at repo level or service level for microservices? We went with service-level but auditors seem to want both.",
        score: 67,
        author: "security_engineer_eu",
      },
    },
    {
      id: "fallback-cra-2",
      title: "How are you proving 'secure by default' for CRA Article 10.2?",
      excerpt: "Is a default configuration audit enough, or are auditors expecting something more active?",
      score: 78,
      comments: 52,
      url: "https://reddit.com/r/netsec/comments/example2",
      subreddit: "netsec",
      age: "5d ago",
      topComment: {
        body: "We built a compliance matrix mapping each requirement to specific controls. For secure-by-default, we documented our default configs AND the security rationale behind each choice. Auditors loved it.",
        score: 34,
        author: "compliance_architect",
      },
    },
    {
      id: "fallback-cra-3",
      title: "CRA vulnerability handling (Article 13) - what's your workflow?",
      excerpt: "Setting up our vulnerability management process for CRA compliance...",
      score: 45,
      comments: 38,
      url: "https://reddit.com/r/devsecops/comments/example3",
      subreddit: "devsecops",
      age: "1w ago",
      topComment: {
        body: "Key insight: CRA expects 'coordinated vulnerability disclosure' not just internal handling. We had to formalize our external reporting process and add SLA commitments. The 24-hour notification requirement for critical vulns is tight.",
        score: 28,
        author: "vuln_mgmt_lead",
      },
    },
  ],
  "ai-act": [
    {
      id: "fallback-ai-1",
      title: "EU AI Act high-risk classification - how are you handling it?",
      excerpt: "Our ML models might fall under high-risk...",
      score: 89,
      comments: 67,
      url: "https://reddit.com/r/MachineLearning/comments/example4",
      subreddit: "MachineLearning",
      age: "3d ago",
      topComment: {
        body: "The key is documentation. Start documenting your training data sources, model architecture decisions, and bias testing now. Retrofitting this documentation is painful.",
        score: 42,
        author: "ml_compliance_officer",
      },
    },
    {
      id: "fallback-ai-2",
      title: "AI Act conformity assessment - anyone been through it yet?",
      excerpt: "Looking for experiences with the new requirements...",
      score: 54,
      comments: 38,
      url: "https://reddit.com/r/artificial/comments/example5",
      subreddit: "artificial",
      age: "1w ago",
      topComment: {
        body: "We went through preliminary assessment with a notified body. Main gaps were around explainability documentation and human oversight procedures. Budget 3-6 months minimum.",
        score: 28,
        author: "ai_governance_lead",
      },
    },
  ],
  devsecops: [
    {
      id: "fallback-devsecops-1",
      title: "Shifting security left - what actually works?",
      excerpt: "Trying to integrate security earlier in our pipeline...",
      score: 156,
      comments: 89,
      url: "https://reddit.com/r/devsecops/comments/example6",
      subreddit: "devsecops",
      age: "4d ago",
      topComment: {
        body: "The biggest impact we've seen is making security tooling fast and developer-friendly. If your SAST takes 20 minutes, developers will find ways around it. We got ours under 2 minutes.",
        score: 67,
        author: "devsecops_architect",
      },
    },
    {
      id: "fallback-devsecops-2",
      title: "Code signing in CI/CD - HSM vs cloud KMS?",
      excerpt: "Evaluating options for secure code signing...",
      score: 78,
      comments: 52,
      url: "https://reddit.com/r/devops/comments/example7",
      subreddit: "devops",
      age: "6d ago",
      topComment: {
        body: "HSM gives you the highest assurance but cloud KMS has gotten very good. For most teams, cloud KMS with proper IAM controls is sufficient unless you're in regulated industries.",
        score: 34,
        author: "security_engineer",
      },
    },
  ],
  aisecops: [
    {
      id: "fallback-aisecops-1",
      title: "Is AI actually replacing SOC analysts? Our experience after 6 months",
      excerpt: "We deployed AI-powered alert triage in our SOC...",
      score: 234,
      comments: 178,
      url: "https://reddit.com/r/cybersecurity/comments/example8",
      subreddit: "cybersecurity",
      age: "2d ago",
      topComment: {
        body: "AI screens 92% of our alerts now. But here's the thing — it's not replacing analysts, it's changing what they do. Tier 1 triage is basically automated. Our analysts now focus on investigation and threat hunting. Different skills needed.",
        score: 89,
        author: "soc_manager_enterprise",
      },
    },
    {
      id: "fallback-aisecops-2",
      title: "MITRE ATLAS for AI threat modeling - anyone actually using it?",
      excerpt: "Looking for practical experience with the ATLAS framework...",
      score: 67,
      comments: 45,
      url: "https://reddit.com/r/netsec/comments/example9",
      subreddit: "netsec",
      age: "4d ago",
      topComment: {
        body: "We use ATLAS for red teaming our ML models. The Navigator tool is useful for mapping coverage. Most valuable techniques to test: prompt injection, training data poisoning, model extraction. Start there.",
        score: 34,
        author: "ai_red_teamer",
      },
    },
    {
      id: "fallback-aisecops-3",
      title: "LLM security in production - what's your monitoring setup?",
      excerpt: "We're deploying LLMs and need to detect prompt injection attacks...",
      score: 98,
      comments: 72,
      url: "https://reddit.com/r/MachineLearning/comments/example10",
      subreddit: "MachineLearning",
      age: "1w ago",
      topComment: {
        body: "Three layers: input filtering before the LLM, output filtering after, and anomaly detection on usage patterns. Log everything. We caught a prompt injection attempt through unusual token patterns in monitoring.",
        score: 56,
        author: "mlops_security",
      },
    },
  ],
};

async function redditFetch(url: string) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!response.ok) throw new Error(`Reddit API error: ${response.status}`);
  return response.json();
}

function getRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) return `${hours}h ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get("topic") || "cra";
  const limit = Math.min(
    parseInt(request.nextUrl.searchParams.get("limit") || "3"),
    10
  );

  const queries = TOPIC_QUERIES[topic];
  if (!queries) {
    return NextResponse.json(
      { error: "Invalid topic" },
      { status: 400 }
    );
  }

  try {
    const posts: CommunityPost[] = [];
    const seenIds = new Set<string>();

    // Search multiple subreddits
    const subreddits = ["cybersecurity", "devsecops", "netsec"];

    for (const subreddit of subreddits) {
      for (const query of queries.slice(0, 2)) { // Limit queries to avoid rate limits
        const searchUrl = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=relevance&t=month&limit=5`;

        try {
          const data = await redditFetch(searchUrl);

          for (const child of data.data.children) {
            const post: RedditPost = child.data;

            // Skip duplicates, low-quality, or already seen
            if (
              seenIds.has(post.id) ||
              post.score < 5 ||
              post.num_comments < 2
            ) {
              continue;
            }
            seenIds.add(post.id);

            // Fetch top comment
            let topComment;
            try {
              const commentsUrl = `https://www.reddit.com${post.permalink}.json?limit=1`;
              const commentsData = await redditFetch(commentsUrl);
              const comments = commentsData[1]?.data?.children || [];

              if (comments.length > 0 && comments[0].data.body) {
                const c = comments[0].data;
                topComment = {
                  body: c.body.substring(0, 200),
                  score: c.score,
                  author: c.author,
                };
              }
            } catch {
              // Skip comment fetch errors
            }

            posts.push({
              id: post.id,
              title: post.title,
              excerpt: post.selftext?.substring(0, 150) || "",
              score: post.score,
              comments: post.num_comments,
              url: `https://reddit.com${post.permalink}`,
              subreddit: post.subreddit,
              age: getRelativeTime(post.created_utc),
              topComment,
            });

            if (posts.length >= limit * 2) break;
          }
        } catch {
          // Skip failed searches
        }

        if (posts.length >= limit * 2) break;
      }
      if (posts.length >= limit * 2) break;
    }

    // Sort by engagement and return top N
    const sorted = posts
      .sort((a, b) => (b.score + b.comments * 2) - (a.score + a.comments * 2))
      .slice(0, limit);

    // If no posts found, use fallback data
    if (sorted.length === 0 && FALLBACK_POSTS[topic]) {
      return NextResponse.json({
        topic,
        posts: FALLBACK_POSTS[topic].slice(0, limit),
        cached: true,
        fallback: true,
      });
    }

    return NextResponse.json({
      topic,
      posts: sorted,
      cached: true,
    });
  } catch (error) {
    console.error("Community pulse error:", error);

    // Return fallback data on error
    if (FALLBACK_POSTS[topic]) {
      return NextResponse.json({
        topic,
        posts: FALLBACK_POSTS[topic].slice(0, limit),
        cached: true,
        fallback: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch community discussions" },
      { status: 500 }
    );
  }
}
