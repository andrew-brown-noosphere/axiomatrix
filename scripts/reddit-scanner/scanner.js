#!/usr/bin/env node

/**
 * Reddit Scanner for Community Pulse
 * Scans subreddits for relevant discussions to surface in blog posts
 * Uses Reddit's public JSON API (no auth required for public subreddits)
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { SUBREDDITS, TOPICS, SCORING } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Reddit public API helper (no auth needed for read-only public data)
const USER_AGENT = 'AxioMatrix:CommunityPulse:1.0 (by /u/voyant_io)';

async function redditFetch(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!response.ok) throw new Error(`Reddit API error: ${response.status}`);
  return response.json();
}

// Initialize Anthropic for relevance scoring
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function searchSubreddit(subreddit, keywords, limit = 25) {
  const posts = [];

  for (const keyword of keywords) {
    try {
      const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keyword)}&restrict_sr=1&sort=relevance&t=month&limit=${limit}`;
      const data = await redditFetch(url);

      for (const child of data.data.children) {
        const post = child.data;
        const ageInDays = (Date.now() - post.created_utc * 1000) / (1000 * 60 * 60 * 24);

        if (
          post.score >= SCORING.minUpvotes &&
          post.num_comments >= SCORING.minComments &&
          ageInDays <= SCORING.maxAgeDays
        ) {
          posts.push({
            id: post.id,
            subreddit: post.subreddit,
            title: post.title,
            selftext: post.selftext?.substring(0, 1000) || '',
            score: post.score,
            numComments: post.num_comments,
            url: `https://reddit.com${post.permalink}`,
            created: new Date(post.created_utc * 1000).toISOString(),
            author: post.author,
            matchedKeyword: keyword,
          });
        }
      }

      // Rate limiting - Reddit asks for 1 req/sec
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.error(`Error searching ${subreddit} for "${keyword}":`, error.message);
    }
  }

  // Deduplicate by ID
  const unique = [...new Map(posts.map(p => [p.id, p])).values()];
  return unique;
}

async function getTopComments(postUrl, limit = 5) {
  try {
    // Convert permalink to JSON endpoint
    const jsonUrl = `https://www.reddit.com${postUrl.replace('https://reddit.com', '')}.json?limit=${limit}`;
    const data = await redditFetch(jsonUrl);

    // Comments are in the second element of the response array
    const commentsData = data[1]?.data?.children || [];
    const comments = commentsData
      .filter(c => c.kind === 't1' && c.data.score >= 3 && c.data.body && c.data.body.length > 50)
      .sort((a, b) => b.data.score - a.data.score)
      .slice(0, limit)
      .map(c => ({
        body: c.data.body.substring(0, 500),
        score: c.data.score,
        author: c.data.author || '[deleted]',
      }));

    await new Promise(r => setTimeout(r, 1000)); // Rate limit
    return comments;
  } catch (error) {
    console.error(`Error fetching comments:`, error.message);
    return [];
  }
}

async function scoreRelevance(post, topic, comments) {
  if (!process.env.ANTHROPIC_API_KEY) {
    // Fallback scoring without AI
    return {
      relevanceScore: 0.7,
      bestQuote: comments[0]?.body || post.selftext.substring(0, 200),
      summary: post.title,
    };
  }

  const prompt = `You're analyzing a Reddit post for relevance to ${topic} (cybersecurity/DevSecOps topic).

POST TITLE: ${post.title}

POST CONTENT: ${post.selftext.substring(0, 500)}

TOP COMMENTS:
${comments.map((c, i) => `${i + 1}. ${c.body}`).join('\n\n')}

Respond in JSON:
{
  "relevanceScore": 0.0-1.0 (how relevant to ${topic}),
  "bestQuote": "the single most insightful quote from comments or post (50-150 chars)",
  "sentiment": "positive|negative|neutral|mixed",
  "summary": "one sentence summary of the key insight"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error scoring relevance:', error.message);
  }

  return {
    relevanceScore: 0.5,
    bestQuote: comments[0]?.body?.substring(0, 150) || post.title,
    summary: post.title,
  };
}

async function scanAll() {
  console.log('🔍 Starting Reddit scan...\n');

  const results = {};

  for (const [topicId, topicConfig] of Object.entries(TOPICS)) {
    console.log(`\n📌 Scanning for topic: ${topicId}`);
    results[topicId] = [];

    for (const subreddit of SUBREDDITS) {
      console.log(`  → r/${subreddit}...`);

      const posts = await searchSubreddit(subreddit, topicConfig.keywords, 10);
      console.log(`    Found ${posts.length} posts`);

      for (const post of posts.slice(0, 3)) { // Top 3 per subreddit per topic
        const comments = await getTopComments(post.url, 5);
        const analysis = await scoreRelevance(post, topicId, comments);

        if (analysis.relevanceScore >= SCORING.relevanceThreshold) {
          results[topicId].push({
            ...post,
            comments: comments.slice(0, 3),
            analysis,
          });
        }
      }
    }

    // Sort by score * relevance
    results[topicId].sort((a, b) =>
      (b.score * b.analysis.relevanceScore) - (a.score * a.analysis.relevanceScore)
    );

    console.log(`  ✓ ${results[topicId].length} relevant posts for ${topicId}`);
  }

  return results;
}

async function main() {
  const results = await scanAll();

  // Save results
  const outputPath = path.join(__dirname, 'community-pulse.json');
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Results saved to ${outputPath}`);

  // Print summary
  console.log('\n📊 Summary:');
  for (const [topic, posts] of Object.entries(results)) {
    console.log(`  ${topic}: ${posts.length} posts`);
    if (posts[0]) {
      console.log(`    Top: "${posts[0].analysis.bestQuote?.substring(0, 60)}..."`);
    }
  }
}

main().catch(console.error);
