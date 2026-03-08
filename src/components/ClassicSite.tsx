"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const services = [
  {
    title: "Free Discovery Call",
    description:
      "A DevSecOps discovery call is designed to help you understand where you stand today and what it will take to strengthen your security posture.",
  },
  {
    title: "Core DevSecOps Maturity Assessment",
    description:
      "We identify your security challenges and deliver a high-impact plan that strengthens your code, fortifies your pipeline, and streamlines your DevSecOps practices.",
  },
  {
    title: "Tailored CI/CD Pipeline Security Integration",
    description:
      "We work with your team to integrate security into your CI/CD pipeline, strengthening every stage of delivery and enabling faster, safer releases.",
  },
  {
    title: "DevSecOps Training",
    description:
      "We help your team build a lasting DevSecOps mindset because tools don't secure systems—people do.",
  },
];

const values = [
  {
    title: "Real Security",
    description: "Practical solutions protecting business operations",
  },
  {
    title: "Tailored Approach",
    description: "Custom strategies for unique environments",
  },
  {
    title: "Team-First",
    description: "Working collaboratively with existing personnel",
  },
];

export default function ClassicSite() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo/bold-logo.jpg"
                alt="AxiomMatrix"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">
                <span className="text-cyan-500">Axiom</span>
                <span className="text-cyan-400">Matrix</span>
              </span>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-purple-600 font-medium">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium">
                Contact
              </a>
            </nav>

            {/* Phone */}
            <a
              href="tel:+13142283004"
              className="hidden md:flex items-center gap-2 text-purple-600 font-semibold"
            >
              <Phone className="h-4 w-4" />
              +1 (314) 228-3004
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Securing your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  software development
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your trusted guide on the DevSecOps journey
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Get your free consultation today
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/img/Hero-section3.png"
                alt="DevSecOps Security"
                width={500}
                height={500}
                className="max-w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              We&apos;re not your typical cybersecurity consultants
            </h2>
            <p className="text-lg text-gray-600">
              No generic paperwork, no canned solutions. We deliver practical, tailored
              DevSecOps strategies that work in your environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial assessment to ongoing support. We&apos;re with you every step of
              the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center text-purple-600 font-medium text-sm hover:text-pink-500"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to strengthen your security posture?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Schedule a free discovery call. We&apos;ll assess your current security
            challenges and show you the path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contact@axiommatrix.io"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              contact@axiommatrix.io
            </a>
            <a
              href="tel:+13142283004"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              <Phone className="h-5 w-5" />
              +1 (314) 228-3004
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/img/logo/bold-logo.jpg"
                  alt="AxiomMatrix"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <span className="text-2xl font-bold">
                  <span className="text-cyan-400">Axiom</span>
                  <span className="text-cyan-300">Matrix</span>
                </span>
              </div>
              <p className="mt-4 text-gray-400">
                Your trusted guide on the DevSecOps journey.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-white">Free Discovery Call</a></li>
                <li><a href="#services" className="hover:text-white">DevSecOps Assessment</a></li>
                <li><a href="#services" className="hover:text-white">CI/CD Integration</a></li>
                <li><a href="#services" className="hover:text-white">DevSecOps Training</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@axiommatrix.io
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +1 (314) 228-3004
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  St. Louis, Missouri, USA
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            © 2026 AxiomMatrix. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
