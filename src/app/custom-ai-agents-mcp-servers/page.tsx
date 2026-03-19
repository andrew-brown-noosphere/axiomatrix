import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Shield,
  Code,
  Workflow,
  CheckCircle,
  Zap,
  Lock,
  Server,
  ExternalLink,
} from "lucide-react";

const coreAreas = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    description:
      "Purpose-built AI agents that automate complex workflows while maintaining security boundaries and audit trails.",
  },
  {
    icon: Server,
    title: "MCP Server Development",
    description:
      "Model Context Protocol servers that give AI assistants secure, controlled access to your systems and data.",
  },
  {
    icon: Shield,
    title: "Secure Integration",
    description:
      "Every agent and API we build follows security-first principles—authentication, authorization, and encryption by default.",
  },
];

const benefits = [
  {
    icon: Lock,
    title: "Security-First Design",
    description: "Agentic workflows with proper guardrails, permissions, and audit logging.",
  },
  {
    icon: Zap,
    title: "Developer Velocity",
    description: "AI-powered automation that accelerates your team without compromising safety.",
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    description: "Agents that work with your existing tools, APIs, and infrastructure.",
  },
];

const outcomes = [
  "Custom AI agents tailored to your specific workflows",
  "MCP servers for secure AI assistant integration",
  "Secure API design with proper authentication",
  "Audit trails and logging for compliance",
  "Documentation and training for your team",
];

const useCases = [
  "Code signing automation",
  "Security scanning orchestration",
  "Compliance reporting",
  "Infrastructure provisioning",
  "CI/CD pipeline automation",
  "Knowledge base assistants",
];

export default function CustomAIAgentsMCPServersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <Bot className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Custom AI Agents & MCP Servers
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              We build secure agentic workflows—custom APIs, AI agents, and MCP servers that integrate safely into your infrastructure. From code signing automation to compliance reporting, we create AI-powered tools that accelerate your team while maintaining security boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-chrome-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://devexp.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-chrome inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-zinc-200 rounded-lg"
              >
                See Our Work at DevExp.ai
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Why Secure Agentic Workflows Matter</h2>
            <p className="text-zinc-400 text-lg">
              AI agents are transforming how teams work—but without proper security controls, they become liabilities. We build agents that are powerful enough to automate complex tasks, yet constrained enough to operate safely within your security perimeter.
            </p>
          </div>
        </div>
      </section>

      {/* Core Areas */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10">What We Build</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {coreAreas.map((area, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-8 hover:border-cyan-500/30 transition-colors"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 w-fit mb-6">
                  <area.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{area.title}</h3>
                <p className="text-zinc-400">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Key Benefits</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="p-4 rounded-xl bg-cyan-500/10 w-fit mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes & Use Cases */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Outcomes */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">What You Get</h2>
              <p className="text-zinc-400 mb-6">
                Every engagement delivers production-ready code, documentation, and the knowledge transfer your team needs to maintain and extend the solution.
              </p>
              <ul className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Common Use Cases</h2>
              <p className="text-zinc-400 mb-6">
                We build agents and MCP servers for a variety of DevSecOps workflows.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-center"
                  >
                    <span className="text-zinc-300 font-medium">{useCase}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-sm mt-4">
                + Custom solutions for your specific needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Explainer */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">What is MCP?</h2>
            </div>
            <p className="text-zinc-400 mb-6">
              The <strong className="text-white">Model Context Protocol (MCP)</strong> is an open standard that lets AI assistants securely connect to external data sources and tools. Instead of giving AI full access to your systems, MCP servers provide controlled, auditable interfaces.
            </p>
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">MCP enables AI assistants to:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Query databases with read-only access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Execute approved operations with proper authorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Access internal documentation and knowledge bases</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">Integrate with your existing APIs and services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Engagement */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Typical Engagement</h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-cyan-500/30" />

              {/* Steps */}
              <div className="space-y-8">
                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    1
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Discovery & Design</h3>
                    <p className="text-sm text-zinc-400">Understand your workflow, define requirements, design secure architecture</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    2
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Development</h3>
                    <p className="text-sm text-zinc-400">Build the agent or MCP server with security controls and testing</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    3
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Integration & Testing</h3>
                    <p className="text-sm text-zinc-400">Deploy to your environment, integrate with existing systems, validate security</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    4
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Documentation & Handoff</h3>
                    <p className="text-sm text-zinc-400">Complete documentation, training, and knowledge transfer to your team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-950/50 to-zinc-900/50 border border-cyan-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to build secure AI workflows?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your automation needs and how we can build AI agents that work safely within your security boundaries.
            </p>
            <Link
              href="/contact"
              className="btn-chrome-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-lg"
            >
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
