export type ResumeTheme = 'modern' | 'minimal' | 'classic' | 'executive' | 'creative' | 'technical' | 'elegant' | 'bold' | 'compact' | 'professional';

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
  theme: ResumeTheme;
  accentColor: string;
}
