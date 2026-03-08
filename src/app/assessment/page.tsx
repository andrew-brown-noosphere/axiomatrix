"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CornerDownLeft,
  Shield,
  Pencil,
  Code,
  CheckCircle,
  Settings,
  BarChart3,
  Mail,
  Calendar,
  Sparkles,
  Brain,
  TrendingUp,
  BookOpen,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

// Question data structure - 6 sections including Agentic AI
const sections = [
  {
    id: "governance",
    title: "Governance",
    subtitle: "Foundation",
    description: "How your organization sets the rules for AI usage",
    icon: Shield,
    questions: [
      {
        id: "gov-1",
        question: "Does your organization have policies governing AI/ML usage in development?",
        topic: "AI Governance Policies",
        context: "Organizations without AI governance policies face significant risks including data leakage, compliance violations, and shadow AI usage. Key frameworks include NIST AI RMF, EU AI Act, and ISO/IEC 42001.",
        standards: ["NIST AI RMF", "EU AI Act", "ISO/IEC 42001", "OWASP AI Security"],
        options: [
          { value: 0, label: "No AI governance policies exist" },
          { value: 1, label: "Informal guidelines for AI tool usage" },
          { value: 2, label: "Documented AI policies with compliance tracking" },
          { value: 3, label: "Comprehensive AI governance with risk assessment and audit trails" },
        ],
      },
      {
        id: "gov-2",
        question: "How do you manage security policies for AI coding assistants (Copilot, Claude Code, Cursor)?",
        topic: "AI Coding Assistant Security",
        context: "AI coding assistants can inadvertently leak proprietary code, introduce vulnerabilities, or expose sensitive data. An AI gateway provides centralized control, policy enforcement, and audit capabilities.",
        standards: ["SOC 2 Type II", "GDPR Art. 32", "CIS Controls v8"],
        options: [
          { value: 0, label: "No policies - developers use AI tools freely" },
          { value: 1, label: "Basic guidelines exist but not enforced" },
          { value: 2, label: "Approved tools list with data handling policies" },
          { value: 3, label: "AI gateway with policy enforcement, prompt filtering, and audit logging" },
        ],
      },
      {
        id: "gov-3",
        question: "What training do developers receive on secure AI/ML practices?",
        topic: "AI Security Training",
        context: "Developers are the first line of defense against AI-related security risks. Training should cover prompt injection, data handling, output validation, and secure integration patterns.",
        standards: ["OWASP LLM Top 10", "MITRE ATLAS", "SANS Security Awareness"],
        options: [
          { value: 0, label: "No AI security training provided" },
          { value: 1, label: "Ad-hoc guidance when issues arise" },
          { value: 2, label: "Regular training on AI risks and secure usage" },
          { value: 3, label: "Continuous AI security education with hands-on red team exercises" },
        ],
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    subtitle: "Planning",
    description: "How you plan for AI security before building",
    icon: Pencil,
    questions: [
      {
        id: "des-1",
        question: "How do you identify AI-specific threats (prompt injection, model poisoning, data exfiltration)?",
        topic: "AI Threat Modeling",
        context: "Traditional threat modeling misses AI-specific attack vectors. STRIDE and PASTA frameworks need extension for LLM threats like prompt injection, jailbreaks, and training data poisoning.",
        standards: ["OWASP LLM Top 10", "MITRE ATLAS", "STRIDE for AI", "Microsoft AI Threat Matrix"],
        options: [
          { value: 0, label: "No AI threat identification process" },
          { value: 1, label: "Ad-hoc discussions about AI risks" },
          { value: 2, label: "AI threat modeling for applications using LLMs/ML" },
          { value: 3, label: "Comprehensive threat modeling with OWASP LLM Top 10 and agentic risk frameworks" },
        ],
      },
      {
        id: "des-2",
        question: "How are security requirements captured for AI-powered features?",
        topic: "AI Security Requirements",
        context: "AI features require specific security requirements around input validation, output filtering, rate limiting, and human-in-the-loop controls for high-risk decisions.",
        standards: ["ASVS v4.0", "NIST SP 800-53", "ISO 27001 Annex A"],
        options: [
          { value: 0, label: "No specific requirements for AI features" },
          { value: 1, label: "General security requirements applied to AI" },
          { value: 2, label: "AI-specific requirements (input validation, output filtering, guardrails)" },
          { value: 3, label: "Comprehensive requirements with human-in-the-loop controls and fallback mechanisms" },
        ],
      },
      {
        id: "des-3",
        question: "Do you have architecture standards for secure AI/LLM integration?",
        topic: "AI Security Architecture",
        context: "Secure AI architecture includes AI gateways for traffic control, sandboxed execution environments, defense-in-depth with multiple validation layers, and isolated credential management.",
        standards: ["TOGAF", "SABSA", "Zero Trust Architecture", "Cloud Security Alliance AI Guidelines"],
        options: [
          { value: 0, label: "No AI architecture guidance" },
          { value: 1, label: "Basic patterns used inconsistently" },
          { value: 2, label: "Documented standards for AI service integration" },
          { value: 3, label: "Reference architectures with AI gateways, sandboxing, and defense-in-depth" },
        ],
      },
    ],
  },
  {
    id: "agentic",
    title: "Agentic AI",
    subtitle: "Autonomy",
    description: "How you control AI agents that take actions",
    icon: Brain,
    questions: [
      {
        id: "agent-1",
        question: "How do you secure AI agents that can take autonomous actions (tool use, code execution, API calls)?",
        topic: "Agentic AI Security",
        context: "AI agents with tool access can execute code, make API calls, and modify systems. Without proper controls, compromised agents could exfiltrate data, deploy malware, or cause system damage.",
        standards: ["Anthropic Responsible Scaling Policy", "OpenAI Safety Guidelines", "NIST AI RMF"],
        options: [
          { value: 0, label: "No controls on agent actions" },
          { value: 1, label: "Basic sandboxing or manual review" },
          { value: 2, label: "Permission systems with action allowlists" },
          { value: 3, label: "Fine-grained capability controls, approval workflows, and action audit trails" },
        ],
      },
      {
        id: "agent-2",
        question: "Do you use orchestration frameworks (LangChain, LangFlow, CrewAI, AutoGen) securely?",
        topic: "Agent Framework Security",
        context: "Agent frameworks like LangChain and CrewAI enable powerful multi-step workflows but introduce risks through tool chains, memory injection, and prompt chaining vulnerabilities.",
        standards: ["LangChain Security Guidelines", "OWASP LLM Top 10", "Supply Chain Security (SLSA)"],
        options: [
          { value: 0, label: "Not using agent frameworks, or no security controls" },
          { value: 1, label: "Using frameworks with default configurations" },
          { value: 2, label: "Hardened configurations with input/output validation" },
          { value: 3, label: "Isolated execution environments with tool call monitoring and kill switches" },
        ],
      },
      {
        id: "agent-3",
        question: "How do you manage MCP (Model Context Protocol) servers and tool integrations?",
        topic: "MCP Server Security",
        context: "MCP (Model Context Protocol) standardizes how AI agents access tools and data. Unsecured MCP servers can expose sensitive systems, allow unauthorized data access, or enable privilege escalation.",
        standards: ["MCP Specification", "OAuth 2.0", "Zero Trust Principles", "API Security Best Practices"],
        options: [
          { value: 0, label: "Not aware of MCP or no controls on tool access" },
          { value: 1, label: "Ad-hoc tool integrations without security review" },
          { value: 2, label: "Approved MCP servers with access controls" },
          { value: 3, label: "Centralized MCP gateway with tool-level permissions, rate limiting, and telemetry" },
        ],
      },
    ],
  },
  {
    id: "implementation",
    title: "Implementation",
    subtitle: "Building",
    description: "How you secure AI during development",
    icon: Code,
    questions: [
      {
        id: "impl-1",
        question: "How do you scan AI-generated code for security vulnerabilities?",
        topic: "AI Code Security Scanning",
        context: "AI-generated code often contains subtle vulnerabilities, outdated patterns, or insecure defaults. Studies show 40% of Copilot suggestions contain security issues. Enhanced scanning is critical.",
        standards: ["SAST Best Practices", "OWASP Code Review Guide", "CWE Top 25", "SANS Top 25"],
        options: [
          { value: 0, label: "No special scanning for AI-generated code" },
          { value: 1, label: "Same SAST/SCA as human-written code" },
          { value: 2, label: "Enhanced scanning with AI-specific vulnerability patterns" },
          { value: 3, label: "Real-time AI code review with security feedback before commit" },
        ],
      },
      {
        id: "impl-2",
        question: "How do you protect API keys and credentials for AI services?",
        topic: "AI Credential Management",
        context: "AI API keys are high-value targets - they provide access to expensive services and potentially sensitive data. Credential exposure in logs, code, or prompts is a common attack vector.",
        standards: ["CIS Controls", "NIST SP 800-63B", "HashiCorp Vault Best Practices"],
        options: [
          { value: 0, label: "API keys in code or environment variables" },
          { value: 1, label: "Basic secrets management" },
          { value: 2, label: "Centralized secrets manager with rotation" },
          { value: 3, label: "AI gateway with credential isolation, rate limiting, and cost controls" },
        ],
      },
      {
        id: "impl-3",
        question: "How do you prevent sensitive data from being sent to external AI services?",
        topic: "AI Data Loss Prevention",
        context: "Data sent to AI services may be logged, used for training, or exposed through prompt injection. PII, credentials, and proprietary code frequently leak through AI integrations.",
        standards: ["GDPR Art. 5", "CCPA", "HIPAA", "PCI DSS Requirement 3"],
        options: [
          { value: 0, label: "No controls - data flows freely to AI services" },
          { value: 1, label: "Developer guidelines to avoid sensitive data" },
          { value: 2, label: "Input sanitization before AI API calls" },
          { value: 3, label: "DLP integration, PII detection, and automated data masking" },
        ],
      },
    ],
  },
  {
    id: "verification",
    title: "Verification",
    subtitle: "Testing",
    description: "How you validate AI security before release",
    icon: CheckCircle,
    questions: [
      {
        id: "ver-1",
        question: "How do you test for AI-specific vulnerabilities (prompt injection, jailbreaks)?",
        topic: "AI Security Testing",
        context: "Traditional security testing misses AI-specific vulnerabilities. Prompt injection testing requires adversarial prompt datasets, jailbreak attempts, and boundary testing of guardrails.",
        standards: ["OWASP LLM Testing Guide", "MITRE ATLAS", "Garak Framework", "Microsoft Counterfit"],
        options: [
          { value: 0, label: "No AI-specific security testing" },
          { value: 1, label: "Manual testing of obvious attack vectors" },
          { value: 2, label: "Automated prompt injection testing in CI/CD" },
          { value: 3, label: "Comprehensive AI red teaming with adversarial frameworks and fuzzing" },
        ],
      },
      {
        id: "ver-2",
        question: "How do you validate AI model outputs for security and safety issues?",
        topic: "AI Output Validation",
        context: "AI outputs can contain harmful content, leaked training data, hallucinated facts, or code with embedded vulnerabilities. Multi-layer output validation is essential for production systems.",
        standards: ["Content Moderation Best Practices", "Guardrails AI", "NeMo Guardrails", "LlamaGuard"],
        options: [
          { value: 0, label: "No output validation" },
          { value: 1, label: "Basic output filtering" },
          { value: 2, label: "Content moderation and output guardrails" },
          { value: 3, label: "Multi-layer validation with semantic analysis, anomaly detection, and human review" },
        ],
      },
      {
        id: "ver-3",
        question: "How do you verify third-party AI models and services are secure?",
        topic: "AI Supply Chain Security",
        context: "Third-party AI models and services introduce supply chain risks including model backdoors, data poisoning, and undisclosed data usage. Model provenance and SBOMs are emerging requirements.",
        standards: ["SLSA Framework", "SBOM Requirements", "Model Cards", "Hugging Face Model Security"],
        options: [
          { value: 0, label: "No vendor security assessment" },
          { value: 1, label: "Basic vendor questionnaire" },
          { value: 2, label: "Security review of AI service contracts and data handling" },
          { value: 3, label: "Continuous vendor monitoring, AI supply chain SBOMs, and model provenance tracking" },
        ],
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    subtitle: "Running",
    description: "How you monitor and respond in production",
    icon: Settings,
    questions: [
      {
        id: "ops-1",
        question: "Do you have an incident response plan for AI-related security events?",
        topic: "AI Incident Response",
        context: "AI incidents require specialized response procedures - you may need to revoke API keys, disable agent actions, roll back model versions, or isolate compromised systems. Traditional IR plans often lack AI-specific runbooks.",
        standards: ["NIST SP 800-61", "SANS Incident Response", "ISO 27035"],
        options: [
          { value: 0, label: "No AI-specific incident response" },
          { value: 1, label: "General IR plan covers AI incidents" },
          { value: 2, label: "AI-specific runbooks for prompt injection, data leaks, agent misbehavior" },
          { value: 3, label: "Automated AI incident detection with kill switches, rollback, and post-mortems" },
        ],
      },
      {
        id: "ops-2",
        question: "How do you monitor AI service usage and detect anomalies?",
        topic: "AI Monitoring & Observability",
        context: "AI systems can exhibit emergent behaviors, cost overruns, or be exploited without visible errors. Monitoring should include prompt patterns, token usage, response anomalies, and agent action sequences.",
        standards: ["OpenTelemetry", "FinOps for AI", "SIEM Integration", "Datadog LLM Observability"],
        options: [
          { value: 0, label: "No AI-specific monitoring" },
          { value: 1, label: "Basic API usage logging" },
          { value: 2, label: "Centralized AI telemetry with cost and usage alerts" },
          { value: 3, label: "Real-time anomaly detection for prompt patterns, agent behavior, and token abuse" },
        ],
      },
      {
        id: "ops-3",
        question: "How do you maintain audit trails for AI interactions?",
        topic: "AI Audit & Compliance",
        context: "Regulatory requirements increasingly mandate explainability and audit trails for AI decisions. Complete audit trails should capture prompts, responses, tool calls, and decision rationale.",
        standards: ["EU AI Act", "SOC 2", "GDPR Art. 22", "NIST AI RMF"],
        options: [
          { value: 0, label: "No audit logging of AI interactions" },
          { value: 1, label: "Basic request/response logging" },
          { value: 2, label: "Comprehensive logging with user attribution and context" },
          { value: 3, label: "Immutable audit trail with compliance reporting, forensics, and chain-of-thought capture" },
        ],
      },
    ],
  },
];

// Risk assessments for each answer level
const riskAssessments: Record<number, { level: string; color: string; message: string }> = {
  0: { level: "Critical", color: "text-red-400", message: "High exposure to AI-related security incidents. Immediate action recommended." },
  1: { level: "High", color: "text-amber-400", message: "Significant gaps exist. Formalize processes and implement controls." },
  2: { level: "Moderate", color: "text-cyan-400", message: "Good foundation in place. Consider automation and advanced controls." },
  3: { level: "Low", color: "text-green-400", message: "Mature practices. Focus on optimization and emerging threats." },
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

function getMaturityLabel(score: number): string {
  if (score < 1) return "Initial";
  if (score < 2) return "Developing";
  if (score < 2.5) return "Established";
  return "Advanced";
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

// Spider Chart Component
function SpiderChart({ scores }: { scores: Record<string, number> }) {
  const labels = ["Governance", "Design", "Agentic AI", "Implementation", "Verification", "Operations"];
  const values = [
    scores.governance || 0,
    scores.design || 0,
    scores.agentic || 0,
    scores.implementation || 0,
    scores.verification || 0,
    scores.operations || 0,
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
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
        fill="url(#scoreGradient)"
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

// Context Panel Component - shows AI-generated context for current question
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
      {/* Topic Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
          <Sparkles className="h-4 w-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-medium text-white text-sm">AI Context</h3>
          <p className="text-xs text-zinc-500">{question.topic}</p>
        </div>
      </div>

      {/* Context Content */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Main Context */}
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs font-medium text-cyan-400">Background</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {question.context}
          </p>
        </div>

        {/* Relevant Standards */}
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

        {/* Risk Assessment - shown after answering */}
        {answer !== undefined && (
          <div className="border border-zinc-700/50 rounded-xl overflow-hidden">
            <button
              onClick={onToggleRisk}
              className="w-full flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${risk?.color}`} />
                <span className="text-sm font-medium text-white">Risk Assessment</span>
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
                    {risk.level} Risk
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
        <span className="text-xs font-medium text-zinc-400">Running Score</span>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className={`text-3xl font-bold ${getScoreColor(scores.overall)}`}>
          {scores.overall}
        </span>
        <span className="text-zinc-500 text-sm">/3.0</span>
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getScoreColor(scores.overall)} bg-current/10`}>
          {getMaturityLabel(scores.overall)}
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

export default function AssessmentPage() {
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

  // Reset risk assessment view and trigger entrance animation when question changes
  useEffect(() => {
    setShowRiskAssessment(false);
    setIsAnimating(true);
    setAnimationDirection("in");
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentSection, currentQuestion]);

  // Handle Enter key press
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
    // If user answered this question, show risk popup first
    if (answers[question.id] !== undefined) {
      setShowRiskPopup(true);
    } else {
      // Skip - go directly to next question
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
        }),
      });
    } catch (error) {
      console.error("Failed to submit lead:", error);
    }

    setIsSubmitting(false);
    setEmailSubmitted(true);
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
              <h1 className="font-semibold text-white">Your Assessment Results</h1>
            </div>
            <div className="w-16" />
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-zinc-400">AI & DevSecOps Security Maturity</span>
            </div>

            <div className={`text-7xl font-bold mb-2 ${getScoreColor(scores.overall)}`}>
              {scores.overall}
              <span className="text-3xl text-zinc-500">/3.0</span>
            </div>

            <p className={`text-xl font-medium ${getScoreColor(scores.overall)}`}>
              {getMaturityLabel(scores.overall)}
            </p>

            <p className="text-zinc-500 mt-2 max-w-md mx-auto">
              {scores.overall < 1.5
                ? "Your AI and DevSecOps practices have significant gaps. A structured roadmap can help you build secure AI foundations."
                : scores.overall < 2.5
                ? "You have a solid foundation but there are opportunities to strengthen AI security and reduce emerging risks."
                : "You have mature AI security practices. Focus on optimization and staying ahead of evolving threats."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-6 text-center">Maturity by Function</h3>
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

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-12">
            <h3 className="font-semibold text-white mb-4">Key Observations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(scores.sectionScores)
                .sort(([,a], [,b]) => a - b)
                .slice(0, 2)
                .map(([id, score]) => {
                  const sec = sections.find(s => s.id === id);
                  return (
                    <div key={id} className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <div className="p-1.5 rounded bg-amber-500/20">
                        <ArrowRight className="h-4 w-4 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{sec?.title} needs attention</p>
                        <p className="text-xs text-zinc-400 mt-1">Score: {score}/3.0 - Consider prioritizing improvements</p>
                      </div>
                    </div>
                  );
                })}

              {Object.entries(scores.sectionScores)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 2)
                .map(([id, score]) => {
                  const sec = sections.find(s => s.id === id);
                  return (
                    <div key={id} className="flex items-start gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                      <div className="p-1.5 rounded bg-cyan-500/20">
                        <CheckCircle className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{sec?.title} is a strength</p>
                        <p className="text-xs text-zinc-400 mt-1">Score: {score}/3.0 - Continue building on this</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {!emailSubmitted ? (
            <div className="bg-gradient-to-r from-cyan-950/50 to-zinc-900/50 border border-cyan-500/20 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <Mail className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Get Your Detailed Report</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Receive a PDF with your full results, AI security benchmarks, and recommended next steps.
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
                  {isSubmitting ? "Sending..." : "Get Report"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-white font-medium">Report sent to {email}</p>
              <p className="text-zinc-400 text-sm mt-1">Check your inbox for your detailed assessment results.</p>
            </div>
          )}

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Ready for a Full AI Security Assessment?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              This quick assessment gives you a snapshot. Our full assessment provides deep analysis of your AI governance, agentic AI security, LLM posture, and a detailed roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:from-cyan-400 hover:to-cyan-300 transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book Full Assessment
              </Link>
              <Link
                href="/core-devsecops-maturity-assessment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-zinc-700 text-white hover:bg-zinc-800 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Survey page - Two column layout
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Exit</span>
            </Link>
            <div className="text-center">
              <h1 className="font-semibold text-white">AI & DevSecOps Security Assessment</h1>
              <p className="text-xs text-zinc-500">6 sections · 18 questions · 4 minutes</p>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm text-zinc-400">{answeredQuestions}/{totalQuestions}</span>
            </div>
          </div>

          {/* Progress bar */}
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

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex">
        {/* Left Panel - AI Context */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-900/30 p-6 hidden lg:block overflow-y-auto">
          <ContextPanel
            question={question}
            answer={answers[question.id]}
            showRisk={showRiskAssessment}
            onToggleRisk={() => setShowRiskAssessment(!showRiskAssessment)}
          />

          {/* Running Score at bottom of left panel */}
          <div className="mt-6">
            <RunningScore scores={scores} answeredCount={answeredQuestions} totalCount={totalQuestions} />
          </div>
        </div>

        {/* Right Panel - Questions */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className={`w-full max-w-2xl transition-all duration-300 ease-out ${
            isAnimating
              ? animationDirection === "out"
                ? "opacity-0 translate-y-4 scale-[0.98]"
                : "opacity-0 -translate-y-4 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100"
          }`}>
            {/* Section header */}
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

            {/* Question */}
            <h2 className={`text-2xl font-semibold text-white text-center mb-10 leading-relaxed transition-all duration-400 delay-150 ${
              isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}>
              {question.question}
            </h2>

            {/* Options */}
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
                        isSelected || isAnimating
                          ? "border-cyan-400 bg-gradient-to-br from-cyan-400 to-cyan-500"
                          : "border-zinc-600 group-hover:border-cyan-500/50"
                      }`}>
                        {(isSelected || isAnimating) && (
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

            {/* Mobile Context - shown below questions on small screens */}
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

              {/* Question dots */}
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleRiskPopupContinue}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
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
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Risk Assessment</p>
                    <h3 className={`text-lg font-semibold ${riskAssessments[answers[question.id]].color}`}>
                      {riskAssessments[answers[question.id]].level} Risk
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
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

                {/* Action button */}
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
