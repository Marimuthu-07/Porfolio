/**
 * Shared Type Definitions for Developer Portfolio
 */

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tags: string[];
  bullets: string[];
  githubUrl: string;
  liveUrl?: string;
  accentGradient: string; // Tailwind class description or colors
  visualType: 'learnvault' | 'musicplayer';
}

export interface Skill {
  name: string;
  progress: number; // Percentage, e.g., 85
}

export interface SkillCategory {
  title: string;
  iconName: string; // Lucide icon component name
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  verificationUrl: string;
  iconType: 'google' | 'python' | 'default';
  badgeUrl?: string;
  certificateImage?: string;
  skillsLearned?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  cgpaOrGrade: string;
  statusBadge: string;
  expectedYear?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
