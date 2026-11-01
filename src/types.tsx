export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'ecommerce' | 'food' | 'webapp' | 'automation';
  description: string;
  fullOverview: string;
  keyFeatures: string[];
  techStack: string[];
  image: string;
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  accentColor?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: {
    name: string;
    level: number;
    iconName: string;
    experience: string;
  }[];
}

export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'experience' | 'education';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric: string;
}
