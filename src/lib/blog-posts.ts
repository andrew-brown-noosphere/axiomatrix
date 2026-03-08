export interface Author {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const authors: Record<string, Author> = {
  edward: {
    id: "edward",
    name: "Edward Liebig",
    role: "CTO",
    image: "/img/people/edward.png",
    bio: "A seasoned cybersecurity technology leader focused on delivering resilient, business-aligned security capabilities.",
  },
  dmitrii: {
    id: "dmitrii",
    name: "Dmitrii Lomakin",
    role: "Head of Sales",
    image: "/img/people/dmitrii.png",
    bio: "An experienced application security sales professional focused on delivering measurable security and business value.",
  },
  igor: {
    id: "igor",
    name: "Igor Matlin",
    role: "Application Security Architect",
    image: "/img/people/igor.png",
    bio: "A results-driven application security architect focused on strengthening application defenses and aligning security with business priorities.",
  },
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  authorId: string;
  image?: string;
  content: string;
  augmented?: boolean; // Enable AI assistant + Clarify buttons
}

export const blogPosts: BlogPost[] = [
  {
    slug: "eu-ai-act-ciso-compliance-briefing",
    title: "The EU AI Act: A CISO's Compliance Briefing",
    description: "The first AI Act obligations are already in effect. Your organization may be out of compliance right now. Here's what security leaders need to know.",
    category: "Compliance",
    date: "March 6, 2026",
    authorId: "igor",
    image: "/img/blog_images/4.jpg",
    augmented: true,
    content: `
The EU AI Act isn't coming. It's here.

As of February 2025, the first obligations are already enforceable. If your organization uses AI systems that touch EU citizens — and most do — you may already be out of compliance without knowing it.

This isn't a future planning exercise. This is catch-up.

<div class="text-center my-6"><a href="/ai-act-assessment" class="btn-chrome-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg no-underline">Take the AI Act Readiness Assessment →</a></div>

## Are You Even in Scope?

The first question every CISO needs to answer: does this regulation apply to us?

The short answer: probably yes.

### Extraterritorial Reach

The AI Act applies to:

- Organizations established in the EU
- Organizations outside the EU if their AI systems are used in the EU
- Organizations whose AI system outputs are used in the EU

If you have EU customers, EU employees, or EU operations — you're in scope. US companies can't ignore this.

### Provider vs. Deployer

The AI Act distinguishes between two primary roles:

**Providers** develop AI systems or have them developed and place them on the market under their own name. They bear the heaviest compliance burden: conformity assessments, technical documentation, quality management systems, and post-market monitoring.

**Deployers** use AI systems under their authority. Most enterprises fall into this category when using third-party AI tools. Deployer obligations are lighter but still significant: human oversight, monitoring, log retention, and fundamental rights impact assessments.

**Critical distinction:** If you modify a third-party AI system substantially, put your name on it, or change its intended purpose to something high-risk — you become a provider. The compliance burden shifts to you.

### When Deployers Become Providers

You're reclassified as a provider if you:

- Put your name or trademark on an AI system already on the market
- Make substantial modifications that affect safety or compliance
- Modify the system's intended purpose in a way that makes it high-risk

That custom fine-tuning of an LLM for your specific use case? It might have just made you a provider.

## What's Already Required

Here's what should concern you: two major obligations are already enforceable.

### AI Literacy (Article 4) — Effective February 2025

The AI Act requires that staff dealing with AI systems have "sufficient AI literacy." This applies to everyone — providers and deployers alike.

What this means practically:

- Anyone operating, overseeing, or making decisions based on AI systems needs training
- Training must be tailored to their role, technical background, and the specific AI systems they use
- You need to document that training has occurred

There's no certification requirement, but there's liability exposure. If untrained staff cause harm through AI misuse, you have a compliance problem.

**CISO action:** Audit who in your organization uses AI systems. Implement role-appropriate AI literacy training. Document everything.

### Prohibited Practices (Article 5) — Effective February 2025

Eight categories of AI are completely banned. Violations carry penalties up to €35 million or 7% of global annual turnover.

**Prohibited AI practices include:**

1. **Manipulative AI** — Systems using subliminal techniques or exploiting vulnerabilities to distort behavior
2. **Social scoring** — Evaluating people based on social behavior or personality traits for detrimental treatment
3. **Criminal risk prediction** — Predicting individual crime risk based solely on profiling or personality traits
4. **Facial recognition database scraping** — Creating databases by untargeted scraping of facial images
5. **Emotion recognition in workplace/schools** — Inferring emotions in employment or educational contexts (with narrow exceptions)
6. **Biometric categorization** — Categorizing individuals by race, political opinions, religious beliefs, or sexual orientation
7. **Real-time remote biometric identification** — In public spaces for law enforcement (with limited exceptions)
8. **Predictive policing** — Risk assessments for offending based solely on profiling

**CISO action:** Audit your AI inventory. If anything resembles these categories, stop using it immediately. The penalties are not theoretical — they're enforceable now.

## The Risk Classification System

The AI Act uses a risk-based approach. Your compliance obligations depend on how your AI systems are classified.

### Unacceptable Risk (Prohibited)

The eight practices above. Simply banned. No compliance path — just don't do them.

### High-Risk AI Systems

These require full compliance: conformity assessment, CE marking, technical documentation, human oversight, and ongoing monitoring.

High-risk categories include:

**Critical infrastructure:** AI managing electricity, gas, water, or heating systems

**Education:** AI determining access to education or assessing students

**Employment:** AI used in recruitment, hiring, performance evaluation, or termination decisions

**Essential services:** AI affecting access to credit, insurance, or public benefits

**Law enforcement:** AI used for risk assessment, polygraphs, or evidence analysis

**Migration/asylum:** AI used in border control or visa processing

**Justice:** AI assisting judicial decisions

If you're using AI for hiring decisions, loan approvals, or performance reviews — that's high-risk. The obligations are substantial.

### Limited Risk

AI systems with transparency obligations. Users must know they're interacting with AI. This includes:

- Chatbots
- AI-generated content (text, audio, video)
- Emotion recognition systems (where not prohibited)
- Biometric categorization (where not prohibited)

### Minimal Risk

Most AI applications. No specific regulatory requirements, but general AI literacy obligations still apply.

## What's Coming

<div class="my-8 relative">
  <div class="absolute left-[22px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500/50 via-cyan-500/50 to-purple-500/50"></div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-green-400 text-sm font-medium">February 2, 2025</div>
      <div class="text-white font-semibold">Prohibited practices & AI literacy</div>
      <div class="text-zinc-500 text-sm">Already in effect — enforcement active</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-green-400 text-sm font-medium">August 2, 2025</div>
      <div class="text-white font-semibold">GPAI model obligations</div>
      <div class="text-zinc-500 text-sm">Rules for general-purpose AI models now active</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex items-center justify-center flex-shrink-0 ring-4 ring-amber-500/20">
      <div class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
    </div>
    <div class="pt-2">
      <div class="text-amber-400 text-sm font-bold">August 2, 2026</div>
      <div class="text-white font-semibold">High-risk AI system compliance</div>
      <div class="text-amber-400/80 text-sm font-medium">5 months away — primary deadline</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4">
    <div class="relative z-10 w-11 h-11 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-purple-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-purple-400 text-sm font-medium">August 2, 2027</div>
      <div class="text-white font-semibold">Full obligations for embedded high-risk AI</div>
      <div class="text-zinc-500 text-sm">Extended deadline for certain product categories</div>
    </div>
  </div>
</div>

The August 2026 deadline is the critical one for most enterprises. That's when high-risk AI system requirements become fully enforceable.

## What Falls Under the CISO's Remit

This is where it gets relevant for security leaders specifically.

### Cybersecurity Requirements

The AI Act explicitly requires appropriate levels of cybersecurity for high-risk AI systems. Article 15 mandates:

- Resilience against unauthorized access
- Protection against manipulation of training data
- Logging to enable traceability
- Design for graceful degradation

This isn't just IT's problem. If AI system security fails, compliance fails with it.

### Log Retention

High-risk AI systems must automatically generate logs. Deployers must keep these logs for at least six months.

This has direct implications for your data retention policies, storage infrastructure, and incident response capabilities.

### Human Oversight

High-risk AI systems require human oversight by individuals who:

- Understand the system's capabilities and limitations
- Can correctly interpret outputs
- Can decide not to use the system or override decisions
- Have authority to intervene or stop the system

Someone in your organization needs to be designated and trained for this role.

### Incident Reporting

Providers must report serious incidents involving high-risk AI systems to market surveillance authorities. The timeline and format are similar to other breach notification requirements.

For deployers, if an AI system causes or contributes to a security incident, you need processes to:

- Detect AI-related issues
- Notify the provider
- Document what happened
- Cooperate with investigations

### Fundamental Rights Impact Assessments

Deployers of high-risk AI systems in certain contexts must conduct fundamental rights impact assessments (FRIAs) before deployment. This includes:

- Public sector deployers
- Private entities providing essential services
- Banking, insurance, and credit assessment uses

If you're using AI for decisions that affect people's access to services, employment, or legal status — you need an FRIA.

### Vendor Due Diligence

When procuring AI systems, you need to verify:

- Is the vendor a registered provider?
- Is the system CE marked (for high-risk systems)?
- Has conformity assessment been completed?
- Are proper instructions for use available?
- What are the vendor's obligations vs. yours?

Your vendor contracts should explicitly address AI Act compliance, including allocation of responsibilities between provider and deployer.

<div class="text-center my-6"><a href="/ai-act-assessment" class="btn-chrome-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg no-underline">Assess your AI Act readiness in 5 minutes →</a></div>

## Action Items for CISOs

### Immediate (This Week)

1. **Inventory your AI systems** — What AI is in use across your organization? Include shadow AI that teams may have adopted without formal approval.

2. **Classify by risk level** — Map each system to the AI Act risk categories. Flag anything that looks high-risk or potentially prohibited.

3. **Audit prohibited practices** — Review the eight prohibited categories. If anything comes close, escalate immediately.

4. **Check AI literacy** — Who uses AI? Are they trained? Document current state.

### Short-Term (30 Days)

1. **Provider vs. Deployer analysis** — For each AI system, determine your role. Have legal review any ambiguous cases.

2. **Gap analysis** — Compare current practices against AI Act requirements for your role and risk level.

3. **Vendor review** — Request AI Act compliance documentation from vendors. Update procurement criteria.

4. **Training program** — Implement AI literacy training. Start with high-risk system operators.

### Medium-Term (Before August 2026)

1. **Human oversight** — Designate and train human oversight personnel for high-risk systems.

2. **Logging infrastructure** — Ensure you can capture and retain AI system logs for required periods.

3. **Incident response** — Update playbooks to address AI-related incidents.

4. **Impact assessments** — Complete fundamental rights impact assessments where required.

5. **Documentation** — Ensure technical documentation, instructions for use, and conformity evidence are available for all high-risk systems.

## The Board Conversation

Your board will ask about the EU AI Act. Here's your positioning:

"The EU AI Act is the world's first comprehensive AI regulation. It carries penalties up to €35 million or 7% of global turnover. The first obligations are already in effect, with the primary compliance deadline in August 2026.

We've inventoried our AI systems and classified them by risk. [X systems] are high-risk and require full compliance. We've confirmed we're not using any prohibited AI practices. We're implementing AI literacy training and have a roadmap to full compliance before the deadline.

Our primary exposure is [specific area]. We need [specific resources] to address this."

Concrete. Specific. No panic, but no complacency.

## The Bottom Line

The EU AI Act is real, it's enforceable, and the clock is running. Unlike GDPR, which gave organizations time to prepare before enforcement, some AI Act obligations are already active.

For CISOs, this means:

- You have immediate compliance exposure (prohibited practices, AI literacy)
- You have a defined deadline for comprehensive compliance (August 2026)
- You have specific security obligations (cybersecurity, logging, oversight)
- You have due diligence responsibilities for AI procurement

The organizations that take this seriously now will be ready. The ones that wait will be scrambling.

---

## Assess Your AI Act Readiness

Discover where your organization stands with EU AI Act compliance. Take our free AI Act Readiness Assessment to evaluate your current state across key areas: AI inventory, risk classification, prohibited practices, governance, and technical requirements.

<div class="text-center my-6"><a href="/ai-act-assessment" class="btn-chrome-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg no-underline">Take the AI Act Assessment →</a></div>

You'll get an instant readiness score and can download a PDF report with tailored recommendations.

---

**Sources:**
- [EU AI Act Official Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689)
- [European Commission AI Act Overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [AI Act Article 5: Prohibited Practices](https://artificialintelligenceact.eu/article/5/)
- [AI Act Article 4: AI Literacy](https://artificialintelligenceact.eu/article/4/)
- [High-Risk AI System Requirements](https://artificialintelligenceact.eu/high-level-summary/)
`,
  },
  {
    slug: "agent-security",
    title: "The Agentic Control Plane: Zero Trust for Autonomous AI Systems",
    description: "Your AI agents have access to your most sensitive data and operate inside your network. Traditional perimeter security doesn't work here. Here's what does.",
    category: "AI Security",
    date: "March 5, 2026",
    authorId: "edward",
    image: "/img/blog_images/3.jpg",
    augmented: true,
    content: `
Your organization is deploying AI agents. They're automating workflows, answering customer questions, processing documents, and making decisions. They're also the biggest insider threat you've never planned for.

This isn't a technical problem for your engineering team to solve alone. It's an organizational challenge that requires new thinking about teams, governance, and how work gets done.

## What's Different About Agents

Traditional software does what it's told. An API receives a request, processes it, returns a response. Predictable. Auditable. Contained.

Agents are different. They reason. They decide. They act autonomously. And to do any of that usefully, they need access to your data — your documents, your customer records, your internal systems.

**This is the trade-off every leader needs to understand:** The more capable your agents, the more access they require. The more access they have, the greater the risk if they're compromised or manipulated.

Your firewall doesn't help here. Your agents are already inside.

## The Agentic Control Plane

The solution isn't to avoid agents — that ship has sailed. The solution is governance infrastructure purpose-built for autonomous systems. We call this the **agentic control plane**.

Think of it as the management layer that sits between your agents and your data. It enforces:

- **Who can access what** — not at the human level, but at the agent level
- **What actions are permitted** — and which require human approval
- **How decisions are audited** — so you can reconstruct what happened
- **Where the boundaries are** — so a compromised agent can't access everything

Without this layer, you're trusting that your agents will behave. That's not a security strategy.

## What This Means for Your Organization

### You Need New Roles

Most security teams aren't staffed for agent governance. You likely need:

**Agent Security Architect** — Someone who understands both AI systems and security architecture. They design the control plane, define access boundaries, and establish the rules agents operate under.

**AI Operations Lead** — Agents need monitoring, maintenance, and incident response just like any production system. This role owns the day-to-day health of your agent infrastructure.

**Governance & Compliance Owner** — As regulations catch up to AI (and they are — see the EU AI Act, upcoming SEC guidance), you need someone ensuring your agent deployments are compliant.

These might be new hires or expanded responsibilities for existing team members. But the work needs to get done.

### Your Workflows Need Guardrails

Not every agent action should be autonomous. You need a framework for deciding:

**Tier 1: Fully Autonomous** — Low-risk, reversible actions. Answering FAQs. Summarizing documents. Scheduling meetings.

**Tier 2: Supervised Autonomy** — Medium-risk actions that proceed unless flagged. Processing standard requests. Updating non-sensitive records.

**Tier 3: Human-in-the-Loop** — High-risk actions that require approval. Accessing sensitive data. Taking actions with financial impact. Communicating externally on behalf of the company.

**Tier 4: Human-Only** — Actions agents should never take. Modifying access controls. Deleting records. Overriding security policies.

Map your agent use cases to these tiers. Build the approval workflows before you deploy.

### Your Data Strategy Needs Segmentation

Agents don't need access to everything. But by default, most organizations give them broad access because it's easier to configure.

This is how breaches happen.

Implement data segmentation for your AI systems:

- **By sensitivity** — Public information, internal docs, confidential records, and regulated data should have different access controls
- **By department** — Sales agents don't need HR data. Support agents don't need financial projections
- **By use case** — An agent that answers customer questions doesn't need write access to your CRM

The principle of least privilege isn't new. Applying it to agents is.

## Building the Control Plane

Here's what mature agent governance looks like in practice:

### 1. Centralized Agent Registry

You need to know what agents exist, what they can access, and who's responsible for them. Shadow AI is already a problem — shadow agents will be worse.

Maintain a registry that tracks:
- Every deployed agent
- Its purpose and owner
- What data it can access
- What actions it can take
- When it was last reviewed

### 2. Policy-Based Access Control

Don't rely on individual API keys scattered across your infrastructure. Implement centralized policies that define:

- What data each agent can read
- What systems each agent can write to
- What conditions trigger additional approval
- What actions are blocked entirely

These policies should be version-controlled, auditable, and enforceable.

### 3. Real-Time Monitoring

You monitor your production systems. You monitor your network. You need to monitor your agents.

Track:
- What data agents are accessing
- What actions they're taking
- Anomalous patterns (sudden access to unusual data, high volume of actions)
- Failed attempts that might indicate compromise

Alert on deviations. Investigate promptly.

### 4. Incident Response Playbooks

When (not if) something goes wrong, you need a plan:

- How do you revoke an agent's access?
- How do you determine what data was exposed?
- How do you notify affected parties?
- How do you prevent recurrence?

Run tabletop exercises. Your team should know what to do before the incident happens.

## The Questions to Ask Your Team

If you're a leader responsible for AI initiatives, here's your checklist:

**Strategy**
- Do we have a clear policy on what agents can and cannot do?
- Who owns agent security in our organization?
- How does our agent strategy align with our risk tolerance?

**Implementation**
- Do we know how many agents are deployed and what they access?
- Are we applying least-privilege principles to agent access?
- Do we have tiered workflows for different risk levels?

**Operations**
- Are we monitoring agent behavior in real-time?
- Do we have incident response plans for agent compromise?
- Are we auditing agent actions for compliance?

**Governance**
- How are we tracking the evolving regulatory landscape?
- Are our agents documented for audit purposes?
- Do we have human oversight where required?

If you can't answer these questions, you have work to do.

## The Bottom Line

AI agents are powerful. They're also risky in ways traditional software isn't. The organizations that thrive will be the ones that deploy agents *with* governance, not the ones that bolt on security after an incident.

The agentic control plane isn't optional infrastructure. It's the foundation that makes autonomous AI safe enough to trust with your business.

Build the teams. Define the workflows. Implement the controls. Do it before you scale.

---

## Action Items for Leaders

1. **Audit your current state** — What agents exist? What can they access? Who owns them?
2. **Assign ownership** — Someone needs to be accountable for agent security
3. **Define your tiers** — Which actions are autonomous, supervised, or human-only?
4. **Segment your data** — Agents should only access what they need
5. **Build monitoring** — You can't secure what you can't see
6. **Plan for incidents** — Have a playbook before you need it

---

## Further Reading

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [EU AI Act Overview](https://artificialintelligenceact.eu/)
`,
  },
  {
    slug: "owasp-top-10-2025-supply-chain-failures-developers-are-the-target",
    title: "OWASP Top 10 2025: A03 Supply Chain Failures — You Are the Attack Surface",
    description: "OWASP just made it official: software supply chain attacks are now a top-3 threat. But here's what they're really saying — attackers aren't just targeting your dependencies. They're targeting you.",
    category: "Security",
    date: "March 5, 2026",
    authorId: "edward",
    image: "/img/blog_images/5.jpg",
    augmented: true,
    content: `
The OWASP Top 10 for 2025 is out, and there's a new category that should make every developer uncomfortable: **A03:2025 - Software Supply Chain Failures**.

This isn't just "update your dependencies." OWASP is saying something bigger: **the entire way we build software is now an attack surface.**

And the scariest part? The primary target isn't your servers. It's you.

## What Changed

The old "Using Components with Known Vulnerabilities" category has been completely reworked. It now covers:

- Compromised build systems and CI/CD pipelines
- Malicious dependencies (not just vulnerable ones)
- Hijacked developer accounts and stolen tokens
- Tampered artifacts and unsigned releases
- Attacks on IDEs and development tools

OWASP ranked this #1 in their community survey. Over 50% of practitioners said this is their top concern. They're not wrong.

## The Attacks Are Getting Creative

Let's talk about what's actually happening out there.

### The Shai-Hulud Worm (2025)

Named after the sandworms from Dune, this was the **first self-propagating npm worm**. It spread across 500+ package versions by:

1. Harvesting npm tokens from infected developer machines
2. Using those tokens to publish malicious versions of packages the developer maintained
3. Spreading to everyone who installed those packages
4. Repeating

One compromised developer laptop led to hundreds of compromised packages. The worm harvested credentials, API keys, and environment variables along the way.

### The Bybit Heist (2025)

A supply chain attack on wallet software stole **$1.5 billion** in a single operation. The clever part: the malicious code was *conditional*. It only activated for transactions above a certain threshold to specific wallet addresses.

Standard security scanning found nothing because the code looked normal until the exact conditions were met.

### SolarWinds (Still Relevant)

18,000 organizations compromised through a single vendor update. The attackers were inside the build system for months, carefully inserting backdoors that passed all security checks.

## Why Traditional Defenses Fail

Here's the uncomfortable truth: **most supply chain defenses are theater**.

### SBOMs Don't Save You

Yes, you need a Software Bill of Materials. But an SBOM just tells you what's in your software. It doesn't tell you:

- Whether those components were tampered with
- Whether your build system was compromised when you assembled them
- Whether the person who pushed that code was actually your developer

An SBOM without provenance is just inventory. Inventory doesn't stop theft.

### Vulnerability Scanning Has Limits

CVE databases are reactive. By the time a vulnerability gets a CVE number, attackers have often been exploiting it for months. And malicious packages aren't "vulnerable" — they're working exactly as the attacker intended.

### "Trusted Sources" Aren't

npm, PyPI, Maven Central — these are distribution platforms, not trust authorities. Anyone can publish. Typosquatting, dependency confusion, and account takeovers happen constantly.

## What Actually Works

Let's get practical. Here's what separates teams that get owned from teams that don't.

### 1. Treat Your Build System Like Production

Your CI/CD pipeline has access to:
- Source code
- Secrets and credentials
- Signing keys
- Production deployment permissions

Why is it running on a VM with 47 unpatched dependencies and shared credentials?

**Do this:**
- Harden CI/CD runners like you'd harden a production server
- Use ephemeral build environments that get destroyed after each build
- Implement least-privilege access — builds shouldn't have admin rights
- Enable MFA on everything that touches your pipeline

### 2. Sign Everything, Verify Everything

If you can't prove an artifact came from your build system and hasn't been modified, you can't trust it.

**Do this:**
- Sign your builds with keys stored in HSMs (not on developer laptops)
- Sign your commits (GPG or SSH signatures)
- Verify signatures before deployment — automated, no exceptions
- Use SLSA framework as your north star (Level 3 minimum for serious shops)

### 3. Lock Down Developer Environments

Your developers have tokens for npm, PyPI, GitHub, AWS, and probably a dozen other services. Their laptops are walking credential stores.

**Do this:**
- Require hardware security keys for critical accounts
- Use short-lived tokens instead of long-lived credentials
- Implement EDR on developer machines (yes, really)
- Audit who has publish rights to your packages

### 4. Monitor the Boring Stuff

Attackers don't announce themselves. They make small changes and wait.

**Watch for:**
- Unexpected changes to CI/CD configurations
- New maintainers added to dependencies
- Build scripts that download things at runtime
- Unusual patterns in your dependency update PRs

### 5. Assume Compromise, Plan Recovery

You will get hit eventually. The question is whether you can detect it and recover.

**Do this:**
- Maintain reproducible builds so you can verify past releases
- Keep tamper-evident logs of all build activities
- Practice incident response for supply chain scenarios
- Know how you'd revoke and re-key if your signing keys leaked

## The OWASP CWEs

For the compliance-minded, here are the CWEs mapped to A03:2025:

- **CWE-1035**: Using Components with Known Vulnerabilities
- **CWE-1104**: Use of Unmaintained Third Party Components
- **CWE-1329**: Reliance on Component That is Not Updateable
- **CWE-1357**: Reliance on Insufficiently Trustworthy Component
- **CWE-1395**: Dependency on Vulnerable Third-Party Component
- **CWE-447**: Use of Obsolete Function

## The Bottom Line

OWASP is telling us something important: the software supply chain isn't just your dependencies. It's your build system, your CI/CD, your developer machines, your package registries, your signing keys.

It's everything between "developer writes code" and "user runs software."

And increasingly, the weakest link in that chain is the developer themselves — not because they're incompetent, but because they're trusted. Attackers know that stealing a developer's npm token is often easier than finding a zero-day.

The question isn't whether supply chain attacks will continue. It's whether you'll detect them before your users do.

---

## Further Reading

- [OWASP A03:2025 - Software Supply Chain Failures](https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/)
- [SLSA Framework](https://slsa.dev/)
- [CISA Supply Chain Security Guidance](https://www.cisa.gov/supply-chain)
- [Sigstore Project](https://sigstore.dev/)
`,
  },
  {
    slug: "eu-cyber-resilience-act-draft-guidance-what-it-means",
    title: "EU Cyber Resilience Act: Draft Guidance Released — What It Means for Software Vendors",
    description: "The European Commission just published draft guidance for the CRA. Unlike voluntary frameworks, the CRA carries legal force — non-compliance means your products can't be sold in the EU market. Are you ready?",
    category: "Compliance",
    date: "March 5, 2026",
    authorId: "edward",
    image: "/img/blog_images/4.jpg",
    augmented: true,
    content: `
On March 3rd, the European Commission published draft guidance for the Cyber Resilience Act (CRA) — the most significant piece of cybersecurity regulation to hit software vendors since GDPR transformed data privacy.

If you build software that touches the EU market, this guidance is required reading. And you have until March 31st to provide feedback before it's finalized.

Here's what DevSecOps leaders need to understand.

<div class="text-center my-6"><a href="/cra-assessment" class="btn-chrome-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg no-underline">Take the CRA Readiness Assessment →</a></div>

## What Is the Cyber Resilience Act?

The CRA establishes mandatory cybersecurity requirements for all "products with digital elements" sold in the EU. This includes:

- Software applications
- Connected devices and IoT
- Hardware with embedded software
- Operating systems and firmware
- Cloud services with on-device components

The regulation entered force in December 2024, with the first compliance deadlines hitting in September 2026.

## Key Dates You Need to Know

<div class="my-8 relative">
  <div class="absolute left-[22px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500/50 via-cyan-500/50 to-amber-500/50"></div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-green-400 text-sm font-medium">December 10, 2024</div>
      <div class="text-white font-semibold">CRA entered into force</div>
      <div class="text-zinc-500 text-sm">Regulation officially active</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-cyan-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-cyan-400 text-sm font-medium">August 30, 2026</div>
      <div class="text-white font-semibold">Type A (horizontal) product compliance</div>
      <div class="text-zinc-500 text-sm">Default product category deadline</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex items-center justify-center flex-shrink-0 ring-4 ring-amber-500/20">
      <div class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
    </div>
    <div class="pt-2">
      <div class="text-amber-400 text-sm font-bold">September 11, 2026</div>
      <div class="text-white font-semibold">Vulnerability reporting requirements</div>
      <div class="text-amber-400/80 text-sm font-medium">Critical deadline — 6 months away</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4 pb-6">
    <div class="relative z-10 w-11 h-11 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-cyan-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-cyan-400 text-sm font-medium">October 30, 2026</div>
      <div class="text-white font-semibold">Type B/C product compliance</div>
      <div class="text-zinc-500 text-sm">Important & Critical product categories</div>
    </div>
  </div>

  <div class="relative flex items-start gap-4">
    <div class="relative z-10 w-11 h-11 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center flex-shrink-0">
      <div class="w-3 h-3 rounded-full bg-purple-400"></div>
    </div>
    <div class="pt-2">
      <div class="text-purple-400 text-sm font-medium">December 11, 2027</div>
      <div class="text-white font-semibold">Full obligations apply</div>
      <div class="text-zinc-500 text-sm">All CRA requirements in effect</div>
    </div>
  </div>
</div>

That September 2026 date is critical. In six months, you'll need to report actively exploited vulnerabilities via the EU's Single Reporting Platform.

## What the Draft Guidance Clarifies

The draft guidance focuses on areas where manufacturers needed clarification:

### Software "Placed on the Market"

The CRA applies to software "placed on the market in the course of a commercial activity." The guidance clarifies what this means:

- Commercial distribution clearly included
- SaaS with client-side components likely included
- Internal enterprise software typically excluded
- Free software distributed commercially is included

### Open Source Treatment

This was contentious. The guidance provides clearer rules for FOSS:

- Non-commercial open source development is generally exempt
- Open source "stewards" (foundations, maintainers) have limited obligations
- Commercial use of open source components creates obligations for the commercial entity
- If you monetize open source (support, hosting, commercial licenses), you're in scope

### Support Periods

Manufacturers must provide security updates for the "expected product lifetime" or minimum 5 years. The guidance clarifies:

- Support period must be clearly communicated at purchase
- Updates must be free for the support period
- End-of-support must be announced in advance
- Different product tiers can have different support periods

### Vulnerability Handling

The CRA mandates vulnerability disclosure and handling processes:

- Actively exploited vulnerabilities: notify within 24 hours
- Severe incidents: notify within 72 hours
- Coordinated disclosure processes required
- Customers must be notified of vulnerabilities and patches

## What This Means for DevSecOps

The CRA isn't just a compliance checkbox — it mandates capabilities that many organizations don't have:

### 1. Software Bill of Materials (SBOM)

The CRA requires identifying and documenting all components in your products. You need:

- Automated SBOM generation in your build pipeline
- Dependency tracking across all products
- Component provenance verification
- Update processes when vulnerabilities are discovered in components

**If you don't have SBOM generation automated today, start now.** Manual SBOM creation doesn't scale.

### 2. Secure Development Lifecycle

The regulation requires security throughout the development lifecycle:

- Security requirements at design phase
- Secure coding practices
- Security testing before release
- Vulnerability management post-release

This is SAMM/BSIMM maturity — but now it's legally required.

### 3. Vulnerability Disclosure Infrastructure

You need processes to:

- Receive vulnerability reports (from researchers, customers, CSIRTs)
- Triage and assess vulnerabilities
- Develop and test patches
- Notify affected customers
- Report to EU authorities when required

The 24-hour notification requirement for actively exploited vulnerabilities means you need near-real-time detection and response capability.

### 4. Supply Chain Security

The CRA holds manufacturers responsible for third-party components:

- You must assess component security before use
- You must monitor components for vulnerabilities
- You must update or replace vulnerable components
- Component suppliers must meet equivalent requirements

Your suppliers' security posture is now your compliance problem.

## The Build Pipeline Implications

Reading between the lines, the CRA effectively mandates:

**Signed artifacts.** You need to prove that the software you ship is the software you built. Code signing and build attestation become compliance requirements, not nice-to-haves.

**Reproducible builds.** If you can't reproduce a build, you can't verify it wasn't tampered with. SLSA Level 3+ is the direction of travel.

**Audit trails.** You need evidence of security activities throughout the development process. Manual documentation won't scale — you need automated attestation.

**Patch velocity.** The vulnerability notification timelines mean you need to be able to ship security patches quickly. If your release process takes weeks, you have a compliance problem.

<div class="text-center my-6"><a href="/cra-assessment" class="btn-chrome-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg no-underline">Assess your CRA readiness in 5 minutes →</a></div>

## How to Prepare

### Immediate (Before March 31)

1. **Read the draft guidance** — It's available on the European Commission's "Have Your Say" portal
2. **Provide feedback** — If something will create problems for your organization, say so now
3. **Inventory your products** — Determine which of your products are in scope

### Short-term (Q2 2026)

1. **Gap analysis** — Compare your current practices to CRA requirements
2. **SBOM implementation** — If you don't have automated SBOM generation, prioritize this
3. **Vulnerability process** — Ensure you can meet the notification timelines

### Medium-term (Before September 2026)

1. **Reporting infrastructure** — Register for the Single Reporting Platform
2. **Build pipeline hardening** — Implement signing, attestation, and audit trails
3. **Supplier assessment** — Evaluate third-party component security

## The Competitive Angle

Here's the thing: while many companies are viewing the CRA as a compliance burden, forward-thinking organizations see it differently.

CRA compliance requirements — SBOMs, signed builds, vulnerability management, supply chain security — are things you should be doing anyway. The regulation is forcing baseline security hygiene that reduces actual risk.

Organizations that treat CRA as a catalyst for security improvement will:

- Have better security posture
- Ship more reliable software
- Build customer trust
- Compete effectively in the EU market

Those that treat it as checkbox compliance will struggle with both security and compliance.

## The Open Question

The CRA is ambitious. It's attempting to regulate software security across an entire market. Some questions remain:

- How will enforcement actually work?
- What happens when US or Asian companies don't comply?
- How will open source ecosystems adapt?
- Will the vulnerability reporting create disclosure risks?

The draft guidance helps, but implementation will reveal new challenges.

## Next Steps

1. Download and read the draft guidance
2. Assess your current readiness against CRA requirements
3. Provide feedback to the Commission before March 31
4. Start building the capabilities you'll need

The CRA is coming. The organizations that prepare now will be ready. Those that wait will be scrambling.

---

## Assess Your CRA Readiness

Discover where your organization stands with CRA. Take our free CRA Compliance Assessment to evaluate your readiness across all six key areas: governance, secure development, vulnerability management, supply chain security, incident reporting, and conformity assessment.

<div class="text-center my-6"><a href="/cra-assessment" class="btn-chrome-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg no-underline">Take the CRA Assessment →</a></div>

You'll get an instant readiness score and can download a PDF report with tailored recommendations.

---

**Resources:**
- Draft guidance: EU Commission "Have Your Say" Portal
- CRA implementation timeline: digital-strategy.ec.europa.eu
- SBOM guidance: CISA SBOM resources
- SLSA framework: slsa.dev

`,
  },
  {
    slug: "5-things-cisos-need-to-know-ai-security",
    title: "5 Things CISOs Need to Know About AI in the Development Pipeline",
    description: "AI coding assistants are already in your pipeline. Here's what security leaders need to understand before the next board meeting.",
    category: "CISO",
    date: "March 3, 2026",
    authorId: "dmitrii",
    image: "/img/blog_images/1.jpg",
    content: `
I was on a call last week with a CISO who told me: "We have a policy against AI in our development environment."

I asked: "How many of your developers have GitHub Copilot installed?"

Long pause. "I don't actually know."

This is the reality for most security leaders right now. AI isn't coming to your pipeline — it's already there. The question isn't whether to allow it. The question is whether you're governing what's already happening.

Here are five things every CISO needs to understand about AI in the development environment.

## 1. Your Developers Are Already Using AI

Every developer survey tells the same story: 70%+ of developers are using AI coding assistants. Many are using personal accounts, browser extensions, or tools that don't show up in your software inventory.

This isn't malicious shadow IT. Developers use these tools because they're genuinely productive. A developer who can write code 40% faster isn't going to stop because of a policy memo.

**The leadership question:** Do you have visibility into which AI tools are actually in use across your development organization?

## 2. Traditional Security Controls Don't Apply

Your security program was built for human actors. Access reviews, approval workflows, security awareness training — all designed for people who can be held accountable and who make decisions at human speed.

AI agents don't fit this model. They suggest code in milliseconds. They don't attend training. They can't be interviewed during an incident investigation.

**The leadership question:** Have you audited which of your existing controls actually apply to AI-assisted development, and which are theater?

## 3. The Risk Profile Has Changed

When a developer makes a mistake, you have accountability. You can trace the commit, review the PR, understand the context.

When an AI suggests code and a developer accepts it, where does accountability sit? The developer clicked "accept" — but did they understand what they accepted? Did they review a 200-line suggestion line by line?

Supply chain attacks have a new vector: convince AI to suggest malicious code. Train models on poisoned data. Exploit the trust developers place in AI suggestions.

**The leadership question:** How does your risk register account for AI-assisted development? Is this a line item?

## 4. Governance Requires New Infrastructure

You can't govern AI with policies alone. "Review all AI suggestions carefully" is not an enforceable control.

Effective governance requires infrastructure:
- Policy engines that evaluate AI actions programmatically
- Signing and attestation that prove what happened
- Audit trails that capture AI-assisted decisions
- Guardrails that operate at machine speed

**The leadership question:** What infrastructure investments are needed to make AI governance real, not aspirational?

## 5. The Board Will Ask

If you haven't briefed your board on AI in the development pipeline, you will soon. They're reading the same headlines about AI risks that you are.

You need a position:
- Here's what AI is doing in our environment
- Here's how we're governing it
- Here's what we've decided to allow and not allow
- Here's our roadmap for improving governance

"We don't allow AI" isn't credible. "We're figuring it out" isn't reassuring. You need a story that acknowledges reality while demonstrating control.

**The leadership question:** What's your board-ready narrative on AI in development?

## The Bottom Line

AI in the development pipeline is a governance challenge, not a technology decision. The technology decisions were made by developers months ago.

Your job as a security leader is to bring governance to reality — to understand what's actually happening and build controls that work at machine speed while maintaining human oversight where it matters.

The CISOs who get this right will enable AI adoption while managing risk. The ones who don't will either block productivity or accept unmanaged exposure.

`,
  },
  {
    slug: "ai-threats-cicd-pipeline",
    title: "The New Attack Surface: AI Threats in Your CI/CD Pipeline",
    description: "Your CI/CD pipeline was built for human developers. Now it's being accessed by AI agents, creating attack vectors your security team hasn't considered.",
    category: "Risk",
    date: "March 1, 2026",
    authorId: "dmitrii",
    image: "/img/blog_images/2.jpg",
    content: `
Last quarter, a Fortune 500 company discovered that an AI coding assistant had been suggesting code that included a subtle vulnerability — a logging statement that exposed authentication tokens.

The vulnerability wasn't in the AI itself. It was in the training data. Someone had contributed code to an open source project that the AI learned from. Months later, that pattern was being suggested to developers across thousands of companies.

This is the new threat landscape: attacks that flow through AI, not around it.

## The Attack Surface You Haven't Mapped

Your threat model probably includes:
- Compromised developer credentials
- Malicious dependencies
- Build system vulnerabilities
- Container image tampering

But does it include:
- Poisoned AI training data
- Prompt injection in AI suggestions
- Automated code that bypasses review
- AI-assisted social engineering

These aren't theoretical. They're happening now.

## Three Vectors Security Leaders Need to Understand

### Vector 1: Training Data Poisoning

AI coding assistants learn from public code repositories. An attacker who contributes vulnerable code to popular open source projects is effectively training AI to suggest vulnerabilities.

The attack is patient — contribute code now, wait for it to be learned, then watch AI suggest it to developers worldwide.

**Your exposure:** Every AI coding tool your developers use is learning from data you don't control.

### Vector 2: Dependency Confusion at Machine Speed

Dependency confusion attacks trick developers into installing malicious packages by exploiting naming conventions. Human developers might catch obvious fakes. AI assistants have no intuition — they see package names as strings.

When an AI suggests "install this package," it's not evaluating reputation, download counts, or maintainer history. It's pattern matching.

**Your exposure:** AI-suggested dependencies are evaluated at machine speed with no human judgment.

### Vector 3: Automated Code at Human Review Pace

AI generates code faster than humans can review it. A developer using AI might produce 3-4x the volume of code they would manually.

Are your code review processes designed for this volume? Does your team actually review AI-generated code, or rubber-stamp it?

**Your exposure:** Review processes designed for human-paced development don't scale to AI-assisted development.

## What Risk Looks Different Now

Traditional software supply chain risk was about malicious actors inserting code into your pipeline. That still exists.

But AI adds a new dimension: **the pipeline itself is making decisions about what code to write.** The attack surface isn't just the code — it's the system that suggests code.

When you assess supply chain risk, you now need to include:
- Where do your AI tools get training data?
- Who can influence what patterns AI suggests?
- How do AI suggestions flow into production code?
- What's the blast radius of a poisoned AI model?

## Questions for Your Next Risk Committee

1. **Inventory:** Which AI coding tools are in use across development? (Including personal licenses and browser extensions)

2. **Data lineage:** Where does each tool's training data come from? What's the provenance of suggestions?

3. **Review effectiveness:** What percentage of AI-generated code receives meaningful human review? How do we know?

4. **Detection capability:** If an AI was suggesting vulnerable code, how would we detect it? How long before we'd notice?

5. **Response plan:** If we discovered a poisoned AI model in our pipeline, what's the remediation path?

## The Governance Imperative

You can't firewall AI out of development. The productivity benefits are too significant, and developers will find workarounds.

The answer is governance that works at AI speed:
- Automated policy enforcement on AI suggestions
- Signing and attestation for all artifacts
- Audit trails that capture AI involvement in code changes
- Guardrails that catch patterns human review misses

This isn't optional security enhancement. It's table stakes for organizations that want to use AI without accepting unmanaged risk.

`,
  },
  {
    slug: "managing-devsecops-team-ai-era",
    title: "Managing Your DevSecOps Team in the AI Era",
    description: "Your security team was hired to review code written by humans. Now they're reviewing code written by AI. Here's how the best security leaders are adapting.",
    category: "Leadership",
    date: "February 28, 2026",
    authorId: "edward",
    image: "/img/blog_images/3.jpg",
    content: `
I recently talked with a VP of Security who was frustrated: "My AppSec team is drowning. Code volume has doubled since developers started using AI assistants. We can't review everything, so we're either blocking releases or rubber-stamping. Neither is acceptable."

This is the new normal for security leaders. AI has changed the math on development velocity, but security team headcount hasn't changed. Something has to give.

Here's how the best security organizations are adapting.

## The Core Problem: Volume

Before AI: A typical developer writes 100-200 lines of production code per day. Your security team sized for this output.

After AI: The same developer might produce 400-600 lines per day. Some days much more. The code isn't worse — in many cases it's more consistent — but there's simply more of it.

Your security review capacity didn't double. Your SAST tool license didn't double. Your threat modeling bandwidth didn't double.

But code output did.

## What Doesn't Work

**Adding headcount proportionally** — You can't hire fast enough, and security talent is scarce anyway.

**Reviewing everything manually** — Mathematically impossible at current volumes.

**Blocking AI adoption** — Your developers will work around you, and leadership won't support blocking productivity tools.

**Trusting AI-generated code implicitly** — This is how vulnerabilities ship.

## What Works: Tiered Review

The best security organizations are moving to tiered review models:

**Tier 1: Automated gates (90% of code)**
- SAST/DAST automated scanning
- Dependency vulnerability checks
- Policy compliance verification
- Pattern-based detection

Code that passes automated gates proceeds without human review unless flagged.

**Tier 2: AI-assisted review (8% of code)**
- Security team uses AI to review AI-generated code
- Focus on architectural patterns, not line-by-line
- AI summarizes changes and highlights concerns
- Human makes final decision

**Tier 3: Deep manual review (2% of code)**
- Security-critical components
- Authentication, authorization, cryptography
- Changes flagged by automated gates
- New attack surface areas

This means accepting that most code won't get human eyes. That's uncomfortable — but it's honest about what's possible.

## Reskilling Your Team

Your security team's value proposition is changing.

**Less valuable:**
- Line-by-line code review
- Manual vulnerability hunting
- Repetitive compliance checking

**More valuable:**
- Defining policies that automated tools enforce
- Designing security architecture
- Threat modeling at the system level
- Evaluating and tuning security tools
- Incident response and forensics

The best security engineers are becoming force multipliers — building systems and policies that secure development at scale — rather than reviewers who look at individual changes.

## Metrics That Matter Now

Old metrics measured activity: PRs reviewed, vulnerabilities found, tickets closed.

New metrics should measure outcomes:
- **Mean time to detect** — How quickly do we catch issues?
- **Escape rate** — What percentage of vulnerabilities reach production?
- **Policy coverage** — What percentage of changes are evaluated against policy?
- **Automated gate effectiveness** — Are automated tools catching what they should?

If your automated gates are working, your team should be finding fewer vulnerabilities in manual review — because they're caught earlier. A team that's "finding fewer bugs" might actually be performing better.

## The Career Development Conversation

Some of your team members were hired for skills that are becoming less valuable. This requires honest conversations:

"Your job is changing. Manual code review is being automated. Your future is in policy design, architecture, and tooling. Here's how we'll help you develop those skills."

Security engineers who can build automated gates, design policy frameworks, and operate at the system level will be in high demand. Those who can only review code manually will struggle.

Your job as a leader is to help your team make that transition.

## Investment Priorities

Where should security leaders put budget in the AI era?

**Higher priority:**
- Policy engines and automated enforcement
- Developer security training (shift left for real)
- Security architecture capability
- AI-assisted security tooling

**Lower priority:**
- Manual code review capacity
- Checkbox compliance activities
- Security theater that doesn't scale

The ROI question isn't "how many people do we need?" It's "what infrastructure lets our existing team secure AI-paced development?"

`,
  },
  {
    slug: "supply-chain-risk-board-presentation",
    title: "Presenting Supply Chain Risk to the Board: A CISO's Guide",
    description: "SolarWinds changed how boards think about supply chain risk. Here's how to brief executives without losing them in technical details.",
    category: "CISO",
    date: "February 20, 2026",
    authorId: "dmitrii",
    image: "/img/blog_images/4.jpg",
    content: `
Every CISO I know has been asked the same question by their board since SolarWinds: "Could this happen to us?"

Most struggle to answer effectively. The technical reality is complex, and boards don't want to hear about build systems and attestation formats. They want to understand risk in business terms.

Here's how to have that conversation.

## What Boards Actually Want to Know

When a board asks about supply chain risk, they're really asking:

1. **Exposure:** If a major vendor or component we use is compromised, what's the impact?
2. **Likelihood:** How probable is this scenario?
3. **Detection:** Would we know if it happened? How quickly?
4. **Response:** What would we do? How long to recover?
5. **Prevention:** What are we doing to reduce this risk?

Structure your presentation around these questions, not around technology.

## Framing the Risk

Don't start with supply chain attacks. Start with business dependency.

"Our business depends on software from [X] vendors and [Y] open source components. If any of these are compromised, [specific business impact]. This is supply chain risk."

Name the dependencies that matter:
- "Our customer portal runs on [framework]. If that's compromised, customer data is at risk."
- "Our build system uses [tool]. If that's compromised, we could ship malware to customers."
- "Our payment processing depends on [library]. If that's compromised, transactions are at risk."

Make it concrete. Boards understand vendor dependencies. They don't understand "software supply chain" in the abstract.

## Quantifying the Risk

Boards want numbers. You may not have perfect data, but you can provide context:

**Industry benchmarks:**
- "92% of enterprise applications contain open source components"
- "Average application has 528 open source dependencies"
- "Supply chain attacks increased 742% from 2019-2022" (Sonatype data)

**Your exposure:**
- "We use [N] third-party components in production systems"
- "Our most critical systems depend on [N] external vendors"
- "[X%] of our codebase is open source"

**Incident context:**
- "SolarWinds affected 18,000 organizations, including [relevant peers]"
- "Log4Shell required emergency patching across [N] of our systems"
- "If we experienced a similar incident, estimated remediation cost is [$X]"

## The Maturity Conversation

Boards understand maturity models. Use SLSA (Supply chain Levels for Software Artifacts) as a framework:

"There's an industry framework called SLSA that measures supply chain security maturity on a scale of 1-4."

- Level 1: Basic hygiene — documented build processes
- Level 2: Traceable — builds are logged and auditable
- Level 3: Secure — builds are tamper-resistant with signed provenance
- Level 4: Verified — builds are fully reproducible with multi-party verification

"We're currently at Level [X]. Most of our industry peers are at Level [Y]. Our plan is to reach Level [Z] by [date]."

This gives the board a benchmark and a target without requiring them to understand the technical details.

## The Investment Ask

When you need budget for supply chain security, frame it around risk reduction:

"We're proposing [$X] investment to improve our supply chain security from Level 2 to Level 3. This reduces the risk of a supply chain incident by approximately [Y%] and addresses [specific regulatory requirement]."

Be specific about what they're buying:
- "Signing infrastructure so we can verify all artifacts"
- "Attestation framework so we can prove build provenance"
- "Policy enforcement so we can catch issues automatically"

And what risk it reduces:
- "This addresses the SolarWinds-type scenario where a compromised build system injects malicious code"
- "This provides audit evidence required for [compliance requirement]"
- "This reduces our mean-time-to-detect for supply chain compromises from [X] to [Y]"

## What Not to Do

**Don't use jargon without definition.** If you say "SBOM," explain it: "A software bill of materials — a list of all components in our software, like an ingredients list."

**Don't focus on tools.** The board doesn't care that you use Sigstore vs. internal PKI. They care about risk and cost.

**Don't present worst-case scenarios without context.** "An attacker could steal all customer data" is scary but not actionable. Compare to likelihood and existing controls.

**Don't promise zero risk.** Boards know that's not credible. Show you understand the risk and have a reasonable plan.

## The Executive Summary

If you only have 60 seconds, say this:

"Supply chain attacks — where trusted software vendors are compromised — are increasing and can bypass our traditional security controls. Our current posture is [good/moderate/needs work] based on industry frameworks. We're investing in [specific initiative] to improve our detection and prevention capabilities. I'm confident we're managing this risk appropriately, but I'll need [$X] for [specific investment] to maintain this position."

`,
  },
  {
    slug: "security-team-velocity-friction",
    title: "When Security Becomes a Bottleneck: Balancing Velocity and Risk",
    description: "Your development team is complaining that security is slowing them down. They're probably right. Here's how to fix it without accepting more risk.",
    category: "Leadership",
    date: "February 15, 2026",
    authorId: "edward",
    image: "/img/blog_images/5.jpg",
    content: `
A CTO told me recently: "Security is killing our velocity. Every release takes two weeks longer because of security review. Engineering is furious."

When I dug in, the situation was predictable:
- Security team of 4 reviewing code for 120 developers
- Manual review of every PR touching security-sensitive areas
- Approval gates that required human sign-off
- No automated policy enforcement

The math didn't work. Security was a bottleneck because it was designed as a bottleneck.

## Why This Happens

Most security programs were designed for a different era:
- Slower development cycles (monthly or quarterly releases)
- Smaller codebases
- Fewer developers
- Human-speed code production

Controls like "security review before release" made sense when releases happened monthly. When releases happen daily, the same control becomes impossible.

## The Real Question

The question isn't "security vs. velocity." That's a false choice.

The real question is: "How do we achieve acceptable security outcomes at current development velocity?"

If you frame it as security vs. business, security will lose. Frame it as "how do we make security work at this speed" and you have a solvable problem.

## The Automation Imperative

The only way to secure AI-paced development is automation. Humans can't review 1,000 PRs a day. Automated tools can.

**Manual gates → Automated enforcement**
- Don't require human approval for every change
- Encode security requirements as automated policies
- Human review only when automation flags concerns

**Periodic reviews → Continuous evaluation**
- Don't wait until release to check security
- Evaluate every commit, every build, every deployment
- Surface issues when they're introduced, not weeks later

**Tribal knowledge → Codified policy**
- Don't rely on senior engineers knowing "what's risky"
- Write down the rules as machine-evaluable policies
- Consistent enforcement across all code, all teams

## What Good Looks Like

High-velocity, high-security organizations share patterns:

**Developer autonomy within guardrails**
- Developers can ship without security approval if they stay within policy
- Guardrails are automated and self-enforcing
- Security team focuses on guardrail design, not individual approvals

**Fast feedback loops**
- Security issues surfaced in the IDE, not in review
- Vulnerable dependencies flagged at PR time
- Misconfigurations caught in CI, not production

**Risk-based prioritization**
- Not everything gets the same scrutiny
- Critical paths get deep review
- Routine changes get automated checks

**Security as enabler**
- Security team helps developers ship faster safely
- Clear guidance on "how to do this securely"
- Tooling that makes secure choices the easy choices

## The Conversation with Your CTO

If engineering leadership sees security as a blocker, you need a different conversation:

"I agree we're slowing things down. Here's my plan to fix it:

1. **Short term (30 days):** Identify the biggest bottlenecks and apply targeted automation
2. **Medium term (90 days):** Implement policy-as-code so most changes don't need human review
3. **Long term (180 days):** Security moves to enabling position — we help developers ship faster, not slower

I need [$X] for tooling and [Y] hours of engineering support to make this happen. The payoff is [Z% reduction] in security-related delays."

This conversation is about solving a business problem, not defending security's importance.

## Metrics That Show Progress

Track metrics that demonstrate velocity improvement:
- **Time from commit to deploy** — Is it trending down?
- **Security review queue depth** — Are we keeping up?
- **Automated gate catch rate** — Are tools finding issues before humans?
- **Developer satisfaction with security process** — Survey quarterly

If these metrics improve while security outcomes stay stable, you're winning.

## The Trust Investment

Moving from manual review to automated enforcement requires trust:
- Trust that policies capture real requirements
- Trust that automation catches what it should
- Trust that edge cases are handled

Building this trust takes time. Start small:
- Automate one category of review
- Show it catches what human review caught
- Expand to the next category

Don't try to automate everything at once. Demonstrate that automation works, then scale it.

`,
  },
  {
    slug: "compliance-automation-devsecops",
    title: "Compliance That Doesn't Slow You Down: The Automation Opportunity",
    description: "Manual compliance processes are expensive, error-prone, and slow. Here's how leading organizations are automating evidence collection without losing rigor.",
    category: "Strategy",
    date: "February 8, 2026",
    authorId: "dmitrii",
    image: "/img/blog_images/1.jpg",
    content: `
Last year, I watched an enterprise spend three weeks preparing for a SOC 2 audit. The security team pulled engineers into meetings, collected screenshots, assembled evidence binders, and answered the same questions they answered last year.

Total cost: roughly $200,000 in fully-loaded staff time. For one audit. And they have three compliance frameworks to maintain.

This is how most organizations do compliance: manually, expensively, and painfully.

It doesn't have to be this way.

## The Manual Compliance Trap

Traditional compliance workflows look like this:

1. Framework requires evidence of control (e.g., "access reviews conducted quarterly")
2. Someone performs the control manually
3. Someone else documents that it happened
4. During audit, someone finds the documentation and presents it
5. Auditor asks clarifying questions
6. Team scrambles to provide additional evidence
7. Repeat for hundreds of controls

Every step is manual. Every step has error potential. Every step takes engineer time away from productive work.

## What Automation Enables

Automated compliance works differently:

1. Framework requires evidence of control
2. System performs the control automatically (e.g., automated access reviews)
3. System generates machine-verifiable evidence
4. During audit, system provides evidence automatically
5. Auditor verifies evidence cryptographically
6. Minimal back-and-forth

The same rigor, a fraction of the cost.

## Where Automation Pays Off

Not all compliance activities benefit equally from automation. Focus on:

**High-frequency controls**
- Access reviews
- Configuration drift detection
- Vulnerability scanning
- Log collection and retention

**Evidence-heavy requirements**
- Change management documentation
- Approval workflows
- Testing evidence
- Deployment records

**Cross-framework overlap**
- Many controls appear in multiple frameworks
- Automate once, satisfy many requirements
- Reduce duplicate evidence collection

## The Evidence Problem

The hardest part of compliance isn't doing the right thing — it's proving you did the right thing.

Traditional evidence is weak:
- Screenshots can be faked
- Logs can be modified
- Timestamps can be manipulated
- Memory is unreliable

Automated evidence is strong:
- Cryptographically signed attestations
- Tamper-evident audit trails
- Machine-verifiable timestamps
- Complete provenance chains

When your evidence is machine-generated and cryptographically signed, audit conversations change. "Can you prove this happened?" becomes "Yes, here's the signed attestation."

## The ROI Case

Organizations that automate compliance typically see:

**Direct cost reduction:**
- 60-80% reduction in audit prep time
- Fewer compliance-related meetings
- Less engineering time diverted to evidence collection

**Indirect benefits:**
- Faster audit completion
- Fewer audit findings
- Better audit relationships
- Easier expansion to new frameworks

**Risk reduction:**
- Continuous compliance vs. point-in-time
- Earlier detection of compliance drift
- More consistent control execution

A mid-size enterprise with $500K annual compliance costs might spend $150K on automation and reduce ongoing costs to $150K — a one-year payback with sustained savings.

## Implementation Approach

Automation isn't all-or-nothing. Start with highest-impact areas:

**Phase 1: Evidence collection (Quick wins)**
- Automate log aggregation and retention
- Automate configuration scanning
- Automate access data collection

**Phase 2: Control execution (Medium effort)**
- Automate access reviews
- Automate vulnerability remediation tracking
- Automate change approval workflows

**Phase 3: Attestation (Significant investment)**
- Implement signed attestations
- Build continuous compliance dashboards
- Enable real-time audit readiness

Each phase delivers value independently. You don't need to complete the journey to see benefits.

## Auditor Readiness

Some auditors aren't ready for automated evidence. They're used to screenshots and interviews.

Prepare for this:
- Educate auditors early on your automation approach
- Provide documentation explaining how evidence is generated
- Offer traditional formats alongside automated evidence initially
- Build relationships with tech-forward audit firms

The best auditors will appreciate automated evidence — it's more reliable than manual documentation. But change management applies to auditors too.

## The Continuous Compliance Mindset

The real shift isn't tools — it's mindset.

**Old mindset:** "We prepare for audits when they're scheduled"
**New mindset:** "We're always audit-ready because compliance is automated"

**Old mindset:** "Compliance is a periodic exercise"
**New mindset:** "Compliance is continuous — we'd know immediately if we drifted"

**Old mindset:** "Compliance is the security team's job"
**New mindset:** "Compliance is built into how we work"

When compliance is automated, it stops being a burden and becomes infrastructure — something that runs in the background and surfaces issues only when needed.

`,
  },
  {
    slug: "incident-response-ai-era",
    title: "Incident Response When AI Wrote the Code",
    description: "Your incident response playbook assumes humans wrote the compromised code. When AI is involved, the investigation gets more complicated.",
    category: "CISO",
    date: "January 30, 2026",
    authorId: "edward",
    image: "/img/blog_images/3.jpg",
    content: `
Your SOC alerts on suspicious behavior in production. The initial triage identifies a vulnerability in code that was deployed last week. Standard incident response kicks in.

But then someone asks: "Wait, who wrote this code?"

The answer: a developer accepted an AI suggestion six weeks ago. They don't remember the details. The PR was approved by another developer who also doesn't remember reviewing it closely.

Welcome to incident response in the AI era.

## The Attribution Problem

Traditional incident investigation relies on understanding how vulnerabilities were introduced:
- Who wrote the code?
- What was their intent?
- What did reviewers miss?
- Was it malicious or accidental?

When AI is involved, these questions get harder:
- The developer didn't write the code — they accepted it
- The AI's "intent" isn't interpretable
- Review may have been cursory given AI code volume
- The vulnerability may trace to AI training data, not this developer

Your playbook needs to account for this.

## What Changes in Investigation

**Commit history tells a different story**

A commit from a developer now might mean:
- They wrote every line manually
- They accepted AI suggestions with modification
- They accepted AI suggestions verbatim
- Some combination

You need tooling to distinguish these. Most organizations don't have it.

**The blast radius is larger**

If a vulnerability was introduced via AI suggestion, the same pattern might exist elsewhere:
- In other codebases at your company
- In other companies using the same AI tool
- Anywhere the AI was trained on similar patterns

A single vulnerability finding may require enterprise-wide scanning.

**Root cause is harder to establish**

"Developer introduced vulnerability due to insufficient review" is a root cause you can address with training and process.

"AI suggested vulnerable pattern that appeared in training data from external source" is a root cause that's... less actionable.

Your incident report needs to account for this complexity.

## Adapting Your Playbook

**Add AI context to triage**

When investigating code-related incidents, determine early:
- Was AI used in developing this code?
- What tool? What time period?
- Do we have logs of AI suggestions?

This context shapes the investigation.

**Expand scope assumptions**

If the vulnerability came from AI, assume it might be widespread:
- Search for the same pattern across all codebases
- Check if other teams use the same AI tools
- Consider whether the pattern might affect other organizations

**Document AI involvement in reports**

Your incident reports should capture:
- Whether AI was involved in the vulnerable code
- What tool was used
- Whether similar patterns were found elsewhere
- Recommendations specific to AI-assisted development

**Update communication templates**

If you need to disclose an incident where AI was involved:
- Be prepared for media questions about AI
- Have a position on AI use in your development process
- Don't make AI the scapegoat — humans accepted the code

## The Audit Trail Gap

Most organizations can't answer "did AI write this code?" for code in production right now.

You need:
- Logging of AI tool usage in development environments
- Capture of AI suggestions and what was accepted
- Linkage between AI interactions and commits

This is surveillance-adjacent, which creates its own issues. But without it, incident investigation is compromised.

Consider: what's the minimum logging that provides investigative value without creating a surveillance culture?

## Training Your Team

Your incident responders need new skills:
- Understanding of how AI coding tools work
- Ability to query AI interaction logs
- Recognition that AI-related incidents may have different patterns
- Awareness of AI-specific attack vectors (training data poisoning, prompt injection)

Add AI incident scenarios to your tabletop exercises. Walk through: "The vulnerability was introduced by AI — now what?"

## The Legal Dimension

If AI involvement is discovered in an incident that affects customers:
- Does disclosure require mentioning AI?
- Does liability change based on AI involvement?
- How do contracts address AI-assisted development?

Get legal input now, not during an incident. Your outside counsel may not have expertise here — many don't yet.

## Preparing for the Inevitable

AI-related incidents will increase. The question is whether you're ready:

**Minimum readiness:**
- Playbook acknowledges AI involvement possibility
- Team knows how to determine if AI was involved
- Basic logging exists for AI tool usage

**Better readiness:**
- Detailed AI interaction logging
- Automated scanning for AI-suggested patterns
- Trained team with AI incident experience

**Best readiness:**
- Real-time visibility into AI usage across development
- Automated detection of vulnerable AI patterns
- Proactive hunting for AI-introduced vulnerabilities

Where are you today? Where do you need to be?

`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getAuthor(authorId: string): Author | undefined {
  return authors[authorId];
}
