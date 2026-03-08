import Link from "next/link";
import { MessageSquare, ClipboardCheck, Settings, Bot, ArrowRight } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Free Discovery Call",
    description: "A DevSecOps discovery call is designed to help you understand where you stand today and what it will take to strengthen your security posture.",
    href: "/contact",
  },
  {
    icon: ClipboardCheck,
    title: "Core DevSecOps Maturity Assessment",
    description: "We identify your security challenges and deliver a high-impact plan that strengthens your code, fortifies your pipeline, and streamlines your DevSecOps practices.",
    href: "/core-devsecops-maturity-assessment",
  },
  {
    icon: Settings,
    title: "Tailored CI/CD Pipeline Security Integration",
    description: "We work with your team to integrate security into your CI/CD pipeline, strengthening every stage of delivery and enabling faster, safer releases.",
    href: "/tailored-ci-cd-pipeline-security-integration",
  },
  {
    icon: Bot,
    title: "Custom AI Agents & MCP Servers",
    description: "We build secure agentic workflows—custom APIs, AI agents, and MCP servers that integrate safely into your infrastructure. See our work at DevExp.ai.",
    href: "/contact",
  },
];


export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-lg text-zinc-400">
              Your trusted partner on the DevSecOps journey. We integrate security seamlessly into every stage of development, ensuring strong protection without compromising speed or innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-cyan-400 font-medium">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-zinc-800 p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to strengthen your security posture?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Schedule a free discovery call. We'll assess your current security challenges and show you the path forward.
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
