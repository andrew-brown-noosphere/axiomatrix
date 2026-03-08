import Link from "next/link";
import { Building2, Landmark, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    icon: Building2,
    title: "Enterprise",
    description: "Comprehensive DevSecOps for large organizations with complex security requirements and distributed teams.",
    features: [
      "HSM-backed code signing",
      "SLSA Level 3+ attestation",
      "Custom policy engine integration",
      "24/7 security operations support",
      "Compliance automation",
    ],
    href: "/contact",
  },
  {
    icon: Landmark,
    title: "Government",
    description: "FedRAMP-ready security infrastructure meeting federal compliance requirements for government contractors and agencies.",
    features: [
      "FIPS 140-2 Level 3 compliance",
      "FedRAMP authorization support",
      "Supply chain risk management",
      "Controlled unclassified information (CUI)",
      "Audit trail and transparency logs",
    ],
    href: "/contact",
  },
  {
    icon: Globe,
    title: "EU Compliance",
    description: "Security infrastructure aligned with EU regulations including NIS2, Cyber Resilience Act, and GDPR requirements.",
    features: [
      "NIS2 directive compliance",
      "Cyber Resilience Act readiness",
      "GDPR security requirements",
      "EU data residency options",
      "European HSM providers",
    ],
    href: "/contact",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Solutions by Industry
            </h1>
            <p className="text-lg text-zinc-400">
              Tailored security infrastructure for enterprise, government, and regulated industries. Compliance-ready from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 flex flex-col"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit mb-6">
                  <solution.icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {solution.title}
                </h3>

                <p className="text-zinc-400 mb-6">
                  {solution.description}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={solution.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium border border-zinc-700 hover:border-cyan-500 text-white rounded-lg transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-zinc-800 p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Not sure which solution fits?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Schedule a discovery call and we'll help you identify the right approach for your organization.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors"
            >
              Schedule Discovery Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
