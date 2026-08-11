export type ResumeTheme =
  | 'ai_fusion_2026'
  | 'cyber_tech_2026'
  | 'executive_prime_2026'
  | 'glass_modern_2026'
  | 'creative_portfolio_2026'
  | 'minimal_horizon_2026'
  | 'silicon_valley_2026'
  | 'hyper_grid_2026'
  | 'quantum_clean_2026'
  | 'neon_futuristic_2026'
  | 'metro_compact_2026'
  | 'monochrome_chic_2026'
  | 'gradient_pulse_2026'
  | 'nordic_minimal_2026'
  | 'apex_leadership_2026'
  | 'modern'
  | 'minimal'
  | 'classic'
  | 'executive'
  | 'creative'
  | 'technical'
  | 'elegant'
  | 'bold'
  | 'compact'
  | 'professional';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubUrl?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  customSections?: CustomSection[];
  theme: ResumeTheme;
  accentColor: string;
}
