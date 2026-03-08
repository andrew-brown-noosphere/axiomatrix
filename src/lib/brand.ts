// Brand configuration - customize these values to rebrand the entire site
// All fields marked [CUSTOMIZE] should be updated for your brand
export const brand = {
  // [CUSTOMIZE] Company name and messaging
  name: "AxiomMatrix",
  copyrightOwner: "Voyant, LLC", // Legal entity for copyright
  tagline: "Your Tagline Here",
  description: "Your company description for DevSecOps consulting services.",

  // [CUSTOMIZE] Contact info
  email: "contact@yourdomain.com",

  // [CUSTOMIZE] Social links (leave empty string to hide)
  linkedin: "https://linkedin.com/company/yourbrand",
  twitter: "https://twitter.com/yourbrand",

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
  heroTitle: "Your Hero Headline Here",
  heroSubtitle: "Your compelling hero subtitle that explains your value proposition to security leaders.",

};

export type Brand = typeof brand;
