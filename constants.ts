
import { Suite, Service, CaseStudy } from './types';

export const APP_NAME = "Megam Live";

export const SEO_CONFIG = {
  home: {
    title: "Megam Live | AI-Native Microsoft 365 Workflow Automation",
    description: "Engineering high-touch Microsoft 365 solutions for regulated industries. Precision workflows enhanced by Copilot-driven intelligence and governed automation."
  },
  suites: {
    title: "Product Suites | Enterprise M365 Solutions | Megam Live",
    description: "Explore our M365 product suites: Artwork Today, Material Master, and Project Tracker. Regulated artwork and labeling workflows built for the Microsoft ecosystem."
  },
  services: {
    title: "M365 Engineering Services & Governance | Megam Live",
    description: "Enterprise-grade Microsoft 365 architecture, governance, and engineering. We design secure, compliant, and scalable M365 environments for global firms."
  },
  integrations: {
    title: "SAP Integration Automation | Planetary Sync™ | Megam Live",
    description: "Secure, governed SAP integration for Microsoft 365. Synchronize Systems of Record with Systems of Engagement using our proprietary integration fabric."
  },
  contact: {
    title: "Contact a Microsoft 365 Architect | Megam Live",
    description: "Ready to synchronize your operations? Talk to our M365 solution architects about governance, automation, and regulated industry workflows."
  }
};

export const COMPANY_OVERVIEW = "Megam Live (formerly ShopSharePoint LLC) is a boutique Microsoft 365 solutions provider, trusted by organizations in regulated industries for delivering responsive, high-touch support and precision-engineered solutions. Our reputation is built on deep Microsoft expertise, attention to detail, and a commitment to helping clients maximize the value of their digital workplace.";

export const BADGE_DETAILS: Record<string, { description: string; colorClass: string; glowClass: string }> = {
  "Compliance-Aligned": {
    description: "Architected to meet GxP, 21 CFR Part 11, and strict regulatory audit requirements.",
    colorClass: "text-brand-success border-brand-success/30 bg-brand-success/5",
    glowClass: "shadow-[0_0_15px_rgba(16,185,129,0.3)]"
  },
  "M365 Native": {
    description: "Deployed entirely within your Microsoft 365 tenant. No external data storage required.",
    colorClass: "text-brand-primary border-brand-primary/30 bg-brand-primary/5",
    glowClass: "shadow-[0_0_15px_rgba(59,130,246,0.3)]"
  },
  "Production-Grade": {
    description: "Fully mature solution with comprehensive support protocols and enterprise stability.",
    colorClass: "text-slate-600 dark:text-gray-300 border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5",
    glowClass: "shadow-[0_0_15px_rgba(148,163,184,0.3)]"
  },
  "Copilot-Ready": {
    description: "Optimized for Microsoft 365 Copilot integration and AI-driven data grounding.",
    colorClass: "text-brand-neon border-brand-neon/30 bg-brand-neon/5",
    glowClass: "shadow-[0_0_15px_rgba(0,240,255,0.4)]"
  },
  "ERP Integrated": {
    description: "Supports seamless, governed synchronization with SAP S/4HANA and other ERP systems.",
    colorClass: "text-brand-secondary border-brand-secondary/30 bg-brand-secondary/5",
    glowClass: "shadow-[0_0_15px_rgba(99,102,241,0.3)]"
  },
  "Production": {
    description: "Battle-tested architecture currently serving active enterprise workloads.",
    colorClass: "text-brand-success border-brand-success/30 bg-brand-success/5",
    glowClass: "shadow-[0_0_10px_rgba(16,185,129,0.2)]"
  },
  "Early Production": {
    description: "Solution is live with primary features; scaling for full enterprise deployment.",
    colorClass: "text-brand-accent border-brand-accent/30 bg-brand-accent/5",
    glowClass: "shadow-[0_0_10px_rgba(6,182,212,0.2)]"
  },
  "Pilot": {
    description: "In active validation phase with select enterprise partners.",
    colorClass: "text-amber-500 border-amber-500/30 bg-amber-500/5",
    glowClass: "shadow-[0_0_10px_rgba(245,158,11,0.2)]"
  }
};

export const PRODUCT_SUITES: Suite[] = [
  {
    id: "artwork-today",
    title: "Artwork Today",
    productType: "SaaS Platform",
    maturity: "Production",
    shortDescription: "Regulated Artwork & Labeling Platform for Microsoft 365",
    fullDescription: "Artwork Today is a regulated artwork and labeling platform delivered as a SaaS solution and deployed directly into your Microsoft 365 environment. It centralizes artwork intake, versioning, reviews, and approvals while preserving your organization’s security, permissions, and compliance boundaries. Built for regulated industries, the platform enforces structured workflows and immutable audit trails.",
    features: [
      "Artwork intake and lifecycle management",
      "Version control with full approval history",
      "Role-based reviews and sign-offs",
      "Automated notifications and due dates",
      "Audit-ready activity logs within M365"
    ],
    benefits: [
      "Faster artwork approval cycles",
      "Improved compliance and traceability",
      "Reduced rework and approval bottlenecks",
      "Single source of truth for artwork data"
    ],
    iconName: "Shield",
    badges: ["Compliance-Aligned", "M365 Native", "Production-Grade"],
    externalLink: "https://www.artwork.today"
  },
  {
    id: "project-tracker",
    title: "Project Tracker",
    productType: "M365 Solution",
    maturity: "Production",
    shortDescription: "Enterprise Project Intelligence for Microsoft 365",
    fullDescription: "Project Tracker is an enterprise-grade project and portfolio management solution built on Microsoft 365 that goes beyond Planner and task-level tools. It provides a centralized view of projects, timelines, ownership, and execution health across the organization, designed for leadership visibility and operational control.",
    features: [
      "Enterprise-wide project and portfolio registry",
      "Task management with ownership and dependencies",
      "Timeline, milestone, and risk tracking",
      "Role-based dashboards for PMOs and leadership",
      "Teams and Outlook-integrated notifications"
    ],
    benefits: [
      "Improved project visibility across the enterprise",
      "Reduced missed deadlines and execution gaps",
      "Stronger accountability and ownership",
      "Fewer fragmented project tracking tools"
    ],
    iconName: "BarChart3",
    badges: ["M365 Native", "Copilot-Ready", "Production-Grade"]
  },
  {
    id: "megam-pulse",
    title: "Megam Pulse",
    productType: "Digital Workplace Solution",
    maturity: "Early Production",
    shortDescription: "Organization’s Pulse on Knowledge, Communication, and Context",
    fullDescription: "Megam Pulse is an intelligent digital workplace designed to reflect the real-time pulse of your organization—bringing together communication, knowledge, and context into a unified Microsoft 365 experience. Built as a modern intranet foundation, it enables employees to find information faster and stay aligned with organizational updates.",
    features: [
      "Branded news and communication hubs",
      "Departmental workspaces and knowledge libraries",
      "Enterprise search powered by Microsoft Graph",
      "Copilot-assisted content discovery and retrieval",
      "Mobile-first, responsive intranet design"
    ],
    benefits: [
      "Improved internal communication effectiveness",
      "Faster access to organizational knowledge",
      "Reduced time spent searching for information",
      "Higher employee adoption and engagement"
    ],
    iconName: "Layout",
    badges: ["M365 Native", "Copilot-Ready"]
  },
  {
    id: "material-master",
    title: "Material Master",
    productType: "Enterprise Workflow Platform",
    maturity: "Production",
    shortDescription: "Governed Material & BOM Management for Microsoft 365 with SAP Synchronization",
    fullDescription: "The Material Master solution is a Microsoft 365–based workflow platform that centralizes and governs the end-to-end Material Master and BOM creation process. It replaces manual spreadsheets with a structured, role-driven system of record. Once validated, approved data is securely synchronized into SAP, maintaining full traceability.",
    features: [
      "Centralized Material Master and BOM workflows",
      "Role-based contributions and validations",
      "Stage-based approvals with alerts",
      "Full audit trails and approval history",
      "Secure SAP synchronization with change visibility"
    ],
    benefits: [
      "Improved material data accuracy",
      "Reduced errors and rework in SAP",
      "Stronger cross-functional accountability",
      "Faster, compliant material creation cycles"
    ],
    iconName: "Layers",
    badges: ["Compliance-Aligned", "M365 Native", "ERP Integrated", "Production-Grade"]
  },
  {
    id: "print-ops",
    title: "Print Order Management",
    productType: "Workflow Solution",
    maturity: "Production",
    shortDescription: "Controlled Print Intake & Execution for Regulated Environments",
    fullDescription: "Print Order Management is a structured workflow solution designed to govern print intake, approvals, and execution in regulated manufacturing and packaging environments. By enforcing standardized intake processes and approval routing, it ensures compliance across the entire print lifecycle.",
    features: [
      "Centralized print request intake",
      "Approval routing with audit visibility",
      "Vendor coordination and order tracking",
      "Status-driven notifications and escalations",
      "Secure document storage and lifecycle control"
    ],
    benefits: [
      "Reduced manual print coordination",
      "Faster print turnaround times",
      "Improved vendor transparency",
      "Fewer execution errors",
      "Stronger compliance documentation"
    ],
    iconName: "RefreshCw",
    badges: ["Compliance-Aligned", "M365 Native", "ERP Integrated", "Production-Grade"]
  }
];

export const M365_SERVICES: Service[] = [
  {
    id: "sharepoint",
    title: "SharePoint Online Architecture",
    description: "Designing modern SharePoint architectures for intranets, process automation, document management, and governed collaboration—aligned with enterprise security and compliance standards.",
    iconName: "AppWindow"
  },
  {
    id: "power-automate",
    title: "Power Automate Workflow Automation",
    description: "Designing and governing Power Automate workflows to streamline approvals, integrations, and operational processes across Microsoft 365—without compromising control or auditability.",
    iconName: "RefreshCw"
  },
  {
    id: "power-bi",
    title: "Power BI Data Engineering",
    description: "Delivering Power BI dashboards and reporting models that transform operational and compliance data into actionable insights for leadership and business teams.",
    iconName: "Database"
  },
  {
    id: "teams",
    title: "Microsoft Teams Governance",
    description: "Extending Microsoft Teams into a secure collaboration and application hub using custom apps, notifications, and integrated workflows aligned to enterprise usage patterns.",
    iconName: "MessageSquare"
  },
  {
    id: "azure",
    title: "Azure Hybrid Services",
    description: "Leveraging Azure services to support secure integrations, backend services, and scalable architectures that extend Microsoft 365 beyond its core capabilities.",
    iconName: "Shield"
  },
  {
    id: "copilot",
    title: "Copilot Studio & AI Enablement",
    description: "Designing permission-aware Copilot experiences and AI-enabled workflows grounded in Microsoft Graph, Copilot Studio, and governed enterprise data sources.",
    iconName: "Brain"
  }
];

export const INDUSTRIES = [
  {
    name: "Healthcare & Life Sciences",
    description: "Orchestrating AI-native asset approvals and GxP-compliant traceability within fortified M365 environments.",
    icon: "plus-square",
    status: "Secure Link Active",
    code: "HL7-SEC"
  },
  {
    name: "Financial Services",
    description: "Deploying autonomous procurement logic and intelligent stakeholder sentiment engines grounded in SAP S/4HANA.",
    icon: "trending-up",
    status: "Ledger Synced",
    code: "FIN-NODE-01"
  },
  {
    name: "Printing & Manufacturing",
    description: "Engineering real-time edge-to-cloud synchronization for autonomous job routing and digital production tracing.",
    icon: "printer",
    status: "Ops Nominal",
    code: "MFG-PROX"
  }
];

export const ENGAGEMENT_MODELS = [
  { solution: "Power Automate Workflow Module", effort: "25–50 hrs", cost: "$3,500", icon: "RefreshCw" },
  { solution: "Intranet Foundation Architecture", effort: "60–80 hrs", cost: "$7,500", icon: "Layout" },
  { solution: "AI Powered Automation Suite", effort: "70–100 hrs", cost: "$9,000", icon: "Zap" },
  { solution: "Copilot Agent Strategy", effort: "70–100 hrs", cost: "$9,000", icon: "Bot" },
  { solution: "Custom Power App Engineering", effort: "60–80 hrs", cost: "$6,500", icon: "AppWindow" }
];

export const WHY_MEGAM = [
  { title: "Continuity First", description: "White-glove support and 24/7 managed continuity.", icon: "heart" },
  { title: "M365 Engineering", description: "From intranet to AI automation and Azure nodes.", icon: "award" },
  { title: "Custom Logic", description: "Built around your business DNA, not templates.", icon: "settings" },
  { title: "Regulated Ready", description: "Proven results in complex, GxP healthcare environments.", icon: "shield" },
  { title: "Enterprise Scaling", description: "Right-sized solutions that bridge to global scale.", icon: "users" },
  { title: "Mutual Success", description: "Incentive-aligned partnerships that win together.", icon: "handshake" }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "reg-pharma",
    clientIndustry: "Regulated Healthcare",
    title: "Traceable Asset Approvals for Global Pharma",
    outcome: "Implemented a zero-error labeling workflow for a major healthcare provider.",
    metrics: [
      { label: "Compliance", value: "100", suffix: "%" },
      { label: "Approval Time", value: "60", suffix: "% Faster" }
    ]
  },
  {
    id: "private-equity",
    clientIndustry: "Financial Services",
    title: "AI-Powered Investor Reporting Automation",
    outcome: "Automated the extraction of data from 500+ unstructured reports monthly.",
    metrics: [
      { label: "Manual Effort", value: "85", suffix: "% Less" },
      { label: "Accuracy", value: "99.8", suffix: "%" }
    ]
  }
];

export const CONTACT_INFO = {
  phone: "+1 646.634.1052",
  email: "letsdoit@megam.live",
  website: "www.megam.live",
  location: "101 Eisenhower Parkway,\nSuite 300, Roseland,\nNJ 07068"
};
