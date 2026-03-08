// Brand configuration - swap this to rebrand the entire site
export const brand = {
  name: "AxiomMatrix",
  tagline: "Security. Certainty. Delivered.",
  description: "Next-generation DevSecOps solutions for enterprises navigating the AI era.",

  // Contact
  phone: "+1 (555) 987-6543",
  phoneHref: "tel:+15559876543",
  email: "contact@axiommatrix.io",
  location: "Austin, TX",

  // Social
  linkedin: "https://linkedin.com/company/axiommatrix",
  twitter: "https://twitter.com/axiommatrix",

  // Logo
  logo: "/img/logo/bold-logo.jpg",
  logoWidth: 44,
  logoHeight: 44,
  logoFooterWidth: 48,
  logoFooterHeight: 48,

  // Colors (Tailwind classes)
  accent: "cyan",
  accentColor: "#22d3ee", // cyan-400

  // Hero
  heroImage: "/img/HeroSection-CISO.jpg",
  heroTitle: "Securing Your Software, DevOps, and Agentic Workflows",
  heroSubtitle: "You are the SecOps leader your organization trusts to thrive fearlessly in the age of AI. We're here to augment your superpowers as you bravely lead technical teams into this next tech cycle.",

};

export type Brand = typeof brand;
