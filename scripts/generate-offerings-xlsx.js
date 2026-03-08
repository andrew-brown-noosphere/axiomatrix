const XLSX = require('xlsx');
const path = require('path');

// Create workbook
const wb = XLSX.utils.book_new();

// ============================================
// SHEET 1: Services Pricing
// ============================================
const services = [
  ['SERVICES PRICING', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['SERVICE', 'TYPE', 'ITEM', 'BASE COST', 'MARGIN %', 'SELL PRICE', 'UNIT', 'NOTES'],
  ['', '', '', '', '', '', '', ''],
  ['DevSecOps Maturity Assessment', '', '', '', '', '', '', ''],
  ['', 'Activity', 'Stakeholder Interviews', 2000, 0.4, { f: 'D6*(1+E6)' }, 'Per engagement', ''],
  ['', 'Activity', 'Pipeline & Toolchain Review', 3000, 0.4, { f: 'D7*(1+E7)' }, 'Per engagement', ''],
  ['', 'Activity', 'Gap Analysis', 2500, 0.4, { f: 'D8*(1+E8)' }, 'Per engagement', ''],
  ['', 'Activity', 'Maturity Scoring', 1500, 0.4, { f: 'D9*(1+E9)' }, 'Per engagement', ''],
  ['', 'Activity', 'Roadmap Delivery', 3000, 0.4, { f: 'D10*(1+E10)' }, 'Per engagement', ''],
  ['', '', 'Assessment Subtotal', { f: 'SUM(D6:D10)' }, '', { f: 'SUM(F6:F10)' }, '', ''],
  ['', 'Product', 'Veracode Initial Scan', 2500, 0.3, { f: 'D12*(1+E12)' }, 'Add-on', ''],
  ['', 'Product', 'Noosphere Trust Baseline', 1500, 0.35, { f: 'D13*(1+E13)' }, 'Add-on', ''],
  ['', 'Product', 'Thales Key Assessment', 2000, 0.25, { f: 'D14*(1+E14)' }, 'Add-on', ''],
  ['', '', '', '', '', '', '', ''],
  ['CI/CD Pipeline Security Integration', '', '', '', '', '', '', ''],
  ['', 'Activity', 'Security Gate Design', 5000, 0.4, { f: 'D17*(1+E17)' }, 'Per engagement', ''],
  ['', 'Activity', 'SAST Implementation', 4000, 0.4, { f: 'D18*(1+E18)' }, 'Per engagement', ''],
  ['', 'Activity', 'DAST Implementation', 4000, 0.4, { f: 'D19*(1+E19)' }, 'Per engagement', ''],
  ['', 'Activity', 'SCA Implementation', 3000, 0.4, { f: 'D20*(1+E20)' }, 'Per engagement', ''],
  ['', 'Activity', 'Secrets Management', 3500, 0.4, { f: 'D21*(1+E21)' }, 'Per engagement', ''],
  ['', 'Activity', 'Policy-as-Code', 4500, 0.4, { f: 'D22*(1+E22)' }, 'Per engagement', ''],
  ['', 'Activity', 'Container Scanning', 3000, 0.4, { f: 'D23*(1+E23)' }, 'Per engagement', ''],
  ['', 'Activity', 'Team Enablement', 2500, 0.4, { f: 'D24*(1+E24)' }, 'Per engagement', ''],
  ['', '', 'Integration Subtotal', { f: 'SUM(D17:D24)' }, '', { f: 'SUM(F17:F24)' }, '', ''],
  ['', 'Product', 'Veracode License', 15000, 0.2, { f: 'D26*(1+E26)' }, 'Annual', ''],
  ['', 'Product', 'SignPath License', 8000, 0.2, { f: 'D27*(1+E27)' }, 'Annual', ''],
  ['', 'Product', 'Imperva License', 12000, 0.2, { f: 'D28*(1+E28)' }, 'Annual', ''],
  ['', 'Product', 'Noosphere AI Gateway', 5000, 0.3, { f: 'D29*(1+E29)' }, 'Monthly', ''],
  ['', 'Product', 'Thales HSM', 20000, 0.15, { f: 'D30*(1+E30)' }, 'Annual', ''],
  ['', '', '', '', '', '', '', ''],
  ['Fractional CISO', '', '', '', '', '', '', ''],
  ['', 'Activity', 'Security Strategy', 3000, 0.5, { f: 'D33*(1+E33)' }, 'Monthly', ''],
  ['', 'Activity', 'Board Reporting', 2000, 0.5, { f: 'D34*(1+E34)' }, 'Monthly', ''],
  ['', 'Activity', 'Vendor Risk Management', 1500, 0.5, { f: 'D35*(1+E35)' }, 'Monthly', ''],
  ['', 'Activity', 'Incident Response Planning', 2000, 0.5, { f: 'D36*(1+E36)' }, 'Monthly', ''],
  ['', 'Activity', 'Compliance Guidance', 1500, 0.5, { f: 'D37*(1+E37)' }, 'Monthly', ''],
  ['', 'Activity', 'Security Architecture Review', 2000, 0.5, { f: 'D38*(1+E38)' }, 'Monthly', ''],
  ['', 'Activity', 'Team Mentorship', 1000, 0.5, { f: 'D39*(1+E39)' }, 'Monthly', ''],
  ['', '', 'Fractional CISO Monthly', { f: 'SUM(D33:D39)' }, '', { f: 'SUM(F33:F39)' }, 'Monthly retainer', ''],
];

const ws1 = XLSX.utils.aoa_to_sheet(services);
ws1['!cols'] = [
  { wch: 34 },  // Service
  { wch: 10 },  // Type
  { wch: 28 },  // Item
  { wch: 12 },  // Base Cost
  { wch: 10 },  // Margin %
  { wch: 12 },  // Sell Price
  { wch: 14 },  // Unit
  { wch: 16 },  // Notes
];
XLSX.utils.book_append_sheet(wb, ws1, 'Services Pricing');

// ============================================
// SHEET 2: Partner Products
// ============================================
const partnerProducts = [
  ['PARTNER PRODUCTS', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['VENDOR', 'PRODUCT', 'CATEGORY', 'LIST PRICE', 'OUR COST', 'MARGIN %', 'OUR PRICE', 'UNIT'],
  ['', '', '', '', '', '', '', ''],
  ['Veracode', 'SAST', 'Application Security', 25000, { f: 'D5*0.8' }, { f: '(G5-E5)/E5' }, { f: 'E5*1.25' }, 'Per app/year'],
  ['Veracode', 'DAST', 'Application Security', 20000, { f: 'D6*0.8' }, { f: '(G6-E6)/E6' }, { f: 'E6*1.25' }, 'Per app/year'],
  ['Veracode', 'SCA', 'Application Security', 15000, { f: 'D7*0.8' }, { f: '(G7-E7)/E7' }, { f: 'E7*1.25' }, 'Per app/year'],
  ['', '', '', '', '', '', '', ''],
  ['SignPath', 'Code Signing Platform', 'Supply Chain', 12000, { f: 'D9*0.75' }, { f: '(G9-E9)/E9' }, { f: 'E9*1.3' }, 'Per pipeline/year'],
  ['Sigstore', 'Cosign/Fulcio/Rekor', 'Supply Chain', 0, 0, 0, 5000, 'Implementation'],
  ['', '', '', '', '', '', '', ''],
  ['Imperva', 'WAF', 'Application Security', 18000, { f: 'D12*0.8' }, { f: '(G12-E12)/E12' }, { f: 'E12*1.25' }, 'Per app/year'],
  ['Imperva', 'API Security', 'Application Security', 15000, { f: 'D13*0.8' }, { f: '(G13-E13)/E13' }, { f: 'E13*1.25' }, 'Per API/year'],
  ['', '', '', '', '', '', '', ''],
  ['Thales', 'Luna Cloud HSM', 'Key Management', 30000, { f: 'D15*0.85' }, { f: '(G15-E15)/E15' }, { f: 'E15*1.2' }, 'Per partition/year'],
  ['Thales', 'DPoD', 'Key Management', 10000, { f: 'D16*0.85' }, { f: '(G16-E16)/E16' }, { f: 'E16*1.2' }, 'Base + usage'],
  ['', '', '', '', '', '', '', ''],
  ['Hexagon', 'OT Security', 'Infrastructure', 50000, { f: 'D18*0.8' }, { f: '(G18-E18)/E18' }, { f: 'E18*1.25' }, 'Per site/year'],
];

const ws2 = XLSX.utils.aoa_to_sheet(partnerProducts);
ws2['!cols'] = [
  { wch: 12 },  // Vendor
  { wch: 22 },  // Product
  { wch: 20 },  // Category
  { wch: 12 },  // List Price
  { wch: 12 },  // Our Cost
  { wch: 10 },  // Margin %
  { wch: 12 },  // Our Price
  { wch: 16 },  // Unit
];
XLSX.utils.book_append_sheet(wb, ws2, 'Partner Products');

// ============================================
// SHEET 3: Platform
// ============================================
const noospherePlatform = [
  ['PLATFORM', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['PRODUCT', 'DESCRIPTION', 'COST', 'MARGIN %', 'SELL PRICE', 'UNIT', 'ANNUAL VALUE'],
  ['', '', '', '', '', '', ''],
  ['AI Gateway', 'Identity, signing, provenance, trust for AI', 3000, 0.3, { f: 'C5*(1+D5)' }, 'Per org/month', { f: 'E5*12' }],
  ['Policy Engine', 'Cedar-based policy evaluation', 1500, 0.3, { f: 'C6*(1+D6)' }, 'Per org/month', { f: 'E6*12' }],
  ['LLM Proxy', 'Route, observe, govern LLM requests', 0.001, 0.4, { f: 'C7*(1+D7)' }, 'Per request', 'Usage-based'],
  ['Trust Graph', 'Map and verify trust relationships', 1000, 0.3, { f: 'C8*(1+D8)' }, 'Per org/month', { f: 'E8*12' }],
  ['', '', '', '', '', '', ''],
  ['PLATFORM BUNDLE', 'AI Gateway + Policy Engine + Trust Graph', { f: 'C5+C6+C8' }, 0.25, { f: 'C10*(1+D10)' }, 'Per org/month', { f: 'E10*12' }],
];

const ws3 = XLSX.utils.aoa_to_sheet(noospherePlatform);
ws3['!cols'] = [
  { wch: 18 },  // Product
  { wch: 40 },  // Description
  { wch: 12 },  // Cost
  { wch: 10 },  // Margin %
  { wch: 12 },  // Sell Price
  { wch: 14 },  // Unit
  { wch: 14 },  // Annual Value
];
XLSX.utils.book_append_sheet(wb, ws3, 'Platform');

// ============================================
// SHEET 4: Agents
// ============================================
const noosphereAgents = [
  ['AGENTS', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['AGENT', 'DESCRIPTION', 'COST', 'MARGIN %', 'SELL PRICE', 'UNIT', 'NOTES'],
  ['', '', '', '', '', '', ''],
  ['Code Signing Agent', 'Automated artifact signing with attestations', 200, 0.4, { f: 'C5*(1+D5)' }, 'Per pipeline/month', 'LangGraph-based'],
  ['Vulnerability Triage Agent', 'Auto-prioritize and assign vulnerabilities', 0.5, 0.5, { f: 'C6*(1+D6)' }, 'Per scan', 'Integrates with Veracode'],
  ['Dependency Review Agent', 'Analyze and approve/reject dependency updates', 0.25, 0.5, { f: 'C7*(1+D7)' }, 'Per PR', 'License + CVE checks'],
  ['Secret Detection Agent', 'Scan repos for leaked credentials', 100, 0.4, { f: 'C8*(1+D8)' }, 'Per repo/month', 'Pre-commit + CI'],
  ['SBOM Agent', 'Generate and validate SBOMs', 0.1, 0.5, { f: 'C9*(1+D9)' }, 'Per build', 'SPDX + CycloneDX'],
  ['Container Security Agent', 'Scan container images before deploy', 0.25, 0.5, { f: 'C10*(1+D10)' }, 'Per image', ''],
  ['IaC Security Agent', 'Scan Terraform/CloudFormation', 0.15, 0.5, { f: 'C11*(1+D11)' }, 'Per scan', ''],
  ['PR Security Review Agent', 'Automated security review of PRs', 0.5, 0.5, { f: 'C12*(1+D12)' }, 'Per PR', ''],
  ['Compliance Audit Agent', 'Continuous compliance checking', 500, 0.4, { f: 'C13*(1+D13)' }, 'Per audit', 'SOC2, ISO27001, FedRAMP'],
];

const ws4 = XLSX.utils.aoa_to_sheet(noosphereAgents);
ws4['!cols'] = [
  { wch: 26 },  // Agent
  { wch: 42 },  // Description
  { wch: 10 },  // Cost
  { wch: 10 },  // Margin %
  { wch: 12 },  // Sell Price
  { wch: 16 },  // Unit
  { wch: 22 },  // Notes
];
XLSX.utils.book_append_sheet(wb, ws4, 'Agents');

// ============================================
// SHEET 5: Support Tiers
// ============================================
const supportTiers = [
  ['SUPPORT TIERS', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['TIER', 'DESCRIPTION', 'RESPONSE TIME', 'CHANNELS', '% OF LICENSE', 'MIN MONTHLY', 'INCLUDES', ''],
  ['', '', '', '', '', '', '', ''],
  ['Basic', 'Standard support for production issues', '48 hours', 'Email, Ticket Portal', 0.1, 500, 'Bug fixes, security patches', ''],
  ['Premium', 'Priority support with faster response', '8 hours', 'Email, Ticket, Slack', 0.15, 1500, 'Basic + dedicated CSM, quarterly reviews', ''],
  ['Enterprise', '24/7 support with SLA guarantees', '4 hrs (critical: 1 hr)', 'Email, Ticket, Slack, Phone', 0.2, 5000, 'Premium + 24/7 on-call, custom SLAs', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['EXAMPLE CALCULATION', '', '', 'License Value', 'Support Tier', 'Support Fee', '', ''],
  ['', '', '', 50000, 'Premium', { f: 'MAX(D11*0.15, 1500)' }, '', ''],
  ['', '', '', 100000, 'Enterprise', { f: 'MAX(D12*0.2, 5000)' }, '', ''],
];

const ws5 = XLSX.utils.aoa_to_sheet(supportTiers);
ws5['!cols'] = [
  { wch: 14 },  // Tier
  { wch: 38 },  // Description
  { wch: 20 },  // Response Time
  { wch: 26 },  // Channels
  { wch: 12 },  // % of License
  { wch: 12 },  // Min Monthly
  { wch: 42 },  // Includes
];
XLSX.utils.book_append_sheet(wb, ws5, 'Support Tiers');

// ============================================
// SHEET 6: Deal Calculator
// ============================================
const dealCalc = [
  ['DEAL CALCULATOR', '', '', '', ''],
  ['', '', '', '', ''],
  ['INPUTS', '', '', '', ''],
  ['', '', '', '', ''],
  ['Service', 'DevSecOps Assessment', '', '', ''],
  ['Include CI/CD Integration?', 'Yes', '', '', ''],
  ['Fractional CISO months', 6, '', '', ''],
  ['', '', '', '', ''],
  ['Platform', 'Noosphere Bundle', '', '', ''],
  ['Platform months', 12, '', '', ''],
  ['', '', '', '', ''],
  ['Partner Products', '', '', '', ''],
  ['Veracode SAST', 'Yes', '', '', ''],
  ['SignPath', 'Yes', '', '', ''],
  ['Thales HSM', 'No', '', '', ''],
  ['', '', '', '', ''],
  ['Support Tier', 'Premium', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['CALCULATED DEAL VALUE', '', '', '', ''],
  ['', '', '', '', ''],
  ['Component', 'Value', 'Our Cost', 'Margin', ''],
  ['Assessment Services', 16800, 12000, { f: 'B23-C23' }, ''],
  ['CI/CD Integration Services', 40600, 29000, { f: 'B24-C24' }, ''],
  ['Fractional CISO (6 mo)', 117000, 78000, { f: 'B25-C25' }, ''],
  ['Noosphere Platform (12 mo)', 82500, 66000, { f: 'B26-C26' }, ''],
  ['Veracode SAST', 25000, 20000, { f: 'B27-C27' }, ''],
  ['SignPath', 11700, 9000, { f: 'B28-C28' }, ''],
  ['Support (Premium)', 12375, 0, { f: 'B29-C29' }, ''],
  ['', '', '', '', ''],
  ['TOTAL DEAL', { f: 'SUM(B23:B29)' }, { f: 'SUM(C23:C29)' }, { f: 'B31-C31' }, ''],
  ['Blended Margin %', { f: 'D31/C31' }, '', '', ''],
];

const ws6 = XLSX.utils.aoa_to_sheet(dealCalc);
ws6['!cols'] = [
  { wch: 28 },  // Component
  { wch: 14 },  // Value
  { wch: 14 },  // Our Cost
  { wch: 14 },  // Margin
  { wch: 10 },  //
];
XLSX.utils.book_append_sheet(wb, ws6, 'Deal Calculator');

// Write file
const outputPath = path.join(__dirname, '..', 'AxiomMatrix-Offerings.xlsx');
XLSX.writeFile(wb, outputPath);
console.log('Created:', outputPath);
