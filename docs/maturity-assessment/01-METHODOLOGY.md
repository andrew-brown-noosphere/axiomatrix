# AxioMatrix DevSecOps Maturity Assessment Methodology

## Overview

This methodology provides a structured, repeatable approach to evaluating an organization's software security maturity. Based on OWASP SAMM v2.0 with AxioMatrix enhancements for DevSecOps and CI/CD pipeline security.

---

## Assessment Framework

### The Five Business Functions

| Function | Focus Area | Key Question |
|----------|-----------|--------------|
| **Governance** | Strategy, policy, training | "How does leadership drive security?" |
| **Design** | Threat modeling, requirements, architecture | "How is security built into design?" |
| **Implementation** | Secure coding, build, deployment | "How is security enforced in code?" |
| **Verification** | Testing, review, validation | "How is security validated?" |
| **Operations** | Incident response, environment, monitoring | "How is security maintained in production?" |

---

## Maturity Levels

### Scoring Scale: 0.0 - 3.0

| Level | Score | Description | Characteristics |
|-------|-------|-------------|-----------------|
| **Level 0** | 0.0 | Non-existent | No formal practice; ad-hoc or reactive only |
| **Level 1** | 1.0 | Initial | Basic practice exists; inconsistent execution |
| **Level 2** | 2.0 | Managed | Standardized process; measured and tracked |
| **Level 3** | 3.0 | Optimized | Continuous improvement; automated where possible |

### Partial Scores

- **0.25**: Awareness exists, no implementation
- **0.50**: Partial implementation, <50% coverage
- **0.75**: Significant implementation, >50% coverage
- **1.00**: Full implementation at that maturity level

---

## Detailed Scoring Criteria

### 1. GOVERNANCE

#### 1.1 Strategy & Metrics

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security strategy | - |
| 1 | Informal security goals exist | Security mentioned in company docs |
| 2 | Documented security strategy with metrics | Strategy document, KPI dashboard |
| 3 | Strategy reviewed quarterly, metrics drive decisions | Review records, trend analysis |

**Interview Questions:**
- Does the organization have a documented security strategy?
- How are security goals communicated to development teams?
- What security metrics are tracked? How often are they reviewed?

#### 1.2 Policy & Compliance

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security policies | - |
| 1 | Basic policies exist (acceptable use, etc.) | Policy documents |
| 2 | SDLC security policies enforced | Policy + enforcement records |
| 3 | Automated policy compliance, continuous audit | Automated reports, compliance dashboard |

**Interview Questions:**
- What security policies govern software development?
- How is policy compliance monitored and enforced?
- How do you handle policy exceptions?

#### 1.3 Education & Guidance

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security training | - |
| 1 | Ad-hoc training available | Training materials |
| 2 | Role-based training program, tracked completion | LMS records, completion rates |
| 3 | Continuous learning, security champions program | Champion roster, ongoing activities |

**Interview Questions:**
- What security training do developers receive?
- How is training completion tracked?
- Do you have a security champions program?

---

### 2. DESIGN

#### 2.1 Threat Assessment

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No threat modeling | - |
| 1 | Ad-hoc threat discussions | Meeting notes |
| 2 | Formal threat modeling for critical apps | Threat models (STRIDE, etc.) |
| 3 | Threat modeling integrated into design process, updated regularly | Process docs, model updates |

**Interview Questions:**
- When do you perform threat modeling?
- What methodology do you use (STRIDE, PASTA, Attack Trees)?
- How are threat model findings tracked and remediated?

#### 2.2 Security Requirements

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security requirements process | - |
| 1 | Security requirements discussed informally | Meeting notes, tickets |
| 2 | Security requirements in user stories/specs | Backlog items, requirement docs |
| 3 | Automated security requirement validation | Test automation, traceability matrix |

**Interview Questions:**
- How are security requirements captured?
- Who is responsible for defining security requirements?
- How do you verify security requirements are met?

#### 2.3 Security Architecture

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security architecture guidance | - |
| 1 | Informal security patterns used | Code samples |
| 2 | Documented security architecture standards | Architecture docs, patterns library |
| 3 | Architecture review process, automated enforcement | Review records, policy-as-code |

**Interview Questions:**
- Do you have documented security architecture standards?
- How are architecture decisions reviewed for security?
- What security patterns are mandated (authn, authz, encryption)?

---

### 3. IMPLEMENTATION

#### 3.1 Secure Build

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No secure build practices | - |
| 1 | Basic build security (no secrets in code) | Code review records |
| 2 | Automated SAST, dependency scanning in CI | Pipeline configs, scan reports |
| 3 | Build provenance, SBOM generation, signed artifacts | SLSA attestations, SBOMs |

**Interview Questions:**
- What security tools run in your CI pipeline?
- How do you manage build dependencies?
- Do you generate SBOMs? Sign artifacts?

#### 3.2 Secure Deployment

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | Manual deployments, no security checks | - |
| 1 | Basic deployment security (secrets management) | Vault/secrets manager config |
| 2 | Automated deployment with security gates | Pipeline configs, gate definitions |
| 3 | Immutable infrastructure, policy-as-code enforcement | IaC templates, OPA/Cedar policies |

**Interview Questions:**
- How are secrets managed in deployment?
- What security gates exist before production deployment?
- Do you use infrastructure-as-code? Is it scanned?

#### 3.3 Defect Management

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security defect tracking | - |
| 1 | Security bugs tracked with other bugs | Issue tracker |
| 2 | Dedicated security defect workflow, SLAs | Workflow config, SLA metrics |
| 3 | Automated triage, root cause analysis, trend tracking | Dashboard, RCA reports |

**Interview Questions:**
- How are security vulnerabilities tracked?
- What are your SLAs for security defect remediation?
- Do you perform root cause analysis on security bugs?

---

### 4. VERIFICATION

#### 4.1 Architecture Assessment

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No architecture review | - |
| 1 | Ad-hoc architecture review | Meeting notes |
| 2 | Formal architecture review process | Review checklist, records |
| 3 | Automated architecture validation | Policy-as-code, automated checks |

**Interview Questions:**
- How often is security architecture reviewed?
- Who participates in architecture reviews?
- How are review findings tracked?

#### 4.2 Requirements-Driven Testing

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security testing | - |
| 1 | Manual security testing | Test records |
| 2 | Security test cases from requirements | Test cases, traceability |
| 3 | Automated security regression testing | Test automation, coverage reports |

**Interview Questions:**
- How do you derive security test cases?
- What percentage of security requirements have test coverage?
- How often do security tests run?

#### 4.3 Security Testing

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No security testing tools | - |
| 1 | Ad-hoc SAST/DAST usage | Scan reports |
| 2 | Automated SAST/DAST/SCA in pipeline | Pipeline configs, reports |
| 3 | Continuous testing, IAST/RASP, pen testing program | Tool configs, pen test reports |

**Interview Questions:**
- What security testing tools do you use?
- How are security testing results handled?
- Do you perform regular penetration testing?

---

### 5. OPERATIONS

#### 5.1 Incident Management

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No incident response plan | - |
| 1 | Basic incident response exists | IR plan document |
| 2 | Documented IR process, regular drills | IR playbooks, drill records |
| 3 | Automated detection/response, lessons learned program | SIEM/SOAR configs, postmortems |

**Interview Questions:**
- Do you have a documented incident response plan?
- How often do you conduct IR drills?
- How are lessons learned captured and applied?

#### 5.2 Environment Management

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No environment hardening | - |
| 1 | Basic hardening applied | Config docs |
| 2 | Hardening standards, regular patching | Standards doc, patch records |
| 3 | Automated compliance, continuous monitoring | CIS benchmarks, monitoring dashboard |

**Interview Questions:**
- What hardening standards do you follow?
- How is patching managed?
- How do you monitor environment security?

#### 5.3 Operational Management

| Level | Criteria | Evidence Required |
|-------|----------|-------------------|
| 0 | No operational security processes | - |
| 1 | Basic logging and monitoring | Log configs |
| 2 | Centralized logging, alerting, access reviews | SIEM, access review records |
| 3 | Automated anomaly detection, continuous validation | ML/AI detection, automated audits |

**Interview Questions:**
- How is application logging handled?
- What triggers security alerts?
- How often are access rights reviewed?

---

## Assessment Process

### Phase 1: Discovery (Days 1-3)

**Objectives:**
- Identify stakeholders across Dev, Ops, Security, Product
- Gather existing documentation
- Understand organizational context

**Activities:**
1. Kickoff meeting with sponsor
2. Stakeholder identification and scheduling
3. Documentation request and review
4. Environment/tooling inventory

**Outputs:**
- Stakeholder matrix
- Document inventory
- Initial risk areas

### Phase 2: Assessment (Days 4-8)

**Objectives:**
- Conduct structured interviews
- Validate evidence
- Score each practice

**Activities:**
1. Interview sessions (1-2 hours each)
2. Technical validation (tool demos, config review)
3. Evidence collection
4. Preliminary scoring

**Interview Schedule:**
| Day | Function | Participants |
|-----|----------|--------------|
| 4 | Governance | CISO/Security Lead, Engineering Manager |
| 5 | Design | Architects, Product Manager |
| 6 | Implementation | Senior Developers, DevOps Lead |
| 7 | Verification | QA Lead, Security Engineer |
| 8 | Operations | SRE/Ops Lead, Incident Manager |

**Outputs:**
- Completed interview notes
- Evidence artifacts
- Draft scores

### Phase 3: Analysis (Days 9-11)

**Objectives:**
- Finalize maturity scores
- Identify gaps and risks
- Develop recommendations

**Activities:**
1. Score calibration and validation
2. Gap analysis against target state
3. Risk prioritization
4. Quick wins identification
5. Roadmap development

**Outputs:**
- Final maturity scorecard
- Gap analysis
- Prioritized recommendations

### Phase 4: Roadmap (Days 12-15)

**Objectives:**
- Present findings
- Align on priorities
- Deliver roadmap

**Activities:**
1. Executive presentation
2. Technical deep-dive (optional)
3. Roadmap review and adjustment
4. Final report delivery

**Outputs:**
- Executive summary
- Full assessment report
- 12-month roadmap
- Quick reference scorecard

---

## Scoring Methodology

### Calculating Practice Scores

Each practice is scored 0.0 - 3.0 based on:

1. **Evidence Quality**: Documentation, artifacts, tool outputs
2. **Coverage**: Percentage of applications/teams covered
3. **Consistency**: How consistently the practice is followed
4. **Effectiveness**: Does the practice achieve its security objective?

### Calculating Function Scores

Function Score = Average of 3 Practice Scores

Example:
- Governance = (Strategy 1.5 + Policy 1.0 + Education 0.5) / 3 = **1.0**

### Calculating Overall Maturity

Overall Maturity = Average of 5 Function Scores

Example:
- Overall = (Gov 1.0 + Design 0.5 + Impl 1.5 + Verif 0.75 + Ops 1.25) / 5 = **1.0**

---

## Target Maturity Benchmarks

| Organization Type | Recommended Target |
|-------------------|-------------------|
| Early-stage startup | 1.0 |
| Growth-stage (Series B+) | 1.5 |
| Enterprise (SOC2 required) | 2.0 |
| Highly regulated (Finance, Healthcare) | 2.5 |
| Critical infrastructure | 3.0 |

---

## Tools & Templates

- Interview Guide Template
- Evidence Checklist
- Scoring Spreadsheet
- Executive Summary Template
- Full Report Template
- Roadmap Template
- Spider Chart Generator
