import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Users, Target, Award } from "lucide-react";
import { brand } from "@/lib/brand";

const values = [
  {
    icon: Shield,
    title: "Real Security",
    description: "Practical solutions that actually protect your business operations.",
  },
  {
    icon: Users,
    title: "Team-First",
    description: "We work collaboratively with your existing personnel, not around them.",
  },
  {
    icon: Target,
    title: "Tailored Approach",
    description: "Custom strategies designed for your unique environment.",
  },
  {
    icon: Award,
    title: "Experience",
    description: "Team averaging 15-30 years in enterprise cybersecurity.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              About {brand.name}
            </h1>
            <p className="text-lg text-zinc-400">
              We&apos;re not your typical cybersecurity consultants. No generic paperwork, no canned solutions. We deliver practical, tailored DevSecOps strategies that work in your environment.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-cyan-950/30 border border-zinc-800 p-8 md:p-16 lg:p-20">
            {/* Logo watermark */}
            <div className="absolute -right-20 -top-20 w-80 h-80 md:w-[500px] md:h-[500px] opacity-[0.03]">
              <Image
                src="/img/logo/bold-logo.jpg"
                alt=""
                fill
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
              <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4">Our Mission</p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Tools don&apos;t secure systems.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  People do.
                </span>
              </h2>

              <p className="text-lg text-zinc-400 leading-relaxed">
                To empower businesses through practical cybersecurity solutions and exceptional service, creating lasting partnerships built on trust, integrity, and mutual success.
              </p>
            </div>

            {/* Decorative gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-zinc-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to work with us?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Schedule a free discovery call and let&apos;s discuss how we can strengthen your security posture.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
