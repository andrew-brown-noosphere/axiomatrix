import Link from "next/link";
import { ArrowRight, Shield, Key, FileCheck, Lock } from "lucide-react";

const partners = [
  {
    name: "Noosphere Technologies",
    category: "AI Gateway & Trust Infrastructure",
    description: "AI Gateway platform for identity, signing, provenance, and trust. Control and govern AI agent workflows with confidence.",
    capabilities: ["AI Gateway", "C2PA Provenance", "DID Identity", "Trust Graphs", "LLM Governance"],
  },
  {
    name: "Thales",
    category: "HSM & Data Protection",
    description: "Luna Cloud HSM and Data Protection on Demand (DPoD) for FIPS 140-2 Level 3 compliant key management and signing operations.",
    capabilities: ["Luna Cloud HSM", "DPoD Integration", "FIPS 140-2 Level 3", "Key Migration"],
  },
  {
    name: "Veracode",
    category: "Application Security Testing",
    description: "Comprehensive application security platform with static analysis, dynamic testing, and software composition analysis.",
    capabilities: ["SAST", "DAST", "SCA", "Pipeline Integration", "Developer Training"],
  },
  {
    name: "Imperva",
    category: "Application & API Security",
    description: "Enterprise application security including web application firewall, API protection, and DDoS mitigation.",
    capabilities: ["WAF", "API Security", "DDoS Protection", "Bot Management", "Data Security"],
  },
  {
    name: "Hexagon",
    category: "Critical Infrastructure Security",
    description: "Safety and infrastructure solutions for OT/ICS environments, industrial cybersecurity, and asset protection.",
    capabilities: ["OT Security", "ICS Protection", "Asset Intelligence", "Safety Systems"],
  },
  {
    name: "SignPath",
    category: "Code Signing",
    description: "Enterprise code signing orchestration with Windows Authenticode, macOS, JAR, and container signing support.",
    capabilities: ["Windows Authenticode", "macOS Signing", "JAR Signing", "CI/CD Integration"],
  },
  {
    name: "Sigstore",
    category: "Keyless Signing",
    description: "Open source keyless signing infrastructure with Rekor transparency log and Fulcio certificate authority.",
    capabilities: ["Keyless Signing", "Rekor Transparency", "SLSA Provenance", "OIDC Integration"],
  },
];

const integrations = [
  { icon: Shield, title: "SLSA Framework", description: "Levels 1-4 supply chain security" },
  { icon: Key, title: "PKCS#11", description: "Standard HSM interface" },
  { icon: FileCheck, title: "in-toto", description: "Supply chain attestation" },
  { icon: Lock, title: "Cedar", description: "Policy engine integration" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Technology Partners
            </h1>
            <p className="text-lg text-zinc-400">
              Built on enterprise-grade infrastructure from industry leaders in security, cryptography, and compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
                    <p className="text-cyan-400 text-sm">{partner.category}</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-500 font-bold text-xs">
                    {partner.name.slice(0, 3).toUpperCase()}
                  </div>
                </div>

                <p className="text-zinc-400 mb-6">
                  {partner.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {partner.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-full"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Integrations */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Standards & Integrations</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {integrations.map((item) => (
              <div key={item.title} className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
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
              Become a Partner
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Interested in partnering with AxiomMatrix? Let's discuss how we can work together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
