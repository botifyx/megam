
import { LucideIcon } from 'lucide-react';

export interface Suite {
  id: string;
  title: string;
  productType: string;
  maturity: 'Production' | 'Pilot' | 'Early Production';
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  iconName: 'Layout' | 'Bot' | 'RefreshCw' | 'Shield' | 'BarChart3' | 'Layers' | 'Box';
  badges: string[];
  externalLink?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'Brain' | 'MessageSquare' | 'AppWindow' | 'Database' | 'Shield' | 'Share2' | 'RefreshCw';
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Metric {
  label: string;
  value: string;
  suffix: string;
}

export interface CaseStudy {
  id: string;
  clientIndustry: string;
  title: string;
  outcome: string;
  metrics: Metric[];
}

export interface LeadSummary {
  name: string;
  company: string;
  email: string;
  topic: string;
  systems: string;
  timeline: string;
  painStatement: string;
  nextStep: 'Demo' | 'Blueprint' | 'Discovery Call';
}
