
import { LucideIcon } from 'lucide-react';

export interface Suite {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  iconName: 'Layout' | 'Bot' | 'RefreshCw';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  // Added 'RefreshCw' to the allowed icon names for Services
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