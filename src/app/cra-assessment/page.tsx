"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  ArrowRight,
  CornerDownLeft,
  Shield,
  FileText,
  Code,
  AlertTriangle,
  Settings,
  BarChart3,
  Mail,
  Calendar,
  Sparkles,
  Bug,
  Package,
  Bell,
  CheckCircle,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  FileCheck,
} from "lucide-react";
import { brand } from "@/lib/brand";

// CRA Assessment sections - 6 sections aligned to CRA requirements
const sections = [
  {
    id: "governance",
    title: "Governance & Documentation",
    subtitle: "Foundation",
    description: "Policies, documentation, and support period management",
    icon: FileText,
    questions: [
      {
        id: "gov-1",
        question: "Do you have documented cybersecurity policies for product development?",
        topic: "Cybersecurity Policies",
        context: "The CRA requires manufacturers to have documented cybersecurity policies covering the entire product lifecycle. This includes secure development practices, vulnerability handling, and incident response procedures.",
        standards: ["CRA Art. 13", "CRA Annex I Part I", "ISO/IEC 27001", "IEC 62443"],
        options: [
          { value: 0, label: "No documented cybersecurity policies exist" },
          { value: 1, label: "Informal guidelines, not formally documented" },
          { value: 2, label: "Documented policies covering key security areas" },
          { value: 3, label: "Comprehensive policies with regular review cycles and audit trails" },
        ],
      },
      {
        id: "gov-2",
        question: "How do you define and communicate product support periods?",
        topic: "Support Period Management",
        context: "CRA Article 13(8) requires manufacturers to determine and communicate the expected product lifetime and provide security updates for at least 5 years or the expected lifetime, whichever is longer.",
        standards: ["CRA Art. 13(8)", "CRA Art. 13(15)", "EN 303 645"],
        options: [
          { value: 0, label: "Support periods not defined or communicated" },
          { value: 1, label: "Informal support commitments, not consistently communicated" },
          { value: 2, label: "Defined support periods communicated at point of sale" },
          { value: 3, label: "Clear support periods with proactive end-of-support notifications and transition planning" },
        ],
      },
      {
        id: "gov-3",
        question: "Do you maintain technical documentation for conformity assessment?",
        topic: "Technical Documentation",
        context: "CRA Annex VII requires comprehensive technical documentation including design specifications, risk assessments, and evidence of conformity with essential requirements.",
        standards: ["CRA Annex VII", "CRA Art. 31", "CE Marking Requirements"],
        options: [
          { value: 0, label: "No technical documentation maintained" },
          { value: 1, label: "Basic documentation exists but incomplete" },
          { value: 2, label: "Comprehensive documentation covering most requirements" },
          { value: 3, label: "Complete documentation with version control, ready for conformity assessment" },
        ],
      },
    ],
  },
  {
    id: "development",
    title: "Secure Development",
    subtitle: "Building",
    description: "Security integrated throughout the development lifecycle",
    icon: Code,
    questions: [
      {
        id: "dev-1",
        question: "How do you integrate security requirements into product design?",
        topic: "Security by Design",
        context: "CRA Annex I requires products to be designed, developed, and produced to ensure appropriate cybersecurity based on risks. Security must be considered from the design phase, not bolted on later.",
        standards: ["CRA Annex I 1(a)", "NIST SSDF", "ISO/IEC 27034", "OWASP SAMM"],
        options: [
          { value: 0, label: "Security not considered during design" },
          { value: 1, label: "Ad-hoc security considerations during development" },
          { value: 2, label: "Security requirements documented and reviewed at design phase" },
          { value: 3, label: "Formal threat modeling, security architecture review, and security requirements traceability" },
        ],
      },
      {
        id: "dev-2",
        question: "Do you perform security testing before product release?",
        topic: "Security Testing",
        context: "CRA requires products to be tested for vulnerabilities before release. This includes static analysis, dynamic testing, and penetration testing appropriate to the product's risk level.",
        standards: ["CRA Annex I 1(c)", "OWASP Testing Guide", "IEC 62443-4-1", "ISO/IEC 27034"],
        options: [
          { value: 0, label: "No security testing performed" },
          { value: 1, label: "Basic automated scanning only" },
          { value: 2, label: "Comprehensive SAST/DAST with remediation tracking" },
          { value: 3, label: "Full security testing program including penetration testing and third-party assessment" },
        ],
      },
      {
        id: "dev-3",
        question: "How do you ensure secure default configurations?",
        topic: "Secure Defaults",
        context: "CRA Annex I requires products to be delivered with secure default configurations, including protection against unauthorized access and mechanisms for data protection.",
        standards: ["CRA Annex I 1(d)", "CRA Annex I 2(1)", "CIS Benchmarks", "NIST SP 800-123"],
        options: [
          { value: 0, label: "Default configurations not security-reviewed" },
          { value: 1, label: "Some security defaults, inconsistently applied" },
          { value: 2, label: "Documented secure default configuration standards" },
          { value: 3, label: "Hardened defaults with security configuration guides and validation testing" },
        ],
      },
    ],
  },
  {
    id: "vulnerability",
    title: "Vulnerability Management",
    subtitle: "Responding",
    description: "Handling vulnerabilities throughout the product lifecycle",
    icon: Bug,
    questions: [
      {
        id: "vuln-1",
        question: "Do you have a coordinated vulnerability disclosure process?",
        topic: "Vulnerability Disclosure",
        context: "CRA Article 13(6) requires manufacturers to have policies and procedures for coordinated vulnerability disclosure, including a contact point for reporting vulnerabilities.",
        standards: ["CRA Art. 13(6)", "ISO/IEC 29147", "ISO/IEC 30111", "CERT Guide"],
        options: [
          { value: 0, label: "No vulnerability disclosure process exists" },
          { value: 1, label: "Ad-hoc handling of reported vulnerabilities" },
          { value: 2, label: "Documented disclosure policy with security contact" },
          { value: 3, label: "Mature CVD program with SLAs, bug bounty, and researcher relationships" },
        ],
      },
      {
        id: "vuln-2",
        question: "Can you meet the 24-hour notification requirement for actively exploited vulnerabilities?",
        topic: "Rapid Notification",
        context: "CRA Article 14 requires notification to ENISA within 24 hours of becoming aware of an actively exploited vulnerability. This requires real-time detection and reporting capabilities.",
        standards: ["CRA Art. 14(2)(a)", "CRA Art. 14(3)", "NIS2 Directive"],
        options: [
          { value: 0, label: "No capability to detect or report within 24 hours" },
          { value: 1, label: "Manual processes, 24-hour timeline would be challenging" },
          { value: 2, label: "Processes exist but not tested against 24-hour SLA" },
          { value: 3, label: "Tested incident response with proven 24-hour notification capability" },
        ],
      },
      {
        id: "vuln-3",
        question: "How quickly can you develop and deploy security patches?",
        topic: "Patch Velocity",
        context: "CRA requires manufacturers to address vulnerabilities without delay and provide security updates free of charge. Patch velocity directly impacts your ability to meet CRA obligations.",
        standards: ["CRA Art. 13(8)", "CRA Annex I 2(5)", "FIRST PSIRT Services Framework"],
        options: [
          { value: 0, label: "No established patching process, weeks or months to deploy" },
          { value: 1, label: "Patches deployed within weeks for critical issues" },
          { value: 2, label: "Critical patches within days, routine patches within weeks" },
          { value: 3, label: "Emergency patches within 24-48 hours, automated deployment infrastructure" },
        ],
      },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain Security",
    subtitle: "Components",
    description: "Managing third-party components and dependencies",
    icon: Package,
    questions: [
      {
        id: "sc-1",
        question: "Do you generate and maintain Software Bills of Materials (SBOMs)?",
        topic: "SBOM Generation",
        context: "CRA Article 13(5) requires identifying and documenting components, including open source. SBOMs are essential for tracking vulnerabilities in third-party components.",
        standards: ["CRA Art. 13(5)", "NTIA SBOM", "CycloneDX", "SPDX"],
        options: [
          { value: 0, label: "No SBOM generation or component tracking" },
          { value: 1, label: "Manual component lists, not comprehensive" },
          { value: 2, label: "Automated SBOM generation for most products" },
          { value: 3, label: "Full SBOM automation with vulnerability monitoring and customer distribution" },
        ],
      },
      {
        id: "sc-2",
        question: "How do you assess security of third-party components before use?",
        topic: "Component Assessment",
        context: "CRA holds manufacturers responsible for the security of all components in their products. Due diligence on third-party components is essential for compliance.",
        standards: ["CRA Annex I 1(a)", "OWASP Dependency-Check", "OpenSSF Scorecard", "SLSA"],
        options: [
          { value: 0, label: "No security assessment of third-party components" },
          { value: 1, label: "Basic license compliance checks only" },
          { value: 2, label: "Vulnerability scanning of dependencies before use" },
          { value: 3, label: "Comprehensive evaluation including security posture, maintenance, and provenance" },
        ],
      },
      {
        id: "sc-3",
        question: "Do you monitor components for newly discovered vulnerabilities?",
        topic: "Continuous Monitoring",
        context: "Vulnerabilities are discovered in components after integration. CRA requires manufacturers to address vulnerabilities throughout the product lifecycle, necessitating continuous monitoring.",
        standards: ["CRA Art. 13(8)", "CVE", "OSV", "GitHub Advisory Database"],
        options: [
          { value: 0, label: "No ongoing monitoring of component vulnerabilities" },
          { value: 1, label: "Periodic manual checks" },
          { value: 2, label: "Automated alerts for known vulnerabilities in dependencies" },
          { value: 3, label: "Real-time monitoring with automated triage and remediation workflows" },
        ],
      },
    ],
  },
  {
    id: "incident",
    title: "Incident Reporting",
    subtitle: "Notifying",
    description: "Detection and reporting to authorities and customers",
    icon: Bell,
    questions: [
      {
        id: "inc-1",
        question: "Are you prepared to report to the EU Single Reporting Platform?",
        topic: "EU Reporting Infrastructure",
        context: "CRA Article 14 requires reporting exploited vulnerabilities and severe incidents to ENISA via the Single Reporting Platform. Registration and familiarity with the platform is required before incidents occur.",
        standards: ["CRA Art. 14", "CRA Art. 16", "ENISA Guidelines"],
        options: [
          { value: 0, label: "Unaware of reporting requirements or platform" },
          { value: 1, label: "Aware of requirements but not registered" },
          { value: 2, label: "Registered with basic understanding of reporting process" },
          { value: 3, label: "Registered, tested reporting workflows, staff trained on procedures" },
        ],
      },
      {
        id: "inc-2",
        question: "Can you notify affected customers of vulnerabilities and available patches?",
        topic: "Customer Notification",
        context: "CRA Article 13(12) requires notifying users about security issues and available updates. You need mechanisms to reach customers and communicate security information effectively.",
        standards: ["CRA Art. 13(12)", "CRA Annex I 2(8)", "ISO/IEC 29147"],
        options: [
          { value: 0, label: "No mechanism to notify customers of security issues" },
          { value: 1, label: "Can notify some customers through basic channels" },
          { value: 2, label: "Customer database with security notification capability" },
          { value: 3, label: "Automated security advisory system with delivery confirmation and tracking" },
        ],
      },
      {
        id: "inc-3",
        question: "Do you have incident response procedures specific to CRA requirements?",
        topic: "CRA Incident Response",
        context: "CRA incidents have specific reporting timelines and requirements. Your incident response procedures should explicitly address CRA obligations including 24-hour and 72-hour notification windows.",
        standards: ["CRA Art. 14", "NIST SP 800-61", "ISO/IEC 27035", "FIRST PSIRT"],
        options: [
          { value: 0, label: "No incident response procedures" },
          { value: 1, label: "Generic IR procedures, CRA not specifically addressed" },
          { value: 2, label: "IR procedures updated to include CRA notification requirements" },
          { value: 3, label: "CRA-specific playbooks with defined roles, tested through exercises" },
        ],
      },
    ],
  },
  {
    id: "conformity",
    title: "Conformity Assessment",
    subtitle: "Certifying",
    description: "Demonstrating compliance and CE marking readiness",
    icon: FileCheck,
    questions: [
      {
        id: "conf-1",
        question: "Have you classified your products under CRA categories?",
        topic: "Product Classification",
        context: "CRA categorizes products as Default, Important (Class I/II), or Critical. Classification determines conformity assessment requirements - self-assessment vs. third-party certification.",
        standards: ["CRA Art. 7", "CRA Annex III", "CRA Annex IV"],
        options: [
          { value: 0, label: "Products not classified under CRA categories" },
          { value: 1, label: "Informal understanding of likely classification" },
          { value: 2, label: "Formal classification with supporting rationale" },
          { value: 3, label: "Classification documented, conformity assessment path identified for each product" },
        ],
      },
      {
        id: "conf-2",
        question: "Do you have evidence to demonstrate conformity with essential requirements?",
        topic: "Conformity Evidence",
        context: "CRA Annex I lists essential cybersecurity requirements. You need documented evidence demonstrating how each applicable requirement is met for conformity assessment.",
        standards: ["CRA Annex I", "CRA Annex VII", "EN 303 645", "IEC 62443"],
        options: [
          { value: 0, label: "No evidence collection or mapping to requirements" },
          { value: 1, label: "Some evidence exists but not organized against requirements" },
          { value: 2, label: "Evidence mapped to essential requirements with gaps identified" },
          { value: 3, label: "Complete evidence package ready for conformity assessment" },
        ],
      },
      {
        id: "conf-3",
        question: "Are you prepared for CE marking and EU Declaration of Conformity?",
        topic: "CE Marking Readiness",
        context: "CRA-compliant products must bear CE marking and be accompanied by an EU Declaration of Conformity. This requires completing conformity assessment and maintaining technical documentation.",
        standards: ["CRA Art. 28", "CRA Art. 30", "CRA Annex VI", "Decision 768/2008/EC"],
        options: [
          { value: 0, label: "CE marking process not understood or planned" },
          { value: 1, label: "Aware of requirements but not prepared" },
          { value: 2, label: "Preparing documentation and conformity assessment" },
          { value: 3, label: "Ready to affix CE marking with complete Declaration of Conformity" },
        ],
      },
    ],
  },
];

// CRA-specific risk assessments
const riskAssessments: Record<number, { level: string; color: string; message: string }> = {
  0: { level: "Critical Gap", color: "text-red-400", message: "Significant CRA compliance gap. This area requires immediate attention before September 2026 deadline." },
  1: { level: "Major Gap", color: "text-amber-400", message: "Notable gap exists. Formalize processes and implement controls to meet CRA requirements." },
  2: { level: "Partial Compliance", color: "text-cyan-400", message: "Good foundation in place. Strengthen documentation and testing to ensure full compliance." },
  3: { level: "Strong Position", color: "text-green-400", message: "Well-prepared for CRA compliance. Maintain practices and monitor for regulatory updates." },
};

// CRA-specific recommendations based on section scores
const recommendations: Record<string, { low: string[]; medium: string[]; high: string[] }> = {
  governance: {
    low: [
      "Develop documented cybersecurity policies aligned with CRA Annex I requirements",
      "Define and publish support periods for all products (minimum 5 years)",
      "Begin compiling technical documentation required by CRA Annex VII",
      "Assign CRA compliance ownership within your organization",
    ],
    medium: [
      "Review and formalize support period communications at point of sale",
      "Ensure technical documentation covers all essential requirements",
      "Implement policy review cycles to maintain currency",
    ],
    high: [
      "Conduct periodic audits of documentation completeness",
      "Monitor for CRA regulatory updates and guidance",
    ],
  },
  development: {
    low: [
      "Implement threat modeling at the design phase for all products",
      "Deploy SAST/DAST tools in your development pipeline",
      "Document secure default configuration standards",
      "Train development teams on CRA security requirements",
    ],
    medium: [
      "Enhance security testing with penetration testing for critical products",
      "Validate secure defaults through automated testing",
      "Implement security requirements traceability",
    ],
    high: [
      "Consider third-party security assessments for Important/Critical products",
      "Maintain security testing evidence for conformity assessment",
    ],
  },
  vulnerability: {
    low: [
      "Establish a vulnerability disclosure policy with public contact point",
      "Implement processes to detect actively exploited vulnerabilities",
      "Build capability to develop and deploy patches rapidly",
      "Document vulnerability handling procedures aligned with ISO 30111",
    ],
    medium: [
      "Test 24-hour notification capability through tabletop exercises",
      "Reduce patch deployment time to meet CRA expectations",
      "Establish relationships with security researchers",
    ],
    high: [
      "Consider bug bounty program to proactively identify vulnerabilities",
      "Automate vulnerability notification workflows",
    ],
  },
  "supply-chain": {
    low: [
      "Implement automated SBOM generation in your build pipeline",
      "Deploy dependency scanning tools (e.g., OWASP Dependency-Check)",
      "Establish criteria for evaluating third-party component security",
      "Create inventory of all open source and third-party components",
    ],
    medium: [
      "Implement continuous monitoring for component vulnerabilities",
      "Establish remediation SLAs for vulnerable dependencies",
      "Evaluate component provenance and supply chain integrity",
    ],
    high: [
      "Consider SLSA compliance for build provenance",
      "Distribute SBOMs to customers upon request",
    ],
  },
  incident: {
    low: [
      "Register for the EU Single Reporting Platform when available",
      "Develop incident response procedures specific to CRA requirements",
      "Build customer notification capabilities for security advisories",
      "Train staff on CRA reporting obligations and timelines",
    ],
    medium: [
      "Test reporting workflows through simulation exercises",
      "Implement automated security advisory distribution",
      "Establish relationships with relevant CSIRTs",
    ],
    high: [
      "Conduct regular CRA incident response drills",
      "Integrate CRA reporting into security operations",
    ],
  },
  conformity: {
    low: [
      "Classify all products under CRA categories (Default, Important, Critical)",
      "Identify conformity assessment path for each product category",
      "Begin mapping evidence to CRA essential requirements",
      "Understand CE marking and Declaration of Conformity requirements",
    ],
    medium: [
      "Complete evidence collection against essential requirements",
      "Engage with notified bodies if third-party assessment required",
      "Prepare EU Declaration of Conformity templates",
    ],
    high: [
      "Finalize conformity assessment documentation",
      "Prepare for market surveillance authority interactions",
    ],
  },
};

// Calculate scores
function calculateScores(answers: Record<string, number>) {
  const sectionScores: Record<string, number> = {};

  sections.forEach((section) => {
    const answered = section.questions.filter((q) => answers[q.id] !== undefined);
    if (answered.length > 0) {
      const sum = answered.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
      sectionScores[section.id] = Math.round((sum / answered.length) * 10) / 10;
    } else {
      sectionScores[section.id] = 0;
    }
  });

  const answeredSections = Object.values(sectionScores).filter((s) => s > 0);
  const overall = answeredSections.length > 0
    ? answeredSections.reduce((a, b) => a + b, 0) / answeredSections.length
    : 0;

  return { sectionScores, overall: Math.round(overall * 10) / 10 };
}

function getReadinessLabel(score: number): string {
  if (score < 1) return "Not Ready";
  if (score < 2) return "Early Stage";
  if (score < 2.5) return "Progressing";
  return "Well Prepared";
}

function getScoreColor(score: number): string {
  if (score < 1) return "text-red-400";
  if (score < 2) return "text-amber-400";
  if (score < 2.5) return "text-cyan-400";
  return "text-green-400";
}

function getScoreBgColor(score: number): string {
  if (score < 1) return "from-red-500/20 to-red-500/5";
  if (score < 2) return "from-amber-500/20 to-amber-500/5";
  if (score < 2.5) return "from-cyan-500/20 to-cyan-500/5";
  return "from-green-500/20 to-green-500/5";
}

// Generate PDF report
function generatePDF(scores: { sectionScores: Record<string, number>; overall: number }, answers: Record<string, number>) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper function for text wrapping
  const addWrappedText = (text: string, x: number, yPos: number, maxWidth: number, lineHeight: number = 6): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return yPos + (lines.length * lineHeight);
  };

  // Helper to add dark background to page
  const addDarkBackground = () => {
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  };

  // Helper to draw radar chart
  const drawRadarChart = (centerX: number, centerY: number, maxRadius: number) => {
    const labels = ["Governance", "Dev", "Vuln", "Supply Chain", "Incident", "Conformity"];
    const values = [
      scores.sectionScores.governance || 0,
      scores.sectionScores.development || 0,
      scores.sectionScores.vulnerability || 0,
      scores.sectionScores["supply-chain"] || 0,
      scores.sectionScores.incident || 0,
      scores.sectionScores.conformity || 0,
    ];

    const angleStep = (2 * Math.PI) / 6;
    const startAngle = -Math.PI / 2;

    const getPoint = (index: number, value: number) => {
      const angle = startAngle + index * angleStep;
      const radius = (value / 3) * maxRadius;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    };

    // Draw grid hexagons
    [1, 2, 3].forEach((level) => {
      doc.setDrawColor(40, 45, 50);
      doc.setLineWidth(0.3);
      const points: number[][] = [];
      for (let i = 0; i < 6; i++) {
        const point = getPoint(i, level);
        points.push([point.x, point.y]);
      }
      // Draw hexagon
      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        doc.line(points[i][0], points[i][1], points[next][0], points[next][1]);
      }
    });

    // Draw axis lines
    doc.setDrawColor(40, 45, 50);
    for (let i = 0; i < 6; i++) {
      const point = getPoint(i, 3);
      doc.line(centerX, centerY, point.x, point.y);
    }

    // Draw score polygon
    const scorePoints: number[][] = values.map((v, i) => {
      const point = getPoint(i, v);
      return [point.x, point.y];
    });

    // Draw score polygon outline (cyan lines connecting the score points)
    doc.setDrawColor(34, 211, 238);
    doc.setLineWidth(1.5);
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      doc.line(scorePoints[i][0], scorePoints[i][1], scorePoints[next][0], scorePoints[next][1]);
    }

    // Draw points on vertices
    values.forEach((v, i) => {
      const point = getPoint(i, v);
      // Outer circle
      doc.setFillColor(10, 10, 15);
      doc.setDrawColor(34, 211, 238);
      doc.setLineWidth(1);
      doc.circle(point.x, point.y, 2.5, "FD");
      // Inner dot
      doc.setFillColor(34, 211, 238);
      doc.circle(point.x, point.y, 1, "F");
    });

    // Draw labels
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 130);
    labels.forEach((label, i) => {
      const point = getPoint(i, 3.5);
      let align: "center" | "left" | "right" = "center";
      let xOffset = 0;
      if (i === 1 || i === 2) {
        align = "left";
        xOffset = 2;
      } else if (i === 4 || i === 5) {
        align = "right";
        xOffset = -2;
      }
      doc.text(label, point.x + xOffset, point.y + 1, { align });
    });
  };

  // Helper to draw icon (simplified geometric icons)
  const drawIcon = (x: number, y: number, type: string) => {
    doc.setFillColor(34, 211, 238);
    doc.setDrawColor(34, 211, 238);
    doc.setLineWidth(0.5);

    switch (type) {
      case "governance":
        // Document icon
        doc.rect(x, y, 6, 7, "S");
        doc.line(x + 1.5, y + 2, x + 4.5, y + 2);
        doc.line(x + 1.5, y + 3.5, x + 4.5, y + 3.5);
        doc.line(x + 1.5, y + 5, x + 3.5, y + 5);
        break;
      case "development":
        // Code brackets icon
        doc.line(x + 1, y + 1, x - 1, y + 3.5);
        doc.line(x - 1, y + 3.5, x + 1, y + 6);
        doc.line(x + 5, y + 1, x + 7, y + 3.5);
        doc.line(x + 7, y + 3.5, x + 5, y + 6);
        break;
      case "vulnerability":
        // Bug/gear icon
        doc.circle(x + 3, y + 3.5, 2.5, "S");
        doc.line(x + 3, y, x + 3, y + 1);
        doc.line(x + 3, y + 6, x + 3, y + 7);
        break;
      case "supply-chain":
        // Shield icon
        doc.setLineWidth(0.7);
        const shieldPath = [
          [x + 3, y],
          [x + 6, y + 1.5],
          [x + 6, y + 4],
          [x + 3, y + 7],
          [x, y + 4],
          [x, y + 1.5],
        ];
        for (let i = 0; i < shieldPath.length; i++) {
          const next = (i + 1) % shieldPath.length;
          doc.line(shieldPath[i][0], shieldPath[i][1], shieldPath[next][0], shieldPath[next][1]);
        }
        break;
      case "incident":
        // Alert/bell icon
        doc.circle(x + 3, y + 2, 2, "S");
        doc.line(x + 1, y + 4, x + 5, y + 4);
        doc.line(x + 2, y + 4, x + 2, y + 6);
        doc.line(x + 4, y + 4, x + 4, y + 6);
        break;
      case "conformity":
        // Clipboard icon
        doc.rect(x, y + 1, 6, 6, "S");
        doc.rect(x + 1.5, y, 3, 1.5, "S");
        break;
    }
  };

  // ========== PAGE 1: Dashboard ==========
  addDarkBackground();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("CRA Compliance Assessment", pageWidth / 2, 18, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 110);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | ${brand.name}`, pageWidth / 2, 26, { align: "center" });

  // Left panel - Radar Chart
  const leftPanelX = 15;
  const leftPanelY = 35;
  const leftPanelW = 85;
  const leftPanelH = 100;

  // Panel background
  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.setLineWidth(0.5);
  doc.roundedRect(leftPanelX, leftPanelY, leftPanelW, leftPanelH, 3, 3, "FD");

  // Panel title
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Readiness by Area", leftPanelX + leftPanelW / 2, leftPanelY + 12, { align: "center" });

  // Draw radar chart
  drawRadarChart(leftPanelX + leftPanelW / 2, leftPanelY + 58, 32);

  // Right panel - Score Breakdown
  const rightPanelX = 108;
  const rightPanelY = 35;
  const rightPanelW = 87;
  const rightPanelH = 100;

  // Panel background
  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.roundedRect(rightPanelX, rightPanelY, rightPanelW, rightPanelH, 3, 3, "FD");

  // Panel title
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Score Breakdown", rightPanelX + 8, rightPanelY + 12);

  // Score items
  const scoreItems = [
    { id: "governance", label: "Governance & Documentation" },
    { id: "development", label: "Secure Development" },
    { id: "vulnerability", label: "Vulnerability Management" },
    { id: "supply-chain", label: "Supply Chain Security" },
    { id: "incident", label: "Incident Reporting" },
    { id: "conformity", label: "Conformity Assessment" },
  ];

  let scoreY = rightPanelY + 22;
  scoreItems.forEach((item) => {
    const score = scores.sectionScores[item.id] || 0;

    // Icon
    drawIcon(rightPanelX + 8, scoreY - 4, item.id);

    // Label
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 210);
    doc.text(item.label, rightPanelX + 18, scoreY);

    // Score value
    doc.setTextColor(255, 255, 255);
    doc.text(`${score.toFixed(1)}/3.0`, rightPanelX + rightPanelW - 8, scoreY, { align: "right" });

    // Progress bar background
    const barX = rightPanelX + 18;
    const barY = scoreY + 2;
    const barW = rightPanelW - 28;
    const barH = 3;

    doc.setFillColor(30, 35, 40);
    doc.roundedRect(barX, barY, barW, barH, 1, 1, "F");

    // Progress bar fill (cyan)
    const fillW = (score / 3) * barW;
    if (fillW > 0) {
      doc.setFillColor(34, 211, 238);
      doc.roundedRect(barX, barY, fillW, barH, 1, 1, "F");
    }

    scoreY += 13;
  });

  // Bottom panel - Key CRA Deadlines
  const bottomPanelX = 15;
  const bottomPanelY = 145;
  const bottomPanelW = pageWidth - 30;
  const bottomPanelH = 45;

  // Panel background
  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.roundedRect(bottomPanelX, bottomPanelY, bottomPanelW, bottomPanelH, 3, 3, "FD");

  // Warning icon (triangle)
  doc.setFillColor(245, 158, 11);
  doc.triangle(
    bottomPanelX + 12, bottomPanelY + 9,
    bottomPanelX + 8, bottomPanelY + 16,
    bottomPanelX + 16, bottomPanelY + 16,
    "F"
  );
  // Exclamation mark
  doc.setFillColor(18, 18, 22);
  doc.rect(bottomPanelX + 11.3, bottomPanelY + 11, 1.4, 3, "F");
  doc.circle(bottomPanelX + 12, bottomPanelY + 15, 0.6, "F");

  // Title
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("Key CRA Deadlines", bottomPanelX + 22, bottomPanelY + 14);

  // Deadlines in two columns
  const deadlines = [
    { date: "SEP 2026", desc: "Vulnerability reporting requirements begin" },
    { date: "AUG 2026", desc: "Type A product compliance deadline" },
    { date: "OCT 2026", desc: "Type B/C product compliance deadline" },
    { date: "DEC 2027", desc: "Full CRA obligations apply" },
  ];

  doc.setFontSize(8);
  const col1X = bottomPanelX + 12;
  const col2X = bottomPanelX + bottomPanelW / 2 + 5;
  let dlY = bottomPanelY + 26;

  deadlines.forEach((dl, i) => {
    const x = i % 2 === 0 ? col1X : col2X;
    const y = dlY;

    // Orange date
    doc.setTextColor(245, 158, 11);
    doc.setFont("helvetica", "bold");
    doc.text(dl.date, x, y);

    // White description
    doc.setTextColor(180, 180, 190);
    doc.setFont("helvetica", "normal");
    doc.text(dl.desc, x + 22, y);

    if (i % 2 === 1) dlY += 10;
  });

  // Overall score badge at bottom
  const badgeY = 200;
  doc.setFillColor(25, 30, 35);
  doc.setDrawColor(34, 211, 238);
  doc.setLineWidth(1);
  doc.roundedRect(pageWidth / 2 - 40, badgeY, 80, 30, 3, 3, "FD");

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 160);
  doc.text("Overall Score", pageWidth / 2, badgeY + 10, { align: "center" });

  doc.setFontSize(18);
  const scoreColor = scores.overall < 1 ? [239, 68, 68] : scores.overall < 2 ? [245, 158, 11] : [34, 211, 238];
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`${scores.overall}/3.0`, pageWidth / 2, badgeY + 23, { align: "center" });

  // ========== PAGE 2: Recommendations ==========
  doc.addPage();
  addDarkBackground();
  let y = 25;

  doc.setFontSize(18);
  doc.setTextColor(34, 211, 238);
  doc.text("Recommendations", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Generate recommendations based on scores
  sections.forEach((section) => {
    const score = scores.sectionScores[section.id] || 0;
    const sectionRecs = recommendations[section.id];

    let recsToShow: string[] = [];
    if (score < 1.5) {
      recsToShow = sectionRecs.low;
    } else if (score < 2.5) {
      recsToShow = sectionRecs.medium;
    } else {
      recsToShow = sectionRecs.high;
    }

    if (y > 250) {
      doc.addPage();
      addDarkBackground();
      y = 25;
    }

    // Section header with colored bar
    const headerColor = score < 1 ? [239, 68, 68] : score < 2 ? [245, 158, 11] : [34, 211, 238];
    doc.setFillColor(25, 28, 32);
    doc.roundedRect(15, y - 4, pageWidth - 30, 12, 2, 2, "F");

    // Colored accent bar on left
    doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.roundedRect(15, y - 4, 3, 12, 1, 1, "F");

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(section.title, 22, y + 4);

    doc.setFontSize(9);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text(`${score}/3.0`, pageWidth - 20, y + 4, { align: "right" });
    y += 15;

    // Recommendations
    doc.setFontSize(9);
    recsToShow.forEach((rec) => {
      if (y > 270) {
        doc.addPage();
        addDarkBackground();
        y = 25;
      }
      doc.setTextColor(34, 211, 238);
      doc.text("→", 20, y);
      doc.setTextColor(180, 180, 190);
      y = addWrappedText(rec, 28, y, pageWidth - 48, 5);
      y += 4;
    });

    y += 10;
  });

  // ========== PAGE 3: Next Steps ==========
  doc.addPage();
  addDarkBackground();
  y = 25;

  doc.setFontSize(18);
  doc.setTextColor(34, 211, 238);
  doc.text("Next Steps", pageWidth / 2, y, { align: "center" });
  y += 20;

  const nextSteps = [
    { num: "01", text: "Review the draft CRA guidance on the EU Commission 'Have Your Say' portal" },
    { num: "02", text: "Provide feedback to the Commission before March 31, 2026" },
    { num: "03", text: "Classify all your products under CRA categories" },
    { num: "04", text: "Prioritize gaps identified in this assessment" },
    { num: "05", text: "Establish a CRA compliance project with clear ownership" },
    { num: "06", text: "Register for the Single Reporting Platform when available" },
  ];

  nextSteps.forEach((step) => {
    // Step number in subtle cyan circle
    doc.setFillColor(20, 40, 50);
    doc.setDrawColor(34, 80, 100);
    doc.setLineWidth(0.5);
    doc.circle(25, y, 6, "FD");

    doc.setFontSize(9);
    doc.setTextColor(34, 211, 238);
    doc.setFont("helvetica", "bold");
    doc.text(step.num, 25, y + 1, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 225);
    y = addWrappedText(step.text, 38, y + 1, pageWidth - 60, 6);
    y += 10;
  });

  y += 15;

  // CTA Box
  doc.setFillColor(20, 35, 45);
  doc.setDrawColor(34, 211, 238);
  doc.setLineWidth(1);
  doc.roundedRect(15, y, pageWidth - 30, 50, 4, 4, "FD");

  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("Need Help with CRA Compliance?", pageWidth / 2, y + 18, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(160, 165, 175);
  doc.text(`${brand.name} provides DevSecOps consulting and tooling`, pageWidth / 2, y + 30, { align: "center" });
  doc.text("to help you meet CRA requirements with automated compliance evidence.", pageWidth / 2, y + 38, { align: "center" });

  y += 60;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(80, 85, 95);
  doc.text(`${brand.name} | ${brand.email.split('@')[1]}`, pageWidth / 2, pageHeight - 20, { align: "center" });
  doc.text("This assessment provides guidance only and does not constitute legal advice.", pageWidth / 2, pageHeight - 14, { align: "center" });

  // Save
  doc.save("CRA-Compliance-Assessment.pdf");
}

// Spider Chart Component
function SpiderChart({ scores }: { scores: Record<string, number> }) {
  const labels = ["Governance", "Development", "Vulnerability", "Supply Chain", "Incident", "Conformity"];
  const values = [
    scores.governance || 0,
    scores.development || 0,
    scores.vulnerability || 0,
    scores["supply-chain"] || 0,
    scores.incident || 0,
    scores.conformity || 0,
  ];

  const size = 220;
  const center = size / 2;
  const maxRadius = 85;

  const angleStep = (2 * Math.PI) / 6;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const radius = (value / 3) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const scorePath = values.map((v, i) => {
    const point = getPoint(i, v);
    return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`;
  }).join(" ") + " Z";

  const gridCircles = [1, 2, 3].map((level) => {
    const points = Array.from({ length: 6 }, (_, i) => {
      const point = getPoint(i, level);
      return `${point.x},${point.y}`;
    }).join(" ");
    return points;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px] mx-auto">
      <defs>
        <linearGradient id="craScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {gridCircles.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="rgb(63, 63, 70)"
          strokeWidth="1"
          strokeDasharray={i === 2 ? "0" : "4 2"}
        />
      ))}

      {Array.from({ length: 6 }, (_, i) => {
        const point = getPoint(i, 3);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="rgb(63, 63, 70)"
            strokeWidth="1"
          />
        );
      })}

      <path
        d={scorePath}
        fill="url(#craScoreGradient)"
        stroke="rgb(34, 211, 238)"
        strokeWidth="2"
      />

      {values.map((v, i) => {
        const point = getPoint(i, v);
        return (
          <g key={i}>
            <circle cx={point.x} cy={point.y} r="6" fill="rgb(10, 10, 15)" stroke="rgb(34, 211, 238)" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="3" fill="rgb(34, 211, 238)" />
          </g>
        );
      })}

      {labels.map((label, i) => {
        const point = getPoint(i, 3.8);
        const anchor = i === 0 ? "middle" : i <= 2 ? "start" : i === 3 ? "middle" : "end";
        return (
          <text key={i} x={point.x} y={point.y} textAnchor={anchor} className="fill-zinc-400 text-[9px] font-medium">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

// Context Panel Component
function ContextPanel({
  question,
  answer,
  showRisk,
  onToggleRisk
}: {
  question: typeof sections[0]["questions"][0];
  answer: number | undefined;
  showRisk: boolean;
  onToggleRisk: () => void;
}) {
  const risk = answer !== undefined ? riskAssessments[answer] : null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
          <Sparkles className="h-4 w-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-medium text-white text-sm">CRA Context</h3>
          <p className="text-xs text-zinc-500">{question.topic}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-cyan-400">Regulatory Background</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {question.context}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-2 mb-3">
            <Shield className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-cyan-400">Relevant Standards</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {question.standards.map((standard) => (
              <span
                key={standard}
                className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {standard}
              </span>
            ))}
          </div>
        </div>

        {answer !== undefined && (
          <div className="border border-zinc-700/50 rounded-xl overflow-hidden">
            <button
              onClick={onToggleRisk}
              className="w-full flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${risk?.color}`} />
                <span className="text-sm font-medium text-white">Compliance Gap Assessment</span>
              </div>
              {showRisk ? (
                <ChevronUp className="h-4 w-4 text-zinc-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              )}
            </button>

            {showRisk && risk && (
              <div className="p-4 bg-zinc-900/50 border-t border-zinc-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-semibold ${risk.color}`}>
                    {risk.level}
                  </span>
                  <span className="text-xs text-zinc-500">
                    (Level {answer} selected)
                  </span>
                </div>
                <p className="text-sm text-zinc-400">
                  {risk.message}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Running Score Component
function RunningScore({ scores, answeredCount, totalCount }: {
  scores: { sectionScores: Record<string, number>; overall: number };
  answeredCount: number;
  totalCount: number;
}) {
  if (answeredCount === 0) return null;

  return (
    <div className={`bg-gradient-to-br ${getScoreBgColor(scores.overall)} border border-zinc-700/50 rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-cyan-400" />
        <span className="text-xs font-medium text-zinc-400">Readiness Score</span>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className={`text-3xl font-bold ${getScoreColor(scores.overall)}`}>
          {scores.overall}
        </span>
        <span className="text-zinc-500 text-sm">/3.0</span>
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getScoreColor(scores.overall)} bg-current/10`}>
          {getReadinessLabel(scores.overall)}
        </span>
      </div>

      <div className="space-y-1.5">
        {sections.map((s) => {
          const score = scores.sectionScores[s.id] || 0;
          const hasAnswers = score > 0;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 w-20 truncate">{s.title}</span>
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    hasAnswers ? "bg-gradient-to-r from-cyan-500 to-cyan-400" : "bg-zinc-700"
                  }`}
                  style={{ width: `${(score / 3) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-400 w-6 text-right">
                {hasAnswers ? score : "-"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-700/50 text-center">
        <span className="text-[10px] text-zinc-500">{answeredCount}/{totalCount} questions</span>
      </div>
    </div>
  );
}

export default function CRAAssessmentPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showRiskPopup, setShowRiskPopup] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"in" | "out">("in");

  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const section = sections[currentSection];
  const question = section.questions[currentQuestion];
  const SectionIcon = section.icon;

  const scores = calculateScores(answers);

  useEffect(() => {
    setShowRiskAssessment(false);
    setIsAnimating(true);
    setAnimationDirection("in");
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentSection, currentQuestion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !showRiskPopup && !showResults) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showRiskPopup, showResults, answers, question.id]);

  const handleAnswer = (value: number) => {
    setSelectedOption(value);
    setAnswers((prev) => ({ ...prev, [question.id]: value }));

    setTimeout(() => {
      setSelectedOption(null);
    }, 300);
  };

  const animateAndNavigate = useCallback((navigateFn: () => void) => {
    setAnimationDirection("out");
    setIsAnimating(true);
    setTimeout(() => {
      navigateFn();
    }, 200);
  }, []);

  const navigateToNext = useCallback(() => {
    const navigate = () => {
      if (currentQuestion < section.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
        setCurrentQuestion(0);
      } else {
        setShowResults(true);
      }
    };
    animateAndNavigate(navigate);
  }, [currentQuestion, currentSection, section.questions.length, animateAndNavigate]);

  const handleNext = () => {
    if (answers[question.id] !== undefined) {
      setShowRiskPopup(true);
    } else {
      navigateToNext();
    }
  };

  const handleRiskPopupContinue = () => {
    setShowRiskPopup(false);
    navigateToNext();
  };

  const handleBack = () => {
    const navigate = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      } else if (currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
        setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
      }
    };
    animateAndNavigate(navigate);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/assessment-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          scores: scores.sectionScores,
          overall: scores.overall,
          answers,
          source: "cra-assessment",
        }),
      });
    } catch (error) {
      console.error("Failed to submit lead:", error);
    }

    setIsSubmitting(false);
    setEmailSubmitted(true);
  };

  const handleDownloadPDF = () => {
    generatePDF(scores, answers);
  };

  // Results page
  if (showResults) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <h1 className="font-semibold text-white">CRA Readiness Results</h1>
            </div>
            <div className="w-16" />
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-zinc-400">Cyber Resilience Act Compliance</span>
            </div>

            <div className={`text-7xl font-bold mb-2 ${getScoreColor(scores.overall)}`}>
              {scores.overall}
              <span className="text-3xl text-zinc-500">/3.0</span>
            </div>

            <p className={`text-xl font-medium ${getScoreColor(scores.overall)}`}>
              {getReadinessLabel(scores.overall)}
            </p>

            <p className="text-zinc-500 mt-2 max-w-md mx-auto">
              {scores.overall < 1.5
                ? "Significant gaps exist in your CRA readiness. Prioritize the recommendations below before the September 2026 deadline."
                : scores.overall < 2.5
                ? "You have a foundation for CRA compliance but need to address gaps in key areas before deadlines."
                : "You're well-positioned for CRA compliance. Focus on finalizing documentation and conformity assessment."
              }
            </p>
          </div>

          {/* Download PDF Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Download className="h-5 w-5" />
              Download PDF Report
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-6 text-center">Readiness by Area</h3>
              <SpiderChart scores={scores.sectionScores} />
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-6">Score Breakdown</h3>
              <div className="space-y-4">
                {sections.map((s) => {
                  const score = scores.sectionScores[s.id];
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-zinc-800">
                        <Icon className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-zinc-300">{s.title}</span>
                          <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}/3.0</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all"
                            style={{ width: `${(score / 3) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Key Deadlines */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Key CRA Deadlines
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-amber-400 font-mono text-sm font-bold">SEP 2026</div>
                <div className="text-sm text-zinc-300">Vulnerability reporting requirements begin</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-amber-400 font-mono text-sm font-bold">AUG 2026</div>
                <div className="text-sm text-zinc-300">Type A product compliance deadline</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-amber-400 font-mono text-sm font-bold">OCT 2026</div>
                <div className="text-sm text-zinc-300">Type B/C product compliance deadline</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-amber-400 font-mono text-sm font-bold">DEC 2027</div>
                <div className="text-sm text-zinc-300">Full CRA obligations apply</div>
              </div>
            </div>
          </div>

          {/* Top Recommendations */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-12">
            <h3 className="font-semibold text-white mb-4">Priority Recommendations</h3>
            <div className="space-y-3">
              {Object.entries(scores.sectionScores)
                .sort(([,a], [,b]) => a - b)
                .slice(0, 3)
                .map(([id, score]) => {
                  const sec = sections.find(s => s.id === id);
                  const recs = recommendations[id];
                  const recsToShow = score < 1.5 ? recs.low.slice(0, 2) : score < 2.5 ? recs.medium.slice(0, 2) : recs.high.slice(0, 1);
                  return (
                    <div key={id} className="p-4 bg-zinc-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-sm font-medium ${getScoreColor(score)}`}>{sec?.title}</span>
                        <span className="text-xs text-zinc-500">({score}/3.0)</span>
                      </div>
                      <ul className="space-y-1">
                        {recsToShow.map((rec, i) => (
                          <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
            <p className="text-xs text-zinc-500 mt-4 text-center">
              Download the PDF report for complete recommendations across all areas
            </p>
          </div>

          {!emailSubmitted ? (
            <div className="bg-gradient-to-r from-cyan-950/50 to-zinc-900/50 border border-cyan-500/20 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <Mail className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Get CRA Compliance Updates</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Receive updates on CRA implementation guidance, deadline reminders, and compliance tips.
                  </p>
                </div>
              </div>

              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:from-cyan-400 hover:to-cyan-300 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-white font-medium">Subscribed!</p>
              <p className="text-zinc-400 text-sm mt-1">You&apos;ll receive CRA compliance updates at {email}</p>
            </div>
          )}

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Need Help with CRA Compliance?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              {brand.name} provides DevSecOps consulting to help you meet CRA requirements — from SBOM generation to vulnerability management infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:from-cyan-400 hover:to-cyan-300 transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book Consultation
              </Link>
              <Link
                href="/blog/eu-cyber-resilience-act-draft-guidance-what-it-means"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-zinc-700 text-white hover:bg-zinc-800 transition-all"
              >
                Read CRA Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Survey page
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Exit</span>
            </Link>
            <div className="text-center">
              <h1 className="font-semibold text-white">CRA Compliance Assessment</h1>
              <p className="text-xs text-zinc-500">Cyber Resilience Act Readiness · 6 sections · 18 questions</p>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm text-zinc-400">{answeredQuestions}/{totalQuestions}</span>
            </div>
          </div>

          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Journey Roadmap */}
      <div className="border-b border-zinc-800/50 bg-gradient-to-r from-zinc-900/50 via-cyan-950/20 to-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-1">
            {sections.map((s, i) => {
              const Icon = s.icon;
              const isComplete = i < currentSection;
              const isCurrent = i === currentSection;
              return (
                <div key={s.id} className="flex-1 flex flex-col items-center">
                  <div className="relative flex items-center w-full">
                    {i > 0 && (
                      <div className={`absolute left-0 right-1/2 h-0.5 -translate-y-1/2 top-1/2 transition-all duration-500 ${
                        isComplete ? "bg-gradient-to-r from-cyan-400 to-cyan-400" : "bg-zinc-700"
                      }`} />
                    )}
                    {i < sections.length - 1 && (
                      <div className={`absolute left-1/2 right-0 h-0.5 -translate-y-1/2 top-1/2 transition-all duration-500 ${
                        isComplete ? "bg-gradient-to-r from-cyan-400 to-cyan-400" : "bg-zinc-700"
                      }`} />
                    )}
                    <div className={`relative mx-auto p-2 rounded-xl transition-all duration-300 ${
                      isCurrent
                        ? "bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20 scale-110"
                        : isComplete
                        ? "bg-cyan-500/20"
                        : "bg-zinc-800/50"
                    }`}>
                      <Icon className={`h-4 w-4 transition-colors ${
                        isCurrent ? "text-cyan-300" : isComplete ? "text-cyan-400" : "text-zinc-500"
                      }`} />
                    </div>
                  </div>
                  <span className={`mt-2 text-[10px] font-medium transition-colors ${
                    isCurrent ? "text-cyan-300" : isComplete ? "text-cyan-400/70" : "text-zinc-600"
                  }`}>
                    {s.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="w-80 border-r border-zinc-800 bg-zinc-900/30 p-6 hidden lg:block overflow-y-auto">
          <ContextPanel
            question={question}
            answer={answers[question.id]}
            showRisk={showRiskAssessment}
            onToggleRisk={() => setShowRiskAssessment(!showRiskAssessment)}
          />

          <div className="mt-6">
            <RunningScore scores={scores} answeredCount={answeredQuestions} totalCount={totalQuestions} />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className={`w-full max-w-2xl transition-all duration-300 ease-out ${
            isAnimating
              ? animationDirection === "out"
                ? "opacity-0 translate-y-4 scale-[0.98]"
                : "opacity-0 -translate-y-4 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100"
          }`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20 mb-3 transition-all duration-500 delay-75 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}>
                <div className="p-1.5 rounded-lg bg-cyan-500/20">
                  <SectionIcon className="h-4 w-4 text-cyan-400" />
                </div>
                <span className="text-cyan-400 font-medium">{section.title}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500 text-sm">
                  {currentQuestion + 1} of {section.questions.length}
                </span>
              </div>
              <p className={`text-zinc-500 text-sm transition-all duration-500 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}>{section.description}</p>
            </div>

            <h2 className={`text-2xl font-semibold text-white text-center mb-10 leading-relaxed transition-all duration-400 delay-150 ${
              isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}>
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = answers[question.id] === option.value;
                const isOptionAnimating = selectedOption === option.value;
                const staggerDelay = 200 + index * 50;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`group w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 transform ${
                      isOptionAnimating
                        ? "scale-[1.02] bg-gradient-to-r from-cyan-500/30 to-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10"
                        : isSelected
                        ? "bg-gradient-to-r from-cyan-500/20 to-transparent border-cyan-500/50 text-white"
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-cyan-500/30 hover:bg-gradient-to-r hover:from-cyan-950/30 hover:to-transparent hover:scale-[1.01]"
                    } ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
                    style={{
                      transitionDelay: isAnimating ? "0ms" : `${staggerDelay}ms`,
                      transitionDuration: "300ms"
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected || isOptionAnimating
                          ? "border-cyan-400 bg-gradient-to-br from-cyan-400 to-cyan-500"
                          : "border-zinc-600 group-hover:border-cyan-500/50"
                      }`}>
                        {(isSelected || isOptionAnimating) && (
                          <CheckCircle className="h-4 w-4 text-black" />
                        )}
                      </div>
                      <span className="flex-1">{option.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        option.value === 0 ? "bg-red-500/10 text-red-400/80 border border-red-500/20" :
                        option.value === 1 ? "bg-amber-500/10 text-amber-400/80 border border-amber-500/20" :
                        option.value === 2 ? "bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20" :
                        "bg-green-500/10 text-green-400/80 border border-green-500/20"
                      }`}>
                        Level {option.value}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Context */}
            <div className="lg:hidden mt-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">{question.topic}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{question.context}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {question.standards.slice(0, 3).map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-zinc-800/50">
              <button
                onClick={handleBack}
                disabled={currentSection === 0 && currentQuestion === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-600">Question</span>
                <div className="flex gap-1.5">
                  {section.questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i < currentQuestion
                          ? "w-1.5 bg-cyan-400"
                          : i === currentQuestion
                          ? "w-4 bg-gradient-to-r from-cyan-400 to-cyan-300"
                          : "w-1.5 bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentSection === sections.length - 1 && currentQuestion === section.questions.length - 1
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-medium hover:from-cyan-400 hover:to-cyan-300"
                    : answers[question.id] !== undefined
                    ? "bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-cyan-500/20"
                    : "text-zinc-500 hover:text-zinc-400 hover:bg-zinc-800/50"
                }`}
              >
                {currentSection === sections.length - 1 && currentQuestion === section.questions.length - 1
                  ? "See Results"
                  : answers[question.id] !== undefined ? "Enter" : "Skip"}
                {answers[question.id] !== undefined && !(currentSection === sections.length - 1 && currentQuestion === section.questions.length - 1)
                  ? <CornerDownLeft className="h-4 w-4" />
                  : <ArrowRight className="h-4 w-4" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment Popup */}
      {showRiskPopup && answers[question.id] !== undefined && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleRiskPopupContinue}
          />

          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className={`p-6 bg-gradient-to-br ${
                answers[question.id] === 0 ? "from-red-500/20 to-red-500/5" :
                answers[question.id] === 1 ? "from-amber-500/20 to-amber-500/5" :
                answers[question.id] === 2 ? "from-cyan-500/20 to-cyan-500/5" :
                "from-green-500/20 to-green-500/5"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${
                    answers[question.id] === 0 ? "bg-red-500/20" :
                    answers[question.id] === 1 ? "bg-amber-500/20" :
                    answers[question.id] === 2 ? "bg-cyan-500/20" :
                    "bg-green-500/20"
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${riskAssessments[answers[question.id]].color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Compliance Gap</p>
                    <h3 className={`text-lg font-semibold ${riskAssessments[answers[question.id]].color}`}>
                      {riskAssessments[answers[question.id]].level}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-zinc-300 leading-relaxed mb-4">
                  {riskAssessments[answers[question.id]].message}
                </p>

                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
                  <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-400">
                    Level {answers[question.id]} selected
                  </span>
                  <span>·</span>
                  <span>{question.topic}</span>
                </div>

                <button
                  onClick={handleRiskPopupContinue}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:from-cyan-400 hover:to-cyan-300 transition-all"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
