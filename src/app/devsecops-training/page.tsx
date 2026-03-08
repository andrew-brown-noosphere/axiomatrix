import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Shield,
  Code,
  GitBranch,
  Users,
  Brain,
  Wrench,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react";

const trainingModules = [
  {
    icon: Shield,
    title: "Security Fundamentals for Developers",
    audience: "Development teams",
    description:
      "Build a security-first mindset. Learn to identify vulnerabilities early, write secure code, and understand the attacker's perspective without slowing down delivery.",
  },
  {
    icon: Code,
    title: "Secure Coding Practices",
    audience: "Software engineers",
    description:
      "Hands-on training in OWASP Top 10 prevention, input validation, authentication patterns, and language-specific security best practices.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Pipeline Security",
    audience: "DevOps & Platform teams",
    description:
      "Integrate security gates, secrets management, and artifact signing into your pipelines. Prevent supply chain attacks before they happen.",
  },
  {
    icon: Wrench,
    title: "Security Tooling & Automation",
    audience: "Security champions",
    description:
      "Master SAST, DAST, SCA, and container scanning tools. Learn to tune for signal over noise and integrate findings into developer workflows.",
  },
  {
    icon: Brain,
    title: "Threat Modeling Workshop",
    audience: "Architects & Tech leads",
    description:
      "Practical threat modeling techniques. Identify risks early in the design phase and make security decisions that scale with your architecture.",
  },
  {
    icon: Users,
    title: "Security Champions Program",
    audience: "Cross-functional teams",
    description:
      "Build an internal security culture. Train champions who can advocate for security within their teams and bridge the gap between security and development.",
  },
];

const outcomes = [
  "Teams that identify and fix security issues before they reach production",
  "Reduced friction between security and development",
  "Security champions embedded in every team",
  "Practical skills that apply immediately to daily work",
  "A culture where security is everyone's responsibility",
];

const formats = [
  {
    title: "Workshop",
    duration: "1-2 days",
    description: "Intensive hands-on sessions for immediate skill building",
  },
  {
    title: "Bootcamp",
    duration: "1 week",
    description: "Comprehensive program covering multiple security domains",
  },
  {
    title: "Ongoing Coaching",
    duration: "Monthly",
    description: "Regular sessions to reinforce learning and address new challenges",
  },
];

export default function DevSecOpsTrainingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              DevSecOps Training
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-4">
              Tools don&apos;t secure systems—people do.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              We help your team build a lasting DevSecOps mindset through practical, hands-on training that sticks. No death-by-PowerPoint. Real scenarios, real code, real skills your team can use tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-chrome-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
              >
                Discuss Training Needs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Target className="h-6 w-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Training Modules</h2>
          </div>
          <p className="text-zinc-400 mb-10 max-w-2xl">
            Tailored programs for every role. We customize content based on your tech stack, threat landscape, and team experience level.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingModules.map((module, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 w-fit mb-4">
                  <module.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{module.title}</h3>
                <p className="text-sm text-cyan-400 mb-3">For: {module.audience}</p>
                <p className="text-sm text-zinc-400">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Lightbulb className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Approach</h2>
              </div>
              <p className="text-zinc-400 mb-6">
                We believe in learning by doing. Our training is built around real-world scenarios and hands-on exercises that mirror the challenges your team faces daily.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Assess Current Skills</h4>
                    <p className="text-sm text-zinc-400">Understand where your team is today and identify knowledge gaps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Customize Content</h4>
                    <p className="text-sm text-zinc-400">Tailor examples and exercises to your tech stack and industry</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Hands-On Training</h4>
                    <p className="text-sm text-zinc-400">Interactive sessions with real code, real vulnerabilities, real fixes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Reinforce & Support</h4>
                    <p className="text-sm text-zinc-400">Follow-up resources and ongoing coaching to cement learning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Training Formats</h3>
              {formats.map((format, index) => (
                <div key={index} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{format.title}</h4>
                    <span className="text-cyan-400 text-sm font-medium">{format.duration}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-zinc-400">
              Training that transforms how your team thinks about security—not just a checkbox exercise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 p-4">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-950/50 to-zinc-900/50 border border-cyan-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to level up your team&apos;s security skills?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your team&apos;s needs and design a training program that fits your goals, timeline, and budget.
            </p>
            <Link
              href="/contact"
              className="btn-chrome-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-lg"
            >
              Schedule Training Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
