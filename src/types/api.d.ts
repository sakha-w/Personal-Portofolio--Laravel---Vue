export interface Technology {
  id: number;
  name: string;
  slug: string;
  category: 'frontend' | 'backend' | 'data' | 'tools' | 'other';
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  thumbnail: string | null;
  year: string | null;
  category: string;
  featured: boolean;
  github_url: string | null;
  demo_url: string | null;
  architecture: string | null;
  challenge: string | null;
  solution: string | null;
  result: string | null;
  technologies: Technology[];
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  featured: boolean;
  technologies: Technology[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string | null;
  period: string | null;
  gpa: string | null;
  thesis: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string | null;
  description: string | null;
  credential_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface PageView {
  id: number;
  page: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}