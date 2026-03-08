# Cyber Resilience Act (CRA) - Complete Reference

## Overview

The Cyber Resilience Act (CRA) is EU Regulation 2024/2847 establishing horizontal cybersecurity requirements for products with digital elements. It entered into force on December 10, 2024, with obligations phasing in through December 2027.

The CRA applies to all hardware and software products with digital elements placed on the EU market, covering the entire product lifecycle from design through end-of-life.

## Key Dates and Timeline

| Date | Milestone |
|------|-----------|
| December 10, 2024 | CRA entered into force |
| June 11, 2026 | Chapter IV (notified body notification) applicable |
| August 30, 2026 | Type A (horizontal) product compliance |
| September 11, 2026 | Vulnerability and incident reporting obligations begin |
| October 30, 2026 | Type B/C product compliance |
| December 11, 2026 | Member States ensure sufficient notified bodies |
| December 11, 2027 | Full CRA obligations apply |

Products placed on the market before December 11, 2027 are only subject to CRA upon substantial modification.

## Scope

### Products Covered

The CRA applies to "products with digital elements" - any software or hardware product and its remote data processing solutions, including:

- Software applications
- Operating systems and firmware
- Connected devices (IoT)
- Hardware with embedded software
- Consumer electronics (smart watches, baby monitors, etc.)
- Industrial control systems
- Network equipment

### Exclusions

- Medical devices (covered by MDR/IVDR)
- Motor vehicles (covered by vehicle regulations)
- Aviation products
- Marine equipment
- Products for national security/military
- Non-commercial open source software (with conditions)

## Product Categories

### Default Products
General products with digital elements. Can use self-assessment (Module A) for conformity assessment.

### Important Products - Class I (Annex III)
Products with higher cybersecurity relevance. Examples include:
- Identity management systems
- Password managers
- Malware detection software
- VPNs
- Network management systems
- SIEM systems
- Boot managers
- Disk encryption software
- Smart home devices with security functions
- Wearables for children

Can use self-assessment IF harmonized standards, common specifications, or EU cybersecurity certification schemes are applied. Otherwise requires third-party assessment.

### Important Products - Class II (Annex III)
Higher risk products requiring mandatory third-party conformity assessment:
- Operating systems
- Hypervisors and container runtimes
- Firewalls and intrusion detection/prevention systems
- Tamper-resistant microprocessors
- Industrial automation and control systems (IACS)
- Industrial IoT not covered by other regulations

### Critical Products (Annex IV)
Highest risk category, strictest conformity assessment:
- Hardware devices with security boxes
- Smart meter gateways
- Smartcard readers
- Security tokens/hardware authentication
- Robot sensing components (safety-related)

## Essential Cybersecurity Requirements (Annex I)

### Part I: Security Requirements for Products

**1. Risk-Based Security Design**
Products must be designed, developed, and produced to ensure an appropriate level of cybersecurity based on the risks. Risk assessment must consider:
- Intended use and reasonably foreseeable misuse
- Product lifetime and support period
- User expectations regarding security

**2. No Known Exploitable Vulnerabilities**
Products must be made available on the market without any known exploitable vulnerabilities.

**3. Secure by Default Configuration**
Products must be delivered with secure default configurations, including:
- Protection against unauthorized access
- Secure authentication mechanisms
- Encrypted storage of sensitive data

**4. Data Protection**
- Protect confidentiality of data through encryption at rest and in transit using state-of-the-art mechanisms
- Protect integrity of data, commands, programs, and configuration against unauthorized manipulation
- Process only data adequate and relevant to intended purpose (data minimization)

**5. Availability and Resilience**
- Protect availability of essential functions
- Resilience against denial-of-service attacks
- Minimize negative impact on other devices/networks

**6. Attack Surface Minimization**
- Limit external interfaces to those necessary
- Reduce exploitability through implementation of exploitation mitigation mechanisms

**7. Incident Impact Mitigation**
- Appropriate mechanisms to mitigate impact of incidents
- Support for security updates

**8. Security Monitoring**
- Record and monitor internal activity, data access, and service modifications
- Provide user opt-out for monitoring features
- Enable detection of security incidents

**9. Data Removal**
- Enable users to securely and permanently remove all data

**10. Software Updates**
- Support installation of security updates
- Automatic update capability with user notification
- Updates separate from functionality updates where feasible

### Part II: Vulnerability Handling Requirements

**1. Vulnerability Identification**
- Identify and document vulnerabilities, including in third-party components
- Create and maintain Software Bill of Materials (SBOM) in machine-readable format

**2. Vulnerability Remediation**
- Address vulnerabilities without delay
- Provide security updates free of charge
- Separate security patches from feature updates where feasible

**3. Security Testing**
- Conduct regular testing and review of product security
- Effective and regular tests during production

**4. Vulnerability Disclosure**
- Publicly disclose fixed vulnerabilities
- Provide information about the vulnerability
- Include remediation guidance

**5. Coordinated Vulnerability Disclosure**
- Establish and publish a policy for coordinated vulnerability disclosure
- Provide contact information for reporting vulnerabilities

**6. Secure Update Distribution**
- Ensure integrity of updates through secure distribution mechanisms
- Verify authenticity of updates

## Reporting Obligations (Article 14)

From September 11, 2026, manufacturers must report to their Member State CSIRT and ENISA:

### Actively Exploited Vulnerabilities

**Early Warning (24 hours)**
Within 24 hours of becoming aware of an actively exploited vulnerability:
- Notification that vulnerability is being exploited
- General information about product and vulnerability
- Initial assessment of severity

**Vulnerability Notification (72 hours)**
Within 72 hours:
- General description without technical details enabling exploitation
- Nature and severity of exploitation
- Available corrective measures
- Where applicable, mitigation measures users can apply

**Final Report (14 days)**
Within 14 days of remediation:
- Detailed vulnerability description
- Severity and impact information
- Root cause (if known)
- Corrective measures applied
- Where applicable, whether vulnerability was disclosed

### Severe Incidents

**Early Warning (24 hours)**
Within 24 hours of becoming aware:
- Indication of suspected or confirmed cause
- Whether incident has cross-border impact

**Incident Notification (72 hours)**
Within 72 hours:
- Updated information
- Initial assessment of severity and impact
- Indicators of compromise (where available)

**Final Report (1 month)**
Within one month:
- Detailed description
- Severity and impact
- Type of threat or root cause
- Mitigation measures
- Cross-border impact (if applicable)

### Single Reporting Platform

Reports are submitted via the EU Single Reporting Platform to be established. ENISA operates the platform and coordinates with national CSIRTs.

## Conformity Assessment Procedures

### Module A: Internal Control (Self-Assessment)
- Manufacturer performs assessment
- Documents technical compliance
- Available for default products and Important Class I (with conditions)

### Module B + C: EU-Type Examination
- Notified body examines technical design
- Issues EU-type examination certificate
- Manufacturer ensures production conformity

### Module H: Full Quality Assurance
- Notified body approves and monitors quality system
- Covers design, production, and final inspection
- Continuous notified body involvement

### Special Rules
- Important Class II and Critical products MUST use third-party assessment
- Free and open-source software MAY use self-assessment if technical documentation is made public

## Manufacturer Obligations

1. **Risk Assessment**: Perform cybersecurity risk assessment during design, development, and production

2. **Due Diligence**: Exercise due diligence on third-party components to prevent security compromise

3. **Documentation**: Maintain technical documentation demonstrating compliance with essential requirements

4. **Support Period**: Determine and communicate support period (minimum 5 years or expected product lifetime)
   - Clearly communicate end of support date
   - Provide free security updates during support period

5. **Conformity Assessment**: Complete appropriate conformity assessment procedure

6. **CE Marking**: Affix CE marking after successful conformity assessment

7. **EU Declaration of Conformity**: Draw up declaration before placing on market

8. **Product Information**: Provide:
   - Product identification
   - Manufacturer name and contact information
   - Single point of contact for vulnerability reporting
   - User instructions and security information
   - SBOM (upon request)

9. **Vulnerability Handling**: Implement processes for identifying, documenting, and addressing vulnerabilities

10. **Incident Reporting**: Report actively exploited vulnerabilities and severe incidents per Article 14

## Importer Obligations

Importers placing non-EU manufactured products on the market must:

1. Verify manufacturer has performed conformity assessment
2. Verify manufacturer has technical documentation
3. Verify CE marking is properly affixed
4. Verify product is accompanied by required information
5. Not place non-compliant products on market
6. Inform manufacturer of discovered vulnerabilities
7. Cooperate with market surveillance authorities
8. Keep copy of EU declaration of conformity for 10 years

## Distributor Obligations

1. Verify CE marking before making product available
2. Verify manufacturer/importer contact information is provided
3. Verify user instructions and support period information provided
4. Not make non-compliant products available
5. Inform manufacturer of discovered vulnerabilities
6. Cooperate with market surveillance authorities

## Open Source Software

### Commercial Open Source
If open source software is monetized (support, hosting, commercial licenses), it falls under full CRA scope.

### Non-Commercial Open Source
Free and open-source software developed or supplied outside commercial activity is NOT in scope.

### Open Source Stewards
Organizations (foundations, non-profits) that systematically provide support for FOSS development have limited obligations:
- Light-touch regime
- Must develop cybersecurity policies
- Must report severe incidents affecting development infrastructure
- Not subject to penalties for CRA infringements

## Software Bill of Materials (SBOM)

The CRA requires manufacturers to:

1. **Create SBOM**: Document all components including third-party and open source
2. **Machine-Readable Format**: Use standardized format (CycloneDX, SPDX)
3. **Maintain Currency**: Keep SBOM updated throughout product lifecycle
4. **Provide on Request**: Make available to market surveillance authorities
5. **Cover Dependencies**: Include transitive dependencies

## Market Surveillance and Enforcement

### Market Surveillance Authorities
- Each Member State designates one or more authorities
- Operate under Regulation (EU) 2019/1020
- Powers include:
  - Product evaluation
  - Corrective action requirements
  - Restriction of products
  - Recall orders
  - Coordinated actions across EU

### Administrative Cooperation Group (ADCO)
- Ensures uniform CRA application across EU
- Coordinates enforcement actions
- Shares information between Member States

### Penalties
- Member States establish national penalty frameworks
- Penalties must be effective, proportionate, and dissuasive
- Microenterprises/small enterprises: May not be fined for missing 24-hour reporting deadline
- Open source stewards: Not subject to penalties

## Harmonized Standards

On February 3, 2025, the European Commission requested CEN, CENELEC, and ETSI to develop 41 harmonized standards:

- **15 horizontal standards**: Aligned with Annex I essential requirements, applicable across all products
- **26 vertical standards**: Tailored to specific Important/Critical product categories

Using harmonized standards creates "presumption of conformity" - simplified compliance demonstration.

## Relationship to Other Legislation

### NIS2 Directive
- CRA complements NIS2
- NIS2 covers essential/important entities' security
- CRA covers products those entities use
- Reporting mechanisms coordinated

### EU Cybersecurity Act
- Voluntary certification schemes can support CRA compliance
- EUCC (Common Criteria based) scheme available
- Using certified products may simplify conformity assessment

### GDPR
- CRA security requirements support GDPR compliance
- Data protection by design alignment
- Security of processing obligations

### AI Act
- AI systems with digital elements subject to both
- CRA cybersecurity requirements apply
- AI Act safety requirements apply
- Coordinated conformity assessment possible

### Machinery Regulation
- Some machinery covered by both
- Cybersecurity requirements from CRA
- Safety requirements from Machinery Regulation

## Practical Compliance Steps

### Immediate Actions
1. Inventory products potentially in scope
2. Classify products (Default, Important I/II, Critical)
3. Review current security practices against essential requirements
4. Identify gaps in vulnerability handling processes
5. Assess SBOM generation capabilities

### Before September 2026
1. Implement vulnerability reporting infrastructure
2. Register for Single Reporting Platform
3. Establish/update coordinated vulnerability disclosure policy
4. Test 24-hour notification capability
5. Train relevant personnel on reporting obligations

### Before December 2027
1. Complete conformity assessments for all products
2. Update technical documentation
3. Ensure CE marking properly applied
4. Communicate support periods to customers
5. Implement all essential cybersecurity requirements

## Glossary

**Active Exploitation**: A vulnerability being used to compromise systems in real attacks, not just theoretical risk.

**CE Marking**: Conformité Européenne marking indicating product meets EU requirements for sale in the internal market.

**Conformity Assessment**: Process demonstrating product meets essential requirements through self-assessment or third-party evaluation.

**Coordinated Vulnerability Disclosure (CVD)**: Process for reporting vulnerabilities to vendors before public disclosure, allowing time for remediation.

**CSIRT**: Computer Security Incident Response Team - national or sectoral teams handling cybersecurity incidents.

**Digital Elements**: Software, including firmware, or hardware that enables data processing and its remote data processing solutions.

**ENISA**: European Union Agency for Cybersecurity - supports CRA implementation and operates Single Reporting Platform.

**Essential Requirements**: Mandatory cybersecurity properties products must possess, defined in Annex I.

**Harmonized Standards**: European standards developed by ESOs (CEN, CENELEC, ETSI) that provide presumption of conformity.

**Market Surveillance**: Post-market activities ensuring products on the market continue to meet requirements.

**Notified Body**: Organization designated by Member State to perform third-party conformity assessments.

**Product with Digital Elements**: Software or hardware product and its remote data processing solutions with direct or indirect logical or physical connection to a device or network.

**Severe Incident**: Security incident significantly impacting product security, requiring mandatory reporting.

**SBOM (Software Bill of Materials)**: Machine-readable inventory of all software components in a product.

**Support Period**: Time during which manufacturer provides security updates, minimum 5 years or expected product lifetime.

## Resources

- CRA Official Text: EUR-Lex 2024/2847
- European Commission CRA Page: digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
- ENISA CRA Guidance: enisa.europa.eu
- Draft Implementation Guidance: EC "Have Your Say" Portal
- Harmonized Standards Development: CEN-CENELEC

---

*This reference document is for informational purposes. Consult the official CRA text and legal counsel for compliance decisions.*
