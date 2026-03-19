#!/usr/bin/env node

/**
 * Quick test - just scan one subreddit for CRA posts
 */

const USER_AGENT = 'AxioMatrix:CommunityPulse:1.0';

async function redditFetch(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!response.ok) throw new Error(`Reddit API error: ${response.status}`);
  return response.json();
}

async function main() {
  console.log('Testing Reddit API...\n');

  // Search for CRA posts in r/cybersecurity
  const url = 'https://www.reddit.com/r/cybersecurity/search.json?q=cyber+resilience+act&restrict_sr=1&sort=relevance&t=month&limit=5';
  const data = await redditFetch(url);

  console.log(`Found ${data.data.children.length} posts:\n`);

  for (const child of data.data.children) {
    const post = child.data;
    console.log(`📝 ${post.title}`);
    console.log(`   ⬆️ ${post.score} | 💬 ${post.num_comments} | r/${post.subreddit}`);
    console.log(`   🔗 https://reddit.com${post.permalink}\n`);

    // Get top comment
    const commentsUrl = `https://www.reddit.com${post.permalink}.json?limit=3`;
    const commentsData = await redditFetch(commentsUrl);
    const comments = commentsData[1]?.data?.children || [];

    if (comments.length > 0 && comments[0].data.body) {
      const topComment = comments[0].data;
      console.log(`   💬 Top comment (${topComment.score}⬆️):`);
      console.log(`   "${topComment.body.substring(0, 200)}..."\n`);
    }

    await new Promise(r => setTimeout(r, 1000)); // Rate limit
  }
}

main().catch(console.error);
