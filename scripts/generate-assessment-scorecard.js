const XLSX = require('xlsx');
const path = require('path');

const wb = XLSX.utils.book_new();

// ============================================
// SHEET 1: Scoring Input
// ============================================
const scoring = [
  ['DEVSECOPS MATURITY ASSESSMENT SCORECARD', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['Client:', '', '', 'Date:', '', '', ''],
  ['Assessor:', '', '', 'Version:', '1.0', '', ''],
  ['', '', '', '', '', '', ''],
  ['SCORING GUIDE: 0=None, 1=Initial, 2=Managed, 3=Optimized', '', '', '', '', '', ''],
  ['Use decimals (0.5, 1.5, 2.5) for partial implementation', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['FUNCTION', 'PRACTICE', 'SCORE (0-3)', 'TARGET', 'GAP', 'PRIORITY (H/M/L)', 'NOTES'],
  ['', '', '', '', '', '', ''],
  ['GOVERNANCE', '', { f: 'AVERAGE(C12:C14)' }, { f: 'AVERAGE(D12:D14)' }, { f: 'D11-C11' }, '', ''],
  ['', 'Strategy & Metrics', 0, 1.5, { f: 'D12-C12' }, '', ''],
  ['', 'Policy & Compliance', 0, 1.5, { f: 'D13-C13' }, '', ''],
  ['', 'Education & Guidance', 0, 1.5, { f: 'D14-C14' }, '', ''],
  ['', '', '', '', '', '', ''],
  ['DESIGN', '', { f: 'AVERAGE(C17:C19)' }, { f: 'AVERAGE(D17:D19)' }, { f: 'D16-C16' }, '', ''],
  ['', 'Threat Assessment', 0, 1.5, { f: 'D17-C17' }, '', ''],
  ['', 'Security Requirements', 0, 1.5, { f: 'D18-C18' }, '', ''],
  ['', 'Security Architecture', 0, 1.5, { f: 'D19-C19' }, '', ''],
  ['', '', '', '', '', '', ''],
  ['IMPLEMENTATION', '', { f: 'AVERAGE(C22:C24)' }, { f: 'AVERAGE(D22:D24)' }, { f: 'D21-C21' }, '', ''],
  ['', 'Secure Build', 0, 2.0, { f: 'D22-C22' }, '', ''],
  ['', 'Secure Deployment', 0, 2.0, { f: 'D23-C23' }, '', ''],
  ['', 'Defect Management', 0, 1.5, { f: 'D24-C24' }, '', ''],
  ['', '', '', '', '', '', ''],
  ['VERIFICATION', '', { f: 'AVERAGE(C27:C29)' }, { f: 'AVERAGE(D27:D29)' }, { f: 'D26-C26' }, '', ''],
  ['', 'Architecture Assessment', 0, 1.5, { f: 'D27-C27' }, '', ''],
  ['', 'Requirements Testing', 0, 1.5, { f: 'D28-C28' }, '', ''],
  ['', 'Security Testing', 0, 2.0, { f: 'D29-C29' }, '', ''],
  ['', '', '', '', '', '', ''],
  ['OPERATIONS', '', { f: 'AVERAGE(C32:C34)' }, { f: 'AVERAGE(D32:D34)' }, { f: 'D31-C31' }, '', ''],
  ['', 'Incident Management', 0, 1.5, { f: 'D32-C32' }, '', ''],
  ['', 'Environment Management', 0, 1.5, { f: 'D33-C33' }, '', ''],
  ['', 'Operational Management', 0, 1.5, { f: 'D34-C34' }, '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['OVERALL MATURITY', '', { f: 'AVERAGE(C11,C16,C21,C26,C31)' }, { f: 'AVERAGE(D11,D16,D21,D26,D31)' }, { f: 'D37-C37' }, '', ''],
];

const ws1 = XLSX.utils.aoa_to_sheet(scoring);
ws1['!cols'] = [
  { wch: 18 },  // Function
  { wch: 24 },  // Practice
  { wch: 12 },  // Score
  { wch: 10 },  // Target
  { wch: 8 },   // Gap
  { wch: 14 },  // Priority
  { wch: 40 },  // Notes
];
XLSX.utils.book_append_sheet(wb, ws1, 'Scorecard');

// ============================================
// SHEET 2: Evidence Tracker
// ============================================
const evidence = [
  ['EVIDENCE TRACKER', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['ID', 'PRACTICE', 'EVIDENCE TYPE', 'DESCRIPTION', 'SOURCE', 'STATUS'],
  ['', '', '', '', '', ''],
  ['E001', 'Strategy & Metrics', 'Document', 'Security strategy document', '', 'Requested'],
  ['E002', 'Strategy & Metrics', 'Dashboard', 'Security metrics dashboard', '', 'Requested'],
  ['E003', 'Policy & Compliance', 'Document', 'Secure coding policy', '', 'Requested'],
  ['E004', 'Policy & Compliance', 'Report', 'Compliance audit report', '', 'Requested'],
  ['E005', 'Education & Guidance', 'Records', 'Training completion records', '', 'Requested'],
  ['E006', 'Education & Guidance', 'Document', 'Security champions roster', '', 'Requested'],
  ['E007', 'Threat Assessment', 'Document', 'Threat model examples', '', 'Requested'],
  ['E008', 'Security Requirements', 'Tickets', 'User stories with security reqs', '', 'Requested'],
  ['E009', 'Security Architecture', 'Document', 'Architecture standards', '', 'Requested'],
  ['E010', 'Secure Build', 'Config', 'CI/CD pipeline configuration', '', 'Requested'],
  ['E011', 'Secure Build', 'Report', 'SAST scan results', '', 'Requested'],
  ['E012', 'Secure Build', 'Report', 'SCA/dependency scan results', '', 'Requested'],
  ['E013', 'Secure Deployment', 'Config', 'Secrets management setup', '', 'Requested'],
  ['E014', 'Secure Deployment', 'Config', 'IaC templates', '', 'Requested'],
  ['E015', 'Defect Management', 'Export', 'Security bug tracker export', '', 'Requested'],
  ['E016', 'Defect Management', 'Document', 'Remediation SLAs', '', 'Requested'],
  ['E017', 'Architecture Assessment', 'Document', 'Review checklist/records', '', 'Requested'],
  ['E018', 'Requirements Testing', 'Report', 'Security test coverage', '', 'Requested'],
  ['E019', 'Security Testing', 'Report', 'DAST scan results', '', 'Requested'],
  ['E020', 'Security Testing', 'Report', 'Penetration test report', '', 'Requested'],
  ['E021', 'Incident Management', 'Document', 'IR plan and playbooks', '', 'Requested'],
  ['E022', 'Incident Management', 'Records', 'IR drill records', '', 'Requested'],
  ['E023', 'Environment Management', 'Document', 'Hardening standards', '', 'Requested'],
  ['E024', 'Environment Management', 'Report', 'Patch compliance report', '', 'Requested'],
  ['E025', 'Operational Management', 'Config', 'SIEM/logging configuration', '', 'Requested'],
  ['E026', 'Operational Management', 'Records', 'Access review records', '', 'Requested'],
];

const ws2 = XLSX.utils.aoa_to_sheet(evidence);
ws2['!cols'] = [
  { wch: 8 },   // ID
  { wch: 24 },  // Practice
  { wch: 14 },  // Type
  { wch: 36 },  // Description
  { wch: 20 },  // Source
  { wch: 12 },  // Status
];
XLSX.utils.book_append_sheet(wb, ws2, 'Evidence Tracker');

// ============================================
// SHEET 3: Findings Log
// ============================================
const findings = [
  ['FINDINGS LOG', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['ID', 'FUNCTION', 'FINDING', 'TYPE', 'SEVERITY', 'RECOMMENDATION', 'EFFORT', 'PHASE'],
  ['', '', '', '', '', '', '', ''],
  ['F001', '', '', 'Gap', '', '', '', ''],
  ['F002', '', '', 'Gap', '', '', '', ''],
  ['F003', '', '', 'Gap', '', '', '', ''],
  ['F004', '', '', 'Gap', '', '', '', ''],
  ['F005', '', '', 'Strength', '', '', '', ''],
  ['F006', '', '', 'Strength', '', '', '', ''],
  ['F007', '', '', 'Gap', '', '', '', ''],
  ['F008', '', '', 'Gap', '', '', '', ''],
  ['F009', '', '', 'Gap', '', '', '', ''],
  ['F010', '', '', 'Gap', '', '', '', ''],
  ['F011', '', '', 'Quick Win', '', '', '', ''],
  ['F012', '', '', 'Quick Win', '', '', '', ''],
  ['F013', '', '', 'Quick Win', '', '', '', ''],
  ['F014', '', '', 'Risk', '', '', '', ''],
  ['F015', '', '', 'Risk', '', '', '', ''],
];

const ws3 = XLSX.utils.aoa_to_sheet(findings);
ws3['!cols'] = [
  { wch: 8 },   // ID
  { wch: 16 },  // Function
  { wch: 40 },  // Finding
  { wch: 12 },  // Type
  { wch: 10 },  // Severity
  { wch: 40 },  // Recommendation
  { wch: 10 },  // Effort
  { wch: 8 },   // Phase
];
XLSX.utils.book_append_sheet(wb, ws3, 'Findings Log');

// ============================================
// SHEET 4: Roadmap Builder
// ============================================
const roadmap = [
  ['ROADMAP BUILDER', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['PHASE 1: FOUNDATION (Months 1-3)', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['#', 'ACTION', 'FUNCTION', 'FINDING REF', 'OWNER', 'M1', 'M2', 'M3', 'DELIVERABLE'],
  ['1.1', '', '', '', '', '', '', '', ''],
  ['1.2', '', '', '', '', '', '', '', ''],
  ['1.3', '', '', '', '', '', '', '', ''],
  ['1.4', '', '', '', '', '', '', '', ''],
  ['1.5', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['PHASE 2: INTEGRATION (Months 4-8)', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['#', 'ACTION', 'FUNCTION', 'FINDING REF', 'OWNER', 'M4', 'M5', 'M6-8', 'DELIVERABLE'],
  ['2.1', '', '', '', '', '', '', '', ''],
  ['2.2', '', '', '', '', '', '', '', ''],
  ['2.3', '', '', '', '', '', '', '', ''],
  ['2.4', '', '', '', '', '', '', '', ''],
  ['2.5', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['PHASE 3: OPTIMIZATION (Months 9-12)', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['#', 'ACTION', 'FUNCTION', 'FINDING REF', 'OWNER', 'M9', 'M10', 'M11-12', 'DELIVERABLE'],
  ['3.1', '', '', '', '', '', '', '', ''],
  ['3.2', '', '', '', '', '', '', '', ''],
  ['3.3', '', '', '', '', '', '', '', ''],
  ['3.4', '', '', '', '', '', '', '', ''],
  ['3.5', '', '', '', '', '', '', '', ''],
];

const ws4 = XLSX.utils.aoa_to_sheet(roadmap);
ws4['!cols'] = [
  { wch: 6 },   // #
  { wch: 36 },  // Action
  { wch: 16 },  // Function
  { wch: 12 },  // Finding Ref
  { wch: 14 },  // Owner
  { wch: 6 },   // M1/M4/M9
  { wch: 6 },   // M2/M5/M10
  { wch: 8 },   // M3/M6-8/M11-12
  { wch: 30 },  // Deliverable
];
XLSX.utils.book_append_sheet(wb, ws4, 'Roadmap Builder');

// ============================================
// SHEET 5: Tool Inventory
// ============================================
const tools = [
  ['SECURITY TOOL INVENTORY', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['CATEGORY', 'CURRENT TOOL', 'VERSION', 'COVERAGE %', 'BLOCKING?', 'RECOMMENDED', 'NOTES'],
  ['', '', '', '', '', '', ''],
  ['SAST', '', '', '', '', '', ''],
  ['DAST', '', '', '', '', '', ''],
  ['SCA', '', '', '', '', '', ''],
  ['Secrets Scanning', '', '', '', '', '', ''],
  ['Container Scanning', '', '', '', '', '', ''],
  ['IaC Scanning', '', '', '', '', '', ''],
  ['SBOM Generation', '', '', '', '', '', ''],
  ['Code Signing', '', '', '', '', '', ''],
  ['Vulnerability Management', '', '', '', '', '', ''],
  ['SIEM', '', '', '', '', '', ''],
  ['Secrets Manager', '', '', '', '', '', ''],
  ['WAF', '', '', '', '', '', ''],
  ['API Security', '', '', '', '', '', ''],
  ['Pen Testing', '', '', '', '', '', ''],
  ['Training Platform', '', '', '', '', '', ''],
  ['Threat Modeling', '', '', '', '', '', ''],
];

const ws5 = XLSX.utils.aoa_to_sheet(tools);
ws5['!cols'] = [
  { wch: 22 },  // Category
  { wch: 20 },  // Current Tool
  { wch: 10 },  // Version
  { wch: 12 },  // Coverage
  { wch: 10 },  // Blocking
  { wch: 20 },  // Recommended
  { wch: 30 },  // Notes
];
XLSX.utils.book_append_sheet(wb, ws5, 'Tool Inventory');

// ============================================
// SHEET 6: Interview Schedule
// ============================================
const interviews = [
  ['INTERVIEW SCHEDULE', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['DATE', 'TIME', 'FUNCTION', 'PARTICIPANTS', 'LOCATION/LINK', 'STATUS', 'NOTES'],
  ['', '', '', '', '', '', ''],
  ['', '', 'Governance', '', '', 'Scheduled', ''],
  ['', '', 'Design', '', '', 'Scheduled', ''],
  ['', '', 'Implementation', '', '', 'Scheduled', ''],
  ['', '', 'Verification', '', '', 'Scheduled', ''],
  ['', '', 'Operations', '', '', 'Scheduled', ''],
  ['', '', 'Wrap-up / Validation', '', '', 'Scheduled', ''],
];

const ws6 = XLSX.utils.aoa_to_sheet(interviews);
ws6['!cols'] = [
  { wch: 12 },  // Date
  { wch: 10 },  // Time
  { wch: 18 },  // Function
  { wch: 30 },  // Participants
  { wch: 30 },  // Location
  { wch: 12 },  // Status
  { wch: 30 },  // Notes
];
XLSX.utils.book_append_sheet(wb, ws6, 'Interview Schedule');

// Write file
const outputPath = path.join(__dirname, '..', 'docs', 'maturity-assessment', 'Assessment-Scorecard-Template.xlsx');
XLSX.writeFile(wb, outputPath);
console.log('Created:', outputPath);
