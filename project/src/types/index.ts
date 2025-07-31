export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  university?: string;
  graduationYear?: string;
  interests: string[];
  skills: string[];
  subjects: string[];
  goals: string[];
  experienceLevel: 'no-experience' | 'some-experience' | 'experienced';
  projects?: Project[];
  certifications?: string[];
  languages?: string[];
  quizResults?: QuizResult;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  duration: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  averageSalary: string;
  salaryRange: string;
  learningPlatforms: Platform[];
  jobOutlook: string;
  category: string;
  matchScore?: number;
  techStack?: string[];
  remoteWork?: boolean;
  entryLevel?: boolean;
}

export interface Platform {
  name: string;
  url: string;
  type: 'course' | 'bootcamp' | 'certification' | 'university';
  price: string;
  duration?: string;
  rating?: number;
}

export interface QuizResult {
  strengths: string[];
  recommendations: string[];
  score: number;
  personalityType: string;
  techAptitude?: number;
  softSkills?: string[];
}

export interface CareerTip {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  techFocused?: boolean;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: Project[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    frameworks: string[];
  };
  certifications: string[];
  achievements: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  gpa?: string;
  graduationDate: string;
  relevantCourses?: string[];
}

export interface ExperienceEntry {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

export type NavigationPage = 'home' | 'discover' | 'quiz' | 'compare' | 'learn' | 'resume';
export type Theme = 'light' | 'dark';