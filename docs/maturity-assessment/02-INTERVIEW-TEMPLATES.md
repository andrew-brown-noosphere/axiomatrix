# Interview Templates by Business Function

## Interview Guidelines

**Before Each Interview:**
- Review any documentation provided by the interviewee's area
- Prepare specific follow-up questions based on initial findings
- Have evidence checklist ready

**During Each Interview:**
- Record with permission (or detailed notes)
- Ask for evidence/artifacts to validate responses
- Use open-ended questions first, then probe for specifics
- Note discrepancies between stated practice and evidence

**After Each Interview:**
- Complete scoring worksheet within 24 hours
- Note follow-up items and evidence requests
- Identify areas needing validation with other stakeholders

---

## 1. GOVERNANCE INTERVIEW

**Duration:** 90 minutes
**Participants:** CISO, Security Lead, VP Engineering, Compliance Manager

### Section 1.1: Strategy & Metrics (30 min)

**Opening:**
"Let's start by understanding how security strategy is set and measured at [Organization]."

#### Questions:

1. **Strategy Definition**
   - Does the organization have a documented security strategy?
   - Who owns the security strategy? When was it last updated?
   - How does the security strategy align with business objectives?

   *Evidence: Request security strategy document*

2. **Goal Setting**
   - What are the top 3 security goals for this year?
   - How were these goals determined?
   - How are security goals communicated to development teams?

   *Evidence: Goal documentation, OKRs, communications*

3. **Metrics & Measurement**
   - What security metrics do you track?
   - How often are metrics reviewed? By whom?
   - Can you show me your security dashboard/reporting?

   *Evidence: Dashboard screenshots, sample reports*

4. **Decision Making**
   - How do metrics influence security decisions?
   - Can you give an example of a decision driven by security metrics?
   - How is security budget determined?

   *Evidence: Budget docs, decision records*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No strategy | 0 |
| Informal goals, no metrics | 0.5-1.0 |
| Documented strategy, basic metrics | 1.5-2.0 |
| Metrics-driven decisions, regular review | 2.5-3.0 |

---

### Section 1.2: Policy & Compliance (30 min)

**Opening:**
"Now let's discuss the policies that govern secure development."

#### Questions:

1. **Policy Existence**
   - What security policies apply to software development?
   - Where are these policies documented?
   - How do developers access these policies?

   *Evidence: Policy documents, wiki/knowledge base*

2. **Policy Content**
   - Do you have a secure coding policy?
   - What does your acceptable use policy cover?
   - Are there specific policies for: secrets management, third-party code, data handling?

   *Evidence: Specific policy documents*

3. **Enforcement**
   - How is policy compliance monitored?
   - What happens when a policy violation is detected?
   - Can you give an example of a recent enforcement action?

   *Evidence: Compliance reports, violation records*

4. **Compliance Requirements**
   - What compliance frameworks apply (SOC2, ISO27001, PCI, HIPAA)?
   - How do development policies map to compliance requirements?
   - When was your last audit? What were the findings?

   *Evidence: Audit reports, compliance mapping*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No policies | 0 |
| Basic policies, no enforcement | 0.5-1.0 |
| Comprehensive policies, manual enforcement | 1.5-2.0 |
| Automated enforcement, continuous compliance | 2.5-3.0 |

---

### Section 1.3: Education & Guidance (30 min)

**Opening:**
"Let's talk about how the organization builds security knowledge."

#### Questions:

1. **Training Program**
   - What security training do developers receive?
   - Is training mandatory? How often?
   - What topics are covered?

   *Evidence: Training curriculum, completion records*

2. **Onboarding**
   - What security training do new hires receive?
   - Is there role-specific security training?
   - How quickly after joining do people complete security training?

   *Evidence: Onboarding checklist, LMS records*

3. **Ongoing Education**
   - How do you keep teams updated on new threats/vulnerabilities?
   - Do developers attend security conferences or external training?
   - Are there internal security tech talks or lunch-and-learns?

   *Evidence: Training calendar, event records*

4. **Security Champions**
   - Do you have a security champions program?
   - How are champions selected and trained?
   - What do champions do? How much time is allocated?

   *Evidence: Champion roster, charter document*

5. **Resources**
   - What security guidance resources are available to developers?
   - Do you have secure coding guidelines? Cheat sheets?
   - How do developers get answers to security questions?

   *Evidence: Wiki, Slack channels, guidelines docs*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No training | 0 |
| Ad-hoc training | 0.5-1.0 |
| Structured program, tracked completion | 1.5-2.0 |
| Champions program, continuous learning | 2.5-3.0 |

---

## 2. DESIGN INTERVIEW

**Duration:** 90 minutes
**Participants:** Solution Architects, Security Architect, Product Manager, Tech Lead

### Section 2.1: Threat Assessment (30 min)

**Opening:**
"Let's discuss how threats are identified and analyzed during design."

#### Questions:

1. **Threat Modeling Practice**
   - Do you perform threat modeling?
   - What methodology do you use (STRIDE, PASTA, Attack Trees)?
   - At what stage in development does threat modeling occur?

   *Evidence: Threat model documents, templates*

2. **Coverage**
   - What percentage of applications have threat models?
   - What triggers a threat modeling exercise?
   - Do you update threat models when designs change?

   *Evidence: Threat model inventory, update records*

3. **Process**
   - Who participates in threat modeling sessions?
   - How long does a typical session take?
   - What tools do you use (Microsoft TMT, OWASP Threat Dragon, whiteboard)?

   *Evidence: Session recordings, tool outputs*

4. **Outcomes**
   - How are threat model findings prioritized?
   - How do findings flow into the backlog?
   - Can you show me how a threat was mitigated based on modeling?

   *Evidence: Backlog items from threat models*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No threat modeling | 0 |
| Ad-hoc discussions | 0.5-1.0 |
| Formal TM for critical apps | 1.5-2.0 |
| Integrated into design process, maintained | 2.5-3.0 |

---

### Section 2.2: Security Requirements (30 min)

**Opening:**
"How are security requirements captured and managed?"

#### Questions:

1. **Requirements Definition**
   - How are security requirements identified for new features?
   - Who is responsible for defining security requirements?
   - Do you use a security requirements checklist or framework?

   *Evidence: Requirements templates, checklists*

2. **Documentation**
   - Where are security requirements documented?
   - Are security requirements in user stories? Separate specs?
   - How do you ensure security requirements aren't forgotten?

   *Evidence: Sample stories/specs with security requirements*

3. **Standards**
   - Do you have standard security requirements (authn, authz, input validation)?
   - How are regulatory requirements (GDPR, CCPA) captured?
   - Are there different requirements tiers based on data sensitivity?

   *Evidence: Standard requirements library*

4. **Verification**
   - How do you verify security requirements are implemented?
   - Is there traceability from requirement to test to code?
   - What happens if a security requirement isn't met at release?

   *Evidence: Traceability matrix, release criteria*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No security requirements process | 0 |
| Informal discussions | 0.5-1.0 |
| Documented requirements, tracked | 1.5-2.0 |
| Automated validation, full traceability | 2.5-3.0 |

---

### Section 2.3: Security Architecture (30 min)

**Opening:**
"Let's talk about security architecture standards and review."

#### Questions:

1. **Architecture Standards**
   - Do you have documented security architecture standards?
   - What areas do they cover (authn, authz, crypto, data protection)?
   - How were these standards developed? When were they last updated?

   *Evidence: Architecture standards documents*

2. **Patterns & Frameworks**
   - What security patterns are mandated (OAuth, mTLS, etc.)?
   - Do you have approved libraries for security functions?
   - How do you handle technology/pattern exceptions?

   *Evidence: Pattern library, approved tech list*

3. **Review Process**
   - How are architecture decisions reviewed for security?
   - Who participates in architecture review?
   - Is there a formal sign-off process?

   *Evidence: Review checklist, approval records*

4. **Enforcement**
   - How do you ensure architecture standards are followed?
   - Do you use architecture fitness functions or automated checks?
   - What happens when a non-compliant architecture is discovered?

   *Evidence: Automated checks, compliance reports*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No architecture standards | 0 |
| Informal patterns | 0.5-1.0 |
| Documented standards, review process | 1.5-2.0 |
| Automated enforcement, continuous validation | 2.5-3.0 |

---

## 3. IMPLEMENTATION INTERVIEW

**Duration:** 90 minutes
**Participants:** Senior Developers, DevOps Lead, Platform Engineer, Release Manager

### Section 3.1: Secure Build (30 min)

**Opening:**
"Let's discuss how security is built into your CI pipeline."

#### Questions:

1. **Pipeline Security**
   - Walk me through your CI/CD pipeline.
   - What security tools run in the pipeline?
   - At what stages do security checks occur?

   *Evidence: Pipeline diagram, tool configuration*

2. **Static Analysis (SAST)**
   - Do you use SAST tools? Which ones?
   - What is the coverage (all repos, critical only)?
   - How are SAST findings handled? Do they block builds?

   *Evidence: SAST config, sample reports*

3. **Dependency Management (SCA)**
   - How do you manage third-party dependencies?
   - Do you use SCA tools? Which ones?
   - What is your process for vulnerable dependencies?

   *Evidence: SCA config, dependency policy*

4. **Secrets Management**
   - How are secrets handled in build pipelines?
   - Do you scan for secrets in code?
   - What happens if secrets are detected?

   *Evidence: Secrets scanning config, sample detection*

5. **Supply Chain Security**
   - Do you generate SBOMs for your builds?
   - Do you sign build artifacts?
   - What attestations do you capture (SLSA level)?

   *Evidence: SBOM samples, signing config*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No build security | 0 |
| Basic practices (no secrets in code) | 0.5-1.0 |
| Automated SAST/SCA, blocking gates | 1.5-2.0 |
| SBOM, signing, SLSA attestations | 2.5-3.0 |

---

### Section 3.2: Secure Deployment (30 min)

**Opening:**
"How is security handled during deployment to production?"

#### Questions:

1. **Deployment Process**
   - Describe your deployment process.
   - Is deployment automated? What triggers a deploy?
   - What environments exist (dev, staging, prod)?

   *Evidence: Deployment documentation*

2. **Security Gates**
   - What security checks occur before production deployment?
   - Can deployments be blocked by security? What criteria?
   - How do you handle emergency deployments?

   *Evidence: Gate definitions, deployment logs*

3. **Secrets in Production**
   - How are production secrets managed?
   - What secrets management solution do you use?
   - How often are secrets rotated?

   *Evidence: Secrets manager config, rotation policy*

4. **Infrastructure as Code**
   - Do you use IaC (Terraform, CloudFormation)?
   - Is IaC security scanned?
   - How are infrastructure changes reviewed?

   *Evidence: IaC repos, scanning config*

5. **Container/Image Security**
   - Do you use containers? How are images built?
   - Do you scan images for vulnerabilities?
   - What is your base image strategy?

   *Evidence: Dockerfile, image scanning results*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| Manual deployment, no gates | 0 |
| Basic automation, secrets managed | 0.5-1.0 |
| Security gates, IaC scanning | 1.5-2.0 |
| Immutable infra, policy-as-code | 2.5-3.0 |

---

### Section 3.3: Defect Management (30 min)

**Opening:**
"How are security vulnerabilities tracked and remediated?"

#### Questions:

1. **Tracking**
   - Where are security vulnerabilities tracked?
   - Are security bugs distinguished from functional bugs?
   - Who triages security vulnerabilities?

   *Evidence: Issue tracker config, sample tickets*

2. **Prioritization**
   - How are security bugs prioritized?
   - Do you use CVSS or another scoring system?
   - How does business context factor into priority?

   *Evidence: Prioritization criteria, sample prioritization*

3. **SLAs**
   - What are your SLAs for security bug remediation?
   - Are SLAs different by severity?
   - How is SLA compliance measured and reported?

   *Evidence: SLA policy, compliance metrics*

4. **Process**
   - Walk me through the lifecycle of a security bug.
   - How are fixes verified?
   - What happens if an SLA is missed?

   *Evidence: Workflow documentation*

5. **Analysis**
   - Do you perform root cause analysis on security bugs?
   - How do you prevent similar bugs in the future?
   - Do you track security bug trends over time?

   *Evidence: RCA documents, trend reports*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No security defect tracking | 0 |
| Tracked with other bugs | 0.5-1.0 |
| Dedicated workflow, SLAs | 1.5-2.0 |
| Automated triage, RCA, trends | 2.5-3.0 |

---

## 4. VERIFICATION INTERVIEW

**Duration:** 90 minutes
**Participants:** QA Lead, Security Engineer, Penetration Tester (if internal)

### Section 4.1: Architecture Assessment (30 min)

**Opening:**
"How is security architecture validated?"

#### Questions:

1. **Review Process**
   - Do you have a security architecture review process?
   - When are reviews triggered (new project, major change)?
   - Who participates in reviews?

   *Evidence: Review process docs, sample reviews*

2. **Checklist/Criteria**
   - What criteria are used to evaluate architecture?
   - Do you have a security architecture checklist?
   - How are review findings documented?

   *Evidence: Checklist, finding samples*

3. **Validation**
   - How do you validate that architecture is implemented as designed?
   - Do you use architecture fitness functions?
   - How often is architecture re-validated?

   *Evidence: Validation records, fitness functions*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No architecture review | 0 |
| Ad-hoc reviews | 0.5-1.0 |
| Formal process with checklist | 1.5-2.0 |
| Automated validation | 2.5-3.0 |

---

### Section 4.2: Requirements-Driven Testing (30 min)

**Opening:**
"How do security requirements drive testing?"

#### Questions:

1. **Test Derivation**
   - How are security test cases derived from requirements?
   - Is there traceability from requirement to test?
   - Who writes security test cases?

   *Evidence: Test cases, traceability matrix*

2. **Coverage**
   - What percentage of security requirements have tests?
   - How is test coverage measured?
   - What gaps exist?

   *Evidence: Coverage reports*

3. **Execution**
   - When do security tests run (CI, nightly, release)?
   - Are security tests automated or manual?
   - How are test failures handled?

   *Evidence: Test execution records*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No security testing | 0 |
| Manual testing | 0.5-1.0 |
| Test cases from requirements | 1.5-2.0 |
| Automated regression, full coverage | 2.5-3.0 |

---

### Section 4.3: Security Testing (30 min)

**Opening:**
"What security testing tools and practices do you use?"

#### Questions:

1. **SAST/DAST/SCA**
   - What SAST tools do you use? Coverage?
   - What DAST tools do you use? Coverage?
   - What SCA tools do you use? Coverage?

   *Evidence: Tool inventory, coverage metrics*

2. **Advanced Testing**
   - Do you use IAST or RASP?
   - Do you perform fuzz testing?
   - Any other security testing tools?

   *Evidence: Tool configs*

3. **Penetration Testing**
   - Do you perform penetration testing?
   - How often? Internal or external?
   - How are pen test findings handled?

   *Evidence: Pen test reports, remediation records*

4. **Bug Bounty**
   - Do you have a bug bounty program?
   - What is the scope?
   - How many submissions do you receive?

   *Evidence: Bug bounty program details*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No security testing tools | 0 |
| Ad-hoc SAST/DAST | 0.5-1.0 |
| Automated in pipeline | 1.5-2.0 |
| Continuous + pen testing + bug bounty | 2.5-3.0 |

---

## 5. OPERATIONS INTERVIEW

**Duration:** 90 minutes
**Participants:** SRE Lead, Security Operations, Incident Manager, IT Ops

### Section 5.1: Incident Management (30 min)

**Opening:**
"How do you handle security incidents?"

#### Questions:

1. **Incident Response Plan**
   - Do you have a documented incident response plan?
   - What types of incidents does it cover?
   - When was it last updated?

   *Evidence: IR plan document*

2. **Roles & Responsibilities**
   - Who is involved in incident response?
   - Is there a clear escalation path?
   - How is the IR team contacted?

   *Evidence: Contact list, escalation matrix*

3. **Process**
   - Walk me through how a security incident is handled.
   - How do you determine incident severity?
   - What playbooks exist?

   *Evidence: Playbooks, sample incident records*

4. **Testing**
   - How often do you test the IR plan?
   - When was the last tabletop exercise?
   - Have you had a real incident? How did it go?

   *Evidence: Drill records, postmortems*

5. **Improvement**
   - How are lessons learned captured?
   - How do incidents influence security improvements?
   - Do you track incident metrics?

   *Evidence: Postmortem documents, metrics*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No IR plan | 0 |
| Basic plan exists | 0.5-1.0 |
| Documented process, regular drills | 1.5-2.0 |
| Automated response, continuous improvement | 2.5-3.0 |

---

### Section 5.2: Environment Management (30 min)

**Opening:**
"How do you secure your infrastructure and environments?"

#### Questions:

1. **Hardening**
   - What hardening standards do you follow (CIS, DISA)?
   - How are hardening standards applied?
   - How often is hardening validated?

   *Evidence: Hardening standards, compliance reports*

2. **Patching**
   - What is your patching process?
   - What are your patching SLAs by severity?
   - How is patch compliance measured?

   *Evidence: Patching policy, compliance metrics*

3. **Configuration Management**
   - How is configuration managed (Chef, Puppet, Ansible)?
   - How do you prevent configuration drift?
   - How are config changes reviewed?

   *Evidence: Config management setup*

4. **Network Security**
   - How is network segmentation implemented?
   - What network security controls exist?
   - How often are firewall rules reviewed?

   *Evidence: Network diagrams, firewall rules*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No hardening | 0 |
| Basic hardening | 0.5-1.0 |
| Standards-based, regular patching | 1.5-2.0 |
| Automated compliance, continuous monitoring | 2.5-3.0 |

---

### Section 5.3: Operational Management (30 min)

**Opening:**
"How do you monitor and maintain operational security?"

#### Questions:

1. **Logging**
   - What security events are logged?
   - Where are logs centralized?
   - How long are logs retained?

   *Evidence: Logging configuration, retention policy*

2. **Monitoring & Alerting**
   - What security monitoring tools do you use (SIEM)?
   - What triggers security alerts?
   - How are alerts triaged?

   *Evidence: SIEM config, alert rules*

3. **Access Management**
   - How is access to production managed?
   - How often are access rights reviewed?
   - Do you use just-in-time access?

   *Evidence: Access review records, JIT config*

4. **Data Protection**
   - How is sensitive data identified and classified?
   - What data protection controls exist?
   - How is data loss prevention implemented?

   *Evidence: Data classification, DLP config*

**Scoring Notes:**
| Indicator | Score |
|-----------|-------|
| No operational security | 0 |
| Basic logging | 0.5-1.0 |
| Centralized logging, SIEM, access reviews | 1.5-2.0 |
| Automated detection, continuous validation | 2.5-3.0 |

---

## Post-Interview Scoring Sheet

Complete for each practice area:

| Function | Practice | Score (0-3) | Confidence | Key Evidence | Gaps Identified |
|----------|----------|-------------|------------|--------------|-----------------|
| Governance | Strategy & Metrics | | | | |
| Governance | Policy & Compliance | | | | |
| Governance | Education & Guidance | | | | |
| Design | Threat Assessment | | | | |
| Design | Security Requirements | | | | |
| Design | Security Architecture | | | | |
| Implementation | Secure Build | | | | |
| Implementation | Secure Deployment | | | | |
| Implementation | Defect Management | | | | |
| Verification | Architecture Assessment | | | | |
| Verification | Requirements Testing | | | | |
| Verification | Security Testing | | | | |
| Operations | Incident Management | | | | |
| Operations | Environment Management | | | | |
| Operations | Operational Management | | | | |
