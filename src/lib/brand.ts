// Brand configuration - customize these values to rebrand the entire site
// All fields marked [CUSTOMIZE] should be updated for your brand
export const brand = {
  // [CUSTOMIZE] Company name and messaging
  name: "AxioMatrix",
  copyrightOwner: "Voyant, LLC", // Legal entity for copyright
  tagline: "Securing the AI Era",
  description: "Augmenting SecOps leaders as they navigate the age of AI.",

  // [CUSTOMIZE] Contact info
  email: "andrew@voyant.io",

  // [CUSTOMIZE] Social links (leave empty string to hide)
  linkedin: "",
  twitter: "",

  // [CUSTOMIZE] Logo - replace with your logo file
  logo: "/img/logo/logo-AM.jpg",
  logoWidth: 44,
  logoHeight: 44,
  logoFooterWidth: 48,
  logoFooterHeight: 48,

  // [CUSTOMIZE] Colors (Tailwind color names: cyan, purple, blue, green, etc.)
  accent: "cyan",
  accentColor: "#22d3ee", // Match your accent Tailwind color

  // [CUSTOMIZE] Hero section
  heroImage: "/img/HeroSection-CISO.jpg",
  heroTitle: "Securing Your Software, DevOps, and Agentic Workflows",
  heroSubtitle: "You are the SecOps leader your organization trusts to thrive fearlessly in the age of AI. We're here to augment your superpowers as you bravely lead technical teams into this next tech cycle.",

};

export type Brand = typeof brand;
