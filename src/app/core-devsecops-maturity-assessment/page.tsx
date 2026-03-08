import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Search,
  Package,
  Container,
  Zap,
  KeyRound,
  Lock,
  FileSignature,
  CheckCircle,
  Target,
} from "lucide-react";

const consultingAreas = [
  {
    icon: Search,
    title: "Static Application Security Testing (SAST)",
    question: "How do I add static code analysis to my pipeline?",
    description:
      "Understand what SAST does, where it fits, and how it supports secure coding. We deliver practical roadmaps rather than superficial scans.",
  },
  {
    icon: Package,
    title: "Dependency & Software Composition Analysis (SCA)",
    question: "How do I manage third-party library risks?",
    description:
      "Tackle open-source dependency risks with seamless partnership with your development teams. Tailored approaches for Jenkins, GitLab, and GitHub environments.",
  },
  {
    icon: Container,
    title: "Container Image Scanning",
    question: "How do I scan Docker images in CI/CD?",
    description:
      "Solutions for container and Kubernetes-specific security issues. Create sustainable scanning practices as part of your DevSecOps strategy.",
  },
  {
    icon: Zap,
    title: "Dynamic Application Security Testing (DAST)",
    question: "How do I test runtime vulnerabilities?",
    description:
      "Strategize runtime testing integration to identify vulnerabilities that static checks miss. Balance security with deployment speed.",
  },
  {
    icon: KeyRound,
    title: "Secrets Scanning",
    question: "How do I prevent credential leaks?",
    description:
      "Prevent hard-coded credentials from entering repositories. Establish governance practices for long-term secret management.",
  },
  {
    icon: Lock,
    title: "Pipeline Hardening & CI/CD Security",
    question: "How do I prevent supply chain attacks?",
    description:
      "Address artifact integrity, supply chain transparency, and pipeline vulnerability assessment to prevent supply chain attacks.",
  },
  {
    icon: FileSignature,
    title: "Code Signing",
    question: "How do I ensure software authenticity?",
    description:
      "Ensure software authenticity and integrity. We guide you through code signing strategy implementation.",
  },
];

const outcomes = [
  "Clear understanding of your current DevSecOps maturity level",
  "Prioritized list of security gaps and risks",
  "Practical roadmap with actionable recommendations",
  "Alignment between security, development, and operations teams",
  "Foundation for continuous security improvement",
];

export default function CoreDevSecOpsAssessmentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Core DevSecOps Maturity Assessment
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              Understand today&apos;s security challenges and build a roadmap for a stronger, safer software delivery pipeline. Custom-fit strategies around your unique challenges—no templates, no buzzwords, just solving real problems with measurable outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-chrome-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
              >
                Schedule Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/assessment"
                className="btn-chrome inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-zinc-200 rounded-lg"
              >
                Take Self-Assessment First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Areas */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Target className="h-6 w-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">What We Assess</h2>
          </div>
          <p className="text-zinc-400 mb-10 max-w-2xl">
            Our assessment covers the full spectrum of DevSecOps practices, identifying gaps and opportunities across your pipeline.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingAreas.map((area, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 w-fit mb-4">
                  <area.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{area.title}</h3>
                <p className="text-sm text-cyan-400 mb-3 italic">&ldquo;{area.question}&rdquo;</p>
                <p className="text-sm text-zinc-400">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">What You Get</h2>
              <p className="text-zinc-400 mb-6">
                By the end of the assessment, you&apos;ll have a clear picture of where you stand and a practical path forward.
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
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Typical Engagement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-zinc-700/50">
                  <span className="text-zinc-400">Duration</span>
                  <span className="text-white font-medium">2-4 weeks</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-700/50">
                  <span className="text-zinc-400">Deliverable</span>
                  <span className="text-white font-medium">Assessment Report + Roadmap</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-700/50">
                  <span className="text-zinc-400">Format</span>
                  <span className="text-white font-medium">Remote + On-site options</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-zinc-400">Follow-up</span>
                  <span className="text-white font-medium">Implementation support available</span>
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
              Ready to understand your DevSecOps maturity?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Start with a discovery call. We&apos;ll discuss your current challenges and how an assessment can help.
            </p>
            <Link
              href="/contact"
              className="btn-chrome-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-lg"
            >
              Book Discovery Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
