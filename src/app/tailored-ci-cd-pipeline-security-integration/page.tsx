import Link from "next/link";
import {
  ArrowRight,
  Settings,
  Search,
  ShieldCheck,
  FileCheck,
  CheckCircle,
  Zap,
  Lock,
  TrendingUp,
} from "lucide-react";

const coreAreas = [
  {
    icon: Search,
    title: "Pipeline Assessment",
    description:
      "Analyze your current CI/CD workflows to identify security risks, inefficiencies, and opportunities for improvement.",
  },
  {
    icon: ShieldCheck,
    title: "Security Gate Implementation",
    description:
      "Integrate automated security checks including SAST, SCA, container scanning, and secrets detection directly into your pipelines.",
  },
  {
    icon: FileCheck,
    title: "Policy and Governance Alignment",
    description:
      "Implement enforceable policies supporting compliance while maintaining fast, efficient delivery.",
  },
];

const benefits = [
  {
    icon: Lock,
    title: "Enhanced Security",
    description: "More secure pipelines with integrated security testing at every stage.",
  },
  {
    icon: Zap,
    title: "Clear Processes",
    description: "Streamlined workflows that your teams will actually follow.",
  },
  {
    icon: TrendingUp,
    title: "Better Protection",
    description: "Stay ahead of evolving threats proactively, not reactively.",
  },
];

const outcomes = [
  "Catch vulnerabilities before production deployment",
  "Strengthen defenses against supply chain attacks",
  "Every deployment is verifiable, trusted, and compliant",
  "Security integrated without slowing down delivery",
  "Teams empowered with clear security processes",
];

const integrations = [
  "GitHub Actions",
  "GitLab CI",
  "Jenkins",
  "Azure DevOps",
  "CircleCI",
  "Bitbucket Pipelines",
];

export default function CICDPipelineSecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <Settings className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Tailored CI/CD Pipeline Security Integration
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              A service that goes beyond guidance by integrating security controls directly into your CI/CD pipelines. Your trusted guide on the DevSecOps journey—delivering expert solutions that bridge development, security, and operations with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-chrome-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
              >
                Start Integration Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/core-devsecops-maturity-assessment"
                className="btn-chrome inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-zinc-200 rounded-lg"
              >
                Need Assessment First?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Why Pipeline Security Matters</h2>
            <p className="text-zinc-400 text-lg">
              CI/CD pipelines can become major attack vectors without proper security. Supply chain attacks are increasing, and your pipeline is the gateway to production. We help you secure that gateway without slowing down your teams.
            </p>
          </div>
        </div>
      </section>

      {/* Core Areas */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10">What We Do</h2>

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

      {/* Outcomes & Integrations */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Outcomes */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Engagement Outcomes</h2>
              <p className="text-zinc-400 mb-6">
                By the end of this engagement, your pipelines will be more secure, your teams will have clearer processes, and your organization will be better protected against evolving threats.
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

            {/* Integrations */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Platforms We Work With</h2>
              <p className="text-zinc-400 mb-6">
                We integrate with your existing CI/CD platform—no rip-and-replace required.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {integrations.map((platform, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-center"
                  >
                    <span className="text-zinc-300 font-medium">{platform}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-sm mt-4">
                + Other platforms by request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Engagement */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
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
                    <h3 className="font-semibold text-white mb-1">Discovery & Assessment</h3>
                    <p className="text-sm text-zinc-400">Review current pipelines, identify risks and quick wins</p>
                    <span className="text-xs text-cyan-400">Week 1-2</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    2
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Design & Planning</h3>
                    <p className="text-sm text-zinc-400">Define security gates, policies, and integration approach</p>
                    <span className="text-xs text-cyan-400">Week 2-3</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    3
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Implementation</h3>
                    <p className="text-sm text-zinc-400">Integrate security controls into pipelines with your team</p>
                    <span className="text-xs text-cyan-400">Week 3-6</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 z-10 text-white font-bold text-sm">
                    4
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white mb-1">Validation & Handoff</h3>
                    <p className="text-sm text-zinc-400">Test, document, and train your team on new processes</p>
                    <span className="text-xs text-cyan-400">Week 6-8</span>
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
              Ready to secure your pipeline?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your CI/CD environment and how we can integrate security without slowing you down.
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
