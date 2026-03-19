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
  Bell,
  CheckCircle,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  ShieldCheck,
} from "lucide-react";
import { brand } from "@/lib/brand";

// AI Act Assessment sections - 6 sections aligned to AI Act requirements
const sections = [
  {
    id: "inventory",
    title: "AI Inventory & Classification",
    subtitle: "Discovery",
    description: "Understanding what AI systems you have and their risk levels",
    icon: Brain,
    questions: [
      {
        id: "inv-1",
        question: "Do you have a complete inventory of AI systems used in your organization?",
        topic: "AI System Inventory",
        context: "The AI Act applies to all AI systems. You cannot comply with regulations you don't know apply to you. A complete inventory is the foundation of compliance.",
        standards: ["AI Act Art. 4", "AI Act Art. 26", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "No inventory of AI systems exists" },
          { value: 1, label: "Informal awareness of some AI tools in use" },
          { value: 2, label: "Documented inventory covering major AI systems" },
          { value: 3, label: "Comprehensive inventory with ownership, risk classification, and regular updates" },
        ],
      },
      {
        id: "inv-2",
        question: "Have you classified your AI systems according to AI Act risk categories?",
        topic: "Risk Classification",
        context: "The AI Act uses a risk-based approach: Unacceptable (prohibited), High-Risk, Limited Risk, and Minimal Risk. Your compliance obligations depend entirely on this classification.",
        standards: ["AI Act Art. 6", "AI Act Annex III", "NIST AI RMF"],
        options: [
          { value: 0, label: "AI systems not classified by risk level" },
          { value: 1, label: "Informal understanding of risk levels, not documented" },
          { value: 2, label: "Formal classification for most AI systems" },
          { value: 3, label: "All AI systems classified with documented rationale and regular review" },
        ],
      },
      {
        id: "inv-3",
        question: "Do you know whether you're a 'Provider' or 'Deployer' for each AI system?",
        topic: "Role Determination",
        context: "Providers (who develop/market AI) have extensive obligations. Deployers (who use AI) have lighter but still significant obligations. Misclassifying your role creates compliance gaps.",
        standards: ["AI Act Art. 3(3)", "AI Act Art. 3(4)", "AI Act Art. 25"],
        options: [
          { value: 0, label: "Provider vs Deployer distinction not understood or assessed" },
          { value: 1, label: "General awareness but no formal assessment" },
          { value: 2, label: "Roles determined for major AI systems" },
          { value: 3, label: "Clear role determination for all AI systems with legal review where ambiguous" },
        ],
      },
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Practices",
    subtitle: "Compliance",
    description: "Ensuring you don't use banned AI applications",
    icon: AlertTriangle,
    questions: [
      {
        id: "proh-1",
        question: "Have you audited your AI systems against the eight prohibited AI practices?",
        topic: "Prohibited Practice Audit",
        context: "Article 5 prohibits eight AI practices including social scoring, emotion recognition in workplaces, and manipulative AI. Violations carry penalties up to €35M or 7% of global turnover. These rules are already in effect.",
        standards: ["AI Act Art. 5", "AI Act Art. 99", "EU Commission Guidelines"],
        options: [
          { value: 0, label: "No audit against prohibited practices conducted" },
          { value: 1, label: "Informal review, no documented assessment" },
          { value: 2, label: "Documented audit covering major AI systems" },
          { value: 3, label: "Comprehensive audit of all AI systems with legal sign-off" },
        ],
      },
      {
        id: "proh-2",
        question: "Do you have controls to prevent adoption of prohibited AI practices?",
        topic: "Prevention Controls",
        context: "Beyond auditing existing systems, you need controls to prevent future adoption of prohibited AI. This includes procurement criteria, vendor assessment, and internal development guidelines.",
        standards: ["AI Act Art. 5", "ISO/IEC 42001", "NIST AI RMF"],
        options: [
          { value: 0, label: "No controls to prevent prohibited AI adoption" },
          { value: 1, label: "Ad-hoc review of new AI tools" },
          { value: 2, label: "Procurement criteria include prohibited practice screening" },
          { value: 3, label: "Comprehensive controls including procurement, development, and ongoing monitoring" },
        ],
      },
      {
        id: "proh-3",
        question: "Are your AI systems using emotion recognition, biometric categorization, or predictive profiling?",
        topic: "High-Risk Practice Review",
        context: "These practices are prohibited or restricted in specific contexts (workplaces, schools, law enforcement). Even if not fully prohibited, they require careful assessment and may need to be discontinued.",
        standards: ["AI Act Art. 5(1)(f)", "AI Act Art. 5(1)(g)", "AI Act Art. 5(1)(d)"],
        options: [
          { value: 0, label: "Unknown — haven't assessed for these capabilities" },
          { value: 1, label: "Some systems may have these features, not fully reviewed" },
          { value: 2, label: "Reviewed and documented which systems have these features" },
          { value: 3, label: "Fully assessed, prohibited uses discontinued, permissible uses documented with safeguards" },
        ],
      },
    ],
  },
  {
    id: "literacy",
    title: "AI Literacy & Training",
    subtitle: "People",
    description: "Ensuring staff have sufficient AI literacy",
    icon: Users,
    questions: [
      {
        id: "lit-1",
        question: "Do staff who operate or oversee AI systems have documented AI literacy training?",
        topic: "AI Literacy Compliance",
        context: "Article 4 requires providers and deployers to ensure staff have 'sufficient AI literacy.' This obligation is already in effect as of February 2025. Training must be appropriate to roles and AI systems used.",
        standards: ["AI Act Art. 4", "AI Act Art. 3(56)", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "No AI literacy training program exists" },
          { value: 1, label: "Informal training or self-directed learning only" },
          { value: 2, label: "Formal training program for key AI system operators" },
          { value: 3, label: "Comprehensive, role-based AI literacy program with documentation and regular updates" },
        ],
      },
      {
        id: "lit-2",
        question: "Is AI literacy training tailored to different roles and AI systems?",
        topic: "Role-Based Training",
        context: "The AI Act requires training 'taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in.' One-size-fits-all training doesn't meet this standard.",
        standards: ["AI Act Art. 4", "NIST AI RMF", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "No role differentiation in AI training" },
          { value: 1, label: "Generic AI awareness training only" },
          { value: 2, label: "Different training tracks for technical vs non-technical roles" },
          { value: 3, label: "Training tailored to specific roles, AI systems, and use cases" },
        ],
      },
      {
        id: "lit-3",
        question: "Do you maintain records of AI literacy training completion?",
        topic: "Training Documentation",
        context: "While the AI Act doesn't mandate specific certification, you need evidence of compliance. If untrained staff cause harm through AI misuse, lack of documentation creates significant liability exposure.",
        standards: ["AI Act Art. 4", "AI Act Recital 20", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "No training records maintained" },
          { value: 1, label: "Informal tracking of training attendance" },
          { value: 2, label: "Formal records of training completion by individual" },
          { value: 3, label: "Complete training records linked to AI system access, with regular attestation" },
        ],
      },
    ],
  },
  {
    id: "governance",
    title: "Governance & Oversight",
    subtitle: "Controls",
    description: "Human oversight and organizational governance",
    icon: Scale,
    questions: [
      {
        id: "gov-1",
        question: "Have you designated human oversight personnel for high-risk AI systems?",
        topic: "Human Oversight",
        context: "Article 14 requires high-risk AI systems to have human oversight by individuals who understand the system's capabilities, can interpret outputs, and have authority to override or stop the system.",
        standards: ["AI Act Art. 14", "AI Act Art. 26(2)", "NIST AI RMF"],
        options: [
          { value: 0, label: "No human oversight roles designated" },
          { value: 1, label: "Informal oversight by system users" },
          { value: 2, label: "Designated oversight personnel for some high-risk systems" },
          { value: 3, label: "Formal oversight roles with documented authority, training, and escalation procedures" },
        ],
      },
      {
        id: "gov-2",
        question: "Do you have AI governance policies covering development, deployment, and use?",
        topic: "AI Governance Framework",
        context: "Comprehensive AI governance policies demonstrate organizational commitment to responsible AI and provide the framework for meeting specific AI Act requirements.",
        standards: ["AI Act Art. 9", "AI Act Art. 17", "ISO/IEC 42001", "OECD AI Principles"],
        options: [
          { value: 0, label: "No AI governance policies exist" },
          { value: 1, label: "Informal guidelines, not formally documented" },
          { value: 2, label: "Documented AI policies covering key governance areas" },
          { value: 3, label: "Comprehensive AI governance framework with clear ownership, review cycles, and enforcement" },
        ],
      },
      {
        id: "gov-3",
        question: "Have you conducted fundamental rights impact assessments for high-risk AI?",
        topic: "Fundamental Rights Assessment",
        context: "Article 27 requires deployers of certain high-risk AI systems to conduct fundamental rights impact assessments (FRIAs) before deployment. This includes public sector use and private sector essential services.",
        standards: ["AI Act Art. 27", "EU Charter of Fundamental Rights", "GDPR Art. 35"],
        options: [
          { value: 0, label: "Fundamental rights impact assessments not conducted" },
          { value: 1, label: "Aware of requirement but no assessments completed" },
          { value: 2, label: "FRIAs completed for some high-risk AI systems" },
          { value: 3, label: "FRIAs completed for all applicable systems with documented methodology and outcomes" },
        ],
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Requirements",
    subtitle: "Systems",
    description: "Logging, cybersecurity, and transparency requirements",
    icon: Eye,
    questions: [
      {
        id: "tech-1",
        question: "Do your high-risk AI systems automatically generate and retain logs?",
        topic: "AI System Logging",
        context: "Article 12 requires high-risk AI systems to enable recording of events (logs). Deployers must keep these logs for at least six months. This is essential for traceability and incident investigation.",
        standards: ["AI Act Art. 12", "AI Act Art. 26(6)", "ISO/IEC 27001"],
        options: [
          { value: 0, label: "No AI system logging in place" },
          { value: 1, label: "Basic logging, retention not formalized" },
          { value: 2, label: "Logging enabled with defined retention periods" },
          { value: 3, label: "Comprehensive logging with 6+ month retention, tamper-evident storage, and incident response integration" },
        ],
      },
      {
        id: "tech-2",
        question: "Have you implemented cybersecurity measures for your AI systems?",
        topic: "AI Cybersecurity",
        context: "Article 15 requires high-risk AI systems to achieve appropriate levels of accuracy, robustness, and cybersecurity. This includes resilience against attacks, protection of training data, and graceful degradation.",
        standards: ["AI Act Art. 15", "AI Act Annex IV", "NIST CSF", "ISO/IEC 27001"],
        options: [
          { value: 0, label: "No specific cybersecurity measures for AI systems" },
          { value: 1, label: "General IT security applied, no AI-specific controls" },
          { value: 2, label: "AI-specific security controls for high-risk systems" },
          { value: 3, label: "Comprehensive AI security program including adversarial robustness, data integrity, and access controls" },
        ],
      },
      {
        id: "tech-3",
        question: "Do your AI systems meet transparency requirements (disclosure that users are interacting with AI)?",
        topic: "Transparency Obligations",
        context: "Article 50 requires transparency for certain AI systems — users must know they're interacting with AI (chatbots), content is AI-generated, or they're subject to emotion recognition/biometric categorization.",
        standards: ["AI Act Art. 50", "AI Act Art. 52", "GDPR Art. 13-14"],
        options: [
          { value: 0, label: "No transparency measures implemented" },
          { value: 1, label: "Some AI systems disclose AI involvement, inconsistently" },
          { value: 2, label: "Transparency implemented for customer-facing AI" },
          { value: 3, label: "Full transparency compliance across all applicable AI systems with clear disclosures" },
        ],
      },
    ],
  },
  {
    id: "vendor",
    title: "Vendor & Procurement",
    subtitle: "Supply Chain",
    description: "Due diligence on AI vendors and procurement",
    icon: ShieldCheck,
    questions: [
      {
        id: "ven-1",
        question: "Do your AI procurement criteria include AI Act compliance requirements?",
        topic: "Procurement Standards",
        context: "When procuring AI systems, deployers must verify providers are meeting their obligations. Procurement criteria should require evidence of conformity assessment, CE marking (for high-risk), and proper documentation.",
        standards: ["AI Act Art. 26(1)", "AI Act Art. 16", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "No AI Act compliance requirements in procurement" },
          { value: 1, label: "Informal consideration of AI compliance during procurement" },
          { value: 2, label: "AI Act compliance included in procurement criteria" },
          { value: 3, label: "Comprehensive AI procurement standards with compliance verification and contractual requirements" },
        ],
      },
      {
        id: "ven-2",
        question: "Have you reviewed vendor contracts for AI Act responsibility allocation?",
        topic: "Contractual Compliance",
        context: "Contracts should clearly allocate responsibilities between provider and deployer. This includes conformity assessment, documentation, incident reporting, and post-market monitoring obligations.",
        standards: ["AI Act Art. 25", "AI Act Art. 26", "ISO/IEC 42001"],
        options: [
          { value: 0, label: "Vendor contracts don't address AI Act compliance" },
          { value: 1, label: "Some vendor contracts mention AI compliance" },
          { value: 2, label: "Standard AI Act clauses added to vendor contracts" },
          { value: 3, label: "All AI vendor contracts clearly allocate AI Act responsibilities with legal review" },
        ],
      },
      {
        id: "ven-3",
        question: "Do you verify CE marking and conformity documentation for high-risk AI systems?",
        topic: "Conformity Verification",
        context: "High-risk AI systems must bear CE marking and have EU Declarations of Conformity. Deployers should verify this documentation exists before using such systems.",
        standards: ["AI Act Art. 48", "AI Act Art. 47", "AI Act Annex V"],
        options: [
          { value: 0, label: "CE marking and conformity not verified" },
          { value: 1, label: "Aware of requirement, verification inconsistent" },
          { value: 2, label: "Verification process for new high-risk AI procurements" },
          { value: 3, label: "Systematic verification of CE marking and conformity documentation with records" },
        ],
      },
    ],
  },
];

// AI Act-specific risk assessments
const riskAssessments: Record<number, { level: string; color: string; message: string }> = {
  0: { level: "Critical Gap", color: "text-red-400", message: "Significant AI Act compliance gap. This area requires immediate attention — some obligations are already enforceable." },
  1: { level: "Major Gap", color: "text-amber-400", message: "Notable gap exists. Formalize processes and implement controls before August 2026 deadline." },
  2: { level: "Partial Compliance", color: "text-cyan-400", message: "Good foundation in place. Strengthen documentation and coverage to ensure full compliance." },
  3: { level: "Strong Position", color: "text-green-400", message: "Well-prepared for AI Act compliance. Maintain practices and monitor for regulatory guidance updates." },
};

// AI Act-specific recommendations based on section scores
const recommendations: Record<string, { low: string[]; medium: string[]; high: string[] }> = {
  inventory: {
    low: [
      "Conduct immediate AI system discovery across all business units",
      "Classify each AI system by AI Act risk category (prohibited, high, limited, minimal)",
      "Determine provider vs deployer role for each system with legal review",
      "Establish ongoing inventory process to capture new AI adoption",
    ],
    medium: [
      "Document rationale for risk classifications",
      "Review borderline cases with legal counsel",
      "Implement change management for AI system modifications",
    ],
    high: [
      "Conduct periodic inventory audits",
      "Monitor for AI Act guidance updates affecting classification",
    ],
  },
  prohibited: {
    low: [
      "Immediately audit all AI systems against Article 5 prohibited practices",
      "Review for social scoring, emotion recognition, biometric categorization, and manipulative AI",
      "Discontinue any prohibited AI uses — penalties are already enforceable",
      "Implement procurement controls to prevent future prohibited AI adoption",
    ],
    medium: [
      "Document prohibited practice assessments with legal sign-off",
      "Review AI systems with emotion recognition or biometric features",
      "Establish ongoing monitoring for prohibited practice compliance",
    ],
    high: [
      "Maintain audit trail of prohibited practice assessments",
      "Monitor EU Commission guidance on prohibited practice interpretation",
    ],
  },
  literacy: {
    low: [
      "Implement AI literacy training program immediately — this obligation is active",
      "Identify all staff who operate, oversee, or make decisions based on AI systems",
      "Develop role-appropriate training content",
      "Document training completion for compliance evidence",
    ],
    medium: [
      "Tailor training to specific AI systems and use cases",
      "Implement regular refresher training",
      "Link training records to AI system access permissions",
    ],
    high: [
      "Conduct periodic training effectiveness assessments",
      "Update training content as AI systems and regulations evolve",
    ],
  },
  governance: {
    low: [
      "Designate human oversight personnel for all high-risk AI systems",
      "Develop AI governance policies covering development, deployment, and use",
      "Conduct fundamental rights impact assessments where required",
      "Assign clear AI governance ownership within the organization",
    ],
    medium: [
      "Document oversight authority, responsibilities, and escalation procedures",
      "Implement regular governance policy reviews",
      "Train oversight personnel on specific AI system capabilities and limitations",
    ],
    high: [
      "Conduct governance maturity assessments",
      "Benchmark against ISO/IEC 42001 AI management system standards",
    ],
  },
  technical: {
    low: [
      "Enable automatic logging for all high-risk AI systems",
      "Implement minimum 6-month log retention policy",
      "Assess AI-specific cybersecurity controls",
      "Implement transparency disclosures for AI interactions",
    ],
    medium: [
      "Integrate AI logs with security monitoring and incident response",
      "Implement adversarial robustness testing for high-risk systems",
      "Audit transparency compliance across all AI touchpoints",
    ],
    high: [
      "Conduct periodic AI security assessments",
      "Implement tamper-evident logging with integrity verification",
    ],
  },
  vendor: {
    low: [
      "Add AI Act compliance requirements to procurement criteria",
      "Review existing vendor contracts for AI Act responsibility allocation",
      "Request conformity documentation from high-risk AI vendors",
      "Verify CE marking for high-risk AI systems",
    ],
    medium: [
      "Develop standard AI Act contract clauses",
      "Implement vendor compliance verification process",
      "Establish vendor management for AI-specific obligations",
    ],
    high: [
      "Conduct periodic vendor compliance reviews",
      "Monitor vendor AI Act compliance status",
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
    const labels = ["Inventory", "Prohibited", "Literacy", "Governance", "Technical", "Vendor"];
    const values = [
      scores.sectionScores.inventory || 0,
      scores.sectionScores.prohibited || 0,
      scores.sectionScores.literacy || 0,
      scores.sectionScores.governance || 0,
      scores.sectionScores.technical || 0,
      scores.sectionScores.vendor || 0,
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

    doc.setDrawColor(168, 85, 247); // Purple for AI Act
    doc.setLineWidth(1.5);
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      doc.line(scorePoints[i][0], scorePoints[i][1], scorePoints[next][0], scorePoints[next][1]);
    }

    values.forEach((v, i) => {
      const point = getPoint(i, v);
      doc.setFillColor(10, 10, 15);
      doc.setDrawColor(168, 85, 247);
      doc.setLineWidth(1);
      doc.circle(point.x, point.y, 2.5, "FD");
      doc.setFillColor(168, 85, 247);
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
  doc.text("EU AI Act Compliance Assessment", pageWidth / 2, 18, { align: "center" });

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
  doc.text("Readiness by Area", leftPanelX + leftPanelW / 2, leftPanelY + 12, { align: "center" });

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
    { id: "inventory", label: "AI Inventory & Classification" },
    { id: "prohibited", label: "Prohibited Practices" },
    { id: "literacy", label: "AI Literacy & Training" },
    { id: "governance", label: "Governance & Oversight" },
    { id: "technical", label: "Technical Requirements" },
    { id: "vendor", label: "Vendor & Procurement" },
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
      doc.setFillColor(168, 85, 247);
      doc.roundedRect(barX, barY, fillW, barH, 1, 1, "F");
    }

    scoreY += 13;
  });

  // Key Deadlines
  const bottomPanelX = 15;
  const bottomPanelY = 145;
  const bottomPanelW = pageWidth - 30;
  const bottomPanelH = 45;

  doc.setFillColor(18, 18, 22);
  doc.setDrawColor(40, 45, 50);
  doc.roundedRect(bottomPanelX, bottomPanelY, bottomPanelW, bottomPanelH, 3, 3, "FD");

  doc.setFillColor(245, 158, 11);
  doc.triangle(
    bottomPanelX + 12, bottomPanelY + 9,
    bottomPanelX + 8, bottomPanelY + 16,
    bottomPanelX + 16, bottomPanelY + 16,
    "F"
  );
  doc.setFillColor(18, 18, 22);
  doc.rect(bottomPanelX + 11.3, bottomPanelY + 11, 1.4, 3, "F");
  doc.circle(bottomPanelX + 12, bottomPanelY + 15, 0.6, "F");

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("Key AI Act Deadlines", bottomPanelX + 22, bottomPanelY + 14);

  const deadlines = [
    { date: "FEB 2025", desc: "Prohibited practices & AI literacy (ACTIVE)" },
    { date: "AUG 2025", desc: "GPAI model obligations (ACTIVE)" },
    { date: "AUG 2026", desc: "High-risk AI system compliance" },
    { date: "AUG 2027", desc: "Full obligations for embedded AI" },
  ];

  doc.setFontSize(8);
  const col1X = bottomPanelX + 12;
  const col2X = bottomPanelX + bottomPanelW / 2 + 5;
  let dlY = bottomPanelY + 26;

  deadlines.forEach((dl, i) => {
    const x = i % 2 === 0 ? col1X : col2X;
    const y = dlY;

    doc.setTextColor(168, 85, 247);
    doc.setFont("helvetica", "bold");
    doc.text(dl.date, x, y);

    doc.setTextColor(180, 180, 190);
    doc.setFont("helvetica", "normal");
    doc.text(dl.desc, x + 22, y);

    if (i % 2 === 1) dlY += 10;
  });

  // Overall score badge
  const badgeY = 200;
  doc.setFillColor(25, 30, 35);
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(1);
  doc.roundedRect(pageWidth / 2 - 40, badgeY, 80, 30, 3, 3, "FD");

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 160);
  doc.text("Overall Score", pageWidth / 2, badgeY + 10, { align: "center" });

  doc.setFontSize(18);
  const scoreColor = scores.overall < 1 ? [239, 68, 68] : scores.overall < 2 ? [245, 158, 11] : [168, 85, 247];
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`${scores.overall}/3.0`, pageWidth / 2, badgeY + 23, { align: "center" });

  // ========== PAGE 2: Recommendations ==========
  doc.addPage();
  addDarkBackground();
  let y = 25;

  doc.setFontSize(18);
  doc.setTextColor(168, 85, 247);
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

    const headerColor = score < 1 ? [239, 68, 68] : score < 2 ? [245, 158, 11] : [168, 85, 247];
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
      doc.setTextColor(168, 85, 247);
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
  doc.setTextColor(168, 85, 247);
  doc.text("Next Steps", pageWidth / 2, y, { align: "center" });
  y += 20;

  const nextSteps = [
    { num: "01", text: "Complete AI system inventory across all business units" },
    { num: "02", text: "Audit all AI systems against Article 5 prohibited practices immediately" },
    { num: "03", text: "Implement AI literacy training for all staff using AI systems" },
    { num: "04", text: "Classify AI systems by risk level and determine provider/deployer roles" },
    { num: "05", text: "Designate human oversight personnel for high-risk AI systems" },
    { num: "06", text: "Review vendor contracts for AI Act compliance requirements" },
  ];

  nextSteps.forEach((step) => {
    doc.setFillColor(20, 40, 50);
    doc.setDrawColor(80, 50, 120);
    doc.setLineWidth(0.5);
    doc.circle(25, y, 6, "FD");

    doc.setFontSize(9);
    doc.setTextColor(168, 85, 247);
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
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(1);
  doc.roundedRect(15, y, pageWidth - 30, 50, 4, 4, "FD");

  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("Need Help with AI Act Compliance?", pageWidth / 2, y + 18, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(160, 165, 175);
  doc.text(`${brand.name} provides AI governance consulting to help you`, pageWidth / 2, y + 30, { align: "center" });
  doc.text("meet EU AI Act requirements with practical, audit-ready solutions.", pageWidth / 2, y + 38, { align: "center" });

  y += 60;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(80, 85, 95);
  doc.text(`${brand.name} | ${brand.email.split('@')[1]}`, pageWidth / 2, pageHeight - 20, { align: "center" });
  doc.text("This assessment provides guidance only and does not constitute legal advice.", pageWidth / 2, pageHeight - 14, { align: "center" });

  doc.save("AI-Act-Compliance-Assessment.pdf");
}

// Spider Chart Component
function SpiderChart({ scores }: { scores: Record<string, number> }) {
  const labels = ["Inventory", "Prohibited", "Literacy", "Governance", "Technical", "Vendor"];
  const values = [
    scores.inventory || 0,
    scores.prohibited || 0,
    scores.literacy || 0,
    scores.governance || 0,
    scores.technical || 0,
    scores.vendor || 0,
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
        <linearGradient id="aiActScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.1" />
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
        fill="url(#aiActScoreGradient)"
        stroke="rgb(168, 85, 247)"
        strokeWidth="2"
      />

      {values.map((v, i) => {
        const point = getPoint(i, v);
        return (
          <g key={i}>
            <circle cx={point.x} cy={point.y} r="6" fill="rgb(10, 10, 15)" stroke="rgb(168, 85, 247)" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="3" fill="rgb(168, 85, 247)" />
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
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <Sparkles className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <h3 className="font-medium text-white text-sm">AI Act Context</h3>
          <p className="text-xs text-zinc-500">{question.topic}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-purple-400">Regulatory Background</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {question.context}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-2 mb-3">
            <Shield className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-purple-400">Relevant Standards</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {question.standards.map((standard) => (
              <span
                key={standard}
                className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
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
        <TrendingUp className="h-4 w-4 text-purple-400" />
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
                    hasAnswers ? "bg-gradient-to-r from-purple-500 to-purple-400" : "bg-zinc-700"
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

export default function AIActAssessmentPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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
          source: "ai-act-assessment",
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
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <h1 className="font-semibold text-white">AI Act Readiness Results</h1>
            </div>
            <div className="w-16" />
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-zinc-400">EU AI Act Compliance</span>
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
                ? "Significant gaps exist in your AI Act readiness. Some obligations are already enforceable — prioritize prohibited practices and AI literacy immediately."
                : scores.overall < 2.5
                ? "You have a foundation for AI Act compliance but need to address gaps before the August 2026 deadline for high-risk AI systems."
                : "You're well-positioned for AI Act compliance. Focus on documentation, vendor contracts, and monitoring for regulatory guidance updates."
              }
            </p>
          </div>

          {/* Download PDF Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-400 hover:to-purple-300 transition-all shadow-lg shadow-purple-500/20"
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
                        <Icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-zinc-300">{s.title}</span>
                          <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}/3.0</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all"
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
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-purple-400" />
              Key AI Act Deadlines
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-green-400 font-mono text-sm font-bold">FEB 2025</div>
                <div className="text-sm text-zinc-300">Prohibited practices & AI literacy (ACTIVE)</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-400 font-mono text-sm font-bold">AUG 2025</div>
                <div className="text-sm text-zinc-300">GPAI model obligations (ACTIVE)</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-amber-400 font-mono text-sm font-bold">AUG 2026</div>
                <div className="text-sm text-zinc-300">High-risk AI system compliance</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-400 font-mono text-sm font-bold">AUG 2027</div>
                <div className="text-sm text-zinc-300">Full obligations for embedded AI</div>
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
                            <ArrowRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
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
            <div className="bg-gradient-to-r from-purple-950/50 to-zinc-900/50 border border-purple-500/20 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Mail className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Get AI Act Compliance Updates</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Receive updates on AI Act implementation guidance, deadline reminders, and compliance tips.
                  </p>
                </div>
              </div>

              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-400 hover:to-purple-300 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-white font-medium">Subscribed!</p>
              <p className="text-zinc-400 text-sm mt-1">You&apos;ll receive AI Act compliance updates at {email}</p>
            </div>
          )}

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Need Help with AI Act Compliance?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              {brand.name} provides AI governance consulting to help you meet EU AI Act requirements — from AI inventory to human oversight implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:from-purple-400 hover:to-purple-300 transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book Consultation
              </Link>
              <Link
                href="/blog/eu-ai-act-ciso-compliance-briefing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-zinc-700 text-white hover:bg-zinc-800 transition-all"
              >
                Read AI Act Guide
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
              <h1 className="font-semibold text-white">EU AI Act Assessment</h1>
              <p className="text-xs text-zinc-500">AI Act Readiness · 6 sections · 18 questions</p>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm text-zinc-400">{answeredQuestions}/{totalQuestions}</span>
            </div>
          </div>

          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Journey Roadmap */}
      <div className="border-b border-zinc-800/50 bg-gradient-to-r from-zinc-900/50 via-purple-950/20 to-zinc-900/50">
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
                        isComplete ? "bg-gradient-to-r from-purple-400 to-purple-400" : "bg-zinc-700"
                      }`} />
                    )}
                    {i < sections.length - 1 && (
                      <div className={`absolute left-1/2 right-0 h-0.5 -translate-y-1/2 top-1/2 transition-all duration-500 ${
                        isComplete ? "bg-gradient-to-r from-purple-400 to-purple-400" : "bg-zinc-700"
                      }`} />
                    )}
                    <div className={`relative mx-auto p-2 rounded-xl transition-all duration-300 ${
                      isCurrent
                        ? "bg-gradient-to-br from-purple-500/30 to-purple-600/20 ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/20 scale-110"
                        : isComplete
                        ? "bg-purple-500/20"
                        : "bg-zinc-800/50"
                    }`}>
                      <Icon className={`h-4 w-4 transition-colors ${
                        isCurrent ? "text-purple-300" : isComplete ? "text-purple-400" : "text-zinc-500"
                      }`} />
                    </div>
                  </div>
                  <span className={`mt-2 text-[10px] font-medium transition-colors ${
                    isCurrent ? "text-purple-300" : isComplete ? "text-purple-400/70" : "text-zinc-600"
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
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 mb-3 transition-all duration-500 delay-75 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}>
                <div className="p-1.5 rounded-lg bg-purple-500/20">
                  <SectionIcon className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-purple-400 font-medium">{section.title}</span>
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
                        ? "scale-[1.02] bg-gradient-to-r from-purple-500/30 to-purple-500/10 border-purple-400 shadow-lg shadow-purple-500/10"
                        : isSelected
                        ? "bg-gradient-to-r from-purple-500/20 to-transparent border-purple-500/50 text-white"
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-950/30 hover:to-transparent hover:scale-[1.01]"
                    } ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
                    style={{
                      transitionDelay: isAnimating ? "0ms" : `${staggerDelay}ms`,
                      transitionDuration: "300ms"
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected || isOptionAnimating
                          ? "border-purple-400 bg-gradient-to-br from-purple-400 to-purple-500"
                          : "border-zinc-600 group-hover:border-purple-500/50"
                      }`}>
                        {(isSelected || isOptionAnimating) && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="flex-1">{option.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        option.value === 0 ? "bg-red-500/10 text-red-400/80 border border-red-500/20" :
                        option.value === 1 ? "bg-amber-500/10 text-amber-400/80 border border-amber-500/20" :
                        option.value === 2 ? "bg-purple-500/10 text-purple-400/80 border border-purple-500/20" :
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
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-white">{question.topic}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{question.context}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {question.standards.slice(0, 3).map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
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
                          ? "w-1.5 bg-purple-400"
                          : i === currentQuestion
                          ? "w-4 bg-gradient-to-r from-purple-400 to-purple-300"
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
                    ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white font-medium hover:from-purple-400 hover:to-purple-300"
                    : answers[question.id] !== undefined
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-400 border border-purple-500/30 hover:from-purple-500/30 hover:to-purple-500/20"
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
