"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, Linkedin, Twitter, Mail } from "lucide-react";
import AIAssistant from "./AIAssistant";
import { brand } from "@/lib/brand";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact", highlight: true },
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isUnderConstruction = pathname === "/under-construction";

  if (isHomePage || isUnderConstruction) {
    // Homepage and under construction handle their own layout
    return <>{children}</>;
  }

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-700/50 backdrop-blur-md bg-gradient-to-b from-zinc-900/95 to-[#0a0a0f]/90 shadow-lg shadow-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
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
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link-chrome font-display px-4 py-1.5 text-sm font-semibold tracking-wide uppercase transition-all ${
                    item.highlight
                      ? "text-cyan-400 hover:text-cyan-300"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-zinc-400 hover:text-white">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-16 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo and tagline */}
            <div className="lg:col-span-2">
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
              <p className="text-zinc-400 max-w-md leading-relaxed mb-6">
                {brand.description}
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4">
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
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/core-devsecops-maturity-assessment" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    DevSecOps Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/tailored-ci-cd-pipeline-security-integration" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Pipeline Security
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    Readiness Evaluation
                  </Link>
                </li>
                <li>
                  <Link href="/aisecops-assessment" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    AISecOps Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/ai-act-assessment" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    AI Act Readiness
                  </Link>
                </li>
                <li>
                  <Link href="/cra-assessment" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">
                    CRA Readiness
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} {brand.copyrightOwner}. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-lg" title="Serving clients globally">
              <span>🇺🇸</span>
              <span>🇩🇪</span>
              <span>🇦🇹</span>
              <span>🇫🇷</span>
              <span>🇬🇧</span>
              <span>🇨🇦</span>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </>
  );
}
