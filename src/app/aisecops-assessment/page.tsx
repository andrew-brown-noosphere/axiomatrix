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
  Brain,
  AlertTriangle,
  Users,
  BarChart3,
  Mail,
  Calendar,
  Sparkles,
  Eye,
  Scale,
  CheckCircle,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  Bot,
  Database,
  Lock,
  Network,
  Cpu,
  Radar,
} from "lucide-react";
import { brand } from "@/lib/brand";

// Question types for flexibility
type QuestionType = "yesno" | "scale" | "choice" | "multiselect";

interface QuestionOption {
  value: number | string;
  label: string;
  description?: string;
}

interface Question {
  id: string;
  question: string;
  type: QuestionType;
  topic: string;
  context: string;
  standards: string[];
  options: QuestionOption[];
  // For yes/no questions, define the weight/impact
  yesValue?: number;
  noValue?: number;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  questions: Question[];
}

// AISecOps Assessment sections - based on MITRE ATLAS, OWASP, NIST AI RMF
const sections: Section[] = [
  {
    id: "strategy",
    title: "AI Security Strategy",
    subtitle: "Foundation",
    description: "Understanding your AI landscape and security posture",
    icon: Brain,
    questions: [
      {
        id: "strat-1",
        question: "Do you maintain a comprehensive inventory of AI/ML systems in your organization?",
        type: "yesno",
        topic: "AI System Inventory",
        context: "NIST AI RMF MAP function requires organizations to identify and inventory AI systems. Without knowing what AI systems you have, you cannot secure them. This is foundational to AISecOps.",
        standards: ["NIST AI RMF MAP", "MITRE ATLAS", "ISO/IEC 42001"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 3,
        noValue: 0,
      },
      {
        id: "strat-2",
        question: "Who owns AI security in your organization?",
        type: "choice",
        topic: "Security Ownership",
        context: "Clear ownership of AI security is essential. The ideal is shared responsibility between security and AI/ML teams, with executive sponsorship. Lack of clear ownership leads to gaps.",
        standards: ["NIST AI RMF GOVERN", "Google SAIF", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "No one specifically owns AI security" },
          { value: 1, label: "Security team owns it, but limited AI expertise" },
          { value: 2, label: "AI/ML team owns it, but limited security expertise" },
          { value: 3, label: "Joint ownership with dedicated AISecOps function" },
        ],
      },
      {
        id: "strat-3",
        question: "Is AISecOps formally part of your security strategy?",
        type: "scale",
        topic: "Strategic Integration",
        context: "AISecOps must be integrated into your overall security strategy, not bolted on as an afterthought. This includes both using AI for security and securing AI systems.",
        standards: ["NIST AI RMF GOVERN", "Google SAIF", "NSFOCUS AISecOps"],
        options: [
          { value: 0, label: "AISecOps not addressed in security strategy" },
          { value: 1, label: "Informal awareness, no formal strategy" },
          { value: 2, label: "AISecOps included in security roadmap" },
          { value: 3, label: "Comprehensive AISecOps strategy with budget and KPIs" },
        ],
      },
    ],
  },
  {
    id: "ai-powered",
    title: "AI-Powered Security Operations",
    subtitle: "Axis 1",
    description: "Using AI to enhance your security operations",
    icon: Radar,
    questions: [
      {
        id: "aipow-1",
        question: "Are you using AI/ML for threat detection?",
        type: "yesno",
        topic: "AI Threat Detection",
        context: "AI-powered threat detection can identify patterns humans miss and process data at scale. This is the most common starting point for AISecOps Axis 1.",
        standards: ["NSFOCUS AISecOps", "Gartner SOC Framework"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 2,
        noValue: 0,
      },
      {
        id: "aipow-2",
        question: "What percentage of your security alerts are triaged by AI?",
        type: "choice",
        topic: "Alert Triage Automation",
        context: "Alert fatigue is a top SOC challenge. AI-powered triage can filter 80-90% of alerts, letting analysts focus on genuine threats. Enterprise average is 10,000+ alerts/day.",
        standards: ["NSFOCUS AISecOps", "MITRE ATLAS", "Gartner AIOps"],
        options: [
          { value: 0, label: "0% - All manual triage" },
          { value: 1, label: "Under 25% - Limited AI assistance" },
          { value: 2, label: "25-75% - Moderate AI triage" },
          { value: 3, label: "Over 75% - AI-first triage with human oversight" },
        ],
      },
      {
        id: "aipow-3",
        question: "Do you use AI for automated incident response?",
        type: "scale",
        topic: "Automated Response",
        context: "SOAR platforms with AI can automate containment actions, reducing response time from hours to seconds. Human oversight remains critical for high-impact actions.",
        standards: ["NSFOCUS AISecOps", "OODA Loop", "MITRE D3FEND"],
        options: [
          { value: 0, label: "No automation - all manual response" },
          { value: 1, label: "Basic playbooks, no AI-driven decisions" },
          { value: 2, label: "AI-suggested actions, human approval required" },
          { value: 3, label: "AI-driven response with human oversight for critical actions" },
        ],
      },
      {
        id: "aipow-4",
        question: "Do you use AI for proactive threat hunting?",
        type: "yesno",
        topic: "AI Threat Hunting",
        context: "AI can identify anomalies and patterns that indicate threats before they trigger alerts. Proactive hunting catches threats that evade detection rules.",
        standards: ["NSFOCUS AISecOps", "MITRE ATT&CK", "Threat Hunting Framework"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 2,
        noValue: 0,
      },
    ],
  },
  {
    id: "ai-security",
    title: "Security of AI Systems",
    subtitle: "Axis 2",
    description: "Protecting your AI/ML systems from threats",
    icon: Shield,
    questions: [
      {
        id: "aisec-1",
        question: "Have you assessed your AI systems against MITRE ATLAS or OWASP AI threats?",
        type: "scale",
        topic: "AI Threat Assessment",
        context: "MITRE ATLAS catalogs adversarial techniques against AI systems. OWASP provides the Top 10 for LLMs and ML Security. Assessment against these frameworks identifies gaps.",
        standards: ["MITRE ATLAS", "OWASP Top 10 for LLM", "OWASP ML Security Top 10"],
        options: [
          { value: 0, label: "Not aware of these frameworks" },
          { value: 1, label: "Aware but haven't conducted assessment" },
          { value: 2, label: "Partial assessment of high-risk AI systems" },
          { value: 3, label: "Comprehensive assessment with documented findings" },
        ],
      },
      {
        id: "aisec-2",
        question: "Do you test your LLM applications for prompt injection vulnerabilities?",
        type: "yesno",
        topic: "Prompt Injection Testing",
        context: "Prompt injection is the #1 vulnerability in LLM applications (OWASP LLM01). Both direct and indirect injection attacks can cause data exfiltration, unauthorized actions, and system compromise.",
        standards: ["OWASP LLM01", "MITRE ATLAS AML.T0043", "NIST AI RMF"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 3,
        noValue: 0,
      },
      {
        id: "aisec-3",
        question: "Do you have secure ML training pipelines?",
        type: "scale",
        topic: "Training Pipeline Security",
        context: "Training data poisoning (ATLAS AML.T0020) can insert backdoors into models. Secure pipelines include data provenance, integrity verification, and access controls.",
        standards: ["MITRE ATLAS AML.T0020", "OWASP LLM03", "Google SAIF"],
        options: [
          { value: 0, label: "No specific pipeline security measures" },
          { value: 1, label: "Basic access controls only" },
          { value: 2, label: "Data validation and access controls in place" },
          { value: 3, label: "Comprehensive pipeline security with provenance tracking" },
        ],
      },
      {
        id: "aisec-4",
        question: "Do you monitor AI model behavior in production for anomalies?",
        type: "yesno",
        topic: "Model Monitoring",
        context: "Models can drift, be poisoned, or behave unexpectedly in production. Runtime monitoring detects model degradation, adversarial inputs, and unexpected outputs.",
        standards: ["NIST AI RMF MEASURE", "Google SAIF", "MLOps Best Practices"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 2,
        noValue: 0,
      },
    ],
  },
  {
    id: "supply-chain",
    title: "AI Supply Chain Security",
    subtitle: "Dependencies",
    description: "Securing AI models, data, and dependencies",
    icon: Network,
    questions: [
      {
        id: "supply-1",
        question: "Do you verify the provenance of third-party AI models before deployment?",
        type: "yesno",
        topic: "Model Provenance",
        context: "Models from public hubs (Hugging Face, etc.) can contain malicious code or backdoors. ATLAS AML.T0035 covers ML supply chain compromise. Pickle deserialization can execute arbitrary code.",
        standards: ["MITRE ATLAS AML.T0035", "OWASP LLM05", "SLSA Framework"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 3,
        noValue: 0,
      },
      {
        id: "supply-2",
        question: "Do you maintain Software Bills of Materials (SBOMs) for AI systems?",
        type: "choice",
        topic: "AI SBOM",
        context: "AI systems have unique dependencies: models, training data, frameworks, and libraries. Traditional SBOMs may miss ML-specific components. Model cards extend SBOM concepts to AI.",
        standards: ["EU CRA", "NTIA SBOM", "NIST AI RMF", "Model Cards"],
        options: [
          { value: 0, label: "No SBOMs for AI systems" },
          { value: 1, label: "Standard SBOMs covering code dependencies only" },
          { value: 2, label: "Extended SBOMs including ML frameworks" },
          { value: 3, label: "Comprehensive AI SBOMs with model cards and data lineage" },
        ],
      },
      {
        id: "supply-3",
        question: "Do you have training data governance and provenance tracking?",
        type: "scale",
        topic: "Data Governance",
        context: "Training data quality and provenance directly impact model security. Poisoned or biased training data creates vulnerable or unfair models. Governance ensures data integrity.",
        standards: ["NIST AI RMF MAP", "EU AI Act", "OWASP LLM03"],
        options: [
          { value: 0, label: "No formal training data governance" },
          { value: 1, label: "Basic data storage, no provenance tracking" },
          { value: 2, label: "Data cataloging with some provenance" },
          { value: 3, label: "Full data lineage, quality controls, and access governance" },
        ],
      },
    ],
  },
  {
    id: "operations",
    title: "AI Security Operations",
    subtitle: "Operations",
    description: "Day-to-day security operations for AI systems",
    icon: Cpu,
    questions: [
      {
        id: "ops-1",
        question: "Do you have incident response playbooks specific to AI systems?",
        type: "yesno",
        topic: "AI Incident Response",
        context: "AI incidents require different response procedures than traditional security incidents. Model compromise, training data breach, and adversarial attacks need specialized playbooks.",
        standards: ["NIST AI RMF MANAGE", "MITRE ATLAS", "NIST CSF"],
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        yesValue: 3,
        noValue: 0,
      },
      {
        id: "ops-2",
        question: "Do you have human oversight for AI-driven decisions?",
        type: "scale",
        topic: "Human Oversight",
        context: "AI systems should have appropriate human oversight, especially for high-impact decisions. The EU AI Act mandates human oversight for high-risk AI. 'Human-in-the-loop' vs 'human-on-the-loop' depends on risk.",
        standards: ["EU AI Act Art. 14", "NIST AI RMF", "IEEE 7001"],
        options: [
          { value: 0, label: "No human oversight mechanisms" },
          { value: 1, label: "Humans can review AI outputs if needed" },
          { value: 2, label: "Human approval required for high-impact decisions" },
          { value: 3, label: "Tiered oversight based on decision risk level" },
        ],
      },
      {
        id: "ops-3",
        question: "Do you have logging and audit trails for AI system decisions?",
        type: "choice",
        topic: "AI Audit Logging",
        context: "Traceability is essential for incident investigation, compliance, and debugging. Logs should capture inputs, outputs, model versions, and decision context.",
        standards: ["EU AI Act Art. 12", "NIST AI RMF MEASURE", "SOC 2"],
        options: [
          { value: 0, label: "No AI-specific logging" },
          { value: 1, label: "Basic input/output logging" },
          { value: 2, label: "Comprehensive logging with retention policy" },
          { value: 3, label: "Tamper-evident logging with explainability data" },
        ],
      },
    ],
  },
  {
    id: "culture",
    title: "AI Security Culture",
    subtitle: "People",
    description: "Building AI security skills and collaboration",
    icon: Users,
    questions: [
      {
        id: "culture-1",
        question: "Do your security teams understand AI-specific threats?",
        type: "scale",
        topic: "Security Team AI Literacy",
        context: "Security teams need to understand ATLAS techniques, prompt injection, model poisoning, and other AI-specific threats. Traditional security training doesn't cover these.",
        standards: ["NIST AI RMF GOVERN", "EU AI Act Art. 4", "MITRE ATLAS"],
        options: [
          { value: 0, label: "No AI-specific security training" },
          { value: 1, label: "Basic awareness of AI security concepts" },
          { value: 2, label: "Training on AI threats and frameworks (ATLAS, OWASP)" },
          { value: 3, label: "Deep expertise with hands-on AI red teaming skills" },
        ],
      },
      {
        id: "culture-2",
        question: "Do your AI/ML teams understand security requirements?",
        type: "scale",
        topic: "AI Team Security Literacy",
        context: "AI developers often prioritize functionality over security. Security must be integrated into ML workflows, not added as an afterthought.",
        standards: ["NIST AI RMF GOVERN", "Secure SDLC", "MLOps Best Practices"],
        options: [
          { value: 0, label: "No security training for AI teams" },
          { value: 1, label: "Basic security awareness training" },
          { value: 2, label: "Security integrated into ML development process" },
          { value: 3, label: "AI teams actively participate in security reviews and threat modeling" },
        ],
      },
      {
        id: "culture-3",
        question: "Is there regular collaboration between security and AI teams?",
        type: "choice",
        topic: "Cross-Team Collaboration",
        context: "AISecOps requires tight collaboration between security and AI/ML teams. Siloed teams create gaps. Joint threat modeling, shared tooling, and integrated processes are key.",
        standards: ["NIST AI RMF GOVERN", "DevSecOps Principles", "Google SAIF"],
        options: [
          { value: 0, label: "Teams operate independently" },
          { value: 1, label: "Ad-hoc collaboration when issues arise" },
          { value: 2, label: "Regular meetings and shared channels" },
          { value: 3, label: "Integrated AISecOps team or embedded security engineers" },
        ],
      },
    ],
  },
];

// Risk assessments for different score levels
const riskAssessments: Record<number, { level: string; color: string; message: string }> = {
  0: { level: "Critical Gap", color: "text-red-400", message: "This area has significant gaps requiring immediate attention. Adversaries actively exploit these weaknesses." },
  1: { level: "Major Gap", color: "text-amber-400", message: "Notable gaps exist that should be addressed in your AISecOps roadmap." },
  2: { level: "Developing", color: "text-cyan-400", message: "Good foundation in place. Continue building maturity in this area." },
  3: { level: "Mature", color: "text-green-400", message: "Strong practices in place. Focus on continuous improvement and emerging threats." },
};

// Recommendations based on section scores
const recommendations: Record<string, { low: string[]; medium: string[]; high: string[] }> = {
  strategy: {
    low: [
      "Conduct an immediate AI system inventory across all business units",
      "Assign clear ownership for AI security — ideally joint between security and AI teams",
      "Add AISecOps to your security strategy and roadmap",
      "Read the NIST AI RMF and NSFOCUS AISecOps whitepaper",
    ],
    medium: [
      "Document your AI inventory with risk classifications",
      "Develop AISecOps KPIs and metrics",
      "Allocate dedicated budget for AI security initiatives",
    ],
    high: [
      "Benchmark your AISecOps maturity against industry standards",
      "Consider dedicated AISecOps team or function",
      "Share learnings with industry through AI incident sharing",
    ],
  },
  "ai-powered": {
    low: [
      "Evaluate AI-powered threat detection tools (SIEM with ML, XDR)",
      "Identify highest-volume alert sources for AI triage pilot",
      "Research SOAR platforms with AI capabilities",
      "Start with supervised AI triage before full automation",
    ],
    medium: [
      "Expand AI triage coverage to additional alert sources",
      "Implement AI-suggested response actions with human approval",
      "Deploy AI-powered threat hunting capabilities",
    ],
    high: [
      "Optimize AI triage accuracy with feedback loops",
      "Extend automation to lower-risk response actions",
      "Develop custom AI models for your threat landscape",
    ],
  },
  "ai-security": {
    low: [
      "Study MITRE ATLAS and OWASP Top 10 for LLM Applications",
      "Conduct prompt injection testing on any LLM applications",
      "Implement input validation and output filtering for LLMs",
      "Add AI system monitoring to your security operations",
    ],
    medium: [
      "Complete ATLAS threat assessment for all AI systems",
      "Implement secure ML pipeline with access controls and validation",
      "Deploy runtime monitoring for model behavior anomalies",
    ],
    high: [
      "Conduct AI red team exercises against your systems",
      "Implement adversarial robustness testing in CI/CD",
      "Share AI security findings with relevant threat intelligence communities",
    ],
  },
  "supply-chain": {
    low: [
      "Audit all third-party AI models for provenance and integrity",
      "Never load untrusted pickle files or models without sandboxing",
      "Extend your SBOM program to include AI components",
      "Establish training data governance policies",
    ],
    medium: [
      "Implement model signing and verification workflows",
      "Deploy model scanning for malicious content",
      "Create data lineage tracking for training datasets",
    ],
    high: [
      "Publish model cards for internal and external AI systems",
      "Implement SLSA-style provenance for ML artifacts",
      "Contribute to AI supply chain security standards",
    ],
  },
  operations: {
    low: [
      "Develop AI-specific incident response playbooks",
      "Ensure human oversight mechanisms exist for AI decisions",
      "Implement basic logging for AI system inputs and outputs",
      "Train incident responders on AI-specific scenarios",
    ],
    medium: [
      "Test AI incident response playbooks through tabletop exercises",
      "Implement tiered human oversight based on decision risk",
      "Establish log retention and audit procedures for AI systems",
    ],
    high: [
      "Conduct AI-specific red team exercises",
      "Implement explainability capabilities for high-risk AI decisions",
      "Automate AI incident detection and initial response",
    ],
  },
  culture: {
    low: [
      "Provide ATLAS and OWASP AI training to security teams",
      "Include security training in AI/ML onboarding",
      "Establish regular touchpoints between security and AI teams",
      "Create shared Slack/Teams channels for AI security topics",
    ],
    medium: [
      "Develop hands-on AI security training (prompt injection labs, etc.)",
      "Integrate security reviews into ML development workflow",
      "Hold joint threat modeling sessions for new AI projects",
    ],
    high: [
      "Build internal AI red team capability",
      "Embed security engineers in AI/ML teams",
      "Contribute to external AI security research and standards",
    ],
  },
};

// Calculate scores - handling different question types
function calculateScores(answers: Record<string, number | string | string[]>) {
  const sectionScores: Record<string, number> = {};

  sections.forEach((section) => {
    let totalPoints = 0;
    let maxPoints = 0;

    section.questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer === undefined) return;

      if (q.type === "yesno") {
        maxPoints += 3;
        if (answer === "yes") {
          totalPoints += q.yesValue ?? 3;
        } else {
          totalPoints += q.noValue ?? 0;
        }
      } else if (q.type === "scale" || q.type === "choice") {
        maxPoints += 3;
        totalPoints += typeof answer === "number" ? answer : 0;
      } else if (q.type === "multiselect" && Array.isArray(answer)) {
        // For multiselect, score based on number of items selected vs expected
        maxPoints += 3;
        const scoreRatio = answer.length / q.options.length;
        totalPoints += Math.min(3, Math.round(scoreRatio * 3));
      }
    });

    sectionScores[section.id] = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 3 * 10) / 10 : 0;
  });

  const answeredSections = Object.values(sectionScores).filter((s) => s > 0);
  const overall = answeredSections.length > 0
    ? answeredSections.reduce((a, b) => a + b, 0) / answeredSections.length
    : 0;

  return { sectionScores, overall: Math.round(overall * 10) / 10 };
}

function getReadinessLabel(score: number): string {
  if (score < 1) return "Initial";
  if (score < 1.5) return "Developing";
  if (score < 2.5) return "Established";
  return "Advanced";
}

function getScoreColor(score: number): string {
  if (score < 1) return "text-red-400";
  if (score < 1.5) return "text-amber-400";
  if (score < 2.5) return "text-cyan-400";
  return "text-green-400";
}

function getScoreBgColor(score: number): string {
  if (score < 1) return "from-red-500/20 to-red-500/5";
  if (score < 1.5) return "from-amber-500/20 to-amber-500/5";
  if (score < 2.5) return "from-cyan-500/20 to-cyan-500/5";
  return "from-green-500/20 to-green-500/5";
}

// Generate PDF report
function generatePDF(scores: { sectionScores: Record<string, number>; overall: number }, answers: Record<string, number | string | string[]>) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const addWrappedText = (text: string, x: number, yPos: number, maxWidth: number, lineHeight: number = 6): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return yPos + (lines.length * lineHeight);
  };

  const addDarkBackground = () => {
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  };

  const drawRadarChart = (centerX: number, centerY: number, maxRadius: number) => {
    const labels = ["Strategy", "AI-Powered", "AI Security", "Supply Chain", "Operations", "Culture"];
    const values = [
      scores.sectionScores.strategy || 0,
      scores.sectionScores["ai-powered"] || 0,
      scores.sectionScores["ai-security"] || 0,
      scores.sectionScores["supply-chain"] || 0,
      scores.sectionScores.operations || 0,
      scores.sectionScores.culture || 0,
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

    [1, 2, 3].forEach((level) => {
      doc.setDrawColor(40, 45, 50);
      doc.setLineWidth(0.3);
      const points: number[][] = [];
      for (let i = 0; i < 6; i++) {
        const point = getPoint(i, level);
        points.push([point.x, point.y]);
      }
      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        doc.line(points[i][0], points[i][1], points[next][0], points[next][1]);
      }
    });

    doc.setDrawColor(40, 45, 50);
    for (let i = 0; i < 6; i++) {
      const point = getPoint(i, 3);
      doc.line(centerX, centerY, point.x, point.y);
    }

    const scorePoints: number[][] = values.map((v, i) => {
      const point = getPoint(i, v);
      return [point.x, point.y];
    });

    doc.setDrawColor(6, 182, 212); // Cyan for AISecOps
    doc.setLineWidth(1.5);
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      doc.line(scorePoints[i][0], scorePoints[i][1], scorePoints[next][0], scorePoints[next][1]);
    }

    values.forEach((v, i) => {
      const point = getPoint(i, v);
      doc.setFillColor(10, 10, 15);
      doc.setDrawColor(6, 182, 212);
      doc.setLineWidth(1);
      doc.circle(point.x, point.y, 2.5, "FD");
      doc.setFillColor(6, 182, 212);
      doc.circle(point.x, point.y, 1, "F");
    });

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

  // ========== PAGE 1: Dashboard ==========
  addDarkBackground();

  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("AISecOps Maturity Assessment", pageWidth / 2, 18, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 110);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | ${brand.name}`, pageWidth / 2, 26, { align: "center" });

  const leftPanelX = 15;
  const leftPanelY = 35;
  const leftPanelW = 85;
  const leftPanelH = 100;

  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.setLineWidth(0.5);
  doc.roundedRect(leftPanelX, leftPanelY, leftPanelW, leftPanelH, 3, 3, "FD");

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Maturity by Area", leftPanelX + leftPanelW / 2, leftPanelY + 12, { align: "center" });

  drawRadarChart(leftPanelX + leftPanelW / 2, leftPanelY + 58, 32);

  const rightPanelX = 108;
  const rightPanelY = 35;
  const rightPanelW = 87;
  const rightPanelH = 100;

  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.roundedRect(rightPanelX, rightPanelY, rightPanelW, rightPanelH, 3, 3, "FD");

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Score Breakdown", rightPanelX + 8, rightPanelY + 12);

  const scoreItems = [
    { id: "strategy", label: "AI Security Strategy" },
    { id: "ai-powered", label: "AI-Powered Security Ops" },
    { id: "ai-security", label: "Security of AI Systems" },
    { id: "supply-chain", label: "AI Supply Chain" },
    { id: "operations", label: "AI Security Operations" },
    { id: "culture", label: "AI Security Culture" },
  ];

  let scoreY = rightPanelY + 22;
  scoreItems.forEach((item) => {
    const score = scores.sectionScores[item.id] || 0;

    doc.setFontSize(8);
    doc.setTextColor(200, 200, 210);
    doc.text(item.label, rightPanelX + 8, scoreY);

    doc.setTextColor(255, 255, 255);
    doc.text(`${score.toFixed(1)}/3.0`, rightPanelX + rightPanelW - 8, scoreY, { align: "right" });

    const barX = rightPanelX + 8;
    const barY = scoreY + 2;
    const barW = rightPanelW - 18;
    const barH = 3;

    doc.setFillColor(30, 35, 40);
    doc.roundedRect(barX, barY, barW, barH, 1, 1, "F");

    const fillW = (score / 3) * barW;
    if (fillW > 0) {
      doc.setFillColor(6, 182, 212);
      doc.roundedRect(barX, barY, fillW, barH, 1, 1, "F");
    }

    scoreY += 13;
  });

  // AISecOps Two Axes
  const bottomPanelX = 15;
  const bottomPanelY = 145;
  const bottomPanelW = pageWidth - 30;
  const bottomPanelH = 45;

  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.roundedRect(bottomPanelX, bottomPanelY, bottomPanelW, bottomPanelH, 3, 3, "FD");

  doc.setFillColor(6, 182, 212);
  doc.circle(bottomPanelX + 12, bottomPanelY + 12, 4, "F");

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("The Two Axes of AISecOps", bottomPanelX + 22, bottomPanelY + 14);

  doc.setFontSize(9);
  doc.setTextColor(6, 182, 212);
  doc.setFont("helvetica", "bold");
  doc.text("Axis 1: AI-Powered Security", bottomPanelX + 12, bottomPanelY + 28);
  doc.text("Axis 2: Security of AI", bottomPanelX + bottomPanelW / 2 + 5, bottomPanelY + 28);

  doc.setTextColor(180, 180, 190);
  doc.setFont("helvetica", "normal");
  doc.text("Using AI to enhance security operations", bottomPanelX + 12, bottomPanelY + 36);
  doc.text("Protecting AI systems from threats", bottomPanelX + bottomPanelW / 2 + 5, bottomPanelY + 36);

  // Overall score badge
  const badgeY = 200;
  doc.setFillColor(25, 30, 35);
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(1);
  doc.roundedRect(pageWidth / 2 - 40, badgeY, 80, 30, 3, 3, "FD");

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 160);
  doc.text("Overall Maturity", pageWidth / 2, badgeY + 10, { align: "center" });

  doc.setFontSize(18);
  const scoreColor = scores.overall < 1 ? [239, 68, 68] : scores.overall < 1.5 ? [245, 158, 11] : [6, 182, 212];
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`${scores.overall}/3.0`, pageWidth / 2, badgeY + 23, { align: "center" });

  // ========== PAGE 2: Recommendations ==========
  doc.addPage();
  addDarkBackground();
  let y = 25;

  doc.setFontSize(18);
  doc.setTextColor(6, 182, 212);
  doc.text("Recommendations", pageWidth / 2, y, { align: "center" });
  y += 15;

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

    const headerColor = score < 1 ? [239, 68, 68] : score < 1.5 ? [245, 158, 11] : [6, 182, 212];
    doc.setFillColor(25, 28, 32);
    doc.roundedRect(15, y - 4, pageWidth - 30, 12, 2, 2, "F");

    doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.roundedRect(15, y - 4, 3, 12, 1, 1, "F");

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(section.title, 22, y + 4);

    doc.setFontSize(9);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text(`${score}/3.0`, pageWidth - 20, y + 4, { align: "right" });
    y += 15;

    doc.setFontSize(9);
    recsToShow.forEach((rec) => {
      if (y > 270) {
        doc.addPage();
        addDarkBackground();
        y = 25;
      }
      doc.setTextColor(6, 182, 212);
      doc.text("→", 20, y);
      doc.setTextColor(180, 180, 190);
      y = addWrappedText(rec, 28, y, pageWidth - 48, 5);
      y += 4;
    });

    y += 10;
  });

  // ========== PAGE 3: Resources ==========
  doc.addPage();
  addDarkBackground();
  y = 25;

  doc.setFontSize(18);
  doc.setTextColor(6, 182, 212);
  doc.text("Key Resources", pageWidth / 2, y, { align: "center" });
  y += 20;

  const resources = [
    { name: "MITRE ATLAS", desc: "Adversarial Threat Landscape for AI Systems", url: "atlas.mitre.org" },
    { name: "OWASP AI Exchange", desc: "Comprehensive AI security guidance (300+ pages)", url: "owaspai.org" },
    { name: "OWASP Top 10 for LLMs", desc: "Canonical LLM vulnerability list", url: "owasp.org/www-project-top-10-for-large-language-model-applications" },
    { name: "NIST AI RMF", desc: "AI Risk Management Framework", url: "nist.gov/itl/ai-risk-management-framework" },
    { name: "Google SAIF", desc: "Secure AI Framework", url: "safety.google/cybersecurity-advancements/saif" },
    { name: "NSFOCUS AISecOps", desc: "AISecOps whitepaper and framework", url: "nsfocusglobal.com" },
  ];

  resources.forEach((resource) => {
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(resource.name, 20, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 190);
    doc.text(resource.desc, 20, y + 6);

    doc.setTextColor(6, 182, 212);
    doc.text(resource.url, 20, y + 12);

    y += 22;
  });

  y += 10;

  // CTA Box
  doc.setFillColor(20, 35, 45);
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(1);
  doc.roundedRect(15, y, pageWidth - 30, 50, 4, 4, "FD");

  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("Need Help Building Your AISecOps Program?", pageWidth / 2, y + 18, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(160, 165, 175);
  doc.text(`${brand.name} helps organizations build mature AISecOps capabilities`, pageWidth / 2, y + 30, { align: "center" });
  doc.text("across both axes — AI-powered security and security of AI systems.", pageWidth / 2, y + 38, { align: "center" });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(80, 85, 95);
  doc.text(`${brand.name} | ${brand.email.split('@')[1]}`, pageWidth / 2, pageHeight - 20, { align: "center" });
  doc.text("Assessment based on MITRE ATLAS, OWASP, NIST AI RMF, and Google SAIF frameworks.", pageWidth / 2, pageHeight - 14, { align: "center" });

  doc.save("AISecOps-Maturity-Assessment.pdf");
}

// Spider Chart Component
function SpiderChart({ scores }: { scores: Record<string, number> }) {
  const labels = ["Strategy", "AI-Powered", "AI Security", "Supply Chain", "Operations", "Culture"];
  const values = [
    scores.strategy || 0,
    scores["ai-powered"] || 0,
    scores["ai-security"] || 0,
    scores["supply-chain"] || 0,
    scores.operations || 0,
    scores.culture || 0,
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
        <linearGradient id="aisecopsScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.1" />
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
        fill="url(#aisecopsScoreGradient)"
        stroke="rgb(6, 182, 212)"
        strokeWidth="2"
      />

      {values.map((v, i) => {
        const point = getPoint(i, v);
        return (
          <g key={i}>
            <circle cx={point.x} cy={point.y} r="6" fill="rgb(10, 10, 15)" stroke="rgb(6, 182, 212)" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="3" fill="rgb(6, 182, 212)" />
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
  question: Question;
  answer: number | string | string[] | undefined;
  showRisk: boolean;
  onToggleRisk: () => void;
}) {
  // Calculate risk level based on answer
  let riskLevel = 0;
  if (answer !== undefined) {
    if (question.type === "yesno") {
      riskLevel = answer === "yes" ? (question.yesValue ?? 3) : (question.noValue ?? 0);
    } else if (typeof answer === "number") {
      riskLevel = answer;
    }
  }
  const risk = riskAssessments[riskLevel];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/20">
          <Sparkles className="h-4 w-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-medium text-white text-sm">Context</h3>
          <p className="text-xs text-zinc-500">{question.topic}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-cyan-400">Why This Matters</span>
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
                <span className="text-sm font-medium text-white">Gap Assessment</span>
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
        <span className="text-xs font-medium text-zinc-400">Maturity Score</span>
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
              <span className="text-[10px] text-zinc-500 w-20 truncate">{s.subtitle}</span>
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

export default function AISecOpsAssessmentPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
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

  const handleAnswer = (value: number | string) => {
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

  const handleNext = useCallback(() => {
    navigateToNext();
  }, [navigateToNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !showResults) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResults, handleNext]);

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
          source: "aisecops-assessment",
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
              <h1 className="font-semibold text-white">AISecOps Maturity Results</h1>
            </div>
            <div className="w-16" />
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
              <Bot className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-zinc-400">AISecOps Maturity</span>
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
                ? "Your AISecOps capabilities are in early stages. Focus on building foundations: AI inventory, basic threat assessment, and team alignment."
                : scores.overall < 2.5
                ? "You have AISecOps foundations in place. Now focus on expanding coverage, deepening capabilities, and operationalizing security across both axes."
                : "Strong AISecOps maturity. Continue advancing automation, building internal expertise, and contributing to the broader AI security community."
              }
            </p>
          </div>

          {/* Download PDF Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-white hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Download className="h-5 w-5" />
              Download PDF Report
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-6 text-center">Maturity by Area</h3>
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

          {/* Two Axes of AISecOps */}
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-cyan-400" />
              The Two Axes of AISecOps
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-cyan-400 font-medium mb-2">Axis 1: AI-Powered Security</div>
                <p className="text-sm text-zinc-400 mb-2">Using AI to enhance security operations</p>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getScoreColor(scores.sectionScores["ai-powered"] || 0)}`}>
                    {scores.sectionScores["ai-powered"] || 0}/3.0
                  </span>
                  <span className="text-xs text-zinc-500">{getReadinessLabel(scores.sectionScores["ai-powered"] || 0)}</span>
                </div>
              </div>
              <div>
                <div className="text-cyan-400 font-medium mb-2">Axis 2: Security of AI</div>
                <p className="text-sm text-zinc-400 mb-2">Protecting AI systems from threats</p>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getScoreColor(scores.sectionScores["ai-security"] || 0)}`}>
                    {scores.sectionScores["ai-security"] || 0}/3.0
                  </span>
                  <span className="text-xs text-zinc-500">{getReadinessLabel(scores.sectionScores["ai-security"] || 0)}</span>
                </div>
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
                  <h3 className="font-semibold text-white text-lg">Get AISecOps Updates</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Receive updates on AI security threats, framework updates, and AISecOps best practices.
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
                  className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-white hover:from-cyan-400 hover:to-cyan-300 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-white font-medium">Subscribed!</p>
              <p className="text-zinc-400 text-sm mt-1">You&apos;ll receive AISecOps updates at {email}</p>
            </div>
          )}

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Need Help Building Your AISecOps Program?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              {brand.name} helps organizations build mature AISecOps capabilities — from AI-powered SOC automation to securing your AI/ML systems against adversarial threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-white hover:from-cyan-400 hover:to-cyan-300 transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book Consultation
              </Link>
              <Link
                href="/blog/aisecops-what-it-is-why-you-need-it"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-zinc-700 text-white hover:bg-zinc-800 transition-all"
              >
                Read AISecOps Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Survey page - render different question types
  const renderQuestionOptions = () => {
    if (question.type === "yesno") {
      return (
        <div className="flex gap-4 justify-center">
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.value;
            const isOptionAnimating = selectedOption === option.value;
            return (
              <button
                key={String(option.value)}
                onClick={() => handleAnswer(option.value as string)}
                className={`group px-12 py-6 rounded-xl border transition-all duration-300 transform ${
                  isOptionAnimating
                    ? "scale-[1.05] bg-gradient-to-r from-cyan-500/30 to-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10"
                    : isSelected
                    ? "bg-gradient-to-r from-cyan-500/20 to-transparent border-cyan-500/50 text-white"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-cyan-500/30 hover:bg-gradient-to-r hover:from-cyan-950/30 hover:to-transparent hover:scale-[1.02]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected || isOptionAnimating
                      ? "border-cyan-400 bg-gradient-to-br from-cyan-400 to-cyan-500"
                      : "border-zinc-600 group-hover:border-cyan-500/50"
                  }`}>
                    {(isSelected || isOptionAnimating) && (
                      <CheckCircle className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    // Scale and choice questions render the same way
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = answers[question.id] === option.value;
          const isOptionAnimating = selectedOption === option.value;
          const staggerDelay = 200 + index * 50;
          return (
            <button
              key={String(option.value)}
              onClick={() => handleAnswer(option.value as number)}
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
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="flex-1">{option.label}</span>
                {question.type === "scale" && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    option.value === 0 ? "bg-red-500/10 text-red-400/80 border border-red-500/20" :
                    option.value === 1 ? "bg-amber-500/10 text-amber-400/80 border border-amber-500/20" :
                    option.value === 2 ? "bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20" :
                    "bg-green-500/10 text-green-400/80 border border-green-500/20"
                  }`}>
                    Level {option.value as number}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

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
              <h1 className="font-semibold text-white">AISecOps Maturity Assessment</h1>
              <p className="text-xs text-zinc-500">6 sections · {totalQuestions} questions</p>
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

            {renderQuestionOptions()}

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
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-medium hover:from-cyan-400 hover:to-cyan-300"
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

    </div>
  );
}
