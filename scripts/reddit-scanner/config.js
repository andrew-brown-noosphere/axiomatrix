// Reddit Scanner Configuration

export const SUBREDDITS = [
  'cybersecurity',
  'devsecops',
  'netsec',
  'sysadmin',
  'devops',
  'programming',
];

export const TOPICS = {
  cra: {
    keywords: ['cyber resilience act', 'CRA compliance', 'CRA regulation', 'EU CRA', 'CRA requirements'],
    blogSlugs: ['eu-cyber-resilience-act-draft-guidance-what-it-means'],
  },
  aiAct: {
    keywords: ['AI act', 'EU AI act', 'AI regulation', 'AI compliance', 'artificial intelligence act'],
    blogSlugs: ['eu-ai-act-ciso-compliance-briefing'],
  },
  sbom: {
    keywords: ['SBOM', 'software bill of materials', 'dependency tracking', 'supply chain security'],
    blogSlugs: ['eu-cyber-resilience-act-draft-guidance-what-it-means'],
  },
  codeSigning: {
    keywords: ['code signing', 'software signing', 'binary signing', 'artifact signing', 'SignPath'],
    blogSlugs: [],
  },
  devsecops: {
    keywords: ['DevSecOps', 'shift left security', 'security automation', 'pipeline security', 'SAST', 'DAST'],
    blogSlugs: ['managing-devsecops-team-ai-era'],
  },
  aiSecurity: {
    keywords: ['AI security', 'LLM security', 'prompt injection', 'AI agents security', 'agentic security'],
    blogSlugs: ['ai-coding-assistants-security-guide'],
  },
};

export const SCORING = {
  minUpvotes: 5,
  minComments: 2,
  maxAgeDays: 30,
  relevanceThreshold: 0.6,
};
