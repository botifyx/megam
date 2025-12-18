
import { Suite, Service, CaseStudy } from './types';

export const APP_NAME = "Megam Live";

export const COMPANY_OVERVIEW = "Megam Live (formerly ShopSharePoint LLC) is a boutique Microsoft 365 solutions provider, trusted by organizations in regulated industries for delivering responsive, high-touch support and precision-engineered solutions. Our reputation is built on deep Microsoft expertise, attention to detail, and a commitment to helping clients maximize the value of their digital workplace.";

export const PRODUCT_SUITES: Suite[] = [
  {
    id: "intranets",
    title: "Custom Intranets",
    shortDescription: "Neural-Enabled SharePoint Portals for Collective Intelligence.",
    fullDescription: "Engineering high-performance, mobile-first intranet ecosystems that synthesize internal communication, news telemetry, and decentralized knowledge hubs into a unified M365 interface.",
    features: [
      "Branded News Hubs",
      "Departmental Workspaces",
      "Employee Directories",
      "Mobile-First Design"
    ],
    benefits: [
      "Improved Internal Comms",
      "Centralized Knowledge",
      "Employee Engagement"
    ],
    iconName: "Layout"
  },
  {
    id: "print-ops",
    title: "Print Order Management",
    shortDescription: "Autonomous Supply-Chain Routing & GxP Traceability Nodes.",
    fullDescription: "Synchronizing shop-floor production with enterprise-grade SharePoint and Azure logic to automate vendor handshakes and secure auditable GxP compliance in real-time manufacturing.",
    features: [
      "Vendor Coordination",
      "Audit-Ready Tracking",
      "Automated Approvals",
      "Azure Integration"
    ],
    benefits: [
      "Reduced Lead Times",
      "Complete Traceability",
      "Error Reduction"
    ],
    iconName: "RefreshCw"
  },
  {
    id: "ai-reporting",
    title: "AI-Powered Reporting",
    shortDescription: "Generative Insight Engines for Unstructured Enterprise Data.",
    fullDescription: "Grounding Microsoft AI Builder and Power BI with raw data streams to extract actionable operational intelligence and automate complex stakeholder reporting cycles.",
    features: [
      "Power BI Dashboards",
      "AI Builder Integration",
      "Stakeholder Automation",
      "Predictive Analytics"
    ],
    benefits: [
      "Faster Reporting",
      "Unstructured Data Mining",
      "Stakeholder Transparency"
    ],
    iconName: "Bot"
  }
];

export const M365_SERVICES: Service[] = [
  {
    id: "sharepoint",
    title: "SharePoint Online",
    description: "Architecting decentralized knowledge ecosystems and high-fidelity intranets that serve as the neural core of your organization.",
    iconName: "AppWindow"
  },
  {
    id: "power-automate",
    title: "Power Automate",
    description: "Engineering autonomous logic nodes and workflow fabrics that eliminate operational latency through seamless M365 orchestration.",
    iconName: "RefreshCw"
  },
  {
    id: "power-bi",
    title: "Power BI",
    description: "Synthesizing raw data streams into immersive telemetry environments, enabling real-time predictive modeling and strategic insight.",
    iconName: "Database"
  },
  {
    id: "teams",
    title: "Microsoft Teams",
    description: "Transforming collaboration into a high-performance command center via custom business applications and adaptive card interfaces.",
    iconName: "MessageSquare"
  },
  {
    id: "azure",
    title: "Azure Services",
    description: "Leveraging the planetary scale of Azure to build resilient, hyper-scalable backend architectures for mission-critical operations.",
    iconName: "Shield"
  },
  {
    id: "copilot",
    title: "Copilot & AI Agents",
    description: "Deploying generative cognitive agents grounded in your proprietary enterprise data to augment human intelligence and process efficiency.",
    iconName: "Brain"
  }
];

export const INDUSTRIES = [
  {
    name: "Healthcare",
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
  { solution: "Power Automate Workflow", effort: "25-50 hrs", cost: "$3,500" },
  { solution: "Custom Power App", effort: "60-80 hrs", cost: "$6,500" },
  { solution: "Pre-Built Intranet Template", effort: "60-80 hrs", cost: "$7,500" },
  { solution: "AI-Powered Automation", effort: "70-100 hrs", cost: "$9,000" },
  { solution: "Copilot Agent Design", effort: "70-100 hrs", cost: "$9,000" }
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
    title: "Traceable Asset Approvals",
    outcome: "Implemented a zero-error labeling workflow for a major healthcare provider.",
    metrics: [
      { label: "Compliance", value: "100", suffix: "%" },
      { label: "Approval Time", value: "60", suffix: "% Faster" }
    ]
  },
  {
    id: "private-equity",
    clientIndustry: "Financial Services",
    title: "AI-Powered Investor Reporting",
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
  location: "New York, USA"
};
