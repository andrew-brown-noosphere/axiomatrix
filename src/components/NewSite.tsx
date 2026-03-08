"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  ClipboardCheck,
  Settings,
  GraduationCap,
  ArrowRight,
  Shield,
  Users,
  Target,
  AlertTriangle,
  Heart,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import AIAssistant from "./AIAssistant";
import { brand } from "@/lib/brand";

const services = [
  {
    icon: MessageSquare,
    title: "Free Discovery Call",
    description:
      "Understand where you stand today and what it will take to strengthen your security posture.",
    href: "/contact",
  },
  {
    icon: ClipboardCheck,
    title: "Core DevSecOps Maturity Assessment",
    description:
      "We pinpoint your security challenges and deliver a high-impact plan that strengthens your code and fortifies your pipeline.",
    href: "/contact",
  },
  {
    icon: Settings,
    title: "Tailored CI/CD Pipeline Security Integration",
    description:
      "We integrate security into your CI/CD pipeline, strengthening every stage of delivery and enabling faster, safer releases.",
    href: "/contact",
  },
  {
    icon: GraduationCap,
    title: "DevSecOps Training",
    description:
      "We help your team build a lasting DevSecOps mindset, because tools don't secure systems—people do.",
    href: "/contact",
  },
];

const values = [
  {
    icon: Heart,
    title: "Client-Centric Thinking",
    description:
      "Your mission becomes our mission. We ensure all solutions are crafted to advance what matters most to you.",
  },
  {
    icon: Target,
    title: "Tailored Solutions, Not Templates",
    description:
      "Customized approaches designed for your individual technology stack and teams. No generic paperwork.",
  },
  {
    icon: Shield,
    title: "Results-Driven Mindset",
    description:
      "Focus on measurable outcomes rather than superficial metrics. Real security, real results.",
  },
];

export default function NewSite() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100 bg-dramatic noise-overlay">
      {/* Background orbs */}
      <div className="orb orb-cyan w-[600px] h-[600px] -top-[200px] -left-[200px] fixed" />
      <div className="orb orb-purple w-[500px] h-[500px] top-[20%] -right-[150px] fixed" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-[60%] left-[10%] fixed opacity-20" />

      {/* Header */}
      <header className="border-b border-zinc-700/50 backdrop-blur-md bg-gradient-to-b from-zinc-900/95 to-[#0a0a0f]/90 sticky top-0 z-40 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.logoWidth}
                height={brand.logoHeight}
                className="rounded-lg shadow-lg shadow-cyan-500/20"
              />
              <span className="text-xl font-bold">
                <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Axiom</span>
                <span className="text-white">Matrix</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className={`nav-link-chrome font-display px-4 py-1.5 text-sm font-semibold tracking-wide uppercase transition-all text-zinc-300 hover:text-white`}>
                Home
              </Link>
              <Link href="/about" className={`nav-link-chrome font-display px-4 py-1.5 text-sm font-semibold tracking-wide uppercase transition-all text-zinc-300 hover:text-white`}>
                About
              </Link>
              <Link href="/services" className={`nav-link-chrome font-display px-4 py-1.5 text-sm font-semibold tracking-wide uppercase transition-all text-zinc-300 hover:text-white`}>
                Services
              </Link>
              <Link href="/blog" className={`nav-link-chrome font-display px-4 py-1.5 text-sm font-semibold tracking-wide uppercase transition-all text-zinc-300 hover:text-white`}>
                Blog
              </Link>
              <Link href="/contact" className={`nav-link-chrome font-display px-4 py-1.5 text-sm font-semibold tracking-wide uppercase transition-all text-cyan-400 hover:text-cyan-300`}>
                Contact
              </Link>
            </nav>

          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
        {/* Full-width background image */}
        <div className="absolute inset-0 bg-[#0a0a0f]">
          <Image
            src={brand.heroImage}
            alt="AI-Powered DevSecOps"
            fill
            className="object-contain object-left"
            priority
          />
          {/* Gradient overlay for text readability - starts later to keep guy visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent from-30% via-[#0a0a0f]/80 via-50% to-[#0a0a0f]" />
        </div>

        {/* Content overlay */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 min-h-[600px] lg:min-h-[700px] flex items-center">
          <div className="ml-auto max-w-lg lg:max-w-xl text-right lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {brand.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 mb-8">
              {brand.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-end lg:justify-start">
              <Link
                href="/contact"
                className="btn-chrome-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
              >
                Book Your Personal Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="btn-chrome inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-zinc-200 rounded-lg"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-12 border-t border-amber-900/30 bg-gradient-to-r from-amber-950/20 via-orange-950/20 to-amber-950/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">How ready are you?</h3>
                <p className="text-zinc-400">Take our 3-minute AI evaluation to assess your DevSecOps readiness.</p>
              </div>
            </div>
            <Link
              href="/assessment"
              className="btn-chrome-primary flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
            >
              Start Evaluation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              From initial assessment to ongoing support. We&apos;re with you every
              step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{service.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why We&apos;re Different
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              We&apos;re not your typical cybersecurity consultants. We deliver
              practical, tailored DevSecOps strategies that work in your environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-zinc-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Solutions for Your Industry
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Tailored security strategies for enterprise, government, and regulated
              industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Comprehensive DevSecOps for large organizations with complex security
                requirements.
              </p>
              <Link
                href="/solutions"
                className="link-chrome text-sm font-medium"
              >
                Learn more →
              </Link>
            </div>
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-2">Government</h3>
              <p className="text-sm text-zinc-400 mb-4">
                FedRAMP-ready security infrastructure meeting federal compliance
                requirements.
              </p>
              <Link
                href="/solutions"
                className="link-chrome text-sm font-medium"
              >
                Learn more →
              </Link>
            </div>
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-2">EU Compliance</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Security aligned with NIS2, Cyber Resilience Act, and GDPR requirements.
              </p>
              <Link
                href="/solutions"
                className="link-chrome text-sm font-medium"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 overflow-hidden">
            <div className="relative max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to strengthen your security posture?
              </h2>
              <p className="text-lg text-zinc-400 mb-8">
                Schedule a free discovery call. We&apos;ll assess your current security
                challenges and show you the path forward.
              </p>
              <Link
                href="/contact"
                className="btn-chrome-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white rounded-lg"
              >
                Book Your Personal Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-16 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Logo and tagline */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.logoFooterWidth}
                  height={brand.logoFooterHeight}
                  className="rounded-lg shadow-lg shadow-cyan-500/20"
                />
                <span className="text-2xl font-bold">
                  <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Axiom</span>
                  <span className="text-white">Matrix</span>
                </span>
              </div>
              <p className="text-zinc-400 max-w-md leading-relaxed">
                {brand.tagline} — {brand.description}
              </p>
            </div>

            {/* Social and contact */}
            <div className="md:text-right">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Connect With Us</h4>
              <div className="flex items-center gap-4 md:justify-end mb-6">
                <a
                  href={brand.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={brand.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <div className="flex items-center gap-3 text-lg md:justify-end" title="Serving clients globally">
                <span>🇺🇸</span>
                <span>🇩🇪</span>
                <span>🇦🇹</span>
                <span>🇫🇷</span>
                <span>🇬🇧</span>
                <span>🇨🇦</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} {brand.copyrightOwner}. All rights reserved.
            </p>
            <p className="text-zinc-500 text-sm">
              {brand.location}
            </p>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
