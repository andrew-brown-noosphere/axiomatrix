"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Mail, MapPin, Calendar, Play, Pause } from "lucide-react";
import { brand } from "@/lib/brand";

export default function ContactPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={180}
              height={180}
              className="mx-auto mb-8 rounded-2xl shadow-2xl shadow-cyan-500/20"
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-zinc-400">
              Schedule a free discovery call. We'll assess your current security posture and show you where AI-assisted DevSecOps fits.
            </p>
          </div>
        </div>
      </section>

      {/* Video Testimonial */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl shadow-cyan-500/10">
            <video
              ref={videoRef}
              className="w-full aspect-video bg-zinc-900"
onEnded={handleVideoEnd}
              playsInline
            >
              <source src="/video/ciso-testimonial.mp4" type="video/mp4" />
            </video>

            {/* Play/Pause overlay */}
            <button
              onClick={toggleVideo}
              className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
              }`}
            >
              <div className="btn-chrome-primary p-5 rounded-full shadow-lg shadow-cyan-500/30">
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </div>
            </button>
          </div>

          <p className="text-center text-zinc-400 text-sm mt-4">
            Hear from a CISO on navigating security in the age of AI
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href={`mailto:${brand.email}`} className="text-zinc-400 hover:text-cyan-400">
                      {brand.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-zinc-400">{brand.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Schedule a Call</p>
                    <p className="text-zinc-400">Book a 30-minute discovery call</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Send us a message</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                    placeholder="Tell us about your security challenges..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-chrome-primary w-full px-6 py-3 text-base font-semibold text-white rounded-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
