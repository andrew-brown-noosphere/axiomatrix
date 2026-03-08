import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  Lock,
  FileCheck,
  AlertTriangle,
  Layers,
  Eye,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";

const challenges = [
  {
    title: "Speed vs. Security Trade-off",
    description:
      "Developers frequently bypassed thorough manual security reviews and formal audits to meet aggressive feature release timelines, leading to rushed code and unpatched vulnerabilities.",
  },
  {
    title: "Late-Stage Security Audits",
    description:
      "Formal smart contract audits by external firms were conducted immediately before deployment. Critical bugs found late required significant, costly rework and delayed protocol launches.",
  },
  {
    title: "Complex Attack Surface",
    description:
      "The application involved multiple attack vectors, including smart contract logic, backend APIs, front-end wallet integrations, and third-party oracle dependencies.",
  },
  {
    title: "Lack of Continuous Vulnerability Scanning",
    description:
      "Dependency updates and third-party protocol integrations were not continuously monitored for known vulnerabilities, leaving the application exposed to supply chain attacks.",
  },
  {
    title: "Manual Compliance and Proof-of-Solvency",
    description:
      "Demonstrating protocol integrity, proof-of-reserves, and compliance with emerging regulatory requirements was a fragmented, manual process that consumed significant engineering hours.",
  },
  {
    title: "Inconsistent Deployment Integrity",
    description:
      "Managing deployment keys, multisig wallet policies, and secure CI/CD pipelines lacked standardization, increasing the risk of unauthorized or tampered code being deployed.",
  },
  {
    title: "Siloed Teams and Knowledge Gaps",
    description:
      "Smart contract engineers, backend developers, and security experts operated independently. Security was often viewed as a gate to pass, rather than a shared responsibility.",
  },
];

const solutions = [
  {
    icon: Zap,
    title: "Security Integrated into CI/CD Pipelines",
    description:
      "Automated Static Application Security Testing (SAST) and dynamic analysis tools specialized for smart contracts were embedded directly into the Git workflow, running checks on every pull request.",
  },
  {
    icon: Lock,
    title: "Automated Dependency and Secret Management",
    description:
      "Automated scanning for vulnerable third-party dependencies was implemented. Secure secret management and rotation for all API keys, database credentials, and deployment private keys were standardized.",
  },
  {
    icon: FileCheck,
    title: "Standardized Deployment Governance",
    description:
      "A policy-as-code approach ensured that only peer-reviewed and automatically scanned code could be deployed. All mainnet deployments required multisig approval via immutable CI/CD pipelines.",
  },
  {
    icon: Eye,
    title: "Continuous Security and Compliance Monitoring",
    description:
      "Security controls, logging, and policy enforcement aligned with financial compliance best practices (e.g., SOC 2 readiness) were embedded. On-chain monitoring provided immediate alerts on suspicious behavior.",
  },
  {
    icon: GraduationCap,
    title: "Shift-Left Security Training",
    description:
      "Developers received practical, continuous training on common smart contract exploits (e.g., reentrancy, integer overflow) and secure API design, enabling them to prevent flaws earlier.",
  },
  {
    icon: ClipboardCheck,
    title: "Automated Audit Evidence",
    description:
      "Every commit and deployment automatically generated a detailed record of all security checks, code changes, and audit logs, making compliance evidence generation instantaneous and transparent.",
  },
];

const beforeItems = [
  "Unpredictable and risky feature release cycles due to manual security bottlenecks",
  "Critical vulnerabilities discovered late, leading to emergency mainnet patches and protocol downtime",
  "Exposure to known vulnerabilities in third-party libraries",
  "Manual, time-consuming compliance and proof-of-solvency evidence gathering",
  "Inconsistent security practices for key and secrets management",
  "Security team viewed as a roadblock, not a partner",
];

const afterItems = [
  { text: "40% faster time-to-market", highlight: true, detail: "for new features, safely accelerating iteration" },
  { text: "80% earlier detection", highlight: true, detail: "of smart contract vulnerabilities, reducing costly external audits" },
  { text: "Continuous compliance readiness", highlight: false, detail: "with automated audit trails and security evidence" },
  { text: "Standardized, secure deployment", highlight: false, detail: "and governance procedures for all protocol upgrades" },
  { text: "Improved collaboration", highlight: false, detail: "and a shared 'security-first' culture among all engineering teams" },
  { text: "Increased developer confidence", highlight: false, detail: "leading to more innovative and reliable protocol development" },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-cyan-400 font-semibold mb-4">Use Case</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Secure and Rapid Feature Delivery for a Decentralized Finance (DeFi) Startup
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              A fragmented DeFi startup&apos;s security model was transformed into a scalable DevSecOps framework by embedding automated smart contract testing, dependency scanning, and policy-as-code governance into the CI/CD pipeline—accelerating innovation while reducing protocol risk.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-zinc-300 leading-relaxed">
              A fast-growing DeFi startup offered a suite of applications, including lending, yield farming, and token exchange protocols, built on the Ethereum Virtual Machine (EVM). The competitive nature of the DeFi space demanded continuous and rapid iteration, with new features and protocol upgrades being deployed weekly to capture market share.
            </p>
            <p className="text-zinc-300 leading-relaxed mt-4">
              The core challenge was maintaining the highest standard of smart contract and application security while achieving this breakneck pace of development. A single security vulnerability could lead to the immediate loss of millions in user funds and irreversible reputational damage. The organization needed to implement a security-first development approach to accelerate feature delivery and respond to market demands without increasing the risk of catastrophic security flaws.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Challenges</h2>
          </div>
          <p className="text-zinc-400 mb-8">
            As a FinTech provider operating on public blockchains, the startup faced risks unique to highly-regulated and high-value environments:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{challenge.title}</h3>
                <p className="text-sm text-zinc-400">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Solutions</h2>
          </div>
          <p className="text-zinc-400 mb-8">
            A tailored DevSecOps transformation was implemented, integrating security tooling and practices across the entire smart contract and application development lifecycle:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 w-fit mb-4">
                  <solution.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{solution.title}</h3>
                <p className="text-sm text-zinc-400">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Results</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-zinc-800/50 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Before
              </h3>
              <ul className="space-y-3">
                {beforeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-red-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-zinc-800/50 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                After
              </h3>
              <ul className="space-y-3">
                {afterItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="text-green-400 mt-1">•</span>
                    <span>
                      {item.highlight ? (
                        <strong className="text-green-400">{item.text}</strong>
                      ) : (
                        <span className="text-white">{item.text}</span>
                      )}{" "}
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-950/50 to-zinc-900/50 border border-cyan-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to transform your security posture?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re in DeFi, FinTech, or any high-stakes environment, we can help you achieve the same results—faster delivery, stronger security.
            </p>
            <Link
              href="/contact"
              className="btn-chrome-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-lg"
            >
              Book a Discovery Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
