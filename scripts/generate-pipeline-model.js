const XLSX = require('xlsx');
const path = require('path');

// Create workbook
const wb = XLSX.utils.book_new();

// ============================================
// SHEET 1: Assumptions
// ============================================
const assumptions = [
  ['NOOSPHERE AI GATEWAY - PIPELINE MODEL'],
  [''],
  ['KEY ASSUMPTIONS', 'Value', 'Notes'],
  ['Target Pipeline', '$1,000,000', 'Total qualified opportunity value'],
  ['Pipeline to Close Rate', '30%', 'Industry standard for enterprise SaaS'],
  ['Expected Closed Revenue', '$300,000', '=Target Pipeline × Close Rate'],
  ['Sales Cycle (avg)', '90 days', 'Enterprise B2B'],
  ['Lead to Opportunity Rate', '10%', 'MQL to qualified opp'],
  [''],
  ['PRODUCT TIERS', 'Monthly', 'Annual (ACV)', 'Notes'],
  ['Starter', '$1,000', '$12,000', 'Identity + 1 capability'],
  ['Pro', '$5,000', '$60,000', 'Full platform'],
  ['Enterprise', '$20,000', '$240,000', 'Everything + SLAs + support'],
  [''],
  ['PIPELINE MIX TARGET', 'ACV', 'Deal Count', 'Pipeline Value', '% of Total'],
  ['Starter', '$12,000', '20', '$240,000', '24%'],
  ['Pro', '$60,000', '10', '$600,000', '58%'],
  ['Enterprise', '$200,000', '1', '$200,000', '19%'],
  ['TOTAL', '', '31', '$1,040,000', '100%'],
  [''],
  ['LEAD VOLUME NEEDED', 'Value', 'Calculation'],
  ['Qualified Opportunities', '31', 'From pipeline mix above'],
  ['Lead to Opp Rate', '10%', 'Assumption'],
  ['Leads (MQLs) Needed', '310', '=Opps ÷ Conversion Rate'],
  ['Buffer (20%)', '372', 'Target with safety margin'],
];

const ws1 = XLSX.utils.aoa_to_sheet(assumptions);
ws1['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, ws1, 'Assumptions');

// ============================================
// SHEET 2: ICPs (Ideal Customer Profiles)
// ============================================
const icps = [
  ['IDEAL CUSTOMER PROFILES (ICPs)'],
  [''],
  ['ICP', 'Title', 'Company Size', 'Industry', 'Pain Points', 'Trigger Events', 'Target Tier'],
  ['ICP 1: AI-Forward Enterprise', 'CISO / VP Engineering', '1000+ employees', 'Tech, Financial Services, Healthcare', 'AI agents proliferating without governance; Board asking about AI risk', 'New AI initiative announced; Compliance audit; AI incident in news', 'Enterprise'],
  ['ICP 2: Platform Team', 'Head of Platform / Staff Eng', '200-1000 employees', 'SaaS, Tech', 'Multiple LLMs in use; No central control; Developer productivity vs security tension', 'Scaling AI features; New CTO/CISO hire; SOC2/compliance push', 'Pro'],
  ['ICP 3: Security-Conscious Startup', 'CTO / Security Lead', '50-200 employees', 'Tech, Fintech, AI-native', 'Shipping AI features fast; Need trust/provenance story for customers', 'Enterprise customer asks about AI governance; Funding round', 'Starter / Pro'],
  ['ICP 4: Regulated Industry', 'CISO / Compliance Lead', '500+ employees', 'Healthcare, Finance, Government', 'AI governance requirements; Audit trail needs; Content provenance for legal', 'New regulation (EU AI Act); Audit finding; Vendor requirement', 'Pro / Enterprise'],
  [''],
  ['ICP PRIORITIZATION', 'Pipeline Potential', 'Sales Cycle', 'Fit Score', 'Priority'],
  ['ICP 1: AI-Forward Enterprise', 'High ($200K+)', 'Long (6+ mo)', '9/10', '1 - Anchor accounts'],
  ['ICP 2: Platform Team', 'Medium ($60K)', 'Medium (3-4 mo)', '8/10', '2 - Volume play'],
  ['ICP 4: Regulated Industry', 'High ($100K+)', 'Long (6+ mo)', '8/10', '3 - Compliance-driven'],
  ['ICP 3: Security-Conscious Startup', 'Low-Medium ($12-30K)', 'Short (1-2 mo)', '7/10', '4 - Quick wins'],
];

const ws2 = XLSX.utils.aoa_to_sheet(icps);
ws2['!cols'] = [{ wch: 28 }, { wch: 22 }, { wch: 18 }, { wch: 30 }, { wch: 45 }, { wch: 45 }, { wch: 15 }];
XLSX.utils.book_append_sheet(wb, ws2, 'ICPs');

// ============================================
// SHEET 3: Campaigns
// ============================================
const campaigns = [
  ['CAMPAIGNS BY ICP'],
  [''],
  ['Campaign', 'Target ICP', 'Channel', 'Message Theme', 'CTA', 'Lead Target', 'Pipeline Target', 'Timeline'],
  [''],
  ['CAMPAIGN 1: Enterprise AI Governance', '', '', '', '', '', '', ''],
  ['Outbound - CISO Sequence', 'ICP 1', 'Email + LinkedIn', '"Your AI agents are talking. Do you know what they\'re saying?"', 'Book executive briefing', '30', '$300K', 'Q1-Q2'],
  ['Executive Roundtable', 'ICP 1', 'Event', '"AI Trust in the Enterprise" dinner', 'Attend roundtable', '10', '$200K', 'Q2'],
  ['Analyst/Influencer', 'ICP 1', 'PR', 'Brief analysts on AI Gateway category', 'Inbound inquiries', '10', '$100K', 'Q2-Q3'],
  [''],
  ['CAMPAIGN 2: Platform Team Play', '', '', '', '', '', '', ''],
  ['Content: "AI Gateway 101"', 'ICP 2', 'Blog + LinkedIn', 'Educational content on AI control planes', 'Download guide', '50', '$150K', 'Q1-Q4'],
  ['Webinar Series', 'ICP 2', 'Webinar', '"Building Trust into Your AI Stack"', 'Register for webinar', '40', '$120K', 'Q2-Q3'],
  ['Product-Led Trial', 'ICP 2', 'Website', 'Free Starter tier trial', 'Start free trial', '100', '$200K', 'Q2-Q4'],
  [''],
  ['CAMPAIGN 3: Compliance Push', '', '', '', '', '', '', ''],
  ['EU AI Act Content', 'ICP 4', 'Blog + Webinar', '"AI Governance for EU AI Act Compliance"', 'Download compliance guide', '30', '$150K', 'Q1-Q2'],
  ['Partner with GRC vendors', 'ICP 4', 'Partner', 'Joint solution for AI compliance', 'Partner referrals', '20', '$100K', 'Q2-Q3'],
  [''],
  ['CAMPAIGN 4: AxioMatrix Upsell', '', '', '', '', '', '', ''],
  ['Existing Client Outreach', 'All ICPs', 'Direct', '"Now offering AI Gateway through our partnership"', 'Schedule platform demo', '25', '$200K', 'Q1'],
  ['Assessment to Platform', 'All ICPs', 'Direct', 'Assessment reveals AI governance gaps → Gateway solves', 'Add Gateway to engagement', '20', '$150K', 'Q1-Q4'],
  [''],
  ['TOTALS', '', '', '', '', '335', '$1.67M pipeline potential', ''],
];

const ws3 = XLSX.utils.aoa_to_sheet(campaigns);
ws3['!cols'] = [{ wch: 30 }, { wch: 12 }, { wch: 15 }, { wch: 50 }, { wch: 25 }, { wch: 12 }, { wch: 18 }, { wch: 10 }];
XLSX.utils.book_append_sheet(wb, ws3, 'Campaigns');

// ============================================
// SHEET 4: Pipeline Tracker
// ============================================
const pipeline = [
  ['PIPELINE TRACKER'],
  [''],
  ['Company', 'ICP', 'Tier', 'ACV', 'Stage', 'Close Date', 'Probability', 'Weighted Value', 'Campaign Source', 'Owner', 'Next Step'],
  ['[Example] Acme Corp', 'ICP 1', 'Enterprise', '$200,000', 'Discovery', '2026-06-30', '20%', '$40,000', 'Outbound - CISO', 'Rep 1', 'Schedule technical deep-dive'],
  ['[Example] TechStartup Inc', 'ICP 3', 'Starter', '$12,000', 'Proposal', '2026-04-15', '60%', '$7,200', 'Product-Led Trial', 'Rep 2', 'Send contract'],
  ['[Example] HealthCo', 'ICP 4', 'Pro', '$60,000', 'Negotiation', '2026-05-01', '80%', '$48,000', 'EU AI Act Content', 'Rep 1', 'Legal review'],
  ['', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', ''],
  [''],
  ['PIPELINE SUMMARY', '', '', '', '', '', '', '', '', '', ''],
  ['Stage', 'Count', 'Value', 'Weighted', '', '', '', '', '', '', ''],
  ['Lead', '0', '$0', '$0', '', '', '', '', '', '', ''],
  ['Discovery', '1', '$200,000', '$40,000', '', '', '', '', '', '', ''],
  ['Demo', '0', '$0', '$0', '', '', '', '', '', '', ''],
  ['Proposal', '1', '$12,000', '$7,200', '', '', '', '', '', '', ''],
  ['Negotiation', '1', '$60,000', '$48,000', '', '', '', '', '', '', ''],
  ['Closed Won', '0', '$0', '$0', '', '', '', '', '', '', ''],
  ['TOTAL', '3', '$272,000', '$95,200', '', '', '', '', '', '', ''],
];

const ws4 = XLSX.utils.aoa_to_sheet(pipeline);
ws4['!cols'] = [{ wch: 22 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 20 }, { wch: 10 }, { wch: 30 }];
XLSX.utils.book_append_sheet(wb, ws4, 'Pipeline Tracker');

// ============================================
// SHEET 5: Quarterly Targets
// ============================================
const quarterly = [
  ['QUARTERLY TARGETS'],
  [''],
  ['Quarter', 'Pipeline Target', 'Cumulative Pipeline', 'Leads Target', 'Deals Target', 'Key Campaigns', 'Focus'],
  ['Q1 2026', '$250,000', '$250,000', '80', '8', 'AxioMatrix Upsell, Outbound CISO', 'Foundation - existing relationships + early outbound'],
  ['Q2 2026', '$300,000', '$550,000', '100', '10', 'Webinars, EU AI Act, Enterprise events', 'Scale - content + events producing'],
  ['Q3 2026', '$250,000', '$800,000', '80', '8', 'Product-Led Trial, Partner referrals', 'Acceleration - PLG + partners'],
  ['Q4 2026', '$200,000', '$1,000,000', '75', '5', 'Maintain all channels', 'Optimization - refine what works'],
  ['TOTAL', '$1,000,000', '', '335', '31', '', ''],
  [''],
  ['MONTHLY BREAKDOWN (Q1)', 'Jan', 'Feb', 'Mar', 'Q1 Total', '', '', ''],
  ['Leads', '20', '25', '35', '80', '', '', ''],
  ['Opps Created', '2', '3', '3', '8', '', '', ''],
  ['Pipeline Added', '$50K', '$75K', '$125K', '$250K', '', '', ''],
  ['Closed Won', '$0', '$0', '$25K', '$25K', '', '', ''],
];

const ws5 = XLSX.utils.aoa_to_sheet(quarterly);
ws5['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 40 }, { wch: 40 }];
XLSX.utils.book_append_sheet(wb, ws5, 'Quarterly Targets');

// ============================================
// SHEET 6: Product & Pricing
// ============================================
const pricing = [
  ['NOOSPHERE AI GATEWAY - PRODUCT & PRICING'],
  [''],
  ['PRODUCT CAPABILITIES'],
  ['Capability', 'Description', 'Starter', 'Pro', 'Enterprise'],
  ['Identity (DID:Web)', 'Establish and verify who/what is acting', '✓ 1 domain', '✓ 5 domains', '✓ Unlimited'],
  ['Code Signing', 'Sign software artifacts and AI outputs', '–', '✓ 1000/mo', '✓ Unlimited'],
  ['Content Credentials (C2PA)', 'Provenance for media/content', '✓ 100/mo', '✓ 1000/mo', '✓ Unlimited'],
  ['LLM Gateway', 'Control and monitor AI traffic', '–', '✓ 10K req/mo', '✓ Unlimited'],
  ['Trust Graph', 'Verify relationships and permissions', '–', '✓', '✓'],
  ['Verifiable Credentials', 'Issue and verify identity credentials', '–', '–', '✓'],
  ['Audit Logs', 'Full attestation chain', '30 days', '1 year', 'Unlimited'],
  ['Support', 'Help when you need it', 'Community', 'Business hours', '24/7 + CSM'],
  ['SLA', 'Uptime guarantee', '–', '99.9%', '99.99%'],
  [''],
  ['PRICING'],
  ['Tier', 'Monthly', 'Annual', 'Annual Savings', 'Target Customer'],
  ['Starter', '$1,000', '$10,000', '17%', 'Teams getting started'],
  ['Pro', '$5,000', '$50,000', '17%', 'Scaling organizations'],
  ['Enterprise', 'Custom', 'Custom ($200K+)', 'Negotiated', 'Large / regulated'],
  [''],
  ['USAGE OVERAGES (Pro tier example)'],
  ['Capability', 'Included', 'Overage Rate'],
  ['Content Credentials', '1,000/mo', '$0.10 per additional'],
  ['Code Signing', '1,000/mo', '$0.05 per additional'],
  ['LLM Gateway', '10,000 req/mo', '$0.001 per additional request'],
];

const ws6 = XLSX.utils.aoa_to_sheet(pricing);
ws6['!cols'] = [{ wch: 28 }, { wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
XLSX.utils.book_append_sheet(wb, ws6, 'Product & Pricing');

// ============================================
// SHEET 7: AxioMatrix Economics
// ============================================
const economics = [
  ['CYBERSECGARD ECONOMICS (Reseller Model)'],
  [''],
  ['REVENUE STREAMS'],
  ['Stream', 'Type', 'Margin', 'Recurring?', 'Example'],
  ['Consulting Services', 'Own', '100%', 'Project/Retainer', '$50K assessment'],
  ['Training', 'Own', '100%', 'Annual refresh', '$15K per cohort'],
  ['Fractional CISO', 'Own', '100%', 'Monthly', '$10K/mo retainer'],
  ['Noosphere AI Gateway', 'Reseller', '30%', 'Annual subscription', '30% of $50K = $15K'],
  ['Partner (Thales/SignPath)', 'Reseller', '20%', 'Annual', '20% of $30K = $6K'],
  [''],
  ['BLENDED DEAL EXAMPLE'],
  ['Component', 'Customer Pays', 'AxioMatrix Revenue', 'Margin %'],
  ['Assessment + CI/CD Integration', '$75,000', '$75,000', '100%'],
  ['Noosphere AI Gateway (Pro)', '$50,000', '$15,000', '30%'],
  ['SignPath Licenses', '$25,000', '$5,000', '20%'],
  ['TOTAL DEAL', '$150,000', '$95,000', '63% blended'],
  [''],
  ['ANNUAL ECONOMICS TARGET'],
  ['Metric', 'Target', 'Notes'],
  ['Noosphere Pipeline Generated', '$1,000,000', 'This model'],
  ['Noosphere Closed (30%)', '$300,000', 'Platform revenue'],
  ['AxioMatrix Margin (30%)', '$90,000', 'Reseller commission'],
  ['Attached Services (1:1 ratio)', '$300,000', 'Consulting/training on platform deals'],
  ['Total AxioMatrix Revenue', '$390,000', 'From Noosphere-sourced deals'],
  [''],
  ['Plus: Standalone consulting, partner reselling, etc.'],
];

const ws7 = XLSX.utils.aoa_to_sheet(economics);
ws7['!cols'] = [{ wch: 32 }, { wch: 18 }, { wch: 22 }, { wch: 15 }, { wch: 20 }];
XLSX.utils.book_append_sheet(wb, ws7, 'AxioMatrix Economics');

// Write file
const outputPath = path.join(__dirname, '..', 'Noosphere-AI-Gateway-Pipeline-Model.xlsx');
XLSX.writeFile(wb, outputPath);
console.log('Created:', outputPath);
